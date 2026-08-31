// routes/cases.js
// Handles creating and listing cases. Every route here requires a valid login
// (enforced by requireAuth middleware, applied in server.js).

const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

// GET /api/cases
// Returns all cases belonging to the logged-in user.
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cases WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId] // req.userId was attached by requireAuth middleware
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// POST /api/cases
// Creates a new case for the logged-in user.
router.post('/', async (req, res) => {
  const { client_name, case_type, status, date_opened } = req.body;

  if (!client_name) {
    return res.status(400).json({ error: 'client_name is required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO cases (user_id, client_name, case_type, status, date_opened)
       VALUES ($1, $2, $3, COALESCE($4, 'open'), COALESCE($5, CURRENT_DATE))
       RETURNING *`,
      [req.userId, client_name, case_type, status, date_opened]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// PATCH /api/cases/:id
// Updates a case (e.g. changing status from "open" to "closed").
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { client_name, case_type, status } = req.body;

  try {
    // We check user_id = $X too, so users can't edit each other's cases.
    const result = await pool.query(
      `UPDATE cases
       SET client_name = COALESCE($1, client_name),
           case_type = COALESCE($2, case_type),
           status = COALESCE($3, status)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [client_name, case_type, status, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
