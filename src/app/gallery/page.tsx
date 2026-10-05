import { Reveal } from "@/components/motion/reveal";

// Placeholder route so the finalized navbar resolves. Real content lands
// in the Gallery build phase, once photos/videos/diagrams are in.
export default function GalleryPage() {
  return (
    <div className="site-container py-24 text-center">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gallery</h1>
        <p className="mt-4 text-muted">This page is being finalized with the lab — check back soon.</p>
      </Reveal>
    </div>
  );
}
