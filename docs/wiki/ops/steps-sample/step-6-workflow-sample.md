# Step 6 Sample: Create GitHub Actions Workflow (Portfolio Project)

This example shows the deployment workflow for the `portfolio` project.

---

## Workflow File

`.github/workflows/deploy.yml`

---

## Key Workflow Sections

### Build

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "20"
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

[← Step 5 Sample](step-5-github-secrets-sample.md) | [Next: Step 7 Sample →](step-7-deploy-and-verify-sample.md)
