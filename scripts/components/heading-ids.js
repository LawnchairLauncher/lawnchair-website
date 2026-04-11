import { slugify } from "../lib/core.js";

/**
 * Ensure all headings have unique IDs for anchor linking.
 */
export function transform(doc, wrapper, context) {
  const seen = new Map();
  const headings = Array.from(wrapper.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  headings.forEach((heading) => {
    if (!heading.id) {
      const base = slugify(heading.textContent || "");
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      heading.id = count === 0 ? base : `${base}-${count}`;
    }
  });
}
