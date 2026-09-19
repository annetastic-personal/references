# Step 6: Add CI/CD Repository Secrets

> **Applies to:** All deployments.

Worked example: [Step 6 Sample](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets-sample)

## Purpose

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
ssh-keyscan -q -p <port> <server>
```

### What `ssh-keyscan` does

`ssh-keyscan` fetches the server's SSH **host key** — the server's public identity used to verify you are connecting to the real server (not an impostor). Capturing it into `SERVER_KNOWN_HOSTS` lets the GitHub Actions runner trust the server non-interactively, instead of hanging on the "authenticity of host ... can't be established" prompt.

The `-q` flag suppresses the `# host:port SSH-2.0-...` banner/comment lines, leaving only the real host-key lines.

### Expected output

One line **per host-key type**, each formatted as `host key-type base64-key`. Most servers advertise two or three key types, so expect two or three lines:

```
<server> ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC...
<server> ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAI...
<server> ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...
```

If you see `# ...` banner lines in the output, they are comments written to **stdout** — drop them from the secret (or use `-q` to omit them). Do not add quotes around the value.

### How to know the output is correct

- Every line starts with the exact address you will put in `SERVER_HOST`.
- Each line has a non-empty base64 blob after the key type.
- The key type is one of `ssh-ed25519`, `ecdsa-sha2-nistp256`, or `ssh-rsa`.

> The keyscan target must match `SERVER_HOST`: scan the IP if `SERVER_HOST` is the IP, or the hostname if it is the hostname — otherwise the runner will not find a matching entry and host-key verification fails.

To cross-check against a host you have connected to before, compare with the entry already recorded in your local known_hosts:

```bash
ssh-keygen -F <server>
```

---

## Important Notes

- All secrets must be plain values (no quotes, no extra whitespace).
- `SERVER_KNOWN_HOSTS` must include the full host-key lines from `ssh-keyscan` (excluding any `#` banner/comment lines), each with the host prefix on the line.
- If either secret is malformed, the workflow will fail with SSH errors.

---

[← Step 5](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 7 →](https://github.com/annetastic-personal/references/wiki/step-7-workflow)
