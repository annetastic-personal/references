# Step 3 Sample: Create Deployment SSH Key Pair (Portfolio Project)

This example shows the SSH key pair generation for the `portfolio` project.

---

## Commands Used

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
cat ~/.ssh/github_actions_deploy.pub
```

---

## Key Files

| File                               | Purpose                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| `~/.ssh/github_actions_deploy`     | Private key — goes into GitHub secret `SSH_PRIVATE_KEY` |
| `~/.ssh/github_actions_deploy.pub` | Public key — goes onto the server in Step 4             |

> **Keep the private key secure. Never commit it to the repository.**

---

[← Step 2 Sample](step-2-nginx-config-sample.md) | [Next: Step 4 Sample →](step-4-authorized-keys-sample.md)
