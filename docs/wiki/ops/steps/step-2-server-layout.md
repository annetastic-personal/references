# Step 2: Prepare Server Directory Layout

> **Applies to:** All deployments.

Worked example: [Step 2 Sample](https://github.com/annetastic-personal/references/wiki/step-2-server-layout-sample)

## Purpose

For multi-repo CI/CD, repeat the following structure for each project/repo you want to deploy. Each project gets its own directory under `/var/www` — the conventional, web-readable location — rather than a `700` user home directory (which blocks Nginx). This pattern supports atomic deployments and easy rollbacks for multiple apps on the same server.

---

## Commands (Generalized for Multi-Repo)

Repeat these commands for each project (e.g., portfolio, TTG Collector):

```bash
sudo mkdir -p /var/www/<project>/releases
sudo mkdir -p /var/www/<project>/shared
sudo mkdir -p /var/www/<project>/releases/initial
sudo ln -sfn /var/www/<project>/releases/initial /var/www/<project>/current
ls -la /var/www/<project>
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

- Replace `<project>` with the unique folder name for each repo (e.g., `portfolio`, `ttg-collector`).

---

## Set Ownership and Permissions

Give the deploy user ownership (so `rsync` can write new releases) and let Nginx (`www-data`) read via the shared group. The `2755` setgid bit on directories makes new files inherit the `www-data` group automatically, so each deployment stays group-readable without a manual `chmod`:

```bash
sudo chown -R <deploy-user>:www-data /var/www/<project>
sudo find /var/www/<project> -type d -exec chmod 2755 {} \;
sudo find /var/www/<project> -type f -exec chmod 644 {} \;
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

---

## Expected Layout (per project)

```
/var/www/<project>/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

Repeat for each project you want to deploy. Example projects: `portfolio`, `ttg-collector`.

---

[← Step 1](https://github.com/annetastic-personal/references/wiki/step-1-personal-ssh-access) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 3 →](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config)
