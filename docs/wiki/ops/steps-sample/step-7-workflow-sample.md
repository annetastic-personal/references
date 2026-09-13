# Step 7 Sample: Create GitHub Actions Workflow (Portfolio Project)

This example shows the workflow file used for the `portfolio` project.

Use the comments in this sample to identify what must be changed for each repository.

---

## Step-by-Step Setup (Sample)

1. In the repository root, create the workflow directories if they do not exist:

```bash
mkdir -p .github/workflows
```

2. Create the workflow file:

```bash
touch .github/workflows/deploy.yml
```

3. Paste the sample workflow below into that file and update the commented repo-specific values.

---

## File: .github/workflows/deploy.yml

```yaml
# This workflow matches the live Portfolio deployment workflow.
# Change the commented values below to adapt it for another repository.
name: Deploy To Personal Server

# How to adapt this workflow for another project:
# 1) Change trigger branch under on.push.branches.
# 2) Change build command if needed (currently: npm run build).
# 3) Update required secrets for target server:
#    - SERVER_HOST
#    - SERVER_USER
#    - SERVER_PORT
#    - SERVER_PATH
#    - SSH_PRIVATE_KEY
#    - SERVER_KNOWN_HOSTS (recommended)
# 4) Update deployment source folder if your build output is not dist/.
# 5) Update release retention policy by changing tail -n +6
#    (keeps 5 releases; +11 would keep 10, etc.).

# Trigger on pushes to main and allow manual runs from the Actions tab.
on:
  push:
    branches: [main]
  workflow_dispatch:

# Minimal permissions: this workflow only needs repository read access.
permissions:
  contents: read

jobs:
  deploy:
    # GitHub-hosted Linux runner.
    runs-on: ubuntu-latest

    steps:
      # Pull repository contents into the runner workspace.
      - name: Checkout
        uses: actions/checkout@v4

      # Install Node.js and enable npm dependency cache for faster runs.
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      # Install dependencies from package-lock.json for reproducible builds.
      - name: Install dependencies
        run: npm ci

      # Build static assets into dist/.
      - name: Build
        run: npm run build

      # Load private SSH key from GitHub Secrets for server authentication.
      - name: Start SSH agent
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      # Add server host key for strict host verification.
      # Prefer pinned SERVER_KNOWN_HOSTS secret; fallback to ssh-keyscan if absent.
      - name: Add known hosts
        run: |
          mkdir -p ~/.ssh
          if [ -n "${{ secrets.SERVER_KNOWN_HOSTS }}" ]; then
            echo "${{ secrets.SERVER_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
          else
            ssh-keyscan -p "${{ secrets.SERVER_PORT }}" "${{ secrets.SERVER_HOST }}" >> ~/.ssh/known_hosts
          fi

      # Create a timestamped release, upload build output, switch current symlink,
      # and keep only the five most recent releases for easy rollback.
      - name: Deploy release
        env:
          # Deployment target values are provided via repository secrets.
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
          SERVER_PORT: ${{ secrets.SERVER_PORT }}
          SERVER_PATH: ${{ secrets.SERVER_PATH }}
        run: |
          # Fail fast on errors, unset variables, or pipeline failures.
          set -euo pipefail

          # Example: release-20260421194503
          RELEASE_NAME="release-$(date +%Y%m%d%H%M%S)"
          RELEASE_DIR="$SERVER_PATH/releases/$RELEASE_NAME"

          # Ensure release directory exists on the server.
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "mkdir -p '$RELEASE_DIR'"

          # Sync built files into the new release directory.
          rsync -az --delete -e "ssh -p $SERVER_PORT" dist/ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

          # Atomically point current -> new release, then prune old releases.
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "
            ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current' &&
            ls -1dt '$SERVER_PATH'/releases/* | tail -n +6 | xargs -r rm -rf
          "
```

---

[← Step 6 Sample](step-6-github-secrets-sample.md) | [← Back to Index](../cicd-index.md) | [Next: Step 8 Sample →](step-8-deploy-and-verify-sample.md)
