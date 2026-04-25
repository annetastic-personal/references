# Step 03: Execute Wiki Publish Step in CI

## Checklist Link

- [Back to checklist](../Wiki-Automation-Checklist.md)

## Objective

Run the scaffold process in CI and push updated wiki pages.

Worked example: [Step 03 Sample](../wiki-automation-samples/step-03-execute-wiki-publish-step-in-ci-sample.md)

## Notes

- Date:
- Workflow file path: `<WORKFLOW_FILE_PATH>` (for example: `.github/workflows/publish-wiki.yml`)
- Trigger scope: `<TRIGGER_BRANCH_AND_PATHS>`
- Publish command used: `<PUBLISH_COMMAND>` (for example: `npm run wiki:publish`)
- Secret mapping used: `<SECRET_ENV_MAPPING>`
- Commit behavior: publish step should push updates to `<OWNER>/<TARGET_REPO>.wiki.git`

## Common Reminders

- Include runtime-related paths (for example `package.json` and lockfile) in workflow triggers if runtime changes can affect publishing.
- Include `workflow_dispatch` so you can rerun manually.
- Keep secret names in workflow env aligned with script environment variable names.

## Actions Taken

1. Create a workflow file under `.github/workflows/` for wiki publishing.
2. Configure branch/path triggers and optional manual dispatch.
3. Add steps for checkout, Node setup, dependency install, and wiki publish command.

## Validation

- [ ] CI clones wiki repo
- [ ] CI writes Home.md
- [ ] CI pushes changes
- [ ] Manual dispatch run succeeds

## Open Questions

-
