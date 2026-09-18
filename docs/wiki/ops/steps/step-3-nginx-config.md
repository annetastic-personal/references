# Step 3: Configure Nginx Site

> **Applies to:** All deployments.

Worked example: [Step 3 Sample](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config-sample)

## Purpose

Create and enable the Nginx site config that serves your web app — either directly from the `current` symlink (static site) or by reverse-proxying to a Node service on `localhost`.

---

## Commands (Generalized)

```bash
sudo nano /etc/nginx/sites-available/<your-site-config>
sudo ln -s /etc/nginx/sites-available/<your-site-config> /etc/nginx/sites-enabled/<your-site-config>
sudo nginx -t
sudo systemctl reload nginx
```

- Replace `<your-site-config>` with your project or domain name.

---

## Example Config (Generalized)

```nginx
server {
    listen <port>;
    listen [::]:<port>;
    server_name <your-domain> <optional-www>;

    root /home/<user>/<project>/current;
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

---

## Reverse-Proxy a Node Service

For a Node backend (PERN or MERN), Nginx forwards traffic to the service running on `localhost` instead of serving files from disk:

```nginx
server {
    listen <port>;
    listen [::]:<port>;
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

- Replace `<port>` with the public listen port and `<app-port>` with the Node service port set in Step 10.

---

## Troubleshooting

See [Troubleshooting → Step 3](https://github.com/annetastic-personal/references/wiki/troubleshooting#step-3) for common Nginx errors and fixes.

---

[← Step 2](https://github.com/annetastic-personal/references/wiki/step-2-server-layout) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 4 →](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key)
