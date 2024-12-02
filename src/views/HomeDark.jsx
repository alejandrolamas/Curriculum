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

const menuItem = [
  { icon: "fa-home", menuName: "Inicio" },
  { icon: "fa-user", menuName: "Currículum" },
  { icon: "fa-briefcase", menuName: "Portfolio" },
  { icon: "fa-envelope-open", menuName: "Contacto" },
  { icon: "fa-comments", menuName: "Blog" },
];

const HomeDark = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Cambiar la pestaña activa según el hash en la URL
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
    window.history.replaceState(null, null, hashList[index]); // Cambia el hash en la URL
    window.scrollTo(0, 0); // Forzar el scroll al inicio de la págin
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "blog") {
      setActiveTab(4); // Cambia al índice de la pestaña del Blog
    }
  }, [location]);
  
  document.querySelector("body").classList.remove("rtl");

  return (
    <div className="yellow">
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
                  SOBRE <span>MI</span>
                </h1>
                <span className="title-bg">SOBRE MI</span>
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
                ALGUNOS DE MIS <span>TRABAJOS</span>
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
                CUENTA <span>CONMIGO</span>
              </h1>
              <span className="title-bg">¿HABLAMOS?</span>
            </div>
            <div className="container" data-aos="fade-up" data-aos-duration="1200">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">
                    No seas tímido/a!
                  </h3>
                  <p className="open-sans-font mb-4">
                    Siéntete libre de ponerte en contacto conmigo. Total, si has
                    llegado hasta aquí, igual es que te interesa contratarme,
                    ¿no? Recuerda que estoy abierto a nuevos proyectos, ideas y
                    oportunidades. Así que dale caña al formulario y hablemos 😉
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
                MI <span>BLOG</span>
              </h1>
              <span className="title-bg">posts</span>
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