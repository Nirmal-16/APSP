import type { ResearchAreaSlug } from "@/data/research-areas";

// Open positions shown in the Join the group section of the Insights page,
// newest first. An empty array shows the "no open positions" message.
// `applyEmail` defaults to the lab email in data/site-settings.ts.
// Openings hide themselves once their `deadline` has passed, and show
// "Closes in N days" in the last two weeks — no need to remove them by hand.
// The entries below are placeholders until the client sends real openings.

export interface Opening {
  title: string;
  type: "PhD Position" | "Postdoc" | "Intern" | "Research Assistant";
  area?: ResearchAreaSlug;
  summary: string;
  postedDate: string; // e.g. "2026-06-01"
  deadline?: string; // e.g. "2026-09-30"
  duration?: string; // e.g. "4–5 years"
  responsibilities?: string[];
  requirements?: string[];
  applyEmail?: string;
}

export const openings: Opening[] = [
  {
    title: "PhD Position — Electric Propulsion",
    type: "PhD Position",
    area: "space-propulsion",
    summary:
      "Fully funded PhD position researching electrospray and field-emission electric propulsion for small satellites.",
    postedDate: "2026-08-01",
    deadline: "2027-01-31",
    duration: "4–5 years",
    responsibilities: [
      "Design and test electrospray emitters in the vacuum facility",
      "Measure thrust and characterise the plume",
      "Publish and present the results at international conferences",
    ],
    requirements: [
      "Master's degree in aerospace, mechanical or electrical engineering, or physics",
      "Interest in experimental work and plasma physics",
      "Admission through the IIT Madras PhD programme",
    ],
  },
  {
    title: "Postdoctoral Researcher — Sustainable Aviation Fuels",
    type: "Postdoc",
    area: "clean-energy",
    summary: "Postdoctoral appointment studying the combustion characteristics of biofuel and SAF blends.",
    postedDate: "2026-07-15",
    duration: "1–2 years",
    responsibilities: [
      "Lead ignition and flame-stability experiments on fuel blends",
      "Mentor PhD scholars working on combustion diagnostics",
    ],
    requirements: [
      "PhD in combustion, propulsion or a related field",
      "Experience with optical or laser diagnostics",
    ],
  },
  {
    title: "Summer Research Intern",
    type: "Intern",
    area: "plasma-technologies",
    summary: "Eight-week internship supporting plasma diagnostics experiments and data analysis.",
    postedDate: "2026-06-20",
    deadline: "2027-03-31",
    duration: "8 weeks, May–July",
    requirements: [
      "Undergraduate in engineering or physics, in 2nd or 3rd year",
      "Basic Python or MATLAB for data analysis",
    ],
  },
];

// Days from today until `deadline` (0 = closes today, negative = closed).
// `today` is "YYYY-MM-DD", the same form as the dates above.
export function daysUntil(deadline: string, today: string) {
  return Math.round((Date.parse(deadline) - Date.parse(today)) / 86_400_000);
}

// Openings whose deadline hasn't passed by `today`, newest first.
export function openOpenings(today: string) {
  return openings
    .filter((opening) => !opening.deadline || daysUntil(opening.deadline, today) >= 0)
    .sort((a, b) => b.postedDate.localeCompare(a.postedDate));
}

// "How to apply" steps shown beside the openings.
export const applicationSteps = [
  {
    title: "Email us",
    text: "Send your CV, transcripts and a short note on the research that interests you. Put the position in the subject line.",
  },
  {
    title: "Discussion",
    text: "If there's a fit, we'll set up a call to talk about your background and possible projects.",
  },
  {
    title: "Formal application",
    text: "PhD and MS candidates then apply through the IIT Madras admissions process; interns and staff join directly.",
  },
];

// Quotes from current members, shown under the openings. `name` is exactly as
// in data/people.ts, so the quote shows their photo and links to their profile.
// Placeholders until the client sends real quotes.
export const testimonials = [
  {
    quote:
      "You get your hands on real hardware from the first month — designing a rig, running it in the vacuum chamber, and seeing your own results in a paper.",
    name: "Punya Malaiya Jain",
  },
  {
    quote:
      "The group is small enough that you work directly with the Group Head, and everyone helps on each other's test days.",
    name: "Jay Shiv Dixit",
  },
];

// Questions prospective students ask most, shown beside the quotes.
// Draft answers — confirm with the client before launch.
export const applicantFaqs = [
  {
    question: "Is there funding for PhD and MS scholars?",
    answer:
      "Yes. Admitted scholars receive the institute fellowship as per IIT Madras norms, and some projects offer additional support for conference travel.",
  },
  {
    question: "What background do I need?",
    answer:
      "Most members come from aerospace, mechanical, chemical or electrical engineering, or physics. Curiosity and a liking for experimental work matter more than a specific degree.",
  },
  {
    question: "When does IIT Madras admit research scholars?",
    answer:
      "IIT Madras runs PhD and MS admissions twice a year, for the July and January semesters. Check the institute's admissions page for the current dates, and email us well before the deadline.",
  },
  {
    question: "Can students from other institutes do an internship?",
    answer:
      "Yes — undergraduates from any institute can apply for summer internships. Positions are listed above when open; otherwise send an open application.",
  },
];
