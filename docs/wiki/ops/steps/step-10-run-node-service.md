# Step 10: Run a Node Service (systemd)

> **Applies to:** Node service deployments (PERN, MERN).

Worked example: [Step 10 Sample](https://github.com/annetastic-personal/references/wiki/step-10-run-node-service-sample)

## Purpose

A Node.js backend is a long-running program, not a folder of files — it only
serves requests while the process is actually running. A process started in a
terminal stops when you log out or when the server reboots, and nothing
restarts it if it crashes.

This step installs a systemd unit so the operating system manages the Node
process for you: it starts the service on boot, restarts it automatically after
a crash, and gives you one place to check status and logs. No half-remembered
terminal session required.

---

## 1. Create a systemd unit

Create `/etc/systemd/system/<service-name>.service`:

```ini
[Unit]
Description=<service-name> Node.js service
After=network.target

[Service]
Type=simple
User=<deploy-user>
Group=<deploy-user>
WorkingDirectory=/var/www/<project>/current
ExecStart=/usr/bin/node <entry-point>
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/var/www/<project>/current/.env

[Install]
WantedBy=multi-user.target
```

- Replace `<service-name>`, `<deploy-user>`, `<project>`, and `<entry-point>` with your values.
- `WorkingDirectory` runs the process from the `current` symlink, so you deploy to a new release directory and restart without editing the unit.
- `EnvironmentFile` points at the app's `.env`; keep it out of git and owned only by the deploy user (`chmod 600`).
- If the app depends on a database, add its service to `After=` (for example, `postgresql.service`) so the database is up first.

## 2. Enable and start

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now <service-name>
```

`--now` enables the service (start on boot) *and* starts it in one step.

## 3. Verify it is running

```bash
sudo systemctl status <service-name>
curl -I http://127.0.0.1:<port>
```

Replace `<port>` with the app's port (for example, the `PORT` value in `.env`).

## 4. Redeploy by restarting

Deploy new code to a new release directory, repoint `current`, then restart:

```bash
sudo systemctl restart <service-name>
```

## 5. View logs

```bash
journalctl -u <service-name> -f
```

---

[← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 11 →](https://github.com/annetastic-personal/references/wiki/step-11-service-environment-database)
