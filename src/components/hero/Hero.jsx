import React, { useState } from "react";
import Modal from "react-modal";
import heroImg from "../../assets/img/hero/dark.jpg";
import heroImgMobile from "../../assets/img/hero/img-mobile.jpg";
import cancelImg from "../../assets/img/cancel.svg";
import Index from "../../components/about/index";

const heroContent = {
  heroImage: heroImg,
  heroMobileImage: heroImgMobile,
  heroTitleName: "Alejandro Lamas",
  heroDesignation: "Full Stack Developer & Project Manager",
  heroDescriptions: `Soy desarrollador full stack con perfil técnico-estratégico, especializado en desarrollo web, gestión de proyectos y marketing digital.

Aporto más de 10 años de experiencia combinando tecnología, liderazgo y orientación a resultados. He trabajado como CTO, fundado y dirigido empresas, y actualmente formo parte del equipo técnico del Consejo General de Colegios de la Profesión Veterinaria de España, liderando el desarrollo de varios proyectos digitales clave.

Mi objetivo profesional es integrarme en un equipo multidisciplinar donde seguir creciendo, compartir conocimiento y aportar valor con todo lo aprendido a lo largo del camino.`,
  heroBtn: "Más sobre mí",
};

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModalOne() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="row home-details-container align-items-center">
        <div
          className="col-lg-4 bg position-fixed d-none d-lg-block"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + heroContent.heroImage})`,
          }}
        ></div>
        <div className="col-12 col-lg-8 offset-lg-4 home-details text-center text-lg-start">
          <div>
            <img
              src={heroContent.heroMobileImage}
              className="img-fluid main-img-mobile d-sm-block d-lg-none"
              alt="hero portrait"
            />
            <h1 className="text-uppercase poppins-font">
              Soy {heroContent.heroTitleName}.
              <span>{heroContent.heroDesignation}</span>
            </h1>
            <p className="open-sans-font white-space-pre-line">{heroContent.heroDescriptions}</p>
            <button className="button" onClick={toggleModalOne}>
              <span className="button-text">{heroContent.heroBtn}</span>
              <span className="button-icon fa fa-arrow-right"></span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalOne}
        contentLabel="Sobre mí"
        className="custom-modal dark hero"
        overlayClassName="custom-overlay dark"
        closeTimeoutMS={500}
      >
        <div>
          <button className="close-modal" onClick={toggleModalOne}>
            <img src={cancelImg} alt="cerrar" />
          </button>

          <div className="box_inner about">
            <div data-aos="fade-up" data-aos-duration="1200">
              <div className="title-section text-left text-sm-center">
                <h1>
                  SOBRE <span>MÍ</span>
                </h1>
                <span className="title-bg">SOBRE MÍ</span>
              </div>
              <Index />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Hero;
