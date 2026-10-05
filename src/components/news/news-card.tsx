import Image from "next/image";
import { formatNewsDate, type NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background">
      {item.image && (
        <div className="relative aspect-video w-full border-b border-border">
          <Image
            src={item.image}
            alt={item.headline}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-medium uppercase tracking-widest text-accent">{item.category}</span>
          <time dateTime={item.date} className="text-muted">
            {formatNewsDate(item.date)}
          </time>
        </div>
        <h3 className="mt-3 font-semibold leading-snug text-foreground">{item.headline}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
      </div>
    </article>
  );
}
