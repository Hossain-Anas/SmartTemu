# Version Snapshot

Keep these versions in sync across the team.

## Runtime

| Tool    | Version  | How to check | Notes |
|---------|----------|--------------|-------|
| Node.js | 18.19.0  | `node --version` | Managed by `.nvmrc` + nvm |
| npm     | 10.2.x   | `npm --version`  | Ships with Node 18 |
| MongoDB | 8.2.x    | `mongod --version` | Community Server |

## Dependencies

- Backend: lock file `backend/package-lock.json`
- Frontend: lock file `frontend/package-lock.json`
- Install with `npm ci` (never `npm install` unless adding/removing a package).
- Always commit lock files; do not delete them.

## Verification checklist

```bash
node --version      # should be 18.19.0
npm --version       # 10.x
mongod --version    # 8.x
```

## Updating versions

1. Discuss the change with the team.
2. Update `.nvmrc`, docs, and lock files as needed.
3. Run tests locally.
4. Open a PR describing the version change.
5. After merge, everyone runs `npm ci` again.

See `TEAM_SETUP.md` for full setup steps.

