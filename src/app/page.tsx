import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Compass,
  Handshake,
  Images,
  Landmark,
  Medal,
  ScrollText,
  Target,
} from "lucide-react";
import { principalInvestigator } from "@/data/about";
import { albumSlug, gallery } from "@/data/gallery";
import { openOpenings } from "@/data/hirings";
import { news } from "@/data/news";
import { collaboratorRoles, people } from "@/data/people";
import { fundedProjects, patents, publications, publicationsInArea } from "@/data/publications";
import { researchAreas } from "@/data/research-areas";
import { siteSettings } from "@/data/site-settings";
import { formatDate } from "@/lib/format-date";
import { HeroBackground } from "@/components/home/hero-background";
import { HeroNews } from "@/components/home/hero-news";
import { ResearchIcon } from "@/components/icons/research-icon";
import { FittedImage } from "@/components/media/fitted-image";
import { MediaSlot, ModelCanvas } from "@/components/media/media-slot";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { NewsCard } from "@/components/news/news-card";

// Title, description and link preview come from the root layout.
export const metadata: Metadata = { alternates: { canonical: "/" } };

// Counted from the site's data, so they stay current as entries are added.
const stats = [
  { value: String(publications.length), label: "Publications" },
  { value: String(fundedProjects.length), label: "Funded projects" },
  { value: String(researchAreas.length), label: "Research areas" },
  {
    value: String(people.filter((p) => !p.alumni && !collaboratorRoles.includes(p.role)).length),
    label: "Lab members",
  },
];

const pillars = [
  { icon: Target, title: "Mission", text: siteSettings.mission },
  { icon: Compass, title: "Vision", text: siteSettings.vision },
];

// Each research card shows the first photo among its focus topics.
const areaCards = researchAreas.map((area) => {
  const cover = area.topics.map((t) => t.media).find((m) => m?.type === "image");
  return { area, cover: cover?.type === "image" ? cover : undefined, papers: publicationsInArea(area.slug).length };
});

// Granted patents, then the PI's national fellowships (from the About page).
const recognition = [
  ...patents.map((p) => ({
    icon: ScrollText,
    kind: `${p.status} patent`,
    title: p.title,
    detail: researchAreas.find((a) => a.slug === p.area)?.title ?? "",
  })),
  ...principalInvestigator.awards
    .filter((a) => a.by === "Government of India")
    .map((a) => ({ icon: Medal, kind: "Fellowship", title: a.title, detail: `${a.by} · ${a.year}` })),
];

const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const latestAlbums = [...gallery].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

const sectionHeadingClass = "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl";
const viewAllClass =
  "inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80";

function SectionHeader({
  title,
  text,
  href,
  linkLabel,
}: Readonly<{ title: string; text: string; href: string; linkLabel: string }>) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className={sectionHeadingClass}>{title}</h2>
        <p className="mt-2 max-w-xl text-pretty text-muted">{text}</p>
      </div>
      <Link href={href} className={viewAllClass}>
        {linkLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    </Reveal>
  );
}

