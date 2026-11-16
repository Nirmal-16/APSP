import { publicationTypes, publications } from "@/data/publications";
import { siteSettings } from "@/data/site-settings";
import { ogImage, ogSize } from "@/lib/og-image";

export const alt = `Publications of the ${siteSettings.labName}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const counts = publicationTypes.map((t) => {
    const n = publications.filter((pub) => pub.type === t.type).length;
    return `${n} ${(n === 1 ? t.label : t.plural).toLowerCase()}`;
  });
  return ogImage({
    eyebrow: "Publications",
    title: "Our research, published and presented",
    subtitle: counts.join(" · "),
  });
}
