import type { ResearchAreaSlug } from "@/data/research-areas";
import { slugify } from "@/lib/slugify";

// Blog articles shown on the Insights page, newest first; each also gets its
// own page at /insights/blog/<slug>. `author` is a name exactly as in
// data/people.ts (linking to their profile); any other name shows as plain text.
//
// Write `body` as plain text:
//   - a blank line starts a new paragraph
//   - "## " at the start of a line makes a heading
//   - "- " at the start of lines makes a bullet list
//   - "> " at the start of a line makes a pull quote
//   - "![Caption](/blog/figure.jpg)" on its own line adds a figure — put the
//     image in /public/blog; any size works
// The entries below are placeholders until the client sends real articles.

export interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string; // e.g. "2026-06-01"
  tags: string[];
  area?: ResearchAreaSlug;
  cover?: { src: string; alt: string };
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "How do you steer a satellite the size of a shoebox?",
    excerpt:
      "CubeSats are cheap to build and launch, but moving them once they're in orbit is hard. Electrospray thrusters may be the answer.",
    author: "Punya Malaiya Jain",
    date: "2026-07-22",
    tags: ["Electric propulsion", "CubeSats"],
    area: "space-propulsion",
    cover: {
      src: "/media/electrospray-satellite.jpg",
      alt: "Small satellite with electrospray thrusters firing in orbit",
    },
    body: `Thousands of small satellites now orbit the Earth, many no bigger than a shoebox. Most of them have no way to move once they are released: they cannot avoid debris, hold formation or lower themselves out of orbit at the end of their mission.

## Why conventional thrusters don't fit

Chemical thrusters need tanks, valves and plumbing that simply don't fit in a few litres of volume. They also deliver far more thrust than a small satellite needs, and far less precisely.

## Electrospray: thrust from charged droplets

An electrospray thruster pulls charged ions and droplets out of a liquid propellant using a strong electric field. The thrust is tiny — micronewtons — but it is extremely precise and efficient.

- No pressurised tanks or moving parts
- Thrust that can be throttled finely by changing the voltage
- Very high efficiency, so a little propellant goes a long way

> The challenge is making many emitters fire evenly at once — that's where our annular slit emitter comes in.

In the lab we are testing a new emitter design that forms many jets along a slit instead of a single needle. Early results show stable multi-jet operation, and the next step is long-duration testing in our vacuum chamber.`,
  },
  {
    title: "Plasma-assisted ignition, explained",
    excerpt:
      "Igniting fuel at high altitude is difficult. A short burst of plasma can make it reliable — here's how it works.",
    author: "Gyandeep",
    date: "2026-04-08",
    tags: ["Plasma", "Combustion"],
    area: "plasma-technologies",
    cover: { src: "/research/microwave-plasma.jpg", alt: "Glowing microwave plasma inside a quartz chamber" },
    body: `When an aircraft engine flames out at high altitude, it has to relight in thin, cold air. A conventional spark struggles in those conditions.

## What plasma adds

A plasma discharge creates radicals and heat across a larger volume than a spark. Those radicals speed up the chemical reactions that start combustion, so the mixture ignites faster and more reliably.

![A nanosecond pulsed discharge between two electrodes, used to seed ignition.](/research/plasma-discharge.jpg)

## Our experiments

We combine a laser-induced spark with microwave radiation. The microwaves feed energy into the plasma the laser creates, making it larger and longer-lived.

- Shorter ignition delay for lean mixtures
- A wider range of conditions where ignition succeeds

Next, we are testing the approach on sustainable aviation fuel blends.`,
  },
  {
    title: "A week in the life of a propulsion PhD scholar",
    excerpt: "Hot-fire tests, simulations, paper deadlines and a lot of coffee — what doctoral research in the group really looks like.",
    author: "Jay Shiv Dixit",
    date: "2026-01-30",
    tags: ["Lab life", "PhD"],
    cover: { src: "/research/engine-hot-fire.jpg", alt: "Rocket engine firing on a test stand" },
    body: `People often ask what a PhD in propulsion actually involves day to day. Here is a fairly typical week.

## Monday and Tuesday: preparing the test

Most of the start of the week goes into checking the rig, calibrating sensors and writing a test plan with the Group Head.

## Wednesday: test day

Test days start early. A single hot-fire lasts seconds, but setting up safely takes hours.

## Thursday and Friday: making sense of the data

Processing high-speed video and pressure traces, comparing them with simulations, and deciding what to change for the next test.

> The best part is seeing a result nobody has seen before — even if it takes ten tests to get there.

If this sounds like you, have a look at our open positions.`,
  },
];

// URL-safe id used for each article's page, e.g. /insights/blog/plasma-assisted-ignition-explained
export function postSlug(post: BlogPost) {
  return slugify(post.title);
}

// About 200 words a minute.
export function readingTime(post: BlogPost) {
  return Math.max(1, Math.round(post.body.split(/\s+/).length / 200));
}
