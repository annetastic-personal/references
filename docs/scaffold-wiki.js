import "dotenv/config"; // Loads .env automatically (shorthand for ES modules)
import simpleGit from "simple-git";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ==== CONFIGURATION ==== //
const WIKI_PUSH_USERNAME = process.env.WIKI_PUSH_USERNAME;
const WIKI_PUSH_PAT = process.env.WIKI_PUSH_PAT;
const WIKI_REMOTE = `https://${WIKI_PUSH_USERNAME}:${WIKI_PUSH_PAT}@github.com/odomaf/references.wiki.git`;
const SOURCE_DIR = path.join(__dirname, "wiki");
const BUILD_DIR = path.join(__dirname, ".wiki-build");

const pages = {
  "Home.md": `# References Wiki

A collection of processes, patterns, and practices I've learned and want to refer to later.

## Processes

- CI/CD
- Wiki Scaffolding

---

[Repository](https://github.com/odomaf/references)
`,
};

(async () => {
  // Keep wiki source files separate from the cloned .wiki repo.
  await fs.ensureDir(SOURCE_DIR);
  await fs.remove(BUILD_DIR);

  const git = simpleGit();

  // Clone wiki
  await git.clone(WIKI_REMOTE, BUILD_DIR);

  // Write all markdown files
  for (const [name, content] of Object.entries(pages)) {
    await fs.writeFile(path.join(BUILD_DIR, name), content.trim());
  }

  // Commit & push
  const wikiGit = simpleGit(BUILD_DIR);
  await wikiGit.add(".");
  await wikiGit.commit("Scaffold wiki pages with starter templates");
  await wikiGit.push();

  console.log("Wiki scaffolded successfully!");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
