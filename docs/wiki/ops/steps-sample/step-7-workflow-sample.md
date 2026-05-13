# Step 7 Sample: Create GitHub Actions Workflow (Portfolio Project)

This example shows the workflow file used for the `portfolio` project.

---

## File: .github/workflows/deploy.yml

```yaml
name: Deploy To Personal Server
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: [self-hosted, linux, ARM64, deploy-lan]
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: |
          RELEASE_DIR="$SERVER_PATH/releases/release-$(date +%Y%m%d%H%M%S)"
          rsync -az --delete dist/ $SERVER_USER@$SERVER_HOST:$RELEASE_DIR/
          ssh $SERVER_USER@$SERVER_HOST "ln -sfn $RELEASE_DIR $SERVER_PATH/current"
      - name: Prune Old Releases
        run: |
          ssh $SERVER_USER@$SERVER_HOST "ls -1dt $SERVER_PATH/releases/release-* | tail -n +6 | xargs rm -rf"
```

---

[← Step 6 Sample](step-6-runner-setup-sample.md) | [← Back to Index](../cicd-index.md) | [Next: Step 8 Sample →](step-8-deploy-and-verify-sample.md)
