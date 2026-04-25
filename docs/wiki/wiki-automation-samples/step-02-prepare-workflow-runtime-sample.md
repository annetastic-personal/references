# Step 02 Sample: Prepare Workflow Runtime

Worked example for the `references` repository.

## Related Template

- [Generic Step 02 Template](../wiki-automation-steps/step-02-prepare-workflow-runtime.md)
- [Back to checklist](../Wiki-Automation-Checklist.md)

## Context

This example shows the actual runtime setup used to make the wiki scaffold script runnable in the `odomaf/references` repository.

## Notes

- Date: 2026-04-25
- Node version selected: `20`
- Dependency install method:
  - Local setup: `npm install`
  - CI target: `npm ci`
- Why this approach: Node 20 is current and well-supported in GitHub Actions, and `npm` is the simplest match for this small script-based repository.

## Actions Taken

1. Added a `package.json` with `type: module`, a `wiki:publish` script, and the required dependencies: `dotenv`, `fs-extra`, and `simple-git`.
2. Updated `docs/scaffold-wiki.js` to read `WIKI_PUSH_USERNAME` and `WIKI_PUSH_PAT` instead of the reserved `GITHUB_*` names.
3. Changed the scaffold script to clone the wiki into `docs/.wiki-build` instead of `docs/wiki`, keeping the source content and temporary clone separate.
4. Added `.gitignore` entries for `node_modules/` and `docs/.wiki-build/`.
5. Installed dependencies and validated the script syntax with Node.

## Validation Targets

- Runtime dependencies install without errors.
- The scaffold script parses successfully under the selected Node version.
- The script reads the same environment variable names that the repository secrets use.
- The temporary wiki clone directory does not overlap with the source wiki directory.

## Final Chosen Values

- Node version: `20`
- Package manager: `npm`
- Publish script: `npm run wiki:publish`
- Source directory: `docs/wiki`
- Temporary clone directory: `docs/.wiki-build`
- Environment variables used by script:
  - `WIKI_PUSH_USERNAME`
  - `WIKI_PUSH_PAT`

## Notes for Reuse

- Keep the runtime minimal unless the scaffold process truly needs more tooling.
- Match your script env vars to your secret names before wiring the GitHub Action.
- Never clone the `.wiki` repository into the same folder that stores your source markdown files.
