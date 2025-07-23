import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Hero from "../components/hero/Hero";
import Index from "../components/about/index";
import Address from "../components/Address";
import Portfolio from "../components/portfolio/Portfolio";
import Contact from "../components/Contact";
import Social from "../components/Social";
import Blog from "../components/blog/Blog";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';
import { Helmet } from "react-helmet";
import imgDefault from "../assets/img/blog/default.jpg";

ReactGA.initialize('G-YGV4QPF6XH');

const menuItem = [
  { icon: "fa-home", menuName: "Inicio" },
  { icon: "fa-user", menuName: "Perfil" },
  { icon: "fa-briefcase", menuName: "Proyectos" },
  { icon: "fa-envelope-open", menuName: "Contacto" },
  { icon: "fa-comments", menuName: "Blog" },
];

const HomeDark = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const firstImage = imgDefault;

  const titleMap = [
    "Inicio | Alejandro Lamas",
    "Perfil Profesional | Alejandro Lamas",
    "Proyectos | Alejandro Lamas",
    "Contacto | Alejandro Lamas",
    "Blog | Alejandro Lamas",
  ];

  useEffect(() => {
    const hash = window.location.hash;
    const tabIndex = {
      "#inicio": 0,
      "#curriculum": 1,
      "#portfolio": 2,
      "#contacto": 3,
      "#blog": 4,
    }[hash];
    if (tabIndex !== undefined) setActiveTab(tabIndex);
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
    const hashList = ["#inicio", "#curriculum", "#portfolio", "#contacto", "#blog"];
    window.history.replaceState(null, null, hashList[index]);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "blog") {
      setActiveTab(4);
    }
  }, [location]);

  document.querySelector("body").classList.remove("rtl");

  return (
    <div className="yellow">
      <Helmet>
        <title>{titleMap[activeTab]}</title>
        <meta property="og:title" content={titleMap[activeTab]} />
        <meta property="og:image" content={firstImage} />
        <meta property="og:type" content="page" />
      </Helmet>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <div className="header">
          <TabList className="icon-menu revealator-slideup revealator-once revealator-delay1">
            {menuItem.map((item, i) => (
              <Tab className="icon-box" key={i}>
                <i className={`fa ${item.icon}`}></i>
                <h2>{item.menuName}</h2>
              </Tab>
            ))}
          </TabList>
        </div>
        <div className="tab-panel_list">
          {/* Hero Content */}
          <TabPanel className="home">
            <div
              className="container-fluid main-container container-home p-0"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="color-block d-none d-lg-block"></div>
              <Hero />
            </div>
          </TabPanel>

          {/* About Content */}
          <TabPanel className="about">
            <div data-aos="fade-up" data-aos-duration="1200">
              <div className="title-section text-left text-sm-center">
                <h1>
                  PERFIL <span>PROFESIONAL</span>
                </h1>
                <span className="title-bg">PERFIL</span>
              </div>
              <Index />
            </div>
          </TabPanel>

          {/* Portfolio Content */}
          <TabPanel className="portfolio professional">
            <div
              className="title-section text-left text-sm-center"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <h1>
                PROYECTOS <span>DESTACADOS</span>
              </h1>
              <span className="title-bg">PORTFOLIO</span>
            </div>
            <Portfolio />
          </TabPanel>

          {/* Contact Content */}
          <TabPanel className="contact">
            <div
              className="title-section text-left text-sm-center"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <h1>
                ¿TRABAJAMOS <span>JUNTOS?</span>
              </h1>
              <span className="title-bg">CONTACTO</span>
            </div>
            <div className="container" data-aos="fade-up" data-aos-duration="1200">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
                    Hablemos sin compromiso
                  </h3>
                  <p className="open-sans-font mb-4">
                    Estoy abierto a nuevos retos, colaboraciones y proyectos donde pueda aportar valor con mi experiencia en desarrollo full stack, gestión de proyectos y liderazgo técnico. Si crees que puedo encajar en tu equipo o necesitas ayuda profesional, no dudes en contactarme.
                  </p>
                  <Address />
                  <Social />
                </div>
                <div className="col-12 col-lg-8">
                  <Contact />
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Blog Content */}
          <TabPanel className="blog">
            <div
              className="title-section text-left text-sm-center"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <h1>
                REFLEXIONES Y <span>APRENDIZAJES</span>
              </h1>
              <span className="title-bg">BLOG</span>
            </div>
            <div className="container" data-aos="fade-up" data-aos-duration="1200">
              <Blog />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default HomeDark;
