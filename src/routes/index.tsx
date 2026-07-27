import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero-blossom.jpg";
import profileImage from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glenn Braggs — Engineering, Research, Writing" },
      {
        name: "description",
        content:
          "Glenn Braggs is an engineer, researcher and late-night writer based out of Bangalore, India.",
      },
      { property: "og:title", content: "Glenn Braggs — Engineering, Research, Writing" },
      {
        property: "og:description",
        content:
          "Glenn Braggs is an engineer, researcher and late-night writer based out of Bangalore, India.",
      },
    ],
  }),
  component: Index,
});

const socials = [
  { label: "GitHub", href: "https://github.com/Glennx1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/glennbraggs/" },
  { label: "Instagram", href: "https://instagram.com/glenn_braggs" },
  { label: "Email", href: "mailto:glennbraggs.work@gmail.com" },
];

function Index() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] md:min-h-screen">
        <img
          src={heroImage}
          alt="Watercolour painting of misty mountains beneath cherry blossom branches"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative flex min-h-[calc(100vh-4rem)] items-end px-6 pb-20 md:min-h-screen md:px-16 md:pb-28 lg:px-24">
          <div className="max-w-[640px] bg-[radial-gradient(75%_70%_at_35%_55%,rgba(252,250,248,0.95),rgba(252,250,248,0.8)_45%,rgba(252,250,248,0.45)_70%,rgba(252,250,248,0)_100%)] px-8 py-14 md:px-14 md:py-16">
            <img
              src={profileImage}
              alt="Portrait of Glenn Braggs"
              width={512}
              height={512}
              loading="lazy"
              className="h-16 w-16 rounded-full object-cover object-[center_75%] md:h-20 md:w-20"
            />
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.08] font-normal tracking-[-0.02em] md:text-[3.6rem]">
              Glenn Braggs
            </h1>
            <p className="mt-5 max-w-[46ch] text-foreground">
              I'm an engineer, researcher and late-night writer based out of Bangalore, India.
              I spend most of my time researching and applying software to projects that makes a difference.
              I care about startups, reading, writing and have an appreciation for good music.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="nav-link link-underline"
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div className="prose-quiet max-w-[640px]">
          <p className="text-slate-muted">
            Currently working on software engineering, exploring research opportunities, and reading about startups.
          </p>
        </div>
      </section>
    </>
  );
}
