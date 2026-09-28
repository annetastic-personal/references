# Step 7 Sample: Create GitHub Actions Workflow (Node Service — TTGCollector)

This example shows the workflow file used for the `ttgcollector` project, which is a Node (PERN) service.

Use the comments in this sample to identify what must be changed for each repository.

---

## Step-by-Step Setup (Sample)

1. In the repository root, create the workflow directories if they do not exist (on your machine, in the repo checkout):

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
# This workflow deploys the TTGCollector Node service.
# Change the commented values below to adapt it for another repository.
name: Deploy To Personal Server

# How to adapt this workflow for another project:
# 1) Change trigger branch under on.push.branches.
# 2) Change build command if needed (currently: cd client && npm run build).
# 3) Update required secrets for target server:
#    - SERVER_HOST
#    - SERVER_USER
#    - SERVER_PORT
#    - SERVER_PATH
#    - SSH_PRIVATE_KEY
#    - SERVER_KNOWN_HOSTS (recommended)
# 4) Update the systemd service name in "systemctl restart <service-name>".
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
          node-version: 20.x
          cache: npm
          cache-dependency-path: client/package-lock.json

      # Install dependencies from package-lock.json for reproducible builds.
      - name: Install dependencies
        run: cd client && npm ci

      # Build the client (Vite outputs to client/dist).
      - name: Build
        run: cd client && npm run build

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

      # Create a timestamped release, sync the whole app, install runtime
      # dependencies on the server, switch the current symlink, restart the
      # systemd service, and prune old releases.
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

          # Sync the built app (server code plus client build), skipping .git
          # and node_modules. --delete only affects the new release directory,
          # never shared/, so .env in shared/ survives every deploy.
          rsync -az --delete --exclude '.git' --exclude 'node_modules' -e "ssh -p $SERVER_PORT" ./ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

          # Install the server's runtime dependencies fresh from the lockfile
          # before switching the symlink (server/ holds the Node package.json).
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "cd '$RELEASE_DIR/server' && npm ci --omit=dev"

          # Atomically point current -> new release, restart the service so the
          # new code loads, then prune old releases (keep the 5 most recent).
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "
            ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current' &&
            sudo systemctl restart ttgcollector &&
            ls -1dt '$SERVER_PATH'/releases/* | tail -n +6 | xargs -r rm -rf
          "
```

---

[← Step 7](https://github.com/annetastic-personal/references/wiki/step-7-workflow) | [Static site sample](https://github.com/annetastic-personal/references/wiki/step-7-workflow-sample-static) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
