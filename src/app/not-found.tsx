import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const destinations = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/lab-members", label: "Lab Members" },
  { href: "/insights", label: "News & openings" },
];

export default function NotFound() {
  return (
    <div className="site-container flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm font-medium text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
        This page drifted out of orbit.
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-muted">
        The link may be old or mistyped. Try one of these instead:
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {destinations.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {d.label} <ArrowRight className="h-3.5 w-3.5 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-10 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
