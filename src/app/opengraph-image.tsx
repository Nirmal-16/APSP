import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = siteSettings.labName;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Research group",
    title: siteSettings.heroHeadline,
    photo: "/research/plasma-discharge.jpg",
  });
}
