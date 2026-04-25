import "dotenv/config"; // Loads .env automatically (shorthand for ES modules)
import simpleGit from "simple-git";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ==== CONFIGURATION ==== //
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PAT = process.env.GITHUB_PAT;
const WIKI_REMOTE = `https://${GITHUB_USERNAME}:${GITHUB_PAT}@github.com/odomaf/references.wiki.git`;
const WIKI_DIR = path.join(__dirname, "wiki");

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
  // Ensure wiki directory exists (for local development)
  await fs.ensureDir(WIKI_DIR);

  const git = simpleGit();

  // Clone wiki
  await git.clone(WIKI_REMOTE, WIKI_DIR);

  // Write all markdown files
  for (const [name, content] of Object.entries(pages)) {
    await fs.writeFile(path.join(WIKI_DIR, name), content.trim());
  }

  // Commit & push
  const wikiGit = simpleGit(WIKI_DIR);
  await wikiGit.add(".");
  await wikiGit.commit("Scaffold wiki pages with starter templates");
  await wikiGit.push();

  console.log("Wiki scaffolded successfully!");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
