import { getEducation } from "@/lib/content";
import { deleteEducation, saveEducation } from "@/lib/actions/admin-actions";
import {
  DangerButton,
  Details,
  Field,
  OkBanner,
  PageTitle,
  SaveButton,
} from "@/components/admin/ui";

function EducationForm({
  edu,
}: {
  edu?: {
    id: string;
    degree: string;
    institution: string;
    start: string;
    end: string;
    description: string | null;
    order: number;
  };
}) {
  return (
    <form action={saveEducation} className="grid gap-5 md:grid-cols-2">
      {edu ? <input type="hidden" name="id" value={edu.id} /> : null}
      <div className="md:col-span-2">
        <Field label="Titulación">
          <input name="degree" defaultValue={edu?.degree} required className="field" />
        </Field>
      </div>
      <Field label="Centro">
        <input
          name="institution"
          defaultValue={edu?.institution}
          required
          className="field"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Año inicio">
          <input name="start" defaultValue={edu?.start} required className="field" />
        </Field>
        <Field label="Año fin">
          <input name="end" defaultValue={edu?.end} required className="field" />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Descripción (opcional)">
          <textarea
            name="description"
            defaultValue={edu?.description ?? ""}
            rows={2}
            className="field"
          />
        </Field>
      </div>
      <Field label="Orden">
        <input
          name="order"
          type="number"
          defaultValue={edu?.order ?? 0}
          className="field"
        />
      </Field>
      <div className="flex items-end">
        <SaveButton />
      </div>
    </form>
  );
}

export default async function EducacionAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [{ ok }, education] = await Promise.all([searchParams, getEducation()]);

  return (
    <div>
      <PageTitle title="Educación" subtitle="Formación académica." />
      <OkBanner show={ok === "1"} />

      <div className="flex flex-col gap-4">
        <Details summary="+ Nueva formación" badge="crear">
          <EducationForm />
        </Details>

        {education.map((edu) => (
          <Details
            key={edu.id}
            summary={edu.degree}
            badge={`${edu.start} — ${edu.end}`}
          >
            <EducationForm edu={edu} />
            <form action={deleteEducation} className="mt-4 border-t border-[var(--line)] pt-4">
              <input type="hidden" name="id" value={edu.id} />
              <DangerButton label="Eliminar formación" />
            </form>
          </Details>
        ))}
      </div>
    </div>
  );
}
