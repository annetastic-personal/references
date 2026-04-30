# References Wiki

A collection of processes, patterns, and practices I've learned and want to refer to later.

## Processes

### Wiki CI/CD with Scaffolding

Use this process to publish wiki content from repository-managed markdown files under `docs/wiki/` to the GitHub wiki. The scaffold script at [docs/scaffold-wiki.js](https://github.com/odomaf/references/blob/main/docs/scaffold-wiki.js) is prepared in Step 02 and executed by CI in Step 03 when relevant changes are pushed to `main`.

- [Wiki Automation Checklist](Wiki-Automation-Checklist)
- [Step 00: Upfront Decisions](wiki-automation-steps/step-00-upfront-decisions.md)
- [Step 01: Add Required Repository Secrets](wiki-automation-steps/step-01-add-required-repository-secrets.md)
- [Step 02: Prepare Workflow Runtime](wiki-automation-steps/step-02-prepare-workflow-runtime.md)
- [Step 03: Execute Wiki Publish Step in CI](wiki-automation-steps/step-03-execute-wiki-publish-step-in-ci.md)
- [Step 04: Make Runs Idempotent](wiki-automation-steps/step-04-make-runs-idempotent.md)
- [Step 05: Validate End-to-End](wiki-automation-steps/step-05-validate-end-to-end.md)
- [Step 06: Harden and Operationalize](wiki-automation-steps/step-06-harden-and-operationalize.md)
- [Step 07: Document Fallback Process](wiki-automation-steps/step-07-document-fallback-process.md)

---

[Repository](https://github.com/odomaf/references)
