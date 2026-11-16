"use client";

import { useSyncExternalStore } from "react";
import { daysUntil, openings } from "@/data/hirings";
import { OpeningCard } from "@/components/insights/opening-card";
import { Reveal } from "@/components/motion/reveal";

const noSubscribe = () => () => {};
const readToday = () => new Date().toISOString().slice(0, 10);

// Open positions, newest first, without any whose deadline has passed. The
// page is built ahead of time, so it renders with the build date and then
// rechecks against the visitor's date; the "closing soon" badge waits for that.
export function OpeningsList({ buildDate }: { buildDate: string }) {
  const visitorToday = useSyncExternalStore(noSubscribe, readToday, () => null);
  const today = visitorToday ?? buildDate;

  const open = openings
    .filter((opening) => !opening.deadline || daysUntil(opening.deadline, today) >= 0)
    .sort((a, b) => b.postedDate.localeCompare(a.postedDate));

  if (open.length === 0) {
    return (
      <p className="rounded-3xl border border-border bg-surface p-10 text-center text-muted">
        There are no open positions right now — but we&apos;re always happy to hear from motivated students and
        researchers.
      </p>
    );
  }

  return open.map((opening, i) => (
    <Reveal key={opening.title} delay={i * 0.06}>
      <OpeningCard
        opening={opening}
        daysLeft={visitorToday && opening.deadline ? daysUntil(opening.deadline, visitorToday) : null}
      />
    </Reveal>
  ));
}
