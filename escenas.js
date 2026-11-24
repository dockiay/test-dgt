// Escenas animadas: situaciones de tráfico dibujadas con código a partir de datos
// (data/escenas.js, generado desde preguntas/escenas.json con tools/build_escenas.mjs).
// - Antes de responder: fotograma quieto que no da pistas (solo si escena.antes === "escena").
// - Al responder: reproductor paso a paso al final de la explicación; cada paso cita la norma.
// - Sin librerías. Solo se anima lo que está en pantalla. Con «reducir movimiento», los pasos
//   cambian sin animación.
// Las funciones puras (orden de paso, pasos) también se usan desde Node para comprobar los datos.
(function (raiz) {
  "use strict";
  const enNavegador = typeof document !== "undefined";
  const NS = "http://www.w3.org/2000/svg";
  const MOV = enNavegador && raiz.matchMedia ? raiz.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  const COLOR = { A: ["#e5484d", "#b4232b", "#ff8589"], B: ["#2f6fe0", "#1a46b0", "#7aa7ff"], C: ["#f2a516", "#b47400", "#ffd27a"], D: ["#2bb35a", "#137a37", "#7fe0a0"] };

  // ===================================================================
  // Geometría del cruce (vista desde arriba, se circula por la derecha)
  // Calzadas de 80 px (dos carriles de 40); el centro está en (200, 200).
  // ===================================================================
  const BRAZO = {
    S: { dir: [0, -1], carril: 220, derecha: "E", nombre: "sur" },
    N: { dir: [0, 1], carril: 180, derecha: "O", nombre: "norte" },
    E: { dir: [-1, 0], carril: 180, derecha: "N", nombre: "este" },
    O: { dir: [1, 0], carril: 220, derecha: "S", nombre: "oeste" }
  };
  const OPUESTO = { S: "N", N: "S", E: "O", O: "E" };
  const IZQUIERDA = { S: "O", O: "N", N: "E", E: "S" };
  const giroDe = (desde, hacia) => hacia === OPUESTO[desde] ? "recto" : hacia === IZQUIERDA[desde] ? "izquierda" : "derecha";
  // Punto de un brazo: d = distancia al centro a lo largo del brazo; lat = distancia al eje (positiva = carril de entrada).
  function enBrazo(b, d, lat) {
    const v = { S: [0, 1], N: [0, -1], E: [1, 0], O: [-1, 0] }[b];       // hacia fuera del cruce
    const der = { S: [1, 0], N: [-1, 0], E: [0, -1], O: [0, 1] }[b];      // lado del carril de entrada
    return [200 + v[0] * d + der[0] * lat, 200 + v[1] * d + der[1] * lat];
  }

  // ---------- Trayectorias con marcas ----------
  function camino(x, y) {
    const pts = [[x, y]], marcas = {};
    const api = {
      a(p) { pts.push(p); return api; },
      curva(c, p, n = 20) {
        const [x0, y0] = pts[pts.length - 1];
        for (let i = 1; i <= n; i++) { const t = i / n, u = 1 - t; pts.push([u * u * x0 + 2 * u * t * c[0] + t * t * p[0], u * u * y0 + 2 * u * t * c[1] + t * t * p[1]]); }
        return api;
      },
      arco(cx, cy, r, a0, a1, paso = 3) {
        const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / paso));
        for (let i = 1; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
        return api;
      },
      marca(n) { marcas[n] = pts.length - 1; return api; },
      fin() {
        const acum = [0];
        for (let i = 1; i < pts.length; i++) acum.push(acum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        const L = acum[acum.length - 1], fr = { inicio: 0, fin: 1 };
        for (const k in marcas) fr[k] = acum[marcas[k]] / L;
        const punto = d => {
          d = Math.max(0, Math.min(L, d));
          let lo = 1, hi = acum.length - 1;
          while (lo < hi) { const m = (lo + hi) >> 1; if (acum[m] < d) lo = m + 1; else hi = m; }
          const i = lo, seg = acum[i] - acum[i - 1] || 1, t = (d - acum[i - 1]) / seg;
          return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
        };
        // El ángulo se mide entre un punto un poco por detrás y otro por delante: giros suaves, sin saltos.
        const en = f => {
          const d = f * L, [x, y] = punto(d), a = punto(d - 10), b = punto(d + 4);
          return { x, y, ang: Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI + 90 };
        };
        return { en, fr, L };
      }
    };
    return api;
  }

  function trayectoCruce(v) {
    const g = giroDe(v.desde, v.hacia);
    // Antes de girar se ciñe: a la izquierda, junto al eje; a la derecha, al borde derecho (RGC 75.1.b).
    const lat = g === "izquierda" ? 11 : g === "derecha" ? 26 : 20;
    const c = camino(...enBrazo(v.desde, 230, 20)).marca("lejos")
      .a(enBrazo(v.desde, 160, lat)).marca("cerca").a(enBrazo(v.desde, 90, lat)).marca("espera");
    if (g === "recto") return c.a(enBrazo(v.desde, 40, lat)).marca("dentro").a(enBrazo(v.hacia, 250, -20)).fin();
    if (g === "derecha") {
      const ctrl = interseccion(v.desde, 26, v.hacia, -26);
      return c.a(enBrazo(v.desde, 52, lat)).marca("dentro").curva(ctrl, enBrazo(v.hacia, 52, -26)).a(enBrazo(v.hacia, 250, -20)).fin();
    }
    // Izquierda: avanza hasta el centro y gira dejándolo a su izquierda (RGC 75.1.c).
    const ctrl = interseccion(v.desde, 11, v.hacia, -14);
    return c.a(enBrazo(v.desde, 6, lat)).marca("dentro").curva(ctrl, enBrazo(v.hacia, 44, -16), 26).a(enBrazo(v.hacia, 250, -20)).fin();
  }
  // Punto donde se cruzan la línea del carril de un brazo y la del otro (para la curva del giro).
  function interseccion(b1, lat1, b2, lat2) {
    const p1 = enBrazo(b1, 0, lat1), p2 = enBrazo(b2, 0, lat2);
    const vertical = b => b === "S" || b === "N";
    return vertical(b1) ? [p1[0], p2[1]] : [p2[0], p1[1]];
  }

  // ===================================================================
  // Orden de paso en un cruce
  // Prioridad (de más a menos): vía sin señal frente a vía con STOP o ceda (RGC 56.5);
  // vía pavimentada frente a camino sin pavimentar (RGC 57.1.a); y, entre iguales, la
  // regla de la derecha (RGC 57.1). Pasan a la vez los que no tienen a nadie con prioridad
  // pendiente y no se cortan (solo se calcula para trayectorias rectas o a la derecha).
  // ===================================================================
  function nivel(v, vias) {
    const via = (vias && vias[v.desde]) || {};
    if (via.senal === "stop" || via.senal === "ceda") return 2;
    if (via.firme === "tierra") return 1;
    return 0;
  }
  function ordenCruce(vehiculos, vias) {
    const manda = (x, y) => nivel(x, vias) < nivel(y, vias) || (nivel(x, vias) === nivel(y, vias) && BRAZO[y.desde].derecha === x.desde);
    let quedan = vehiculos.slice(); const grupos = [];
    while (quedan.length) {
      const libres = quedan.filter(y => !quedan.some(x => x !== y && manda(x, y)));
      if (!libres.length) return { grupos, bloqueo: quedan };
      grupos.push(libres); quedan = quedan.filter(v => !libres.includes(v));
    }
    return { grupos, bloqueo: null };
  }
  const CITAS = {
    "57.1": { norma: "RGC", articulo: "57.1", texto: "En defecto de señal que regule la preferencia de paso, el conductor está obligado a cederlo a los vehículos que se aproximen por su derecha" },
    "57.1.a": { norma: "RGC", articulo: "57.1.a", texto: "Tendrán derecho de preferencia de paso los vehículos que circulen por una vía pavimentada frente a los procedentes de otra sin pavimentar." },
    "56.5": { norma: "RGC", articulo: "56.5", texto: "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente, cualquiera que sea el lado por el que se aproximen, llegando a detener por completo su marcha cuando sea preciso y, en todo caso, cuando así lo indique la señal correspondiente" }
  };
  const lista = xs => xs.length === 1 ? xs[0] : xs.slice(0, -1).join(", ") + " y " + xs[xs.length - 1];
  // Pasos automáticos de un cruce: texto, cita, movimientos y etiquetas de cada vehículo.
  function pasosCruce(esc) {
    const vs = esc.vehiculos, vias = esc.vias || {};
    const { grupos, bloqueo } = ordenCruce(vs, vias);
    const pasos = [], hechos = new Set();
    const senal = v => (vias[v.desde] || {}).senal;
    const conSenal = vs.filter(senal), sinSenal = vs.filter(v => !senal(v));
    const quien = v => v.tu ? "usted (" + v.letra + ")" : v.letra;
    if (conSenal.length) {
      const stop = conSenal.filter(v => senal(v) === "stop").map(v => v.letra), ceda = conSenal.filter(v => senal(v) === "ceda").map(v => v.letra);
      const partes = [];
      if (stop.length) partes.push(`${lista(stop)} ${stop.length > 1 ? "tienen" : "tiene"} STOP: se detiene${stop.length > 1 ? "n" : ""} por completo en la línea`);
      if (ceda.length) partes.push(`${lista(ceda)} ${ceda.length > 1 ? "tienen" : "tiene"} ceda el paso: frena${ceda.length > 1 ? "n" : ""} y se detiene${ceda.length > 1 ? "n" : ""} porque viene alguien por la vía preferente`);
      const et = {}; conSenal.forEach(v => et[v.letra] = senal(v) === "stop" ? "STOP" : "Cede"); sinSenal.forEach(v => et[v.letra] = "Preferente");
      pasos.push({ texto: partes.join(". ") + ". Ceden el paso a la vía preferente, venga quien venga y por el lado que sea.", cita: CITAS["56.5"], etiquetas: et, foco: conSenal.map(v => v.letra), mover: [], ms: 1700 });
    }
    grupos.forEach((g, i) => {
      const letras = g.map(v => v.letra), plural = g.length > 1;
      const esperan = vs.filter(v => !hechos.has(v.letra) && !letras.includes(v.letra));
      let porque, cita;
      if (conSenal.length && g.every(v => !senal(v))) { porque = plural ? "circulan por la vía preferente" : "circula por la vía preferente"; cita = CITAS["56.5"]; }
      else if (conSenal.length) { porque = "la vía preferente ya está libre"; cita = CITAS["56.5"]; }
      else if (g.every(v => nivel(v, vias) === 0) && vs.some(v => nivel(v, vias) === 1)) { porque = plural ? "circulan por la vía pavimentada; quien sale del camino de tierra les cede el paso" : "circula por la vía pavimentada; quien sale del camino de tierra le cede el paso, aunque venga por su derecha"; cita = CITAS["57.1.a"]; }
      else {
        const tenian = g.filter(v => vs.some(x => x.desde === BRAZO[v.desde].derecha && nivel(x, vias) === nivel(v, vias)));
        porque = tenian.length ? (plural ? "ya no les queda nadie por su derecha" : "ya no le queda nadie por su derecha") : (plural ? "nadie se les acerca por su derecha" : "nadie se le acerca por su derecha");
        cita = vs.some(v => nivel(v, vias) === 1) ? CITAS["57.1.a"] : CITAS["57.1"];
      }
      const orden = grupos.length === 1 ? "" : i === 0 ? "Primero " : i === grupos.length - 1 ? "Por último " : "Después ";
      const sujeto = plural ? `pasan ${lista(g.map(quien))} a la vez, porque sus trayectorias no se cortan` : `pasa ${quien(g[0])}`;
      const et = {}; letras.forEach(l => et[l] = "Pasa"); esperan.forEach(v => et[v.letra] = senal(v) === "stop" ? "STOP" : "Espera");
      const texto = (orden + sujeto).replace(/^./, c => c.toUpperCase()) + ": " + porque + ".";
      pasos.push({ texto, cita, etiquetas: et, foco: letras, mover: g.map(v => ({ v: v.letra, hasta: "fin", modo: "arranca" })), ms: 2300 });
      letras.forEach(l => hechos.add(l));
    });
    if (bloqueo) pasos.push({ texto: `${lista(bloqueo.map(v => v.letra))}: cada uno tiene a otro por su derecha, así que la regla de la derecha no resuelve quién sale primero.`, cita: CITAS["57.1"], etiquetas: {}, foco: bloqueo.map(v => v.letra), mover: [], ms: 1800 });
    return pasos;
  }

  const api = { ordenCruce, pasosCruce, giroDe, CITAS };
  if (!enNavegador) { if (typeof module !== "undefined") module.exports = api; return; }

  // ===================================================================
  // Dibujo (solo en el navegador)
  // ===================================================================
  function s(tag, at, ...hijos) {
    const e = document.createElementNS(NS, tag);
    for (const k in at || {}) if (at[k] != null) e.setAttribute(k, at[k]);
    for (const c of hijos.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  let nId = 0;
  function lienzo(titulo) {
    const id = "esc" + (++nId);
    const svg = s("svg", { viewBox: "0 0 400 400", role: "img", "aria-label": titulo || "Escena de tráfico", class: "esc-svg" });
    // Textura de césped y sombra común.
    svg.append(s("defs", {},
      s("pattern", { id: id + "-cesped", width: 22, height: 22, patternUnits: "userSpaceOnUse" },
        s("rect", { width: 22, height: 22, class: "e-cesped" }),
        s("circle", { cx: 5, cy: 6, r: 1.4, class: "e-cesped-punto" }), s("circle", { cx: 16, cy: 15, r: 1.1, class: "e-cesped-punto" })),
      s("pattern", { id: id + "-tierra", width: 16, height: 16, patternUnits: "userSpaceOnUse" },
        s("rect", { width: 16, height: 16, class: "e-tierra" }),
        s("circle", { cx: 4, cy: 4, r: 1.3, class: "e-tierra-punto" }), s("circle", { cx: 12, cy: 10, r: 1, class: "e-tierra-punto" }), s("circle", { cx: 7, cy: 13, r: .8, class: "e-tierra-punto" }))));
    svg._id = id;
    return svg;
  }
  const arbol = (x, y, r) => s("g", { class: "e-arbol" }, s("circle", { cx: x + 3, cy: y + 4, r, class: "e-sombra" }), s("circle", { cx: x, cy: y, r, class: "e-copa" }), s("circle", { cx: x - r * .3, cy: y - r * .3, r: r * .45, class: "e-copa-luz" }));
  const casa = (x, y, w, h) => s("g", {}, s("rect", { x: x + 3, y: y + 4, width: w, height: h, rx: 4, class: "e-sombra" }), s("rect", { x, y, width: w, height: h, rx: 4, class: "e-tejado" }), s("line", { x1: x + 4, y1: y + h / 2, x2: x + w - 4, y2: y + h / 2, class: "e-cumbrera" }));

  // Vehículo visto desde arriba, con el frente hacia y negativa. La letra va en una placa que no gira.
  function vehiculo(letra) {
    const [c, oscuro, claro] = COLOR[letra] || ["#6b7690", "#4f5970", "#a4afc6"];
    const cuerpo = s("g", { class: "e-cuerpo" },
      s("rect", { x: -11.5, y: -19, width: 25, height: 42, rx: 8, class: "e-sombra-coche" }),
      s("rect", { x: -13.5, y: -10, width: 3, height: 5, rx: 1.5, fill: oscuro }), s("rect", { x: 10.5, y: -10, width: 3, height: 5, rx: 1.5, fill: oscuro }),
      s("rect", { x: -11, y: -21, width: 22, height: 42, rx: 7.5, fill: c, stroke: oscuro, "stroke-width": 1.2 }),
      s("path", { d: "M-8,-19.5 Q0,-21.5 8,-19.5 L8,-14 Q0,-15 -8,-14 Z", fill: claro, opacity: .55 }),
      s("path", { d: "M-8.5,-11 Q0,-13.5 8.5,-11 L7,-4.5 Q0,-5.5 -7,-4.5 Z", class: "e-cristal" }),
      s("rect", { x: -7, y: -4, width: 14, height: 13, rx: 3, fill: claro, opacity: .35 }),
      s("path", { d: "M-7,10 Q0,11 7,10 L8,15 Q0,16.5 -8,15 Z", class: "e-cristal" }),
      s("rect", { x: -9, y: -21.2, width: 4.5, height: 2.4, rx: 1.2, class: "e-faro" }), s("rect", { x: 4.5, y: -21.2, width: 4.5, height: 2.4, rx: 1.2, class: "e-faro" }),
      s("rect", { x: -9, y: 19, width: 5, height: 2.2, rx: 1.1, class: "e-piloto" }), s("rect", { x: 4, y: 19, width: 5, height: 2.2, rx: 1.1, class: "e-piloto" }),
      s("rect", { x: -9.5, y: 18.6, width: 6, height: 3, rx: 1.5, class: "e-freno" }), s("rect", { x: 3.5, y: 18.6, width: 6, height: 3, rx: 1.5, class: "e-freno" }),
      s("circle", { cx: -10, cy: -18.5, r: 2.2, class: "e-intermitente izq" }), s("circle", { cx: -10, cy: 18.5, r: 2.2, class: "e-intermitente izq" }),
      s("circle", { cx: 10, cy: -18.5, r: 2.2, class: "e-intermitente der" }), s("circle", { cx: 10, cy: 18.5, r: 2.2, class: "e-intermitente der" }));
    const halo = s("ellipse", { rx: 21, ry: 21, class: "e-halo" });
    const placa = s("g", { class: "e-placa" }, s("circle", { r: 9.5, fill: "#fff", stroke: oscuro, "stroke-width": 2 }), s("text", { y: 4.6, "text-anchor": "middle", "font-size": 13, "font-weight": 900, fill: oscuro }, letra));
    const etiqueta = s("g", { class: "e-etiqueta", opacity: 0 }, s("rect", { x: -30, y: -12, width: 60, height: 22, rx: 11 }), s("text", { y: 4, "text-anchor": "middle", "font-size": 11.5, "font-weight": 900 }));
    const g = s("g", { class: "e-vehiculo", "data-letra": letra }, halo, cuerpo, placa, etiqueta);
    g._cuerpo = cuerpo; g._etiqueta = etiqueta;
    return g;
  }
  function colocar(g, p) {
    g.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
    g._cuerpo.setAttribute("transform", `rotate(${p.ang.toFixed(1)})`);
    // La etiqueta se coloca detrás del vehículo (hacia donde viene), para no tapar el cruce.
    const a = (p.ang - 90) * Math.PI / 180;
    g._etiqueta.setAttribute("transform", `translate(${(-Math.cos(a) * 40).toFixed(1)} ${(-Math.sin(a) * 40).toFixed(1)})`);
  }
  function etiquetar(g, texto) {
    const e = g._etiqueta;
    if (!texto) { e.setAttribute("opacity", 0); return; }
    e.querySelector("text").textContent = texto;
    e.setAttribute("class", "e-etiqueta " + ({ Pasa: "pasa", Preferente: "pasa", Espera: "espera", Cede: "espera", STOP: "stop" }[texto] || ""));
    e.setAttribute("opacity", 1);
  }

  // ---------- Escenario del cruce ----------
  function fondoCruce(svg, esc) {
    const id = svg._id, vias = esc.vias || {};
    const g = s("g", { class: "e-fondo" });
    g.append(s("rect", { width: 400, height: 400, fill: `url(#${id}-cesped)` }));
    // Aceras con esquinas redondeadas y algo de entorno (árboles y tejados) en las cuatro esquinas.
    const esquinas = [[0, 0], [250, 0], [0, 250], [250, 250]];
    if (esc.entorno !== "campo") esquinas.forEach(([x, y]) => g.append(s("rect", { x: x - 10, y: y - 10, width: 170, height: 170, rx: 0, class: "e-acera" })));
    g.append(s("rect", { x: 150, y: 0, width: 100, height: 400, class: esc.entorno === "campo" ? "e-arcen" : "e-acera" }), s("rect", { x: 0, y: 150, width: 400, height: 100, class: esc.entorno === "campo" ? "e-arcen" : "e-acera" }));
    esquinas.forEach(([x, y]) => g.append(s("rect", { x: x === 0 ? -20 : 250, y: y === 0 ? -20 : 250, width: 170, height: 170, rx: 18, fill: `url(#${id}-cesped)` })));
    // Calzadas: asfalto, o tierra en el brazo sin pavimentar.
    const tramo = { N: [160, 0, 80, 160], S: [160, 240, 80, 160], E: [240, 160, 160, 80], O: [0, 160, 160, 80] };
    g.append(s("rect", { x: 160, y: 160, width: 80, height: 80, class: "e-asfalto" }));
    for (const b of ["N", "S", "E", "O"]) {
      if ((vias[b] || {}).cerrada) continue;
      const [x, y, w, h] = tramo[b], tierra = (vias[b] || {}).firme === "tierra";
      g.append(s("rect", { x, y, width: w, height: h, fill: tierra ? `url(#${id}-tierra)` : null, class: tierra ? "" : "e-asfalto" }));
      if (!tierra) {
        // Eje discontinuo y bordes.
        const eje = { N: [200, 0, 200, 150], S: [200, 250, 200, 400], E: [250, 200, 400, 200], O: [0, 200, 150, 200] }[b];
        g.append(s("line", { x1: eje[0], y1: eje[1], x2: eje[2], y2: eje[3], class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }));
      }
    }
    // Entorno.
    if (esc.entorno !== "campo") {
      g.append(casa(40, 30, 64, 46), casa(300, 300, 58, 52), arbol(122, 120, 13), arbol(282, 120, 11), arbol(118, 286, 12), arbol(330, 70, 15), arbol(60, 330, 15));
    } else g.append(arbol(70, 80, 16), arbol(320, 320, 18), arbol(330, 90, 13), arbol(90, 320, 12));
    // Señales: línea de detención (STOP, continua) o de ceda el paso (discontinua), y la señal vertical.
    for (const b in vias) {
      const via = vias[b]; if (!via.senal) continue;
      const a = enBrazo(b, 66, 1), z = enBrazo(b, 66, 39);
      g.append(s("line", { x1: a[0], y1: a[1], x2: z[0], y2: z[1], class: "e-marca", "stroke-width": via.senal === "stop" ? 6 : 5, "stroke-dasharray": via.senal === "ceda" ? "7 5" : null }));
      const p = enBrazo(b, 78, 56);
      g.append(s("line", { x1: p[0] + 2, y1: p[1] + 2, x2: p[0] + 2, y2: p[1] + 20, class: "e-poste" }));
      g.append(via.senal === "stop" ? senalStop(p[0], p[1]) : senalCeda(p[0], p[1]));
    }
    if (esc.centro) g.append(s("g", { class: "e-centro" }, s("circle", { cx: 200, cy: 200, r: 5 }), s("text", { x: 200, y: 222, "text-anchor": "middle", "font-size": 11, "font-weight": 900 }, "centro")));
    svg.append(g);
  }
  function senalStop(x, y) {
    const p = []; for (let i = 0; i < 8; i++) { const a = (22.5 + 45 * i) * Math.PI / 180; p.push((x + 13 * Math.cos(a)).toFixed(1) + "," + (y + 13 * Math.sin(a)).toFixed(1)); }
    return s("g", { class: "e-senal" }, s("polygon", { points: p.join(" "), fill: "#c8102e", stroke: "#fff", "stroke-width": 1.8 }), s("text", { x, y: y + 3.4, "text-anchor": "middle", "font-size": 8.5, "font-weight": 900, fill: "#fff" }, "STOP"));
  }
  function senalCeda(x, y) {
    return s("g", { class: "e-senal" }, s("polygon", { points: `${x - 14},${y - 10} ${x + 14},${y - 10} ${x},${y + 14}`, fill: "#fff", stroke: "#c8102e", "stroke-width": 4, "stroke-linejoin": "round" }));
  }

  // ---------- Escenario de la glorieta ----------
  const G = { c: 200, ext: 122, isla: 56, carril: 90 };
  function fondoGlorieta(svg) {
    const id = svg._id, g = s("g", { class: "e-fondo" });
    g.append(s("rect", { width: 400, height: 400, fill: `url(#${id}-cesped)` }),
      s("rect", { x: 150, y: 0, width: 100, height: 400, class: "e-acera" }), s("rect", { x: 0, y: 150, width: 400, height: 100, class: "e-acera" }),
      s("circle", { cx: 200, cy: 200, r: G.ext + 10, class: "e-acera" }));
    for (const [x, y] of [[-20, -20], [250, -20], [-20, 250], [250, 250]]) g.append(s("rect", { x, y, width: 170, height: 170, rx: 18, fill: `url(#${id}-cesped)` }));
    g.append(s("circle", { cx: 200, cy: 200, r: G.ext + 10, class: "e-acera" }),
      s("rect", { x: 160, y: 0, width: 80, height: 400, class: "e-asfalto" }), s("rect", { x: 0, y: 160, width: 400, height: 80, class: "e-asfalto" }),
      s("circle", { cx: 200, cy: 200, r: G.ext, class: "e-asfalto" }));
    for (const d of ["M200,0 L200,72", "M200,328 L200,400", "M0,200 L72,200", "M328,200 L400,200"]) g.append(s("path", { d, class: "e-marca", "stroke-width": 3, "stroke-dasharray": "16 12" }));
    g.append(s("circle", { cx: 200, cy: 200, r: G.isla + 6, class: "e-bordillo" }), s("circle", { cx: 200, cy: 200, r: G.isla, fill: `url(#${id}-cesped)` }),
      arbol(200, 200, 22), arbol(80, 80, 15), arbol(320, 320, 16), arbol(318, 78, 12), arbol(84, 318, 13));
    svg.append(g);
  }
  const rad = a => a * Math.PI / 180, enAnillo = a => [G.c + G.carril * Math.cos(rad(a)), G.c + G.carril * Math.sin(rad(a))];
  // Ángulos con el eje y hacia abajo: dejar el centro a la izquierda es recorrer el anillo con el ángulo decreciendo.
  const ANG_ENTRADA = { S: 62, E: -28, N: -118, O: 152 }, ANG_SALIDA = { N: -62, O: -152, S: 118, E: 28 };
  function trayectoGlorieta(v) {
    if (v.dentro != null) { // ya circula por el anillo desde el ángulo v.dentro
      const c2 = camino(...enAnillo(v.dentro)).marca("lejos").marca("espera");
      return salirAnillo(c2, v.dentro, v.hacia).fin();
    }
    const c = camino(...enBrazo(v.desde, 230, 20)).marca("lejos").a(enBrazo(v.desde, 160, 20)).a(enBrazo(v.desde, 138, 20)).marca("espera");
    const a0 = ANG_ENTRADA[v.desde];
    c.curva(enBrazo(v.desde, 108, 20), enAnillo(a0)).marca("dentro");
    return salirAnillo(c, a0, v.hacia).fin();
  }
  function salirAnillo(c, a0, hacia) {
    let a1 = ANG_SALIDA[hacia]; while (a1 > a0) a1 -= 360;
    return c.arco(G.c, G.c, G.carril, a0, a1).marca("salida").curva(enBrazo(hacia, 108, -20), enBrazo(hacia, 140, -20)).a(enBrazo(hacia, 260, -20));
  }

  // ===================================================================
  // Movimiento
  // ===================================================================
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const fx = t => ((ax * t + bx) * t + cx) * t, fy = t => ((ay * t + by) * t + cy) * t, dx = t => (3 * ax * t + 2 * bx) * t + cx;
    return x => { let t = x; for (let i = 0; i < 6; i++) { const e = fx(t) - x, d = dx(t); if (Math.abs(e) < 1e-4 || !d) break; t -= e / d; } return fy(Math.max(0, Math.min(1, t))); };
  }
  // «valle»: avanza, reduce mucho la velocidad sin llegar a pararse cerca de u = .3 y vuelve a acelerar.
  function valle(centro, hondo, ancho) {
    const N = 200, tabla = [0];
    for (let i = 1; i <= N; i++) { const u = i / N, v = 1 - hondo * Math.exp(-Math.pow((u - centro) / ancho, 2)); tabla.push(tabla[i - 1] + v); }
    const tot = tabla[N];
    return t => { const x = Math.max(0, Math.min(1, t)) * N, i = Math.floor(x), r = x - i; return (tabla[i] + (i < N ? (tabla[i + 1] - tabla[i]) * r : 0)) / tot; };
  }
  const CURVA = { arranca: bezier(.55, 0, .9, .6), frena: bezier(.15, .55, .35, 1), suave: bezier(.42, 0, .25, 1), sigue: t => t, valle: valle(.3, .85, .12) };
  function animar(ms, cada, ficha) {
    if (MOV.matches || ms <= 0) { cada(1); return Promise.resolve(true); }
    return new Promise(ok => {
      const t0 = performance.now();
      const marco = ahora => {
        if (ficha.cancelada) return ok(false);
        const t = Math.min(1, (ahora - t0) / ms);
        cada(t);
        if (t < 1) requestAnimationFrame(marco); else ok(true);
      };
      requestAnimationFrame(marco);
    });
  }

  // ===================================================================
  // Escena: monta el dibujo y los pasos a partir de los datos
  // ===================================================================
  function crear(esc, op = {}) {
    const svg = lienzo(op.titulo || esc.titulo);
    if (esc.tipo === "glorieta") fondoGlorieta(svg); else fondoCruce(svg, esc);
    const capaRastro = s("g", { class: "e-rastros" }), capaV = s("g");
    svg.append(capaRastro, capaV);
    const veh = {}, tray = {}, pos = {};
    for (const v of esc.vehiculos) {
      tray[v.letra] = esc.tipo === "glorieta" ? trayectoGlorieta(v) : trayectoCruce(v);
      const g = vehiculo(v.letra); veh[v.letra] = g; capaV.append(g);
      const giro = esc.tipo === "glorieta" ? "derecha" : giroDe(v.desde, v.hacia);
      g._giro = v.intermitente || (giro === "recto" ? null : giro);
    }
    const fr = (l, m) => typeof m === "number" ? m : tray[l].fr[m] != null ? tray[l].fr[m] : 0;
    function situar(l, f) {
      pos[l] = f; const g = veh[l];
      colocar(g, tray[l].en(f));
      g.style.opacity = f >= .995 ? 0 : 1;
    }
    // Estado inicial: cada vehículo en su marca de inicio (por defecto, parado en la línea).
    const inicial = {}; esc.vehiculos.forEach(v => inicial[v.letra] = fr(v.letra, v.inicio || "espera"));
    const pasos = (esc.pasos && esc.pasos.length ? esc.pasos : pasosCruce(esc)).map(p => Object.assign({}, p, { mover: (p.mover || []).map(m => Object.assign({}, m, { hasta: fr(m.v, m.hasta) })) }));
    const estados = [Object.assign({}, inicial)];
    pasos.forEach((p, i) => { const e = Object.assign({}, estados[i]); p.mover.forEach(m => e[m.v] = m.hasta); estados.push(e); });

    function luces(intermitente, frenos) {
      for (const l in veh) {
        const g = veh[l];
        g.classList.toggle("int-izq", intermitente && g._giro === "izquierda" && pos[l] < .97);
        g.classList.toggle("int-der", intermitente && g._giro === "derecha" && pos[l] < .97);
        g.classList.toggle("frenando", !!(frenos && frenos.includes(l)));
      }
    }
    function resaltar(p) {
      for (const l in veh) { veh[l].classList.toggle("foco", !!(p && p.foco && p.foco.includes(l))); etiquetar(veh[l], p && p.etiquetas ? p.etiquetas[l] : null); }
    }
    function pintarEstado(i) { const e = estados[i]; for (const l in e) situar(l, e[l]); }
    let ficha = { cancelada: true };
    const escena = {
      svg, pasos,
      quieto() { ficha.cancelada = true; pintarEstado(0); resaltar(null); luces(true, null); svg.classList.add("quieta"); },
      fotograma(i) { ficha.cancelada = true; pintarEstado(i); resaltar(i > 0 ? pasos[i - 1] : null); luces(true, null); },
      parar() { ficha.cancelada = true; },
      // Reproduce el paso i desde su estado inicial. alAvanzar(t) recibe el progreso (0-1).
      async paso(i, alAvanzar) {
        ficha.cancelada = true;
        const f = ficha = { cancelada: false };
        svg.classList.remove("quieta");
        pintarEstado(i);
        const p = pasos[i], desde = estados[i];
        resaltar(p);
        const ms = MOV.matches ? 0 : (p.ms || 2200);
        // Cada movimiento puede empezar con retraso y durar parte del paso.
        const movs = p.mover.map(m => ({ l: m.v, a: desde[m.v], b: m.hasta, curva: CURVA[m.modo || (m.hasta >= .99 ? "arranca" : "frena")] || CURVA.suave,
          t0: (m.retraso || 0) / (p.ms || 2200), t1: m.dura ? ((m.retraso || 0) + m.dura) / (p.ms || 2200) : 1, frena: m.modo === "valle" ? (u => u > .1 && u < .3) : m.modo === "frena" || (m.modo == null && m.hasta < .99) ? (u => u > .35) : null }));
        const frenos = (p.frenos || []).slice();
        luces(true, frenos);
        const ok = await animar(ms, t => {
          const fren = frenos.slice();
          for (const m of movs) {
            const u = Math.max(0, Math.min(1, (t - m.t0) / Math.max(.01, m.t1 - m.t0)));
            situar(m.l, m.a + (m.b - m.a) * m.curva(u));
            if (m.frena && m.frena(u)) fren.push(m.l);
          }
          luces(true, fren);
          if (alAvanzar) alAvanzar(t);
        }, f);
        if (ok) { pintarEstado(i + 1); luces(true, p.mover.filter(m => m.hasta < .99 && m.modo !== "valle").map(m => m.v).concat(frenos)); if (alAvanzar) alAvanzar(1); }
        return ok;
      }
    };
    escena.quieto();
    return escena;
  }

  // ===================================================================
  // Interfaz: reproductor de pasos
  // ===================================================================
  const ICO = {
    play: "M8 5.5v13l10.5-6.5z", pausa: "M7.5 5.5h3.2v13H7.5zM13.3 5.5h3.2v13h-3.2z",
    atras: "M15 5l-7 7 7 7", alante: "M9 5l7 7-7 7", repetir: "M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4"
  };
  function icono(n, relleno) {
    const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("aria-hidden", "true"); svg.setAttribute("class", "esc-ico" + (relleno ? " lleno" : ""));
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", ICO[n]); svg.append(p); return svg;
  }
  function el(tag, at, ...hijos) {
    const e = document.createElement(tag);
    for (const k in at || {}) { const v = at[k]; if (v == null || v === false) continue; if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? "" : v); }
    for (const c of hijos.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  const BOE = { RGC: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", LSV: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722" };
  const enlaceCita = c => el("a", { class: "esc-ref", href: c.url || (BOE[c.norma] ? `${BOE[c.norma]}#a${String(c.articulo).split(".")[0]}` : "#"), target: "_blank", rel: "noopener" }, `${c.norma}, art. ${c.articulo}`);

  // op: { autoplay, citaYa: artículo ya citado arriba (no se repite el texto) }
  function reproductor(esc, op = {}) {
    const escena = crear(esc);
    const n = escena.pasos.length;
    let i = 0, jugando = false, sesion = 0;
    const barras = el("div", { class: "esc-barras", "aria-hidden": "true" }, escena.pasos.map(() => el("i", {}, el("b"))));
    const texto = el("p", { class: "esc-texto", "aria-live": "polite" });
    const cita = el("div", { class: "esc-cita" });
    const contador = el("span", { class: "esc-contador" });
    const bAnt = el("button", { class: "esc-btn", "aria-label": "Paso anterior", onclick: () => ir(i - 1) }, icono("atras"));
    const bPlay = el("button", { class: "esc-btn principal", onclick: () => jugando ? pausar() : (i >= n - 1 && hecho ? (i = 0, todo()) : todo(i)) });
    const bSig = el("button", { class: "esc-btn", "aria-label": "Paso siguiente", onclick: () => ir(i + 1) }, icono("alante"));
    let hecho = false;
    const marco = el("figure", { class: "esc-marco" }, escena.svg);
    const raizUI = el("section", { class: "esc-reproductor", "aria-label": "Explicación animada" },
      el("div", { class: "esc-cab" }, el("span", { class: "esc-titulo" }, "Míralo paso a paso"), contador),
      marco, barras,
      el("div", { class: "esc-pie" }, texto, cita),
      el("div", { class: "esc-controles" }, bAnt, bPlay, bSig),
      MOV.matches ? el("p", { class: "esc-aviso" }, "Tienes activado «reducir movimiento»: los pasos cambian sin animación.") : null);
    function pintarBarras(prog) {
      [...barras.children].forEach((b, k) => { b.firstChild.style.transform = `scaleX(${k < i ? 1 : k > i ? 0 : prog})`; b.classList.toggle("ahora", k === i); });
    }
    function pintarTexto(animado) {
      const p = escena.pasos[i];
      contador.textContent = `${i + 1} de ${n}`;
      const poner = () => {
        texto.textContent = p.texto;
        cita.replaceChildren(op.citaYa === p.cita.articulo && p.cita.norma === "RGC"
          ? el("p", { class: "esc-cita-corta" }, enlaceCita(p.cita))
          : el("blockquote", { class: "esc-cita-larga" }, `«${p.cita.texto}» `, enlaceCita(p.cita)));
      };
      if (animado && !MOV.matches) { raizUI.classList.add("cambiando"); setTimeout(() => { poner(); raizUI.classList.remove("cambiando"); }, 140); } else poner();
      bAnt.disabled = i === 0; bSig.disabled = i >= n - 1;
    }
    function botonPlay() {
      bPlay.replaceChildren(icono(jugando ? "pausa" : (hecho && i >= n - 1 ? "repetir" : "play"), !(hecho && i >= n - 1) || jugando), el("span", {}, jugando ? "Pausa" : hecho && i >= n - 1 ? "Repetir" : "Reproducir"));
      bPlay.setAttribute("aria-label", jugando ? "Pausar" : hecho && i >= n - 1 ? "Repetir desde el principio" : "Reproducir");
    }
    async function ir(k) {
      if (k < 0 || k >= n) return;
      const mia = ++sesion; jugando = false; i = k; pintarTexto(true); botonPlay(); pintarBarras(0);
      const ok = await escena.paso(i, t => mia === sesion && pintarBarras(t));
      if (ok && mia === sesion && i === n - 1) { hecho = true; botonPlay(); }
    }
    async function todo(desde = 0) {
      const mia = ++sesion; jugando = true; botonPlay();
      for (let k = desde; k < n; k++) {
        i = k; pintarTexto(k !== desde || desde > 0); pintarBarras(0);
        const ok = await escena.paso(k, t => mia === sesion && pintarBarras(t));
        if (!ok || mia !== sesion || !raizUI.isConnected) return;
        if (k < n - 1) await new Promise(r => setTimeout(r, MOV.matches ? 0 : 650));
        if (mia !== sesion) return;
      }
      jugando = false; hecho = true; botonPlay();
    }
    function pausar() { sesion++; escena.parar(); jugando = false; botonPlay(); }
    pintarTexto(false); botonPlay(); pintarBarras(0); escena.fotograma(0);
    // Reproduce solo cuando el bloque se ve en pantalla (la explicación puede quedar debajo).
    if (op.autoplay) {
      if ("IntersectionObserver" in raiz) {
        const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); setTimeout(() => raizUI.isConnected && !jugando && !hecho && todo(0), 250); } }, { threshold: .55 });
        io.observe(marco);
      } else todo(0);
    }
    return raizUI;
  }

  // ===================================================================
  // Enganches con la web (app.js)
  // ===================================================================
  const datos = () => raiz.ESCENAS || {};
  // Imagen de la pregunta: fotograma quieto si la escena sustituye a la imagen.
  function figura(p) {
    const e = datos()[p.id];
    if (!e || e.antes !== "escena") return null;
    try { return el("figure", { class: "figura esc-figura", "data-escena": p.id }, crear(e, { titulo: e.titulo }).svg); }
    catch (err) { console.error("Escena", p.id, err); return null; } // si algo falla, se ve la imagen de siempre
  }
  // Al final del cuerpo de la explicación, tras las citas del BOE.
  function enExplicacion(nodo, p, elegida, animada) {
    const e = datos()[p.id];
    if (!e || !nodo) return;
    const cuerpo = nodo.querySelector(".explicacion-cuerpo") || nodo;
    try { cuerpo.append(reproductor(e, { autoplay: animada && elegida !== p.correcta, citaYa: p.fuente && p.fuente.norma === "RGC" ? p.fuente.articulo : null })); }
    catch (err) { console.error("Escena", p.id, err); }
  }
  // #/escenas: practica solo las preguntas que tienen escena (para probarlas).
  function registrar() {
    const A = raiz.App; if (!A || !A.ruta) return;
    A.ruta("escenas", () => {
      const ids = Object.keys(datos()).filter(id => A.POR_ID.has(id));
      if (!ids.length) return false;
      A.practicar(ids.map(id => A.POR_ID.get(id)), "temario", "Escenas animadas", "#/");
    });
  }
  Object.assign(api, { crear, reproductor, figura, enExplicacion, reduceMovimiento: () => MOV.matches });
  raiz.Escenas = api;
  registrar();
})(typeof window !== "undefined" ? window : globalThis);
