"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeBlock, CommandLine } from "@/components/ui/CodeBlock";
import { useNeuralStore } from "@/store/neuralStore";

interface BlogPost {
  id: number;
  slug: string; // SEO-friendly URL slug
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string; // Format: YYYY-MM-DD
  publishDate: string; // Format: YYYY-MM-DD (post only shows if current date >= publishDate)
  tags: string[];
  readTime: string;
  featured?: boolean;
}

// Blog posts con fechas de publicación - los posts con fechas futuras no se muestran
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "formulario-contacto-nextjs",
    title: "Formulario de contacto PRO: correos, base de datos y anti-spam en Next.js",
    excerpt: "Tu web ya luce genial y muestra posts desde MongoDB. Falta el punto clave: que los visitantes puedan escribirte y que NINGÚN mensaje se pierda en el limbo.",
    content: [
      "Tu web ya luce genial y muestra posts desde MongoDB. Falta el punto clave: que los visitantes puedan escribirte y que NINGÚN mensaje se pierda en el limbo.",
      "En este artículo vamos a construir un sistema de contacto robusto que combine tres capas de seguridad: validación en cliente, validación en servidor y protección anti-spam.",
      "**¿Por qué necesitas las tres capas?** La validación en cliente mejora la experiencia de usuario con feedback instantáneo. La validación en servidor garantiza la integridad de los datos aunque alguien intente saltarse el frontend. Y la protección anti-spam evita que tu bandeja de entrada se llene de basura.",
      "**Paso 1: Estructura del formulario con React Hook Form.** Usaremos React Hook Form por su rendimiento y facilidad de uso. Instalamos las dependencias:",
      "$ npm install react-hook-form @hookform/resolvers zod",
      "Zod nos permitirá definir esquemas de validación type-safe.",
      "**Paso 2: Crear la API Route en Next.js.** En el App Router, creamos app/api/contact/route.ts. Esta ruta recibirá los datos del formulario, los validará de nuevo en servidor, los guardará en MongoDB y enviará el correo con Nodemailer.",
      "```typescript\n// app/api/contact/route.ts\nimport { NextResponse } from 'next/server';\nimport { z } from 'zod';\n\nconst contactSchema = z.object({\n  name: z.string().min(2),\n  email: z.string().email(),\n  message: z.string().min(10),\n  honeypot: z.string().max(0) // Anti-spam\n});\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  const result = contactSchema.safeParse(body);\n  \n  if (!result.success) {\n    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });\n  }\n  \n  // Guardar en MongoDB y enviar email...\n  return NextResponse.json({ success: true });\n}\n```",
      "**Paso 3: Configurar Nodemailer.** Para el envío de correos necesitarás configurar un servicio SMTP. Puedes usar Gmail (para desarrollo), SendGrid, Mailgun o Amazon SES para producción. Las credenciales van en variables de entorno.",
      "**Paso 4: Honeypot anti-spam.** La técnica del honeypot consiste en añadir un campo oculto que los usuarios reales nunca rellenan pero los bots sí. Si ese campo tiene valor, rechazamos la petición silenciosamente.",
      "**Paso 5: Rate limiting.** Implementamos un límite de peticiones por IP usando una librería como `rate-limiter-flexible` o simplemente un Map en memoria para proyectos pequeños. Esto evita ataques de fuerza bruta.",
      "**Bonus: Feedback visual.** Añadimos estados de loading, success y error con animaciones suaves usando Framer Motion. El usuario debe saber en todo momento qué está pasando.",
      "Con este sistema tienes un formulario de contacto profesional que no pierde ningún mensaje, protege tu web de spam y ofrece una experiencia de usuario impecable.",
    ],
    author: "Alejandro Lamas",
    date: "2025-07-23",
    publishDate: "2025-07-23",
    tags: ["Next.js", "MongoDB", "Formularios", "Backend"],
    readTime: "12 min",
    featured: true,
  },
  {
    id: 2,
    slug: "mongodb-mongoose-nextjs",
    title: "MongoDB + Mongoose paso a paso: ponle base de datos a tu web Next.js",
    excerpt: "¿Recuerdas la web estática que levantamos con Next.js y Tailwind? Hoy le daremos memoria permanente: aprenderás a conectar con MongoDB y manejar datos con Mongoose.",
    content: [
      "¿Recuerdas la web estática que levantamos con Next.js y Tailwind? Hoy le daremos memoria permanente. Aprenderás a conectar con MongoDB y a manejar datos con Mongoose como si fuera una charla entre colegas.",
      "**¿Por qué MongoDB?** Es una base de datos NoSQL que almacena documentos en formato similar a JSON. Perfecta para JavaScript porque no hay fricción entre el formato de tus datos en el backend y en la base de datos.",
      "**Paso 1: Crear cuenta en MongoDB Atlas.** Atlas es el servicio cloud de MongoDB. Ofrece un tier gratuito perfecto para desarrollo y proyectos pequeños. Crea un cluster, añade un usuario y obtén tu connection string.",
      "**Paso 2: Instalar Mongoose.** Mongoose es un ODM (Object Document Mapper) que nos permite definir esquemas y modelos para nuestros datos:",
      "$ npm install mongoose",
      "También añadimos las variables de entorno con la URI de conexión.",
      "**Paso 3: Crear la conexión.** En Next.js con App Router, creamos un archivo `lib/mongodb.ts` que gestiona la conexión. Importante: cachear la conexión para no crear múltiples conexiones en desarrollo con hot reload.",
      "```typescript\n// lib/mongodb.ts\nimport mongoose from 'mongoose';\n\nconst MONGODB_URI = process.env.MONGODB_URI!;\n\nlet cached = global.mongoose;\n\nif (!cached) {\n  cached = global.mongoose = { conn: null, promise: null };\n}\n\nexport async function connectDB() {\n  if (cached.conn) return cached.conn;\n  \n  if (!cached.promise) {\n    cached.promise = mongoose.connect(MONGODB_URI);\n  }\n  \n  cached.conn = await cached.promise;\n  return cached.conn;\n}\n```",
      "**Paso 4: Definir modelos.** Un modelo en Mongoose define la estructura de tus documentos. Por ejemplo, para posts de blog: título (String, required), contenido (String), fecha (Date, default: now), autor (String).",
      "```typescript\n// models/Post.ts\nimport mongoose from 'mongoose';\n\nconst postSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  content: { type: String, required: true },\n  author: String,\n  createdAt: { type: Date, default: Date.now }\n});\n\nexport default mongoose.models.Post || mongoose.model('Post', postSchema);\n```",
      "**Paso 5: Operaciones CRUD.** Create: `Model.create(data)`. Read: `Model.find()` o `Model.findById(id)`. Update: `Model.findByIdAndUpdate(id, data)`. Delete: `Model.findByIdAndDelete(id)`. Todas devuelven Promises.",
      "**Paso 6: Server Components y Server Actions.** En Next.js 14 puedes hacer queries directamente en Server Components. También puedes usar Server Actions para mutaciones desde el cliente sin crear API routes.",
      "**Errores comunes:** Olvidar await en operaciones async. No manejar errores con try/catch. Conexiones duplicadas en desarrollo. Schemas sin validación.",
      "Ahora tu aplicación tiene memoria permanente. Los datos persisten entre reinicios y puedes escalar horizontalmente cuando tu proyecto crezca.",
    ],
    author: "Alejandro Lamas",
    date: "2025-07-16",
    publishDate: "2025-07-16",
    tags: ["MongoDB", "Mongoose", "Next.js", "Base de datos"],
    readTime: "15 min",
  },
  {
    id: 3,
    slug: "nextjs-tailwind-tutorial",
    title: "Crea tu primera web con Next.js 13 + Tailwind CSS (sin morir en el intento)",
    excerpt: "¿Te suena que Next.js es la niña bonita de React pero te da vértigo empezar? Tranquilo, aquí no dejamos a nadie atrás.",
    content: [
      "¿Te suena que Next.js es la niña bonita de React pero te da vértigo empezar? Tranquilo, aquí no dejamos a nadie atrás. Vamos a levantar una web completita explicando cada comando.",
      "**¿Qué es Next.js?** Es un framework de React que añade renderizado del lado del servidor (SSR), generación estática (SSG), rutas basadas en archivos y optimizaciones automáticas. Todo lo que React no trae de serie.",
      "**Paso 1: Crear el proyecto.** El CLI te preguntará si quieres TypeScript (sí), ESLint (sí), Tailwind CSS (sí), src/ directory (opcional), App Router (sí):",
      "$ npx create-next-app@latest mi-proyecto",
      "**Paso 2: Estructura del proyecto.** `app/` contiene tus rutas. Cada carpeta es una ruta. `page.tsx` es el componente que se renderiza. `layout.tsx` envuelve las páginas con elementos comunes como header y footer.",
      "**Paso 3: Tu primera página.** En `app/page.tsx`, exportas un componente React normal. La diferencia: es un Server Component por defecto. Puedes hacer fetch de datos directamente sin useEffect.",
      "```tsx\n// app/page.tsx\nexport default function Home() {\n  return (\n    <main className=\"min-h-screen p-8\">\n      <h1 className=\"text-4xl font-bold\">Hola Next.js!</h1>\n      <p className=\"mt-4 text-gray-600\">\n        Mi primera web con Next.js y Tailwind\n      </p>\n    </main>\n  );\n}\n```",
      "**Paso 4: Tailwind CSS en acción.** Tailwind ya viene configurado. Usa clases directamente: `className='bg-blue-500 text-white p-4 rounded-lg'`. No CSS separado, todo en el componente.",
      "**Paso 5: Navegación entre páginas.** Crea `app/about/page.tsx` para una página /about. Usa el componente Link de `next/link` para navegación client-side sin recargar.",
      "```tsx\nimport Link from 'next/link';\n\nexport default function Nav() {\n  return (\n    <nav className=\"flex gap-4 p-4\">\n      <Link href=\"/\" className=\"hover:text-blue-500\">Inicio</Link>\n      <Link href=\"/about\" className=\"hover:text-blue-500\">About</Link>\n      <Link href=\"/blog\" className=\"hover:text-blue-500\">Blog</Link>\n    </nav>\n  );\n}\n```",
      "**Paso 6: Componentes reutilizables.** Crea una carpeta `components/` y extrae elementos comunes. Un Button, un Card, un Header. Importa y usa donde necesites.",
      "**Paso 7: Estilos globales y fuentes.** En `app/globals.css` defines estilos globales. Usa `next/font` para cargar fuentes de Google optimizadas automáticamente.",
      "**Paso 8: Deploy en Vercel.** Sube tu código a GitHub. Conecta el repo en vercel.com. Deploy automático en cada push. HTTPS, CDN global y preview por PR incluidos gratis.",
      "Ya tienes una web moderna, rápida y lista para producción. El siguiente paso: conectar una base de datos y hacerla dinámica.",
    ],
    author: "Alejandro Lamas",
    date: "2025-07-09",
    publishDate: "2025-07-09",
    tags: ["Next.js", "Tailwind CSS", "React", "Tutorial"],
    readTime: "20 min",
  },
  {
    id: 4,
    slug: "comparativa-ia-2025",
    title: "Comparativa de las mejores IA de cara a 2025",
    excerpt: "Descubre las mejores inteligencias artificiales en el mercado para 2025, clasificadas por sus puntos fuertes, casos de uso y precios.",
    content: [
      "El panorama de la inteligencia artificial generativa ha explotado en 2024 y 2025 promete ser aún más intenso. Vamos a analizar las principales opciones para que elijas la que mejor se adapte a ti.",
      "**ChatGPT (OpenAI).** El pionero y todavía el más conocido. GPT-4 Turbo ofrece un contexto de 128K tokens y es excelente para tareas generales. Precio: $20/mes para Plus. Puntos fuertes: versatilidad, plugins, DALL-E integrado.",
      "**Claude (Anthropic).** Mi favorito para programación y textos largos. Claude 3 tiene mejor comprensión de contexto y es menos propenso a 'alucinar'. Contexto de 200K tokens. Muy bueno siguiendo instrucciones complejas.",
      "**Gemini (Google).** Integración nativa con el ecosistema Google. Gemini Ultra compite con GPT-4. Acceso gratuito a Gemini Pro. Mejor para tareas que requieren información actualizada gracias a su conexión con búsqueda.",
      "**GitHub Copilot.** Específico para código. Se integra en tu IDE y autocompleta mientras escribes. $10/mes individual. Imprescindible si programas a diario. Basado en modelos de OpenAI, entrenado en código público.",
      "**Perplexity AI.** Ideal para investigación. Combina IA generativa con búsqueda en tiempo real. Cita fuentes. Perfecto cuando necesitas información verificable, no solo respuestas convincentes.",
      "**Midjourney / DALL-E 3.** Para generación de imágenes. Midjourney destaca en estilo artístico. DALL-E 3 (integrado en ChatGPT) es más accesible y mejor siguiendo prompts detallados.",
      "**¿Cuál elegir?** Para uso general: ChatGPT o Claude. Para código: Copilot + Claude. Para investigación: Perplexity. Para imágenes: depende del estilo que busques.",
      "**Mi setup personal:** Claude para programación y textos largos, Copilot en VS Code, ChatGPT para tareas rápidas, Perplexity para research. Cada herramienta tiene su lugar.",
      "El consejo más importante: pruébalas. Todas tienen planes gratuitos o trials. Tu flujo de trabajo es único y la mejor IA es la que se adapta a él.",
    ],
    author: "Alejandro Lamas",
    date: "2024-12-11",
    publishDate: "2024-12-11",
    tags: ["IA", "Inteligencia Artificial", "Productividad", "Herramientas"],
    readTime: "10 min",
  },
  {
    id: 5,
    slug: "canibalizacion-seo-contenido-duplicado",
    title: "Diferencia entre canibalización SEO y contenido duplicado",
    excerpt: "Canibalización SEO y contenido duplicado, esos dos grandes dolores de cabeza para quienes queremos que Google nos mire con buenos ojos.",
    content: [
      "Canibalización SEO y contenido duplicado son dos problemas que a menudo se confunden pero tienen causas y soluciones muy diferentes. Vamos a aclararlo de una vez.",
      "**¿Qué es la canibalización SEO?** Ocurre cuando varias páginas de tu sitio compiten por la misma keyword. Google no sabe cuál posicionar y acaba posicionando mal todas. Tus propias páginas se 'roban' tráfico entre ellas.",
      "**Ejemplo de canibalización:** Tienes /zapatillas-running y /mejores-zapatillas-correr. Ambas apuntan a 'zapatillas para correr'. Google alterna cuál muestra, ninguna sube al top 3.",
      "**¿Qué es el contenido duplicado?** Es cuando el mismo contenido (o muy similar) existe en múltiples URLs. Puede ser dentro de tu sitio o copiado de otro sitio. Google puede penalizar o simplemente ignorar las copias.",
      "**Ejemplo de duplicado:** La misma página accesible con www y sin www. O productos con descripciones idénticas del fabricante en mil tiendas.",
      "**Cómo detectar canibalización:** Busca en Google site:tudominio.com 'keyword'. Si aparecen varias páginas, tienes canibalización. También Search Console > Rendimiento, filtra por query y mira qué páginas reciben clics.",
      "**Cómo detectar duplicados:** Herramientas como Screaming Frog o Sitebulb detectan contenido duplicado interno. Para externo, copia un párrafo entrecomillado y búscalo en Google.",
      "**Solución para canibalización:** Fusiona contenidos (301 redirect de la débil a la fuerte). O diferencia claramente el intent de cada página. Una para comparativas, otra para reviews, etc.",
      "**Solución para duplicados:** Canonical tags para indicar la versión preferida. 301 redirects si hay URLs que no deberían existir. Noindex para páginas de filtros o paginación.",
      "En resumen: canibalización = competencia interna por keywords. Duplicado = mismo contenido en múltiples URLs. El diagnóstico correcto es el primer paso para la solución.",
    ],
    author: "Alejandro Lamas",
    date: "2024-12-03",
    publishDate: "2024-12-03",
    tags: ["SEO", "Marketing Digital", "Contenido", "Google"],
    readTime: "8 min",
  },
  {
    id: 6,
    slug: "glosario-sem-marketing-digital",
    title: "Glosario esencial de SEM: Domina el lenguaje del marketing digital",
    excerpt: "El SEM (Search Engine Marketing) es un pilar fundamental para las estrategias de marketing digital. Este glosario reúne los términos clave.",
    content: [
      "Si trabajas con Google Ads o cualquier plataforma de publicidad en buscadores, necesitas dominar este vocabulario. Vamos término por término.",
      "**CPC (Coste Por Clic).** Lo que pagas cada vez que alguien hace clic en tu anuncio. Es el modelo más común en búsqueda. Pujas por keywords y pagas solo cuando hay interacción.",
      "**CPM (Coste Por Mil impresiones).** Pagas por cada 1000 veces que se muestra tu anuncio, hagan clic o no. Más usado en display y video para branding.",
      "**CTR (Click Through Rate).** Porcentaje de impresiones que generan clics. CTR = (Clics / Impresiones) × 100. Un CTR alto indica anuncios relevantes. Benchmark en búsqueda: 2-5%.",
      "**Quality Score.** Puntuación de Google (1-10) sobre la calidad de tus keywords, anuncios y landing pages. Afecta directamente a tu CPC y posición. Mayor Quality Score = menos pagas.",
      "**ROAS (Return On Ad Spend).** Retorno por cada euro invertido en publicidad. ROAS = Ingresos / Inversión. Un ROAS de 4 significa que por cada euro invertido generas 4€.",
      "**Conversión.** La acción valiosa que quieres que hagan los usuarios: comprar, registrarse, llamar, descargar. Debes configurar el tracking para medirla.",
      "**CPA (Coste Por Adquisición).** Lo que te cuesta conseguir una conversión. CPA = Inversión / Conversiones. Métrica clave para evaluar rentabilidad.",
      "**Impresiones.** Número de veces que tu anuncio se muestra. No implica que lo vean conscientemente, solo que se cargó en pantalla.",
      "**Keyword match types.** Concordancia amplia, de frase, exacta. Controlan cuándo se activa tu anuncio. Amplia = más alcance, menos control. Exacta = menos alcance, más precisión.",
      "**Negative keywords.** Palabras que excluyen tu anuncio. Si vendes 'cursos de inglés' pero no gratis, añade 'gratis' como negativa.",
      "Dominar estos términos es el primer paso para optimizar campañas. El segundo es medir, analizar y iterar constantemente.",
    ],
    author: "Alejandro Lamas",
    date: "2024-12-01",
    publishDate: "2024-12-01",
    tags: ["SEM", "Marketing Digital", "Google Ads", "Publicidad"],
    readTime: "6 min",
  },
  {
    id: 7,
    slug: "ofuscacion-enlaces-seo",
    title: "Ofuscación de enlaces: ¿Es buena idea para el SEO?",
    excerpt: "La ofuscación de enlaces es una técnica controvertida en el mundo del SEO. ¿Realmente mejora tu estrategia de posicionamiento?",
    content: [
      "La ofuscación de enlaces consiste en ocultar los links de tu página para que los rastreadores de Google no los sigan. ¿Por qué alguien querría hacer esto?",
      "**El concepto de PageRank sculpting.** Antiguamente se creía que podías 'esculpir' cómo fluía el PageRank por tu sitio, dirigiéndolo solo a las páginas importantes.",
      "**Técnicas de ofuscación.** JavaScript onClick en lugar de href. Codificar URLs en base64. Usar formularios POST. Cualquier cosa que un crawler básico no siga.",
      "**¿Funciona?** En 2009 Google confirmó que ya no permite PageRank sculpting con nofollow. Y Googlebot ejecuta JavaScript desde hace años. Las técnicas de ofuscación clásicas ya no son efectivas.",
      "**Riesgos de la ofuscación.** Si Google detecta que ocultas enlaces intencionadamente, puede considerarlo manipulación. Además, afectas la experiencia de usuario y la accesibilidad.",
      "**¿Cuándo tiene sentido?** Ofuscar enlaces de afiliados para cumplir guidelines (aunque es mejor usar rel='sponsored'). Ocultar URLs de áreas privadas que no quieres indexar.",
      "**La alternativa correcta.** Usar nofollow/sponsored/ugc según corresponda. Robots.txt para bloquear secciones enteras. Noindex para páginas que no aportan en búsqueda.",
      "**Mi recomendación.** No pierdas tiempo en ofuscación. Invierte en crear contenido valioso, conseguir enlaces naturales y mejorar la experiencia de usuario. Eso es lo que realmente posiciona.",
      "El SEO técnico importa, pero no tanto como crear algo que la gente quiera enlazar y compartir. La ofuscación es un atajo que ya no funciona.",
    ],
    author: "Alejandro Lamas",
    date: "2024-11-30",
    publishDate: "2024-11-30",
    tags: ["SEO", "Enlaces", "Link Building", "Posicionamiento"],
    readTime: "5 min",
  },
  {
    id: 8,
    slug: "error-403-wordpress-solucion",
    title: "¿Error 403 en WordPress? Aprende a solucionarlo en minutos",
    excerpt: "¿Te has topado con el temido error 403 en WordPress al cargar scripts? No te preocupes, en esta guía te explico cómo solucionarlo.",
    content: [
      "El error 403 Forbidden significa que el servidor entiende tu petición pero se niega a cumplirla. En WordPress puede aparecer al cargar la web, en el admin, o solo en ciertos recursos.",
      "**Causa 1: Permisos de archivos incorrectos.** WordPress necesita: carpetas con permisos 755, archivos con 644. Conéctate por FTP/SFTP y verifica. chmod 755 para directorios, chmod 644 para archivos.",
      "**Causa 2: Archivo .htaccess corrupto.** Renombra .htaccess a .htaccess_backup. Si la web funciona, el problema estaba ahí. Regenera desde Ajustes > Enlaces permanentes > Guardar.",
      "**Causa 3: Plugin de seguridad demasiado agresivo.** Wordfence, Sucuri, iThemes Security... pueden bloquear requests legítimas. Desactiva temporalmente (renombrando la carpeta del plugin) y comprueba.",
      "**Causa 4: ModSecurity del servidor.** Algunos hostings tienen reglas de firewall que bloquean ciertos patrones. Contacta soporte o revisa los logs de ModSecurity si tienes acceso.",
      "**Causa 5: Hotlink protection mal configurada.** Si tienes protección contra hotlinking, puede bloquear tus propios recursos. Revisa las reglas en .htaccess o el panel del hosting.",
      "**Diagnóstico rápido.** Abre las DevTools del navegador (F12) > Network. Recarga y busca recursos con status 403. La URL te dará pistas sobre qué está bloqueado.",
      "**Si nada funciona.** Restaura un backup anterior al problema. O contacta a tu hosting con los logs de error. Ellos ven información que tú no tienes acceso.",
      "El 403 es frustrante pero casi siempre tiene solución. La clave es ir descartando causas metódicamente hasta dar con ella.",
    ],
    author: "Alejandro Lamas",
    date: "2024-11-27",
    publishDate: "2024-11-27",
    tags: ["WordPress", "Errores", "Servidor", "Debugging"],
    readTime: "4 min",
  },
  {
    id: 9,
    slug: "que-es-tailwind-css",
    title: "¿Qué es Tailwind CSS? Aprende a diseñar webs modernas como un profesional",
    excerpt: "Tailwind CSS está cambiando el juego del diseño web con su enfoque utility-first. Olvídate de escribir interminables líneas de CSS.",
    content: [
      "Tailwind CSS es un framework de CSS utility-first que ha revolucionado cómo construimos interfaces. En lugar de escribir CSS personalizado, compones diseños usando clases predefinidas.",
      "**¿Qué significa utility-first?** Cada clase hace una sola cosa: `bg-blue-500` pone fondo azul, `p-4` añade padding, `rounded-lg` redondea bordes. Combinas clases para crear cualquier diseño.",
      "**Ventajas sobre CSS tradicional.** No inventas nombres de clases. No saltas entre archivos. No tienes CSS muerto que nadie usa. Todo está en el HTML, visible y modificable.",
      "**¿No es feo tener tantas clases?** Al principio lo parece. Pero extraes componentes (Button, Card, Input) y la repetición desaparece. Además, el HTML se vuelve autodocumentado.",
      "**Instalación en un proyecto nuevo.** Con Next.js usa el flag --tailwind, o instálalo manualmente:",
      "$ npm install tailwindcss postcss autoprefixer",
      "$ npx tailwindcss init -p",
      "**Configuración básica.** `tailwind.config.js` define tus colores, fuentes, breakpoints personalizados. Extiende el tema base o sobreescríbelo completamente:",
      "```javascript\n// tailwind.config.js\nmodule.exports = {\n  darkMode: 'class',\n  theme: {\n    extend: {\n      colors: {\n        primary: '#C1DF1F',\n        secondary: '#00D4FF',\n      },\n    },\n  },\n  plugins: [],\n}\n```",
      "**Responsive design.** Prefijos `sm:`, `md:`, `lg:`, `xl:` aplican estilos en breakpoints específicos. Mobile-first: sin prefijo es mobile, con prefijo es 'desde ese breakpoint hacia arriba'.",
      "```html\n<div class=\"p-4 md:p-8 lg:p-12\">\n  <h1 class=\"text-xl md:text-3xl lg:text-5xl\">\n    Responsive title\n  </h1>\n</div>\n```",
      "**Dark mode.** Añade `darkMode: 'class'` en config. Usa `dark:bg-gray-900 dark:text-white`. Alterna la clase 'dark' en el html para cambiar tema.",
      "**Plugins útiles.** `@tailwindcss/forms` para estilos de formularios. `@tailwindcss/typography` para prose en contenido de blog. `@tailwindcss/aspect-ratio` para ratios de imagen.",
      "Tailwind no es para todos los proyectos, pero para aplicaciones y sitios donde controlas el HTML, es una maravilla. La productividad se dispara una vez superas la curva inicial.",
    ],
    author: "Alejandro Lamas",
    date: "2024-11-24",
    publishDate: "2024-11-24",
    tags: ["Tailwind CSS", "CSS", "Frontend", "Diseño Web"],
    readTime: "7 min",
  },
  {
    id: 10,
    slug: "wordpress-elementor-tutorial",
    title: "Cómo crear tu primera web con WordPress y Elementor: Guía paso a paso",
    excerpt: "¿Nuevo en el mundo de la creación web? Aprende a dominar WordPress y Elementor, dos herramientas poderosas sin necesidad de programar.",
    content: [
      "WordPress alimenta más del 40% de la web. Elementor es el page builder más popular. Juntos te permiten crear webs profesionales sin escribir código.",
      "**Paso 1: Contratar hosting y dominio.** Recomiendo Hostinger, SiteGround o Raiola para España. Elige un plan con WordPress preinstalado. El dominio, si es posible, .com o .es según tu audiencia.",
      "**Paso 2: Instalar WordPress.** Si no viene preinstalado, la mayoría de hostings tienen instalador en 1 clic (Softaculous). Configura nombre del sitio, usuario admin y contraseña segura.",
      "**Paso 3: Elegir un tema compatible.** Hello Elementor (oficial y gratuito) es perfecto para empezar. Astra y GeneratePress son alternativas ligeras. Evita temas pesados con mil opciones.",
      "**Paso 4: Instalar Elementor.** Plugins > Añadir nuevo > Buscar 'Elementor'. Instalar y activar. La versión gratuita es suficiente para empezar, Pro añade widgets y templates avanzados.",
      "**Paso 5: Crear tu primera página.** Páginas > Añadir nueva. Título: 'Inicio'. Editar con Elementor. Verás el editor visual drag-and-drop con secciones, columnas y widgets.",
      "**Paso 6: Estructura básica.** Una sección para hero con título y CTA. Otra para servicios en columnas. Otra para testimonios. Footer con contacto y redes. Usa los templates de Elementor como base.",
      "**Paso 7: Personalizar estilos.** En Ajustes del sitio configura colores globales, tipografías y espaciados. Así mantienes consistencia sin repetir configuraciones.",
      "**Paso 8: Configurar la home.** Ajustes > Lectura > Tu portada muestra: Una página estática > Portada: Inicio. Ahora tudominio.com muestra tu página de inicio.",
      "**Paso 9: Menú de navegación.** Apariencia > Menús. Crea un menú, añade páginas, asigna a 'Menú principal'. Elementor Pro tiene un widget de menú avanzado.",
      "Ya tienes una web funcional. El siguiente paso es añadir contenido real, optimizar para SEO y configurar analytics. Pero eso es otro artículo.",
    ],
    author: "Alejandro Lamas",
    date: "2024-11-20",
    publishDate: "2024-11-20",
    tags: ["WordPress", "Elementor", "No-Code", "Tutorial"],
    readTime: "15 min",
  },
  {
    id: 11,
    slug: "tendencias-diseno-web-2025",
    title: "El futuro del diseño web y branding: tendencias que marcarán 2025",
    excerpt: "El diseño web y el branding están a punto de entrar en una nueva era gracias a los avances tecnológicos y las demandas de los usuarios.",
    content: [
      "2025 promete ser un año de consolidación para algunas tendencias y de explosión para otras. Veamos qué viene en diseño web y branding.",
      "**IA generativa integrada.** Ya no solo para crear imágenes, sino interfaces que se adaptan en tiempo real al usuario. Personalización a otro nivel. Las marcas usarán IA para crear variaciones de contenido infinitas.",
      "**Minimalismo con personalidad.** El minimalismo sigue pero ya no es frío. Tipografías expresivas, un color accent potente, microinteracciones cuidadas. Menos elementos, más impacto cada uno.",
      "**Modo oscuro como estándar.** Ya no es una opción, es expectativa. Los diseños se crean dark-first y se adaptan a light. Ahorra batería en OLED, reduce fatiga visual, se ve premium.",
      "**3D y WebGL accesible.** Librerías como Three.js y React Three Fiber democratizan el 3D en web. Esperamos ver más landing pages con elementos 3D interactivos, no solo en webs de tecnología.",
      "**Tipografía variable.** Fuentes que cambian de peso, ancho y otros ejes según el contexto. Una sola fuente, infinitas variaciones. Reduce peso de carga y aumenta flexibilidad.",
      "**Branding fluido.** Los logos rígidos dan paso a identidades adaptativas. El mismo concepto se expresa diferente en app, web, redes, packaging. Coherencia sin uniformidad.",
      "**Sostenibilidad digital.** Webs ligeras no solo cargan rápido, también consumen menos energía. El 'green web design' empieza a ser un valor diferencial para marcas conscientes.",
      "**Accesibilidad no negociable.** WCAG 2.2, contraste, navegación por teclado, lectores de pantalla. Ya no es un extra, es requisito legal en muchos mercados y obligación ética en todos.",
      "**Mi predicción personal.** Veremos la convergencia de web y aplicaciones nativas. PWAs más potentes, web components más adoptados, y experiencias que no sabes si son 'app' o 'web'.",
      "El diseño que triunfará es el que resuelve problemas reales con elegancia, no el que sigue tendencias sin propósito. La forma sigue a la función, incluso en 2025.",
    ],
    author: "Alejandro Lamas",
    date: "2024-11-17",
    publishDate: "2024-11-17",
    tags: ["Diseño Web", "Branding", "Tendencias", "UX/UI"],
    readTime: "8 min",
  },
  {
    id: 12,
    slug: "fundamentos-programacion-principiantes",
    title: "Fundamentos básicos de la programación: Guía esencial para principiantes",
    excerpt: "Aprender a programar es como aprender un nuevo idioma que abre puertas al mundo digital. Esta es la guía definitiva para iniciarte.",
    content: [
      "La programación puede parecer intimidante, pero sus fundamentos son más simples de lo que crees. Vamos paso a paso, sin prisa pero sin pausa.",
      "**¿Qué es programar?** Es dar instrucciones a una computadora para que haga algo. Esas instrucciones se escriben en un lenguaje que la máquina puede interpretar. Nosotros pensamos en lógica, la máquina ejecuta.",
      "**Variables.** Son contenedores con nombre que guardan datos:",
      "```javascript\nlet nombre = 'Juan';     // String (texto)\nlet edad = 25;           // Number (número)\nlet activo = true;       // Boolean (verdadero/falso)\n\nconsole.log(nombre);     // Imprime: Juan\n```",
      "Puedes usar y modificar ese valor después. Las variables son la base de todo programa.",
      "**Condicionales.** Permiten tomar decisiones:",
      "```javascript\nlet edad = 20;\n\nif (edad >= 18) {\n  console.log('Eres adulto');\n} else {\n  console.log('Eres menor de edad');\n}\n// Imprime: Eres adulto\n```",
      "El código dentro de `{ }` solo se ejecuta si la condición es verdadera.",
      "**Bucles.** Repiten código mientras se cumpla una condición:",
      "```javascript\nfor (let i = 0; i < 5; i++) {\n  console.log('Iteración:', i);\n}\n// Imprime: 0, 1, 2, 3, 4\n```",
      "Evitan escribir lo mismo muchas veces. El bucle `for` es el más común.",
      "**Funciones.** Bloques de código reutilizables:",
      "```javascript\nfunction saludar(nombre) {\n  return 'Hola ' + nombre + '!';\n}\n\nconsole.log(saludar('Ana'));    // Hola Ana!\nconsole.log(saludar('Pedro'));  // Hola Pedro!\n```",
      "Defines una vez, usas muchas veces. Las funciones son esenciales para código limpio.",
      "**Arrays y Objetos.** Estructuras para organizar datos:",
      "```javascript\n// Array: lista ordenada\nlet frutas = ['manzana', 'pera', 'plátano'];\nconsole.log(frutas[0]); // manzana (índices desde 0)\n\n// Objeto: datos relacionados\nlet persona = {\n  nombre: 'Ana',\n  edad: 28,\n  ciudad: 'Madrid'\n};\nconsole.log(persona.nombre); // Ana\n```",
      "**Debugging.** Encontrar y corregir errores. `console.log()` es tu amigo: imprime valores para ver qué está pasando. Los errores son normales, no te frustres.",
      "**Siguiente paso.** Elige un lenguaje y practica. JavaScript para web, Python para propósito general, son excelentes para empezar. Haz proyectos pequeños, no solo tutoriales.",
      "La clave no es memorizar sintaxis, es entender la lógica. Una vez piensas como programador, cambiar de lenguaje es solo aprender nuevo vocabulario.",
    ],
    author: "Alejandro Lamas",
    date: "2024-11-16",
    publishDate: "2024-11-16",
    tags: ["Programación", "Principiantes", "Fundamentos", "Tutorial"],
    readTime: "12 min",
  },
];

