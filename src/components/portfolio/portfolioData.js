import Image1 from "../../assets/img/portfolio/miguel-rios.jpg";
import Image2 from "../../assets/img/portfolio/mecano.jpg";
import Image3 from "../../assets/img/portfolio/bulldog.jpg";
import Image4 from "../../assets/img/portfolio/fleek.jpg";
import Image5 from "../../assets/img/portfolio/juan-vidal.jpg";
import Image6 from "../../assets/img/portfolio/chrisar.jpg";
import Image7 from "../../assets/img/portfolio/basico.jpg";
import Image8 from "../../assets/img/portfolio/levanova.jpg";
import Image9 from "../../assets/img/portfolio/ortega-gasset.jpg";

const PortfolioData = [
  {
    id: 1,
    type: "Desarrollo web",
    image: Image1,
    tag: ["desarrollo"],
    delayAnimation: "0",
    modalDetails: [
      {
        project: "Desarrollo de página web corporativa",
        client: "Miguel Rios",
        language: "Wordpress",
        preview: "miguel-rios.com",
        link: "https://miguel-rios.com/",
      },
    ],
  },
  {
    id: 2,
    type: "Desarrollo web + Marketing",
    image: Image2,
    tag: ["desarrollo", "marketing", "diseño"],
    delayAnimation: "100",
    modalDetails: [
      {
        project: "Desarrollo web para un evento musical dedicado a Mecano",
        client: "Producciones Roma",
        language: "Wordpress, Analytics, Search Console, Google Ads, Tiktok, META",
        preview: "mecanoexperience.com",
        link: "https://mecanoexperience.com",
      },
    ],
  },
  {
    id: 3,
    type: "Desarrollo web + Diseño",
    image: Image3,
    tag: ["desarrollo", "diseño"],
    delayAnimation: "200",
    modalDetails: [
      {
        project: "Desarrollo web de suscripción de comida a domicilio",
        client: "Bulldog Green",
        language: "Wordpress, PHP, figma, Photoshop, Illustrator",
        preview: "bulldoggreen.com",
        link: "https://bulldoggreen.com/",
      },
    ],
  },
  {
    id: 4,
    type: "Desarrollo web",
    image: Image4,
    tag: ["desarrollo"],
    delayAnimation: "0",
    modalDetails: [
      {
        project: "Desarrollo web de revista orientada a la música y el estilo de moda juvenil",
        client: "FleekMag",
        language: "Wordpress",
        preview: "fleek.25gramos.com",
        link: "https://fleek.25gramos.com/",
      },
    ],
  },
  {
    id: 5,
    type: "Desarrollo web + Diseño + Marketing",
    image: Image5,
    tag: ["desarrollo", "diseño", "marketing"],
    delayAnimation: "100",
    modalDetails: [
      {
        project: "Desarrollo web Shopify para el prestigioso diseñador de moda Juan Vidal",
        client: "Juan Vidal",
        language: "Shopify, Liquid, Figma, Photoshop, Illustrator, Google Ads, META",
        preview: "juan-vidal.com",
        link: "https://juan-vidal.com/",
      },
    ],
  },
  {
    id: 6,
    type: "Desarrollo web + SEO",
    image: Image6,
    tag: ["desarrollo", "marketing"],
    delayAnimation: "200",
    modalDetails: [
      {
        project: "Desarrollo web para un cliente de montaje de tuberías y renovación de calderas",
        client: "Chrisar",
        language: "Wordpress, Analytics, Search Console",
        preview: "chrisar.es",
        link: "https://chrisar.es",
      },
    ],
  },
  {
    id: 7,
    type: "Desarrollo full stack",
    image: Image7,
    tag: ["desarrollo", "diseño"],
    delayAnimation: "0",
    modalDetails: [
      {
        project: "Desarrollo full stack con php7 para la creación de una intranet para la compañía inmobiliaria básico homes. Gestión de inquilinos, firma digital de contratos y acceso a diferentes API de scoring",
        client: "Basico Homes Gestión SL",
        language: "HTML, CSS, Javascript, PHP7, GIT, Kanban",
        preview: "intranet.basico.es",
        link: "https://intranet.basico.es/",
      },
    ],
  },
  {
    id: 8,
    type: "Desarrollo web",
    image: Image8,
    tag: ["desarrollo", "diseño"],
    delayAnimation: "100",
    modalDetails: [
      {
        project: "Rediseño web originalmente en WIX y migrado a Wordpress, SEO básico",
        client: "Levanova",
        language: "WIX, Wordpress, SEO",
        preview: "levanova.es",
        link: "https://levanova.es/",
      },
    ],
  },
  {
    id: 9,
    type: "Imagen corporativa + Desarrollo web + Moodle + Marketing",
    image: Image9,
    tag: ["desarrollo", "diseño", "marketing"],
    delayAnimation: "200",
    modalDetails: [
      {
        project: "Rediseño de la imagen corporativa de la Fundación Ortega y Gasset-Gregorio Marañón, desarrollo web en Wordpress, Moodle y campañas de marketing digital en Google Ads y META, aula virtual para sus doctorados en Moodle",
        client: "FUNDACIÓN JOSÉ ORTEGA Y GASSET",
        language: "Wordpress, Adobe XD, Photoshop, Illustrator, Google Ads, META, Moodle, PHP7, HTML, CSS, Javascript",
        preview: "iuiog.com",
        link: "https://iuiog.com/",
      },
    ],
  },
];

export default PortfolioData;
