# Step 5 Sample: Add Deploy Public Key to Server (Portfolio Project)

This example shows how the deploy public key was authorized for the `portfolio` project.

---

## Example: Portfolio Project

Suppose your deployment user is `<deploy-user>` and your server address is `203.0.113.10`. Your public key (from Step 4) might look like this (example only, do not use this key):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFAKeFakeKeyExample1234567890abcdefg <deploy-user>@portfolio
```

### Steps (on the server — SSH in first)

1. Connect to your server using your preferred SSH client (e.g., PuTTY, OpenSSH, MobaXterm):
   - Host: 203.0.113.10
   - Username: <deploy-user>

2. If ~/.ssh does not exist, create it:

   ```bash
   mkdir -p ~/.ssh && chmod 700 ~/.ssh
   ```

3. Append the public key to authorized_keys (do not overwrite the file):
   ```bash
   echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFAKeFakeKeyExample1234567890abcdefg <deploy-user>@portfolio' >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

> **Note:**  
> You only need to run the `chmod` commands if you just created the `~/.ssh` directory or the `authorized_keys` file.  
> - If `~/.ssh` and `authorized_keys` already exist from a previous repo setup, you can skip the `chmod` commands unless you encounter permission errors.
> - To check permissions, run `ls -ld ~/.ssh` and `ls -l ~/.ssh/authorized_keys`.  
>   - `~/.ssh` should show `drwx------` (700).  
>   - `authorized_keys` should show `-rw-------` (600).  
> - If the permissions match, no further action is needed. If not, use the `chmod` commands as shown above.

**Note:** The SSH key above is a fake example for documentation purposes only.

---

## Verification (from your machine)

```bash
ssh -i ~/.ssh/portfolio_deploy_key -p 22 <deploy-user>@203.0.113.10 "echo deploy-key-auth-ok"
```

---

[← Step 4 Sample](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key-sample) | [Next: Step 6 Sample →](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets-sample)
