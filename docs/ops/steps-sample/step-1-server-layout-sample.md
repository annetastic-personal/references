# Step 1 Sample: Prepare Server Directory Layout (Portfolio Project)

This example shows how the directory layout step was implemented for the `portfolio` project.

---

## Commands Used

```bash
mkdir -p /home/<deploy-user>/public/releases
mkdir -p /home/<deploy-user>/public/shared
mkdir -p /home/<deploy-user>/public/releases/initial
ln -sfn /home/<deploy-user>/public/releases/initial /home/<deploy-user>/public/current
ls -la /home/<deploy-user>/public
```

---

## Actual Layout

```
/home/<deploy-user>/public/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

---

[← Back to Index](../cicd-index.md) | [Next: Step 2 Sample →](step-2-nginx-config-sample.md)
