"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ResearchArea } from "@/data/research-areas";
import { MediaSlot } from "@/components/media/media-slot";
import { ResearchVisual } from "@/components/research/research-visual";

type Props = {
  area: ResearchArea;
  active: number | null;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onSelect: (i: number) => void;
  onClose: () => void;
};

const navClass =
  "inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary";

// Popup for one focus area: visual, domain, title and description. Native
// <dialog> gives focus trapping, Esc-to-close and a backdrop. The content only
// mounts while open, so the video and animation don't run in the background.
export function ResearchTopicDialog({ area, active, dialogRef, onSelect, onClose }: Props) {
  const topic = active === null ? null : area.topics[active];
  const close = () => dialogRef.current?.close();
  const previous = active !== null && active > 0 ? active - 1 : null;
  const next = active !== null && active < area.topics.length - 1 ? active + 1 : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={topic?.name ?? area.title}
      onClose={onClose}
      // Clicks on the backdrop land on the <dialog> itself.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {topic && active !== null && (
        <div className="relative p-4 sm:p-6">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-7 right-7 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:border-primary hover:text-foreground sm:top-9 sm:right-9"
          >
            <X className="h-4 w-4" />
          </button>

          {/* The key restarts a video when moving between topics. */}
          {topic.media ? (
            <MediaSlot key={topic.name} media={topic.media} className="aspect-video" />
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-surface">
              <div className="absolute inset-0">
                <ResearchVisual variant={area.visual} />
              </div>
            </div>
          )}

          <div className="px-2 pt-6 pb-2 sm:px-2">
            <p className="text-sm font-medium text-accent">{area.title}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{topic.name}</h2>
            <p className="mt-3 leading-relaxed text-muted">{topic.description}</p>
            {topic.details?.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
              {previous === null ? (
                <span />
              ) : (
                <button type="button" onClick={() => onSelect(previous)} className={navClass}>
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  <span className="truncate">{area.topics[previous].name}</span>
                </button>
              )}
              {next !== null && (
                <button type="button" onClick={() => onSelect(next)} className={navClass}>
                  <span className="truncate">{area.topics[next].name}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
