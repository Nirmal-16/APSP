import type { MetadataRoute } from "next";
import { blogPosts, postSlug } from "@/data/blog";
import { siteUrl } from "@/lib/seo";

// Every page, plus one entry per blog article, at /sitemap.xml.
const pages = ["/", "/about", "/lab-members", "/research", "/publications", "/gallery", "/insights", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path === "/" ? "" : path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/insights/blog/${postSlug(post)}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
