import type { ResearchAreaSlug } from "@/data/research-areas";
import { slugify } from "@/lib/slugify";

// Albums shown on the Gallery page, grouped by year there (newest first) and
// filtered by category. Each album is one event or story; its first photo is
// the cover. Image files go in /public/gallery, e.g. "/gallery/aiaa-2026/talk.jpg".
// Any size or shape works — the page shows the whole photo, never a crop.
//
// Optional links tie an album to the rest of the site:
//   areas       — research area slugs, linking to the Research page
//   people      — names exactly as in data/people.ts, linking to their profiles
//   publication — a title exactly as in data/publications.ts
//   featured    — shown in the Highlights at the top (the first three are used)
// The entries below are placeholders until the client sends real photos.

export const galleryCategories = [
  "Experiments",
  "Facilities",
  "Conferences",
  "Events",
  "Awards",
  "Team",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string; // what this particular photo shows
  technical?: string; // e.g. "High-speed shadowgraph, 20,000 fps"
  credit?: string; // photographer
}

export interface GalleryAlbum {
  title: string;
  description: string;
  category: GalleryCategory;
  date: string; // e.g. "2026-06-01"
  event?: string;
  venue?: string;
  photos: GalleryPhoto[];
  areas?: ResearchAreaSlug[];
  people?: string[];
  publication?: string;
  featured?: boolean;
}

