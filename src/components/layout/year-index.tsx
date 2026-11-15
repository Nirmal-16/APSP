"use client";

import { useEffect, useState } from "react";

// Sticky jump list beside year-grouped results on wide screens; highlights
// the group in view. Each group's section needs the id `section-<id>`.
export function YearIndex({ groups }: { groups: { id: string; heading: string }[] }) {
  const [current, setCurrent] = useState<string | null>(null);
  const ids = groups.map((g) => g.id).join(",");

  useEffect(() => {
    // Only a thin band near the top of the screen counts as "in view".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id.replace("section-", ""));
        }
      },
      { rootMargin: "-20% 0px -75% 0px" }
    );
    for (const id of ids.split(",")) {
      const section = document.getElementById(`section-${id}`);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav aria-label="Jump to year" className="hidden xl:block">
      <ul className="sticky top-24 flex flex-col gap-1 border-l border-border">
        {groups.map((group) => {
          const active = current === group.id;
          return (
            <li key={group.id}>
              <a
                href={`#section-${group.id}`}
                aria-current={active ? "true" : undefined}
                className={`-ml-px block border-l-2 py-1 pl-4 text-sm transition-colors ${
                  active
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {group.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
