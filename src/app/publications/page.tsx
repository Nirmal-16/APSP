import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, Landmark } from "lucide-react";
import {
  fundedProjects,
  groupHeadName,
  patents,
  publicationTypes,
  publications,
  publicationUrl,
  typeLabel,
  type Publication,
} from "@/data/publications";
import { researchAreas } from "@/data/research-areas";
import { siteSettings } from "@/data/site-settings";
import { pageMetadata } from "@/lib/seo";
import { IconMark } from "@/components/icons/icon-mark";
import { BackToTop } from "@/components/motion/back-to-top";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { PublicationBrowser } from "@/components/publications/publication-browser";
import { typeStyle } from "@/components/publications/type-style";

export const metadata = pageMetadata({
  title: "Publications",
  description:
    "Journal articles, conference papers and posters by the group, with DOI links and citations — plus patents and funded research projects.",
  path: "/publications",
});

const firstYear = Math.min(...publications.map((pub) => pub.year));

const stats = [
  ...publicationTypes.map((t) => ({
    value: String(publications.filter((pub) => pub.type === t.type).length),
    label: t.plural,
  })),
  { value: String(firstYear), label: "Publishing since" },
];

const areaTitle = Object.fromEntries(researchAreas.map((a) => [a.slug, a.title]));

const featured = publications.filter(
  (pub): pub is Publication & { featured: NonNullable<Publication["featured"]> } => !!pub.featured
);

function FeaturedCard({ pub }: { pub: (typeof featured)[number] }) {
  const url = publicationUrl(pub);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-primary/50">
      <div className="relative aspect-video border-b border-border">
        <Image
          src={pub.featured.image}
          alt={pub.featured.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={`inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest ${typeStyle[pub.type].text}`}>
          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${typeStyle[pub.type].fill}`} />
          {typeLabel[pub.type]} · {pub.year}
        </p>
        <h3 className="mt-3 font-semibold leading-snug text-pretty text-foreground">{pub.title}</h3>
        <p className="mt-1 text-sm text-muted italic">{pub.venue}</p>
        <p className="mt-4 flex-1 leading-relaxed text-pretty text-muted">{pub.featured.summary}</p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            Read the paper <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}

// Shown only once the lab's Google Scholar URL is set in data/site-settings.ts.
const scholarUrl = siteSettings.socials.googleScholar;

export default function PublicationsPage() {
  return (
    <div className="site-container py-24">
      {/* Left-aligned on phones, where centred multi-line text looks ragged. */}
      <Reveal className="mx-auto max-w-3xl sm:text-center">
        <p className="text-sm font-medium text-accent">Publications</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          Our research, published and presented.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">
          Journal articles, conference papers and posters from the group, most recent first.{" "}
          <strong className="font-semibold text-accent">{groupHeadName}</strong> is highlighted in each author list,
          and lab members link to their profiles.
        </p>
      </Reveal>

      <div className="mx-auto max-w-6xl">
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col justify-center bg-surface px-4 py-6 text-center">
                <StatCounter value={stat.value} />
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <section aria-labelledby="selected" className="mt-20">
          <Reveal className="mb-8 sm:text-center">
            <h2 id="selected" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Selected publications
            </h2>
            <p className="mt-2 text-pretty text-muted">A few papers that show what the group works on.</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.map((pub, i) => (
              <Reveal key={pub.title} delay={i * 0.08}>
                <FeaturedCard pub={pub} />
              </Reveal>
            ))}
          </div>
        </section>

        <h2 className="mt-20 mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          All publications
        </h2>
        <PublicationBrowser />

        {scholarUrl !== "#" && (
          <p className="mt-10 text-center text-sm text-muted">
            Citation counts and the latest additions are on{" "}
            <a
              href={scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent/80"
            >
              Google Scholar <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </p>
        )}

        <section aria-labelledby="patents-projects" className="mt-24">
          <Reveal className="mb-10 sm:text-center">
            <h2 id="patents-projects" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Patents &amp; funded projects
            </h2>
            <p className="mt-2 text-pretty text-muted">Research that has moved beyond the paper.</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
            <Reveal className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-lg font-semibold text-foreground">
                <IconMark icon={Award} size="sm" />
                Patents
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {patents.map((patent) => (
                  <li key={patent.title}>
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {patent.status}
                    </span>
                    <p className="mt-2 font-medium text-foreground">{patent.title}</p>
                    <Link
                      href={`/research#${patent.area}`}
                      className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      {areaTitle[patent.area]} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-lg font-semibold text-foreground">
                <IconMark icon={Landmark} size="sm" />
                Funded research projects
              </h3>
              <ul className="mt-4 divide-y divide-border">
                {fundedProjects.map((project) => (
                  <li key={project.title} className="py-4 last:pb-0">
                    <p className="font-medium leading-snug text-pretty text-foreground">{project.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {project.agency} · <span className="text-accent">{project.role}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </div>

      <BackToTop />
    </div>
  );
}
