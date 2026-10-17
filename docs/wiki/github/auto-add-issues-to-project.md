# Auto-Add Issues to a Project

Three ways to make new issues automatically appear in a GitHub Project, with the trade-offs of each.

This guide is intentionally repository-agnostic so you can reuse it across projects.

## Why set this up

One motivation is to let an AI assistant create issues and have them land in the right project automatically, without a manual step to attach each one. When a repository auto-adds its issues, the assistant only has to create the issue itself — the automation handles the project attachment. It also keeps human-created issues from getting lost, since they funnel into the same project by default.

## The three approaches

| Approach | Scope | Needs a PAT? | Retroactive? |
|---|---|---|---|
| Built-in "Auto-add to project" workflow | One repository per workflow | No | No (new/updated items only) |
| GitHub Actions (`actions/add-to-project`) | Any number of repositories | Yes (`repo` + `project`) | No (trigger-driven) |
| Issue form `projects:` field | The repository's issue templates | No | No (sets project at creation) |

## 1. Built-in "Auto-add to project" workflow

In the project, open **Workflows → Auto-add to project**. This is the simplest option: no PAT, no code.

Limits:
- The **Free plan allows only 1** such workflow.
- Each workflow targets **exactly one repository** (chosen from a dropdown — `repo:` is not a valid filter qualifier).
- It only adds **new or updated** items; it never retroactively adds existing issues.

Use it for the single "main" repo you want to funnel into a project.

## 2. GitHub Actions workflow

Add a workflow to each repository that should auto-add its issues. This is the multi-repo option.

`.github/workflows/add-to-project.yml`:

```yaml
name: Add issues to project
on:
  issues:
    types: [opened]
jobs:
  add-to-project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v1.0.2
        with:
          project-url: https://github.com/orgs/<owner>/projects/<number>
          github-token: ${{ secrets.<PROJECT_PAT_SECRET> }}
```

Requirements:
- A classic PAT with the `repo` and `project` scopes (NOT `read:project`), stored as an **organization secret** so every repo can use it.
- For an organization project, the PAT's account must also have access to the project.

Use it when several (or all) org repos should feed the same project.

## 3. Issue form `projects:` field

In a YAML issue form (`.github/ISSUE_TEMPLATE/*.yml`), add a top-level `projects:` field to attach the project when a human creates an issue:

```yaml
name: Example
description: Example issue
title: "[...] "
projects: ["<owner>/<number>"]
```

- The value is `owner/number` (the project number, not a repo).
- This prompts/sets the project in the web issue form; it does not run automation.

Note: the VS Code GitHub extension's own create-issue editor ignores repository issue templates and only supports title, assignees, labels, and body — no project.

Use it to prompt for the right project when issues are created by hand.

## Manual fallback (CLI)

To add an existing issue to a project yourself:

```bash
gh project item-add <number> --owner <owner> --url <issue-url>
```

This requires the `project` scope (see [GitHub CLI Setup](https://github.com/annetastic-personal/references/wiki/github-cli-setup)).

## Gotchas

- `actions/add-to-project` fails with `Cannot read properties of null (reading 'id')` when the PAT lacks the `repo` + `project` scopes (or the token's account can't see the project). Fix the PAT scopes — `read:project` is not enough.
- GitHub Projects reads are **eventually consistent**: after `item-add` / `item-delete`, `item-list` (and GraphQL) may lag a few seconds before reflecting the change.
- The built-in workflow never backfills — it only adds items that are new or updated after the workflow is enabled.

## Official GitHub Documentation

- [Adding items automatically to a project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/adding-items-automatically)
- [actions/add-to-project](https://github.com/actions/add-to-project)
- [Syntax for issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)

[← Back to Home](https://github.com/annetastic-personal/references/wiki/Home)
