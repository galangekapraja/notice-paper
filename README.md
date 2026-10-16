# Notice Paper

> A calm, plain-language interpreter for intimidating official letters and bills.

Notice Paper transforms complex, legalistic, or stressful official correspondence (such as overdue utility bills, administrative notices, and compliance warnings) into clear, reassuring answers to the core human question: *"What do I need to do?"*

---

## Key Features

- **Grounded Interpretation**: Directly extracts final balance due, deadline date, plain summary, consequences of inaction, and up to 3 next action steps.
- **Bilingual Interface**: Toggle effortlessly between Simple English and Bahasa Indonesia.
- **Privacy & Ephemeral Processing**: In-memory analysis with zero logging of letter text or sensitive contents to disk or terminal.
- **Prompt Injection Defense**: Passive data boundaries (`<letter_document>`) and tag sanitization designed to reduce the risk of prompt hijacking.
- **Transparent Verification**: Clear status badges indicating whether amounts and dates were verified directly in the letter text.

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/) (free tier supported)

### 2. Installation

Clone or open the repository, then install dependencies:

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Open `.env` in your text editor and provide your Gemini API key:

```ini
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
PORT=3000
```

#### Selecting or Changing the Gemini Model

The `GEMINI_MODEL` setting in `.env` is fully dynamic:
- **Default free-tier model**: `gemini-3.5-flash-lite` (fast, cost-effective, high free-tier rate allowance).
- **Supported alternatives**: You can change this value in `.env` to any valid Gemini model (e.g. `gemini-3.6-flash` or `gemini-3.8-flash`) without altering `server.js`.
- If Google updates model versions or deprecates older versions, simply update the `GEMINI_MODEL` line in your `.env` and restart the server.

### 4. Running the Application

Start the local server:

```bash
npm start
```

Open your browser and navigate to:
```text
http://localhost:3000
```

---

## Free Tier Notes & Quota Handling

- Notice Paper is designed to work seamlessly with the **Google AI Studio Free Tier**.
- For prototyping, models like `gemini-3.5-flash-lite`, `gemini-3.6-flash`, and `gemini-3.8-flash` provide free access within Google's Requests Per Minute (RPM) and Requests Per Day (RPD) quotas.
- If you hit temporary rate limits, the UI alerts you cleanly with a friendly prompt to wait a few seconds, rather than failing silently.
- Configuration errors (such as an invalid API key, missing model, or zero free quota allocation) are cleanly distinguished from temporary busy states.

---

## License

This project is licensed under the [MIT License](LICENSE).
