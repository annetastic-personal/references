# Step 2 Sample: Prepare Server Directory Layout (Portfolio Project)

This example shows how the directory layout step was implemented for the `portfolio` project as part of a multi-repo CI/CD setup. Repeat similar steps for each additional project (e.g., `ttg-collector`).

---

## Commands Used

```bash
mkdir -p /home/<deploy-user>/portfolio/releases
mkdir -p /home/<deploy-user>/portfolio/shared
mkdir -p /home/<deploy-user>/portfolio/releases/initial
ln -sfn /home/<deploy-user>/portfolio/releases/initial /home/<deploy-user>/portfolio/current
ls -la /home/<deploy-user>/portfolio
```

---

## Actual Layout

```
/home/<deploy-user>/portfolio/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

Repeat for each project you want to deploy (e.g., `/home/<deploy-user>/ttg-collector/`).

---

[← Step 1 Sample](https://github.com/annetastic-personal/references/wiki/step-1-personal-ssh-access-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 3 Sample →](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config-sample)
