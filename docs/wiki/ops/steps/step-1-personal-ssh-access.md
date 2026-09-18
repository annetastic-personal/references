# Step 1: Set Up Personal SSH Access

> **Applies to:** All deployments.

Worked example: [Step 1 Sample](https://github.com/annetastic-personal/references/wiki/step-1-personal-ssh-access-sample)

## Purpose

Replace password login with key-based login for your own account before configuring the server. Do not deploy over password or as root.

---

## Generate a Personal Key Locally

```bash
ssh-keygen -t ed25519 -C "personal-login" -f ~/.ssh/id_ed25519
```

> If `~/.ssh/id_ed25519` already exists, choose a different filename rather than overwriting it.

## Copy the Public Key to the Server

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p <port> <user>@<server>
```

This appends your public key to `~/.ssh/authorized_keys` on the server. You are prompted for the current password once.

## Verify Key-Based Login

```bash
ssh -i ~/.ssh/id_ed25519 -p <port> <user>@<server> "echo personal-key-auth-ok"
```

Expected output: `personal-key-auth-ok`.

## Disable Password Authentication

Only after key-based login is verified, turn off password authentication on the server.

```bash
sudo vim /etc/ssh/sshd_config
```

Set (or confirm) these values:

```
PubkeyAuthentication yes
PasswordAuthentication no
```

Reload the SSH daemon:

```bash
sudo systemctl reload sshd
```

> Keep your current session open and confirm a **new** key-based session connects before closing it, so you do not lock yourself out.

---

[← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 2 →](https://github.com/annetastic-personal/references/wiki/step-2-server-layout)
