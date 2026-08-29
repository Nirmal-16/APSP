// Project cards shown on the Home and Projects pages.
// Add/remove/edit entries here — order in this array is the display order.

export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: "Ongoing" | "Completed";
}

export const projects: Project[] = [
  {
    slug: "high-efficiency-hall-thruster",
    title: "High-Efficiency Hall Thruster Development",
    summary:
      "Designing a next-generation Hall-effect thruster targeting higher specific impulse and longer operational lifetime.",
    status: "Ongoing",
  },
  {
    slug: "geo-plasma-plume-diagnostics",
    title: "Plasma Plume Diagnostics for GEO Satellites",
    summary:
      "Characterizing thruster plume behavior to reduce spacecraft contamination risk in geostationary orbit.",
    status: "Ongoing",
  },
  {
    slug: "cubesat-pulsed-plasma-thruster",
    title: "Miniaturized Pulsed Plasma Thruster for CubeSats",
    summary:
      "A compact pulsed plasma thruster prototype for attitude control on small satellite platforms.",
    status: "Completed",
  },
  {
    slug: "mpd-power-processing-unit",
    title: "MPD Thruster Power Processing Unit",
    summary:
      "High-power electronics to drive magnetoplasmadynamic thrusters in laboratory test conditions.",
    status: "Ongoing",
  },
];
