import { publications } from "@/data/publications";
import { Reveal } from "@/components/motion/reveal";

function PublicationList({ items }: { items: typeof publications }) {
  return (
    <ul className="mt-8 flex flex-col gap-6">
      {items.map((pub) => (
        <li key={pub.title} className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-medium text-foreground">
            {pub.link && pub.link !== "#" ? (
              <a href={pub.link} className="hover:text-accent">
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </p>
          <p className="mt-2 text-sm text-muted">
            {pub.authors} — {pub.venue}, {pub.year}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function PublicationsPage() {
  const journals = publications.filter((p) => p.type === "Journal");
  const conferences = publications.filter((p) => p.type === "Conference");

  return (
    <div className="site-container py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Publications
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Journal articles and conference papers published by the lab.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <h2 className="text-xl font-semibold text-accent">Journal Articles</h2>
        <PublicationList items={journals} />
      </Reveal>

      <Reveal delay={0.15} className="mt-16">
        <h2 className="text-xl font-semibold text-accent">Conference Papers</h2>
        <PublicationList items={conferences} />
      </Reveal>
    </div>
  );
}
