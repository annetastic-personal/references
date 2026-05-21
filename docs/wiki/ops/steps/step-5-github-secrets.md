# Step 5: Add CI/CD Repository Secrets

Worked example: [Step 5 Sample](https://github.com/odomaf/references/wiki/step-5-github-secrets-sample)

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

## Where to Add These Secrets in GitHub

Add each secret as a **Repository Secret** (not an Environment Secret) in your GitHub repository:

1. Go to your repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, select **Secrets and variables** > **Actions**.
4. Click the **Repository secrets** tab.
5. Click **New repository secret** for each secret listed above, and paste the corresponding value.

> Do not add these as Environment secrets unless your workflow specifically requires environment scoping. For most CI/CD workflows, repository secrets are correct.

---

## Commands

To retrieve the SSH private key for use as the `SSH_PRIVATE_KEY` secret:

```bash
cat ~/.ssh/<deploy_key_name>
```

This command outputs the contents of your SSH private key file. Copy the entire output—including the header (`-----BEGIN OPENSSH PRIVATE KEY-----`), the footer (`-----END OPENSSH PRIVATE KEY-----`), and all lines in between—exactly as shown. Use this as the value for the `SSH_PRIVATE_KEY` secret in your repository settings. This allows the CI/CD workflow to authenticate to your server securely.

To retrieve the SSH host key for use as the `SERVER_KNOWN_HOSTS` secret:

```bash
ssh-keyscan -p <port> <server>
```

This command fetches the SSH host key for your server. Copy the full output and use it as the value for the `SERVER_KNOWN_HOSTS` secret. This ensures the workflow can verify the server's identity and helps prevent man-in-the-middle attacks.

---

## Important Notes

- All secrets must be plain values (no quotes, no extra whitespace).
- `SERVER_KNOWN_HOSTS` must include the full `ssh-keyscan` output including the host prefix on each line.
- If either secret is malformed, the workflow will fail with SSH errors.

---

[← Step 4](https://github.com/odomaf/references/wiki/step-4-authorized-keys) | [← Back to Index](../cicd-index.md) | [Next: Step 6 →](https://github.com/odomaf/references/wiki/step-6-runner-setup)
