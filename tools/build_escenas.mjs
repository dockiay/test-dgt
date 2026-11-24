// Valida preguntas/escenas.json y genera data/escenas.js.
//   node tools/build_escenas.mjs            (comprueba las citas contra FUENTES_TXT)
//   FUENTES_TXT=/ruta node tools/build_escenas.mjs
// Comprueba:
// - que cada id existe en data/preguntas.js (ejecuta antes tools/build_data.py);
// - en los cruces sin pasos escritos, que el orden calculado por escenas.js (regla de la derecha,
//   vía pavimentada, STOP y ceda el paso) es exactamente el campo "orden" escrito a mano;
// - que cada cita (también las que genera escenas.js) aparece literal en el texto consolidado del BOE.
// Si algo falla, termina con error y no escribe nada.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const WEB = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const E = require(path.join(WEB, "escenas.js"));
const BASE = process.env.FUENTES_TXT || "/mnt/project-files/fuentes/txt";
const TEXTOS = { RGC: "rgc_full.txt", LSV: "l.txt" };
const sinComprobar = process.argv.includes("--sin-comprobar-citas");

const errores = [];
const datos = JSON.parse(fs.readFileSync(path.join(WEB, "preguntas", "escenas.json"), "utf8")).escenas;
const banco = fs.readFileSync(path.join(WEB, "data", "preguntas.js"), "utf8");
const preguntas = JSON.parse(banco.slice(banco.indexOf("{"), banco.lastIndexOf("}") + 1)).preguntas;
const porId = new Map(preguntas.map(p => [p.id, p]));

const norm = s => s.replace(/­/g, "").replace(/[‐‑]/g, "-").replace(/-\s*\n\s*/g, "").replace(/[’]/g, "'").replace(/[“”]/g, '"')
  .replace(/Página \d+\s+BOLETÍN OFICIAL DEL ESTADO\s+LEGISLACIÓN CONSOLIDADA/g, " ").replace(/\s+/g, " ").trim();
const textos = {};
function aparece(c) {
  if (sinComprobar) return true;
  const f = TEXTOS[c.norma];
  if (!f) return false;
  if (!textos[f]) {
    const ruta = path.join(BASE, f);
    if (!fs.existsSync(ruta)) { console.error(`No encuentro ${ruta}. Indica la carpeta con FUENTES_TXT=... o usa --sin-comprobar-citas (no publiques así).`); process.exit(1); }
    textos[f] = norm(fs.readFileSync(ruta, "utf8"));
  }
  return textos[f].includes(norm(c.texto));
}

const LETRAS = /^[A-D]$/, BRAZOS = ["N", "S", "E", "O"];
const salida = {};
for (const [id, esc] of Object.entries(datos)) {
  const p = porId.get(id);
  const mal = m => errores.push(`${id}: ${m}`);
  if (!p) { mal("no existe en data/preguntas.js"); continue; }
  if (!["cruce", "glorieta"].includes(esc.tipo)) mal(`tipo desconocido «${esc.tipo}»`);
  if (!["escena", "imagen", "nada"].includes(esc.antes)) mal("«antes» debe ser escena, imagen o nada");
  if (esc.antes === "imagen" && !(p.imagen && p.imagen.src)) mal("«antes» es imagen pero la pregunta no tiene imagen");
  if (!esc.titulo) mal("falta el título (texto alternativo)");
  for (const v of esc.vehiculos || []) {
    if (!LETRAS.test(v.letra)) mal(`letra de vehículo no válida «${v.letra}»`);
    if (v.dentro == null && !BRAZOS.includes(v.desde)) mal(`${v.letra}: «desde» no válido`);
    if (!BRAZOS.includes(v.hacia)) mal(`${v.letra}: «hacia» no válido`);
  }
  let pasos = esc.pasos;
  if (!pasos || !pasos.length) {
    if (esc.tipo !== "cruce") { mal("solo los cruces pueden ir sin pasos escritos"); continue; }
    if (esc.vehiculos.some(v => E.giroDe(v.desde, v.hacia) === "izquierda")) mal("el orden automático no cubre giros a la izquierda; escribe los pasos");
    const { grupos, bloqueo } = E.ordenCruce(esc.vehiculos, esc.vias);
    const calculado = grupos.map(g => g.map(v => v.letra).sort());
    const escrito = (esc.orden || []).map(g => g.slice().sort());
    if (bloqueo) mal("la regla de la derecha no da un orden (bloqueo)");
    if (JSON.stringify(calculado) !== JSON.stringify(escrito)) mal(`el orden calculado ${JSON.stringify(calculado)} no coincide con el escrito ${JSON.stringify(escrito)}`);
    pasos = E.pasosCruce(esc);
  }
  for (const [i, ps] of pasos.entries()) {
    if (!ps.texto) mal(`paso ${i + 1} sin texto`);
    if (!ps.cita || !ps.cita.texto) { mal(`paso ${i + 1} sin cita`); continue; }
    if (!aparece(ps.cita)) mal(`paso ${i + 1}: la cita de ${ps.cita.norma} ${ps.cita.articulo} no aparece literal en el BOE: «${ps.cita.texto}»`);
  }
  salida[id] = esc;
}
if (errores.length) { console.error(errores.join("\n")); console.error(`\n${errores.length} error(es). No se ha escrito data/escenas.js.`); process.exit(1); }
const destino = path.join(WEB, "data", "escenas.js");
fs.writeFileSync(destino, "// Generado por tools/build_escenas.mjs desde preguntas/escenas.json. No editar a mano.\nwindow.ESCENAS = " + JSON.stringify(salida, null, 1) + ";\n");
console.log(`${Object.keys(salida).length} escenas publicadas en ${path.relative(WEB, destino)}${sinComprobar ? " (SIN comprobar las citas)" : ""}.`);
