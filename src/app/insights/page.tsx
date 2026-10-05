import { news, formatNewsDate } from "@/data/news";
import { openings } from "@/data/hirings";
import { Reveal } from "@/components/motion/reveal";
import { NewsCard } from "@/components/news/news-card";

// Combined News / Announcements / Hiring page from the finalized page
// structure. Blogs get a section here once the client sends posts.
export default function InsightsPage() {
  return (
    <div className="site-container py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Insights</h1>
        <p className="mt-4 max-w-2xl text-muted">
          News, announcements, and open positions in the group.
        </p>
        <div className="mt-6 flex gap-2 text-sm">
          <a href="#news" className="rounded-full border border-border px-4 py-1.5 font-medium text-muted transition-colors hover:border-primary hover:text-primary">
            News &amp; Announcements
          </a>
          <a href="#hiring" className="rounded-full border border-border px-4 py-1.5 font-medium text-muted transition-colors hover:border-primary hover:text-primary">
            Hiring
          </a>
        </div>
      </Reveal>

      <section id="news" className="mt-16 scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-accent">News &amp; Announcements</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, i) => (
            <Reveal key={item.headline} delay={i * 0.05}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="hiring" className="mt-20 scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-accent">Hiring</h2>
        {openings.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            There are no open positions at the moment. Check back soon.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {openings.map((opening, i) => (
              <Reveal key={opening.title} delay={i * 0.05}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium uppercase tracking-widest text-accent">{opening.type}</span>
                    <time dateTime={opening.postedDate} className="text-muted">
                      Posted {formatNewsDate(opening.postedDate)}
                    </time>
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{opening.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{opening.summary}</p>
                  <a
                    href={`mailto:${opening.applyEmail}?subject=Application: ${opening.title}`}
                    className="mt-5 w-fit rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    Apply by email
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
