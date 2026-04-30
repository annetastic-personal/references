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

(async () => {
  if (!WIKI_PUSH_USERNAME || !WIKI_PUSH_PAT) {
    throw new Error(
      "Missing WIKI_PUSH_USERNAME or WIKI_PUSH_PAT environment variables.",
    );
  }

  // Keep wiki source files separate from the cloned .wiki repo.
  await fs.ensureDir(SOURCE_DIR);
  await fs.remove(BUILD_DIR);

  const git = simpleGit();

  // Clone wiki
  await git.clone(WIKI_REMOTE, BUILD_DIR);

  // Copy source wiki files into the cloned .wiki repo while preserving its .git directory.
  await fs.copy(SOURCE_DIR, BUILD_DIR, {
    overwrite: true,
    recursive: true,
  });

  // Commit & push
  const wikiGit = simpleGit(BUILD_DIR);
  await wikiGit.addConfig(
    "user.email",
    "github-actions[bot]@users.noreply.github.com",
  );
  await wikiGit.addConfig("user.name", "github-actions[bot]");
  await wikiGit.add(".");
  const status = await wikiGit.status();

  if (status.files.length === 0) {
    console.log("No wiki changes to publish.");
    return;
  }

  await wikiGit.commit("Scaffold wiki pages with starter templates");
  await wikiGit.push();

  console.log("Wiki scaffolded successfully!");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
