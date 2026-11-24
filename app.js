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
  const NOMBRE_NORMA_CORTO = { RGC: "Reglamento General de Circulación", LSV: "Ley de Tráfico", RGCond: "Reglamento General de Conductores", RGCOND: "Reglamento General de Conductores", MANUAL_DGT: "Manual del permiso B (DGT)", ITV: "Reglamento de ITV (RD 920/2017)", LRCSCVM: "Ley del seguro obligatorio (RDL 8/2004)", OCURSOS: "Orden de cursos del permiso por puntos (INT/2596/2005)", RGV: "Reglamento General de Vehículos", CP: "Código Penal" };
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

  // ---------- Almacenamiento local ----------
  const CLAVE = "testB.v1";
  let datos = cargar();
  function cargar() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { /* sin almacenamiento */ }
    d = d && typeof d === "object" ? d : {};
    return { fallos: d.fallos || {}, dudosas: d.dudosas || {}, historial: d.historial || [], vistas: d.vistas || {} };
  }
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* sin almacenamiento */ } }
  function registrar(p, acierto, modo) {
    const v = datos.vistas[p.id] || { ok: 0, ko: 0 };
    acierto ? v.ok++ : v.ko++;
    datos.vistas[p.id] = v;
    if (!acierto) datos.fallos[p.id] = { veces: ((datos.fallos[p.id] || {}).veces || 0) + 1, fecha: hoy() };
    else if (modo === "fallos") delete datos.fallos[p.id];
    guardar();
  }
  const fallosActuales = () => Object.keys(datos.fallos).filter(id => POR_ID.has(id));

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
      ? h("a", { class: "nav-boton", href: a.href }, a.icono === false ? null : ico("atras"), a.texto)
      : h("button", { class: "nav-boton", onclick: a.accion }, a.icono === false ? null : ico("atras"), a.texto)] : []));
    app.replaceChildren(...hijos.flat(Infinity).filter(c => c != null && c !== false));
    const b = (op.barra || []).filter(Boolean);
    barra.hidden = !b.length;
    barra.replaceChildren(h("div", {}, b));
    app.classList.toggle("con-barra", !!b.length);
    document.body.classList.toggle("sesion", !!op.sesion);
    teclas = op.teclas || null;
    if (!op.mantenerScroll) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
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
  function hoy() { return new Date().toISOString().slice(0, 10); }
  function fechaES(iso) { if (!iso) return ""; const [y, m, d] = iso.slice(0, 10).split("-"); return [d, m, y].filter(Boolean).join("/"); }
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
  const grupo = (clase, ...filas) => h("ul", { class: "grupo " + (clase || "") }, filas.flat().filter(Boolean).map(f => h("li", {}, f)));
  const cabecera = t => h("h2", { class: "cabecera" }, t);
  const cifras = (...c) => h("div", { class: "cifras" }, c.map(([v, t]) => h("div", { class: "cifra" }, h("b", {}, v), h("span", {}, t))));
  function segmentos(opciones, actual, alCambiar) {
    const caja = h("div", { class: "segmentos", role: "group" });
    const pintar = () => caja.replaceChildren(...opciones.map(([v, t]) => h("button", { "aria-pressed": String(v === actual), onclick: () => { actual = v; pintar(); alCambiar(v); } }, t)));
    pintar();
    return caja;
  }

  // Orden de las opciones: se baraja en cada sesión para que no se pueda acertar por posición.
  // No se baraja si alguna opción se refiere a la posición de otra ("las dos anteriores", "a y b"...).
  const NATURAL = ["a", "b", "c"];
  const DEPENDE_DEL_ORDEN = /anterior|ambas|las dos\b|los dos\b|ninguna de|todas las (respuestas|opciones)|\b[abc]\)|\b[ab] y [bc]\b|opci[oó]n(es)? [abc]\b|respuestas? [abc]\b/i;
  let ordenes = new Map();
  function ordenDe(p) {
    if (!ordenes.has(p.id)) ordenes.set(p.id, NATURAL.some(k => DEPENDE_DEL_ORDEN.test(p.opciones[k])) ? NATURAL : barajar(NATURAL));
    return ordenes.get(p.id);
  }
  const letraVista = (p, k, orden) => "ABC"[orden.indexOf(k)];
  function textoFuente(p) {
    const f = p.fuente;
    const norma = NOMBRE_NORMA_CORTO[f.norma] || (BANCO.normativa[f.norma] || {}).nombre || f.norma;
    return `${norma}, ${/^(anexo|disposici)/i.test(f.articulo) ? f.articulo : "art. " + f.articulo}`;
  }
  function figura(p) {
    const i = p.imagen;
    if (!i || !i.src) return null;
    return h("figure", { class: "figura" }, h("img", { src: i.src, alt: i.alt || "" }), i.credito ? h("figcaption", {}, i.credito) : null);
  }
  function bloqueExplicacion(p, elegida, animada, orden) {
    const ok = elegida === p.correcta, f = p.fuente, letra = letraVista(p, p.correcta, orden);
    const filaDudosa = h("div", {});
    const pintarDudosa = () => {
      const m = datos.dudosas[p.id];
      filaDudosa.replaceChildren(h("button", { class: "fila", onclick: () => m ? (delete datos.dudosas[p.id], guardar(), pintarDudosa()) : pedirNota(p, pintarDudosa) },
        ico("bandera"), h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, m ? "Quitar la marca de dudosa" : "Marcar como dudosa"),
          m && m.nota ? h("span", { class: "fila-detalle" }, m.nota) : null)));
    };
    pintarDudosa();
    return h("div", { class: "explicacion" + (ok ? "" : " mal") + (animada ? " animada" : ""), role: animada ? "status" : null },
      h("p", { class: "veredicto" }, ico(ok ? "check" : "x"),
        elegida == null ? `Sin responder. La correcta es la ${letra}` : ok ? "Correcto" : `Incorrecto. La correcta es la ${letra}`),
      h("div", { class: "explicacion-cuerpo" },
        p.explicacion ? h("p", {}, p.explicacion) : null,
        f.tabla
          ? h("blockquote", { class: "cita" }, h("small", {}, "Tabla del BOE"), `${f.tabla.fila} · ${f.tabla.columna}: `, h("strong", {}, f.tabla.valor))
          : h("blockquote", { class: "cita" }, h("small", {}, f.tipo_cita === "imagen_catalogo" ? `Catálogo oficial de señales${f.pagina_pdf ? ", página " + f.pagina_pdf + " del PDF" : ""}` : f.norma === "MANUAL_DGT" ? "Texto literal del manual de la DGT" : "Texto literal del BOE"), `«${f.cita}»`),
        f.cita_adicional && f.cita_adicional.cita ? h("blockquote", { class: "cita" }, h("small", {}, f.cita_adicional.articulo || "Texto literal"), `«${f.cita_adicional.cita}»`) : null),
      h("a", { class: "fila", href: f.url, target: "_blank", rel: "noopener" }, ico("libro"),
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, textoFuente(p)),
          f.version_consultada ? h("span", { class: "fila-detalle" }, `${f.norma === "MANUAL_DGT" ? "Versión" : "Texto consolidado, versión"} del ${fechaES(f.version_consultada)}`) : null),
        ico("enlace", "chevron")),
      filaDudosa);
  }
  function pedirNota(p, despues) {
    const t = h("textarea", { placeholder: "¿Qué te parece raro? (opcional)", "aria-label": "Nota" });
    hoja({ titulo: "Marcar como dudosa", mensaje: "La pregunta se guardará en «Preguntas dudosas» para revisarla contra el BOE.", contenido: t,
      acciones: [{ texto: "Guardar", accion: () => { datos.dudosas[p.id] = { nota: t.value.trim(), fecha: hoy() }; guardar(); despues(); } }] });
  }
  // Pinta una pregunta. Si corregida, marca correcta/incorrecta (con icono, no solo color) y bloquea.
  function pregunta(p, elegida, corregida, alElegir, animada, orden = NATURAL) {
    const lista = h("ul", { class: "opciones" }, orden.map((k, pos) => {
      let cls = "opcion", estado = null, voz = "";
      if (corregida) {
        if (k === p.correcta) { cls += " correcta"; estado = ico("check"); voz = ", respuesta correcta"; }
        else if (k === elegida) { cls += " incorrecta"; estado = ico("x"); voz = ", tu respuesta, incorrecta"; }
        else cls += " apagada";
      } else if (k === elegida) { cls += " elegida"; estado = ico("check"); }
      return h("li", {}, h("button", { class: cls, disabled: corregida, "aria-pressed": corregida ? null : String(k === elegida), "aria-label": `${"ABC"[pos]}. ${p.opciones[k]}${voz}`, onclick: () => alElegir && alElegir(k) },
        h("span", { class: "letra" }, "ABC"[pos]), h("span", { class: "texto" }, p.opciones[k]), h("span", { class: "estado" }, estado)));
    }));
    return [figura(p), h("p", { class: "enunciado" }, p.enunciado), lista, corregida ? bloqueExplicacion(p, elegida, animada, orden) : null];
  }
  function avance(izq, der, hecho, total) {
    return [h("div", { class: "avance" }, h("strong", {}, izq), h("span", {}, der)),
      h("div", { class: "progreso", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": total, "aria-valuenow": hecho }, h("i", { style: `width:${total ? (hecho / total) * 100 : 0}%` }))];
  }

  // ---------- Inicio ----------
  function inicio() {
    pararReloj();
    const nf = fallosActuales().length, nd = Object.keys(datos.dudosas).length;
    const vistas = Object.keys(datos.vistas).filter(id => POR_ID.has(id));
    let ok = 0, tot = 0;
    for (const v of Object.values(datos.vistas)) { ok += v.ok; tot += v.ok + v.ko; }
    const aptos = datos.historial.filter(r => r.apto).length;
    const ult = datos.historial.slice(-5).reverse();
    pantalla({ titulo: "Test permiso B" },
      h("h1", { class: "titulo-grande" }, "Test permiso B"),
      h("p", { class: "subtitulo" }, `${PREGUNTAS.length} preguntas verificadas, cada una con su fuente oficial.`),
      cifras([`${vistas.length}/${PREGUNTAS.length}`, "Preguntas vistas"], [tot ? Math.round(ok / tot * 100) + " %" : "–", "Aciertos"], [datos.historial.length ? `${aptos}/${datos.historial.length}` : "–", "Exámenes aptos"]),
      cabecera("Practicar"),
      grupo("con-icono",
        fila({ icono: "examen", color: "azul", titulo: "Examen final", detalle: "30 preguntas, 30 minutos, máximo 3 fallos", href: "#/examen" }),
        fila({ icono: "libro", color: "indigo", titulo: "Examen por temario", detalle: "16 materias, con la explicación al momento", href: "#/temario" })),
      cabecera("Repasar"),
      grupo("con-icono",
        fila({ icono: "repetir", color: "naranja", titulo: "Mis fallos", insignia: nf || null, valor: nf ? null : "0", href: "#/fallos" }),
        fila({ icono: "bandera", color: "rojo", titulo: "Preguntas dudosas", valor: String(nd), href: "#/dudosas" })),
      ult.length ? [cabecera("Últimos exámenes"), grupo("", ult.map(r => h("div", { class: "fila" },
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, fechaES(r.fecha)), h("span", { class: "fila-detalle" }, `${plural(r.fallos, "fallo", "fallos")} de ${r.total} · ${mmss(r.segundos)} min`)),
        h("span", { class: "fila-valor " + (r.apto ? "apto" : "noapto") }, r.apto ? "Apto" : "No apto"))))] : null,
      cabecera("Información"),
      grupo("con-icono", fila({ icono: "info", color: "gris", titulo: "Fuentes y aviso legal", href: "#/fuentes" })),
      PREGUNTAS.length < 300 ? h("p", { class: "nota-pie" }, "El banco todavía es pequeño y no cubre todo el temario. Crecerá a medida que se verifiquen más preguntas.") : null);
  }

  // ---------- Examen final ----------
  function portadaExamen() {
    pararReloj();
    const n = Math.min(EXAMEN_PREGUNTAS, PREGUNTAS.length), max = Math.floor(n * PROPORCION_FALLOS);
    pantalla({ titulo: "Examen final", atras: { texto: "Inicio", href: "#/" },
      barra: [h("button", { class: "boton", onclick: empezarExamen, disabled: n === 0 }, "Empezar examen")], teclas: { enter: empezarExamen } },
      h("h1", { class: "titulo-grande" }, "Examen final"),
      h("p", { class: "subtitulo" }, "Un simulacro con las mismas reglas que el examen de la DGT."),
      n < EXAMEN_PREGUNTAS ? h("div", { class: "aviso" }, ico("aviso"), h("span", {}, `Ahora mismo solo hay ${PREGUNTAS.length} preguntas verificadas, así que el examen tendrá ${n}.`)) : null,
      h("div", { style: "height:16px" }),
      grupo("", fila({ titulo: "Preguntas", valor: String(n) }), fila({ titulo: "Tiempo", valor: `${n} minutos` }), fila({ titulo: "Fallos permitidos", valor: String(max) })),
      h("p", { class: "nota-pie" }, "Puedes moverte entre preguntas y cambiar tus respuestas hasta que termines. Las preguntas sin responder cuentan como fallo y la corrección se muestra al final."),
      h("p", { class: "nota-pie" }, "Formato según el Reglamento General de Conductores (RD 818/2009), anexo VI."));
  }
  function empezarExamen() {
    const lista = barajar(PREGUNTAS).slice(0, EXAMEN_PREGUNTAS);
    ordenes = new Map();
    const ex = { lista, resp: {}, i: 0, inicio: Date.now(), limite: lista.length * SEGUNDOS_POR_PREGUNTA, acabado: false };
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
    const elegir = k => { ex.resp[p.id] = k; pintarExamen(ex, true); };
    const ultima = ex.i === n - 1;
    pantalla({ titulo: "Examen final", fijo: true, sesion: true, mantenerScroll: mantener,
      atras: { texto: "Salir", icono: false, accion: () => hoja({ titulo: "¿Salir del examen?", mensaje: "Se perderán las respuestas de este examen.", cancelar: "Seguir con el examen",
        acciones: [{ texto: "Salir del examen", clase: "gris destructivo", accion: () => { sesion = null; pararReloj(); location.hash = "#/"; inicio(); } }] }) },
      barra: [
        h("button", { class: "boton gris estrecho", disabled: ex.i === 0, "aria-label": "Pregunta anterior", onclick: () => ir(ex.i - 1) }, ico("atras")),
        h("button", { class: "boton gris estrecho", "aria-label": `Ver todas las preguntas. ${hechas} de ${n} respondidas`, onclick: () => rejillaExamen(ex) }, ico("rejilla"), `${hechas}/${n}`),
        ultima ? h("button", { class: "boton", onclick: () => confirmarFin(ex) }, "Terminar") : h("button", { class: "boton", onclick: () => ir(ex.i + 1) }, "Siguiente")],
      teclas: { a: () => elegir(o[0]), b: () => elegir(o[1]), c: () => elegir(o[2]), 1: () => elegir(o[0]), 2: () => elegir(o[1]), 3: () => elegir(o[2]),
        arrowright: () => ir(ex.i + 1), arrowleft: () => ir(ex.i - 1), enter: () => ultima ? confirmarFin(ex) : ir(ex.i + 1) } },
      avance(`Pregunta ${ex.i + 1} de ${n}`, `${hechas} respondidas`, ex.i + 1, n),
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
    for (const p of ex.lista) { const ok = ex.resp[p.id] === p.correcta; if (!ok) fallos++; registrar(p, ok, "examen"); }
    const total = ex.lista.length, max = Math.floor(total * PROPORCION_FALLOS), apto = fallos <= max;
    datos.historial.push({ fecha: new Date().toISOString(), total, fallos, apto, segundos });
    datos.historial = datos.historial.slice(-50); guardar();
    sesion = null;
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
        h("h1", {}, apto ? "Apto" : "No apto"),
        h("p", {}, porTiempo ? "Se ha acabado el tiempo. " : "", apto ? `Has aprobado con ${plural(fallos, "fallo", "fallos")}.` : `Has tenido ${plural(fallos, "fallo", "fallos")} y el máximo es ${max}.`)),
      cifras([String(total - fallos), "Aciertos"], [String(fallos), "Fallos"], [mmss(segundos), "Tiempo"]),
      h("div", { class: "pila" },
        h("button", { class: "boton ancho", onclick: empezarExamen }, "Hacer otro examen"),
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
      grupo("con-icono", MATERIAS.map(([n, nombre]) => {
        const c = cuenta(n);
        return fila({ numero: n, color: c ? "indigo" : "gris", titulo: nombre, detalle: c ? plural(c, "pregunta", "preguntas") : "Aún sin preguntas verificadas",
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
    const empezar = () => { const d = disponibles(); if (d.length) practicar(barajar(d).slice(0, cuantas || undefined), "temario", `Materia ${n}`, `#/temario/${n}`); };
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
    const ids = fallosActuales();
    const atras = { texto: "Inicio", href: "#/" };
    if (!ids.length) return pantalla({ titulo: "Mis fallos", atras }, vacio("check", "Sin fallos pendientes", "Cuando falles una pregunta en cualquier modo, aparecerá aquí para que la repases."));
    const empezar = () => practicar(barajar(ids.map(id => POR_ID.get(id))), "fallos", "Mis fallos", "#/fallos");
    const porMateria = {};
    for (const id of ids) { const m = POR_ID.get(id).materia; porMateria[m] = (porMateria[m] || 0) + 1; }
    pantalla({ titulo: "Mis fallos", atras, barra: [h("button", { class: "boton", onclick: empezar }, `Repasar ${plural(ids.length, "pregunta", "preguntas")}`)], teclas: { enter: empezar } },
      h("h1", { class: "titulo-grande" }, "Mis fallos"),
      h("p", { class: "subtitulo" }, "Cada pregunta sale de esta lista cuando la aciertas en el repaso."),
      cabecera("Por materia"),
      grupo("con-icono", Object.keys(porMateria).map(Number).sort((a, b) => a - b).map(m => fila({ numero: m, color: "naranja", titulo: materia(m)[1], valor: String(porMateria[m]) }))),
      h("div", { class: "pila" }, h("button", { class: "boton plano destructivo", onclick: () => hoja({ titulo: "¿Vaciar la lista de fallos?", mensaje: "Esta acción no se puede deshacer.",
        acciones: [{ texto: "Vaciar la lista", clase: "gris destructivo", accion: () => { datos.fallos = {}; guardar(); portadaFallos(); } }] }) }, "Vaciar la lista")));
  }
  function practicar(lista, modo, titulo, vuelta) {
    pararReloj();
    ordenes = new Map();
    const s = { lista, modo, titulo, vuelta, i: 0, resp: {}, aciertos: 0 };
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
      registrar(p, ok, s.modo);
      pintarPractica(s, true);
      const ex = app.querySelector(".explicacion");
      if (ex) ex.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    };
    const seguir = () => { if (s.resp[p.id]) { s.i++; pintarPractica(s); } };
    pantalla({ titulo: s.titulo, fijo: true, sesion: true, mantenerScroll: recien,
      atras: { texto: "Terminar", icono: false, accion: () => hechas ? finPractica(s) : (sesion = null, location.hash = s.vuelta, ruta()) },
      barra: [h("button", { class: "boton", disabled: !corregida, onclick: seguir }, s.i < n - 1 ? "Siguiente" : "Ver resultado")],
      teclas: { a: () => elegir(o[0]), b: () => elegir(o[1]), c: () => elegir(o[2]), 1: () => elegir(o[0]), 2: () => elegir(o[1]), 3: () => elegir(o[2]), enter: seguir, arrowright: seguir } },
      avance(`Pregunta ${s.i + 1} de ${n}`, `${plural(s.aciertos, "acierto", "aciertos")} · ${plural(hechas - s.aciertos, "fallo", "fallos")}`, s.i + (corregida ? 1 : 0), n),
      pregunta(p, elegida, corregida, elegir, recien, o));
  }
  function finPractica(s) {
    sesion = null;
    const hechas = Object.keys(s.resp).length, fallos = hechas - s.aciertos;
    const pct = hechas ? Math.round(s.aciertos / hechas * 100) : 0;
    const pendientes = fallosActuales().length;
    pantalla({ titulo: "Resultado", atras: { texto: s.modo === "fallos" ? "Inicio" : "Temario", href: s.modo === "fallos" ? "#/" : "#/temario" } },
      h("div", { class: "resultado " + (fallos ? "neutro" : "apto") },
        h("div", { class: "simbolo" }, ico(fallos ? "lista" : "check")),
        h("h1", {}, `${pct} %`),
        h("p", {}, `Has acertado ${s.aciertos} de ${plural(hechas, "pregunta", "preguntas")}.`)),
      cifras([String(s.aciertos), "Aciertos"], [String(fallos), "Fallos"], [String(s.lista.length - hechas), "Sin hacer"]),
      h("div", { class: "pila" },
        s.modo === "fallos"
          ? (pendientes ? h("a", { class: "boton ancho", href: "#/fallos", onclick: () => setTimeout(ruta) }, `Seguir repasando (${pendientes})`) : null)
          : h("button", { class: "boton ancho", onclick: () => practicar(barajar(s.lista), s.modo, s.titulo, s.vuelta) }, "Repetir estas preguntas"),
        s.modo !== "fallos" && fallos ? h("a", { class: "boton ancho gris", href: "#/fallos" }, "Repasar mis fallos") : null,
        h("a", { class: "boton ancho gris", href: s.modo === "fallos" ? "#/" : s.vuelta, onclick: () => setTimeout(ruta) }, s.modo === "fallos" ? "Volver al inicio" : "Cambiar la selección")));
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
        acciones: [{ texto: "Borrar las marcas", clase: "gris destructivo", accion: () => { datos.dudosas = {}; guardar(); dudosas(); } }] }) }, "Borrar todas las marcas")),
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
        detalle: [/^BOE-/.test(v.ref) ? null : v.ref, v.ultima_actualizacion ? `Versión del ${fechaES(v.ultima_actualizacion)}` : null].filter(Boolean).join(" · "),
        href: /^BOE-/.test(v.ref) ? `https://www.boe.es/buscar/act.php?id=${v.ref}` : null, externo: true })),
        normas.some(([, v]) => v.ref === "BOE-A-2009-9481") ? null : fila({ titulo: "Reglamento General de Conductores (RD 818/2009)", detalle: "Anexos V y VI: materias y formato del examen", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481", externo: true })),
      h("p", { class: "nota-pie" }, `Banco de preguntas generado el ${fechaES(BANCO.generado)}. Tus resultados, fallos y marcas se guardan solo en este navegador.`));
  }

  // ---------- Rutas ----------
  let sesion = null;
  function ruta() {
    const d = document.querySelector("dialog[open]"); if (d) d.close();
    const r = (location.hash || "#/").slice(1).split("/").filter(Boolean);
    if (r[0] === "examen") return portadaExamen();
    if (r[0] === "temario") return r[1] ? portadaMateria(Number(r[1])) : listaTemario();
    if (r[0] === "fallos") return portadaFallos();
    if (r[0] === "dudosas") return dudosas();
    if (r[0] === "fuentes") return fuentes();
    return inicio();
  }
  window.addEventListener("hashchange", () => { sesion = null; ruta(); });
  window.addEventListener("beforeunload", e => { if (sesion && sesion.limite) { e.preventDefault(); e.returnValue = ""; } });
  ruta();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
