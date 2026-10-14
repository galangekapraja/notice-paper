---
doc: prd
status: approved
---

# Notice Paper — Product Requirements Document

Notice Paper is a responsive, single-surface web application that explains intimidating official letters and bills in calm, plain language, answering the core question: *"So what do I need to do?"* for migrants, international students, and non-native speakers.

*Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`*

---

## The Core Journey
1. **Arrival**: The user opens Notice Paper on desktop, tablet, or mobile. By default, the interface is in **English** (ensuring hackathon judges and international users can immediately navigate it), with an option to switch the entire interface and explanation to **Bahasa Indonesia**. They are greeted by a clear headline, an inviting text area styled like a sheet of official paper, a language selector, and clear reminders about privacy and safety.
2. **Above-the-Fold Desktop Fit**: On standard desktop viewports (e.g., 1366×768 to 1920×1080), the primary action button ("Explain this letter" / "Jelaskan surat ini") is completely visible without requiring the user to scroll.
3. **Sample Exploration (Optional)**: The user can click "Try sample letter" / "Coba surat contoh" to instantly populate the text area with a fictional overdue electric utility notice.
4. **Input & Action**: The user pastes their English official letter (or keeps the sample), confirms their preferred language, and clicks **"Explain this letter"** / **"Jelaskan surat ini"**.
5. **Processing (Feedback)**: The button disables with a spinner and loading text ("Reading letter..." / "Membaca surat..."), the text box locks, and the results panel displays a soft skeleton loader reassuring the user that processing takes only a few seconds.
6. **Clarity Delivered**: The screen reveals the structured explanation:
   - **Deadline & Amount Due**: Prominently highlighted at the top, displaying the **exact verbatim amount, currency symbol, and date string as written in the letter** (never converted, reformatted, or altered).
   - **Plain Summary**: Short, jargon-free explanation of the letter's purpose.
   - **Consequences**: Honest statement of what happens if ignored (e.g., service disconnection).
   - **Up to 3 Concrete Steps**: Actionable next moves derived directly from the letter.
   - **Uncertainty Flags**: Clear markers highlighting any ambiguous or unverified clauses with advice to contact the sender.
   - **Disclaimer**: Reminder that this is an AI reading aid, not legal or financial advice.
7. **Mobile Continuity**: On mobile, the view smoothly auto-scrolls down to the results panel upon completion.
8. **Session Completion**: The user leaves with clarity. The application itself does not store or log the pasted text, though it was transmitted to a third-party AI provider API (which may retain data under its own terms).

---

## Screens and Layout

Notice Paper consists of a **single unified responsive surface** containing identical functional elements across all viewports:

- **Desktop (>= 1024px)**:
  - Two columns side by side, calibrated so all controls—including the primary action button—remain **visible above the fold without scrolling** on typical desktop screens (1366×768 to 1920×1080):
    - **Left Column**: Title, subtitle, privacy warning, language toggle, letter input text area styled like an elegant document sheet, character counter, "Try sample letter" button, and primary "Explain this letter" button.
    - **Right Column**: Results panel, allowing direct side-by-side verification between the source letter and the explanation. The deadline and amount banner sits prominently at the top.
- **Tablet (768px – 1023px)**:
  - Two slimmer columns with generous spacing; automatically stacks into a single column if the viewport is constrained.
- **Mobile (< 768px)**:
  - Single vertical column (stacked top-to-bottom): Title & description -> language toggle -> letter text area -> "Try sample letter" -> primary button -> results panel.
  - Buttons sized generously for thumb reach.
  - Auto-scrolls smoothly to the results section as soon as explanation generation completes.

---

## Look and Feel & Accessibility
*Source: `scope.md > Inspiration & Identity`*

The aesthetic follows an intentional **paper-like atmosphere** with generous whitespace, built upon the **60/30/10 color rule**:

- **Visual Reference Note**: The learner has an initial visual prototype generated from another tool, used strictly as an inspirational reference for overall mood, typography balance, and color palette (not for rigid code copying).
- **Typography & Atmosphere**:
  - **Headings**: A warm, dignified editorial serif font (e.g., Playfair Display, Merriweather, or Georgia) to evoke the tactile gravity of physical paper and official correspondence.
  - **Body & Controls**: A crisp, highly legible sans-serif (e.g., Inter, system-ui) for clarity in instructions, buttons, and extracted lists.
  - **Input Styling**: The input area is subtly styled like a clean paper document sheet (warm paper background, refined border, gentle inner depth).
- **Color Palette (60/30/10)**:
  - **60% Dominant (Canvas & Paper Cards)**: Warm off-white paper tone (`#F2EFE8`).
  - **30% Structural (Typography)**: High-contrast dark charcoal (`#1A1A1A`) for primary text, with warm muted gray (`#5B5B56`) for secondary notes, borders, and placeholders.
  - **10% Brand Accent (Interactive)**: Deep forest green (`#123D2A`) for primary buttons and focal accents, darkening to `#1B5239` on hover/focus.
