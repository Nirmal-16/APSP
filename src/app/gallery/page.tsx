import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import { siteSettings } from "@/data/site-settings";
import { GalleryBrowser } from "@/components/gallery/gallery-browser";
import { BackToTop } from "@/components/motion/back-to-top";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";

export const metadata: Metadata = {
  title: `Gallery — ${siteSettings.labName}`,
  description:
    "Photos from the group's experiments, facilities, conferences, events and awards, with the event, venue and date for each.",
};

const firstYear = Math.min(...gallery.map((album) => Number(album.date.slice(0, 4))));

const stats = [
  { value: String(gallery.reduce((sum, album) => sum + album.photos.length, 0)), label: "Photos" },
  { value: String(gallery.length), label: "Albums" },
  { value: String(new Set(gallery.map((album) => album.event).filter(Boolean)).size), label: "Events" },
  { value: String(firstYear), label: "Since" },
];

export default function GalleryPage() {
  return (
    <div className="site-container py-24">
      {/* Left-aligned on phones, where centred multi-line text looks ragged. */}
      <Reveal className="mx-auto max-w-3xl sm:text-center">
        <p className="text-sm font-medium text-accent">Gallery</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          Inside the lab, and beyond it.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">
          Experiments, facilities, conferences and milestones from the group. Open any album to see every photo full
          size, with the people, research and papers behind it.
        </p>
      </Reveal>

      <div className="mx-auto max-w-[96rem]">
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col justify-center bg-surface px-4 py-6 text-center">
                <StatCounter value={stat.value} />
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <GalleryBrowser />
        </Reveal>
      </div>

      <BackToTop />
    </div>
  );
}
