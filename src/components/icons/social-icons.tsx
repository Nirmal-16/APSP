import { GraduationCap } from "lucide-react";
import { siteSettings } from "@/data/site-settings";

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

// Round icon buttons. Links still set to "#" (client hasn't sent them yet)
// render as inert dashed placeholders rather than dead links.
export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socialLinks.map(({ href, label, Icon }) =>
        href === "#" ? (
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
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <Icon className="h-4 w-4" />
          </a>
        )
      )}
    </div>
  );
}
