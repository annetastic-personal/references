# Step 04 Sample: Make Runs Idempotent

Worked example for the `references` repository.

## Related Template

- [Generic Step 04 Template](../wiki-automation-steps/step-04-make-runs-idempotent.md)
- [Back to checklist](../Wiki-Automation-Checklist.md)

## Context

This example shows how no-change runs were handled so wiki publish workflow executions stay successful even when source content is unchanged.

## Notes

- Date: 2026-04-25
- No-change strategy: stage changes, then inspect git status before commit.
- Commit guard approach: if `status.files.length === 0`, log and exit without commit/push.
- Why this approach: avoids empty-commit failures and keeps repeated runs clean.

## Actions Taken

1. Updated `docs/scaffold-wiki.js` to check `wikiGit.status()` after `wikiGit.add(".")`.
2. Added a no-op branch that logs `No wiki changes to publish.` and returns successfully.
3. Left commit/push path unchanged for runs with actual content changes.

## Validation Targets

- No-change runs end with success.
- No empty commit is created.
- Logs clearly indicate no-change behavior.

## Final Chosen Values

- Guard condition: `status.files.length === 0`
- No-change message: `No wiki changes to publish.`
- Behavior: return success without commit/push

## Notes for Reuse

- Place idempotency checks in the script so behavior is consistent across local and CI usage.
- Keep the no-change path explicit and readable in logs for easier troubleshooting.
