"use client";

import { useState, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { news, newsCategories, type NewsCategory } from "@/data/news";
import { NewsCard } from "@/components/news/news-card";

const PAGE_SIZE = 6;

function chipClass(active: boolean) {
  return `shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
    active ? "border-primary bg-primary text-white" : "border-border text-muted hover:border-primary hover:text-primary"
  }`;
}

const newestFirst = [...news].sort((a, b) => b.date.localeCompare(a.date));

// The URL carries the category, e.g. /insights?category=Award#news, so a
// filtered view can be shared.
const isCategory = (value: string | null): value is NewsCategory => newsCategories.some((c) => c === value);
const noSubscribe = () => () => {};
const readUrlCategory = () => new URLSearchParams(location.search).get("category");

// Category filters over the news, newest first. With every category shown,
// the latest item is featured full width; the rest load a page at a time.
export function NewsBrowser() {
  // The URL's category applies until the visitor picks one themselves.
  const urlCategory = useSyncExternalStore(noSubscribe, readUrlCategory, () => null);
  const [picked, setPicked] = useState<NewsCategory | "All" | null>(null);
  const category = picked ?? (isCategory(urlCategory) ? urlCategory : "All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = category === "All" ? newestFirst : newestFirst.filter((item) => item.category === category);
  const lead = category === "All" ? shown[0] : undefined;
  const rest = lead ? shown.slice(1) : shown;
  const remaining = rest.length - visible;

  // Categories with no news yet are left out until some are added.
  const filters = [
    { value: "All" as const, count: news.length },
    ...newsCategories
      .map((c) => ({ value: c, count: news.filter((item) => item.category === c).length }))
      .filter((f) => f.count > 0),
  ];

  function select(value: NewsCategory | "All") {
    setPicked(value);
    setVisible(PAGE_SIZE);
    const query = value === "All" ? "" : `?category=${value}`;
    history.replaceState(null, "", `${location.pathname}${query}#news`);
  }

  return (
    <div>
      {/* Scrolls sideways on phones instead of wrapping into a pile of pills. */}
      <div
        role="group"
        aria-label="Filter news by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map(({ value, count }) => (
          <button
            key={value}
            type="button"
            onClick={() => select(value)}
            aria-pressed={category === value}
            className={chipClass(category === value)}
          >
            {value} <span className="opacity-60">{count}</span>
          </button>
        ))}
      </div>

      {lead && (
        <div className="mt-8">
          <NewsCard item={lead} featured surface />
        </div>
      )}

      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.slice(0, visible).map((item) => (
          <li key={`${item.date}-${item.headline}`}>
            <NewsCard item={item} surface />
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Show {Math.min(remaining, PAGE_SIZE)} more <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
