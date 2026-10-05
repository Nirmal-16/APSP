import { Atom, Leaf, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import type { ResearchIconKey } from "@/data/research-areas";

const icons: Record<ResearchIconKey, LucideIcon> = {
  leaf: Leaf,
  atom: Atom,
  rocket: Rocket,
  sparkles: Sparkles,
};

export function ResearchIcon({
  icon,
  className,
  iconClassName,
}: {
  icon: ResearchIconKey;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = icons[icon];
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent ${className ?? ""}`}
    >
      <Icon className={iconClassName ?? "h-5 w-5 text-white"} strokeWidth={2} />
    </div>
  );
}
