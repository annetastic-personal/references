# Wiki Scaffolding

How to set up and maintain wiki documentation for a GitHub repository using a scaffold script.

## Overview

Wiki scaffolding automates the creation and deployment of wiki pages to a GitHub repository's wiki. This ensures consistent documentation structure and ease of updates.

## Key Concepts

- **Source files**: Markdown files stored in the repository (e.g., `docs/wiki/`)
- **Scaffold script**: Automates cloning, generating, and pushing wiki pages
- **Wiki repository**: The separate `.wiki` repository that GitHub uses for the wiki

## Setup

1. Create a scaffold script (`scaffold-wiki.js`) in your `docs/` folder.
2. Add wiki source files to `docs/wiki/`.
3. Configure the script with:
   - Your GitHub username
   - A Personal Access Token (PAT)
   - The target repo's wiki URL
4. Run the script to generate and push the wiki.

## Example Scaffold Script

The script:

- Reads markdown files from `docs/wiki/`
- Clones the repository's `.wiki` repository
- Writes pages to the wiki
- Commits and pushes changes

## Best Practices

- Keep wiki source files in version control (alongside your project code)
- Use the scaffold script in CI/CD pipelines to auto-update wiki on commits
- Document processes and patterns as you learn them
- Use consistent naming (spaces become hyphens in GitHub wiki URLs)

## Links

- [GitHub Wiki Documentation](https://docs.github.com/en/communities/documenting-your-project-with-wikis)
