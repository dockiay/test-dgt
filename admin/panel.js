/* Sitio de administración (/admin/): métricas de uso y resultado de todas las cuentas.
   - No tiene enlaces desde la web de estudio. Solo abre los datos a las cuentas del secreto CORREO_ADMIN:
     lo deciden las reglas de Firestore, no esta página (aquí no hay ningún correo).
   - Solo lectura: lee usuarios/{uid} (progreso) y fichas/{uid} (nombre, correo, alta). Nunca escribe.
   - Las cifras se calculan con las mismas funciones de progreso.js que usa la web (racha, dominio,
     «lista para el examen»), sobre la copia que sincronizó el último dispositivo de cada cuenta.
   Fase 1: crecimiento, uso y retención, resultado y contenido con los datos que la web ya guarda. */
const P = window.Progreso, BANCO = window.BANCO || { preguntas: [] };
const DIA = 86400000;

// ---------- Banco: las mismas preguntas que publica la web ----------
const MATERIAS = ["Normas de tráfico: señales, prioridad y velocidad", "Accidentes: factores y causas", "Atención y actitud con los demás usuarios",
  "Percepción, reacción, alcohol, drogas y fatiga", "Distancias, frenado y estabilidad", "Estado de la calzada, meteorología y túneles", "La vía: clases y partes",
  "Usuarios vulnerables e inexpertos", "Riesgos según el vehículo y la visibilidad", "Documentación", "Accidentes: qué hacer y primeros auxilios",
  "Carga y personas transportadas", "Al abandonar el vehículo", "Elementos mecánicos y averías", "Equipos de seguridad y sistemas para niños", "Medio ambiente y conducción eficiente"];
const URL_OFICIAL = /^https:\/\/(www\.boe\.es|www\.dgt\.es|sede\.dgt\.gob\.es)\//;
const valida = p => { const f = p && p.fuente; return p && p.id && p.enunciado && p.opciones && ["a", "b", "c"].every(k => p.opciones[k]) && p.opciones[p.correcta] && p.materia >= 1 && p.materia <= 16 && f && f.norma && f.articulo && f.cita && URL_OFICIAL.test(f.url || "") && (!p.imagen || p.imagen.src); };
const PREGUNTAS = (BANCO.preguntas || []).filter(valida);
const POR_ID = new Map(PREGUNTAS.map(p => [p.id, p]));
const TODAS = PREGUNTAS.map(p => p.id);
const POR_MATERIA = {};
for (const p of PREGUNTAS) (POR_MATERIA[p.materia] = POR_MATERIA[p.materia] || []).push(p.id);

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
const claveDia = ms => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const msDia = k => new Date(k + "T12:00:00").getTime();
const entreDias = (a, b) => Math.round((msDia(b) - msDia(a)) / DIA);
const pct = (a, b) => b ? Math.round(a / b * 100) : null;
const txtPct = v => v == null ? "–" : `${v} %`;
const plural = (n, uno, varios) => `${n.toLocaleString("es-ES")} ${n === 1 ? uno : varios}`;
const fechaCorta = ms => new Date(ms).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
const fechaDia = ms => new Date(ms).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
const mmss = s => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
function haceCuanto(ms) {
  if (!ms) return "nunca";
  const min = Math.round((Date.now() - ms) / 60000);
  if (min < 2) return "ahora mismo";
  if (min < 60) return `hace ${min} min`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  const d = Math.round(hrs / 24);
  return d === 1 ? "ayer" : `hace ${d} días`;
}
function textoDia(k) {
  if (!k) return "Nunca";
  const d = entreDias(k, claveDia(Date.now()));
  return d <= 0 ? "Hoy" : d === 1 ? "Ayer" : `Hace ${d} días`;
}
const ms = t => t && t.toMillis ? t.toMillis() : 0;

