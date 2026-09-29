# Step 10 Sample: Run a Node Service with systemd (TTGCollector Project)

> **Applies to:** Node service deployments (PERN).

## Purpose

`ttgcollector` is an Express backend that must stay running to serve the app.
This example shows the systemd unit installed on the server so the process
starts on boot, restarts on crash, and is visible under
`systemctl status ttgcollector` — instead of being started by hand in a
terminal.

## Unit File

`/etc/systemd/system/ttgcollector.service`:

```ini
[Unit]
Description=TTGCollector Node.js service
After=network.target postgresql.service

[Service]
Type=simple
User=<deploy-user>
Group=<deploy-user>
WorkingDirectory=/var/www/ttgcollector/current
ExecStart=/usr/bin/node server/server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/var/www/ttgcollector/shared/.env

[Install]
WantedBy=multi-user.target
```

> **Runs on:** the server — SSH in first, then create the file at the remote prompt.

## Install and Enable

```bash
sudo systemctl daemon-reload
sudo systemctl enable ttgcollector
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

## Verify

After the Step 11 deploy has started the service, confirm it is running:

```bash
sudo systemctl status ttgcollector
curl -I http://127.0.0.1:3001
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

## Restart After Deploy

```bash
sudo systemctl restart ttgcollector
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

## Notes

- The entry point is `server/server.js`, run from the `current` symlink so deployments stay atomic.
- `EnvironmentFile` injects `shared/.env` (database credentials, `SESSION_SECRET`, `PORT`, `BGG_API_TOKEN`). Placing it in `shared/` — not `current/server/` — keeps it out of the path the workflow rebuilds with `rsync --delete`. Keep it out of git and owned by the deploy user (`chmod 600`).
- TTGCollector's own `dotenv` load of `server/.env` is harmless in production: systemd has already set those variables, and `dotenv` does not overwrite existing values.
- The `client/` build output (`client/dist`) is served by the same Express process in production, so no separate static-site step is needed.

---

[← Step 9 Sample](https://github.com/annetastic-personal/references/wiki/step-9-service-environment-database-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 11 Sample →](https://github.com/annetastic-personal/references/wiki/step-11-deploy-and-verify-sample)
