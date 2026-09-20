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
EnvironmentFile=/var/www/ttgcollector/current/server/.env

[Install]
WantedBy=multi-user.target
```

## Install and Start

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ttgcollector
```

## Verify

```bash
sudo systemctl status ttgcollector
curl -I http://127.0.0.1:3001
```

## Restart After Deploy

```bash
sudo systemctl restart ttgcollector
```

## Notes

- The entry point is `server/server.js`, run from the `current` symlink so deployments stay atomic.
- `EnvironmentFile` injects `server/.env` (database credentials, `SESSION_SECRET`, `PORT`, `BGG_API_TOKEN`). Keep that file out of git and owned by the deploy user (`chmod 600`).
- The `client/` build output (`client/dist`) is served by the same Express process in production, so no separate static-site step is needed.

---

[← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 11 Sample →](https://github.com/annetastic-personal/references/wiki/step-11-service-environment-database-sample)
