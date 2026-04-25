# Step 01 Sample: Add Required Repository Secrets

Worked example for the `references` repository.

## Related Template

- [Generic Step 01 Template](../wiki-automation-steps/step-01-add-required-repository-secrets.md)
- [Back to checklist](../Wiki-Automation-Checklist.md)

## Context

This example shows the actual repository secrets used to support wiki automation for the `odomaf/references` repository.

## Notes

- Date: 2026-04-25
- Secrets added:
  - `WIKI_PUSH_USERNAME`
  - `WIKI_PUSH_PAT`
- Naming convention: Use a `WIKI_*` prefix for wiki-publishing credentials. Avoid `GITHUB_*` because GitHub reserves that prefix.
- Rotation considerations: Rotate `WIKI_PUSH_PAT` periodically and update the repository secret value immediately after rotation.

## Actions Taken

1. Generated a fine-grained PAT with repository access limited to `odomaf/references`.
2. Added repository secret `WIKI_PUSH_USERNAME` with GitHub username value.
3. Added repository secret `WIKI_PUSH_PAT` with PAT value.

## Validation Targets

- Secret names match what the automation script expects.
- Secrets are available to the GitHub Actions workflow.
- PAT value itself is never stored in repository files.

## Final Chosen Values

- Target repository: `odomaf/references`
- Username secret name: `WIKI_PUSH_USERNAME`
- Token secret name: `WIKI_PUSH_PAT`
- PAT repository permission: `Contents: Read and write`

## Notes for Reuse

- Keep the structure, but replace the repo name and secret names as needed for the next project.
- Never include the PAT value itself in the sample.
- If your project uses a different naming convention, reflect that both in secrets and in the scaffold script.
