import { db } from "@/lib/db";

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export function asStats(value: unknown): { value: string; label: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is { value: string; label: string } =>
      typeof v === "object" && v !== null && "value" in v && "label" in v,
  );
}

export async function getProfile() {
  return db.profile.findUnique({ where: { id: 1 } });
}

export async function getExperiences() {
  return db.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getEducation() {
  return db.education.findMany({ orderBy: { order: "asc" } });
}

export async function getSkills() {
  return db.skill.findMany({ orderBy: { order: "asc" } });
}

export async function getProjects(onlyPublished = true) {
  return db.project.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export async function getPosts(onlyPublished = true) {
  return db.post.findMany({
    where: onlyPublished
      ? { published: true, publishedAt: { lte: new Date() } }
      : undefined,
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPost(slug: string) {
  return db.post.findUnique({ where: { slug } });
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
