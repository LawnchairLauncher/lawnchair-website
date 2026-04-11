import fs from "fs/promises";
import path from "path";
import { loadAuthors } from "./lib/authors.js";
import { configureMarked, processHtmlFile } from "./lib/markdown.js";
import { parseMetadata, findMetadataValue } from "./lib/core.js";

const rootDir = process.cwd();
const blogTemplatePath = path.join(rootDir, "scripts", "templates", "blog.html");
const sitemapPath = path.join(rootDir, "sitemap.xml");
const feedPath = path.join(rootDir, "blog", "feed.xml");
const blogIndexPath = path.join(rootDir, "blog", "index.html");
const SITE_URL = "https://lawnchair.app";

async function walkHtmlFiles(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkHtmlFiles(fullPath, results);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
        results.push(fullPath);
      }
    })
  );
  return results;
}

async function findMarkdownDirs(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await findMarkdownDirs(fullPath, results);
      } else if (entry.isFile() && entry.name.toLowerCase() === "index.md") {
        results.push(path.dirname(fullPath));
      }
    })
  );
  return results;
}

async function getHtmlFilesSafely(dirs, templatePath) {
  const template = await fs.readFile(templatePath, "utf-8");
  let created = 0;

  for (const dir of dirs) {
    const htmlPath = path.join(dir, "index.html");
    try {
      await fs.access(htmlPath);
    } catch {
      const mdPath = path.join(dir, "index.md");
      const mdContent = await fs.readFile(mdPath, "utf-8");
      const { metadata } = parseMetadata(mdContent);

      // Replace HTML placeholders with frontmatter values, or as-is if not found
      let html = template;
      html = html.replace(/\{\{title\}\}/g, escapeHtml(metadata.title) || "{{title}}");
      html = html.replace(/\{\{description\}\}/g, escapeHtml(metadata.description) || "{{description}}");

      await fs.writeFile(htmlPath, html, "utf-8");
      created++;
      console.log(`📄 Created ${path.relative(rootDir, htmlPath)}`);
    }
  }

  return created;
}

async function collectBlogEntries(dirs) {
  const entries = [];
  for (const dir of dirs) {
    const mdPath = path.join(dir, "index.md");
    const mdContent = await fs.readFile(mdPath, "utf-8");
    const { metadata } = parseMetadata(mdContent);

    const slug = path.basename(dir);
    let lastmod = findMetadataValue(metadata, ["last-modified"]) ||
                  findMetadataValue(metadata, ["first-published"]);

    // YYYY-MM-DD format, default to today if missing
    if (lastmod instanceof Date) {
      lastmod = lastmod.toISOString().split("T")[0];
    } else if (!lastmod || typeof lastmod !== "string") {
      lastmod = new Date().toISOString().split("T")[0];
    }

    entries.push({
      loc: `${SITE_URL}/blog/${slug}/`,
      lastmod,
      priority: "0.64"
    });
  }
  return entries;
}

async function updateSitemap(blogEntries) {
  let sitemap = await fs.readFile(sitemapPath, "utf-8");

  // Parse existing URLs to preserve non-blog entries
  const urlRegex = /<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g;
  const existingUrls = new Map();
  let match;
  while ((match = urlRegex.exec(sitemap)) !== null) {
    existingUrls.set(match[1].replace(/\/$/, ""), match[0]);
  }

  // Update or add blog entries
  for (const entry of blogEntries) {
    const normalizedLoc = entry.loc.replace(/\/$/, "");
    const urlBlock = `<url>
  <loc>${entry.loc}</loc>
  <lastmod>${entry.lastmod}</lastmod>
  <priority>${entry.priority}</priority>
</url>`;
    existingUrls.set(normalizedLoc, urlBlock);
  }

  // Rebuild sitemap preserving order (non-blog first, then blog)
  const nonBlogUrls = [];
  const blogUrls = [];
  for (const [loc, block] of existingUrls) {
    if (loc.includes("/blog/") && loc !== `${SITE_URL}/blog`) {
      blogUrls.push(block);
    } else {
      nonBlogUrls.push(block);
    }
  }

  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  const newSitemap = header + [...nonBlogUrls, ...blogUrls].join("\n") + "\n</urlset>\n";
  await fs.writeFile(sitemapPath, newSitemap, "utf-8");
  console.log(`🗺️  Updated sitemap with ${blogEntries.length} blog entries.`);
}

function escapeXml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822Date(dateValue) {
  let date;
  if (dateValue instanceof Date) {
    date = dateValue;
  } else if (typeof dateValue === "string") {
    date = new Date(`${dateValue}T00:00:00Z`);
  } else {
    date = new Date();
  }
  return date.toUTCString();
}

async function collectRssEntries(dirs) {
  const entries = [];
  for (const dir of dirs) {
    const mdPath = path.join(dir, "index.md");
    const mdContent = await fs.readFile(mdPath, "utf-8");
    const { metadata } = parseMetadata(mdContent);

    const slug = path.basename(dir);
    const title = metadata.title || slug;
    const description = metadata.description || "";
    const pubDate = findMetadataValue(metadata, ["first-published"]) ||
                    findMetadataValue(metadata, ["last-modified"]);

    entries.push({
      title,
      link: `${SITE_URL}/blog/${slug}/`,
      description,
      pubDate: toRfc822Date(pubDate)
    });
  }

  // Sort by pubDate descending (newest first)
  entries.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return entries;
}

