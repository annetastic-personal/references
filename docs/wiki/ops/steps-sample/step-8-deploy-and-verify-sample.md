# Step 8 Sample: Push and Verify Deployment (Portfolio Project)

This example shows how to push and verify a deployment for the `portfolio` project.

---

## Commands Used

```bash
git push origin main
```

---

## Verification
- Workflow run completes without errors in GitHub Actions.
- New timestamped directory appears at your releases path.
- `current` symlink points to the new release.
- `curl -I http://yourdomain.com` returns `HTTP/1.1 200 OK`.
- Your domain loads the deployed app.

---

[← Step 7 Sample](step-7-workflow-sample.md) | [← Back to Index](../cicd-index.md) | [Next: Step 9 Sample →](step-9-rollback-sample.md)
