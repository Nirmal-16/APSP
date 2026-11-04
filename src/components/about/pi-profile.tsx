import Image from "next/image";
import {
  Award,
  Briefcase,
  Globe,
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

const countries = new Set(pi.footprint.map((stop) => stop.country)).size;

const stats = [
  { value: "PhD", label: "The University of Tokyo" },
  { value: String(countries), label: "Countries of study and research" },
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
              <p className="mt-2 leading-relaxed text-foreground">{pi.interestsIntro}</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                {pi.interests.map((interest) => (
                  <li key={interest} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted">
                    {interest}
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

      {/* International path — a row from md up, a vertical line on phones */}
      <Reveal>
        <section className={cardClass}>
          <CardTitle icon={Globe}>A path across {countries} countries</CardTitle>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-0">
            {pi.footprint.map((stop, i) => {
              const isLast = i === pi.footprint.length - 1;
              return (
                <li key={stop.place} className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                  {!isLast && (
                    <span className="absolute top-3 -bottom-6 left-3 w-px bg-border md:bottom-auto md:left-1/2 md:h-px md:w-full" />
                  )}
                  <span
                    className={`relative h-6 w-6 shrink-0 rounded-full border-2 border-accent ${
                      isLast ? "bg-accent" : "bg-surface"
                    }`}
                  />
                  <div className="min-w-0 md:mt-3 md:px-2">
                    <p className="font-medium text-foreground">{stop.place}</p>
                    <p className="text-sm text-muted">{stop.country}</p>
                    <p className="mt-1 text-sm font-medium text-accent">{stop.stage}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
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
            <ul className="mt-3 flex flex-wrap gap-2">
              {pi.memberships.map((membership) => (
                <li key={membership} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted">
                  {membership}
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
        </section>
      </Reveal>
    </div>
  );
}
