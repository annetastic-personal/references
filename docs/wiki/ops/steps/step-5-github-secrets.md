# Step 5: Add CI/CD Repository Secrets

Worked example: [Step 5 Sample](../steps-sample/step-5-github-secrets-sample.md)

Add all required secrets to your repository so the workflow can authenticate and deploy.

---

## Secrets Required (Generalized)

| Secret               | Value                                      | Purpose                                                  |
| -------------------- | ------------------------------------------ | -------------------------------------------------------- |
| `SERVER_HOST`        | `<server-address>`                         | Destination server address                               |
| `SERVER_USER`        | `<deploy-user>`                            | SSH username for deployment                              |
| `SERVER_PORT`        | `<ssh-port>`                               | SSH port                                                 |
| `SERVER_PATH`        | `<deploy-path>`                            | Server path containing `releases/` and `current` symlink |
| `SSH_PRIVATE_KEY`    | Contents of `~/.ssh/<deploy_key_name>`     | Private key for SSH auth                                 |
| `SERVER_KNOWN_HOSTS` | Output of `ssh-keyscan -p <port> <server>` | Pinned host keys to prevent MITM                         |

---

## Commands

```bash
cat ~/.ssh/<deploy_key_name>
ssh-keyscan -p <port> <server>
```

---

## Important Notes

- All secrets must be plain values (no quotes, no extra whitespace).
- `SERVER_KNOWN_HOSTS` must include the full `ssh-keyscan` output including the host prefix on each line.
- If either secret is malformed, the workflow will fail with SSH errors.

---

[← Step 4](step-4-authorized-keys.md) | [← Back to Index](../cicd-index.md) | [Next: Step 6 →](step-6-workflow.md)
