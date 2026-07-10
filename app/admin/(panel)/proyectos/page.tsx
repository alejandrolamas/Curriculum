import { getProjects, asStringArray } from "@/lib/content";
import { deleteProject, saveProject } from "@/lib/actions/admin-actions";
import {
  DangerButton,
  Details,
  Field,
  OkBanner,
  PageTitle,
  SaveButton,
} from "@/components/admin/ui";

function ProjectForm({
  project,
}: {
  project?: {
    id: string;
    slug: string;
    name: string;
    client: string | null;
    kind: string;
    description: string;
    tech: unknown;
    link: string | null;
    year: string | null;
    featured: boolean;
    published: boolean;
    accent: string;
    order: number;
  };
}) {
  return (
    <form action={saveProject} className="grid gap-5 md:grid-cols-2">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <Field label="Nombre">
        <input name="name" defaultValue={project?.name} required className="field" />
      </Field>
      <Field label="Slug" hint="Vacío = se genera del nombre">
        <input name="slug" defaultValue={project?.slug} className="field font-mono text-xs" />
      </Field>
      <Field label="Cliente">
        <input name="client" defaultValue={project?.client ?? ""} className="field" />
      </Field>
      <Field label="Tipo" hint="Ej: E-commerce internacional · Shopify Plus">
        <input name="kind" defaultValue={project?.kind} required className="field" />
      </Field>
      <div className="md:col-span-2">
        <Field label="Descripción">
          <textarea
            name="description"
            defaultValue={project?.description}
            rows={3}
            required
            className="field"
          />
        </Field>
      </div>
      <Field label="Tecnologías" hint="Una por línea">
        <textarea
          name="tech"
          rows={4}
          className="field font-mono text-xs"
          defaultValue={asStringArray(project?.tech).join("\n")}
        />
      </Field>
      <div className="grid gap-4">
        <Field label="Enlace (URL, opcional)">
          <input name="link" defaultValue={project?.link ?? ""} className="field" />
        </Field>
        <Field label="Año / periodo">
          <input name="year" defaultValue={project?.year ?? ""} className="field" />
        </Field>
      </div>
      <Field label="Color de acento">
        <input
          name="accent"
          type="color"
          defaultValue={project?.accent ?? "#c8f31d"}
          className="field h-12 !p-1"
        />
      </Field>
      <Field label="Orden">
        <input
          name="order"
          type="number"
          defaultValue={project?.order ?? 0}
          className="field"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="h-4 w-4 accent-[var(--acid)]"
          />
          Destacado
        </label>
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project?.published ?? true}
            className="h-4 w-4 accent-[var(--acid)]"
          />
          Publicado
        </label>
        <SaveButton />
      </div>
    </form>
  );
}

export default async function ProyectosAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [{ ok }, projects] = await Promise.all([searchParams, getProjects(false)]);

  return (
    <div>
      <PageTitle
        title="Proyectos"
        subtitle="El rail horizontal de la home. Orden 0 aparece primero."
      />
      <OkBanner show={ok === "1"} />

      <div className="flex flex-col gap-4">
        <Details summary="+ Nuevo proyecto" badge="crear">
          <ProjectForm />
        </Details>

        {projects.map((project) => (
          <Details
            key={project.id}
            summary={project.name}
            badge={`${project.kind}${project.published ? "" : " · borrador"}`}
          >
            <ProjectForm project={project} />
            <form action={deleteProject} className="mt-4 border-t border-[var(--line)] pt-4">
              <input type="hidden" name="id" value={project.id} />
              <DangerButton label="Eliminar proyecto" />
            </form>
          </Details>
        ))}
      </div>
    </div>
  );
}
