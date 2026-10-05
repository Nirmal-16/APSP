// Open positions shown in the Hiring section of the Insights page.
// Sample/placeholder entries — set `openings` to an empty array to show
// the "no current openings" state.

export interface Opening {
  title: string;
  type: "PhD Position" | "Postdoc" | "Intern" | "Research Assistant";
  postedDate: string; // e.g. "2026-06-01"
  summary: string;
  applyEmail: string;
}

export const openings: Opening[] = [
  {
    title: "PhD Position — Electric Propulsion",
    type: "PhD Position",
    postedDate: "2026-08-01",
    summary:
      "Fully funded PhD position researching electrospray and field-emission electric propulsion.",
    applyEmail: "careers@apsplab.example.edu",
  },
  {
    title: "Postdoctoral Researcher — Sustainable Aviation Fuels",
    type: "Postdoc",
    postedDate: "2026-07-15",
    summary:
      "1-2 year postdoctoral appointment studying combustion characteristics of biofuel blends.",
    applyEmail: "careers@apsplab.example.edu",
  },
  {
    title: "Summer Research Intern",
    type: "Intern",
    postedDate: "2026-06-20",
    summary:
      "Short-term internship supporting plasma diagnostics experiments and data analysis.",
    applyEmail: "careers@apsplab.example.edu",
  },
];
