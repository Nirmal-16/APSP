import type { ResearchAreaSlug } from "@/data/research-areas";

// Publications, patents and funded projects shown on the Publications page;
// each member's publications also appear in their Lab Members profile popup.
// Sources: the Group Head's CV, plus two accepted abstracts from Jay Shiv
// Dixit's bio. Journal DOIs are checked against Crossref.
//
// Most recent first within each type. Write lab members' names exactly as in
// data/people.ts so they link to their profiles. `areas` drives the research
// area filter and the publication counts on the Research page.

export type PublicationType = "Journal" | "Conference" | "Poster";

export interface Publication {
  title: string;
  authors: string[];
  venue: string; // journal or event
  volume?: string;
  issue?: string;
  pages?: string; // page range or article number
  location?: string;
  date?: string; // when the event took place, e.g. "7–10 April 2025"
  year: number;
  type: PublicationType;
  areas: ResearchAreaSlug[];
  note?: string; // e.g. "Abstract accepted"
  upcoming?: boolean; // accepted but not presented yet; listed under "Upcoming" — remove once presented
  doi?: string; // without the https://doi.org/ prefix
  link?: string; // used when there's no DOI
  pdf?: string; // e.g. "/publications/kumar-2023.pdf", only if the publisher allows sharing
  abstract?: string; // shown behind an "Abstract" toggle
  // Shown as a card under "Selected publications": a one-line plain-English
  // summary and a 16:9 image from /public.
  featured?: { summary: string; image: string; imageAlt: string };
}

// Highlighted in every author list.
export const groupHeadName = "Pravendra Kumar";

export const publicationTypes: { type: PublicationType; label: string; plural: string }[] = [
  { type: "Journal", label: "Journal article", plural: "Journal articles" },
  { type: "Conference", label: "Conference paper", plural: "Conference papers" },
  { type: "Poster", label: "Poster", plural: "Posters" },
];

export const typeLabel = Object.fromEntries(publicationTypes.map((t) => [t.type, t.label])) as Record<
  PublicationType,
  string
>;

const PK = groupHeadName;

// Work-in-Progress Poster: a named session at the International Symposium on
// Combustion for ongoing research — it doesn't mean the poster is unfinished.
const WIPP = "Work-in-Progress Poster (WiPP) session";

