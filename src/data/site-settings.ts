// Site-wide text, contact info and homepage content.

import type { Media, ModelKey } from "@/data/media";

// Visual on the Contact page — see data/media.ts for the options.
const contactMedia: Media = {
  type: "model",
  model: "electrospray",
  caption: "Electrospray propulsion — one of the micro-thruster technologies the group develops for small satellites.",
};

// Kept in parts for search engines (job listings need a structured address).
const postalAddress = {
  street: "Department of Aerospace Engineering, IIT Madras",
  city: "Chennai",
  postalCode: "600036",
  region: "Tamil Nadu",
  country: "India",
  countryCode: "IN",
};
const address = `${postalAddress.street}, ${postalAddress.city} ${postalAddress.postalCode}, ${postalAddress.region}, ${postalAddress.country}`;

export const siteSettings = {
  // Search & link previews — set both at launch:
  // siteUrl: the final address, e.g. "https://apsp.ae.iitm.ac.in". Left empty,
  //   Vercel's production address is used.
  // searchIndexing: true lets search engines list the site. Keep it false while
  //   the site still has placeholder content.
  siteUrl: "",
  searchIndexing: false,
  labName: "Advanced Plasma & Space Propulsion Group",
  shortName: "APSP Group",
  tagline:
    "Research in clean energy, plasma technologies, and space propulsion — from sustainable aviation fuels to electric thrusters.",
  heroHeadline: "Advancing Plasma, Propulsion & Clean Energy Research",
  heroSubtext:
    "We study plasma-assisted combustion, electrospray and field-emission electric propulsion, and sustainable aviation fuels — research that spans how we power aircraft and how spacecraft move through space.",
  aboutParagraph:
    "The Advanced Plasma & Space Propulsion Group carries out research across four areas: clean energy (biofuels and sustainable aviation fuels), plasma technologies, space propulsion, and other emerging technologies. This site shares our research activities with students, PhD scholars, postdocs, and industry — and we welcome anyone interested in exploring our work or joining the laboratory to get in touch.",
  // draft
  mission:
    "To understand and control the physics of plasma, combustion and electric propulsion — and turn that understanding into cleaner, more efficient propulsion systems.",
  // draft
  vision:
    "Propulsion that is cleaner on Earth and more capable in space: sustainable fuels for aviation, and compact, precise thrusters that let small satellites manoeuvre, hold position and change orbit.",
  email: "contact@apsplab.example.edu", // placeholder — replace with the lab's real email
  phone: "+91 00000 00000", // placeholder — replace with the lab's professional contact number
  address,
  postalAddress,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  socials: {
    // placeholders — "#" links render as disabled icons until real URLs are set
    googleScholar: "#",
    linkedin: "#",
    researchGate: "#",
    twitter: "#",
  },
  // 3D model in the homepage hero (see components/three/*).
  heroModel: "plasma-orb" as ModelKey,
  // "Featured research" on the homepage: a video, image or 3D model beside a
  // short story, with links to read more. Media options are in data/media.ts.
  homeFeature: {
    media: {
      type: "video",
      src: "/media/electrospray-satellite.mp4",
      poster: "/media/electrospray-satellite.jpg",
      caption: "A CubeSat carrying the group's multi-array electrospray thruster — visualisation by Punya Malaiya Jain.",
    } as Media,
    eyebrow: "Featured research",
    title: "Electrospray thrusters for CubeSats",
    text: "Small satellites need tiny, precise thrust to manoeuvre, hold formation and leave orbit at the end of their mission. The group develops multi-jet electrospray and field-emission thrusters that deliver exactly that, with no tanks or moving parts.",
    points: [
      "Annular slit emitter that fires many jets at once",
      "Micronewton thrust, finely throttled by voltage",
      "Tested in the lab's vacuum facility",
    ],
    links: [
      { href: "/research#space-propulsion", label: "Space propulsion research" },
      { href: "/insights/blog/how-do-you-steer-a-satellite-the-size-of-a-shoebox", label: "Read the story" },
    ],
  },
  contact: {
    headline: "Get in Touch",
    intro:
      "Whether you're a student exploring research opportunities, a researcher interested in collaboration, or an industry partner, we'd be glad to hear from you.",
    replyTime: "We usually reply within 2–3 working days.", // draft — confirm with client
    media: contactMedia,
    // `profile` links to the Group Head section on the About page.
    lead: {
      name: "Dr. Pravendra Kumar",
      role: "Group Head",
      email: "pkumar@iitm.ac.in", // their direct email (from the CV); leave empty to use the lab email
      photo: "/people/pravendra-kumar.jpg", // "" shows initials
      profile: "/about#principal-investigator",
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
  // Shown on the homepage. Optional `logo`: put the file in /public/collaborators,
  // e.g. "/collaborators/isro.png" (any size; a transparent PNG or SVG looks
  // best). Without one, the name is shown. Optional `url` links to their site.
  // placeholders — replace with the lab's real collaborators and logos
  collaborators: [
    { name: "National Space Research Institute", logo: "/collaborators/national-space-research-institute.svg" },
    { name: "Indian Institute of Aerospace Sciences", logo: "/collaborators/indian-institute-of-aerospace-sciences.svg" },
    { name: "Orbital Dynamics Pvt. Ltd.", logo: "/collaborators/orbital-dynamics.svg" },
    { name: "Bureau of Sustainable Fuels", logo: "/collaborators/bureau-of-sustainable-fuels.svg" },
    { name: "Plasma Systems International", logo: "/collaborators/plasma-systems-international.svg" },
  ] as { name: string; logo?: string; url?: string }[],
};
