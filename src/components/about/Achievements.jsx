import React from "react";

const achievementsContent = [
  { title: "10", subTitle1: "Años de", subTitle2: "experiencia" },
  { title: "245", subTitle1: "Desarrollo", subTitle2: "CMS" },
  { title: "12", subTitle1: "Desarrollo", subTitle2: "Full Stack" },
  { title: "51", subTitle1: "Campañas", subTitle2: "SEO" },
  { title: "43", subTitle1: "Campañas", subTitle2: "SEM" },
  { title: "7", subTitle1: "Diseños", subTitle2: "Corporativos" },
  { title: "15", subTitle1: "Servidores", subTitle2: "Desplegados" },
  { title: "∞", subTitle1: "Clientes", subTitle2: "Contentos" },
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
