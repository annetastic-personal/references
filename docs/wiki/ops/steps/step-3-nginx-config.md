# Step 3: Configure Nginx Site

> **Applies to:** All deployments.

Worked example: [Step 3 Sample](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config-sample)

## Purpose

Create and enable the Nginx site config that serves your web app — either directly from the `current` symlink (static site) or by reverse-proxying to a Node service on `localhost`.

---

## Install Nginx (skip if already installed)

On Debian/Ubuntu (for example, the Debian 13 VPS), install Nginx with `apt`:

```bash
sudo apt update
sudo apt install -y nginx
```

- `apt update` refreshes the package index so you install the latest available version.
- `apt install -y nginx` installs Nginx. On Debian this also enables and starts the `nginx` systemd service.
- Confirm it installed by checking the version: `nginx -v`.
- If your host manages Nginx through a control panel, use that instead — this guide assumes you control the `nginx` systemd service directly. On a non-APT distro, substitute your package manager.

---

## Create the Site Configuration

Open a new configuration file in your editor. This file does not exist yet, so the editor opens an empty file (use `vim`, or `nano` if you prefer):

```bash
sudo vim /etc/nginx/sites-available/<your-site-config>
```

- `/etc/nginx/sites-available/` stores configs that are written but not yet active. `sudo` is required because this is a root-owned system path.
- Replace `<your-site-config>` with your project or domain name (for example, `annetasticthoughts.com`).
- Paste one of the configs from [Example Config](#example-config-generalized) or [Reverse-Proxy a Node Service](#reverse-proxy-a-node-service), then save and exit.

---

## Enable the Site

Link the config into Nginx's enabled sites so it becomes active:

```bash
sudo ln -s /etc/nginx/sites-available/<your-site-config> /etc/nginx/sites-enabled/<your-site-config>
```

- Nginx only loads configs found in `sites-enabled/`. A symlink (rather than a copy) keeps a single source of truth: editing the original updates the active site, and removing the link disables the site without deleting the config.

---

## Test the Configuration

Validate the syntax before reloading so a typo cannot take Nginx down:

```bash
sudo nginx -t
```

- Expected output includes `syntax is ok` and `test is successful`.

---

## Reload Nginx

Apply the new config without interrupting active connections:

```bash
sudo systemctl reload nginx
```

- `reload` re-reads the config gracefully. This is preferred over `restart`, which briefly drops connections and would fail if the config is invalid.

---

## Example Config (Generalized)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name <your-domain> <optional-www>;

    root /var/www/<project>/current;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
```

- Replace placeholders with your actual values.
- Serve on the standard `listen 80` (and later `443` once TLS is set up), **not** a custom port like `8002` — a custom port was only needed on the old private server behind an upstream proxy.

---

## Reverse-Proxy a Node Service

For a Node backend (PERN or MERN), Nginx forwards traffic to the service running on `localhost` instead of serving files from disk:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name <your-domain>;

    location / {
        proxy_pass http://127.0.0.1:<app-port>;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- Replace `<app-port>` with the Node service port set in Step 10.

---

## Troubleshooting

See [Troubleshooting → Step 3](https://github.com/annetastic-personal/references/wiki/troubleshooting#step-3) for common Nginx errors and fixes.

---

[← Step 2](https://github.com/annetastic-personal/references/wiki/step-2-server-layout) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 4 →](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key)
