# Wiki Automation Checklist

Use this checklist to automate publishing your wiki from repository source files.

## Goal

Automatically update the GitHub wiki when wiki source files in this repository change.

## Checklist

- [ ] [Finalize upfront decisions](https://github.com/annetastic-personal/references/wiki/step-00-upfront-decisions)
  - Define branch and path trigger scope
  - Choose authentication method
  - Confirm decision rationale before implementation

- [ ] [Add required repository secrets](https://github.com/annetastic-personal/references/wiki/step-01-add-required-repository-secrets)
  - Add all credentials used by the scaffold process
  - Ensure secret names match what the script expects

- [ ] [Prepare workflow runtime](https://github.com/annetastic-personal/references/wiki/step-02-prepare-workflow-runtime)
  - Set up Node runtime in GitHub Actions
  - Install dependencies required by the scaffold script

- [ ] [Execute wiki publish step in CI](https://github.com/annetastic-personal/references/wiki/step-03-execute-wiki-publish-step-in-ci)
  - Run scaffold process from workflow
  - Confirm it can clone, update, and push wiki pages

- [ ] [Make runs idempotent](https://github.com/annetastic-personal/references/wiki/step-04-make-runs-idempotent)
  - Handle no-change runs without failing
  - Skip commit/push when content is unchanged

- [ ] [Validate end-to-end](https://github.com/annetastic-personal/references/wiki/step-05-validate-end-to-end)
  - Update a wiki source file in repo
  - Push to `main`
  - Confirm workflow succeeds and wiki updates

- [ ] [Harden and operationalize](https://github.com/annetastic-personal/references/wiki/step-06-harden-and-operationalize)
  - Keep token permissions least-privilege
  - Keep path and branch filters tight
  - Add manual dispatch for emergency reruns

- [ ] [Document fallback process](https://github.com/annetastic-personal/references/wiki/step-07-document-fallback-process)
  - Keep a manual wiki publish path documented
  - Define what to do if automation fails

## Status Notes

- Current state: manual scaffold process exists
- Next milestone: first successful automated wiki publish run
