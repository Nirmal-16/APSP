"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ResearchArea } from "@/data/research-areas";
import { ResearchIcon } from "@/components/icons/research-icon";
import { ResearchVisual } from "@/components/research/research-visual";

export function ResearchAreaSection({ area, flip }: { area: ResearchArea; flip: boolean }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const topic = area.topics[active];

  return (
    <section
      id={area.slug}
      className="scroll-mt-36 rounded-3xl border border-border bg-surface p-6 transition-shadow target:border-primary target:shadow-lg target:shadow-primary/10 sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={`h-64 overflow-hidden rounded-2xl border border-border bg-background sm:h-80 ${flip ? "lg:order-2" : ""}`}>
          <ResearchVisual variant={area.visual} />
        </div>

        <div>
          <div className="flex items-center gap-4">
            <ResearchIcon icon={area.icon} className="h-12 w-12 shrink-0" iconClassName="h-6 w-6 text-white" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{area.title}</h2>
              <p className="text-sm font-medium text-accent">{area.subtitle}</p>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-muted">{area.summary}</p>

          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted">
            Focus areas — select one
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {area.topics.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full border px-3.5 py-1.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  i === active
                    ? "border-primary bg-primary text-white"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="mt-5 min-h-24 rounded-2xl border border-border bg-background p-5" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={topic.name}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-medium text-foreground">{topic.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{topic.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
