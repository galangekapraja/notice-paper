---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast (with dedicated learning code walkthrough pauses at Slice 2 and Slice 3 per learner request)

## Slices

- [x] **1. Project Scaffold, Responsive Paper Layout, MIT License & Interactive Client State**
  Becomes usable: A running local web app (`http://localhost:3000`) with fully responsive paper aesthetic (desktop 2-column above-the-fold, tablet, mobile stacked with auto-scroll, 60/30/10 palette, editorial serif headings, paper sheet textarea, disclaimer), working sample button to load the overdue utility bill, dynamic bilingual toggle (English <-> Indonesian), MIT `LICENSE`, and client-side input validation (<15 words, >10,000 chars, empty).
  Why now: Establishes the entire runnable foundation across desktop, tablet, and mobile—Express server, static asset delivery, paper design system, MIT license, and client validation—so subsequent AI slices have an immediate visual home.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel & Accessibility`, `prd.md > Features and Behavior > 1. Bilingual Interface`, `prd.md > Features and Behavior > 2. Letter Input & Sample Loader`, `prd.md > Features and Behavior > 3. Action Trigger & Client Validation`
  Spec ref: `spec.md > Stack`, `spec.md > Where It Runs and How Someone Tries It`, `spec.md > Look and Feel`, `spec.md > Components (1-4)`, `spec.md > File Structure`
  Build: Initialize `package.json`, implement basic `server.js` serving `public/`, create `public/index.html`, `public/style.css` (with responsive desktop 2-col, tablet, and mobile layout), and `public/app.js` with client validation, bilingual dictionary, preloaded overdue utility sample, and add `LICENSE` (MIT). (Note: existing prototype from another tool is used strictly as visual inspiration for mood and palette, no copied code).
  Verify (mechanical): Start server, verify HTTP 200 on `http://localhost:3000`, verify `LICENSE` exists, test responsive CSS rules, test client-side validation logic with automated curl/node check.
  Learner check: Open `http://localhost:3000` on desktop and mobile view, click "Try sample letter", toggle language between English and Indonesian, and test clicking explain with an empty box to see the inline friendly warning.
  Commit: `Scaffold project, responsive paper layout, MIT license, and client state`

- [ ] **2. Gemini AI Integration, Server Validation, Grounded Prompting & Loading Skeleton (The Kernel)**
  Becomes usable: Pasting a letter and clicking "Explain this letter" calls `POST /api/explain`. The server enforces request payload limit (50kb) and server-side validation (empty, <15 words, >10,000 chars) without logging letter text. It safely sends passive document data to Google Gemini API using native structured outputs (`responseSchema`), displays an animated loading skeleton, returns the structured plain summary, consequences, and up to 3 next action steps, and handles API errors with friendly fallback messages (no blank screen).
  Why now: The unique kernel of the app and the primary learning goal. Proves the AI pipeline early and establishes server security and validation before polishing details.
  PRD ref: `prd.md > The Core Journey` (steps 3-5), `prd.md > Features and Behavior > 4. Grounded AI Processing`, `prd.md > Features and Behavior > 5. Loading Experience`
  Spec ref: `spec.md > Stack`, `spec.md > Components > 7. AI Controller`, `spec.md > External Services > 1. Google Gemini API`, `spec.md > Prompt Design & Prompt Injection Defense`
  Build: Install `@google/genai` and `dotenv`, set up `.env.example` (learner creates `.env` with own key, never requested in chat), implement server-side validation (50kb limit, empty, short, long) in `server.js`, build passive data prompt with structured output schema, enforce zero logging of letter contents, add graceful fallback error handling, connect loading state in `public/app.js` (spinner button + skeleton wireframe), and render results.
  Verify (mechanical): Automated test script calling `POST /api/explain` with stubbed error tests (429/503/corrupted JSON) to conserve quota, confirming structured JSON response, zero letter logging in stdout, and rejection of invalid/oversized requests.
  Learner check: Pause for hands-on walkthrough: Inspect the prompt and API call in `server.js`, paste the overdue utility bill sample in the browser, observe the loading skeleton, and see the plain summary, consequences, and 3 steps appear.
  Commit: `Integrate Gemini API with structured outputs, server validation, and loading skeleton`

