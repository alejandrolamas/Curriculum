import type { Metadata } from "next";
import Link from "next/link";
import { asStringArray, formatDate, getPosts } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Bitácora",
  description:
    "Apuntes sobre desarrollo web, e-commerce, Shopify, SEO y gestión de proyectos. Por Alejandro Lamas.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-mono text-xs text-[var(--acid)]">Bitácora</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="overline-label">{posts.length} artículos</span>
      </div>
      <h1 className="font-display mb-16 text-[clamp(2.6rem,9vw,7rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
        Apuntes<span className="text-[var(--acid)]">.</span>
      </h1>

      <div className="flex flex-col">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={Math.min(i * 0.04, 0.2)}>
            <Link
              href={`/blog/${post.slug}`}
              data-cursor-label="Leer"
              className="group hairline-t grid gap-3 py-9 md:grid-cols-[110px_1fr_auto] md:items-baseline md:gap-10"
            >
              <span className="font-mono text-xs text-[var(--muted)]">
                {formatDate(post.publishedAt)}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold leading-snug transition-all duration-500 group-hover:translate-x-3 group-hover:text-[var(--acid)] md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {asStringArray(post.tags).map((tag) => (
                    <span key={tag} className="chip !text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                {post.readTime ?? ""}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <Footer />
    </div>
  );
}
