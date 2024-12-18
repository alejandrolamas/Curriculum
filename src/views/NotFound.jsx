import React from "react";
import { Link } from "react-router-dom";
import image404 from "../assets/img/404.jpg";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className="error_page">
      <Helmet>
        <title>Página no encontrada | Alejandro Lamas</title>
      </Helmet>
      <div
        className="hero bg-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + image404})`,
        }}
      >
        <div className="content">
          <h1 data-aos="fade-up" data-aos-duration="1200">
            404!
          </h1>
          <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="50">
            Sin premio, suerte en la próxima.
          </p>

          <div
            className="button"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <Link to="/">VOLVER AL INICIO</Link>
          </div>
          {/* End purchase_button */}
        </div>
      </div>
      {/* End .hero */}
    </div>
  );
};

export default NotFound;
