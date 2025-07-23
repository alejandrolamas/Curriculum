import React from "react";

const personalInfoContent = [
  { meta: "Nombre", metaInfo: "Alejandro Lamas" },
  { meta: "Edad", metaInfo: "28 años" },
  { meta: "Ubicación", metaInfo: "Madrid, España" },
  { meta: "Teléfono", metaInfo: "667894561" },
  { meta: "Idiomas", metaInfo: "Español (nativo), Inglés (C1 escrito y leído, B2 hablado)" },
  { meta: "Vehículo propio", metaInfo: "Sí" },
  { meta: "Disponibilidad", metaInfo: "Inmediata" },
  { meta: "Movilidad geográfica", metaInfo: "Sí, nacional e internacional" },
];


const aptitude = [
  { meta: "Liderazgo técnico y de proyectos" },
  { meta: "Gestión de equipos y proveedores" },
  { meta: "Aprendizaje autodidacta y continuo" },
  { meta: "Resolución de problemas complejos" },
  { meta: "Adaptabilidad y proactividad" },
  { meta: "Comunicación efectiva con cliente y equipo" },
  { meta: "Trabajo colaborativo y bajo presión" },
  { meta: "Visión estratégica y orientación a resultados" },
];


const PersonalInfo = () => {
  return (
    <>
      <ul className="about-list list-unstyled open-sans-font">
        {personalInfoContent.map((val, i) => (
          <li key={i}>
            <span className="title">{val.meta}: </span>
            <span className="value d-block d-sm-inline-block d-lg-block d-xl-inline-block">
              {val.metaInfo === "667894561" ? <a href={`tel:+34${val.metaInfo}`} style={{textDecoration : 'none', color : 'inherit'}}>667894561</a> : val.metaInfo}
            </span>
          </li>
        ))}
      </ul>
      <h3 className="text-uppercase custom-title mb-0 ft-wt-600">OBJETIVOS</h3>
      <p style={{ marginBottom: '30px' }}>
        Tras haber dirigido mi propia empresa y gestionado proyectos con equipos a cargo, mi objetivo profesional es integrarme en un equipo multidisciplinar donde seguir desarrollándome tanto técnica como personalmente. Quiero aportar valor con mi experiencia en desarrollo full stack, gestión de proyectos y liderazgo, mientras sigo aprendiendo de otros profesionales en un entorno colaborativo y exigente.
      </p>
      <h3 className="text-uppercase custom-title mb-0 ft-wt-600">APTITUDES</h3>
      <ul className=" list-unstyled open-sans-font">
        {aptitude.map((val, i) => (
          <li key={i}>
            - {val.meta}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonalInfo;
