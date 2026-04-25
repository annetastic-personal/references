# Wiki Automation Checklist

Use this checklist to automate publishing your wiki from repository source files.

## Goal

Automatically update the GitHub wiki when wiki source files in this repository change.

## Checklist

- [ ] [Define trigger scope](wiki-automation-steps/step-01-define-trigger-scope.md)
  - Run workflow on pushes to `main`
  - Restrict to wiki-related file paths only

- [ ] [Choose authentication method](wiki-automation-steps/step-02-choose-authentication-method.md)
  - Use a fine-grained PAT with minimum required permissions
  - Confirm token can push to the repository wiki

- [ ] [Add required repository secrets](wiki-automation-steps/step-03-add-required-repository-secrets.md)
  - Add all credentials used by the scaffold process
  - Ensure secret names match what the script expects

- [ ] [Prepare workflow runtime](wiki-automation-steps/step-04-prepare-workflow-runtime.md)
  - Set up Node runtime in GitHub Actions
  - Install dependencies required by the scaffold script

- [ ] [Execute wiki publish step in CI](wiki-automation-steps/step-05-execute-wiki-publish-step-in-ci.md)
  - Run scaffold process from workflow
  - Confirm it can clone, update, and push wiki pages

- [ ] [Make runs idempotent](wiki-automation-steps/step-06-make-runs-idempotent.md)
  - Handle no-change runs without failing
  - Skip commit/push when content is unchanged

- [ ] [Validate end-to-end](wiki-automation-steps/step-07-validate-end-to-end.md)
  - Update a wiki source file in repo
  - Push to `main`
  - Confirm workflow succeeds and wiki updates

- [ ] [Harden and operationalize](wiki-automation-steps/step-08-harden-and-operationalize.md)
  - Keep token permissions least-privilege
  - Keep path and branch filters tight
  - Add manual dispatch for emergency reruns

- [ ] [Document fallback process](wiki-automation-steps/step-09-document-fallback-process.md)
  - Keep a manual wiki publish path documented
  - Define what to do if automation fails

## Status Notes

- Current state: manual scaffold process exists
- Next milestone: first successful automated wiki publish run
