"use client";

import { useState } from "react";
import type { Person, Role } from "@/data/people";
import { Reveal } from "@/components/motion/reveal";
import { PersonCard } from "@/components/people/person-profile";

// From sm up the grid is 80% of the page width (client request, 26/10/2026),
// so every card — photo included — is 80% of its full-width size. Phones keep
// the full width so two cards per row stay readable.
const gridClass =
  "mx-auto grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:max-w-[80%] sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4";

// `children` renders after the cards (e.g. the "Join the group" tile).
export function PeopleGrid({ members, children }: { members: Person[]; children?: React.ReactNode }) {
  return (
    <div className={gridClass}>
      {members.map((person, i) => (
        <Reveal key={person.name} delay={(i % 4) * 0.06}>
          <PersonCard person={person} />
        </Reveal>
      ))}
      {children}
    </div>
  );
}

// Grid with role filter pills. Pills only appear when there's more than one
// role to choose from; roles keep the order they arrive in (already sorted).
export function FilterablePeopleGrid({ members, children }: { members: Person[]; children?: React.ReactNode }) {
  const [filter, setFilter] = useState<Role | "All">("All");
  const roles = [...new Set(members.map((m) => m.role))];
  const shown = filter === "All" ? members : members.filter((m) => m.role === filter);

  const options = [
    { value: "All" as const, label: "All", count: members.length },
    ...roles.map((role) => ({ value: role, label: role, count: members.filter((m) => m.role === role).length })),
  ];

  return (
    <>
      {roles.length > 1 && (
        <div role="group" aria-label="Filter by role" className="mb-10 flex flex-wrap justify-center gap-2">
          {options.map(({ value, label, count }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === value
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {label} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
      )}
      <PeopleGrid members={shown}>{filter === "All" && children}</PeopleGrid>
    </>
  );
}
