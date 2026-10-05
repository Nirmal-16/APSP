import { UserRound } from "lucide-react";
import { peopleGroups } from "@/data/people";
import { Reveal } from "@/components/motion/reveal";

export default function PeoplePage() {
  return (
    <div className="site-container py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          People
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          The researchers, students, and alumni behind the lab&apos;s work.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {peopleGroups.map((group, groupIndex) => (
          <Reveal key={group.role} delay={groupIndex * 0.05}>
            <h2 className="text-xl font-semibold tracking-tight text-accent">{group.role}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((person) => (
                <div
                  key={person.name}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <UserRound className="h-8 w-8 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{person.name}</h3>
                  <p className="mt-1 text-sm text-accent">{person.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{person.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted">
                    {person.email && (
                      <a href={`mailto:${person.email}`} className="hover:text-foreground">
                        Email
                      </a>
                    )}
                    {person.linkedin && (
                      <a href={person.linkedin} className="hover:text-foreground">
                        LinkedIn
                      </a>
                    )}
                    {person.scholar && (
                      <a href={person.scholar} className="hover:text-foreground">
                        Google Scholar
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
