# Step 4 Sample: Add Deploy Public Key to Server (Portfolio Project)

This example shows how the deploy public key was authorized for the `portfolio` project.

---

## Example: Portfolio Project

Suppose your deployment user is `annetastic` and your server address is `10.5.6.15`. Your public key (from Step 3) might look like this (example only, do not use this key):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFAKeFakeKeyExample1234567890abcdefg annetastic@portfolio # portfolio
```

### Steps

1. Connect to your server using your preferred SSH client (e.g., PuTTY, OpenSSH, MobaXterm):
   - Host: 10.5.6.15
   - Username: annetastic

2. If ~/.ssh does not exist, create it:

   ```bash
   mkdir -p ~/.ssh && chmod 700 ~/.ssh
   ```

3. Append the public key to authorized_keys (do not overwrite the file):
   ```bash
   echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFAKeFakeKeyExample1234567890abcdefg annetastic@portfolio # portfolio' >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

**Note:** The SSH key above is a fake example for documentation purposes only.

---

## Verification

```bash
ssh -i ~/.ssh/github_actions_deploy -p 22 annetastic@10.5.6.15 "echo deploy-key-auth-ok"
```

---

[← Step 3 Sample](step-3-deploy-key-sample.md) | [Next: Step 5 Sample →](step-5-github-secrets-sample.md)
