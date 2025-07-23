import React from "react";

const achievementsContent = [
  { title: "10", subTitle1: "Años de", subTitle2: "experiencia" },
  { title: "200", subTitle1: "Proyectos", subTitle2: "web y CMS" },
  { title: "40", subTitle1: "Desarrollos", subTitle2: "Full Stack" },
  { title: "50", subTitle1: "Campañas", subTitle2: "SEO & SEM" },
  { title: "160", subTitle1: "Clientes", subTitle2: "gestionados" },
  { title: "25", subTitle1: "Servidores", subTitle2: "configurados" },
  { title: "5", subTitle1: "Equipos", subTitle2: "liderados" },
  { title: "∞", subTitle1: "Aprendizaje", subTitle2: "constante" },
];

const Achievements = () => {
  return (
    <div className="row">
      {achievementsContent.map((val, i) => (
        <div className="col-6" key={i}>
          <div className="box-stats with-margin">
            <h3 className="poppins-font position-relative">{val.title}</h3>
            <p className="open-sans-font m-0 position-relative text-uppercase">
              {val.subTitle1} <span className="d-block">{val.subTitle2}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
