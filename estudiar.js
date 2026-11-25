/* Plan de estudio: «Estudiar hoy» (sesión diaria que mezcla repasos, materias flojas y preguntas nuevas),
   simulacro semanal con informe de evolución por materia y fecha del examen con cuenta atrás, que sube
   el objetivo diario si hace falta para llegar a tiempo.
   Usa window.App (app.js) y window.Progreso (progreso.js). Sus datos van en la clave «plan» del progreso,
   así que viajan con la copia y la nube como el resto. */
(function () {
  "use strict";
  const P = window.Progreso, A = window.App;
  if (!P || !A) return;
  const { h, ico, fila, grupo, cabecera, cifras, pantalla, hoja, plural, barajar, materia } = A;
  // Prioridad visual en la sesión diaria (no en el simulacro semanal, que mantiene el reparto real).
  const priorizar = A.priorizar || barajar;
  const DIA = 86400000;
  const SESION = { min: 10, max: 30 };            // tamaño de una tanda de «Estudiar hoy»
  const REPARTO = { repaso: 0.5, flojas: 0.3 };   // como mucho, la parte de repasos; la de materias flojas
  const MATERIAS_FLOJAS = 3;
  const OBJETIVO_MAX = 120;                       // tope del objetivo ajustado por la fecha del examen
  const SEMANA_DIAS = 7;

  Object.assign(A.ICONOS, {
    diana: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM12 12.2v-.4",
    calendario: "M5 6.5h14V20H5zM5 10.5h14M9 4v4.5M15 4v4.5",
    grafica: "M4.5 19.5h15M6.5 16l4-5 3 2.5 4.5-6",
    subir: "M12 19V6M6.5 11.5L12 6l5.5 5.5",
    bajar: "M12 5v13M6.5 12.5L12 18l5.5-5.5",
    igual: "M6 10h12M6 14h12",
  });

  // ---------- Datos: progreso.plan ----------
  // { examen: "AAAA-MM-DD" o "", ms: cuándo se cambió la fecha,
  //   fotos: { "<fecha ISO del simulacro>": { "1": 45, ... } } }  nivel (%) de cada materia al acabar cada
  //   simulacro semanal, para comparar una semana con la anterior. Se guardan los 30 últimos.
  //   Nivel de una materia = % de sus preguntas cuya última respuesta fue correcta (las no vistas cuentan
  //   como no sabidas). Sube al cubrir y acertar, baja al fallar, y se mueve desde el primer día, a
  //   diferencia del dominio (que pide dos aciertos seguidos).
  const FECHA = /^\d{4}-\d\d-\d\d$/;
  function normalizarPlan(v) {
    v = v && typeof v === "object" ? v : {};
    const n = { examen: FECHA.test(v.examen || "") ? v.examen : "", ms: +v.ms || 0, fotos: {}, dia: null };
    // dia: { f: "AAAA-MM-DD", n, examen }: objetivo calculado para ese día, fijo hasta medianoche para que
    // no cambie mientras estudia. Se recalcula al día siguiente o si cambia la fecha del examen.
    if (v.dia && FECHA.test(v.dia.f || "") && +v.dia.n > 0) n.dia = { f: v.dia.f, n: Math.round(+v.dia.n), examen: String(v.dia.examen || "") };
    if (v.fotos && typeof v.fotos === "object") {
      for (const [f, m] of Object.entries(v.fotos)) {
        if (!m || typeof m !== "object" || !/^\d{4}-\d\d-\d\dT/.test(f)) continue;
        const o = {};
        for (const [k, x] of Object.entries(m)) if (/^\d{1,2}$/.test(k) && isFinite(+x)) o[k] = Math.max(0, Math.min(100, Math.round(+x)));
        n.fotos[f] = o;
      }
    }
    return n;
  }
  function recortarFotos(fotos) {
    const claves = Object.keys(fotos).sort();
    for (const k of claves.slice(0, Math.max(0, claves.length - 30))) delete fotos[k];
    return fotos;
  }
  function combinarPlan(a, b) {
    const fecha = b.ms > a.ms ? b : a;
    const dia = !a.dia ? b.dia : !b.dia ? a.dia : (b.dia.f > a.dia.f ? b.dia : a.dia);
    return { examen: fecha.examen, ms: fecha.ms, fotos: recortarFotos(Object.assign({}, b.fotos, a.fotos)), dia: dia ? Object.assign({}, dia) : null };
  }
  P.extender("plan", { normalizar: normalizarPlan, combinar: combinarPlan });
  const plan = () => { const d = A.datos; if (!d.plan) d.plan = normalizarPlan(); return d.plan; };

  // ---------- Fechas ----------
  const inicioDia = ms => { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const diaLocal = f => { const [y, m, d] = f.split("-").map(Number); return new Date(y, m - 1, d).getTime(); };
  const diasHasta = f => Math.round((diaLocal(f) - inicioDia(Date.now())) / DIA);
  const claveLocal = ms => P.claveDia(ms);
  const fechaLarga = f => new Date(diaLocal(f)).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  const fechaCortaISO = iso => new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short" });

  // ---------- Fecha del examen y objetivo ajustado ----------
  // Cálculo aproximado de las respuestas que faltan para dominarlo todo: una pregunta nueva necesita unas
  // dos respuestas (dominar = acertar las dos últimas), una vista sin dominar una o dos, y una en el repaso
  // espaciado los repasos que le quedan. Se añade un 20 % por los fallos que harán repetir.
  function respuestasQueFaltan() {
    const d = A.datos;
    let n = 0;
    for (const id of A.TODAS) {
      const e = P.estado(d, id);
      if (e === "nueva") n += 2;
      else if (e === "vista") n += 1.5;
      else if (e === "repaso") n += Math.max(1, 6 - (d.preguntas[id].c || 1));
    }
    return n * 1.2;
  }
  function cuentaAtras() {
    const f = plan().examen;
    if (!f) return null;
    return { fecha: f, dias: diasHasta(f) };
  }
  // Objetivo diario que hace falta para llegar al examen con todo repasado (redondeado a 5).
  // Se calcula una vez al día y se queda fijo hasta medianoche.
  function objetivoNecesario() {
    const c = cuentaAtras();
    if (!c || c.dias < 1) return null;
    const p = plan(), hoy = P.claveDia(Date.now());
    if (!p.dia || p.dia.f !== hoy || p.dia.examen !== c.fecha) {
      // Lo que ya ha hecho hoy cuenta para hoy: se reparte lo que falta entre los días que quedan (hoy incluido).
      const porDia = (respuestasQueFaltan() + P.delDia(A.datos).r) / c.dias;
      p.dia = { f: hoy, n: Math.max(5, Math.ceil(porDia / 5) * 5), examen: c.fecha };
    }
    return { necesario: p.dia.n, dias: c.dias };
  }
  if (window.Animo && Animo.ajustarObjetivo) {
    Animo.ajustarObjetivo(elegido => {
      const o = objetivoNecesario();
      return o && o.necesario > elegido ? Math.min(OBJETIVO_MAX, o.necesario) : null;
    });
  }
  function textoCuentaAtras(c) {
    if (c.dias > 1) return `Faltan ${c.dias} días para tu examen`;
    if (c.dias === 1) return "Tu examen es mañana";
    if (c.dias === 0) return "Hoy es tu examen. ¡Mucha suerte!";
    return "La fecha de tu examen ya ha pasado";
  }
  function elegirFecha() {
    const actual = plan().examen;
    const manana = claveLocal(inicioDia(Date.now()) + DIA + 3600000);
    const entrada = h("input", { type: "date", class: "campo-fecha", min: manana, value: actual && actual >= manana ? actual : "", "aria-label": "Fecha del examen" });
    const guardarFecha = f => { const p = plan(); p.examen = f; p.ms = Date.now(); A.guardar(); A.sonar("toque"); A.repintar(); };
    hoja({ titulo: "Fecha del examen", mensaje: "Con la fecha, la web calcula cuántas preguntas te conviene hacer cada día para llegar con todo repasado.",
      contenido: entrada,
      acciones: [
        { texto: "Guardar", accion: () => { if (FECHA.test(entrada.value) && entrada.value >= manana) guardarFecha(entrada.value); } },
        actual ? { texto: "Quitar la fecha", clase: "gris destructivo", accion: () => guardarFecha("") } : null,
      ].filter(Boolean) });
  }
  // Fila de la cuenta atrás para la portada y la pantalla de «Estudiar hoy».
  function bloqueCuentaAtras() {
    const c = cuentaAtras();
    if (!c) return h("button", { class: "hoy-fecha", onclick: elegirFecha }, ico("calendario"), h("span", {}, "¿Tienes fecha de examen? Ponla y ajusto tu objetivo diario"));
    const o = objetivoNecesario(), r = window.Animo ? Animo.racha() : null;
    let detalle = "";
    if (c.dias >= 1 && o) {
      detalle = o.necesario > OBJETIVO_MAX
        ? `Vas con el tiempo justo: harían falta unas ${o.necesario} preguntas al día. Prioriza los repasos y las materias flojas.`
        : r && r.ajustado ? `Para llegar a tiempo, tu objetivo de hoy es de ${r.objetivo} preguntas.`
        : `Con tu objetivo de ${r ? r.objetivo : o.necesario} preguntas al día llegas a tiempo.`;
    } else if (c.dias < 0) detalle = "Toca para poner la nueva fecha si tienes otra convocatoria.";
    return h("button", { class: "hoy-fecha" + (c.dias >= 0 && c.dias <= 7 ? " cerca" : ""), onclick: elegirFecha, "aria-label": `${textoCuentaAtras(c)}. Cambiar la fecha` },
      c.dias >= 0 ? h("span", { class: "hoy-dias" }, h("b", {}, String(c.dias)), c.dias === 1 ? "día" : "días") : ico("calendario"),
      h("span", {}, h("strong", {}, textoCuentaAtras(c)), c.dias >= 0 ? h("small", {}, fechaLarga(c.fecha)) : null, detalle ? h("small", {}, detalle) : null));
  }

  // ---------- «Estudiar hoy» ----------
  // Una tanda mezcla, por este orden de prioridad:
  //  1. los repasos espaciados que tocan hoy (hasta la mitad),
  //  2. preguntas sin dominar de sus materias más flojas (las de menor dominio entre las empezadas),
  //  3. preguntas nuevas, empezando por las materias que menos ha visto.
  // Si un grupo no llega, se completa con los demás.
  function tamanoTanda() {
    const r = window.Animo ? Animo.racha() : { hoy: 0, objetivo: 20 };
    const faltan = r.objetivo - r.hoy;
    return Math.max(SESION.min, Math.min(SESION.max, faltan > 0 ? faltan : SESION.min));
  }
  function materiasFlojas() {
    const doms = P.dominioPorMateria(A.datos, A.POR_MATERIA);
    return Object.entries(doms).filter(([, s]) => s.vistas > 0 && s.dominio < 1)
      .sort((a, b) => a[1].dominio - b[1].dominio || b[1].repaso - a[1].repaso).slice(0, MATERIAS_FLOJAS).map(([m]) => +m);
  }
  function planDeHoy() {
    const d = A.datos, n = tamanoTanda(), usadas = new Set(), lista = [];
    const tomar = (ids, cupo, parte) => {
      let k = 0;
      for (const id of ids) { if (k >= cupo || lista.length >= n) break; if (usadas.has(id)) continue; usadas.add(id); lista.push({ id, parte }); k++; }
      return k;
    };
    const repasos = priorizar(P.paraHoy(d, A.TODAS));
    const flojas = materiasFlojas();
    const sinDominar = m => {
      const ids = priorizar(A.POR_MATERIA[m] || []);
      // Primero las vistas sin dominar (ya sabe que le cuestan); luego nuevas de esa materia.
      return [...ids.filter(id => P.estado(d, id) === "vista"), ...ids.filter(id => P.estado(d, id) === "nueva")];
    };
    // Reparte por turnos entre las materias flojas para no sacar todo de una.
    const deFlojas = [];
    const colas = flojas.map(sinDominar);
    for (let i = 0; colas.some(c => c.length); i++) { const c = colas[i % colas.length]; if (c.length) deFlojas.push(c.shift()); }
    // Nuevas: por turnos, empezando por las materias con menos preguntas vistas (en proporción).
    const cobertura = Object.keys(A.POR_MATERIA).map(Number).map(m => ({ m, r: P.resumen(d, A.POR_MATERIA[m]) }))
      .sort((a, b) => a.r.vistas / a.r.total - b.r.vistas / b.r.total);
    const colasNuevas = cobertura.map(({ m }) => priorizar(A.POR_MATERIA[m].filter(id => P.estado(d, id) === "nueva")));
    const nuevas = [];
    for (let i = 0; colasNuevas.some(c => c.length); i++) { const c = colasNuevas[i % colasNuevas.length]; if (c.length) nuevas.push(c.shift()); }
    const vistas = priorizar(A.TODAS.filter(id => P.estado(d, id) === "vista"));

    const partes = { repaso: 0, flojas: 0, nuevas: 0, otras: 0 };
    partes.repaso += tomar(repasos, Math.ceil(n * REPARTO.repaso), "repaso");
    partes.flojas += tomar(deFlojas, Math.ceil(n * REPARTO.flojas), "flojas");
    partes.nuevas += tomar(nuevas, n, "nuevas");
    // Rellenar si algún grupo se quedó corto.
    partes.repaso += tomar(repasos, n, "repaso");
    partes.flojas += tomar(deFlojas, n, "flojas");
    partes.otras += tomar(vistas, n, "otras");
    partes.otras += tomar(priorizar(A.TODAS.filter(id => P.estado(d, id) === "dominada")), n, "otras");
    // Las preguntas de cada parte quedan mezcladas, pero se empieza por un repaso si hay.
    let orden = barajar(lista);
    const primero = orden.findIndex(x => x.parte === "repaso");
    if (primero > 0) orden = [orden[primero], ...orden.slice(0, primero), ...orden.slice(primero + 1)];
    return { lista: orden.map(x => A.POR_ID.get(x.id)).filter(Boolean), partes, flojas, n };
  }
  function nombresMaterias(ms) {
    if (!ms.length) return "";
    return ms.length > 1 ? `materias ${ms.slice(0, -1).join(", ")} y ${ms[ms.length - 1]}` : `materia ${ms[0]}`;
  }
  function lineasPlan(pl) {
    const l = [];
    if (pl.partes.repaso) l.push({ icono: "repetir", color: "naranja", texto: plural(pl.partes.repaso, "repaso que toca hoy", "repasos que tocan hoy") });
    if (pl.partes.flojas) l.push({ icono: "diana", color: "rojo", texto: `${plural(pl.partes.flojas, "pregunta", "preguntas")} de tus materias más flojas (${nombresMaterias(pl.flojas)})` });
    if (pl.partes.nuevas) l.push({ icono: "libro", color: "indigo", texto: plural(pl.partes.nuevas, "pregunta nueva", "preguntas nuevas") });
    if (pl.partes.otras) l.push({ icono: "check", color: "verde", texto: plural(pl.partes.otras, "pregunta para afianzar", "preguntas para afianzar") });
    return l;
  }
  function empezarHoy() {
    const pl = planDeHoy();
    if (!pl.lista.length) return;
    A.practicar(pl.lista, "hoy", "Estudiar hoy", "#/", { alTerminar: resultadoHoy });
  }
  function resultadoHoy(s) {
    const r = window.Animo ? Animo.racha() : null;
    const otra = h("button", { class: "boton ancho", onclick: empezarHoy }, r && !r.cumplidoHoy ? `Otra tanda (te ${r.objetivo - r.hoy === 1 ? "falta 1" : `faltan ${r.objetivo - r.hoy}`} para el objetivo)` : "Otra tanda");
    return h("div", { class: "pila" }, otra);
  }
  // Tarjeta de la portada.
  function tarjetaHoy() {
    const pl = planDeHoy(), r = window.Animo ? Animo.racha() : null;
    const hecho = r && r.cumplidoHoy, repasosPend = pl.partes.repaso;
    const titulo = hecho ? (repasosPend ? "Objetivo cumplido, aún quedan repasos" : "Objetivo de hoy cumplido") : "Estudiar hoy";
    const texto = hecho ? (repasosPend ? "Haz los repasos que tocan hoy para que no se acumulen." : "Si te apetece seguir, aquí tienes otra tanda.")
      : "Tu sesión de hoy, preparada según lo que más te conviene repasar.";
    return h("section", { class: "tarjeta hoy" + (hecho && !repasosPend ? " hecho" : ""), "aria-label": "Estudiar hoy" },
      h("div", { class: "hoy-cabecera" }, h("span", { class: "tesela t-azul" }, ico("diana")),
        h("div", {}, h("h2", {}, titulo), h("p", {}, texto))),
      pl.lista.length ? h("ul", { class: "hoy-partes" }, lineasPlan(pl).map(l => h("li", {}, h("span", { class: "punto t-" + l.color }, ico(l.icono)), l.texto))) : null,
      pl.lista.length ? h("button", { class: "boton ancho" + (hecho && !repasosPend ? " gris" : ""), onclick: empezarHoy }, hecho && !repasosPend ? "Otra tanda" : `Empezar · ${plural(pl.lista.length, "pregunta", "preguntas")}`) : null,
      bloqueCuentaAtras());
  }
  function pantallaHoy() {
    const pl = planDeHoy();
    pantalla({ titulo: "Estudiar hoy", atras: { texto: "Inicio", href: "#/" },
      barra: [h("button", { class: "boton", onclick: empezarHoy, disabled: !pl.lista.length }, `Empezar · ${plural(pl.lista.length, "pregunta", "preguntas")}`)],
      teclas: { enter: empezarHoy } },
      h("h1", { class: "titulo-grande" }, "Estudiar hoy"),
      h("p", { class: "subtitulo" }, "Una sesión que se prepara sola cada vez: primero lo que toca repasar, después tus materias más flojas y algunas preguntas nuevas."),
      window.Animo ? A.tarjetaRacha() : null,
      cabecera("Esta tanda"),
      grupo("con-icono", lineasPlan(pl).map(l => fila({ icono: l.icono, color: l.color, titulo: l.texto }))),
      cabecera("Fecha del examen"),
      bloqueCuentaAtras(),
      h("p", { class: "nota-pie" }, "Los repasos siguen el calendario de «Mis fallos» (al día siguiente, a los 3, 7 y 16 días). Las materias flojas son las de menor dominio entre las que ya has empezado."));
  }

  // ---------- Simulacro semanal ----------
  const semanales = () => A.datos.historial.filter(r => r.tipo === "semanal");
  function proximoSemanal() {
    const s = semanales(), ult = s[s.length - 1];
    if (!ult) return { toca: true, ultimo: null, dias: 0 };
    const dias = Math.round((inicioDia(Date.now()) - inicioDia(Date.parse(ult.fecha))) / DIA);
    return { toca: dias >= SEMANA_DIAS, ultimo: ult, dias: SEMANA_DIAS - dias };
  }
  // 30 preguntas repartidas entre las materias en proporción a las que hay de cada una (al menos una de cada
  // materia con preguntas), para que el informe por materia tenga de todo. Restos mayores primero.
  function preguntasSemanal() {
    const ms = Object.keys(A.POR_MATERIA).map(Number), total = A.TODAS.length, N = Math.min(A.EXAMEN_PREGUNTAS, total);
    const cupo = {};
    let usados = 0;
    const restos = ms.map(m => { const exacto = A.POR_MATERIA[m].length / total * N; cupo[m] = Math.max(1, Math.floor(exacto)); usados += cupo[m]; return { m, r: exacto - Math.floor(exacto) }; })
      .sort((a, b) => b.r - a.r);
    for (const { m } of restos) { if (usados >= N) break; if (cupo[m] < A.POR_MATERIA[m].length) { cupo[m]++; usados++; } }
    // Si sobran (por el mínimo de una por materia), se quitan de las más grandes.
    while (usados > N) { const m = ms.sort((a, b) => cupo[b] - cupo[a])[0]; cupo[m]--; usados--; }
    return barajar(ms.flatMap(m => barajar(A.POR_MATERIA[m]).slice(0, cupo[m]))).map(id => A.POR_ID.get(id));
  }
  function empezarSemanal() {
    A.empezarExamen({ lista: preguntasSemanal(), tipo: "semanal", titulo: "Simulacro semanal", alTerminar: alTerminarSemanal });
  }
  function nivel(ids) {
    const d = A.datos;
    let bien = 0;
    for (const id of ids) { const r = d.preguntas[id]; if (r && r.h && r.h.endsWith("1")) bien++; }
    return ids.length ? Math.round(bien / ids.length * 100) : 0;
  }
  function fotoDominio() {
    const o = {};
    for (const [m, ids] of Object.entries(A.POR_MATERIA)) o[m] = nivel(ids);
    return o;
  }
  function alTerminarSemanal(entrada) {
    const p = plan();
    p.fotos[entrada.fecha] = fotoDominio();
    recortarFotos(p.fotos);
    A.guardar();
    return [cabecera("Informe de la semana"), informe(entrada), h("a", { class: "boton ancho gris", href: "#/semanal", style: "margin-top:16px", onclick: () => setTimeout(A.repintar) }, "Ver todos los simulacros")];
  }
  // Compara un simulacro con el anterior. La tendencia de cada materia sale de su nivel (todas sus preguntas,
  // no solo las del simulacro, que son pocas por materia); el resultado del simulacro se muestra al lado.
  const UMBRAL = 5; // puntos de nivel para considerar que una materia mejora o empeora
  function informe(entrada) {
    const lista = semanales(), i = lista.findIndex(r => r.fecha === entrada.fecha), previo = i > 0 ? lista[i - 1] : null;
    const fotos = plan().fotos, ahora = fotos[entrada.fecha] || fotoDominio(), antes = previo ? fotos[previo.fecha] : null;
    const filas = Object.keys(A.POR_MATERIA).map(Number).sort((a, b) => a - b).map(m => {
      const sim = (entrada.materias || {})[m], dom = ahora[m] != null ? ahora[m] : 0, prev = antes && antes[m] != null ? antes[m] : null;
      return { m, sim, dom, prev, delta: prev == null ? null : dom - prev };
    });
    const detalle = f => [f.prev != null ? `Nivel ${f.prev} % → ${f.dom} %` : `Nivel ${f.dom} %`,
      f.sim ? `simulacro ${f.sim[0]} de ${f.sim[1]}` : null].filter(Boolean).join(" · ");
    const filaMateria = (f, color, icono) => fila({ numero: f.m, color, titulo: materia(f.m)[1], detalle: detalle(f),
      valor: f.delta == null ? null : h("span", { class: "tendencia " + (f.delta >= UMBRAL ? "sube" : f.delta <= -UMBRAL ? "baja" : "igual") }, ico(icono), `${f.delta > 0 ? "+" : ""}${f.delta}`),
      href: `#/temario/${f.m}` });
    const resumenExamen = h("p", { class: "nota-pie" }, `${entrada.apto ? "Apto" : "No apto"} con ${plural(entrada.fallos, "fallo", "fallos")} de ${entrada.total}.`,
      previo ? ` La semana anterior: ${plural(previo.fallos, "fallo", "fallos")} (${fechaCortaISO(previo.fecha)}).` : "");
    if (!antes) {
      // Primer simulacro (o sin foto del anterior): punto de partida, de más floja a más fuerte.
      const orden = filas.slice().sort((a, b) => a.dom - b.dom);
      return h("div", { class: "informe" }, resumenExamen,
        h("p", { class: "nota-pie" }, "Es tu punto de partida. El nivel es el % de preguntas de cada materia que acertaste la última vez que salieron. En el próximo simulacro verás qué materias mejoran y cuáles empeoran."),
        cabecera("Tus materias, de más floja a más fuerte"),
        grupo("con-icono", orden.map(f => filaMateria(f, f.dom < 60 ? "rojo" : f.dom < 80 ? "ambar" : "verde", "grafica"))));
    }
    const suben = filas.filter(f => f.delta >= UMBRAL).sort((a, b) => b.delta - a.delta);
    const bajan = filas.filter(f => f.delta <= -UMBRAL).sort((a, b) => a.delta - b.delta);
    const iguales = filas.filter(f => Math.abs(f.delta) < UMBRAL).sort((a, b) => a.dom - b.dom);
    // Foco: la que más ha bajado; si ninguna baja, la de menor nivel.
    const foco = bajan[0] || filas.slice().sort((a, b) => a.dom - b.dom).find(f => f.dom < 80) || null;
    return h("div", { class: "informe" }, resumenExamen,
      foco ? h("a", { class: "aviso aviso-foco", href: `#/temario/${foco.m}` }, ico("diana"),
        h("span", {}, h("strong", {}, `Esta semana, céntrate en la materia ${foco.m}`), ` (${materia(foco.m)[1]}).`)) : null,
      bajan.length ? [cabecera(`Empeoran (${bajan.length})`), grupo("con-icono", bajan.map(f => filaMateria(f, "rojo", "bajar")))] : null,
      suben.length ? [cabecera(`Mejoran (${suben.length})`), grupo("con-icono", suben.map(f => filaMateria(f, "verde", "subir")))] : null,
      iguales.length ? [cabecera(`Sin cambios (${iguales.length})`), grupo("con-icono", iguales.map(f => filaMateria(f, "gris", "igual")))] : null,
      h("p", { class: "nota-pie" }, `Comparado con el simulacro del ${fechaCortaISO(previo.fecha)}. El nivel es el % de preguntas de la materia que acertaste la última vez que salieron; mejora o empeora si cambia ${UMBRAL} puntos o más.`));
  }
  function pantallaSemanal(partes) {
    const lista = semanales(), prox = proximoSemanal();
    if (partes[0] === "informe" && partes[1]) {
      const e = lista.find(r => r.fecha === decodeURIComponent(partes.slice(1).join("/")));
      if (e) return pantalla({ titulo: "Informe", atras: { texto: "Simulacros", href: "#/semanal" } },
        h("h1", { class: "titulo-medio" }, `Simulacro del ${fechaCortaISO(e.fecha)}`), informe(e));
    }
    const ult = lista[lista.length - 1];
    pantalla({ titulo: "Simulacro semanal", atras: { texto: "Inicio", href: "#/" },
      barra: [h("button", { class: "boton" + (prox.toca ? "" : " gris"), onclick: empezarSemanal }, prox.toca ? "Empezar el simulacro" : "Hacerlo igualmente")],
      teclas: { enter: empezarSemanal } },
      h("h1", { class: "titulo-grande" }, "Simulacro semanal"),
      h("p", { class: "subtitulo" }, "Un examen completo a la semana, con preguntas de todas las materias, y un informe de qué mejora y qué empeora."),
      h("div", { class: "aviso" + (prox.toca ? " aviso-toca" : "") }, ico(prox.toca ? "calendario" : "check"),
        h("span", {}, prox.toca ? (ult ? "Ya toca el simulacro de esta semana." : "Haz tu primer simulacro para ver tu punto de partida.")
          : `Ya lo has hecho esta semana. El próximo toca ${prox.dias === 1 ? "mañana" : `dentro de ${prox.dias} días`}.`)),
      cifras([String(A.EXAMEN_PREGUNTAS), "Preguntas"], ["30 min", "Tiempo"], [String(Math.floor(A.EXAMEN_PREGUNTAS * A.PROPORCION_FALLOS)), "Fallos permitidos"]),
      ult ? [cabecera("Último informe"), informe(ult)] : null,
      lista.length ? [cabecera("Simulacros anteriores"), grupo("", lista.slice().reverse().map(r => fila({
        titulo: fechaCortaISO(r.fecha), detalle: `${plural(r.fallos, "fallo", "fallos")} de ${r.total}`,
        valor: h("span", { class: r.apto ? "apto" : "noapto" }, r.apto ? "Apto" : "No apto"), href: `#/semanal/informe/${encodeURIComponent(r.fecha)}` })))] : null);
  }
  function filaSemanal() {
    const prox = proximoSemanal();
    return fila({ icono: "grafica", color: "verde", titulo: "Simulacro semanal",
      detalle: prox.toca ? (prox.ultimo ? "Ya toca el de esta semana" : "Mira tu punto de partida por materia") : `Hecho. El próximo, ${prox.dias === 1 ? "mañana" : `en ${prox.dias} días`}`,
      insignia: prox.toca ? "1" : null, href: "#/semanal" });
  }

  // ---------- Ganchos en la app ----------
  A.ruta("hoy", () => pantallaHoy());
  A.ruta("semanal", partes => pantallaSemanal(partes));
  A.inicioExtra(tarjetaHoy, "arriba");
  // Test a medias: al retomarlo, la sesión de hoy y el simulacro semanal vuelven a terminar como siempre.
  if (A.reanudable) { A.reanudable("hoy", () => ({ alTerminar: resultadoHoy })); A.reanudable("examen:semanal", () => ({ alTerminar: alTerminarSemanal })); }
  A.inicioExtra(filaSemanal, "practicar");
  A.lateralExtra({ id: "hoy", href: "#/hoy", icono: "diana", color: "azul", texto: "Estudiar hoy" });
  A.lateralExtra({ id: "semanal", href: "#/semanal", icono: "grafica", color: "verde", texto: "Simulacro semanal", cuenta: () => proximoSemanal().toca ? "1" : null });

  window.Estudiar = { elegirFecha, textoCuentaAtras, planDeHoy, preguntasSemanal, objetivoNecesario, respuestasQueFaltan, cuentaAtras, informe, normalizarPlan, combinarPlan };
})();
