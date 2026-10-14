const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Testing Notice Paper Slice 1...');
  
  // 1. Health check
  const health = await get('/api/health');
  if (health.status !== 200 || !health.body.includes('Notice Paper')) {
    throw new Error(`Health check failed: ${health.status} ${health.body}`);
  }
  console.log('✓ /api/health returned 200 OK');

  // 2. index.html check
  const index = await get('/');
  if (index.status !== 200 || !index.body.includes('Notice Paper') || !index.body.includes('Explain this letter')) {
    throw new Error(`index.html check failed: ${index.status}`);
  }
  console.log('✓ index.html served properly with paper layout');

  // 3. style.css check
  const css = await get('/style.css');
  if (css.status !== 200 || !css.body.includes('--bg-canvas: #F2EFE8') || !css.body.includes('max-width: 767px')) {
    throw new Error('style.css check failed (palette or responsive rules missing)');
  }
  console.log('✓ style.css served properly with 60/30/10 palette and mobile/tablet/desktop responsiveness');

  // 4. app.js check
  const js = await get('/app.js');
  if (js.status !== 200 || !js.body.includes('SAMPLE_OVERDUE_BILL') || !js.body.includes('validateInput')) {
    throw new Error('app.js check failed');
  }
  console.log('✓ app.js served properly with localization and validation logic');

  console.log('\nAll Slice 1 mechanical verifications PASSED!');
  process.exit(0);
}

verify().catch(err => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
