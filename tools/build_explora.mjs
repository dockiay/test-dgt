// Valida preguntas/explora.json y genera data/explora.js.
//   node tools/build_explora.mjs            (comprueba las citas contra FUENTES_TXT)
//   FUENTES_TXT=/ruta node tools/build_explora.mjs
// Comprueba:
// - que cada id existe en data/preguntas.js (ejecuta antes tools/build_data.py) y su tipo es conocido;
// - que el estado inicial y los retos solo usan claves del tipo (y valores válidos);
// - que cada cita aparece literal en el texto consolidado (RGC) o en el manual de la DGT;
// - que cada cifra que usa explora.js (CIFRAS y límites en poblado) aparece literal en su cita;
// - que la tabla de límites fuera de poblado coincide con la tabla del RGC 48.1.a (texto del BOE
//   con maquetación) y con las preguntas del banco que citan esa tabla.
// Si algo falla, termina con error y no escribe nada.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const WEB = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const X = require(path.join(WEB, "explora.js"));
const BASE = process.env.FUENTES_TXT || "/mnt/project-files/fuentes/txt";
const TEXTOS = { RGC: "rgc_full.txt", MANUAL_DGT: "manual_dgt.txt" };
const sinComprobar = process.argv.includes("--sin-comprobar-citas");

const errores = [];
const mal = m => errores.push(m);
const fuente = JSON.parse(fs.readFileSync(path.join(WEB, "preguntas", "explora.json"), "utf8"));
const { citas, explora } = fuente;
const banco = fs.readFileSync(path.join(WEB, "data", "preguntas.js"), "utf8");
const preguntas = JSON.parse(banco.slice(banco.indexOf("{"), banco.lastIndexOf("}") + 1)).preguntas;
const porId = new Map(preguntas.map(p => [p.id, p]));

const norm = s => s.replace(/­/g, "").replace(/[‐‑]/g, "-").replace(/-\s*\n\s*/g, "").replace(/[’]/g, "'").replace(/[“”]/g, '"')
  .replace(/Página \d+\s+BOLETÍN OFICIAL DEL ESTADO\s+LEGISLACIÓN CONSOLIDADA/g, " ").replace(/\s+/g, " ").trim();
const textos = {};
function leer(f) {
  if (!textos[f]) {
    const ruta = path.join(BASE, f);
    if (!fs.existsSync(ruta)) { console.error(`No encuentro ${ruta}. Indica la carpeta con FUENTES_TXT=... o usa --sin-comprobar-citas (no publiques así).`); process.exit(1); }
    textos[f] = fs.readFileSync(ruta, "utf8");
  }
  return textos[f];
}
const aparece = c => sinComprobar || (TEXTOS[c.norma] && norm(leer(TEXTOS[c.norma])).includes(norm(c.texto)));

// 1. Citas
for (const [k, c] of Object.entries(citas)) {
  if (!["RGC", "MANUAL_DGT"].includes(c.norma)) mal(`cita ${k}: norma desconocida «${c.norma}»`);
  if (!c.articulo || !c.texto) { mal(`cita ${k}: falta artículo o texto`); continue; }
  if (!aparece(c)) mal(`cita ${k}: no aparece literal en ${c.norma}: «${c.texto}»`);
}
const usadas = new Set(Object.values(X.CITAS_TIPO).flat());
for (const k of usadas) if (!citas[k]) mal(`explora.js usa la cita «${k}», que no está en preguntas/explora.json`);

