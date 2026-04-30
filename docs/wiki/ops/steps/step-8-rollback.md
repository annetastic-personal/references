# Step 8: Confirm Rollback Procedure

Worked example: [Step 8 Sample](https://github.com/odomaf/references/wiki/step-8-rollback-sample)

Validate that rolling back to a previous release works correctly by switching the `current` symlink.

---

## Prerequisites

- At least 2 releases exist in your releases directory.
- The site is live and serving correctly from the current release.

---

## Rollback Procedure (Generalized)

### 1. List available releases

```bash
ls -lt /home/<user>/<project>/releases/
```

### 2. Switch `current` to a previous release

```bash
ln -sfn /home/<user>/<project>/releases/<previous-release-dir> /home/<user>/<project>/current
```

Replace `<previous-release-dir>` with the target release directory name (e.g. `release-YYYYMMDDHHMMSS`).

### 3. Verify the change

```bash
ls -la /home/<user>/<project>/current
```

### 4. Confirm the site reflects the rollback

```bash
curl -I http://<server>
```

Check the domain to confirm the previous version is live.

### 5. Roll forward (restore latest release)

```bash
ln -sfn /home/<user>/<project>/releases/<latest-release-dir> /home/<user>/<project>/current
```

---

## Notes

- Nginx does not need to be reloaded. The symlink change takes effect immediately.
- No deployment pipeline changes are needed for a manual rollback.

---

[← Step 7](step-7-deploy-and-verify.md) | [← Back to Index](../cicd-index.md)
