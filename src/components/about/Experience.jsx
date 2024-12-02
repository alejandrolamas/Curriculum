import React from "react";

const experienceContent = [
  {
    year: "2024 - Actualidad",
    position: "Full-stack Developer",
    compnayName: "Consejo General de Colegios de la Profesión Veterinaria de España",
    details: `Creación de proyectos Full-stack usando diferentes tecnologías para la institución. Creación de plataforma de certificaciones. Mejora del sistema de recetas electrónicas. CRM para la gestión de colegiados. Plataforma de gestión de congresos. Otros proyectos de gestión interna y externa`,
  },
  {
    year: "2020 - 2024",
    position: "Full Stack Developer / Project Manager / Marketing Manager",
    compnayName: "Gratum Corp SL",
    details: `Gestión de proyectos para clientes de diversos sectores, manejando y desarrollando en diferentes tipos de CMS y lenguajes de programación, metodologías Kanban y SCRUM`,
  },
  {
    year: "2019 - 2021",
    position: "Full Stack Developer",
    compnayName: "Basico Homes Gestión SL",
    details: `Mediante el uso de últimas versiones de PHP y con control de versiones a través de GIT, dirigí un equipo para el desarrollo integral de una intranet dedicada al inquilino incluyendo firmas digitales y accesos a diferentes API`,
  },
  {
    year: "2018 - 2019",
    position: "CTO / CMO",
    compnayName: "The Internet Marketing Leading SL",
    details: `Gestión de clientes, creación y gestión de campañas integrales de marketing digital y comercio electrónico en diferentes plataformas`,
  },
  {
    year: "2016 - 2018",
    position: "Junior Developer",
    compnayName: "Tible Technologies SL",
    details: `Gestión de clientes en CMS Wordpress, Shopify, Prestashop y desarrollos puntuales en PHP`,
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
          <p className="open-sans-font">{val.details}</p>
        </li>
      ))}
    </ul>
  );
};

export default Experience;
