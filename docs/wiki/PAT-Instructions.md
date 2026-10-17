# PAT Instructions

Use these steps to create Personal Access Tokens (PATs) — a fine-grained token for wiki automation, and a classic token for project automation.

This guide is intentionally repository-agnostic so you can reuse it across projects.

## Initial Token Setup

### Create Token

1. Open GitHub and go to your account settings.
2. In the left sidebar, scroll to the bottom and select Developer settings.
3. Open Personal access tokens.
4. Select Fine-grained tokens.
5. Click Generate new token.

If you cannot find the menu item, use direct links:

- https://github.com/settings/tokens
- https://github.com/settings/personal-access-tokens

### Configure Token

- Token name: `<TOKEN_NAME>`
- Expiration: choose your preferred duration
- Resource owner: your account or organization owner
- Repository access: Only select repositories
- Selected repository: `<OWNER>/<TARGET_REPO>`

### Set Permissions

Under Repository permissions:

- Contents: Read and write

If your workflow requires additional repository operations, add only the minimum extra permissions needed.

### Generate and Store

1. Click Generate token.
2. Copy the token immediately (you will not be able to view it again).
3. Add repository secrets in `<OWNER>/<TARGET_REPO>`:
   - `<USERNAME_SECRET_NAME>` = your GitHub username
   - `<TOKEN_SECRET_NAME>` = generated token value

## Regenerate or Rotate Existing Token

Use this flow when a token stops working (for example, after repository ownership transfer), expires, or needs routine rotation.

1. Open the existing token in **Developer settings → Personal access tokens → Fine-grained tokens**.
2. Click **Regenerate** for that token.
3. Copy the regenerated token value immediately.
4. Update `<TOKEN_SECRET_NAME>` in repository/organization secrets with the regenerated token value.
5. Update `<USERNAME_SECRET_NAME>` only if the token owner account changed.
6. Run the workflow to validate authentication and publishing.

## Recommended Placeholder Values

- `<TOKEN_NAME>`: `wiki-publish-token`
- `<USERNAME_SECRET_NAME>`: `WIKI_PUSH_USERNAME`
- `<TOKEN_SECRET_NAME>`: `WIKI_PUSH_PAT`

## Notes

- Do not use secret names starting with GITHUB\_ because that prefix is reserved.
- Rotate tokens periodically and update `<TOKEN_SECRET_NAME>` whenever a token is regenerated.

## Organization Transfer Note

- If a repository moves to a new owner or organization, existing PAT access can stop working even when the repository remains public.
- After transfer, ensure PAT repository access includes the new owner/repository location.
- If wiki publish starts failing with `403`, regenerate the token and update `<TOKEN_SECRET_NAME>`.

## Classic PAT for Project Automation (repo + project scopes)

Some workflows need a **classic** PAT rather than a fine-grained one. The primary reason here is project automation on behalf of an AI assistant — letting the assistant manage GitHub Projects (adding or removing issues from a project) requires the `project` scope.

Fine-grained tokens cannot grant project-level access for this purpose: the `project` scope is only available on classic PATs, so a classic PAT is required.

The `actions/add-to-project` action is the concrete consumer of this token; it needs the `repo` and `project` scopes.

### Create the token

1. Open **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Click **Generate new token → Generate new token (classic)**.
3. Give it a name (for example, `add-to-project-token`).
4. Set an expiration.
5. Select scopes:
   - `repo` — full control of repositories
   - `project` — full control of organization projects
6. Click **Generate token** and copy it immediately.

### Store as an organization secret

Store the token as an **organization secret** so every repository can use it (for example, `ADD_TO_PROJECT_PAT`):

- Open the organization → **Settings → Secrets and variables → Actions**.
- Add the secret with the token value.
- For an organization project, the token's account must also have access to the project.

### Notes

- `read:project` is **not** enough — the action needs the full `project` scope. A missing or insufficient scope surfaces as `Cannot read properties of null (reading 'id')`.
- This token is separate from the fine-grained wiki-publish token above; each serves a different purpose.

### Related

- [Auto-Add Issues to a Project](https://github.com/annetastic-personal/references/wiki/auto-add-issues-to-project)
