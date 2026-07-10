import { ReactNode } from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth-actions";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Panel — Alejandro Lamas",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="flex min-h-svh bg-[var(--ink)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between border-r border-[var(--line)] bg-[var(--ink-2)] p-6 lg:flex">
        <div>
          <div className="mb-10">
            <span className="font-display text-2xl font-extrabold">
              AL<span className="text-[var(--acid)]">·</span>
            </span>
            <p className="overline-label mt-1">Panel de control</p>
          </div>
          <AdminNav />
        </div>
        <div className="flex flex-col gap-3">
          <span className="truncate font-mono text-[11px] text-[var(--muted)]">
            {session.email}
          </span>
          <form action={logoutAction}>
            <button className="link-sweep font-mono text-xs uppercase tracking-widest text-[var(--pink)]">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Barra superior móvil */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[var(--line)] bg-[var(--ink-2)] px-5 py-3 lg:hidden">
        <span className="font-display text-lg font-extrabold">
          AL<span className="text-[var(--acid)]">·</span>{" "}
          <span className="font-mono text-[10px] font-normal uppercase tracking-widest text-[var(--muted)]">
            admin
          </span>
        </span>
        <form action={logoutAction}>
          <button className="font-mono text-[11px] uppercase tracking-widest text-[var(--pink)]">
            Salir
          </button>
        </form>
      </div>

      <main className="w-full px-5 pb-24 pt-20 lg:ml-60 lg:px-10 lg:pt-10">
        <div className="lg:hidden">
          <AdminNav horizontal />
        </div>
        {children}
      </main>
    </div>
  );
}
