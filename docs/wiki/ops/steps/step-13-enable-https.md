# Step 13: Enable HTTPS with Let's Encrypt

> **Applies to:** All deployments.

Worked example: [Step 13 Sample](https://github.com/annetastic-personal/references/wiki/step-13-enable-https-sample)

## Purpose

Serve the site over HTTPS by obtaining a free TLS certificate from Let's Encrypt and pointing Nginx at it. Browsers auto-upgrade bare domains to `https://`, so a site with no `443` listener shows "Unable to connect" even when HTTP works.

---

## Install certbot

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

- `certbot` requests and renews certificates; `python3-certbot-nginx` is the plugin that edits your Nginx config automatically.

---

## Confirm prerequisites

Confirm the domain resolves to the server:

```bash
nslookup <your-domain>
```

> **Runs on:** your machine.

Then confirm port 80 is reachable (Let's Encrypt validates over HTTP) and that
443 is allowed through the firewall:

```bash
sudo ufw status numbered
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

---

## Obtain and install the certificate

```bash
sudo certbot --nginx -d <your-domain>
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

- certbot reads `sites-enabled`, finds the `server_name <your-domain>` block, obtains the certificate, and rewrites that block to `listen 443 ssl;` with the certificate paths.
- Add `-d www.<your-domain>` only if you have a `www` A record and want it covered.
- When prompted, choose to redirect HTTP → HTTPS (the clean end state).

---

## Test and reload

```bash
sudo nginx -t
sudo systemctl reload nginx
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

---

## Verify

```bash
curl -I https://<your-domain>
```

> **Runs on:** your machine.

Expected: `HTTP/2 200` (or `HTTP/1.1 200 OK`).

---

## Renewal

certbot installs a systemd timer that renews certificates automatically. Confirm it is active:

```bash
sudo systemctl status certbot.timer
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

---

## Troubleshooting

See [Connectivity Troubleshooting](https://github.com/annetastic-personal/references/wiki/connectivity-troubleshooting) for "Unable to connect" symptoms, and [Troubleshooting → Step 3](https://github.com/annetastic-personal/references/wiki/troubleshooting#step-3) for Nginx config errors.

---

[← Step 12](https://github.com/annetastic-personal/references/wiki/step-12-rollback) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
