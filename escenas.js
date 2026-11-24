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
      cubica(c1, c2, p, n = 24) {
        const [x0, y0] = pts[pts.length - 1];
        for (let i = 1; i <= n; i++) { const t = i / n, u = 1 - t; pts.push([u * u * u * x0 + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p[0], u * u * u * y0 + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p[1]]); }
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
        // Fracción del recorrido en la que el trayecto (que avanza hacia x crecientes) pasa por x = X.
        const fracX = X => {
          for (let i = 1; i < pts.length; i++) if (pts[i][0] >= X) { const t = (X - pts[i - 1][0]) / ((pts[i][0] - pts[i - 1][0]) || 1); return (acum[i - 1] + (acum[i] - acum[i - 1]) * t) / L; }
          return 1;
        };
        return { en, fr, L, fracX };
      }
    };
    return api;
  }

  function trayectoCruce(v) {
    const g = giroDe(v.desde, v.hacia);
    // Antes de girar se ciñe: a la izquierda, junto al eje; a la derecha, al borde derecho (RGC 75.1.b).
    if (v.puntos) return trayectoLibre(v.puntos);
    const lat = v.lat != null ? v.lat : g === "izquierda" ? 11 : g === "derecha" ? 26 : 20;
    // El cambio de posición lateral se ve en pantalla (entre d = 196 y d = 150).
    const c = camino(...enBrazo(v.desde, 330, v.lat != null ? v.lat : 20)).a(enBrazo(v.desde, 230, v.lat != null ? v.lat : 20)).marca("lejos").a(enBrazo(v.desde, 196, v.lat != null ? v.lat : 20))
      .a(enBrazo(v.desde, 150, lat)).marca("cerca").a(enBrazo(v.desde, 90, lat)).marca("espera").a(enBrazo(v.desde, 63, lat)).marca("borde");
    if (g === "recto") return c.a(enBrazo(v.desde, 40, lat)).marca("dentro").a(enBrazo(v.desde, 0, lat)).marca("medio").a(enBrazo(v.hacia, 380, -lat)).fin();
    if (g === "derecha") {
      const ctrl = interseccion(v.desde, 26, v.hacia, -26);
      return c.a(enBrazo(v.desde, 52, lat)).marca("dentro").curva(ctrl, enBrazo(v.hacia, 52, -26)).a(enBrazo(v.hacia, 380, -20)).fin();
    }
    // Izquierda: avanza hasta el centro y gira dejándolo a su izquierda (RGC 75.1.c).
    const ctrl = interseccion(v.desde, 11, v.hacia, -14);
    return c.a(enBrazo(v.desde, 6, lat)).marca("dentro").curva(ctrl, enBrazo(v.hacia, 44, -16), 26).a(enBrazo(v.hacia, 380, -20)).fin();
  }
  // Trayecto a medida (peatones, ciclistas): lista de puntos; las marcas se nombran con {marca: "nombre"}.
  function trayectoLibre(puntos) {
    const [p0, ...resto] = puntos.filter(p => Array.isArray(p));
    const c = camino(p0[0], p0[1]);
    for (const p of puntos.slice(1)) { if (Array.isArray(p)) c.a(p); else if (p.marca) c.marca(p.marca); }
    return c.fin();
  }
  // Estrechamiento o puente de un solo carril entre x = 145 y x = 255, en una vía horizontal.
  // Se calcula para quien entra por el oeste (hacia el este); el que entra por el este es el mismo
  // trayecto girado 180 grados. Las marcas sitúan el frontal: «antes» (fuera del tramo estrecho),
  // «dentro» (acaba de entrar) y «encuentro» (frente a frente con el otro, en x = esc.encuentro).
  function trayectoEstrecho(v, esc) {
    const mitad = (v.largo || MEDIDAS[v.tipo || "turismo"].L) / 2;
    const espejo = v.desde === "E", X = esc.encuentro != null ? esc.encuentro : 200, obras = esc.entorno === "obras";
    // En obras se pasa por el carril que queda libre (y = 214 en el dibujo); si no, por el centro del tramo estrecho.
    const yc = obras ? (espejo ? 186 : 214) : 200, ent = obras ? 136 : 145, sal = obras ? 264 : 255;
    const t = camino(-360, 220).a([ent - 69, 220]).cubica([ent - 33, 220], [ent - 36, yc], [ent, yc]).a([sal, yc]).cubica([sal + 36, yc], [sal + 33, 220], [sal + 69, 220]).a([760, 220]).fin();
    const antes = obras ? 126 : 96;
    const xs = { lejos: -16 - mitad, cola: antes - 54 - mitad, cerca: 84 - mitad, antes: antes - mitad, dentro: 166 - mitad, encuentro: (espejo ? 400 - X : X) - 7 - mitad };
    const fr = Object.assign({}, t.fr); for (const k in xs) fr[k] = t.fracX(xs[k]);
    const en = espejo ? f => { const p = t.en(f); return { x: 400 - p.x, y: 400 - p.y, ang: p.ang + 180 }; } : t.en;
    return { en, fr, L: t.L };
  }
  // Medidas de cada tipo (ancho, largo) en px; un turismo de 22 x 42 equivale a unos 1,8 x 4,4 m.
  const MEDIDAS = {
    turismo: { w: 22, L: 42 }, autocaravana: { w: 24, L: 56 }, camion: { w: 26, L: 66 }, autobus: { w: 26, L: 74 },
    moto: { w: 10, L: 24 }, bici: { w: 8, L: 20 }, peaton: { w: 13, L: 8 }, carro: { w: 20, L: 52 },
    "turismo+remolque": { w: 22, L: 42, rem: { w: 20, L: 24, sep: 6 } }, "camion+remolque": { w: 26, L: 62, rem: { w: 26, L: 42, sep: 6 } },
    tranvia: { w: 26, L: 130 }, tren: { w: 28, L: 74 }, oveja: { w: 10, L: 14 }, vaca: { w: 14, L: 28 }, nino: { w: 10, L: 6 }
  };
  // Vía recta horizontal: trayecto por un carril (y) de oeste a este (desde O) o al revés (desde E),
  // o a medida con «puntos». Las marcas de «marcas» dan la x del frontal: {parada: 180}.
  function trayectoRecta(v) {
    if (v.puntos) return trayectoLibre(v.puntos);
    const L = v.largo || (MEDIDAS[v.tipo || "turismo"] || MEDIDAS.turismo).L, haciaE = v.desde !== "E";
    const y = v.y != null ? v.y : haciaE ? 220 : 180, x0 = haciaE ? -320 : 720, x1 = haciaE ? 720 : -320, total = Math.abs(x1 - x0);
    const t = camino(x0, y).a([x1, y]).fin();
    const fr = Object.assign({}, t.fr), centro = xf => haciaE ? xf - L / 2 : xf + L / 2;
    const marcas = Object.assign({ lejos: haciaE ? -16 : 416 }, v.marcas || {});
    for (const k in marcas) fr[k] = Math.abs(centro(marcas[k]) - x0) / total;
    return { en: t.en, fr, L: t.L };
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

  // Orden del RGC 62.1 (de más a menos preferencia) para los tipos que se dibujan.
  const RANGO62 = { "camion+remolque": "b", carro: "c", "turismo+remolque": "d", autocaravana: "d", autobus: "e", camion: "f", turismo: "g", moto: "j", bici: "j" };
  const api = { ordenCruce, pasosCruce, giroDe, CITAS, MEDIDAS, RANGO62 };
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
  function lienzo(titulo, vista) {
    const id = "esc" + (++nId);
    const svg = s("svg", { viewBox: vista || "0 0 400 400", role: "img", "aria-label": titulo || "Escena de tráfico", class: "esc-svg" });
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
  // Tipos: turismo, autocaravana, camion, autobus, moto, bici, peaton, carro y los conjuntos con remolque.
  const GRIS = ["#6b7690", "#4f5970", "#a4afc6"];
  function luces(w, L, conFreno = true) {
    const x = w / 2, y = L / 2, k = [];
    k.push(s("rect", { x: -x + 2, y: -y - .2, width: w * .2, height: 2.4, rx: 1.2, class: "e-faro" }), s("rect", { x: x - 2 - w * .2, y: -y - .2, width: w * .2, height: 2.4, rx: 1.2, class: "e-faro" }));
    if (conFreno) k.push(
      s("rect", { x: -x + 2, y: y - 2.2, width: w * .22, height: 2.2, rx: 1.1, class: "e-piloto" }), s("rect", { x: x - 2 - w * .22, y: y - 2.2, width: w * .22, height: 2.2, rx: 1.1, class: "e-piloto" }),
      s("rect", { x: -x + 1.5, y: y - 2.6, width: w * .26, height: 3, rx: 1.5, class: "e-freno" }), s("rect", { x: x - 1.5 - w * .26, y: y - 2.6, width: w * .26, height: 3, rx: 1.5, class: "e-freno" }),
      s("rect", { x: -w * .14, y: y - 2.4, width: w * .28, height: 2.6, rx: 1.3, class: "e-atras" }));
    k.push(s("circle", { cx: -x + 1, cy: -y + 2.5, r: 2.2, class: "e-intermitente izq" }), s("circle", { cx: x - 1, cy: -y + 2.5, r: 2.2, class: "e-intermitente der" }));
    if (conFreno) k.push(s("circle", { cx: -x + 1, cy: y - 2.5, r: 2.2, class: "e-intermitente izq" }), s("circle", { cx: x - 1, cy: y - 2.5, r: 2.2, class: "e-intermitente der" }));
    return k;
  }
  function carroceria(tipo, w, L, [c, oscuro, claro]) {
    const x = w / 2, y = L / 2, sombra = s("rect", { x: -x + .5, y: -y + 2, width: w + 3, height: L, rx: Math.min(8, w / 3), class: "e-sombra-coche" });
    const caja = (yy, hh, r, fill, extra) => s("rect", Object.assign({ x: -x, y: yy, width: w, height: hh, rx: r, fill, stroke: oscuro, "stroke-width": 1.2 }, extra || {}));
    switch (tipo) {
      case "camion": case "camion+remolque": {
        const cab = 18;
        return [sombra, caja(-y + cab + 2, L - cab - 2, 2.5, "#eef1f5"), s("line", { x1: -x + 4, y1: -y + cab + 8, x2: x - 4, y2: -y + cab + 8, stroke: "#c9ced8", "stroke-width": 1.4 }),
          s("line", { x1: -x + 4, y1: y - 8, x2: x - 4, y2: y - 8, stroke: "#c9ced8", "stroke-width": 1.4 }),
          caja(-y, cab, 5, c), s("path", { d: `M${-x + 3},${-y + 3} Q0,${-y + 1} ${x - 3},${-y + 3} L${x - 4},${-y + 8} Q0,${-y + 7} ${-x + 4},${-y + 8} Z`, class: "e-cristal" }),
          s("rect", { x: -x + 3, y: -y + 10, width: w - 6, height: 6, rx: 2, fill: claro, opacity: .45 }), ...luces(w, L)];
      }
      case "autobus":
        return [sombra, caja(-y, L, 5, c), s("path", { d: `M${-x + 2.5},${-y + 3} Q0,${-y + 1} ${x - 2.5},${-y + 3} L${x - 3},${-y + 9} Q0,${-y + 8} ${-x + 3},${-y + 9} Z`, class: "e-cristal" }),
          s("rect", { x: -x + 4, y: -y + 14, width: w - 8, height: L - 22, rx: 3, fill: claro, opacity: .4 }),
          s("rect", { x: -6, y: -y + 20, width: 12, height: 10, rx: 2, fill: oscuro, opacity: .35 }), s("rect", { x: -6, y: y - 24, width: 12, height: 10, rx: 2, fill: oscuro, opacity: .35 }), ...luces(w, L)];
      case "autocaravana":
        return [sombra, caja(-y, L, 7, "#f3efe6"), s("path", { d: `M${-x + 2},${-y + 6} Q0,${-y + 1} ${x - 2},${-y + 6} L${x - 2},${-y + 15} L${-x + 2},${-y + 15} Z`, fill: c }),
          s("path", { d: `M${-x + 4},${-y + 5} Q0,${-y + 2.5} ${x - 4},${-y + 5} L${x - 5},${-y + 11} Q0,${-y + 10} ${-x + 5},${-y + 11} Z`, class: "e-cristal" }),
          s("rect", { x: -5, y: -4, width: 10, height: 9, rx: 2, fill: "#c9d4e2", stroke: "#9aa6b8" }), s("rect", { x: -x, y: y - 12, width: w, height: 3, fill: c, opacity: .8 }), ...luces(w, L)];
      case "moto":
        return [s("ellipse", { cx: 1.5, cy: 3, rx: 5.5, ry: 12, class: "e-sombra-coche" }), s("rect", { x: -2.2, y: -y, width: 4.4, height: L, rx: 2.2, fill: "#2a2f38" }),
          s("rect", { x: -5, y: -y + 4, width: 10, height: 3, rx: 1.5, fill: "#2a2f38" }), s("ellipse", { cx: 0, cy: 1, rx: 4.6, ry: 7.5, fill: c, stroke: oscuro }),
          s("circle", { cx: 0, cy: -1, r: 4.2, fill: claro, stroke: oscuro, "stroke-width": 1.2 }), s("rect", { x: -1.6, y: -y - .3, width: 3.2, height: 2.2, rx: 1.1, class: "e-faro" }),
          s("rect", { x: -2, y: y - 2.5, width: 4, height: 3, rx: 1.5, class: "e-freno" }), s("rect", { x: -1.5, y: y - 2.2, width: 3, height: 2.4, rx: 1.2, class: "e-atras" })];
      case "bici":
        return [s("g", { transform: "scale(1.25)" },s("ellipse", { cx: 1.5, cy: 3, rx: 4.5, ry: 10, class: "e-sombra-coche" }), s("line", { x1: 0, y1: -y, x2: 0, y2: y, stroke: "#2a2f38", "stroke-width": 2.2, "stroke-linecap": "round" }),
          s("line", { x1: -4.5, y1: -y + 4, x2: 4.5, y2: -y + 4, stroke: "#2a2f38", "stroke-width": 1.8, "stroke-linecap": "round" }),
          s("ellipse", { cx: 0, cy: 1, rx: 5, ry: 4, fill: c, stroke: oscuro }), s("circle", { cx: 0, cy: -1.5, r: 3, fill: claro, stroke: oscuro }))];
      case "tranvia": { // tres módulos articulados
        const k = [s("rect", { x: -x + .5, y: -y + 3, width: w + 3, height: L, rx: 8, class: "e-sombra-coche" })], m = L / 3;
        for (let i = 0; i < 3; i++) k.push(s("rect", { x: -x, y: -y + i * m + (i ? 1.5 : 0), width: w, height: m - (i < 2 ? 1.5 : 0), rx: i === 0 ? 9 : 3, fill: "#e9edf3", stroke: oscuro, "stroke-width": 1.2 }),
          s("rect", { x: -x + 3.5, y: -y + i * m + 6, width: w - 7, height: m - 12, rx: 2, fill: c, opacity: .85 }));
        k.push(s("path", { d: `M${-x + 3},${-y + 4} Q0,${-y + 1} ${x - 3},${-y + 4} L${x - 4},${-y + 9} Q0,${-y + 8} ${-x + 4},${-y + 9} Z`, class: "e-cristal" }), s("line", { x1: 0, y1: -y + 12, x2: 0, y2: y - 6, stroke: "#2a2f38", "stroke-width": 1.4, "stroke-dasharray": "2 6" }), ...luces(w, L));
        return k;
      }
      case "tren":
        return [s("rect", { x: -x + .5, y: -y + 3, width: w + 3, height: L, rx: 5, class: "e-sombra-coche" }), caja(-y, L, 5, c),
          s("rect", { x: -x + 4, y: -y + 8, width: w - 8, height: L - 16, rx: 3, fill: claro, opacity: .45 }), s("rect", { x: -6, y: -y + 14, width: 12, height: 8, rx: 2, fill: oscuro, opacity: .4 }),
          s("rect", { x: -6, y: y - 22, width: 12, height: 8, rx: 2, fill: oscuro, opacity: .4 }), s("rect", { x: -x + 3, y: -y - .3, width: 5, height: 2.4, rx: 1.2, class: "e-faro" }), s("rect", { x: x - 8, y: -y - .3, width: 5, height: 2.4, rx: 1.2, class: "e-faro" })];
      case "oveja":
        return [s("ellipse", { cx: 1.5, cy: 2, rx: 5.5, ry: 7.5, class: "e-sombra-coche" }), s("ellipse", { cx: 0, cy: 1, rx: 5, ry: 7, fill: "#f4f1e8", stroke: "#b9b2a0" }),
          s("circle", { cx: -2, cy: 0, r: 2.2, fill: "#fff" }), s("circle", { cx: 2, cy: 3, r: 2.2, fill: "#fff" }), s("ellipse", { cx: 0, cy: -6.5, rx: 2.6, ry: 3, fill: "#3b3530" })];
      case "vaca":
        return [s("ellipse", { cx: 1.5, cy: 3, rx: 8, ry: 14, class: "e-sombra-coche" }), s("ellipse", { cx: 0, cy: 2, rx: 7, ry: 12, fill: "#fbf8f2", stroke: "#6d5a48" }),
          s("ellipse", { cx: -2.5, cy: 4, rx: 3, ry: 4, fill: "#3b2f27" }), s("ellipse", { cx: 3, cy: -3, rx: 2.4, ry: 3, fill: "#3b2f27" }), s("ellipse", { cx: 0, cy: -11.5, rx: 3.6, ry: 4, fill: "#e8c9b0", stroke: "#6d5a48" }),
          s("line", { x1: -4.5, y1: -12, x2: -6.5, y2: -14.5, stroke: "#e9e3d6", "stroke-width": 1.6, "stroke-linecap": "round" }), s("line", { x1: 4.5, y1: -12, x2: 6.5, y2: -14.5, stroke: "#e9e3d6", "stroke-width": 1.6, "stroke-linecap": "round" })];
      case "nino":
        return [s("g", { transform: "scale(1.05)" }, s("ellipse", { cx: 1.5, cy: 2, rx: 5.5, ry: 4, class: "e-sombra-coche" }), s("ellipse", { cx: 0, cy: 0, rx: 5, ry: 3.2, fill: c, stroke: oscuro }), s("circle", { cx: 0, cy: 0, r: 2.6, fill: "#6b4a2a" }))];
      case "peaton":
        return [s("g", { transform: "scale(1.45)" },s("ellipse", { cx: 1.5, cy: 2, rx: 7, ry: 5, class: "e-sombra-coche" }), s("ellipse", { cx: 0, cy: 0, rx: 6.5, ry: 4, fill: c, stroke: oscuro }), s("circle", { cx: 0, cy: 0, r: 3.2, fill: "#5a3b26" }))];
      case "carro":
        return [s("ellipse", { cx: 1.5, cy: 3, rx: 11, ry: 26, class: "e-sombra-coche" }),
          s("ellipse", { cx: 0, cy: -y + 12, rx: 4.6, ry: 10, fill: "#8a5a35", stroke: "#5e3a1f" }), s("ellipse", { cx: 0, cy: -y + 1.5, rx: 2.4, ry: 3.6, fill: "#7a4c2b" }),
          s("line", { x1: -3.5, y1: -y + 16, x2: -3.5, y2: -y + 26, stroke: "#6b4a2a", "stroke-width": 1.6 }), s("line", { x1: 3.5, y1: -y + 16, x2: 3.5, y2: -y + 26, stroke: "#6b4a2a", "stroke-width": 1.6 }),
          s("rect", { x: -x - 2, y: -y + 34, width: 3, height: 9, rx: 1, fill: "#3a2a1a" }), s("rect", { x: x - 1, y: -y + 34, width: 3, height: 9, rx: 1, fill: "#3a2a1a" }),
          s("rect", { x: -x, y: -y + 25, width: w, height: L - 25, rx: 2.5, fill: "#c79a63", stroke: "#8a6238", "stroke-width": 1.2 }),
          s("line", { x1: -x + 3, y1: -y + 33, x2: x - 3, y2: -y + 33, stroke: "#a87d4c", "stroke-width": 1.2 }), s("line", { x1: -x + 3, y1: -y + 41, x2: x - 3, y2: -y + 41, stroke: "#a87d4c", "stroke-width": 1.2 }),
          s("rect", { x: -x + 3, y: y - 3, width: 4, height: 2.4, rx: 1.2, class: "e-freno" }), s("rect", { x: x - 7, y: y - 3, width: 4, height: 2.4, rx: 1.2, class: "e-freno" })];
      default: // turismo
        return [sombra, s("rect", { x: -x - 2.5, y: -10, width: 3, height: 5, rx: 1.5, fill: oscuro }), s("rect", { x: x - .5, y: -10, width: 3, height: 5, rx: 1.5, fill: oscuro }),
          caja(-y, L, 7.5, c),
          s("path", { d: "M-8,-19.5 Q0,-21.5 8,-19.5 L8,-14 Q0,-15 -8,-14 Z", fill: claro, opacity: .55 }),
          s("path", { d: "M-8.5,-11 Q0,-13.5 8.5,-11 L7,-4.5 Q0,-5.5 -7,-4.5 Z", class: "e-cristal" }),
          s("rect", { x: -7, y: -4, width: 14, height: 13, rx: 3, fill: claro, opacity: .35 }),
          s("path", { d: "M-7,10 Q0,11 7,10 L8,15 Q0,16.5 -8,15 Z", class: "e-cristal" }), ...luces(w, L)];
    }
  }
  // Remolque: va detrás, con su propio giro (sigue el mismo trayecto a una distancia fija).
  function remolque(r, color) {
    const x = r.w / 2, y = r.L / 2;
    const cuerpo = s("g", { class: "e-cuerpo" }, s("line", { x1: 0, y1: -y - r.sep - 1, x2: 0, y2: -y, stroke: "#2a2f38", "stroke-width": 2.4 }),
      s("rect", { x: -x + .5, y: -y + 2, width: r.w + 3, height: r.L, rx: 3, class: "e-sombra-coche" }),
      s("rect", { x: -x - 2, y: -4, width: 2.5, height: 8, rx: 1, fill: "#2a2f38" }), s("rect", { x: x - .5, y: -4, width: 2.5, height: 8, rx: 1, fill: "#2a2f38" }),
      s("rect", { x: -x, y: -y, width: r.w, height: r.L, rx: 3, fill: "#e3e7ee", stroke: color[1], "stroke-width": 1.2 }),
      s("rect", { x: -x + 3, y: -y + 3, width: r.w - 6, height: r.L - 6, rx: 2, fill: color[2], opacity: .3 }),
      s("rect", { x: -x + 1.5, y: y - 2.6, width: r.w * .26, height: 3, rx: 1.5, class: "e-freno" }), s("rect", { x: x - 1.5 - r.w * .26, y: y - 2.6, width: r.w * .26, height: 3, rx: 1.5, class: "e-freno" }),
      s("rect", { x: -r.w * .14, y: y - 2.4, width: r.w * .28, height: 2.6, rx: 1.3, class: "e-atras" }));
    const g = s("g", { class: "e-vehiculo e-remolque" }, cuerpo); g._cuerpo = cuerpo;
    return g;
  }
  function vehiculo(v) {
    const tipo = v.tipo || "turismo", m = MEDIDAS[tipo] || MEDIDAS.turismo, w = m.w, L = v.largo || m.L, letra = v.letra;
    const color = COLOR[letra] || (v.color && COLOR[v.color]) || GRIS;
    const halo = s("ellipse", { rx: w / 2 + 10, ry: L / 2 + 10, class: "e-halo" });
    const cuerpo = s("g", { class: "e-cuerpo" }, halo, ...carroceria(tipo, w, L, color));
    const placa = letra ? s("g", { class: "e-placa" }, s("circle", { r: 9.5, fill: "#fff", stroke: color[1], "stroke-width": 2 }), s("text", { y: 4.6, "text-anchor": "middle", "font-size": 13, "font-weight": 900, fill: color[1] }, letra)) : null;
    const etiqueta = s("g", { class: "e-etiqueta", opacity: 0 }, s("rect", { x: -30, y: -12, width: 60, height: 22, rx: 11 }), s("text", { y: 4, "text-anchor": "middle", "font-size": 11.5, "font-weight": 900 }));
    const g = s("g", { class: "e-vehiculo e-" + tipo.replace("+", "-"), "data-v": v.id || letra }, cuerpo, placa, etiqueta);
    g._cuerpo = cuerpo; g._etiqueta = etiqueta; g._largo = L;
    // Distancia de la etiqueta al centro: detrás del vehículo (o del remolque).
    g._detras = L / 2 + 19 + (m.rem ? m.rem.L + m.rem.sep : 0);
    if (m.rem) { g._remolque = remolque(m.rem, color); g._remK = L / 2 + m.rem.sep + m.rem.L / 2; g._engancheK = L / 2 + m.rem.sep; g._remMitad = m.rem.L / 2; }
    // Grupo (por ejemplo, ciclistas en fila): copias que siguen el mismo trayecto, una detrás de otra.
    if (v.grupo > 1) {
      g._seguidores = [];
      for (let k = 1; k < v.grupo; k++) {
        const c = s("g", { class: "e-cuerpo" }, ...carroceria(tipo, w, L, color));
        const sg = s("g", { class: "e-vehiculo e-" + tipo }, c); sg._cuerpo = c; g._seguidores.push(sg);
      }
      g._sep = v.separacion || L + 8; g._desorden = v.desorden || 0;
      g._detras = L / 2 + 19;
    }
    return g;
  }
  function colocar(g, p) {
    g.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
    g._cuerpo.setAttribute("transform", `rotate(${p.ang.toFixed(1)})`);
    g._ultimo = p;
    const a = (p.ang - 90) * Math.PI / 180;
    // Detrás del vehículo (hacia donde viene), o debajo/encima en el estrechamiento; siempre dentro del encuadre.
    const k = g._detras || 40;
    let dx = g._lado ? 0 : -Math.cos(a) * k, dy = g._lado ? g._lado * 34 : -Math.sin(a) * k;
    const [x0, y0, x1, y1] = g._vista || [0, 0, 400, 400], m = (g._etqAncho || 60) / 2 + 4;
    dx = Math.min(x1 - m, Math.max(x0 + m, p.x + dx)) - p.x; dy = Math.min(y1 - 14, Math.max(y0 + 14, p.y + dy)) - p.y;
    g._etiqueta.setAttribute("transform", `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`);
  }
  function etiquetar(g, texto) {
    const e = g._etiqueta;
    if (!texto) { e.setAttribute("opacity", 0); return; }
    e.querySelector("text").textContent = texto;
    const ancho = Math.max(44, Math.round(texto.length * 7.4 + 18));
    const r = e.querySelector("rect"); r.setAttribute("x", -ancho / 2); r.setAttribute("width", ancho); g._etqAncho = ancho;
    if (g._ultimo) colocar(g, g._ultimo);
    e.setAttribute("class", "e-etiqueta " + ({ Pasa: "pasa", Preferente: "pasa", "Pasa primero": "pasa", Espera: "espera", Cede: "espera", "Marcha atrás": "espera", Retrocede: "espera", STOP: "stop", "Para otra vez": "stop" }[texto] || ""));
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
    // Brazo que no existe (intersección en T): césped en su lugar.
    const hueco = { N: [140, -20, 120, 170], S: [140, 250, 120, 170], E: [250, 140, 170, 120], O: [-20, 140, 170, 120] };
    for (const b in hueco) if ((vias[b] || {}).cerrada) { const [x, y, w, h] = hueco[b]; g.append(s("rect", { x, y, width: w, height: h, fill: `url(#${id}-cesped)` })); }
    // Calzadas: asfalto, o tierra en el brazo sin pavimentar.
    const tramo = { N: [160, 0, 80, 160], S: [160, 240, 80, 160], E: [240, 160, 160, 80], O: [0, 160, 160, 80] };
    g.append(s("rect", { x: 160, y: 160, width: 80, height: 80, class: "e-asfalto" }));
    for (const b of ["N", "S", "E", "O"]) {
      if ((vias[b] || {}).cerrada) continue;
      const [x, y, w, h] = tramo[b], tierra = (vias[b] || {}).firme === "tierra";
      g.append(s("rect", { x, y, width: w, height: h, fill: tierra ? `url(#${id}-tierra)` : null, class: tierra ? "" : "e-asfalto" }));
      if (!tierra && (vias[b] || {}).flechas != null) { // sentido único: sin eje, flechas en los dos carriles
        for (const lat of [-20, 20]) { const q = enBrazo(b, 120, lat); g.append(flecha(q[0], q[1], vias[b].flechas)); }
      } else if (!tierra) {
        // Eje discontinuo y bordes.
        const eje = { N: [200, 0, 200, 150], S: [200, 250, 200, 400], E: [250, 200, 400, 200], O: [0, 200, 150, 200] }[b];
        g.append(s("line", { x1: eje[0], y1: eje[1], x2: eje[2], y2: eje[3], class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }));
      }
    }
    // Entorno.
    // Edificios a medida (por ejemplo, uno que tapa la vista): sustituyen a las casas de siempre.
    const libre = (x, y) => !(esc.edificios || []).some(([ex, ey, ew, eh]) => x > ex - 16 && x < ex + ew + 16 && y > ey - 16 && y < ey + eh + 16);
    const arboles = esc.entorno !== "campo" ? [[122, 120, 13], [282, 120, 11], [118, 286, 12], [330, 70, 15], [60, 330, 15]] : [[70, 80, 16], [320, 320, 18], [330, 90, 13], [90, 320, 12]];
    if (esc.edificios) esc.edificios.forEach(([x, y, w, h]) => g.append(casa(x, y, w, h)));
    else if (esc.entorno !== "campo") g.append(casa(40, 30, 64, 46), casa(300, 300, 58, 52));
    arboles.forEach(([x, y, r]) => libre(x, y) && g.append(arbol(x, y, r)));
    // Señales: línea de detención (STOP, continua) o de ceda el paso (discontinua), y la señal vertical.
    for (const b in vias) {
      const via = vias[b];
      if (via.cartel) { const p = enBrazo(b, via.senal ? 150 : 96, 56); g.append(cartel(via.cartel, p[0], p[1])); }
      if (!via.senal) continue;
      if (via.linea !== false) {
        const a = enBrazo(b, 66, 1), z = enBrazo(b, 66, 39);
        g.append(s("line", { x1: a[0], y1: a[1], x2: z[0], y2: z[1], class: "e-marca", "stroke-width": via.senal === "stop" ? 6 : 5, "stroke-dasharray": via.senal === "ceda" ? "7 5" : null }));
      }
      if (via.pintada) g.append(marcaPintada(b, via.senal));
      if (via.poste === false) continue;
      const p = enBrazo(b, 78, 56);
      g.append(s("line", { x1: p[0] + 2, y1: p[1] + 2, x2: p[0] + 2, y2: p[1] + 20, class: "e-poste" }));
      g.append(via.senal === "stop" ? senalStop(p[0], p[1]) : senalCeda(p[0], p[1]));
    }
    if (esc.centro) g.append(s("g", { class: "e-centro" }, s("circle", { cx: 200, cy: 200, r: 5 }), s("text", { x: 200, y: 222, "text-anchor": "middle", "font-size": 11, "font-weight": 900 }, "centro")));
    svg.append(g);
  }
  // Marca pintada en el carril (M-6.3 STOP o M-6.5 triángulo), legible para quien se acerca.
  function marcaPintada(b, senal) {
    const [x, y] = enBrazo(b, 108, 20), giro = { S: 0, N: 180, E: -90, O: 90 }[b];
    const dibujo = senal === "stop"
      ? s("text", { x: 0, y: 7, "text-anchor": "middle", "font-size": 12.5, "font-weight": 900, "letter-spacing": "-.3", class: "e-pintura", transform: "scale(1 1.7)" }, "STOP")
      : s("polygon", { points: "-12,-22 12,-22 0,22", class: "e-pintura-linea" });
    return s("g", { transform: `translate(${x} ${y}) rotate(${giro})` }, dibujo);
  }
  // Señal del catálogo (imagen recortada del BOE) sobre un poste.
  function cartel(cod, x, y) {
    return s("g", { class: "e-senal" }, s("line", { x1: x, y1: y + 4, x2: x, y2: y + 24, class: "e-poste" }),
      s("circle", { cx: x, cy: y, r: 15.5, fill: "#fff", opacity: .9 }), s("image", { href: `img/senales/${cod}.png`, x: x - 14, y: y - 14, width: 28, height: 28 }));
  }
  function senalStop(x, y) {
    const p = []; for (let i = 0; i < 8; i++) { const a = (22.5 + 45 * i) * Math.PI / 180; p.push((x + 13 * Math.cos(a)).toFixed(1) + "," + (y + 13 * Math.sin(a)).toFixed(1)); }
    return s("g", { class: "e-senal" }, s("polygon", { points: p.join(" "), fill: "#c8102e", stroke: "#fff", "stroke-width": 1.8 }), s("text", { x, y: y + 3.4, "text-anchor": "middle", "font-size": 8.5, "font-weight": 900, fill: "#fff" }, "STOP"));
  }
  function senalCeda(x, y) {
    return s("g", { class: "e-senal" }, s("polygon", { points: `${x - 14},${y - 10} ${x + 14},${y - 10} ${x},${y + 14}`, fill: "#fff", stroke: "#c8102e", "stroke-width": 4, "stroke-linejoin": "round" }));
  }

  // ---------- Escenario del estrechamiento o del puente ----------
  function fondoEstrecho(svg, esc) {
    const id = svg._id, g = s("g", { class: "e-fondo" }), puente = esc.entorno === "puente";
    g.append(s("rect", { width: 400, height: 400, fill: `url(#${id}-cesped)` }));
    if (puente) {
      g.append(s("path", { d: "M150,-10 C140,120 170,260 148,410 L262,410 C240,260 268,130 252,-10 Z", class: "e-agua" }));
      for (const y of [40, 110, 300, 360]) g.append(s("path", { d: `M${170 + (y % 3) * 6},${y} q10,-5 20,0 t20,0`, class: "e-ola" }));
    }
    if (esc.entorno === "obras") { // calzada normal; las obras ocupan el carril del norte entre x = 140 y x = 260
      g.append(s("rect", { x: -10, y: 152, width: 420, height: 96, class: "e-arcen" }), s("rect", { x: -10, y: 160, width: 420, height: 80, class: "e-asfalto" }),
        s("line", { x1: -10, y1: 200, x2: 96, y2: 200, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }), s("line", { x1: 304, y1: 200, x2: 410, y2: 200, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }),
        s("rect", { x: 136, y: 160, width: 128, height: 24, rx: 3, class: "e-obras" }));
      for (let k = 144; k < 260; k += 16) g.append(s("line", { x1: k, y1: 163, x2: k + 8, y2: 181, class: "e-obras-raya" }));
      g.append(arbol(60, 90, 16), arbol(345, 320, 18), arbol(330, 80, 12), arbol(70, 330, 13));
      for (const c of esc.senales || []) g.append(c.extremo === "E" ? cartel(c.cod, 300, 132) : cartel(c.cod, 100, 268));
      svg.append(g); return;
    }
    // Calzada de dos carriles que se estrecha a uno entre x = 145 y x = 255.
    const borde = "M-10,152 L82,152 C116,152 114,170 148,170 L252,170 C286,170 284,152 318,152 L410,152 L410,248 L318,248 C284,248 286,230 252,230 L148,230 C114,230 116,248 82,248 L-10,248 Z";
    g.append(s("path", { d: borde, class: puente ? "e-acera" : "e-arcen" }));
    g.append(s("path", { d: "M-10,160 L78,160 C112,160 111,177 145,177 L255,177 C289,177 288,160 322,160 L410,160 L410,240 L322,240 C288,240 289,223 255,223 L145,223 C111,223 112,240 78,240 L-10,240 Z", class: "e-asfalto" }));
    g.append(s("line", { x1: -10, y1: 200, x2: 80, y2: 200, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }),
      s("line", { x1: 320, y1: 200, x2: 410, y2: 200, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }));
    if (puente) {
      for (const y of [170, 230]) g.append(s("rect", { x: 140, y: y - 4, width: 120, height: 8, rx: 3, class: "e-pretil" }));
      g.append(arbol(60, 90, 16), arbol(345, 320, 18), arbol(330, 80, 12), arbol(70, 330, 13));
    } else if (esc.entorno === "pendiente" || esc.entorno === "obras") {
      g.append(arbol(60, 90, 16), arbol(345, 320, 18), arbol(330, 80, 12), arbol(70, 330, 13), arbol(200, 110, 14), arbol(205, 300, 15));
    } else {
      g.append(casa(132, 60, 136, 104), casa(132, 236, 136, 104), arbol(60, 90, 16), arbol(345, 320, 18), arbol(330, 80, 12), arbol(70, 330, 13));
    }
    // Señales en los extremos: {cod: "R-5", extremo: "O"} se coloca a la derecha de quien entra por ese extremo.
    for (const c of esc.senales || []) g.append(c.extremo === "E" ? cartel(c.cod, 300, 132) : cartel(c.cod, 100, 268));
    svg.append(g);
  }

  // ---------- Escenario de la vía recta (horizontal) ----------
  // esc.via: {urbana: aceras y casas | campo, sentidoUnico, carriles: 2, mediana}
  function fondoRecta(svg, esc) {
    const id = svg._id, via = esc.via || {}, g = s("g", { class: "e-fondo" });
    g.append(s("rect", { width: 400, height: 400, fill: `url(#${id}-cesped)` }));
    if (via.mediana) {
      // Dos calzadas de dos carriles: la del norte hacia el oeste y la del sur hacia el este.
      g.append(s("rect", { x: -10, y: 108, width: 420, height: 184, class: "e-arcen" }), s("rect", { x: -10, y: 116, width: 420, height: 64, class: "e-asfalto" }),
        s("rect", { x: -10, y: 220, width: 420, height: 64, class: "e-asfalto" }), s("rect", { x: -10, y: 180, width: 420, height: 40, fill: `url(#${id}-cesped)` }),
        s("line", { x1: -10, y1: 181, x2: 410, y2: 181, class: "e-bionda" }), s("line", { x1: -10, y1: 219, x2: 410, y2: 219, class: "e-bionda" }));
      for (const y of [148, 252]) g.append(s("line", { x1: -10, y1: y, x2: 410, y2: y, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }));
      for (const y of [119, 177, 223, 281]) g.append(s("line", { x1: -10, y1: y, x2: 410, y2: y, class: "e-marca", "stroke-width": 2 }));
      g.append(arbol(60, 50, 16), arbol(330, 40, 13), arbol(80, 350, 14), arbol(320, 345, 17), arbol(200, 200, 9), arbol(60, 200, 8), arbol(340, 200, 8));
      svg.append(g); return;
    }
    if (via.urbana) {
      g.append(s("rect", { x: -10, y: 128, width: 420, height: 144, class: "e-acera" }));
      g.append(casa(-6, 40, 120, 76), casa(126, 40, 140, 76), casa(278, 40, 130, 76));
      if (!via.sinCasasSur) g.append(casa(-6, 284, 120, 76), casa(126, 284, 140, 76), casa(278, 284, 130, 76));
      for (const x of [40, 360]) g.append(s("rect", { x: x - 1, y: 128, width: 2, height: 10, class: "e-cumbrera" }));
    } else g.append(s("rect", { x: -10, y: 150, width: 420, height: 100, class: "e-arcen" }), arbol(60, 70, 16), arbol(330, 60, 13), arbol(80, 330, 14), arbol(320, 335, 17));
    g.append(s("rect", { x: -10, y: 160, width: 420, height: 80, class: "e-asfalto" }));
    if (via.sentidoUnico) {
      if (via.carriles === 2) g.append(s("line", { x1: -10, y1: 200, x2: 410, y2: 200, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }));
      for (const [x, y] of [[60, 180], [60, 220], [300, 180], [300, 220]]) g.append(flecha(x, y, 90));
    } else g.append(s("line", { x1: -10, y1: 200, x2: 410, y2: 200, class: "e-marca", "stroke-dasharray": "16 12", "stroke-width": 3 }));
    if (!via.urbana) for (const y of [163, 237]) g.append(s("line", { x1: -10, y1: y, x2: 410, y2: y, class: "e-marca", "stroke-width": 2 }));
    svg.append(g);
  }
  // Flecha pintada en el suelo (ang: 0 = hacia arriba, 90 = hacia la derecha).
  const flecha = (x, y, ang) => s("path", { d: "M0,-14 L7,-4 L2.5,-4 L2.5,12 L-2.5,12 L-2.5,-4 L-7,-4 Z", transform: `translate(${x} ${y}) rotate(${ang})`, class: "e-pintura" });

  // ---------- Elementos sueltos (sobre cualquier escenario) ----------
  // Semáforos: su color cambia por pasos con paso.semaforos {id: "verde"/"ambar"/"rojo"}.
  function elementos(svg, esc, capaFondo, capaAlta) {
    const id = svg._id, semaforos = {};
    for (const e of esc.elementos || []) {
      const g = capaFondo;
      switch (e.tipo) {
        case "zona": g.append(s("rect", { x: e.x, y: e.y, width: e.w, height: e.h, rx: e.r || 0, class: "e-" + (e.clase || "asfalto"), fill: e.clase === "cesped" ? `url(#${id}-cesped)` : e.clase === "tierra" ? `url(#${id}-tierra)` : null })); break;
        case "casa": g.append(casa(e.x, e.y, e.w, e.h)); break;
        case "arbol": g.append(arbol(e.x, e.y, e.r || 13)); break;
        case "cebra": { // franjas paralelas a la vía, una tras otra a lo ancho de la calzada
          const v = e.dir === "v"; for (let k = e.desde; k + 6 <= e.hasta; k += 12) g.append(v ? s("rect", { x: k, y: e.y, width: 6.5, height: e.ancho || 22, class: "e-pintura" }) : s("rect", { x: e.x, y: k, width: e.ancho || 22, height: 6.5, class: "e-pintura" }));
          break;
        }
        case "pasoCiclistas": {
          const v = e.dir === "v";
          for (let k = e.desde; k + 5 <= e.hasta; k += 10) for (const o of [0, (e.ancho || 18) - 5]) g.append(v ? s("rect", { x: k, y: e.y + o, width: 5, height: 5, class: "e-pintura" }) : s("rect", { x: e.x + o, y: k, width: 5, height: 5, class: "e-pintura" }));
          break;
        }
        case "isleta":
          g.append(s("rect", { x: e.x - 3, y: e.y - 3, width: e.w + 6, height: e.h + 6, rx: Math.min(e.w, e.h) / 2 + 3, class: "e-bordillo" }), s("rect", { x: e.x, y: e.y, width: e.w, height: e.h, rx: Math.min(e.w, e.h) / 2, fill: e.peatones ? null : `url(#${id}-cesped)`, class: e.peatones ? "e-acera" : "" }));
          break;
        case "obras":
          g.append(s("rect", { x: e.x, y: e.y, width: e.w, height: e.h, rx: 3, class: "e-obras" }));
          for (let k = e.x + 8; k < e.x + e.w - 4; k += 16) g.append(s("line", { x1: k, y1: e.y + 3, x2: k + 8, y2: e.y + e.h - 3, class: "e-obras-raya" }));
          break;
        case "conos": for (const [x, y] of e.puntos) g.append(s("g", { class: "e-cono" }, s("circle", { cx: x + 1, cy: y + 1.5, r: 4.2, class: "e-sombra" }), s("circle", { cx: x, cy: y, r: 4, fill: "#ff7a1a" }), s("circle", { cx: x, cy: y, r: 1.8, fill: "#fff" }))); break;
        case "railes": { // eje horizontal (e.y) o vertical (e.x); enCalzada: embebidos en el asfalto
          const h = e.eje !== "v", c = h ? e.y : e.x, a = e.desde != null ? e.desde : -10, b = e.hasta != null ? e.hasta : 410;
          if (!e.enCalzada) g.append(h ? s("rect", { x: a, y: c - 22, width: b - a, height: 44, class: "e-balasto" }) : s("rect", { x: c - 22, y: a, width: 44, height: b - a, class: "e-balasto" }));
          if (!e.enCalzada) for (let k = a + 4; k < b; k += 11) g.append(h ? s("rect", { x: k, y: c - 15, width: 5, height: 30, rx: 1, class: "e-traviesa" }) : s("rect", { x: c - 15, y: k, width: 30, height: 5, rx: 1, class: "e-traviesa" }));
          for (const o of [-9, 9]) g.append(h ? s("line", { x1: a, y1: c + o, x2: b, y2: c + o, class: "e-rail" + (e.enCalzada ? " calzada" : "") }) : s("line", { x1: c + o, y1: a, x2: c + o, y2: b, class: "e-rail" + (e.enCalzada ? " calzada" : "") }));
          break;
        }
        case "cartel": {
          const cg = cartel(e.cod, e.x, e.y);
          if (e.panel) cg.append(s("rect", { x: e.x - 20, y: e.y + 16, width: 40, height: 12, rx: 2, fill: "#fff", stroke: "#1b2232", "stroke-width": 1 }), s("text", { x: e.x, y: e.y + 25, "text-anchor": "middle", "font-size": 8, "font-weight": 900, fill: "#1b2232" }, e.panel));
          capaAlta.append(cg); break;
        }
        case "flecha": g.append(flecha(e.x, e.y, e.ang || 0)); break;
        case "guia": g.append(s("polyline", { points: e.puntos.map(p => p.join(",")).join(" "), class: "e-marca", fill: "none", "stroke-width": 2.5, "stroke-dasharray": "6 6" })); break;
        case "parada": g.append(s("rect", { x: e.x, y: e.y, width: e.w, height: e.h || 18, class: "e-parada" }), s("text", { x: e.x + e.w / 2, y: e.y + (e.h || 18) / 2 + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 900, class: "e-parada-texto" }, "BUS")); break;
        case "texto": capaAlta.append(s("text", { x: e.x, y: e.y, "text-anchor": "middle", "font-size": e.tam || 12, "font-weight": 900, class: "e-rotulo" }, e.t)); break;
        case "persona": { // agente (con chaleco y brazo levantado) o persona que hace indicaciones
          const cuerpo = s("g", { transform: `translate(${e.x} ${e.y}) rotate(${e.ang || 0})` },
            s("ellipse", { cx: 1.5, cy: 2, rx: 9, ry: 6, class: "e-sombra" }), s("ellipse", { cx: 0, cy: 0, rx: 9, ry: 5.5, fill: e.agente ? "#1f3a8a" : "#7b5cd6", stroke: "#0f1b40", "stroke-width": 1 }),
            e.agente ? s("rect", { x: -9, y: -1.5, width: 18, height: 3, fill: "#d7ff3a" }) : null,
            s("line", { x1: 7, y1: 0, x2: 16, y2: -6, stroke: e.agente ? "#1f3a8a" : "#7b5cd6", "stroke-width": 3.4, "stroke-linecap": "round" }), s("circle", { cx: 16, cy: -6, r: 2.2, fill: e.agente ? "#fff" : "#e8c9b0" }),
            s("circle", { cx: 0, cy: 0, r: 4.2, fill: e.agente ? "#ffffff" : "#5a3b26", stroke: e.agente ? "#1f3a8a" : "none", "stroke-width": 1.4 }));
          capaAlta.append(s("g", { class: "e-persona" }, cuerpo)); break;
        }
        case "semaforo": {
          // Visto desde arriba, encarado hacia quien se acerca (ang: 0 = mira al sur).
          const luzR = s("circle", { cx: -7, cy: 0, r: 3.2 }), luzA = s("circle", { cx: 0, cy: 0, r: 3.2 }), luzV = s("circle", { cx: 7, cy: 0, r: 3.2 });
          const sg = s("g", { class: "e-semaforo", transform: `translate(${e.x} ${e.y}) rotate(${e.ang || 0})` },
            s("line", { x1: 0, y1: -14, x2: 0, y2: -4, class: "e-poste" }), s("rect", { x: -13, y: -5.5, width: 26, height: 11, rx: 5.5, fill: "#1b2232" }), luzR, luzA, luzV);
          semaforos[e.id || "s"] = { r: luzR, a: luzA, v: luzV, inicial: e.color || "verde" };
          capaAlta.append(sg); break;
        }
        case "niebla": { // velo que solo deja ver un círculo alrededor de (cx, cy)
          const nid = id + "-niebla";
          svg.querySelector("defs").append(s("radialGradient", { id: nid + "-g", cx: e.cx, cy: e.cy, r: e.r || 70, gradientUnits: "userSpaceOnUse" },
            s("stop", { offset: "0", "stop-color": "#000" }), s("stop", { offset: ".5", "stop-color": "#000" }), s("stop", { offset: "1", "stop-color": "#fff" })),
            s("mask", { id: nid, maskUnits: "userSpaceOnUse", x: -20, y: -20, width: 440, height: 440 }, s("rect", { x: -20, y: -20, width: 440, height: 440, fill: `url(#${nid}-g)` })));
          svg._niebla = s("rect", { x: -20, y: -20, width: 440, height: 440, mask: `url(#${nid})`, class: "e-niebla" }); break;
        }
        case "pendiente": { // sombreado: más oscuro hacia la parte alta (e.alto: "E" u "O")
          const nid = id + "-pend";
          svg.querySelector("defs").append(s("linearGradient", { id: nid, x1: e.alto === "E" ? 0 : 1, x2: e.alto === "E" ? 1 : 0, y1: 0, y2: 0 },
            s("stop", { offset: "0", "stop-color": "#000", "stop-opacity": 0 }), s("stop", { offset: "1", "stop-color": "#2a3a18", "stop-opacity": .3 })));
          g.append(s("rect", { x: 0, y: 0, width: 400, height: 400, fill: `url(#${nid})` }));
          for (let k = 0; k < 5; k++) { const x = 70 + k * 62; g.append(s("path", { d: `M${x},0 C${x - 18},120 ${x + 18},280 ${x},400`, class: "e-curva-nivel" })); }
          break;
        }
      }
    }
    return semaforos;
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
    const svg = lienzo(op.titulo || esc.titulo, esc.tipo === "estrecho" ? "40 40 320 320" : null);
    if (esc.tipo === "glorieta") fondoGlorieta(svg); else if (esc.tipo === "estrecho") fondoEstrecho(svg, esc); else if (esc.tipo === "recta") fondoRecta(svg, esc); else fondoCruce(svg, esc);
    const capaRastro = s("g", { class: "e-rastros" }), capaV = s("g"), capaAlta = s("g");
    svg.append(capaRastro);
    const semaforos = elementos(svg, esc, capaRastro, capaAlta);
    svg.append(capaV, capaAlta);
    if (svg._niebla) svg.append(svg._niebla);
    const veh = {}, tray = {}, pos = {};
    // Los peatones y ciclistas van debajo de los coches; cada vehículo se identifica por su id o su letra.
    const orden = esc.vehiculos.slice().sort((a, b) => (/peaton|bici/.test(b.tipo || "") ? 1 : 0) - (/peaton|bici/.test(a.tipo || "") ? 1 : 0));
    for (const v of orden) {
      const k = v.id || v.letra;
      tray[k] = esc.tipo === "glorieta" ? trayectoGlorieta(v) : esc.tipo === "estrecho" ? trayectoEstrecho(v, esc) : esc.tipo === "recta" ? trayectoRecta(v) : trayectoCruce(v);
      const g = vehiculo(v); veh[k] = g; g._vista = svg.getAttribute("viewBox").split(" ").map(Number).map((n, i, a) => i < 2 ? n : n + a[i - 2]);
      if (esc.tipo === "estrecho") g._lado = v.desde === "O" ? 1 : -1; // etiqueta debajo o encima: detrás se saldría del dibujo
      if (g._remolque) capaV.append(g._remolque);
      (g._seguidores || []).forEach(x => capaV.append(x));
      capaV.append(g);
      const giro = esc.tipo === "glorieta" ? "derecha" : esc.tipo === "estrecho" || esc.tipo === "recta" || v.puntos ? "recto" : giroDe(v.desde, v.hacia);
      g._giro = v.intermitente || (giro === "recto" ? null : giro);
    }
    const fr = (l, m) => typeof m === "number" ? m : tray[l].fr[m] != null ? tray[l].fr[m] : 0;
    function situar(l, f) {
      pos[l] = f; const g = veh[l], t = tray[l], fuera = f >= .995 ? 0 : 1;
      colocar(g, t.en(f)); g.style.opacity = fuera;
      if (g._remolque) {
        // El remolque cuelga del enganche (detrás del vehículo) y apunta hacia él desde su punto del trayecto.
        const r = g._remolque, p = t.en(f), q = t.en(Math.max(0, f - g._remK / t.L)), a = (p.ang - 90) * Math.PI / 180;
        const hx = p.x - Math.cos(a) * g._engancheK, hy = p.y - Math.sin(a) * g._engancheK;
        const dx = hx - q.x, dy = hy - q.y, d = Math.hypot(dx, dy) || 1, cx = hx - dx / d * g._remMitad, cy = hy - dy / d * g._remMitad;
        r.setAttribute("transform", `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`); r._cuerpo.setAttribute("transform", `rotate(${(Math.atan2(dy, dx) * 180 / Math.PI + 90).toFixed(1)})`); r.style.opacity = fuera;
      }
      (g._seguidores || []).forEach((x, i) => { const q = t.en(Math.max(0, f - (i + 1) * g._sep / t.L)), o = g._desorden ? g._desorden * [1, -1, .4, -.6, .8][i % 5] : 0, aa = q.ang * Math.PI / 180; q.x += Math.cos(aa) * o; q.y += Math.sin(aa) * o; x.setAttribute("transform", `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`); x._cuerpo.setAttribute("transform", `rotate(${q.ang.toFixed(1)})`); x.style.opacity = f - (i + 1) * g._sep / t.L >= .995 ? 0 : 1; });
    }
    // Estado inicial: cada vehículo en su marca de inicio (por defecto, parado en la línea).
    const inicial = {}; esc.vehiculos.forEach(v => { const k = v.id || v.letra; inicial[k] = fr(k, v.inicio || (esc.tipo === "estrecho" || esc.tipo === "recta" ? "lejos" : "espera")); });
    const pasos = (esc.pasos && esc.pasos.length ? esc.pasos : pasosCruce(esc)).map(p => Object.assign({}, p, { mover: (p.mover || []).map(m => Object.assign({}, m, { hasta: fr(m.v, m.hasta) })) }));
    const estados = [Object.assign({}, inicial)];
    pasos.forEach((p, i) => { const e = Object.assign({}, estados[i]); p.mover.forEach(m => e[m.v] = m.hasta); estados.push(e); });
    // Color de cada semáforo antes de cada paso (el cambio de un paso se ve al empezarlo).
    const luzSem = [{}]; for (const k in semaforos) luzSem[0][k] = semaforos[k].inicial;
    pasos.forEach((p, i) => luzSem.push(Object.assign({}, luzSem[i], p.semaforos || {})));
    function pintarSem(i) {
      for (const k in semaforos) { const sm = semaforos[k], c = luzSem[i][k]; sm.r.setAttribute("class", "e-luz r" + (c === "rojo" ? " on" : "")); sm.a.setAttribute("class", "e-luz a" + (c === "ambar" ? " on" : "")); sm.v.setAttribute("class", "e-luz v" + (c === "verde" ? " on" : "")); }
    }

    function luces(intermitente, frenos, atras) {
      for (const l in veh) {
        const g = veh[l], partes = [g, g._remolque].filter(Boolean);
        g.classList.toggle("int-izq", intermitente && g._giro === "izquierda" && pos[l] < .97);
        g.classList.toggle("int-der", intermitente && g._giro === "derecha" && pos[l] < .97);
        partes.forEach(x => { x.classList.toggle("frenando", !!(frenos && frenos.includes(l))); x.classList.toggle("atras", !!(atras && atras.includes(l))); });
      }
    }
    function resaltar(p) {
      for (const l in veh) { veh[l].classList.toggle("foco", !!(p && p.foco && p.foco.includes(l))); etiquetar(veh[l], p && p.etiquetas ? p.etiquetas[l] : null); }
    }
    function pintarEstado(i) { const e = estados[i]; for (const l in e) situar(l, e[l]); pintarSem(i); }
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
        pintarEstado(i); pintarSem(i + 1);
        const p = pasos[i], desde = estados[i];
        resaltar(p);
        const ms = MOV.matches ? 0 : (p.ms || 2200);
        // Cada movimiento puede empezar con retraso y durar parte del paso.
        const movs = p.mover.map(m => ({ l: m.v, a: desde[m.v], b: m.hasta, curva: CURVA[m.modo || (m.hasta >= .99 ? "arranca" : "frena")] || CURVA.suave,
          t0: (m.retraso || 0) / (p.ms || 2200), t1: m.dura ? ((m.retraso || 0) + m.dura) / (p.ms || 2200) : 1, frena: m.modo === "valle" ? (u => u > .1 && u < .3) : m.modo === "frena" || (m.modo == null && m.hasta < .99) ? (u => u > .35) : null }));
        const frenos = (p.frenos || []).slice();
        // Marcha atrás: se mueve hacia una fracción menor del trayecto (luz blanca de marcha atrás).
        movs.forEach(m => { m.atras = m.b < m.a - .001; if (m.atras) { m.curva = CURVA.suave; m.frena = null; } });
        luces(true, frenos);
        const ok = await animar(ms, t => {
          const fren = frenos.slice(), atras = [];
          for (const m of movs) {
            const u = Math.max(0, Math.min(1, (t - m.t0) / Math.max(.01, m.t1 - m.t0)));
            situar(m.l, m.a + (m.b - m.a) * m.curva(u));
            if (m.frena && m.frena(u)) fren.push(m.l);
            if (m.atras && u > 0 && u < 1) atras.push(m.l);
          }
          luces(true, fren, atras);
          if (alAvanzar) alAvanzar(t);
        }, f);
        if (ok) { pintarEstado(i + 1); luces(true, movs.filter(m => m.b < .99 && m.modo !== "valle").map(m => m.l).concat(frenos)); if (alAvanzar) alAvanzar(1); }
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
  const esArticulo = c => /^\d/.test(String(c.articulo));
  const enlaceCita = c => el("a", { class: "esc-ref", href: c.url || (BOE[c.norma] ? BOE[c.norma] + (esArticulo(c) ? `#a${String(c.articulo).split(".")[0]}` : "") : "#"), target: "_blank", rel: "noopener" }, `${c.norma}, ${esArticulo(c) ? "art. " : ""}${c.articulo}`);

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
