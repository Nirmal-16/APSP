import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { collaboratorRoles, people, roleOrder, type Person } from "@/data/people";
import { siteSettings } from "@/data/site-settings";
import { Reveal } from "@/components/motion/reveal";
import { FilterablePeopleGrid, PeopleGrid } from "@/components/people/people-grid";

export const metadata: Metadata = {
  title: `Research Team — ${siteSettings.labName}`,
  description: "Meet the researchers and students of the group.",
};

// Stable sort: by role order, then by position in data/people.ts.
const sorted = [...people].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
const isCollaborator = (p: Person) => collaboratorRoles.includes(p.role);

// The Principal Investigator is featured on the About page, not here.
const team = sorted.filter((p) => !p.alumni && p.role !== "Principal Investigator" && !isCollaborator(p));
const collaborators = sorted.filter((p) => !p.alumni && isCollaborator(p));
const alumni = sorted.filter((p) => p.alumni);

function SectionHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <Reveal className="mb-10 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      <p className="mt-2 text-muted">{intro}</p>
    </Reveal>
  );
}

export default function ResearchTeamPage() {
  return (
    <div className="site-container py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mx-auto w-fit rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium uppercase tracking-widest text-muted">
          Research Team
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          The people behind the research
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">
          Researchers and students working across plasma technologies, space propulsion and clean
          energy. Select anyone to read more about their work.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-24">
        <section>
          <SectionHeading title="Current members" intro="Scholars and students currently in the group." />
          <FilterablePeopleGrid members={team}>
            <Reveal delay={(team.length % 4) * 0.06}>
              <Link
                href="/insights#hiring"
                className="group flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border p-4 text-center transition-colors hover:border-primary"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white transition-transform group-hover:scale-110">
                  <Plus className="h-6 w-6" />
                </span>
                <span className="font-semibold text-foreground">Join the group</span>
                <span className="text-sm text-muted">See open positions</span>
              </Link>
            </Reveal>
          </FilterablePeopleGrid>
        </section>

        {collaborators.length > 0 && (
          <section>
            <SectionHeading
              title="Collaborators & visiting researchers"
              intro="Researchers from other institutions working with the group."
            />
            <PeopleGrid members={collaborators} />
          </section>
        )}

        {alumni.length > 0 && (
          <section>
            <SectionHeading title="Alumni" intro="Former members and where they are now." />
            <PeopleGrid members={alumni} />
          </section>
        )}
      </div>
    </div>
  );
}
