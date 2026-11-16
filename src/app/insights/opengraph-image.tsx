import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `News, articles and open positions — ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Insights",
    title: "What's happening in the group",
    subtitle: "News and announcements, articles from our researchers, and open positions.",
  });
}
