# SmartTemu – MERN + AI

SmartTemu is a MERN e-commerce platform with AI search, recommendations, chatbot support, and review insights.

## Quick Start

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```

2. **Match Node.js** (requires nvm)
   ```bash
   nvm install
   nvm use
   ```

3. **Install dependencies exactly**
   ```bash
   cd backend && npm ci && cd ..
   cd frontend && npm ci && cd ..
   ```

4. **Create environment files**
   ```bash
   cd backend   && cp .env.example .env
   cd ../frontend && cp .env.example .env
   ```
   Fill in the values shown in the examples before running the app.

5. **Run the servers** (two terminals)
   ```bash
   cd backend  && npm run dev
   cd frontend && npm run dev
   ```

## Need-to-Know

- Always use `npm ci` so everyone shares the same dependency versions.
- Never commit `.env` files; only update the `.env.example` templates.
- See `TEAM_SETUP.md` for first-time machine setup (Node, MongoDB, Git).
- Follow `GIT_WORKFLOW.md` for branching, PRs, and reviews.

## Project Layout

```
backend/   Express API + AI services
frontend/  React app
docs/      Architecture & reference docs
scripts/   Utility scripts
```

More detail: `PROJECT_STRUCTURE.md` and `VERSIONS.md`.

