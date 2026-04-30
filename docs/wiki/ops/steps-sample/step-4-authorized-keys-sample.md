# Step 4 Sample: Add Deploy Public Key to Server (Portfolio Project)

This example shows how the deploy public key was authorized for the `portfolio` project.

---

## Commands Used

```bash
ssh <deploy-user>@203.0.113.10
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo '<PASTE_PUBLIC_KEY>' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## Verification

```bash
ssh -i ~/.ssh/github_actions_deploy -p 22 <deploy-user>@203.0.113.10 "echo deploy-key-auth-ok"
```

---

[← Step 3 Sample](step-3-deploy-key-sample.md) | [Next: Step 5 Sample →](step-5-github-secrets-sample.md)
