# CI/CD Setup

A generalized, step-by-step reference for deploying web applications with GitHub Actions, a versioned release directory, and Nginx. Each step links to a guide and a worked example.

## Reading the commands

Each step's commands run in one of these places:

- **Your machine** — `ssh-keygen`, `ssh-copy-id`, `cat`, and `ssh-keyscan` run in your own terminal.
- **The server** — bare remote paths (`/var/www/...`, `/etc/...`) and `sudo` / `systemctl` commands must be run *inside* an SSH session on the server. SSH in first, then run them at the remote prompt.
- **A line starting `ssh <user>@<server> "..."`** — typed on your machine, but the quoted part executes on the server.
- **The GitHub runner** — steps inside a workflow YAML run in CI, not on your machine or the destination server.

Individual steps label each command block as **Local**, **Server**, or **GitHub runner**.

## Universal steps (every deployment)

| Step | Applies to |
|------|-----------|
| [Step 1: Set Up Personal SSH Access](https://github.com/annetastic-personal/references/wiki/step-1-personal-ssh-access) | All |
| [Step 2: Prepare Server Directory Layout](https://github.com/annetastic-personal/references/wiki/step-2-server-layout) | All |
| [Step 3: Configure Nginx Site](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config) | All (static or proxy) |
| [Step 4: Create Deployment SSH Key Pair](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key) | All |
| [Step 5: Add Deploy Public Key to Server](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys) | All |
| [Step 6: Add CI/CD Repository Secrets](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets) | All |
| [Step 7: Create CI/CD Workflow](https://github.com/annetastic-personal/references/wiki/step-7-workflow) | All (static or service deploy) |
| [Step 11: Push and Verify Deployment](https://github.com/annetastic-personal/references/wiki/step-11-deploy-and-verify) | All |
| [Step 12: Confirm Rollback Procedure](https://github.com/annetastic-personal/references/wiki/step-12-rollback) | All |
| [Step 13: Enable HTTPS with Let's Encrypt](https://github.com/annetastic-personal/references/wiki/step-13-enable-https) | All |

## Node service additions (PERN / MERN)

| Step | Applies to |
|------|-----------|
| [Step 8: Install Node.js Runtime](https://github.com/annetastic-personal/references/wiki/step-8-install-node-runtime) | Node service |
| [Step 9: Run a Node Service (systemd)](https://github.com/annetastic-personal/references/wiki/step-9-run-node-service) | Node service |
| [Step 10: Service Environment & Database](https://github.com/annetastic-personal/references/wiki/step-10-service-environment-database) | Node service (PostgreSQL / MongoDB) |

## Which steps do I need?

- **Static site** (e.g., `portfolio`): follow the universal steps — 1–7, then
  11–13 (skip the Node steps 8–10). In
  [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config)
  serve the `current` symlink directly (`try_files`); in
  [Step 7](https://github.com/annetastic-personal/references/wiki/step-7-workflow)
  use the static deploy body (`rsync dist/` + symlink swap).
- **Node service** (PERN/MERN, e.g., `ttgcollector`): follow steps 1–10, then
  11–13. Complete Steps 8–10 (install Node, run the service, environment &
  database) **before** Step 11 (deploy) — the deploy runs `npm ci --omit=dev`
  and `systemctl restart` on the server. In
  [Step 3](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config)
  reverse-proxy to the Node process (`proxy_pass`); in
  [Step 7](https://github.com/annetastic-personal/references/wiki/step-7-workflow)
  use the service deploy body (`rsync` + `systemctl restart`).

## Reference

- [Deployment Troubleshooting](https://github.com/annetastic-personal/references/wiki/troubleshooting) — diagnose deployment problems by symptom.
- [Connectivity Troubleshooting](https://github.com/annetastic-personal/references/wiki/connectivity-troubleshooting) — diagnose connectivity (timeout/refused/firewall).

