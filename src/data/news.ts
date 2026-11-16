// News & announcements shown on the Home and Insights pages; the pages sort
// them newest first. Optional image: put it in /public/news and set e.g.
// "/news/grant.jpg" — any size works. Optional `link` points to more detail,
// on this site ("/gallery?album=…") or elsewhere ("https://…").
// The entries below are placeholders until the client sends real news.

export const newsCategories = ["Announcement", "Award", "Grant", "Publication", "Event", "Milestone"] as const;

export type NewsCategory = (typeof newsCategories)[number];

export interface NewsItem {
  headline: string;
  description: string;
  category: NewsCategory;
  date: string; // e.g. "2026-06-01"
  image?: string;
  imageAlt?: string;
  link?: { href: string; label: string };
}

export const news: NewsItem[] = [
  {
    headline: "Group awarded research grant for electric propulsion testbed",
    description:
      "The grant funds a vacuum test facility for electrospray and FEEP thruster experiments, including a thrust stand and plume diagnostics.",
    category: "Grant",
    date: "2026-06-01",
    image: "/research/ion-thruster.jpg",
    imageAlt: "Ion thruster glowing blue inside a vacuum chamber",
  },
  {
    headline: "Electrospray thruster paper published",
    description:
      "A novel annular slit-type emitter for multi-jet electrospray propulsion, developed in the lab, is now published.",
    category: "Publication",
    date: "2026-05-12",
    link: { href: "/publications?area=space-propulsion", label: "See the publication" },
  },
  {
    headline: "PhD scholar wins best paper award at propulsion conference",
    description: "Recognised for work on plasma-assisted ignition of sustainable aviation fuel blends.",
    category: "Award",
    date: "2026-03-15",
    image: "/research/high-altitude.jpg",
    imageAlt: "Aircraft flying at high altitude above the clouds",
    link: { href: "/gallery?album=best-paper-award-for-plasma-assisted-ignition", label: "View photos" },
  },
  {
    headline: "Applications open for summer research internships",
    description:
      "Undergraduate students can apply for an eight-week internship on plasma diagnostics and combustion experiments.",
    category: "Announcement",
    date: "2026-02-20",
    link: { href: "/insights#hiring", label: "See open positions" },
  },
  {
    headline: "Department open day: live ion thruster demonstration",
    description: "School and college students saw an ion thruster running in the lab's vacuum chamber.",
    category: "Event",
    date: "2025-12-12",
    link: { href: "/gallery?album=ion-thruster-demonstration-for-visiting-students", label: "View photos" },
  },
  {
    headline: "New plasma diagnostics facility opened",
    description: "The facility supports laser-induced plasma and microwave-enhanced ignition studies.",
    category: "Milestone",
    date: "2025-11-10",
    image: "/research/plasma-discharge.jpg",
    imageAlt: "Purple plasma discharge between two electrodes",
  },
  {
    headline: "Patent granted for the hybrid pintle injector",
    description: "The fuel-flexible injector developed by the group for cleaner combustion has been granted a patent.",
    category: "Milestone",
    date: "2025-08-05",
    link: { href: "/research#clean-energy", label: "About this research" },
  },
];
