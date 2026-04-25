# PAT Instructions

Use these steps to create a fine-grained Personal Access Token (PAT) for wiki automation.

This guide is intentionally repository-agnostic so you can reuse it across projects.

## Create Token

1. Open GitHub and go to your account settings.
2. Navigate to Developer settings.
3. Open Personal access tokens.
4. Select Fine-grained tokens.
5. Click Generate new token.

## Configure Token

- Token name: `<TOKEN_NAME>`
- Expiration: choose your preferred duration
- Resource owner: your account or organization owner
- Repository access: Only select repositories
- Selected repository: `<OWNER>/<TARGET_REPO>`

## Set Permissions

Under Repository permissions:

- Contents: Read and write

If your workflow requires additional repository operations, add only the minimum extra permissions needed.

## Generate and Store

1. Click Generate token.
2. Copy the token immediately (you will not be able to view it again).
3. Add repository secrets in `<OWNER>/<TARGET_REPO>`:
   - `<USERNAME_SECRET_NAME>` = your GitHub username
   - `<TOKEN_SECRET_NAME>` = generated token value

## Recommended Placeholder Values

- `<TOKEN_NAME>`: `wiki-publish-token`
- `<USERNAME_SECRET_NAME>`: `WIKI_PUSH_USERNAME`
- `<TOKEN_SECRET_NAME>`: `WIKI_PUSH_PAT`

## Notes

- Do not use secret names starting with GITHUB\_ because that prefix is reserved.
- Rotate the token periodically and update `<TOKEN_SECRET_NAME>` when rotated.
