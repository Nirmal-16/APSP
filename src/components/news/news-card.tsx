import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, FileText, Flag, Landmark, Megaphone, Trophy } from "lucide-react";
import type { NewsCategory, NewsItem } from "@/data/news";
import { formatDate } from "@/lib/format-date";
import { FittedImage } from "@/components/media/fitted-image";

const categoryIcon: Record<NewsCategory, typeof Flag> = {
  Announcement: Megaphone,
  Award: Trophy,
  Grant: Landmark,
  Publication: FileText,
  Event: CalendarDays,
  Milestone: Flag,
};

// `featured` lays the card out sideways from lg up; `surface` suits a page
// background (the Home page shows these on a surface-coloured band).
export function NewsCard({
  item,
  featured = false,
  surface = false,
}: {
  item: NewsItem;
  featured?: boolean;
  surface?: boolean;
}) {
  const Icon = categoryIcon[item.category];
  const external = item.link && !item.link.href.startsWith("/");
  const linkClass =
    "mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80";

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-3xl border border-border ${
        surface ? "bg-surface" : "bg-background"
      } ${featured ? "lg:grid lg:grid-cols-2" : ""}`}
    >
      {/* Same frame with or without a photo, so cards in a row line up. */}
      <div
        className={`relative aspect-video overflow-hidden border-b border-border bg-surface-hover ${
          featured ? "lg:aspect-auto lg:min-h-80 lg:border-r lg:border-b-0" : ""
        }`}
      >
        {item.image ? (
          <FittedImage
            src={item.image}
            alt={item.imageAlt ?? ""}
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-transparent to-accent/15">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/70 text-accent backdrop-blur-sm">
              <Icon className="h-7 w-7" />
            </span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium uppercase tracking-widest text-accent">
            <Icon className="h-3.5 w-3.5" />
            {item.category}
          </span>
          <time dateTime={item.date} className="text-muted">
            {formatDate(item.date)}
          </time>
        </div>
        <h3
          className={`mt-3 font-semibold leading-snug text-pretty text-foreground ${
            featured ? "text-xl sm:text-2xl lg:text-3xl lg:tracking-tight" : ""
          }`}
        >
          {item.headline}
        </h3>
        <p className={`mt-2 flex-1 leading-relaxed text-pretty text-muted ${featured ? "lg:flex-none lg:text-lg" : "text-sm"}`}>
          {item.description}
        </p>
        {item.link &&
          (external ? (
            <a href={item.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {item.link.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <Link href={item.link.href} className={linkClass}>
              {item.link.label} <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
      </div>
    </article>
  );
}
