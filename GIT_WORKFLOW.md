git checkout develop
git pull origin develop
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
git pull origin develop
git add <resolved-files>
git commit -m "Resolve merge conflicts"
git branch
git status
git log --oneline
git reset --soft HEAD~1
git checkout -- <file>
git diff
git stash
git stash pop
git branch -m old-name new-name
git log --oneline  # Note the commit hash
git checkout correct-branch
git cherry-pick <commit-hash>
git checkout wrong-branch
git reset --hard HEAD~1
git reset --hard HEAD~1
# Git Workflow (Quick Guide)

Follow this plan so everyone stays in sync.

## Branch strategy

- `main` → production-ready, protected
- `develop` → integrates approved work
- Feature branches → `feature/<short-name>` (or `bugfix/`, `hotfix/`)

## First-time repo setup (creator)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <repo-url>
git branch -M main
git push -u origin main
git checkout -b develop
git push -u origin develop
```

Teammates clone with `git clone <repo-url>`.

## Daily workflow

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<name>   # or switch to existing branch
```

Make changes, then:

```bash
git status
git add <files>
git commit -m "Feature: <summary>"
git push -u origin feature/<name>
```

Before pushing, always run tests/linting relevant to your changes.

## Pull requests

1. Push the feature branch.
2. Open PR `develop ← feature/<name>`.
3. Write a clear summary, link issues, request reviewers.
4. Address feedback, re-push if needed.
5. Reviewer merges (no self-merge unless urgent).

After merge:

```bash
git checkout develop
git pull origin develop
git branch -d feature/<name>                # local cleanup
git push origin --delete feature/<name>     # remote cleanup
```

## Conflict handling

```bash
git pull origin develop          # triggers conflicts
# Edit files, resolve markers <<<<< ===== >>>>>
git add <resolved-files>
git commit -m "Resolve merge conflicts"
```

Prevent conflicts by pulling daily and communicating when touching shared files.

## Good habits

- Small, focused commits with clear messages.
- Never commit to `main` or `develop` directly.
- Keep `package-lock.json` changes when dependencies change.
- Don’t force-push shared branches.
- Use `.env` (never commit secrets).
- Open GitHub issues for bugs/features to track work.

## Quick reference

```bash
git status           # current changes
git branch           # local branches
git switch <branch>  # change branch
git log --oneline    # recent commits
git diff             # inspect changes
git stash            # temporarily store changes
```

## Need help?

- Mist commit to wrong branch? Use `git cherry-pick` onto the right branch, then reset the wrong one: `git reset --hard HEAD~1`.
- Want to undo last commit but keep changes? `git reset --soft HEAD~1`.
- Unsure who reviews? Ask in team chat or tag in the PR.

Stick to this flow and merging stays painless.

