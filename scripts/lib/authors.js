import fs from "fs/promises";
import path from "path";

const rootDir = process.cwd();
const authorsPath = path.join(rootDir, "scripts", "data", "authors.json");

/**
 * Load authors from the authors.json file.
 */
export async function loadAuthors() {
  try {
    const raw = await fs.readFile(authorsPath, "utf-8");
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.authors)) {
      return {};
    }
    return data.authors.reduce((acc, author) => {
      if (author?.id) {
        acc[author.id.toLowerCase()] = author;
      }
      return acc;
    }, {});
  } catch (error) {
    console.warn("Unable to load author metadata.", error);
    return {};
  }
}
