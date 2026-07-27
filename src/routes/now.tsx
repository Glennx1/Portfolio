import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title: "What I'm Up To — Glenn Braggs" },
      {
        name: "description",
        content:
          "A living update on current projects, research, roles, and what I'm learning right now.",
      },
      { property: "og:title", content: "What I'm Up To — Glenn Braggs" },
      {
        property: "og:description",
        content:
          "A living update on current projects, research, roles, and what I'm learning right now.",
      },
    ],
  }),
  component: Now,
});

function Now() {
  return (
    <div className="px-6 pt-10 pb-32 md:px-16 md:pt-28 lg:px-24">
      <div className="max-w-[640px]">
        <h1 className="font-serif text-[2.35rem] leading-[1.15] font-normal tracking-[-0.015em] md:text-[3rem]">
          What I'm Up To
        </h1>
        <p className="mt-4 text-slate-muted">
          A now page. Last updated 27 July 2026, from Bangalore.
        </p>

        <div className="mt-14 space-y-12">
          {/* Projects */}
          <section>
            <p className="nav-link uppercase tracking-wider text-xs">Projects</p>
            <ul className="mt-4 space-y-3 text-slate-muted">
              <li>
                <span className="text-foreground font-medium">Traffic Signals</span> &mdash; Optimising the VAC systems present in traffic signals throughout India as part of my internship at the Indian Institute of Science, Bangalore.
              </li>
              <li>
                <span className="text-foreground font-medium">Quantum-Secure AVs</span> &mdash; Working to make autonomous vehicles quantum secure.
              </li>
            </ul>
          </section>

          {/* Reading */}
          <section>
            <p className="nav-link uppercase tracking-wider text-xs">Reading</p>
            <ul className="mt-4 space-y-3 text-slate-muted">
              <li>
                <span className="text-foreground font-medium">Crime and Punishment</span> by Fyodor Dostoevsky &mdash; <span className="italic font-light">an incredibly long read.</span>
              </li>
              <li>
                <span className="text-foreground font-medium">Letters to a Young Poet</span> by Rainer Maria Rilke.
              </li>
              <li>
                <span className="text-foreground font-medium">The Beginning of Infinity</span> by David Deutsch &mdash; <span className="italic font-light">I'd like to pretend I understand what he says 50% of the time.</span>
              </li>
              <li>
                <span className="text-foreground font-medium">Sapiens</span> by Yuval Noah Harari.
              </li>
            </ul>
          </section>

          {/* Learning */}
          <section>
            <p className="nav-link uppercase tracking-wider text-xs">Learning</p>
            <ul className="mt-4 space-y-3 text-slate-muted">
              <li>
                <span className="text-foreground font-medium">Spanish</span> &mdash; For the eventual backpacking trip.
              </li>
              <li>
                <span className="text-foreground font-medium">Personal Finance</span> &mdash; To not stay broke.
              </li>
              <li>
                <span className="text-foreground font-medium">Oasis on Guitar</span> &mdash; Learning a bunch of Oasis songs (the rhythm guitar on them is insane).
              </li>
            </ul>
          </section>

          {/* Blogs */}
          <section>
            <p className="nav-link uppercase tracking-wider text-xs">Blogs</p>
            <p className="mt-4 text-slate-muted leading-relaxed">
              Even with a multitude of ideas in my head, I'm writing about only two right now:
            </p>
            <ul className="mt-3 space-y-3 text-slate-muted">
              <li>
                <span className="text-foreground font-medium">Water and Money</span>
              </li>
              <li>
                <span className="text-foreground font-medium">On the Fear of Starting Up</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

