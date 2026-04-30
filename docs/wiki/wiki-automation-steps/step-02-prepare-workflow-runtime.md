# Step 02: Prepare Workflow Runtime

## Checklist Link

- [Back to checklist](../Wiki-Automation-Checklist.md)

## Objective

Set up workflow runtime prerequisites, including Node and dependencies.

Create and validate the wiki scaffolding script in this step so Step 03 can execute it in CI.

Worked example: [Step 02 Sample](../wiki-automation-samples/step-02-prepare-workflow-runtime-sample.md)

## Notes

- Date:
- Scaffolding script path: [docs/scaffold-wiki.js](../../scaffold-wiki.js)
- Node version selected: `<NODE_VERSION>` (for example: `20`)
- Dependency install method: `<PACKAGE_MANAGER>` (for example: `npm install` locally, `npm ci` in CI when a lockfile exists)
- Why this approach: Keep the runtime simple, align local and CI execution, and make the scaffold script reproducible.

## Common Reminders

- Keep script environment variable names aligned with the repository secret names.
- Keep the wiki source directory separate from the temporary cloned `.wiki` repository directory.
- Ignore runtime artifacts such as `node_modules/` and the temporary wiki build directory.

## Actions Taken

1. Create or update the scaffolding script at [docs/scaffold-wiki.js](../../scaffold-wiki.js).
2. Add a `package.json` that declares the runtime, dependencies, and publish script.
3. Install the dependencies needed by the scaffold script.
4. Validate the script against the selected Node runtime.

## Validation

- [ ] Runtime starts successfully
- [ ] Dependencies install cleanly

## Open Questions

-
