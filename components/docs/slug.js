/** Stable, URL-safe id for a heading — shared by the article and the TOC
 *  so anchors and scroll-spy always agree on the same string. */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
