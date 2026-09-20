# Step 9: Confirm Rollback Procedure

> **Applies to:** All deployments.

Worked example: [Step 9 Sample](https://github.com/annetastic-personal/references/wiki/step-9-rollback-sample)

## Purpose

Validate that rolling back to a previous release works correctly by switching the `current` symlink.

---

## Prerequisites

- At least 2 releases exist in your releases directory.
- The site is live and serving correctly from the current release.

---

## Rollback Procedure (Generalized)

### 1. List available releases

```bash
ls -lt /var/www/<project>/releases/
```

### 2. Switch `current` to a previous release

```bash
ln -sfn /var/www/<project>/releases/<previous-release-dir> /var/www/<project>/current
```

Replace `<previous-release-dir>` with the target release directory name (e.g. `release-YYYYMMDDHHMMSS`).

### 3. Verify the change

```bash
ls -la /var/www/<project>/current
```

### 4. Confirm the site reflects the rollback

```bash
curl -I http://<server>
```

Check the domain to confirm the previous version is live.

### 5. Roll forward (restore latest release)

```bash
ln -sfn /var/www/<project>/releases/<latest-release-dir> /var/www/<project>/current
```

---

## Notes

- Nginx does not need to be reloaded. The symlink change takes effect immediately.
- No deployment pipeline changes are needed for a manual rollback.

---

[← Step 8](https://github.com/annetastic-personal/references/wiki/step-8-deploy-and-verify) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
