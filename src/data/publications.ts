// Publications shown on the Publications page and in each member's
// profile popup on the People page. Most recent first within each type.
// Write author names exactly as they appear in data/people.ts so they
// link up with the right person.

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "Journal" | "Conference";
  note?: string; // e.g. "Abstract accepted", "Poster"
  link?: string;
}

export const publications: Publication[] = [
  {
    title: "Combustion characteristics studies of Jet-A fuel in fuel-flexible hybrid pintle injector",
    authors: "Jay Shiv Dixit, Manisha Patel HM, Pravendra Kumar",
    venue: "6th National Aerospace Propulsion Conference, IIT Hyderabad, India",
    year: 2027,
    type: "Conference",
    note: "Abstract accepted",
  },
  {
    title: "Studies on combustion characteristics of LPG-Air mixture in a new configuration injector",
    authors: "Manisha Patel HM, Jay Shiv Dixit, Pravendra Kumar",
    venue: "64th Symposium (Japanese) on Combustion",
    year: 2026,
    type: "Conference",
    note: "Abstract accepted",
  },
  {
    title: "Advancing fuel-flexible combustion technology: hybrid pintle injector for carbon neutrality",
    authors: "Jay Shiv Dixit, Satender Singh, Pravendra Kumar, Muruganandam T M",
    venue: "41st International Symposium on Combustion",
    year: 2026,
    type: "Conference",
    note: "Work-in-Progress Poster",
  },
  {
    title: "Numerical and experimental studies on biofuel combustion using a hybrid injector",
    authors: "Jay Shiv Dixit, Satender Singh, Pravendra Kumar",
    venue: "27th International Society of Air Breathing Engines (ISABE), IIT Bombay, India",
    year: 2026,
    type: "Conference",
  },
];

// Publications listing `name` as an author ("Dr." prefixes are ignored).
export function publicationsBy(name: string) {
  const plain = name.replace(/^Dr\.?\s+/, "");
  return publications.filter((p) => p.authors.split(",").some((a) => a.trim() === plain));
}
