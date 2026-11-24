import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `About the ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const { lead } = siteSettings.contact;
  return ogImage({
    eyebrow: "Principal Investigator",
    title: "About the group",
    subtitle: `Led by ${lead.name}, ${lead.role}`,
    photo: lead.photo || undefined,
  });
}
