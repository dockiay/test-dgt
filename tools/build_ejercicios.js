#!/usr/bin/env node
/* Junta los ejercicios de los prototipos (prototipos/ejercicios y prototipos/recordar) para el camino del temario.
   Uso: node tools/build_ejercicios.js
   - Copia los motores y sus estilos a ejercicios/ (motor.js, recordar.js, esquemas.js, ejercicios.css, recordar.css).
   - Escribe data/ejercicios.js con window.EJERCICIOS_CAMINO (todos los tipos menos «Piénsala antes», sin las citas
     largas, que la web no enseña) y window.PIENSA_IDS (preguntas del banco que se pueden contestar con las opciones
     tapadas: el ejercicio se monta en la web a partir de la propia pregunta).
   Las citas se comprueban en los prototipos (comprobar.py de cada carpeta) antes de construir. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const RAIZ = path.join(__dirname, ".."), PE = path.join(RAIZ, "prototipos/ejercicios"), PR = path.join(RAIZ, "prototipos/recordar");

function cargar(dir, ficheros) {
  const ctx = { window: { EJERCICIOS: [], EJERCICIOS_RECORDAR: [] } };
  vm.createContext(ctx);
  for (const f of ficheros) vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
  return ctx.window;
}
const datosDe = dir => fs.readdirSync(dir).filter(f => /^datos.*\.js$/.test(f)).sort((a, b) => (a === "datos.js" ? -1 : b === "datos.js" ? 1 : a.localeCompare(b)));
const a = cargar(PE, datosDe(PE)).EJERCICIOS;
const b = cargar(PR, datosDe(PR)).EJERCICIOS_RECORDAR;

// Unidad para los que no salen de ninguna pregunta del banco (los que sí, van a la unidad de sus preguntas).
function unidadSinBanco(e) {
  const i = e.id, m = e.materia;
  const una = { 2: 1, 3: 1, 5: 1, 7: 1, 9: 1, 12: 1, 13: 1, 15: 1, 16: 1 };
  if (una[m]) return `m${m}u1`;
  if (m === 4) return /fatiga|sueño|percep|distrac/.test(i) ? "m4u2" : "m4u1";
  if (m === 6) return /lluvia|niebla|nieve|viento|hielo/.test(i) ? "m6u2" : "m6u1";
  if (m === 8) return /senal|peaton-|ciclista-que|vulnerable/.test(i) && e.tipo === "emparejar" ? "m8u1" : "m8u2";
  if (m === 10) return /punt|edad|permiso|novel/.test(i) ? "m10u1" : "m10u2";
  if (m === 11) return /112|pas|proteger|momentos|accidente/.test(i) && !/herido/.test(i) ? "m11u1" : "m11u2";
  if (m === 14) return /adas|asist|abs|esp/.test(i) ? "m14u2" : "m14u1";
  if (/velocidad|limites|urbana|autovia|convencional|vel-/.test(i)) return "m1u8";
  if (/emergencia|carril|vias|via-/.test(i)) return "m1u1";
  if (/adelant/.test(i)) return "m1u10";
  if (/semaforo|agente|balizas|prioridad-senales|preferencia/.test(i)) return "m1u2";
  if (/incorporacion|giro|rsm|maniobra|sentido|marcha/.test(i)) return "m1u9";
  if (/cruce|glorieta|tierra|tranvia|stop|ceda|estrech|pri-/.test(i)) return "m1u7";
  if (/parada|parar-estacionar|estacion/.test(i)) return "m1u11";
  if (/entrada|parar|fin|obligacion|prohib/.test(i)) return "m1u4";
  if (/marca/.test(i)) return "m1u6";
  if (/infracc|sancion|delito/.test(i)) return "m1u12";
  if (/indicacion|autopista/.test(i)) return "m1u5";
  if (e.tipo === "emparejar" || /senal/.test(i)) return "m1u3";
  return "m1u2";
}

const fuera = [], ids = new Set(), lista = [], piensa = [];
for (const e0 of a.concat(b)) {
  if (ids.has(e0.id)) throw new Error("id repetido: " + e0.id);
  ids.add(e0.id);
  if (e0.tipo === "piensa") { if (e0.banco) piensa.push(e0.banco); continue; }
  const e = JSON.parse(JSON.stringify(e0));
  if (e.fuente) { delete e.fuente.cita; delete e.fuente.comprobar; delete e.fuente.cita_adicional; }
  e.de = [].concat(e.de || []);
  if (!e.de.length) e.uCamino = unidadSinBanco(e);
  lista.push(e);
}
const cuenta = {};
for (const e of lista) cuenta[e.tipo] = (cuenta[e.tipo] || 0) + 1;

fs.mkdirSync(path.join(RAIZ, "ejercicios"), { recursive: true });
const copias = [[PE, "ejercicios.js", "motor.js"], [PE, "esquemas.js", "esquemas.js"], [PE, "ejercicios.css", "ejercicios.css"], [PR, "recordar.js", "recordar.js"], [PR, "recordar.css", "recordar.css"]];
for (const [dir, de, a2] of copias)
  fs.writeFileSync(path.join(RAIZ, "ejercicios", a2), `/* Copia de prototipos/${path.basename(dir)}/${de}: no editar aquí, editar allí y volver a correr node tools/build_ejercicios.js */\n` + fs.readFileSync(path.join(dir, de), "utf8"));

const salida = "/* GENERADO por tools/build_ejercicios.js a partir de prototipos/ejercicios y prototipos/recordar: no editar a mano.\n" +
  `   ${lista.length} ejercicios para el camino (${Object.entries(cuenta).map(([t, n]) => `${t} ${n}`).join(", ")}) y ${piensa.length} preguntas para «Piénsala antes». */\n` +
  "window.EJ_RAIZ = \"\"; // los motores buscan las imágenes desde la raíz de la web\n" +
  "window.EJERCICIOS_CAMINO = [\n" + lista.map(e => JSON.stringify(e)).join(",\n") + "\n];\n" +
  "window.PIENSA_IDS = " + JSON.stringify(piensa) + ";\n";
fs.writeFileSync(path.join(RAIZ, "data/ejercicios.js"), salida);
console.log(`${lista.length} ejercicios`, cuenta, `${piensa.length} piensa`, `${Math.round(salida.length / 1024)} KB`);