- **Functional Warning & Alert Colors** (used sparingly and always accompanied by explicit text labels and icons, never relying on color alone):
  - **Terracotta** (`#9A3B1F`, soft background `#F3E3DA`): Used for prominent deadline banners, critical consequence warnings, and connection/service error alerts.
  - **Dark Gold / Amber** (`#8A6A00`, soft background `#F6EDD0`): Used for uncertainty markers flagging ambiguous clauses.
- **Basic Accessibility**:
  - Full keyboard navigability (`Tab`, `Shift+Tab`, `Enter`, `Space`) across all interactive controls.
  - Clear, visible focus indicators (high-contrast focus rings) on the textarea, buttons, and toggles.
  - Semantic HTML structure (`<main>`, `<section>`, `<label>`, `<button>`, `<textarea>`) and ARIA live regions for dynamic error and loading updates.

---

## Features and Behavior

### 1. Bilingual Interface & Dynamic Localization
- The entire UI dynamically updates based on the selected language:
  - **Default**: **English** (ensuring immediate international usability and clarity for hackathon judges).
  - **Alternative**: **Bahasa Indonesia**.
- Elements translated dynamically: Page titles, descriptions, placeholders, button labels, loading text, error messages, privacy warnings, and disclaimers.
- **Interface Number Formatting vs. Letter Verbatim Text**:
  - **Interface numbers** (such as character limits and counters) follow the active language convention:
    - **English**: Comma as thousands separator (e.g., `10,000 characters`).
    - **Bahasa Indonesia**: Period as thousands separator (e.g., `10.000 karakter`).
  - **Verbatim Rule for Letter Content**: Currency symbols, monetary amounts, and deadlines extracted from the letter are **strictly never converted, calculated, or reformatted**. They are displayed verbatim as written in the original letter text (e.g., if the letter states `$145.20 due by Oct 24, 2026`, it is displayed verbatim as `$145.20` and `Oct 24, 2026`).

| UI Element | English (Default) | Bahasa Indonesia |
| :--- | :--- | :--- |
| **Title** | Notice Paper | Notice Paper |
| **Subtitle** | Paste an official letter, get a plain explanation and next steps. | Tempel surat resmi, dapatkan penjelasan sederhana dan langkah berikutnya. |
| **Placeholder** | Paste the full text of your letter or bill here... | Tempel seluruh isi surat atau tagihan Anda di sini... |
| **Sample Button** | Try sample letter | Coba surat contoh |
| **Action Button** | Explain this letter | Jelaskan surat ini |
| **Loading Button** | Reading letter... | Membaca surat... |
| **Privacy Notice** | Text is sent to a third-party AI service for processing, which may retain data per its own terms. Do not paste sensitive personal data (national ID, bank account, passwords). | Teks surat dikirim ke layanan AI pihak ketiga untuk diproses, dan penyedia mungkin menyimpannya sesuai ketentuannya sendiri. Jangan menempelkan data pribadi sensitif (NIK, rekening bank, kata sandi). |
| **Disclaimer** | Notice Paper is a plain-language reading aid, not official legal or financial advice. | Notice Paper adalah alat bantu membaca dengan bahasa sederhana, bukan penasihat hukum atau keuangan resmi. |

### 2. Letter Input & Sample Loader
*Source: `scope.md > The POC Boundary`*
- **Text Area**: Large text box styled like a paper document sheet, with inviting placeholder and subtle length indicator.
- **Sample Button ("Try sample letter" / "Coba surat contoh")**: Automatically loads a realistic, fictional English overdue utility bill with a clear due date, amount, and disconnection warning.
- **Language Selector**: Seamless toggle between **English** and **Bahasa Indonesia**.

### 3. Action Trigger & Client Validation
- Clicking the primary action button evaluates the input locally before making any network or API calls:
  - **Empty Input**: Rejects locally. Displays inline friendly message: *"Please paste the letter text first so it can be explained."* / *"Tempel isi surat dulu, ya, supaya bisa dijelaskan."* Focus returns to the text area.
  - **Input Too Short (< 15 words)**: Rejects locally. Displays: *"This text is too short to explain. Try pasting the full letter."* / *"Teks ini terlalu pendek untuk dijelaskan. Coba tempel seluruh isi suratnya."* Focus returns to the text area.
  - **Input Too Long (> 10,000 characters / ~2,000 words)**: Rejects locally. Displays: *"This text is too long for this demo (maximum 10,000 characters). Please paste only the main letter or notice pages."* / *"Teks ini terlalu panjang untuk demo ini (maksimal 10.000 karakter). Silakan tempel bagian utama surat atau pemberitahuan saja."* Focus returns to the text area.
