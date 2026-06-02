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
# Change this workflow name per repo if desired.
name: Deploy To Personal Server

on:
  # Change this branch if your repo deploys from a different branch.
  push:
    branches: [main]

  # Keep this so you can run deployments manually from GitHub Actions.
  workflow_dispatch:

jobs:
  deploy:
    # Change runner labels only if your organization runner labels differ.
    # Keep self-hosted in the list.
    runs-on: [self-hosted, linux, ARM64, deploy-lan]

    # Change these values for each repo.
    # SERVER_* values should match your GitHub Actions repository or organization secrets.
    env:
      SERVER_USER: ${{ secrets.SERVER_USER }}
      SERVER_HOST: ${{ secrets.SERVER_HOST }}
      SERVER_PATH: ${{ secrets.SERVER_PATH }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          # Change Node version per repo runtime requirements.
          node-version: "20.x"

      # Keep npm ci for clean, repeatable installs.
      - run: npm ci

      # Change build command if your repo uses a different script.
      - run: npm run build

      - name: Deploy
        run: |
          # Change dist/ if your framework outputs to a different folder.
          RELEASE_DIR="$SERVER_PATH/releases/release-$(date +%Y%m%d%H%M%S)"
          rsync -az --delete dist/ $SERVER_USER@$SERVER_HOST:$RELEASE_DIR/
          ssh $SERVER_USER@$SERVER_HOST "ln -sfn $RELEASE_DIR $SERVER_PATH/current"

      - name: Prune Old Releases
        run: |
          # Change +6 to keep more or fewer releases.
          ssh $SERVER_USER@$SERVER_HOST "ls -1dt $SERVER_PATH/releases/release-* | tail -n +6 | xargs rm -rf"
```

---

[← Step 6 Sample](step-6-runner-setup-sample.md) | [← Back to Index](../cicd-index.md) | [Next: Step 8 Sample →](step-8-deploy-and-verify-sample.md)
