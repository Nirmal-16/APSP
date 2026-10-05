import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { siteSettings } from "@/data/site-settings";

// Mirrors the navbar's finalized page set (see components/layout/navbar.tsx).
const links = [
  { href: "/about", label: "About" },
  { href: "/people", label: "People" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

// Hand-drawn marks for platforms lucide-react (v1) doesn't ship brand icons
// for. Swap for real brand assets if the client wants exact logos.
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.2 0h3.36v1.68h.05c.47-.87 1.6-1.8 3.3-1.8 3.53 0 4.18 2.28 4.18 5.25V21H16.9v-5.6c0-1.33-.03-3.04-1.87-3.04-1.87 0-2.16 1.44-2.16 2.94V21H9.4V8.75Z" />
    </svg>
  );
}

function ResearchGateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9.2" />
      <path strokeLinecap="round" d="M8.6 15.5v-7h2.7c1.4 0 2.3.75 2.3 2s-.9 2-2.3 2H8.6M11.3 12.5l2.6 3" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l7.3 8.4L4.4 20H7l5-5.7 4 5.7h3.6l-7.6-8.8L19.4 4H16.8l-4.6 5.3L8.4 4H4Z" />
    </svg>
  );
}

const socialLinks = [
  { href: siteSettings.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteSettings.socials.googleScholar, label: "Google Scholar", Icon: GraduationCap },
  { href: siteSettings.socials.researchGate, label: "ResearchGate", Icon: ResearchGateIcon },
  { href: siteSettings.socials.twitter, label: "X (Twitter)", Icon: XIcon },
];

export function Footer() {
  // Placeholder query until the real lab address lands (Phase 0 intake) —
  // the embed updates automatically once siteSettings.address is real.
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteSettings.address)}&output=embed`;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="site-container grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.1fr_0.7fr_1fr_1.2fr] lg:gap-8">
        {/* Logo lockup */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
              AP
            </span>
            <span className="font-semibold tracking-tight text-foreground">
              {siteSettings.shortName}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{siteSettings.tagline}</p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => {
              // Still "#" until the client sends real profile links (Phase 0
              // intake) — render as inert rather than a dead-looking link.
              const pending = href === "#";
              return pending ? (
                <span
                  key={label}
                  aria-hidden="true"
                  title={`${label} — link pending`}
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-border text-muted/40"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <p className="text-sm font-medium text-foreground">Navigate</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-medium text-foreground">Contact</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${siteSettings.email}`} className="transition-colors hover:text-foreground">
                {siteSettings.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-foreground"
              >
                {siteSettings.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="max-w-[220px]">{siteSettings.address}</span>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <p className="text-sm font-medium text-foreground">Find Us</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <iframe
              src={mapSrc}
              title="Lab location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-40 w-full grayscale-[15%]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteSettings.labName}. All rights reserved.
      </div>
    </footer>
  );
}
