"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CalendarDays, Images, MapPin, Maximize2, Search, X } from "lucide-react";
import { albumSlug, gallery, galleryCategories, type GalleryAlbum, type GalleryCategory } from "@/data/gallery";
import { formatDate } from "@/lib/format-date";
import { GalleryLightbox, type GalleryView } from "@/components/gallery/gallery-lightbox";
import { YearIndex } from "@/components/layout/year-index";
import { FittedImage } from "@/components/media/fitted-image";

function chipClass(active: boolean) {
  return `shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
    active ? "border-primary bg-primary text-white" : "border-border text-muted hover:border-primary hover:text-primary"
  }`;
}

const newestFirst = [...gallery].sort((a, b) => b.date.localeCompare(a.date));
const featured = newestFirst.filter((album) => album.featured).slice(0, 3);
const year = (album: GalleryAlbum) => album.date.slice(0, 4);
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const searchText = (album: GalleryAlbum) =>
  [
    album.title,
    album.description,
    album.category,
    album.event,
    album.venue,
    year(album),
    album.people?.join(" "),
    album.photos.map((p) => [p.caption, p.credit].join(" ")).join(" "),
  ]
    .join(" ")
    .toLowerCase();

// The URL carries the category and open photo, e.g.
// /gallery?category=Awards&album=<slug>&photo=2, so any view can be shared.
const isCategory = (value: string | null): value is GalleryCategory =>
  galleryCategories.some((c) => c === value);
const noSubscribe = () => () => {};
const readSearch = () => location.search;

function readUrl(search: string) {
  const params = new URLSearchParams(search);
  const category = params.get("category");
  const album = gallery.find((a) => albumSlug(a) === params.get("album"));
  const photo = Number(params.get("photo")) - 1;
  return {
    category: isCategory(category) ? category : ("All" as const),
    view: album ? { album, photo: photo >= 0 && photo < album.photos.length ? photo : 0 } : null,
  };
}

// Opening the lightbox adds a history entry, so the browser's Back button
// (or a phone's back gesture) closes it instead of leaving the page.
function writeUrl(category: GalleryCategory | "All", view: GalleryView | null, push = false) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (view) {
    params.set("album", albumSlug(view.album));
    if (view.photo > 0) params.set("photo", String(view.photo + 1));
  }
  const query = params.toString();
  const url = query ? `${location.pathname}?${query}` : location.pathname;
  if (push) history.pushState({ lightbox: true }, "", url);
  else history.replaceState(history.state, "", url);
}

function PhotoCount({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
      <Images className="h-3.5 w-3.5" /> {count}
    </span>
  );
}

