import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/seo";

// /robots.txt — closed to search engines until searchIndexing is switched on
// in data/site-settings.ts, and always closed on preview deployments.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
