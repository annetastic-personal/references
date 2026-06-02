# Step 6: Set Up Self-Hosted GitHub Actions Runner

Worked example: [Step 6 Sample](https://github.com/odomaf/references/wiki/step-6-runner-setup-sample)

Set up a self-hosted GitHub Actions runner on your deployment server. This runner will execute your CI/CD workflows and must have access to your deployment directories and required tools.

---

## Prerequisites

- Deployment server is accessible and you have SSH access.
- Node.js, npm, and any required build tools are installed if your workflow needs them.

---

## Choosing Between Repo-Level and Organization-Level Runners

GitHub Actions runners can be registered at either the repository or organization level:

- **Repository-level runner:**  
  Only available to a single repository.  
  Use this if you want strict isolation or have unique requirements for one project.

- **Organization-level runner (Recommended for multi-repo):**  
  Can be shared by all repositories in your GitHub organization.  
  Ideal for multi-repo deployments to a single server, as you only need to set up and maintain one runner.

### Setting Up an Organization-Level Runner

1. Go to your organization’s page on GitHub.
2. Navigate to **Settings → Actions → Runners**.
3. Click **New self-hosted runner**.
   - Before selecting the runner package, confirm your server architecture:
     ```bash
     uname -m
     ```
   - Match the output to the correct runner download option:
     - `x86_64` = Linux x64
     - `aarch64` = Linux ARM64
     - `armv7l` or `armv6l` = Linux ARM
   - Continue with the GitHub instructions using the matching package for your OS and architecture.
4. Use the same setup steps as below, but connect the runner to your organization instead of a single repo.

> **Note:**  
> You must have your repositories inside a GitHub organization to use organization-level runners.
>
> - [GitHub Docs: About organizations](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations)
> - [GitHub Docs: Transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)

### Updating Your Workflows

- In each repo’s workflow YAML, set `runs-on` to the label of your organization-level runner.
- Example:
  ```yaml
  runs-on: [self-hosted, your-runner-label]
  ```

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

[← Step 5](https://github.com/odomaf/references/wiki/step-5-github-secrets) | [← Back to Index](../cicd-index.md) | [Next: Step 7 →](https://github.com/odomaf/references/wiki/step-7-workflow)