export const publications: Publication[] = [
  // Journal articles
  {
    title: "A novel annular slit-type emitter developed for multi-jet electrospray propulsion",
    authors: ["Chanearl Kwon", "Upasana Priyadarshani Padhi", PK, "Daehong Lim", "Sunho Choe", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "Physics of Fluids",
    volume: "36",
    issue: "2",
    pages: "027128",
    year: 2024,
    type: "Journal",
    areas: ["space-propulsion"],
    doi: "10.1063/5.0184472",
    abstract:
      "Electrospray thrusters employ ionization in the liquid phase to produce and propel streams of molecular ions or highly charged droplets at significant velocities. In this study, we developed a novel annular slit-type emitter for electrospray and investigated its operational modes under varying applied potentials in both open atmosphere and vacuum conditions. To assess the performance of the annular slit-type emitter in comparison to the conventional capillary-type emitter, benchtop electrospray experiments were conducted using water and glycerin as working fluids for both emitter types. The study examined the formation of the Taylor cone, cone-to-jet transition, stable jet, whipping jet, and multi-jet, along with their dependence on fluid viscosity and electric potential for both emitter designs. Clear distinctions in hydrodynamic mode, drop-to-cone mode, and cone-to-jet transition mode were observed between the two emitters. As the electric potential increased, the capillary-type emitter exhibited a whipping and pulsating water jet, while glycerin displayed a steady tilted jet. In contrast, the annular slit-type emitter demonstrated a pulsating water jet followed by a distinctive dripping mode at higher electric potentials, while glycerin formed multiple steady jets around the annular slit. Notably, the annular slit-type emitter, when subjected to an 18.5 kV potential, produced seven electrospray jets for glycerin, a phenomenon attributed to the novel design of the emitter and the viscosity of glycerin enabling the generation of multiple cone-jets at a specific electrostatic potential around the slit peripheral meniscus. Vacuum chamber tests of the annular-type emitter using liquid indium as an ion source at 1 × 10⁻⁵ Torr revealed an ion-current density of 0.3 mA/mm, resulting in a thrust of 290 μN.",
    // SAMPLE image — replace with a figure from the paper.
    featured: {
      summary: "A ring-shaped emitter that forms several electrospray jets at once — seven from a single emitter — reaching 290 μN of thrust with liquid indium in vacuum.",
      image: "/research/ion-thruster.jpg",
      imageAlt: "An electric thruster firing in a vacuum chamber",
    },
  },
  {
    title: "On the cone-to-jet transition region and its significance in electrospray propulsion",
    authors: [PK, "Chanearl Kwon", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "Acta Astronautica",
    volume: "205",
    pages: "12–22",
    year: 2023,
    type: "Journal",
    areas: ["space-propulsion"],
    doi: "10.1016/j.actaastro.2023.01.026",
    // SAMPLE abstract and summary — replace with the published abstract.
    abstract:
      "Electrospray thrusters produce thrust by extracting ions and charged droplets from a liquid meniscus held at high voltage. The transition from a stable Taylor cone to an emitting jet governs how steadily and efficiently such a thruster operates. This work examines the cone-to-jet transition region and discusses why understanding it matters for the design of precise, efficient electrospray propulsion.",
    featured: {
      summary: "Why the moment a liquid cone starts emitting a jet matters for steady, precise electrospray thrust — the physics behind the group's thruster designs.",
      image: "/media/electrospray-satellite.jpg",
      imageAlt: "A CubeSat carrying the group's multi-array electrospray thruster",
    },
  },
  {
    title: "Effects of microwave radiation on laser induced plasma ignition of n-butane/air mixture under atmospheric conditions",
    authors: [PK, "Yuya Yamaki", "Jeonghoon Lee", "Shinji Nakaya", "Mitsuhiro Tsue"],
    venue: "Proceedings of the Combustion Institute",
    volume: "38",
    issue: "4",
    pages: "6593–6603",
    year: 2021,
    type: "Journal",
    areas: ["plasma-technologies"],
    doi: "10.1016/j.proci.2020.06.294",
    // SAMPLE abstract, summary and image — replace with the published abstract.
    abstract:
      "Laser-induced plasma can ignite fuel–air mixtures precisely, but the size and lifetime of the initial plasma kernel limit its effectiveness. This study examines how adding microwave radiation to a laser-induced plasma affects the ignition of n-butane/air mixtures under atmospheric conditions.",
    featured: {
      summary: "Adding microwave energy to a laser spark to change how — and how reliably — a fuel–air mixture ignites.",
      image: "/research/microwave-plasma.jpg",
      imageAlt: "Glowing filaments of a microwave-driven plasma",
    },
  },
  {
    title: "Experimental investigation on the performance characteristics of a 2D trapped vortex combustor",
    authors: ["P. K. Ezhil Kumar", PK, "D. P. Mishra"],
    venue: "Proceedings of the Institution of Mechanical Engineers, Part G: Journal of Aerospace Engineering",
    volume: "230",
    issue: "10",
    pages: "1840–1847",
    year: 2016,
    type: "Journal",
    areas: ["clean-energy"],
    doi: "10.1177/0954410015616410",
    // Published abstract; symbols such as Re_ms and V_p are written out in words.
    abstract:
      "The performance characteristics of a 2D trapped vortex combustor (TVC) are investigated experimentally in terms of the exhaust gas emission level, combustion efficiency, and the exit temperature uniformity. The present study reveals that the EICO and EIUHC emission levels are sensitive to mainstream Reynolds number, cavity equivalence ratio, and primary air velocity. Besides this, mainstream premixing also has significant impact on the emitted pollutant level. Moreover, the NOx emission level can be reduced to very low levels (<2.6 ppm), which will be difficult to achieve in conventional combustors. Combustion efficiency calculated from these emission results indicates that it is influenced by cavity equivalence ratio and primary air velocity. For a particular mainstream Reynolds number, primary air velocity and cavity equivalence ratio, combustion efficiency closer to 99% could be achieved for the merged flame cases, especially at higher primary air velocity. On the other hand, for a particular primary air velocity, an increase in mainstream Reynolds number tends to quench the cavity flame leading to reduction in combustion efficiency. This study also indicates that flame merging helps in efficient utilization of fuel and thus leading to better combustion efficiency. Besides this, the conditions for achieving lower pattern factor (PF) are also brought out from exit temperature measurements. Pattern factor as low as 0.1 could be achieved particularly at higher primary air velocities. It can be noted that this value is lower than that of the PF value of swirl combustors (0.2–0.4). Based on the present investigations, it can be concluded that TVC is a viable technology to be considered for future gas turbine application.",
  },
  {
    title: "Numerical investigation of merged and non-merged flame of a twin cavity annular trapped vortex combustor",
    authors: [PK, "D. P. Mishra"],
    venue: "Carbon – Science and Technology",
    volume: "8",
    issue: "3",
    pages: "118–128",
    year: 2016,
    type: "Journal",
    areas: ["clean-energy"],
    abstract:
      "The present work is focused to characterize numerically the merged and non-merged flame emanating from the cavities in downstream of twin cavity Annular Trapped Vortex Combustor (ATVC). The isotherm corresponding to the auto-ignition temperature is used to locate the merging point of the flame in the mainstream region along the combustor length. In present study, the cavity flame is said to be merged only if this isotherm corresponding to self-ignition temperature of methane is located within 20 percentage of the combustor length from aft wall of cavities. It is interesting to note that on increasing the power loading parameter (PLP) in mainstream for a constant power loading parameter ratio (outer to inner cavity), the merging point gets shifted towards the cavity aft-wall. This leads to the reduction of combustor length and subsequent reduction in overall weight of the gas turbine engine.",
  },

  // Conference papers
  {
    title: "Combustion characteristics studies of Jet-A fuel in fuel-flexible hybrid pintle injector",
    authors: ["Jay Shiv Dixit", "Manisha Patel HM", PK],
    venue: "6th National Aerospace Propulsion Conference (NAPC)",
    location: "IIT Hyderabad, India",
    date: "4–6 January 2027",
    year: 2027,
    type: "Conference",
    areas: ["clean-energy"],
    note: "Abstract accepted",
    upcoming: true,
  },
  {
    title: "Emitter diameter effects on Taylor cone stability and flow rate thresholds",
    authors: ["Gyandeep", "D. S. Bharjatiya", PK, "Amit Kumar"],
    venue: "IAES 2026",
    location: "ISRO Propulsion Complex (IPRC), Mahendragiri, Tamil Nadu, India",
    year: 2026,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Studies on combustion characteristics of LPG–air mixture in a new configuration injector",
    authors: ["Manisha Patel HM", "Jay Shiv Dixit", PK],
    venue: "64th Symposium (Japanese) on Combustion",
    date: "4–6 November 2026",
    year: 2026,
    type: "Conference",
    areas: ["clean-energy"],
    note: "Abstract accepted",
  },
  {
    title: "Design and development of a hybrid injector for biofuel combustion",
    authors: ["Satender Singh", "Jay Shiv Dixit", PK],
    venue: "27th Conference of the International Society for Air Breathing Engines (ISABE 2026)",
    location: "IIT Bombay, India",
    year: 2026,
    type: "Conference",
    areas: ["clean-energy"],
  },
  {
    title: "Numerical and experimental studies on biofuel combustion using a hybrid injector",
    authors: ["Jay Shiv Dixit", "Satender Singh", PK],
    venue: "27th Conference of the International Society for Air Breathing Engines (ISABE 2026)",
    location: "IIT Bombay, India",
    year: 2026,
    type: "Conference",
    areas: ["clean-energy"],
  },
  {
    title: "Development of hybrid injector for enhanced biofuel combustion",
    authors: ["Satender Singh", "Gyandeep", "Sayantan Saha", "Jaivardhan", PK, "T. M. Muruganandam"],
    venue: "12th European Combustion Meeting (ECM 2025)",
    location: "Edinburgh, UK",
    date: "7–10 April 2025",
    year: 2025,
    type: "Conference",
    areas: ["clean-energy"],
  },
  {
    title: "Study of biofuels combustion dynamics in swirl stabilized combustor",
    authors: ["Satender Singh", "Sayantan Saha", PK, "T. M. Muruganandam"],
    venue: "Asian Congress on Gas Turbines (ACGT 2024)",
    location: "IIT Kanpur, India",
    date: "21–23 August 2024",
    year: 2024,
    type: "Conference",
    areas: ["clean-energy"],
  },
  {
    title: "Experimental studies on Taylor cone formation and ionization with annular slit type emitter for FEEP thruster",
    authors: ["Chanearl Kwon", PK, "Kybeom Kwon", "Jack J. Yoh"],
    venue: "11th Asian Joint Conference on Propulsion and Power (AJCPP 2023)",
    location: "Ishikawa, Japan",
    date: "15–18 March 2023",
    year: 2023,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Microwave augmented combustion characteristics of n-butane–air mixture",
    authors: [PK, "Shinji Nakaya", "Mitsuhiro Tsue"],
    venue: "4th National Aerospace Propulsion Conference (NAPC 2022)",
    location: "IIT Bombay, India",
    year: 2022,
    type: "Conference",
    areas: ["plasma-technologies"],
  },
  {
    title: "Numerical study on Taylor cone formation for development of FEEP thruster",
    authors: [PK, "Chanearl Kwon", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "Korea Aerospace Society Conference",
    pages: "231–232",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Electrospray modeling for current density estimation and its significance in FEEP thruster development",
    authors: [PK, "Chanearl Kwon", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "Korea Aerospace Society Conference",
    pages: "1588–1589",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "On the cone-to-jet transition region in Taylor cone formation and its significance",
    authors: [PK, "Chanearl Kwon", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "Asia-Pacific International Symposium on Aerospace Technology (APISAT 2022)",
    location: "Niigata, Japan",
    date: "12–14 October 2022",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Taylor cone experiment with slit type emitter and thrust measurement device for FEEP thruster",
    authors: ["Chanearl Kwon", PK, "Meung-gil Kim", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "Asia-Pacific International Symposium on Aerospace Technology (APISAT 2022)",
    location: "Niigata, Japan",
    date: "12–14 October 2022",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Development of FEEP thruster based on annular-slit configured type emitter with indium propellant",
    authors: ["Chanearl Kwon", PK, "Meung-gil Kim", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "73rd International Astronautical Congress (IAC 2022)",
    location: "Paris, France",
    date: "18–22 September 2022",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Part 2: Numerical studies on Taylor cone formation and its inherent characteristics for FEEP thruster",
    authors: [PK, "Chanearl Kwon", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "32nd International Symposium on Rarefied Gas Dynamics (RGD32)",
    location: "Seoul, South Korea",
    date: "4–8 July 2022",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Part 1: Experimental studies on Taylor cone formation with annular/linear slit configured emitter for FEEP thruster",
    authors: ["Chanearl Kwon", PK, "Meung-gil Kim", "Kybeom Kwon", "Jack J. Yoh"],
    venue: "32nd International Symposium on Rarefied Gas Dynamics (RGD32)",
    location: "Seoul, South Korea",
    date: "4–8 July 2022",
    year: 2022,
    type: "Conference",
    areas: ["space-propulsion"],
  },
  {
    title: "Effects of microwave radiation on laser induced plasma ignition of n-butane/air mixture under atmospheric conditions",
    authors: [PK, "Yuya Yamaki", "Jeonghoon Lee", "Shinji Nakaya", "Mitsuhiro Tsue"],
    venue: "38th International Symposium on Combustion",
    location: "Adelaide, Australia",
    date: "24–29 January 2021",
    year: 2021,
    type: "Conference",
    areas: ["plasma-technologies"],
  },
  {
    title: "A parametric validation of auto-ignition numerical studies on compact rapid compression machine",
    authors: [PK, "Shinji Nakaya", "Mitsuhiro Tsue"],
    venue: "27th International Colloquium on the Dynamics of Explosions and Reactive Systems (ICDERS)",
    location: "Beijing, China",
    date: "28 July – 2 August 2019",
    year: 2019,
    type: "Conference",
    areas: ["other-technologies"],
  },
  {
    title: "Study on ignition behaviors for n-butane mixtures using a compact rapid compression machine",
    authors: [PK, "Tomokazu Funahashi", "Fangsi Ren", "Shinji Nakaya", "Mitsuhiro Tsue"],
    venue: "55th Symposium (Japanese) on Combustion",
    location: "Toyama, Japan",
    date: "13–15 November 2017",
    year: 2017,
    type: "Conference",
    areas: ["other-technologies"],
  },
  {
    title: "Numerical investigation of merged and non-merged flame of a twin cavity annular trapped vortex combustor",
    authors: [PK, "D. P. Mishra"],
    venue: "International Conference on Alternative Energy Sources (ICAES 2016)",
    location: "Ranchi, India",
    date: "29–30 January 2016",
    year: 2016,
    type: "Conference",
    areas: ["clean-energy"],
  },

  // Posters
  {
    title: "Advancing fuel-flexible combustion technology: hybrid pintle injector for carbon neutrality",
    authors: ["Jay Shiv Dixit", "Satender Singh", PK, "T. M. Muruganandam"],
    venue: `41st International Symposium on Combustion, ${WIPP}`,
    year: 2026,
    type: "Poster",
    areas: ["clean-energy"],
  },
  {
    title: "Development of swirl-flow non-premixed mesoscale combustor",
    authors: [PK, "Saran Solagar", "B. Aravind", "Sudarshan Kumar"],
    venue: "29th International Colloquium on the Dynamics of Explosions and Reactive Systems (ICDERS)",
    location: "Seoul, South Korea",
    date: "23–28 July 2023",
    year: 2023,
    type: "Poster",
    areas: ["other-technologies"],
  },
  {
    title: "Studies of ignition process to micro-scale combustion at high pressure using a compact rapid compression machine",
    authors: [PK, "Shinji Nakaya", "K. Higashi", "Mitsuhiro Tsue", "M. Kono", "O. Imamura", "K. Konishi"],
    venue: `37th International Symposium on Combustion, ${WIPP}`,
    location: "Dublin, Ireland",
    date: "29 July – 3 August 2018",
    year: 2018,
    type: "Poster",
    areas: ["other-technologies"],
  },
];

export const patents = [{ title: "Hybrid Pintle Injector", status: "Granted", area: "clean-energy" as ResearchAreaSlug }];

// Sponsored research from the CV, in the CV's order.
export const fundedProjects = [
  {
    title: "In-situ application of plasma-assisted combustion in stimulating oxidation of ammonia/hydrocarbon fuels",
    agency: "Science and Engineering Research Board (SERB), New Delhi",
    role: "Principal Investigator",
  },
  {
    title: "Cost-effective oxygen concentrator",
    agency: "Industrial Research and Consultancy Centre (IRCC), IIT Bombay",
    role: "Researcher",
  },
  {
    title: "In-situ application of plasma discharge for sustainable aviation fuels and biofuels",
    agency: "The Energy Consortium, IIT Madras",
    role: "Principal Investigator",
  },
  {
    title: "Development of plasma-assisted ignition and combustion technology",
    agency: "Science and Engineering Research Board (SERB), New Delhi",
    role: "Principal Investigator",
  },
  {
    title: "Experimental studies on electrospray thruster for small satellites",
    agency: "Aeronautics Research and Development Board (ARDB), DRDO",
    role: "Principal Investigator",
  },
];

// Short reference like "J3" or "C12": numbered per type, oldest = 1.
export function publicationId(pub: Publication) {
  const sameType = publications.filter((p) => p.type === pub.type);
  return `${pub.type[0]}${sameType.length - sameType.indexOf(pub)}`;
}

export function publicationUrl(pub: Publication) {
  return pub.doi ? `https://doi.org/${pub.doi}` : pub.link;
}

// "36(2), 027128" for journals; "pp. 231–232" when there's no volume.
export function publicationDetails(pub: Publication) {
  if (!pub.volume) return pub.pages && `pp. ${pub.pages}`;
  return `${pub.volume}${pub.issue ? `(${pub.issue})` : ""}${pub.pages ? `, ${pub.pages}` : ""}`;
}

// APA-style reference.
export function formatCitation(pub: Publication) {
  const authors =
    pub.authors.length > 1 ? `${pub.authors.slice(0, -1).join(", ")} & ${pub.authors.at(-1)}` : pub.authors[0];
  const source = [pub.venue, publicationDetails(pub), pub.location].filter(Boolean).join(", ");
  const url = publicationUrl(pub);
  return `${authors} (${pub.year}). ${pub.title}. ${source}.${url ? ` ${url}` : ""}`;
}

// BibTeX entry; the key is first author's surname + year + first long title word.
export function formatBibtex(pub: Publication) {
  const surname = pub.authors[0].split(" ").at(-1) ?? "";
  const word = pub.title.split(/\W+/).find((w) => w.length > 3) ?? "";
  const key = `${surname}${pub.year}${word}`.toLowerCase().replace(/[^a-z0-9]/g, "");
  const fields: [string, string | undefined][] = [
    ["author", pub.authors.join(" and ")],
    ["title", pub.title],
    [pub.type === "Journal" ? "journal" : "booktitle", pub.venue],
    ["volume", pub.volume],
    ["number", pub.issue],
    ["pages", pub.pages?.replace("–", "--")],
    ["address", pub.location],
    ["year", String(pub.year)],
    ["doi", pub.doi],
    ["note", pub.note],
  ];
  const body = fields
    .filter((field): field is [string, string] => !!field[1])
    .map(([name, value]) => `  ${name} = {${value}}`)
    .join(",\n");
  return `@${pub.type === "Journal" ? "article" : "inproceedings"}{${key},\n${body}\n}`;
}

// Publications listing `name` as an author ("Dr." prefixes are ignored).
export function publicationsBy(name: string) {
  const plain = name.replace(/^Dr\.?\s+/, "");
  return publications.filter((p) => p.authors.includes(plain));
}

export function publicationsInArea(area: ResearchAreaSlug) {
  return publications.filter((p) => p.areas.includes(area));
}
