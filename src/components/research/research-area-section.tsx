"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { people, personInitials, personSlug } from "@/data/people";
import type { ResearchArea } from "@/data/research-areas";
import { ResearchIcon } from "@/components/icons/research-icon";
import { ResearchTopicDialog } from "@/components/research/research-topic-dialog";
import { ResearchVisual } from "@/components/research/research-visual";

const labelClass = "text-xs font-medium uppercase tracking-widest text-muted";

export function ResearchAreaSection({ area, flip }: { area: ResearchArea; flip: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // The PI works across every area and has a full profile on the About page.
  const members = people.filter(
    (p) => !p.alumni && p.role !== "Principal Investigator" && p.areas?.includes(area.slug)
  );

  // Opens the popup when a topic is selected, and locks page scroll behind it.
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section
      id={area.slug}
      className="scroll-mt-36 rounded-3xl border border-border bg-surface p-6 transition-colors target:border-primary sm:p-8 lg:p-10"
    >
      {/* 30% visual / 70% content from lg up; the visual fills the card's height. */}
      <div className={`grid grid-cols-1 gap-8 lg:gap-12 ${flip ? "lg:grid-cols-[7fr_3fr]" : "lg:grid-cols-[3fr_7fr]"}`}>
        <div
          className={`relative h-56 overflow-hidden rounded-2xl border border-border bg-background sm:h-72 lg:h-auto lg:min-h-72 ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <div className="absolute inset-0">
            <ResearchVisual variant={area.visual} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <ResearchIcon icon={area.icon} size="lg" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{area.title}</h2>
              <p className="text-sm font-medium text-accent">{area.subtitle}</p>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-muted">{area.summary}</p>

          <p className={`mt-8 ${labelClass}`}>Focus areas — select one to learn more</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {area.topics.map((topic, i) => (
              <button
                key={topic.name}
                type="button"
                onClick={() => setActive(i)}
                aria-haspopup="dialog"
                className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-left text-sm text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {topic.name}
                <Plus className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-primary" />
              </button>
            ))}
          </div>

          {/* Hidden when nobody is listed under this area yet. */}
          {members.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className={labelClass}>Researchers</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {members.map((person) => (
                  <li key={person.name}>
                    <Link
                      href={`/research-team#${personSlug(person)}`}
                      className="group flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-hover text-xs text-muted">
                        {person.photo ? (
                          <Image src={person.photo} alt="" fill sizes="36px" className="object-cover" />
                        ) : (
                          personInitials(person.name)
                        )}
                      </span>
                      {person.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ResearchTopicDialog
        area={area}
        active={active}
        dialogRef={dialogRef}
        onSelect={setActive}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
