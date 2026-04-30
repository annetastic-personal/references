# Step 4: Add Deploy Public Key to Server

Worked example: [Step 4 Sample](https://github.com/odomaf/references/wiki/step-4-authorized-keys-sample)

Authorize the deploy public key on the server and verify SSH key-based authentication works.

---

## Commands (Generalized)

```bash
ssh <user>@<server>
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo '<PASTE_PUBLIC_KEY>' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

- Replace `<user>` and `<server>` with your deployment user and server address.
- Paste the public key generated in Step 3.

---

## Verification

```bash
ssh -i ~/.ssh/<deploy_key_name> -p <port> <user>@<server> "echo deploy-key-auth-ok"
```

- Replace placeholders with your actual values.

---

[← Step 3](step-3-deploy-key.md) | [← Back to Index](../cicd-index.md) | [Next: Step 5 →](step-5-github-secrets.md)
