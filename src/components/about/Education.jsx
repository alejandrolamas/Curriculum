import React from "react";

const educationContent = [
  {
    year: "2016 - 2018",
    degree: "Grado superior en desarrollo de aplicaciones web (DAW)",
    institute: "IES VIRGEN DE LA PALOMA",
    details: ``,
  },
  {
    year: "2018 - 2020",
    degree: "Master en Marketing Digital y Comercio Electrónico",
    institute: "EAE BUSINESS SCHOOL",
    details: ``,
  }
];

const Education = () => {
  return (
    <ul>
      {educationContent.map((val, i) => (
        <li key={i}>
          <div className="icon">
            <i className="fa fa-briefcase"></i>
          </div>
          <span className="time open-sans-font text-uppercase">{val.year}</span>
          <h5 className="poppins-font text-uppercase">
            {val.degree}
            <span className="place open-sans-font">{val.institute}</span>
          </h5>
          <p className="open-sans-font">{val.details}</p>
        </li>
      ))}
    </ul>
  );
};

export default Education;
