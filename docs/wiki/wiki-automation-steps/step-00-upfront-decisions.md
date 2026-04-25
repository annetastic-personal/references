# Step 00: Upfront Decisions

## Checklist Link

- [Back to checklist](../Wiki-Automation-Checklist.md)

## Objective

Capture all non-action decisions before implementation starts.

## Decision A: Trigger Scope

### Notes

- Date: 2026-04-25
- Decision summary: Run wiki automation only for wiki-related source changes on main.
- Branch trigger: main only
- Path filters: docs/wiki/** and docs/scaffold-wiki.js
- Why this approach: Avoid unnecessary runs and limit wiki publishing to intentional documentation changes.

### Validation

- [ ] Trigger behavior confirmed
- [ ] Non-wiki changes do not trigger run

## Decision B: Authentication Method

### Notes

- Date:
- Chosen method:
- Token type:
- Permission scope:
- Why this approach:

### Validation

- [ ] Authentication method selected
- [ ] Permissions are least-privilege

## Open Questions

- None currently.
