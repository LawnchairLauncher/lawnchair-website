import { el } from "../lib/core.js";

/**
 * Insert publication date metadata below the title/description.
 */
export function transform(doc, wrapper, context) {
  const { firstPublished, lastModified } = context;

  if (!firstPublished && !lastModified) {
    return;
  }

  // Find anchor: description > title > first h1
  const anchor =
    context.descriptionElement ||
    context.titleElement ||
    wrapper.querySelector("h1");

  if (!anchor) {
    return;
  }

  const parts = [];
  if (firstPublished) {
    parts.push(`First published: ${firstPublished}`);
  }
  if (lastModified) {
    parts.push(`Last updated: ${lastModified}`);
  }

  const info = el(doc, "p", {
    className: "metadata",
    textContent: parts.join(" · ")
  });
  anchor.insertAdjacentElement("afterend", info);

  // Store for author-cards to use
  context.metadataElement = info;
}
