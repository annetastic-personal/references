# Step 7 Sample: Push and Verify Deployment (Portfolio Project)

This example shows how deployment was verified for the `portfolio` project.

---

## What to Do

```bash
git push origin main
```

Or, if pushing from `dev`:

```bash
git push origin HEAD:main
```

---

## Verification Checklist

1. Workflow run completes without errors in GitHub Actions.
2. New timestamped directory appears at `/home/annetastic/public/releases/`.
3. `current` symlink points to the new release.
4. `curl -I http://10.5.6.15:8002` returns `HTTP/1.1 200 OK`.
5. Domain `annetasticthoughts.com` loads the React app.

---

## Troubleshooting

See [Troubleshooting → Step 7](../troubleshooting.md#step-7) for issues encountered during this step.

---

[← Step 6 Sample](step-6-workflow-sample.md) | [Next: Step 8 Sample →](step-8-rollback-sample.md)
