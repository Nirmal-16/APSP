import Link from "next/link";
import { siteSettings } from "@/data/site-settings";

const links = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/team", label: "Team" },
  { href: "/achievements", label: "Achievements" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
          {siteSettings.shortName}
        </Link>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-zinc-600">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-zinc-950">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
