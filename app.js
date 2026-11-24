/* Test teórico permiso B. Web estática sin dependencias.
   Las preguntas vienen de data/preguntas.js (generado por tools/build_data.py). */
(function () {
  "use strict";

  // ---------- Datos fijos ----------
  // Materias de la prueba común: Reglamento General de Conductores (RD 818/2009), anexo V.B.1.
  const MATERIAS = [
    [1, "Normas de tráfico: señales, prioridad y velocidad", "Las disposiciones legales y reglamentarias en materia de tráfico, circulación de vehículos de motor y seguridad vial, especialmente las que se refieren a la señalización, reglas de prioridad y limitaciones de velocidad."],
    [2, "Accidentes: factores y causas", "Los accidentes de circulación: factores que intervienen. Causas más frecuentes de los accidentes."],
    [3, "Atención y actitud con los demás usuarios", "La vigilancia y las actitudes con respecto a los demás usuarios: su importancia. Necesidad de una colaboración entre los usuarios: no molestar, no sorprender, advertir, comprender, prever los movimientos de los demás."],
    [4, "Percepción, reacción, alcohol, drogas y fatiga", "Las funciones de percepción, de evaluación y de toma de decisiones, principalmente el tiempo de reacción y las modificaciones de los comportamientos del conductor vinculados a los efectos del alcohol, drogas, medicamentos, enfermedades, estados emocionales, fatiga, sueño y otros factores."],
    [5, "Distancias, frenado y estabilidad", "Los principios relativos al respeto de las distancias de seguridad entre vehículos, a la distancia de frenado y a la estabilidad del vehículo en la vía teniendo en cuenta las diferentes condiciones meteorológicas o ambientales, las características de los distintos tipos y tramos de vía y el estado de la calzada."],
    [6, "Estado de la calzada, meteorología y túneles", "Los riesgos de la conducción asociados a los diferentes estados de la calzada especialmente cuando varíen en función de las condiciones atmosféricas y de la hora del día o de la noche. La seguridad de la conducción en los túneles."],
    [7, "La vía: clases y partes", "La vía: clases y partes de la vía. Sus características y disposiciones legales referidas a ella."],
    [8, "Usuarios vulnerables e inexpertos", "Los riesgos específicos relacionados con la inexperiencia de otros usuarios de la vía y con los usuarios más vulnerables, como por ejemplo los peatones (especialmente los niños, las personas de edad avanzada o discapacitadas, las personas ciegas o sordas), los ciclistas, los conductores de ciclomotores, de motocicletas, de vehículos para personas de movilidad reducida y otros."],
    [9, "Riesgos según el vehículo y la visibilidad", "Los riesgos inherentes a la circulación y a la conducción de los diversos tipos de vehículos y a las diferentes condiciones de visibilidad de sus conductores."],
    [10, "Documentación", "Normativa relativa a los documentos administrativos necesarios para circular conduciendo un vehículo de motor: documentos relativos al conductor, al vehículo y, en su caso, a la carga transportada."],
    [11, "Accidentes: qué hacer y primeros auxilios", "Normas generales sobre el comportamiento que debe adoptar el conductor en caso de accidente (señalizar, alertar) y medidas y primeros auxilios que puede adoptar, si procede, para socorrer a las víctimas de accidentes de circulación."],
    [12, "Carga y personas transportadas", "Factores y cuestiones de seguridad relativos a la carga del vehículo y a las personas transportadas."],
    [13, "Al abandonar el vehículo", "Precauciones necesarias al abandonar el vehículo."],
    [14, "Elementos mecánicos y averías", "Los elementos mecánicos relacionados con la seguridad de la conducción y, en particular, poder detectar los defectos más corrientes que puedan afectar a los sistemas de dirección, suspensión, ruedas, frenos y neumáticos, alumbrado y señalización óptica (luces, indicadores de dirección, catadióptricos) y escape, a los retrovisores, lavaparabrisas y limpiaparabrisas, y a los cinturones de seguridad y las señales acústicas."],
    [15, "Equipos de seguridad y sistemas para niños", "Los equipos de seguridad de los vehículos, especialmente la utilización de los cinturones de seguridad, reposacabezas y equipos de seguridad destinados a los niños."],
    [16, "Medio ambiente y conducción eficiente", "La utilización del vehículo en relación con el medio ambiente: uso adecuado de las señales acústicas, conducción económica y ahorro de combustible, limitación de emisiones contaminantes y otras medidas a tener en cuenta por el conductor para evitar la contaminación ambiental."],
  ];
  const NOMBRE_TEMA = {
    definiciones: "Definiciones", velocidad: "Velocidad", por_donde_circular: "Por dónde circular",
    carriles_especiales: "Carriles especiales", vias: "Tipos de vías", distancias: "Distancias",
    adelantamiento: "Adelantamiento y distancia lateral", senales: "Señales", prioridad: "Prioridad",
    luces: "Luces", parada_estacionamiento: "Parada y estacionamiento", alcohol_drogas: "Alcohol y drogas",
    documentacion: "Documentación", vehiculo: "Vehículo", seguridad_pasiva: "Seguridad pasiva",
    primeros_auxilios: "Primeros auxilios", conduccion_eficiente: "Conducción eficiente",
    infracciones_sanciones: "Infracciones y sanciones", maniobras: "Maniobras", carga: "Carga",
    senales_verticales: "Señales verticales", marcas_viales: "Marcas viales", permiso_conduccion: "Permiso de conducción", puntos: "Permiso por puntos",
    seguridad_activa: "Seguridad activa", adas: "Ayudas a la conducción (ADAS)", accidentes: "Accidentes", distintivos_ambientales: "Distintivos ambientales",
    itv: "ITV", senales_vehiculo: "Señales en los vehículos", accesorios_obligatorios: "Accesorios obligatorios", ciclos: "Ciclos y bicicletas",
    condiciones_adversas: "Condiciones adversas", conduccion_preventiva: "Conducción preventiva", conduccion_segura: "Conducción segura", distracciones: "Distracciones",
    factores_riesgo: "Factores de riesgo", transporte_personas: "Transporte de personas", usuarios_vulnerables: "Usuarios vulnerables", alcohol: "Alcohol", drogas: "Drogas", mecanica: "Mecánica", accidente: "Accidentes",
  };
  const NOMBRE_NORMA_CORTO = { RGC: "Reglamento General de Circulación", LSV: "Ley de Tráfico", RGCond: "Reglamento General de Conductores", RGCOND: "Reglamento General de Conductores", MANUAL_DGT: "Manual del permiso B (DGT)", RGC_CATALOGO: "Catálogo de señales del Reglamento General de Circulación", ITV: "Reglamento de ITV (RD 920/2017)", LRCSCVM: "Ley del seguro obligatorio (RDL 8/2004)", OCURSOS: "Orden de cursos del permiso por puntos (INT/2596/2005)", RGV: "Reglamento General de Vehículos", CP: "Código Penal" };
  // Examen (RD 818/2009, anexo VI): 30 preguntas, 30 minutos, aprobado con un máximo de 3 errores.
  const EXAMEN_PREGUNTAS = 30, SEGUNDOS_POR_PREGUNTA = 60, PROPORCION_FALLOS = 0.1;

  // ---------- Banco: solo preguntas con fuente completa ----------
  const URL_OFICIAL = /^https:\/\/(www\.boe\.es|www\.dgt\.es|sede\.dgt\.gob\.es)\//;
  const BANCO = window.BANCO || { preguntas: [], normativa: {} };
  const PREGUNTAS = (BANCO.preguntas || []).filter(valida);
  const POR_ID = new Map(PREGUNTAS.map(p => [p.id, p]));
  function valida(p) {
    const f = p && p.fuente;
    return p && p.id && p.enunciado && p.opciones && ["a", "b", "c"].every(k => p.opciones[k]) &&
      p.opciones[p.correcta] && p.materia >= 1 && p.materia <= 16 &&
      f && f.norma && f.articulo && f.cita && URL_OFICIAL.test(f.url || "") && (!p.imagen || p.imagen.src);
  }

  // ---------- Progreso (modelo en progreso.js) ----------
  const P = window.Progreso;
  let datos = P.cargar();
  function guardar() { P.guardar(datos); }
  function seccionActual() { return (location.hash || "#/").slice(2).split("/")[0] || "inicio"; }
  // Tras cada respuesta registrada avisa con el evento "respuesta" (detail: {id, acierto, modo}),
  // para los módulos de extensiones (estudiar.js, errores.js, camino.js...).
  function registrar(p, acierto) {
    P.registrar(datos, p.id, acierto); guardar();
    const modo = sesion ? (sesion.limite ? "examen" : sesion.modo) : null, tipo = sesion && sesion.limite ? sesion.tipo : null;
    try { window.dispatchEvent(new CustomEvent("respuesta", { detail: { id: p.id, acierto, modo, tipo } })); } catch (e) { /* sin eventos */ }
  }
  const TODAS = PREGUNTAS.map(p => p.id);
  const POR_MATERIA = {};
  for (const p of PREGUNTAS) (POR_MATERIA[p.materia] = POR_MATERIA[p.materia] || []).push(p.id);
  const fallosActuales = () => P.enRepaso(datos, TODAS);   // todas las que están en el repaso espaciado
  const fallosDeHoy = () => P.paraHoy(datos, TODAS);       // las que toca repasar ya

  // ---------- Utilidades ----------
  function h(tag, attrs, ...hijos) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "class") el.className = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of hijos.flat(Infinity)) if (c != null && c !== false) el.append(c.nodeType ? c : String(c));
    return el;
  }
  // Iconos de trazo sencillo, al estilo de SF Symbols.
  const ICONOS = {
    chevron: "M9 5l7 7-7 7", atras: "M15 5l-7 7 7 7", check: "M5 12.5l4.5 4.5L19 7.5", x: "M6.5 6.5l11 11M17.5 6.5l-11 11",
    reloj: "M12 7.5V12l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
    examen: "M9 4h6v3H9zM9 5.5H6V21h12V5.5h-3M9 14l2 2 4-4.5",
    libro: "M4 5.5c2.7-1.3 5.5-1.1 8 .7 2.5-1.8 5.3-2 8-.7V19c-2.7-1.3-5.5-1.1-8 .7-2.5-1.8-5.3-2-8-.7zM12 6.2v13.5",
    repetir: "M5 12a7 7 0 0112.2-4.7L19.5 9.5M19.5 5v4.5H15M19 12a7 7 0 01-12.2 4.7L4.5 14.5M4.5 19v-4.5H9",
    bandera: "M6 21V4.5M6 4.5h11.5l-2.2 3.8 2.2 3.7H6",
    rejilla: "M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z",
    info: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5.5M12 7.6v.1",
    enlace: "M14 5h5v5M19 5l-8 8M10 6.5H5.5v12h12V14",
    aviso: "M12 4.5l8.5 15h-17zM12 10.5v4M12 17.2v.1",
    lista: "M9 7h10M9 12h10M9 17h10M5 7h.1M5 12h.1M5 17h.1",
    llama: "M12.6 2.2c.7 3.4-1.3 5.2-3.1 7.2C7.8 11.2 6 13.2 6 15.9 6 19.3 8.7 22 12 22s6-2.7 6-6.1c0-2.6-1.2-4.6-2.6-6-.2 1.7-1 2.9-2.2 3.5.5-3.7-.2-8.1-.6-11.2z",
    trofeo: "M8 4h8v5a4 4 0 01-8 0zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8.5 20h7M9.5 17h5",
    nube: "M7 18.5h10.5a4 4 0 00.6-7.95A6 6 0 006.4 9.1 4.75 4.75 0 007 18.5z",
    salir: "M14 4.5H6v15h8M10.5 12H20M17 8.5l3.5 3.5-3.5 3.5",
    escudo: "M12 3l7 2.8v5.4c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V5.8z",
    corona: "M4.5 18.5h15M5 15.5L3.5 7l5 3.8L12 4.5l3.5 6.3 5-3.8-1.5 8.5z",
    medalla: "M12 15a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM8.3 13.6L6.5 21l5.5-2.6 5.5 2.6-1.8-7.4M12 7.2l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z",
    mapa: "M9 4.5L3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5l-6-2zM9 4.5v13M15 6.5v13",
    persona: "M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6",
    bombilla: "M9.5 18h5M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z",
  };
  function ico(nombre, clase) {
    const NS = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "ico" + (clase ? " " + clase : "")); s.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", ICONOS[nombre]); s.append(p);
    return s;
  }
  const app = document.getElementById("app"), nav = document.getElementById("nav"), navIzq = document.getElementById("nav-izq"),
    navTitulo = document.getElementById("nav-titulo"), reloj = document.getElementById("reloj"), barra = document.getElementById("barra");
  let teclas = null, tituloFijo = false;

  // Pinta una pantalla. op: { titulo, atras: {texto, href | accion}, fijo (título siempre en la barra), barra: [botones], teclas }
  function pantalla(op, ...hijos) {
    document.title = op.titulo ? `${op.titulo} · Test permiso B` : "Test teórico permiso B";
    navTitulo.textContent = op.titulo || "";
    tituloFijo = !!op.fijo;
    const a = op.atras;
    navIzq.replaceChildren(...(a ? [a.href
      ? h("a", { class: "nav-boton" + (a.href === "#/" ? " atras-raiz" : ""), href: a.href }, a.icono === false ? null : ico("atras"), a.texto)
      : h("button", { class: "nav-boton", onclick: a.accion }, a.icono === false ? null : ico("atras"), a.texto)] : []));
    app.replaceChildren(...hijos.flat(Infinity).filter(c => c != null && c !== false));
    const b = (op.barra || []).filter(Boolean), fb = op.feedback;
    barra.hidden = !b.length;
    // Franja de respuesta (práctica): verde o roja, con el veredicto y el botón de continuar.
    barra.className = "barra-inferior" + (fb ? " feedback " + (fb.ok ? "ok" : "ko") : "");
    barra.replaceChildren(h("div", {}, fb ? h("div", { class: "feedback-texto" }, h("span", { class: "sello" }, ico(fb.ok ? "check" : "x")),
      h("span", {}, h("strong", {}, fb.titulo), fb.detalle ? h("span", {}, fb.detalle) : null)) : null, b));
    app.classList.toggle("con-barra", !!b.length);
    app.classList.toggle("con-feedback", !!fb);
    document.body.classList.toggle("sesion", !!op.sesion);
    teclas = op.teclas || null;
    if (typeof pintarLateral === "function" && document.getElementById("lateral").childElementCount) pintarLateral(seccionActual());
    if (!op.mantenerScroll) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); if (window.Animo) Animo.limpiar(); }
    alDesplazar();
  }
  function alDesplazar() {
    const y = window.scrollY;
    nav.classList.toggle("con-borde", y > 4);
    nav.classList.toggle("titulo-visible", tituloFijo || y > 44);
  }
  window.addEventListener("scroll", alDesplazar, { passive: true });
  document.addEventListener("keydown", e => {
    if (!teclas || e.metaKey || e.ctrlKey || e.altKey || document.querySelector("dialog[open]") || /^(TEXTAREA|INPUT)$/.test(e.target.tagName)) return;
    const f = teclas[e.key.toLowerCase()];
    if (f) { e.preventDefault(); f(); }
  });

  // Hoja inferior (móvil) o alerta centrada (ordenador).
  function hoja({ titulo, mensaje, contenido, acciones = [], cancelar = "Cancelar" }) {
    const d = h("dialog", { class: "hoja", "aria-label": titulo });
    const cerrar = () => { if (d.open) d.close(); };
    d.append(h("div", { class: "hoja-cuerpo" },
      h("div", { class: "hoja-asa" }), h("h2", {}, titulo), mensaje ? h("p", { class: "mensaje" }, mensaje) : null, contenido,
      h("div", { class: "pila" },
        acciones.map(a => h("button", { class: "boton ancho " + (a.clase || ""), onclick: () => { cerrar(); a.accion(); } }, a.texto)),
        cancelar ? h("button", { class: "boton ancho plano", onclick: cerrar }, cancelar) : null)));
    d.addEventListener("click", e => { if (e.target === d) cerrar(); });
    d.addEventListener("close", () => d.remove());
    document.body.append(d);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    return d;
  }

  function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  // Prioridad visual para práctica (temario, Estudiar hoy, repasos), nunca para los exámenes: barajado
  // ponderado (Efraimidis-Spirakis). Peso 3 si la pregunta tiene escena animada o «Explóralo», 2 si tiene
  // imagen y 1 el resto, así que las visuales salen antes y más a menudo sin dejar fuera a las demás.
  // Una pregunta ya dominada vuelve a peso 1 para que la prioridad pase a las visuales que aún cuestan.
  // Acepta ids o preguntas y devuelve una copia del mismo tipo.
  const PESO_ANIMADA = 3, PESO_IMAGEN = 2;
  function pesoVisual(p) {
    if (!p || P.estado(datos, p.id) === "dominada") return 1;
    const exp = window.EXPLORA && window.EXPLORA.explora;
    if ((window.ESCENAS && window.ESCENAS[p.id]) || (exp && exp[p.id])) return PESO_ANIMADA;
    return p.imagen ? PESO_IMAGEN : 1;
  }
  function priorizar(a) {
    return a.map(x => ({ x, k: Math.random() ** (1 / pesoVisual(typeof x === "string" ? POR_ID.get(x) : x)) }))
      .sort((u, v) => v.k - u.k).map(u => u.x);
  }
  function fechaES(iso) { if (!iso) return ""; const [y, m, d] = iso.slice(0, 10).split("-"); return [d, m, y].filter(Boolean).join("/"); }
  function fechaCorta(ms) {
    const d = new Date(ms), hoy0 = new Date(); hoy0.setHours(0, 0, 0, 0);
    const dias = Math.round((new Date(d).setHours(0, 0, 0, 0) - hoy0) / 86400000);
    if (dias <= 0) return "Hoy"; if (dias === 1) return "Mañana";
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  }
  function mmss(s) { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const nombreTema = t => NOMBRE_TEMA[t] || (t.charAt(0).toUpperCase() + t.slice(1)).replace(/_/g, " ");
  const materia = n => MATERIAS[n - 1];
  let temporizador = null;
  function pararReloj() { clearInterval(temporizador); temporizador = null; reloj.hidden = true; reloj.classList.remove("poco"); }

  // ---------- Piezas comunes ----------
  function fila({ icono, color, numero, titulo, detalle, valor, insignia, href, accion, chevron = true, externo, deshabilitada }) {
    const dentro = [
      icono || numero != null ? h("span", { class: "tesela t-" + (color || "azul") }, icono ? ico(icono) : numero) : null,
      h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, titulo), detalle ? h("span", { class: "fila-detalle" }, detalle) : null),
      insignia ? h("span", { class: "insignia" }, insignia) : null,
      valor != null ? h("span", { class: "fila-valor" }, valor) : null,
      (href || accion) && chevron ? ico(externo ? "enlace" : "chevron", "chevron") : null];
    if (href) return h("a", Object.assign({ class: "fila", href }, externo ? { target: "_blank", rel: "noopener" } : {}), dentro);
    if (accion) return h("button", { class: "fila", onclick: accion, disabled: deshabilitada }, dentro);
    return h("div", { class: "fila" }, dentro);
  }
  const grupo = (clase, ...filas) => h("ul", { class: "grupo " + (clase || "") }, filas.flat(Infinity).filter(Boolean).map(f => h("li", {}, f)));
  const cabecera = t => h("h2", { class: "cabecera" }, t);
  const cifras = (...c) => h("div", { class: "cifras" }, c.map(([v, t]) => h("div", { class: "cifra" }, h("b", {}, v), h("span", {}, t))));
  function segmentos(opciones, actual, alCambiar) {
    const caja = h("div", { class: "segmentos", role: "group" });
    const pintar = () => caja.replaceChildren(...opciones.map(([v, t]) => h("button", { "aria-pressed": String(v === actual), onclick: () => { actual = v; pintar(); alCambiar(v); } }, t)));
    pintar();
    return caja;
  }

  // Orden de las opciones: se baraja en cada sesión para que no se pueda acertar por posición.
  // No se baraja si alguna opción se refiere a la posición de otra ("las dos anteriores", "a y b"...)
  // o nombra elementos con letras ("el vehículo A"), para que no choquen con las letras de las opciones.
  const NATURAL = ["a", "b", "c"];
  const DEPENDE_DEL_ORDEN = /anterior|ambas|las dos\b|los dos\b|ninguna de|todas las (respuestas|opciones)|\b[abc]\)|\b[ab] y [bc]\b|opci[oó]n(es)? [abc]\b|respuestas? [abc]\b|\b(veh[ií]culos?|turismos?|coches?|motos?|conductor(es)?) [ABC]\b/i;
  let ordenes = new Map();
  function ordenDe(p) {
    if (!ordenes.has(p.id)) ordenes.set(p.id, NATURAL.some(k => DEPENDE_DEL_ORDEN.test(p.opciones[k])) ? NATURAL : barajar(NATURAL));
    return ordenes.get(p.id);
  }
  const letraVista = (p, k, orden) => "ABC"[orden.indexOf(k)];
  function textoFuente(p) {
    const f = p.fuente;
    const norma = NOMBRE_NORMA_CORTO[f.norma] || (BANCO.normativa[f.norma] || {}).nombre || f.norma;
    return `${norma}, ${/^(anexo|tema|disposici)/i.test(f.articulo) ? f.articulo : "art. " + f.articulo}`;
  }
  // La descripción detallada y el crédito pueden revelar la respuesta: solo se muestran tras responder.
  function figura(p, corregida) {
    const escena = window.Escenas && Escenas.figura(p); // fotograma quieto de la escena animada (escenas.js)
    if (escena) return escena;
    const i = p.imagen;
    if (!i || !i.src) return null;
    const senal = /\/senales\//.test(i.src);
    return h("figure", { class: "figura" + (senal ? " senal" : "") },
      h("img", { src: i.src, alt: (corregida && i.alt_detalle) || i.alt || "Imagen de la pregunta", decoding: "async" }),
      corregida && (i.alt_detalle || i.credito) ? h("figcaption", {}, i.alt_detalle ? h("strong", {}, i.alt_detalle) : null, i.alt_detalle && i.credito ? h("br") : null, i.credito || null) : null);
  }
  function bloqueExplicacion(p, elegida, animada, orden) {
    const ok = elegida === p.correcta, f = p.fuente, letra = letraVista(p, p.correcta, orden);
    const filaDudosa = h("div", {});
    const pintarDudosa = () => {
      const m = datos.dudosas[p.id];
      filaDudosa.replaceChildren(h("button", { class: "fila", onclick: () => m ? (P.quitarDudosa(datos, p.id), guardar(), pintarDudosa()) : pedirNota(p, pintarDudosa) },
        ico("bandera"), h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, m ? "Quitar la marca de dudosa" : "Marcar como dudosa"),
          m && m.nota ? h("span", { class: "fila-detalle" }, m.nota) : null)));
    };
    pintarDudosa();
    return h("div", { class: "explicacion" + (ok ? "" : " mal") + (animada ? " animada" : ""), role: animada ? "status" : null },
      h("p", { class: "veredicto" }, ico(ok ? "check" : "x"),
        elegida == null ? `Sin responder. La correcta es la ${letra}` : ok ? "Correcto" : `Incorrecto. La correcta es la ${letra}`),
      h("div", { class: "explicacion-cuerpo" },
        p.leccion ? leccion(p, elegida, orden) : p.explicacion ? h("p", {}, p.explicacion) : null,
        f.tabla
          ? h("blockquote", { class: "cita" }, h("small", {}, "Tabla del BOE"), `${f.tabla.fila} · ${f.tabla.columna}: `, h("strong", {}, f.tabla.valor))
          : h("blockquote", { class: "cita" }, h("small", {}, f.tipo_cita === "imagen_catalogo" ? `Catálogo oficial de señales${f.pagina_pdf ? ", página " + f.pagina_pdf + " del PDF" : ""}` : f.norma === "MANUAL_DGT" ? "Texto literal del manual de la DGT" : "Texto literal del BOE"), `«${f.cita}»`),
        f.cita_adicional && f.cita_adicional.cita ? h("blockquote", { class: "cita" }, h("small", {}, f.cita_adicional.articulo || "Texto literal"), `«${f.cita_adicional.cita}»`) : null,
        ...((p.leccion && p.leccion.apoyos) || []).map(a => h("blockquote", { class: "cita" }, h("small", {}, `${NOMBRE_NORMA_CORTO[a.norma] || a.norma}, ${/^(anexo|tema|disposici)/i.test(a.articulo) ? a.articulo : "art. " + a.articulo}`), `«${a.cita}»`))),
      h("a", { class: "fila", href: f.url, target: "_blank", rel: "noopener" }, ico("libro"),
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, textoFuente(p)),
          f.version_consultada ? h("span", { class: "fila-detalle" }, `${f.norma === "MANUAL_DGT" ? "Versión" : "Texto consolidado, versión"} del ${fechaES(f.version_consultada)}`) : null),
        ico("enlace", "chevron")),
      filaDudosa);
  }
  // Lección al fallar: la lógica de la respuesta, por qué no valen las otras (en el orden en que se
  // vieron) y un truco. La cita literal va debajo como respaldo.
  function leccion(p, elegida, orden) {
    const l = p.leccion;
    return h("div", { class: "leccion-pregunta" },
      h("p", { class: "lec-porque" }, l.porque),
      h("div", { class: "lec-descartes" }, h("small", {}, "Por qué no valen las otras"),
        h("ul", {}, orden.filter(k => k !== p.correcta && l.descartes[k]).map(k => h("li", { class: k === elegida ? "elegida" : null },
          h("span", { class: "lec-opcion" }, h("b", {}, letraVista(p, k, orden)), ` ${p.opciones[k]}`, k === elegida ? h("em", {}, "Tu respuesta") : null),
          h("span", { class: "lec-motivo" }, l.descartes[k]))))),
      l.truco ? h("div", { class: "lec-truco" }, ico("bombilla"), h("div", {}, h("small", {}, "Truco para recordarlo"), l.truco)) : null);
  }
  function pedirNota(p, despues) {
    const t = h("textarea", { placeholder: "¿Qué te parece raro? (opcional)", "aria-label": "Nota" });
    hoja({ titulo: "Marcar como dudosa", mensaje: "La pregunta se guardará en «Preguntas dudosas» para revisarla contra el BOE.", contenido: t,
      acciones: [{ texto: "Guardar", accion: () => { P.marcarDudosa(datos, p.id, t.value.trim()); guardar(); despues(); } }] });
  }
  // Pinta una pregunta. Si corregida, marca correcta/incorrecta (con icono, no solo color) y bloquea.
  function pregunta(p, elegida, corregida, alElegir, animada, orden = NATURAL) {
    const lista = h("ul", { class: "opciones" + (animada ? " recien" : "") }, orden.map((k, pos) => {
      let cls = "opcion", estado = null, voz = "";
      if (corregida) {
        if (k === p.correcta) { cls += " correcta"; estado = ico("check"); voz = ", respuesta correcta"; }
        else if (k === elegida) { cls += " incorrecta"; estado = ico("x"); voz = ", tu respuesta, incorrecta"; }
        else cls += " apagada";
      } else if (k === elegida) { cls += " elegida"; estado = ico("check"); }
      return h("li", {}, h("button", { class: cls, disabled: corregida, "aria-pressed": corregida ? null : String(k === elegida), "aria-label": `${"ABC"[pos]}. ${p.opciones[k]}${voz}`, onclick: () => alElegir && alElegir(k) },
        h("span", { class: "letra" }, "ABC"[pos]), h("span", { class: "texto" }, p.opciones[k]), h("span", { class: "estado" }, estado)));
    }));
    const ex = corregida ? bloqueExplicacion(p, elegida, animada, orden) : null;
    if (ex && window.Escenas) Escenas.enExplicacion(ex, p, elegida, animada); // escena paso a paso al final de la explicación
    return [figura(p, corregida), h("p", { class: "enunciado" }, p.enunciado), lista, ex];
  }
  // La barra arranca en el ancho anterior y crece hasta el nuevo, para que se vea avanzar.
  let anchoAvance = 0;
  function avance(izq, der, hecho, total, clase) {
    const ancho = total ? (hecho / total) * 100 : 0, desde = ancho >= anchoAvance ? anchoAvance : ancho;
    const barraAvance = h("i", { style: `width:${desde}%` });
    anchoAvance = ancho;
    if (desde !== ancho) requestAnimationFrame(() => requestAnimationFrame(() => { barraAvance.style.width = ancho + "%"; }));
    return [h("div", { class: "avance" }, h("strong", {}, izq), h("span", {}, der)),
      h("div", { class: "progreso" + (clase ? " " + clase : ""), role: "progressbar", "aria-valuemin": 0, "aria-valuemax": total, "aria-valuenow": hecho }, barraAvance)];
  }

  // ---------- Racha y objetivo diario (datos en animo.js) ----------
  const FRASES_ACIERTO = ["¡Correcto!", "¡Muy bien!", "¡Eso es!", "¡Perfecto!", "¡Bien visto!"];
  const elegirFrase = l => l[Math.floor(Math.random() * l.length)];
  function tarjetaRacha(clase) {
    if (!window.Animo) return null;
    const r = Animo.racha(), pct = Math.min(100, Math.round(r.hoy / r.objetivo * 100));
    const viva = r.dias > 0;
    const titulo = viva ? [h("b", {}, plural(r.dias, "día", "días")), " de racha"] : "Empieza tu racha";
    const pr = r.protector;
    const texto = r.cumplidoHoy ? "Objetivo de hoy cumplido. ¡Así se hace!"
      : r.hoy ? `Te ${r.objetivo - r.hoy === 1 ? "falta 1 pregunta" : `faltan ${r.objetivo - r.hoy} preguntas`} para el objetivo de hoy.`
      : !viva ? "Responde preguntas cada día para sumar días seguidos."
      : r.descansoAyer ? "Ayer fue tu día de descanso. Responde hoy para seguir sumando."
      : pr && !pr.disponible ? "Ya usaste el descanso de esta semana: responde hoy para no perder la racha."
      : pr ? "Responde hoy para sumar un día más. Si hoy descansas, el protector guarda tu racha."
      : "Responde hoy para no perder la racha.";
    // Protector de racha: un día de descanso por semana (de lunes a domingo) que no rompe la racha.
    const diaSemana = k => new Date(k + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long" });
    const protector = pr ? h("div", { class: "protector" + (pr.disponible ? " listo" : " usado") },
      ico("escudo"), h("span", {}, pr.disponible ? h("b", {}, "Protector de racha listo") : h("b", {}, `Descanso usado el ${diaSemana(pr.usado)}`),
        pr.disponible ? " · un día de descanso por semana sin perder la racha" : " · vuelve el lunes")) : null;
    return h("section", { class: "tarjeta racha " + (viva ? "viva" : "apagada") + (clase ? " " + clase : ""), "aria-label": "Racha y objetivo diario" },
      h("div", { class: "racha-llama" }, ico("llama")),
      h("div", { class: "racha-titulo" }, titulo),
      h("div", { class: "racha-texto" }, texto),
      h("div", { class: "semana", "aria-label": "Últimos 7 días" }, r.semana.map(d => h("span", { class: (d.hecho ? "hecho" : "") + (d.meta ? " cumplido" : "") + (d.hoy ? " hoy" : "") + (d.descanso ? " descanso" : ""),
        "aria-label": `${d.hoy ? "Hoy" : fechaES(d.fecha)}: ${d.meta ? "objetivo cumplido" : d.hecho ? "practicado" : d.descanso ? "día de descanso, la racha sigue" : "sin practicar"}` },
        h("i", {}, d.hecho ? ico("check") : d.descanso ? ico("escudo") : null), d.hoy ? "Hoy" : d.letra))),
      protector,
      h("div", { class: "meta" + (r.cumplidoHoy ? " cumplida" : "") },
        h("div", { class: "meta-cabecera" }, h("span", {}, `Hoy: ${Math.min(r.hoy, r.objetivo)}/${r.objetivo} preguntas`),
          h("button", { class: "boton plano", onclick: elegirObjetivo }, "Cambiar objetivo")),
        h("div", { class: "progreso", role: "progressbar", "aria-label": "Objetivo de hoy", "aria-valuemin": 0, "aria-valuemax": r.objetivo, "aria-valuenow": Math.min(r.hoy, r.objetivo) }, h("i", { style: `width:${pct}%` }))));
  }
  function elegirObjetivo() {
    let d;
    const r = Animo.racha(), actual = r.elegido || r.objetivo;
    d = hoja({ titulo: "Objetivo diario", mensaje: "¿Cuántas preguntas quieres responder cada día?", cancelar: "Cancelar",
      contenido: [r.ajustado ? h("p", { class: "nota-pie", style: "margin:0 0 12px" }, `Con la fecha de tu examen, tu objetivo de hoy sube a ${r.objetivo} preguntas. Si eliges más, manda el tuyo.`) : null,
        h("div", { class: "opciones-objetivo" }, Animo.OBJETIVOS.map(n => h("button", { class: "boton " + (n === actual ? "" : "gris"), "aria-pressed": String(n === actual),
        onclick: () => { Animo.cambiarObjetivo(n); Animo.sonar("toque"); d.close(); ruta(); } }, `${n}`)))] });
  }
  // Anota respuestas para la racha y celebra si se acaba de cumplir el objetivo del día.
  function sumarAlDia(n) {
    if (!window.Animo || !n) return false;
    const cumplido = Animo.sumar(n);
    if (cumplido) setTimeout(() => { Animo.sonar("meta"); Animo.aviso("¡Objetivo de hoy cumplido!", "meta"); }, 450);
    return cumplido;
  }
  const sonar = (nombre, arg) => window.Animo && Animo.sonar(nombre, arg);

  // ---------- Inicio ----------
  function inicio() {
    pararReloj();
    const nf = fallosDeHoy().length, nd = Object.keys(datos.dudosas).length;
    const prep = P.preparacion(datos, TODAS, POR_MATERIA);
    const ult = datos.historial.slice(-5).reverse();
    pantalla({ titulo: "Test permiso B" },
      h("h1", { class: "titulo-grande" }, "Test permiso B"),
      h("p", { class: "subtitulo" }, `${PREGUNTAS.length} preguntas verificadas, cada una con su fuente oficial.`),
      tarjetaRacha(),
      extrasInicio("arriba"),
      cifras([`${prep.global.vistas}/${PREGUNTAS.length}`, "Preguntas vistas"], [`${Math.floor(prep.global.dominio * 100)} %`, "Dominadas"], [`${Math.round(prep.avance * 100)} %`, "Preparación"]),
      grupo("con-icono", fila({ icono: prep.lista ? "check" : "examen", color: prep.lista ? "verde" : "azul", titulo: prep.lista ? "Todo listo para el examen" : "Preparación para el examen",
        detalle: prep.lista ? "Cumples todos los criterios" : `${prep.criterios.filter(c => c.cumple).length} de ${prep.criterios.length} criterios cumplidos · dominio por materia`, href: "#/progreso" })),
      cabecera("Practicar"),
      grupo("con-icono mosaico",
        extrasInicio("practicar"),
        fila({ icono: "examen", color: "azul", titulo: "Examen final", detalle: "30 preguntas, 30 minutos, máximo 3 fallos", href: "#/examen" }),
        fila({ icono: "libro", color: "indigo", titulo: "Examen por temario", detalle: "16 materias, con la explicación al momento", href: "#/temario" })),
      cabecera("Repasar"),
      grupo("con-icono mosaico",
        fila({ icono: "repetir", color: "naranja", titulo: "Mis fallos", detalle: nf ? `${plural(nf, "pregunta", "preguntas")} para repasar hoy` : "Nada que repasar hoy", insignia: nf || null, href: "#/fallos" }),
        fila({ icono: "bandera", color: "rojo", titulo: "Preguntas dudosas", valor: String(nd), href: "#/dudosas" })),
      ult.length ? [cabecera("Últimos exámenes"), grupo("", ult.map(r => h("div", { class: "fila" },
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, fechaES(r.fecha)), h("span", { class: "fila-detalle" }, `${plural(r.fallos, "fallo", "fallos")} de ${r.total} · ${mmss(r.segundos)} min`)),
        h("span", { class: "fila-valor " + (r.apto ? "apto" : "noapto") }, r.apto ? "Apto" : "No apto"))))] : null,
      extrasInicio("abajo"),
      cabecera("Información"),
      grupo("con-icono", filaPerfil(),
        fila({ icono: "info", color: "gris", titulo: "Fuentes y aviso legal", href: "#/fuentes" })),
      PREGUNTAS.length < 300 ? h("p", { class: "nota-pie" }, "El banco todavía es pequeño y no cubre todo el temario. Crecerá a medida que se verifiquen más preguntas.") : null);
  }

  // ---------- Examen final ----------
  function portadaExamen() {
    pararReloj();
    const n = Math.min(EXAMEN_PREGUNTAS, PREGUNTAS.length), max = Math.floor(n * PROPORCION_FALLOS);
    pantalla({ titulo: "Examen final", atras: { texto: "Inicio", href: "#/" },
      barra: [h("button", { class: "boton", onclick: () => empezarExamen(), disabled: n === 0 }, "Empezar examen")], teclas: { enter: () => empezarExamen() } },
      h("h1", { class: "titulo-grande" }, "Examen final"),
      h("p", { class: "subtitulo" }, "Un simulacro con las mismas reglas que el examen de la DGT."),
      n < EXAMEN_PREGUNTAS ? h("div", { class: "aviso" }, ico("aviso"), h("span", {}, `Ahora mismo solo hay ${PREGUNTAS.length} preguntas verificadas, así que el examen tendrá ${n}.`)) : null,
      h("div", { style: "height:16px" }),
      grupo("", fila({ titulo: "Preguntas", valor: String(n) }), fila({ titulo: "Tiempo", valor: `${n} minutos` }), fila({ titulo: "Fallos permitidos", valor: String(max) })),
      h("p", { class: "nota-pie" }, "Puedes moverte entre preguntas y cambiar tus respuestas hasta que termines. Las preguntas sin responder cuentan como fallo y la corrección se muestra al final."),
      h("p", { class: "nota-pie" }, "Formato según el Reglamento General de Conductores (RD 818/2009), anexo VI."));
  }
  // op (opcional, para extensiones): { lista: [preguntas], tipo: "final" | "semanal", titulo, alTerminar(entrada) }
  function empezarExamen(op) {
    op = op && op.lista ? op : {};
    const lista = op.lista || barajar(PREGUNTAS).slice(0, EXAMEN_PREGUNTAS);
    ordenes = new Map();
    const ex = { lista, resp: {}, i: 0, inicio: Date.now(), limite: lista.length * SEGUNDOS_POR_PREGUNTA, acabado: false,
      tipo: op.tipo || "final", titulo: op.titulo || "Examen final", alTerminar: op.alTerminar || null, op };
    sesion = ex;
    reloj.hidden = false;
    const hora = h("span", {});
    reloj.replaceChildren(ico("reloj"), hora);
    const tic = () => {
      const quedan = ex.limite - (Date.now() - ex.inicio) / 1000;
      hora.textContent = mmss(quedan);
      reloj.classList.toggle("poco", quedan <= 120);
      if (quedan <= 0) { const d = document.querySelector("dialog[open]"); if (d) d.close(); corregirExamen(ex, true); }
    };
    tic(); temporizador = setInterval(tic, 1000);
    pintarExamen(ex);
  }
  function pintarExamen(ex, mantener) {
    const p = ex.lista[ex.i], n = ex.lista.length, hechas = Object.keys(ex.resp).length;
    const ir = j => { if (j >= 0 && j < n) { ex.i = j; pintarExamen(ex); } };
    const o = ordenDe(p);
    const elegir = k => {
      ex.resp[p.id] = k; sonar("toque"); pintarExamen(ex, true);
      const b = app.querySelector(".opcion.elegida"); if (b) b.classList.add("pulsada");
    };
    const ultima = ex.i === n - 1;
    pantalla({ titulo: ex.titulo, fijo: true, sesion: true, mantenerScroll: mantener,
      atras: { texto: "Salir", icono: false, accion: () => hoja({ titulo: "¿Salir del examen?", mensaje: "Se perderán las respuestas de este examen.", cancelar: "Seguir con el examen",
        acciones: [{ texto: "Salir del examen", clase: "gris destructivo", accion: () => { sesion = null; pararReloj(); location.hash = "#/"; inicio(); } }] }) },
      barra: [
        h("button", { class: "boton gris estrecho", disabled: ex.i === 0, "aria-label": "Pregunta anterior", onclick: () => ir(ex.i - 1) }, ico("atras")),
        h("button", { class: "boton gris estrecho", "aria-label": `Ver todas las preguntas. ${hechas} de ${n} respondidas`, onclick: () => rejillaExamen(ex) }, ico("rejilla"), `${hechas}/${n}`),
        ultima ? h("button", { class: "boton", onclick: () => confirmarFin(ex) }, "Terminar") : h("button", { class: "boton", onclick: () => ir(ex.i + 1) }, "Siguiente")],
      teclas: { a: () => elegir(o[0]), b: () => elegir(o[1]), c: () => elegir(o[2]), 1: () => elegir(o[0]), 2: () => elegir(o[1]), 3: () => elegir(o[2]),
        arrowright: () => ir(ex.i + 1), arrowleft: () => ir(ex.i - 1), enter: () => ultima ? confirmarFin(ex) : ir(ex.i + 1) } },
      avance(`Pregunta ${ex.i + 1} de ${n}`, `${hechas} respondidas`, ex.i + 1, n, "examen"),
      pregunta(p, ex.resp[p.id], false, elegir, false, o));
  }
  function rejillaExamen(ex) {
    let d;
    const rej = h("div", { class: "rejilla-preg" }, ex.lista.map((q, j) =>
      h("button", { class: (ex.resp[q.id] ? "respondida" : "") + (j === ex.i ? " actual" : ""), "aria-label": `Pregunta ${j + 1}${ex.resp[q.id] ? ", respondida" : ", sin responder"}`,
        onclick: () => { d.close(); ex.i = j; pintarExamen(ex); } }, j + 1)));
    d = hoja({ titulo: "Preguntas", cancelar: "Cerrar",
      contenido: [h("div", { class: "leyenda" }, h("span", {}, h("i", { class: "r" }), "Respondida"), h("span", {}, h("i", {}), "Sin responder")), rej],
      acciones: [{ texto: "Terminar y corregir", accion: () => confirmarFin(ex) }] });
  }
  function confirmarFin(ex) {
    const sin = ex.lista.length - Object.keys(ex.resp).length;
    hoja({ titulo: sin ? `Te ${sin === 1 ? "queda 1 pregunta" : `quedan ${sin} preguntas`} sin responder` : "¿Terminar el examen?",
      mensaje: sin ? "Las preguntas sin responder cuentan como fallo." : "Ya no podrás cambiar tus respuestas.",
      cancelar: sin ? "Seguir respondiendo" : "Revisar respuestas",
      acciones: [{ texto: "Terminar y corregir", accion: () => corregirExamen(ex, false) }] });
  }
  function corregirExamen(ex, porTiempo) {
    if (ex.acabado) return;
    ex.acabado = true;
    const segundos = Math.min(ex.limite, Math.round((Date.now() - ex.inicio) / 1000));
    pararReloj();
    let fallos = 0;
    const materias = {};
    for (const p of ex.lista) {
      const ok = ex.resp[p.id] === p.correcta; if (!ok) fallos++; registrar(p, ok);
      const m = materias[p.materia] || (materias[p.materia] = [0, 0]); m[1]++; if (ok) m[0]++;
    }
    const total = ex.lista.length, max = Math.floor(total * PROPORCION_FALLOS), apto = fallos <= max;
    const entrada = { fecha: new Date().toISOString(), total, fallos, apto, segundos, tipo: ex.tipo, materias };
    P.registrarExamen(datos, entrada); guardar();
    sesion = null;
    try { window.dispatchEvent(new CustomEvent("examen-corregido", { detail: entrada })); } catch (e) { /* sin eventos */ }
    const extra = ex.alTerminar ? ex.alTerminar(entrada) : null;
    sumarAlDia(Object.keys(ex.resp).length);
    setTimeout(() => { sonar(apto ? "aprobado" : "suspenso"); if (apto && window.Animo) Animo.confeti(); }, 150);
    const lista = h("div", {});
    const pintarLista = soloFallos => {
      const items = ex.lista.map((p, j) => ({ p, j })).filter(({ p }) => !soloFallos || ex.resp[p.id] !== p.correcta);
      lista.replaceChildren(...(items.length ? items.map(({ p, j }) => h("section", { class: "revision" },
        h("p", { class: "etiqueta" }, `Pregunta ${j + 1} · ${materia(p.materia)[1]}`), pregunta(p, ex.resp[p.id], true, null, false, ordenDe(p))))
        : [h("p", { class: "nota-pie", style: "text-align:center" }, "No has fallado ninguna pregunta.")]));
    };
    pintarLista(false);
    pantalla({ titulo: "Resultado", atras: { texto: "Inicio", href: "#/" } },
      h("div", { class: "resultado " + (apto ? "apto" : "noapto") },
        h("div", { class: "simbolo" }, ico(apto ? "check" : "x")),
        h("h1", {}, apto ? "¡Apto!" : "No apto"),
        h("p", { class: "animo-frase" }, apto ? (fallos === 0 ? "¡Sin un solo fallo!" : "Así se aprueba el examen de verdad.") : "Cada fallo es una pregunta que ya no se te escapará."),
        h("p", {}, porTiempo ? "Se ha acabado el tiempo. " : "", apto ? `Has aprobado con ${plural(fallos, "fallo", "fallos")}.` : `Has tenido ${plural(fallos, "fallo", "fallos")} y el máximo es ${max}.`)),
      cifras([String(total - fallos), "Aciertos"], [String(fallos), "Fallos"], [mmss(segundos), "Tiempo"]),
      extra,
      tarjetaRacha("racha-resultado"),
      h("div", { class: "pila" },
        ex.tipo === "final" ? h("button", { class: "boton ancho", onclick: () => empezarExamen() }, "Hacer otro examen") : null,
        fallos ? h("a", { class: "boton ancho gris", href: "#/fallos" }, "Repasar mis fallos") : null),
      cabecera("Corrección"),
      segmentos([[false, `Todas (${total})`], [true, `Solo fallos (${fallos})`]], false, pintarLista),
      h("div", { style: "height:20px" }), lista);
  }

  // ---------- Práctica (temario y fallos) ----------
  function listaTemario() {
    pararReloj();
    const cuenta = n => PREGUNTAS.filter(p => p.materia === n).length;
    pantalla({ titulo: "Temario", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Temario"),
      h("p", { class: "subtitulo" }, "Las 16 materias de la prueba común del permiso B."),
      h("div", { style: "height:8px" }),
      grupo("con-icono mosaico", MATERIAS.map(([n, nombre]) => {
        const c = cuenta(n);
        const r = c ? P.resumen(datos, POR_MATERIA[n]) : null;
        return fila({ numero: n, color: c ? "indigo" : "gris", titulo: nombre, detalle: c ? `${plural(c, "pregunta", "preguntas")} · ${Math.floor(r.dominio * 100)} % dominado` : "Aún sin preguntas verificadas",
          accion: () => { location.hash = `#/temario/${n}`; }, deshabilitada: !c, chevron: !!c });
      })),
      h("p", { class: "nota-pie" }, "Materias según el Reglamento General de Conductores (RD 818/2009), anexo V.B.1."));
  }
  function portadaMateria(n) {
    pararReloj();
    const m = materia(n);
    if (!m) return listaTemario();
    const todas = PREGUNTAS.filter(p => p.materia === n);
    const temas = [...new Set(todas.map(p => p.tema))];
    const activos = new Set(temas);
    let cuantas = 10;
    const listaTemas = h("div", {}), info = h("p", { class: "nota-pie", role: "status" });
    const disponibles = () => todas.filter(p => activos.has(p.tema));
    const empezar = () => { const d = disponibles(); if (d.length) practicar(priorizar(d).slice(0, cuantas || undefined), "temario", `Materia ${n}`, `#/temario/${n}`); };
    const boton = h("button", { class: "boton", onclick: empezar }, "Empezar");
    const pintar = () => {
      listaTemas.replaceChildren(grupo("", temas.map(t => h("button", { class: "fila", role: "checkbox", "aria-checked": String(activos.has(t)), onclick: () => { activos.has(t) ? activos.delete(t) : activos.add(t); pintar(); } },
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, nombreTema(t))),
        h("span", { class: "fila-valor" }, todas.filter(p => p.tema === t).length),
        h("span", { style: "width:22px;display:inline-grid" }, activos.has(t) ? ico("check", "marca") : null)))));
      const d = disponibles().length;
      info.textContent = d ? `Practicarás ${plural(Math.min(d, cuantas || d), "pregunta", "preguntas")} de ${d} disponibles, en orden aleatorio.` : "Elige al menos un tema.";
      boton.disabled = !d;
    };
    pantalla({ titulo: `Materia ${n}`, atras: { texto: "Temario", href: "#/temario" }, barra: [boton], teclas: { enter: empezar } },
      h("p", { class: "etiqueta", style: "margin:6px 0 0" }, `Materia ${n} de 16`),
      h("h1", { class: "titulo-medio" }, m[1]),
      h("p", { class: "subtitulo" }, m[2]),
      temas.length > 1 ? [cabecera("Temas"), listaTemas] : null,
      cabecera("Número de preguntas"),
      segmentos([[10, "10"], [20, "20"], [0, "Todas"]], cuantas, v => { cuantas = v; pintar(); }),
      info);
    pintar();
  }
  function vacio(icono, titulo, texto) { return h("div", { class: "vacio" }, h("div", { class: "simbolo" }, ico(icono)), h("h1", {}, titulo), h("p", {}, texto)); }
  function portadaFallos() {
    pararReloj();
    const todas = fallosActuales(), hoyIds = fallosDeHoy();
    const atras = { texto: "Inicio", href: "#/" };
    if (!todas.length) return pantalla({ titulo: "Mis fallos", atras }, vacio("check", "Sin fallos pendientes", "Cuando falles una pregunta en cualquier modo, aparecerá aquí para que la repases."));
    const empezar = ids => practicar(priorizar(ids.map(id => POR_ID.get(id))), "fallos", "Mis fallos", "#/fallos");
    const prox = P.proximoRepaso(datos, todas);
    const porMateria = {};
    for (const id of todas) { const m = POR_ID.get(id).materia; porMateria[m] = (porMateria[m] || 0) + 1; }
    const cajas = [0, 0, 0, 0, 0, 0];
    for (const id of todas) cajas[datos.preguntas[id].c]++;
    pantalla({ titulo: "Mis fallos", atras,
      barra: [hoyIds.length ? h("button", { class: "boton", onclick: () => empezar(hoyIds) }, `Repasar ${plural(hoyIds.length, "pregunta", "preguntas")} de hoy`)
        : h("button", { class: "boton gris", onclick: () => empezar(todas) }, "Repasar todas igualmente")],
      teclas: { enter: () => empezar(hoyIds.length ? hoyIds : todas) } },
      h("h1", { class: "titulo-grande" }, "Mis fallos"),
      h("p", { class: "subtitulo" }, "Repaso espaciado: cada vez que aciertas una pregunta fallada, vuelve más tarde (al día siguiente, a los 3, 7 y 16 días). Si la aciertas en todos los repasos, sale de la lista. Si la fallas, vuelve a empezar."),
      cifras([String(hoyIds.length), "Para hoy"], [String(todas.length - hoyIds.length), "Más adelante"], [prox ? fechaCorta(prox) : "–", "Próximo repaso"]),
      cabecera("En qué punto está cada una"),
      grupo("", [["Recién falladas", cajas[1]], ["Acertada 1 vez", cajas[2]], ["Acertada 2 veces", cajas[3]], ["Acertada 3 veces", cajas[4]], ["Último repaso", cajas[5]]]
        .filter(([, n]) => n).map(([t, n]) => fila({ titulo: t, valor: String(n) }))),
      cabecera("Por materia"),
      grupo("con-icono", Object.keys(porMateria).map(Number).sort((a, b) => a - b).map(m => fila({ numero: m, color: "naranja", titulo: materia(m)[1], valor: String(porMateria[m]) }))),
      h("div", { class: "pila" },
        hoyIds.length && hoyIds.length < todas.length ? h("button", { class: "boton plano", onclick: () => empezar(todas) }, `Repasar las ${todas.length}, aunque no toquen hoy`) : null,
        h("button", { class: "boton plano destructivo", onclick: () => hoja({ titulo: "¿Vaciar la lista de fallos?", mensaje: "Las preguntas saldrán del repaso. Esta acción no se puede deshacer.",
          acciones: [{ texto: "Vaciar la lista", clase: "gris destructivo", accion: () => { P.vaciarRepaso(datos); guardar(); portadaFallos(); } }] }) }, "Vaciar la lista")));
  }
  // op (opcional, para extensiones): { alTerminar(sesion) } devuelve nodos para la pantalla de resultado.
  function practicar(lista, modo, titulo, vuelta, op) {
    pararReloj();
    ordenes = new Map();
    const s = { lista, modo, titulo, vuelta, i: 0, resp: {}, aciertos: 0, seguidas: 0, mejorSerie: 0, alTerminar: (op && op.alTerminar) || null };
    sesion = s;
    pintarPractica(s);
  }
  function pintarPractica(s, recien) {
    const p = s.lista[s.i], n = s.lista.length;
    if (!p) return finPractica(s);
    const elegida = s.resp[p.id], corregida = elegida != null, hechas = Object.keys(s.resp).length, o = ordenDe(p);
    const elegir = k => {
      if (s.resp[p.id]) return;
      s.resp[p.id] = k;
      const ok = k === p.correcta; if (ok) s.aciertos++;
      registrar(p, ok);
      if (!ok && ALFALLAR.length) {
        const contenedor = h("div", { class: "al-fallar" });
        const continuar = () => { if (s.pendiente === p.id) { s.pendiente = null; s.contenedor = null; if (sesion === s) pintarPractica(s, true); } };
        for (const fn of ALFALLAR) {
          let quiere = false;
          try { quiere = fn({ p, elegida: k, modo: s.modo, contenedor, continuar }) === true; } catch (e) { quiere = false; }
          if (quiere) { s.pendiente = p.id; s.contenedor = contenedor; break; }
        }
      }
      s.seguidas = ok ? s.seguidas + 1 : 0; s.mejorSerie = Math.max(s.mejorSerie, s.seguidas);
      s.frase = ok ? elegirFrase(FRASES_ACIERTO) : "";
      pintarPractica(s, true);
      if (ok) sonar("acierto"); else { sonar("fallo"); if (window.Animo) Animo.vibrar(60); }
      const cumplido = sumarAlDia(1);
      // Series de aciertos seguidos: 3, 5, 10 y cada 5 más.
      if (ok && !cumplido && (s.seguidas === 3 || (s.seguidas >= 5 && s.seguidas % 5 === 0)) && window.Animo) {
        setTimeout(() => { Animo.sonar("serie", s.seguidas); Animo.aviso(`¡${s.seguidas} seguidas!`); }, 380);
      }
      const ex = app.querySelector(".explicacion");
      if (ex) ex.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    };
    const seguir = () => { if (s.resp[p.id] && s.pendiente !== p.id) { s.i++; pintarPractica(s); } };
    const acerto = corregida && elegida === p.correcta;
    // Una extensión (App.alFallar) se ha quedado el turno tras el fallo: pinta su bloque y, cuando
    // llame a continuar(), se muestra la corrección de siempre.
    if (s.pendiente === p.id) {
      return pantalla({ titulo: s.titulo, fijo: true, sesion: true, mantenerScroll: true,
        atras: { texto: "Terminar", icono: false, accion: () => finPractica(s) },
        barra: [h("button", { class: "boton", disabled: true }, "Responde para continuar")] },
        avance(`Pregunta ${s.i + 1} de ${n}`, `${plural(s.aciertos, "acierto", "aciertos")} · ${plural(hechas - s.aciertos, "fallo", "fallos")}`, s.i, n),
        pregunta(p, elegida, false, null, false, o), s.contenedor);
    }
    pantalla({ titulo: s.titulo, fijo: true, sesion: true, mantenerScroll: recien,
      atras: { texto: "Terminar", icono: false, accion: () => hechas ? finPractica(s) : (sesion = null, location.hash = s.vuelta, ruta()) },
      feedback: corregida ? { ok: acerto, titulo: acerto ? (s.frase || "¡Correcto!") : "No es esa",
        detalle: acerto ? (s.seguidas >= 3 ? `${s.seguidas} aciertos seguidos` : null) : `La correcta es la ${letraVista(p, p.correcta, o)}. Lee la explicación.` } : null,
      barra: [h("button", { class: "boton" + (corregida ? (acerto ? " verde" : " rojo") : ""), disabled: !corregida, onclick: seguir }, corregida ? (s.i < n - 1 ? "Continuar" : "Ver resultado") : "Elige una respuesta")],
      teclas: { a: () => elegir(o[0]), b: () => elegir(o[1]), c: () => elegir(o[2]), 1: () => elegir(o[0]), 2: () => elegir(o[1]), 3: () => elegir(o[2]), enter: seguir, arrowright: seguir } },
      avance(`Pregunta ${s.i + 1} de ${n}`, `${plural(s.aciertos, "acierto", "aciertos")} · ${plural(hechas - s.aciertos, "fallo", "fallos")}`, s.i + (corregida ? 1 : 0), n),
      pregunta(p, elegida, corregida, elegir, recien, o));
  }
  function finPractica(s) {
    sesion = null;
    const hechas = Object.keys(s.resp).length, fallos = hechas - s.aciertos;
    const pct = hechas ? Math.round(s.aciertos / hechas * 100) : 0;
    const pendientes = fallosDeHoy().length;
    const bien = hechas >= 5 && pct >= 90, frase = !hechas ? "" : pct === 100 ? "¡Todas bien! Impecable." : pct >= 90 ? "¡Nivel de examen!" : pct >= 70 ? "¡Buen trabajo! Vas por buen camino." : "Repasa los fallos y verás cómo sube.";
    const cifraPct = h("h1", {}, `${pct} %`);
    const aInicio = s.modo !== "temario";
    pantalla({ titulo: "Resultado", atras: { texto: aInicio ? "Inicio" : "Temario", href: aInicio ? "#/" : "#/temario" } },
      h("div", { class: "resultado " + (fallos ? (bien ? "apto" : "neutro") : "apto") },
        h("div", { class: "simbolo" }, ico(bien || !fallos ? "trofeo" : "lista")),
        cifraPct,
        frase ? h("p", { class: "animo-frase" }, frase) : null,
        h("p", {}, `Has acertado ${s.aciertos} de ${plural(hechas, "pregunta", "preguntas")}.`, s.mejorSerie >= 3 ? ` Mejor serie: ${s.mejorSerie} seguidas.` : "")),
      cifras([String(s.aciertos), "Aciertos"], [String(fallos), "Fallos"], [String(s.lista.length - hechas), "Sin hacer"]),
      s.alTerminar ? s.alTerminar(s) : null,
      tarjetaRacha("racha-resultado"),
      h("div", { class: "pila" },
        s.modo === "fallos"
          ? (pendientes ? h("a", { class: "boton ancho", href: "#/fallos", onclick: () => setTimeout(ruta) }, `Seguir repasando (${pendientes})`) : null)
          : h("button", { class: "boton ancho", onclick: () => practicar(barajar(s.lista), s.modo, s.titulo, s.vuelta, { alTerminar: s.alTerminar }) }, "Repetir estas preguntas"),
        s.modo !== "fallos" && fallos ? h("a", { class: "boton ancho gris", href: "#/fallos" }, "Repasar mis fallos") : null,
        h("a", { class: "boton ancho gris", href: s.modo === "fallos" ? "#/" : s.vuelta, onclick: () => setTimeout(ruta) }, s.modo === "temario" ? "Cambiar la selección" : "Volver al inicio")));
    if (hechas && window.Animo) {
      Animo.contar(cifraPct, pct, { formato: v => `${v} %` });
      setTimeout(() => { if (bien || !fallos) Animo.sonar("aprobado"); else if (pct >= 70) Animo.sonar("meta"); if (bien) Animo.confeti(); }, 150);
    }
  }

  // ---------- Dudosas ----------
  function dudosas() {
    pararReloj();
    const ids = Object.keys(datos.dudosas);
    const atras = { texto: "Inicio", href: "#/" };
    if (!ids.length) return pantalla({ titulo: "Preguntas dudosas", atras }, vacio("bandera", "Ninguna pregunta marcada", "Después de responder, toca «Marcar como dudosa» si una pregunta te parece mal planteada o no coincide con lo que te han explicado."));
    const texto = ids.map(id => { const p = POR_ID.get(id), d = datos.dudosas[id]; return `${id} (${fechaES(d.fecha)})${p ? ": " + p.enunciado : ""}${d.nota ? "\n  Nota: " + d.nota : ""}`; }).join("\n");
    const copiar = h("button", { class: "boton", onclick: () => (navigator.clipboard ? navigator.clipboard.writeText(texto) : Promise.reject())
      .then(() => { copiar.textContent = "Copiada"; setTimeout(() => copiar.textContent = "Copiar la lista", 2000); }, () => { copiar.textContent = "Selecciona el texto y cópialo"; }) }, "Copiar la lista");
    pantalla({ titulo: "Preguntas dudosas", atras, barra: [copiar] },
      h("h1", { class: "titulo-grande" }, "Preguntas dudosas"),
      h("p", { class: "subtitulo" }, "Copia la lista y envíala para que se revisen contra el BOE."),
      h("textarea", { class: "lista", readonly: true, "aria-label": "Lista de preguntas dudosas" }, texto),
      h("div", { class: "pila" }, h("button", { class: "boton plano destructivo", onclick: () => hoja({ titulo: "¿Borrar todas las marcas?", mensaje: "Esta acción no se puede deshacer.",
        acciones: [{ texto: "Borrar las marcas", clase: "gris destructivo", accion: () => { P.quitarDudosas(datos); guardar(); dudosas(); } }] }) }, "Borrar todas las marcas")),
      cabecera("Preguntas marcadas"),
      ids.filter(id => POR_ID.has(id)).map(id => h("section", { class: "revision" }, pregunta(POR_ID.get(id), POR_ID.get(id).correcta, true))));
  }

  // ---------- Fuentes ----------
  function fuentes() {
    pararReloj();
    const normas = Object.entries(BANCO.normativa || {});
    pantalla({ titulo: "Fuentes y aviso legal", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Fuentes"),
      h("div", { class: "tarjeta prosa", style: "margin-top:12px" },
        h("p", {}, "Esta web no es de la DGT. Las preguntas son propias y cada una se ha comprobado contra el texto consolidado de la norma en el BOE o, en los temas que no regula una norma, contra el manual del permiso B de la DGT. Junto a cada respuesta se muestran la referencia y el texto literal que la justifica."),
        h("p", {}, "Basado en datos de la Agencia Estatal Boletín Oficial del Estado. Los textos consolidados tienen valor informativo; solo hace fe la publicación oficial en el BOE.")),
      cabecera("Normas consultadas"),
      grupo("", normas.map(([k, v]) => fila({ titulo: v.nombre || NOMBRE_NORMA_CORTO[k] || k,
        detalle: [/^BOE-[A-Z]-\d{4}-\d+$/.test(v.ref) ? null : v.ref, v.ultima_actualizacion ? `Versión del ${fechaES(v.ultima_actualizacion)}` : null].filter(Boolean).join(" · "),
        href: /BOE-[A-Z]-\d{4}-\d+/.test(v.ref || "") ? `https://www.boe.es/buscar/act.php?id=${v.ref.match(/BOE-[A-Z]-\d{4}-\d+/)[0]}` : null, externo: true })),
        normas.some(([, v]) => v.ref === "BOE-A-2009-9481") ? null : fila({ titulo: "Reglamento General de Conductores (RD 818/2009)", detalle: "Anexos V y VI: materias y formato del examen", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481", externo: true })),
      h("p", { class: "nota-pie" }, `Banco de preguntas generado el ${fechaES(BANCO.generado)}. Tus resultados, fallos y marcas se guardan solo en este navegador; puedes pasarlos a otro dispositivo desde «Estudiar en otro dispositivo».`));
  }

  // ---------- Mi progreso: dominio por materia y «lista para el examen» ----------
  function progresoPantalla() {
    pararReloj();
    const prep = P.preparacion(datos, TODAS, POR_MATERIA);
    const g = prep.global, racha = P.racha(datos);
    const barraDominio = r => h("span", { class: "dominio", role: "img", "aria-label": `${Math.floor(r.dominio * 100)} % dominado` },
      h("i", { class: "d-dominada", style: `width:${r.dominada / r.total * 100}%` }),
      h("i", { class: "d-vista", style: `width:${(r.vista) / r.total * 100}%` }),
      h("i", { class: "d-repaso", style: `width:${r.repaso / r.total * 100}%` }));
    pantalla({ titulo: "Mi progreso", atras: { texto: "Inicio", href: "#/" } },
      h("div", { class: "resultado " + (prep.lista ? "apto" : "neutro") },
        h("div", { class: "simbolo" }, ico(prep.lista ? "check" : "examen")),
        h("h1", {}, prep.lista ? "Todo listo para el examen" : `Preparación: ${Math.round(prep.avance * 100)} %`),
        h("p", {}, prep.lista ? "Cumples todos los criterios. Mantén el repaso al día hasta la fecha del examen." : "Cuando cumplas los cuatro criterios, tendrás todo listo para presentarte.")),
      cifras([String(g.dominada), "Dominadas"], [String(g.vistas), "Vistas"], [plural(racha, "día", "días"), "Racha"]),
      cabecera("Criterios"),
      grupo("con-icono", prep.criterios.map(c => fila({ icono: c.cumple ? "check" : "x", color: c.cumple ? "verde" : "gris", titulo: c.texto, detalle: c.detalle,
        href: c.id === "repaso" ? "#/fallos" : c.id === "examenes" ? "#/examen" : c.id === "materias" && c.materia ? `#/temario/${c.materia}` : null }))),
      h("p", { class: "nota-pie" }, "Una pregunta está dominada cuando aciertas las dos últimas veces que la respondes y no está en el repaso de fallos. Un acierto suelto no basta, porque con tres opciones se puede acertar por suerte."),
      cabecera("Dominio por materia"),
      grupo("con-icono", MATERIAS.filter(([n]) => POR_MATERIA[n]).map(([n, nombre]) => {
        const r = prep.materias[n];
        return h("a", { class: "fila", href: `#/temario/${n}` },
          h("span", { class: "tesela t-" + (r.dominio >= P.CRITERIOS.dominioMateria ? "verde" : "indigo") }, n),
          h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, nombre),
            h("span", { class: "fila-detalle" }, `${r.dominada} de ${r.total} dominadas · ${r.vistas} vistas${r.repaso ? ` · ${r.repaso} en repaso` : ""}`), barraDominio(r)),
          h("span", { class: "fila-valor" }, `${Math.floor(r.dominio * 100)} %`), ico("chevron", "chevron"));
      })),
      h("div", { class: "leyenda" }, h("span", {}, h("i", { class: "d-dominada" }), "Dominada"), h("span", {}, h("i", { class: "d-vista" }), "Vista"), h("span", {}, h("i", { class: "d-repaso" }), "En repaso")));
  }

  // ---------- Pasar el progreso a otro dispositivo ----------
  // La web es estática (GitHub Pages) y no tiene servidor: el progreso vive en cada navegador.
  // Para moverlo se genera un enlace o un fichero con el progreso, y al abrirlo en el otro
  // dispositivo se COMBINA con lo que ya haya allí (no se pierde nada de ninguno de los dos).
  // ---------- Guardado en la nube (nube.js) ----------
  const nube = () => window.Nube && Nube.estado.disponible ? Nube.estado : null;
  function textoNube(n) {
    if (n.sincronizando) return "Guardando en la nube…";
    if (n.error) return n.error;
    if (n.pendiente && navigator.onLine === false) return "Sin conexión. Se guardará en la nube cuando vuelva.";
    if (n.ultima) return `Guardado en la nube a las ${new Date(n.ultima).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`;
    return "Conectando con la nube…";
  }
  // Fila de la pantalla de inicio: lleva al perfil (perfil.js) con el estado del guardado.
  function filaPerfil() {
    const n = nube();
    const detalle = !n ? "Estadísticas, ajustes y copia de seguridad"
      : n.usuario ? [n.usuario.nombre, textoNube(n)].filter(Boolean).join(" · ")
      : "Sin cuenta: tu progreso solo se guarda en este dispositivo";
    return fila({ icono: "persona", color: n && n.usuario && !n.error ? "verde" : n ? "naranja" : "azul", titulo: "Mi perfil", detalle, href: "#/perfil" });
  }
  function seccionNube() {
    const n = nube();
    if (!n) return null;
    if (!n.usuario) return [cabecera("Guardado automático"),
      grupo("con-icono", fila({ icono: "nube", color: "azul", titulo: "Iniciar sesión con Google", detalle: "Tu progreso se guarda en la nube y se sincroniza solo entre el móvil y el ordenador", accion: () => Nube.entrar() })),
      n.error ? h("p", { class: "nota-pie", role: "status" }, n.error) : null];
    return [cabecera("Guardado automático"),
      grupo("con-icono",
        fila({ icono: "nube", color: n.error ? "naranja" : "verde", titulo: n.usuario.nombre || "Sesión iniciada", detalle: [n.usuario.correo, textoNube(n)].filter(Boolean).join(" · "), accion: () => Nube.sincronizar(), chevron: false }),
        fila({ icono: "salir", color: "gris", titulo: "Cerrar sesión", detalle: "El progreso sigue guardado en este dispositivo y en la nube", accion: () => hoja({ titulo: "¿Cerrar sesión?",
          mensaje: "Lo que ya has estudiado sigue en este dispositivo y en la nube. Mientras no vuelvas a iniciar sesión, lo nuevo solo se guardará aquí.",
          acciones: [{ texto: "Cerrar sesión", clase: "gris destructivo", accion: () => Nube.salir() }] }) }))];
  }
  // La nube trae progreso de otro dispositivo: se combina con el de aquí y se repinta si no hay nada a medias.
  window.addEventListener("progreso-nube", e => {
    datos = P.combinar(datos, e.detail); guardar();
    repintarSiSeguro();
  });
  let firmaNube = "";
  window.addEventListener("nube-estado", () => {
    const n = nube(), firma = n ? [n.usuario && n.usuario.correo, n.error, n.ultima].join("|") : "";
    if (["copia", "perfil"].includes(seccionActual())) return repintarSiSeguro();
    if (firma !== firmaNube) { firmaNube = firma; if (seccionActual() === "inicio") repintarSiSeguro(); }
  });
  function repintarSiSeguro() {
    if (sesion || document.querySelector("dialog[open]")) return;
    if (["inicio", "progreso", "copia", "perfil"].includes(seccionActual())) { const y = window.scrollY; ruta(); window.scrollTo(0, y); }
    else pintarLateral(seccionActual());
  }

  function copiaPantalla() {
    pararReloj();
    const estado = h("p", { class: "nota-pie", role: "status" });
    const compartir = async () => {
      try {
        const url = location.href.split("#")[0] + "#/importar/" + await P.exportarCodigo(datos);
        if (navigator.share) { try { await navigator.share({ title: "Mi progreso del test permiso B", url }); estado.textContent = "Enlace compartido."; return; } catch (e) { if (e.name === "AbortError") return; } }
        await navigator.clipboard.writeText(url);
        estado.textContent = "Enlace copiado. Pégalo en un mensaje para ti (por ejemplo, en WhatsApp o en un correo) y ábrelo en el otro dispositivo.";
      } catch (e) { estado.textContent = "No se ha podido crear el enlace. Usa el fichero de copia."; }
    };
    const descargar = () => {
      const blob = new Blob([P.exportarFichero(datos)], { type: "application/json" });
      const a = h("a", { href: URL.createObjectURL(blob), download: `progreso-test-permiso-b-${P.claveDia(Date.now())}.json` });
      document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      estado.textContent = "Fichero descargado. Ábrelo en el otro dispositivo con «Cargar un fichero de copia».";
    };
    const entrada = h("input", { type: "file", accept: ".json,application/json", hidden: true, onchange: async () => {
      const f = entrada.files[0]; entrada.value = "";
      if (!f) return;
      try { confirmarImportacion(P.leerPaquete(await f.text())); } catch (e) { estado.textContent = e.message; }
    } });
    const pegar = () => {
      const t = h("textarea", { placeholder: "Pega aquí el enlace o el código", "aria-label": "Enlace o código" });
      hoja({ titulo: "Pegar un enlace de progreso", contenido: t, acciones: [{ texto: "Cargar", accion: async () => {
        try { confirmarImportacion(await P.importarCodigo(t.value)); } catch (e) { estado.textContent = e.message; }
      } }] });
    };
    const g = P.resumen(datos, TODAS);
    pantalla({ titulo: "Copia y otro dispositivo", atras: { texto: "Perfil", href: "#/perfil" } },
      h("h1", { class: "titulo-grande" }, "Estudiar en otro dispositivo"),
      h("p", { class: "subtitulo" }, nube()
        ? "Inicia sesión con Google en el móvil y en el ordenador y tu progreso se sincroniza solo. Sin conexión también se guarda aquí, y se sube a la nube cuando vuelve."
        : "Tu progreso se guarda en este navegador. Para seguir en el móvil o en el ordenador, envíatelo con un enlace y ábrelo allí: se combina con lo que ya tengas en ese dispositivo, sin borrar nada."),
      cifras([String(g.vistas), "Vistas"], [String(g.dominada), "Dominadas"], [String(datos.historial.length), "Exámenes"]),
      seccionNube(),
      cabecera(nube() ? "Copia manual" : "Enviar mi progreso"),
      grupo("con-icono",
        fila({ icono: "enlace", color: "verde", titulo: navigator.share ? "Compartir enlace" : "Copiar enlace", detalle: "Envíatelo por WhatsApp o correo y ábrelo en el otro dispositivo", accion: compartir }),
        fila({ icono: "lista", color: "gris", titulo: "Descargar fichero de copia", detalle: "También sirve como copia de seguridad", accion: descargar })),
      cabecera("Recibir progreso"),
      grupo("con-icono",
        fila({ icono: "enlace", color: "azul", titulo: "Pegar un enlace o código", accion: pegar }),
        fila({ icono: "lista", color: "azul", titulo: "Cargar un fichero de copia", accion: () => entrada.click() })),
      entrada, estado,
      h("p", { class: "nota-pie" }, nube() ? "La copia manual sirve como copia de seguridad, o para pasar el progreso sin iniciar sesión. Al cargarla se combina con lo que ya haya, sin borrar nada." : "Consejo: al terminar de estudiar en un dispositivo, envía el enlace y ábrelo en el otro antes de empezar allí. Si estudias en los dos sin pasarlo, no pasa nada: al combinar, de cada pregunta se queda la respuesta más reciente."));
  }
  function confirmarImportacion({ datos: otros, exportado, animo }) {
    const g = P.resumen(otros, TODAS), cuando = exportado ? new Date(exportado).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }) : null;
    hoja({ titulo: "¿Combinar este progreso?", mensaje: `${cuando ? `Copia del ${cuando}. ` : ""}${plural(g.vistas, "pregunta vista", "preguntas vistas")}, ${plural(g.dominada, "dominada", "dominadas")} y ${plural(otros.historial.length, "examen", "exámenes")}. Se combinará con el progreso de este dispositivo; no se borra nada.`,
      acciones: [{ texto: "Combinar", accion: () => {
        datos = P.combinar(datos, otros); guardar(); P.combinarAnimo(animo);
        history.replaceState(null, "", location.pathname + location.search + "#/progreso"); ruta();
        hoja({ titulo: "Progreso combinado", mensaje: "Ya puedes seguir estudiando en este dispositivo.", cancelar: "Aceptar" });
      } }] });
  }
  async function importarDesdeEnlace(codigo) {
    inicio();
    try { confirmarImportacion(await P.importarCodigo(codigo)); }
    catch (e) { hoja({ titulo: "No se ha podido leer el enlace", mensaje: e.message, cancelar: "Aceptar" }); }
    history.replaceState(null, "", location.pathname + location.search + "#/");
  }

  // ---------- Rutas ----------
  let sesion = null;
  const RUTAS = {}, INICIO = { arriba: [], practicar: [], abajo: [] }, LATERAL = [], ALFALLAR = [];
  function extrasInicio(lugar) {
    return INICIO[lugar].map(fn => { try { return fn(); } catch (e) { console.error(e); return null; } });
  }
  // Barra lateral (solo en pantallas anchas, como en las apps de iPad y Mac).
  const lateral = document.getElementById("lateral");
  function pintarLateral(seccion) {
    const nf = fallosDeHoy().length, nd = Object.keys(datos.dudosas).length;
    const item = (id, href, icono, color, texto, extra) => h("li", {}, h("a", { class: "lateral-item" + (seccion === id ? " activo" : ""), href, "aria-current": seccion === id ? "page" : null },
      h("span", { class: "tesela t-" + color }, ico(icono)), h("span", { class: "lateral-texto" }, texto), extra ? h("span", { class: "lateral-cuenta" }, extra) : null));
    lateral.replaceChildren(
      h("a", { class: "lateral-marca", href: "#/" }, h("img", { src: "icono.svg", alt: "" }), h("span", {}, "Test permiso B")),
      h("p", { class: "lateral-cabecera" }, "Practicar"),
      h("ul", {}, item("inicio", "#/", "lista", "gris", "Resumen"), LATERAL.map(l => item(l.id, l.href, l.icono, l.color, l.texto, l.cuenta ? l.cuenta() : null)),
        item("examen", "#/examen", "examen", "azul", "Examen final"), item("temario", "#/temario", "libro", "indigo", "Examen por temario")),
      h("p", { class: "lateral-cabecera" }, "Repasar"),
      h("ul", {}, item("fallos", "#/fallos", "repetir", "naranja", "Mis fallos", nf ? String(nf) : null), item("dudosas", "#/dudosas", "bandera", "rojo", "Preguntas dudosas", nd ? String(nd) : null),
        item("progreso", "#/progreso", "check", "verde", "Mi progreso")),
      h("p", { class: "lateral-cabecera" }, "Información"),
      h("ul", {}, item("perfil", "#/perfil", "persona", "azul", "Mi perfil"), item("copia", "#/copia", "enlace", "verde", "Copia y otro dispositivo"), item("fuentes", "#/fuentes", "info", "gris", "Fuentes y aviso legal")),
      h("p", { class: "lateral-pie" }, `${PREGUNTAS.length} preguntas verificadas`));
  }
  function ruta() {
    const d = document.querySelector("dialog[open]"); if (d) d.close();
    const r = (location.hash || "#/").slice(1).split("/").filter(Boolean);
    pintarLateral(r[0] || "inicio");
    // Pantallas de las extensiones (App.ruta). Ganan sobre las de aquí; si devuelven false, sigue la de siempre.
    if (r[0] && RUTAS[r[0]]) { pararReloj(); if (RUTAS[r[0]](r.slice(1)) !== false) return; }
    if (r[0] === "examen") return portadaExamen();
    if (r[0] === "temario") return r[1] ? portadaMateria(Number(r[1])) : listaTemario();
    if (r[0] === "fallos") return portadaFallos();
    if (r[0] === "dudosas") return dudosas();
    if (r[0] === "fuentes") return fuentes();
    if (r[0] === "progreso") return progresoPantalla();
    if (r[0] === "copia") return copiaPantalla();
    if (r[0] === "importar") return importarDesdeEnlace(r.slice(1).join("/"));
    return inicio();
  }
  window.addEventListener("hashchange", () => { sesion = null; ruta(); });
  window.addEventListener("beforeunload", e => { if (sesion && sesion.limite) { e.preventDefault(); e.returnValue = ""; } });
  // ---------- API para extensiones (estudiar.js, errores.js, camino.js, companero.js) ----------
  // Se cargan después de app.js; la primera pantalla se pinta cuando ya están todas (DOMContentLoaded).
  window.App = {
    h, ico, ICONOS, fila, grupo, cabecera, cifras, segmentos, pantalla, hoja, vacio, avance, pregunta, barajar, priorizar, plural, fechaES, fechaCorta, mmss,
    materia, nombreTema, tarjetaRacha, sonar, seccionNube, textoNube, repintarSiSeguro, practicar, empezarExamen, pararReloj, repintar: () => ruta(),
    MATERIAS, PREGUNTAS, POR_ID, POR_MATERIA, TODAS, EXAMEN_PREGUNTAS, PROPORCION_FALLOS,
    get datos() { return datos; }, guardar,
    get sesion() { return sesion; },
    pantallas: { inicio, listaTemario, portadaMateria, portadaExamen, portadaFallos },
    // Pantalla #/nombre/...: fn(partes) recibe el resto de la ruta.
    ruta(nombre, fn) { RUTAS[nombre] = fn; },
    // Bloques extra en la portada. lugar: "arriba" (tras la racha), "practicar" (filas al principio de
    // «Practicar») o "abajo" (antes de «Información»). fn() devuelve nodos o null.
    inicioExtra(fn, lugar = "abajo") { (INICIO[lugar] || INICIO.abajo).push(fn); },
    // Entrada en la barra lateral del ordenador, sección «Practicar»: { id, href, icono, color, texto, cuenta() }.
    lateralExtra(l) { LATERAL.push(l); },
    // Tras un fallo en práctica (no en exámenes): fn({ p, elegida, modo, contenedor, continuar }) devuelve
    // true si se queda el turno; entonces pinta en contenedor y llama a continuar() para ver la corrección.
    alFallar(fn) { ALFALLAR.push(fn); },
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => ruta()); else ruta();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
