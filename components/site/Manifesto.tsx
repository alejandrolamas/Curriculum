import Image from "next/image";

/** Panel Perfil: bio, foto y datos clave. */
export function Manifesto({
  bio,
  location,
  languages,
  aptitudes,
  availability,
}: {
  bio: string;
  location: string;
  languages: string[];
  aptitudes: string[];
  availability: string;
}) {
  return (
    <div>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--acid)]">01</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Perfil
        </h2>
      </header>

      <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
        <div className="group relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-2xl sm:w-44">
          <Image
            src="/profile.jpg"
            alt="Alejandro Lamas"
            fill
            sizes="176px"
            className="object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-light leading-relaxed text-[rgba(242,239,230,0.88)] md:text-base">
            {bio}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
              <span className="h-1 w-1 rounded-full bg-[var(--acid)]" />
              {location}
            </span>
            {languages.map((lang) => (
              <span
                key={lang}
                className="flex items-center gap-2 font-mono text-xs text-[var(--muted)]"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--acid)]" />
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="overline-label mb-3">Aptitudes</h3>
        <div className="flex flex-wrap gap-2">
          {aptitudes.map((apt) => (
            <span key={apt} className="chip">
              {apt}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--acid)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--acid)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--acid)]" />
          {availability}
        </span>
      </div>
    </div>
  );
}
