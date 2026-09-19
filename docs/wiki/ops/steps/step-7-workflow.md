# Step 7: Create CI/CD Workflow

> **Applies to:** All deployments.

Worked example: [Step 7 Sample](https://github.com/annetastic-personal/references/wiki/step-7-workflow-sample)

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

## Example Runner Target

```yaml
runs-on: ubuntu-latest
```

---

## Key Workflow Sections (Generalized)

> **Runs on:** the GitHub Actions runner — CI, not your machine or the destination server. You write this YAML once and commit it; the runner executes it on every run.

### Job Environment

```yaml
env:
  SERVER_HOST: ${{ secrets.SERVER_HOST }}
  SERVER_USER: ${{ secrets.SERVER_USER }}
  SERVER_PORT: ${{ secrets.SERVER_PORT }}
  SERVER_PATH: ${{ secrets.SERVER_PATH }}
```

### Build

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "<node-version>"
- run: npm ci
- run: npm run build
```

### Start SSH Agent

```yaml
- name: Start SSH agent
  uses: webfactory/ssh-agent@v0.9.0
  with:
    ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
```

### Add Known Hosts

```yaml
- name: Add known hosts
  run: |
    mkdir -p ~/.ssh
    if [ -n "${{ secrets.SERVER_KNOWN_HOSTS }}" ]; then
      echo "${{ secrets.SERVER_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
    else
      ssh-keyscan -p "${{ secrets.SERVER_PORT }}" "${{ secrets.SERVER_HOST }}" >> ~/.ssh/known_hosts
    fi
```

### Deploy

```yaml
- name: Deploy release
  run: |
    # Fail fast on errors, unset variables, or pipeline failures.
    set -euo pipefail

    RELEASE_NAME="release-$(date +%Y%m%d%H%M%S)"
    RELEASE_DIR="$SERVER_PATH/releases/$RELEASE_NAME"

    # Ensure the release directory exists on the server.
    ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "mkdir -p '$RELEASE_DIR'"

    # Sync the build output into the release directory.
    rsync -az --delete -e "ssh -p $SERVER_PORT" dist/ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

    # Atomically switch the current symlink to the new release.
    ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current'"
```

### Deploy (Node Service)

For a Node backend, sync the whole app (server code plus client build) and restart the systemd service from Step 10 instead of just swapping files in place:

```yaml
- name: Deploy release (Node service)
  run: |
    set -euo pipefail
    RELEASE_NAME="release-$(date +%Y%m%d%H%M%S)"
    RELEASE_DIR="$SERVER_PATH/releases/$RELEASE_NAME"

    ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "mkdir -p '$RELEASE_DIR'"

    # Sync the built app (server code plus client build).
    rsync -az --delete -e "ssh -p $SERVER_PORT" ./ "$SERVER_USER@$SERVER_HOST:$RELEASE_DIR/"

    # Repoint current, then restart the service so the new code loads.
    ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ln -sfn '$RELEASE_DIR' '$SERVER_PATH/current' && sudo systemctl restart <service-name>"
```

### Prune Old Releases

```yaml
- name: Prune old releases
  run: |
    ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "ls -1dt '$SERVER_PATH'/releases/* | tail -n +6 | xargs -r rm -rf"
```

---

[← Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 8 →](https://github.com/annetastic-personal/references/wiki/step-8-deploy-and-verify)
