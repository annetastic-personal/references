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

[← Step 7 Sample](https://github.com/annetastic-personal/references/wiki/step-7-workflow-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 9 Sample →](https://github.com/annetastic-personal/references/wiki/step-9-rollback-sample)
