// Research area cards shown on the Home and Research pages.
// Add/remove/edit entries here — order in this array is the display order.

export interface ResearchArea {
  slug: string;
  title: string;
  summary: string;
}

export const researchAreas: ResearchArea[] = [
  {
    slug: "electric-propulsion",
    title: "Electric Propulsion Systems",
    summary:
      "Hall-effect and ion thrusters for satellite station-keeping and deep-space missions.",
  },
  {
    slug: "plasma-diagnostics",
    title: "Plasma Diagnostics & Characterization",
    summary:
      "Laser and probe-based techniques to characterize plasma plumes and thruster performance.",
  },
  {
    slug: "mpd-thrusters",
    title: "Magnetoplasmadynamic (MPD) Thrusters",
    summary:
      "High-power plasma acceleration concepts for future high-thrust, crewed deep-space missions.",
  },
  {
    slug: "spacecraft-plasma-interactions",
    title: "Spacecraft–Plasma Interactions",
    summary:
      "Modeling how spacecraft surfaces and systems interact with the surrounding space plasma environment.",
  },
  {
    slug: "micro-propulsion",
    title: "Pulsed Plasma & Micro-propulsion",
    summary:
      "Compact, low-power propulsion solutions for small satellites and CubeSats.",
  },
];
