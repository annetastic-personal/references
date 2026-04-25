# Step 04: Make Runs Idempotent

## Checklist Link

- [Back to checklist](../Wiki-Automation-Checklist.md)

## Objective

Ensure the workflow handles no-change runs safely without failing.

Worked example: [Step 04 Sample](../wiki-automation-samples/step-04-make-runs-idempotent-sample.md)

## Notes

- Date:
- No-change strategy: detect whether staged changes exist before commit/push.
- Commit guard approach: compute git status after add; skip commit and push when no files changed.
- Why this approach: keep scheduled or repeated workflow runs green when wiki content has not changed.

## Common Reminders

- Idempotency should be handled in the publish script, not only in workflow shell commands.
- Keep no-change runs as successful exits, not failures.
- Emit a clear log line such as "No wiki changes to publish." to make run output understandable.

## Actions Taken

1. Stage wiki output changes in the cloned `.wiki` repository.
2. Check repository status after staging.
3. Skip commit/push when there are no staged changes.

## Validation

- [ ] No-change run exits cleanly
- [ ] No empty commit is pushed
- [ ] Logs clearly indicate no-change outcome

## Open Questions

-
