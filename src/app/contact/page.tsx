import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Share2, type LucideIcon } from "lucide-react";
import { siteSettings } from "@/data/site-settings";
import { Reveal } from "@/components/motion/reveal";
import { MediaSlot } from "@/components/media/media-slot";
import { SocialLinks } from "@/components/icons/social-icons";

export const metadata: Metadata = {
  title: `Contact — ${siteSettings.labName}`,
  description: siteSettings.contact.intro,
};

const { email, phone, address, contact } = siteSettings;
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

function DetailCard({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/50 sm:gap-5 sm:p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">{label}</p>
        <div className="mt-1.5 text-base text-foreground sm:text-lg">{children}</div>
      </div>
    </div>
  );
}

const linkClass = "break-words transition-colors hover:text-accent";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-primary/25 via-accent/15 to-transparent blur-3xl" />

      <div className="site-container relative py-24">
        <Reveal>
          <p className="w-fit rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium uppercase tracking-widest text-muted">
            Contact
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {contact.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{contact.intro}</p>
          <p className="mt-4 text-sm text-muted">
            Interested in joining the group?{" "}
            <Link href="/insights#hiring" className="font-medium text-accent transition-colors hover:text-accent/80">
              See open positions →
            </Link>
          </p>
        </Reveal>

        {/* Both columns stretch to the same row height, so their top and
            bottom edges line up. Mobile order: details first, then visual. */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={0.1} className="flex flex-col gap-4">
            <DetailCard icon={Mail} label="Email">
              <a href={`mailto:${email}`} className={linkClass}>
                {email}
              </a>
            </DetailCard>
            <DetailCard icon={Phone} label="Phone">
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className={linkClass}>
                {phone}
              </a>
            </DetailCard>
            <DetailCard icon={MapPin} label="Address">
              <p className="leading-snug">{address}</p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
              >
                Get directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </DetailCard>
            <DetailCard icon={Share2} label="Follow our work">
              <div className="mt-1">
                <SocialLinks />
              </div>
            </DetailCard>
          </Reveal>

          <Reveal delay={0.2} className="lg:order-first">
            <MediaSlot media={contact.media} className="aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
