# Step 03 Sample: Execute Wiki Publish Step in CI

Worked example for the `references` repository.

## Related Template

- [Generic Step 03 Template](../wiki-automation-steps/step-03-execute-wiki-publish-step-in-ci.md)
- [Back to checklist](../Wiki-Automation-Checklist.md)

## Context

This example shows the actual GitHub Actions workflow used to publish wiki updates for `odomaf/references`.

## Notes

- Date: 2026-04-25
- Workflow file path: `.github/workflows/publish-wiki.yml`
- Trigger scope:
  - Branch: `main`
  - Paths:
    - `docs/wiki/**`
    - `docs/scaffold-wiki.js`
    - `package.json`
    - `package-lock.json`
    - `.github/workflows/publish-wiki.yml`
- Manual trigger: `workflow_dispatch` enabled
- Publish command used: `npm run wiki:publish`
- Secret mapping used:
  - `WIKI_PUSH_USERNAME` -> `${{ secrets.WIKI_PUSH_USERNAME }}`
  - `WIKI_PUSH_PAT` -> `${{ secrets.WIKI_PUSH_PAT }}`

## Actions Taken

1. Created `.github/workflows/publish-wiki.yml`.
2. Added steps for checkout, Node 20 setup, dependency install via `npm ci`, and publish command execution.
3. Added runtime-related paths to trigger list so dependency/runtime changes also run publish workflow.

## Validation Targets

- Workflow triggers on wiki source changes.
- Workflow triggers on runtime file changes.
- Workflow can be run manually through `workflow_dispatch`.
- Publish step executes with secrets injected through environment variables.

## Final Chosen Values

- Runner: `ubuntu-latest`
- Node version: `20`
- Install command: `npm ci`
- Publish command: `npm run wiki:publish`

## Notes for Reuse

- Keep trigger paths tightly scoped but include runtime dependencies that can affect publish behavior.
- Use explicit env mapping in the publish step to make secret usage obvious.
