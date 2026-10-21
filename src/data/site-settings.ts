// Site-wide text, contact info, and homepage content. Edit these values
// directly — pages read from here. This whole file gets replaced by a
// Sanity "Site Settings" document once the CMS is wired up.

import type { Media } from "@/data/media";

// Visual on the Contact page — see data/media.ts for the options. To go
// back to the built-in 3D model: { type: "model", model: "electrospray" }.
const contactMedia: Media = {
  type: "video",
  src: "/media/electrospray-satellite.mp4",
  poster: "/media/electrospray-satellite.jpg",
  caption:
    "A CubeSat carrying the group's multi-array electrospray thruster — visualisation by Punya Malaiya Jain.",
};

const address = "Department of Aerospace Engineering, IIT Madras, Chennai 600036, Tamil Nadu, India";
const foundedYear = 2019;

export const siteSettings = {
  labName: "Advanced Plasma & Space Propulsion Group",
  shortName: "APSP Group",
  tagline:
    "Research in clean energy, plasma technologies, and space propulsion — from sustainable aviation fuels to electric thrusters.",
  heroHeadline: "Advancing Plasma, Propulsion & Clean Energy Research",
  heroSubtext:
    "We study plasma-assisted combustion, electrospray and field-emission electric propulsion, and sustainable aviation fuels — research that spans how we power aircraft and how spacecraft move through space.",
  aboutParagraph:
    "The Advanced Plasma & Space Propulsion Group carries out research across four areas: clean energy (biofuels and sustainable aviation fuels), plasma technologies, space propulsion, and other emerging technologies. This site shares our research activities with students, PhD scholars, postdocs, and industry — and we welcome anyone interested in exploring our work or joining the laboratory to get in touch.",
  foundedYear,
  email: "contact@apsplab.example.edu", // placeholder — replace with the lab's real email
  phone: "+91 00000 00000", // placeholder — replace with the lab's professional contact number
  address,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  socials: {
    // placeholders — "#" links render as disabled icons until real URLs are set
    googleScholar: "#",
    linkedin: "#",
    researchGate: "#",
    twitter: "#",
  },
  // Which hero 3D model to show on the homepage. Swap once the client
  // picks one from the Phase 0 intake (see components/three/*).
  heroModel: "plasma-orb" as "plasma-orb" | "thruster" | "satellite",
  contact: {
    headline: "Get in Touch",
    intro:
      "Whether you're a student exploring research opportunities, a researcher interested in collaboration, or an industry partner, we'd be glad to hear from you.",
    replyTime: "We usually reply within 2–3 working days.", // draft — confirm with client
    media: contactMedia,
    // Person named on the Contact page. `profile` links to their People card.
    lead: {
      name: "Dr. Pravendra Kumar",
      role: "Principal Investigator",
      email: "", // their direct email; leave empty to use the lab email
      profile: "/people#pravendra-kumar",
    },
    // "How can we help?" cards. Each opens an email with this subject line
    // so incoming mail is easy to sort.
    purposes: [
      {
        icon: "students",
        title: "Prospective students",
        text: "PhD, MS, Dual Degree and internship enquiries. Include your CV and the research area you're interested in.",
        subject: "Prospective student enquiry",
        link: { href: "/insights#hiring", label: "See open positions" },
      },
      {
        icon: "research",
        title: "Research collaboration",
        text: "Academic partnerships, joint projects, visiting positions and shared experiments.",
        subject: "Research collaboration",
      },
      {
        icon: "industry",
        title: "Industry & funding",
        text: "Sponsored research, testing support and technology partnerships with industry.",
        subject: "Industry partnership",
      },
    ] as const,
    // Draft answers — confirm with client before launch.
    faqs: [
      {
        question: "Do you take summer interns?",
        answer:
          "Internship openings are posted under Insights → Hiring. If nothing is listed, you're still welcome to email us with your CV and the research area you're interested in.",
      },
      {
        question: "How do I apply for a PhD or MS in the group?",
        answer:
          "Admission to research programmes at IIT Madras goes through the institute's official admissions process. Before applying, email us with your CV and research interests so we can tell you whether the group has a suitable opening.",
      },
      {
        question: "Can I visit the lab?",
        answer: "Yes — please email us in advance so we can arrange a suitable time for your visit.",
      },
      {
        question: "We're a company — how can we work with the group?",
        answer:
          "Email us with a short description of your problem or idea. We'll get back to you to discuss whether a sponsored project or collaboration is a good fit.",
      },
    ],
  },
  stats: [
    { label: "Years Active", value: `${new Date().getFullYear() - foundedYear}+` },
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
