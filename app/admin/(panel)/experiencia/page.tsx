import { getExperiences, asStringArray } from "@/lib/content";
import { deleteExperience, saveExperience } from "@/lib/actions/admin-actions";
import {
  DangerButton,
  Details,
  Field,
  OkBanner,
  PageTitle,
  SaveButton,
} from "@/components/admin/ui";

function ExperienceForm({
  exp,
}: {
  exp?: {
    id: string;
    role: string;
    company: string;
    start: string;
    end: string | null;
    summary: string;
    highlights: unknown;
    tech: unknown;
    accent: string;
    order: number;
  };
}) {
  return (
    <form action={saveExperience} className="grid gap-5 md:grid-cols-2">
      {exp ? <input type="hidden" name="id" value={exp.id} /> : null}
      <Field label="Puesto">
        <input name="role" defaultValue={exp?.role} required className="field" />
      </Field>
      <Field label="Empresa">
        <input name="company" defaultValue={exp?.company} required className="field" />
      </Field>
      <Field label="Año inicio">
        <input name="start" defaultValue={exp?.start} required className="field" />
      </Field>
      <Field label="Año fin" hint="Vacío = Actualidad">
        <input name="end" defaultValue={exp?.end ?? ""} className="field" />
      </Field>
      <div className="md:col-span-2">
        <Field label="Resumen">
          <textarea
            name="summary"
            defaultValue={exp?.summary}
            rows={4}
            required
            className="field"
          />
        </Field>
      </div>
      <Field label="Highlights" hint="Uno por línea">
        <textarea
          name="highlights"
          rows={4}
          className="field font-mono text-xs"
          defaultValue={asStringArray(exp?.highlights).join("\n")}
        />
      </Field>
      <Field label="Tecnologías" hint="Una por línea">
        <textarea
          name="tech"
          rows={4}
          className="field font-mono text-xs"
          defaultValue={asStringArray(exp?.tech).join("\n")}
        />
      </Field>
      <Field label="Color de acento">
        <input
          name="accent"
          type="color"
          defaultValue={exp?.accent ?? "#c8f31d"}
          className="field h-12 !p-1"
        />
      </Field>
      <Field label="Orden" hint="0 = primero (más reciente)">
        <input
          name="order"
          type="number"
          defaultValue={exp?.order ?? 0}
          className="field"
        />
      </Field>
      <div className="flex items-center gap-3 md:col-span-2">
        <SaveButton />
      </div>
    </form>
  );
}

export default async function ExperienciaAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [{ ok }, experiences] = await Promise.all([searchParams, getExperiences()]);

  return (
    <div>
      <PageTitle
        title="Experiencia"
        subtitle="La sección Trayectoria de la web, en el orden que definas."
      />
      <OkBanner show={ok === "1"} />

      <div className="flex flex-col gap-4">
        <Details summary="+ Nueva experiencia" badge="crear">
          <ExperienceForm />
        </Details>

        {experiences.map((exp) => (
          <Details
            key={exp.id}
            summary={`${exp.role} — ${exp.company}`}
            badge={`${exp.start} → ${exp.end ?? "hoy"}`}
          >
            <ExperienceForm exp={exp} />
            <form action={deleteExperience} className="mt-4 border-t border-[var(--line)] pt-4">
              <input type="hidden" name="id" value={exp.id} />
              <DangerButton label="Eliminar experiencia" />
            </form>
          </Details>
        ))}
      </div>
    </div>
  );
}
