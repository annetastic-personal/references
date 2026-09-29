# Step 8 Sample: Install Node.js Runtime (TTGCollector Project)

> **Applies to:** Node service deployments (PERN).

## Purpose

`ttgcollector` declares `"engines": { "node": ">=20.0.0" }`, so the server needs
Node 20 (and npm) before the first deploy. This example installs Node 20
system-wide on the Debian VPS.

## Commands Used

> **Runs on:** the server — SSH in first, then run at the remote prompt.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
which node
```

## Verify

- `node -v` prints `v20.x` and `npm -v` prints a version.
- `which node` prints `/usr/bin/node` (system-wide, not `~/.nvm/...`).
- `ssh <deploy-user>@<server> -p <port> "command -v npm"` succeeds from a
  non-interactive session.

---

[← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 9 Sample →](https://github.com/annetastic-personal/references/wiki/step-9-service-environment-database-sample)
