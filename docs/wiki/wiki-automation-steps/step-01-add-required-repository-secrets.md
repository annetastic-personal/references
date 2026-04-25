# Step 01: Add Required Repository Secrets

## Checklist Link

- [Back to checklist](../Wiki-Automation-Checklist.md)

## Objective

Add and verify all repository secrets required by the wiki scaffold process.

Worked example: [Step 01 Sample](../wiki-automation-samples/step-01-add-required-repository-secrets-sample.md)

## Notes

- Date:
- Secrets added: `<USERNAME_SECRET_NAME>`, `<TOKEN_SECRET_NAME>`
- Naming convention: Use a purpose-specific prefix (for example: `WIKI_*`). Avoid `GITHUB_*` because GitHub reserves that prefix for internal use.
- Rotation considerations: Rotate `<TOKEN_SECRET_NAME>` periodically and immediately update the repository secret value after rotation.

## Actions Taken

1. Generated a fine-grained PAT with repository access limited to `<OWNER>/<TARGET_REPO>`.
2. Added repository secret `<USERNAME_SECRET_NAME>` with GitHub username value.
3. Added repository secret `<TOKEN_SECRET_NAME>` with PAT value.

## Validation

- [ ] Secret names match script expectations
- [ ] Secrets are readable by workflow

## Open Questions

-
