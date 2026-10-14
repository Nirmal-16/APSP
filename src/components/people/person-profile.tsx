"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, GraduationCap, Globe, Link2, Mail, Share2, X } from "lucide-react";
import { personSlug, type Person } from "@/data/people";
import { researchAreas } from "@/data/research-areas";
import { publicationsBy } from "@/data/publications";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function roleLine(person: Person) {
  const role = person.alumni ? `Former ${person.role}` : person.role;
  return person.since ? `${role} · since ${person.since}` : role;
}

function affiliationLine(person: Person) {
  if (!person.affiliation) return null;
  return person.alumni ? `Now at ${person.affiliation}` : person.affiliation;
}

// 4:5 portrait; falls back to initials when there's no photo yet.
function PersonPhoto({ person, sizes }: { person: Person; sizes: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/15">
          <span className="text-5xl font-semibold tracking-tight text-primary/70">{initials(person.name)}</span>
        </div>
      )}
    </div>
  );
}

// Research-area chips. `linked` turns them into links to /research#area —
// off inside cards, since a card is already a button.
function AreaTags({ person, linked }: { person: Person; linked?: boolean }) {
  const areas = researchAreas.filter((a) => person.areas?.includes(a.slug));
  if (areas.length === 0) return null;
  const chip = "rounded-full border border-border px-2.5 py-0.5 text-xs text-muted";
  return (
    <div className="flex flex-wrap gap-1.5">
      {areas.map((area) =>
        linked ? (
          <Link
            key={area.slug}
            href={`/research#${area.slug}`}
            className={`${chip} transition-colors hover:border-primary hover:text-primary`}
          >
            {area.title}
          </Link>
        ) : (
          <span key={area.slug} className={chip}>
            {area.title}
          </span>
        )
      )}
    </div>
  );
}

function personLinks(person: Person) {
  return [
    { href: person.email && `mailto:${person.email}`, label: "Email", Icon: Mail },
    { href: person.website, label: "Website", Icon: Globe },
    { href: person.linkedin, label: "LinkedIn", Icon: Link2 },
    { href: person.scholar, label: "Google Scholar", Icon: GraduationCap },
  ].filter((link): link is typeof link & { href: string } => !!link.href);
}

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary";

function PersonLinks({ person }: { person: Person }) {
  return personLinks(person).map(({ href, label, Icon }) => {
    const external = !href.startsWith("mailto:");
    return (
      <a key={label} href={href} target={external ? "_blank" : undefined} rel="noopener noreferrer" className={pillClass}>
        <Icon className="h-4 w-4" />
        {label}
        {external && <ArrowUpRight className="h-3.5 w-3.5 text-muted" />}
      </a>
    );
  });
}

// Native <dialog>: showModal() gives focus trapping, Esc-to-close and a
// backdrop for free. Opening sets #slug in the URL so a profile can be
// shared; visiting /people#slug opens it directly.
function useProfileDialog(slug: string) {
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    history.replaceState(null, "", `#${slug}`);
  }, [slug]);

  useEffect(() => {
    const openFromHash = () => {
      if (decodeURIComponent(location.hash) === `#${slug}`) open();
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [slug, open]);

  function onClose() {
    document.documentElement.style.overflow = "";
    if (location.hash === `#${slug}`) history.replaceState(null, "", location.pathname + location.search);
  }

  return { ref, open, close: () => ref.current?.close(), onClose };
}

type DialogProps = {
  person: Person;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  close: () => void;
  onClose: () => void;
};

function ProfileDialog({ person, dialogRef, close, onClose }: DialogProps) {
  const [copied, setCopied] = useState(false);
  const pubs = publicationsBy(person.name);
  const affiliation = affiliationLine(person);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}#${personSlug(person)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. permissions) — the URL bar already has the link.
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={person.name}
      onClose={onClose}
      // Clicks on the backdrop land on the <dialog> itself.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative grid gap-6 p-6 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:border-primary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="w-40 sm:w-full">
          <PersonPhoto person={person} sizes="13rem" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-accent">{roleLine(person)}</p>
          <h2 className="mt-1 pr-10 text-2xl font-semibold tracking-tight">{person.name}</h2>
          {affiliation && <p className="mt-1 text-sm font-medium text-foreground">{affiliation}</p>}
          <p className="mt-1 text-sm text-muted">{person.focus}</p>
          <div className="mt-4">
            <AreaTags person={person} linked />
          </div>
          <p className="mt-5 leading-relaxed text-muted">{person.bio}</p>

          {pubs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted">Publications</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {pubs.map((pub) => (
                  <li key={pub.title} className="rounded-xl border border-border bg-surface p-4 text-sm">
                    <p className="font-medium text-foreground">
                      {pub.link ? (
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                          {pub.title}
                        </a>
                      ) : (
                        pub.title
                      )}
                    </p>
                    <p className="mt-1 text-muted">
                      {pub.venue}, {pub.year}
                      {pub.note && <span className="ml-1 text-accent">({pub.note})</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <PersonLinks person={person} />
            <button type="button" onClick={copyLink} className={pillClass}>
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Link copied" : "Copy profile link"}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// Grid card — the whole card opens the profile.
export function PersonCard({ person }: { person: Person }) {
  const slug = personSlug(person);
  const { ref, open, close, onClose } = useProfileDialog(slug);
  const affiliation = affiliationLine(person);

  return (
    <div id={slug} className="scroll-mt-24">
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="group block w-full rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <PersonPhoto person={person} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
        <h3 className="mt-4 font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {person.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-accent">{roleLine(person)}</p>
        {affiliation && <p className="mt-0.5 text-sm text-foreground">{affiliation}</p>}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{person.focus}</p>
        <div className="mt-3">
          <AreaTags person={person} />
        </div>
      </button>
      <ProfileDialog person={person} dialogRef={ref} close={close} onClose={onClose} />
    </div>
  );
}

// Wide card for the Principal Investigator, above the team grid.
export function FeaturedPerson({ person }: { person: Person }) {
  const slug = personSlug(person);
  const { ref, open, close, onClose } = useProfileDialog(slug);

  return (
    <article
      id={slug}
      className="grid scroll-mt-24 items-center gap-8 rounded-3xl border border-border bg-surface p-6 sm:p-8 md:grid-cols-[16rem_1fr] lg:gap-12 lg:p-10"
    >
      <div className="w-48 sm:w-56 md:w-full">
        <PersonPhoto person={person} sizes="16rem" />
      </div>
      <div>
        <p className="w-fit rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
          {roleLine(person)}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{person.name}</h2>
        <p className="mt-2 font-medium text-foreground">{person.focus}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{person.bio}</p>
        <div className="mt-5">
          <AreaTags person={person} linked />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            View full profile
          </button>
          <PersonLinks person={person} />
        </div>
      </div>
      <ProfileDialog person={person} dialogRef={ref} close={close} onClose={onClose} />
    </article>
  );
}
