import Link from "next/link";
import { Clock, PenLine } from "lucide-react";
import { postSlug, readingTime, type BlogPost } from "@/data/blog";
import { formatDate } from "@/lib/format-date";
import { Byline } from "@/components/insights/byline";
import { FittedImage } from "@/components/media/fitted-image";

// The title's link stretches over the whole card; the author link sits above it.
// `featured` lays the card out sideways from lg up.
export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-primary/50 has-[:focus-visible]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40 ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <div
        className={`relative aspect-video overflow-hidden border-b border-border bg-surface-hover ${
          featured ? "lg:aspect-auto lg:min-h-80 lg:border-r lg:border-b-0" : ""
        }`}
      >
        {post.cover ? (
          <FittedImage
            src={post.cover.src}
            alt={post.cover.alt}
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/15 via-transparent to-primary/15">
            <PenLine className="h-8 w-8 text-accent" />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              {tag}
            </li>
          ))}
        </ul>
        <h3
          className={`mt-3 font-semibold leading-snug text-pretty text-foreground transition-colors group-hover:text-primary ${
            featured ? "text-xl sm:text-2xl lg:text-3xl lg:tracking-tight" : ""
          }`}
        >
          <Link href={`/insights/blog/${postSlug(post)}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className={`mt-2 flex-1 leading-relaxed text-pretty text-muted ${featured ? "lg:flex-none lg:text-lg" : "text-sm"}`}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <Byline name={post.author} />
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <Clock className="h-3.5 w-3.5" /> {readingTime(post)} min read
          </p>
        </div>
      </div>
    </article>
  );
}
