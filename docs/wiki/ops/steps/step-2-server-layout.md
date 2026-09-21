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

### Why these flags matter

Permissions are split into owner, group, and everyone-else, each with read (`r`), write (`w`), and execute (`x`). For directories, `x` means "traverse into it" — Nginx must be able to traverse every directory in the path to reach your files. (This is why a `700` home directory causes a `500 Permission denied`.)

**`chown -R <deploy-user>:www-data <path>`**

- `chown` = change owner. `<deploy-user>:www-data` sets owner *and* group at once.
- `<deploy-user>` becomes the owner, so `rsync` can write new releases.
- `www-data` becomes the group, so Nginx (which runs as `www-data`) can read via that group.
- `-R` = recursive — applies to the directory and everything already inside it.

**`find <path> -type d -exec chmod 2755 {} \;`**

This is three tools chained together:

- `find <path> -type d` — list every **d**irectory under the path.
- `-exec <cmd> {} \;` — run `<cmd>` for each result, with `{}` standing in for the current item (`\;` ends the `-exec`; the backslash stops the shell from interpreting `;`).
- `chmod 2755` — set permissions and the setgid bit.

Decoding `2755`:

- The leading `2` is the **setgid** bit — the important part.
- `755` = `rwxr-xr-x`: owner can read/write/execute; group and others can read and execute (but not write).

The setgid bit means new files and directories created *inside* this directory inherit its **group** (`www-data`) instead of the creator's group. So every release `rsync` writes is automatically group-readable by Nginx — no per-deploy `chmod` needed. That is what makes this a one-time setup.

**`find <path> -type f -exec chmod 644 {} \;`**

Same `find … -exec` pattern, but for **f**iles (not directories):

- `chmod 644` = `rw-r--r--`: owner can read+write; group and others can read.
- No setgid `2` needed here — files just need to be group-readable.

Run `chown` first, then directories, then files.

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
