import { getSettings } from "@/lib/settings";
import { saveSettings, sendTestEmailAction } from "@/lib/actions/admin-actions";
import { Card, Field, OkBanner, PageTitle, SaveButton } from "@/components/admin/ui";

export default async function AjustesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; test?: string; msg?: string }>;
}) {
  const [{ ok, test, msg }, settings] = await Promise.all([
    searchParams,
    getSettings(),
  ]);

  return (
    <div>
      <PageTitle
        title="Ajustes"
        subtitle="Notificaciones por email y código de analítica."
      />
      <OkBanner show={ok === "1"} />

      {test === "ok" ? (
        <div className="mb-6 rounded-xl border border-[var(--acid)] bg-[color-mix(in_srgb,var(--acid)_8%,transparent)] px-4 py-3 font-mono text-xs text-[var(--acid)]">
          ✓ Correo de prueba enviado. Revisa tu bandeja (y spam).
          {msg ? <span className="mt-1 block opacity-75">Servidor: {msg}</span> : null}
        </div>
      ) : null}
      {test === "err" ? (
        <div className="mb-6 rounded-xl border border-[var(--pink)] bg-[color-mix(in_srgb,var(--pink)_8%,transparent)] px-4 py-3 font-mono text-xs text-[var(--pink)]">
          ✗ Fallo del SMTP: {msg || "error desconocido"}
        </div>
      ) : null}

      <form action={saveSettings} className="flex flex-col gap-6">
        <Card>
          <h2 className="overline-label mb-5">Notificaciones de contacto (SMTP)</h2>
          <p className="mb-5 text-xs leading-relaxed text-[var(--muted)]">
            Con el SMTP configurado, cada mensaje del formulario te llega también
            por email (además de guardarse en Mensajes). Compatible con cualquier
            proveedor: Resend, Gmail, tu hosting… La contraseña se guarda cifrada.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Email de destino" hint="Donde recibes los avisos">
              <input
                name="notifyEmail"
                type="email"
                defaultValue={settings.notifyEmail ?? ""}
                placeholder="tu@email.com"
                className="field"
              />
            </Field>
            <Field label="Remitente (From)" hint="Opcional, ej: web@alejandrolamas.es">
              <input
                name="smtpFrom"
                defaultValue={settings.smtpFrom ?? ""}
                className="field"
              />
            </Field>
            <Field label="Servidor SMTP">
              <input
                name="smtpHost"
                defaultValue={settings.smtpHost ?? ""}
                placeholder="smtp.resend.com"
                className="field"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Puerto">
                <input
                  name="smtpPort"
                  defaultValue={settings.smtpPort ?? "587"}
                  className="field"
                />
              </Field>
              <Field label="Cifrado" hint="Automático: SSL en 465, STARTTLS en el resto">
                <select
                  name="smtpTls"
                  defaultValue={settings.smtpTls ?? (settings.smtpSecure === "true" ? "ssl" : "auto")}
                  className="field"
                >
                  <option value="auto">Automático</option>
                  <option value="starttls">STARTTLS (587)</option>
                  <option value="ssl">SSL/TLS (465)</option>
                </select>
              </Field>
            </div>
            <Field label="Usuario">
              <input
                name="smtpUser"
                defaultValue={settings.smtpUser ?? ""}
                autoComplete="off"
                className="field"
              />
            </Field>
            <Field label="Contraseña" hint="Se guarda cifrada; déjala vacía para no cambiarla">
              <input
                name="smtpPass"
                type="password"
                defaultValue={settings.smtpPass ? "········" : ""}
                autoComplete="new-password"
                className="field"
              />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="overline-label mb-5">Analítica</h2>
          <Field
            label="Código de seguimiento"
            hint="Pega el snippet completo (Google Analytics, Plausible, Umami…). Se inyecta en la web pública."
          >
            <textarea
              name="analyticsCode"
              rows={6}
              defaultValue={settings.analyticsCode ?? ""}
              placeholder={'<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>\n<script>…</script>'}
              className="field font-mono text-xs leading-relaxed"
            />
          </Field>
        </Card>

        <div>
          <SaveButton label="Guardar ajustes" />
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] p-6">
        <h2 className="overline-label mb-3">Probar la configuración</h2>
        <p className="mb-4 text-xs leading-relaxed text-[var(--muted)]">
          Envía un correo de prueba al email de destino usando los ajustes
          <strong> guardados</strong>. Si algo falla (credenciales, puerto,
          SSL…), verás aquí el error exacto del servidor.
        </p>
        <form action={sendTestEmailAction}>
          <button
            type="submit"
            className="rounded-lg border border-[var(--cyan)] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--cyan)] transition-colors hover:bg-[var(--cyan)] hover:text-[var(--ink)]"
          >
            Enviar correo de prueba
          </button>
        </form>
      </div>
    </div>
  );
}
