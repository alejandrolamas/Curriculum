/**
 * Seed de contenido: perfil, experiencia, educación, skills, proyectos y blog.
 * Los textos están reescritos con enfoque de reclutador tech: evolución
 * de full stack developer a technical project manager.
 */
import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { oldBlogPosts } from "./blog-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

/** Convierte el content[] del blog antiguo a un único markdown. */
function toMarkdown(content: string[]): string {
  return content
    .map((block) => {
      if (block.startsWith("$ ")) return "```bash\n" + block + "\n```";
      return block;
    })
    .join("\n\n");
}

async function main() {
  // ── Admin ────────────────────────────────────────────────────────────
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error(
      "Define SEED_ADMIN_PASSWORD en el entorno para crear el usuario admin.",
    );
  }
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await db.user.upsert({
    where: { email: "alamas@dro.studio" },
    update: { passwordHash },
    create: {
      email: "alamas@dro.studio",
      passwordHash,
      name: "Alejandro Lamas",
    },
  });

  // ── Perfil ───────────────────────────────────────────────────────────
  const profile = {
    name: "Alejandro Lamas",
    role: "Technical Project Manager · E-commerce",
    tagline:
      "Technical Project Manager: lidero equipos y proyectos e-commerce internacionales, con el desarrollo como herramienta diaria.",
    bio: "Más de 10 años construyendo y dirigiendo producto digital. Empecé como desarrollador full stack y he evolucionado hacia la gestión técnica de proyectos: hoy dirijo la plataforma e-commerce de Yodeyma y Verset, operando en más de 27 países, con equipo interno y proveedores a mi cargo. Sigo desarrollando a diario — Shopify Plus, Liquid, GraphQL, apps y UI extensions — porque la mejor gestión técnica se hace con las manos en el código.",
    location: "Madrid, España",
    email: "hola@alejandrolamas.es",
    phone: "+34 667 894 561",
    linkedin: "https://www.linkedin.com/in/alejandrolamasperez/",
    github: "https://github.com/alejandrolamas",
    availability: "Abierto a escuchar nuevos retos",
    languages: ["Español (nativo)", "Inglés (profesional)"],
    stats: [
      { value: "10+", label: "Años de experiencia" },
      { value: "100+", label: "Proyectos entregados" },
      { value: "7+", label: "Años liderando equipos" },
      { value: "20+", label: "Tecnologías dominadas" },
    ],
    aptitudes: [
      "Liderazgo de equipos",
      "Negociación con proveedores",
      "Visión de producto",
      "Comunicación clara",
      "Resolución bajo presión",
      "Mentalidad autodidacta",
    ],
  };
  await db.profile.upsert({
    where: { id: 1 },
    update: profile,
    create: { id: 1, ...profile },
  });

  // ── Experiencia ──────────────────────────────────────────────────────
  await db.experience.deleteMany();
  const experiences = [
    {
      role: "Technical E-commerce Project Manager",
      company: "Cipselo SL · Yodeyma & Verset",
      start: "2025",
      end: null,
      summary:
        "Dirijo la operación e-commerce de Yodeyma y Verset: dos marcas vendiendo en más de 27 países sobre Shopify Plus. Gestiono el roadmap técnico, un equipo interno y una red de proveedores, y sigo desarrollando a diario: temas en Liquid, integraciones GraphQL con ERP y logística, apps a medida y UI extensions para checkout y admin. Responsable de internacionalización, rendimiento y conversión de la plataforma.",
      highlights: [
        "E-commerce activo en 27+ países",
        "Equipo interno y proveedores a cargo",
        "Shopify Plus: Liquid, GraphQL, apps, UI extensions",
        "Roadmap técnico y estrategia de conversión",
      ],
      tech: ["Shopify Plus", "Liquid", "GraphQL", "React", "Node.js", "UI Extensions"],
      accent: "#c8f31d",
      order: 0,
    },
    {
      role: "Lead Developer & Project Manager",
      company: "Consejo General de Colegios Veterinarios de España",
      start: "2024",
      end: "2025",
      summary:
        "Lideré la transformación digital del órgano que coordina la profesión veterinaria en España: arquitectura y desarrollo de plataformas internas, gestión de proveedores y coordinación entre áreas para digitalizar procesos colegiales de ámbito estatal.",
      highlights: [
        "Arquitectura de software institucional",
        "Gestión de equipos y proveedores",
        "Transformación digital de procesos",
      ],
      tech: ["PHP", "JavaScript", "MySQL", "WordPress"],
      accent: "#7c5cff",
      order: 1,
    },
    {
      role: "Founder & Project Manager",
      company: "Gratum Corp SL",
      start: "2020",
      end: "2024",
      summary:
        "Fundé y dirigí una agencia de desarrollo y marketing digital. Pasé de programar cada entrega a diseñar procesos, presupuestos y equipos: gestión de una cartera de clientes de sectores diversos con Kanban y Scrum, entregando desde e-commerce hasta plataformas a medida.",
      highlights: [
        "Fundación y dirección de la empresa",
        "Gestión de cartera de clientes",
        "Metodologías Kanban y Scrum",
      ],
      tech: ["WordPress", "Shopify", "PHP", "React", "Google Ads", "Meta Ads"],
      accent: "#ff6b35",
      order: 2,
    },
    {
      role: "Full Stack Developer & Tech Lead",
      company: "Básico Homes Gestión SL",
      start: "2019",
      end: "2021",
      summary:
        "Dirigí al equipo que construyó la intranet del inquilino: firma digital de contratos, integraciones con APIs de scoring y ciclo completo de desarrollo con PHP moderno y Git. Primer rol en el que combiné desarrollo diario con coordinación de equipo.",
      highlights: [
        "Dirección técnica del equipo",
        "Firma digital e integraciones API",
        "PHP 7/8 con control de versiones Git",
      ],
      tech: ["PHP", "JavaScript", "MySQL", "Git"],
      accent: "#00d4ff",
      order: 3,
    },
    {
      role: "Project Manager",
      company: "The Internet Marketing Leading SL",
      start: "2016",
      end: "2019",
      summary:
        "Entré como desarrollador full stack — WordPress, Prestashop, Shopify y apps móviles — y acabé dirigiendo el equipo y gestionando los proyectos del área de tecnología y marketing: campañas integrales de marketing digital y comercio electrónico para una cartera de clientes en crecimiento.",
      highlights: [
        "De full stack a dirección de proyectos",
        "Equipo de tecnología y marketing a cargo",
        "E-commerce y campañas 360º",
      ],
      tech: ["WordPress", "Prestashop", "Shopify", "PHP", "Google Ads", "Meta Ads"],
      accent: "#ff3d81",
      order: 4,
    },
  ];
  for (const exp of experiences) await db.experience.create({ data: exp });

  // ── Educación ────────────────────────────────────────────────────────
  await db.education.deleteMany();
  const education = [
    {
      degree: "Doble Máster: MBA + Inteligencia Artificial Empresarial",
      institution: "Universidad UNIR",
      start: "2024",
      end: "2025",
      description:
        "Estrategia de negocio y aplicación real de IA en operaciones, producto y toma de decisiones.",
      order: 0,
    },
    {
      degree: "Máster en Marketing Digital y Comercio Electrónico",
      institution: "EAE Business School",
      start: "2018",
      end: "2020",
      description:
        "Estrategia omnicanal, analítica y growth aplicados a comercio electrónico.",
      order: 1,
    },
    {
      degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
      institution: "IES Virgen de la Paloma",
      start: "2014",
      end: "2016",
      description:
        "Base técnica formal: desarrollo web full stack, bases de datos y despliegue.",
      order: 2,
    },
  ];
  for (const edu of education) await db.education.create({ data: edu });

  // ── Skills ───────────────────────────────────────────────────────────
  await db.skill.deleteMany();
  const skills: Array<{
    name: string;
    category: string;
    level: number;
    featured?: boolean;
  }> = [
    // E-commerce
    { name: "Shopify Plus", category: "E-commerce", level: 95, featured: true },
    { name: "Liquid", category: "E-commerce", level: 95, featured: true },
    { name: "GraphQL (Admin & Storefront API)", category: "E-commerce", level: 85, featured: true },
    { name: "Shopify Apps & UI Extensions", category: "E-commerce", level: 85, featured: true },
    { name: "Prestashop", category: "E-commerce", level: 80 },
    { name: "WordPress & WooCommerce", category: "E-commerce", level: 90 },
    // Desarrollo
    { name: "JavaScript / TypeScript", category: "Desarrollo", level: 88, featured: true },
    { name: "React & Next.js", category: "Desarrollo", level: 82 },
    { name: "PHP 8", category: "Desarrollo", level: 90 },
    { name: "Node.js", category: "Desarrollo", level: 75 },
    { name: "HTML & CSS", category: "Desarrollo", level: 95 },
    { name: "SQL & Prisma", category: "Desarrollo", level: 72 },
    { name: "Git", category: "Desarrollo", level: 90 },
    { name: "Linux", category: "Desarrollo", level: 85 },
    // Gestión
    { name: "Gestión de proyectos", category: "Gestión", level: 92, featured: true },
    { name: "Scrum & Kanban", category: "Gestión", level: 90 },
    { name: "Equipos y proveedores", category: "Gestión", level: 88 },
    { name: "Presupuestos y roadmaps", category: "Gestión", level: 85 },
    // Marketing
    { name: "SEO", category: "Marketing", level: 88 },
    { name: "Google Ads", category: "Marketing", level: 90 },
    { name: "Meta Ads", category: "Marketing", level: 85 },
    { name: "GA4 / Analytics", category: "Marketing", level: 90 },
  ];
  let skillOrder = 0;
  for (const s of skills) {
    await db.skill.create({
      data: { ...s, featured: s.featured ?? false, order: skillOrder++ },
    });
  }

  // ── Proyectos ────────────────────────────────────────────────────────
  await db.project.deleteMany();
  const projects = [
    {
      slug: "yodeyma-verset",
      name: "Yodeyma & Verset",
      client: "Cipselo SL",
      kind: "E-commerce internacional · Shopify Plus",
      description:
        "Plataforma e-commerce vendiendo en más de 27 países. Temas Liquid a medida, apps privadas, UI extensions de checkout e integraciones GraphQL con ERP y logística. Dirección técnica del proyecto y desarrollo diario.",
      tech: ["Shopify Plus", "Liquid", "GraphQL", "React", "UI Extensions"],
      link: "https://yodeyma.com",
      year: "2025 — Actualidad",
      featured: true,
      accent: "#c8f31d",
      order: 0,
    },
    {
      slug: "miguel-rios",
      name: "Miguel Ríos",
      client: "Miguel Ríos",
      kind: "Web corporativa",
      description:
        "Desarrollo de la web oficial del artista Miguel Ríos: presencia digital de una leyenda del rock español.",
      tech: ["WordPress", "PHP", "CSS", "JavaScript"],
      link: "https://miguel-rios.com/",
      year: "2023",
      featured: true,
      accent: "#ff3d81",
      order: 1,
    },
    {
      slug: "mecano-experience",
      name: "Mecano Experience",
      client: "Producciones Roma",
      kind: "Web + Marketing",
      description:
        "Web del evento musical dedicado a Mecano, con campañas de marketing digital integradas en Google, Meta y TikTok.",
      tech: ["WordPress", "Analytics", "Google Ads", "TikTok Ads", "Meta Ads"],
      link: "https://mecanoexperience.com",
      year: "2023",
      featured: false,
      accent: "#7c5cff",
      order: 2,
    },
    {
      slug: "juan-vidal",
      name: "Juan Vidal Fashion",
      client: "Juan Vidal",
      kind: "E-commerce · Shopify",
      description:
        "E-commerce Shopify para el diseñador de moda Juan Vidal: theme a medida en Liquid y campañas de performance.",
      tech: ["Shopify", "Liquid", "Figma", "Google Ads", "Meta Ads"],
      link: "https://juan-vidal.com/",
      year: "2022",
      featured: true,
      accent: "#00d4ff",
      order: 3,
    },
    {
      slug: "basico-homes-intranet",
      name: "Básico Homes · Intranet",
      client: "Básico Homes Gestión SL",
      kind: "Plataforma full stack",
      description:
        "Intranet del inquilino para la inmobiliaria: firma digital de contratos, scoring vía API y gestión documental. Desarrollo full stack y dirección del equipo.",
      tech: ["PHP 7", "JavaScript", "MySQL", "Git"],
      link: "https://intranet.basico.es/",
      year: "2019 — 2021",
      featured: false,
      accent: "#00d4ff",
      order: 4,
    },
    {
      slug: "fundacion-ortega-gasset",
      name: "Fundación Ortega y Gasset",
      client: "Fundación José Ortega y Gasset",
      kind: "Identidad + Web + Aula virtual",
      description:
        "Rediseño de identidad, desarrollo web en WordPress y aula virtual Moodle para doctorados, con campañas de captación.",
      tech: ["WordPress", "Moodle", "Adobe XD", "Google Ads", "PHP 7"],
      link: "https://iuiog.com/",
      year: "2021",
      featured: false,
      accent: "#ff6b35",
      order: 5,
    },
    {
      slug: "sixtema-gis",
      name: "Sixtema GIS",
      client: "Sixtema",
      kind: "Sistema de información geográfica",
      description:
        "Plataforma GIS para gestión territorial: mapas interactivos y herramientas de análisis geoespacial sobre PostGIS.",
      tech: ["JavaScript", "PostgreSQL", "PostGIS", "Leaflet"],
      link: null,
      year: "2018",
      featured: false,
      accent: "#c8f31d",
      order: 6,
    },
    {
      slug: "taptil-mobile",
      name: "Taptil Mobile",
      client: "Tible Technologies SL",
      kind: "Apps móviles",
      description:
        "Aplicaciones móviles multiplataforma para diversos clientes, con backends propios y APIs REST.",
      tech: ["React Native", "iOS", "Android", "REST API", "Firebase"],
      link: null,
      year: "2017",
      featured: false,
      accent: "#7c5cff",
      order: 7,
    },
    {
      slug: "gratum-corp",
      name: "Gratum Corp",
      client: "Proyecto propio",
      kind: "Agencia digital",
      description:
        "Fundación y dirección de agencia de desarrollo web y marketing digital: cartera propia de clientes y equipo multidisciplinar.",
      tech: ["WordPress", "Shopify", "PHP", "React", "Google Ads"],
      link: null,
      year: "2020 — 2024",
      featured: false,
      accent: "#ff6b35",
      order: 8,
    },
  ];
  for (const p of projects) await db.project.create({ data: p });

  // ── Blog ─────────────────────────────────────────────────────────────
  await db.post.deleteMany();
  for (const post of oldBlogPosts) {
    await db.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: toMarkdown(post.content),
        tags: post.tags,
        readTime: post.readTime,
        featured: post.featured ?? false,
        published: true,
        publishedAt: new Date(post.publishDate + "T09:00:00Z"),
      },
    });
  }

  console.log("Seed completado:");
  console.log("  usuarios:", await db.user.count());
  console.log("  experiencia:", await db.experience.count());
  console.log("  educación:", await db.education.count());
  console.log("  skills:", await db.skill.count());
  console.log("  proyectos:", await db.project.count());
  console.log("  posts:", await db.post.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
