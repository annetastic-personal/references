# Step 3: Create Deployment SSH Key Pair

Worked example: [Step 3 Sample](https://github.com/odomaf/references/wiki/step-3-deploy-key-sample)

Generate a dedicated SSH key pair for your CI/CD system to authenticate with the server. For multi-repo setups, generate a unique key pair for each repository (e.g., portfolio, ttgcollector) and use a descriptive filename for each key (such as ~/.ssh/portfolio_deploy_key).

---

## Commands (Generalized)

```bash
ssh-keygen -t ed25519 -C "ci-cd-deploy" -f ~/.ssh/<deploy_key_name>
cat ~/.ssh/<deploy_key_name>.pub
```

- Replace `<deploy_key_name>` with a unique name for your project (e.g., `portfolio_deploy_key`, `ttgcollector_key`).
- The -C flag adds a comment to the key for easier identification.

**Note:** ssh-keygen only creates the key files; it does not add the public key to your server. You must manually copy the contents of `~/.ssh/<deploy_key_name>.pub` and append it to the `~/.ssh/authorized_keys` file on your target server.

You can add a comment at the end of each line in `authorized_keys` to indicate which repo the key is for. Example:

```
ssh-ed25519 AAAAC3... user@host # portfolio
ssh-ed25519 AAAAC3... user@host # ttgcollector
```

---

## Key Files

| File                           | Purpose                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `~/.ssh/<deploy_key_name>`     | Private key — store as a GitHub Actions secret (e.g., SSH_PRIVATE_KEY)           |
| `~/.ssh/<deploy_key_name>`     | Private key — store as a GitHub Actions secret (e.g., SSH_PRIVATE_KEY) in Step 5 |
| `~/.ssh/<deploy_key_name>.pub` | Public key — append to `~/.ssh/authorized_keys` on the server in Step 4          |

> **Keep the private key secure. Never commit it to the repository. Only the public key should be shared with the server.**

---

[← Step 2](https://github.com/odomaf/references/wiki/step-2-nginx-config) | [← Back to Index](../cicd-index.md) | [Next: Step 4 →](https://github.com/odomaf/references/wiki/step-4-authorized-keys)