async function updateRssFeed(rssEntries) {
  const latestPubDate = rssEntries.length > 0 ? rssEntries[0].pubDate : new Date().toUTCString();

  const items = rssEntries.map(entry => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.link}</link>
      <guid>${entry.link}</guid>
      <description>${escapeXml(entry.description)}</description>
      <pubDate>${entry.pubDate}</pubDate>
    </item>`).join("\n\n");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <title>Lawnchair Blogs</title>
    <link>${SITE_URL}/blog/</link>
    <description>Announcements and related posts by the Lawnchair team.</description>
    <language>en-us</language>
    <pubDate>${latestPubDate}</pubDate>

${items}
  </channel>
</rss>
`;

  await fs.writeFile(feedPath, feed, "utf-8");
  console.log(`📰 Updated RSS feed with ${rssEntries.length} entries.`);
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatReadableDate(dateValue) {
  const dateOptions = { 
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  
  let date;
  if (dateValue instanceof Date) {
    date = dateValue;
  } else if (typeof dateValue === "string") {
    date = new Date(`${dateValue}T00:00:00Z`);
  } else {
    date = new Date();
  }
  return date.toLocaleDateString("en-US", dateOptions);
}

async function collectBlogIndexEntries(dirs) {
  const entries = [];
  for (const dir of dirs) {
    const mdPath = path.join(dir, "index.md");
    const mdContent = await fs.readFile(mdPath, "utf-8");
    const { metadata } = parseMetadata(mdContent);

    const slug = path.basename(dir);
    const title = metadata.title || slug;
    const description = metadata.description || "";
    const pubDate = findMetadataValue(metadata, ["first-published"]) ||
                    findMetadataValue(metadata, ["last-modified"]);

    entries.push({
      slug,
      title,
      description,
      pubDate,
      pubDateFormatted: formatReadableDate(pubDate)
    });
  }

  // Sort by pubDate descending (newest first)
  entries.sort((a, b) => {
    const dateA = a.pubDate instanceof Date ? a.pubDate : new Date(`${a.pubDate}T00:00:00Z`);
    const dateB = b.pubDate instanceof Date ? b.pubDate : new Date(`${b.pubDate}T00:00:00Z`);
    return dateB - dateA;
  });
  return entries;
}

async function updateBlogIndex(entries) {
  let html = await fs.readFile(blogIndexPath, "utf-8");

  const blogItems = entries.map((entry, index) => {
    const latestClass = index === 0 ? " latest" : "";
    return `        <a href="/blog/${entry.slug}/">
          <div class="blog${latestClass}">
            <b>${escapeHtml(entry.title)}</b>
            <p>
              ${escapeHtml(entry.description)}
              <i>Published on ${entry.pubDateFormatted}</i>
            </p>
          </div>
        </a>`;
  }).join("\n\n");

  // Replace the blogs div content
  html = html.replace(
    /<div class="blogs">[\s\S]*?<\/div>\s*<\/main>/,
    `<div class="blogs">\n${blogItems}\n      </div>\n    </main>`
  );

  await fs.writeFile(blogIndexPath, html, "utf-8");
  console.log(`📝 Updated blog index with ${entries.length} entries.`);
}

async function run() {
  configureMarked();
  const authors = await loadAuthors();
  const blogDir = path.join(rootDir, "blog");
  const faqDir = path.join(rootDir, "faq");

  // Find markdown files and create HTML from template if missing
  const markdownDirs = [];
  await findMarkdownDirs(blogDir, markdownDirs);
  await getHtmlFilesSafely(markdownDirs, blogTemplatePath);

  // Update sitemap, RSS feed, and blog index with blog entries from frontmatter
  const blogEntries = await collectBlogEntries(markdownDirs);
  const rssEntries = await collectRssEntries(markdownDirs);
  const blogIndexEntries = await collectBlogIndexEntries(markdownDirs);
  await updateSitemap(blogEntries);
  await updateRssFeed(rssEntries);
  await updateBlogIndex(blogIndexEntries);

  // Now find all HTML files and process them
  const htmlFiles = [];
  await walkHtmlFiles(blogDir, htmlFiles);
  await walkHtmlFiles(faqDir, htmlFiles);

  const results = await Promise.allSettled(
    htmlFiles.map((filePath) => processHtmlFile(filePath, authors))
  );

  const failures = results
    .map((r, i) => (r.status === "rejected" ? { file: htmlFiles[i], reason: r.reason } : null))
    .filter(Boolean);

  if (failures.length) {
    failures.forEach(({ file, reason }) => {
      console.error(`💥 Failed to process ${file}:`, reason.message || reason);
    });
    throw new Error(`💥 Build failed for ${failures.length} file(s).`);
  }

  const successCount = results.length - failures.length;
  console.log(`🥞 Build complete. Processed ${successCount} file(s).`);
}

run().catch((error) => {
  console.error("💥 Build failed.", error);
  process.exit(1);
});
