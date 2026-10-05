import { siteSettings } from "@/data/site-settings";
import { Reveal } from "@/components/motion/reveal";

const socials = [
  { label: "Google Scholar", href: siteSettings.socials.googleScholar },
  { label: "LinkedIn", href: siteSettings.socials.linkedin },
  { label: "ResearchGate", href: siteSettings.socials.researchGate },
  { label: "X (Twitter)", href: siteSettings.socials.twitter },
];

const cardClass = "rounded-2xl border border-border bg-surface p-6";

export default function ContactPage() {
  return (
    <div className="site-container py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Reach out to explore collaboration, ask about our research, or inquire about joining
          the lab.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className={cardClass}>
          <p className="text-sm font-medium text-foreground">Email</p>
          <a href={`mailto:${siteSettings.email}`} className="mt-1 block text-muted hover:text-accent">
            {siteSettings.email}
          </a>
        </div>
        <div className={cardClass}>
          <p className="text-sm font-medium text-foreground">Phone</p>
          <a
            href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
            className="mt-1 block text-muted hover:text-accent"
          >
            {siteSettings.phone}
          </a>
        </div>
        <div className={cardClass}>
          <p className="text-sm font-medium text-foreground">Address</p>
          <p className="mt-1 text-muted">{siteSettings.address}</p>
        </div>
        <div className={cardClass}>
          <p className="text-sm font-medium text-foreground">Social</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted">
            {socials.map(({ label, href }) =>
              href === "#" ? (
                <span key={label} title={`${label} — link pending`} className="text-muted/40">
                  {label}
                </span>
              ) : (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {label}
                </a>
              )
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
