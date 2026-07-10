import { getSkills } from "@/lib/content";
import { deleteSkill, saveSkill } from "@/lib/actions/admin-actions";
import {
  Card,
  DangerButton,
  Details,
  Field,
  OkBanner,
  PageTitle,
  SaveButton,
} from "@/components/admin/ui";

function SkillForm({
  skill,
}: {
  skill?: {
    id: string;
    name: string;
    category: string;
    level: number;
    featured: boolean;
    order: number;
  };
}) {
  return (
    <form action={saveSkill} className="grid gap-4 md:grid-cols-5 md:items-end">
      {skill ? <input type="hidden" name="id" value={skill.id} /> : null}
      <Field label="Skill">
        <input name="name" defaultValue={skill?.name} required className="field" />
      </Field>
      <Field label="Categoría">
        <input
          name="category"
          defaultValue={skill?.category}
          required
          className="field"
          placeholder="E-commerce, Desarrollo…"
        />
      </Field>
      <Field label="Nivel (0-100)">
        <input
          name="level"
          type="number"
          min={0}
          max={100}
          defaultValue={skill?.level ?? 80}
          className="field"
        />
      </Field>
      <Field label="Orden">
        <input
          name="order"
          type="number"
          defaultValue={skill?.order ?? 0}
          className="field"
        />
      </Field>
      <div className="flex items-center gap-4 pb-1">
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={skill?.featured}
            className="h-4 w-4 accent-[var(--acid)]"
          />
          Destacada
        </label>
        <SaveButton label="OK" />
      </div>
    </form>
  );
}

export default async function SkillsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [{ ok }, skills] = await Promise.all([searchParams, getSkills()]);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div>
      <PageTitle
        title="Skills"
        subtitle="El arsenal. Las destacadas se pintan en verde ácido."
      />
      <OkBanner show={ok === "1"} />

      <Card className="mb-8">
        <h2 className="overline-label mb-4">Añadir skill</h2>
        <SkillForm />
      </Card>

      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="font-display mb-3 text-lg font-bold">{cat}</h2>
          <div className="flex flex-col gap-3">
            {skills
              .filter((s) => s.category === cat)
              .map((skill) => (
                <Details
                  key={skill.id}
                  summary={skill.name}
                  badge={`nivel ${skill.level}${skill.featured ? " · ★" : ""}`}
                >
                  <SkillForm skill={skill} />
                  <form
                    action={deleteSkill}
                    className="mt-4 border-t border-[var(--line)] pt-4"
                  >
                    <input type="hidden" name="id" value={skill.id} />
                    <DangerButton label="Eliminar skill" />
                  </form>
                </Details>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
