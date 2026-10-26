import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { siteSettings } from "@/data/site-settings";
import { Reveal } from "@/components/motion/reveal";
import { MediaSlot } from "@/components/media/media-slot";
import { SocialLinks } from "@/components/icons/social-icons";
import { CopyButton } from "@/components/contact/copy-button";

export const metadata: Metadata = {
  title: `Contact — ${siteSettings.labName}`,
  description: siteSettings.contact.intro,
};

const { email, phone, address, directionsUrl, mapEmbedUrl, contact } = siteSettings;
const { lead } = contact;

const mailto = (subject: string, to = email) => `mailto:${to}?subject=${encodeURIComponent(subject)}`;

// Every contact action opens in a new tab so visitors keep this page open.
const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

const purposeIcons: Record<(typeof contact.purposes)[number]["icon"], LucideIcon> = {
  students: GraduationCap,
  research: FlaskConical,
  industry: Building2,
};

const leadInitials = lead.name
  .replace(/^Dr\.?\s+/, "")
  .split(/\s+/)
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

const linkClass = "break-words transition-colors hover:text-accent";
const accentLinkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80";
const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary";

function DetailCard({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/50 sm:gap-5 sm:p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">{label}</p>
        <div className="mt-1.5 text-base text-foreground sm:text-lg">{children}</div>
      </div>
    </div>
  );
}

function SectionHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      <p className="mt-2 text-muted">{intro}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-primary/25 via-accent/15 to-transparent blur-3xl" />

      <div className="site-container relative flex flex-col gap-24 py-24">
        {/* Intro + visual + contact details */}
        <div>
          <Reveal>
            <p className="w-fit rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium uppercase tracking-widest text-muted">
              Contact
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {contact.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{contact.intro}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                {contact.replyTime}
              </span>
              <span>
                Interested in joining the group?{" "}
                <Link href="/insights#hiring" className="font-medium text-accent transition-colors hover:text-accent/80">
                  See open positions →
                </Link>
              </span>
            </div>
          </Reveal>

          {/* Both columns stretch to the same row height, so their top and
              bottom edges line up. Mobile order: details first, then visual. */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal delay={0.1} className="flex flex-col gap-4">
              <DetailCard icon={Mail} label="Email">
                <div className="flex items-center justify-between gap-3">
                  <a href={`mailto:${email}`} {...newTab} className={`min-w-0 ${linkClass}`}>
                    {email}
                  </a>
                  <CopyButton value={email} label="email" />
                </div>
              </DetailCard>
              <DetailCard icon={Phone} label="Phone">
                <div className="flex items-center justify-between gap-3">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} {...newTab} className={linkClass}>
                    {phone}
                  </a>
                  <CopyButton value={phone} label="phone number" />
                </div>
              </DetailCard>
              <DetailCard icon={MapPin} label="Address">
                <p className="leading-snug">{address}</p>
                <a href={directionsUrl} {...newTab} className={`mt-2 ${accentLinkClass}`}>
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
              {/* Taller on phones to fit the model's info panel and caption. */}
              <MediaSlot
                media={contact.media}
                className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]"
              />
            </Reveal>
          </div>
        </div>

        {/* How can we help? — one email subject per purpose */}
        <section>
          <Reveal>
            <SectionHeading
              title="How can we help?"
              intro="Pick what fits best — each option opens an email with the right subject line."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {contact.purposes.map((purpose, i) => {
              const Icon = purposeIcons[purpose.icon];
              return (
                <Reveal key={purpose.title} delay={i * 0.08}>
                  <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-primary/50 sm:p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{purpose.title}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-muted">{purpose.text}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <a
                        href={mailto(purpose.subject)}
                        {...newTab}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                      >
                        <Mail className="h-4 w-4" />
                        Email us
                      </a>
                      {"link" in purpose && (
                        <Link href={purpose.link.href} className={accentLinkClass}>
                          {purpose.link.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Lead contact + map | FAQ — columns stretch to equal height */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-border bg-surface p-5 sm:p-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-lg font-semibold text-primary">
                {leadInitials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Lead contact</p>
                <p className="mt-1 font-semibold text-foreground">{lead.name}</p>
                <p className="text-sm text-accent">{lead.role}</p>
              </div>
              {/* Own row on phones so the buttons never squeeze the name. */}
              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                <a href={mailto(`For ${lead.name}`, lead.email || email)} {...newTab} className={pillClass}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <Link href={lead.profile} {...newTab} className={pillClass}>
                  Profile <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Google's embed shows its own address card with "Open in Maps" and directions. */}
            <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-3xl border border-border bg-surface">
              <iframe
                src={mapEmbedUrl}
                title="Map showing the lab's location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-border">
              {contact.faqs.map((faq) => (
                <details key={faq.question} className="group py-4 first:pt-0 last:pb-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </section>
  );
}
