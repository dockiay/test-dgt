/* Progreso de estudio: modelo de datos, repaso espaciado, dominio, «lista para el examen»
   y copia entre dispositivos. Sin dependencias; expone window.Progreso.
   La presentación vive en app.js; aquí no se toca el DOM. */
(function () {
  "use strict";

  const CLAVE = "testB.v2", CLAVE_V1 = "testB.v1";
  const DIA = 86400000;

  // Repaso espaciado tipo Leitner. Una pregunta fallada entra en la caja 1 (repasar ya).
  // Cada acierto cuando le toca la sube de caja; al acertar en la última sale del repaso.
  // Días hasta el siguiente repaso al llegar a cada caja:
  const INTERVALO_DIAS = [0, 0, 1, 3, 7, 16];
  const ULTIMA_CAJA = INTERVALO_DIAS.length - 1;

  // Criterios de «lista para el examen».
  const CRITERIOS = { examenes: 5, dominioGlobal: 0.8, dominioMateria: 0.6 };

  // ---------- Fechas ----------
  const inicioDia = ms => { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const claveDia = ms => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

  // ---------- Carga, migración y guardado ----------
  // borradas: {id: ms} dudosas desmarcadas; vaciado: ms en que se vació el repaso. Sirven para que,
  // al combinar con otro dispositivo o con la nube, lo borrado no vuelva a aparecer.
  function vacio() {
    const n = { v: 2, preguntas: {}, dudosas: {}, borradas: {}, vaciado: 0, reinicio: 0, historial: [], dias: {} };
    for (const [k, def] of Object.entries(EXTENSIONES)) n[k] = def.normalizar(undefined);
    return n;
  }

  // ---------- Extensiones ----------
  // Cada función nueva (sesión diaria, errores, logros...) guarda sus datos en una clave propia de primer
  // nivel y la registra con Progreso.extender(clave, { normalizar(v), combinar(a, b) }).
  // normalizar(undefined) debe devolver el valor vacío; combinar recibe dos valores ya normalizados.
  // Las claves que nadie ha registrado (por ejemplo, de una versión más nueva de la web en otro
  // dispositivo) se conservan tal cual, para no perder datos al combinar o guardar.
  const PROPIAS = new Set(["v", "preguntas", "dudosas", "borradas", "vaciado", "reinicio", "historial", "dias"]);
  const EXTENSIONES = {};
  function extender(clave, def) {
    if (PROPIAS.has(clave)) throw new Error(`La clave «${clave}» ya es del progreso`);
    EXTENSIONES[clave] = def;
    if (actual) actual[clave] = def.normalizar(actual[clave]);
  }
  function normalizarExtensiones(d, n) {
    for (const [k, v] of Object.entries(d)) if (!PROPIAS.has(k) && !EXTENSIONES[k] && v !== undefined) n[k] = v;
    for (const [k, def] of Object.entries(EXTENSIONES)) n[k] = def.normalizar(d[k]);
  }
  // Resultado de un examen. tipo: "final" (examen final) o "semanal" (simulacro semanal), opcional.
  // materias: { "1": [aciertos, preguntas], ... }, opcional (los exámenes antiguos no lo tienen).
  function normalizarExamen(r) {
    const n = { fecha: String(r.fecha), total: +r.total || 0, fallos: +r.fallos || 0, apto: !!r.apto, segundos: +r.segundos || 0 };
    if (r.tipo === "final" || r.tipo === "semanal") n.tipo = r.tipo;
    if (r.materias && typeof r.materias === "object") {
      const m = {};
      for (const [k, v] of Object.entries(r.materias)) if (/^\d{1,2}$/.test(k) && Array.isArray(v) && +v[1] > 0) m[k] = [Math.min(+v[0] || 0, +v[1]), +v[1]];
      if (Object.keys(m).length) n.materias = m;
    }
    return n;
  }
  function normalizar(d) {
    const n = vacio();
    if (!d || typeof d !== "object") return n;
    normalizarExtensiones(d, n);
    for (const [id, r] of Object.entries(d.preguntas || {})) {
      if (!r || typeof r !== "object") continue;
      n.preguntas[id] = { ok: +r.ok || 0, ko: +r.ko || 0, h: String(r.h || "").replace(/[^01]/g, "").slice(-8),
        c: Math.min(ULTIMA_CAJA, Math.max(0, +r.c || 0)), p: +r.p || 0, t: +r.t || 0, f: +r.f || 0 };
    }
    for (const [id, m] of Object.entries(d.dudosas || {})) if (m && typeof m === "object") n.dudosas[id] = { nota: String(m.nota || ""), fecha: String(m.fecha || ""), ms: +m.ms || Date.parse(m.fecha) || 0 };
    for (const [id, ms] of Object.entries(d.borradas || {})) if (+ms > 0) n.borradas[id] = +ms;
    n.vaciado = +d.vaciado || 0;
    n.reinicio = +d.reinicio || 0;
    n.historial = (Array.isArray(d.historial) ? d.historial : []).filter(r => r && r.fecha).map(normalizarExamen);
    for (const [k, v] of Object.entries(d.dias || {})) if (/^\d{4}-\d\d-\d\d$/.test(k) && v) n.dias[k] = { r: +v.r || 0, a: +v.a || 0 };
    return n;
  }
  // Datos de la primera versión: { vistas: {id: {ok, ko}}, fallos: {id: {veces, fecha}}, dudosas, historial }.
  function migrarV1(d) {
    const n = vacio(), ahora = Date.now();
    for (const [id, v] of Object.entries(d.vistas || {})) {
      const fallo = d.fallos && d.fallos[id];
      n.preguntas[id] = { ok: +v.ok || 0, ko: +v.ko || 0, h: fallo ? "0" : (v.ok ? "1" : "0"), c: fallo ? 1 : 0, p: fallo ? ahora : 0,
        t: fallo && fallo.fecha ? Date.parse(fallo.fecha) || 0 : 0, f: 0 };
    }
    for (const id of Object.keys(d.fallos || {})) if (!n.preguntas[id]) n.preguntas[id] = { ok: 0, ko: 1, h: "0", c: 1, p: ahora, t: 0, f: 0 };
    n.dudosas = d.dudosas || {};
    n.historial = d.historial || [];
    return normalizar(n);
  }
  let actual = null; // los datos en uso, para que otros módulos (animo.js) los lean
  function cargar() { actual = leer(); return actual; }
  function leer() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { /* sin almacenamiento */ }
    if (d) return normalizar(d);
    let v1 = null;
    try { v1 = JSON.parse(localStorage.getItem(CLAVE_V1)); } catch (e) { /* sin almacenamiento */ }
    return v1 ? migrarV1(v1) : vacio();
  }
  // Avisa con el evento "progreso-guardado" (lo usa nube.js para subir los cambios).
  function guardar(datos) {
    actual = datos;
    try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* sin almacenamiento */ }
    try { window.dispatchEvent(new Event("progreso-guardado")); } catch (e) { /* sin eventos */ }
  }

  // ---------- Registrar una respuesta ----------
  function registrar(datos, id, acierto, ahora = Date.now()) {
    const r = datos.preguntas[id] || (datos.preguntas[id] = { ok: 0, ko: 0, h: "", c: 0, p: 0, t: 0, f: ahora });
    if (!r.f) r.f = ahora;
    acierto ? r.ok++ : r.ko++;
    r.h = (r.h + (acierto ? "1" : "0")).slice(-8);
    r.t = ahora;
    if (!acierto) { r.c = 1; r.p = ahora; }
    else if (r.c > 0 && r.p <= ahora) {
      // Solo sube de caja cuando le tocaba repasarla; un acierto antes de tiempo no cuenta como repaso.
      if (r.c >= ULTIMA_CAJA) { r.c = 0; r.p = 0; }
      else { r.c++; r.p = inicioDia(ahora) + INTERVALO_DIAS[r.c] * DIA; }
    }
    const k = claveDia(ahora), dia = datos.dias[k] || (datos.dias[k] = { r: 0, a: 0 });
    dia.r++; if (acierto) dia.a++;
    return r;
  }
  function registrarExamen(datos, r) {
    datos.historial.push(r);
    datos.historial.sort((a, b) => a.fecha < b.fecha ? -1 : 1);
    datos.historial = datos.historial.slice(-100);
  }
  // Progreso vacío que, al combinarse con cualquier copia anterior (otro dispositivo, la nube), la sustituye.
  function reiniciar(ahora = Date.now()) { const n = vacio(); n.reinicio = ahora; guardar(n); return n; }
  function vaciarRepaso(datos, ahora = Date.now()) { for (const r of Object.values(datos.preguntas)) { r.c = 0; r.p = 0; } datos.vaciado = ahora; }
  function marcarDudosa(datos, id, nota, ahora = Date.now()) { datos.dudosas[id] = { nota, fecha: new Date(ahora).toISOString().slice(0, 10), ms: ahora }; delete datos.borradas[id]; }
  function quitarDudosa(datos, id, ahora = Date.now()) { delete datos.dudosas[id]; datos.borradas[id] = ahora; }
  function quitarDudosas(datos, ahora = Date.now()) { for (const id of Object.keys(datos.dudosas)) quitarDudosa(datos, id, ahora); }

  // ---------- Consultas ----------
  const enRepaso = (datos, ids) => ids.filter(id => (datos.preguntas[id] || {}).c > 0);
  const paraHoy = (datos, ids, ahora = Date.now()) => ids.filter(id => { const r = datos.preguntas[id]; return r && r.c > 0 && r.p <= ahora; });
  // Próxima fecha de repaso entre las que aún no tocan.
  function proximoRepaso(datos, ids, ahora = Date.now()) {
    let min = Infinity;
    for (const id of ids) { const r = datos.preguntas[id]; if (r && r.c > 0 && r.p > ahora && r.p < min) min = r.p; }
    return min === Infinity ? null : min;
  }
  // Estado de una pregunta: "nueva", "repaso" (fallada, en el repaso espaciado), "vista" o "dominada"
  // (las dos últimas respuestas correctas y fuera del repaso: un acierto suelto puede ser suerte con 3 opciones).
  function estado(datos, id) {
    const r = datos.preguntas[id];
    if (!r || !r.h) return "nueva";
    if (r.c > 0) return "repaso";
    return r.h.endsWith("11") ? "dominada" : "vista";
  }
  function resumen(datos, ids) {
    const s = { total: ids.length, nueva: 0, vista: 0, repaso: 0, dominada: 0 };
    for (const id of ids) s[estado(datos, id)]++;
    s.dominio = s.total ? s.dominada / s.total : 0;
    s.vistas = s.total - s.nueva;
    return s;
  }
  // preguntasPorMateria: { 1: [ids], 2: [ids], ... } solo con las materias que tienen preguntas.
  function dominioPorMateria(datos, preguntasPorMateria) {
    const out = {};
    for (const [m, ids] of Object.entries(preguntasPorMateria)) out[m] = resumen(datos, ids);
    return out;
  }
  const delDia = (datos, ahora = Date.now()) => Object.assign({ r: 0, a: 0 }, datos.dias[claveDia(ahora)]);
  // ---------- Racha con protector ----------
  // Un día sin estudiar no rompe la racha si es el único de su semana (de lunes a domingo): es el día
  // de descanso. Se aplica solo, sin guardar nada: sale de los días estudiados, que ya se sincronizan.
  // El descanso no suma días a la racha; solo evita perderla. Hoy nunca cuenta como descanso mientras
  // quede día para estudiar.
  const estudiado = (datos, k) => !!(datos.dias[k] && datos.dias[k].r > 0);
  // Lunes de la semana del día dado (clave AAAA-MM-DD).
  function semanaDe(ms) { const d = new Date(ms); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return claveDia(d.getTime()); }
  function rachaDetalle(datos, ahora = Date.now()) {
    const d = new Date(ahora); d.setHours(12, 0, 0, 0);
    const hoy = claveDia(d.getTime()), hechoHoy = estudiado(datos, hoy);
    if (!hechoHoy) d.setDate(d.getDate() - 1); // si hoy aún no ha estudiado, la racha sigue viva desde ayer
    let dias = 0, masAntiguo = null;
    const descansos = {}; // semana → día de descanso
    for (let i = 0; i < 4000; i++) {
      const k = claveDia(d.getTime());
      if (estudiado(datos, k)) { dias++; masAntiguo = k; }
      else { const s = semanaDe(d.getTime()); if (descansos[s]) break; descansos[s] = k; }
      d.setDate(d.getDate() - 1);
    }
    // Los descansos anteriores al primer día estudiado de la racha no cuentan.
    const usados = Object.values(descansos).filter(k => masAntiguo && k > masAntiguo).sort();
    const semanaHoy = semanaDe(ahora), usadoSemana = usados.find(k => semanaDe(new Date(k + "T12:00:00").getTime()) === semanaHoy) || null;
    return { dias, hechoHoy, descansos: usados, protectorDisponible: !usadoSemana, descansoSemana: usadoSemana };
  }
  const racha = (datos, ahora = Date.now()) => rachaDetalle(datos, ahora).dias;
  // «Lista para el examen»: devuelve los criterios con su avance (0 a 1) y si se cumplen todos.
  function preparacion(datos, todas, preguntasPorMateria, ahora = Date.now()) {
    const g = resumen(datos, todas), mats = dominioPorMateria(datos, preguntasPorMateria);
    const ult = datos.historial.slice(-CRITERIOS.examenes);
    let seguidos = 0;
    for (let i = datos.historial.length - 1; i >= 0 && datos.historial[i].apto; i--) seguidos++;
    const peor = Object.entries(mats).sort((a, b) => a[1].dominio - b[1].dominio)[0];
    const hoy = paraHoy(datos, todas, ahora).length;
    const criterios = [
      { id: "examenes", texto: `Aprobar ${CRITERIOS.examenes} exámenes finales seguidos`, detalle: `Llevas ${seguidos} seguidos`,
        avance: Math.min(1, seguidos / CRITERIOS.examenes), cumple: seguidos >= CRITERIOS.examenes && ult.length >= CRITERIOS.examenes },
      { id: "dominio", texto: `Dominar el ${Math.round(CRITERIOS.dominioGlobal * 100)} % de las preguntas`, detalle: `Dominas el ${Math.floor(g.dominio * 100)} %`,
        avance: Math.min(1, g.dominio / CRITERIOS.dominioGlobal), cumple: g.dominio >= CRITERIOS.dominioGlobal },
      { id: "materias", texto: `Ninguna materia por debajo del ${Math.round(CRITERIOS.dominioMateria * 100)} %`,
        detalle: peor ? `La más floja es la ${peor[0]}, con un ${Math.floor(peor[1].dominio * 100)} %` : "",
        avance: peor ? Math.min(1, peor[1].dominio / CRITERIOS.dominioMateria) : 0, cumple: !!peor && peor[1].dominio >= CRITERIOS.dominioMateria, materia: peor ? +peor[0] : null },
      { id: "repaso", texto: "Tener al día el repaso de fallos", detalle: hoy ? `Te quedan ${hoy} por repasar hoy` : "Sin repasos pendientes",
        // Tener el repaso al día solo suma en la medida en que ya se ha aprendido algo: si no, con el progreso
        // recién borrado o tras unas pocas preguntas la preparación marcaría ya un 25 %.
        avance: hoy ? 0 : Math.min(1, g.dominio / CRITERIOS.dominioGlobal), cumple: hoy === 0 },
    ];
    const avance = criterios.reduce((s, c) => s + c.avance, 0) / criterios.length;
    return { lista: criterios.every(c => c.cumple), avance, criterios, global: g, materias: mats };
  }

  // ---------- Combinar progreso de dos dispositivos ----------
  // Para cada pregunta gana el estado de la respuesta más reciente; los contadores se quedan con el mayor.
  // Exámenes y días de estudio se unen sin duplicar. Nada se pierde al combinar dos veces lo mismo.
  function combinar(a, b) {
    a = normalizar(a); b = normalizar(b);
    // «Borrar mi progreso»: gana el lado que se borró más tarde; lo del otro lado es de antes del borrado.
    if (a.reinicio !== b.reinicio) return a.reinicio > b.reinicio ? a : b;
    const n = vacio();
    for (const id of new Set([...Object.keys(a.preguntas), ...Object.keys(b.preguntas)])) {
      const x = a.preguntas[id], y = b.preguntas[id];
      if (!x || !y) { n.preguntas[id] = Object.assign({}, x || y); continue; }
      const nuevo = y.t > x.t ? y : x;
      n.preguntas[id] = Object.assign({}, nuevo, { ok: Math.max(x.ok, y.ok), ko: Math.max(x.ko, y.ko), f: Math.min(x.f || Infinity, y.f || Infinity) === Infinity ? 0 : Math.min(x.f || Infinity, y.f || Infinity) });
    }
    // Dudosas: gana lo último que se hizo con cada una, marcarla o desmarcarla.
    for (const id of new Set([...Object.keys(a.dudosas), ...Object.keys(b.dudosas), ...Object.keys(a.borradas), ...Object.keys(b.borradas)])) {
      const x = a.dudosas[id], y = b.dudosas[id], marca = x && y ? (y.ms > x.ms ? y : x) : (x || y);
      const borrada = Math.max(a.borradas[id] || 0, b.borradas[id] || 0);
      if (marca && marca.ms > borrada) n.dudosas[id] = Object.assign({}, marca);
      else if (borrada) n.borradas[id] = borrada;
    }
    // Si se vació el repaso en un dispositivo, salen de él las preguntas que no se han vuelto a responder después.
    n.vaciado = Math.max(a.vaciado, b.vaciado);
    if (n.vaciado) for (const r of Object.values(n.preguntas)) if (r.c > 0 && r.t <= n.vaciado) { r.c = 0; r.p = 0; }
    const vistos = new Map();
    for (const r of [...a.historial, ...b.historial]) vistos.set(r.fecha, r);
    n.historial = [...vistos.values()].sort((p, q) => p.fecha < q.fecha ? -1 : 1).slice(-100);
    for (const k of new Set([...Object.keys(a.dias), ...Object.keys(b.dias)])) {
      const x = a.dias[k] || { r: 0, a: 0 }, y = b.dias[k] || { r: 0, a: 0 };
      n.dias[k] = { r: Math.max(x.r, y.r), a: Math.max(x.a, y.a) };
    }
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (PROPIAS.has(k)) continue;
      const def = EXTENSIONES[k];
      n[k] = def ? def.combinar(a[k], b[k]) : (a[k] !== undefined ? a[k] : b[k]);
    }
    return n;
  }

  // ---------- Exportar e importar ----------
  // Formato compacto: JSON → deflate (si el navegador lo permite) → base64url.
  // Prefijo "z" = comprimido, "j" = sin comprimir.
  const b64 = bytes => { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const deb64 = t => { t = t.replace(/-/g, "+").replace(/_/g, "/"); while (t.length % 4) t += "="; const s = atob(t), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; };
  async function transformar(bytes, Clase) {
    const flujo = new Blob([bytes]).stream().pipeThrough(new Clase("deflate-raw"));
    return new Uint8Array(await new Response(flujo).arrayBuffer());
  }
  // Preferencias del módulo de ánimo (objetivo diario, sonido): viajan en la copia tal cual.
  const CLAVE_ANIMO = "testB.animo";
  function leerAnimo() { try { const a = JSON.parse(localStorage.getItem(CLAVE_ANIMO)); return a && typeof a === "object" ? a : null; } catch (e) { return null; } }
  function paquete(datos) { const p = { app: "test-permiso-b", v: 2, exportado: new Date().toISOString(), datos: normalizar(datos) }; const a = leerAnimo(); if (a) p.animo = a; return p; }
  async function exportarCodigo(datos) {
    const json = new TextEncoder().encode(JSON.stringify(paquete(datos)));
    if (typeof CompressionStream === "function") { try { return "z" + b64(await transformar(json, CompressionStream)); } catch (e) { /* sin compresión */ } }
    return "j" + b64(json);
  }
  async function importarCodigo(codigo) {
    codigo = String(codigo || "").trim().replace(/^.*#\/importar\//, "").replace(/\s+/g, "");
    let texto;
    if (codigo[0] === "z") {
      if (typeof DecompressionStream !== "function") throw new Error("Este navegador no puede leer el código. Usa el fichero de copia.");
      texto = new TextDecoder().decode(await transformar(deb64(codigo.slice(1)), DecompressionStream));
    } else if (codigo[0] === "j") texto = new TextDecoder().decode(deb64(codigo.slice(1)));
    else if (codigo[0] === "{") texto = codigo;
    else throw new Error("El código no es válido.");
    return leerPaquete(texto);
  }
  function leerPaquete(texto) {
    let p;
    try { p = JSON.parse(texto); } catch (e) { throw new Error("El contenido no es una copia válida."); }
    if (!p || p.app !== "test-permiso-b" || !p.datos) throw new Error("No es una copia de esta web.");
    return { datos: normalizar(p.datos), exportado: p.exportado || null, animo: p.animo && typeof p.animo === "object" ? p.animo : null };
  }
  const exportarFichero = datos => JSON.stringify(paquete(datos));
  // Combina las preferencias de ánimo importadas con las locales: las locales mandan,
  // y en "dias" (si existe) se queda el máximo por fecha.
  function mezclarAnimo(local, importado) {
    if (!importado) return local || null;
    local = local || {};
    const n = Object.assign({}, importado, local);
    if (importado.dias || local.dias) {
      n.dias = Object.assign({}, importado.dias);
      for (const [k, v] of Object.entries(local.dias || {})) n.dias[k] = Math.max(+v || 0, +(n.dias[k]) || 0);
    }
    return n;
  }
  function combinarAnimo(importado) {
    if (!importado) return;
    const n = mezclarAnimo(leerAnimo(), importado);
    try { localStorage.setItem(CLAVE_ANIMO, JSON.stringify(n)); } catch (e) { /* sin almacenamiento */ }
  }

  window.Progreso = {
    get actual() { return actual; },
    INTERVALO_DIAS, CRITERIOS, extender, cargar, delDia, guardar, vacio, normalizar, migrarV1,
    registrar, registrarExamen, vaciarRepaso, reiniciar, marcarDudosa, quitarDudosa, quitarDudosas,
    enRepaso, paraHoy, proximoRepaso, estado, resumen, dominioPorMateria, racha, rachaDetalle, semanaDe, preparacion,
    combinar, combinarAnimo, mezclarAnimo, leerAnimo, exportarCodigo, importarCodigo, leerPaquete, exportarFichero, claveDia,
  };
})();
