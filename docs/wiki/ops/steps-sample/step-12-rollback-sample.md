# Step 12 Sample: Confirm Rollback Procedure (Portfolio Project)

This example shows how to roll back to a previous release for the `portfolio` project.

---

## Commands Used

```bash
ls -lt /var/www/portfolio/releases/
ln -sfn /var/www/portfolio/releases/release-YYYYMMDDHHMMSS /var/www/portfolio/current
ls -la /var/www/portfolio/current
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

```bash
curl -I http://yourdomain.com
```

> **Runs on:** your machine.

```bash
# To roll forward again:
ln -sfn /var/www/portfolio/releases/release-YYYYMMDDHHMMSS /var/www/portfolio/current
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

---

## Verification
- Site reflects the previous version after rollback.
- Nginx does not need to be reloaded; symlink change is immediate.

---

[← Step 11 Sample](https://github.com/annetastic-personal/references/wiki/step-11-deploy-and-verify-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
