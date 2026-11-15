// News & announcements shown on the Home and Insights pages, most recent
// first. Optional image: put it in /public/news and set e.g. "/news/grant.jpg".
// The entries below are placeholders until the client sends real news.

export type NewsCategory = "Announcement" | "Award" | "Grant" | "Publication" | "Event" | "Milestone";

export interface NewsItem {
  headline: string;
  description: string;
  category: NewsCategory;
  date: string; // e.g. "2026-06-01"
  image?: string;
}

export const news: NewsItem[] = [
  {
    headline: "Group awarded research grant for electric propulsion testbed",
    description:
      "The grant funds a vacuum test facility for electrospray and FEEP thruster experiments.",
    category: "Grant",
    date: "2026-06-01",
  },
  {
    headline: "PhD scholar wins best paper award at propulsion conference",
    description:
      "Recognised for work on plasma-assisted ignition of sustainable aviation fuel blends.",
    category: "Award",
    date: "2026-03-15",
  },
  {
    headline: "New plasma diagnostics facility opened",
    description:
      "The facility supports laser-induced plasma and microwave-enhanced ignition studies.",
    category: "Milestone",
    date: "2025-11-10",
  },
];

export function formatNewsDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
