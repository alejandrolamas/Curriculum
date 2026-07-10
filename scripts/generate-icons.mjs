/**
 * Genera el juego de favicons con la marca "AL·" (tinta + blanco + ácido).
 * Uso: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = (size) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="14" fill="#0e0e10"/>
  <text x="29" y="45" font-family="Helvetica, Arial, sans-serif" font-weight="900"
        font-size="34" letter-spacing="-2.5" fill="#ffffff" text-anchor="middle">AL</text>
  <circle cx="52" cy="42" r="5" fill="#c8f31d"/>
</svg>`);

/** ICO con un PNG embebido (válido desde Windows Vista y en todos los navegadores). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: icono
  header.writeUInt16LE(1, 4); // nº de imágenes
  const dir = Buffer.alloc(16);
  dir.writeUInt8(size >= 256 ? 0 : size, 0); // ancho
  dir.writeUInt8(size >= 256 ? 0 : size, 1); // alto
  dir.writeUInt8(0, 2); // paleta
  dir.writeUInt8(0, 3); // reservado
  dir.writeUInt16LE(1, 4); // planos
  dir.writeUInt16LE(32, 6); // bpp
  dir.writeUInt32LE(png.length, 8); // tamaño
  dir.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, dir, png]);
}

const out = async (size, path) => {
  const png = await sharp(svg(size * 2)).resize(size, size).png().toBuffer();
  writeFileSync(path, png);
  return png;
};

await out(16, "public/favicon-16x16.png");
const png32 = await out(32, "public/favicon-32x32.png");
await out(180, "public/apple-touch-icon.png");
await out(512, "public/icon-512.png");
writeFileSync("public/favicon.ico", pngToIco(png32, 32));
writeFileSync("public/icon.svg", svg(64).toString().trim());
console.log("iconos generados");
