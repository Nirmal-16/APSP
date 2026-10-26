"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteSettings } from "@/data/site-settings";
import { ThemeToggle } from "@/components/theme/theme-toggle";

// Reflects the finalized 8-page structure from the 08/09/2026 meeting.
// /about, /gallery and /insights are placeholder routes until their own
// build phase lands real content.
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research-team", label: "Research Team" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/insights", label: "Insights" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="site-container flex items-center justify-between py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-accent" />
          {siteSettings.shortName}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-x-1 text-sm font-medium text-muted lg:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:text-foreground ${
                    active ? "text-foreground" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            aria-current={isActive(pathname, "/contact") ? "page" : undefined}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Contact
          </Link>
        </div>

        {/* Mobile / tablet controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path strokeLinecap="round" d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-border bg-background px-5 py-4 sm:px-6 lg:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-muted">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface hover:text-foreground ${
                      active ? "bg-surface text-foreground" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
