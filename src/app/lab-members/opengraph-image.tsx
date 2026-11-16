import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `Lab members of the ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Lab members",
    title: "The people behind the research",
    subtitle: "PhD scholars, students and collaborators working across plasma, propulsion and clean energy.",
  });
}
