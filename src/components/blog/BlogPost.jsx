import React from "react";
import { useParams } from "react-router-dom";
import UseData from "../../Hooks/UseData";

const BlogPost = () => {
  const { slug } = useParams(); // Obtener el slug de la URL
  const { blogsData } = UseData();

  const singleData = blogsData.find((blog) => blog.slug === slug);

  if (!singleData) {
    return <div>Publicación no encontrada</div>;
  }

  return (
    <div className="yellow">
      <div className="title-section text-left text-sm-center">
        <h1>{singleData.title}</h1>
        <span className="title-bg">Detalles</span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="blog-excerpt open-sans-font">
              <img
                src={singleData.img}
                alt={singleData.title}
                className="img-fluid"
              />
              <p>{singleData.description1}</p>
              <p>{singleData.description2}</p>
              {/* Agrega más contenido si es necesario */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;