# Step 4 Sample: Create Deployment SSH Key Pair (Portfolio Project)

This example shows how to generate and use a dedicated SSH key pair for the `portfolio` project, following best practices for multi-repo CI/CD deployments.

---

## Commands Used

```bash
ssh-keygen -t ed25519 -C "ci-cd-deploy-portfolio" -f ~/.ssh/portfolio_deploy_key
cat ~/.ssh/portfolio_deploy_key.pub
```

After generating the key pair, install the public key on the server — creating or editing `~/.ssh/authorized_keys` — which is covered in the [Step 5 Sample](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys-sample).

---

## Key Files

| File                              | Purpose                                                        |
| --------------------------------- | -------------------------------------------------------------- |
| `~/.ssh/portfolio_deploy_key`     | Private key — store as GitHub Actions secret `SSH_PRIVATE_KEY` |
| `~/.ssh/portfolio_deploy_key.pub` | Public key — append to `~/.ssh/authorized_keys` on the server  |

> **Keep the private key secure. Never commit it to the repository. Only the public key should be shared with the server.**

---

[← Step 3 Sample](https://github.com/annetastic-personal/references/wiki/step-3-nginx-config-sample) | [Next: Step 5 Sample →](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys-sample)
