import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/musings/")({
  head: () => ({
    meta: [
      { title: "Musings — Mira Okonkwo" },
      {
        name: "description",
        content:
          "Essays and short notes on design, reading, attention, and making things quietly.",
      },
      { property: "og:title", content: "Musings — Mira Okonkwo" },
      {
        property: "og:description",
        content:
          "Essays and short notes on design, reading, attention, and making things quietly.",
      },
    ],
  }),
  component: Musings,
});

function Musings() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-6 pt-10 pb-32 md:px-16 md:pt-28 lg:px-24">
      <div className="max-w-[640px]">
        <h1 className="font-serif text-[2.35rem] leading-[1.15] font-normal tracking-[-0.015em] md:text-[3rem]">
          Musings
        </h1>
        <p className="mt-4 text-slate-muted">
          Occasional essays. No schedule, no newsletter.
        </p>

        <ul className="mt-14 space-y-10">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                to="/musings/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <p className="nav-link">{post.displayDate}</p>
                <h2 className="mt-2 font-serif text-[1.5rem] leading-snug font-normal transition-colors group-hover:text-rose">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-slate-muted">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
