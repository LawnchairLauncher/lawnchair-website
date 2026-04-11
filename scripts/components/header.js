import { el, slugify } from "../lib/core.js";

/**
 * Insert title and description from frontmatter at the top of the content.
 * This provides a reliable anchor for metadata and author cards.
 */
export function transform(doc, wrapper, context) {
  const { title, description } = context;

  if (!title) {
    return;
  }

  // Create the title element
  const titleEl = el(doc, "h1", {
    id: slugify(title),
    textContent: title
  });

  // Insert title at the top of wrapper
  wrapper.insertBefore(titleEl, wrapper.firstChild);

  // Store reference in context for other components
  context.titleElement = titleEl;

  // Create and insert description element if present
  if (description) {
    const descEl = el(doc, "p", {
      className: "post-description",
      textContent: description
    });
    titleEl.insertAdjacentElement("afterend", descEl);
    context.descriptionElement = descEl;
  }
}
