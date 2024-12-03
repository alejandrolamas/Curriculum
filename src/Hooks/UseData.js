import { useState } from "react";
import img1 from "../assets/img/blog/fundamentos-basicos-de-la-programacion.jpg";
import img2 from "../assets/img/blog/tendencias-diseno-web-2025.jpg";
import img3 from "../assets/img/blog/guia-iniciarse-wordpress-elementor.jpg";
import img4 from "../assets/img/blog/tailwind.png";
import img5 from "../assets/img/blog/error-403-forbidden.png";
import img6 from "../assets/img/blog/ofuscacion-de-enlaces-posicionamiento-seo.jpg";
import img7 from "../assets/img/blog/glosario-sem.jpg";
import img8 from "../assets/img/blog/canibalizacion-seo-contenido-duplicado.jpg";

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
  }
  
  
  
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