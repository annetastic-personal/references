# PAT Instructions

Use these steps to create a fine-grained Personal Access Token (PAT) for wiki automation.

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
