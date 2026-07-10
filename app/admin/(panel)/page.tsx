import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/content";
import { Card, PageTitle } from "@/components/admin/ui";

export default async function AdminDashboard() {
  const [experiences, education, skills, projects, posts, messages, unread] =
    await Promise.all([
      db.experience.count(),
      db.education.count(),
      db.skill.count(),
      db.project.count(),
      db.post.count(),
      db.message.count(),
      db.message.count({ where: { read: false } }),
    ]);

  const latestMessages = await db.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Experiencia", value: experiences, href: "/admin/experiencia" },
    { label: "Educación", value: education, href: "/admin/educacion" },
    { label: "Skills", value: skills, href: "/admin/skills" },
    { label: "Proyectos", value: projects, href: "/admin/proyectos" },
    { label: "Posts", value: posts, href: "/admin/blog" },
    { label: "Mensajes", value: messages, href: "/admin/mensajes", accent: unread > 0 },
  ];

  return (
    <div>
      <PageTitle
        title="Dashboard"
        subtitle="Todo lo que ve el mundo, editable desde aquí."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-colors hover:border-[var(--acid)]">
              <div
                className={`font-display text-3xl font-extrabold ${
                  s.accent ? "text-[var(--acid)]" : ""
                }`}
              >
                {s.value}
              </div>
              <div className="overline-label mt-1">{s.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display mb-4 text-xl font-bold">
          Últimos mensajes{" "}
          {unread > 0 ? (
            <span className="ml-2 rounded-full bg-[var(--acid)] px-2.5 py-0.5 font-mono text-xs text-[var(--ink)]">
              {unread} sin leer
            </span>
          ) : null}
        </h2>
        {latestMessages.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Aún no hay mensajes. El escudo anti-bots está en guardia.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {latestMessages.map((m) => (
              <Link key={m.id} href="/admin/mensajes">
                <Card className="flex items-center justify-between gap-4 !p-4 transition-colors hover:border-[var(--acid)]">
                  <div className="min-w-0">
                    <span className="font-medium">
                      {!m.read ? (
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--acid)]" />
                      ) : null}
                      {m.name}
                    </span>
                    <span className="ml-3 font-mono text-xs text-[var(--muted)]">
                      {m.email}
                    </span>
                    <p className="mt-1 truncate text-sm text-[var(--muted)]">
                      {m.subject ? `${m.subject} — ` : ""}
                      {m.body}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-[var(--muted)]">
                    {formatDate(m.createdAt)}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
