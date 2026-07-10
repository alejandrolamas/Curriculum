import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { asStringArray, formatDate, getPost, getPosts } from "@/lib/content";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { Footer } from "@/components/site/Footer";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt.toISOString(),
      authors: ["Alejandro Lamas"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published || post.publishedAt > new Date()) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt.toISOString(),
    author: { "@type": "Person", name: "Alejandro Lamas", url: "https://alejandrolamas.es" },
  };

  return (
    <article className="px-5 pb-24 pt-32 md:px-10 md:pt-40">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="link-sweep font-mono text-xs uppercase tracking-widest text-[var(--muted)]"
        >
          ← Bitácora
        </Link>

        <header className="mb-12 mt-8">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-[var(--acid)]">
              {formatDate(post.publishedAt)}
            </span>
            {post.readTime ? (
              <span className="font-mono text-xs text-[var(--muted)]">
                · {post.readTime} de lectura
              </span>
            ) : null}
          </div>
          <h1 className="font-display text-[clamp(1.9rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-lg font-light leading-relaxed text-[var(--muted)]">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {asStringArray(post.tags).map((tag) => (
              <span key={tag} className="chip !text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-al">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <footer className="hairline-t mt-16 pt-8">
          <p className="font-mono text-xs text-[var(--muted)]">
            Escrito por{" "}
            <Link href="/" className="text-[var(--acid)] underline underline-offset-4">
              Alejandro Lamas
            </Link>{" "}
            — Technical Project Manager · E-commerce
          </p>
        </footer>
      </div>
      <Footer />
    </article>
  );
}
