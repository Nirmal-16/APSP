import Image from "next/image";
import Link from "next/link";
import { people, personHref, personInitials } from "@/data/people";

// Author photo and name, linking to their profile when they're in
// data/people.ts. `relative` keeps the link clickable above a card-wide link.
export function Byline({ name, size = "sm" }: { name: string; size?: "sm" | "lg" }) {
  const person = people.find((p) => p.name === name);
  const avatar = size === "lg" ? "h-11 w-11" : "h-8 w-8";
  const role = person?.role === "Principal Investigator" ? "Group Head" : person?.role;

  const content = (
    <>
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-hover text-xs text-muted ${avatar}`}
      >
        {person?.photo ? (
          <Image src={person.photo} alt="" fill sizes={size === "lg" ? "44px" : "32px"} className="object-cover" />
        ) : (
          personInitials(name)
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-foreground transition-colors group-hover/byline:text-primary">{name}</span>
        {size === "lg" && role && <span className="block text-sm text-muted">{role}</span>}
      </span>
    </>
  );

  return person ? (
    <Link href={personHref(person)} className="group/byline relative z-10 flex items-center gap-2.5 text-sm">
      {content}
    </Link>
  ) : (
    <span className="flex items-center gap-2.5 text-sm">{content}</span>
  );
}
