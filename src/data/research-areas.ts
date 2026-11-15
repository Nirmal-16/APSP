import type { Media } from "@/data/media";

// Research areas shown on the Home and Research pages, in display order.
// Area titles and topic names come from the client. Area summaries and
// topic descriptions are drafts — send them to the client to confirm.
//
// Topic images in /public/research are SAMPLES from Wikimedia Commons
// (public domain or Creative Commons, credited in each caption) until the
// lab sends its own photos. Swap `src`, `alt` and `caption` to replace one.

// Header text for the Research page. draft
export const researchIntro = {
  headline: "From cleaner flames to precise thrust in orbit.",
  text: "Our work spans four connected areas — clean energy, plasma technologies, space propulsion and other emerging technologies. Select a focus area to learn more.",
};

// How the group works — each line is backed by the team's own bios.
export const researchApproach = [
  {
    title: "Experimental",
    text: "Laboratory studies of injectors, flames and electrospray thruster prototypes.",
  },
  {
    title: "Computational",
    text: "Combustion simulation in ANSYS Fluent and particle-in-cell modelling of thruster plumes in OpenFOAM.",
  },
  {
    title: "Physics-based modelling",
    text: "Models that link fundamental mechanisms to device design, from single injectors to multi-emitter thruster arrays.",
  },
];

// `icon` keys map to lucide-react icons via src/components/icons/research-icon.tsx
export type ResearchIconKey = "leaf" | "atom" | "rocket" | "sparkles";

// `visual` picks the animated illustration on the Research page
// (src/components/research/research-visual.tsx).
export type ResearchVisualKey = "combustion" | "plasma" | "propulsion" | "microscale";

// One focus area; opens in a popup on the Research page.
export interface ResearchTopic {
  name: string;
  description: string;
  details?: string[]; // extra paragraphs shown in the popup
  media?: Media; // image, video or 3D model; without one, the popup shows the area's animation
}

export type ResearchAreaSlug = "clean-energy" | "plasma-technologies" | "space-propulsion" | "other-technologies";

export interface ResearchArea {
  slug: ResearchAreaSlug;
  title: string;
  subtitle: string;
  summary: string;
  icon: ResearchIconKey;
  visual: ResearchVisualKey;
  topics: ResearchTopic[];
}

