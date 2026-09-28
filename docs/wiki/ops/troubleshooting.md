# Deployment Troubleshooting

This is the single source of truth for diagnosing **deployment** problems.
It is organized by **symptom** — what you actually see at deploy time — because the
problem usually surfaces while running a step, and rarely at the step that
configured the cause. Each entry names the fixing step so you can jump back to
it.

For general SSH *connectivity* (timeouts, refused connections, firewalls,
fail2ban), see [Connectivity Troubleshooting](https://github.com/annetastic-personal/references/wiki/connectivity-troubleshooting) — that page covers
"can I reach the server at all", while this page covers "the deploy is failing".

## Symptoms

### SSH agent step: `Error loading key "(stdin)": error in libcrypto`

The `SSH_PRIVATE_KEY` secret is malformed or holds the wrong key.

- Verify the key file parses locally: `ssh-keygen -y -f <key>`.
- Re-paste the full value into the secret — include the
  `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`
  lines, with real newlines and no leading/trailing spaces.

*Fixing step: [Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets).*

### `Host key verification failed` (exit 255)

The runner does not trust the server.

- Regenerate `SERVER_KNOWN_HOSTS` with `ssh-keyscan -q -p <port> <server>` and
  confirm the secret contains the full host-key lines (no `#` comment lines).
- Confirm the keyscan target matches `SERVER_HOST` (IP or hostname).

*Fixing step: [Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets).*

### Deploy private key lives on the server / key name drifts

`SSH_PRIVATE_KEY` does not authorize, even though the value parses.

- Confirm the secret holds the private key whose matching `.pub` line is in the
  server's `~/.ssh/authorized_keys`. Key names can drift (e.g.
  `github_actions_deploy` vs `portfolio_deploy_key`); identify them by comment
  with `ssh-keygen -lf <key>.pub`.
- The private half belongs only on your machine and in the GitHub secret — a
  private key sitting in the server's `~/.ssh/` means it was generated in the
  wrong place.

*Fixing steps: [Step 4](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key) and [Step 5](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys).*

### `Too many authentication failures` (exit 255)

Public-key auth is failing, so the runner falls back to other methods (a
`Permission denied, please try again.` password prompt) and the server
eventually disconnects.

- Confirm each line in the server's `~/.ssh/authorized_keys` is a complete key
  on one line: `ssh-ed25519 <base64-blob> <comment>`. A line missing the
  `ssh-ed25519 ` type prefix (a paste of only the base64 blob) is ignored.
- Confirm the `SSH_PRIVATE_KEY` secret's private key matches a line in
  `authorized_keys`: `ssh-keygen -y -f <key>` should equal that line.
- Test the key directly:
  `ssh -i <key> -p <port> <user>@<server> -o IdentitiesOnly=yes "echo ok"`.

*Fixing steps: [Step 5](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys) and [Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets).*

### A path or flag has a stray `\n` (secret ends in a newline)

A secret was pasted with a trailing newline (or spaces), which becomes part of
the value. GitHub preserves whitespace in secrets, so the stray character flows
into the deploy script and corrupts whatever uses it.

- Symptom examples: `mkdir: cannot create directory '...\n': Permission denied`
  (a nonexistent directory with a newline under `/var/www`), or `ssh`/`rsync`
  errors pointing at a host/port/path that no longer looks right.
- Fix: re-enter the affected secret with no trailing newline or spaces — most
  often `SERVER_PATH` (`/var/www/<project>`), but also check `SERVER_HOST`,
  `SERVER_USER`, and `SERVER_PORT`.

*Fixing step: [Step 6](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets).*

### `500 Internal Server Error` / `stat() ... (13: Permission denied)`

Nginx (`www-data`) cannot read the files. This is the classic symptom when the
app lives under a `700` home directory. Check the log:

```bash
sudo tail -n 40 /var/log/nginx/error.log
```

Look for `stat() ".../index.html" failed (13: Permission denied)`. Fix by
serving from a web-readable path (see [Web root location](#web-root-location))
and confirming the directories are traversable and files readable.

*Fixing steps: [Step 2](https://github.com/annetastic-personal/references/wiki/step-2-server-layout) (web root) and [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config) (`root` path).*

### "Welcome to nginx!" instead of your site

Nginx is serving the `default` site, so your server block is not matching.

- Confirm your site config `listen`s on **80/443** (not a custom port like `8002`).
- Confirm it is enabled in `/etc/nginx/sites-enabled/` (a correct symlink to `sites-available/`).
- Confirm `server_name` matches the request host.

*Fixing step: [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config).*

### Deploy succeeds but the URL will not load

Walk these in order:

1. DNS — `nslookup <domain>` resolves to the server IP.
2. Nginx listening on 80/443 — `ss -tlnp | grep -E ':80|:443'`.
3. Firewall allows 80/443 — `sudo ufw status numbered`; if only SSH (22) is
   allowed, run `sudo ufw allow 80/tcp` and `sudo ufw allow 443/tcp`.

A `curl -I http://127.0.0.1` that returns `200 OK` from the server while the
browser still times out is the signature of a web-port firewall block.

*Fixing steps: [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config) (nginx) and the server firewall.*

### `curl -I` does not return `200 OK`

Confirm the new release directory exists, `current` points to it, and Nginx has
been reloaded.

*Fixing step: [Step 11](https://github.com/annetastic-personal/references/wiki/step-11-deploy-and-verify).*

### `sudo nginx -t` reports a syntax error

Reopen `/etc/nginx/sites-available/<your-site-config>` and check that each
`server` and `location` block has matching braces and a terminating semicolon,
then re-run the test.

*Fixing step: [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config).*

### Static assets return 404

Confirm `root` points at the `current` symlink and that the `location ~*` block's
file extensions match your build output.

*Fixing step: [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config).*

### `Address already in use` on reload

A previous process holds the port. Find it with `sudo ss -tulpn | grep <port>`
and stop it, or change the `listen` port.

*Fixing step: [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config).*

---

## Web root location

Serve static sites from `/var/www/<project>` rather than a user home directory
(`/home/<user>/...`). A home directory is usually `700`, which blocks Nginx
(`www-data`) and forces a broad `chmod` on every deploy. `/var/www` is
purpose-built for web content:

- Deploy user owns it: `sudo chown -R <deploy-user>:www-data /var/www/<project>`.
- Directories inherit the web group (setgid): `find /var/www/<project> -type d -exec chmod 2755 {} \;`.
- Files are group-readable: `find /var/www/<project> -type f -exec chmod 644 {} \;`.

Then point `SERVER_PATH` and the Nginx `root` at `/var/www/<project>`.

*See [Step 2](https://github.com/annetastic-personal/references/wiki/step-2-server-layout).*

