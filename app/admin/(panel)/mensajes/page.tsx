import { db } from "@/lib/db";
import { deleteMessage, toggleMessageRead } from "@/lib/actions/admin-actions";
import { Card, PageTitle } from "@/components/admin/ui";

export default async function MensajesAdminPage() {
  const messages = await db.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageTitle
        title="Mensajes"
        subtitle="Bandeja de entrada del formulario de contacto. Todo lo que llegó pasó el escudo anti-bots."
      />

      {messages.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Bandeja vacía.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <Card
              key={m.id}
              className={m.read ? "opacity-60" : "border-[var(--acid)]"}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold">
                    {!m.read ? (
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--acid)]" />
                    ) : null}
                    {m.name}
                  </h2>
                  <a
                    href={`mailto:${m.email}`}
                    className="font-mono text-xs text-[var(--acid)] underline underline-offset-4"
                  >
                    {m.email}
                  </a>
                  {m.subject ? (
                    <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                      {m.subject}
                    </p>
                  ) : null}
                </div>
                <span className="font-mono text-[11px] text-[var(--muted)]">
                  {new Intl.DateTimeFormat("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(m.createdAt)}
                </span>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                {m.body}
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-[var(--line)] pt-4">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="rounded-lg border border-[var(--line)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--acid)] hover:text-[var(--acid)]">
                    {m.read ? "Marcar no leído" : "Marcar leído"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="rounded-lg border border-[var(--pink)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--pink)] transition-colors hover:bg-[var(--pink)] hover:text-[var(--ink)]">
                    Eliminar
                  </button>
                </form>
                {m.userAgent ? (
                  <span className="ml-auto hidden max-w-[300px] truncate font-mono text-[10px] text-[var(--muted)] md:block">
                    {m.userAgent}
                  </span>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
