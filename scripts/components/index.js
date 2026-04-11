/**
 * Component pipeline exports.
 * Each component exports a transform(doc, wrapper, context) function.
 *
 * To add a new component:
 * 1. Create a new file in this directory
 * 2. Export a transform function
 * 3. Import and re-export it here
 * 4. Add it to the pipeline in lib/markdown.js
 */

export * as header from "./header.js";
export * as headingIds from "./heading-ids.js";
export * as admonitions from "./admonitions.js";
export * as metadataInfo from "./metadata-info.js";
export * as authorCards from "./author-cards.js";
export * as toc from "./toc.js";
