"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

// Copies the current page URL — pages keep it pointing at what's on screen.
export function CopyLinkButton({ className }: { className: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. permissions) — the link is still in the address bar.
    }
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Link2 className="h-3.5 w-3.5" />}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
