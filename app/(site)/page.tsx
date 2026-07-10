import {
  asStats,
  asStringArray,
  formatDate,
  getEducation,
  getExperiences,
  getPosts,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/content";
import { ConstellationApp } from "@/components/constellation/ConstellationApp";
import { Manifesto } from "@/components/site/Manifesto";
import { ExperienceTimeline } from "@/components/site/ExperienceTimeline";
import { SkillsArsenal } from "@/components/site/SkillsArsenal";
import { ProjectsList } from "@/components/site/ProjectsList";
import { BlogTeaser } from "@/components/site/BlogTeaser";
import { ContactSection } from "@/components/site/ContactSection";

export const revalidate = 120;

export default async function HomePage() {
  const [profile, experiences, education, skills, projects, posts] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getEducation(),
      getSkills(),
      getProjects(),
      getPosts(),
    ]);

  if (!profile) return null;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: "https://alejandrolamas.es",
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    sameAs: [profile.linkedin, profile.github],
  };

  const panels = [
    {
      id: "perfil",
      label: "Perfil",
      accent: "#f2efe6",
      content: (
        <Manifesto
          bio={profile.bio}
          location={profile.location}
          languages={asStringArray(profile.languages)}
          aptitudes={asStringArray(profile.aptitudes)}
          availability={profile.availability}
        />
      ),
    },
    {
      id: "trayectoria",
      label: "Trayectoria",
      accent: "#00d4ff",
      content: (
        <ExperienceTimeline
          experiences={experiences.map((e) => ({
            id: e.id,
            role: e.role,
            company: e.company,
            start: e.start,
            end: e.end,
            summary: e.summary,
            highlights: asStringArray(e.highlights),
            tech: asStringArray(e.tech),
            accent: e.accent,
          }))}
          education={education.map((e) => ({
            id: e.id,
            degree: e.degree,
            institution: e.institution,
            start: e.start,
            end: e.end,
            description: e.description,
          }))}
        />
      ),
    },
    {
      id: "arsenal",
      label: "Arsenal",
      accent: "#7c5cff",
      content: (
        <SkillsArsenal
          skills={skills.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            level: s.level,
            featured: s.featured,
          }))}
        />
      ),
    },
    {
      id: "proyectos",
      label: "Proyectos",
      accent: "#ff6b35",
      content: (
        <ProjectsList
          projects={projects.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            client: p.client,
            kind: p.kind,
            description: p.description,
            tech: asStringArray(p.tech),
            link: p.link,
            year: p.year,
            featured: p.featured,
            accent: p.accent,
          }))}
        />
      ),
    },
    {
      id: "bitacora",
      label: "Bitácora",
      accent: "#ff3d81",
      content: (
        <BlogTeaser
          posts={posts.slice(0, 4).map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            tags: asStringArray(p.tags),
            readTime: p.readTime,
            dateLabel: formatDate(p.publishedAt),
          }))}
        />
      ),
    },
    {
      id: "contacto",
      label: "Contacto",
      accent: "#c8f31d",
      content: <ContactSection email={profile.email} phone={profile.phone} />,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <ConstellationApp
        hero={{
          name: profile.name,
          role: profile.role,
          tagline: profile.tagline,
          availability: profile.availability,
          stats: asStats(profile.stats),
        }}
        panels={panels}
      />
    </>
  );
}
