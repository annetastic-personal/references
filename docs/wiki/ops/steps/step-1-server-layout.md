# Step 1: Prepare Server Directory Layout

Worked example: [Step 1 Sample](https://github.com/odomaf/references/wiki/step-1-server-layout-sample)

For multi-repo CI/CD, repeat the following structure for each project/repo you want to deploy. Each project should have its own directory under your deployment user's home directory. This pattern supports atomic deployments and easy rollbacks for multiple apps on the same server.

---

## Commands (Generalized for Multi-Repo)

Repeat these commands for each project (e.g., portfolio, TTG Collector):

```bash
mkdir -p /home/<user>/<project>/releases
mkdir -p /home/<user>/<project>/shared
mkdir -p /home/<user>/<project>/releases/initial
ln -sfn /home/<user>/<project>/releases/initial /home/<user>/<project>/current
ls -la /home/<user>/<project>
```

- Replace `<user>` with your deployment user (e.g., `deploy`, `ubuntu`, etc.)
- Replace `<project>` with the unique folder name for each repo (e.g., `portfolio`, `ttg-collector`).

---

## Expected Layout (per project)

```
/home/<user>/<project>/
  current -> releases/initial   (symlink)
  releases/
    initial/
  shared/
```

Repeat for each project you want to deploy. Example projects: `portfolio`, `ttg-collector`.

---

[← Back to Index](../cicd-index.md) | [Next: Step 2 →](step-2-nginx-config.md)
