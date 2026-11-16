"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { news } from "@/data/news";
import { formatDate } from "@/lib/format-date";
import { categoryIcon } from "@/components/news/news-card";

const INTERVAL = 5000; // ms per item
const latest = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

// Small card in the hero that cycles through the latest news. It pauses
// while hovered or focused, and doesn't cycle for visitors who prefer
// reduced motion — the dots still switch items by hand.
export function HeroNews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion || latest.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % latest.length), INTERVAL);
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  if (latest.length === 0) return null;
  const item = latest[index];
  const Icon = categoryIcon[item.category];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="w-full max-w-lg rounded-2xl border border-border bg-surface/80 p-2 text-left backdrop-blur-sm"
    >
      <Link
        href={item.link?.href.startsWith("/") ? item.link.href : "/insights#news"}
        className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-hover"
      >
        {/* Fixed height so the hero doesn't jump as headlines change length;
            the icon moves with the text so they always match. */}
        <span className="relative h-12 min-w-0 flex-1 overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={item.headline}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-xs leading-5 text-muted">
                  <span className="font-medium text-accent">Latest · {item.category}</span> · {formatDate(item.date)}
                </span>
                <span className="truncate text-sm leading-5 font-medium text-foreground transition-colors group-hover:text-primary">
                  {item.headline}
                </span>
              </span>
            </motion.span>
          </AnimatePresence>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>

      {latest.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-1 pb-1">
          {latest.map((n, i) => (
            <button
              key={n.headline}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show news ${i + 1} of ${latest.length}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-5 items-center px-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted"}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
