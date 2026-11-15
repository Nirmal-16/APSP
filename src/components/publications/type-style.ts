import type { PublicationType } from "@/data/publications";

// One colour per publication type (tokens in globals.css): `text` for labels,
// `fill` for dots and chart bars.
export const typeStyle: Record<PublicationType, { text: string; fill: string }> = {
  Journal: { text: "text-journal", fill: "bg-journal-fill" },
  Conference: { text: "text-conference", fill: "bg-conference-fill" },
  Poster: { text: "text-poster", fill: "bg-poster-fill" },
};
