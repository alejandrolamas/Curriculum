export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string | null;
  summary: string;
  highlights: string[];
  tech: string[];
  accent: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  start: string;
  end: string;
  description: string | null;
}

/** Panel Trayectoria: experiencia + formación. */
export function ExperienceTimeline({
  experiences,
  education,
}: {
  experiences: ExperienceItem[];
  education: EducationItem[];
}) {
  return (
    <div>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--acid)]">02</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Trayectoria
        </h2>
      </header>

      <div className="flex flex-col">
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="group hairline-t relative py-6 first:border-t-0 first:pt-0"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-out group-hover:w-full"
              style={{ background: exp.accent }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold leading-tight md:text-xl">
                {exp.role}
              </h3>
              <span
                className="font-mono text-[11px] tabular-nums"
                style={{ color: exp.accent }}
              >
                {exp.start} — {exp.end ?? "Actualidad"}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs" style={{ color: exp.accent }}>
              {exp.company}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {exp.summary}
            </p>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {exp.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[13px]">
                  <span
                    className="mt-[7px] h-[3px] w-3.5 shrink-0"
                    style={{ background: exp.accent }}
                  />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span key={t} className="chip !text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="overline-label mb-4">Formación</h3>
        <div className="flex flex-col gap-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-xl border border-[var(--line)] p-4 transition-colors duration-300 hover:border-[var(--acid)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-sm font-bold leading-snug md:text-base">
                  {edu.degree}
                </h4>
                <span className="font-mono text-[11px] tabular-nums text-[var(--acid)]">
                  {edu.start} — {edu.end}
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                {edu.institution}
              </p>
              {edu.description ? (
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                  {edu.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
