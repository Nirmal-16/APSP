import type { Metadata } from "next";
import { siteSettings } from "@/data/site-settings";

// The site's public address, for links in search results and link previews:
// the address set in site-settings, else Vercel's production address, else
// the local dev server.
export const siteUrl = (
  siteSettings.siteUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// Search engines may list only the production site, and only once the
// searchIndexing switch is on — never preview deployments.
export const indexable =
  siteSettings.searchIndexing && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

// Title, description, canonical address and link-preview text for one page.
// The browser tab gets "<title> — <lab name>" from the root layout's template.
// `article` marks a blog article and adds its date, author and tags.
export function pageMetadata({
  title,
  description,
  path,
  article,
}: {
  title: string;
  description: string;
  path: string;
  article?: { publishedTime: string; authors: string[]; tags: string[] };
}): Metadata {
  const openGraph = {
    title: `${title} — ${siteSettings.labName}`,
    description,
    url: path,
    siteName: siteSettings.labName,
    locale: "en_IN",
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: article ? { ...openGraph, type: "article", ...article } : { ...openGraph, type: "website" },
  };
}
