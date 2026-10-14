const http = require('http');

function post(path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = http.request(`http://localhost:3000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, rawBody: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function verify() {
  console.log('Testing Notice Paper Slice 2...');

  // 1. Empty input validation
  const emptyRes = await post('/api/explain', { text: '   ' });
  if (emptyRes.status !== 400 || emptyRes.body.error !== 'EMPTY_TEXT') {
    throw new Error(`Empty check failed: ${JSON.stringify(emptyRes)}`);
  }
  console.log('✓ Server rejects empty text with 400 EMPTY_TEXT');

  // 2. Short input validation (<15 words)
  const shortRes = await post('/api/explain', { text: 'This bill is past due. Please pay immediately today.' });
  if (shortRes.status !== 400 || shortRes.body.error !== 'TEXT_TOO_SHORT') {
    throw new Error(`Short check failed: ${JSON.stringify(shortRes)}`);
  }
  console.log('✓ Server rejects short text (<15 words) with 400 TEXT_TOO_SHORT');

  // 3. Long input validation (>10,000 chars)
  const longText = 'word '.repeat(2500); // 12,500 chars
  const longRes = await post('/api/explain', { text: longText });
  if (longRes.status !== 400 || longRes.body.error !== 'TEXT_TOO_LONG') {
    throw new Error(`Long check failed: ${JSON.stringify(longRes)}`);
  }
  console.log('✓ Server rejects oversized text (>10,000 chars) with 400 TEXT_TOO_LONG');

  // 4. Stubbed valid response test (conserves real API quota)
  const validSample = `APEX ENERGY SERVICES URGENT NOTICE. Account 8492-1049-38. Outstanding balance of $145.20 is past due. To prevent disconnection, pay by October 24, 2026. If unpaid, disconnection occurs October 25 with a $35 fee. Pay online or call 1-800-555-0199.`;
  const validRes = await post('/api/explain', { text: validSample, language: 'en' }, { 'x-test-stub': 'valid' });
  if (validRes.status !== 200 || !validRes.body.success || !validRes.body.data.summary) {
    throw new Error(`Valid stub check failed: ${JSON.stringify(validRes)}`);
  }
  console.log('✓ Structured output returned properly with required fields');

  // 5. Transient error (429/503) stub test
  const errorRes = await post('/api/explain', { text: validSample }, { 'x-test-stub': 'error-429' });
  if (errorRes.status !== 503 || errorRes.body.error !== 'SERVICE_BUSY') {
    throw new Error(`Error stub check failed: ${JSON.stringify(errorRes)}`);
  }
  console.log('✓ Transient service error handled gracefully with 503 SERVICE_BUSY (no blank screen)');

  console.log('\nAll Slice 2 mechanical verifications PASSED!');
  process.exit(0);
}

verify().catch(err => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
