import { gallery } from "@/data/gallery";
import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `Photo gallery of the ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  // The newest featured album's cover, else the newest album's.
  const newestFirst = [...gallery].sort((a, b) => b.date.localeCompare(a.date));
  const cover = (newestFirst.find((album) => album.featured) ?? newestFirst[0])?.photos[0];
  return ogImage({
    eyebrow: "Gallery",
    title: "Inside the lab, and beyond it",
    subtitle: "Experiments, facilities, conferences and milestones.",
    photo: cover?.src,
  });
}
