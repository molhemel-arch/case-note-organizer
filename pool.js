// db/pool.js
// A "pool" is a set of reusable database connections.
// Instead of opening/closing a connection for every request (slow),
// we keep a small pool open and borrow a connection when we need one.

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
