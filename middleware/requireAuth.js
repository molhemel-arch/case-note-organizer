// middleware/requireAuth.js
// "Middleware" = a function that runs before your route handler.
// This one checks: did the request include a valid login token?
// If yes, it lets the request continue. If no, it stops it with a 401 error.

const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // expected format: "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId; // attach the logged-in user's id for later use
    next(); // continue to the actual route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = requireAuth;
