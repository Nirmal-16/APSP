import { researchAreas } from "@/data/research-areas";
import { Reveal } from "@/components/motion/reveal";
import { ResearchAreaSection } from "@/components/research/research-area-section";

export default function ResearchPage() {
  return (
    <div className="site-container py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Research
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Our work spans four areas — clean energy, plasma technologies, space propulsion, and
          other emerging technologies. Select a focus area within each to learn more.
        </p>
      </Reveal>

      {/* Category navigation — the homepage cards link to these same anchors. */}
      <nav
        aria-label="Research areas"
        className="sticky top-[4.25rem] z-40 -mx-4 mt-10 overflow-x-auto border-y border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <ul className="flex gap-2 whitespace-nowrap">
          {researchAreas.map((area) => (
            <li key={area.slug}>
              <a
                href={`#${area.slug}`}
                className="block rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
              >
                {area.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex flex-col gap-10">
        {researchAreas.map((area, i) => (
          <ResearchAreaSection key={area.slug} area={area} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
