# Step 3: Create Deployment SSH Key Pair

Worked example: [Step 3 Sample](../steps-sample/step-3-deploy-key-sample.md)

Generate a dedicated SSH key pair for your CI/CD system to authenticate with the server.

---

## Commands (Generalized)

```bash
ssh-keygen -t ed25519 -C "ci-cd-deploy" -f ~/.ssh/<deploy_key_name>
cat ~/.ssh/<deploy_key_name>.pub
```

- Replace `<deploy_key_name>` with a unique name for your project (e.g., `ci_cd_deploy`).

---

## Key Files

| File                           | Purpose                              |
| ------------------------------ | ------------------------------------ |
| `~/.ssh/<deploy_key_name>`     | Private key — goes into CI/CD secret |
| `~/.ssh/<deploy_key_name>.pub` | Public key — goes onto the server    |

> **Keep the private key secure. Never commit it to the repository.**

---

[← Step 2](step-2-nginx-config.md) | [← Back to Index](../cicd-index.md) | [Next: Step 4 →](step-4-authorized-keys.md)
