import { Reveal } from "@/components/motion/reveal";

// Placeholder route so the finalized navbar resolves. Real content lands
// in the About build phase, once the client's short description is in.
export default function AboutPage() {
  return (
    <div className="site-container py-24 text-center">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">About</h1>
        <p className="mt-4 text-muted">This page is being finalized with the lab — check back soon.</p>
      </Reveal>
    </div>
  );
}
