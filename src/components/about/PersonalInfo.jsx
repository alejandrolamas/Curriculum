import React from "react";

const personalInfoContent = [
  { meta: "Nombre", metaInfo: "Alejandro Lamas" },
  { meta: "Edad", metaInfo: "28 años" },
  { meta: "Ubicación", metaInfo: "Madrid" },
  { meta: "Teléfono", metaInfo: "667894561" },
  { meta: "Idiomas", metaInfo: "Español e inglés" },
  { meta: "Vehículo propio", metaInfo: "Sí" },
  { meta: "Disponibilidad", metaInfo: "Inmediata" },
  { meta: "Mobilidad geográfica", metaInfo: "Sí" },
];

const aptitude = [
  { meta: "Liderazgo" },
  { meta: "Negociación"},
  { meta: "Autodidacta y resolutivo"},
  { meta: "Implicación y flexibilidad"},
  { meta: "Buenas dotes de comunicación"},
  { meta: "Trabajo en equipo"},
  { meta: "Trabajo bajo presión"},
  { meta: "Disponibilidad"},
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
      <p style={{marginBottom: '30px'}}>Mi objetivo profesional, tras haber estado durante mi última etapa laboral como autónomo dirigiendo no solo mi propia empresa, 
        sino gestionando proyectos con personal a cargo, es la de formar parte de un equipo multidisciplinar en el que pueda aportar mis 
        conocimientos y experiencia a fin de lograr los objetivos de la empresa.</p>
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
