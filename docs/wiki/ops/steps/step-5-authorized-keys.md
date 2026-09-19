# Step 5: Add Deploy Public Key to Server

> **Applies to:** All deployments.

Worked example: [Step 5 Sample](https://github.com/annetastic-personal/references/wiki/step-5-authorized-keys-sample)

## Purpose

Authorize the deploy public key on the server and verify SSH key-based authentication works.

## About `authorized_keys`

`~/.ssh/authorized_keys` is a file on the **server** (in the deploy user's home directory) that lists every public key allowed to log into that account, one key per line. This step creates or updates that file — it lives on the server, not on your local machine.

- **First deployment:** the `~/.ssh` directory and `authorized_keys` do not exist yet; create both here.
- **Additional deployments:** `authorized_keys` already exists; just append a new line.

Each key is identified by the `-C` comment set when it was generated in Step 4, so you can tell which repo a line belongs to after several deployments.

You can use any SSH client (e.g., PuTTY, OpenSSH, MobaXterm) to connect to your server.

> **Connection problems?** See [SSH Troubleshooting](https://github.com/annetastic-personal/references/wiki/ssh-troubleshooting) for timeouts, refused connections, and firewall or fail2ban issues.

---

## Commands (Generalized)

1. Connect to your server using your preferred SSH client (e.g., PuTTY, OpenSSH, MobaXterm).

2. If ~/.ssh does not exist, create it:

   ```bash
   mkdir -p ~/.ssh && chmod 700 ~/.ssh
   ```

3. Append the public key generated in Step 4 to authorized_keys (do not overwrite the file):
   ```bash
   echo '<PASTE_PUBLIC_KEY>' >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

> **Note:**  
> You only need to run the `chmod` commands if you just created the `~/.ssh` directory or the `authorized_keys` file.
>
> - If `~/.ssh` and `authorized_keys` already exist from a previous repo setup, you can skip the `chmod` commands unless you encounter permission errors.
> - To check permissions, run `ls -ld ~/.ssh` and `ls -l ~/.ssh/authorized_keys`.
>   - `~/.ssh` should show `drwx------` (700).
>   - `authorized_keys` should show `-rw-------` (600).
> - If the permissions match, no further action is needed. If not, use the `chmod` commands as shown above.

---

## Verification

```bash
ssh -i ~/.ssh/<deploy_key_name> -p <port> <user>@<server> "echo deploy-key-auth-ok"
```

- Replace placeholders with your actual values.

---

[← Step 4](https://github.com/annetastic-personal/references/wiki/step-4-deploy-key) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 6 →](https://github.com/annetastic-personal/references/wiki/step-6-github-secrets)
