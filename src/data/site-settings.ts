// Site-wide text and contact info. Edit these values directly — the
// homepage and layout read from here. This whole file gets replaced by a
// Sanity "Site Settings" document once the CMS is wired up.

export const siteSettings = {
  labName: "Advanced Plasma & Space Propulsion Lab",
  shortName: "APSP Lab",
  tagline:
    "Engineering the next generation of electric and plasma-based propulsion for space exploration.",
  heroHeadline: "Advancing Plasma Physics for the Next Era of Space Propulsion",
  heroSubtext:
    "We research, design, and test plasma-based propulsion systems — from Hall-effect thrusters to spacecraft-plasma interaction modeling — pushing the boundaries of how spacecraft move through space.",
  foundedYear: 2019,
  email: "contact@apsplab.example.edu",
  address: "Department of Aerospace Engineering, [University Name], [City, Country]",
  socials: {
    googleScholar: "#",
    linkedin: "#",
    twitter: "#",
  },
  stats: [
    { label: "Years Active", value: `${new Date().getFullYear() - 2019}+` },
    { label: "Publications", value: "20+" },
    { label: "Active Projects", value: "4" },
    { label: "Team Members", value: "10+" },
  ],
};
