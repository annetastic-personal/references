# Step 2 Sample: Prepare Server Directory Layout (Portfolio Project)

This example shows how the directory layout step was implemented for the `portfolio` project as part of a multi-repo CI/CD setup. Repeat similar steps for each additional project (e.g., `ttg-collector`).

---

## Commands Used (on the server)

```bash
sudo mkdir -p /var/www/portfolio/releases
sudo mkdir -p /var/www/portfolio/shared
sudo mkdir -p /var/www/portfolio/releases/initial
sudo ln -sfn /var/www/portfolio/releases/initial /var/www/portfolio/current

sudo chown -R <deploy-user>:www-data /var/www/portfolio
sudo find /var/www/portfolio -type d -exec chmod 2755 {} \;
sudo find /var/www/portfolio -type f -exec chmod 644 {} \;

ls -la /var/www/portfolio
```

---

## Actual Layout

```
/var/www/portfolio/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

Repeat for each project you want to deploy (e.g., `/var/www/ttg-collector/`).

---

[← Step 1 Sample](https://github.com/annetastic-personal/references/wiki/step-1-personal-ssh-access-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 3 Sample →](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config-sample)
