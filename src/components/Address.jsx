import React from "react";

const Address = () => {
  return (
    <>
      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-map position-absolute"></i>
        <span className="d-block">Dónde vivo</span>Madrid
      </p>
      {/* End .custom-span-contact */}

      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-envelope-open position-absolute"></i>
        <span className="d-block">Escríbeme</span>{" "}
        <a href="mailto:jandrolamas@gmail.com">jandrolamas@gmail.com</a>
      </p>
      {/* End .custom-span-contact */}

      <p className="open-sans-font custom-span-contact position-relative">
        <i className="fa fa-phone-square position-absolute"></i>
        <span className="d-block">Llámame</span>{" "}
        <a href="tel:+34667894561">667 89 45 61</a>
      </p>
      {/* End .custom-span-contact */}
    </>
  );
};

export default Address;