- If client validation passes, triggers the AI explanation request.

### 4. Grounded AI Processing & Language Check
- The AI prompt is strictly instructed to:
  - **Check Language**: If the input is clearly not English (e.g., Spanish, German, French), politely return a dedicated notice that for this PoC, source letters must be in English.
  - **Check Document Type**: If the input is not an official letter, notice, or bill (e.g., a cooking recipe, casual chat message, or nonsensical gibberish), return the dedicated "Not an Official Letter" state.
  - **Strict Verbatim Extraction**: Extract amounts, currency symbols, and deadline dates exactly as stated in the letter, without performing currency conversion or modifying number formats.
  - **Grounding**: Extract only factual details present in the source text; minimize fabricated details (no invented dates, amounts, or payment channels).
  - **Output Translation**: Produce the explanation, summary, and action steps in the user's chosen language (Simple English or Bahasa Indonesia).

### 5. Loading Experience
- Primary button is disabled, displaying a subtle spinner and label: **"Reading letter…"** / **"Membaca surat…"** to prevent double submissions.
- Text area is locked into read-only mode during processing.
- The results panel displays soft gray skeleton loader bars indicating upcoming sections alongside reassuring text: *"Reading your letter, usually takes a few seconds."* / *"Sedang membaca surat Anda, biasanya hanya beberapa detik."*
- If generation exceeds 10 seconds, message updates smoothly to: *"Still working on it, please hold on..."* / *"Masih diproses, mohon tunggu sebentar."*

