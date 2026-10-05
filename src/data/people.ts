// People directory shown on the People page, grouped by role.
// Sample/placeholder entries — replace photo/bio/links with real data.
// Groups render in array order.

export interface Person {
  name: string;
  title: string;
  bio: string;
  email?: string;
  linkedin?: string;
  scholar?: string;
}

export interface PeopleGroup {
  role: string;
  members: Person[];
}

export const peopleGroups: PeopleGroup[] = [
  {
    role: "Principal Investigator",
    members: [
      {
        name: "Dr. Sample PI Name",
        title: "Group Head, Professor of Aerospace Engineering",
        bio: "Leads the lab's research in plasma propulsion and clean energy systems. Ph.D. in Aerospace Engineering, [University].",
        email: "pi@apsplab.example.edu",
        scholar: "#",
        linkedin: "#",
      },
    ],
  },
  {
    role: "Post-Doc",
    members: [
      {
        name: "Dr. Sample Postdoc",
        title: "Postdoctoral Researcher — Plasma Diagnostics",
        bio: "Working on laser diagnostics for thruster plume characterization.",
        email: "postdoc@apsplab.example.edu",
      },
    ],
  },
  {
    role: "PhD Scholar",
    members: [
      {
        name: "Sample PhD Scholar 1",
        title: "PhD Candidate — Electric Propulsion",
        bio: "Researching high-efficiency Hall-effect thrusters for deep-space missions.",
      },
      {
        name: "Sample PhD Scholar 2",
        title: "PhD Candidate — Sustainable Fuels",
        bio: "Studying combustion behavior of sustainable aviation fuel blends.",
      },
    ],
  },
  {
    role: "MS/MTech",
    members: [
      {
        name: "Sample MTech Student",
        title: "MTech Student — Aerospace Engineering",
        bio: "Working on spacecraft-plasma interaction modeling.",
      },
    ],
  },
  {
    role: "BTech",
    members: [
      {
        name: "Sample BTech Student",
        title: "BTech Student — Aerospace Engineering",
        bio: "Undergraduate researcher assisting with plasma diagnostics experiments.",
      },
    ],
  },
  {
    role: "Interns",
    members: [
      {
        name: "Sample Intern",
        title: "Summer Research Intern",
        bio: "Assisting with data analysis for the propulsion test campaign.",
      },
    ],
  },
  {
    role: "Alumni",
    members: [
      {
        name: "Sample Alumnus 1",
        title: "Former PhD Scholar — now at [Organization]",
        bio: "Graduated 2024. Now working in industry on electric propulsion systems.",
      },
      {
        name: "Sample Alumnus 2",
        title: "Former MTech Student — now at [Organization]",
        bio: "Graduated 2023.",
      },
    ],
  },
];
