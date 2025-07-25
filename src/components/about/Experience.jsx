import React from "react";

const experienceContent = [
  {
    year: "2024 - Actualidad",
    position: "Full Stack Developer",
    compnayName: "Consejo General de Colegios Veterinarios de España",
    details: `Responsable del desarrollo técnico de plataformas internas y externas para la institución. Desarrollo de soluciones a medida con React, Node.js, PHP (Laravel, Yii), PostgreSQL y MongoDB. Gestión de APIs externas, control de versiones con Git y despliegue en servidores Azure y AWS.

Lidero el ciclo completo de los proyectos (análisis, desarrollo, testing, despliegue y mantenimiento), coordinando también el trabajo de una agencia externa. Proyectos destacados: sistema de certificaciones, CRM de colegiados, gestión de congresos y mejoras en receta electrónica.`,
  },
  {
    year: "2020 - 2025",
    position: "CEO / Full Stack Developer / Project & Marketing Manager",
    compnayName: "Gratum Corp SL",
    details: `Fundador y responsable de la dirección técnica, operativa y estratégica de la empresa. Coordinación de equipos multidisciplinares y gestión integral de clientes y proyectos (CRM, eCommerce, SaaS). Desarrollo de soluciones con Node.js, React, Laravel, WordPress, PrestaShop y Shopify.

Uso intensivo de metodologías ágiles (Scrum y Kanban), control de versiones con Git y despliegue de entornos en AWS y Azure (incluyendo bases de datos NoSQL y balanceo de carga). Diseño e implementación de campañas SEO/SEM, automatizaciones y embudos de conversión. Dirección de equipos internos y externos, incluyendo proveedores tecnológicos y perfiles de marketing.`,
  },
  {
    year: "2019 - 2021",
    position: "Full Stack Developer",
    compnayName: "Basico Homes Gestión SL",
    details: `Diseño, desarrollo y despliegue de una intranet de gestión para inquilinos, incluyendo sistemas de firma digital y conexión con APIs de terceros. Trabajo en PHP, uso de Git para control de versiones y despliegue de infraestructura en Azure.

Colaboración con equipo interno, ofreciendo soporte técnico continuo y coordinación con usuarios finales. Administración de bases de datos Oracle y configuración de entornos de integración y producción.`,
  },
  {
    year: "2018 - 2019",
    position: "CTO / CMO",
    compnayName: "The Internet Marketing Leading SL",
    details: `Dirección de equipos técnicos y creativos para el desarrollo de soluciones personalizadas en entornos CMS y eCommerce. Definición de arquitectura, planificación y ejecución de campañas digitales integrales (Google Ads, Facebook Ads, email automation).

Responsable del stack tecnológico (WordPress, PrestaShop, PHP, JavaScript) y de la coordinación de proveedores y colaboradores externos. Implementación de estrategias de marketing de captación, conversión y retención en múltiples sectores.`,
  },
  {
    year: "2018",
    position: "Junior Developer",
    compnayName: "Tible Technologies",
    details: `Soporte técnico y desarrollo web en entornos CMS (WordPress, Shopify, PrestaShop). Desarrollo de funcionalidades a medida en PHP y ajustes en maquetación HTML/CSS.

Gestión de incidencias y contacto directo con clientes para tareas de mantenimiento, mejora continua y formación básica. Primeros pasos en entorno profesional como parte de las prácticas del ciclo formativo.`,
  },
  {
  year: "2015 - Actualidad",
  position: "Desarrollador Autodidacta / Proyectos Personales",
  compnayName: "Alejandro Lamas",
  details: `Desde antes de comenzar mi formación reglada, he desarrollado proyectos personales para profundizar en nuevas tecnologías y resolver problemas reales. He aprendido de forma autodidacta lenguajes y frameworks como Python, Node.js, React, TypeScript, así como arquitectura de servidores y despliegue de entornos productivos.

Experiencia en configuración y mantenimiento de servidores en CentOS, Ubuntu, RedHat y entornos Windows (IIS). Diseño de arquitectura full stack, control de versiones con Git, integración de bases de datos relacionales y NoSQL, y uso de servicios cloud como AWS, Azure, Vercel y Netlify.

Proyectos destacados:
- Aplicación móvil para seguimiento de rutinas de entrenamiento (React Native + Firebase).
- Sistema de fichaje laboral adaptado a la normativa 2025, con control horario, geolocalización y registro seguro.
- Yupay: plataforma para freelance donde pueden compartir contenido digital y recibir pagos online de forma automática.
- Otros proyectos publicados en: https://github.com/alejandrolamas`,
},
];



const Experience = () => {
  return (
    <ul>
      {experienceContent.map((val, i) => (
        <li key={i}>
          <div className="icon">
            <i className="fa fa-briefcase"></i>
          </div>
          <span className="time open-sans-font text-uppercase">{val.year}</span>
          <h5 className="poppins-font text-uppercase">
            {val.position}
            <span className="place open-sans-font">{val.compnayName}</span>
          </h5>
          <p className="open-sans-font" style={{ whiteSpace: "pre-line" }}>{val.details}</p>
        </li>
      ))}
    </ul>
  );
};

export default Experience;
