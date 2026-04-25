# Step 00 Sample: Upfront Decisions

Worked example for the `references` repository.

## Related Template

- [Generic Step 00 Template](../wiki-automation-steps/step-00-upfront-decisions.md)
- [Back to checklist](../Wiki-Automation-Checklist.md)

## Context

This example shows the actual upfront decisions used to set up wiki automation for the `odomaf/references` repository.

## Decision A: Trigger Scope

### Notes

- Date: 2026-04-25
- Decision summary: Run wiki automation only for wiki-related source changes on the default deployment branch.
- Branch trigger: `main`
- Path filters:
  - `docs/wiki/**`
  - `docs/scaffold-wiki.js`
- Why this approach: Avoid unnecessary runs and limit wiki publishing to intentional documentation changes.

### Validation Targets

- Wiki-related change should trigger the workflow.
- Non-wiki change should not trigger the workflow.

## Decision B: Authentication Method

- PAT setup guide: [PAT Instructions](../PAT-Instructions.md)

### Notes

- Date: 2026-04-25
- Chosen method: GitHub Actions authenticates to the wiki using a fine-grained PAT stored in repository secrets.
- Token type: Fine-grained Personal Access Token used only for wiki publishing.
- Permission scope:
  - Repository access: only `odomaf/references`
  - Repository permissions: `Contents: Read and write`
- Secret names used:
  - `WIKI_PUSH_USERNAME`
  - `WIKI_PUSH_PAT`
- Why this approach:
  - Works reliably for pushing to the separate `.wiki.git` repository over HTTPS.
  - Keeps permissions narrow to one repo and one purpose.
  - Keeps credentials out of source code and local-only config.

### Validation Targets

- Authentication method selected.
- Permissions are least-privilege.
- PAT can push to `references.wiki.git` from a workflow run.

## Final Chosen Values

- Deployment branch: `main`
- Wiki source paths:
  - `docs/wiki/**`
  - `docs/scaffold-wiki.js`
- Username secret: `WIKI_PUSH_USERNAME`
- Token secret: `WIKI_PUSH_PAT`

## Notes for Reuse

- Keep the decision structure, but replace repo names, branch names, and secret names for the next project.
- Never store the PAT value itself in the sample.
