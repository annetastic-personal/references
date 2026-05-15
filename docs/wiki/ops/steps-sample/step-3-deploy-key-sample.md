# Step 3 Sample: Create Deployment SSH Key Pair (Portfolio Project)

This example shows how to generate and use a dedicated SSH key pair for the `portfolio` project, following best practices for multi-repo CI/CD deployments.

---

## Commands Used

```bash
ssh-keygen -t ed25519 -C "ci-cd-deploy-portfolio" -f ~/.ssh/portfolio_deploy_key
cat ~/.ssh/portfolio_deploy_key.pub
```

After generating the key pair, copy the contents of `~/.ssh/portfolio_deploy_key.pub` and append it to the `~/.ssh/authorized_keys` file on your server. You can add a comment at the end of the line for clarity:

```
ssh-ed25519 AAAAC3... user@host # portfolio
```

---

## Key Files

| File                              | Purpose                                                        |
| --------------------------------- | -------------------------------------------------------------- |
| `~/.ssh/portfolio_deploy_key`     | Private key — store as GitHub Actions secret `SSH_PRIVATE_KEY` |
| `~/.ssh/portfolio_deploy_key.pub` | Public key — append to `~/.ssh/authorized_keys` on the server  |

> **Keep the private key secure. Never commit it to the repository. Only the public key should be shared with the server.**

---

[← Step 2 Sample](step-2-nginx-config-sample.md) | [Next: Step 4 Sample →](step-4-authorized-keys-sample.md)
