import yamlFront from "yaml-front-matter";

/**
 * Create a DOM element with properties and children.
 */
export function el(doc, tag, props = {}, children = []) {
  const node = doc.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "dataset") {
      Object.assign(node.dataset, v);
    } else {
      node[k] = v;
    }
  });
  const normalized = Array.isArray(children) ? children : [children];
  normalized.forEach((child) => {
    if (child === null || child === undefined) {
      return;
    }
    node.appendChild(typeof child === "string" ? doc.createTextNode(child) : child);
  });
  return node;
}

/**
 * Convert text to a URL-safe slug.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/\[[^\]]+\]\([^\)]+\)/g, "")
    .replace(/`+/g, "")
    .replace(/\*+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Parse YAML front matter from markdown content.
 */
export function parseMetadata(markdown) {
  const parsed = yamlFront.safeLoadFront(markdown, {
    contentKeyName: "__content"
  });

  const metadata = Object.entries(parsed).reduce((acc, [key, value]) => {
    if (key === "__content") {
      return acc;
    }
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});

  const content = typeof parsed.__content === "string" ? parsed.__content : "";
  return { metadata, content };
}

/**
 * Parse author list from various input formats.
 */
export function parseAuthorList(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "[]") {
    return [];
  }

  const withoutBrackets = trimmed.replace(/^\[/, "").replace(/\]$/, "");
  const parts = withoutBrackets.split(/[,;]/).map((part) => part.trim());
  return parts.filter(Boolean);
}

/**
 * Escape HTML special characters.
 */
export function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Format a date value to a human-readable string.
 */
export function formatDateString(value) {
  const dateOptions = { 
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  if (!value) {
    return value;
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return value;
    }
    return value.toLocaleDateString("en-US", dateOptions);
  }

  if (typeof value !== "string") {
    return String(value);
  }

  const isoMatch = value.match(/^\d{4}-\d{2}-\d{2}$/);
  if (!isoMatch) {
    return value;
  }

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", dateOptions);
}

