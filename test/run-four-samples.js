const fs = require('fs');
const path = require('path');

const samples = [
  'sample-overdue-bill.txt',
  'sample-ambiguous-notice.txt',
  'sample-multi-amounts.txt',
  'sample-injection-attempt.txt'
];

async function run() {
  console.log('Running test against all 4 sample letters...\n');

  for (const sample of samples) {
    const filePath = path.join(__dirname, '..', 'test-data', sample);
    if (!fs.existsSync(filePath)) {
      console.error(`MISSING FILE: ${sample}`);
      continue;
    }
    const text = fs.readFileSync(filePath, 'utf8');

    console.log(`========================================`);
    console.log(`TEST SAMPLE: ${sample}`);
    console.log(`========================================`);

    try {
      const res = await fetch('http://localhost:3000/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'en' })
      });

      const json = await res.json();
      console.log(`HTTP Status: ${res.status}`);
      console.log(`Success: ${json.success}`);

      if (json.data) {
        console.log(`is_english: ${json.data.is_english}`);
        console.log(`is_official_letter: ${json.data.is_official_letter}`);
        console.log(`amount_due: ${json.data.amount_due} (verified: ${json.data.amount_verified})`);
        console.log(`deadline: ${json.data.deadline} (verified: ${json.data.deadline_verified})`);
        console.log(`summary: ${json.data.summary}`);
        console.log(`consequences: ${json.data.consequences}`);
        console.log(`next_steps count: ${(json.data.next_steps || []).length}`);
        console.log(`uncertainties: ${JSON.stringify(json.data.uncertainties)}`);
      } else {
        console.log(`Error:`, json.error, json.category, json.reason);
      }
    } catch (err) {
      console.error(`Request failed: ${err.message}`);
    }

    console.log('');
    // Brief pause between requests to respect free-tier rate limits
    await new Promise(r => setTimeout(r, 2000));
  }
}

run();
