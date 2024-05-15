import React from "react";

const achievementsContent = [
  { title: "10", subTitle1: "Años de", subTitle2: "experiencia" },
  { title: "97", subTitle1: "Desarrollo", subTitle2: "Wordpress" },
  { title: "25", subTitle1: "Desarrollo", subTitle2: "Prestashop" },
  { title: "11", subTitle1: "Desarrollo", subTitle2: "Shopify" },
  { title: "2", subTitle1: "Desarrollo", subTitle2: "Drupal" },
  { title: "1", subTitle1: "Desarrollo", subTitle2: "Joomla" },
  { title: "5", subTitle1: "Desarrollo", subTitle2: "WIX" },
  { title: "8", subTitle1: "Desarrollo", subTitle2: "Full Stack" },
  { title: "51", subTitle1: "Campañas", subTitle2: "Google Ads" },
  { title: "43", subTitle1: "Campañas", subTitle2: "META" },
  { title: "41", subTitle1: "Campañas", subTitle2: "Emailing" },
  { title: "21", subTitle1: "Campañas", subTitle2: "Tiktok" },
  { title: "2", subTitle1: "Campañas", subTitle2: "Twitter" },
  { title: "2", subTitle1: "Campañas", subTitle2: "LinkedIn" },
  { title: "4", subTitle1: "Diseños", subTitle2: "Corporativos" },
  { title: "12", subTitle1: "Servidores", subTitle2: "Desplegados" },
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
