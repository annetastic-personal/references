# Step 1 Sample: Set Up Personal SSH Access (Portfolio Project)

This example shows how personal, key-based SSH access was configured for the `portfolio` project server.

---

## Commands Used

Generate a personal key locally (this is your own login key, not the CI/CD deploy key):

```bash
ssh-keygen -t ed25519 -C "personal-login" -f ~/.ssh/id_ed25519
```

Copy the public key to the server (prompts for the current password once):

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 22 <deploy-user>@203.0.113.10
```

Verify key-based login:

```bash
ssh -i ~/.ssh/id_ed25519 -p 22 <deploy-user>@203.0.113.10 "echo personal-key-auth-ok"
```

After verification, disable password authentication in `/etc/ssh/sshd_config`:

```
PubkeyAuthentication yes
PasswordAuthentication no
```

Reload and confirm a fresh key session before closing the current one:

```bash
sudo systemctl reload sshd
```

---

## Notes

- The personal key is a single key for your own interactive access; each repository additionally gets a dedicated deploy key in Step 4.
- You can tag the line appended to `~/.ssh/authorized_keys` with a comment such as `# personal` for clarity.

---

[← Back to Index](../cicd-index.md) | [Next: Step 2 Sample →](step-2-server-layout-sample.md)
