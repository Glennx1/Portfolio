import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/lib/posts";

export const Route = createFileRoute("/musings/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return {
      title: post.title,
      description: post.description,
      displayDate: post.displayDate,
      slug: post.slug,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — Mira Okonkwo" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — Mira Okonkwo`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug, title, displayDate } = Route.useLoaderData();
  const post = getPost(slug)!;

  return (
    <article className="px-6 pt-10 pb-32 md:px-16 md:pt-28 lg:px-24">
      <div className="max-w-[640px]">
        <Link to="/musings" className="nav-link link-underline">
          ← Musings
        </Link>
        <h1 className="mt-10 font-serif text-[2.2rem] leading-[1.15] font-normal tracking-[-0.015em] md:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-4 nav-link">{displayDate}</p>
        <div className="prose-quiet mt-10">{post.body()}</div>
      </div>
    </article>
  );
}
