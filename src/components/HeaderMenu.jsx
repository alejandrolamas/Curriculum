import React from "react";
import { useNavigate } from "react-router-dom";

const menuItem = [
  { icon: "fa-home", menuName: "Inicio", path: "/#inicio" },
  { icon: "fa-user", menuName: "Currículum", path: "/#curriculum" },
  { icon: "fa-briefcase", menuName: "Portfolio", path: "/#portfolio" },
  { icon: "fa-envelope-open", menuName: "Contacto", path: "/#contacto" },
  { icon: "fa-comments", menuName: "Blog", path: "/?tab=blog" },
];

const HeaderMenu = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <ul className="icon-menu revealator-slideup revealator-once revealator-delay1">
        {menuItem.map((item, index) => (
          <li
            key={index}
            className={`icon-box ${activeTab === index ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <i className={`fa ${item.icon}`}></i>
            <h2>{item.menuName}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderMenu;