// ---------- Firebase ----------
const panel = document.getElementById("panel"), cuentaEl = document.getElementById("cuenta"), secciones = document.getElementById("secciones");
let fb, auth, db;
async function config() {
  if (window.NUBE_CONFIG) return window.NUBE_CONFIG;
  try {
    const r = await fetch("/__/firebase/init.json", { cache: "no-cache" });
    if (!r.ok) return null;
    const c = await r.json();
    if (/\.(web\.app|firebaseapp\.com)$/.test(location.hostname)) c.authDomain = location.host;
    return c.apiKey ? c : null;
  } catch (e) { return null; }
}
function mensaje(titulo, texto, ...extra) {
  secciones.hidden = true;
  panel.replaceChildren(h("section", { class: "mensaje" }, h("img", { src: "../icono.svg", alt: "" }), h("h1", {}, titulo), h("p", {}, texto), extra));
}
const botonEntrar = () => h("button", { class: "boton", onclick: entrar }, "Iniciar sesión con Google");
async function entrar() {
  const pr = new fb.GoogleAuthProvider();
  pr.setCustomParameters({ prompt: "select_account" });
  try { await fb.signInWithPopup(auth, pr); }
  catch (e) { if (e && e.code === "auth/popup-blocked") await fb.signInWithRedirect(auth, pr); }
}
async function iniciar() {
  const c = await config();
  if (!c) return mensaje("Sin conexión con Firebase", "Este sitio solo funciona publicado en Firebase Hosting.");
  fb = await import("../vendor/firebase.js");
  const app = fb.initializeApp(c);
  auth = fb.getAuth(app); db = fb.getFirestore(app);
  if (c.emulador) { fb.connectAuthEmulator(auth, c.emulador.auth, { disableWarnings: true }); fb.connectFirestoreEmulator(db, c.emulador.host, c.emulador.puerto); }
  fb.getRedirectResult(auth).catch(() => {});
  fb.onAuthStateChanged(auth, u => {
    cuentaEl.replaceChildren(...(u ? [h("span", {}, u.email), h("button", { class: "boton plano", onclick: () => fb.signOut(auth) }, "Salir")] : []));
    if (!u) return mensaje("Administración", "Inicia sesión con la cuenta de administración.", botonEntrar());
    cargar();
  });
}

// ---------- Carga ----------
let cuentas = [], cargadoEn = 0;
async function cargar() {
  panel.replaceChildren(h("p", { class: "estado-carga", role: "status" }, "Cargando las cuentas…"));
  try {
    const [us, fs] = await Promise.all([fb.getDocs(fb.collection(db, "usuarios")), fb.getDocs(fb.collection(db, "fichas"))]);
    const fichas = new Map();
    fs.forEach(d => fichas.set(d.id, d.data()));
    const vistos = new Set();
    cuentas = [];
    us.forEach(d => { vistos.add(d.id); cuentas.push(cuenta(d.id, d.data(), fichas.get(d.id) || {})); });
    // Cuentas con ficha pero sin progreso guardado (entraron y no llegaron a sincronizar nada).
    for (const [id, f] of fichas) if (!vistos.has(id)) cuentas.push(cuenta(id, null, f));
    cargadoEn = Date.now();
    pintar();
  } catch (e) {
    if (e && e.code === "permission-denied") return mensaje("Sin acceso", `La cuenta ${auth.currentUser.email} no administra esta web. Solo pueden entrar los correos del secreto CORREO_ADMIN.`, h("button", { class: "boton plano", onclick: () => fb.signOut(auth) }, "Entrar con otra cuenta"));
    mensaje("No se han podido cargar los datos", "Comprueba la conexión y vuelve a intentarlo.", h("button", { class: "boton", onclick: cargar }, "Reintentar"));
  }
}

