// Achievements/news items shown on the Home and Achievements pages.
// Most recent first is the expected order.

export interface NewsItem {
  title: string;
  date: string; // e.g. "2026-06-01"
  category: "Award" | "Grant" | "Media" | "Milestone";
}

export const news: NewsItem[] = [
  {
    title: "Lab awarded research grant for electric propulsion testbed",
    date: "2026-06-01",
    category: "Grant",
  },
  {
    title: "PhD student wins best paper award at propulsion conference",
    date: "2026-03-15",
    category: "Award",
  },
  {
    title: "New plasma diagnostics lab facility opened",
    date: "2025-11-10",
    category: "Milestone",
  },
];
