# Step 8: Push and Verify Deployment

> **Applies to:** All deployments.

Worked example: [Step 8 Sample](https://github.com/annetastic-personal/references/wiki/step-8-deploy-and-verify-sample)

## Purpose

Push to your main branch, verify the workflow runs successfully, and confirm the site is live.

---

## What to Do (Generalized)

```bash
git push origin main
```

Or, if pushing from a feature branch:

```bash
git push origin HEAD:main
```

---

## Verification Checklist

1. Workflow run completes without errors in your CI/CD system.
2. New timestamped directory appears at your releases path.
3. `current` symlink points to the new release.
4. `curl -I http://<server>:<port>` returns `HTTP/1.1 200 OK`.
5. Your domain loads the deployed app.

---

## Troubleshooting

See [Troubleshooting → Step 8](https://github.com/annetastic-personal/references/wiki/troubleshooting#step-8) for issues encountered during this step.

---

[← Step 7](https://github.com/annetastic-personal/references/wiki/step-7-workflow) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 9 →](https://github.com/annetastic-personal/references/wiki/step-9-rollback)
