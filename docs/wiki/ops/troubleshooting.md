# Troubleshooting

Common issues encountered while configuring CI/CD deployments, grouped by step.

For SSH connectivity problems (timeouts, refused connections, firewalls, fail2ban), see [SSH Troubleshooting](https://github.com/annetastic-personal/references/wiki/ssh-troubleshooting).

## Step 3

Nginx configuration errors and fixes:

- **`sudo nginx -t` reports a syntax error** — reopen `/etc/nginx/sites-available/<your-site-config>` and check that each `server` and `location` block has matching braces and a terminating semicolon, then re-run the test.
- **Static assets return 404** — confirm `root` points at the `current` symlink and that the `location ~*` block's file extensions match your build output.
- **`Address already in use` on reload** — a previous process holds the port; find it with `sudo ss -tulpn | grep <port>` and stop it, or change the `listen` port.

## Step 6

GitHub Actions secrets and SSH key errors:

- **`Error loading key "(stdin)": error in libcrypto` in the SSH agent step** — the `SSH_PRIVATE_KEY` secret is malformed or holds the wrong key. Verify the key file parses locally with `ssh-keygen -y -f <key>`, then re-paste the full value into the secret: include the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` lines, with real newlines and no leading/trailing spaces.
- **Key only works from some names / `SSH_PRIVATE_KEY` doesn't authorize** — confirm the secret holds the private key whose matching `.pub` line is in the server's `~/.ssh/authorized_keys`. Key names can drift (e.g. `github_actions_deploy` vs `portfolio_deploy_key`); identify them by comment (`ssh-keygen -lf <key>.pub`).
- **Deploy private key lives on the server** — the private half belongs only on your machine and in the GitHub secret; the server's `~/.ssh/` should contain only the `.pub` and `authorized_keys`. If a private key is on the server, it was generated in the wrong place.

## Step 8

Deployment verification errors and fixes:

- **Workflow fails to authenticate (SSH)** — verify `SSH_PRIVATE_KEY`, `SERVER_HOST`, `SERVER_USER`, and `SERVER_PORT` secrets are set correctly and match the target server.
- **Host key verification error** — regenerate `SERVER_KNOWN_HOSTS` and confirm it contains the full `ssh-keyscan` output.
- **`curl -I` does not return `200 OK`** — confirm the new release directory exists, `current` points to it, and Nginx has been reloaded.
- **Deploy succeeds but the URL will not load** — check in order: DNS resolves to the server (`nslookup <domain>`), Nginx is listening on 80/443 (`ss -tlnp | grep -E ':80|:443'`), and the firewall allows 80/443 (`sudo ufw status numbered`). If `curl -I http://127.0.0.1` returns `200` from the server but the browser times out, the firewall is blocking the web ports: run `sudo ufw allow 80/tcp` and `sudo ufw allow 443/tcp`.

