"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Link2,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { formatGalleryDate, type GalleryAlbum } from "@/data/gallery";
import { people, personInitials, personSlug } from "@/data/people";
import { publications, publicationUrl, typeLabel } from "@/data/publications";
import { researchAreas } from "@/data/research-areas";
import { GalleryImage } from "@/components/gallery/gallery-image";

export type GalleryView = { album: GalleryAlbum; photo: number };

type Props = {
  albums: GalleryAlbum[];
  view: GalleryView | null;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onView: (view: GalleryView) => void;
  onClose: () => void;
};

const arrowClass =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const labelClass = "text-xs font-medium uppercase tracking-widest text-muted";

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-primary hover:text-primary";

// Full-size view of one album with its details and links. Native <dialog>
// gives focus trapping, Esc-to-close and a backdrop. The arrows step through
// the album's photos, then on into the next album the filters show.
export function GalleryLightbox({ albums, view, dialogRef, onView, onClose }: Props) {
  const close = () => dialogRef.current?.close();

  function step(delta: number): GalleryView | null {
    if (!view) return null;
    const photo = view.photo + delta;
    if (photo >= 0 && photo < view.album.photos.length) return { album: view.album, photo };
    // An album opened from a shared link may be outside the current filters.
    const index = albums.indexOf(view.album);
    const album = index === -1 ? undefined : albums[index + delta];
    return album ? { album, photo: delta > 0 ? 0 : album.photos.length - 1 } : null;
  }
  const previous = step(-1);
  const next = step(1);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft" && previous) onView(previous);
    if (e.key === "ArrowRight" && next) onView(next);
  }

  const album = view?.album;
  const photo = view && album?.photos[view.photo];

  return (
    <dialog
      ref={dialogRef}
      aria-label={album?.title ?? "Photo"}
      onClose={onClose}
      onKeyDown={onKeyDown}
      // Clicks on the backdrop land on the <dialog> itself.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background p-0 text-foreground backdrop:bg-black/80 backdrop:backdrop-blur-sm lg:overflow-hidden"
    >
      {view && album && photo && (
        // Photo beside its details from lg up, above them on smaller screens.
        <div className="relative grid grid-cols-1 lg:h-[85vh] lg:max-h-[50rem] lg:grid-cols-[1fr_24rem]">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 lg:border lg:border-border lg:bg-background lg:text-muted lg:hover:bg-surface-hover lg:hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex min-h-0 flex-col bg-black">
            <div className="relative h-[45vh] overflow-hidden sm:h-[55vh] lg:h-auto lg:flex-1">
              {/* The key swaps both layers together when stepping between photos. */}
              <GalleryImage key={photo.src + view.photo} src={photo.src} alt={photo.alt} sizes="(min-width: 1024px) 70vw, 100vw" />
              {previous && (
                <button type="button" onClick={() => onView(previous)} aria-label="Previous photo" className={`${arrowClass} left-3`}>
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {next && (
                <button type="button" onClick={() => onView(next)} aria-label="Next photo" className={`${arrowClass} right-3`}>
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
              {album.photos.length > 1 && (
                <p className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur-sm">
                  {view.photo + 1} / {album.photos.length}
                </p>
              )}
            </div>

            {album.photos.length > 1 && (
              <ul aria-label="Photos in this album" className="flex shrink-0 gap-2 overflow-x-auto p-3">
                {album.photos.map((p, i) => (
                  <li key={p.src + i} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onView({ album, photo: i })}
                      aria-label={`Photo ${i + 1}`}
                      aria-current={i === view.photo ? "true" : undefined}
                      className={`relative block h-14 w-20 overflow-hidden rounded-lg transition-opacity ${
                        i === view.photo ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex min-h-0 flex-col p-6 sm:p-8 lg:overflow-y-auto lg:pt-16">
            <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {album.category}
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-foreground">{album.title}</h2>
            <p className="mt-3 leading-relaxed text-pretty text-muted">{album.description}</p>

            {(photo.caption || photo.technical || photo.credit) && (
              <div className="mt-5 rounded-2xl border border-border bg-surface p-4 text-sm">
                {photo.caption && <p className="leading-relaxed text-foreground">{photo.caption}</p>}
                {photo.technical && (
                  <p className={`font-mono text-xs leading-relaxed text-muted ${photo.caption ? "mt-2" : ""}`}>
                    {photo.technical}
                  </p>
                )}
                {photo.credit && (
                  <p className={`flex items-center gap-1.5 text-xs text-muted ${photo.caption || photo.technical ? "mt-2" : ""}`}>
                    <Camera className="h-3.5 w-3.5" /> Photo: {photo.credit}
                  </p>
                )}
              </div>
            )}

            <dl className="mt-6 flex flex-col gap-4 border-t border-border pt-6 text-sm">
              {album.event && <Detail icon={Sparkles} label="Event" value={album.event} />}
              <Detail icon={CalendarDays} label="Date" value={formatGalleryDate(album.date)} />
              {album.venue && <Detail icon={MapPin} label="Venue" value={album.venue} />}
            </dl>

            <RelatedLinks album={album} />

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <ShareButton />
              <p className="hidden text-xs text-muted lg:block">← → to browse · Esc to close</p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div>
        <dt className={labelClass}>{label}</dt>
        <dd className="mt-0.5 text-foreground">{value}</dd>
      </div>
    </div>
  );
}

// Research areas, people and the paper behind the photos, each linking to
// its page. Names or titles that don't match the data are skipped.
function RelatedLinks({ album }: { album: GalleryAlbum }) {
  const areas = researchAreas.filter((a) => album.areas?.includes(a.slug));
  const members = people.filter((p) => album.people?.includes(p.name));
  const pub = publications.find((p) => p.title === album.publication);
  const pubUrl = pub && publicationUrl(pub);
  if (areas.length === 0 && members.length === 0 && !pub) return null;

  return (
    <div className="mt-6 flex flex-col gap-5 border-t border-border pt-6">
      {areas.length > 0 && (
        <div>
          <h3 className={labelClass}>Research</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {areas.map((a) => (
              <Link key={a.slug} href={`/research#${a.slug}`} className={pillClass}>
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {members.length > 0 && (
        <div>
          <h3 className={labelClass}>People</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {members.map((person) => (
              <li key={person.name}>
                {/* The Group Head's full profile is on the About page. */}
                <Link
                  href={person.role === "Principal Investigator" ? "/about" : `/lab-members#${personSlug(person)}`}
                  className="group flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-hover text-xs text-muted">
                    {person.photo ? (
                      <Image src={person.photo} alt="" fill sizes="32px" className="object-cover" />
                    ) : (
                      personInitials(person.name)
                    )}
                  </span>
                  {person.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {pub && (
        <div>
          <h3 className={labelClass}>Related publication</h3>
          <a
            href={pubUrl ?? `/publications?area=${pub.areas[0]}`}
            {...(pubUrl && { target: "_blank", rel: "noopener noreferrer" })}
            className="group mt-2 flex gap-3 rounded-2xl border border-border p-3 transition-colors hover:border-primary"
          >
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="min-w-0 text-sm">
              <span className="block leading-snug font-medium text-pretty text-foreground transition-colors group-hover:text-primary">
                {pub.title}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {typeLabel[pub.type]} · {pub.year} · <em>{pub.venue}</em>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted" />
          </a>
        </div>
      )}
    </div>
  );
}

// The page URL always points at the open photo, so sharing is a copy.
function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. permissions) — the link is still in the address bar.
    }
  }

  return (
    <button type="button" onClick={copy} className={pillClass}>
      {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Link2 className="h-3.5 w-3.5" />}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
