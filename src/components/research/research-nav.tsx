"use client";

import { useEffect, useState } from "react";
import { researchAreas } from "@/data/research-areas";

// Sticky category navigation that highlights the area in view. The homepage
// cards link to these same anchors.
export function ResearchNav() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    // Only a thin band across the middle of the screen counts as "in view".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const area of researchAreas) {
      const section = document.getElementById(area.slug);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Research areas"
      className="sticky top-[4.25rem] z-40 -mx-4 mt-12 overflow-x-auto border-y border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <ul className="flex gap-2 whitespace-nowrap lg:justify-center">
        {researchAreas.map((area) => (
          <li key={area.slug}>
            <a
              href={`#${area.slug}`}
              aria-current={current === area.slug ? "true" : undefined}
              className={`block rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary ${
                current === area.slug ? "border-primary text-primary" : "border-border text-muted"
              }`}
            >
              {area.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