// ---------- Métricas de una cuenta ----------
function cuenta(uid, doc, ficha) {
  let datos;
  try { datos = P.normalizar(doc ? JSON.parse(doc.datos) : null); } catch (e) { datos = P.normalizar(null); }
  const ahora = Date.now();
  const dias = Object.keys(datos.dias).filter(k => datos.dias[k].r > 0).sort();
  const prep = P.preparacion(datos, TODAS, POR_MATERIA, ahora);
  const mats = P.dominioPorMateria(datos, POR_MATERIA);
  const peor = Object.entries(mats).filter(([, s]) => s.vistas).sort((a, b) => a[1].dominio - b[1].dominio)[0];
  const examenes = datos.historial.map(r => Object.assign({ ms: Date.parse(r.fecha) || 0 }, r));
  const finales = examenes.filter(r => r.tipo !== "semanal"), ult5 = finales.slice(-5);
  const examen = datos.plan && typeof datos.plan.examen === "string" ? datos.plan.examen : "";
  // Alta: la de la ficha o, si es anterior, el primer día que estudió (las cuentas de antes de las fichas).
  const altaFicha = ms(ficha.alta), primerDia = dias[0] ? msDia(dias[0]) : 0;
  const alta = [altaFicha, primerDia].filter(Boolean).reduce((a, b) => Math.min(a, b), Infinity);
  const totalR = Object.values(datos.dias).reduce((s, d) => s + d.r, 0), totalA = Object.values(datos.dias).reduce((s, d) => s + d.a, 0);
  return {
    uid, nombre: ficha.nombre || "", correo: ficha.correo || "", alta: alta === Infinity ? 0 : alta,
    actualizado: doc ? ms(doc.actualizado) : 0, visto: ms(ficha.visto), datos, dias, primerDia: dias[0] || null, ultimoDia: dias[dias.length - 1] || null,
    racha: P.rachaDetalle(datos, ahora).dias, prep, mats, peor: peor ? { m: +peor[0], dominio: peor[1].dominio } : null,
    examenes, ult5, aptos5: ult5.filter(r => r.apto).length, examen, diasExamen: examen ? entreDias(claveDia(ahora), examen) : null,
    totalR, totalA, repasoHoy: P.paraHoy(datos, TODAS, ahora).length,
  };
}
const nombreDe = c => c.nombre || (c.correo ? c.correo.split("@")[0] : `Cuenta ${c.uid.slice(0, 6)}`);
function suma(c, desde, hasta) { // días [desde, hasta) contando hacia atrás desde hoy
  const s = { r: 0, a: 0, activos: 0 }, ahora = Date.now();
  for (let i = desde; i < hasta; i++) { const d = c.datos.dias[claveDia(ahora - i * DIA)]; if (d && d.r) { s.r += d.r; s.a += d.a; s.activos++; } }
  return s;
}
const estudio = (c, k) => !!(c.datos.dias[k] && c.datos.dias[k].r > 0);

// ---------- Gráficas ----------
// Barras por día o por semana. series: [{clave, nombre, clase}] apiladas; valores: [{etiqueta, tip, v: {clave: n}}].
const tip = document.getElementById("tip");
function mostrarTip(e) {
  const t = e.currentTarget.dataset.tip; if (!t) return;
  tip.textContent = t; tip.hidden = false;
  const r = e.currentTarget.getBoundingClientRect(), w = tip.offsetWidth;
  tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + "px";
  tip.style.top = (r.top + scrollY - tip.offsetHeight - 8) + "px";
}
const ocultarTip = () => { tip.hidden = true; };
function barras({ valores, series, titulo, desc, pie }) {
  const max = Math.max(1, ...valores.map(x => series.reduce((s, se) => s + (x.v[se.clave] || 0), 0)));
  const cima = max <= 5 ? max : Math.ceil(max / 5) * 5;
  const cuerpo = h("div", { class: "barras", style: `--n:${valores.length}`, role: "img", "aria-label": desc },
    h("div", { class: "rejilla" }, h("span", { style: "bottom:100%" }, cima.toLocaleString("es-ES")), cima % 2 === 0 ? h("span", { style: "bottom:50%" }, (cima / 2).toLocaleString("es-ES")) : null, h("span", { style: "bottom:0" }, "0")),
    valores.map(x => h("div", { class: "columna", tabindex: "0", "data-tip": x.tip, onmouseenter: mostrarTip, onfocus: mostrarTip, onmouseleave: ocultarTip, onblur: ocultarTip },
      h("div", { class: "pila-barra" }, series.map(se => (x.v[se.clave] || 0) > 0 ? h("i", { class: se.clase, style: `height:${(x.v[se.clave] / cima) * 100}%` }) : null)))));
  const eje = h("div", { class: "eje" }, h("span", {}, valores[0].etiqueta), valores.length > 2 ? h("span", {}, valores[Math.floor(valores.length / 2)].etiqueta) : null, h("span", {}, valores[valores.length - 1].etiqueta));
  return h("figure", { class: "tarjeta grafica" },
    h("figcaption", {}, h("strong", {}, titulo), series.length > 1 ? h("span", { class: "leyenda" }, series.map(se => h("span", {}, h("i", { class: se.clase }), se.nombre))) : null),
    cuerpo, eje, pie ? h("p", { class: "nota" }, pie) : null);
}
function porDia(n, f) {
  const ahora = Date.now(), out = [];
  for (let i = n - 1; i >= 0; i--) { const t = ahora - i * DIA, k = claveDia(t); out.push(Object.assign({ etiqueta: i === 0 ? "Hoy" : fechaCorta(t) }, f(k, t))); }
  return out;
}