// Large photo cards with the details over a gradient, at the top of the page.
function Highlights({ onOpen }: { onOpen: (album: GalleryAlbum) => void }) {
  // Three: one large card beside two stacked. Fewer: equal columns.
  const big = featured.length === 3;
  const layouts = ["", "", "md:grid-cols-2", "lg:h-[38rem] lg:grid-cols-3 lg:grid-rows-2"];
  const layout = layouts[featured.length];

  return (
    <section aria-labelledby="highlights">
      <h2 id="highlights" className="mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Highlights
      </h2>
      <ul className={`grid grid-cols-1 gap-6 ${layout}`}>
        {featured.map((album, i) => {
          const lead = big && i === 0;
          return (
            <li
              key={albumSlug(album)}
              className={`aspect-[4/3] sm:aspect-video ${big ? "lg:aspect-auto" : ""} ${lead ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => onOpen(album)}
                aria-haspopup="dialog"
                className="group relative block h-full w-full overflow-hidden rounded-3xl border border-border bg-black text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FittedImage
                  src={album.photos[0].src}
                  alt={album.photos[0].alt}
                  sizes={lead ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                {album.photos.length > 1 && (
                  <span className="absolute top-4 right-4">
                    <PhotoCount count={album.photos.length} />
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 block p-5 text-white sm:p-6">
                  <span className="block text-xs font-medium uppercase tracking-widest text-white/75">
                    {album.category}
                    {album.event && ` · ${album.event}`}
                  </span>
                  <span
                    className={`mt-2 block font-semibold leading-snug text-balance ${lead ? "text-2xl sm:text-3xl" : "text-lg"}`}
                  >
                    {album.title}
                  </span>
                  <span className="mt-2 block text-sm text-white/75">
                    {formatDate(album.date)}
                    {album.venue && ` · ${album.venue}`}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function GalleryCard({ album, onOpen }: { album: GalleryAlbum; onOpen: () => void }) {
  const cover = album.photos[0];
  return (
    // The title's button stretches over the whole card, so any click opens it.
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-primary/50 has-[:focus-visible]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-surface-hover">
        <FittedImage
          src={cover.src}
          alt={cover.alt}
          sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {album.category}
        </span>
        {album.photos.length > 1 && (
          <span className="absolute bottom-3 left-3">
            <PhotoCount count={album.photos.length} />
          </span>
        )}
        <span
          aria-hidden
          className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {album.event && (
          <p className="line-clamp-1 text-xs font-medium uppercase tracking-widest text-accent">{album.event}</p>
        )}
        <h4 className={`font-semibold leading-snug text-pretty text-foreground ${album.event ? "mt-2" : ""}`}>
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="line-clamp-2 text-left transition-colors group-hover:text-primary after:absolute after:inset-0 focus-visible:outline-none"
          >
            {album.title}
          </button>
        </h4>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-pretty text-muted">{album.description}</p>

        <div className="mt-5 flex flex-col gap-1.5 border-t border-border pt-4 text-sm text-muted">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-accent" />
            <time dateTime={album.date}>{formatDate(album.date)}</time>
          </p>
          {album.venue && (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <span className="truncate">{album.venue}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

// Highlights, then filters by category plus search over the albums grouped
// by year (newest first). Selecting an album opens it in the lightbox.
export function GalleryBrowser() {
  // The URL applies until the visitor picks a category or photo themselves.
  const url = readUrl(useSyncExternalStore(noSubscribe, readSearch, () => ""));
  const [pickedCategory, setPickedCategory] = useState<GalleryCategory | "All" | null>(null);
  const [pickedView, setPickedView] = useState<GalleryView | null | undefined>(undefined);
  const category = pickedCategory ?? url.category;
  const view = pickedView === undefined ? url.view : pickedView;
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  function selectCategory(value: GalleryCategory | "All") {
    setPickedCategory(value);
    writeUrl(value, view);
  }

  function selectView(value: GalleryView | null) {
    setPickedView(value);
    writeUrl(category, value, view === null);
  }

  // Closing undoes the entry added on open; a lightbox opened from a shared
  // link has none, so its URL is just tidied instead.
  function closeView() {
    setPickedView(null);
    if (history.state?.lightbox) history.back();
    else writeUrl(category, null);
  }

  // Opens the lightbox when an album is selected, and locks page scroll behind it.
  const isOpen = view !== null;
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Back and Forward move between the open photo and the grid.
  useEffect(() => {
    function onPopState() {
      const urlView = readUrl(location.search).view;
      setPickedView(urlView);
      if (!urlView) dialogRef.current?.close();
    }
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, []);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matching = newestFirst.filter((album) => terms.every((term) => searchText(album).includes(term)));
  const shown = category === "All" ? matching : matching.filter((album) => album.category === category);

  const groups = [...new Set(shown.map(year))].map((y) => {
    const albums = shown.filter((album) => year(album) === y);
    const photos = albums.reduce((sum, album) => sum + album.photos.length, 0);
    return { id: y, heading: y, caption: `${plural(albums.length, "album")} · ${plural(photos, "photo")}`, albums };
  });

  // Categories with no albums yet are left out until some are added.
  const filters = [
    { value: "All" as const, count: matching.length },
    ...galleryCategories
      .filter((c) => gallery.some((album) => album.category === c))
      .map((c) => ({ value: c, count: matching.filter((album) => album.category === c).length })),
  ];

  function reset() {
    setQuery("");
    selectCategory("All");
  }

  const open = (album: GalleryAlbum) => selectView({ album, photo: 0 });

  return (
    <div>
      {featured.length > 0 && <Highlights onOpen={open} />}

      <h2 className="mt-20 mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">All albums</h2>
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Scrolls sideways on phones instead of wrapping into a pile of pills. */}
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map(({ value, count }) => (
            <button
              key={value}
              type="button"
              onClick={() => selectCategory(value)}
              aria-pressed={category === value}
              className={chipClass(category === value)}
            >
              {value} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Search the gallery</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, event, venue, person or year"
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

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {shown.length} of {plural(gallery.length, "album")}
      </p>

      {groups.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="text-muted">No albums match these filters.</p>
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
          <div className="flex flex-col gap-12">
            {groups.map((group) => (
              <section key={group.id} id={`section-${group.id}`} aria-labelledby={`year-${group.id}`} className="scroll-mt-24">
                <div className="mb-6 flex items-baseline gap-4">
                  <h3 id={`year-${group.id}`} className="text-2xl font-semibold tracking-tight text-foreground">
                    {group.heading}
                  </h3>
                  <p className="text-sm text-muted">{group.caption}</p>
                  <span aria-hidden className="h-px flex-1 self-center bg-border" />
                </div>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {group.albums.map((album) => (
                    <li key={albumSlug(album)}>
                      <GalleryCard album={album} onOpen={() => open(album)} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <YearIndex groups={groups} />
        </div>
      )}

      <GalleryLightbox
        albums={shown}
        view={view}
        dialogRef={dialogRef}
        onView={selectView}
        onClose={closeView}
      />
    </div>
  );
}
