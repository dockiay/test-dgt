// Escenas animadas en carretera y autovía (adelantamientos e incorporaciones).
// Añade dos tipos al motor de escenas.js con Escenas.registrarTipo, sin tocar sus escenarios:
// - «carretera»: calzada de doble sentido, un carril por sentido, arcenes y eje por tramos
//   (discontinua, continua o continua adosada a discontinua).
// - «autovia»: calzada de un solo sentido con 2 o 3 carriles, mediana y, si se pide, carril de
//   aceleración con su ramal de entrada.
// Los vehículos siguen una «ruta» de puntos [x, carril]: entre dos puntos de distinto carril el
// cambio es una curva en S suave. Las x son del centro del vehículo, en pantalla. El carril es un
// nombre o una y, vistos por quien circula hacia el este; los de sentido «O» los ven girados
// 180 grados (su "d" queda arriba y una y de 226 se dibuja en 174).
// «anotaciones» (cotas de separación, zonas sin visibilidad) aparecen solo en los estados que se
// indiquen. validar() comprueba en Node que los vehículos no se tocan y, con «comprobar», que la
// separación lateral del adelantamiento es la que exige la norma.
(function (raiz) {
  "use strict";
  const E = raiz.Escenas || (typeof require === "function" ? require("./escenas.js") : null);
  if (!E || !E.registrarTipo) return;

  // Escala: un turismo de 42 px de largo mide unos 4,4 m.
  const PX_M = 42 / 4.4;
  // Anchura dibujada de cada tipo, con las partes más salientes (retrovisores, manillar).
  const ANCHO = { turismo: 27, autocaravana: 24, camion: 26, autobus: 26, moto: 10, bici: 11.3, peaton: 19, carro: 20, "turismo+remolque": 27, "camion+remolque": 26, nino: 11 };
  const ancho = v => ANCHO[v.tipo || "turismo"] || (E.MEDIDAS[v.tipo || "turismo"] || E.MEDIDAS.turismo).w;
  const largo = v => v.largo || (E.MEDIDAS[v.tipo || "turismo"] || E.MEDIDAS.turismo).L;

  // ---------- Carriles (y del centro, para quien circula hacia el este) ----------
  const CARRETERA = { d: 220, i: 180, eje: 200, borde: 232, arcen: 249, "arcen-i": 151 };
  function carrilesAutovia(esc) {
    const n = (esc.via && esc.via.carriles) || 2;
    return n === 3 ? { der: 220, centro: 180, izq: 140, acel: 260, rampa: 340, arcen: 250 } : { der: 220, izq: 180, acel: 260, rampa: 340, arcen: 250 };
  }
  const carriles = esc => esc.tipo === "autovia" ? carrilesAutovia(esc) : CARRETERA;
  const acel = esc => Object.assign({ desde: 100, hasta: 280 }, (esc.via && esc.via.aceleracion) || {});

  function trayectoVia(v, esc) {
    const Y = carriles(esc), O = v.sentido === "O";
    // [x, "N"] o [x, "S"] (solo al final): gira hacia una vía lateral que sale en x hacia el norte o el sur.
    const pts = (v.ruta || []).map(([x, c]) => [O ? 400 - x : x, c === "N" || c === "S" ? c : typeof c === "number" ? c : Y[c]]);
    const c = E.camino(pts[0][0], pts[0][1]).marca("p0");
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      if (y1 === "N" || y1 === "S") { const d = y1 === "N" ? -1 : 1, r = Math.abs(x1 - x0); c.curva([x1, y0], [x1, y0 + d * r], 30).a([x1, y0 + d * 260]); }
      else if (Math.abs(y1 - y0) < .01) c.a([x1, y1]);
      else { const m = (x0 + x1) / 2; c.cubica([m, y0], [m, y1], [x1, y1], 30); }
      c.marca("p" + i);
    }
    const t = c.fin(), fr = Object.assign({}, t.fr);
    for (const k in v.marcas || {}) fr[k] = t.fracX(O ? 400 - v.marcas[k] : v.marcas[k]);
    if (!O) return { en: t.en, fr, L: t.L };
    return { en: f => { const p = t.en(f); return { x: 400 - p.x, y: 400 - p.y, ang: p.ang + 180 }; }, fr, L: t.L };
  }

  // ---------- Comprobaciones (Node) ----------
  // Curvas de velocidad iguales a las de escenas.js, para muestrear las posiciones de cada paso.
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const fx = t => ((ax * t + bx) * t + cx) * t, fy = t => ((ay * t + by) * t + cy) * t, dx = t => (3 * ax * t + 2 * bx) * t + cx;
    return x => { let t = x; for (let i = 0; i < 8; i++) { const e = fx(t) - x, d = dx(t); if (Math.abs(e) < 1e-5 || !d) break; t -= e / d; } return fy(Math.max(0, Math.min(1, t))); };
  }
  const CURVA = { arranca: bezier(.55, 0, .9, .6), frena: bezier(.15, .55, .35, 1), suave: bezier(.42, 0, .25, 1), sigue: t => t, valle: t => t };
  function validar(esc, mal, claves) {
    const Y = carriles(esc), tray = {};
    for (const [k, v] of claves) {
      if (esc.tipo === "autovia" && v.sentido === "O") mal(`${k}: en la autovía todos circulan hacia el este`);
      if (!Array.isArray(v.ruta) || v.ruta.length < 2) { mal(`${k}: falta «ruta» (al menos dos puntos [x, carril])`); continue; }
      let ok = true;
      v.ruta.forEach(([x, c], i) => {
        if (typeof x !== "number") { mal(`${k}: punto ${i} sin x`); ok = false; }
        if (c === "N" || c === "S") { if (i !== v.ruta.length - 1) { mal(`${k}: el giro [x, "${c}"] solo puede ser el último punto`); ok = false; } }
        else if (typeof c !== "number" && Y[c] == null) { mal(`${k}: carril desconocido «${c}» (valen ${Object.keys(Y).join(", ")} o una y)`); ok = false; }
        if (i && (v.sentido === "O" ? x >= v.ruta[i - 1][0] : x <= v.ruta[i - 1][0])) { mal(`${k}: las x de la ruta deben ${v.sentido === "O" ? "bajar" : "subir"}`); ok = false; }
      });
      if (ok) tray[k] = trayectoVia(v, esc);
    }
    if (Object.keys(tray).length !== claves.size) return;
    const fr = (k, m) => typeof m === "number" ? m : tray[k].fr[m];
    // Estados (fracción de cada vehículo) y muestreo de cada paso.
    let estado = {};
    for (const [k, v] of claves) { estado[k] = fr(k, v.inicio || "lejos"); if (estado[k] == null) mal(`${k}: «inicio» no es ninguna marca`); }
    const muestras = [{ paso: 0, pos: Object.assign({}, estado) }];
    (esc.pasos || []).forEach((p, i) => {
      const ms = p.ms || 2200, movs = [];
      for (const m of p.mover || []) {
        const b = fr(m.v, m.hasta);
        if (b == null) { mal(`paso ${i + 1}: «${m.hasta}» no es ninguna marca de ${m.v} (hay ${Object.keys(tray[m.v] ? tray[m.v].fr : {}).join(", ")})`); continue; }
        if (b < estado[m.v] - .001 && !m.atras) mal(`paso ${i + 1}: ${m.v} iría marcha atrás`);
        movs.push({ k: m.v, a: estado[m.v], b, curva: CURVA[m.modo || (b >= .99 ? "arranca" : "frena")] || CURVA.suave, t0: (m.retraso || 0) / ms, t1: m.dura ? ((m.retraso || 0) + m.dura) / ms : 1 });
      }
      for (let s = 1; s <= 40; s++) {
        const t = s / 40, pos = Object.assign({}, estado);
        for (const m of movs) { const u = Math.max(0, Math.min(1, (t - m.t0) / Math.max(.01, m.t1 - m.t0))); pos[m.k] = m.a + (m.b - m.a) * m.curva(u); }
        muestras.push({ paso: i + 1, pos });
      }
      for (const m of movs) estado[m.k] = m.b;
    });
    // 1) Nadie se toca (salvo los que ya han salido del dibujo).
    const ks = [...claves.keys()], vistos = new Set();
    for (const { paso, pos } of muestras) {
      const at = {}; for (const k of ks) at[k] = pos[k] < .995 ? tray[k].en(pos[k]) : null;
      for (let a = 0; a < ks.length; a++) for (let b = a + 1; b < ks.length; b++) {
        const A = at[ks[a]], B = at[ks[b]]; if (!A || !B) continue;
        const va = claves.get(ks[a]), vb = claves.get(ks[b]);
        const dx = Math.abs(A.x - B.x) - (largo(va) + largo(vb)) / 2, dy = Math.abs(A.y - B.y) - (ancho(va) + ancho(vb)) / 2;
        const clave = ks[a] + ks[b] + paso;
        if (dx < 2 && dy < 2 && !vistos.has(clave)) { vistos.add(clave); mal(`paso ${paso}: ${ks[a]} y ${ks[b]} se tocan en el dibujo (x ${A.x.toFixed(0)}/${B.x.toFixed(0)}, y ${A.y.toFixed(0)}/${B.y.toFixed(0)})`); }
      }
    }
    // 2) Separación lateral mínima mientras uno rebasa al otro: {adelanta, a, minimo (m)}.
    for (const c of esc.comprobar || []) {
      const va = claves.get(c.adelanta), vb = claves.get(c.a);
      if (!va || !vb) { mal(`comprobar: no existe ${c.adelanta} o ${c.a}`); continue; }
      let peor = Infinity, emparejados = 0;
      for (const { pos } of muestras) {
        if (pos[c.adelanta] >= .995 || pos[c.a] >= .995) continue;
        const A = tray[c.adelanta].en(pos[c.adelanta]), B = tray[c.a].en(pos[c.a]);
        if (Math.abs(A.x - B.x) >= (largo(va) + largo(vb)) / 2) continue;
        emparejados++; peor = Math.min(peor, Math.abs(A.y - B.y) - (ancho(va) + ancho(vb)) / 2);
      }
      if (!emparejados) mal(`comprobar: ${c.adelanta} nunca llega a la altura de ${c.a}`);
      else if (peor < c.minimo * PX_M) mal(`comprobar: ${c.adelanta} pasa a ${(peor / PX_M).toFixed(2)} m de ${c.a}; la norma exige ${c.minimo} m`);
    }
    for (const a of esc.anotaciones || []) if (!Array.isArray(a.en) || !a.en.length) mal("cada anotación necesita «en»: lista de estados (0 = antes del primer paso)");
  }

  // ---------- Dibujo (solo en el navegador) ----------
  const enNavegador = typeof document !== "undefined";
  const ARBOLES_N = [[34, 122, 13], [118, 118, 10], [236, 124, 12], [352, 118, 14]];
  const ARBOLES_S = [[70, 280, 14], [176, 284, 11], [300, 278, 13], [384, 286, 10]];
  function decorado(g, H, esc, norte, sur) {
    const libres = (esc.via && esc.via.arboles === false) ? [] : [...(norte ? ARBOLES_N : []), ...(sur ? ARBOLES_S : [])];
    const ocupado = (x, y) => (esc.carteles || []).some(c => Math.abs(c.x - x) < 32 && ((c.lado || "sur") === "sur") === (y > 200));
    for (const [x, y, r] of libres) if (!ocupado(x, y)) g.append(H.arbol(x, y, r));
  }
  function linea(H, x1, x2, y, tipo, grosor = 3) {
    return H.s("line", { x1, y1: y, x2, y2: y, class: "e-marca", "stroke-width": grosor, "stroke-dasharray": tipo === "discontinua" ? "16 12" : null });
  }
  function fondoCarretera(svg, esc, H) {
    const s = H.s, id = svg._id, g = s("g", { class: "e-fondo" });
    g.append(s("rect", { x: -10, y: 90, width: 420, height: 220, fill: `url(#${id}-cesped)` }));
    decorado(g, H, esc, true, true);
    g.append(s("rect", { x: -10, y: 144, width: 420, height: 112, class: "e-asfalto" }), s("rect", { x: -10, y: 142, width: 420, height: 2, class: "e-arcen" }), s("rect", { x: -10, y: 256, width: 420, height: 2, class: "e-arcen" }));
    g.append(linea(H, -10, 410, 158, "continua", 2.5), linea(H, -10, 410, 242, "continua", 2.5));
    // Vías laterales: {x, lado: "norte"/"sur", ancho}. Carril de entrada a la derecha de quien sale de la carretera.
    for (const c of (esc.via && esc.via.cruces) || []) {
      const w = c.ancho || 60, norte = (c.lado || "norte") === "norte", y0 = norte ? 80 : 240, h = 80;
      g.append(s("rect", { x: c.x - w / 2 - 8, y: norte ? 80 : 248, width: w + 16, height: 72, class: "e-asfalto" }),
        s("path", { d: norte ? `M${c.x - w / 2 - 22},146 Q${c.x - w / 2},146 ${c.x - w / 2},124 L${c.x - w / 2},80 L${c.x - w / 2 - 22},80 Z` : `M${c.x - w / 2 - 22},254 Q${c.x - w / 2},254 ${c.x - w / 2},276 L${c.x - w / 2},320 L${c.x - w / 2 - 22},320 Z`, fill: `url(#${id}-cesped)` }),
        s("path", { d: norte ? `M${c.x + w / 2 + 22},146 Q${c.x + w / 2},146 ${c.x + w / 2},124 L${c.x + w / 2},80 L${c.x + w / 2 + 22},80 Z` : `M${c.x + w / 2 + 22},254 Q${c.x + w / 2},254 ${c.x + w / 2},276 L${c.x + w / 2},320 L${c.x + w / 2 + 22},320 Z`, fill: `url(#${id}-cesped)` }),
        s("rect", { x: c.x - w / 2 - 22, y: norte ? 156 : 240, width: w + 44, height: 4, class: "e-asfalto" }),
        s("line", { x1: c.x, y1: norte ? 80 : 320, x2: c.x, y2: norte ? 146 : 254, class: "e-marca", "stroke-width": 2.5, "stroke-dasharray": "10 8" }));
      void y0; void h;
    }
    // Eje por tramos.
    const tramos = (esc.via && esc.via.eje) || [{ desde: -10, hasta: 410, tipo: "discontinua" }];
    for (const t of tramos) {
      const a = t.desde != null ? t.desde : -10, b = t.hasta != null ? t.hasta : 410;
      if (t.tipo === "adosada-sur" || t.tipo === "adosada-norte") {
        const sur = t.tipo === "adosada-sur"; // discontinua del lado sur: quien va hacia el este puede cruzarla
        g.append(linea(H, a, b, sur ? 204.5 : 195.5, "discontinua", 3), linea(H, a, b, sur ? 195.5 : 204.5, "continua", 3));
      } else g.append(linea(H, a, b, 200, t.tipo === "continua" ? "continua" : "discontinua"));
    }
    svg.append(g);
  }
  function fondoAutovia(svg, esc, H) {
    const s = H.s, id = svg._id, g = s("g", { class: "e-fondo" }), n = (esc.via && esc.via.carriles) || 2, T = 240 - 40 * n;
    const ac = esc.via && esc.via.aceleracion ? acel(esc) : null;
    g.append(s("rect", { x: -10, y: 90, width: 420, height: 240, fill: `url(#${id}-cesped)` }));
    // Calzada contraria (arriba) y mediana con barrera.
    g.append(s("rect", { x: -10, y: T - 112, width: 420, height: 84, class: "e-asfalto" }), linea(H, -10, 410, T - 70, "discontinua"), linea(H, -10, 410, T - 32, "continua", 2.5));
    g.append(s("line", { x1: -10, y1: T - 18, x2: 410, y2: T - 18, class: "e-bionda" }));
    if (!ac) for (const [x, y, r] of [[60, 292, 13], [186, 296, 11], [310, 290, 14]]) g.append(H.arbol(x, y, r));
    if (ac) {
      // Ramal de entrada (misma curva que la ruta [-40, "rampa"] → [desde, "acel"]).
      const m = (ac.desde - 40) / 2, d = `M-40,340 C${m},340 ${m},260 ${ac.desde},260`;
      g.append(s("path", { d, fill: "none", stroke: "var(--esc-marca)", "stroke-width": 44 }), s("path", { d, fill: "none", class: "e-asfalto-trazo", "stroke-width": 39 }));
    }
    g.append(s("rect", { x: -10, y: T - 10, width: 420, height: (ac ? 262 : 268) - T, class: "e-asfalto" }));
    if (ac) {
      g.append(s("rect", { x: ac.desde - 2, y: 240, width: ac.hasta - ac.desde + 2, height: 40, class: "e-asfalto" }),
        s("polygon", { points: `${ac.hasta},240 ${ac.hasta + 80},240 ${ac.hasta + 80},252 ${ac.hasta},280`, class: "e-asfalto" }));
      g.append(s("line", { x1: ac.desde, y1: 279, x2: ac.hasta, y2: 279, class: "e-marca", "stroke-width": 2.5 }),
        s("line", { x1: ac.hasta, y1: 279, x2: ac.hasta + 80, y2: 243, class: "e-marca", "stroke-width": 2.5 }));
      g.append(linea(H, -10, ac.desde, 242, "continua", 2.5), linea(H, ac.hasta + 80, 410, 242, "continua", 2.5));
      g.append(s("line", { x1: ac.desde, y1: 240, x2: ac.hasta + 70, y2: 240, class: "e-marca", "stroke-width": 4, "stroke-dasharray": "8 7" }));
      for (const [x, y, r] of [[30, 286, 12], [ac.desde - 40, 306, 10]]) if (x > -10) g.append(H.arbol(x, y, r));
      g.append(H.arbol(ac.hasta + 40, 300, 13), H.arbol(370, 296, 12));
    } else g.append(linea(H, -10, 410, 242, "continua", 2.5));
    g.append(linea(H, -10, 410, T - 2, "continua", 2.5));
    for (let k = 1; k < n; k++) g.append(linea(H, -10, 410, T + 40 * k, "discontinua"));
    svg.append(g);
  }
  function objetos(svg, esc, H) {
    const s = H.s, g = s("g", { class: "e-objetos" });
    for (const o of esc.objetos || []) {
      if (o.tipo === "piedras") for (const [dx, dy, r] of [[-9, -5, 6], [3, -8, 4.5], [8, 3, 6.5], [-3, 6, 5], [12, -2, 3.5]]) g.append(s("circle", { cx: o.x + dx + 1.5, cy: o.y + dy + 2, r, class: "e-sombra" }), s("circle", { cx: o.x + dx, cy: o.y + dy, r, class: "e-piedra" }));
      if (o.tipo === "triangulo") g.append(s("polygon", { points: `${o.x - 6},${o.y + 5} ${o.x + 6},${o.y + 5} ${o.x},${o.y - 6}`, class: "e-triangulo" }));
      if (o.tipo === "cebra") for (let y = 147; y + 7 <= 253; y += 13) g.append(s("rect", { x: o.x - 16, y, width: 32, height: 7, class: "e-pintura" }));
    }
    for (const c of esc.carteles || []) g.append(H.cartel(c.cod, c.x, (c.lado || "sur") === "sur" ? 270 : 124));
    svg.append(g);
  }
  function anotaciones(svg, esc, H) {
    const s = H.s, g = s("g", { class: "e-anotaciones" }), lista = [];
    for (const a of esc.anotaciones || []) {
      let n;
      if (a.tipo === "zona") {
        n = s("g", { class: "e-anota e-zona-ciega" }, s("rect", { x: a.x, y: a.y, width: a.w, height: a.h, rx: 10 }),
          a.texto ? s("text", { x: a.x + a.w / 2, y: a.y + a.h / 2 + 4, "text-anchor": "middle", "font-size": 11.5, "font-weight": 900 }, a.texto) : null);
      } else { // cota vertical entre y1 e y2, en x
        const ancho = Math.round(a.texto.length * 6.8 + 14), lado = a.lado === "izq" ? -1 : 1, tx = a.x + lado * (8 + ancho / 2), ty = (a.y1 + a.y2) / 2;
        n = s("g", { class: "e-anota e-cota" },
          s("line", { x1: a.x, y1: a.y1, x2: a.x, y2: a.y2, class: "e-cota-linea" }),
          s("line", { x1: a.x - 5, y1: a.y1, x2: a.x + 5, y2: a.y1, class: "e-cota-linea" }), s("line", { x1: a.x - 5, y1: a.y2, x2: a.x + 5, y2: a.y2, class: "e-cota-linea" }),
          s("rect", { x: tx - ancho / 2, y: ty - 10, width: ancho, height: 20, rx: 10, class: "e-cota-placa" }),
          s("text", { x: tx, y: ty + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 900, class: "e-cota-texto" }, a.texto));
      }
      n._en = a.en || []; lista.push(n); g.append(n);
    }
    svg.append(g); svg._anotaciones = lista;
  }
  function estado(svg, i, esc, mueve) {
    for (const n of svg._anotaciones || []) n.classList.toggle("visible", !mueve && n._en.includes(i));
  }
  const def = (tipo, fondo) => ({
    vista: "0 104 400 196", inicio: "p0", validar, estado,
    trayecto: trayectoVia,
    // Etiqueta encima o debajo según en qué mitad de la vía esté en cada momento.
    lado: (v, esc) => p => (p.y >= (esc.tipo === "autovia" ? 200 : 200) ? 1 : -1),
    fondo(svg, esc, H) { fondo(svg, esc, H); objetos(svg, esc, H); if (enNavegador) anotaciones(svg, esc, H); }
  });
  E.registrarTipo("carretera", Object.assign(def("carretera", fondoCarretera), { vista: "0 108 400 184" }));
  E.registrarTipo("autovia", Object.assign(def("autovia", fondoAutovia), { vista: esc => (esc.via && esc.via.aceleracion) ? "0 104 400 206" : "0 100 400 184" }));
  E.via = { carriles, PX_M };
})(typeof window !== "undefined" ? window : globalThis);
