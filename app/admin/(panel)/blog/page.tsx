import { getPosts, asStringArray, formatDate } from "@/lib/content";
import { deletePost, savePost } from "@/lib/actions/admin-actions";
import {
  DangerButton,
  Details,
  Field,
  OkBanner,
  PageTitle,
  SaveButton,
} from "@/components/admin/ui";

function toDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function PostForm({
  post,
}: {
  post?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: unknown;
    readTime: string | null;
    featured: boolean;
    published: boolean;
    publishedAt: Date;
  };
}) {
  return (
    <form action={savePost} className="grid gap-5 md:grid-cols-2">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="md:col-span-2">
        <Field label="Título">
          <input name="title" defaultValue={post?.title} required className="field" />
        </Field>
      </div>
      <Field label="Slug" hint="Vacío = se genera del título">
        <input name="slug" defaultValue={post?.slug} className="field font-mono text-xs" />
      </Field>
      <Field label="Fecha de publicación" hint="Futura = programado, no visible aún">
        <input
          name="publishedAt"
          type="date"
          defaultValue={post ? toDateInput(post.publishedAt) : toDateInput(new Date())}
          className="field"
        />
      </Field>
      <div className="md:col-span-2">
        <Field label="Extracto (aparece en listados y SEO)">
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt}
            rows={2}
            required
            className="field"
          />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Contenido (Markdown)" hint="Soporta **negrita**, listas, ```código```, tablas…">
          <textarea
            name="content"
            defaultValue={post?.content}
            rows={18}
            required
            className="field font-mono text-xs leading-relaxed"
          />
        </Field>
      </div>
      <Field label="Tags" hint="Uno por línea">
        <textarea
          name="tags"
          rows={3}
          className="field font-mono text-xs"
          defaultValue={asStringArray(post?.tags).join("\n")}
        />
      </Field>
      <Field label="Tiempo de lectura" hint="Ej: 12 min">
        <input name="readTime" defaultValue={post?.readTime ?? ""} className="field" />
      </Field>
      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured}
            className="h-4 w-4 accent-[var(--acid)]"
          />
          Destacado
        </label>
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 accent-[var(--acid)]"
          />
          Publicado
        </label>
        <SaveButton label={post ? "Guardar cambios" : "Crear post"} />
      </div>
    </form>
  );
}

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [{ ok }, posts] = await Promise.all([searchParams, getPosts(false)]);

  return (
    <div>
      <PageTitle
        title="Blog"
        subtitle="Publica, programa con fecha futura o guarda borradores."
      />
      <OkBanner show={ok === "1"} />

      <div className="flex flex-col gap-4">
        <Details summary="+ Nuevo artículo" badge="crear">
          <PostForm />
        </Details>

        {posts.map((post) => (
          <Details
            key={post.id}
            summary={post.title}
            badge={`${formatDate(post.publishedAt)}${post.published ? "" : " · borrador"}${
              post.publishedAt > new Date() ? " · programado" : ""
            }`}
          >
            <PostForm post={post} />
            <form action={deletePost} className="mt-4 border-t border-[var(--line)] pt-4">
              <input type="hidden" name="id" value={post.id} />
              <DangerButton label="Eliminar post" />
            </form>
          </Details>
        ))}
      </div>
    </div>
  );
}