### 6. Structured Results Display
*Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`*
Upon successful processing, displays structured cards in fixed priority order:
1. **Deadline & Amount Due (Tenggat & Nominal)**:
   - High-contrast banner with terracotta badge.
   - Shows the exact verbatim deadline date and payment amount extracted directly from the letter (including original currency symbols and figures, unaltered).
   - If no deadline or amount exists in the letter, clearly states "No deadline or payment amount was mentioned." / "Tidak ada tenggat waktu atau tagihan yang disebutkan."
2. **Plain Summary (Ringkasan Surat)**:
   - 2 to 3 short, calming sentences explaining what the letter is about and what the sender wants from the recipient.
3. **Consequences If Ignored (Akibat Jika Diabaikan)**:
   - Clear, honest summary of what happens if the letter is ignored (e.g. late fees, service disconnection) without sensationalizing or minimizing.
4. **Up to 3 Next Steps (Langkah Berikutnya)**:
   - Numbered action items (maximum 3) derived strictly from stated options in the letter (e.g., pay via online portal, check balance, call helpline).
   - If instructions in the letter are limited, provides safe general actions (e.g., "Contact the sender at their official customer phone number to verify").
5. **Uncertainty Flags (Penanda Ketidakpastian)**:
   - Amber badge with icon and label.
   - Explicitly calls out ambiguous, incomplete, or confusing clauses (e.g., unclear terms or unverified references) and recommends verifying directly with the issuer.

---

## States and Boundaries

- **1. First Use / Empty State**:
  - Text area is blank with placeholder.
  - Results panel displays a warm, neutral empty state: *"Your plain-language explanation will appear here after you paste a letter and click the button."* / *"Penjelasan akan muncul di sini setelah Anda menempelkan surat dan menekan tombol."*
- **2. Loading State**:
  - Button disabled with spinner ("Reading letter…").
  - Input locked.
  - Skeleton wireframe in results panel.
- **3. Success State**:
  - Results panel filled with structured sections.
  - On mobile, screen auto-scrolls smoothly to the results.
- **4. Input Validation State (Client-Side)**:
  - Empty input, text too short (< 15 words), or text too long (> 10,000 characters).
  - Handled immediately on the client with an inline friendly message; no API request made.
- **5. Non-English Input State**:
  - Triggered if the pasted text is detected to be in another language.
  - Results panel displays a clear informative card: *"Notice Paper currently only supports letters written in English for this proof of concept. Please paste an English letter."* / *"Notice Paper saat ini hanya mendukung surat berbahasa Inggris untuk proof of concept ini. Silakan tempel surat berbahasa Inggris."*
- **6. Not an Official Letter State**:
  - Distinct state occurring when text is long enough but is clearly not an official letter or bill (e.g., a recipe, casual blog post, or random gibberish).
  - Results panel displays a friendly message: *"This text does not appear to be an official letter, bill, or notice. Notice Paper explains official correspondence with deadlines or instructions."* / *"Teks ini tampaknya bukan surat, tagihan, atau pemberitahuan resmi. Notice Paper dirancang untuk menjelaskan korespondensi resmi yang memiliki tenggat atau instruksi."*
  - The app does not attempt to fabricate an interpretation or invent deadlines.
- **7. Network / Service Error State**:
  - Automatic single quick retry ("Retrying..." / "Mencoba lagi...").
  - If still failing, displays a terracotta alert box in the results panel with an icon and explicit text:
    - For network drop: *"It looks like your internet connection was lost."* / *"Sepertinya koneksi internet terputus."*
    - For service error: *"The explanation service is temporarily busy."* / *"Layanan penjelasan sedang sibuk."*
    - Reassurance note: *"Your letter is still safe in the box and hasn't been lost."* / *"Surat Anda masih ada di kotak, tidak hilang."*
    - Interactive **"Try again"** / **"Coba lagi"** button.
    - If repeated errors occur, suggests waiting 1 minute.
    - Corrupted or partial responses are never shown half-baked; they always resolve to the clean error state.
- **8. Data Handling & Privacy Boundary**:
  - The application itself does not store, log, or persist the pasted text in any database or local storage.
  - Text is sent over HTTPS to a third-party AI provider API, which may retain or log data in accordance with its own service policies.
  - The user interface explicitly warns users not to paste sensitive personal information.

---

## Product Decisions

- **Verbatim Amount & Deadline Preservation vs. UI Locale Formatting**: Established that monetary figures, currency symbols, and deadline dates from the letter must be preserved exactly verbatim (zero conversion, zero modification). Regional number punctuation (e.g., `10,000` vs `10.000`) applies solely to application interface counters (such as character count warnings).
- **Above-the-Fold Desktop Interaction**: Optimized the desktop layout so the headline, input, sample button, and primary action button fit cleanly within standard desktop viewports (1366×768 to 1920×1080) without requiring a scroll down.
- **Editorial Serif & Paper Sheet Tactility**: Selected an editorial serif font for titles and subtle paper-sheet styling for the input card, amplifying the "Notice Paper" identity without distracting from readability.
- **Explicit Third-Party AI Data Notice**: Clarified transparently that while Notice Paper retains no data, third-party AI infrastructure operates under its own policies, reinforcing responsible user disclosure.
- **Visual Prototype as Reference Only**: Clarified that existing prototypes from other tools serve as inspirational mood references rather than rigid implementation constraints.

---

## What We're Building (Proof of Concept)
- Fully responsive web UI with paper atmosphere (editorial serif headings + paper-sheet input container) and 60/30/10 palette.
- Above-the-fold desktop layout.
- English UI by default, dynamically switchable to Bahasa Indonesia.
- Interface counter locale formatting (`10,000 characters` EN / `10.000 karakter` ID).
- Verbatim extraction of amounts, currency symbols, and deadlines without currency conversion.
- English text paste input with validation (empty, <15 words, >10,000 chars).
- "Try sample letter" button with preloaded overdue utility bill sample.
- Grounded AI processing extracting:
  - Exact deadline & amount match (verbatim)
  - Plain language summary
  - Consequences
  - Up to 3 next action steps
  - Uncertainty markers
- Robust handling of edge states: Loading skeleton, Non-English input, Not an Official Letter, Network error, Service busy.
- Transparent privacy notice highlighting third-party AI processing and legal/financial disclaimer.

---

## Deferred From the POC
- **PDF & Image File Upload**: Kept out to eliminate file parsing / upload middleware complexity.
- **OCR (Optical Character Recognition)**: Deferred to avoid image pre-processing and OCR inaccuracies.
- **Multi-language input**: Input letters limited to English for this PoC.
- **Currency conversion / Exchange rates**: Kept out to prevent financial inaccuracy.
- **Client-side saved history / Bookmark letters**: Kept out to avoid local storage privacy concerns.

---

## Possible Later Enhancements
- One-click "Add to Google Calendar" button for the extracted deadline.
- Offline camera scanner on mobile devices.
- Audio readout (text-to-speech) of the explanation for accessibility.

---

## Non-Goals
- **Does NOT provide legal or financial advice**: Strictly an aid for plain-language comprehension.
- **Does NOT convert or reformat currencies**: Never converts between currencies or modifies monetary symbols.
- **Does NOT persist, store, or log user mail in an app database**: Operates without a database or tracking layer.
- **Does NOT attempt to invent missing facts**: Relies strictly on what is stated in the letter and highlights ambiguities.
- **Does NOT implement user authentication or accounts**: Open, immediate proof of concept.

---

## Open Questions
- *None blocking spec*: All functional flows, layout constraints, paper aesthetics, verbatim amount rules, and third-party AI privacy disclaimers are fully resolved.
