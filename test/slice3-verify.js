const app = require('../server');
const verifyVerbatimSubstring = app.verifyVerbatimSubstring;
const normalizeWhitespace = app.normalizeWhitespace;

async function verify() {
  console.log('Testing Notice Paper Slice 3 (Verbatim Verification & Whitespace Normalization)...');

  const sourceLetter = `APEX ENERGY SERVICES
Account Number: 8492-1049-38
Outstanding balance of $145.20 is past due.
Please pay by October   24,
2026 to prevent disconnection.
Reconnection fee is $35.00.`;

  // 1. Amount present in letter -> verified true
  const amountPresent = verifyVerbatimSubstring(sourceLetter, '$145.20');
  if (amountPresent !== true) {
    throw new Error(`Expected amount $145.20 to be verified true, got: ${amountPresent}`);
  }
  console.log('✓ Amount present in letter verified: true');

  // 2. Modified or absent amount -> verified false
  const amountModified = verifyVerbatimSubstring(sourceLetter, '$999.00');
  if (amountModified !== false) {
    throw new Error(`Expected modified amount $999.00 to be verified false, got: ${amountModified}`);
  }
  console.log('✓ Modified amount verified: false');

  // 3. Missing amount (null or empty) -> verified false
  const amountNull = verifyVerbatimSubstring(sourceLetter, null);
  const amountEmpty = verifyVerbatimSubstring(sourceLetter, '');
  if (amountNull !== false || amountEmpty !== false) {
    throw new Error(`Expected null/empty amount to be verified false, got null=${amountNull}, empty=${amountEmpty}`);
  }
  console.log('✓ Missing/null amount verified: false');

  // 4. Whitespace differences normalized -> verified true
  // In source letter: "October   24,\n2026"
  // Extracted date: "October 24, 2026"
  const dateNormalized = verifyVerbatimSubstring(sourceLetter, 'October 24, 2026');
  if (dateNormalized !== true) {
    throw new Error(`Expected whitespace-normalized date to be verified true, got: ${dateNormalized}`);
  }
  console.log('✓ Whitespace differences normalized (line breaks / double spaces) verified: true');

  // 5. Test normalizeWhitespace utility
  const rawText = "Line 1\n\n   Line 2\t\tLine 3   ";
  const normalized = normalizeWhitespace(rawText);
  if (normalized !== "Line 1 Line 2 Line 3") {
    throw new Error(`Whitespace normalization failed: "${normalized}"`);
  }
  console.log('✓ normalizeWhitespace collapses tabs, newlines, and multiple spaces into single space');

  console.log('\nAll Slice 3 mechanical verifications PASSED!');
  process.exit(0);
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
