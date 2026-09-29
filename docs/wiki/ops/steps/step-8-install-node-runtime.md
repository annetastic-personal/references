# Step 8: Install Node.js Runtime

> **Applies to:** Node service deployments (PERN, MERN).

Worked example: [Step 8 Sample](https://github.com/annetastic-personal/references/wiki/step-8-install-node-runtime-sample)

## Purpose

The deploy workflow runs `npm ci --omit=dev` on the server, and the systemd
unit (Step 9) launches the app with `/usr/bin/node`. Both require Node.js (and
npm) to be installed **on the server** — not just on the GitHub runner. Install
it before the first deploy (Step 11).

---

## Install Node.js (system-wide)

Install via NodeSource so the binary lands at `/usr/bin/node` — the path the
systemd unit uses — and matches the version your project declares in
`package.json` `engines`:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

- Replace `20.x` with the major version matching your `engines` (for example
  `setup_22.x` for Node 22).
- Use a system-wide install (apt/NodeSource), **not** `nvm`: `nvm` installs to
  `~/.nvm`, which is not on the `PATH` for the non-interactive SSH session the
  workflow uses, and systemd (`/usr/bin/node`) will not find it.

---

## Verify

Confirm the version and install location on the server:

```bash
node -v
npm -v
which node
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

Then confirm that a non-interactive SSH session — the same kind the workflow
uses — can see it too:

```bash
ssh <user>@<server> -p <port> "command -v npm && node -v && npm -v"
```

> **Runs on:** your machine (the quoted command runs on the server).

Expected: `which node` prints `/usr/bin/node`, and the last command prints a
version without `command not found`.

---

[← Step 7](https://github.com/annetastic-personal/references/wiki/step-7-workflow) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 9 →](https://github.com/annetastic-personal/references/wiki/step-9-run-node-service)
