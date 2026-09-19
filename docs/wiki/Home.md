# References Wiki

A collection of processes, patterns, and practices I've learned and want to refer to later.

## Processes

- [Organization Setup for Multi-Repo CI/CD](https://github.com/annetastic-personal/references/wiki/Organization-Setup)

### Authentication and Tokens

- [PAT Instructions for Wiki Automation](https://github.com/annetastic-personal/references/wiki/PAT-Instructions)
- [Organization Setup for Multi-Repo CI/CD](https://github.com/annetastic-personal/references/wiki/Organization-Setup)

### Application CI/CD

This reference documents a generalized, step-by-step process for setting up atomic, rollback-friendly CI/CD for web applications using GitHub Actions and a versioned release directory structure. Each step links to a detailed guide and a worked example.

- [Step 1: Set Up Personal SSH Access](https://github.com/annetastic-personal/references/wiki/step-1-personal-ssh-access)
- [Step 2: Prepare Server Directory Layout](https://github.com/annetastic-personal/references/wiki/step-2-server-layout)
- [Step 3: Configure Nginx Site](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config)
- [Step 4: Create Deployment SSH Key Pair](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key)
- [Step 5: Add Deploy Public Key to Server](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys)
- [Step 6: Add CI/CD Repository Secrets](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets)
- [Step 7: Create CI/CD Workflow](https://github.com/annetastic-personal/references/wiki/step-7-workflow)
- [Step 8: Push and Verify Deployment](https://github.com/annetastic-personal/references/wiki/step-8-deploy-and-verify)
- [Step 9: Confirm Rollback Procedure](https://github.com/annetastic-personal/references/wiki/step-9-rollback)
- [Step 10: Run a Node Service (systemd)](https://github.com/annetastic-personal/references/wiki/step-10-run-node-service)
- [Step 11: Service Environment & Database](https://github.com/annetastic-personal/references/wiki/step-11-service-environment-database)

### Wiki CI/CD with Scaffolding

Use this process to publish wiki content from repository-managed markdown files under `docs/wiki/` to the GitHub wiki. The scaffold script at [docs/scaffold-wiki.js](https://github.com/annetastic-personal/references/blob/main/docs/scaffold-wiki.js) is prepared in Step 02 and executed by CI in Step 03 when relevant changes are pushed to `main`.

- [Wiki Automation Checklist](https://github.com/annetastic-personal/references/wiki/Wiki-Automation-Checklist)
- [Step 00: Upfront Decisions](https://github.com/annetastic-personal/references/wiki/step-00-upfront-decisions)
- [Step 01: Add Required Repository Secrets](https://github.com/annetastic-personal/references/wiki/step-01-add-required-repository-secrets)
- [Step 02: Prepare Workflow Runtime](https://github.com/annetastic-personal/references/wiki/step-02-prepare-workflow-runtime)
- [Step 03: Execute Wiki Publish Step in CI](https://github.com/annetastic-personal/references/wiki/step-03-execute-wiki-publish-step-in-ci)
- [Step 04: Make Runs Idempotent](https://github.com/annetastic-personal/references/wiki/step-04-make-runs-idempotent)
- [Step 05: Validate End-to-End](https://github.com/annetastic-personal/references/wiki/step-05-validate-end-to-end)
- [Step 06: Harden and Operationalize](https://github.com/annetastic-personal/references/wiki/step-06-harden-and-operationalize)
- [Step 07: Document Fallback Process](https://github.com/annetastic-personal/references/wiki/step-07-document-fallback-process)

---

## Troubleshooting

- [SSH Troubleshooting](https://github.com/annetastic-personal/references/wiki/ssh-troubleshooting)

---

## Unit Testing

- [xUnit Unit Testing in .NET](https://github.com/annetastic-personal/references/wiki/xunit-unit-testing-dotnet)
- [Coverage Report Script](https://github.com/annetastic-personal/references/wiki/coverage-report-script)

---

[Repository](https://github.com/annetastic-personal/references)