export function BlogSection() {
  const { activeBlogPostId, setActiveBlogPostId } = useNeuralStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter posts: only show if publishDate <= today
  const visiblePosts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return blogPosts.filter((post) => {
      const publishDate = new Date(post.publishDate);
      publishDate.setHours(0, 0, 0, 0);
      return publishDate <= today;
    });
  }, []);

  // Search filter
  const filteredPosts = useMemo(() => {
    if (!searchTerm) return visiblePosts;
    
    const term = searchTerm.toLowerCase();
    return visiblePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }, [visiblePosts, searchTerm]);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);
  
  // Get selected post from store or from pending slug
  const selectedPost = useMemo(() => {
    if (activeBlogPostId) {
      return blogPosts.find(p => p.id === activeBlogPostId) || null;
    }
    return null;
  }, [activeBlogPostId]);

  // Handle pending slug from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__pendingBlogSlug) {
      const slug = (window as any).__pendingBlogSlug;
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        setActiveBlogPostId(post.id, false, post.slug);
      }
      delete (window as any).__pendingBlogSlug;
    }
  }, [setActiveBlogPostId]);

  const openPost = (post: BlogPost) => {
    setActiveBlogPostId(post.id, true, post.slug);
  };

  const closePost = () => {
    setActiveBlogPostId(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPost) {
        closePost();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  return (
    <div className="py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-sm text-[var(--text-tertiary)] mb-4">
          <span className="text-[var(--color-purple)]">◎</span>
          <span>MÓDULO://EL_LAB</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="gradient-text">EL LAB</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
          Reflexiones y aprendizajes. Artículos sobre desarrollo web, marketing digital 
          y tecnología destilados de la experiencia profesional.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="glass rounded-xl p-1">
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="text-[var(--color-primary)]">🔍</span>
            <input
              type="text"
              placeholder="Buscar en el lab..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard
            className="relative overflow-hidden group"
            onClick={() => openPost(featuredPost)}
          >
            {/* Featured badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--color-primary)] text-[var(--bg-primary)]">
                ✦ DESTACADO
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Visual element - Cryo container effect */}
              <div className="relative h-48 md:h-auto rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="text-8xl opacity-30 animate-pulse">◎</div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
                
                {/* Scan line effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-full h-px bg-[var(--color-accent)] animate-scan opacity-50" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] mb-3">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime} lectura</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-[var(--text-secondary)] mb-4">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs font-mono bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Regular Posts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {regularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <GlassCard
              className="h-full group relative overflow-hidden"
              onClick={() => openPost(post)}
            >
              {/* Cryo container visual */}
              <div className="relative h-32 rounded-lg bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-accent)]/10 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-5xl opacity-20">◎</div>
                <div className="absolute inset-0 border border-[var(--border-color)] rounded-lg" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-accent)] rounded-tl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-accent)] rounded-tr" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-accent)] rounded-bl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-accent)] rounded-br" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] mb-2">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h4 className="font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                {post.title}
              </h4>

              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4 opacity-30">◎</div>
          <p className="text-[var(--text-tertiary)] font-mono">
            No se encontraron experimentos con ese criterio
          </p>
        </motion.div>
      )}

      {/* Post Modal - Fullscreen with Portal */}
      {mounted && selectedPost && createPortal(
        <AnimatePresence>
          <motion.div
            key="blog-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-md flex flex-col"
            style={{ zIndex: 9999 }}
          >
            {/* Fixed Header */}
            <div className="flex-shrink-0 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm font-mono text-[var(--text-tertiary)]">
                  <span className="text-[var(--color-primary)]">◎</span>
                  <span>EL LAB</span>
                  <span className="text-[var(--border-color)]">/</span>
                  <span className="truncate max-w-[200px] md:max-w-none">Post #{selectedPost.id}</span>
                </div>
                <button
                  onClick={closePost}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-[var(--text-tertiary)] mb-4">
                    <span>{selectedPost.date}</span>
                    <span className="text-[var(--border-color)]">•</span>
                    <span>{selectedPost.readTime} de lectura</span>
                    <span className="text-[var(--border-color)]">•</span>
                    <span>Por {selectedPost.author}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 leading-tight">
                    {selectedPost.title}
                  </h1>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm font-mono bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-invert max-w-none">
                  {selectedPost.content.map((paragraph, index) => (
                    <ContentBlock key={index} content={paragraph} />
                  ))}
                </div>

                {/* Share Link */}
                <ShareLinkButton slug={selectedPost.slug} postId={selectedPost.id} />
              </article>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// Component for share link button with animation
function ShareLinkButton({ slug, postId }: { slug: string; postId: number }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#blog/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  
  return (
    <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-tertiary)] font-mono">
          <span className="text-[var(--color-accent)]">◎</span> Publicación del Lab
        </p>
        <motion.button
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-mono transition-colors ${
            copied 
              ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          animate={copied ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            animate={copied ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.3 }}
          >
            {copied ? '✓' : '🔗'}
          </motion.span>
          <span>{copied ? '¡Enlace copiado!' : 'Copiar enlace'}</span>
        </motion.button>
      </div>
    </div>
  );
}

// Component to render content with code blocks
function ContentBlock({ content }: { content: string }) {
  // Check if it's a code block (starts with ```)
  if (content.startsWith('```')) {
    const lines = content.split('\n');
    const firstLine = lines[0];
    const language = firstLine.replace('```', '').trim() || 'javascript';
    const code = lines.slice(1, -1).join('\n'); // Remove first and last lines (```)
    return <CodeBlock code={code} language={language} />;
  }
  
  // Check if it's a command line (starts with $)
  if (content.startsWith('$ ')) {
    const command = content.slice(2);
    return <CommandLine command={command} />;
  }
  
  // Regular paragraph with markdown-like formatting
  return (
    <p
      className="text-[var(--text-secondary)] leading-relaxed mb-4 text-base md:text-lg"
      dangerouslySetInnerHTML={{
        __html: content
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-primary)] font-semibold">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--color-accent)] font-mono text-sm">$1</code>'),
      }}
    />
  );
}
