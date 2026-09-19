// Regenerates every icon from one drawing. Run with `npm run icons` after changing the mark.
//   src/app/icon.svg          – modern browsers (rounded)
//   src/app/favicon.ico       – legacy browsers, 16/32/48
//   src/app/apple-icon.png    – iOS home screen, 180px, square (iOS rounds it)
//   public/icon-192.png       – web manifest
//   public/icon-512.png       – web manifest
//   public/icon-maskable-512.png – web manifest, Android adaptive icon (content kept in the safe zone)
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BRAND = "#E9474E";
const INK = "#111111";
const SUN = "#F5A623";

/** 512×512 drawing: red tile, white arched door, bed and lamp. */
const drawing = ({ rounded, scale = 1 }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="${rounded ? 112 : 0}" fill="${BRAND}"/>
  <g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
    <path d="M136 448V232a120 120 0 0 1 240 0v216z" fill="#fff"/>
    <rect x="253" y="150" width="6" height="64" rx="2" fill="${INK}"/>
    <path d="M224 258l16-44h32l16 44z" fill="${INK}"/>
    <circle cx="256" cy="268" r="13" fill="${SUN}"/>
    <rect x="190" y="330" width="56" height="44" rx="14" fill="${INK}"/>
    <rect x="266" y="330" width="56" height="44" rx="14" fill="${INK}"/>
    <rect x="168" y="366" width="176" height="58" rx="16" fill="${INK}"/>
    <rect x="158" y="420" width="196" height="14" rx="4" fill="${INK}"/>
  </g>
</svg>
`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();

/** ICO container holding PNG frames (supported by every browser that still asks for .ico). */
const ico = (frames) => {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const entries = frames.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0);
    e.writeUInt8(size, 1);
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([head, ...entries, ...frames.map((f) => f.data)]);
};

const out = (rel, data) => writeFile(join(root, rel), data);

await mkdir(join(root, "public"), { recursive: true });

const rounded = drawing({ rounded: true });
const square = drawing({ rounded: false });
const maskable = drawing({ rounded: false, scale: 0.78 });

await out("src/app/icon.svg", rounded);
await out(
  "src/app/favicon.ico",
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(rounded, size) })))),
);
await out("src/app/apple-icon.png", await png(square, 180));
await out("public/icon-192.png", await png(rounded, 192));
await out("public/icon-512.png", await png(rounded, 512));
await out("public/icon-maskable-512.png", await png(maskable, 512));

console.log("Icons written.");
