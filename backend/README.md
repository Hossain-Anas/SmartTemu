# SmartTemu Backend

Express + MongoDB API for SmartTemu.

## Getting Started

1. Install exact dependencies
   ```bash
   npm ci
   ```

2. Prepare environment variables
   ```bash
   cp .env.example .env        # macOS/Linux
   copy .env.example .env      # Windows (PowerShell/CMD)
   ```
   Fill in every value before running the server.

3. Start the API
   ```bash
   npm run dev
   ```

## Structure Overview

- `src/config/` – database, cloudinary, stripe, email configs
- `src/models/` – Mongoose schemas
- `src/controllers/` – business logic
- `src/routes/` – route definitions
- `src/middleware/` – auth, validation, errors, rate limiting
- `src/services/` – email, payments, inventory helpers
- `src/ai/` – semantic search, recommendations, sentiment analysis, chatbot
- `src/utils/` – shared helpers and constants
- `src/validators/` – request validation

## Dev Notes

- Use MongoDB 8.x locally (`mongod --version`).
- Keep `package-lock.json` committed.
- Add new env keys to `.env.example` when required.

