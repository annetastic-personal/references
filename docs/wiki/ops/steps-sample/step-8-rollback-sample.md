# Step 8 Sample: Confirm Rollback Procedure (Portfolio Project)

This example shows how rollback was performed for the `portfolio` project.

---

## Prerequisites

- At least 2 releases exist in `/home/<deploy-user>/public/releases/`.
- The site is live and serving correctly from the current release.

---

## Rollback Procedure

### 1. List available releases

```bash
ls -lt /home/<deploy-user>/public/releases/
```

### 2. Switch `current` to a previous release

```bash
ln -sfn /home/<deploy-user>/public/releases/<previous-release-dir> /home/<deploy-user>/public/current
```

Replace `<previous-release-dir>` with the target release directory name (e.g. `release-20260425180243`).

### 3. Verify the change

```bash
ls -la /home/<deploy-user>/public/current
```

### 4. Confirm the site reflects the rollback

```bash
curl -I http://203.0.113.10
```

Check the domain to confirm the previous version is live.

### 5. Roll forward (restore latest release)

```bash
ln -sfn /home/<deploy-user>/public/releases/<latest-release-dir> /home/<deploy-user>/public/current
```

---

## Notes

- Nginx does not need to be reloaded. The symlink change takes effect immediately.
- No deployment pipeline changes are needed for a manual rollback.

---

[← Step 7 Sample](step-7-deploy-and-verify-sample.md)
