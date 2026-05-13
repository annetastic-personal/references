# Step 9 Sample: Confirm Rollback Procedure (Portfolio Project)

This example shows how to roll back to a previous release for the `portfolio` project.

---

## Commands Used

```bash
ls -lt /home/annetastic/portfolio/releases/
ln -sfn /home/annetastic/portfolio/releases/release-YYYYMMDDHHMMSS /home/annetastic/portfolio/current
ls -la /home/annetastic/portfolio/current
curl -I http://yourdomain.com
# To roll forward again:
ln -sfn /home/annetastic/portfolio/releases/release-YYYYMMDDHHMMSS /home/annetastic/portfolio/current
```

---

## Verification
- Site reflects the previous version after rollback.
- Nginx does not need to be reloaded; symlink change is immediate.

---

[← Step 8 Sample](step-8-deploy-and-verify-sample.md) | [← Back to Index](../cicd-index.md)
