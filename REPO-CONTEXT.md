# REPO-CONTEXT — references

## Purpose
Repository-agnostic how-to instructions for activities that need to be done regularly but not often, kept for future reference (e.g. setting up a self-hosted runner, CI/CD walkthroughs).

## Tech stack
- Node.js (used only for the wiki-publish script)

## Run / build / test
- `npm run wiki:publish` — publish `docs/wiki/**` to the GitHub wiki via `docs/scaffold-wiki.js`

## Deployment
Wiki published automatically by GitHub Actions (`.github/workflows/publish-wiki.yml`) on push to `main`, using repository secrets `WIKI_PUSH_USERNAME` and `WIKI_PUSH_PAT`.

## Relationships
- Source of the ops/wiki docs (CI/CD steps, troubleshooting) referenced by the NextTime notes.
- One of the four active repos in the multi-repo workspace (see the matching `.code-workspace` file).
