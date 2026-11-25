#!/usr/bin/env node
/* Ejercicios sacados del banco publicado (data/preguntas.js) y de las escenas (data/escenas.js),
   sin texto nuevo: los significados, porqués, trucos y citas son los de preguntas ya verificadas,
   y el orden de paso es el que guardan las escenas (comprobado por tools/build_escenas.mjs).

   - Empareja señales: preguntas «¿Qué indica esta señal?» y parecidas, en grupos de 4 de la misma familia.
   - Toca en la escena: cruces de 2 vehículos (quién pasa primero) y tramos estrechos (quién da marcha atrás).
   - Ordena en la escena: cruces de 3 o más vehículos en los que pasan de uno en uno.
   - Escribe la cifra: una lista corta de cifras fáciles (CIFRAS), elegidas a mano.

   Uso:  node prototipos/ejercicios/generar_desde_banco.js   → escribe datos-banco.js */
"use strict";
const fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..", ".."), AQUI = __dirname;
global.window = {};
require(path.join(RAIZ, "data", "preguntas.js"));
require(path.join(RAIZ, "data", "escenas.js"));
const Esc = require(path.join(RAIZ, "escenas.js"));
const B = window.BANCO.preguntas, E = window.ESCENAS, POR_ID = new Map(B.map(p => [p.id, p]));
const URL_RGC = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";
const sinPunto = t => String(t).trim().replace(/\.$/, "");
const fuenteDe = p => { const f = p.fuente; return { norma: f.norma, articulo: f.articulo, url: f.url, cita: f.cita }; };
const salida = [];

// ---------- Escribe la cifra: solo cifras redondas y muy repetidas (feedback de Sergio, 25-11) ----------
const CIFRAS = ["vel-0011", "vel-0014", "C-pun-0001", "C-pun-0014"];
for (const id of CIFRAS) {
  const p = POR_ID.get(id), m = String(p.opciones[p.correcta]).match(/^\s*(\d+(?:,\d+)?)\s*(.*?)\.?\s*$/);
  if (!m) throw new Error("Cifra sin número: " + id);
  salida.push({ id: "banco-cifra-" + id, de: id, tipo: "cifra", materia: p.materia, enunciado: p.enunciado,
    respuesta: Number(m[1].replace(",", ".")), unidad: m[2],
    porque: p.leccion ? p.leccion.porque : p.explicacion, truco: p.leccion && p.leccion.truco, fuente: fuenteDe(p) });
}

// ---------- Empareja señales ----------
const PREGUNTA_SENAL = /^¿(Qué indica|Qué significa|De qué advierte) esta señal\?$/;
const FAMILIAS = [
  [/^P-/, "Empareja cada señal de peligro con lo que avisa."],
  [/^R-[1-6]$|^R-[1-6][a-z]?$/, "Empareja cada señal de prioridad con lo que significa."],
  [/^R-1\d\d/, "Empareja cada señal de entrada prohibida con lo que indica."],
  [/^R-2\d\d/, "Empareja cada señal de restricción de paso con lo que indica."],
  [/^R-3\d\d/, "Empareja cada señal de prohibición con lo que indica."],
  [/^R-4\d\d/, "Empareja cada señal de obligación con lo que indica."],
  [/^R-5\d\d/, "Empareja cada señal de fin de prohibición con lo que indica."],
  [/^S-/, "Empareja cada señal de indicación con lo que significa."],
];
const familias = new Map();
for (const p of B) {
  const src = p.imagen && p.imagen.src || "", m = src.match(/img\/senales\/([^/]+)\.png$/);
  if (!m || !PREGUNTA_SENAL.test(p.enunciado)) continue;
  let texto = sinPunto(p.opciones[p.correcta]);
  if (/^De qué advierte/.test(p.enunciado)) texto = texto.replace(/^De (un|una|la|el|los|las) /, (x, a) => a + " ").replace(/^./, c => c.toUpperCase());
  if (texto.length > 70) continue; // no cabe bien en una casilla
  const fam = FAMILIAS.findIndex(([re]) => re.test(m[1]));
  if (fam < 0) continue;
  if (!familias.has(fam)) familias.set(fam, []);
  const lista = familias.get(fam);
  if (lista.some(x => x.senal === m[1] || x.texto.toLowerCase() === texto.toLowerCase())) continue; // ni señal ni significado repetidos
  lista.push({ senal: m[1], texto, p });
}
const natural = (a, b) => a.senal.localeCompare(b.senal, "es", { numeric: true });
for (const [fam, lista] of [...familias].sort((a, b) => a[0] - b[0])) {
  lista.sort(natural);
  // Grupos de 4; si sobran 1 o 2, el último grupo se reparte para que ninguno baje de 3.
  const n = lista.length; if (n < 3) continue;
  const grupos = Math.ceil(n / 4), tam = Array.from({ length: grupos }, (_, i) => Math.floor(n / grupos) + (i < n % grupos ? 1 : 0));
  let k = 0;
  tam.forEach((t, gi) => {
    const g = lista.slice(k, k + t); k += t;
    if (g.length < 3) return;
    const codigos = g.map(x => x.senal);
    salida.push({ id: `banco-senales-${codigos.join("-")}`, de: g.map(x => x.p.id), tipo: "emparejar", materia: 1,
      enunciado: FAMILIAS[fam][1],
      parejas: g.map(x => [{ senal: x.senal }, x.texto]),
      porque: g.map(x => `${x.senal}: ${x.texto.replace(/^./, c => c.toLowerCase())}.`).join(" "),
      truco: g.length === 1 ? null : null,
      fuente: { norma: "RGC_CATALOGO", articulo: `Anexo I, catálogo de señales, ${codigos.slice(0, -1).join(", ")} y ${codigos.slice(-1)}`,
        url: URL_RGC + "#ani", cita: g.map(x => x.p.fuente.cita).join(" | "), comprobar: g.map(x => x.p.fuente.cita),
        normas: g.map(x => x.p.fuente.norma) } });
  });
}

