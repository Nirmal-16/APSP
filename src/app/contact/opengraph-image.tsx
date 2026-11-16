import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `Contact the ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: siteSettings.contact.headline,
    subtitle: siteSettings.address,
  });
}
