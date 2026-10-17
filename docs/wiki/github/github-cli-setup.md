# GitHub CLI Setup

Install and authenticate the GitHub CLI (`gh`) so GitHub resources can be managed from the terminal.

This guide is intentionally repository-agnostic so you can reuse it across projects.

## Why set this up

A primary use case is to let an AI assistant manage GitHub on your behalf — creating and assigning issues, adding items to a project, and applying labels — instead of clicking through the web UI. The scope additions below (`project`, and optionally `admin:org`) exist specifically so those delegated operations are available to the assistant. If you only use `gh` interactively yourself, the default scopes are usually enough.

## Install

### Windows

```bash
winget install --id GitHub.cli
```

Or download an installer from https://github.com/cli/cli/releases.

### macOS

```bash
brew install gh
```

### Linux

```bash
sudo apt update && sudo apt install gh
```

After installing, open a new terminal and verify:

```bash
gh --version
```

## Authenticate

```bash
gh auth login
```

Follow the prompts: GitHub.com → HTTPS → authenticate Git with your GitHub credentials → login with a web browser (paste the one-time code).

Verify the account and default scopes:

```bash
gh auth status
```

Default interactive login grants scopes such as `repo`, `read:org`, `gist`, and `workflow`.

## Add the `project` scope

The `gh project` commands require the `project` scope, which the default login does not include. Add it:

```bash
gh auth refresh -s project
```

Confirm the scope is present:

```bash
gh auth status
```

The output should now list `project` among the token scopes. If you also need to manage organization secrets, add `admin:org`:

```bash
gh auth refresh -s admin:org
```

## Verify a command

Run a read-only command to confirm authentication and scope:

```bash
gh repo view <owner>/<repo>
gh project list --owner <owner>
```

## Notes

- Scopes are cumulative — `gh auth refresh -s <scope>` adds a scope to the current token.
- `gh secret list --org <org>` returns `403` without the `admin:org` scope.
- On Windows, open a new terminal after installing before running `gh --version`.

## Official GitHub Documentation

- [GitHub CLI quickstart](https://docs.github.com/en/github-cli/github-cli/quickstart)
- [gh auth refresh](https://cli.github.com/manual/gh_auth_refresh)
- [GitHub CLI manual](https://cli.github.com/manual/)

[← Back to Home](https://github.com/annetastic-personal/references/wiki/Home)
