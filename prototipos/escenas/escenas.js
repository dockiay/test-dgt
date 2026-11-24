// Escenas animadas (prototipo). Sin librerías. Cada escena se crea con datos
// (los mismos que irían en un campo "escena" de la pregunta) y devuelve un
// objeto con pasos reproducibles. Antes de responder se pinta solo el
// fotograma inicial, que no da pistas; la animación se usa en la explicación.
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const MOV = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  const COLOR = { A: "#d43d3d", B: "#2a66cc", C: "#e3a21a", D: "#2e9a4f" };
  const ASFALTO = "#5f646b", ENTORNO = "#cfe0b8", MARCA = "#ffffff";

  function s(tag, at, ...hijos) {
    const e = document.createElementNS(NS, tag);
    for (const k in at || {}) if (at[k] != null) e.setAttribute(k, at[k]);
    for (const c of hijos.flat()) if (c != null) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  const lienzo = (w, h, titulo) => s("svg", { viewBox: `0 0 ${w} ${h}`, role: "img", "aria-label": titulo, class: "escena-svg" });

  // ---------- Trayectorias ----------
  // Se construyen con tramos (rectas, curvas, arcos) y marcas con nombre,
  // para poder decir "avanza hasta la marca 'espera'".
  function camino(x, y) {
    const pts = [[x, y]], marcas = {};
    const api = {
      a(x2, y2) { pts.push([x2, y2]); return api; },
      curva(cx, cy, x2, y2, n = 16) {
        const [x0, y0] = pts[pts.length - 1];
        for (let i = 1; i <= n; i++) { const t = i / n, u = 1 - t; pts.push([u * u * x0 + 2 * u * t * cx + t * t * x2, u * u * y0 + 2 * u * t * cy + t * t * y2]); }
        return api;
      },
      // Arco de circunferencia; ángulos en grados con el eje y hacia abajo.
      arco(cx, cy, r, a0, a1, paso = 4) {
        const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / paso));
        for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
        return api;
      },
      marca(nombre) { marcas[nombre] = pts.length - 1; return api; },
      fin() {
        const acum = [0];
        for (let i = 1; i < pts.length; i++) acum.push(acum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        const largo = acum[acum.length - 1];
        const fr = {}; for (const k in marcas) fr[k] = acum[marcas[k]] / largo;
        fr.inicio = 0; fr.fin = 1;
        function en(f) {
          const d = Math.max(0, Math.min(1, f)) * largo;
          let i = 1; while (i < acum.length - 1 && acum[i] < d) i++;
          const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], seg = acum[i] - acum[i - 1] || 1, t = (d - acum[i - 1]) / seg;
          return { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, ang: Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI + 90 };
        }
        const d = "M" + pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
        return { en, fr, largo, d };
      }
    };
    return api;
  }

  // ---------- Animación ----------
  const suave = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function animar(ms, cada, ficha) {
    if (MOV.matches || ms <= 0) { cada(1); return Promise.resolve(); }
    return new Promise(ok => {
      const t0 = performance.now();
      const marco = ahora => {
        if (ficha && ficha.cancelada) return ok();
        const t = Math.min(1, (ahora - t0) / ms);
        cada(t);
        t < 1 ? requestAnimationFrame(marco) : ok();
      };
      requestAnimationFrame(marco);
    });
  }

  // ---------- Vehículos ----------
  function coche(letra, color) {
    return s("g", { class: "vehiculo", "data-letra": letra },
      s("rect", { x: -11, y: -20, width: 22, height: 40, rx: 6, fill: color || COLOR[letra] || "#777", stroke: "#1b1b1b", "stroke-width": 1.5 }),
      s("rect", { x: -8, y: -14, width: 16, height: 8, rx: 2, fill: "#20262e" }),
      s("rect", { x: -8, y: 11, width: 16, height: 5, rx: 2, fill: "#20262e" }),
      s("text", { class: "letra-vehiculo", x: 0, y: 5, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "#fff" }, letra));
  }
  function colocar(g, p) {
    g.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.ang.toFixed(1)})`);
    const t = g.querySelector(".letra-vehiculo"); if (t) t.setAttribute("transform", `rotate(${(-p.ang).toFixed(1)} 0 0)`);
  }
  function flecha(d, color) {
    return s("path", { d, fill: "none", stroke: color, "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": "2 9", opacity: .9, class: "intencion" });
  }

  // ---------- Reproductor de pasos ----------
  // pasos: [{texto, cita:{norma, articulo, texto}, mover:[{v, hasta}] , antes?()}]
  // estado: {v: fracción} al inicio. Cada paso lleva a cada vehículo a "hasta".
  function reproductor(escena, pasos, inicial) {
    let ficha = null;
    const estados = [Object.assign({}, inicial)];
    pasos.forEach((p, i) => { const e = Object.assign({}, estados[i]); (p.mover || []).forEach(m => e[m.v] = m.hasta); estados.push(e); });
    function pintar(estado) { for (const v in estado) escena.situar(v, estado[v]); }
    return {
      total: pasos.length,
      pasos,
      fotograma(i) { if (ficha) ficha.cancelada = true; pintar(estados[i]); escena.resaltar && escena.resaltar(i > 0 ? pasos[i - 1] : null); },
      async reproducir(i) {
        if (ficha) ficha.cancelada = true;
        const f = ficha = { cancelada: false };
        pintar(estados[i]);
        const p = pasos[i];
        escena.resaltar && escena.resaltar(p);
        const desde = estados[i], hasta = estados[i + 1];
        const ms = p.ms || 1600;
        await animar(ms, t => { const k = suave(t); for (const v in hasta) if (hasta[v] !== desde[v]) escena.situar(v, desde[v] + (hasta[v] - desde[v]) * k); }, f);
        return !f.cancelada;
      }
    };
  }

  // =====================================================================
  // ESCENA 1: CRUCE DE CUATRO BRAZOS
  // datos: {vehiculos:[{letra, desde:"S|N|E|O", hacia}], stop:"NS"|"EO"|null}
  // =====================================================================
  const BRAZO = {
    S: { espera: [220, 276], salida: [180, 430], borde: [180, 240], carril: { x: 220 }, sale: { x: 180 }, derecha: "E", nombre: "el sur" },
    N: { espera: [180, 124], salida: [220, -30], borde: [220, 160], carril: { x: 180 }, sale: { x: 220 }, derecha: "O", nombre: "el norte" },
    E: { espera: [276, 180], salida: [430, 220], borde: [240, 220], carril: { y: 180 }, sale: { y: 220 }, derecha: "N", nombre: "el este" },
    O: { espera: [124, 220], salida: [-30, 180], borde: [160, 180], carril: { y: 220 }, sale: { y: 180 }, derecha: "S", nombre: "el oeste" }
  };
  const OPUESTO = { S: "N", N: "S", E: "O", O: "E" };
  function trayectoCruce(desde, hacia) {
    const a = BRAZO[desde], b = BRAZO[hacia], [x0, y0] = a.espera;
    const atras = { S: [0, 90], N: [0, -90], E: [90, 0], O: [-90, 0] }[desde];
    const c = camino(x0 + atras[0], y0 + atras[1]).a(x0, y0).marca("espera");
    // La salida del brazo de destino se toma por su carril de salida.
    const bordeSalida = { N: [220, 160], S: [180, 240], E: [240, 220], O: [160, 180] }[hacia];
    if (OPUESTO[desde] === hacia) c.a(...b.salida);
    else {
      const ctrl = [a.carril.x != null ? a.carril.x : b.sale.x, a.carril.y != null ? a.carril.y : b.sale.y];
      c.curva(ctrl[0], ctrl[1], bordeSalida[0], bordeSalida[1], 18).a(...b.salida);
    }
    return c.fin();
  }
  // Orden de paso. Clase 0: vía sin STOP (preferente si hay STOP en la otra).
  // Dentro de la misma clase, regla de la derecha (RGC 57.1). Devuelve grupos
  // que pasan a la vez (solo para trayectorias rectas, que no se cortan entre opuestos).
  function ordenCruce(vehiculos, stop) {
    const conStop = v => !!stop && stop.includes(v.desde);
    const manda = (x, y) => (!conStop(x) && conStop(y)) || (conStop(x) === conStop(y) && BRAZO[y.desde].derecha === x.desde);
    let quedan = vehiculos.slice(); const grupos = [];
    while (quedan.length) {
      const libres = quedan.filter(y => !quedan.some(x => x !== y && manda(x, y)));
      if (!libres.length) return { grupos, bloqueo: quedan };
      grupos.push(libres); quedan = quedan.filter(v => !libres.includes(v));
    }
    return { grupos, bloqueo: null };
  }
  const CITA_57 = { norma: "RGC", articulo: "57.1", texto: "En defecto de señal que regule la preferencia de paso, el conductor está obligado a cederlo a los vehículos que se aproximen por su derecha" };
  const CITA_56 = { norma: "RGC", articulo: "56.5", texto: "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente, cualquiera que sea el lado por el que se aproximen, llegando a detener por completo su marcha cuando sea preciso y, en todo caso, cuando así lo indique la señal correspondiente" };
  const lista = xs => xs.length === 1 ? xs[0] : xs.slice(0, -1).join(", ") + " y " + xs[xs.length - 1];
  function pasosCruce(vehiculos, stop) {
    const { grupos, bloqueo } = ordenCruce(vehiculos, stop);
    const pasos = [], pasados = new Set();
    const conStop = v => !!stop && stop.includes(v.desde);
    if (stop && vehiculos.some(conStop)) {
      const cs = vehiculos.filter(conStop).map(v => v.letra);
      pasos.push({ texto: `${lista(cs)} ${cs.length > 1 ? "tienen" : "tiene"} STOP: se detiene${cs.length > 1 ? "n" : ""} por completo en la línea y cede${cs.length > 1 ? "n" : ""} el paso a la vía preferente, venga quien venga y por el lado que sea.`, cita: CITA_56, mover: [], foco: cs });
    }
    grupos.forEach((g, i) => {
      const letras = g.map(v => v.letra), plural = g.length > 1;
      let porque;
      if (stop && g.every(v => !conStop(v)) && vehiculos.some(conStop)) porque = `${plural ? "circulan" : "circula"} por la vía preferente.`;
      else {
        const tenian = g.filter(v => vehiculos.some(x => x.desde === BRAZO[v.desde].derecha && !conStop(x) === !conStop(v)));
        if (stop && g.some(conStop) && vehiculos.some(v => !conStop(v))) porque = "la vía preferente ya está libre" + (tenian.length ? " y nadie le queda por su derecha." : ".");
        else porque = tenian.length ? `${plural ? "ya no les queda" : "ya no le queda"} nadie por su derecha.` : `nadie se ${plural ? "les" : "le"} acerca por su derecha.`;
      }
      const derechas = stop && vehiculos.some(conStop) ? [] : g.map(v => { const d = vehiculos.find(x => x.desde === BRAZO[v.desde].derecha); return d && !pasados.has(d.letra) ? d.letra : null; }).filter(Boolean);
      pasos.push({
        texto: `${i === 0 ? "Primero" : i === grupos.length - 1 ? "Por último" : "Después"} ${plural ? "pasan " + lista(letras) + " a la vez (sus trayectorias no se cortan)" : "pasa " + letras[0]}: ${porque}`,
        cita: stop && vehiculos.some(conStop) ? CITA_56 : CITA_57,
        mover: g.map(v => ({ v: v.letra, hasta: 1 })), foco: letras, derechas
      });
      g.forEach(v => pasados.add(v.letra));
    });
    if (bloqueo) pasos.push({ texto: `${lista(bloqueo.map(v => v.letra))}: cada uno tiene a otro por su derecha, así que la regla de la derecha no resuelve quién sale primero.`, cita: CITA_57, mover: [], foco: bloqueo.map(v => v.letra) });
    return { pasos, grupos, bloqueo };
  }

  function cruce(datos, opciones = {}) {
    const svg = lienzo(400, 400, opciones.titulo || "Cruce de cuatro brazos");
    const capaFondo = s("g"), capaSenales = s("g"), capaIntencion = s("g"), capaFoco = s("g"), capaVeh = s("g");
    capaFondo.append(
      s("rect", { width: 400, height: 400, fill: ENTORNO }),
      s("rect", { x: 160, y: 0, width: 80, height: 400, fill: ASFALTO }),
      s("rect", { x: 0, y: 160, width: 400, height: 80, fill: ASFALTO }));
    svg.append(capaFondo, capaSenales, capaIntencion, capaFoco, capaVeh);
    const vehs = {}, tray = {};
    let actual = datos;

    function pintarSenales(stop) {
      capaSenales.replaceChildren();
      if (!stop) return;
      const linea = { S: [200, 246, 240, 246], N: [160, 154, 200, 154], E: [246, 160, 246, 200], O: [154, 200, 154, 240] };
      const poste = { S: [258, 270], N: [142, 130], E: [270, 142], O: [130, 258] };
      for (const b of stop) {
        const [x1, y1, x2, y2] = linea[b];
        capaSenales.append(s("line", { x1, y1, x2, y2, stroke: MARCA, "stroke-width": 6 }));
        const [px, py] = poste[b];
        if (opciones.imagenStop) capaSenales.append(s("image", { href: opciones.imagenStop, x: px - 15, y: py - 15, width: 30, height: 30 }));
        else capaSenales.append(s("polygon", { points: octogono(px, py, 14), fill: "#c8102e", stroke: "#fff", "stroke-width": 2 }));
      }
    }
    function montar(d) {
      actual = d;
      capaVeh.replaceChildren(); capaIntencion.replaceChildren(); capaFoco.replaceChildren();
      pintarSenales(d.stop);
      for (const v of d.vehiculos) {
        tray[v.letra] = trayectoCruce(v.desde, v.hacia);
        const g = coche(v.letra); vehs[v.letra] = g; capaVeh.append(g);
        const t = tray[v.letra];
        capaIntencion.append(flecha(intencion(t), COLOR[v.letra]));
        colocar(g, t.en(t.fr.espera));
        if (opciones.alTocar) { g.style.cursor = "pointer"; g.setAttribute("tabindex", "0"); g.setAttribute("role", "button"); g.setAttribute("aria-label", "Vehículo " + v.letra);
          g.addEventListener("click", () => opciones.alTocar(v.letra));
          g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); opciones.alTocar(v.letra); } }); }
      }
    }
    function intencion(t) {
      // Flecha corta desde la espera hasta la salida del cruce: la intención, no el orden.
      const pts = []; for (let f = t.fr.espera + .03; f <= Math.min(1, t.fr.espera + .45); f += .02) pts.push(t.en(f));
      return "M" + pts.map(p => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" L");
    }
    const escena = {
      svg,
      situar(v, f) {
        const t = tray[v]; if (!t) return;
        const fr = t.fr.espera + (1 - t.fr.espera) * f; colocar(vehs[v], t.en(fr));
        vehs[v].style.opacity = f >= 1 ? 0 : 1;
      },
      resaltar(p) {
        capaFoco.replaceChildren();
        capaIntencion.style.opacity = p ? .25 : 1;
        if (!p) return;
        (p.derechas || []).forEach(l => { const t = tray[l]; const q = t.en(t.fr.espera); capaFoco.append(s("circle", { cx: q.x, cy: q.y, r: 30, fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-dasharray": "5 5", class: "foco-giro" })); });
        (p.foco || []).forEach(l => { const g = vehs[l]; if (g) { g.classList.remove("latido"); void g.getBBox(); g.classList.add("latido"); } });
      },
      montar,
      datos: () => actual
    };
    montar(datos);
    escena.nuevoReproductor = () => {
      const { pasos } = datos.pasos ? { pasos: datos.pasos } : pasosCruce(actual.vehiculos, actual.stop);
      const ini = {}; actual.vehiculos.forEach(v => ini[v.letra] = 0);
      return reproductor(escena, pasos, ini);
    };
    return escena;
  }
  function octogono(cx, cy, r) {
    const p = []; for (let i = 0; i < 8; i++) { const a = (22.5 + 45 * i) * Math.PI / 180; p.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1)); }
    return p.join(" ");
  }

  // =====================================================================
  // ESCENA 2: GLORIETA (pasos escritos en los datos, con su cita)
  // =====================================================================
  function glorieta(datos, opciones = {}) {
    const svg = lienzo(400, 400, opciones.titulo || "Glorieta de cuatro brazos");
    const C = 200, R_EXT = 120, R_ISLA = 58, R_CARRIL = 90;
    svg.append(
      s("rect", { width: 400, height: 400, fill: ENTORNO }),
      s("rect", { x: 160, y: 0, width: 80, height: 400, fill: ASFALTO }),
      s("rect", { x: 0, y: 160, width: 400, height: 80, fill: ASFALTO }),
      s("circle", { cx: C, cy: C, r: R_EXT, fill: ASFALTO }),
      s("circle", { cx: C, cy: C, r: R_ISLA, fill: "#9cc58a", stroke: "#e6e1d6", "stroke-width": 5 }),
      ...["M200,0 L200,78", "M200,322 L200,400", "M0,200 L78,200", "M322,200 L400,200"].map(d => s("path", { d, stroke: MARCA, "stroke-width": 3, "stroke-dasharray": "14 10" })));
    // Trayectorias: con el eje y hacia abajo, "dejar el centro a la izquierda" es ir con el ángulo decreciendo.
    const T = {
      // Entra por el sur y sale por el norte.
      sur_norte: () => camino(220, 384).a(220, 336).marca("espera").curva(220, 296, C + R_CARRIL * Math.cos(Math.PI / 3), C + R_CARRIL * Math.sin(Math.PI / 3)).marca("dentro")
        .arco(C, C, R_CARRIL, 60, -60).curva(220, 108, 220, 80).marca("fuera").a(220, -40).fin(),
      // Ya dentro (lado oeste) y sale por el este.
      oeste_este: () => camino(C + R_CARRIL * Math.cos(170 * Math.PI / 180), C + R_CARRIL * Math.sin(170 * Math.PI / 180)).arco(C, C, R_CARRIL, 170, 30).marca("pasada")
        .curva(300, 226, 322, 220).a(440, 220).fin()
    };
    const vehs = {}, tray = {};
    const capaV = s("g"), capaFoco = s("g");
    svg.append(capaFoco, capaV);
    for (const v of datos.vehiculos) {
      tray[v.letra] = T[v.trayecto](); const g = coche(v.letra); vehs[v.letra] = g; capaV.append(g);
    }
    const escena = {
      svg,
      situar(v, f) { const t = tray[v]; const fr = typeof f === "string" ? t.fr[f] : f; colocar(vehs[v], t.en(fr)); vehs[v].style.opacity = fr >= 1 ? 0 : 1; },
      resaltar(p) {
        capaFoco.replaceChildren();
        if (p && p.flechaCentro) capaFoco.append(s("path", { d: "M236,262 A72 72 0 0 0 236,138", fill: "none", stroke: "#fff", "stroke-width": 3, "stroke-dasharray": "3 7", "stroke-linecap": "round" }),
          s("path", { d: "M226,131 L240,136 L231,148 Z", fill: "#fff" }),
          s("text", { x: 200, y: 205, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#1d3b12" }, "centro"), s("text", { x: 200, y: 221, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#1d3b12" }, "a la izquierda"));
        (p && p.foco || []).forEach(l => { const g = vehs[l]; g.classList.remove("latido"); void g.getBBox(); g.classList.add("latido"); });
      }
    };
    // Los pasos usan marcas con nombre ("espera", "dentro"...) que se traducen a fracciones.
    const fr = (v, m) => typeof m === "number" ? m : tray[v].fr[m];
    const ini = {}; datos.vehiculos.forEach(v => ini[v.letra] = fr(v.letra, v.inicio || 0));
    const pasos = datos.pasos.map(p => Object.assign({}, p, { mover: (p.mover || []).map(m => ({ v: m.v, hasta: fr(m.v, m.hasta) })) }));
    escena.nuevoReproductor = () => reproductor(escena, pasos, ini);
    escena.situarTodo = () => { for (const v in ini) escena.situar(v, ini[v]); };
    escena.situarTodo();
    return escena;
  }

  // =====================================================================
  // ESCENA 3: ADELANTAR A UN CICLISTA (manipulable)
  // Escala: carril de 3,5 m = 50 px.
  // =====================================================================
  function adelantamiento(datos, opciones = {}) {
    const PX = 50 / 3.5;
    const svg = lienzo(400, 230, "Adelantamiento a un ciclista en una carretera");
    const Y0 = 60, Y1 = 160, BICI_Y = Y1 - 10;
    const fondo = s("g"), capaMedida = s("g"), capaV = s("g");
    svg.append(fondo, capaV, capaMedida);
    function pintarVia(dos) {
      fondo.replaceChildren(
        s("rect", { width: 400, height: 230, fill: ENTORNO }),
        s("rect", { x: 0, y: Y0, width: 400, height: Y1 - Y0, fill: ASFALTO }),
        s("line", { x1: 0, y1: Y0 + 3, x2: 400, y2: Y0 + 3, stroke: MARCA, "stroke-width": 2 }),
        s("line", { x1: 0, y1: Y1 - 3, x2: 400, y2: Y1 - 3, stroke: MARCA, "stroke-width": 2 }),
        s("line", { x1: 0, y1: 110, x2: 400, y2: 110, stroke: MARCA, "stroke-width": 3, "stroke-dasharray": "18 14" }),
        s("text", { x: 8, y: Y0 - 8, "font-size": 12, "font-weight": 700, fill: "#2f4a22" }, dos ? "Carril izquierdo, mismo sentido →" : "← Carril contrario"),
        s("text", { x: 8, y: Y1 + 20, "font-size": 12, "font-weight": 700, fill: "#2f4a22" }, "Tu carril →"));
    }
    const bici = s("g", {},
      s("rect", { x: -16, y: -2, width: 32, height: 4, rx: 2, fill: "#20262e" }),
      s("circle", { cx: 0, cy: 0, r: 5.5, fill: "#2e9a4f", stroke: "#1b1b1b", "stroke-width": 1.2 }),
      s("rect", { x: -4, y: -4.5, width: 9, height: 9, rx: 3, fill: "#2e9a4f" }));
    const auto = s("g", {},
      s("rect", { x: -32, y: -13, width: 64, height: 26, rx: 7, fill: COLOR.A, stroke: "#1b1b1b", "stroke-width": 1.5 }),
      s("rect", { x: 10, y: -10, width: 12, height: 20, rx: 2, fill: "#20262e" }),
      s("rect", { x: -24, y: -10, width: 7, height: 20, rx: 2, fill: "#20262e" }));
    capaV.append(bici, auto);
    let estado = Object.assign({ separacion: 1.0, velocidad: 85, limite: 90, dosCarriles: false, revelado: false }, datos);
    const yCoche = () => BICI_Y - (0.3 + estado.separacion + 0.9) * PX;
    function medir(xBici) {
      if (!estado.revelado) { capaMedida.replaceChildren(); return; }
      const yc = yCoche(), borde = yc + 13, top = BICI_Y - 0.3 * PX;
      const ok = estado.dosCarriles ? borde <= 110 : estado.separacion >= 1.5;
      const col = ok ? "#12943f" : "#dc2f37";
      capaMedida.replaceChildren(
        s("line", { x1: xBici, y1: borde, x2: xBici, y2: top, stroke: "#fff", "stroke-width": 5 }),
        s("line", { x1: xBici, y1: borde, x2: xBici, y2: top, stroke: col, "stroke-width": 3 }),
        s("rect", { x: xBici + 8, y: (borde + top) / 2 - 11, width: 52, height: 22, rx: 11, fill: col }),
        s("text", { x: xBici + 34, y: (borde + top) / 2 + 5, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" }, estado.separacion.toFixed(1).replace(".", ",") + " m"));
    }
    function fotograma(t) {
      // t en [0,1): el coche alcanza, se abre, adelanta y vuelve; la bici avanza despacio.
      const xBici = 150 + 60 * t;
      const xCoche = -60 + 520 * t;
      bici.setAttribute("transform", `translate(${xBici} ${BICI_Y})`);
      const dx = xCoche - xBici;
      const apertura = dx < -150 ? 0 : dx < -80 ? (dx + 150) / 70 : dx < 80 ? 1 : dx < 150 ? 1 - (dx - 80) / 70 : 0;
      const yBase = 135, yAd = yCoche();
      const y = yBase + (yAd - yBase) * suave(apertura);
      auto.setAttribute("transform", `translate(${xCoche} ${y}) rotate(${apertura > 0 && apertura < 1 ? (dx < 0 ? -6 : 6) : 0})`);
      if (Math.abs(dx) < 50) medir(xBici); else if (Math.abs(dx) > 120) capaMedida.replaceChildren();
    }
    function estatico() { // fotograma fijo: antes de responder, el coche detrás; después, a la par del ciclista
      bici.setAttribute("transform", `translate(200 ${BICI_Y})`);
      if (!estado.revelado) { auto.setAttribute("transform", "translate(70 135)"); medir(200); return; }
      auto.setAttribute("transform", `translate(200 ${yCoche()})`);
      medir(200);
    }
    let corriendo = false, t0 = 0, visible = true;
    function bucle(ahora) {
      if (!corriendo) return;
      const t = ((ahora - t0) / 4200) % 1;
      fotograma(t); requestAnimationFrame(bucle);
    }
    const escena = {
      svg,
      fijar(cambios) { Object.assign(estado, cambios); pintarVia(estado.dosCarriles); if (!corriendo) estatico(); return escena.evaluar(); },
      evaluar() {
        const maxV = estado.limite - 20;
        const borde = yCoche() + 13;
        return {
          separacion: estado.separacion, velocidad: estado.velocidad, maxV,
          okSep: estado.dosCarriles ? borde <= 110 : estado.separacion >= 1.5,
          okVel: estado.velocidad <= maxV, dosCarriles: estado.dosCarriles
        };
      },
      iniciar() {
        if (MOV.matches || corriendo || !visible) return;
        corriendo = true; t0 = performance.now(); requestAnimationFrame(bucle);
      },
      parar() { corriendo = false; estatico(); },
      corriendo: () => corriendo
    };
    if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; if (!visible && corriendo) { corriendo = false; escena._pausada = true; } else if (visible && escena._pausada) { escena._pausada = false; escena.iniciar(); } }).observe(svg);
    pintarVia(estado.dosCarriles); estatico();
    return escena;
  }

  // =====================================================================
  // ESCENA 4: DISTANCIA DE DETENCIÓN (manipulable)
  // Reacción = v · t (t del manual de la DGT). Frenado = v² / (2·a), cálculo
  // físico orientativo: el manual no da cifras de frenado.
  // =====================================================================
  function detencion(datos, opciones = {}) {
    const svg = lienzo(400, 170, "Coche que frena ante un semáforo en rojo");
    const X0 = 34, ESC = 340 / 200; // 200 m en 340 px
    const DEC = { seco: 7, mojado: 4 };
    let est = Object.assign({ velocidad: 50, reaccion: 0.75, suelo: "seco", revelado: false }, datos);
    const capaVia = s("g"), capaBarras = s("g"), capaCoche = s("g");
    svg.append(capaVia, capaBarras, capaCoche);
    capaVia.append(s("rect", { width: 400, height: 170, fill: ENTORNO }), s("rect", { x: 0, y: 40, width: 400, height: 50, fill: ASFALTO, class: "asfalto" }),
      s("line", { x1: 0, y1: 44, x2: 400, y2: 44, stroke: MARCA, "stroke-width": 2 }), s("line", { x1: 0, y1: 86, x2: 400, y2: 86, stroke: MARCA, "stroke-width": 2 }));
    const brillo = s("rect", { x: 0, y: 40, width: 400, height: 50, fill: "#9fc3e6", opacity: 0 });
    capaVia.append(brillo);
    const regla = s("g");
    for (let m = 0; m <= 200; m += 50) regla.append(s("line", { x1: X0 + m * ESC, y1: 148, x2: X0 + m * ESC, y2: 154, stroke: "#2f4a22", "stroke-width": 1.5 }), s("text", { x: X0 + m * ESC, y: 166, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#2f4a22" }, m + " m"));
    capaVia.append(regla);
    const sem = s("g", { transform: "translate(392 14)" }, s("rect", { x: -7, y: 0, width: 14, height: 34, rx: 3, fill: "#1f2328" }), s("circle", { cx: 0, cy: 8, r: 4.5, fill: "#e0322b" }), s("circle", { cx: 0, cy: 18, r: 4.5, fill: "#3a2c0f" }), s("circle", { cx: 0, cy: 28, r: 4.5, fill: "#163a24" }));
    capaVia.append(sem);
    const coche_ = s("g", {}, s("rect", { x: -20, y: -9, width: 40, height: 18, rx: 5, fill: COLOR.B, stroke: "#1b1b1b", "stroke-width": 1.5 }), s("rect", { x: 6, y: -7, width: 8, height: 14, rx: 2, fill: "#20262e" }));
    capaCoche.append(coche_);
    const luzFreno = s("rect", { x: -22, y: -7, width: 3, height: 14, fill: "#ff3b3b", opacity: 0 }); coche_.append(luzFreno);
    const cartel = s("text", { x: X0, y: 30, "font-size": 12, "font-weight": 800, fill: "#1b2232" });
    capaCoche.append(cartel);
    const calc = () => {
      const v = est.velocidad / 3.6;
      const r = v * est.reaccion, f = v * v / (2 * DEC[est.suelo]);
      return { v, reaccion: r, frenado: f, total: r + f };
    };
    function barras() {
      capaBarras.replaceChildren();
      if (!est.revelado) return;
      const c = calc(), xr = X0 + c.reaccion * ESC, xf = X0 + Math.min(200, c.total) * ESC;
      capaBarras.append(
        s("rect", { x: X0, y: 104, width: Math.max(1, xr - X0), height: 16, rx: 3, fill: "#f5a000" }),
        s("rect", { x: xr, y: 104, width: Math.max(1, xf - xr), height: 16, rx: 3, fill: "#dc2f37" }),
        s("text", { x: X0, y: 136, "font-size": 11, "font-weight": 800, fill: "#7a4b00" }, "reacción " + fmt(c.reaccion) + " m"),
        s("text", { x: Math.min(366, Math.max(xr + 4, X0 + 100)), y: 136, "font-size": 11, "font-weight": 800, fill: "#a8222a", "text-anchor": "start" }, "frenado " + fmt(c.frenado) + " m"));
      if (c.total > 200) capaBarras.append(s("text", { x: 396, y: 117, "text-anchor": "end", "font-size": 11, "font-weight": 800, fill: "#fff" }, "+" + fmt(c.total - 200) + " m →"));
    }
    const fmt = n => n < 10 ? n.toFixed(1).replace(".", ",") : Math.round(n).toString();
    function situar(m) { coche_.setAttribute("transform", `translate(${X0 + Math.min(m, 205) * ESC - 20} 65)`); }
    let ficha = null;
    const escena = {
      svg,
      fijar(c) { Object.assign(est, c); brillo.setAttribute("opacity", est.suelo === "mojado" ? .45 : 0); barras(); if (!ficha || ficha.cancelada) { situar(0); cartel.textContent = ""; luzFreno.setAttribute("opacity", 0); } return calc(); },
      calc,
      async frenar() {
        if (ficha) ficha.cancelada = true;
        const f = ficha = { cancelada: false };
        const c = calc();
        const tR = est.reaccion, tF = c.v / DEC[est.suelo], total = tR + tF;
        const k = Math.min(1, 4.5 / total); // acelera el tiempo para que no dure más de 4,5 s
        luzFreno.setAttribute("opacity", 0);
        cartel.setAttribute("x", X0); cartel.textContent = "Ve el semáforo en rojo";
        await animar(tR * 1000 * k, t => situar(c.reaccion * t), f);
        if (f.cancelada) return;
        cartel.setAttribute("x", X0 + c.reaccion * ESC); cartel.textContent = "Pisa el freno";
        luzFreno.setAttribute("opacity", 1);
        await animar(tF * 1000 * k, t => situar(c.reaccion + c.frenado * (1 - (1 - t) * (1 - t))), f);
        if (f.cancelada) return;
        cartel.setAttribute("x", Math.min(300, X0 + c.total * ESC - 30)); cartel.textContent = "Parado";
      }
    };
    escena.fijar({});
    return escena;
  }

  window.Escenas = { cruce, glorieta, adelantamiento, detencion, ordenCruce, pasosCruce, trayectoCruce, reduceMovimiento: () => MOV.matches };
})();
