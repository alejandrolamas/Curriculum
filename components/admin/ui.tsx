import { ReactNode } from "react";

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>
      ) : null}
    </header>
  );
}

export function OkBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="mb-6 rounded-xl border border-[var(--acid)] bg-[color-mix(in_srgb,var(--acid)_8%,transparent)] px-4 py-3 font-mono text-xs text-[var(--acid)]">
      ✓ Guardado. La web pública se actualizará al instante.
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="overline-label">{label}</span>
      {children}
      {hint ? (
        <span className="text-[11px] text-[var(--muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

export function SaveButton({ label = "Guardar" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-[var(--acid)] px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-[var(--ink)] transition-transform hover:scale-[1.02]"
    >
      {label}
    </button>
  );
}

export function DangerButton({ label = "Eliminar" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="rounded-lg border border-[var(--pink)] px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--pink)] transition-colors hover:bg-[var(--pink)] hover:text-[var(--ink)]"
    >
      {label}
    </button>
  );
}

export function Details({
  summary,
  badge,
  children,
  open = false,
}: {
  summary: string;
  badge?: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details
      open={open}
      className="group rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] open:border-[var(--acid)]"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-display text-base font-bold [&::-webkit-details-marker]:hidden">
        <span className="truncate">{summary}</span>
        <span className="flex items-center gap-3">
          {badge ? (
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              {badge}
            </span>
          ) : null}
          <span className="text-[var(--acid)] transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <div className="border-t border-[var(--line)] p-6">{children}</div>
    </details>
  );
}