export const gallery: GalleryAlbum[] = [
  {
    title: "First hot-fire of the bipropellant test engine",
    description:
      "The test engine running at full chamber pressure during its first hot-fire campaign, with the plume imaged for combustion stability analysis.",
    category: "Experiments",
    date: "2026-08-21",
    event: "Hot-fire test campaign",
    venue: "Propulsion Test Facility",
    photos: [
      {
        src: "/research/engine-hot-fire.jpg",
        alt: "Rocket engine firing on a test stand with a bright exhaust plume",
        caption: "Steady-state firing at full chamber pressure.",
        technical: "Exposure 1/4000 s, ND filter",
        credit: "Jay Shiv Dixit",
      },
      {
        src: "/research/pintle-injector-spray.jpg",
        alt: "Liquid spray pattern from a pintle injector",
        caption: "Cold-flow check of the pintle injector before ignition.",
        technical: "Backlit high-speed imaging, 10,000 fps",
      },
      {
        src: "/research/spacecraft-thrusters.jpg",
        alt: "Spacecraft thrusters on a test fixture",
        caption: "Thruster hardware mounted on the test stand.",
      },
    ],
    areas: ["clean-energy", "space-propulsion"],
    people: ["Dr. Pravendra Kumar", "Jay Shiv Dixit", "Gyandeep"],
    publication: "Combustion characteristics studies of Jet-A fuel in fuel-flexible hybrid pintle injector",
    featured: true,
  },
  {
    title: "Microwave plasma ignition rig commissioned",
    description:
      "The new microwave-enhanced ignition rig producing a stable plasma, ready for ignition studies on sustainable fuel blends.",
    category: "Facilities",
    date: "2026-07-10",
    venue: "Plasma Diagnostics Laboratory",
    photos: [
      {
        src: "/research/microwave-plasma.jpg",
        alt: "Glowing microwave plasma inside a quartz chamber",
        caption: "First stable plasma in the quartz test section.",
        technical: "2.45 GHz magnetron, atmospheric pressure",
      },
    ],
    areas: ["plasma-technologies"],
    people: ["Pugazhendhi R"],
    publication:
      "Effects of microwave radiation on laser induced plasma ignition of n-butane/air mixture under atmospheric conditions",
  },
  {
    title: "Electrospray thruster work presented",
    description:
      "Group members presented results on ionic-liquid electrospray thrusters for small satellites to the electric propulsion community.",
    category: "Conferences",
    date: "2026-06-18",
    event: "International Electric Propulsion Conference",
    venue: "Toulouse, France",
    photos: [
      {
        src: "/media/electrospray-satellite.jpg",
        alt: "Small satellite with electrospray thrusters firing in orbit",
        caption: "Concept render shown in the opening slide of the talk.",
      },
      {
        src: "/research/ion-thruster.jpg",
        alt: "Ion thruster glowing blue inside a vacuum chamber",
        caption: "Vacuum chamber results discussed in the session.",
      },
    ],
    areas: ["space-propulsion"],
    people: ["Aman Reddy Chinthareddy", "Punya Malaiya Jain"],
    publication: "A novel annular slit-type emitter developed for multi-jet electrospray propulsion",
    featured: true,
  },
  {
    title: "Best paper award for plasma-assisted ignition",
    description:
      "Recognised for work on plasma-assisted ignition of sustainable aviation fuel blends at high-altitude relight conditions.",
    category: "Awards",
    date: "2026-03-15",
    event: "National Propulsion Conference",
    venue: "Bengaluru, India",
    photos: [
      {
        src: "/research/high-altitude.jpg",
        alt: "Aircraft flying at high altitude above the clouds",
        caption: "The work targets relight of aircraft engines at altitude.",
      },
    ],
    areas: ["plasma-technologies", "clean-energy"],
    people: ["Gyandeep"],
    featured: true,
  },
  {
    title: "Ion thruster demonstration for visiting students",
    description:
      "Students from local schools saw an ion thruster operating in the vacuum chamber during the department's open day.",
    category: "Events",
    date: "2025-12-12",
    event: "Department Open Day",
    venue: "Department of Aerospace Engineering",
    photos: [
      {
        src: "/research/ion-thruster.jpg",
        alt: "Ion thruster glowing blue inside a vacuum chamber",
        caption: "Live demonstration through the chamber viewport.",
        credit: "Punya Malaiya Jain",
      },
      {
        src: "/research/plasma-discharge.jpg",
        alt: "Purple plasma discharge between two electrodes",
        caption: "A tabletop plasma discharge explained to students.",
      },
    ],
    areas: ["space-propulsion"],
  },
  {
    title: "Welcoming new PhD scholars",
    description: "New members joined the group this semester across the plasma and combustion research areas.",
    category: "Team",
    date: "2025-11-24",
    event: "Lab induction",
    venue: "Advanced Plasma & Space Propulsion Lab",
    photos: [
      { src: "/people/punya-jain.jpg", alt: "Portrait of Punya Malaiya Jain" },
      { src: "/people/aman-reddy-chinthareddy.jpg", alt: "Portrait of Aman Reddy Chinthareddy" },
    ],
    people: ["Punya Malaiya Jain", "Aman Reddy Chinthareddy"],
  },
  {
    title: "Plasma diagnostics facility opened",
    description:
      "The facility supports laser-induced plasma and microwave-enhanced ignition studies, with optical access for emission spectroscopy.",
    category: "Facilities",
    date: "2025-11-10",
    event: "Facility inauguration",
    venue: "Plasma Diagnostics Laboratory",
    photos: [
      {
        src: "/research/plasma-discharge.jpg",
        alt: "Purple plasma discharge between two electrodes",
        caption: "Discharge cell used for optical emission spectroscopy.",
        technical: "Nanosecond pulsed discharge, 10 kV",
      },
    ],
    areas: ["plasma-technologies"],
    people: ["Dr. Pravendra Kumar"],
  },
  {
    title: "Sustainable aviation fuel results shared",
    description:
      "A poster on ignition delay and flame stability of sustainable aviation fuel blends drew discussion with industry researchers.",
    category: "Conferences",
    date: "2025-09-03",
    event: "Asia-Pacific Combustion Symposium",
    venue: "Singapore",
    photos: [
      {
        src: "/research/sustainable-aviation-fuel.jpg",
        alt: "Aircraft being refuelled on an airport apron",
      },
      { src: "/research/biofuels.jpg", alt: "Biofuel samples in glass vials" },
    ],
    areas: ["clean-energy"],
  },
  {
    title: "Micro-combustion flame studies",
    description: "A stable flame in a millimetre-scale combustor, part of the group's work on small-scale power and propulsion.",
    category: "Experiments",
    date: "2025-07-28",
    venue: "Combustion Laboratory",
    photos: [
      {
        src: "/research/small-flame.jpg",
        alt: "Small blue flame in a micro-combustor",
        caption: "Premixed flame anchored inside the swirl combustor.",
        technical: "Macro lens, 1/250 s",
      },
    ],
    areas: ["other-technologies"],
    publication: "Development of swirl-flow non-premixed mesoscale combustor",
  },
  {
    title: "Nuclear thermal propulsion outreach talk",
    description:
      "The Group Head spoke about nuclear thermal rockets and crewed Mars missions at a public science lecture series.",
    category: "Events",
    date: "2025-05-16",
    event: "Public science lecture series",
    venue: "Science Centre Auditorium",
    photos: [
      {
        src: "/research/nuclear-thermal-rocket.jpg",
        alt: "Illustration of a nuclear thermal rocket in space",
      },
    ],
    areas: ["space-propulsion"],
    people: ["Dr. Pravendra Kumar"],
  },
  {
    title: "Team at the annual group meeting",
    description: "Research updates from every student, followed by planning for the coming year's experiments.",
    category: "Team",
    date: "2025-04-02",
    event: "Annual group meeting",
    photos: [
      { src: "/people/gyandeep.jpg", alt: "Portrait of Gyandeep" },
      { src: "/people/pugazhendhi-r.jpg", alt: "Portrait of Pugazhendhi R" },
      { src: "/people/jay-shiv-dixit.jpg", alt: "Portrait of Jay Shiv Dixit" },
    ],
    people: ["Gyandeep", "Pugazhendhi R", "Jay Shiv Dixit"],
  },
];

// URL-safe id used for shareable links, e.g. /gallery?album=welcoming-new-phd-scholars
export function albumSlug(album: GalleryAlbum) {
  return slugify(album.title);
}