// ---------- Piezas ----------
const kpi = (valor, texto, detalle, tendencia) => h("div", { class: "kpi" }, h("span", { class: "kpi-texto" }, texto), h("b", {}, valor, tendencia || null), detalle ? h("span", { class: "kpi-detalle" }, detalle) : null);
function flecha(ahora, antes, unidad = " p.") {
  if (ahora == null || antes == null || ahora === antes) return null;
  const sube = ahora > antes, dif = Math.abs(ahora - antes);
  return h("span", { class: "flecha " + (sube ? "sube" : "baja"), title: "Frente al periodo anterior" }, sube ? "▲ " : "▼ ", dif, unidad,
    h("span", { class: "oculto" }, ` ${sube ? "más" : "menos"} que en el periodo anterior`));
}
const seccion = (id, titulo, sub, ...hijos) => h("section", { id, class: "seccion" }, h("h2", {}, titulo), sub ? h("p", { class: "sub" }, sub) : null, hijos);
const rejilla = (...hijos) => h("div", { class: "kpis" }, hijos);
function segmentos(opciones, actual, alCambiar) {
  return h("div", { class: "segmentos", role: "group", "aria-label": "Periodo" }, opciones.map(([v, t]) => h("button", { "aria-pressed": String(v === actual), onclick: () => alCambiar(v) }, t)));
}
function tabla(cabeceras, filas, clase) {
  return h("div", { class: "tabla-caja tarjeta" }, h("table", { class: clase || "" },
    h("thead", {}, h("tr", {}, cabeceras.map(c => h("th", { scope: "col", class: c.num ? "num" : "" }, c.t || c)))),
    h("tbody", {}, filas)));
}

