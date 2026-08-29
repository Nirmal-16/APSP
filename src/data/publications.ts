// Publication list shown on the Home and Publications pages.
// Sample/placeholder entries — replace with real citations. Most recent
// first is the expected order.

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  link?: string;
}

export const publications: Publication[] = [
  {
    title: "Performance Characterization of a Low-Power Hall-Effect Thruster",
    authors: "P. Author, A. Researcher, et al.",
    venue: "Journal of Propulsion and Power (sample entry)",
    year: 2025,
    link: "#",
  },
  {
    title: "Langmuir Probe Diagnostics of Pulsed Plasma Thruster Exhaust",
    authors: "P. Author, S. Collaborator, et al.",
    venue: "Plasma Sources Science and Technology (sample entry)",
    year: 2024,
    link: "#",
  },
  {
    title: "Numerical Modeling of Spacecraft Surface Charging in LEO Plasma",
    authors: "P. Author, et al.",
    venue: "IEEE Transactions on Plasma Science (sample entry)",
    year: 2024,
    link: "#",
  },
];
