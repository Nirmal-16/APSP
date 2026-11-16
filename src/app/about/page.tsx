import { pageMetadata } from "@/lib/seo";
import { MapPin } from "lucide-react";
import { siteSettings } from "@/data/site-settings";
import { about } from "@/data/about";
import { Reveal } from "@/components/motion/reveal";
import { PiProfile } from "@/components/about/pi-profile";

export const metadata = pageMetadata({ title: "About", description: about.intro, path: "/about" });

export default function AboutPage() {
  return (
    <section>
      <div className="site-container flex flex-col gap-20 py-24">
        {/* Header */}
        {/* Left-aligned on phones, where centred multi-line text looks ragged. */}
        <Reveal className="mx-auto max-w-4xl sm:text-center">
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

        {/* Group Head — the Contact page's "Profile" button links to this id */}
        <section id="principal-investigator" className="scroll-mt-24">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">Leadership</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Group Head
            </h2>
          </Reveal>
          <PiProfile />
        </section>
      </div>
    </section>
  );
}
