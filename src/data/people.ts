import type { ResearchAreaSlug } from "@/data/research-areas";

// Lab members shown on the Research Team page.
//
// To add someone: append an entry below. Put their photo in /public/people
// as a 4:5 portrait (e.g. 640×800 JPEG) named after them, and set `photo`.
// Without a photo the card shows their initials. The page orders people by
// `roleOrder`, then by their position in this list.
//
// Sections: the Principal Investigator is featured on the About page; "Visiting
// Researcher" and "Collaborator" roles get their own section; `alumni: true`
// moves someone to Alumni. Empty sections are hidden.

export const roleOrder = [
  "Principal Investigator",
  "Postdoctoral Researcher",
  "PhD Scholar",
  "MS / MTech Scholar",
  "Dual Degree Student",
  "BTech Student",
  "Research Intern",
  "Visiting Researcher",
  "Collaborator",
] as const;

export type Role = (typeof roleOrder)[number];

export const collaboratorRoles: Role[] = ["Visiting Researcher", "Collaborator"];

export interface Person {
  name: string;
  role: Role;
  focus: string; // one line, shown on the card
  bio: string; // 3–4 sentences, third person — shown in the profile popup
  areas?: ResearchAreaSlug[]; // tags linking to the Research page
  since?: number; // year they joined the group
  affiliation?: string; // collaborators: home institution · alumni: where they are now
  photo?: string;
  email?: string;
  website?: string;
  linkedin?: string;
  scholar?: string;
  alumni?: boolean;
}

// URL-safe id used for shareable links, e.g. /research-team#punya-malaiya-jain
export function personSlug(person: Person) {
  return person.name
    .replace(/^Dr\.?\s+/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const people: Person[] = [
  {
    // Sample entry — replace with the PI's real title, bio, photo and links.
    name: "Dr. Pravendra Kumar",
    role: "Principal Investigator",
    focus: "Plasma-assisted combustion, electric propulsion and clean energy",
    areas: ["plasma-technologies", "space-propulsion", "clean-energy", "other-technologies"],
    bio: "Leads the Advanced Plasma & Space Propulsion Group in the Department of Aerospace Engineering, IIT Madras. The group's work spans plasma-assisted combustion and ignition, electrospray and field-emission electric propulsion, sustainable aviation fuels, and meso-scale combustion. (Sample bio — to be replaced with the client's text.)",
  },
  {
    name: "Gyandeep",
    role: "PhD Scholar",
    focus: "Experimental electrospray thrusters for spacecraft manoeuvring",
    areas: ["space-propulsion"],
    photo: "/people/gyandeep.jpg",
    bio: "Gyandeep is a PhD scholar specialising in space propulsion, with a primary focus on electrospray propulsion systems. The research covers the experimental investigation and development of electrospray thrusters for station keeping, attitude control and orbit-change manoeuvres. Gyandeep's master's research explored hybrid and solid rocket propulsion in depth. Outside the lab: cricket, cooking and exploring new places.",
  },
  {
    name: "Jay Shiv Dixit",
    role: "PhD Scholar",
    focus: "Hybrid pintle injectors for fuel-flexible combustion",
    areas: ["plasma-technologies", "clean-energy"],
    photo: "/people/jay-shiv-dixit.jpg",
    bio: "Jay Shiv Dixit is a doctoral researcher in plasma-assisted combustion, currently designing and optimising hybrid pintle injectors for fuel-flexible combustion systems. Jay's experimental work spans bioethanol, LPG, ammonia and surrogate fuels, complemented by combustion simulations in ANSYS Fluent. Outside research: cricket, badminton and music.",
  },
  {
    name: "Manisha Patel HM",
    role: "PhD Scholar",
    focus: "Plasma-assisted combustion for stable lean burning",
    areas: ["plasma-technologies"],
    bio: "Manisha Patel HM is a Direct PhD scholar researching combustion and plasma-assisted combustion, with a focus on using plasma to improve the stability of lean combustion. Before the PhD, Manisha worked as a Junior Research Fellow on the propagation of total pressure distortion in internal flows, gaining experience in experimental research and flow measurement. Outside research: novels, sitcoms, cooking and singing.",
  },
  {
    name: "Pugazhendhi R",
    role: "PhD Scholar",
    focus: "Meso- and micro-scale combustion",
    areas: ["other-technologies"],
    photo: "/people/pugazhendhi-r.jpg",
    bio: "Pugazhendhi R is a PhD scholar working on meso- and micro-scale combustion. Research interests include combustion, CFD, high-speed flows and gas dynamics. Outside the lab: football, open-source software and Linux, and automobiles.",
  },
  {
    name: "Aman Reddy Chinthareddy",
    role: "Dual Degree Student",
    focus: "Particle-in-Cell simulation of FEEP thruster plumes",
    areas: ["space-propulsion"],
    photo: "/people/aman-reddy-chinthareddy.jpg",
    bio: "Aman Reddy Chinthareddy is a Dual Degree student in Aerospace Engineering at IIT Madras, simulating Field Emission Electric Propulsion (FEEP) thrusters for precise satellite control. For the Dual Degree Project, Aman is building a 3D Particle-in-Cell (PIC) framework in OpenFOAM to study ion plume dynamics, and coupling liquid-phase EHD equations with vacuum PIC injection to optimise thruster efficiency. Aman is also exploring quantum computing; outside academics: swimming, graphite portraits, astrophotography and Indian history.",
  },
  {
    name: "Punya Malaiya Jain",
    role: "Dual Degree Student",
    focus: "Multi-array electrospray propulsion for small satellites",
    areas: ["space-propulsion"],
    photo: "/people/punya-jain.jpg",
    email: "ae23b038@smail.iitm.ac.in",
    website: "https://punya-personal-site.vercel.app/",
    bio: "Punya Malaiya Jain is a Dual Degree student in Aerospace Engineering at IIT Madras, developing a multi-array electrospray propulsion system for small satellites. The work combines physics-based models with experimental prototypes that let small satellites control their attitude, manoeuvre and change orbit. Punya presented this work as a poster at the 77th International Astronautical Congress (IAC 2026), and is also interested in AI, robotics and building startups.",
  },
];