- [ ] **3. Server-Side Verbatim Verification, Accuracy Badges & Multi-Amount Test**
  Becomes usable: The server programmatically checks whether the extracted `amount_due` and `deadline` appear in the source letter text with normalized whitespace. The UI displays the prominent terracotta deadline/amount banner with plain-language bilingual confirmation or warning badges (*"Not confirmed in the letter text"* / *"Tidak ditemukan langsung di surat"*). Includes test sample with multiple itemized amounts and dates (`test-data/sample-multi-amounts.txt`).
  Why now: Directly addresses the learner's goal of understanding how to verify AI output correctness and ensures amounts and dates are factually grounded.
  PRD ref: `prd.md > Features and Behavior > 6. Structured Results Display` (Card 1), `prd.md > Look and Feel` (verbatim rule)
  Spec ref: `spec.md > Components > 7. AI Controller & Verbatim Verifier`, `spec.md > Data Model > Server-to-Client Verified Payload`, `spec.md > Testing & Verification Plan`
  Build: Implement whitespace-normalized substring check in `server.js`, pass verification flags, render verbatim terracotta banner in `public/app.js` with plain-language status badges, create `test-data/sample-multi-amounts.txt`.
  Verify (mechanical): Automated test verifying that when an amount is present in the letter, `amount_verified: true` is returned, and when a letter has no amount or modified amount, `amount_verified: false` is returned, with whitespace differences normalized.
  Learner check: Pause for hands-on walkthrough: Inspect the verbatim check code in `server.js`, test with `sample-overdue-bill.txt` and `sample-multi-amounts.txt`, compare the amount selected by the model with the actual final total bill in the letter, and observe the plain-language verified badges.
  Commit: `Add server-side verbatim verification with whitespace normalization and multi-amount test`

- [ ] **4. Uncertainty Flags, Edge States, Prompt Injection Defense & Transient Retry**
  Becomes usable: The app gracefully handles ambiguous clauses (Card 5), non-English inputs, non-official texts (recipes/gibberish), input >10,000 chars, network/service dropouts with 1-second retry backoff, and prompt injection attempts using `test-data/sample-injection-attempt.txt` and `test-data/sample-ambiguous-notice.txt`. Results strictly avoid mentioning payment methods or phone numbers not present in the letter text.
  Why now: Rounds out the proof of concept with all safety boundaries, failure modes, and test samples so the app is completely dependable for the demo recording.
  PRD ref: `prd.md > States and Boundaries` (states 4-7), `prd.md > Features and Behavior > 6. Structured Results Display` (Card 5)
  Spec ref: `spec.md > Important Failure Modes & Error Handling`, `spec.md > Prompt Design & Prompt Injection Defense`, `spec.md > Testing & Verification Plan`
  Build: Implement ambiguity detection card in `public/app.js`, non-English and non-letter states using fixed client dictionary, server retry logic with 1s pause, add `test-data/sample-ambiguous-notice.txt` and `test-data/sample-injection-attempt.txt`.
  Verify (mechanical): Automated test runner using stubs for transient retry (saving quota), testing: Sample 2 (ambiguous notice), prompt injection sample, non-English text, non-letter recipe text, oversized text (>10,000 chars), and confirming no fabricated payment methods or unstated phone numbers.
  Learner check: Try pasting the recipe text, ambiguous notice, or injection attempt to verify that the app resists hijacking, avoids unstated payment channels/numbers, and triggers the proper edge state.
  Commit: `Implement uncertainty flags, edge states, prompt injection defense, and retry handling`

- [ ] **5. Polishing, Accessibility, Git Audit & Reviewer Documentation**
  Becomes usable: Complete keyboard navigation and visible focus rings, full mobile layout auto-scrolling, a comprehensive `README.md` guiding judges on setup, API keys, free tier, and demo reproduction, plus clean Git audit confirming zero API keys in commit history, and a fresh clone verification test.
  Why now: Prepares the codebase for final review, video demonstration, and Devpost packaging.
  PRD ref: `prd.md > Look and Feel & Accessibility`, `prd.md > What We're Building`
  Spec ref: `spec.md > File Structure`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Polish CSS focus rings and mobile auto-scroll, write comprehensive `README.md` (with setup, key instructions, free tier notes, and clone verification), audit Git history for zero committed secrets, ensure zero console logging of letter text.
  Verify (mechanical): Verify `README.md` exists, run Git log scan for secrets, test clone into scratch directory per README instructions, check responsive CSS rules, verify terminal stdout has zero letter content.
  Learner check: Navigate the page using only `Tab` and `Enter` keys, check mobile layout, and inspect `README.md`.
  Commit: `Add accessibility polish, git security audit, and comprehensive README documentation`

## Hands-on Checkpoints

- [ ] Early usable behavior & Prompt Walkthrough — Slice 2 (Gemini AI integration, prompt design & first live letter explanation)
- [ ] Verbatim Verification & Accuracy Walkthrough — Slice 3 (Server-side verification logic & multi-amount comparison)
- [ ] Final kick-the-tires exploration and feedback completed — Slice 5 (Complete app, edge cases & accessibility)

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be filled upon completion]
Route and stops: [to be filled upon completion]
Edit outcome: [to be filled upon completion]
Reflection: [to be filled upon completion]
Activity mode: [to be filled upon completion]

## Revisions

