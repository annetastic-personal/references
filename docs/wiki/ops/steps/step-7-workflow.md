# Step 7: Create CI/CD Workflow

> **Applies to:** All deployments.

Worked examples: [Static site](https://github.com/annetastic-personal/references/wiki/step-7-workflow-sample-static) · [Node service](https://github.com/annetastic-personal/references/wiki/step-7-workflow-sample-node-service)

## Purpose

Create, document, and approve the deployment workflow script for your project. In GitHub Actions, a "workflow" is a YAML script file committed in your repo, usually at `.github/workflows/deploy.yml`.

---

## Step-by-Step

1. In your repository root, create the workflow directories if they do not exist:

   ```bash
   mkdir -p .github/workflows
   ```

2. Create the workflow file:

   ```bash
   touch .github/workflows/deploy.yml
   ```

> **Runs on:** your machine (in the repository checkout).

3. Open `.github/workflows/deploy.yml` and write your deployment workflow YAML script.
4. Add your trigger, runner target, build steps, and deploy steps.
5. Save and commit the file to your repository.
6. Push your branch so GitHub Actions can run the workflow.

---

## What the Workflow Should Do (Generalized)

1. Trigger on push to your main branch or manual dispatch.
2. Check out the repository on the runner.
3. Set up the required runtime (e.g., Node, Python, etc.) and install dependencies.
4. Use `ssh-agent` to load the deploy private key.
5. Add the server host key from `SERVER_KNOWN_HOSTS` to `known_hosts`.
6. Use `rsync` or similar to copy build output to a timestamped release directory on the server.
7. Atomically update the `current` symlink to point to the new release.
8. Prune old releases, keeping the most recent N.

---

## The Full Workflow File

Paste this into `.github/workflows/deploy.yml`, then replace every `<...>` placeholder. The `Deploy release` step is intentionally left as a marker — pick **one** of the two deploy options in the next section and paste it in its place.

> **Runs on:** the GitHub Actions runner — CI, not your machine or the destination server. You write this YAML once and commit it; the runner executes it on every run. The `runs-on` value below uses GitHub's hosted Linux runner.

```yaml
# Deploy workflow. Replace every <...> placeholder for your project.
name: <workflow-name>

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

      # Install Node.js and enable the npm dependency cache.
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: <node-version>
          cache: npm

      # Install dependencies from package-lock.json for reproducible builds.
      - name: Install dependencies
        run: npm ci

      # Build your app. Note the output folder; the deploy step below uses it.
      - name: Build
        run: <build-command>   # e.g. npm run build

      # Load the deploy private key from GitHub Secrets for SSH auth.
      - name: Start SSH agent
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      # Trust the server's host key (pinned secret, or ssh-keyscan fallback).
      - name: Add known hosts
        run: |
          mkdir -p ~/.ssh
          if [ -n "${{ secrets.SERVER_KNOWN_HOSTS }}" ]; then
            echo "${{ secrets.SERVER_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
          else
            ssh-keyscan -p "${{ secrets.SERVER_PORT }}" "${{ secrets.SERVER_HOST }}" >> ~/.ssh/known_hosts
          fi

      # ------------------------------------------------------------------
      # DEPLOY STEP — INSERT ONE OF THE TWO OPTIONS BELOW (Static site or
      # Node service). Do not paste both.
      # ------------------------------------------------------------------
```

## Choose Your Deploy Step

Pick the option that matches your project and paste it where the marker is above. Each option is a complete `Deploy release` step.

### Static site

Serve the built files directly and atomically swap the `current` symlink. No service restart. Replace `<build-output-dir>` with your build's output folder (e.g. `dist`), and `<keep-count>` with the release retention (see the note below).

```yaml
      - name: Deploy release
        env:
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
          SERVER_PORT: ${{ secrets.SERVER_PORT }}
          SERVER_PATH: ${{ secrets.SERVER_PATH }}
        run: |
          # Fail fast on errors, unset variables, or pipeline failures.
          set -euo pipefail

          RELEASE_NAME="release-$(date +%Y%m%d%H%M%S)"
          RELEASE_DIR="$SERVER_PATH/releases/$RELEASE_NAME"

          # Ensure the release directory exists on the server.
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "mkdir -p '$RELEASE_DIR'"

          # Sync the build output into the release directory.
          rsync -az --delete -e "ssh -p $SERVER_PORT" <build-output-dir>/ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

          # Atomically switch the current symlink to the new release.
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current'"

          # Prune old releases (see retention note below).
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ls -1dt '$SERVER_PATH'/releases/* | tail -n +<keep-count> | xargs -r rm -rf"
```

### Node service

Sync the whole app (server code plus client build) and restart the systemd service from Step 10. Replace `<service-name>` with the systemd unit name and `<keep-count>` with the release retention. `--delete` only touches the new release directory, never `shared/` — secrets such as `.env` live in `shared/` (see Step 11), so they survive every deploy.

```yaml
      - name: Deploy release
        env:
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
          SERVER_PORT: ${{ secrets.SERVER_PORT }}
          SERVER_PATH: ${{ secrets.SERVER_PATH }}
        run: |
          # Fail fast on errors, unset variables, or pipeline failures.
          set -euo pipefail

          RELEASE_NAME="release-$(date +%Y%m%d%H%M%S)"
          RELEASE_DIR="$SERVER_PATH/releases/$RELEASE_NAME"

          # Ensure the release directory exists on the server.
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "mkdir -p '$RELEASE_DIR'"

          # Sync the built app (server code plus client build).
          rsync -az --delete -e "ssh -p $SERVER_PORT" ./ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

          # Repoint current, restart the service so the new code loads, then prune.
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current' && sudo systemctl restart <service-name>"
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ls -1dt '$SERVER_PATH'/releases/* | tail -n +<keep-count> | xargs -r rm -rf"
```

> **Release retention:** `tail -n +<keep-count>` deletes every release except the most recent `<keep-count> - 1`. For example, `tail -n +6` keeps the 5 most recent releases (`6 = 5 + 1`).

---

[← Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 8 →](https://github.com/annetastic-personal/references/wiki/step-8-deploy-and-verify)
