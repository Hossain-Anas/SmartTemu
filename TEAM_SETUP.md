git push
npm install
npm install
git add backend/package-lock.json frontend/package-lock.json
git commit -m "Lock dependency versions"
git push
git pull origin main
git commit -m "Add environment variable templates"
git push
# SmartTemu Team Setup (Quick Guide)

Use this checklist when setting up (or rebuilding) your environment.

## 1. Install prerequisites

1. **nvm**
   - Windows: <https://github.com/coreybutler/nvm-windows/releases>
   - macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
   - Restart the terminal after installing.
2. **MongoDB Community Server 8.x** – <https://www.mongodb.com/try/download/community>
   - Verify: `mongod --version`
3. **Git** – <https://git-scm.com/downloads>

## 2. Clone & match Node.js

```bash
git clone <repo-url>
cd <project-folder>
nvm install     # reads .nvmrc (18.19.0)
nvm use
node --version
```

## 3. Install dependencies (exact versions)

```bash
cd backend  && npm ci
cd ../frontend && npm ci
cd ..
```

Always commit the generated `package-lock.json` files and avoid `npm install` unless you are adding a new dependency on purpose.

## 4. Configure environment variables

```bash
cd backend   && cp .env.example .env    # macOS/Linux
cd backend   && copy .env.example .env  # Windows (PowerShell/CMD)

# Fill in values, then repeat for frontend.
```

Never commit `.env` files. Update the `.env.example` template when new keys are needed.

## 5. Verify everything

```bash
node --version        # 18.19.0
npm --version         # 10.x (comes with Node 18)
mongod --version      # 8.x
ls backend/node_modules
ls frontend/node_modules
```

## 6. Daily routine

```bash
git pull origin develop
cd backend  && npm ci
cd ../frontend && npm ci
```

Use `npm ci` whenever `package-lock.json` changes.

## 7. Start developing

```bash
# Terminal A
cd backend  && npm run dev

# Terminal B
cd frontend && npm start
```

## Troubleshooting cheatsheet

- `nvm: command not found` → reinstall nvm or reopen the terminal.
- Wrong Node version → run `nvm use` or `nvm alias default 18.19.0`.
- `npm ci` fails → delete `node_modules` and retry; confirm `package-lock.json` is committed.
- Env variables missing → ensure `.env` was created from `.env.example`.

## Updating versions

Discuss with the team before changing Node, MongoDB, or dependency versions. Update docs and `.nvmrc` as needed, commit the lock files, and notify everyone to run `npm ci`.

All set! Review `README.md` and `GIT_WORKFLOW.md` for project and Git conventions.