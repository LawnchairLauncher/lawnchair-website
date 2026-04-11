import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { parseMetadata, formatDateString } from "./core.js";
import * as components from "../components/index.js";
import markedFootnote from "marked-footnote";

const rootDir = process.cwd();

let markedInstance;

/**
 * Configure marked with default options.
 */
export function configureMarked() {
  markedInstance = new Marked(
    markedHighlight({
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      }
    }),
    markedFootnote(),
  );

  markedInstance.use({
    gfm: true,
    breaks: false
  });
}

/**
 * Remove markdown-related scripts from the document.
 */
export function removeMarkdownScript(document) {
  const scripts = Array.from(document.querySelectorAll("script[src]"));
  scripts.forEach((script) => {
    const src = script.getAttribute("src") || "";
    if (src.includes("/assets/markdown.js") || src.includes("assets/markdown.js")) {
      script.remove();
    }
    if (src.includes("marked.umd.min.js")) {
      script.remove();
    }
  });
}

/**
 * Load fonts when needed
 * - Add Google Sans Code if code blocks are present
 * - Add Material Symbols if admonitions are present
 */
function loadFonts(document) {
  const head = document.head;
  if (!head) {
    return;
  }

  const hasCodeBlocks = document.querySelector("pre code.hljs, code.hljs") !== null;
  const hasCodeFont = document.querySelector("link[href*='Google+Sans+Code']") !== null;
  if (hasCodeBlocks && !hasCodeFont) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@400&subset=latin-ext,latin&display=swap";
    head.appendChild(link);
  }

  const hasAdmonitions = document.querySelector(".markdown-alert") !== null;
  const hasMaterialSymbols = document.querySelector("link[href*='Material+Symbols+Outlined'][href*='icon_names']") !== null;
  if (hasAdmonitions && !hasMaterialSymbols) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=dangerous,feedback,info,lightbulb_2,warning";
    head.appendChild(link);
  }
}

/**
 * Render markdown into a target element.
 */
export async function renderMarkdownIntoTarget(target, markdownSource, authors) {
  const markdown = await fs.readFile(markdownSource, "utf-8").catch(() => {
    throw new Error(`Missing markdown file: ${markdownSource}`);
  });
  const parsed = parseMetadata(markdown);
  const html = markedInstance.parse(parsed.content);

  const wrapperDom = new JSDOM(`<div id="wrapper">${html}</div>`);
  const wrapperDoc = wrapperDom.window.document;
  const wrapper = wrapperDoc.getElementById("wrapper");

  // Build context for components
  const lastModifiedRaw = parsed.metadata.last_modified;
  const firstPublishedRaw = parsed.metadata.first_published;
  const authorRaw = parsed.metadata.authors || parsed.metadata.author;
  const lastModified = formatDateString(lastModifiedRaw);
  const firstPublished = formatDateString(firstPublishedRaw);
  const wantsToc = target.getAttribute("data-toc") === "true" ||
                   wrapper.querySelector("toc-inline") !== null;
  const title = parsed.metadata.title;
  const description = parsed.metadata.description;

  const context = {
    metadata: parsed.metadata,
    authors,
    authorRaw,
    firstPublished,
    lastModified,
    wantsToc,
    title,
    description
  };

  // Run component pipeline
  const pipeline = [
    components.header,
    components.headingIds,
    components.admonitions,
    components.metadataInfo,
    components.authorCards,
    components.toc
  ];

  for (const component of pipeline) {
    await component.transform(wrapperDoc, wrapper, context);
  }

  target.innerHTML = wrapper.innerHTML;
}

/**
 * Process a single HTML file.
 */
export async function processHtmlFile(filePath, authors) {
  const html = await fs.readFile(filePath, "utf-8");
  const dom = new JSDOM(html);
  const document = dom.window.document;

  removeMarkdownScript(document);

  const targets = Array.from(document.querySelectorAll("[data-md]"));
  for (const target of targets) {
    const source = target.getAttribute("data-md");
    if (!source) {
      continue;
    }

    const markdownPath = source.startsWith("/")
      ? path.join(rootDir, source.replace(/^\//, ""))
      : path.join(path.dirname(filePath), source);

    await renderMarkdownIntoTarget(target, markdownPath, authors);
  }

  loadFonts(document);

  await fs.writeFile(filePath, dom.serialize(), "utf-8");
}
