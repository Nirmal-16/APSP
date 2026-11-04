import type { LucideIcon } from "lucide-react";

// The one icon style for the whole site: a thin line icon in a hairline circle.
// Change the look here and every icon follows. Colours come from the theme.
const sizes = {
  sm: { tile: "h-8 w-8", icon: "h-4 w-4" },
  md: { tile: "h-10 w-10", icon: "h-5 w-5" },
  lg: { tile: "h-12 w-12", icon: "h-6 w-6" },
};

export function IconMark({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: keyof typeof sizes }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-border text-accent ${sizes[size].tile}`}
    >
      <Icon className={sizes[size].icon} strokeWidth={1.5} />
    </span>
  );
}
