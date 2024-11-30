import React from "react";
import HomeDark from "../views/HomeDark";
import Blog from "../components/blog/Blog";
import NotFound from "../views/NotFound";
import { Routes, Route } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDark />} />
      <Route path="/:slug" element={<Blog />} /> {/* Carga según el slug */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;