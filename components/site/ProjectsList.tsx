export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  client: string | null;
  kind: string;
  description: string;
  tech: string[];
  link: string | null;
  year: string | null;
  featured: boolean;
  accent: string;
}

/** Panel Proyectos: tarjetas apiladas, limpias y clicables. */
export function ProjectsList({ projects }: { projects: ProjectItem[] }) {
  return (
    <div>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--acid)]">04</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Proyectos
        </h2>
      </header>

      <div className="flex flex-col gap-4">
        {projects.map((project, i) => {
          const card = (
            <article
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] p-5 transition-colors duration-400 hover:border-[var(--acid)] md:p-6"
              data-cursor-label={project.link ? "Ver" : undefined}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-1 opacity-70 transition-opacity group-hover:opacity-100"
                style={{ background: project.accent }}
              />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold leading-tight md:text-xl">
                      {project.name}
                    </h3>
                    {project.year ? (
                      <span className="font-mono text-[11px] text-[var(--muted)]">
                        {project.year}
                      </span>
                    ) : null}
                  </div>
                  <p
                    className="mt-1 font-mono text-[11px] uppercase tracking-widest"
                    style={{ color: project.accent }}
                  >
                    {project.kind}
                  </p>
                </div>
                <span
                  className="font-display shrink-0 text-2xl font-extrabold tabular-nums opacity-20 transition-opacity group-hover:opacity-90"
                  style={{ color: project.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((t) => (
                    <span key={t} className="chip !text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <span className="font-mono text-base text-[var(--acid)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                ) : null}
              </div>
            </article>
          );

          return project.link ? (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {card}
            </a>
          ) : (
            <div key={project.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
