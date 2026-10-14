---
doc: scope
status: approved
---

# Notice Paper

A simple web app that translates intimidating official letters and bills into calm, plain-language explanations answering the core question: *"So what do I need to do?"*

## The Unique Kernel
Standard translation tools convert words, but leave the recipient anxious and confused by legal and bureaucratic jargon. Notice Paper cuts through bureaucratic anxiety by directly answering: **"What does this letter want from me, when is it due, what happens if I do nothing, and what are my next steps?"**

Crucially, the app operates under strict grounding to **minimize fabricated details**: it relies strictly on information explicitly present in the letter, avoiding inventing amounts, dates, or payment methods, and explicitly marks any uncertainty. 

Regarding data privacy: the application itself does not save, store, or log the pasted text in any database or disk. However, the text is transmitted to an external AI service API for processing. A prominent user warning advises users **not to paste sensitive personal data** (such as national ID numbers, banking credentials, or passwords). The app pairs this with explicit honesty: flagging ambiguous clauses, advising when to contact the sender directly, and reminding the user that it provides general explanations, not legal or financial advice.

## Who It's For
Migrants, international students, and residents receiving official notices in a language other than their mother tongue (starting with English letters).

*Working Hypothesis (from general observation):* When receiving intimidating official letters, recipients often struggle to decipher bureaucratic phrasing. They may resort to fragmented machine translations, rely heavily on busy friends, or delay opening/acting on mail due to anxiety—risking missed deadlines, financial penalties, or service disconnection.

## The Core Loop
1. User receives an intimidating letter/bill and copies the text.
2. User opens Notice Paper, sees a reminder not to paste sensitive personal data, pastes the text, and selects their preferred explanation language (Indonesian or Simple English).
3. User clicks one button to explain.
4. User immediately sees:
   - A calm, jargon-free summary in short sentences.
   - Prominently highlighted deadline and any required payment amount (strictly matched to what is stated in the letter).
   - What happens if ignored (honest consequences, without panic).
   - **Up to 3 concrete next action steps** derived strictly from letter information (falling back to safe general steps like contacting the official sender if specific instructions are missing).
   - Clear markers if any part of the letter is ambiguous, recommending direct clarification with the sender.
5. User leaves with clarity; the application does not persist or retain the pasted text.

## Inspiration & Identity
- **Tone & Persona**: Like a calm, helpful friend sitting next to you reading the letter together. Clear, short sentences, zero condescension, zero unnecessary jargon. Reassuring without minimizing real deadlines or serious risks.
- **Privacy & Responsible AI**: The app does not store or log pasted letters. The interface clearly warns users that text is sent to an external AI API for processing and advises against submitting sensitive personal information.
- **Safety**: A clear, prominent disclaimer that this is a plain-language reading aid, not licensed legal or financial counsel.

## Why This Matters to the Learner
Grounded in general observations of people struggling with bureaucratic correspondence in a foreign language. The learner wants to test the hypothesis that an AI-powered plain-language interpreter can remove this anxiety, while learning how to engineer prompt instructions that **minimize fabricated details through strict grounding and uncertainty marking**, as well as extracting structured data reliably.

## What "Working" Looks Like
For the hackathon's 1–2 minute demo video:
1. Paste a fictional English electric utility overdue notice warning of potential service disconnection if an outstanding balance isn't paid by a specified date (all names, amounts, and companies are fictional).
2. Select Indonesian, click the action button.
3. Within a few seconds, the screen displays the plain Indonesian explanation:
   - Extracted balance and prominent due date, **which must strictly match the exact figures and dates stated in the source letter**.
   - Clear consequence (disconnection notice).
   - Up to 3 actionable steps based on the letter (e.g., verify account, pay via stated methods, contact customer care if disputed).
4. If time permits, demonstrate a second sample notice containing ambiguous clauses, showing the app explicitly calling out uncertainty rather than guessing.

## The POC Boundary
- **In Scope (Now)**:
  - Web UI with a single text paste input.
  - Transparent data handling: The app itself does not persist or log text, but sends it to an external AI API to process; includes an upfront warning to exclude sensitive personal data.
  - Language toggle: Simple English and Indonesian.
  - Focused document type: Bills and official notices with deadlines.
  - Grounding to minimize fabricated details: Prompts structured to extract only stated details, avoid inventing facts, and flag uncertainties.
  - AI extraction & structured response: Summary, exact deadline/amount match, consequences, up to 3 action steps, uncertainty flags, disclaimer.
  - Zero-auth, instant access.
  - Fictional sample test notices provided for instant testing.

## Later
- File upload (PDF and images).
- OCR (Optical Character Recognition) for smartphone photos of physical mail.
- Expansion to more languages (Spanish, Vietnamese, Arabic, etc.).
- Saving history or pinning letters locally on the client side.
- Direct calendar integration for due dates.

## Explicitly Cut
- **User accounts & cloud databases**: Distracts from the core proof of concept, adds login friction, and introduces unnecessary data retention risks.
- **Multi-turn chatbot conversation**: A focused, one-click structured answer is faster and less overwhelming for an anxious user than a rambling chat dialogue.
- **Physical camera scanner / document upload**: Adds significant parsing and OCR complexity; text paste completely proves the core AI transformation loop within the 2–4 hour hackathon timeframe.
