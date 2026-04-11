import { el } from "../lib/core.js";

/**
 * Insert a table of contents populated with heading links.
 */
export function transform(doc, wrapper, context) {
  const { wantsToc } = context;

  if (!wantsToc) {
    return;
  }

  const tocInline = wrapper.querySelector("toc-inline");
  const toc = doc.createElement("div");
  toc.id = "toc";
  toc.className = "collapsed";

  const headings = Array.from(wrapper.querySelectorAll("h2, h3"));
  if (headings.length) {
    const p = doc.createElement("p");
    const span = el(doc, "span", { textContent: "Table of Contents" });
    const button = el(doc, "button", { textContent: "Show", title: "Show/Hide the Table of Contents." });
    p.appendChild(span);
    p.appendChild(button);
    toc.appendChild(p);

    let currentLevel = 0;
    let currentList = null;
    const rootFragment = doc.createDocumentFragment();

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1], 10);

      if (level > currentLevel) {
        for (let i = currentLevel; i < level; i++) {
          const ul = doc.createElement("ul");
          if (currentList) {
            const lastLi = currentList.lastElementChild;
            if (lastLi) {
              lastLi.appendChild(ul);
            } else {
              currentList.appendChild(ul);
            }
          } else {
            rootFragment.appendChild(ul);
          }
          currentList = ul;
        }
      } else if (level < currentLevel) {
        for (let i = currentLevel; i > level; i--) {
          currentList = currentList.parentElement?.closest("ul") || currentList;
        }
      }

      currentLevel = level;

      const link = el(doc, "a", { href: `#${heading.id}`, textContent: heading.textContent });
      const item = el(doc, "li", {}, [link]);
      currentList.appendChild(item);
    });

    toc.appendChild(rootFragment);
  }

  if (tocInline) {
    const parent = tocInline.parentElement;
    if (parent && parent.tagName === "P") {
      parent.replaceWith(toc);
    } else {
      tocInline.replaceWith(toc);
    }
  } else {
    wrapper.insertBefore(toc, wrapper.firstChild);
  }
}
