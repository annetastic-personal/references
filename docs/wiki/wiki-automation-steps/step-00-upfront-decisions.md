# Step 00: Upfront Decisions

## Checklist Link

- [Back to checklist](../Wiki-Automation-Checklist.md)

## Objective

Capture all non-action decisions before implementation starts.

Worked example: [Step 00 Sample](../wiki-automation-samples/step-00-upfront-decisions-sample.md)

## Decision A: Trigger Scope

### Notes

- Date:
- Decision summary: Run wiki automation only for wiki-related source changes on the default deployment branch.
- Branch trigger: `<DEPLOY_BRANCH>` (for example: `main`)
- Path filters: `<WIKI_SOURCE_PATHS>` (for example: `docs/wiki/**`, `docs/scaffold-wiki.js`)
- Why this approach: Avoid unnecessary runs and limit wiki publishing to intentional documentation changes.

### Validation

- [ ] Trigger behavior confirmed
- [ ] Non-wiki changes do not trigger run

## Decision B: Authentication Method

PAT setup guide: [PAT Instructions](../PAT-Instructions.md)

### Notes

- Date:
- Chosen method: GitHub Actions authenticates to the wiki using a fine-grained PAT stored in repository secrets.
- Token type: Fine-grained Personal Access Token (machine credential dedicated to wiki publishing).
- Permission scope:
  - Repository access: only `<OWNER>/<TARGET_REPO>`
  - Repository permissions: Contents (Read and write)
- Why this approach:
  - Works reliably for pushing to the separate .wiki.git repository over HTTPS.
  - Keeps permissions narrow to one repo and one purpose.
  - Keeps credentials out of source code and local-only config.

### Validation

- [ ] Authentication method selected
- [ ] Permissions are least-privilege
- [ ] PAT can push to `<OWNER>/<TARGET_REPO>.wiki.git` from workflow run

## Open Questions

- None currently.
