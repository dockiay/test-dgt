// Mide la fluidez de la celebración al terminar una lección (celebracion.js).
// Uso: node pruebas/rendimiento/celebracion-fps.mjs [carpeta-web] [repeticiones]
// Sirve la web en local, abre la celebración de una lección perfecta (la más cargada: 170 piezas de
// confeti, 3 saltos) y cuenta los fotogramas con requestAnimationFrame durante los primeros 4,5 s.
// Perfiles: ordenador (1280×800), móvil (390×844, pantalla ×3, CPU 4× más lenta) y móvil viejo (CPU 6×).
// Para probar una hipótesis sin tocar el código: CSS_EXTRA='…' o JS_EXTRA='…' se inyectan antes de medir.
// Necesita Playwright: NODE_PATH=$(npm root -g) si está instalado de forma global.
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const raiz = path.resolve(process.argv[2] || ".");
const veces = Number(process.argv[3] || 3);
const tipos = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".webmanifest": "application/manifest+json" };
const servidor = http.createServer((q, r) => {
  let f = path.join(raiz, decodeURIComponent(q.url.split("?")[0]));
  if (f.endsWith("/")) f += "index.html";
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { "content-type": tipos[path.extname(f)] || "application/octet-stream" }); r.end(d); } });
}).listen(0);
const url = `http://127.0.0.1:${servidor.address().port}/`;

const perfiles = [
  { nombre: "Ordenador", viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, cpu: 1 },
  { nombre: "Móvil (CPU 4× lenta)", viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, cpu: 4 },
  { nombre: "Móvil viejo (CPU 6× lenta)", viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, cpu: 6 },
];

async function medir(navegador, p) {
  const ctx = await navegador.newContext({ viewport: p.viewport, deviceScaleFactor: p.deviceScaleFactor, isMobile: !!p.isMobile, hasTouch: !!p.hasTouch, serviceWorkers: "block" });
  await ctx.route(u => !u.href.startsWith(url), r => r.abort());
  const pag = await ctx.newPage();
  await pag.goto(url, { waitUntil: "load" });
  await pag.waitForFunction(() => window.Celebracion && window.App);
  if (process.env.CSS_EXTRA) await pag.addStyleTag({ content: process.env.CSS_EXTRA });
  if (process.env.JS_EXTRA) await pag.evaluate(process.env.JS_EXTRA);
  await pag.waitForTimeout(800);
  const cdp = await ctx.newCDPSession(pag);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: p.cpu });
  const r = await pag.evaluate(() => new Promise(fin => {
    const marcas = [];
    let largas = 0;
    try { new PerformanceObserver(l => { largas += l.getEntries().length; }).observe({ type: "longtask" }); } catch (e) {}
    const t0 = performance.now();
    Celebracion.terminar({ tipo: "practica", aciertos: 10, hechas: 10, fallos: 0, segundos: 214, completa: true, mejorSerie: 10 });
    (function paso(t) { marcas.push(t); if (t - t0 < 4500) requestAnimationFrame(paso); else fin({ marcas, largas, t0 }); })(performance.now());
  }));
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await ctx.close();
  const d = [];
  for (let i = 1; i < r.marcas.length; i++) d.push(r.marcas[i] - r.marcas[i - 1]);
  const dur = r.marcas.at(-1) - r.marcas[0];
  const ord = [...d].sort((a, b) => a - b);
  // Fotogramas perdidos: cada intervalo cuenta cuántos huecos de 16,7 ms se ha saltado.
  const perdidos = d.reduce((s, x) => s + Math.max(0, Math.round(x / 16.67) - 1), 0);
  return { fps: d.length / dur * 1000, p95: ord[Math.floor(ord.length * 0.95)], peor: ord.at(-1), perdidos, largas: r.largas };
}

const mediana = a => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
const navegador = await chromium.launch();
const salida = {};
for (const p of perfiles) {
  const rs = [];
  for (let i = 0; i < veces; i++) rs.push(await medir(navegador, p));
  salida[p.nombre] = { fps: mediana(rs.map(x => x.fps)).toFixed(1), "p95 ms": mediana(rs.map(x => x.p95)).toFixed(1), "peor ms": mediana(rs.map(x => x.peor)).toFixed(0), perdidos: mediana(rs.map(x => x.perdidos)), "tareas largas": mediana(rs.map(x => x.largas)) };
}
await navegador.close();
servidor.close();
console.table(salida);
console.log(JSON.stringify(salida));
