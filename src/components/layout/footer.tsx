import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteSettings } from "@/data/site-settings";
import { SocialLinks } from "@/components/icons/social-icons";

// Mirrors the navbar's finalized page set (see components/layout/navbar.tsx).
const links = [
  { href: "/about", label: "About" },
  { href: "/research-team", label: "Research Team" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
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
          <div className="mt-5">
            <SocialLinks />
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
              src={siteSettings.mapEmbedUrl}
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
