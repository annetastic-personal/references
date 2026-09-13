# Implementation Plan: Update ops CI/CD Steps for the Dreamhost VPS Migration

Created: 2026-09-11
Status: Proposed (draft — review before executing)

## Purpose

Update the CI/CD documentation in `docs/wiki/ops/steps/` and `docs/wiki/ops/steps-sample/` so it is correct, no longer tied to the old private server, and safe to follow for configuring the new Dreamhost VPS ("PostgreSQL on Debian 13"). Then use the corrected steps to set up SSH keys and deploy portfolio (static) and TTGCollector (Node + PostgreSQL).

## Process

- Confirm readiness before starting each step — ask "Are you ready to move to step X?" and wait for the answer.
- Mark a step's checkbox as complete only after the change is applied and confirmed complete.

## Review findings this plan addresses

1. **Old-server-specific values** — `203.0.113.10`, user `<deploy-user>`, GitHub org `<old-org>` (in sample config URLs and in the prev/next wiki links), domain `annetasticthoughts.com` (DNS), and the `ARM64`/`deploy-lan` runner labels.
2. **Internal inconsistencies** — step 1 (`/portfolio/`) vs step 2 (`/public/`) path mismatch; step 3 duplicate "private key" table row; deploy-key name drift (`portfolio_deploy_key` → `github_actions_deploy` → `portfolio_key`); step 5 sample's broken secrets table; step 6 sample `linux-x64` vs steps 6/7 `ARM64`.
3. **Broken cross-references** — the step docs link to `../cicd-index.md` and the sample links to `../troubleshooting.md`; neither file exists under `docs/wiki/ops/`.
4. **Pitfalls** — the sample workflow omits ssh-agent + known_hosts + port handling; the self-hosted runner may no longer be necessary; TTGCollector is a Node service (not a static `dist/` deploy); no step disables password auth; no personal SSH login-key step.

## Decisions (recommended)

- **Runner (confirmed):** switch to GitHub-hosted runners and remove the self-hosted-runner step. The old runner existed only because GitHub could not reach the private `203.0.113.10`; the Dreamhost VPS is publicly reachable — and the self-hosted runner was too volatile to rely on.
- **Deploy user:** create a dedicated non-root user (for example, `deploy`); do not deploy as root.
- **Keys:** use one personal SSH login key for interactive access, and a separate per-repo deploy key for CI/CD.
- **New docs:** add a personal SSH login-key step and a TTGCollector (Node service) deploy step.
- **Secrets & privacy:** never commit real IP, hostname, username, port, or key values to docs (public or private). Use placeholders in all published files; keep real values only in GitHub Secrets and a private local notes file.

## Assumptions

- I work in bash terminals only; OpenSSH and rsync are available on the local machine and the server.
- The Dreamhost VPS is x86_64 (confirmed) running Debian 13 (trixie).
- SSH listens on port 22 (confirmed — I logged in successfully on the standard SSH port).
- I already have username/password SSH access (confirmed — I have logged in).

## Step-by-step plan

### Phase A — Gather the new-server values

- [x] **A1** — Record the Dreamhost VPS public hostname or IP, the SSH username, and the SSH port (store these privately — not in committed docs).
- [x] **A2** — Log in and run `uname -m` to confirm the architecture.

### Phase B — Update old-server references

- [x] **B1** — Replace `203.0.113.10` with a documentation placeholder (for example, `203.0.113.10`) in steps-sample 3, 4, and 5 — do not use the real public IP.
- [x] **B2** — Replace `<deploy-user>` with a placeholder (for example, `<deploy-user>`).
- [x] **B3** — Replace the `<old-org>` GitHub org with the current org (confirm with `git remote -v`) in the sample config URL and in the prev/next wiki links in the step docs.
- [x] **B4** — Remove all self-hosted runner references (`ARM64` / `deploy-lan` labels; step 6 file removal is B6), since we are switching to GitHub-hosted runners.
- [x] **B5** — Record that `annetasticthoughts.com` DNS must be repointed to the new server IP.
- [x] **B6** — Archive or remove step 6 (self-hosted runner) and its sample; decide whether to renumber steps 7–9 or leave the gap and mark step 6 obsolete.

### Phase C — Fix internal inconsistencies

- [x] **C1** — Make step 1 and step 2 agree on one project path (`/home/<user>/portfolio/`).
- [x] **C2** — Remove the duplicate "private key" row from the step 3 key-files table.
- [x] **C3** — Standardize the deploy-key filename across steps 3–5 (choose `portfolio_deploy_key` and use it consistently).
- [x] **C4** — Repair the step 5 sample secrets table so `SSH_PRIVATE_KEY` and `SERVER_KNOWN_HOSTS` are proper rows.
- [x] **C5** — Reconcile step 6's `linux-x64` with the architecture advertised in steps 6–7 (moot: step 6 removed under B6; no `linux-x64`/`ARM64` remain).

### Phase D — Complete the sample workflow (step 7)

- [x] **D1** — Add a step that loads `SSH_PRIVATE_KEY` through `ssh-agent`.
- [x] **D2** — Add a step that writes `SERVER_KNOWN_HOSTS` into `~/.ssh/known_hosts`.
- [x] **D3** — Use `SERVER_PORT` in the `ssh` and `rsync` commands.
- [x] **D4** — Make the deploy and prune commands non-interactive (pinned `known_hosts` + `set -euo pipefail`).
- [x] **D5** — Change `runs-on` from `[self-hosted, linux, ARM64, deploy-lan]` to `ubuntu-latest` (GitHub-hosted).

### Phase E — Fix the cross-references

- [x] **E1** — Create `docs/wiki/ops/cicd-index.md` that lists the steps, or repoint the "Back to Index" links to a real target.
- [x] **E2** — Add `docs/wiki/ops/troubleshooting.md` or remove the dead links to it.

### Phase F — Add a personal SSH login-key step

- [x] **F1** — Document generating a personal key locally and appending its `.pub` to `~/.ssh/authorized_keys` on the server.
- [x] **F2** — Document disabling password authentication after key login is verified.

### Phase G — Add a TTGCollector (Node service) deploy path

- [x] **G1** — Document running the Express/Node backend as a persistent service (systemd or PM2).
- [x] **G2** — Document `server/.env` (database connection, `SESSION_SECRET`) and the schema setup.
- [x] **G3** — Document the portfolio static `dist/` flow separately (already covered) and the reverse-proxy route for TTGCollector.

### Phase H — Execute

- [ ] **H1** — Complete SSH key setup using the corrected steps.
- [ ] **H2** — Deploy portfolio (static) and TTGCollector (Node + PostgreSQL).
- [ ] **H3** — Repoint `annetasticthoughts.com` DNS (A/AAAA records) to the new server IP at cutover.

### Phase I — Restructure & polish (shared core + stack variants)

- [x] **I1** — Backfill a `## Purpose` section and an `Applies to:` tag on every generalized step page (samples keep their one-line intros).
- [x] **I2** — Add the Workflow deploy-body variants (static: `rsync` + symlink swap vs. service: `rsync` + `systemctl restart`).
- [x] **I3** — Rewrite `cicd-index.md` into Universal / Static / Node-service groups with applies-to tags.
- [x] **I4** — Renumber/rename all step files, prev/next links, and `Home.md` in one pass (contiguous 1–11; Nginx sample covers both serving variants).

## Open questions

- Resolved: SSH port is 22 (confirmed).
- Resolved: drop the self-hosted runner and use GitHub-hosted runners.
