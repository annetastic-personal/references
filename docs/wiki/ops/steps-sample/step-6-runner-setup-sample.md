# Step 6 Sample: Set Up Self-Hosted GitHub Actions Runner (Portfolio Project)

This example shows how the self-hosted runner was set up for the `portfolio` project.

---

## Commands Used

```bash
# On the deployment server
mkdir -p ~/actions-runner
cd ~/actions-runner
curl -o actions-runner-linux-x64-2.316.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.316.0/actions-runner-linux-x64-2.316.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.316.0.tar.gz
# Follow GitHub's instructions to configure the runner for your repo
./config.sh --url https://github.com/odomaf/portfolio --token <REPO_TOKEN>
# Start the runner as a service
sudo ./svc.sh install
sudo ./svc.sh start
```

---

## Verification
- Runner appears as "online" in the repository's GitHub Actions settings.
- Workflow jobs targeting `runs-on: [self-hosted, ...]` are picked up by this runner.

---

[← Step 5 Sample](step-5-github-secrets-sample.md) | [← Back to Index](../cicd-index.md) | [Next: Step 7 Sample →](step-7-workflow-sample.md)
