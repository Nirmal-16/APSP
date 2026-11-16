import { researchAreas } from "@/data/research-areas";
import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `Research areas of the ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Research",
    title: "What we work on",
    subtitle: researchAreas.map((a) => a.title).join(" · "),
    photo: "/research/ion-thruster.jpg",
  });
}
