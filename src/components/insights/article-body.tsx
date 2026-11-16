import { FittedImage } from "@/components/media/fitted-image";

const figurePattern = /^!\[(.*)\]\((\S+)\)$/;

// Turns an article's plain-text body (see data/blog.ts) into headings,
// paragraphs, bullet lists, pull quotes and figures.
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);

  return (
    <div className="flex flex-col gap-5 text-lg leading-relaxed text-pretty text-muted">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((line) => line.trim());
        const figure = lines.length === 1 && figurePattern.exec(lines[0]);
        if (figure) {
          const [, caption, src] = figure;
          return (
            <figure key={i} className="my-4">
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-surface-hover">
                <FittedImage src={src} alt={caption} sizes="(min-width: 768px) 48rem, 100vw" />
              </div>
              {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
            </figure>
          );
        }
        if (lines[0].startsWith("## ")) {
          return (
            <h2 key={i} className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
              {lines.join(" ").slice(3)}
            </h2>
          );
        }
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={i} className="flex flex-col gap-2">
              {lines.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {line.slice(2)}
                </li>
              ))}
            </ul>
          );
        }
        if (lines[0].startsWith("> ")) {
          return (
            <blockquote key={i} className="my-2 border-l-4 border-primary pl-5 text-xl font-medium text-foreground italic">
              {lines.map((line) => line.replace(/^> ?/, "")).join(" ")}
            </blockquote>
          );
        }
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}
