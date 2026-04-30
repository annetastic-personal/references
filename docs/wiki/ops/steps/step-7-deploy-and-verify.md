# Step 7: Push and Verify Deployment

Worked example: [Step 7 Sample](https://github.com/odomaf/references/wiki/ops-steps-sample-step-7-deploy-and-verify-sample)

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

See your project's troubleshooting guide for issues encountered during this step.

---

[← Step 6](step-6-workflow.md) | [← Back to Index](../cicd-index.md) | [Next: Step 8 →](step-8-rollback.md)
