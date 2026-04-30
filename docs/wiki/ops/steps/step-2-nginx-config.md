# Step 2: Configure Nginx Site

Worked example: [Step 2 Sample](https://github.com/odomaf/references/wiki/ops-steps-sample-step-2-nginx-config-sample)

Create and enable the Nginx site config that serves your web app from the `current` symlink on your chosen port.

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

## Troubleshooting

See your project's troubleshooting guide for common Nginx errors and fixes.

---

[← Step 1](step-1-server-layout.md) | [← Back to Index](../cicd-index.md) | [Next: Step 3 →](step-3-deploy-key.md)
