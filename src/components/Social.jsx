import React from "react";

const SocialShare = [
  {
    iconName: "fa fa-linkedin",
    link: "https://www.linkedin.com/in/alejandrolamasperez/",
  },
  { iconName: "fa fa-github", link: "https://github.com/alejandrolamas" },
  {
    iconName: "fa fa-envelope-o",
    link: "mailto:jandrolamas@gmail.com",
  },
  { iconName: "fa fa-briefcase", link: "https://gratumcorp.com/" },
];

const Social = () => {
  return (
    <ul className="social list-unstyled pt-1 mb-5">
      {SocialShare.map((val, i) => (
        <li key={i}>
          <a href={val.link} target="_blank" rel="noreferrer">
            <i className={val.iconName}></i>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Social;
