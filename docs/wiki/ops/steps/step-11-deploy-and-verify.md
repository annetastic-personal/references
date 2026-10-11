# Step 11: Push and Verify Deployment

> **Applies to:** All deployments.

Worked example: [Step 11 Sample](https://github.com/annetastic-personal/references/wiki/step-11-deploy-and-verify-sample)

## Purpose

Push to your main branch, verify the workflow runs successfully, and confirm the site is live.

---

## What to Do (Generalized)

```bash
git push origin main
```

> **Runs on:** your machine (in the repository checkout).

Or, if pushing from a feature branch:

```bash
git push origin HEAD:main
```

> **Runs on:** your machine (in the repository checkout).

---

## Verification Checklist

1. Workflow run completes without errors in your CI/CD system.
2. New timestamped directory appears at your releases path.
3. `current` symlink points to the new release.
4. `curl -I http://<server>:<port>` returns `HTTP/1.1 200 OK`.
5. Your domain loads the deployed app.

## Node Service Verification (PERN / MERN)

If this is a Node service deployment, also confirm on the server:

```bash
sudo systemctl status <service-name>
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

Expected: `active (running)`. Then check the logs for startup errors:

```bash
journalctl -u <service-name>
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

Add `-f` to follow the logs live: `journalctl -u <service-name> -f`.

---

## Troubleshooting

See [Troubleshooting → Step 11](https://github.com/annetastic-personal/references/wiki/troubleshooting#step-11) for issues encountered during this step.

---

[← Step 10](https://github.com/annetastic-personal/references/wiki/step-10-run-node-service) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 12 →](https://github.com/annetastic-personal/references/wiki/step-12-rollback)
