import { publicationTypes, publications } from "@/data/publications";
import { typeStyle } from "@/components/publications/type-style";

const PLOT_HEIGHT = 144; // px

// Published and presented work only — upcoming items aren't counted yet.
const published = publications.filter((pub) => !pub.upcoming);
const firstYear = Math.min(...published.map((pub) => pub.year));
const lastYear = Math.max(...published.map((pub) => pub.year));

// Every year in the range, including empty ones, so gaps show honestly.
const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => {
  const year = firstYear + i;
  const counts = publicationTypes.map((t) => ({
    ...t,
    count: published.filter((pub) => pub.year === year && pub.type === t.type).length,
  }));
  return { year, counts, total: counts.reduce((sum, c) => sum + c.count, 0) };
});
const max = Math.max(...years.map((y) => y.total));

// Stacked bars per year in the publication-type colours. Hover a year for its
// breakdown; a hidden table carries the same data for screen readers.
export function OutputChart() {
  return (
    <figure className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <figcaption className="text-lg font-semibold text-foreground">Output by year</figcaption>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {publicationTypes.map((t) => (
            <li key={t.type} className="inline-flex items-center gap-2">
              <span aria-hidden className={`h-2.5 w-2.5 rounded-sm ${typeStyle[t.type].fill}`} />
              {t.plural}
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="mt-8 grid border-b border-border" style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}>
        {years.map(({ year, counts, total }) => (
          <div key={year} className="group relative flex flex-col items-center justify-end" style={{ height: PLOT_HEIGHT + 24 }}>
            {total > 0 && <span className="mb-1 text-xs font-medium text-muted">{total}</span>}
            {/* Bottom-up in a fixed type order; 2px gaps separate the segments. */}
            <div className="flex w-3 flex-col-reverse gap-[2px] sm:w-5">
              {counts
                .filter((c) => c.count > 0)
                .map((c) => (
                  <span
                    key={c.type}
                    className={`block w-full last:rounded-t-[4px] ${typeStyle[c.type].fill}`}
                    style={{ height: (c.count / max) * PLOT_HEIGHT - 2 }}
                  />
                ))}
            </div>
            {total > 0 && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-max -translate-x-1/2 rounded-xl border border-border bg-background px-3 py-2 text-xs shadow-lg group-hover:block">
                <p className="font-semibold text-foreground">{year}</p>
                {counts
                  .filter((c) => c.count > 0)
                  .map((c) => (
                    <p key={c.type} className="mt-0.5 flex items-center gap-1.5 text-muted">
                      <span className={`h-2 w-2 rounded-sm ${typeStyle[c.type].fill}`} />
                      {c.count} {c.count === 1 ? c.label.toLowerCase() : c.plural.toLowerCase()}
                    </p>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div aria-hidden className="mt-2 grid text-center text-xs text-muted" style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}>
        {years.map(({ year }) => (
          // Two-digit years on phones so eleven labels fit.
          <span key={year}>
            <span className="sm:hidden">’{String(year).slice(2)}</span>
            <span className="hidden sm:inline">{year}</span>
          </span>
        ))}
      </div>

      {/* Tables ignore sr-only's 1px width, so the wrapper does the hiding. */}
      <div className="sr-only">
        <table>
          <caption>Publications per year by type</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              {publicationTypes.map((t) => (
                <th key={t.type} scope="col">
                  {t.plural}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {years.map(({ year, counts }) => (
              <tr key={year}>
                <th scope="row">{year}</th>
                {counts.map((c) => (
                  <td key={c.type}>{c.count}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
