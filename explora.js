// «Explóralo»: escenas que se manipulan con deslizadores (velocidad, tiempo de reacción, separación,
// vía y vehículo). Datos en data/explora.js, generado desde preguntas/explora.json con
// tools/build_explora.mjs, que comprueba que cada cifra de este fichero aparece literal en su cita
// y que cada cita aparece literal en el BOE o en el manual de la DGT.
// - Solo se ve después de responder, al final de la explicación (no da pistas antes).
// - Se engancha envolviendo Escenas.enExplicacion (escenas.js), sin tocar app.js.
// - Con «reducir movimiento», los resultados cambian sin animación.
(function (raiz) {
  "use strict";
  const enNavegador = typeof document !== "undefined";

  // ===================================================================
  // Cifras: cada una sale de una cita (clave en EXPLORA.citas) y su texto literal debe aparecer en ella.
  // ===================================================================
  const CIFRAS = {
    reaccionTipica: { valor: 0.75, cita: "m-reaccion-075", literal: "0,75 segundos" },
    reaccionMin: { valor: 0.5, cita: "m-reaccion-rango", literal: "entre medio segundo y un segundo" },
    reaccionMax: { valor: 1, cita: "m-reaccion-rango", literal: "entre medio segundo y un segundo" },
    segundosMin: { valor: 2, cita: "m-dos-tres-seg", literal: "dos o tres segundos" },
    segundosMax: { valor: 3, cita: "m-dos-tres-seg", literal: "dos o tres segundos" },
    segundoExtra: { valor: 1, cita: "m-un-segundo-mas", literal: "un segundo más" },
    tunelMetros: { valor: 100, cita: "rgc-95.6", literal: "100 metros" },
    tunelSegundos: { valor: 4, cita: "rgc-95.6", literal: "cuatro segundos" },
    tunelPesadoMetros: { valor: 150, cita: "rgc-95.6-pesado", literal: "150 metros" },
    tunelPesadoSegundos: { valor: 6, cita: "rgc-95.6-pesado", literal: "seis segundos" },
    masaPesado: { valor: 3500, cita: "rgc-95.6-pesado", literal: "3.500 kilogramos" },
    separacion54: { valor: 50, cita: "rgc-54.2", literal: "50 metros" },
    masa54: { valor: 3500, cita: "rgc-54.2", literal: "3.500 kilogramos" },
    largo54: { valor: 10, cita: "rgc-54.2", literal: "10 metros" }
  };

  // Límites genéricos. Fuera de poblado, tabla del RGC 48.1.a (columna por grupo de vehículo; el script
  // la compara con la tabla del BOE y con las preguntas del banco). En poblado no dependen del vehículo.
  const GRUPOS = {
    turismo: { corto: "Turismo o moto", ejemplo: "también pick-up y autocaravana de hasta 3.500 kg", columna: "Turismos, motocicletas, autocaravanas de masa máxima autorizada igual o inferior a 3.500 kg, Pick-up", dibujo: "turismo" },
    autobus: { corto: "Autobús", ejemplo: "también derivado de turismo y mixto adaptable", columna: "Autobuses, vehículos derivados de turismo y vehículos mixtos adaptables", dibujo: "autobus" },
    camion: { corto: "Camión, furgoneta o con remolque", ejemplo: "también autocaravana de más de 3.500 kg y articulados", columna: "Camiones, tractocamiones, furgonetas, autocaravanas de masa máxima autorizada superior a 3.500 kg, vehículos articulados, automóviles con remolque y resto de vehículos", dibujo: "camion" }
  };
  const VIAS = {
    autopista: { corto: "Autopista o autovía", fila: "Autopista y autovía", cita: "rgc-48.1.a", valores: { turismo: 120, autobus: 100, camion: 90 } },
    convencional: { corto: "Carretera convencional", fila: "Convencional", cita: "rgc-48.1.a", valores: { turismo: 90, autobus: 90, camion: 80 } },
    travesia: { corto: "Travesía", cita: "rgc-50.5", valor: 50, literal: "50 km/h", poblado: true },
    autopistaPoblado: { corto: "Autopista o autovía dentro de poblado", cita: "rgc-50.6", valor: 80, literal: "80 km/h", poblado: true },
    urbana2: { corto: "Calle de dos o más carriles por sentido", cita: "rgc-50.1.c", valor: 50, literal: "50 km/h", poblado: true },
    urbana1: { corto: "Calle de un carril por sentido", cita: "rgc-50.1.b", valor: 30, literal: "30 km/h", poblado: true },
    plataforma: { corto: "Plataforma única (calzada y acera al mismo nivel)", cita: "rgc-50.1.a", valor: 20, literal: "20 km/h", poblado: true }
  };
  const limite = (via, grupo) => { const v = VIAS[via]; return v.valores ? v.valores[grupo] : v.valor; };

  // ===================================================================
  // Cálculos
  // ===================================================================
  const mps = kmh => kmh / 3.6;                                     // metros por segundo (aritmética)
  const metrosReaccion = (kmh, s) => mps(kmh) * s;                  // espacio sin frenar: velocidad × tiempo
  // El manual de la DGT no da metros de frenado: la barra roja es solo un dibujo que crece con la
  // velocidad (al cuadrado, como en física) y con los factores del manual. No se muestra ninguna cifra.
  const frenadoDibujo = (kmh, e) => mps(kmh) * mps(kmh) / 14 * (e.mojado ? 1.6 : 1) * (e.carga ? 1.25 : 1) * (e.frenos ? 1.35 : 1);
  function reglasSeguimiento(e) {
    const m = metrosReaccion(e.velocidad, e.segundos), pesado = e.vehiculo === "pesado";
    const minS = CIFRAS.segundosMin.valor + (e.lluvia ? CIFRAS.segundoExtra.valor : 0);
    const r = { metros: m, aconsejado: e.segundos >= minS, minS };
    if (e.tunel) {
      const tm = pesado ? CIFRAS.tunelPesadoMetros.valor : CIFRAS.tunelMetros.valor, ts = pesado ? CIFRAS.tunelPesadoSegundos.valor : CIFRAS.tunelSegundos.valor;
      r.tunel = { metros: tm, segundos: ts, cumple: m >= tm - 1e-9 || e.segundos >= ts };
    }
    if (e.unCarril && (pesado || e.vehiculo === "largo")) r.cincuenta = { cumple: m >= CIFRAS.separacion54.valor - 1e-9 };
    return r;
  }
  const ESTADO = {
    detencion: { velocidad: 50, reaccion: CIFRAS.reaccionTipica.valor, mojado: false, carga: false, frenos: false, frenado: false },
    seguimiento: { velocidad: 90, segundos: 2, lluvia: false, tunel: false, vehiculo: "turismo", unCarril: false, contado: false },
    limites: { vehiculo: "turismo", via: "autopista" }
  };
  // Valores derivados que se pueden pedir en un reto.
  const DERIVADOS = { seguimiento: { cumpleTunel: e => !!(reglasSeguimiento(e).tunel || {}).cumple, cumple50: e => !!(reglasSeguimiento(e).cincuenta || {}).cumple } };
  function cumpleReto(tipo, e, si) {
    for (const k in si) {
      const d = DERIVADOS[tipo] && DERIVADOS[tipo][k], v = d ? d(e) : e[k], q = si[k];
      if (q && typeof q === "object") { if ((q.min != null && !(v >= q.min - 1e-9)) || (q.max != null && !(v <= q.max + 1e-9))) return false; }
      else if (v !== q) return false;
    }
    return true;
  }
  // Citas que usa cada tipo (se muestran en «De dónde salen las cifras»).
  const CITAS_TIPO = {
    detencion: ["m-reaccion-075", "m-reaccion-rango", "m-reaccion-factores", "m-distancia-reaccion", "m-distancia-frenado", "m-frenado-velocidad", "m-frenado-mojado", "m-frenado-carga", "m-frenado-tecnicas", "m-detencion"],
    seguimiento: ["m-distancia-seguridad", "rgc-54.1", "m-dos-tres-seg", "m-un-segundo-mas", "m-mas-seguridad", "rgc-95.6", "rgc-95.6-pesado", "rgc-54.2-adelantar", "rgc-54.2", "rgc-54.3"],
    limites: ["rgc-48.1.a", "rgc-50.1.a", "rgc-50.1.b", "rgc-50.1.c", "rgc-50.4", "rgc-50.5", "rgc-50.6"]
  };

  const api = { CIFRAS, GRUPOS, VIAS, ESTADO, DERIVADOS, CITAS_TIPO, limite, metrosReaccion, reglasSeguimiento, cumpleReto };
  if (!enNavegador) { if (typeof module !== "undefined") module.exports = api; return; }

  // ===================================================================
  // Utilidades de dibujo e interfaz
  // ===================================================================
  const NS = "http://www.w3.org/2000/svg";
  const MOV = raiz.matchMedia ? raiz.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  function s(tag, at, ...hijos) {
    const e = document.createElementNS(NS, tag);
    for (const k in at || {}) if (at[k] != null) e.setAttribute(k, at[k]);
    for (const c of hijos.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  function el(tag, at, ...hijos) {
    const e = document.createElement(tag);
    for (const k in at || {}) { const v = at[k]; if (v == null || v === false) continue; if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? "" : v); }
    for (const c of hijos.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  const num = (n, dec = 1) => (Math.round(n * 10 ** dec) / 10 ** dec).toLocaleString("es-ES", { maximumFractionDigits: dec });
  const metros = n => num(n, 1);
  const segs = n => num(n, 2);
  const sonar = n => { try { raiz.Animo && raiz.Animo.sonar(n); } catch (e) { /* sin sonido */ } };
  const datos = () => raiz.EXPLORA || { citas: {}, explora: {} };
  const cita = k => datos().citas[k];
  const URL_MANUAL = "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf";
  const urlCita = c => c.norma === "RGC" ? `https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a${String(c.articulo).split(".")[0]}` : URL_MANUAL;
  const refCita = c => c.norma === "RGC" ? `RGC, art. ${c.articulo}` : `Manual DGT, ${c.articulo}`;
  const enlace = c => el("a", { class: "exp-ref", href: urlCita(c), target: "_blank", rel: "noopener" }, refCita(c));
  // Animación con requestAnimationFrame; con «reducir movimiento» salta al final.
  function animar(ms, cada, ficha) {
    if (MOV.matches || ms <= 0) { cada(1); return Promise.resolve(!ficha.cancelada); }
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
  // Coche visto desde arriba, mirando a la derecha (x crece). Mide 44 x 22 en unidades del dibujo.
  function coche(color, oscuro, escala = 1) {
    const g = s("g", { class: "exp-coche" });
    const c = s("g", { transform: `scale(${escala})` },
      s("rect", { x: -20, y: -9.5, width: 44, height: 22, rx: 7, class: "exp-sombra" }),
      s("rect", { x: -22, y: -11, width: 44, height: 22, rx: 7, fill: color, stroke: oscuro, "stroke-width": 1.5 }),
      s("rect", { x: 4, y: -8.5, width: 9, height: 17, rx: 3, class: "exp-cristal" }),
      s("rect", { x: -15, y: -8, width: 6, height: 16, rx: 2.5, class: "exp-cristal" }),
      s("rect", { x: 19, y: -9, width: 2.6, height: 5, rx: 1, class: "exp-faro" }), s("rect", { x: 19, y: 4, width: 2.6, height: 5, rx: 1, class: "exp-faro" }),
      s("rect", { x: -22.5, y: -9, width: 2.6, height: 5, rx: 1, class: "exp-freno" }), s("rect", { x: -22.5, y: 4, width: 2.6, height: 5, rx: 1, class: "exp-freno" }));
    g.append(c);
    return g;
  }
  function deslizador({ etiqueta, min, max, paso, valor, formato, voz, alCambiar, franja }) {
    const id = "exp-r" + Math.random().toString(36).slice(2, 8);
    const salida = el("output", { class: "exp-valor", for: id });
    const r = el("input", { type: "range", id, min, max, step: paso, value: valor, class: "exp-rango" });
    const pintar = () => {
      const v = +r.value, pct = (v - min) / (max - min) * 100;
      r.style.setProperty("--pct", pct + "%");
      salida.textContent = formato(v); r.setAttribute("aria-valuetext", voz ? voz(v) : formato(v));
    };
    r.addEventListener("input", () => { pintar(); alCambiar(+r.value); });
    let banda = null;
    if (franja) {
      const a = (franja[0] - min) / (max - min) * 100, b = (franja[1] - min) / (max - min) * 100;
      banda = el("div", { class: "exp-franja", "aria-hidden": "true" }, el("i", { style: `left:${a}%;width:${b - a}%` }), el("span", { style: `left:${(a + b) / 2}%` }, franja[2]));
    }
    pintar();
    const nodo = el("div", { class: "exp-control" }, el("div", { class: "exp-etq" }, el("label", { for: id }, etiqueta), salida), el("div", { class: "exp-pista" }, r, banda));
    nodo.poner = v => { r.value = v; pintar(); };
    return nodo;
  }
  function interruptor(texto, activo, alCambiar) {
    const b = el("button", { type: "button", class: "exp-chip", "aria-pressed": String(!!activo) }, el("span", { class: "exp-chip-punto", "aria-hidden": "true" }), texto);
    b.addEventListener("click", () => { const v = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(v)); sonar("toque"); alCambiar(v); });
    return b;
  }
  // Grupo de opciones excluyentes (radio con aspecto de segmentos).
  function segmentos(nombre, opciones, valor, alCambiar) {
    const grupo = el("div", { class: "exp-segmentos", role: "radiogroup", "aria-label": nombre });
    const botones = opciones.map(([v, texto, sub]) => {
      const b = el("button", { type: "button", role: "radio", class: "exp-seg", "aria-checked": String(v === valor), "data-v": v }, el("span", {}, texto), sub ? el("small", {}, sub) : null);
      b.addEventListener("click", () => { botones.forEach(x => x.setAttribute("aria-checked", String(x === b))); sonar("toque"); alCambiar(v); });
      return b;
    });
    grupo.append(...botones);
    grupo.addEventListener("keydown", ev => {
      const i = botones.findIndex(b => b.getAttribute("aria-checked") === "true"), d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[ev.key];
      if (d == null) return; ev.preventDefault(); const b = botones[(i + d + botones.length) % botones.length]; b.focus(); b.click();
    });
    return grupo;
  }
  function boton(texto, icono, alPulsar) {
    return el("button", { type: "button", class: "exp-btn", onclick: alPulsar }, el("span", { class: "exp-btn-ico", "aria-hidden": "true" }, icono), el("span", {}, texto));
  }
  // Fila de comprobación (✓ / ✗) con su cita corta.
  function fila(texto, ok, c) {
    return el("li", { class: "exp-fila " + (ok ? "si" : "no") }, el("span", { class: "exp-marca", "aria-hidden": "true" }, ok ? "✓" : "✗"),
      el("span", {}, el("span", { class: "exp-vo" }, ok ? "Cumple: " : "No cumple: "), texto, c ? el("small", {}, " · ", enlace(c)) : null));
  }

  // ===================================================================
  // 1. Distancia de detención: velocidad, tiempo de reacción y factores del frenado
  // ===================================================================
  function detencion(cfg, estado, alCambiar) {
    const e = estado, W = 400, X0 = 34, YV = 84;
    const svg = s("svg", { viewBox: `0 0 ${W} 150`, class: "exp-svg", role: "img" });
    const brillo = s("rect", { x: 0, y: 40, width: W, height: 60, class: "exp-mojado" });
    const lineas = s("g", { class: "exp-lineas" });
    for (let x = -20; x < W + 40; x += 40) lineas.append(s("rect", { x, y: 68.5, width: 20, height: 3, rx: 1.5, class: "exp-marca-via" }));
    svg.append(s("rect", { width: W, height: 150, class: "exp-cesped" }), s("rect", { x: 0, y: 40, width: W, height: 60, class: "exp-asfalto" }), brillo,
      s("rect", { x: 0, y: 43, width: W, height: 2.5, class: "exp-marca-via" }), s("rect", { x: 0, y: 94.5, width: W, height: 2.5, class: "exp-marca-via" }), lineas);
    const tramoR = s("rect", { y: 105, height: 12, rx: 4, class: "exp-tramo-r" }), tramoF = s("rect", { y: 105, height: 12, rx: 4, class: "exp-tramo-f" });
    const txtR = s("text", { y: 134, class: "exp-txt exp-txt-r" }), txtF = s("text", { y: 134, class: "exp-txt exp-txt-f" });
    const llave = s("path", { class: "exp-llave" });
    const sem = s("g", { class: "exp-semaforo" }, s("rect", { x: -7, y: -18, width: 14, height: 36, rx: 4, class: "exp-sem-caja" }),
      s("circle", { cx: 0, cy: -8, r: 4.6, class: "exp-sem-rojo" }), s("circle", { cx: 0, cy: 2, r: 4.6, class: "exp-sem-ambar" }), s("circle", { cx: 0, cy: 12, r: 4.6, class: "exp-sem-verde" }),
      s("rect", { x: -1.5, y: 18, width: 3, height: 4, class: "exp-poste" }));
    const auto = coche("#2f6fe0", "#1a46b0", .9), rastroR = s("rect", { y: YV - 4, height: 8, rx: 4, class: "exp-rastro-r" }), rastroF = s("rect", { y: YV - 4, height: 8, rx: 4, class: "exp-rastro-f" });
    const bocadillo = s("g", { class: "exp-bocadillo", opacity: 0 }, s("rect", { x: -62, y: -15, width: 124, height: 22, rx: 11 }), s("text", { x: 0, y: 0, "text-anchor": "middle" }));
    svg.append(tramoR, tramoF, txtR, txtF, llave, s("g", { transform: "translate(0 0)" }, sem), rastroR, rastroF, auto, bocadillo);
    let esc = 2, semX = W, ficha = { cancelada: true };
    const cuenta = () => { const r = metrosReaccion(e.velocidad, e.reaccion), f = frenadoDibujo(e.velocidad, e); return { r, f, t: r + f }; };
    const xDe = m => X0 + m * esc;
    function situarCoche(m, frena) { auto.setAttribute("transform", `translate(${xDe(m).toFixed(1)} ${YV})`); auto.classList.toggle("frenando", !!frena); }
    function decir(texto, m) {
      bocadillo.lastChild.textContent = texto;
      let x = Math.max(66, Math.min(W - 66, xDe(m))); if (Math.abs(x - semX) < 72) x = semX - 72 >= 66 ? semX - 72 : semX + 72;
      bocadillo.setAttribute("transform", `translate(${x} 28)`); bocadillo.setAttribute("opacity", texto ? 1 : 0);
    }
    function pintar() {
      const c = cuenta();
      esc = Math.min(2.4, (W - X0 - 46) / c.t);
      const xr = xDe(c.r), xf = xDe(c.t);
      tramoR.setAttribute("x", X0); tramoR.setAttribute("width", Math.max(2, xr - X0)); tramoF.setAttribute("x", xr); tramoF.setAttribute("width", Math.max(2, xf - xr));
      txtR.setAttribute("x", X0); txtR.textContent = `Reacción ${metros(c.r)} m`;
      const xt = Math.max(xr + 6, X0 + 104), fuera = xt + 112 > W;
      txtF.setAttribute("x", fuera ? W - 6 : xt); txtF.setAttribute("text-anchor", fuera ? "end" : "start");
      txtF.textContent = "Frenado (sin cifra)";
      llave.setAttribute("d", `M${X0} 100 v-4 H${xf} v4`);
      semX = Math.min(W - 12, xf + 26); sem.parentNode.setAttribute("transform", `translate(${semX.toFixed(1)} 20)`);
      brillo.classList.toggle("si", !!e.mojado);
      if (ficha.cancelada) { situarCoche(0, false); rastroR.setAttribute("width", 0); rastroF.setAttribute("width", 0); sem.classList.remove("rojo"); decir("", 0); }
      return c;
    }
    async function frenar() {
      ficha.cancelada = true; const f = ficha = { cancelada: false };
      const c = pintar(), tR = e.reaccion, tF = 2 * c.f / mps(e.velocidad), real = tR + tF;
      const k = Math.min(1, 4.2 / real); // a cámara rápida si dura mucho
      lento.textContent = k < 1 ? `Animación a cámara rápida (×${num(1 / k, 1)})` : "";
      rastroR.setAttribute("x", X0); rastroF.setAttribute("x", xDe(c.r)); rastroR.setAttribute("width", 0); rastroF.setAttribute("width", 0);
      sem.classList.add("rojo"); decir("¡Ve el semáforo en rojo!", 0); sonar("toque");
      let ok = await animar(tR * 1000 * k, t => { const m = c.r * t; situarCoche(m, false); rastroR.setAttribute("width", Math.max(0, xDe(m) - X0)); }, f);
      if (!ok) return;
      decir("Pisa el freno", c.r); sonar("toque");
      ok = await animar(tF * 1000 * k, t => { const m = c.r + c.f * (1 - (1 - t) * (1 - t)); situarCoche(m, true); rastroF.setAttribute("width", Math.max(0, xDe(m) - xDe(c.r))); }, f);
      if (!ok) return;
      decir("Parado", c.t);
      e.frenado = true; alCambiar();
    }
    const lento = el("p", { class: "exp-nota", "aria-live": "polite" });
    // Lecturas
    const lVel = el("strong"), lVelF = el("small"), lReac = el("strong"), lFormula = el("small"), lFren = el("small"), lDet = el("small");
    const lecturas = el("div", { class: "exp-lecturas" },
      el("div", { class: "exp-lectura vel" }, el("span", {}, "Cada segundo"), lVel, lVelF),
      el("div", { class: "exp-lectura reac" + (cfg.destacar === "reaccion" ? " foco" : "") }, el("span", {}, "Reacción"), lReac, lFormula),
      el("div", { class: "exp-lectura fren" + (cfg.destacar === "frenado" ? " foco" : "") }, el("span", {}, "Frenado"), el("strong", {}, "Sin cifra"), lFren),
      el("div", { class: "exp-lectura det" + (cfg.destacar === "detencion" ? " foco" : "") }, el("span", {}, "Detención"), el("strong", {}, "Reacción + frenado"), lDet));
    function leer() {
      const c = pintar();
      lVel.textContent = `${num(mps(e.velocidad), 1)} m`;
      lReac.textContent = `${metros(c.r)} m`;
      lVelF.textContent = `${e.velocidad} km/h ÷ 3,6`;
      lFormula.textContent = `${num(mps(e.velocidad), 1)} m/s × ${segs(e.reaccion)} s`;
      const por = ["con la velocidad"].concat(e.mojado ? ["suelo mojado"] : [], e.carga ? ["mucha carga"] : [], e.frenos ? ["frenos o neumáticos mal"] : []);
      lFren.textContent = "más largo " + por.join(", ");
      lDet.textContent = `${metros(c.r)} m + frenado`;
      svg.setAttribute("aria-label", `Coche a ${e.velocidad} km/h que frena ante un semáforo en rojo. Recorre ${metros(c.r)} metros mientras reacciona en ${segs(e.reaccion)} segundos y después frena.`);
    }
    const dVel = deslizador({ etiqueta: "Velocidad", min: 20, max: 130, paso: 10, valor: e.velocidad, formato: v => `${v} km/h`, voz: v => `${v} kilómetros por hora`,
      alCambiar: v => { e.velocidad = v; ficha.cancelada = true; leer(); alCambiar(); } });
    const fr = [CIFRAS.reaccionMin.valor, CIFRAS.reaccionMax.valor, "normal"];
    const dReac = deslizador({ etiqueta: "Tiempo de reacción", min: 0.25, max: 2.5, paso: 0.25, valor: e.reaccion, formato: v => `${segs(v)} s`, voz: v => `${segs(v)} segundos`, franja: fr,
      alCambiar: v => { e.reaccion = v; ficha.cancelada = true; leer(); alCambiar(); } });
    // 0,75 s está en la franja; el paso de 0,25 permite elegirlo exactamente.
    const chips = el("div", { class: "exp-chips" },
      interruptor("Suelo mojado", e.mojado, v => { e.mojado = v; ficha.cancelada = true; leer(); alCambiar(); }),
      interruptor("Mucha carga", e.carga, v => { e.carga = v; ficha.cancelada = true; leer(); alCambiar(); }),
      interruptor("Frenos o neumáticos en mal estado", e.frenos, v => { e.frenos = v; ficha.cancelada = true; leer(); alCambiar(); }));
    const lentos = el("p", { class: "exp-nota" }, "Tardan más en reaccionar quienes están cansados, tienen sueño, han tomado alcohol, drogas o algunos medicamentos, han comido mucho o van poco atentos. ", enlace(cita("m-reaccion-factores")));
    leer();
    return {
      nodo: [el("figure", { class: "exp-marco" }, svg), el("div", { class: "exp-acciones" }, boton("Frenar", "▶", frenar), lento), lecturas, dVel, dReac, lentos, chips,
        el("p", { class: "exp-nota" }, "La barra roja es solo un dibujo para comparar: el manual de la DGT explica de qué depende el frenado, pero no da metros. La reacción sí se calcula: velocidad × tiempo.")],
      parar() { ficha.cancelada = true; }
    };
  }

  // ===================================================================
  // 2. Distancia con el de delante: regla de los segundos, túneles y 50 metros
  // ===================================================================
  function seguimiento(cfg, estado, alCambiar) {
    const e = estado, W = 400, Y1 = 84;
    const svg = s("svg", { viewBox: `0 0 ${W} 150`, class: "exp-svg", role: "img" });
    const cielo = s("rect", { width: W, height: 150, class: "exp-cesped" });
    const via = s("rect", { x: 0, y: 56, width: W, height: 56, class: "exp-asfalto" });
    const lineas = s("g", { class: "exp-lineas" });
    for (let x = -40; x < W + 80; x += 40) lineas.append(s("rect", { x, y: 58.5, width: 20, height: 2.5, rx: 1.2, class: "exp-marca-via" }));
    const tunel = s("g", { class: "exp-tunel" }, s("rect", { x: 0, y: 0, width: W, height: 52, class: "exp-tunel-techo" }), s("rect", { x: 0, y: 116, width: W, height: 34, class: "exp-tunel-techo" }));
    const lluvia = s("g", { class: "exp-lluvia" });
    for (let i = 0; i < 46; i++) lluvia.append(s("line", { x1: (i * 53) % W, y1: (i * 37) % 150, x2: (i * 53) % W - 4, y2: (i * 37) % 150 + 10 }));
    const farola = s("g", { class: "exp-farola" }, s("rect", { x: -2, y: -44, width: 4, height: 44, class: "exp-poste" }), s("rect", { x: -9, y: -48, width: 14, height: 5, rx: 2.5, class: "exp-poste" }), s("circle", { cx: 0, cy: 0, r: 4, class: "exp-poste" }));
    const yo = coche("#e5484d", "#b4232b", .9), otro = coche("#f2a516", "#b47400", .9);
    const hueco = s("rect", { y: Y1 - 3, height: 6, rx: 3, class: "exp-hueco" });
    const txtH = s("text", { y: 136, class: "exp-txt", "text-anchor": "middle" });
    const contador = s("text", { x: W / 2, y: 36, class: "exp-contador", "text-anchor": "middle" });
    svg.append(cielo, via, lineas, hueco, s("g", { class: "exp-farola-capa" }, farola), yo, otro, tunel, lluvia, txtH, contador);
    const XY = 48; let xOtro = 0, ficha = { cancelada: true };
    function pintar() {
      const r = reglasSeguimiento(e), px = Math.max(40, Math.min(W - XY - 84, r.metros * Math.min(3.4, (W - XY - 84) / r.metros)));
      xOtro = XY + 40 + px;
      yo.setAttribute("transform", `translate(${XY} ${Y1})`); otro.setAttribute("transform", `translate(${xOtro.toFixed(1)} ${Y1})`);
      hueco.setAttribute("x", XY + 20); hueco.setAttribute("width", Math.max(0, xOtro - XY - 40));
      txtH.setAttribute("x", (XY + 20 + xOtro - 20) / 2); txtH.textContent = `${metros(r.metros)} m · ${segs(e.segundos)} s`;
      hueco.classList.toggle("mal", !r.aconsejado || !!(r.tunel && !r.tunel.cumple) || !!(r.cincuenta && !r.cincuenta.cumple));
      tunel.classList.toggle("si", !!e.tunel); lluvia.classList.toggle("si", !!e.lluvia);
      if (ficha.cancelada) { farola.setAttribute("transform", `translate(${W + 30} 56)`); contador.textContent = ""; }
      svg.setAttribute("aria-label", `Usted (rojo) circula a ${e.velocidad} km/h detrás de otro coche, con ${segs(e.segundos)} segundos de separación, que son ${metros(r.metros)} metros.`);
      return r;
    }
    // Cuenta los segundos: la farola pasa por la trasera del de delante y luego llega a usted. Tiempo real.
    async function contar() {
      ficha.cancelada = true; const f = ficha = { cancelada: false };
      pintar();
      const a = xOtro - 20, b = XY + 20, ini = a + 56, vel = (a - b) / e.segundos; // px por segundo reales: tarda los segundos de verdad
      let n = -1;
      const recorrer = (desde, hasta, alPaso) => animar(Math.abs(desde - hasta) / vel * 1000, t => { const x = desde + (hasta - desde) * t; farola.setAttribute("transform", `translate(${x.toFixed(1)} 56)`); lineas.setAttribute("transform", `translate(${(-(ini - x) % 40).toFixed(1)} 0)`); if (alPaso) alPaso(t); }, f);
      contador.textContent = "";
      let ok = await recorrer(ini, a);
      if (!ok) return;
      sonar("toque"); contador.textContent = "0";
      ok = await recorrer(a, b, t => { const k = Math.floor(t * e.segundos + 1e-6); if (k !== n && t < 1) { n = k; contador.textContent = k === 0 ? "0" : `${k}…`; if (k > 0) sonar("toque"); } });
      if (!ok) return;
      contador.textContent = `${segs(e.segundos)} s`;
      e.contado = true; comprobar(); alCambiar(); // la farola y la cuenta se quedan a la vista hasta el próximo cambio
    }
    const lista = el("ul", { class: "exp-filas", "aria-live": "polite" });
    const metrosTxt = el("strong"), metrosForm = el("small");
    function comprobar() {
      const r = pintar(), filas = [];
      metrosTxt.textContent = `${metros(r.metros)} m`; metrosForm.textContent = `${e.velocidad} km/h ÷ 3,6 = ${num(mps(e.velocidad), 1)} m/s, × ${segs(e.segundos)} s`;
      filas.push(fila(e.lluvia ? `Con lluvia, nieve, niebla o de noche: al menos un segundo más (${r.minS} s o más)` : "Lo aconsejable: dos o tres segundos", r.aconsejado, cita(e.lluvia ? "m-un-segundo-mas" : "m-dos-tres-seg")));
      if (r.tunel) filas.push(fila(e.vehiculo === "pesado" ? "En un túnel, con más de 3.500 kg: al menos 150 metros o seis segundos" : "En un túnel: al menos 100 metros o cuatro segundos" + (e.vehiculo === "largo" ? " (si su masa máxima no pasa de 3.500 kg)" : ""), r.tunel.cumple, cita(e.vehiculo === "pesado" ? "rgc-95.6-pesado" : "rgc-95.6")));
      if (r.cincuenta) filas.push(fila(`${e.vehiculo === "pesado" ? "Más de 3.500 kg" : "Conjunto de más de 10 metros"} sin ir a adelantar, en carretera de un carril por sentido donde se puede adelantar: al menos 50 metros`, r.cincuenta.cumple, cita("rgc-54.2")));
      lista.replaceChildren(...filas);
    }
    const dVel = deslizador({ etiqueta: "Velocidad", min: 30, max: 130, paso: 10, valor: e.velocidad, formato: v => `${v} km/h`, voz: v => `${v} kilómetros por hora`, alCambiar: v => { e.velocidad = v; ficha.cancelada = true; comprobar(); alCambiar(); } });
    const dSeg = deslizador({ etiqueta: "Separación", min: 0.5, max: 7, paso: 0.5, valor: e.segundos, formato: v => `${segs(v)} s`, voz: v => `${segs(v)} segundos`, franja: [CIFRAS.segundosMin.valor, CIFRAS.segundosMax.valor, "aconsejable"],
      alCambiar: v => { e.segundos = v; e.contado = false; ficha.cancelada = true; comprobar(); alCambiar(); } });
    const veh = segmentos("Su vehículo", [["turismo", "Turismo"], ["pesado", "Más de 3.500 kg", "camión, autobús…"], ["largo", "Más de 10 m", "turismo con caravana…"]], e.vehiculo,
      v => { e.vehiculo = v; ficha.cancelada = true; comprobar(); alCambiar(); });
    const chips = el("div", { class: "exp-chips" },
      interruptor("Lluvia, nieve, niebla o noche", e.lluvia, v => { e.lluvia = v; ficha.cancelada = true; comprobar(); alCambiar(); }),
      interruptor("Dentro de un túnel", e.tunel, v => { e.tunel = v; ficha.cancelada = true; comprobar(); alCambiar(); }),
      interruptor("Fuera de poblado, un carril por sentido y se puede adelantar", e.unCarril, v => { e.unCarril = v; ficha.cancelada = true; comprobar(); alCambiar(); }));
    comprobar();
    return {
      nodo: [el("figure", { class: "exp-marco" }, svg), el("div", { class: "exp-acciones" }, boton("Contar los segundos", "▶", contar),
        el("p", { class: "exp-nota" }, "Elige un punto fijo, como una farola: cuando el de delante pase por él, cuenta hasta que llegues tú.")),
        el("div", { class: "exp-lecturas dos" }, el("div", { class: "exp-lectura vel" }, el("span", {}, "Hueco en metros"), metrosTxt, metrosForm)),
        dVel, dSeg, el("p", { class: "exp-subtitulo" }, "Su vehículo"), veh, chips, lista,
        el("p", { class: "exp-nota" }, "Además del tiempo, el hueco debe dejarte parar si el de delante frena de golpe. ", enlace(cita("rgc-54.1")))],
      parar() { ficha.cancelada = true; }
    };
  }

  // ===================================================================
  // 3. Límites genéricos de velocidad: elige vía y vehículo
  // ===================================================================
  function limites(cfg, estado, alCambiar) {
    const e = estado, R = 84, CX = 110, CY = 104, MAX = 140, A0 = -210, A1 = 30; // aguja de -210° (0) a 30° (140)
    const ang = v => A0 + (A1 - A0) * v / MAX, punto = (a, r) => [CX + r * Math.cos(a * Math.PI / 180), CY + r * Math.sin(a * Math.PI / 180)];
    const svg = s("svg", { viewBox: "0 0 360 170", class: "exp-svg", role: "img" });
    const [ax, ay] = punto(A0, R), [bx, by] = punto(A1, R);
    svg.append(s("path", { d: `M${ax} ${ay} A${R} ${R} 0 1 1 ${bx} ${by}`, class: "exp-esfera" }));
    const arco = s("path", { class: "exp-esfera-llena" }); svg.append(arco);
    for (let v = 0; v <= MAX; v += 10) {
      const [x1, y1] = punto(ang(v), R - 12), [x2, y2] = punto(ang(v), R - (v % 20 ? 18 : 22));
      svg.append(s("line", { x1, y1, x2, y2, class: "exp-marca-esfera" + (v % 20 ? " fina" : "") }));
      if (!(v % 20)) { const [tx, ty] = punto(ang(v), R - 34); svg.append(s("text", { x: tx, y: ty + 4, class: "exp-num-esfera", "text-anchor": "middle" }, v)); }
    }
    const aguja = s("g", { class: "exp-aguja" }, s("path", { d: `M-4 0 L0 ${-(R - 16)} L4 0 Z` }), s("circle", { r: 7 }));
    const lectura = s("text", { x: CX, y: CY + 40, class: "exp-num-grande", "text-anchor": "middle" });
    const senal = s("g", { transform: "translate(268 90)", class: "exp-senal" }, s("circle", { r: 54, class: "exp-senal-borde" }), s("circle", { r: 40, class: "exp-senal-fondo" }), s("text", { y: 13, "text-anchor": "middle" }));
    svg.append(aguja, lectura, senal);
    let actual = 0, ficha = { cancelada: true };
    function arcoHasta(v) {
      const [x, y] = punto(ang(v), R); arco.setAttribute("d", v <= 0 ? "" : `M${ax} ${ay} A${R} ${R} 0 ${ang(v) - A0 > 180 ? 1 : 0} 1 ${x} ${y}`);
      aguja.setAttribute("transform", `translate(${CX} ${CY}) rotate(${ang(v) + 90})`); lectura.textContent = Math.round(v);
    }
    const sobre = el("div", { class: "exp-limite-cita", "aria-live": "polite" });
    async function pintar(animado) {
      const v = limite(e.via, e.vehiculo), via = VIAS[e.via], g = GRUPOS[e.vehiculo];
      senal.lastChild.textContent = v; senal.classList.remove("pop"); void senal.getBoundingClientRect(); senal.classList.add("pop");
      svg.setAttribute("aria-label", `Velocidad máxima genérica: ${v} kilómetros por hora.`);
      vehiculos.classList.toggle("apagado", !!via.poblado);
      const c = cita(via.cita);
      sobre.replaceChildren(...[
        el("p", { class: "exp-limite-txt" }, el("strong", {}, `${v} km/h`), " · ", via.corto, via.poblado ? " (para todo tipo de vehículos)" : ` · ${g.corto.toLowerCase()}`),
        via.valores
          ? el("blockquote", { class: "exp-cita" }, `Tabla del artículo: columna «${g.columna}», fila «${via.fila}»: ${v}. `, enlace(c))
          : el("blockquote", { class: "exp-cita" }, `«${c.texto}» `, enlace(c)),
        e.via === "urbana2" || e.via === "travesia" ? el("p", { class: "exp-nota" }, "Si transporta mercancías peligrosas, como máximo 40 km/h. ", enlace(cita("rgc-50.4"))) : null].filter(Boolean));
      ficha.cancelada = true; const f = ficha = { cancelada: false }, desde = actual;
      actual = v;
      await animar(animado ? 700 : 0, t => { const k = 1 - Math.pow(1 - t, 3) * Math.cos(t * 4.2) ; arcoHasta(desde + (v - desde) * Math.min(1.06, k)); }, f);
      if (!f.cancelada) arcoHasta(v);
    }
    const vehiculos = segmentos("Vehículo", Object.entries(GRUPOS).map(([k, g]) => [k, g.corto, g.ejemplo]), e.vehiculo, v => { e.vehiculo = v; pintar(true); alCambiar(); });
    const vias = segmentos("Vía", Object.entries(VIAS).map(([k, v]) => [k, v.corto, k === "autopista" || k === "convencional" ? "fuera de poblado" : null]), e.via, v => { e.via = v; pintar(true); alCambiar(); });
    vias.classList.add("vias");
    arcoHasta(0); requestAnimationFrame(() => pintar(true));
    return {
      nodo: [el("figure", { class: "exp-marco limites" }, svg), sobre, el("p", { class: "exp-subtitulo" }, "Vía"), vias, el("p", { class: "exp-subtitulo" }, "Vehículo"), vehiculos,
        el("p", { class: "exp-nota" }, "Son los límites genéricos: si una señal marca otra velocidad, manda la señal.")],
      parar() { ficha.cancelada = true; }
    };
  }

  const TIPOS = { detencion, seguimiento, limites };
  // Monta el bloque «Explóralo» para una pregunta.
  function bloque(id) {
    const cfg = datos().explora[id];
    if (!cfg || !TIPOS[cfg.tipo]) return null;
    const estado = Object.assign({}, ESTADO[cfg.tipo], cfg.inicial || {});
    let hecho = false;
    const reto = cfg.reto ? el("div", { class: "exp-reto", "aria-live": "polite" }, el("span", { class: "exp-reto-ico", "aria-hidden": "true" }, "🎯"), el("p", {}, cfg.reto.texto)) : null;
    const comprobarReto = () => {
      if (!reto || hecho || !cumpleReto(cfg.tipo, estado, cfg.reto.si)) return;
      hecho = true; reto.classList.add("hecho"); reto.firstChild.textContent = "✓";
      reto.lastChild.append(el("strong", {}, " ¡Bien visto!")); sonar("acierto");
    };
    const parte = TIPOS[cfg.tipo](cfg, estado, comprobarReto);
    const fuentes = el("details", { class: "exp-fuentes" }, el("summary", {}, "De dónde salen las cifras"),
      el("ul", {}, CITAS_TIPO[cfg.tipo].map(cita).filter(Boolean).map(c => el("li", {}, c.tabla ? "Tabla de velocidades máximas fuera de poblado. " : `«${c.texto}» `, enlace(c)))));
    const raizUI = el("section", { class: "exp", "aria-label": "Explóralo: " + cfg.titulo },
      el("div", { class: "exp-cab" }, el("span", { class: "exp-etiqueta" }, "Explóralo"), el("h3", { class: "exp-titulo" }, cfg.titulo)),
      reto, parte.nodo, fuentes);
    comprobarReto();
    raizUI._parar = parte.parar;
    return raizUI;
  }
  function enExplicacion(nodo, p) {
    if (!nodo || !datos().explora[p.id]) return;
    const cuerpo = nodo.querySelector(".explicacion-cuerpo") || nodo;
    try { const b = bloque(p.id); if (b) cuerpo.append(b); } catch (err) { console.error("Explóralo", p.id, err); }
  }
  // Se engancha detrás de la escena animada (si la hay), sin tocar app.js.
  function enganchar() {
    const E = raiz.Escenas;
    if (E && typeof E.enExplicacion === "function" && !E.enExplicacion._explora) {
      const original = E.enExplicacion;
      E.enExplicacion = function (nodo, p) { original.apply(this, arguments); enExplicacion(nodo, p); };
      E.enExplicacion._explora = true;
    } else if (!E) raiz.Escenas = { enExplicacion: Object.assign((nodo, p) => enExplicacion(nodo, p), { _explora: true }), figura: () => null };
    const A = raiz.App; if (!A || !A.ruta) return;
    // #/explora: practica solo las preguntas con «Explóralo» (para probarlas).
    A.ruta("explora", () => {
      const ids = Object.keys(datos().explora).filter(id => A.POR_ID.has(id));
      if (!ids.length) return false;
      A.practicar(ids.map(id => A.POR_ID.get(id)), "temario", "Explóralo", "#/");
    });
  }
  Object.assign(api, { bloque, enExplicacion });
  raiz.Explora = api;
  enganchar();
})(typeof window !== "undefined" ? window : globalThis);
