# Case Organizer — Backend

## What this is
API server for a legal case-note organizer. Handles login and (soon) cases/notes.

## Setup (do this on your own machine, not in chat)

1. **Install Node.js** if you don't have it: https://nodejs.org (LTS version)

2. **Get a free PostgreSQL database.** Easiest option: https://supabase.com
   - Create a free project
   - In their dashboard, find "Connection string" (URI format) — copy it

3. **Install dependencies:**
   ```
   cd backend
   npm install
   ```

4. **Set up your environment file:**
   ```
   cp .env.example .env
   ```
   Open `.env` and paste in your real DATABASE_URL from Supabase.
   For JWT_SECRET, type any long random string (e.g. mash your keyboard).

5. **Create the tables.** In Supabase, go to the SQL Editor, paste the contents
   of `db/schema.sql`, and run it.

6. **Start the server:**
   ```
   npm run dev
   ```
   You should see: `Server running on http://localhost:4000`

7. **Test it works.** Using a tool like Postman, or even curl:
   ```
   curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test1234"}'
   ```
   You should get back a user object. If you do — auth is working.

## Next step
Once this runs and you understand what each file does, come back and we'll
build the cases and notes endpoints together.
