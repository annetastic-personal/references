# Step 3 Sample: Configure Nginx Site (Static + Reverse Proxy)

This example shows Nginx for a static site (`portfolio`) and a reverse-proxied Node service (`ttgcollector`).

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

    root /home/<deploy-user>/portfolio/current;
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

## Reverse Proxy (TTGCollector)

TTGCollector is an Express backend on port 3001, so Nginx proxies requests to it instead of serving files:

```nginx
server {
    listen 80;
    server_name <ttgcollector-domain>;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- Replace `<ttgcollector-domain>` with the domain or subdomain you want for TTGCollector.

---

## Troubleshooting

See [Troubleshooting → Step 3](https://github.com/annetastic-personal/references/wiki/troubleshooting#step-3) for known syntax errors and fixes.

---

[← Step 2 Sample](https://github.com/annetastic-personal/references/wiki/step-2-server-layout-sample) | [Next: Step 4 Sample →](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key-sample)
