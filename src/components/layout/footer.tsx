import Link from "next/link";
import { siteSettings } from "@/data/site-settings";

const links = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/team", label: "Team" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
            {siteSettings.shortName}
          </div>
          <p className="mt-3 text-sm text-zinc-600">{siteSettings.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-6">
          <div>
            <p className="text-sm font-medium text-zinc-950">Navigate</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-zinc-600">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-zinc-950">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-950">Contact</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-zinc-600">
              <li>
                <a href={`mailto:${siteSettings.email}`} className="transition-colors hover:text-zinc-950">
                  {siteSettings.email}
                </a>
              </li>
              <li className="max-w-[220px]">{siteSettings.address}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 px-6 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteSettings.labName}. All rights reserved.
      </div>
    </footer>
  );
}
