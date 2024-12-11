import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import UseData from "../../Hooks/UseData";
import CodeBlock from "../../components/CodeBlock"; // Importar el componente CodeBlock
import HeaderMenu from "../HeaderMenu";
import NotFound from "../../views/NotFound";
import imgDefault from "../../assets/img/blog/default.jpg";

// Función para procesar texto y convertir **texto** en <strong>texto</strong>
const parseTextWithBold = (text) => {
  if (!text) return null;

  // Reemplaza **texto** con <strong>texto</strong>
  const parts = text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ); // Elimina los "**" y envuelve en <strong>
    }
    return part; // Devuelve el texto normal
  });

  return <>{parts}</>;
};

const Blog = () => {
  const { blogsData } = UseData();
  const { slug } = useParams(); // Obtener el slug de la URL
  const navigate = useNavigate();

  // Navegación hacia la URL amigable basada en el slug
  const handleNavigation = (slug) => {
    navigate(`/${slug}`); // Redirige directamente al slug
  };

  // Si hay un slug, mostrar la publicación individual
  if (slug) {
    const blog = blogsData.find((item) => item.slug === slug);

    if (!blog) {
      return <NotFound />;
    }

    const firstImage = blog.img || imgDefault;

    return (
      <div className="yellow">
        <Helmet>
          <title>{blog.title} | Alejandro Lamas</title>
          <meta name="description" content={blog.description1} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:image" content={firstImage} />
          <meta property="og:url" content={`https://alejandrolamas.es${slug}`} />
          <meta property="og:type" content="article" />
        </Helmet>
        <HeaderMenu activeTab={4} />
        {/* Contenedor de la imagen, título y subtítulo */}
        <div className="image-container" style={{ position: "relative", height: "40vh", width: "100%" }}>
          {/* Imagen con estilo actualizado */}
          <img
            src={blog.img}
            alt={blog.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Capa negra con opacidad */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          ></div>
          {/* Título y subtítulo encima de la imagen */}
          <div className="blog-title-container">
            <h1>
              {blog.title}
            </h1>
            <p>
              {blog.commentor} - {blog.date}
            </p>
          </div>
        </div>
        {/* Contenido del blog */}
        <div
          className="container mt-4"
          data-aos="fade-up"
          data-aos-duration="1200"
          style={{ paddingBottom: "100px" }}
        >
          <div className="row">
            <div className="col-12">
              {blog.content.map((section, index) => (
                <div key={index} className="blog-section mb-4">
                  <h2
                    style={{
                      color: "white",
                      textAlign: "left",
                      paddingTop: "20px",
                      fontSize: "24px",
                    }}
                  >
                    {section.sectionTitle}
                  </h2>
                  {Array.isArray(section.text) ? (
                    section.text.map((paragraph, pIndex) => (
                      <p key={pIndex} style={{ color: "#B6B6B6" }}>
                        {parseTextWithBold(paragraph)}
                      </p>
                    ))
                  ) : (
                    <p style={{ color: "#B6B6B6" }}>
                      {parseTextWithBold(section.text)}
                    </p>
                  )}
                  {section.list && (
                    <ul style={{ color: "#B6B6B6", paddingLeft: "20px" }}>
                      {section.list.map((item, listIndex) => (
                        <li key={listIndex} style={{ marginBottom: "10px" }}>
                          {parseTextWithBold(item)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.code && <CodeBlock code={section.code} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay un slug, mostrar la lista de publicaciones
  return (
    <div className="row">
      {blogsData
        .sort((a, b) => b.id - a.id) // Ordenar por fecha, más reciente primero
        .map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
            <article
              className="post-container"
              onClick={() => handleNavigation(item.slug)}
            >
              <div className="post-thumb">
                <div className="d-block position-relative overflow-hidden">
                  <img src={item.img} className="img-fluid" alt={item.title} />
                </div>
              </div>
              <div className="post-content">
                <div className="entry-header">
                  <h3>{item.title}</h3>
                </div>
                <div className="entry-content open-sans-font">
                  <p>{item.description1.slice(0, 100)}...</p>
                </div>
                <div className="entry-meta" style={{paddingTop:"10px"}}>
                  <small style={{color:"#7F8C8D", fontSize:"10px"}}>{item.commentor} - {item.date}</small>
                </div>
              </div>
            </article>
          </div>
        ))}
    </div>
  );

};

export default Blog;