// ---------- Escenas: tocar y ordenar ----------
const anclaRGC = art => URL_RGC + "#a" + String(art).split(".")[0];
const primeraFrase = t => (String(t).match(/^[^.]*\./) || [t])[0];
for (const [id, e] of Object.entries(E)) {
  const p = POR_ID.get(id);
  if (!p || e.antes !== "escena") continue;
  const letras = e.vehiculos.filter(v => v.letra).map(v => v.letra);
  if (e.tipo === "cruce" && e.orden && !e.pasos) {
    const pasos = Esc.pasosCruce(e), conCita = pasos.filter(x => x.cita), cita = (conCita[conCita.length - 1] || {}).cita;
    if (!cita) continue;
    const comun = { de: id, materia: p.materia, escena: id, porque: pasos.map(x => x.texto).join(" "),
      fuente: { norma: cita.norma, articulo: cita.articulo, url: anclaRGC(cita.articulo), cita: [...new Set(conCita.map(x => x.cita.texto))].join(" | "),
        comprobar: [...new Set(conCita.map(x => x.cita.texto))] } };
    const unoAUno = e.orden.every(g => g.length === 1);
    if (letras.length >= 3 && unoAUno) {
      salida.push(Object.assign({ id: "banco-ordenar-" + id, tipo: "ordenar", enunciado: primeraFrase(e.titulo) + " Ordena los vehículos según pasan.",
        pasos: e.orden.map(g => ({ texto: "Vehículo " + g[0] })) }, comun));
    } else if (false && e.orden[0].length === 1 && letras.length >= 2) { // «tocar» de escenas: ahora en datos-tocar.js (hilo de tocar)
      salida.push(Object.assign({ id: "banco-tocar-" + id, tipo: "tocar", enunciado: primeraFrase(e.titulo) + " Toca el vehículo que pasa primero.",
        zonas: letras.map(l => ({ id: l, etiqueta: "Vehículo " + l })), correcta: e.orden[0][0], textoCorrecta: "el vehículo " + e.orden[0][0] }, comun));
    }
  } else if (false && e.tipo === "estrecho" && e.retrocede && e.pasos) { // ídem
    const conCita = e.pasos.filter(x => x.cita);
    if (!conCita.length) continue;
    const cita = conCita[conCita.length - 1].cita;
    salida.push({ id: "banco-tocar-" + id, de: id, tipo: "tocar", materia: p.materia, escena: id,
      enunciado: primeraFrase(e.titulo) + " Toca el vehículo que tiene que dar marcha atrás.",
      zonas: letras.map(l => ({ id: l, etiqueta: "Vehículo " + l })), correcta: e.retrocede, textoCorrecta: "el vehículo " + e.retrocede,
      porque: e.pasos.map(x => x.texto).join(" "),
      fuente: { norma: cita.norma, articulo: cita.articulo, url: anclaRGC(cita.articulo), cita: [...new Set(conCita.map(x => x.cita.texto))].join(" | "),
        comprobar: [...new Set(conCita.map(x => x.cita.texto))] } });
  }
}

const cuenta = {}; salida.forEach(x => cuenta[x.tipo] = (cuenta[x.tipo] || 0) + 1);
fs.writeFileSync(path.join(AQUI, "datos-banco.js"),
  "// Generado por generar_desde_banco.js desde data/preguntas.js y data/escenas.js; no editar a mano.\n" +
  "window.EJERCICIOS.push(...\n" + JSON.stringify(salida, null, 1) + ");\n");
console.log("datos-banco.js:", salida.length, "ejercicios", cuenta);