export const researchAreas: ResearchArea[] = [
  {
    slug: "clean-energy",
    icon: "leaf",
    visual: "combustion",
    title: "Clean Energy",
    subtitle: "Biofuels and Sustainable Aviation Fuels",
    summary:
      "Cleaner fuels and the combustion systems that burn them — from biofuels and sustainable aviation fuels to gas turbines, rocket engines, and injectors.",
    topics: [
      {
        name: "Biofuel and Alternative Fuels",
        description:
          "Characterising the combustion and emission behaviour of bio-derived and alternative fuels as replacements for conventional fossil fuels.",
        media: {
          type: "image",
          src: "/research/biofuels.jpg",
          alt: "Sample bottles of algae oil, blended algae oil and corn oil biofuels",
          caption: "Sample image · Biofuel samples · USDA / Lance Cheung (public domain)",
        },
      },
      {
        name: "Sustainable Aviation Fuels",
        description:
          "Evaluating sustainable aviation fuel blends for spray, ignition, and combustion performance under aviation-relevant conditions.",
        media: {
          type: "image",
          src: "/research/sustainable-aviation-fuel.jpg",
          alt: "Fuel tanks and a fuel truck at Frankfurt Airport with a Sustainable Aviation Fuel sign",
          caption: "Sample image · Sustainable aviation fuel at Frankfurt Airport · Ubahnverleih (CC0)",
        },
      },
      {
        name: "Gas Turbine Engines, Rocket Engines, and Industrial Burners",
        description:
          "Applying cleaner fuels across practical combustors — gas turbine engines, rocket engines, and industrial burners.",
        media: {
          type: "image",
          src: "/research/engine-hot-fire.jpg",
          alt: "RS-25 rocket engine hot-fire test at a test stand, with a large exhaust plume",
          caption: "Sample image · RS-25 engine hot-fire test · NASA / Chris Russell (public domain)",
        },
      },
      {
        name: "Hybrid Pintle Injector",
        description:
          "Pintle injector designs for hybrid propulsion, aimed at stable mixing and throttleable operation.",
        media: {
          type: "image",
          src: "/research/pintle-injector-spray.jpg",
          alt: "Spray sheet from a pintle injector with inner and outer flow",
          caption: "Sample image · Pintle injector spray · Christopher Nilsen (CC0)",
        },
      },
    ],
  },
  {
    slug: "plasma-technologies",
    icon: "atom",
    visual: "plasma",
    title: "Plasma Technologies",
    subtitle: "Plasma for ignition and combustion",
    summary:
      "Using plasma to control ignition and combustion — from plasma-assisted ignition to microwave-enhanced laser-induced plasma.",
    topics: [
      {
        name: "Plasma-assisted Combustion / Ignition",
        description:
          "Using non-equilibrium plasma to generate reactive species that shorten ignition delay, extend lean limits, and stabilise flames.",
        media: {
          type: "image",
          src: "/research/plasma-discharge.jpg",
          alt: "Branching plasma discharge streamers glowing above an electrode",
          caption: "Sample image · Plasma discharge streamers · Themarnicle (CC BY 4.0)",
        },
      },
      {
        name: "Microwave-enhanced Laser-induced Plasma",
        description:
          "Coupling microwave energy into a laser-induced plasma kernel to enlarge and sustain it, for ignition and diagnostic applications.",
        media: {
          type: "image",
          src: "/research/microwave-plasma.jpg",
          alt: "Glowing filaments of a microwave-driven plasma",
          caption: "Sample image · Microwave plasma filamentation · AlexandraDuarteFranco (CC BY-SA 4.0)",
        },
      },
    ],
  },
  {
    slug: "space-propulsion",
    icon: "rocket",
    visual: "propulsion",
    title: "Space Propulsion",
    subtitle: "Satellite and electric propulsion",
    summary:
      "Propulsion for spacecraft — electric thrusters that deliver precise, efficient thrust, through to nuclear concepts for deep space.",
    topics: [
      {
        name: "Satellite Propulsion",
        description:
          "Propulsion systems for orbit raising, station-keeping, and attitude control of satellites.",
        media: {
          type: "image",
          src: "/research/spacecraft-thrusters.jpg",
          alt: "Reaction control thrusters firing on a spacecraft in orbit",
          caption: "Sample image · Reaction control thrusters firing in orbit · NASA (public domain)",
        },
      },
      {
        name: "Electrospray Propulsion",
        description:
          "Electrostatic extraction of ions and charged droplets from an ionic-liquid Taylor cone, giving precise micro-newton level thrust.",
        media: {
          type: "video",
          src: "/media/electrospray-satellite.mp4",
          poster: "/media/electrospray-satellite.jpg",
          caption:
            "A CubeSat carrying the group's multi-array electrospray thruster — visualisation by Punya Malaiya Jain.",
        },
      },
      {
        name: "Field Emission Electric Propulsion (FEEP)",
        description:
          "Liquid-metal ions emitted under a strong electric field, offering very fine thrust control at high specific impulse.",
        media: {
          type: "image",
          src: "/research/ion-thruster.jpg",
          alt: "An electric ion thruster firing a blue ion beam in a vacuum chamber",
          caption: "Sample image · Electric thruster test firing · NASA (public domain)",
        },
      },
      {
        name: "Nuclear Propulsion",
        description:
          "Nuclear thermal and nuclear electric propulsion concepts for high-energy, long-duration deep-space missions.",
        media: {
          type: "image",
          src: "/research/nuclear-thermal-rocket.jpg",
          alt: "Artist's concept of a nuclear thermal rocket departing Earth for Mars",
          caption: "Sample image · Nuclear thermal rocket concept · NASA / Pat Rawlings (public domain)",
        },
      },
    ],
  },
  {
    slug: "other-technologies",
    icon: "sparkles",
    visual: "microscale",
    title: "Other Technologies",
    subtitle: "Small-scale combustion and life support",
    summary:
      "Applied projects beyond the core areas — compact combustion-based power and life support for high-altitude regions.",
    topics: [
      {
        name: "Meso-scale Combustion for Portable Devices",
        description:
          "Small-scale combustors that tap the high energy density of liquid and gaseous fuels to power compact, portable devices.",
        media: {
          type: "image",
          src: "/research/small-flame.jpg",
          alt: "Ring of small blue premixed gas flames",
          caption: "Sample image · Small premixed gas flames · George Shuklin (public domain)",
        },
      },
      {
        name: "Life Support System for High-altitude Regions",
        description:
          "Systems that help sustain safe breathing conditions for people living and working at high altitude.",
        media: {
          type: "image",
          src: "/research/high-altitude.jpg",
          alt: "Pangong Lake in Ladakh at high altitude, with mountains and a road",
          caption: "Sample image · Pangong Lake, Ladakh · Narender9 (CC BY-SA 4.0)",
        },
      },
    ],
  },
];
