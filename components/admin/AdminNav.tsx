"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/perfil", label: "Perfil" },
  { href: "/admin/experiencia", label: "Experiencia" },
  { href: "/admin/educacion", label: "Educación" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/proyectos", label: "Proyectos" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/mensajes", label: "Mensajes" },
  { href: "/admin/ajustes", label: "Ajustes" },
];

export function AdminNav({ horizontal = false }: { horizontal?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={
        horizontal
          ? "mb-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
          : "flex flex-col gap-1"
      }
    >
      {items.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              active
                ? "bg-[var(--acid)] text-[var(--ink)]"
                : "text-[var(--muted)] hover:bg-[var(--ink-3)] hover:text-[var(--bone)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
