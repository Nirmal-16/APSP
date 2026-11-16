import Link from "next/link";
import { CalendarClock, CalendarDays, ChevronDown, Hourglass, Mail } from "lucide-react";
import type { Opening } from "@/data/hirings";
import { researchAreas } from "@/data/research-areas";
import { siteSettings } from "@/data/site-settings";
import { formatDate } from "@/lib/format-date";

const listLabelClass = "text-xs font-medium uppercase tracking-widest text-muted";

function BulletList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h4 className={listLabelClass}>{label}</h4>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// One open position: the key facts up front, the full description in a
// native <details>. `daysLeft` (until the deadline) flags the last two weeks.
export function OpeningCard({ opening, daysLeft }: { opening: Opening; daysLeft: number | null }) {
  const area = researchAreas.find((a) => a.slug === opening.area);
  const email = opening.applyEmail ?? siteSettings.email;
  const subject = encodeURIComponent(`Application: ${opening.title}`);
  const hasDetails = !!(opening.responsibilities?.length || opening.requirements?.length);

  const facts = [
    { icon: CalendarDays, text: `Posted ${formatDate(opening.postedDate)}` },
    opening.deadline && { icon: CalendarClock, text: `Apply by ${formatDate(opening.deadline)}` },
    opening.duration && { icon: Hourglass, text: opening.duration },
  ].filter((fact) => !!fact);

  return (
    <article className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{opening.type}</span>
        {area && (
          <Link
            href={`/research#${area.slug}`}
            className="rounded-full border border-border px-3 py-1 font-medium text-muted transition-colors hover:border-primary hover:text-primary"
          >
            {area.title}
          </Link>
        )}
        {daysLeft !== null && daysLeft <= 14 && (
          <span className="rounded-full bg-poster/10 px-3 py-1 font-medium text-poster">
            {daysLeft === 0 ? "Closes today" : `Closes in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}`}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-pretty text-foreground">{opening.title}</h3>
      <p className="mt-2 leading-relaxed text-pretty text-muted">{opening.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {facts.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-1.5">
            <Icon className="h-4 w-4 shrink-0 text-accent" /> {text}
          </li>
        ))}
      </ul>

      {hasDetails && (
        <details className="group mt-5 border-t border-border pt-4">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
            Responsibilities &amp; requirements
            <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {!!opening.responsibilities?.length && (
              <BulletList label="What you'll do" items={opening.responsibilities} />
            )}
            {!!opening.requirements?.length && <BulletList label="What we look for" items={opening.requirements} />}
          </div>
        </details>
      )}

      <a
        href={`mailto:${email}?subject=${subject}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        <Mail className="h-4 w-4" /> Apply by email
      </a>
    </article>
  );
}
