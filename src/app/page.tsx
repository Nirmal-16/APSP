export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-32 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Advanced Plasma &amp; Space Propulsion Lab
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Placeholder headline about plasma physics and space propulsion research.
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Placeholder sub-text summarizing the lab&apos;s mission. Replace once
          content is finalized.
        </p>
      </section>

      <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800">
        <h2 className="text-center text-2xl font-semibold">Research Areas</h2>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          Placeholder — research area cards go here.
        </p>
      </section>

      <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800">
        <h2 className="text-center text-2xl font-semibold">Latest Publications</h2>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          Placeholder — publication list goes here.
        </p>
      </section>

      <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800">
        <h2 className="text-center text-2xl font-semibold">Get in touch</h2>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          Placeholder — contact CTA goes here.
        </p>
      </section>
    </div>
  );
}
