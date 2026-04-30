# Step 1 Sample: Prepare Server Directory Layout (Portfolio Project)

This example shows how the directory layout step was implemented for the `portfolio` project.

---

## Commands Used

```bash
mkdir -p /home/annetastic/public/releases
mkdir -p /home/annetastic/public/shared
mkdir -p /home/annetastic/public/releases/initial
ln -sfn /home/annetastic/public/releases/initial /home/annetastic/public/current
ls -la /home/annetastic/public
```

---

## Actual Layout

```
/home/annetastic/public/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

---

[← Back to Index](../cicd-index.md) | [Next: Step 2 Sample →](step-2-nginx-config-sample.md)
