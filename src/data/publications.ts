// Publication list shown on the Publications page.
// Sample/placeholder entries — replace with real citations. Most recent
// first is the expected order within each type.

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "Journal" | "Conference";
  link?: string;
}

export const publications: Publication[] = [
  {
    title: "Performance Characterization of a Low-Power Hall-Effect Thruster",
    authors: "P. Author, A. Researcher, et al.",
    venue: "Journal of Propulsion and Power (sample entry)",
    year: 2025,
    type: "Journal",
    link: "#",
  },
  {
    title: "Langmuir Probe Diagnostics of Pulsed Plasma Thruster Exhaust",
    authors: "P. Author, S. Collaborator, et al.",
    venue: "Plasma Sources Science and Technology (sample entry)",
    year: 2024,
    type: "Journal",
    link: "#",
  },
  {
    title: "Numerical Modeling of Spacecraft Surface Charging in LEO Plasma",
    authors: "P. Author, et al.",
    venue: "IEEE Transactions on Plasma Science (sample entry)",
    year: 2024,
    type: "Journal",
    link: "#",
  },
  {
    title: "Combustion Characteristics of Sustainable Aviation Fuel Blends",
    authors: "P. Author, R. Scholar, et al.",
    venue: "International Conference on Clean Energy Systems (sample entry)",
    year: 2025,
    type: "Conference",
    link: "#",
  },
  {
    title: "A Compact Magnetoplasmadynamic Thruster for CubeSat Platforms",
    authors: "P. Author, M. Student, et al.",
    venue: "AIAA Propulsion and Energy Forum (sample entry)",
    year: 2024,
    type: "Conference",
    link: "#",
  },
];
