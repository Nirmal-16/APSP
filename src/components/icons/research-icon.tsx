import { Atom, Leaf, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import type { ResearchIconKey } from "@/data/research-areas";
import { IconMark } from "@/components/icons/icon-mark";

const icons: Record<ResearchIconKey, LucideIcon> = {
  leaf: Leaf,
  atom: Atom,
  rocket: Rocket,
  sparkles: Sparkles,
};

export function ResearchIcon({ icon, size }: { icon: ResearchIconKey; size?: React.ComponentProps<typeof IconMark>["size"] }) {
  return <IconMark icon={icons[icon]} size={size} />;
}
