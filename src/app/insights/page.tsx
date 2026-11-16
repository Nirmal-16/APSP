import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, ChevronDown, Mail, Newspaper, PenLine, Quote } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { applicantFaqs, applicationSteps, daysUntil, openings, testimonials } from "@/data/hirings";
import { news } from "@/data/news";
import { siteSettings } from "@/data/site-settings";
import { BlogCard } from "@/components/insights/blog-card";
import { Byline } from "@/components/insights/byline";
import { NewsBrowser } from "@/components/insights/news-browser";
import { OpeningsList } from "@/components/insights/openings-list";
import { BackToTop } from "@/components/motion/back-to-top";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: `Insights — ${siteSettings.labName}`,
  description:
    "News and announcements from the group, articles by our researchers, and open PhD, postdoc and internship positions.",
};

const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

// The page is built ahead of time; this is the date the openings count uses.
const buildDate = new Date().toISOString().slice(0, 10);
const openCount = openings.filter((o) => !o.deadline || daysUntil(o.deadline, buildDate) >= 0).length;

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

// Overview cards at the top double as a jump menu to each section.
const sections = [
  {
    id: "news",
    icon: Newspaper,
    title: "News & announcements",
    count: plural(news.length, "update"),
    text: "Grants, awards, papers, events and milestones.",
  },
  {
    id: "blog",
    icon: PenLine,
    title: "Blog",
    count: plural(posts.length, "article"),
    text: "Our research explained by the people doing it.",
  },
  {
    id: "hiring",
    icon: BriefcaseBusiness,
    title: "Join the group",
    count: openCount > 0 ? plural(openCount, "open position") : "Open applications welcome",
    text: "PhD, postdoc and internship opportunities.",
  },
];

function SectionHeading({ id, title, text }: { id: string; title: string; text: string }) {
  return (
    <Reveal className="mb-8">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-pretty text-muted">{text}</p>
    </Reveal>
  );
}

export default function InsightsPage() {
  const openApplication = `mailto:${siteSettings.email}?subject=${encodeURIComponent("Open application")}`;

  return (
    <div className="site-container py-24">
      {/* Left-aligned on phones, where centred multi-line text looks ragged. */}
      <Reveal className="mx-auto max-w-3xl sm:text-center">
        <p className="text-sm font-medium text-accent">Insights</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          What&apos;s happening in the group.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">
          The latest news and announcements, articles from our researchers, and the positions we&apos;re hiring for.
        </p>
      </Reveal>

      <div className="mx-auto max-w-7xl">
        <Reveal delay={0.1} className="mt-12">
          <nav aria-label="Sections" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {sections.map(({ id, icon: Icon, title, count, text }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex items-start gap-4 rounded-3xl border border-border bg-surface p-5 transition-colors hover:border-primary/50 sm:flex-col sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-accent">{count}</span>
                  <span className="mt-1 block text-sm text-muted">{text}</span>
                </span>
              </a>
            ))}
          </nav>
        </Reveal>

        <section id="news" aria-labelledby="news-heading" className="mt-24 scroll-mt-24">
          <SectionHeading
            id="news-heading"
            title="News & announcements"
            text="Grants, awards, publications, events and milestones from the group, most recent first."
          />
          <Reveal>
            <NewsBrowser />
          </Reveal>
        </section>

        {posts.length > 0 && (
          <section id="blog" aria-labelledby="blog-heading" className="mt-24 scroll-mt-24">
            <SectionHeading
              id="blog-heading"
              title="Blog"
              text="Articles by members of the group on their research, the questions behind it and life in the lab."
            />
            <div className="flex flex-col gap-6">
              <Reveal>
                <BlogCard post={posts[0]} featured />
              </Reveal>
              {posts.length > 1 && (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.slice(1).map((post, i) => (
                    <li key={post.title}>
                      <Reveal delay={i * 0.06} className="h-full">
                        <BlogCard post={post} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* The Contact page and FAQs link here as /insights#hiring. */}
        <section id="hiring" aria-labelledby="hiring-heading" className="mt-24 scroll-mt-24">
          <SectionHeading
            id="hiring-heading"
            title="Join the group"
            text="We're looking for curious, hands-on researchers. See the open positions below, or send us an open application."
          />

          {/* Openings beside the how-to-apply panel from lg up. */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div className="flex flex-col gap-6">
              <OpeningsList buildDate={buildDate} />
            </div>

            <Reveal delay={0.1} className="lg:sticky lg:top-24">
              <aside className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-foreground">How to apply</h3>
                <ol className="mt-5 flex flex-col gap-5">
                  {applicationSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="font-medium text-foreground">Don&apos;t see a fit?</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Send an open application with your CV and the research area that interests you.
                  </p>
                  <a
                    href={openApplication}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Mail className="h-4 w-4" /> Send an open application
                  </a>
                  <Link
                    href="/contact"
                    className="mt-3 flex w-fit items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    Other questions? Contact us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </Reveal>
          </div>

          {/* Student voices beside the questions applicants ask most, from lg up. */}
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {testimonials.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">Life in the group</h3>
                <ul className="mt-6 flex flex-col gap-6">
                  {testimonials.map((t, i) => (
                    <li key={t.name}>
                      <Reveal delay={i * 0.06}>
                        <figure className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                          <Quote aria-hidden className="h-6 w-6 text-accent" />
                          <blockquote className="mt-3 text-lg leading-relaxed text-pretty text-foreground">
                            {t.quote}
                          </blockquote>
                          <figcaption className="mt-5">
                            <Byline name={t.name} size="lg" />
                          </figcaption>
                        </figure>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {applicantFaqs.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">Questions applicants ask</h3>
                <Reveal className="mt-6 divide-y divide-border rounded-3xl border border-border bg-surface px-6 sm:px-8">
                  {applicantFaqs.map((faq) => (
                    <details key={faq.question} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 leading-relaxed text-pretty text-muted">{faq.answer}</p>
                    </details>
                  ))}
                </Reveal>
              </div>
            )}
          </div>
        </section>
      </div>

      <BackToTop />
    </div>
  );
}
