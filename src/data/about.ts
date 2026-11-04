// Content for the About page. Text marked "draft" needs the client's
// confirmation; the Principal Investigator section comes from the PI's CV
// ("Docs shared by client/CV-PK-website.docx", received October 2026).

export const about = {
  headline: "Advancing plasma and propulsion science — on Earth and in orbit.",
  // draft
  intro:
    "A research group in the Department of Aerospace Engineering at IIT Madras, studying how plasma, cleaner fuels and electric thrusters can make propulsion more efficient — from aircraft engines to small satellites.",
  // draft
  mission:
    "To understand and control the physics of plasma, combustion and electric propulsion — and turn that understanding into cleaner, more efficient propulsion systems.",
  // draft
  vision:
    "Propulsion that is cleaner on Earth and more capable in space: sustainable fuels for aviation, and compact, precise thrusters that let small satellites manoeuvre, hold position and change orbit.",
};

interface JourneyStep {
  period: string;
  title: string;
  place: string;
  kind: "work" | "education";
  current?: boolean;
}

interface Course {
  code: string;
  title: string;
  terms: string;
  developed?: boolean; // course created by the PI
}

export const principalInvestigator = {
  name: "Dr. Pravendra Kumar",
  title: "Assistant Professor",
  department: "Department of Aerospace Engineering, IIT Madras",
  email: "pkumar@iitm.ac.in",
  photo: undefined as string | undefined, // e.g. "/people/pravendra-kumar.jpg" — 1:1 or 4:5 portrait
  // Written from the CV — confirm wording with the client.
  bio: [
    "Dr. Pravendra Kumar has been an Assistant Professor in the Department of Aerospace Engineering at IIT Madras since October 2022, where the group's research spans plasma-assisted ignition and combustion, electrospray and field-emission electric propulsion, and cleaner fuels for aviation.",
    "Before joining IIT Madras, Dr. Kumar was a BK21 Post-doctoral Fellow at Seoul National University, South Korea, and a National Post-doctoral Fellow at IIT Bombay — following a PhD in Aeronautics and Astronautics from The University of Tokyo, Japan.",
  ],
  // draft
  interestsIntro:
    "The common thread is using electric fields and plasma to control how fuels ignite and burn, and how thrusters produce thrust.",
  interests: [
    "Plasma-assisted combustion & ignition",
    "Electrospray & FEEP propulsion",
    "Microwave-enhanced laser-induced plasma",
    "Sustainable aviation fuels & biofuels",
    "Meso-scale combustion",
  ],
  // Most recent first.
  journey: [
    { period: "2022 – Present", title: "Assistant Professor", place: "IIT Madras", kind: "work", current: true },
    { period: "2021 – 2022", title: "BK21 Post-doctoral Fellow", place: "Seoul National University, South Korea", kind: "work" },
    { period: "2021", title: "National Post-doctoral Fellow", place: "IIT Bombay", kind: "work" },
    { period: "2017 – 2020", title: "PhD, Aeronautics and Astronautics", place: "The University of Tokyo, Japan", kind: "education" },
    { period: "2012 – 2014", title: "M.Tech, Aerospace Engineering (Propulsion)", place: "IIT Kanpur", kind: "education" },
    { period: "2009 – 2012", title: "B.Tech, Aeronautical Engineering", place: "Gautam Buddha Technical University, Lucknow", kind: "education" },
    { period: "2006 – 2009", title: "Diploma, Mechanical Engineering (Automobile)", place: "Board of Technical Education, Uttar Pradesh", kind: "education" },
  ] satisfies JourneyStep[],
  // The international path through the journey above, oldest first. The
  // number of countries on the page is counted from this list.
  footprint: [
    { place: "IIT Kanpur", country: "India", stage: "M.Tech" },
    { place: "The University of Tokyo", country: "Japan", stage: "PhD" },
    { place: "IIT Bombay", country: "India", stage: "Post-doctoral Fellow" },
    { place: "Seoul National University", country: "South Korea", stage: "Post-doctoral Fellow" },
    { place: "IIT Madras", country: "India", stage: "Assistant Professor" },
  ],
  patent: "Hybrid Pintle Injector",
  awards: [
    { title: "National Post-doctoral Fellowship", by: "Government of India", year: "2021–2023" },
    { title: "National Overseas Scholarship (PhD)", by: "Government of India", year: "2017–2020" },
    { title: "18th University Rank", by: "Gautam Buddha Technical University, Lucknow", year: "2012" },
    { title: "2nd Academic Prize", by: "Government Polytechnic Ghaziabad", year: "2009" },
  ],
  memberships: [
    "The Combustion Institute — Japan & Indian Sections",
    "Combustion Society of Japan",
    "Aeronautical Society of India",
    "Indian Society of Outer Space Utilization (ISOSU)",
  ],
  // As listed in the CV, in the CV's order. The CV repeats AS5640 (July-Nov
  // 2025); it's listed once here.
  teaching: [
    { code: "AS3271", title: "Propulsion II", terms: "Jan-May 2023" },
    { code: "AS3270", title: "Propulsion I", terms: "July-Nov 2023" },
    { code: "AS3271", title: "Propulsion II", terms: "Jan-May 2024" },
    { code: "AS3270", title: "Propulsion I", terms: "July-Nov 2024" },
    { code: "AS5670", title: "Transport Processes in Reacting Flow", terms: "Jan-May 2025" },
    { code: "AS5640", title: "Combustion, Explosion and Detonation", terms: "July-Nov 2025" },
    { code: "AS5600", title: "Introduction of Plasma and its Applications", terms: "Jan-May 2026", developed: true },
  ] satisfies Course[],
};
