"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Copy, FileText, Quote, Search, X } from "lucide-react";
import { people, personSlug } from "@/data/people";
import { researchAreas, type ResearchAreaSlug } from "@/data/research-areas";
import {
  formatBibtex,
  formatCitation,
  groupHeadName,
  publicationDetails,
  publicationId,
  publicationTypes,
  publications,
  publicationUrl,
  typeLabel,
  type Publication,
  type PublicationType,
} from "@/data/publications";
import { YearIndex } from "@/components/layout/year-index";
import { typeStyle } from "@/components/publications/type-style";

// Lab members (not the Group Head) whose names link to their profiles.
const memberSlugs = new Map(
  people.filter((p) => p.role !== "Principal Investigator").map((p) => [p.name, personSlug(p)])
);

const areaTitle = Object.fromEntries(researchAreas.map((a) => [a.slug, a.title])) as Record<ResearchAreaSlug, string>;

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-primary hover:text-primary";

function chipClass(active: boolean) {
  return `shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
    active ? "border-primary bg-primary text-white" : "border-border text-muted hover:border-primary hover:text-primary"
  }`;
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="mt-2 text-sm leading-relaxed text-muted">
      {authors.map((name, i) => {
        const slug = memberSlugs.get(name);
        return (
          <Fragment key={name}>
            {i > 0 && ", "}
            {name === groupHeadName ? (
              <strong className="font-semibold text-accent">{name}</strong>
            ) : slug ? (
              <Link
                href={`/lab-members#${slug}`}
                className="text-foreground underline decoration-border decoration-dotted underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </Fragment>
        );
      })}
    </p>
  );
}

// Ready-made reference for anyone citing the work, in APA or BibTeX.
function CitePanel({ pub }: { pub: Publication }) {
  const [format, setFormat] = useState<"APA" | "BibTeX">("APA");
  const [copied, setCopied] = useState(false);
  const text = format === "APA" ? formatCitation(pub) : formatBibtex(pub);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. permissions) — the text is still there to select.
    }
  }

  return (
    <div className="mt-3 rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div role="group" aria-label="Citation format" className="flex gap-1">
          {(["APA", "BibTeX"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              aria-pressed={format === f}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                format === f ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button type="button" onClick={copy} className={pillClass}>
          {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-muted">
        {text}
      </pre>
    </div>
  );
}

function PublicationEntry({ pub }: { pub: Publication }) {
  const [citing, setCiting] = useState(false);
  const [reading, setReading] = useState(false);
  const url = publicationUrl(pub);
  const details = publicationDetails(pub);
  const where = [pub.location, pub.date].filter(Boolean).join(" · ");

  const id = publicationId(pub);
  const color = typeStyle[pub.type];

  return (
    // The number gets its own column from sm up; on phones it sits in the
    // label row so the title can use the full width.
    <li className="py-6 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[3.5rem_1fr] sm:gap-x-4">
      <span className="hidden pt-0.5 font-mono text-sm font-semibold text-muted sm:block">{id}</span>
      <div className="min-w-0">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted">
              <span className="font-mono font-semibold sm:hidden">{id}</span>
              <span className={`inline-flex items-center gap-1.5 font-medium uppercase tracking-widest ${color.text}`}>
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${color.fill}`} />
                {typeLabel[pub.type]}
              </span>
              <span aria-hidden>·</span>
              <span>{pub.areas.map((area) => areaTitle[area]).join(", ")}</span>
              {pub.note && (
                <span className="ml-1 rounded-full bg-accent/10 px-2.5 py-0.5 font-medium text-accent">{pub.note}</span>
              )}
            </p>
            <h3 className="mt-2 font-semibold leading-snug text-pretty text-foreground">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  {pub.title}
                </a>
              ) : (
                pub.title
              )}
            </h3>
            <Authors authors={pub.authors} />
            <p className="mt-1 text-sm leading-relaxed text-muted">
              <em className="text-foreground">{pub.venue}</em>
              {details && `, ${details}`}
              {where && ` · ${where}`}
            </p>
          </div>
          {/* Beside the text on wide screens, below it otherwise. */}
          <div className="mt-3 flex flex-wrap gap-2 lg:mt-0 lg:shrink-0 lg:justify-end">
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer" className={pillClass}>
                {pub.doi ? "DOI" : "View"} <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
              </a>
            )}
            {pub.pdf && (
              <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className={pillClass}>
                <FileText className="h-3.5 w-3.5" /> PDF
              </a>
            )}
            {pub.abstract && (
              <button type="button" onClick={() => setReading((v) => !v)} aria-expanded={reading} className={pillClass}>
                Abstract
                <ChevronDown className={`h-3.5 w-3.5 text-muted transition-transform ${reading ? "rotate-180" : ""}`} />
              </button>
            )}
            <button type="button" onClick={() => setCiting((v) => !v)} aria-expanded={citing} className={pillClass}>
              <Quote className="h-3.5 w-3.5" /> Cite
            </button>
          </div>
        </div>
        {reading && (
          <p className="mt-3 max-w-4xl rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed text-pretty text-muted">
            {pub.abstract}
          </p>
        )}
        {citing && <CitePanel pub={pub} />}
      </div>
    </li>
  );
}

const searchText = (pub: Publication) =>
  [pub.title, pub.authors.join(" "), pub.venue, pub.location, pub.year, pub.note].join(" ").toLowerCase();

const isArea = (value: string | null): value is ResearchAreaSlug => researchAreas.some((a) => a.slug === value);
const noSubscribe = () => () => {};
const readUrlArea = () => new URLSearchParams(location.search).get("area");

// Filters by type and research area, plus search, grouped by year (newest
// first). The Research page links here with ?area=<slug>.
export function PublicationBrowser() {
  const [type, setType] = useState<PublicationType | "All">("All");
  const [query, setQuery] = useState("");
  // The URL's ?area= applies until the visitor picks an area themselves.
  const urlArea = useSyncExternalStore(noSubscribe, readUrlArea, () => null);
  const [pickedArea, setPickedArea] = useState<ResearchAreaSlug | "All" | null>(null);
  const area = pickedArea ?? (isArea(urlArea) ? urlArea : "All");

  function selectArea(value: ResearchAreaSlug | "All") {
    setPickedArea(value);
    const url = value === "All" ? location.pathname : `${location.pathname}?area=${value}`;
    history.replaceState(null, "", url);
  }

  // Typing searches all three types; the pills then show how many match in each.
  function search(value: string) {
    setQuery(value);
    setType("All");
  }

  function reset() {
    setQuery("");
    setType("All");
    selectArea("All");
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matching = publications.filter(
    (pub) => (area === "All" || pub.areas.includes(area)) && terms.every((term) => searchText(pub).includes(term))
  );
  const shown = type === "All" ? matching : matching.filter((pub) => pub.type === type);

  // "Upcoming" (accepted, not presented yet) first, then one group per year.
  const upcoming = shown.filter((pub) => pub.upcoming);
  const published = shown.filter((pub) => !pub.upcoming);
  const years = [...new Set(published.map((pub) => pub.year))].sort((a, b) => b - a);
  const groups = [
    ...(upcoming.length > 0
      ? [{ id: "upcoming", heading: "Upcoming", caption: "Accepted, not yet presented", items: upcoming }]
      : []),
    ...years.map((year) => {
      const items = published.filter((pub) => pub.year === year);
      return { id: String(year), heading: String(year), caption: `${items.length} ${items.length === 1 ? "item" : "items"}`, items };
    }),
  ];

  const typeFilters = [
    { value: "All" as const, label: "All", count: matching.length },
    ...publicationTypes.map((t) => ({
      value: t.type,
      label: t.plural,
      count: matching.filter((pub) => pub.type === t.type).length,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Scrolls sideways on phones instead of wrapping into a pile of pills. */}
          <div
            role="group"
            aria-label="Filter by type"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {typeFilters.map(({ value, label, count }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                aria-pressed={type === value}
                className={`inline-flex items-center gap-1.5 ${chipClass(type === value)}`}
              >
                {value !== "All" && <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${typeStyle[value].fill}`} />}
                {label} <span className="opacity-60">{count}</span>
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Search publications</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => search(e.target.value)}
              placeholder="Search title, author, venue or year"
              className="w-full rounded-full border border-border bg-background py-2 pr-10 pl-10 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:gap-4">
          <p className="shrink-0 text-xs font-medium uppercase tracking-widest text-muted">Research area</p>
          <div
            role="group"
            aria-label="Filter by research area"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {[{ slug: "All" as const, title: "All areas" }, ...researchAreas].map((a) => (
              <button
                key={a.slug}
                type="button"
                onClick={() => selectArea(a.slug)}
                aria-pressed={area === a.slug}
                className={chipClass(area === a.slug)}
              >
                {a.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {shown.length} of {publications.length}
      </p>

      {groups.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="text-muted">No publications match these filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 xl:grid xl:grid-cols-[1fr_7rem] xl:gap-8">
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              // Heading sits beside its entries from lg up, above them on smaller screens.
              <section
                key={group.id}
                id={`section-${group.id}`}
                aria-labelledby={`group-${group.id}`}
                className={`grid scroll-mt-24 gap-4 rounded-3xl border bg-surface p-5 sm:p-8 lg:grid-cols-[8rem_1fr] lg:gap-8 ${
                  group.id === "upcoming" ? "border-primary/40" : "border-border"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:flex-col lg:gap-1">
                  <h2 id={`group-${group.id}`} className="text-2xl font-semibold tracking-tight text-foreground">
                    {group.heading}
                  </h2>
                  <p className="text-sm text-muted">{group.caption}</p>
                </div>
                <ul className="divide-y divide-border">
                  {group.items.map((pub) => (
                    <PublicationEntry key={`${pub.type}-${pub.title}`} pub={pub} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <YearIndex groups={groups} />
        </div>
      )}
    </div>
  );
}
