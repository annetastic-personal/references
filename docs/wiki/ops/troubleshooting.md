# Troubleshooting

Common issues encountered while configuring CI/CD deployments, grouped by step.

For SSH connectivity problems (timeouts, refused connections, firewalls, fail2ban), see [SSH Troubleshooting](https://github.com/annetastic-personal/references/wiki/ssh-troubleshooting).

## Step 3

Nginx configuration errors and fixes:

- **`sudo nginx -t` reports a syntax error** — reopen `/etc/nginx/sites-available/<your-site-config>` and check that each `server` and `location` block has matching braces and a terminating semicolon, then re-run the test.
- **Static assets return 404** — confirm `root` points at the `current` symlink and that the `location ~*` block's file extensions match your build output.
- **`Address already in use` on reload** — a previous process holds the port; find it with `sudo ss -tulpn | grep <port>` and stop it, or change the `listen` port.

## Step 8

Deployment verification errors and fixes:

- **Workflow fails to authenticate (SSH)** — verify `SSH_PRIVATE_KEY`, `SERVER_HOST`, `SERVER_USER`, and `SERVER_PORT` secrets are set correctly and match the target server.
- **Host key verification error** — regenerate `SERVER_KNOWN_HOSTS` and confirm it contains the full `ssh-keyscan` output.
- **`curl -I` does not return `200 OK`** — confirm the new release directory exists, `current` points to it, and Nginx has been reloaded.
