# Step 4: Add Deploy Public Key to Server

Worked example: [Step 4 Sample](https://github.com/odomaf/references/wiki/step-4-authorized-keys-sample)

Authorize the deploy public key on the server and verify SSH key-based authentication works.

If this is your first time setting up SSH for this user on the server, you may need to create the ~/.ssh directory. For additional deployments (other repos), this directory and the authorized_keys file will already exist—just append the new public key. You can use any SSH client (e.g., PuTTY, OpenSSH, MobaXterm) to connect to your server.

---

## Commands (Generalized)

1. Connect to your server using your preferred SSH client (e.g., PuTTY, OpenSSH, MobaXterm).

2. If ~/.ssh does not exist, create it:

   ```bash
   mkdir -p ~/.ssh && chmod 700 ~/.ssh
   ```

3. Append the public key generated in Step 3 to authorized_keys (do not overwrite the file):
   ```bash
   echo '<PASTE_PUBLIC_KEY>' >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

---

## Verification

```bash
ssh -i ~/.ssh/<deploy_key_name> -p <port> <user>@<server> "echo deploy-key-auth-ok"
```

- Replace placeholders with your actual values.

---

[← Step 3](https://github.com/odomaf/references/wiki/step-3-deploy-key) | [← Back to Index](../cicd-index.md) | [Next: Step 5 →](https://github.com/odomaf/references/wiki/step-5-github-secrets)
