# Step 7: Create CI/CD Workflow

Worked example: [Step 7 Sample](https://github.com/odomaf/references/wiki/step-7-workflow-sample)

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
runs-on: [self-hosted, linux, ARM64, deploy-lan]
```

---

## Key Workflow Sections (Generalized)

### Build

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "<node-version>"
- run: npm ci
- run: npm run build
```

### Deploy

```yaml
- run: |
    RELEASE_DIR="${{ env.SERVER_PATH }}/releases/release-$(date +%Y%m%d%H%M%S)"
    rsync -az --delete dist/ ${{ env.SERVER_USER }}@${{ env.SERVER_HOST }}:$RELEASE_DIR/
    ssh ... "ln -sfn $RELEASE_DIR ${{ env.SERVER_PATH }}/current"
```

### Prune Old Releases

```yaml
- run: |
    ssh ... "ls -1dt ${{ env.SERVER_PATH }}/releases/release-* | tail -n +6 | xargs rm -rf"
```

---

[← Step 6](https://github.com/odomaf/references/wiki/step-6-runner-setup) | [← Back to Index](../cicd-index.md) | [Next: Step 8 →](https://github.com/odomaf/references/wiki/step-8-deploy-and-verify)
