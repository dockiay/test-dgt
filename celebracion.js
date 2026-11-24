/* Celebración al terminar una lección o un examen.
   Secuencia de recompensa en pantallas cortas, cada una con su «Continuar»:
     1. El coche entra, salta y suena la fanfarria; título y tres cifras que aparecen una a una y suben
        contando (aciertos, precisión y tiempo).
     2. Si la racha ha subido o se acaba de cumplir el objetivo del día: llama grande, el número cambia
        al nuevo y el día de hoy se rellena en la semana.
     3. Si hay logros o coronas nuevos en esta sesión: medallas que aparecen una a una.
   Al cerrar queda la pantalla de resultado de siempre (con la corrección).
   Respeta «reducir movimiento» (sin desplazamientos ni confeti, cifras directas) y el botón de sonido.
   Depende de animo.js (window.Animo) y app.js (window.App); los logros salen de camino.js si está. */
(function () {
  "use strict";
  const A = window.App, An = window.Animo;
  if (!A || !An) return;
  const { h, ico, plural, mmss } = A;
  const sinMovimiento = () => An.sinMovimiento();
  const sonar = (n, x) => An.sonar(n, x);

  // ---------- Foto al empezar la sesión ----------
  let foto = null;
  function empezar() {
    const r = An.racha();
    foto = { t: Date.now(), racha: r.dias, hoy: r.hoy, objetivo: r.objetivo, logros: new Set(Object.keys((A.datos && A.datos.logros) || {})) };
  }

  // ---------- Textos ----------
  function nivel(pct) {
    if (pct === 100) return "Perfecto";
    if (pct >= 90) return "Excelente";
    if (pct >= 80) return "Muy bien";
    if (pct >= 60) return "Bien";
    return "En marcha";
  }
  function textos(x) {
    if (x.tipo === "examen") {
      if (x.apto) return { titulo: "¡Apto!", frase: x.fallos === 0 ? "Sin un solo fallo. Así se aprueba." : `Aprobado con ${plural(x.fallos, "fallo", "fallos")}. Así se aprueba el examen de verdad.`, humor: x.fallos === 0 ? "perfecto" : "feliz" };
      return { titulo: "Examen terminado", frase: "Cada fallo es una pregunta que ya no se te escapará: están en tu repaso.", humor: "animo" };
    }
    const pct = x.pct;
    if (!x.completa) return { titulo: "¡Buen rato de estudio!", frase: `${plural(x.hechas, "pregunta", "preguntas")} más en el bolsillo.`, humor: pct >= 70 ? "feliz" : "animo" };
    if (pct === 100) return { titulo: "¡Lección perfecta!", frase: "Ni un fallo. Así se llega al examen.", humor: "perfecto" };
    if (pct >= 90) return { titulo: "¡Lección completada!", frase: "Esto ya es nivel de examen.", humor: "feliz" };
    if (pct >= 70) return { titulo: "¡Lección completada!", frase: "Vas por muy buen camino.", humor: "feliz" };
    return { titulo: "¡Lección completada!", frase: "Lo que has fallado ya está en tu repaso: así se aprende.", humor: "animo" };
  }

  // ---------- Dibujos (originales del proyecto) ----------
  const NS = "http://www.w3.org/2000/svg";
  function svg(marcado, clase) {
    const t = document.createElement("template");
    t.innerHTML = `<svg xmlns="${NS}" class="${clase}" aria-hidden="true" focusable="false">${marcado}</svg>`;
    return t.content.firstChild;
  }
  // El coche de la autoescuela: carrocería redondeada, ojos en el parabrisas y ruedas que giran.
  function coche(humor) {
    const boca = humor === "animo" ? `<path d="M74 63q6 4 12 0" class="c-boca"/>` : `<path d="M71 61q9 9 18 0" class="c-boca"/>`;
    const s = svg(`
      <g class="c-sombra"><ellipse cx="80" cy="113" rx="54" ry="6"/></g>
      <g class="c-salta"><g class="c-cuerpo">
        <path class="c-carroceria" d="M22 86c0-12 7-19 19-21l14-22c3-5 8-8 14-8h26c6 0 11 3 14 8l12 21c14 1 21 9 21 22v6c0 4-3 7-7 7H29c-4 0-7-3-7-7z"/>
        <path class="c-cristal" d="M60 46c2-3 4-4 8-4h24c4 0 6 1 8 4l10 19H50z"/>
        <path class="c-brillo" d="M62 49l-6 11h8l8-14h-7c-1 0-2 1-3 3z"/>
        <circle class="c-ojo" cx="68" cy="54" r="5.5"/><circle class="c-ojo" cx="92" cy="54" r="5.5"/>
        <circle class="c-pupila" cx="69.5" cy="55" r="2.6"/><circle class="c-pupila" cx="93.5" cy="55" r="2.6"/>
        ${boca}
        <rect class="c-faro" x="122" y="76" width="12" height="7" rx="3.5"/>
        <rect class="c-piloto" x="24" y="76" width="9" height="7" rx="3.5"/>
        <rect class="c-placa" x="62" y="84" width="36" height="11" rx="3"/>
        <text class="c-l" x="80" y="92.6" text-anchor="middle">L</text>
        <path class="c-moflete" d="M58 63h.1M102 63h.1"/>
      </g>
      <g class="c-rueda" style="transform-origin:48px 101px"><circle cx="48" cy="101" r="12"/><path d="M48 92v18M39 101h18"/></g>
      <g class="c-rueda" style="transform-origin:112px 101px"><circle cx="112" cy="101" r="12"/><path d="M112 92v18M103 101h18"/></g>
      </g>
      <g class="c-humo"><circle cx="12" cy="98" r="5"/><circle cx="4" cy="92" r="3.5"/></g>`, "coche humor-" + humor);
    s.setAttribute("viewBox", "0 0 160 122");
    return s;
  }
  function destellos() {
    const s = svg(Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2, x = 50 + Math.cos(a) * 44, y = 50 + Math.sin(a) * 40;
      return `<path class="d" style="--i:${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" d="M0-6l1.6 4.4L6 0l-4.4 1.6L0 6l-1.6-4.4L-6 0l4.4-1.6z"/>`;
    }).join(""), "destellos");
    s.setAttribute("viewBox", "0 0 100 100");
    return s;
  }
  const DIANA = "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM12 12.1v-.2";
  function icono(nombre) {
    if (nombre !== "diana") return ico(nombre);
    const s = svg(`<path d="${DIANA}"/>`, "ico"); s.setAttribute("viewBox", "0 0 24 24"); return s;
  }

  // ---------- Contador con tictac ----------
  function contar(el, hasta, formato, ms, alFinal) {
    if (sinMovimiento() || hasta <= 0) { el.textContent = formato(hasta); if (alFinal) alFinal(); return () => {}; }
    let ultimo = -1, ultimoTic = 0, vivo = true;
    const t0 = performance.now();
    (function paso(t) {
      if (!vivo) return;
      const k = Math.min(1, (t - t0) / ms), v = Math.round(hasta * (1 - Math.pow(1 - k, 3)));
      if (v !== ultimo) { el.textContent = formato(v); ultimo = v; if (t - ultimoTic > 55 && k < 1) { sonar("tic", k); ultimoTic = t; } }
      if (k < 1) requestAnimationFrame(paso); else if (alFinal) alFinal();
    })(t0);
    return () => { vivo = false; el.textContent = formato(hasta); };
  }

  // ---------- Capa ----------
  let capa = null, temporizadores = [], paradas = [];
  const despues = (ms, fn) => temporizadores.push(setTimeout(fn, sinMovimiento() ? Math.min(ms, 60) : ms));
  function limpiarTiempos() { temporizadores.forEach(clearTimeout); temporizadores = []; paradas.forEach(f => f()); paradas = []; }
  function cerrar() {
    if (!capa) return;
    limpiarTiempos();
    const c = capa; capa = null;
    document.body.classList.remove("celebrando");
    window.removeEventListener("keydown", teclas, true);
    window.removeEventListener("hashchange", cerrar);
    c.classList.add("saliendo");
    setTimeout(() => c.remove(), sinMovimiento() ? 0 : 260);
    const app = document.getElementById("app"); if (app) app.focus({ preventScroll: true });
  }
  function teclas(e) {
    if (!capa) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); cerrar(); return; }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); e.stopPropagation();
      const b = capa.querySelector(".celebra-pie .boton"); if (b) b.click();
      return;
    }
    // El resto de atajos de la web (A, B, C…) no deben llegar a la pantalla de debajo.
    if (e.key !== "Tab") e.stopPropagation();
  }

  // Cada paso devuelve { nodo, animar() }.
  function pasoResumen(x) {
    const t = textos(x);
    const pct = x.hechas ? Math.round(x.aciertos / x.hechas * 100) : 0;
    const cifras = x.tipo === "examen"
      ? [{ c: "verde", ic: "check", cab: "Aciertos", v: x.aciertos, f: v => `${v}/${x.hechas}`, aria: `${x.aciertos} aciertos de ${x.hechas}` },
         { c: x.apto ? "ambar" : "naranja", ic: "diana", cab: x.apto ? nivel(pct) : "Fallos", v: x.apto ? pct : x.fallos, f: x.apto ? (v => `${v} %`) : (v => String(v)), aria: x.apto ? `Precisión: ${pct} %` : `${x.fallos} fallos, el máximo es ${x.max}` },
         { c: "azul", ic: "reloj", cab: "Tiempo", v: x.segundos, f: mmss, aria: `Tiempo: ${mmss(x.segundos)}` }]
      : [{ c: "verde", ic: "check", cab: "Aciertos", v: x.aciertos, f: v => String(v), aria: `${x.aciertos} aciertos de ${x.hechas}` },
         { c: "ambar", ic: "diana", cab: nivel(pct), v: pct, f: v => `${v} %`, aria: `Precisión: ${pct} %, ${nivel(pct).toLowerCase()}` },
         { c: "azul", ic: "reloj", cab: "Tiempo", v: x.segundos, f: mmss, aria: `Tiempo: ${mmss(x.segundos)}` }];
    const valores = [];
    const teselas = cifras.map((c, i) => {
      const val = h("span", { class: "cel-valor" }, c.f(0));
      valores.push(val);
      return h("div", { class: "cel-cifra c-" + c.c, style: `--i:${i}`, role: "group", "aria-label": c.aria },
        h("span", { class: "cel-cabecera", "aria-hidden": "true" }, c.cab),
        h("span", { class: "cel-cuerpo", "aria-hidden": "true" }, icono(c.ic), val));
    });
    const heroe = h("div", { class: "cel-heroe humor-" + t.humor }, h("div", { class: "cel-rayos", "aria-hidden": "true" }), coche(t.humor), t.humor !== "animo" ? destellos() : null);
    const nodo = h("div", { class: "cel-paso cel-resumen" },
      heroe,
      h("h1", { id: "cel-titulo", class: "cel-titulo" }, t.titulo),
      h("p", { class: "cel-frase" }, t.frase),
      x.mejorSerie >= 3 ? h("p", { class: "cel-serie" }, ico("llama"), `Mejor serie: ${x.mejorSerie} seguidas`) : null,
      h("div", { class: "cel-cifras" }, teselas));
    const animar = () => {
      const buena = t.humor !== "animo";
      despues(380, () => { sonar(buena ? "fanfarria" : "toque"); if (buena) { An.confeti(t.humor === "perfecto" ? 170 : 120); An.vibrar([18, 50, 18]); } });
      teselas.forEach((el, i) => despues(1050 + i * 420, () => {
        el.classList.add("visible"); sonar("golpe", i); An.vibrar(12);
        paradas.push(contar(valores[i], cifras[i].v, cifras[i].f, 650, () => { el.classList.add("lista"); if (i === teselas.length - 1) sonar("brillo"); }));
      }));
    };
    return { nodo, animar, tarde: 1050 + teselas.length * 420 + 400 };
  }

  function pasoRacha(antes, r, cumplido) {
    const subio = r.dias > antes;
    const numero = h("span", { class: "cel-numero" },
      subio ? h("span", { class: "cel-rodillo" }, h("span", {}, String(antes)), h("span", {}, String(r.dias))) : h("span", {}, String(r.dias)));
    const hoyIdx = r.semana.findIndex(d => d.hoy);
    const semana = h("div", { class: "cel-semana", "aria-hidden": "true" }, r.semana.map((d, i) =>
      h("span", { class: "cel-dia" + (d.hecho && i !== hoyIdx ? " hecho" : "") + (d.descanso ? " descanso" : "") + (i === hoyIdx ? " hoy" : "") },
        h("i", {}, d.descanso && i !== hoyIdx ? ico("escudo") : ico("check")), h("b", {}, d.hoy ? "Hoy" : d.letra))));
    const barra = h("i", { style: "width:0%" });
    const meta = h("div", { class: "cel-meta" + (r.cumplidoHoy ? " cumplida" : "") },
      h("span", { class: "cel-meta-texto" }, r.cumplidoHoy ? [ico("check"), " Objetivo de hoy cumplido"] : `Hoy: ${r.hoy}/${r.objetivo} preguntas`),
      h("div", { class: "progreso", role: "progressbar", "aria-label": "Objetivo de hoy", "aria-valuemin": 0, "aria-valuemax": r.objetivo, "aria-valuenow": Math.min(r.hoy, r.objetivo) }, barra));
    const titulo = subio ? (r.dias === 1 ? "¡Empieza tu racha!" : `¡${r.dias} días de racha!`) : "¡Objetivo cumplido!";
    const frase = subio
      ? (r.dias === 1 ? "Primer día. Vuelve mañana para sumar el segundo." : r.cumplidoHoy ? "Y además has cumplido el objetivo de hoy." : "Un día más sumado. Mañana, a por otro.")
      : `${plural(r.objetivo, "pregunta", "preguntas")} hoy. Tu racha sigue en ${plural(r.dias, "día", "días")}.`;
    const nodo = h("div", { class: "cel-paso cel-racha" + (subio ? " subio" : "") },
      h("div", { class: "cel-llama", "aria-hidden": "true" }, h("div", { class: "cel-rayos" }), ico("llama"), numero),
      h("h1", { id: "cel-titulo", class: "cel-titulo" }, titulo),
      h("p", { class: "cel-frase" }, frase),
      semana, meta,
      r.protector && r.protector.disponible ? h("p", { class: "cel-protector" }, ico("escudo"), "Protector listo: un día de descanso a la semana no rompe la racha.") : null);
    const animar = () => {
      despues(250, () => { sonar("racha"); An.vibrar([10, 40, 10, 40, 24]); });
      if (subio) despues(700, () => nodo.classList.add("gira"));
      despues(1050, () => { const d = semana.children[hoyIdx]; if (d) { d.classList.add("hecho", "pop"); sonar("golpe", 2); } });
      despues(1350, () => { barra.style.width = Math.min(100, Math.round(r.hoy / r.objetivo * 100)) + "%"; if (cumplido) despues(500, () => { sonar("meta"); meta.classList.add("brilla"); }); });
    };
    return { nodo, animar, tarde: 1500 };
  }

  function pasoLogros(nuevos) {
    const nodo = h("div", { class: "cel-paso cel-logros" },
      h("div", { class: "cel-heroe" }, h("div", { class: "cel-rayos", "aria-hidden": "true" }), h("div", { class: "cel-medalla-grande", "aria-hidden": "true" }, ico(nuevos[0].icono)), destellos()),
      h("h1", { id: "cel-titulo", class: "cel-titulo" }, nuevos.length === 1 ? "¡Logro nuevo!" : `¡${nuevos.length} logros nuevos!`),
      h("ul", { class: "cel-lista-logros" }, nuevos.map((l, i) => h("li", { style: `--i:${i}` },
        h("span", { class: "cel-sello " + (l.corona ? "corona" : "") }, ico(l.icono)),
        h("span", {}, h("b", {}, l.titulo), l.texto ? h("small", {}, l.texto) : null)))));
    const animar = () => {
      despues(200, () => { sonar("logro"); An.confeti(90); An.vibrar([16, 40, 16]); });
      [...nodo.querySelectorAll(".cel-lista-logros li")].forEach((li, i) => despues(700 + i * 300, () => { li.classList.add("visible"); sonar("golpe", i); }));
    };
    return { nodo, animar, tarde: 700 + nuevos.length * 300 };
  }

  function logrosNuevos() {
    if (!foto || !A.datos || !A.datos.logros) return [];
    const C = window.Camino, out = [];
    for (const id of Object.keys(A.datos.logros)) {
      if (foto.logros.has(id)) continue;
      const m = /^corona-m(\d+)$/.exec(id);
      if (m) { const mat = A.materia(Number(m[1])); out.unshift({ corona: true, icono: "corona", titulo: `Materia ${m[1]} coronada`, texto: mat ? mat[1] : "" }); continue; }
      const l = C && C.POR_ID_LOGRO ? C.POR_ID_LOGRO.get(id) : null;
      if (l) out.push({ icono: l.icono || "medalla", titulo: l.titulo, texto: l.texto });
    }
    return out;
  }

  function mostrar(pasos, destino, x0) {
    cerrar();
    capa = h("div", { class: "celebra", role: "dialog", "aria-modal": "true", "aria-labelledby": "cel-titulo" });
    const escena = h("div", { class: "celebra-escena" });
    const boton = h("button", { class: "boton ancho verde" }, "Continuar");
    const pie = h("div", { class: "celebra-pie" }, boton);
    capa.append(escena, pie);
    document.body.append(capa);
    document.body.classList.add("celebrando");
    window.addEventListener("keydown", teclas, true);
    window.addEventListener("hashchange", cerrar);
    let i = -1;
    const siguiente = () => {
      limpiarTiempos();
      i++;
      if (i >= pasos.length) { cerrar(); if (destino) location.hash = destino; return; }
      const p = pasos[i]();
      escena.replaceChildren(p.nodo);
      escena.scrollTop = 0;
      boton.classList.remove("late");
      boton.textContent = i < pasos.length - 1 || destino ? "Continuar" : x0.tipo === "examen" ? "Ver la corrección" : "Ver el resultado";
      p.animar();
      despues(p.tarde, () => boton.classList.add("late"));
      boton.focus({ preventScroll: true });
    };
    boton.addEventListener("click", siguiente);
    siguiente();
  }

  // x: { tipo: "practica"|"examen", aciertos, hechas, fallos, segundos, completa, apto, max, mejorSerie }
  // Devuelve true si la celebración se ha encargado de los sonidos y el confeti.
  function terminar(x) {
    if (!x || !x.hechas || (x.tipo !== "examen" && !x.completa && x.hechas < 3)) { foto = null; return false; }
    x.pct = Math.round(x.aciertos / x.hechas * 100);
    const r = An.racha(), antes = foto ? foto.racha : r.dias;
    const cumplido = foto ? foto.hoy < foto.objetivo && r.hoy >= r.objetivo : false;
    const logros = logrosNuevos();
    foto = null;
    const pasos = [() => pasoResumen(x)];
    if (r.dias > antes || cumplido) pasos.push(() => pasoRacha(antes, r, cumplido));
    if (logros.length) pasos.push(() => pasoLogros(logros));
    mostrar(pasos, x.destino, x);
    return true;
  }

  window.Celebracion = { empezar, terminar, cerrar, get abierta() { return !!capa; } };
})();
