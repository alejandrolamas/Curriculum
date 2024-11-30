import { useState } from "react";
import img1 from "../assets/img/blog/fundamentos-basicos-de-la-programacion.jpg";
import img2 from "../assets/img/blog/tendencias-diseno-web-2025.jpg";
import img3 from "../assets/img/blog/guia-iniciarse-wordpress-elementor.jpg";

const blogsData = [
  {
    id: 1,
    img: img1,
    slug: "fundamentos-basicos-de-la-programacion",
    title: "Fundamentos básicos de la programación",
    commentor: "Alejandro",
    date: "16 Noviembre 2024",
    tag: "programación, fundamentos, principiantes",
    description1:
      "La programación es el arte de comunicar instrucciones precisas a las computadoras para que realicen tareas específicas. Este artículo profundiza en los conceptos esenciales que todo programador principiante debe conocer.",
    description2:
      "Desde entender cómo funcionan las variables y los bucles hasta explorar funciones y programación orientada a objetos, cada sección está diseñada para ofrecer un aprendizaje progresivo, complementado con ejemplos prácticos.",
    description3: "¡Adéntrate en este apasionante recorrido por los fundamentos de la programación!",
    content: [
      {
        sectionTitle: "¿Qué es la programación?",
        text: "La programación es el proceso de diseñar, escribir y organizar un conjunto de instrucciones que una computadora puede ejecutar para realizar tareas específicas. Estas instrucciones, conocidas como código, se crean en lenguajes de programación como Python, JavaScript o Java. Es una habilidad clave para el desarrollo de software, aplicaciones móviles, sitios web y sistemas automatizados.",
      },
      {
        sectionTitle: "¿Por qué aprender a programar?",
        text: "La programación no solo te capacita para resolver problemas tecnológicos, sino que también mejora tu capacidad de pensamiento lógico y estructurado. Algunas ventajas de aprender programación son:",
        list: [
          "Automatización de tareas repetitivas.",
          "Acceso a una amplia gama de oportunidades laborales.",
          "Facilidad para materializar tus ideas en aplicaciones o sistemas.",
          "Desarrollo del pensamiento crítico y habilidades para la resolución de problemas.",
        ],
      },
      {
        sectionTitle: "Variables y tipos de datos",
        text: "Las variables son espacios en la memoria que almacenan datos durante la ejecución de un programa. Cada variable tiene un tipo de dato que define el tipo de información que puede contener, como números, texto o valores booleanos.",
        code: `
  // Ejemplo en JavaScript
  let nombre = "Ana"; // Cadena de texto
  let edad = 25; // Número entero
  let esEstudiante = true; // Booleano
  
  console.log("Nombre:", nombre); // Salida: Nombre: Ana
  console.log("Edad:", edad); // Salida: Edad: 25
  console.log("Es estudiante:", esEstudiante); // Salida: Es estudiante: true
        `,
      },
      {
        sectionTitle: "Operadores",
        text: "Los operadores son símbolos que indican a la computadora realizar operaciones matemáticas, de comparación o lógicas. Algunos ejemplos incluyen:",
        list: [
          "**Aritméticos:** + (suma), - (resta), * (multiplicación), / (división).",
          "**Comparación:** == (igual a), != (diferente de), > (mayor que), < (menor que).",
          "**Lógicos:** && (AND), || (OR), ! (NOT).",
        ],
        code: `
  // Operadores en JavaScript
  let a = 10, b = 5;
  
  console.log(a + b); // Salida: 15
  console.log(a > b); // Salida: true
  console.log((a > 5) && (b < 10)); // Salida: true
        `,
      },
      {
        sectionTitle: "Estructuras de control: Condicionales",
        text: "Las estructuras condicionales permiten que el programa tome decisiones basadas en condiciones. Una de las más comunes es `if-else`.",
        code: `
  // Estructura condicional en JavaScript
  let temperatura = 30;
  
  if (temperatura > 25) {
    console.log("Hace calor.");
  } else {
    console.log("El clima es agradable.");
  }
        `,
      },
      {
        sectionTitle: "Estructuras de control: Bucles",
        text: "Los bucles permiten repetir un conjunto de instrucciones mientras se cumpla una condición específica.",
        code: `
  // Bucle 'for' en JavaScript
  for (let i = 0; i < 5; i++) {
    console.log("Iteración:", i);
  }
  
  // Bucle 'while' en JavaScript
  let contador = 0;
  while (contador < 3) {
    console.log("Contador:", contador);
    contador++;
  }
        `,
      },
      {
        sectionTitle: "Funciones",
        text: "Las funciones son bloques de código diseñados para realizar tareas específicas. Puedes reutilizarlas en diferentes partes de tu programa.",
        code: `
  // Función en JavaScript
  function saludar(nombre) {
    return "Hola, " + nombre + "!";
  }
  
  console.log(saludar("Luis")); // Salida: Hola, Luis!
        `,
      },
      {
        sectionTitle: "Arreglos",
        text: "Los arreglos, o arrays, son estructuras de datos que permiten almacenar múltiples valores en una sola variable. Son útiles para manejar colecciones de datos.",
        code: `
  // Arreglo en JavaScript
  let frutas = ["Manzana", "Banana", "Cereza"];
  
  console.log(frutas[0]); // Salida: Manzana
  console.log(frutas.length); // Salida: 3
  
  frutas.forEach((fruta) => {
    console.log(fruta);
  });
        `,
      },
      {
        sectionTitle: "Programación orientada a objetos (POO)",
        text: "La POO es un paradigma de programación que organiza el código en clases y objetos, facilitando la modularidad y reutilización.",
        code: `
  // Clase y objeto en Python
  class Persona:
      def __init__(self, nombre, edad):
          self.nombre = nombre
          self.edad = edad
  
      def saludar(self):
          return f"Hola, soy {self.nombre} y tengo {self.edad} años."
  
  persona1 = Persona("Marta", 30)
  print(persona1.saludar()) // Salida: Hola, soy Marta y tengo 30 años.
        `,
      },
      {
        sectionTitle: "Buenas prácticas en programación",
        text: "Escribir código limpio y eficiente es esencial para proyectos escalables y mantenibles. Algunas prácticas recomendadas son:",
        list: [
          "Utiliza nombres descriptivos para variables y funciones.",
          "Escribe comentarios para explicar partes complejas del código.",
          "Organiza tu código en módulos y funciones.",
          "Realiza pruebas regulares para identificar y corregir errores.",
        ],
      },
      {
        sectionTitle: "Conclusión",
        text: "La programación es una herramienta poderosa que abre puertas a innumerables oportunidades. Dominar sus fundamentos es el primer paso hacia el desarrollo de aplicaciones innovadoras y soluciones tecnológicas. ¡Empieza hoy mismo y da vida a tus ideas!",
      },
    ],
  }, {
    id: 2,
    img: img2, 
    slug: "futuro-del-diseno-web-y-branding-2025",
    title: "El futuro del diseño web y branding de cara a 2025",
    commentor: "Alejandro Lamas",
    date: "23 Noviembre 2024",
    tag: "diseño web, branding, tendencias",
    description1:
      "En la próxima década, el diseño web y el branding experimentarán transformaciones significativas debido a la evolución tecnológica y las expectativas cambiantes de los consumidores.",
    description2:
      "Este artículo analiza estas modificaciones anticipadas, enfocándose en la estética, las innovaciones tecnológicas y la influencia creciente de la inteligencia artificial.",
    description3:
      "Descubre cómo estas tendencias definirán el diseño web y el branding hacia 2025.",
    content: [
      {
        sectionTitle: "Evolución prevista en el diseño web para 2025",
        text: [
          "Al considerar el futuro del diseño web, es fundamental hacer hincapié en las transformaciones que se manifestarán en la estética y la funcionalidad de las páginas web.",
          "Este cambio se producirá a través de diversas corrientes que ya están marcando el camino hacia un enfoque más flexible y dinámico.",
        ],
      },
      {
        sectionTitle: "Cambios en la estética del diseño web",
        text: [
          "Se anticipa que la estética del diseño web se inclinará hacia lo minimalista, enfocado en la simplicidad y la usabilidad. Esto implica una disminución de elementos superfluos y una mayor concentración en la experiencia del usuario. Colores más suaves, tipografías elegantes y una jerarquía visual clara se convertirán en normas. Esto no solo responde a las preferencias estéticas de los consumidores, sino también a la necesidad creciente de acceder a contenido de forma rápida y eficiente.",
          "Además, los elementos de diseño se adaptarán para ser más inclusivos, reconociendo la diversidad de sus usuarios. Esto se traducirá en un uso más consciente de imágenes, ilustraciones y diseños que reflejen diferentes culturas y estilos de vida, garantizando así una representación adecuada.",
          "En este contexto, se espera que los diseñadores web comiencen a experimentar con paletas de colores que evocan emociones específicas, utilizando la psicología del color para influir en la percepción del usuario. Por ejemplo, tonos azules pueden transmitir confianza, mientras que los verdes pueden asociarse con la naturaleza y la sostenibilidad. Esta atención al detalle no solo enriquecerá la experiencia del usuario, sino que también ayudará a las marcas a comunicar sus valores de manera más efectiva.",
        ],
      },
      {
        sectionTitle: "Innovaciones tecnológicas en el diseño web",
        text: [
          "Con el avance continuo de tecnologías como el desarrollo de frameworks y herramientas como CSS Grid y Flexbox, el diseño web se tornará más interactivo y responsivo. Estos avances no solo facilitarán la creación de interfaces más atractivas, sino que también permitirán una integración más fluida con otras plataformas digitales.",
          "Además, el uso de realidad aumentada (AR) y realidad virtual (VR) comenzará a integrarse en los sitios web, permitiendo una experiencia inmersiva para los usuarios. Esto levantará las expectativas del público sobre cómo interactuar con el contenido digital y redefinirá la noción de navegación.",
          "Por otro lado, la implementación de tecnologías de voz y chatbots también jugará un papel crucial en la evolución del diseño web. Los usuarios podrán interactuar con los sitios de manera más natural, utilizando comandos de voz para buscar información o realizar compras. Esta tendencia no solo mejorará la accesibilidad, sino que también ofrecerá una experiencia más personalizada y eficiente, adaptándose a las necesidades de cada usuario en tiempo real.",
        ],
      },
      {
        sectionTitle: "Impacto de la inteligencia artificial en el diseño web",
        text: [
          "La inteligencia artificial (IA) sin duda representará un cambio radical en el diseño web. Su integración permitirá personalizar la experiencia del usuario en un nivel que antes era inimaginable. A través del análisis de datos, las plataformas podrán ofrecer contenido y soluciones adaptadas a las preferencias individuales de cada usuario, optimizando la navegación y la interacción en tiempo real.",
          "Además, se espera que herramientas basadas en IA faciliten la creación de contenido gráfico y textual, ahorrando tiempo y recursos. Por ejemplo, se desarrollarán algoritmos que generarán automáticamente maquetas de diseño basadas en entradas del usuario, lo que fomentará la eficiencia en el proceso de diseño.",
          "La IA también permitirá el análisis predictivo, donde los sitios web podrán anticipar las necesidades de los usuarios antes de que ellos mismos las expresen. Esto podría incluir recomendaciones de productos, contenido relevante o incluso la adaptación del diseño en función del comportamiento del usuario. Esta capacidad de adaptación no solo mejorará la satisfacción del cliente, sino que también aumentará la tasa de conversión y la lealtad a la marca, creando un ciclo virtuoso de interacción y compromiso.",
        ],
      },
      {
        sectionTitle: "El papel de la sostenibilidad en el branding",
        text: [
          "En el futuro, la sostenibilidad se convertirá no solo en una opción ética, sino en una expectativa normativa de los consumidores. Las marcas que adopten prácticas sostenibles no solo solidificarán su posición en el mercado, sino que también fomentarán una lealtad más profunda entre sus clientes.",
          "Empresas que se presenten como socialmente responsables, con un enfoque en el comercio justo, la reducción de residuos y la transparencia en su cadena de suministro, atraerán a un público más amplio. La sostenibilidad se transformará en un componente esencial del branding, permitiendo a las empresas diferenciarse en un mercado cada vez más saturado.",
          "Además, la implementación de tecnologías verdes y la innovación en productos eco-amigables serán cruciales. Los consumidores estarán más inclinados a apoyar marcas que no solo se comprometan a reducir su huella de carbono, sino que también ofrezcan soluciones creativas para problemas ambientales. Esto generará un ciclo positivo donde la sostenibilidad no solo beneficia al planeta, sino que también se traduce en un crecimiento económico para las marcas que lo adoptan.",
        ],
      },
    ],
  }, {
    id: 3,
    img: img3, 
    slug: "guia-iniciarse-wordpress-elementor",
    title: "Guía para iniciarse en el mundo de Wordpress, crear una web sencilla paso a paso usando Elementor",
    commentor: "Alejandro Lamas",
    date: "30 Noviembre 2024",
    tag: "Wordpress, Elementor, desarrollo web",
    description1:
      "Descubre cómo usar Wordpress y Elementor para crear un sitio web atractivo y funcional. Aprende paso a paso las bases para diseñar una página profesional sin necesidad de ser experto.",
    description2:
      "Desde entender qué es Wordpress hasta aprender a usar Elementor, esta guía te llevará de la mano para crear y personalizar tu primer sitio web.",
    description3:
      "Ideal para principiantes, descubre las ventajas de estas herramientas y cómo aprovecharlas al máximo.",
    content: [
      {
        sectionTitle: "Entendiendo Wordpress: una introducción",
        text: [
          "Wordpress es uno de los sistemas de gestión de contenido más populares del mundo. Originalmente diseñado como una plataforma para blogs, ha evolucionado enormemente y ahora es utilizado por millones de sitios web, desde blogs personales hasta complejas tiendas en línea. Esta flexibilidad se debe en gran parte a su comunidad activa que desarrolla temas y plugins que extienden sus funcionalidades.",
          "A lo largo de este artículo, exploraremos cómo usar Wordpress y Elementor, una herramienta visual de creación de páginas, para crear un sitio web atractivo y funcional, paso a paso. La combinación de ambas herramientas permite a los usuarios, sin necesidad de ser expertos en programación, diseñar sitios que se adapten a sus necesidades específicas.",
        ],
      },
      {
        sectionTitle: "¿Qué es Wordpress y por qué usarlo?",
        text: [
          "Wordpress es un software de código abierto que permite a los usuarios crear y gestionar contenido en la web. Está basado en PHP y utiliza una base de datos MySQL, lo que le proporciona robustez y flexibilidad. Uno de los principales atractivos de Wordpress es su facilidad de uso; incluso los principiantes pueden aprender rápidamente a instalar plugins, temas y crear contenidos.",
          "Además, Wordpress es altamente personalizable. Con miles de temas y plugins disponibles, puedes añadir casi cualquier funcionalidad que desees, desde formularios de contacto hasta sistemas de e-commerce.",
        ],
      },
      {
        sectionTitle: "Ventajas de usar Wordpress para tu sitio web",
        text: [
          "Fácil de instalar y configurar: Muchos proveedores de hosting ofrecen instalación con un solo clic.",
          "Extensibilidad: Puedes ampliar las funcionalidades de tu web con plugins y temas.",
          "SEO amigable: Wordpress es reconocido por estar optimizado para motores de búsqueda.",
          "Gran comunidad de soporte: Existe una vasta comunidad de usuarios y desarrolladores dispuestos a ayudar.",
          "Una de las características más destacadas de Wordpress es su enfoque en la accesibilidad. Esto significa que, independientemente de tu nivel de habilidad técnica, puedes crear y mantener un sitio web de aspecto profesional.",
        ],
      },
      {
        sectionTitle: "Primeros pasos en Wordpress",
        text: [
          "Antes de crear tu sitio web, es esencial entender cómo funciona Wordpress y cómo interactuar con su interfaz. Esto facilitará enormemente el proceso de creación y gestión de tu contenido.",
        ],
      },
      {
        sectionTitle: "Cómo instalar Wordpress",
        text: [
          "La instalación de Wordpress es sencilla y puede realizarse de diferentes maneras. Una de las formas más comunes es a través de tu proveedor de hosting, que a menudo ofrece una instalación automática.",
          "Si decides realizar una instalación manual, necesitarás descargar el paquete de Wordpress desde su página oficial. Después de descomprimirlo, deberás subir los archivos a tu servidor usando un cliente FTP. Finalmente, configurarás un archivo de configuración y crearás una base de datos para concluir el proceso de instalación.",
        ],
      },
      {
        sectionTitle: "Creando tu primera página web con Wordpress",
        text: [
          "Crear tu primera web con Wordpress se convierte en una experiencia gratificante. Con las herramientas adecuadas y un diseño en mente, podrás lograr resultados sorprendentes en poco tiempo.",
        ],
      },
      {
        sectionTitle: "Elegir y personalizar tu tema",
        text: [
          "El primer paso en la creación de tu página web es elegir un tema. Wordpress ofrece una amplia variedad de temas gratuitos y de pago en su repositorio. Es recomendable seleccionar un tema que no solo se ajuste a la estética que deseas, sino que también sea responsivo y optimizado para SEO.",
          "Una vez elegido el tema, puedes personalizarlo según tus preferencias. Desde el panel de control, accede a 'Apariencia' y luego a 'Personalizar' para modificar colores, tipografías y otros elementos visuales de tu sitio.",
        ],
      },
      {
        sectionTitle: "Introducción a Elementor: el constructor de páginas para Wordpress",
        text: [
          "Elementor es un plugin de Wordpress que permite construir páginas de manera visual. Su interfaz de arrastrar y soltar facilita el diseño de páginas atractivas sin necesidad de escribir código.",
          "Elementor proporciona una forma intuitiva de diseñar páginas utilizando widgets listos para usar.",
        ],
      },
      {
        sectionTitle: "Instalación y configuración de Elementor",
        text: [
          "La instalación de Elementor es un proceso sencillo. Desde el panel de control de Wordpress, dirígete a 'Plugins' y luego a 'Añadir nuevo'. Busca Elementor en el campo de búsqueda, instala y activa el plugin.",
          "Una vez instalado, encontrarás una nueva opción en el editor de páginas de Wordpress que te permitirá usar el constructor de páginas para crear o editar contenidos de forma visual.",
        ],
      },
      {
        sectionTitle: "Consejos y trucos para mejorar tu web en Wordpress con Elementor",
        text: [
          "Una vez que tu sitio está en marcha, hay varios aspectos a considerar para mejorar su rendimiento y apariencia. Estos consejos y trucos pueden ayudarte a maximizar la efectividad de tu web.",
          "Optimización de la web para motores de búsqueda: La optimización para motores de búsqueda (SEO) es esencial para que tu sitio web sea encontrado en internet.",
        ],
      },
    ],
  },
  
];

const AllBlogData = () => {
  const [singleData, setSingleData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // Obtener blog por ID o slug
  const handleBlogsData = (id) => {
    const find = blogsData.find((item) => item.id === id);
    setSingleData(find);
    setIsOpen(true);
  };

  const getBlogBySlug = (slug) => {
    return blogsData.find((item) => item.slug === slug);
  };

  return {
    singleData,
    isOpen,
    setIsOpen,
    blogsData,
    handleBlogsData,
    getBlogBySlug,
  };
};

export default AllBlogData;