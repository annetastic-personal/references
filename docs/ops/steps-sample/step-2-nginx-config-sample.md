# Step 2 Sample: Configure Nginx Site (Portfolio Project)

This example shows the Nginx configuration used for the `portfolio` project.

---

## Commands Used

```bash
sudo nano /etc/nginx/sites-available/annetasticthoughts.com
sudo ln -s /etc/nginx/sites-available/annetasticthoughts.com /etc/nginx/sites-enabled/annetasticthoughts.com
sudo nginx -t
sudo systemctl reload nginx
```

---

## Config Used

```nginx
server {
    listen 8002;
    listen [::]:8002;
    server_name annetasticthoughts.com www.annetasticthoughts.com;

    root /home/annetastic/public/current;
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

---

## Troubleshooting

See [Troubleshooting → Step 2](../troubleshooting.md#step-2) for known syntax errors and fixes.

---

[← Step 1 Sample](step-1-server-layout-sample.md) | [Next: Step 3 Sample →](step-3-deploy-key-sample.md)
