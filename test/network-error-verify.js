// Behavior test for the browser logic in public/app.js.
// It runs the real app.js inside a minimal fake DOM (no browser needed) and checks
// what the screen would show for error and result states. It does not call the network.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const appJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'app.js'), 'utf8');

// --- Minimal fake DOM ---------------------------------------------------
const elements = {};
function makeEl() {
  const e = {
    hidden: false, textContent: '', className: '', value: '', checked: false,
    disabled: false, style: {}, dataset: {}, children: [],
    classList: { toggle() {}, add() {}, remove() {} },
    setAttribute() {}, addEventListener() {}, focus() {}, scrollIntoView() {}, click() {},
    appendChild(child) { this.children.push(child); }
  };
  Object.defineProperty(e, 'innerHTML', {
    get() { return ''; },
    set() { this.children = []; }
  });
  return e;
}
const document = {
  getElementById(id) { return elements[id] || (elements[id] = makeEl()); },
  querySelectorAll() { return []; },
  createElement() { return makeEl(); }
};
const window = { innerWidth: 1200 };
const navigator = { onLine: true };

vm.runInNewContext(appJs, {
  document, window, navigator,
  setTimeout, clearTimeout, console,
  fetch: async () => { throw new TypeError('Failed to fetch'); }
});

const hook = window.__noticePaperTest;
assert.ok(hook && hook.handleError && hook.renderResults, 'app.js must expose handleError and renderResults for tests');
const $ = (id) => document.getElementById(id);

function check(name, fn) {
  fn();
  console.log('✓ ' + name);
}

console.log('Testing browser behavior of public/app.js (fake DOM)...');

check('network failure shows "Connection Problem", hides results, offers Try again', () => {
  $('results-container').hidden = false;
  hook.handleError(new TypeError('Failed to fetch'));
  assert.strictEqual($('results-container').hidden, true);
  assert.strictEqual($('state-error').hidden, false);
  assert.strictEqual($('error-title').textContent, 'Connection Problem');
  assert.strictEqual($('btn-retry').hidden, false);
});

check('the same error is shown in Bahasa Indonesia after switching language', () => {
  hook.setLanguage('id');
  assert.strictEqual($('error-title').textContent, 'Masalah Koneksi');
  hook.setLanguage('en');
});

check('configuration error (model not found) hides results and the retry button', () => {
  const err = Object.assign(new Error('CONFIG_ERROR'), { status: 404, category: 'MODEL_NOT_FOUND', errorType: 'CONFIG_ERROR' });
  hook.handleError(err);
  assert.strictEqual($('results-container').hidden, true);
  assert.strictEqual($('error-title').textContent, 'Model Not Found');
  assert.strictEqual($('btn-retry').hidden, true);
});

check('rate limit shows "Service Busy" and offers Try again', () => {
  const err = Object.assign(new Error('RATE_LIMIT'), { status: 429, category: 'RATE_LIMIT' });
  hook.handleError(err);
  assert.strictEqual($('error-title').textContent, 'Service Busy');
  assert.strictEqual($('btn-retry').hidden, false);
});

check('non-English letter shows the notice card, not the result cards', () => {
  hook.renderResults({ is_english: false, is_official_letter: true });
  assert.strictEqual($('state-notice').hidden, false);
  assert.strictEqual($('results-container').hidden, true);
  assert.strictEqual($('notice-title').textContent, 'English Letters Only');
});

check('not-a-letter text shows the notice card, not the result cards', () => {
  hook.renderResults({ is_english: true, is_official_letter: false });
  assert.strictEqual($('state-notice').hidden, false);
  assert.strictEqual($('results-container').hidden, true);
  assert.strictEqual($('notice-title').textContent, 'Not an Official Letter');
});

check('missing amount and deadline read "Not stated in the letter" with no badge', () => {
  hook.renderResults({
    is_english: true, is_official_letter: true,
    amount_due: null, deadline: null, amount_verified: false, deadline_verified: false,
    summary: 's', consequences: 'c', next_steps: ['a'], uncertainties: []
  });
  assert.strictEqual($('results-container').hidden, false);
  assert.strictEqual($('result-amount').textContent, 'Not stated in the letter');
  assert.strictEqual($('result-deadline').textContent, 'Not stated in the letter');
  assert.strictEqual($('badge-amount-status').hidden, true);
  assert.strictEqual($('badge-deadline-status').hidden, true);
});

check('verified values show "Found in the letter"; unverified show the warning badge', () => {
  hook.renderResults({
    is_english: true, is_official_letter: true,
    amount_due: '$1.00', deadline: 'May 1, 2026', amount_verified: true, deadline_verified: false,
    summary: 's', consequences: 'c', next_steps: ['a'], uncertainties: []
  });
  assert.strictEqual($('badge-amount-status').textContent, 'Found in the letter');
  assert.strictEqual($('badge-deadline-status').textContent, 'Not confirmed in the letter text');
});

check('no more than 3 next steps are drawn, even if more are provided', () => {
  hook.renderResults({
    is_english: true, is_official_letter: true,
    amount_due: null, deadline: null, summary: 's', consequences: 'c',
    next_steps: ['1', '2', '3', '4', '5'], uncertainties: []
  });
  assert.strictEqual($('result-steps').children.length, 3);
});

console.log('\nAll browser-behavior checks PASSED (fake DOM, no browser or network).');
