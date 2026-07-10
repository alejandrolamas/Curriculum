import Link from "next/link";

export interface PostTeaser {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string | null;
  dateLabel: string;
}

/** Panel Bitácora: últimos artículos + enlace al blog completo. */
export function BlogTeaser({ posts }: { posts: PostTeaser[] }) {
  return (
    <div>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--acid)]">05</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Bitácora
        </h2>
      </header>

      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            data-cursor-label="Leer"
            className="group hairline-t py-5 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display max-w-[calc(100%-90px)] text-base font-bold leading-snug transition-colors duration-300 group-hover:text-[var(--acid)] md:text-lg">
                {post.title}
              </h3>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                {post.dateLabel}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">
              {post.excerpt}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="chip !text-[10px]">
                  {tag}
                </span>
              ))}
              {post.readTime ? (
                <span className="ml-auto font-mono text-[10px] text-[var(--muted)]">
                  {post.readTime}
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/blog"
        className="hairline group mt-6 inline-flex items-center gap-3 rounded-full px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 hover:border-[var(--acid)] hover:text-[var(--acid)]"
      >
        Todos los artículos
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </Link>
    </div>
  );
}
