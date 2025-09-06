// Simple local server to avoid CORS issues
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('📁 Serving files from:', __dirname);
  console.log('🌐 Open http://localhost:3000 in your browser');
});