// 2. Cifras de explora.js dentro de su cita
for (const [n, cf] of Object.entries(X.CIFRAS)) {
  const c = citas[cf.cita];
  if (!c) { mal(`cifra ${n}: cita «${cf.cita}» inexistente`); continue; }
  if (!norm(c.texto).includes(cf.literal)) mal(`cifra ${n} (${cf.valor}): «${cf.literal}» no está en la cita ${cf.cita}`);
}
const NUM = { "medio segundo": 0.5, "un segundo": 1, "dos o tres segundos": [2, 3], "un segundo más": 1, "cuatro segundos": 4, "seis segundos": 6 };
for (const [n, cf] of Object.entries(X.CIFRAS)) {
  const m = cf.literal.match(/^([\d.,]+)\s/), v = m ? +m[1].replace(/\./g, "").replace(",", ".") : NUM[cf.literal];
  const ok = Array.isArray(v) ? v.includes(cf.valor) : cf.literal === "entre medio segundo y un segundo" ? [0.5, 1].includes(cf.valor) : v === cf.valor;
  if (!ok) mal(`cifra ${n}: el valor ${cf.valor} no corresponde a «${cf.literal}»`);
}
// 3. Límites
for (const [k, v] of Object.entries(X.VIAS)) {
  const c = citas[v.cita];
  if (!c) { mal(`vía ${k}: cita inexistente`); continue; }
  if (v.literal && !(norm(c.texto).includes(v.literal) && v.literal === `${v.valor} km/h`)) mal(`vía ${k}: ${v.valor} km/h no está en la cita ${v.cita}`);
}
if (!sinComprobar) {
  // Tabla 48.1.a en el texto maquetado: fila «Autopista y / autovía» y fila «Convencional», tres columnas
  // en el orden del BOE: turismos…, camiones…, autobuses….
  const lay = leer("rgc_full_layout.txt").split("\n"), i = lay.findIndex(l => /^\s*Autopista y\s*$/.test(l));
  const nums = l => (l.match(/\d+/g) || []).map(Number);
  const auto = i >= 0 ? nums(lay[i + 1]) : [], conv = i >= 0 ? nums(lay.slice(i, i + 6).find(l => /^\s*Convencional\s+\d/.test(l)) || "") : [];
  const ORDEN = ["turismo", "camion", "autobus"];
  if (auto.length !== 3 || conv.length !== 3) mal("no encuentro la tabla del RGC 48.1.a en rgc_full_layout.txt");
  else ORDEN.forEach((g, j) => {
    if (X.VIAS.autopista.valores[g] !== auto[j]) mal(`límite autopista/${g}: ${X.VIAS.autopista.valores[g]} y el BOE dice ${auto[j]}`);
    if (X.VIAS.convencional.valores[g] !== conv[j]) mal(`límite convencional/${g}: ${X.VIAS.convencional.valores[g]} y el BOE dice ${conv[j]}`);
  });
}
for (const via of ["autopista", "convencional"]) for (const [g, gr] of Object.entries(X.GRUPOS)) {
  const v = X.VIAS[via], enBanco = preguntas.filter(p => p.fuente && p.fuente.tabla && /^48\.1\.a/.test(p.fuente.articulo) && p.fuente.tabla.columna === gr.columna && p.fuente.tabla.fila === v.fila);
  if (!enBanco.length) mal(`límite ${via}/${g}: ninguna pregunta del banco cita esa celda de la tabla`);
  for (const p of enBanco) if (+p.fuente.tabla.valor !== v.valores[g]) mal(`límite ${via}/${g}: ${v.valores[g]} y ${p.id} dice ${p.fuente.tabla.valor}`);
}

// 4. Preguntas
const salida = {};
for (const [id, cfg] of Object.entries(explora)) {
  const p = porId.get(id), m = t => mal(`${id}: ${t}`);
  if (!p) { m("no existe en data/preguntas.js"); continue; }
  const base = X.ESTADO[cfg.tipo];
  if (!base) { m(`tipo desconocido «${cfg.tipo}»`); continue; }
  if (!cfg.titulo) m("falta el título");
  const valido = (k, v) => {
    if (!(k in base) && !(X.DERIVADOS[cfg.tipo] && k in X.DERIVADOS[cfg.tipo])) return `clave desconocida «${k}»`;
    if (cfg.tipo === "limites" && k === "via" && !X.VIAS[v]) return `vía desconocida «${v}»`;
    if (cfg.tipo === "limites" && k === "vehiculo" && !X.GRUPOS[v]) return `vehículo desconocido «${v}»`;
    if (cfg.tipo === "seguimiento" && k === "vehiculo" && !["turismo", "pesado", "largo"].includes(v)) return `vehículo desconocido «${v}»`;
    return null;
  };
  for (const [k, v] of Object.entries(cfg.inicial || {})) { const e = valido(k, v); if (e) m("inicial: " + e); }
  if (cfg.reto) {
    if (!cfg.reto.texto || !cfg.reto.si) m("reto sin texto o sin condición");
    for (const [k, v] of Object.entries(cfg.reto.si || {})) { const e = valido(k, v && typeof v === "object" ? null : v); if (e && !/desconocida «null»|desconocido «null»/.test(e)) m("reto: " + e); }
    const ini = Object.assign({}, base, cfg.inicial || {});
    if (X.cumpleReto(cfg.tipo, ini, cfg.reto.si)) m("el reto ya se cumple al empezar");
  }
  if (cfg.destacar && !["reaccion", "frenado", "detencion"].includes(cfg.destacar)) m(`destacar desconocido «${cfg.destacar}»`);
  salida[id] = cfg;
}

if (errores.length) { console.error(errores.join("\n")); console.error(`\n${errores.length} error(es). No se ha escrito data/explora.js.`); process.exit(1); }
const destino = path.join(WEB, "data", "explora.js");
fs.writeFileSync(destino, "// Generado por tools/build_explora.mjs desde preguntas/explora.json. No editar a mano.\nwindow.EXPLORA = " + JSON.stringify({ citas, explora: salida }, null, 1) + ";\n");
console.log(`${Object.keys(salida).length} preguntas con «Explóralo» en ${path.relative(WEB, destino)}${sinComprobar ? " (SIN comprobar las citas)" : ""}.`);