// ---------- Pantalla ----------
let periodo = 7, abierta = null;
function pintar() {
  secciones.hidden = false;
  const y = scrollY;
  const n = periodo, hoy = claveDia(Date.now()), ahora = Date.now();
  const cs = cuentas.slice().sort((a, b) => (b.ultimoDia || "").localeCompare(a.ultimoDia || "") || b.actualizado - a.actualizado);
  const conEstudio = cs.filter(c => c.totalR > 0);

  // Crecimiento
  const altasEn = (desde, hasta) => cs.filter(c => c.alta && c.alta >= ahora - hasta * DIA && c.alta < ahora - desde * DIA).length;
  const altas = altasEn(0, n), altas0 = altasEn(n, 2 * n);
  const semanas = [];
  for (let i = 7; i >= 0; i--) {
    const fin = ahora - i * 7 * DIA, ini = fin - 7 * DIA, nuevas = cs.filter(c => c.alta >= ini && c.alta < fin);
    semanas.push({ etiqueta: i === 0 ? "Esta" : fechaCorta(ini + DIA), tip: `Semana del ${fechaCorta(ini + DIA)} al ${fechaCorta(fin)}: ${plural(nuevas.length, "alta", "altas")}`, v: { altas: nuevas.length } });
  }

  // Uso
  const act = cs.map(c => ({ c, s: suma(c, 0, n), s0: suma(c, n, 2 * n) }));
  const activosHoy = cs.filter(c => estudio(c, hoy)).length;
  const activos7 = cs.filter(c => suma(c, 0, 7).r > 0).length, activos30 = cs.filter(c => suma(c, 0, 30).r > 0).length;
  const tot = act.reduce((t, x) => ({ r: t.r + x.s.r, a: t.a + x.s.a, r0: t.r0 + x.s0.r, a0: t.a0 + x.s0.a, dias: t.dias + x.s.activos }), { r: 0, a: 0, r0: 0, a0: 0, dias: 0 });
  const activosN = act.filter(x => x.s.r > 0).length;
  // Retención: de las cuentas que empezaron hace bastante, cuántas volvieron.
  function retencion(desde, hasta) { // estudió algún día entre desde y hasta (incluidos) tras el primero
    const elegibles = conEstudio.filter(c => entreDias(c.primerDia, hoy) >= hasta);
    const vuelven = elegibles.filter(c => c.dias.some(k => { const d = entreDias(c.primerDia, k); return d >= desde && d <= hasta; }));
    return { v: pct(vuelven.length, elegibles.length), n: elegibles.length, si: vuelven.length };
  }
  const r1 = retencion(1, 1), r7 = retencion(7, 13), r30 = retencion(30, 36);
  const txtRet = r => r.n ? `${r.si} de ${plural(r.n, "cuenta", "cuentas")}` : "Aún no hay cuentas tan antiguas";
  const rachas = conEstudio.map(c => c.racha), rachaMedia = rachas.length ? Math.round(rachas.reduce((a, b) => a + b, 0) / rachas.length * 10) / 10 : 0;
  const conRacha = rachas.filter(r => r >= 3).length;

  // Resultado
  const listas = conEstudio.filter(c => c.prep.lista);
  const exsN = cs.flatMap(c => c.examenes.filter(r => r.ms >= ahora - n * DIA));
  const aptosN = exsN.filter(r => r.apto).length;
  const exsN0 = cs.flatMap(c => c.examenes.filter(r => r.ms >= ahora - 2 * n * DIA && r.ms < ahora - n * DIA));
  const prepMedia = conEstudio.length ? Math.round(conEstudio.reduce((s, c) => s + c.prep.avance, 0) / conEstudio.length * 100) : null;
  const tramos = [[0, .25, "0–24 %"], [.25, .5, "25–49 %"], [.5, .75, "50–74 %"], [.75, 1.01, "75–100 %"]].map(([a, b, t]) => {
    const en = conEstudio.filter(c => c.prep.avance >= a && c.prep.avance < b);
    return { etiqueta: t, tip: `${t} de preparación: ${plural(en.length, "cuenta", "cuentas")}`, v: { n: en.length } };
  });
  const fallosMedios = exsN.length ? Math.round(exsN.reduce((s, r) => s + r.fallos, 0) / exsN.length * 10) / 10 : null;

  // Contenido: preguntas y materias que más se fallan entre todas las cuentas.
  const porPregunta = new Map(), porMat = {};
  for (const c of cs) for (const [id, r] of Object.entries(c.datos.preguntas)) {
    const p = POR_ID.get(id); if (!p) continue;
    const x = porPregunta.get(id) || { id, p, ok: 0, ko: 0, cuentas: 0 };
    x.ok += r.ok; x.ko += r.ko; if (r.ko) x.cuentas++; porPregunta.set(id, x);
    const m = porMat[p.materia] || (porMat[p.materia] = { ok: 0, ko: 0 }); m.ok += r.ok; m.ko += r.ko;
  }
  const masFalladas = [...porPregunta.values()].filter(x => x.ko > 0).sort((a, b) => b.ko - a.ko || (b.ko / (b.ok + b.ko)) - (a.ko / (a.ok + a.ko))).slice(0, 10);
  const materias = Object.entries(porMat).map(([m, x]) => ({ m: +m, ...x, error: pct(x.ko, x.ok + x.ko) })).filter(x => x.ok + x.ko > 0).sort((a, b) => b.error - a.error);
  const dudosas = cs.flatMap(c => Object.entries(c.datos.dudosas).map(([id, d]) => ({ id, d, c, p: POR_ID.get(id) }))).filter(x => x.p).sort((a, b) => b.d.ms - a.d.ms);

  const respuestas = porDia(n === 7 ? 14 : 30, k => {
    let r = 0, a = 0, u = 0;
    for (const c of cs) { const d = c.datos.dias[k]; if (d && d.r) { r += d.r; a += d.a; u++; } }
    return { v: { a, f: r - a }, u, tip: `${fechaDia(msDia(k))}: ${r ? `${r} respondidas, ${pct(a, r)} % bien` : "sin actividad"} · ${plural(u, "cuenta activa", "cuentas activas")}` };
  });
  const activosDia = respuestas.map(x => ({ etiqueta: x.etiqueta, tip: x.tip, v: { u: x.u } }));

  panel.replaceChildren(
    h("div", { class: "cabecera-panel", id: "resumen" },
      h("div", {}, h("h1", {}, "Panel de cuentas"), h("p", { class: "sub" }, `${plural(cs.length, "cuenta", "cuentas")} · ${PREGUNTAS.length.toLocaleString("es-ES")} preguntas en el banco · datos de ${haceCuanto(cargadoEn)} `,
        h("button", { class: "enlace", onclick: cargar }, "Actualizar"))),
      segmentos([[7, "7 días"], [30, "30 días"]], periodo, v => { periodo = v; pintar(); })),
    rejilla(
      kpi(String(activosHoy), "Activas hoy", `${activos7} en 7 días · ${activos30} en 30`),
      kpi(tot.r.toLocaleString("es-ES"), "Preguntas respondidas", `en ${n} días`, flecha(tot.r, tot.r0, "")),
      kpi(txtPct(pct(tot.a, tot.r)), "Acierto", `en ${n} días`, flecha(pct(tot.a, tot.r), pct(tot.a0, tot.r0))),
      kpi(`${listas.length} de ${conEstudio.length}`, "Listas para el examen", "según los 4 criterios de la web")),

    seccion("crecimiento", "Crecimiento", "Altas y cuántas cuentas llegan a estudiar.",
      rejilla(
        kpi(String(altas), "Altas", `en ${n} días`, flecha(altas, altas0, "")),
        kpi(String(cs.length), "Cuentas en total", cs.length - conEstudio.length ? `${cs.length - conEstudio.length} sin estudiar aún` : "todas han estudiado"),
        kpi(txtPct(pct(conEstudio.length, cs.length)), "Empiezan a estudiar", "han respondido al menos una pregunta")),
      barras({ valores: semanas, series: [{ clave: "altas", nombre: "Altas", clase: "s1" }], titulo: "Altas por semana", desc: `Altas por semana en las últimas 8 semanas: ${semanas.map(s => s.v.altas).join(", ")}`,
        pie: "Alta: el primer día que la cuenta entró o estudió. El origen de las altas aún no se registra (fase 2)." })),

    seccion("uso", "Uso y retención", "Cuántas cuentas estudian y cuántas vuelven.",
      rejilla(
        kpi(String(activosN), "Cuentas activas", `estudiaron en ${n} días`),
        kpi(activosN ? String(Math.round(tot.dias / activosN * 10) / 10) : "–", "Días de estudio por cuenta activa", `de ${n} posibles`),
        kpi(activosN ? String(Math.round(tot.r / Math.max(1, tot.dias))) : "–", "Preguntas por día de estudio", "media entre cuentas activas"),
        kpi(String(rachaMedia), "Racha media", `${plural(conRacha, "cuenta", "cuentas")} con 3 días o más`)),
      rejilla(
        kpi(txtPct(r1.v), "Vuelven al día siguiente", txtRet(r1)),
        kpi(txtPct(r7.v), "Siguen a la semana", `estudian entre el día 7 y el 13 · ${txtRet(r7)}`),
        kpi(txtPct(r30.v), "Siguen al mes", `estudian entre el día 30 y el 36 · ${txtRet(r30)}`)),
      h("div", { class: "dos" },
        barras({ valores: activosDia, series: [{ clave: "u", nombre: "Cuentas", clase: "s1" }], titulo: "Cuentas activas cada día", desc: "Cuentas que estudiaron cada día" }),
        barras({ valores: respuestas, series: [{ clave: "a", nombre: "Acertadas", clase: "s1" }, { clave: "f", nombre: "Falladas", clase: "s2" }], titulo: "Preguntas respondidas cada día", desc: "Preguntas respondidas cada día, acertadas y falladas" })),
      h("p", { class: "nota" }, "Los minutos de estudio y dónde se abandona el camino aún no se registran (fase 2).")),

    seccion("resultado", "Resultado", "Cómo avanzan hacia el examen.",
      rejilla(
        kpi(txtPct(prepMedia), "Preparación media", "de las cuentas que estudian"),
        kpi(`${aptosN} de ${exsN.length}`, "Simulacros aptos", `en ${n} días · ${txtPct(pct(aptosN, exsN.length))}`, flecha(pct(aptosN, exsN.length), pct(exsN0.filter(r => r.apto).length, exsN0.length))),
        kpi(fallosMedios == null ? "–" : String(fallosMedios), "Fallos por simulacro", `media en ${n} días (apto con 3 o menos)`),
        kpi(String(cs.filter(c => c.diasExamen != null && c.diasExamen >= 0).length), "Con fecha de examen", (() => { const p = cs.filter(c => c.diasExamen != null && c.diasExamen >= 0 && c.diasExamen <= 14).length; return p ? `${p} en las próximas 2 semanas` : "ninguna en las próximas 2 semanas"; })())),
      barras({ valores: tramos, series: [{ clave: "n", nombre: "Cuentas", clase: "s1" }], titulo: "Cuentas por preparación", desc: `Cuentas por tramo de preparación: ${tramos.map(t => `${t.etiqueta} ${t.v.n}`).join(", ")}`,
        pie: "El aprobado en el examen real todavía no se pregunta (fase 2)." })),

    seccion("contenido", "Contenido", "Lo que más cuesta, en todas las cuentas.",
      h("div", { class: "dos" },
        h("div", {}, h("h3", {}, "Materias con más error"), materias.length ? h("ol", { class: "tarjeta barras-h" }, materias.map(x => h("li", {},
          h("span", { class: "bh-nombre" }, h("b", {}, x.m), " ", MATERIAS[x.m - 1]),
          h("span", { class: "bh-barra", role: "img", "aria-label": `${x.error} % de error` }, h("i", { style: `width:${x.error}%` })),
          h("span", { class: "bh-valor" }, `${x.error} %`)))) : h("p", { class: "nota" }, "Sin respuestas todavía.")),
        h("div", {}, h("h3", {}, "Preguntas marcadas como dudosas"), dudosas.length ? h("ul", { class: "tarjeta lista" }, dudosas.slice(0, 12).map(x => h("li", {},
          h("span", { class: "li-titulo" }, x.p.enunciado), h("span", { class: "li-detalle" }, `${x.id} · ${nombreDe(x.c)} · ${fechaCorta(x.d.ms)}${x.d.nota ? ` · «${x.d.nota}»` : ""}`)))) : h("p", { class: "nota" }, "Nadie ha marcado ninguna pregunta como dudosa."))),
      h("h3", {}, "Preguntas más falladas"),
      masFalladas.length ? tabla(["Pregunta", { t: "Materia", num: true }, { t: "Fallos", num: true }, { t: "Error", num: true }, { t: "Cuentas", num: true }],
        masFalladas.map(x => h("tr", {}, h("td", {}, h("span", { class: "td-titulo" }, x.p.enunciado), h("span", { class: "td-detalle" }, x.id)), h("td", { class: "num" }, x.p.materia), h("td", { class: "num" }, x.ko), h("td", { class: "num" }, `${pct(x.ko, x.ok + x.ko)} %`), h("td", { class: "num" }, x.cuentas))))
        : h("p", { class: "nota" }, "Sin fallos todavía.")),

    seccion("cuentas", "Cuentas", "Toca una cuenta para ver su detalle.",
      cs.length ? tabla(["Cuenta", "Alta", "Último estudio", { t: "Racha", num: true }, { t: `Resp. ${n} d`, num: true }, { t: "Acierto", num: true }, { t: "Aptos (5 últ.)", num: true }, { t: "Preparación", num: true }, "Materia más floja", "Examen"],
        act.map(({ c, s, s0 }) => [h("tr", { class: "fila-cuenta" + (abierta === c.uid ? " abierta" : ""), tabindex: "0", "aria-expanded": String(abierta === c.uid),
          onclick: () => { abierta = abierta === c.uid ? null : c.uid; pintar(); }, onkeydown: e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abierta = abierta === c.uid ? null : c.uid; pintar(); } } },
          h("td", {}, h("span", { class: "td-titulo" }, nombreDe(c), c.prep.lista ? h("span", { class: "sello" }, "Lista") : null), h("span", { class: "td-detalle" }, c.correo || "sin ficha todavía")),
          h("td", {}, c.alta ? fechaCorta(c.alta) : "–"),
          h("td", {}, textoDia(c.ultimoDia)),
          h("td", { class: "num" }, c.racha),
          h("td", { class: "num" }, s.r, flecha(s.r, s0.r, "")),
          h("td", { class: "num" }, txtPct(pct(s.a, s.r))),
          h("td", { class: "num" }, c.ult5.length ? `${c.aptos5}/${c.ult5.length}` : "–"),
          h("td", { class: "num" }, h("span", { class: "medidor", role: "img", "aria-label": `${Math.round(c.prep.avance * 100)} %` }, h("i", { style: `width:${Math.round(c.prep.avance * 100)}%` })), `${Math.round(c.prep.avance * 100)} %`),
          h("td", {}, c.peor && c.totalR ? `${c.peor.m}. ${MATERIAS[c.peor.m - 1]} (${Math.floor(c.peor.dominio * 100)} %)` : "–"),
          h("td", {}, c.examen ? (c.diasExamen >= 0 ? `en ${plural(c.diasExamen, "día", "días")}` : "pasado") : "–")),
          abierta === c.uid ? h("tr", { class: "detalle" }, h("td", { colspan: "10" }, detalle(c))) : null]), "tabla-cuentas")
        : h("p", { class: "nota" }, "Aún no hay cuentas.")),
    h("p", { class: "pie" }, "Solo lectura: desde aquí no se puede cambiar el progreso de nadie. Cada cuenta se ve tal como la sincronizó su último dispositivo."));
  scrollTo(0, y);
}

