# Step 6 Sample: Add GitHub Actions Repository Secrets (Portfolio Project)

This example shows the secrets used for the `portfolio` project.

---

## Secrets Used

| Secret        | Value                        | Purpose                                                  |
| ------------- | ---------------------------- | -------------------------------------------------------- |
| `SERVER_HOST` | `203.0.113.10`                  | Destination server address                               |
| `SERVER_USER` | `<deploy-user>`                 | SSH username for deployment                              |
| `SERVER_PORT` | `22`                         | SSH port                                                 |
| `SERVER_PATH` | `/var/www/portfolio` | Server path containing `releases/` and `current` symlink |
| `SSH_PRIVATE_KEY`    | Contents of `~/.ssh/portfolio_deploy_key`  | Private key for SSH auth                                 |
| `SERVER_KNOWN_HOSTS` | Output of `ssh-keyscan -p 22 203.0.113.10` | Pinned host keys to prevent MITM                         |

> **Multi-repo note:**
> For multiple repositories, use a unique subfolder for each repo, e.g., `/var/www/<repo-name>`. This keeps deployments isolated and organized per project.

---

## Commands Used (on your machine)

```bash
cat ~/.ssh/portfolio_deploy_key

# Host key — capture only the non-# lines (-q suppresses the banners)
ssh-keyscan -q -p 22 203.0.113.10
```

`ssh-keyscan` prints one `<host> <key-type> <base64>` line per host-key type (usually `ssh-rsa`, `ecdsa-sha2-nistp256`, and `ssh-ed25519`). The `-q` flag omits the `# host:port SSH-2.0-...` banner/comment lines, so copy the remaining lines into `SERVER_KNOWN_HOSTS`.

---

[← Step 5 Sample](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys-sample) | [Next: Step 7 Sample →](https://github.com/annetastic-personal/references/wiki/step-7-workflow-sample)
