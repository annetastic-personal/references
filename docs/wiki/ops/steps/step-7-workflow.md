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

Paste this into `.github/workflows/deploy.yml`, then replace every `<...>` placeholder. The `Deploy release` step contains the full script; the only lines that differ between a Static site and a Node service are shown inline as commented alternatives — uncomment the one that matches your project and delete the other.

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

      # Install Node.js and enable the npm dependency cache. Set node-version
      # to match the project's declared runtime (package.json "engines" and/or
      # a .nvmrc file).
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

      # Upload, install, repoint, and (for a Node service) restart. The rsync
      # lines, the Node-only install line, and the "repoint" ssh lines below
      # are the ONLY lines that differ between a Static site and a Node
      # service. Uncomment the lines for your project and delete the others.
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

          # Upload the app — uncomment ONE of the two rsync lines:
          #   Static site → sync only the built files (e.g. dist/):
          # rsync -az --delete -e "ssh -p $SERVER_PORT" <build-output-dir>/ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"
          #   Node service → sync the whole app, skipping .git and node_modules:
          # rsync -az --delete --exclude '.git' --exclude 'node_modules' -e "ssh -p $SERVER_PORT" ./ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

          # Node service only — install the runtime dependencies on the server.
          # cd into the folder holding the app's package.json (<app-dir>, e.g.
          # `server` for a PERN app, or `.` at the repo root); delete this line
          # for a Static site:
          # ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "cd '$RELEASE_DIR/<app-dir>' && npm ci --omit=dev"

          # Repoint current — uncomment ONE of the two ssh lines:
          #   Static site → swap the symlink only:
          # ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current'"
          #   Node service → swap the symlink AND restart the service (pick a
          #   short <service-name> now, e.g. `ttgcollector`; reuse it in Step 9):
          # ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current' && sudo systemctl restart <service-name>"

          # Prune old releases (see retention note below).
          ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ls -1dt '$SERVER_PATH'/releases/* | tail -n +<keep-count> | xargs -r rm -rf"
```

> **Which lines to keep:**
> - **Static site** — uncomment the `<build-output-dir>/` rsync line and the plain `ln -sfn` line (no restart, no install line).
> - **Node service** — uncomment the `./` rsync line (with the `.git`/`node_modules` excludes), the `npm ci` install line, and the `ln -sfn ... && sudo systemctl restart <service-name>` line.
>
> Delete the lines that do not apply to your project. `<app-dir>` in the install line is the folder holding the *backend* app's `package.json` (e.g. `server` for a PERN app, or `.` at the repo root); `npm ci` also requires `package-lock.json` to be committed.
>
> **Picking `<app-dir>` when there are several `package.json` files:** choose the folder the running service starts from — the one containing the entry-point file you run with `node`. For TTGCollector that is `server/`, which holds `server/server.js` and the backend's `package-lock.json`; do not pick the repo-root `package.json` (which only holds dev/run scripts) or a `client/` build.
>
> `<service-name>` in the restart line is a short name you choose for the running service (e.g. `ttgcollector`); it becomes the systemd unit name in Step 9, so use the same string in both places.
>
> **Separate `client/` package (PERN/MERN):** the template's `npm ci` and `npm run build` run at the repo root, which is correct for a single-package app. If your repo has a separate `client/` package (its own `package.json` and lockfile), run both steps in that folder instead — the server's dependencies are installed on the server by the `<app-dir>` `npm ci --omit=dev` line, and only the client needs its dependencies on the runner to produce the static build. Use `cd client && npm ci` then `cd client && npm run build` (or `--prefix client`).

> **Release retention:** `tail -n +<keep-count>` deletes every release except the most recent `<keep-count> - 1`. For example, `tail -n +6` keeps the 5 most recent releases (`6 = 5 + 1`).

> **Before you commit, fill every `<...>` placeholder:** `<workflow-name>`, `<node-version>`, `<build-command>`, and then either `<build-output-dir>` (Static site) or `<service-name>` + `<app-dir>` (Node service), plus `<keep-count>`. Also keep each `- name:` step indented to the same level as the other steps (six spaces) — pasting a step at the wrong indent is the most common YAML error.

---

[← Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 8 →](https://github.com/annetastic-personal/references/wiki/step-8-install-node-runtime)
