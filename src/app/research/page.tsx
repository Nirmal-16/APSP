import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, FlaskConical, Sigma, type LucideIcon } from "lucide-react";
import { siteSettings } from "@/data/site-settings";
import { researchApproach, researchAreas, researchIntro } from "@/data/research-areas";
import { IconMark } from "@/components/icons/icon-mark";
import { Reveal } from "@/components/motion/reveal";
import { ResearchAreaSection } from "@/components/research/research-area-section";
import { ResearchNav } from "@/components/research/research-nav";

export const metadata: Metadata = {
  title: `Research — ${siteSettings.labName}`,
  description: researchIntro.text,
};

const approachIcons: LucideIcon[] = [FlaskConical, Cpu, Sigma];

export default function ResearchPage() {
  return (
    <div className="site-container py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-accent">Research</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          {researchIntro.headline}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{researchIntro.text}</p>
      </Reveal>

      <ResearchNav />

      <div className="mt-10 flex flex-col gap-10">
        {researchAreas.map((area, i) => (
          <ResearchAreaSection key={area.slug} area={area} flip={i % 2 === 1} />
        ))}
      </div>

      {/* How the group works */}
      <section className="mt-24">
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">How we work</h2>
          <p className="mt-2 text-muted">Experiments, simulation and theory, used together.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {researchApproach.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <IconMark icon={approachIcons[i]} />
              <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Next step for visitors interested in the work */}
      <Reveal className="mt-24 flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface px-6 py-16 text-center">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
          Interested in working on one of these topics?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/insights#hiring"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            See open positions
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
