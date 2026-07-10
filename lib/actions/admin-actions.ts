"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

/** textarea → array: una entrada por línea, sin vacíos. */
function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function str(value: FormDataEntryValue | null): string {
  return String(value ?? "").trim();
}

function num(value: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
}

/* ───────────────────────── Perfil ───────────────────────── */

export async function saveProfile(formData: FormData) {
  await requireAdmin();
  const stats = lines(formData.get("stats")).map((line) => {
    const [value, ...rest] = line.split("|");
    return { value: value.trim(), label: rest.join("|").trim() };
  });
  await db.profile.update({
    where: { id: 1 },
    data: {
      name: str(formData.get("name")),
      role: str(formData.get("role")),
      tagline: str(formData.get("tagline")),
      bio: str(formData.get("bio")),
      location: str(formData.get("location")),
      email: str(formData.get("email")),
      phone: str(formData.get("phone")),
      linkedin: str(formData.get("linkedin")),
      github: str(formData.get("github")),
      availability: str(formData.get("availability")),
      languages: lines(formData.get("languages")),
      aptitudes: lines(formData.get("aptitudes")),
      stats,
    },
  });
  revalidateSite();
  redirect("/admin/perfil?ok=1");
}

/* ───────────────────────── Experiencia ───────────────────────── */

export async function saveExperience(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const data = {
    role: str(formData.get("role")),
    company: str(formData.get("company")),
    start: str(formData.get("start")),
    end: str(formData.get("end")) || null,
    summary: str(formData.get("summary")),
    highlights: lines(formData.get("highlights")),
    tech: lines(formData.get("tech")),
    accent: str(formData.get("accent")) || "#c8f31d",
    order: num(formData.get("order")),
  };
  if (id) await db.experience.update({ where: { id }, data });
  else await db.experience.create({ data });
  revalidateSite();
  redirect("/admin/experiencia?ok=1");
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  await db.experience.delete({ where: { id: str(formData.get("id")) } });
  revalidateSite();
  redirect("/admin/experiencia?ok=1");
}

/* ───────────────────────── Educación ───────────────────────── */

export async function saveEducation(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const data = {
    degree: str(formData.get("degree")),
    institution: str(formData.get("institution")),
    start: str(formData.get("start")),
    end: str(formData.get("end")),
    description: str(formData.get("description")) || null,
    order: num(formData.get("order")),
  };
  if (id) await db.education.update({ where: { id }, data });
  else await db.education.create({ data });
  revalidateSite();
  redirect("/admin/educacion?ok=1");
}

export async function deleteEducation(formData: FormData) {
  await requireAdmin();
  await db.education.delete({ where: { id: str(formData.get("id")) } });
  revalidateSite();
  redirect("/admin/educacion?ok=1");
}

/* ───────────────────────── Skills ───────────────────────── */

export async function saveSkill(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const data = {
    name: str(formData.get("name")),
    category: str(formData.get("category")),
    level: Math.min(Math.max(num(formData.get("level"), 80), 0), 100),
    featured: formData.get("featured") === "on",
    order: num(formData.get("order")),
  };
  if (id) await db.skill.update({ where: { id }, data });
  else await db.skill.create({ data });
  revalidateSite();
  redirect("/admin/skills?ok=1");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  await db.skill.delete({ where: { id: str(formData.get("id")) } });
  revalidateSite();
  redirect("/admin/skills?ok=1");
}

/* ───────────────────────── Proyectos ───────────────────────── */

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const name = str(formData.get("name"));
  const data = {
    slug: str(formData.get("slug")) || slugify(name),
    name,
    client: str(formData.get("client")) || null,
    kind: str(formData.get("kind")),
    description: str(formData.get("description")),
    tech: lines(formData.get("tech")),
    link: str(formData.get("link")) || null,
    year: str(formData.get("year")) || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    accent: str(formData.get("accent")) || "#c8f31d",
    order: num(formData.get("order")),
  };
  if (id) await db.project.update({ where: { id }, data });
  else await db.project.create({ data });
  revalidateSite();
  redirect("/admin/proyectos?ok=1");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  await db.project.delete({ where: { id: str(formData.get("id")) } });
  revalidateSite();
  redirect("/admin/proyectos?ok=1");
}

/* ───────────────────────── Blog ───────────────────────── */

export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const title = str(formData.get("title"));
  const publishedAtRaw = str(formData.get("publishedAt"));
  const data = {
    slug: str(formData.get("slug")) || slugify(title),
    title,
    excerpt: str(formData.get("excerpt")),
    content: String(formData.get("content") ?? ""),
    tags: lines(formData.get("tags")),
    readTime: str(formData.get("readTime")) || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
  };
  if (id) await db.post.update({ where: { id }, data });
  else await db.post.create({ data });
  revalidateSite();
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog?ok=1");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  await db.post.delete({ where: { id: str(formData.get("id")) } });
  revalidateSite();
  redirect("/admin/blog?ok=1");
}

/* ───────────────────────── Ajustes ───────────────────────── */

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const { setSetting, encryptSecret } = await import("@/lib/settings");
  await setSetting("notifyEmail", str(formData.get("notifyEmail")));
  await setSetting("smtpHost", str(formData.get("smtpHost")));
  await setSetting("smtpPort", str(formData.get("smtpPort")));
  await setSetting("smtpUser", str(formData.get("smtpUser")));
  await setSetting("smtpFrom", str(formData.get("smtpFrom")));
  const tls = str(formData.get("smtpTls"));
  await setSetting("smtpTls", ["auto", "ssl", "starttls"].includes(tls) ? tls : "auto");
  await setSetting("smtpSecure", "");
  const pass = String(formData.get("smtpPass") ?? "");
  if (pass && pass !== "········") {
    await setSetting("smtpPass", encryptSecret(pass));
  }
  await setSetting("analyticsCode", String(formData.get("analyticsCode") ?? "").trim());
  revalidateSite();
  redirect("/admin/ajustes?ok=1");
}

export async function sendTestEmailAction() {
  await requireAdmin();
  const { sendTestEmail } = await import("@/lib/mailer");
  let response = "";
  try {
    response = await sendTestEmail();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    redirect(`/admin/ajustes?test=err&msg=${encodeURIComponent(msg.slice(0, 200))}`);
  }
  redirect(`/admin/ajustes?test=ok&msg=${encodeURIComponent(response.slice(0, 160))}`);
}

/* ───────────────────────── Mensajes ───────────────────────── */

export async function toggleMessageRead(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get("id"));
  const message = await db.message.findUnique({ where: { id } });
  if (message) {
    await db.message.update({ where: { id }, data: { read: !message.read } });
  }
  revalidatePath("/admin/mensajes");
  redirect("/admin/mensajes");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  await db.message.delete({ where: { id: str(formData.get("id")) } });
  revalidatePath("/admin/mensajes");
  redirect("/admin/mensajes");
}
