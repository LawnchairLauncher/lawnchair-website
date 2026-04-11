import { el, parseAuthorList } from "../lib/core.js";

const iconMap = {
  github: "/images/github.svg",
  x: "/images/x.svg",
  mastodon: "/images/mastodon.svg"
};

function buildAuthorCard(doc, author) {
  const name = el(doc, "p", {
    className: "author-name",
    textContent: author.name || author.id
  });
  const role = author.role
    ? el(doc, "p", { className: "author-role", textContent: author.role })
    : null;

  let linkWrap = null;
  const links = author.links || {};
  const linkEntries = Object.entries(links).filter(([, url]) => Boolean(url));
  if (linkEntries.length) {
    const linkNodes = linkEntries.map(([label, url]) => {
      const key = label.toLowerCase();
      const iconSrc = iconMap[key];

      const content = iconSrc
        ? el(doc, "img", { src: iconSrc, alt: label, loading: "lazy" })
        : label;
      return el(doc, "a", { href: url }, content);
    });
    linkWrap = el(doc, "div", { className: "author-links" }, linkNodes);
  }

  const content = el(doc, "div", { className: "author-content" }, [
    name,
    role,
    linkWrap
  ]);

  const avatar = author.avatar
    ? el(doc, "img", {
        className: "author-avatar",
        alt: author.name || author.id,
        src: author.avatar,
        loading: "lazy"
      })
    : null;

  return el(doc, "div", { className: "author-card" }, [avatar, content]);
}

/**
 * Insert author cards below the title/metadata.
 */
export function transform(doc, wrapper, context) {
  const { authorRaw, authors } = context;

  if (!authorRaw) {
    return;
  }

  // Find anchor: metadata > description > title > first h1
  const anchor =
    context.metadataElement ||
    context.descriptionElement ||
    context.titleElement ||
    wrapper.querySelector("h1");

  if (!anchor) {
    return;
  }

  const authorIds = parseAuthorList(authorRaw);
  if (!authorIds.length) {
    return;
  }

  const authorCards = doc.createElement("div");
  authorCards.className = "author-cards";

  authorIds.forEach((id) => {
    const key = id.toLowerCase();
    const data = authors[key] || { id, name: id };
    authorCards.appendChild(buildAuthorCard(doc, data));
  });

  anchor.insertAdjacentElement("afterend", authorCards);
}
