# Step 9 Sample: Confirm Rollback Procedure (Portfolio Project)

This example shows how to roll back to a previous release for the `portfolio` project.

---

## Commands Used

```bash
ls -lt /var/www/portfolio/releases/
ln -sfn /var/www/portfolio/releases/release-YYYYMMDDHHMMSS /var/www/portfolio/current
ls -la /var/www/portfolio/current
curl -I http://yourdomain.com
# To roll forward again:
ln -sfn /var/www/portfolio/releases/release-YYYYMMDDHHMMSS /var/www/portfolio/current
```

---

## Verification
- Site reflects the previous version after rollback.
- Nginx does not need to be reloaded; symlink change is immediate.

---

[← Step 8 Sample](https://github.com/annetastic-personal/references/wiki/step-8-deploy-and-verify-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
