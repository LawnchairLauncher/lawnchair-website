# Lawnchair Website

Welcome to Lawnchair contributing guidelines, this guide primarily focus on writing blogs/documentations to the website.

## Prerequisite

- Node runtime, at least Bun 1.3.0 or at least Node.js 20.19
- Node dependencies (`npm i` or `npm ci` for CI environment)

### Write from Markdown to HTML

1. Setup page directory
  Write your blog in markdown with [metadata](#metadata), create a folder inside `blog` and place it there.

2. Build RSS feeds, sitemap and blog index, and your HTMLified markdown
  Run `npm run build` to generate a sitemap, RSS feeds, blog selector and your HTMLified version of your markdown.

3. Update live information (optional)
  If you wish to signal to every Lawnchair client using live information announcement feature, add your entry to `live-information.json`.

#### Custom components

Lawnchair markdown renderer extends the current CommonMark specifications with these components:
 * Lawnchair frontmatter
 * Inline Table of Contents (ToC) at any location with `<toc-inline></toc-inline>` (**inline ToC need compatible pages**, user override can disable toc globally by adding `?disabletoc=*` to the url param)
 * Admonitions: Quote block starting with `> [!TIP/NOTE/IMPORTANT/WARNING/CAUTION]` [(same as GitHub-flavored alerts)](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)

##### Metadata

###### Frontmatter

If your markdown has frontmatter with `title` and `description`, they will be automatically used for the page's `<title>` and meta description. Otherwise, `{{title}}` and `{{description}}` placeholders remain for you to fill in manually.

Blog index, sitemap and RSS feed is automatically updated with blog entries using `last_modified` (default to `first_published`) or `first_published` (default to today) from frontmatter, for RSS feed the `title` and `description` will be omitted if none is specified.

```yaml
---
title: strings
description: strings
authors:
  - array1
  - array2
first_published: YYYY-MM-DD
last_modified: YYYY-MM-DD
---
```

> [!NOTE]
> Date is always assumed in Central UTC+0/GMT-0 time

> [!WARNING]
> The script generates the h1 heading and description paragraph from `title` and `description` for you, 
> so you should **not** include a duplicate `# Heading title` in your markdown content.
> 
> Authorship cards and `first_published` `last_modified` metadata are positioned below the generated title and description.

##### Authorship

Required when you specified an author in Frontmatter.

```jsonc
{
  "authors": [
    {
      "id": "generic",
      "name": "Lawnchair Launcher Team",
      "role": "Administrator",
      "avatar": "/images/lawnchair.png",                    // Optional, supports URLs and local assets, and will not show an avatar when not specified
      "links": {                                            // Optional, will not show any social icon when not specified
        "github": "https://github.com/lawnchairlauncher",
        "x": "https://x.com/lawnchairapp",
        "mastodon": "https://mastodon.social/@lawnchairapp"
        /* To add your own socials, 
           search for iconMap in scripts/components/author-cards.js 
           and configure it so that icon will render correctly for your socials */
      }
    }
  ]
}
```

#### Testing

To test the rendering of standards from CommonMark (CM), GitHub-Flavored Markdown (GFM), Lawnchair Frontmatter (LC-FM).

Copy the `/scripts/test-blog` to `/blog` folder and build the documents to preview suite of test case.
