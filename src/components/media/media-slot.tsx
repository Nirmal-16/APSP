"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { Media, ModelKey } from "@/data/media";

// Each model is its own chunk, so a page only downloads the one it shows.
const loading = () => <div className="h-full w-full animate-pulse bg-surface" />;
const models: Record<ModelKey, React.ComponentType> = {
  "plasma-orb": dynamic(() => import("@/components/three/plasma-orb").then((m) => m.PlasmaOrbCanvas), { ssr: false, loading }),
  thruster: dynamic(() => import("@/components/three/thruster-model").then((m) => m.ThrusterCanvas), { ssr: false, loading }),
  satellite: dynamic(() => import("@/components/three/satellite-model").then((m) => m.SatelliteCanvas), { ssr: false, loading }),
  electrospray: dynamic(() => import("@/components/three/electrospray-model").then((m) => m.ElectrosprayCanvas), { ssr: false, loading }),
};

// Renders a Media entry as a framed figure. Pass `className` to
// change the frame's aspect ratio or size.
export function MediaSlot({ media, className = "aspect-[4/3]" }: { media: Media; className?: string }) {
  const Model = media.type === "model" ? models[media.model] : null;

  return (
    <figure className={`relative w-full overflow-hidden rounded-3xl border border-border bg-surface ${className}`}>
      {Model && (
        <div className="absolute inset-0 touch-none">
          <Model />
        </div>
      )}
      {media.type === "image" && (
        <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      )}
      {media.type === "video" && (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={media.caption}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Overlaid so the caption never changes the frame's outer size —
          keeps the frame's edges aligned with neighbouring content. */}
      {(media.caption || Model) && (
        <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl border border-border bg-background/75 px-4 py-3 text-xs leading-relaxed sm:text-sm text-muted backdrop-blur-md">
          {media.caption}
          {Model && <span className="ml-1 text-xs text-muted/70">(Drag to rotate)</span>}
        </figcaption>
      )}
    </figure>
  );
}
