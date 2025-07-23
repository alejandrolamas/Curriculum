import { useState } from "react";
import img1 from "../assets/img/blog/fundamentos-basicos-de-la-programacion.jpg";
import img2 from "../assets/img/blog/tendencias-diseno-web-2025.jpg";
import img3 from "../assets/img/blog/guia-iniciarse-wordpress-elementor.jpg";
import img4 from "../assets/img/blog/tailwind.png";
import img5 from "../assets/img/blog/error-403-forbidden.png";
import img6 from "../assets/img/blog/ofuscacion-de-enlaces-posicionamiento-seo.jpg";
import img7 from "../assets/img/blog/glosario-sem.jpg";
import img8 from "../assets/img/blog/canibalizacion-seo-contenido-duplicado.jpg";
import img9 from "../assets/img/blog/comparativa-mejores-ia-2025.jpg";
import img10 from "../assets/img/blog/nextjs_tailwind.jpg";
import img11 from "../assets/img/blog/mongoose.png";
import img12 from "../assets/img/blog/nodemailer.jpg";

const blogsData = [
  {
    id: 1,
    img: img1,
    slug: "fundamentos-basicos-de-la-programacion",
    title: "Fundamentos básicos de la programación: Una guía esencial para principiantes",
    commentor: "Alejandro Lamas",
    date: "16 Noviembre 2024",
    tag: "programación, fundamentos, aprender a programar, desarrollo web",
    description1:
        "Aprender a programar es como aprender un nuevo idioma que abre puertas al mundo digital. Este artículo es la guía definitiva para quienes desean iniciarse en este emocionante campo, explicando desde conceptos básicos hasta buenas prácticas esenciales.",
    description2:
        "Explora temas fundamentales como variables, bucles, estructuras de control y más, con ejemplos prácticos que facilitan tu aprendizaje. Ideal para principiantes y curiosos del desarrollo.",
    description3:
        "Adéntrate en este fascinante viaje y domina las bases de la programación. ¡Es el primer paso hacia un futuro lleno de posibilidades tecnológicas!",
    content: [
        {
            sectionTitle: "¿Qué es la programación y por qué es importante?",
            text: [
                "La programación es la base de todo lo digital. Desde aplicaciones móviles hasta sistemas automatizados, todo funciona gracias a líneas de código escritas en lenguajes como Python, JavaScript y Java.",
                "Entender la programación no solo te permitirá crear soluciones tecnológicas, sino que también te ayudará a desarrollar un pensamiento lógico y estructurado, habilidades esenciales en el mundo actual."
            ],
        },
        {
            sectionTitle: "Razones para aprender a programar",
            text: [
                "Aprender a programar puede parecer desafiante al principio, pero los beneficios son innumerables:",
            ],
            list: [
                "Automatización de tareas tediosas, mejorando la eficiencia.",
                "Ampliación de oportunidades laborales en un mercado tecnológico en constante crecimiento.",
                "Capacidad para transformar ideas en aplicaciones útiles y funcionales.",
                "Desarrollo de habilidades analíticas y resolución de problemas."
            ],
        },
        {
            sectionTitle: "Conceptos básicos: Variables y Tipos de Datos",
            text: [
                "Las variables son los pilares de cualquier programa. Son espacios en la memoria que guardan datos durante la ejecución.",
                "Estos datos pueden ser números, texto o valores booleanos. Comprender cómo usar las variables correctamente es esencial para escribir programas eficientes."
            ],
            code: `
// Ejemplo en JavaScript
let nombre = "Carlos";
let edad = 30;
let esProgramador = true;

console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("Es programador:", esProgramador);
            `,
        },
        {
            sectionTitle: "Estructuras de Control: Condicionales y Bucles",
            text: [
                "Las estructuras de control permiten a los programas tomar decisiones y ejecutar acciones repetitivas de manera eficiente.",
                "Por ejemplo, los bucles como `for` o `while` son fundamentales para automatizar tareas repetitivas."
            ],
            code: `
// Condicional en JavaScript
let edad = 18;
if (edad >= 18) {
    console.log("Eres mayor de edad.");
} else {
    console.log("Eres menor de edad.");
}

// Bucle 'for' en JavaScript
for (let i = 1; i <= 5; i++) {
    console.log("Iteración:", i);
}
            `,
        },
        {
            sectionTitle: "Funciones: Modulares y Reutilizables",
            text: [
                "Las funciones son bloques de código que realizan tareas específicas. Estas no solo facilitan la lectura del código, sino que también promueven la reutilización y el mantenimiento."
            ],
            code: `
// Función en JavaScript
function saludar(nombre) {
    return "Hola, " + nombre + "!";
}

console.log(saludar("Lucía"));
            `,
        },
        {
            sectionTitle: "Buenas Prácticas en Programación",
            text: [
                "Escribir código claro y eficiente es fundamental para evitar errores y facilitar el mantenimiento. Algunas buenas prácticas incluyen:"
            ],
            list: [
                "Usar nombres descriptivos para variables y funciones.",
                "Escribir comentarios para explicar partes complejas del código.",
                "Organizar el código en bloques modulares.",
                "Probar regularmente el programa para identificar y solucionar errores."
            ],
        },
        {
            sectionTitle: "Conclusión: Tu Primer Paso en el Mundo de la Programación",
            text: [
                "Dominar los fundamentos de la programación es el inicio de un viaje que puede transformar tu forma de pensar y resolver problemas.",
                "Comienza con pequeños pasos, practica regularmente y no dudes en explorar diferentes lenguajes y tecnologías. ¡El mundo digital está lleno de oportunidades esperando por ti!"
            ],
        },
    ],
  }, {
    id: 2,
    img: img2,
    slug: "futuro-del-diseno-web-y-branding-2025",
    title: "El futuro del diseño web y branding: tendencias que marcarán 2025",
    commentor: "Alejandro Lamas",
    date: "17 Noviembre 2024",
    tag: "diseño web, branding, tendencias, tecnología, inteligencia artificial",
    description1:
        "El diseño web y el branding están a punto de entrar en una nueva era gracias a los avances tecnológicos y las demandas cambiantes de los usuarios. Desde el minimalismo hasta la IA, estas tendencias no solo transformarán la estética, sino también la forma en que interactuamos digitalmente.",
    description2:
        "Explora cómo la realidad aumentada, la personalización impulsada por IA y un enfoque sostenible están configurando el futuro del diseño web y el branding para ofrecer experiencias más conectadas, eficientes e inclusivas.",
    description3:
        "¡Sumérgete en el futuro del diseño digital y descubre cómo estas tendencias están redefiniendo la creatividad y la tecnología!",
    content: [
        {
            sectionTitle: "El nuevo rostro del diseño web en 2025",
            text: [
                "¿Listo para dejar atrás las webs aburridas? En 2025, el diseño web será más dinámico, inclusivo y centrado en el usuario que nunca. Las tendencias actuales están pavimentando el camino hacia experiencias digitales inmersivas y personalizadas.",
                "¿Qué significa esto? Prepárate para sitios web que no solo sean visualmente impactantes, sino que también se adapten a ti como un traje hecho a medida."
            ],
        },
        {
            sectionTitle: "Minimalismo: Menos es más (y mejor)",
            text: [
                "El minimalismo dominará. Adiós a las páginas saturadas; hola a interfaces limpias y fáciles de usar. Colores suaves, tipografías elegantes y un enfoque claro en la funcionalidad estarán al centro de esta revolución.",
                "Pero no es solo estética: el diseño minimalista mejora la velocidad de carga y hace que la navegación sea un placer. Además, veremos un esfuerzo consciente por incluir elementos visuales que reflejen la diversidad y conecten con audiencias globales."
            ],
        },
        {
            sectionTitle: "Tecnologías inmersivas: La web como nunca antes la imaginaste",
            text: [
                "Si pensabas que la realidad virtual era solo para gamers, piénsalo otra vez. La realidad aumentada (AR) y virtual (VR) están llegando al diseño web para transformar cómo interactuamos con productos y servicios.",
                "¿Quieres probarte ropa sin salir de casa? ¿Caminar por una propiedad en venta desde tu sofá? Estas experiencias inmersivas serán el estándar en un mundo donde las pantallas ya no son suficientes."
            ],
            code: `
// Ejemplo de integración de realidad aumentada con WebXR en JavaScript
navigator.xr.requestSession('immersive-ar').then((session) => {
    console.log("AR activado!");
    // Código para mostrar objetos 3D en AR
});
                `,
        },
        {
            sectionTitle: "Inteligencia artificial: Diseños que te leen la mente (casi)",
            text: [
                "¿Te imaginas un sitio que se adapte a tus necesidades sin que tengas que decir nada? La inteligencia artificial hará esto realidad. Con análisis predictivo y personalización avanzada, las webs podrán ofrecer contenido, productos y experiencias ajustadas a cada usuario en tiempo real.",
                "Además, herramientas de diseño basadas en IA facilitarán la creación de prototipos y diseños visuales, ahorrando tiempo y recursos a diseñadores y desarrolladores."
            ],
        },
        {
            sectionTitle: "Sostenibilidad en el branding: Más verde, más brillante",
            text: [
                "Las marcas del futuro serán más verdes, no solo porque está de moda, sino porque es una necesidad. Los consumidores buscan marcas que se alineen con sus valores, y la sostenibilidad se ha convertido en una prioridad.",
                "Desde sitios web eco-eficientes hasta productos con una huella de carbono reducida, el branding sostenible no es solo un gesto ético, es una estrategia de diferenciación en un mercado cada vez más consciente."
            ],
        },
        {
            sectionTitle: "Tendencias clave para implementar en tus proyectos",
            list: [
                "Diseño centrado en la accesibilidad: Crear experiencias para todos, sin importar habilidades o dispositivos.",
                "Interfaces conversacionales: Chatbots y comandos de voz que hacen que la navegación sea más intuitiva.",
                "Velocidad optimizada: Porque nadie tiene tiempo para esperar a que una página cargue.",
                "Diseño inclusivo: Reflejar la diversidad del mundo real en el entorno digital."
            ],
        },
        {
            sectionTitle: "Conclusión: Un vistazo al futuro",
            text: [
                "El diseño web y el branding están evolucionando a pasos agigantados, combinando tecnología, creatividad y un toque de humanidad. La clave está en mantenerse a la vanguardia, explorando nuevas herramientas y entendiendo lo que los usuarios realmente quieren.",
                "El 2025 será el año en que dejemos de hablar de la 'web del futuro' y comencemos a vivirla. ¿Estás listo para el cambio?"
            ],
        },
    ],
  }, {
    id: 3,
    img: img3,
    slug: "guia-iniciarse-wordpress-elementor",
    title: "Cómo crear tu primera web con Wordpress y Elementor: Guía paso a paso",
    commentor: "Alejandro Lamas",
    date: "20 Noviembre 2024",
    tag: "Wordpress, Elementor, desarrollo web, creación de páginas web",
    description1:
        "¿Nuevo en el mundo de la creación web? Aprende a dominar Wordpress y Elementor, dos herramientas poderosas que te permiten diseñar un sitio web increíble sin necesidad de saber programar.",
    description2:
        "Desde elegir tu tema hasta personalizar cada detalle con Elementor, esta guía te llevará de la mano para que tu web luzca profesional y sea funcional en pocos pasos.",
    description3:
        "¡Da tus primeros pasos en el desarrollo web con esta guía completa y transforma tus ideas en realidad digital!",
    content: [
        {
            sectionTitle: "¿Qué es Wordpress y por qué es perfecto para principiantes?",
            text: [
                "Wordpress es el rey indiscutible de los CMS (Content Management Systems). Ya sea que quieras crear un blog personal o una tienda online, su flexibilidad y facilidad de uso lo convierten en la mejor opción.",
                "Y lo mejor de todo: no necesitas ser un experto para empezar. Con miles de temas y plugins, puedes personalizar cada aspecto de tu web en pocos clics."
            ],
        },
        {
            sectionTitle: "Primeros pasos: Instalar Wordpress",
            text: [
                "Instalar Wordpress es tan fácil como preparar un café instantáneo. Si usas un proveedor de hosting confiable, probablemente tengan una opción de instalación automática.",
                "¿Prefieres hacerlo tú mismo? Descarga el paquete desde la página oficial de Wordpress, súbelo a tu servidor con un cliente FTP, configura una base de datos y listo. ¡No olvides guardar tus credenciales!"
            ],
            code: `
// Instalación básica en el archivo wp-config.php
define('DB_NAME', 'nombre_de_tu_base_de_datos');
define('DB_USER', 'tu_usuario');
define('DB_PASSWORD', 'tu_contraseña');
define('DB_HOST', 'localhost');
            `,
        },
        {
            sectionTitle: "Conociendo Elementor: La magia del diseño visual",
            text: [
                "Si Wordpress es el motor, Elementor es el volante. Este plugin te permite diseñar páginas web increíbles con una interfaz de arrastrar y soltar. Sin código, sin estrés.",
                "Desde galerías de imágenes hasta formularios de contacto, Elementor tiene widgets para todo. ¿Lo mejor? Puedes ver los cambios en tiempo real."
            ],
        },
        {
            sectionTitle: "Instalación de Elementor: Fácil y rápido",
            text: [
                "Para instalar Elementor, ve a 'Plugins' en tu panel de control de Wordpress. Haz clic en 'Añadir nuevo', busca Elementor y presiona 'Instalar'. Actívalo y listo, ya puedes empezar a diseñar."
            ],
        },
        {
            sectionTitle: "Diseña tu primera página: Paso a paso con Elementor",
            text: [
                "1. Crea una nueva página desde el panel de control de Wordpress y selecciona 'Editar con Elementor'.",
                "2. Elige una plantilla pre-diseñada o empieza desde cero.",
                "3. Añade widgets arrastrándolos al lienzo: imágenes, texto, botones, lo que quieras.",
                "4. Personaliza colores, fuentes y estilos hasta que tu diseño quede perfecto.",
                "5. Guarda los cambios y publica. ¡Tu primera página está lista para el mundo!"
            ],
        },
        {
            sectionTitle: "Consejos para destacar con tu web",
            list: [
                "Elige un tema responsivo: Asegúrate de que tu sitio se vea genial en cualquier dispositivo.",
                "Optimiza imágenes: Reduce su tamaño para que tu web cargue rápido.",
                "Crea contenido relevante: Tus visitantes quieren información útil, no solo diseños bonitos.",
                "Añade un toque personal: Usa colores, tipografías y estilos que reflejen tu marca."
            ],
        },
        {
            sectionTitle: "Ventajas de usar Wordpress y Elementor",
            text: [
                "Usar Wordpress junto con Elementor es como tener un superpoder en el mundo digital. Aquí están algunas razones para amarlos:",
            ],
            list: [
                "No necesitas saber programar.",
                "Tienes acceso a miles de plugins y plantillas.",
                "Puedes diseñar tu web en tiempo real.",
                "Elementor tiene una versión gratuita con funciones impresionantes (y una PRO si necesitas aún más)."
            ],
        },
        {
            sectionTitle: "Conclusión: Tu nueva web está más cerca de lo que piensas",
            text: [
                "Crear un sitio web nunca ha sido tan accesible. Con Wordpress y Elementor, tienes todo lo necesario para transformar tus ideas en realidad digital, sin importar tu nivel de experiencia.",
                "Así que deja de pensarlo y empieza a diseñar. El mundo digital está esperando lo que tienes para ofrecer."
            ],
        },
    ],
  }, {
  id: 4,
  img: img4,
  slug: "que-es-tailwind-css-guia-principiantes",
  title: "¿Qué es Tailwind CSS? Aprende a diseñar webs modernas como un profesional",
  commentor: "Alejandro Lamas",
  date: "24 Noviembre 2024",
  tag: "Tailwind CSS, desarrollo web, frameworks CSS, diseño web",
  description1:
      "Tailwind CSS está cambiando el juego del diseño web con su enfoque utility-first. Olvídate de escribir interminables líneas de CSS y aprende cómo este framework te ayuda a crear interfaces modernas y eficientes.",
  description2:
      "Descubre cómo Tailwind CSS puede simplificar tu flujo de trabajo, ofrecerte un control total sobre el diseño y ayudarte a construir webs increíbles en tiempo récord.",
  description3:
      "Esta guía es perfecta para principiantes que quieren dominar Tailwind CSS y diseñar sitios web con estilo y rapidez.",
  content: [
      {
          sectionTitle: "¿Qué es Tailwind CSS y por qué deberías usarlo?",
          text: [
              "Tailwind CSS es un framework CSS revolucionario que apuesta por un enfoque utility-first. ¿Qué significa esto? En lugar de depender de estilos predefinidos como en Bootstrap, Tailwind te ofrece pequeñas clases reutilizables para que diseñes con precisión quirúrgica.",
              "¿Quieres un botón con fondo azul, texto blanco y bordes redondeados? No necesitas escribir CSS desde cero. Solo usa estas clases:"
          ],
          code: `
<button class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700">
¡Haz clic aquí!
</button>
          `,
      },
      {
          sectionTitle: "La filosofía detrás de Tailwind CSS",
          text: [
              "Tailwind CSS es más que un framework, es una nueva manera de pensar el diseño web. En lugar de crear hojas de estilos globales, diseñas directamente en tu HTML con clases modulares.",
              "Este enfoque no solo mejora la consistencia en tus proyectos, sino que también hace tu código más limpio y fácil de mantener. ¿Te cuesta creerlo? Aquí un ejemplo:"
          ],
          code: `
<div class="flex items-center justify-center h-screen bg-gray-100">
<h1 class="text-4xl font-bold text-gray-800">¡Hola, Tailwind!</h1>
</div>
          `,
      },
      {
          sectionTitle: "Beneficios de usar Tailwind CSS",
          text: [
              "Tailwind CSS no es solo otra herramienta; es el framework que todo desarrollador moderno necesita en su arsenal. Algunas razones por las que deberías probarlo:"
          ],
          list: [
              "Alta personalización: Configura colores, tamaños y más en su archivo de configuración.",
              "Velocidad de desarrollo: Diseña interfaces completas en menos tiempo.",
              "Diseño responsivo integrado: Olvídate de las media queries; Tailwind ya lo hace por ti.",
              "Consistencia visual: Mantén el mismo estilo en todo tu proyecto con facilidad."
          ],
      },
      {
          sectionTitle: "Clases de utilidad que necesitas conocer",
          text: [
              "Tailwind CSS tiene cientos de clases para casi cualquier necesidad de diseño. Aquí algunas de las más populares:"
          ],
          list: [
              "`bg-red-500`: Fondo rojo.",
              "`text-xl`: Texto de tamaño extra grande.",
              "`p-4`: Padding de 1rem.",
              "`flex`: Activa Flexbox.",
              "`justify-between`: Espacia elementos equitativamente."
          ],
          code: `
<div class="flex justify-between bg-gray-800 text-white p-4">
<span>Inicio</span>
<span>Contacto</span>
</div>
          `,
      },
      {
          sectionTitle: "Herramientas que hacen brillar a Tailwind CSS",
          text: [
              "Tailwind CSS se integra perfectamente con herramientas modernas como Visual Studio Code. Instala la extensión de Tailwind CSS IntelliSense para disfrutar de autocompletado, sugerencias y errores resaltados.",
              "Además, puedes personalizar tu proyecto en el archivo `tailwind.config.js`. Por ejemplo, agregar colores personalizados es así de fácil:"
          ],
          code: `
module.exports = {
theme: {
  extend: {
    colors: {
      brandBlue: '#1E40AF',
      brandYellow: '#F59E0B',
    },
  },
},
};
          `,
      },
      {
          sectionTitle: "¿Cómo empezar con Tailwind CSS?",
          text: [
              "Hay varias formas de integrar Tailwind en tu proyecto, dependiendo de tus necesidades:"
          ],
          code: `
<!-- CDN para proyectos pequeños -->
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          `,
          textAfterCode: [
              "Si trabajas en algo más complejo, instalarlo con npm te da más control:"
          ],
          codeAfterText: `
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
          `,
      },
      {
          sectionTitle: "Conclusión: Un framework para diseñadores y desarrolladores modernos",
          text: [
              "Tailwind CSS ha llegado para quedarse. Su enfoque utility-first, combinado con su flexibilidad y velocidad, lo convierte en una herramienta imprescindible para crear sitios web modernos y eficientes.",
              "Si aún no lo has probado, este es el momento. Tailwind no solo hará que tu trabajo sea más rápido, sino que también elevará tus diseños al siguiente nivel."
          ],
      },
  ],
  }, {
    id: 5,
    img: img5,
    slug: "solucionar-error-403-scripts-wordpress",
    title: "¿Error 403 en WordPress? Aprende a solucionarlo en minutos",
    commentor: "Alejandro Lamas",
    date: "27 Noviembre 2024",
    tag: "WordPress, error 403, solución rápida, scripts",
    description1:
        "¿Te has topado con el temido error 403 en WordPress al cargar scripts? No te preocupes, en esta guía te explico cómo solucionarlo fácilmente y devolverle la funcionalidad a tu sitio web.",
    description2:
        "Desde entender qué causa este error hasta aprender a desactivar la concatenación de scripts en WordPress, aquí encontrarás todos los pasos necesarios para arreglarlo.",
    description3:
        "Tanto si eres principiante como si ya tienes experiencia, esta guía práctica te ayudará a superar el error 403 y a evitar futuros problemas en WordPress.",
    content: [
        {
            sectionTitle: "¿Qué es el error 403 en WordPress y por qué ocurre?",
            text: [
                "El error 403 Forbidden es una de esas sorpresas que ningún administrador de sitios quiere ver. Básicamente, significa que el servidor rechaza tu solicitud de acceso a un recurso.",
                "Este error puede tener varias causas: permisos incorrectos, un archivo `.htaccess` mal configurado, o incluso un plugin de seguridad sobreprotector. Pero no te preocupes, hoy vamos a centrarnos en una solución que funciona especialmente bien cuando este error afecta a la carga de scripts."
            ],
        },
        {
            sectionTitle: "Desactivando la concatenación de scripts en WordPress: El primer paso",
            text: [
                "WordPress utiliza algo llamado 'concatenación de scripts' para combinar múltiples archivos JavaScript en uno solo. Aunque esto mejora el rendimiento, también puede ser la causa del error 403 si algún script no se carga correctamente.",
                "La solución es desactivar esta funcionalidad temporalmente y cargar los scripts de forma individual. Aquí tienes cómo hacerlo:"
            ],
            code: `
define('CONCATENATE_SCRIPTS', false);
            `,
            textAfterCode: [
                "Este código se debe añadir al archivo `wp-config.php` de tu instalación de WordPress. Sigue los pasos que te explico a continuación."
            ],
        },
        {
            sectionTitle: "Cómo modificar el archivo wp-config.php",
            text: [
                "1. Accede a tu servidor mediante un cliente FTP o el administrador de archivos de tu hosting.",
                "2. Localiza el archivo `wp-config.php` en la raíz de tu instalación de WordPress.",
                "3. Ábrelo con un editor de texto y añade la línea `define('CONCATENATE_SCRIPTS', false);` justo antes de:",
                "`/* That's all, stop editing! Happy blogging. */`.",
                "4. Guarda los cambios y, si usas FTP, sube el archivo modificado al servidor."
            ],
            code: `
/* Esto desactiva la concatenación de scripts */
define('CONCATENATE_SCRIPTS', false);

/* That's all, stop editing! Happy blogging. */
            `,
            textAfterCode: [
                "Una vez hecho esto, recarga tu sitio y verifica si el error 403 ha desaparecido. En la mayoría de los casos, esta solución arreglará el problema."
            ],
        },
        {
            sectionTitle: "¿El error persiste? Prueba estas opciones",
            text: [
                "Si el error 403 sigue apareciendo, hay otras acciones que puedes tomar:",
            ],
            list: [
                "**Verifica los permisos:** Los permisos para carpetas deben estar configurados en 755, y para archivos, en 644.",
                "**Revisa el archivo `.htaccess`:** Si está corrupto, renómbralo y genera uno nuevo desde la configuración de enlaces permanentes en WordPress.",
                "**Desactiva plugins conflictivos:** Algunos plugins, especialmente los de seguridad, pueden causar este error. Desactívalos uno por uno para identificar al culpable.",
                "**Contacta a tu hosting:** Si ninguna de las soluciones anteriores funciona, el problema puede estar en restricciones del servidor. Tu proveedor de hosting puede ayudarte a resolverlo."
            ],
        },
        {
            sectionTitle: "Consejos para evitar errores 403 en el futuro",
            list: [
                "Realiza copias de seguridad regulares de tu sitio.",
                "Mantén WordPress, tus plugins y temas actualizados.",
                "Usa plugins de seguridad confiables y configura sus opciones con cuidado.",
                "Revisa los permisos de tus archivos después de instalar o actualizar plugins y temas."
            ],
        },
        {
            sectionTitle: "Conclusión: Recupera tu sitio sin complicaciones",
            text: [
                "El error 403 puede parecer un obstáculo gigante, pero con las herramientas y conocimientos adecuados, es fácil de superar. Desactivar la concatenación de scripts suele ser una solución rápida y efectiva.",
                "No olvides siempre hacer una copia de seguridad antes de realizar cambios importantes. Con un poco de paciencia, tu sitio volverá a estar operativo y funcionando al 100%. ¡Sigue aprendiendo y no dejes que un pequeño error te detenga!"
            ],
        },
    ],
  }, {
    id: 6,
    img: img6,
    slug: "ofuscacion-de-enlaces-ventajas-e-inconvenientes-en-posicionamiento-seo",
    title: "Ofuscación de enlaces: ¿Es buena idea para el SEO?",
    commentor: "Alejandro Lamas",
    date: "30 Noviembre 2024",
    tag: "SEO, ofuscación de enlaces, posicionamiento web, estrategias SEO",
    description1:
        "La ofuscación de enlaces es una técnica controvertida en el mundo del SEO. ¿Realmente mejora tu estrategia de posicionamiento o puede ser un error costoso? Descúbrelo aquí.",
    description2:
        "Exploramos los pros y contras de la ofuscación de enlaces, cómo afecta a los motores de búsqueda y las mejores prácticas para mantenerte en el lado bueno de Google.",
    description3:
        "Antes de ocultar tus enlaces, asegúrate de conocer todos los riesgos y beneficios. Esta guía te ayudará a decidir si la ofuscación es adecuada para tu estrategia SEO.",
    content: [
        {
            sectionTitle: "¿Qué es la ofuscación de enlaces y cómo funciona?",
            text: [
                "La ofuscación de enlaces consiste en disfrazar una URL para que no sea reconocible a simple vista. Esto se logra mediante técnicas como el uso de JavaScript, redirecciones o codificación especial.",
                "¿Por qué hacerlo? Las razones varían, pero suelen incluir evitar el scraping, ocultar afiliaciones o simplificar la estética del sitio. Sin embargo, no todo es tan simple como parece."
            ],
        },
        {
            sectionTitle: "Ventajas de la ofuscación de enlaces: Lo bueno",
            text: [
                "En ciertos casos, la ofuscación puede ser útil. Aquí algunas ventajas:"
            ],
            list: [
                "**Protección contra scraping:** Ocultar las URLs dificulta que bots malintencionados extraigan datos de tu sitio.",
                "**Control de enlaces salientes:** Perfecto para programas de afiliados, donde quieres monitorear clics sin exponer URLs complejas.",
                "**Mejora estética:** Las URLs limpias y amigables son más agradables para los usuarios."
            ],
        },
        {
            sectionTitle: "Desventajas de la ofuscación de enlaces: Lo malo",
            text: [
                "Pero cuidado, porque esta técnica puede tener un impacto negativo, especialmente en SEO:"
            ],
            list: [
                "**Problemas con motores de búsqueda:** Google puede tener dificultades para rastrear enlaces ofuscados, lo que afecta la indexación.",
                "**Riesgo de penalizaciones:** Si se percibe como una táctica de manipulación, podrías enfrentar sanciones de los motores de búsqueda.",
                "**Pérdida de autoridad de enlace:** Al ocultar URLs, podrías interrumpir la transmisión de autoridad entre páginas."
            ],
        },
        {
            sectionTitle: "Mejores prácticas según Google",
            text: [
                "Google prioriza la transparencia y la accesibilidad. Si decides usar ofuscación de enlaces, sigue estas recomendaciones para minimizar riesgos:"
            ],
            list: [
                "**Haz que los enlaces sean accesibles:** Usa atributos como `rel='nofollow'` o `noopener` cuando sea necesario y evita redirecciones confusas.",
                "**Crea contenido de calidad:** Google recompensa sitios con contenido original y bien estructurado. Haz que tus páginas sean tan valiosas que no dependan de trucos para posicionarse.",
                "**Optimiza la velocidad de tu sitio:** Un sitio lento afecta tanto la experiencia del usuario como el SEO. Usa herramientas como PageSpeed Insights para identificar problemas.",
                "**Mantén un SEO técnico sólido:** Asegúrate de que todas las páginas clave sean accesibles y realiza auditorías regulares para corregir errores."
            ],
        },
        {
            sectionTitle: "¿Deberías usar la ofuscación de enlaces?",
            text: [
                "La respuesta corta: solo en casos específicos y con precaución. Si tu objetivo principal es mejorar el SEO, probablemente haya estrategias más efectivas y seguras.",
                "Sin embargo, si usas ofuscación para objetivos legítimos (como el control de enlaces de afiliados), hazlo con transparencia y dentro de las pautas de los motores de búsqueda."
            ],
        },
        {
            sectionTitle: "Conclusión: Transparencia por encima de todo",
            text: [
                "La ofuscación de enlaces puede ser un arma de doble filo. Mientras que ofrece ciertas ventajas, también puede atraer consecuencias negativas si no se utiliza correctamente.",
                "En el mundo del SEO, la claridad y la calidad siempre superan a los atajos. Evalúa tus necesidades, sigue las mejores prácticas y prioriza estrategias sostenibles para el éxito a largo plazo."
            ],
        },
    ],
  }, {
    id: 7,
    img: img7,
    slug: "glosario-de-terminos-sem",
    title: "Glosario esencial de SEM: Domina el lenguaje del marketing digital",
    commentor: "Alejandro Lamas",
    date: "1 Diciembre 2024",
    tag: "SEM, Marketing Digital, Estrategias SEM, Publicidad Online",
    description1:
        "El SEM (Search Engine Marketing) es un pilar fundamental para las estrategias de marketing digital. Este glosario reúne los términos clave que necesitas dominar para optimizar tus campañas publicitarias.",
    description2:
        "Desde métricas como CTR y ROAS hasta conceptos avanzados como Quality Score y remarketing, aprende el lenguaje del SEM y lleva tus estrategias al siguiente nivel.",
    description3:
        "Esta guía es perfecta tanto para principiantes como para profesionales que buscan perfeccionar sus conocimientos en marketing en motores de búsqueda.",
    content: [
        {
            sectionTitle: "¿Qué es el SEM y por qué es tan importante?",
            text: [
                "El SEM, o Search Engine Marketing, es la estrategia de marketing digital que utiliza anuncios pagados para aumentar la visibilidad de un sitio web en los motores de búsqueda.",
                "Más que solo aparecer en los resultados, el SEM busca atraer tráfico de calidad, incrementar conversiones y, por supuesto, mejorar el retorno de inversión (ROI). Es el aliado perfecto para negocios que quieren resultados rápidos y medibles."
            ],
        },
        {
            sectionTitle: "Glosario de términos clave en SEM",
            text: [
                "Si quieres dominar el SEM, necesitas entender estos términos esenciales. Aquí tienes una lista rápida y clara:"
            ],
            list: [
                "**Ad Rank:** Determina la posición de tu anuncio en los resultados de búsqueda, basado en la oferta, la calidad del anuncio y otros factores.",
                "**CTR (Click-Through Rate):** Porcentaje de clics que recibe un anuncio respecto a sus impresiones. Un CTR alto refleja relevancia.",
                "**CPC (Coste por Clic):** Lo que pagas por cada clic en tu anuncio. Puede ser fijo o calculado mediante subasta.",
                "**Keywords:** Palabras o frases que activan tus anuncios. Pueden ser amplias, exactas o de frase.",
                "**Landing Page:** Página destino que recibe a los usuarios tras hacer clic en tu anuncio. Optimizarla es clave para convertir visitas en acciones.",
                "**Quality Score:** Métrica de Google Ads que mide la relevancia de tu anuncio, experiencia en la landing page y CTR esperado.",
                "**Impresiones:** Cantidad de veces que tu anuncio aparece en los resultados de búsqueda.",
                "**ROAS (Return on Advertising Spend):** Calcula la efectividad de tu campaña al comparar ingresos generados con los costos de los anuncios.",
                "**Extensiones de anuncio:** Elementos adicionales como enlaces, números de teléfono o ubicación que mejoran la visibilidad y el CTR.",
                "**Remarketing:** Estrategia para mostrar anuncios a usuarios que ya interactuaron con tu sitio web o app, incentivando su retorno."
            ],
        },
        {
            sectionTitle: "Estrategias efectivas para maximizar el SEM",
            text: [
                "El SEM no es solo pagar por aparecer. Aquí te dejo algunas estrategias para obtener el máximo rendimiento de tus campañas:"
            ],
            list: [
                "**Investiga palabras clave relevantes:** Usa herramientas como Google Keyword Planner para identificar términos que coincidan con la intención de búsqueda de tu audiencia.",
                "**Optimiza tus landing pages:** Asegúrate de que sean claras, rápidas y tengan un llamado a la acción irresistible.",
                "**Segmenta tu audiencia:** Define a quién quieres llegar con opciones como ubicación, intereses o dispositivos.",
                "**Monitorea y ajusta:** Revisa constantemente métricas como CTR y conversiones para afinar tus estrategias.",
                "**Haz A/B Testing:** Prueba diferentes versiones de tus anuncios y páginas de destino para identificar qué funciona mejor."
            ],
        },
        {
            sectionTitle: "Conclusión: El SEM como motor de tu estrategia digital",
            text: [
                "El SEM es una herramienta increíblemente poderosa cuando se utiliza correctamente. Este glosario es tu punto de partida para entender los conceptos clave y aplicarlos de manera estratégica.",
                "Recuerda: el éxito en SEM no solo depende de tu presupuesto, sino de tu habilidad para analizar, optimizar y adaptarte a las necesidades de tu audiencia. ¡Es hora de dominar el marketing en motores de búsqueda y llevar tus campañas al siguiente nivel!"
            ],
        },
    ],
  }, {
    id: 8,
    img: img8, 
    slug: "diferencia-canibalizacion-seo-contenido-duplicado",
    title: "Diferencia entre canibalización SEO y contenido duplicado: qué es, cómo detectarlo y resolverlo",
    commentor: "Alejandro Lamas",
    date: "3 Diciembre 2024",
    tag: "SEO, canibalización, contenido duplicado, posicionamiento web",
    description1:
      "Canibalización SEO y contenido duplicado, esos dos grandes dolores de cabeza para quienes queremos que Google nos mire con buenos ojos. Aprende a identificarlos y enfrentarlos como un pro.",
    description2:
      "Aquí te cuento cómo descubrir si tus páginas están luchando entre sí por el mismo trono en Google o si tienes contenido que parece un clon. Además, te doy soluciones prácticas para que tu SEO brille.",
    description3:
      "Diferenciar entre canibalización SEO y contenido duplicado es clave para que tu estrategia funcione. ¡Vamos a por ello!",
    content: [
      {
        sectionTitle: "¿Qué demonios es la canibalización SEO?",
        text: [
          "Vale, imagínate esto: tienes dos páginas en tu web que hablan de lo mismo, o al menos Google cree que lo hacen. En lugar de sumar puntos juntas, compiten entre sí. Es como si dos amigos jugaran a tirarse del pelo por el último trozo de pizza. Resultado: ninguna de tus páginas se posiciona bien, y Google tampoco sabe cuál mostrar.",
          "Esto pasa mucho cuando intentamos posicionar varias páginas con la misma palabra clave sin darnos cuenta. ¡Un caos, vaya!",
        ],
      },
      {
        sectionTitle: "Y entonces, ¿qué es el contenido duplicado?",
        text: [
          "El contenido duplicado es como copiar los deberes del compañero de clase: tienes el mismo texto (o muy parecido) en varias URLs, ya sea dentro de tu web o entre webs distintas.",
          "¿Qué dice Google sobre esto? No le mola. Prefiere contenido original y único. Así que, si detecta duplicados, puede pasar de indexar tus páginas o, peor aún, bajarlas en los rankings.",
        ],
      },
      {
        sectionTitle: "Canibalización SEO vs. contenido duplicado: diferencias rápidas",
        list: [
          "**Origen del problema:** La canibalización es un drama interno (páginas de tu web luchando entre sí). El contenido duplicado puede ocurrir dentro o fuera de tu web.",
          "**Impacto:** Canibalización = tráfico dividido. Contenido duplicado = riesgo de penalización o invisibilidad total.",
          "**Cómo lo arreglas:** Para la canibalización, toca reorganizar tus páginas. Para el contenido duplicado, asegúrate de que solo una URL lleve el protagonismo.",
        ],
      },
      {
        sectionTitle: "¿Cómo saber si tienes canibalización SEO?",
        list: [
          "**Herramientas mágicas:** Usa cosas como Ahrefs, SEMrush o Moz para analizar si tienes varias páginas intentando rankear para las mismas keywords.",
          "**Googleando tu web:** Escribe `site:tuweb.com palabra clave` en Google y mira si salen varias páginas para el mismo término.",
          "**Google Search Console:** Revisa impresiones y CTR. Si ves varias páginas con resultados similares, bingo, tenemos un problema.",
        ],
      },
      {
        sectionTitle: "Detectar contenido duplicado (sin volverte loco)",
        list: [
          "**Siteliner o Copyscape:** Estas herramientas son geniales para cazar duplicados en tu web o fuera de ella.",
          "**Auditorías técnicas:** Con Screaming Frog o Sitebulb puedes analizar todo tu sitio y detectar URLs sospechosas.",
          "**Search Console:** Si ves errores raros en la indexación o tráfico inusual, puede ser una pista.",
        ],
      },
      {
        sectionTitle: "Soluciones para la canibalización SEO (¡al rescate!)",
        list: [
          "**Consolida el contenido:** Une las páginas que compiten en una sola súper página que lo diga todo. Menos es más, y Google lo agradecerá.",
          "**Redirecciones 301:** ¿Tienes URLs que no aportan? Redirígelas hacia la página principal.",
          "**Palabras clave únicas:** Dale a cada página su propia misión. Cada una con su keyword y objetivo claro.",
          "**Organiza tu web:** Una estructura clara hace que Google (y tus usuarios) entiendan mejor de qué va cada cosa.",
        ],
      },
      {
        sectionTitle: "Qué hacer con el contenido duplicado",
        list: [
          "**Usa etiquetas canonical:** ¿Mismo contenido en varias URLs? Dile a Google cuál es la principal con `rel=canonical`.",
          "**Redirige:** Si no necesitas varias versiones, mete un 301 y todos felices.",
          "**Controla tu CMS:** Configura tu WordPress, Shopify o lo que uses para que no cree URLs duplicadas.",
          "**Sé original:** Suena a tópico, pero no hay nada como el contenido único para que Google te quiera.",
        ],
      },
      {
        sectionTitle: "Conclusión: pon orden en tu SEO",
        text: [
          "Mira, lidiar con canibalización SEO y contenido duplicado no es la tarea más divertida, pero es crucial para que tu web destaque. Al final, se trata de organizar bien tus páginas, usar herramientas que te ahorren trabajo y apostar por contenido que valga la pena.",
          "Hazlo y verás cómo Google empieza a tratarte mejor. Y si necesitas una mano, ¡ya sabes dónde encontrarme!",
        ],
      },
    ],
  }, {
    id: 9,
    img: img9,
    slug: "comparativa-mejores-ia-2025",
    title: "Comparativa de las mejores IA de cara a 2025",
    commentor: "Alejandro Lamas",
    date: "11 Diciembre 2024",
    tag: "inteligencia artificial, IA, tecnología",
    description1:
      "Descubre las mejores inteligencias artificiales en el mercado para 2025, clasificadas por sus puntos fuertes, casos de uso y precios.",
    description2:
      "Exploramos herramientas líderes en generación de textos, imágenes, código y soluciones empresariales, destacando sus ventajas y desventajas.",
    description3:
      "Elige la inteligencia artificial ideal para tus proyectos, optimiza tus recursos y alcanza tus objetivos con las mejores tecnologías del mercado.",
    content: [
      {
        sectionTitle: "IA para Generación de Contenidos (Textos)",
        text: [
          "La generación de contenido automatizado es una de las áreas más populares de la inteligencia artificial. Herramientas como ChatGPT y Jasper AI han revolucionado cómo se crean artículos, correos electrónicos y scripts de marketing. ChatGPT, desarrollado por OpenAI, destaca por su capacidad para producir textos complejos y estructurados en tiempo real. Su flexibilidad lo convierte en una opción preferida para bloggers, empresas y estudiantes.",
          "Por otro lado, Jasper AI está enfocado en el ámbito del marketing digital. Ofrece plantillas optimizadas para anuncios, publicaciones en redes sociales y contenido SEO, ayudando a las empresas a maximizar su impacto en línea. A pesar de sus diferencias, ambas herramientas comparten una facilidad de uso que las hace accesibles incluso para usuarios con poca experiencia técnica.",
          "Sin embargo, cada solución tiene sus limitaciones. ChatGPT puede ser costoso si se utiliza en proyectos extensivos, y Jasper AI requiere experiencia en marketing para aprovechar todo su potencial. Elegir entre ellas dependerá de tus necesidades específicas, ya sea para contenido creativo o estrategias publicitarias."
        ],
      },
      {
        sectionTitle: "IA para Generación de Imágenes",
        text: [
          "En el ámbito de la creación visual, MidJourney y DALL·E han liderado el mercado con propuestas innovadoras. MidJourney se especializa en generar imágenes artísticas y conceptuales, lo que la convierte en una herramienta imprescindible para diseñadores gráficos y artistas digitales. Su capacidad para crear ilustraciones detalladas basadas en simples descripciones de texto ha redefinido el proceso creativo.",
          "Por su parte, DALL·E, también de OpenAI, ofrece una experiencia más accesible para usuarios menos técnicos. Ideal para quienes buscan generar imágenes personalizadas para proyectos educativos, redes sociales o prototipos de diseño, DALL·E destaca por su facilidad de uso y versatilidad.",
          "A pesar de sus capacidades, estas herramientas no están exentas de desafíos. MidJourney puede ser menos intuitiva debido a su integración con Discord, mientras que DALL·E a veces produce resultados que no coinciden perfectamente con las descripciones proporcionadas. Sin embargo, ambas herramientas continúan siendo opciones líderes en sus respectivos campos."
        ],
      },
      {
        sectionTitle: "IA para Desarrollo de Código",
        text: [
          "El desarrollo de código asistido por IA es una de las áreas de más rápido crecimiento en la industria tecnológica. GitHub Copilot, creado en colaboración con OpenAI, actúa como un asistente personal para desarrolladores, sugiriendo líneas de código y soluciones completas en tiempo real. Esto permite a los programadores centrarse en la lógica del negocio mientras Copilot se encarga de las tareas repetitivas.",
          "Por otro lado, CodeT5 es una herramienta más avanzada diseñada para tareas específicas como la refactorización de código y la detección de errores. Su capacidad para manejar múltiples lenguajes y frameworks lo convierte en una opción ideal para proyectos técnicamente complejos.",
          "Aunque ambas herramientas aceleran el desarrollo, requieren supervisión humana para garantizar la calidad del código. Mientras que Copilot es más adecuado para principiantes y proyectos rápidos, CodeT5 es ideal para desarrolladores experimentados que buscan optimizar y mejorar código existente."
        ],
      },
      {
        sectionTitle: "IA para Optimización Empresarial",
        text: [
          "En el sector empresarial, herramientas como Salesforce Einstein e IBM Watson han establecido nuevos estándares para la integración de inteligencia artificial. Salesforce Einstein ofrece análisis predictivos y personalización avanzada en la gestión de relaciones con clientes (CRM). Su capacidad para anticipar necesidades y sugerir acciones ha mejorado significativamente la eficiencia en ventas y marketing.",
          "IBM Watson, por su parte, destaca por su enfoque modular y su capacidad para adaptarse a diversas industrias, desde la salud hasta las finanzas. Ofrece soluciones de procesamiento de lenguaje natural y análisis de datos que permiten a las empresas tomar decisiones informadas.",
          "A pesar de sus beneficios, estas herramientas suelen requerir una inversión inicial considerable y experiencia técnica para configurarlas y utilizarlas eficazmente. Sin embargo, su capacidad para transformar procesos empresariales las convierte en una inversión valiosa para empresas que buscan mantenerse competitivas en un mercado en constante evolución."
        ],
      },
      {
        sectionTitle: "Conclusión",
        text: [
          "El mercado de la inteligencia artificial en 2025 ofrece una gama diversa de herramientas diseñadas para satisfacer las necesidades específicas de diferentes sectores. Desde la generación de contenido hasta la optimización empresarial, estas soluciones no solo mejoran la productividad, sino que también abren nuevas oportunidades para la innovación.",
          "Elegir la herramienta adecuada depende de tus objetivos y presupuesto. Al invertir en inteligencia artificial, es crucial evaluar las características, beneficios y limitaciones de cada opción para maximizar el retorno de inversión. Con las herramientas aquí presentadas, estás un paso más cerca de aprovechar el verdadero potencial de la inteligencia artificial."
        ],
      },
    ],
  }, {
    id: 10,
    img: img10,
    slug: "crear-web-nextjs-tailwind-desde-cero",
    title: "Crea tu primera web con Next.js 13 + Tailwind CSS (sin morir en el intento)",
    commentor: "Alejandro Lamas",
    date: "9 Julio 2025",
    tag: "Next.js, Tailwind CSS, tutorial, desarrollo web, React",
    description1:
      "¿Te suena que Next.js es la niña bonita de React pero te da vértigo empezar? Tranquilo, aquí no dejamos a nadie atrás. Vamos a levantar una web completita —inicio, servicios, blog dinámico y contacto— explicando cada comando como si fuera tu primer día.",
    description2:
      "Repasaremos paso a paso la instalación, la estructura de carpetas y cómo Tailwind te ahorra dolores de cabeza con el CSS. Además, control de versiones, despliegue en Vercel y algún truco de productividad.",
    description3:
      "Cuando termines esta guía tendrás un proyecto base robusto listo para presumir en GitHub (o para ese cliente que no para de pedir presupuesto).",
    content: [
      {
        sectionTitle: "0. ¿Por qué Next.js + Tailwind?",
        text: [
          "➡️ **Next.js** es un framework de React que te da en la misma caja renderizado en el servidor (SSR), generación estática, enrutado sencillo y optimización automática. En cristiano: tu web carga más rápido y posiciona mejor en Google.",
          "➡️ **Tailwind CSS** sigue la filosofía utility‑first: escribes clases pequeñas que hacen una sola cosa (margen, color, flex, etc.) y las combinas. Resultado: CSS limpito, sin cascadas locas y sin ‘!important’ por todas partes.",
          "Juntos te permiten prototipar a la velocidad del rayo sin sacrificar rendimiento ni mantenimiento.",
        ],
      },
      {
        sectionTitle: "1. Requisitos previos (y cómo instalarlos si no los tienes)",
        list: [
          "✅ **Node 18 o superior** → Baja el LTS desde nodejs.org y sigue el instalador.",
          "✅ **Git** → En Windows instalas Git Bash; en macOS viene con Xcode‑CLI; en Linux está en tu gestor de paquetes.",
          "✅ **Editor** → VS Code + extensiones Prettier (formateo), ESLint (calidad) y Tailwind CSS IntelliSense (autocompletado).",
        ],
      },
      {
        sectionTitle: "2. Crear proyecto y ponerlo bonito con Tailwind",
        text: [
          "Abrimos terminal y tecleo el comando mágico. Atención a la bandera `--app`: usamos el nuevo App Router de Next 13.",
        ],
        code: `npx create-next-app@latest my-web --ts --eslint --app --tailwind=false\ncd my-web\npnpm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`,
        textAfterCode: [
          "¿Por qué `--tailwind=false`? Porque prefiero configurarlo yo mismo paso a paso para que entiendas qué hace cada archivo.",
          "El último comando crea `tailwind.config.js` y `postcss.config.js`. No toques PostCSS; en Tailwind añade las rutas para que escanee componentes y páginas:",
        ],
        codeAfterText: `// tailwind.config.js\nmodule.exports = {\n  content: [\n    "./app/**/*.{js,ts,jsx,tsx}",\n    "./components/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: { extend: {} },\n  plugins: [],\n};`,
      },
      {
        sectionTitle: "3. Entender la nueva estructura de Next 13 (App Router)",
        text: [
          "En lugar de /pages, ahora tenemos carpeta /app. Cada subcarpeta es una ruta. Un archivo page.tsx dentro se renderiza cuando visitas esa URL.",
          "Crea esta jerarquía mínima:",
        ],
        code: `app/\n├─ layout.tsx\n├─ page.tsx            // Inicio\n├─ servicios/\n│  ├─ page.tsx         // Listado de servicios\n│  └─ [slug]/page.tsx  // Detalle dinámico\n├─ blog/\n│  ├─ page.tsx         // Índice\n│  └─ [slug]/page.tsx  // Post\n└─ contacto/page.tsx   // Formulario`,
        textAfterCode: [
          "El archivo layout.tsx envuelve todas las páginas (Navbar, Footer, meta). El [slug] entre corchetes indica ruta dinámica (igual que [id] en React Router).",
        ],
      },
      {
        sectionTitle: "4. Layout global paso a paso",
        code: `// app/layout.tsx\nimport \"./globals.css\";\nimport { Inter } from \"next/font/google\";\nimport Navbar from \"@/components/Navbar\";\nimport Footer from \"@/components/Footer\";\n\nexport const metadata = { title: \"Mi Web\", description: \"Demo Next.js + Tailwind\" };\nconst inter = Inter({ subsets: [\"latin\"] });\n\nexport default function Root({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"es\">\n      <body className={inter.className + \" bg-gray-50 text-gray-800\"}>\n        <Navbar />\n        <main className=\"container mx-auto px-4 py-8\">{children}</main>\n        <Footer />\n      </body>\n    </html>\n  );\n}`,
        textAfterCode: [
          "Cada vez que cambies algo en Layout, todas las páginas se recargan (hot‑reload). Tailwind te deja usar utilidades como mx-auto (centrar), px-4 (padding horizontal 1rem) sin abrir un archivo CSS.",
        ],
      },
      {
        sectionTitle: "5. Construir la Home como Lego (componentes reutilizables)",
        text: [
          "Crea un banner hero con fondo gradiente y CTA, una sección de servicios (cards), testimonios y llamada a la acción final. Cada parte es un componente en components/.",
        ],
        code: `// components/ServiceCard.tsx\nexport default function ServiceCard({ title, desc, href }) {\n  return (\n    <a href={href} className=\"block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition\">\n      <h3 className=\"text-lg font-semibold mb-2\">{title}</h3>\n      <p className=\"text-sm text-gray-600\">{desc}</p>\n    </a>\n  );\n}`,
      },
      {
        sectionTitle: "6. Routing dinámico para cada servicio (¡sin configurar nada extra!)",
        text: [
          "Next genera HTML estático con generateStaticParams(). Crea un array de slugs y él hace el resto. Ventaja: velocidad y SEO de 10.",
        ],
      },
      {
        sectionTitle: "7. Blog con MDX explicado para humanos",
        list: [
          "Instala @next/mdx → te permite escribir posts en .mdx (Markdown + JSX).",
          "Coloca tus posts en /content/blog/mi‑post.mdx. Cada archivo exporta frontMatter (título, fecha, tags).",
          "En blog/[slug]/page.tsx usa import fs/promises para leer el mdx y compileMDX para convertirlo a React.",
        ],
      },
      {
        sectionTitle: "8. Formulario de contacto básico (sin base de datos todavía)",
        text: [
          "Creamos estado con useState, manejamos onChange y hacemos fetch('/api/contact'). Por ahora imprime en consola para verificar que llega.",
        ],
      },
      {
        sectionTitle: "9. Scripts npm y cómo usarlos (qué hace cada uno)",
        list: [
          "dev ➜ Levanta servidor en localhost:3000 con recarga caliente.",
          "build ➜ Compila para producción: minifica, genera routes estáticas.",
          "start ➜ Lanza el build en Node. Útil si despliegas en VPS.",
          "lint ➜ Revisa tu código con ESLint + reglas Next: te evita sustos.",
        ],
      },
      {
        sectionTitle: "10. Despliegue gratis en Vercel (3 clics de verdad)",
        text: [
          "1. Sube tu repo a GitHub.",
          "2. En vercel.com importas proyecto ➜ detecta Next automáticamente.",
          "3. Configura variables de entorno (si las hay) y ¡deploy! Cada push a main genera preview.",
        ],
      },
      {
        sectionTitle: "11. Checklist final",
        list: [
          "☑️ Repo con README claro",
          "☑️ Enlaces de navegación funcionando",
          "☑️ Imágenes optimizadas (next/image)",
          "☑️ PageSpeed > 90 en móvil",
        ],
      },
      {
        sectionTitle: "Conclusión",
        text: [
          "Acabas de crear una web moderna, escalable y lista para recibir base de datos. En la siguiente entrega añadiremos MongoDB y Mongoose para guardar datos reales. ¡Buen trabajo!",
        ],
      },
    ],
  }, {
  id: 11,
  img: img11,
  slug: "mongodb-mongoose-integracion-nextjs",
  title: "MongoDB + Mongoose paso a paso: ponle base de datos a tu web Next.js",
  commentor: "Alejandro Lamas",
  date: "16 Julio 2025",
  tag: "MongoDB, Mongoose, NoSQL, Next.js, tutorial",
  description1:
    "¿Recuerdas la web estática que levantamos con Next.js y Tailwind? Hoy le daremos **memoria permanente**: aprenderás a conectar con MongoDB y a manejar datos con Mongoose como si fuera una charla entre colegas.",
  description2:
    "Partiremos de cero –qué es NoSQL, cómo abrir una cuenta gratuita en Atlas, instalar dependencias, crear esquemas y exponer endpoints API–, todo explicado sin prisas y con ejemplos que funcionan tal cual.",
  description3:
    "Cuando termines sabrás leer, escribir y mostrar posts de blog desde la base de datos… ¡sin tocar SQL!",
  content: [
    {
      sectionTitle: "0. ¿Qué demonios es NoSQL y por qué debería importarme?",
      text: [
        "\uD83E\uDDD0 *NoSQL* significa literalmente ‘Not Only SQL’. Engloba motores donde los datos NO se guardan en tablas fijas con filas/columnas, sino en **documentos** flexibles (JSON/BSON), pares clave‑valor, grafos, etc.",
        "**MongoDB** es el rey del modelo Document. Cada registro es un objeto JSON (llamado **documento**) dentro de una **colección**. Ventajas rápidas:",
      ],
      list: [
        "📄 Esquema flexible → añade campos nuevos sin migraciones liosas.",
        "⚡ Lecturas y escrituras veloces.",
        "↔️ Escala horizontal fácilmente (sharding).",
      ],
    },
    {
      sectionTitle: "1. Crea tu clúster gratis en MongoDB Atlas (5 minutos de reloj)",
      list: [
        "1️⃣ Ve a **cloud.mongodb.com** y regístrate.",
        "2️⃣ ‘Build a Database’ → elige **Shared Cluster (M0 gratuito)**.",
        "3️⃣ Selecciona región cercana (por ejemplo `eu‑west‑1`).",
        "4️⃣ Crea **Database User** (usuario + contraseña).",
        "5️⃣ En Network Access autoriza tu IP (o `0.0.0.0/0` si es solo dev).",
        "6️⃣ Copia la *Connection string*: se parece a `mongodb+srv://usuario:contraseña@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority`. Guarda bien esa URL.",
      ],
    },
    {
      sectionTitle: "2. Instala dependencias y configura variables de entorno",
      code: `pnpm add mongoose\n# ó npm install mongoose`,
      textAfterCode: [
        "Crea un archivo **.env.local** en la raíz del proyecto Next.js y pega:",
      ],
      codeAfterText: `MONGODB_URI="mongodb+srv://USUARIO:CONTRASENA@cluster0.xxxxxx.mongodb.net/miweb?retryWrites=true&w=majority"`,
    },
    {
      sectionTitle: "3. Helper de conexión (lib/mongoose.ts)",
      text: [
        "Cada vez que Next refresca en modo dev abre un proceso. Sin un helper, abrirías *decenas* de conexiones y Mongo se quejaría. Esta función asegura **una sola conexión global**:",
      ],
      code: `import mongoose from 'mongoose';\n\nconst MONGODB_URI = process.env.MONGODB_URI!;\n\nexport async function dbConnect() {\n  if (mongoose.connection.readyState >= 1) return; // Ya estamos conectados\n  return mongoose.connect(MONGODB_URI);\n}`,
    },
    {
      sectionTitle: "4. Diseñando el schema de un Post (models/Post.ts)",
      text: [
        "Un **schema** en Mongoose define la forma del documento: campos y tipos. Si el documento es una cookie, el schema es el molde.",
      ],
      code: `import { Schema, model, models } from 'mongoose';\n\nconst PostSchema = new Schema({\n  title: { type: String, required: true },\n  slug:  { type: String, required: true, unique: true },\n  content: String,\n  tags:  [String],\n  createdAt: { type: Date, default: Date.now },\n});\n\nexport default models.Post || model('Post', PostSchema);`,
      textAfterCode: [
        "> **Tip**: \n> El operador `models.ModelName` evita que Next.js intente compilar el modelo dos veces al hacer hot‑reloading.",
      ],
    },
    {
      sectionTitle: "5. Crear y probar tu primer documento desde la consola",
      code: `node -e \"(async ()=>{\n  const { dbConnect } = await import('./lib/mongoose.js');\n  const Post = (await import('./models/Post.js')).default;\n  await dbConnect();\n  const nuevo = await Post.create({ title:'Hola Mongo', slug:'hola-mongo', content:'🚀 Estrenando BD' });\n  console.log(nuevo);\n  process.exit();\n})();\"`,
      textAfterCode: [
        "Si ves el objeto impreso con un `_id` gigante ➜ ¡felicidades! Tu clúster ya acepta documentos.",
      ],
    },
    {
      sectionTitle: "6. Exponer una API Route (app/api/posts/route.ts)",
      code: `import Post from '@/models/Post';\nimport { dbConnect } from '@/lib/mongoose';\n\n// GET /api/posts\nexport async function GET() {\n  await dbConnect();\n  const posts = await Post.find().sort({ createdAt: -1 });\n  return Response.json(posts);\n}\n\n// POST /api/posts\nexport async function POST(req: Request) {\n  const data = await req.json();\n  await dbConnect();\n  const created = await Post.create(data);\n  return Response.json(created, { status: 201 });\n}`,
    },
    {
      sectionTitle: "7. Consumir la API en la página Blog (app/blog/page.tsx)",
      code: `export default async function Blog() {\n  const posts = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts', { cache: 'no-store' }).then(r => r.json());\n\n  return (\n    <ul className=\"space-y-4\">\n      {posts.map(p => (\n        <li key={p._id}>\n          <a href={\`/blog/\${p.slug}\`} className=\"text-xl text-blue-600 hover:underline\">{p.title}</a>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      textAfterCode: [
        "> Observa cómo escapamos \`${p.slug}\` ➜ `\\${p.slug}` dentro del string literal para que no falle al pegarlo en blogsData.",
      ],
    },
    {
      sectionTitle: "8. Seed rápido de datos de prueba (scripts/seed.ts)",
      code: `import 'dotenv/config';\nimport { dbConnect } from '../lib/mongoose';\nimport Post from '../models/Post';\n\nawait dbConnect();\nawait Post.deleteMany();\nawait Post.insertMany([\n  { title:'Next + Mongo', slug:'next-mongo', content:'Contenido demo', tags:['demo','nextjs'] },\n  { title:'Otra entrada', slug:'otra', content:'Más texto', tags:['blog'] },\n]);\nprocess.exit();`,
    },
    {
      sectionTitle: "9. Buenas prácticas de producción",
      list: [
        "🔐 Variables sensibles solo en .env.* y en Vercel ➜ `Environment Variables`.",
        "⚡ Indexa los campos que uses para buscar (slug, tags).",
        "🦺 Valida entradas en el backend (Joi, Zod).",
        "🗄️ Crea copias de seguridad programadas en Atlas.",
      ],
    },
    {
      sectionTitle: "Conclusión",
      text: [
        "¡Base de datos operativa! Ahora puedes crear, listar y mostrar artículos reales. En la próxima entrega conectaremos el formulario de contacto para guardar mensajes y disparar correos.",
      ],
    },
  ],
  }, {
    id: 12,
    img: img12,
    slug: "formulario-contacto-nextjs-mongodb",
    title: "Formulario de contacto PRO: correos, base de datos y anti‑spam en Next.js",
    commentor: "Alejandro Lamas",
    date: "23 Julio 2025",
    tag: "Next.js, Nodemailer, MongoDB, Mongoose, Zod, reCAPTCHA",
    description1:
        "Tu web ya luce genial y muestra posts desde MongoDB. Falta el punto clave: que los visitantes puedan escribirte y que NINGÚN mensaje se pierda en el limbo.",
    description2:
        "Construiremos un formulario de contacto completo: validación con Zod, envío de email vía Nodemailer, almacenamiento en MongoDB, reCAPTCHA v3 y un mini‑panel para leer los mensajes.",
    description3:
        "Guía sin atajos: entenderás qué hace cada línea de código, por qué se hace y cómo depurar si algo falla.",
    content: [
        {
        sectionTitle: "0. ¿Por qué tomarse el formulario en serio?",
        list: [
            "📧 30 % de los leads se pierden por formularios rotos o correos en spam.",
            "🗃️ Guardar en BD te da respaldo si el SMTP falla.",
            "📊 Analítica: saber a qué horas llegan más consultas ayuda a tu negocio.",
        ],
        },
        {
        sectionTitle: "1. Instalar dependencias necesarias",
        code: `pnpm add nodemailer zod\npnpm add -D @types/nodemailer`,
        textAfterCode: [
            "**Nodemailer** envía correos SMTP. **Zod** valida datos en runtime de forma declarativa.",
        ],
        },
        {
        sectionTitle: "2. Crear el modelo ContactMessage (models/ContactMessage.ts)",
        code: `import { Schema, model, models } from 'mongoose';\n\nconst ContactSchema = new Schema({\n  name:   { type: String, required: true },\n  email:  { type: String, required: true },\n  message:{ type: String, required: true },\n  createdAt:{ type: Date, default: Date.now },\n  ip:     String,\n});\n\nexport default models.ContactMessage || model('ContactMessage', ContactSchema);`,
        },
        {
        sectionTitle: "3. Configurar Nodemailer (lib/mailer.ts)",
        code: `import nodemailer from 'nodemailer';\n\nexport const transporter = nodemailer.createTransport({\n  host: process.env.SMTP_HOST,\n  port: 465,\n  secure: true,\n  auth: {\n    user: process.env.SMTP_USER,\n    pass: process.env.SMTP_PASS,\n  },\n});`,
        textAfterCode: [
            "Variables SMTP van en .env.local y en Vercel › Settings › Environment.",
        ],
        },
        {
        sectionTitle: "4. Validar inputs con Zod (schema.ts)",
        code: `import { z } from 'zod';\n\nexport const contactSchema = z.object({\n  name: z.string().min(2, 'Nombre demasiado corto'),\n  email: z.string().email('Email inválido'),\n  message: z.string().min(10, 'Mensaje muy breve'),\n  token: z.string().optional(), // reCAPTCHA\n});`,
        },
        {
        sectionTitle: "5. API Route POST /api/contact",
        code: `import { dbConnect } from '@/lib/mongoose';\nimport ContactMessage from '@/models/ContactMessage';\nimport { transporter } from '@/lib/mailer';\nimport { contactSchema } from '@/schema';\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  const parsed = contactSchema.safeParse(body);\n  if (!parsed.success)\n    return Response.json({ error: 'Datos inválidos' }, { status: 400 });\n\n  // Anti‑spam opcional: verifica reCAPTCHA token en Google\n  if (body.token) {\n    const res = await fetch(\`https://www.google.com/recaptcha/api/siteverify?secret=\${process.env.RECAPTCHA_SECRET}&response=\${body.token}\", { method:'POST' });\n    const score = (await res.json()).score;\n    if (!score || score < 0.5)\n      return Response.json({ error: 'Captcha' }, { status: 400 });\n  }\n\n  await dbConnect();\n  await ContactMessage.create({ ...body, ip: req.headers.get('x-forwarded-for') || '' });\n\n  await transporter.sendMail({\n    from: 'Web <noreply@miweb.com>',\n    to: process.env.CONTACT_TO,\n    subject: 'Nuevo mensaje de contacto',\n    text: \`Nombre: \${body.name}\nEmail: \${body.email}\nMensaje: \${body.message}\`,\n  });\n\n  return Response.json({ ok: true });\n}`,
        },
        {
        sectionTitle: "6. Frontend React con validación y reCAPTCHA (app/contacto/page.tsx)",
        code: `'use client';\nimport { useState } from 'react';\nimport { contactSchema } from '@/schema';\n\nexport default function Contacto() {\n  const [form, setForm] = useState({ name:'', email:'', message:'' });\n  const [status, setStatus] = useState('idle');\n\n  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });\n\n  async function handleSubmit(e) {\n    e.preventDefault();\n    if (!contactSchema.safeParse(form).success) \n      return alert('Revise los campos');\n\n    // get reCAPTCHA v3 token\n    const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action:'submit' });\n\n    const res = await fetch('/api/contact', {\n      method:'POST',\n      headers:{'Content-Type':'application/json'},\n      body: JSON.stringify({ ...form, token }),\n    });\n    setStatus(res.ok ? 'ok' : 'error');\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className=\"space-y-4 max-w-lg\">\n      {/* Inputs */}\n      <button className=\"btn-primary w-full\">Enviar</button>\n      {status==='ok' && <p className='text-green-600'>Mensaje enviado ✔️</p>}\n      {status==='error' && <p className='text-red-600'>Error al enviar ❌</p>}\n    </form>\n  );\n}`,
        },
        {
        sectionTitle: "7. Mini panel de administración (/admin/mensajes)",
        text: [
            "Ruta protegida con Basic Auth en headers. Lista documentos con `ContactMessage.find()` y usa un `<table>` Tailwind (o shadcn/ui DataTable) para ver nombre, email, fecha y botón ‘Responder’.",
        ],
        },
        {
        sectionTitle: "8. Anti‑spam extra: rate‑limit por IP",
        code: `// middleware.ts\nimport { NextResponse } from 'next/server';\nimport rateLimit from 'express-rate-limit'; // o un helper propio\n\nexport function middleware(req) {\n  // Aplica límites solo en la ruta /api/contact\n}`,
        textAfterCode: [
            "Implementar un rate limiter evita bombardeos desde la misma IP.",
        ],
        },
        {
        sectionTitle: "9. Probar envíos de correo sin SMTP real (Ethereal)",
        text: [
            "Ethereal.email genera cuentas de prueba. Sustituye tus creds SMTP por las de Ethereal y abre el enlace que te devuelve Nodemailer en consola para ver el correo renderizado.",
        ],
        },
        {
        sectionTitle: "10. Checklist final",
        list: [
            "☑️ Validación en frontend y backend",
            "☑️ Email llega a bandeja de entrada",
            "☑️ Registro aparece en colección contact_messages",
            "☑️ reCAPTCHA > 0.5",
            "☑️ Rate‑limit activo",
        ],
        },
        {
        sectionTitle: "Conclusión",
        text: [
            "¡Ya lo tienes! Un flujo de contacto robusto, seguro y escalable. Combina todo lo aprendido: Next.js App Router, MongoDB, validación y mejores prácticas de seguridad.",
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