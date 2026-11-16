import { blogPosts, postSlug, readingTime } from "@/data/blog";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = "Article from the group's blog";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: postSlug(post) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => postSlug(p) === slug);
  if (!post) return ogImage({ eyebrow: "Blog", title: "Article not found" });
  return ogImage({
    eyebrow: ["Blog", ...post.tags.slice(0, 1)].join(" · "),
    title: post.title,
    subtitle: `By ${post.author} · ${readingTime(post)} min read`,
    photo: post.cover?.src,
  });
}
