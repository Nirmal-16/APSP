"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Floating button for long pages; appears once the visitor is well down the page.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      // Dark button with a white icon in both themes; the light ring keeps it visible on dark pages.
      className={`fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg ring-1 ring-white/35 transition-all hover:bg-primary sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
