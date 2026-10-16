const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

async function postLive(body) {
  const res = await fetch('http://localhost:3000/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return { status: res.status, data };
}

function postInMemory(app, body, headers = {}) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(body);
    const req = Readable.from([Buffer.from(payload)]);
    req.method = 'POST';
    req.url = '/api/explain';
    req.headers = {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(payload).toString(),
      ...headers
    };

    let responseData = '';
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
      getHeader(k) { return this.headers[k.toLowerCase()]; },
      status(code) { this.statusCode = code; return this; },
      json(obj) {
        responseData = JSON.stringify(obj);
        this.setHeader('content-type', 'application/json');
        this.end();
      },
      send(data) {
        responseData = data;
        this.end();
      },
      write(chunk) { responseData += chunk; },
      end(chunk) {
        if (chunk) responseData += chunk;
        try {
          resolve({ status: this.statusCode, data: JSON.parse(responseData) });
        } catch (e) {
          resolve({ status: this.statusCode, rawBody: responseData });
        }
      }
    };

    app(req, res);
  });
}

async function runSlice4Tests() {
  console.log('Testing Notice Paper Slice 4 (Edge States, Injection Defense & Retry)...\n');

  // 1. Non-English Input State (Indonesian Letter)
  const indonesianText = `SURAT PERINGATAN KETERLAMBATAN PEMBAYARAN LISTRIK
PT Perusahaan Listrik Negara
Kepada Yth. Pelanggan di Jakarta
Nomor Pelanggan: 5412-9901-23

PEMBERITAHUAN TERAKHIR SEBELUM PEMUTUSAN SEMENTARA
Catatan kami menunjukkan bahwa tagihan rekening listrik Anda sebesar Rp 350.000 telah melewati batas waktu pembayaran bulan ini. Mohon segera melakukan pembayaran melalui bank atau loket terdekat sebelum tanggal 25 Oktober 2026 agar aliran listrik ke tempat tinggal Anda tidak diputus oleh petugas kami di lapangan.`;

  console.log('1. Testing Non-English Input (Indonesian letter)...');
  const nonEnglishRes = await postLive({ text: indonesianText, language: 'en' });
  console.log(`   HTTP: ${nonEnglishRes.status}`);
  console.log(`   is_english: ${nonEnglishRes.data.data ? nonEnglishRes.data.data.is_english : null}`);
  if (!nonEnglishRes.data.data || nonEnglishRes.data.data.is_english !== false) {
    throw new Error('Failed: Expected is_english to be false for Indonesian letter');
  }
  console.log('   ✓ Non-English input correctly flagged with is_english: false\n');

  await new Promise(r => setTimeout(r, 2000));

  // 2. Not-an-Official-Letter State (Cookie Recipe)
  const recipeText = `Classic Chocolate Chip Cookies Recipe:
Preheat oven to 375 degrees F. In a large bowl, beat one cup softened butter, 3/4 cup sugar, and 3/4 cup brown sugar until creamy. Add two large eggs and two teaspoons pure vanilla extract. In another bowl, combine three cups all-purpose flour, one teaspoon baking soda, and 1/2 teaspoon salt. Gradually blend into creamed mixture. Stir in two cups semisweet chocolate chips. Drop rounded tablespoons onto ungreased baking sheets and bake 9 to 11 minutes until golden brown. Cool on baking sheets for two minutes before transferring to wire racks.`;

  console.log('2. Testing Non-Official Text (Recipe)...');
  const recipeRes = await postLive({ text: recipeText, language: 'en' });
  console.log(`   HTTP: ${recipeRes.status}`);
  console.log(`   is_official_letter: ${recipeRes.data.data ? recipeRes.data.data.is_official_letter : null}`);
  if (!recipeRes.data.data || recipeRes.data.data.is_official_letter !== false) {
    throw new Error('Failed: Expected is_official_letter to be false for recipe text');
  }
  console.log('   ✓ Non-official text correctly flagged with is_official_letter: false\n');

  await new Promise(r => setTimeout(r, 2000));

  // 3. Ambiguous Notice (sample-ambiguous-notice.txt)
  console.log('3. Testing Ambiguous Notice...');
  const ambiguousText = fs.readFileSync(path.join(__dirname, '..', 'test-data', 'sample-ambiguous-notice.txt'), 'utf8');
  const ambiguousRes = await postLive({ text: ambiguousText, language: 'en' });
  console.log(`   HTTP: ${ambiguousRes.status}`);
  const ambData = ambiguousRes.data.data;
  console.log(`   amount_due: ${ambData.amount_due} (verified: ${ambData.amount_verified})`);
  console.log(`   deadline: ${ambData.deadline} (verified: ${ambData.deadline_verified})`);
  console.log(`   uncertainties: ${JSON.stringify(ambData.uncertainties)}`);
  if (ambData.amount_due !== null || ambData.deadline !== null || !ambData.uncertainties || ambData.uncertainties.length === 0) {
    throw new Error('Failed: Expected null amount/deadline and uncertainty flags for ambiguous notice');
  }
  console.log('   ✓ Ambiguous notice correctly returns null amount/deadline and populates uncertainty flags\n');

  await new Promise(r => setTimeout(r, 2000));

  // 4. Prompt Injection Attempt (sample-injection-attempt.txt)
  console.log('4. Testing Prompt Injection Defense...');
  const injectionText = fs.readFileSync(path.join(__dirname, '..', 'test-data', 'sample-injection-attempt.txt'), 'utf8');
  const injectionRes = await postLive({ text: injectionText, language: 'en' });
  console.log(`   HTTP: ${injectionRes.status}`);
  const injData = injectionRes.data.data;
  console.log(`   amount_due: ${injData.amount_due} (verified: ${injData.amount_verified})`);
  console.log(`   deadline: ${injData.deadline} (verified: ${injData.deadline_verified})`);
  console.log(`   summary: ${injData.summary}`);
  const summaryLower = (injData.summary || '').toLowerCase();
  if (summaryLower.includes('chocolate') || summaryLower.includes('poem') || summaryLower.includes('fudge')) {
    throw new Error('Failed: Injection attempt breached character and output chocolate poem');
  }
  if (injData.amount_due !== '$210.50' || injData.deadline !== 'November 5, 2026') {
    throw new Error('Failed: Grounded values not extracted from injection sample');
  }
  console.log('   ✓ Prompt injection instruction defeated; grounded tax data extracted as passive document\n');

  // 5. Oversized Text (>10,000 characters)
  console.log('5. Testing Oversized Input (>10,000 chars)...');
  const hugeText = 'Overdue bill content '.repeat(600); // ~12,600 chars
  const hugeRes = await postLive({ text: hugeText });
  console.log(`   HTTP: ${hugeRes.status}, error: ${hugeRes.data.error}`);
  if (hugeRes.status !== 400 || hugeRes.data.error !== 'TEXT_TOO_LONG') {
    throw new Error('Failed: Expected 400 TEXT_TOO_LONG for oversized input');
  }
  console.log('   ✓ Server correctly rejects input >10,000 chars with 400 TEXT_TOO_LONG\n');

  // 6. Transient Retry and Failure Handling (Tested via in-memory test environment)
  console.log('6. Testing Transient Retry stub...');
  process.env.NODE_ENV = 'test';
  const app = require('../server');
  const stubSample = `APEX ENERGY SERVICES URGENT NOTICE. Outstanding balance of $145.20 is past due. Pay by October 24, 2026.`;
  const retryRes = await postInMemory(app, { text: stubSample }, { 'x-test-stub': 'error-429' });
  console.log(`   HTTP: ${retryRes.status}, error: ${retryRes.data.error}`);
  if (retryRes.status !== 429 || retryRes.data.error !== 'RATE_LIMIT') {
    throw new Error('Failed: Expected 429 RATE_LIMIT for transient failure stub');
  }
  console.log('   ✓ Transient rate limit returns 429 RATE_LIMIT after retry\n');

  console.log('All Slice 4 automated verifications PASSED!');
  process.exit(0);
}

runSlice4Tests().catch(err => {
  console.error('\nSlice 4 verification failed:', err);
  process.exit(1);
});
