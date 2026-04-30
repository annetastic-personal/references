# Step 1: Prepare Server Directory Layout

Worked example: [Step 1 Sample](../steps-sample/step-1-server-layout-sample.md)

Create the versioned release directory structure and `current` symlink on your deployment server. This pattern supports atomic deployments and easy rollbacks.

---

## Commands (Generalized)

```bash
mkdir -p /home/<user>/<project>/releases
mkdir -p /home/<user>/<project>/shared
mkdir -p /home/<user>/<project>/releases/initial
ln -sfn /home/<user>/<project>/releases/initial /home/<user>/<project>/current
ls -la /home/<user>/<project>
```

- Replace `<user>` with your deployment user (e.g., `deploy`, `ubuntu`, etc.)
- Replace `<project>` with your project or app folder name

---

## Expected Layout

```
/home/<user>/<project>/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

---

[← Back to Index](../cicd-index.md) | [Next: Step 2 →](step-2-nginx-config.md)
