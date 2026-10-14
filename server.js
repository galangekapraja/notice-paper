const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Parsing
app.use(express.json({ limit: '50kb' }));

// Serve static frontend assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Notice Paper' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Notice Paper server running at http://localhost:${PORT}`);
});
