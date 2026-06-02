# Organization Setup for Multi-Repo CI/CD

Set up a GitHub organization and migrate repositories into it so shared CI/CD infrastructure (for example, organization-level self-hosted runners) can be managed in one place.

---

## Why Use an Organization

- Group related repositories under one owner.
- Share organization-level self-hosted runners across multiple repos.
- Manage access and policies consistently.
- Reduce duplicated CI/CD setup effort per repository.

---

## Step-by-Step

1. Create a GitHub organization.
2. Configure basic organization settings (name, profile, optional URL).
3. Transfer each repository into the organization.
4. Update local repository remotes to the new organization URLs.
5. Verify repository access and push permissions.
6. Update any CI/CD references that use old owner/repo paths.

---

## Detailed Checklist

### 1) Create the Organization

- In GitHub, open **Your organizations** and create a new organization.
- Choose a unique organization name.
- Complete account verification if prompted.

### 2) Transfer Existing Repositories

For each repository you want to migrate:

- Open repository **Settings**.
- Go to the **Danger Zone** section.
- Use **Transfer ownership**.
- Enter the organization name as the new owner.
- Confirm transfer prompts.

### 3) Update Local Git Remotes

After transfer, update each local clone to the new organization URL.

- Verify with `git remote -v`.
- Set `origin` to the new org URL if needed.

### 4) Verify Access and Authentication

- Confirm your user account still has write/admin access in the organization.
- Verify repository pushes still succeed from local clones.
- Recreate automation PATs and update repository/organization secrets after ownership changes, because prior token scope assumptions can become invalid.
  - Note: Follow [PAT Instructions](PAT-Instructions) to create new tokens after ownership transfer, then update repository/organization secrets with those new values.

### 5) Align CI/CD With Organization Scope

- Prefer organization-level self-hosted runners for multi-repo deployments.
- Update workflow references and documentation to use current owner/repo paths.
- Confirm any wiki/automation scripts do not hardcode old owner names.

---

## Common Post-Migration Issues

- `403` permission errors in CI because PAT scope/access is no longer valid for the new owner.
  - Use [PAT Instructions](PAT-Instructions) to regenerate or re-scope tokens, then update repository/organization secrets.
- Workflows or scripts still targeting old owner/repo URLs.
- Local clones still using old remote URLs.

---

## Official GitHub Documentation

- [About organizations](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations)
- [Transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)

---

[← Back to Home](Home)
