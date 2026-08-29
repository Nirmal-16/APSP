import Link from "next/link";
import { siteSettings } from "@/data/site-settings";
import { researchAreas } from "@/data/research-areas";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { news } from "@/data/news";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { PlasmaOrbCanvas } from "@/components/three/plasma-orb";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 via-cyan-100 to-transparent opacity-70 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 py-24 sm:py-28 lg:grid-cols-2 lg:gap-4">
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="rounded-full border border-zinc-200 bg-white px-4 py-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
              {siteSettings.labName}
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
              {siteSettings.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
              {siteSettings.heroSubtext}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/research"
                className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
              >
                Explore Research
              </Link>
              <Link
                href="/publications"
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950"
              >
                View Publications
              </Link>
            </div>
          </Reveal>

          <div aria-hidden className="h-72 w-full sm:h-96">
            <PlasmaOrbCanvas />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <Reveal className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {siteSettings.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <StatCounter value={stat.value} />
              <p className="mt-1 text-sm text-zinc-600">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Research Areas */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Research Areas
            </h2>
            <p className="mt-2 max-w-xl text-zinc-600">
              Core themes driving our work in plasma physics and propulsion.
            </p>
          </div>
          <Link
            href="/research"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
          >
            View all research →
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.slice(0, 3).map((area, i) => (
            <Reveal key={area.slug} delay={i * 0.1}>
              <Link
                href={`/research/${area.slug}`}
                className="group block h-full rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
                <h3 className="mt-4 font-semibold text-zinc-950 group-hover:text-indigo-600">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{area.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Featured Projects
              </h2>
              <p className="mt-2 max-w-xl text-zinc-600">
                A selection of ongoing and completed lab projects.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
            >
              View all projects →
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.slice(0, 4).map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      project.status === "Ongoing"
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {project.status}
                  </span>
                  <h3 className="mt-4 font-semibold text-zinc-950 group-hover:text-indigo-600">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{project.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications + News */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Latest Publications
              </h2>
              <Link
                href="/publications"
                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
              >
                View all →
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-6">
              {publications.slice(0, 3).map((pub) => (
                <li key={pub.title} className="border-b border-zinc-200 pb-6 last:border-0">
                  <p className="font-medium text-zinc-950">{pub.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {pub.authors} — {pub.venue}, {pub.year}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Latest News
              </h2>
              <Link
                href="/achievements"
                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
              >
                View all →
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-6">
              {news.slice(0, 3).map((item) => (
                <li key={item.title} className="border-b border-zinc-200 pb-6 last:border-0">
                  <span className="text-xs font-medium uppercase tracking-widest text-indigo-600">
                    {item.category}
                  </span>
                  <p className="mt-1 font-medium text-zinc-950">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Reveal className="mx-6 mb-24 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 to-indigo-950 sm:mx-auto sm:max-w-6xl">
        <div className="flex flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white">
            Interested in joining the lab or collaborating with us?
          </h2>
          <p className="max-w-md text-zinc-300">
            We welcome inquiries from prospective students, researchers, and industry partners.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-indigo-100"
          >
            Get in Touch
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
