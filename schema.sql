-- Legal Case Note Organizer — Database Schema
-- Run this once against your PostgreSQL database to create the tables.

-- Users: whoever logs in to use the app (just you, for now)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cases: one row per client matter
CREATE TABLE cases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  case_type VARCHAR(100),        -- e.g. "Housing", "Employment", "Family"
  status VARCHAR(50) DEFAULT 'open',  -- open, closed, pending
  date_opened DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notes: many notes belong to one case
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  tags VARCHAR(255),             -- comma-separated for now, e.g. "urgent,followup"
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index to make searching notes by content fast
CREATE INDEX idx_notes_content ON notes USING GIN (to_tsvector('english', content));