function detalle(c) {
  const g = c.prep.global;
  const dias = porDia(30, k => { const d = c.datos.dias[k] || { r: 0, a: 0 }; return { v: { a: d.a, f: d.r - d.a }, tip: `${fechaDia(msDia(k))}: ${d.r ? `${d.r} respondidas, ${pct(d.a, d.r)} % bien` : "sin estudiar"}` }; });
  const fallos = Object.entries(c.datos.preguntas).filter(([id, r]) => r.ko > 0 && POR_ID.has(id)).sort((a, b) => b[1].ko - a[1].ko || a[1].ok - b[1].ok).slice(0, 5);
  return h("div", { class: "ficha" },
    h("div", { class: "kpis" },
      kpi(`${Math.round(c.prep.avance * 100)} %`, "Preparación", `${Math.floor(g.dominio * 100)} % dominado · ${g.vistas} de ${g.total} vistas`),
      kpi(c.totalR.toLocaleString("es-ES"), "Respuestas en total", `${txtPct(pct(c.totalA, c.totalR))} bien`),
      kpi(String(c.repasoHoy), "Para repasar hoy", "fallos que le tocan"),
      kpi(String(c.examenes.length), "Simulacros", c.examenes.length ? `${c.examenes.filter(r => r.apto).length} aptos` : "ninguno todavía")),
    h("div", { class: "dos" },
      barras({ valores: dias, series: [{ clave: "a", nombre: "Acertadas", clase: "s1" }, { clave: "f", nombre: "Falladas", clase: "s2" }], titulo: "Últimos 30 días", desc: "Preguntas respondidas cada día por esta cuenta" }),
      h("div", {}, h("h3", {}, "Criterios para estar lista"), h("ul", { class: "tarjeta lista" }, c.prep.criterios.map(k => h("li", { class: k.cumple ? "ok" : "" },
        h("span", { class: "li-titulo" }, k.cumple ? "✓ " : "○ ", k.texto), h("span", { class: "li-detalle" }, k.detalle)))))),
    h("div", { class: "dos" },
      h("div", {}, h("h3", {}, "Dominio por materia"), h("ol", { class: "tarjeta barras-h" }, Object.entries(c.mats).filter(([, x]) => x.total).map(([m, x]) => {
        const v = Math.floor(x.dominio * 100), flojo = x.vistas && x.dominio < 0.6;
        return h("li", { class: flojo ? "flojo" : "" }, h("span", { class: "bh-nombre" }, h("b", {}, m), " ", MATERIAS[m - 1]),
          h("span", { class: "bh-barra", role: "img", "aria-label": `${v} % dominado` }, h("i", { style: `width:${v}%` })),
          h("span", { class: "bh-valor" }, `${v} %`, flojo ? h("span", { class: "oculto" }, ", por debajo del 60 %") : null));
      })), h("p", { class: "nota" }, "En rojo, las materias empezadas por debajo del 60 % (el mínimo de la web).")),
      h("div", {},
        h("h3", {}, "Últimos simulacros"),
        c.examenes.length ? h("ul", { class: "tarjeta lista" }, c.examenes.slice(-8).reverse().map(r => h("li", { class: r.apto ? "ok" : "ko" },
          h("span", { class: "li-titulo" }, r.apto ? "Apto" : "No apto", ` · ${plural(r.fallos, "fallo", "fallos")}`),
          h("span", { class: "li-detalle" }, `${r.tipo === "semanal" ? "Simulacro semanal" : "Examen final"} · ${fechaCorta(r.ms)} · ${mmss(r.segundos)}`)))) : h("p", { class: "nota" }, "Ninguno todavía."),
        h("h3", {}, "Preguntas que más falla"),
        fallos.length ? h("ul", { class: "tarjeta lista" }, fallos.map(([id, r]) => h("li", {}, h("span", { class: "li-titulo" }, POR_ID.get(id).enunciado),
          h("span", { class: "li-detalle" }, `${id} · ${r.ko} fallos, ${r.ok} aciertos`)))) : h("p", { class: "nota" }, "Sin fallos."))),
    h("p", { class: "nota" }, `Última sincronización ${haceCuanto(c.actualizado)}${c.visto ? ` · última visita ${haceCuanto(c.visto)}` : ""}${c.examen ? ` · examen el ${c.examen.split("-").reverse().join("/")}` : ""}.`));
}

iniciar();
