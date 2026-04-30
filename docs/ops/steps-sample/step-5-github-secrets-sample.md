# Step 5 Sample: Add GitHub Actions Repository Secrets (Portfolio Project)

This example shows the secrets used for the `portfolio` project.

---

## Secrets Used

| Secret               | Value                                      | Purpose                                                  |
| -------------------- | ------------------------------------------ | -------------------------------------------------------- |
| `SERVER_HOST`        | `203.0.113.10`                                | Destination server address                               |
| `SERVER_USER`        | `<deploy-user>`                               | SSH username for deployment                              |
| `SERVER_PORT`        | `22`                                       | SSH port                                                 |
| `SERVER_PATH`        | `/home/<deploy-user>/public`                  | Server path containing `releases/` and `current` symlink |
| `SSH_PRIVATE_KEY`    | Contents of `~/.ssh/github_actions_deploy` | Private key for SSH auth                                 |
| `SERVER_KNOWN_HOSTS` | Output of `ssh-keyscan -p 22 203.0.113.10`    | Pinned host keys to prevent MITM                         |

---

## Commands Used

```bash
cat ~/.ssh/github_actions_deploy
ssh-keyscan -p 22 203.0.113.10
```

---

[← Step 4 Sample](step-4-authorized-keys-sample.md) | [Next: Step 6 Sample →](step-6-workflow-sample.md)
