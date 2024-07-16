import { useState } from "react";
import img1 from "../assets/img/blog/img1.png";

const AllBlogData = () => {
  const blogsData = [
    {
      id: 1,
      img: img1,
      title: "Why Full Stack Developers Need Admin Permissions",
      commentor: "Admin",
      date: "16 July 2024",
      tag: `development, security, productivity`,
      description1: "Un desarrollador full stack debería tener permisos de administrador en su equipo por varias razones prácticas y técnicas, aunque se le restrinjan ciertos accesos a través de VPN LDAP:",
      description2: "Configuración y Personalización del Entorno de Desarrollo: Los desarrolladores full stack a menudo necesitan instalar y configurar una variedad de herramientas, bibliotecas y entornos que son esenciales para su trabajo. Tener permisos de administrador permite hacer estos cambios de manera eficiente sin tener que esperar la intervención del equipo de TI.",
      description3: "Depuración y Solución de Problemas: En muchas ocasiones, los desarrolladores necesitan acceder a archivos del sistema, registros y configuraciones que solo están disponibles con permisos de administrador para identificar y resolver problemas rápidamente.",
      description4: "Automatización y Scripting: Los desarrolladores full stack frecuentemente crean y ejecutan scripts y automatizaciones que pueden requerir permisos elevados para funcionar correctamente. Esto incluye tareas como la gestión de dependencias, configuración de servidores locales y pruebas de integración.",
      description5: "Desarrollo y Pruebas Locales: La capacidad de ejecutar servidores locales, configurar bases de datos y servicios web en su máquina es crucial para el desarrollo y pruebas de aplicaciones antes de desplegarlas en entornos de producción.",
      description6: "Eficiencia y Productividad: Solicitar continuamente permisos o intervenciones del equipo de TI puede ser un obstáculo significativo para la productividad. Permitir que los desarrolladores tengan control total sobre su entorno de desarrollo minimiza estas interrupciones.",
      description7: "Seguridad Adaptada: Aunque se otorguen permisos de administrador, el uso de VPN y LDAP para controlar el acceso a ciertos recursos y datos sensibles asegura que la organización mantenga una postura de seguridad adecuada. Esto permite un equilibrio entre la flexibilidad necesaria para el desarrollo y la protección de los activos críticos de la empresa.",
      description8: "Mecanismos de Control y Seguridad: Para mitigar los riesgos asociados con otorgar permisos de administrador, se pueden implementar las siguientes medidas de seguridad:",
      description9: "Segmentación de Red y Control de Acceso: Utilizar VPN y LDAP para limitar el acceso a recursos críticos basados en la función del usuario.",
      description10: "Políticas de Contraseña y Autenticación de Dos Factores: Asegurar que los dispositivos administrados cumplan con políticas de seguridad estrictas.",
      description11: "Monitoreo y Auditoría: Implementar herramientas de monitoreo para registrar y revisar las actividades realizadas con privilegios elevados.",
      description12: "Actualizaciones y Parcheo: Mantener los sistemas actualizados con los últimos parches de seguridad.",
      description13: "Capacitación y Conciencia de Seguridad: Asegurar que los desarrolladores estén al tanto de las mejores prácticas de seguridad y comprendan los riesgos asociados con el uso de privilegios elevados.",
      description14: "En resumen, otorgar permisos de administrador a los desarrolladores full stack, mientras se restringe el acceso a través de mecanismos de control como VPN y LDAP, permite un entorno de trabajo flexible y eficiente al mismo tiempo que se mantienen medidas de seguridad adecuadas.",
    },
  ];

  const [singleData, setSingleData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleBlogsData = (id) => {
    const find = blogsData.find((item) => item?.id === id);
    setSingleData(find);
    setIsOpen(true);
  };

  return {
    singleData,
    isOpen,
    setIsOpen,
    blogsData,
    handleBlogsData,
  };
};

export default AllBlogData;
