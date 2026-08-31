// server.js
// This is the entry point - running `node server.js` starts everything.

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const caseRoutes = require('./routes/cases');
const noteRoutes = require('./routes/notes');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(cors());          // allow the React app to call this API
app.use(express.json());  // parse incoming JSON request bodies

app.use('/api/auth', authRoutes); // no auth required - this IS the login

// requireAuth runs before every route below - you must be logged in to reach them
app.use('/api/cases', requireAuth, caseRoutes);
app.use('/api/notes', requireAuth, noteRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'Case Organizer API is running.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
