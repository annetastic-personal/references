# Step 1 Sample: Prepare Server Directory Layout (Portfolio Project)

This example shows how the directory layout step was implemented for the `portfolio` project as part of a multi-repo CI/CD setup. Repeat similar steps for each additional project (e.g., `ttg-collector`).

---

## Commands Used

```bash
mkdir -p /home/annetastic/portfolio/releases
mkdir -p /home/annetastic/portfolio/shared
mkdir -p /home/annetastic/portfolio/releases/initial
ln -sfn /home/annetastic/portfolio/releases/initial /home/annetastic/portfolio/current
ls -la /home/annetastic/portfolio
```

---

## Actual Layout

```
/home/annetastic/portfolio/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

Repeat for each project you want to deploy (e.g., `/home/annetastic/ttg-collector/`).

---

[← Back to Index](../cicd-index.md) | [Next: Step 2 Sample →](step-2-nginx-config-sample.md)
