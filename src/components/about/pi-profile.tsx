import Image from "next/image";
import {
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Presentation,
  Route,
  type LucideIcon,
} from "lucide-react";
import { principalInvestigator as pi } from "@/data/about";
import { IconMark } from "@/components/icons/icon-mark";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";

const cardClass = "h-full rounded-3xl border border-border bg-surface p-6 sm:p-8";

const stats = [
  { value: "PhD", label: "The University of Tokyo" },
  { value: String(pi.countries.length), label: "Countries of study and research" },
  { value: "1", label: `Patent granted: ${pi.patent}` },
  // Distinct courses — the teaching list repeats a course for each term.
  { value: String(new Set(pi.teaching.map((course) => course.code)).size), label: "Courses taught" },
];

const initials = pi.name
  .replace(/^Dr\.?\s+/, "")
  .split(/\s+/)
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

function CardTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-lg font-semibold text-foreground">
      <IconMark icon={Icon} size="sm" />
      {children}
    </h3>
  );
}

// Full Principal Investigator profile, built from the CV in data/about.ts.
export function PiProfile() {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile card */}
      <Reveal>
        <article className="overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:gap-10 lg:p-10">
            <div className="mx-auto h-36 w-36 rounded-full border border-border p-1 sm:h-44 sm:w-44 md:mx-0">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
                {pi.photo ? (
                  <Image src={pi.photo} alt={pi.name} fill sizes="176px" className="object-cover" />
                ) : (
                  <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{initials}</span>
                )}
              </div>
            </div>

            <div className="min-w-0 text-center md:text-left">
              <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{pi.name}</h3>
              <p className="mt-2 font-medium text-accent">
                {pi.title} · {pi.department}
              </p>
              <div className="mt-5 flex flex-col gap-3 leading-relaxed text-muted">
                {pi.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <h4 className="mt-6 text-xs font-medium uppercase tracking-widest text-muted">Research interests</h4>
              {/* Same bullets as Memberships; the list stays left-aligned on phones too. */}
              <ul className="mx-auto mt-4 flex w-fit flex-col gap-3 text-left md:mx-0">
                {pi.interests.map((interest) => (
                  <li key={interest} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <p className="text-foreground">{interest}</p>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${pi.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                <Mail className="h-4 w-4" />
                {pi.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-surface px-4 py-6 text-center">
                <StatCounter value={stat.value} />
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      {/* Journey | recognition */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <section className={cardClass}>
            <CardTitle icon={Route}>Academic journey</CardTitle>
            <ol className="mt-6 flex flex-col">
              {pi.journey.map((step, i) => {
                const Icon = step.kind === "work" ? Briefcase : GraduationCap;
                return (
                  <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Line connecting this icon to the next one */}
                    {i < pi.journey.length - 1 && (
                      <span className="absolute top-9 bottom-0 left-[1.0625rem] w-px bg-border" />
                    )}
                    <span
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                        step.current ? "border-accent bg-accent text-white" : "border-border bg-background text-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-xs font-medium uppercase tracking-widest text-accent">{step.period}</p>
                      <p className="mt-1 font-medium text-foreground">{step.title}</p>
                      <p className="text-sm text-muted">{step.place}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className={cardClass}>
            <CardTitle icon={Award}>Recognition</CardTitle>
            <ul className="mt-6 flex flex-col gap-4">
              {pi.awards.map((award) => (
                <li key={award.title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="font-medium text-foreground">{award.title}</p>
                    <p className="text-sm text-muted">
                      {award.by} · {award.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 text-xs font-medium uppercase tracking-widest text-muted">Memberships</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {pi.memberships.map((membership) => (
                <li key={membership} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-foreground">{membership}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      {/* Teaching */}
      <Reveal>
        <section className={cardClass}>
          <CardTitle icon={Presentation}>Teaching at IIT Madras</CardTitle>
          {/* Slim rows: code | title | terms. Terms drop under the title on phones. */}
          <ul className="mt-4 divide-y divide-border">
            {pi.teaching.map((course) => (
              <li
                key={`${course.code}-${course.terms}`}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-3 last:pb-0 sm:grid-cols-[4.5rem_1fr_auto]"
              >
                <span className="font-mono text-sm font-semibold text-accent">{course.code}</span>
                <p className="font-medium text-foreground">
                  {course.title}
                  {course.developed && (
                    <span className="ml-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      Course developed
                    </span>
                  )}
                </p>
                <p className="col-start-2 text-sm text-muted sm:col-start-auto">{course.terms}</p>
              </li>
            ))}
          </ul>

          {/* Same row layout as the courses: date | title, with the event below */}
          {pi.invitedTalks.length > 0 && (
            <>
              <h4 className="mt-10 text-xs font-medium uppercase tracking-widest text-muted">
                Invited talks &amp; lectures
              </h4>
              <ul className="mt-2 divide-y divide-border">
                {pi.invitedTalks.map((talk) => (
                  <li
                    key={`${talk.title}-${talk.date}`}
                    className="grid grid-cols-1 gap-y-1 py-3 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-x-4"
                  >
                    <span className="text-sm font-medium text-accent">{talk.date}</span>
                    <div>
                      <p className="font-medium text-foreground">{talk.title}</p>
                      <p className="text-sm text-muted">
                        {talk.event}
                        {talk.place && ` · ${talk.place}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </Reveal>
    </div>
  );
}
