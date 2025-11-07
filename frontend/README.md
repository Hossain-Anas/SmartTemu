# SmartTemu Frontend

React UI for SmartTemu.

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
   Add your API base URL and other keys.

3. Start the dev server
   ```bash
   npm start
   ```

## Structure Overview

- `src/components/` – shared UI pieces grouped by feature (common, product, cart, checkout, review, ai, admin)
- `src/pages/` – route-level pages
- `src/context/` – global state providers
- `src/hooks/` – custom hooks
- `src/services/` – API clients (Axios/Fetch wrappers)
- `src/utils/` – helpers/constants
- `src/styles/` – global styles / Tailwind config
- `src/assets/` – static media

## Dev Notes

- Match the backend URL via `REACT_APP_API_URL` in `.env`.
- Keep `package-lock.json` committed.
- Update `.env.example` when new variables are needed.

