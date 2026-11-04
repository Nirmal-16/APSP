import type { Metadata } from "next";
import { Compass, MapPin, Target } from "lucide-react";
import { siteSettings } from "@/data/site-settings";
import { about } from "@/data/about";
import { Reveal } from "@/components/motion/reveal";
import { PiProfile } from "@/components/about/pi-profile";

export const metadata: Metadata = {
  title: `About — ${siteSettings.labName}`,
  description: about.intro,
};

const pillars = [
  { icon: Target, title: "Mission", text: about.mission },
  { icon: Compass, title: "Vision", text: about.vision },
];

export default function AboutPage() {
  return (
    <section>
      <div className="site-container flex flex-col gap-20 py-24">
        {/* Header */}
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-accent">About</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {about.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-pretty text-muted">{about.intro}</p>
          <a
            href={siteSettings.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            <MapPin className="h-4 w-4" />
            Based at IIT Madras, Chennai
          </a>
        </Reveal>

        {/* Mission & vision — open text and a thin divider, no cards */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="py-8 first:pt-0 last:pb-0 md:px-12 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <h2 className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
                <Icon className="h-4 w-4" />
                {title}
              </h2>
              <p className="mt-4 text-xl leading-snug font-medium tracking-tight text-foreground sm:text-2xl">{text}</p>
            </Reveal>
          ))}
        </div>

        {/* Principal Investigator — the Contact page's "Profile" button links here */}
        <section id="principal-investigator" className="scroll-mt-24">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">Leadership</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Principal Investigator
            </h2>
          </Reveal>
          <PiProfile />
        </section>
      </div>
    </section>
  );
}
