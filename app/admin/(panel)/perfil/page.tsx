import { getProfile, asStringArray, asStats } from "@/lib/content";
import { saveProfile } from "@/lib/actions/admin-actions";
import { Card, Field, OkBanner, PageTitle, SaveButton } from "@/components/admin/ui";

export default async function PerfilAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const [{ ok }, profile] = await Promise.all([searchParams, getProfile()]);
  if (!profile) return <p>No hay perfil creado. Ejecuta el seed.</p>;

  return (
    <div>
      <PageTitle
        title="Perfil"
        subtitle="Hero, manifiesto y datos de contacto de la web."
      />
      <OkBanner show={ok === "1"} />

      <form action={saveProfile} className="flex flex-col gap-6">
        <Card className="grid gap-5 md:grid-cols-2">
          <Field label="Nombre">
            <input name="name" defaultValue={profile.name} required className="field" />
          </Field>
          <Field label="Rol (aparece junto al nombre)">
            <input name="role" defaultValue={profile.role} required className="field" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Tagline (frase bajo el nombre en el hero)">
              <input name="tagline" defaultValue={profile.tagline} required className="field" />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Bio / Manifiesto (se ilumina palabra a palabra al hacer scroll)">
              <textarea
                name="bio"
                defaultValue={profile.bio}
                rows={5}
                required
                className="field"
              />
            </Field>
          </div>
        </Card>

        <Card className="grid gap-5 md:grid-cols-2">
          <Field label="Ubicación">
            <input name="location" defaultValue={profile.location} className="field" />
          </Field>
          <Field label="Disponibilidad">
            <input name="availability" defaultValue={profile.availability} className="field" />
          </Field>
          <Field label="Email público">
            <input name="email" type="email" defaultValue={profile.email} className="field" />
          </Field>
          <Field label="Teléfono">
            <input name="phone" defaultValue={profile.phone} className="field" />
          </Field>
          <Field label="LinkedIn (URL)">
            <input name="linkedin" defaultValue={profile.linkedin} className="field" />
          </Field>
          <Field label="GitHub (URL)">
            <input name="github" defaultValue={profile.github} className="field" />
          </Field>
        </Card>

        <Card className="grid gap-5 md:grid-cols-3">
          <Field label="Stats del hero" hint="Una por línea: valor|etiqueta">
            <textarea
              name="stats"
              rows={5}
              className="field font-mono text-xs"
              defaultValue={asStats(profile.stats)
                .map((s) => `${s.value}|${s.label}`)
                .join("\n")}
            />
          </Field>
          <Field label="Aptitudes" hint="Una por línea">
            <textarea
              name="aptitudes"
              rows={5}
              className="field font-mono text-xs"
              defaultValue={asStringArray(profile.aptitudes).join("\n")}
            />
          </Field>
          <Field label="Idiomas" hint="Uno por línea">
            <textarea
              name="languages"
              rows={5}
              className="field font-mono text-xs"
              defaultValue={asStringArray(profile.languages).join("\n")}
            />
          </Field>
        </Card>

        <div>
          <SaveButton label="Guardar perfil" />
        </div>
      </form>
    </div>
  );
}
