import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { blogPosts, postSlug, readingTime } from "@/data/blog";
import { researchAreas } from "@/data/research-areas";
import { siteSettings } from "@/data/site-settings";
import { formatDate } from "@/lib/format-date";
import { ArticleBody } from "@/components/insights/article-body";
import { BlogCard } from "@/components/insights/blog-card";
import { Byline } from "@/components/insights/byline";
import { CopyLinkButton } from "@/components/media/copy-link-button";
import { FittedImage } from "@/components/media/fitted-image";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ slug: string }> };

// Every article is built ahead of time; other slugs are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: postSlug(post) }));
}

const findPost = (slug: string) => blogPosts.find((post) => postSlug(post) === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug);
  return post ? { title: `${post.title} — ${siteSettings.labName}`, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  const area = researchAreas.find((a) => a.slug === post.area);
  const more = [...blogPosts]
    .filter((p) => p !== post)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="site-container py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/insights#blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <ul className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {tag}
              </li>
            ))}
          </ul>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted sm:text-xl">{post.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
            <Byline name={post.author} size="lg" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {readingTime(post)} min read
              </span>
              <CopyLinkButton className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-primary hover:text-primary" />
            </div>
          </div>
        </Reveal>

        {post.cover && (
          <Reveal delay={0.1} className="relative mt-10 aspect-video overflow-hidden rounded-3xl border border-border bg-surface-hover">
            <FittedImage src={post.cover.src} alt={post.cover.alt} sizes="(min-width: 768px) 48rem, 100vw" />
          </Reveal>
        )}

        <div className="mt-10">
          <ArticleBody body={post.body} />
        </div>

        {area && (
          <Link
            href={`/research#${area.slug}`}
            className="group mt-12 flex items-center justify-between gap-4 rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
          >
            <span>
              <span className="block text-xs font-medium uppercase tracking-widest text-muted">Related research</span>
              <span className="mt-1 block font-semibold text-foreground transition-colors group-hover:text-primary">
                {area.title}
              </span>
              <span className="mt-0.5 block text-sm text-muted">{area.subtitle}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="mx-auto mt-24 max-w-7xl">
          <h2 id="more-heading" className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            More from the blog
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.title}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
