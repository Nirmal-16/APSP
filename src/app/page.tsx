import Link from "next/link";
import { siteSettings } from "@/data/site-settings";
import { researchAreas } from "@/data/research-areas";
import { news } from "@/data/news";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { PlasmaOrbCanvas } from "@/components/three/plasma-orb";
import { ThrusterCanvas } from "@/components/three/thruster-model";
import { SatelliteCanvas } from "@/components/three/satellite-model";
import { ResearchIcon } from "@/components/icons/research-icon";
import { NewsCard } from "@/components/news/news-card";

// Maps site-settings.heroModel to its canvas component — swap the setting,
// not this file, once the client picks a model.
const heroModels = {
  "plasma-orb": PlasmaOrbCanvas,
  thruster: ThrusterCanvas,
  satellite: SatelliteCanvas,
};

export default function Home() {
  const HeroModel = heroModels[siteSettings.heroModel];

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent opacity-70 blur-3xl" />
        <div className="site-container relative grid grid-cols-1 items-center gap-12 py-24 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium uppercase tracking-widest text-muted">
              {siteSettings.labName}
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
              {siteSettings.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {siteSettings.heroSubtext}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/research"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Explore Research
              </Link>
              <Link
                href="/publications"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                View Publications
              </Link>
            </div>
          </Reveal>

          <div>
            <div className="h-72 w-full touch-none sm:h-96">
              <HeroModel />
            </div>
            <p className="mt-2 text-center text-xs text-muted">Drag to rotate</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface">
        <Reveal className="site-container grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {siteSettings.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <StatCounter value={stat.value} />
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Brief Introduction */}
      <section className="site-container py-24 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            About the Group
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-muted">
            {siteSettings.aboutParagraph}
          </p>
        </Reveal>
      </section>

      {/* Research Areas */}
      <section className="border-t border-border bg-surface">
        <div className="site-container py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Research Areas
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                Four areas of work — select one to explore its focus topics.
              </p>
            </div>
            <Link
              href="/research"
              className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              View all research →
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {researchAreas.map((area, i) => (
              <Reveal key={area.slug} delay={i * 0.1}>
                <Link
                  href={`/research#${area.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                >
                  <ResearchIcon icon={area.icon} className="h-10 w-10" />
                  <h3 className="mt-4 font-semibold text-foreground group-hover:text-accent">
                    {area.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-accent">{area.subtitle}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{area.summary}</p>
                  <p className="mt-4 text-xs font-medium text-muted group-hover:text-primary">
                    {area.topics.length} focus areas →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="site-container py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Collaborators
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Institutions and industry partners we work with.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          {siteSettings.collaborators.map((collaborator) => (
            <span
              key={collaborator.name}
              className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-muted"
            >
              {collaborator.name}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Latest News */}
      <section className="border-t border-border bg-surface">
        <div className="site-container py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Latest News
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                Announcements, awards, grants, and milestones from the group.
              </p>
            </div>
            <Link
              href="/insights"
              className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              View all →
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((item, i) => (
              <Reveal key={item.headline} delay={i * 0.1}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="site-container my-24">
        <Reveal className="overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-primary/20">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-border px-6 py-20 text-center">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-foreground">
              Interested in joining the group or collaborating with us?
            </h2>
            <p className="max-w-md text-muted">
              We welcome students, PhD scholars, postdocs, and industry partners.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