export default function Home() {
  const feature = siteSettings.homeFeature;
  // The page is built ahead of time; openings count as of the build.
  const openCount = openOpenings(new Date().toISOString().slice(0, 10)).length;
  const positions = openCount === 1 ? "position" : "positions";
  const ctaCards = [
    {
      icon: BriefcaseBusiness,
      title: "Join the group",
      text:
        openCount > 0
          ? `${openCount} open ${positions} for PhD scholars, postdocs and interns — or send an open application.`
          : "No open positions right now, but we're always glad to hear from motivated students and researchers.",
      href: "/insights#hiring",
      label: openCount > 0 ? "See open positions" : "How to apply",
    },
    {
      icon: Handshake,
      title: "Collaborate",
      text: "Academic partnerships, sponsored research and testing support for industry. Tell us about your problem.",
      href: "/contact",
      label: "Get in touch",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero, over a starfield */}
      <section className="relative isolate overflow-hidden">
        <HeroBackground />
        <div className="site-container grid grid-cols-1 items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-sm font-medium text-accent">{siteSettings.labName}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
              {siteSettings.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{siteSettings.heroSubtext}</p>
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
            <div className="mt-10 flex w-full justify-center lg:justify-start">
              <HeroNews />
            </div>
          </Reveal>

          <div>
            <div className="h-72 w-full touch-none sm:h-96">
              <ModelCanvas model={siteSettings.heroModel} />
            </div>
            <p className="mt-2 text-center text-xs text-muted">Drag to rotate</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface">
        <Reveal className="site-container grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <StatCounter value={stat.value} />
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* About, mission and vision */}
      <section className="site-container py-24 text-center">
        <Reveal>
          <h2 className={sectionHeadingClass}>About the Group</h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-pretty text-muted">
            {siteSettings.aboutParagraph}
          </p>
          <Link href="/about" className={`mt-6 ${viewAllClass}`}>
            More about the group <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Mission & vision — open text and a thin divider, no cards */}
        <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 divide-y divide-border text-left md:grid-cols-2 md:divide-x md:divide-y-0">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="py-8 first:pt-0 last:pb-0 md:px-12 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
                <Icon className="h-4 w-4" />
                {title}
              </h3>
              <p className="mt-4 text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured research — video beside the story */}
      <section className="border-t border-border bg-surface">
        <div className="site-container grid grid-cols-1 items-center gap-10 py-24 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <MediaSlot media={feature.media} className="aspect-video" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">{feature.eyebrow}</p>
            <h2 className={`mt-3 text-balance ${sectionHeadingClass}`}>{feature.title}</h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted">{feature.text}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {feature.points.map((point) => (
                <li key={point} className="flex gap-3 text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {feature.links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    i === 0
                      ? "inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                      : "inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  }
                >
                  {link.label} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Research areas */}
      <section className="border-t border-border">
        <div className="site-container py-24">
          <SectionHeader
            title="Research Areas"
            text="Four areas of work — select one to explore its focus topics."
            href="/research"
            linkLabel="View all research"
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areaCards.map(({ area, cover, papers }, i) => (
              <li key={area.slug}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Link
                    href={`/research#${area.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-primary/50"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-hover">
                      {cover && (
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute bottom-3 left-3">
                        <ResearchIcon icon={area.icon} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                        {area.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-accent">{area.subtitle}</p>
                      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted">{area.summary}</p>
                      <p className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4 text-xs font-medium text-muted">
                        <span>{papers > 0 ? `${papers} ${papers === 1 ? "paper" : "papers"}` : "Learn more"}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* From the lab — latest gallery albums */}
      {latestAlbums.length > 0 && (
        <section className="border-t border-border bg-surface">
          <div className="site-container py-24">
            <SectionHeader
              title="From the Lab"
              text="Experiments, facilities, conferences and milestones, in pictures."
              href="/gallery"
              linkLabel="View gallery"
            />
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {latestAlbums.map((album, i) => (
                <li key={albumSlug(album)}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <Link
                      href={`/gallery?album=${albumSlug(album)}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-black sm:aspect-[4/3]"
                    >
                      <FittedImage
                        src={album.photos[0].src}
                        alt={album.photos[0].alt}
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      {album.photos.length > 1 && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                          <Images className="h-3.5 w-3.5" /> {album.photos.length}
                        </span>
                      )}
                      <span className="absolute inset-x-0 bottom-0 block p-4 text-white">
                        <span className="block text-xs text-white/75">
                          {album.category} · {formatDate(album.date)}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-sm leading-snug font-semibold">{album.title}</span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Latest news */}
      <section className="border-t border-border">
        <div className="site-container py-24">
          <SectionHeader
            title="Latest News"
            text="Announcements, awards, grants, and milestones from the group."
            href="/insights#news"
            linkLabel="All news"
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item, i) => (
              <li key={item.headline}>
                <Reveal delay={i * 0.08} className="h-full">
                  <NewsCard item={item} surface />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Funding & recognition */}
      {(fundedProjects.length > 0 || recognition.length > 0) && (
        <section className="border-t border-border bg-surface">
          <div className="site-container py-24">
            <SectionHeader
              title="Funding & Recognition"
              text="Research sponsored by national agencies and institutes, and recognition for the group's work."
              href="/publications#patents-projects"
              linkLabel="Patents & projects"
            />
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
              {fundedProjects.length > 0 && (
                <Reveal className="rounded-3xl border border-border bg-background p-6 sm:p-8">
                  <h3 className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
                    <Landmark className="h-4 w-4" /> Sponsored research
                  </h3>
                  <ul className="mt-2 divide-y divide-border">
                    {fundedProjects.map((project) => (
                      <li key={project.title} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div className="min-w-0">
                          <p className="font-medium text-pretty text-foreground">{project.title}</p>
                          <p className="mt-1 text-sm text-muted">{project.agency}</p>
                        </div>
                        <span className="w-fit shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-muted">
                          {project.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {recognition.length > 0 && (
                <Reveal delay={0.1}>
                  <ul className="flex h-full flex-col gap-4">
                    {recognition.map(({ icon: Icon, kind, title, detail }) => (
                      <li key={title} className="flex flex-1 gap-4 rounded-3xl border border-border bg-background p-6">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-widest text-accent">{kind}</p>
                          <p className="mt-1 font-semibold text-pretty text-foreground">{title}</p>
                          <p className="mt-1 text-sm text-muted">{detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Collaborators */}
      {siteSettings.collaborators.length > 0 && (
        <section className="border-t border-border">
          <div className="site-container py-24">
            <Reveal>
              <h2 className={sectionHeadingClass}>Collaborators</h2>
              <p className="mt-2 max-w-xl text-pretty text-muted">Institutions and industry partners we work with.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {siteSettings.collaborators.map((collaborator) => {
                  const content = collaborator.logo ? (
                    <span className="relative block h-12 w-full">
                      <Image
                        src={collaborator.logo}
                        alt={collaborator.name}
                        fill
                        sizes="200px"
                        className="object-contain opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </span>
                  ) : (
                    <span className="text-center text-sm font-medium text-muted transition-colors group-hover:text-foreground">
                      {collaborator.name}
                    </span>
                  );
                  const tileClass =
                    "group flex h-24 items-center justify-center rounded-2xl border border-border bg-surface px-5 transition-colors hover:border-primary/50";
                  return (
                    <li key={collaborator.name}>
                      {collaborator.url ? (
                        <a href={collaborator.url} target="_blank" rel="noopener noreferrer" title={collaborator.name} className={tileClass}>
                          {content}
                        </a>
                      ) : (
                        <div title={collaborator.name} className={tileClass}>
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Call to action — join or collaborate */}
      <section className="site-container my-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className={`text-balance ${sectionHeadingClass}`}>Work with us</h2>
          <p className="mt-3 text-pretty text-muted">
            We welcome students, PhD scholars, postdocs and industry partners.
          </p>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {ctaCards.map(({ icon: Icon, title, text, href, label }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <Link
                href={href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-primary/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-pretty text-muted">{text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
