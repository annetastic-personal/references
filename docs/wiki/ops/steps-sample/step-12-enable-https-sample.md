# Step 12 Sample: Enable HTTPS (portfolio)

This example enables HTTPS for `portfolio` at `annetasticthoughts.com` and `www.annetasticthoughts.com`.

---

## Commands Used

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d annetasticthoughts.com -d www.annetasticthoughts.com
sudo nginx -t
sudo systemctl reload nginx
curl -I https://annetasticthoughts.com
```

---

## Result

certbot adds `listen 443 ssl;` plus the certificate paths to the `server_name annetasticthoughts.com www.annetasticthoughts.com` block in `/etc/nginx/sites-available/annetasticthoughts.com`, and schedules auto-renewal via `certbot.timer`.

---

## Troubleshooting

See [Connectivity Troubleshooting](https://github.com/annetastic-personal/references/wiki/connectivity-troubleshooting) for "Unable to connect" symptoms.

---

[← Step 11 Sample](https://github.com/annetastic-personal/references/wiki/step-11-service-environment-database-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
