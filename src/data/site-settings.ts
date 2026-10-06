// Site-wide text, contact info, and homepage content. Edit these values
// directly — pages read from here. This whole file gets replaced by a
// Sanity "Site Settings" document once the CMS is wired up.

export const siteSettings = {
  labName: "Advanced Plasma & Space Propulsion Research Group",
  shortName: "APSP Group",
  tagline:
    "Research in clean energy, plasma technologies, and space propulsion — from sustainable aviation fuels to electric thrusters.",
  heroHeadline: "Advancing Plasma, Propulsion & Clean Energy Research",
  heroSubtext:
    "We study plasma-assisted combustion, electrospray and field-emission electric propulsion, and sustainable aviation fuels — research that spans how we power aircraft and how spacecraft move through space.",
  aboutParagraph:
    "The Advanced Plasma & Space Propulsion Group carries out research across four areas: clean energy (biofuels and sustainable aviation fuels), plasma technologies, space propulsion, and other emerging technologies. This site shares our research activities with students, PhD scholars, postdocs, and industry — and we welcome anyone interested in exploring our work or joining the laboratory to get in touch.",
  foundedYear: 2019,
  email: "contact@apsplab.example.edu",
  phone: "+91 00000 00000", // placeholder — replace with the lab's professional contact number
  address: "Department of Aerospace Engineering, [University Name], [City, Country]",
  socials: {
    googleScholar: "#",
    linkedin: "#",
    researchGate: "#",
    twitter: "#",
  },
  // Which hero 3D model to show on the homepage. Swap once the client
  // picks one from the Phase 0 intake (see components/three/*).
  heroModel: "plasma-orb" as "plasma-orb" | "thruster" | "satellite",
  stats: [
    { label: "Years Active", value: `${new Date().getFullYear() - 2019}+` },
    { label: "Publications", value: "20+" },
    { label: "Research Areas", value: "4" },
    { label: "Team Members", value: "10+" },
  ],
  collaborators: [
    { name: "National Space Research Institute", logo: "#" },
    { name: "Indian Institute of Aerospace Sciences", logo: "#" },
    { name: "Orbital Dynamics Pvt. Ltd.", logo: "#" },
    { name: "Bureau of Sustainable Fuels", logo: "#" },
    { name: "Plasma Systems International", logo: "#" },
  ],
};
