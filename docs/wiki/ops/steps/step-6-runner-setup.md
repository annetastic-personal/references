# Step 6: Set Up Self-Hosted GitHub Actions Runner

Worked example: [Step 6 Sample](https://github.com/odomaf/references/wiki/step-6-runner-setup-sample)

Set up a self-hosted GitHub Actions runner on your deployment server. This runner will execute your CI/CD workflows and must have access to your deployment directories and required tools.

---

## Prerequisites
- Deployment server is accessible and you have SSH access.
- Node.js, npm, and any required build tools are installed if your workflow needs them.

---

## Steps (Generalized)

1. Log in to your deployment server via SSH.
2. Create a directory for the runner (e.g., `actions-runner`).
3. Download the latest GitHub Actions runner package from the official GitHub documentation.
4. Extract the package and run the configuration script, following the prompts to connect to your repository.
5. Start the runner as a service (recommended for reliability).
6. Verify the runner appears as "online" in your repository's GitHub Actions settings.

---

## Useful Links
- [GitHub Docs: Adding self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners)
- [GitHub Docs: Running the runner as a service](https://docs.github.com/en/actions/hosting-your-own-runners/configuring-the-self-hosted-runner-application-as-a-service)

---

[← Step 5](step-5-github-secrets.md) | [← Back to Index](../cicd-index.md) | [Next: Step 7 →](step-7-workflow.md)
