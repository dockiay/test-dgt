/* Camino del temario, logros y celebraciones de coronas.
   - Camino: las 16 materias como etapas de una carretera. Una etapa se «supera» al dominar el 60 % de sus
     preguntas (desbloquea la siguiente) y se «corona» al dominar el 80 %. El desbloqueo es solo una guía:
     cualquier materia se puede practicar siempre.
   - Logros: premian aprender (preguntas dominadas, fallos convertidos en aciertos, materias coronadas,
     exámenes aprobados), no el tiempo ni puntos sin sentido. Una vez conseguidos se conservan.
   Los logros se guardan en datos.logros ({id: ms en que se consiguió}) y viajan con el progreso
   (copia y nube). Depende de progreso.js (window.Progreso), animo.js y app.js (window.App). */
(function () {
  "use strict";
  const P = window.Progreso;
  if (!P) return;

  const SUPERADA = 0.6, CORONADA = 0.8; // mismo listón que «lista para el examen» (60 % por materia, 80 % global)
  const EXAMEN_MIN = 30;                 // solo cuentan simulacros completos

  // ---------- Datos: datos.logros ----------
  function normalizarLogros(v) {
    const n = {};
    for (const [id, ms] of Object.entries(v && typeof v === "object" ? v : {})) if (/^[a-z0-9-]{1,40}$/.test(id) && +ms > 0) n[id] = +ms;
    return n;
  }
  // Al combinar dos dispositivos, de cada logro se queda la fecha más antigua.
  function combinarLogros(a, b) {
    a = normalizarLogros(a); b = normalizarLogros(b);
    const n = Object.assign({}, b, a);
    for (const id of Object.keys(b)) if (a[id]) n[id] = Math.min(a[id], b[id]);
    return n;
  }
  if (typeof P.extender === "function") P.extender("logros", { vacio: () => ({}), normalizar: normalizarLogros, combinar: combinarLogros });
  const logrosDe = d => (d.logros && typeof d.logros === "object") ? d.logros : (d.logros = {});

  // ---------- Etapas del camino ----------
  // nivel: 0 sin empezar, 1 empezada, 2 superada, 3 coronada. La corona, una vez ganada, se conserva,
  // pero si el dominio baja del 80 % se avisa para repasarla.
  function etapas(datos, porMateria) {
    const lg = logrosDe(datos), out = [];
    let anteriorSuperada = true;
    for (let n = 1; n <= 16; n++) {
      const ids = porMateria[n] || [];
      const r = P.resumen(datos, ids);
      const coronada = !!lg["corona-m" + n], corona = ids.length > 0 && r.dominio >= CORONADA;
      const nivel = coronada || corona ? 3 : r.dominio >= SUPERADA ? 2 : r.vistas > 0 ? 1 : 0;
      out.push({ n, total: ids.length, resumen: r, dominio: r.dominio, nivel, coronada: coronada || corona, bajo: coronada && !corona,
        desbloqueada: anteriorSuperada || r.vistas > 0 });
      anteriorSuperada = nivel >= 2 || !ids.length;
    }
    // Siguiente etapa recomendada: la primera sin superar; si están todas superadas, la primera sin corona.
    const sig = out.find(e => e.total && e.nivel < 2) || out.find(e => e.total && !e.coronada);
    if (sig) sig.siguiente = true;
    return out;
  }

  // ---------- Logros ----------
  // Cada logro: id, grupo, título, descripción y una función que da [valor, meta] para mostrar el avance.
  const LOGROS = [
    { id: "dominadas-1", grupo: "Aprender", icono: "check", titulo: "Primera pregunta dominada", texto: "Acierta la misma pregunta dos veces seguidas.", avance: c => [c.g.dominada, 1] },
    { id: "dominadas-50", grupo: "Aprender", icono: "check", titulo: "50 preguntas dominadas", texto: "Domina 50 preguntas distintas.", avance: c => [c.g.dominada, 50] },
    { id: "dominadas-200", grupo: "Aprender", icono: "check", titulo: "200 preguntas dominadas", texto: "Domina 200 preguntas distintas.", avance: c => [c.g.dominada, 200] },
    { id: "dominadas-500", grupo: "Aprender", icono: "check", titulo: "500 preguntas dominadas", texto: "Domina 500 preguntas distintas.", avance: c => [c.g.dominada, 500] },
    { id: "superados-10", grupo: "Aprender", icono: "repetir", titulo: "Aprender del error", texto: "Domina 10 preguntas que habías fallado.", avance: c => [c.superados, 10] },
    { id: "superados-50", grupo: "Aprender", icono: "repetir", titulo: "Los fallos ya no se escapan", texto: "Domina 50 preguntas que habías fallado.", avance: c => [c.superados, 50] },
    { id: "materias-todas", grupo: "Temario", icono: "mapa", titulo: "Visión completa", texto: "Practica al menos una pregunta de cada una de las 16 materias.", avance: c => [c.tocadas, c.conPreguntas] },
    { id: "coronas-1", grupo: "Temario", icono: "corona", titulo: "Primera materia coronada", texto: "Domina el 80 % de las preguntas de una materia.", avance: c => [c.coronas, 1] },
    { id: "coronas-4", grupo: "Temario", icono: "corona", titulo: "Cuatro coronas", texto: "Corona 4 materias.", avance: c => [c.coronas, 4] },
    { id: "coronas-8", grupo: "Temario", icono: "corona", titulo: "Medio temario coronado", texto: "Corona 8 materias.", avance: c => [c.coronas, 8] },
    { id: "coronas-16", grupo: "Temario", icono: "corona", titulo: "Temario completo", texto: "Corona las 16 materias.", avance: c => [c.coronas, c.conPreguntas] },
    { id: "aptos-1", grupo: "Examen", icono: "examen", titulo: "Primer apto", texto: "Aprueba un examen final.", avance: c => [c.aptos, 1] },
    { id: "perfecto", grupo: "Examen", icono: "trofeo", titulo: "Examen perfecto", texto: "Aprueba un examen final sin ningún fallo.", avance: c => [c.perfectos, 1] },
    { id: "seguidos-5", grupo: "Examen", icono: "examen", titulo: "Cinco aptos seguidos", texto: "Aprueba 5 exámenes finales seguidos.", avance: c => [c.mejorSerie, 5] },
    { id: "aptos-10", grupo: "Examen", icono: "trofeo", titulo: "10 exámenes aprobados", texto: "Aprueba 10 exámenes finales.", avance: c => [c.aptos, 10] },
    { id: "lista", grupo: "Examen", icono: "medalla", titulo: "Lista para el examen", texto: "Cumple los cuatro criterios de «Mi progreso».", avance: c => [c.criterios, 4] },
    { id: "racha-7", grupo: "Constancia", icono: "llama", titulo: "Una semana seguida", texto: "Estudia 7 días seguidos (el día de descanso no la rompe).", avance: c => [c.racha, 7] },
    { id: "racha-30", grupo: "Constancia", icono: "llama", titulo: "Un mes de constancia", texto: "Estudia 30 días seguidos.", avance: c => [c.racha, 30] },
  ];
  const POR_ID_LOGRO = new Map(LOGROS.map(l => [l.id, l]));

  function contexto(datos, todas, porMateria) {
    const prep = P.preparacion(datos, todas, porMateria), lg = logrosDe(datos);
    let superados = 0;
    for (const id of todas) { const r = datos.preguntas[id]; if (r && r.ko > 0 && P.estado(datos, id) === "dominada") superados++; }
    const exs = datos.historial.filter(r => r.total >= EXAMEN_MIN);
    let serie = 0, mejorSerie = 0;
    for (const r of exs) { serie = r.apto ? serie + 1 : 0; mejorSerie = Math.max(mejorSerie, serie); }
    const mats = Object.keys(porMateria);
    return {
      g: prep.global, superados, mejorSerie,
      aptos: exs.filter(r => r.apto).length, perfectos: exs.filter(r => r.apto && r.fallos === 0).length,
      conPreguntas: mats.length, tocadas: mats.filter(m => prep.materias[m].vistas > 0).length,
      coronas: Object.keys(lg).filter(k => /^corona-m\d+$/.test(k)).length,
      criterios: prep.criterios.filter(c => c.cumple).length, racha: P.rachaDetalle ? P.rachaDetalle(datos).dias : P.racha(datos),
    };
  }
  // Lista de logros con su estado, para pintar.
  function estadoLogros(datos, todas, porMateria) {
    const c = contexto(datos, todas, porMateria), lg = logrosDe(datos);
    return LOGROS.map(l => { const [v, m] = l.avance(c); return Object.assign({}, l, { valor: Math.min(v, m), meta: m, conseguido: lg[l.id] || 0 }); });
  }
  // Apunta coronas y logros nuevos. Devuelve lo nuevo, en orden (primero las coronas).
  function revisar(datos, todas, porMateria, ahora = Date.now()) {
    const lg = logrosDe(datos), nuevos = [];
    for (const e of etapas(datos, porMateria)) {
      const k = "corona-m" + e.n;
      if (e.total && e.dominio >= CORONADA && !lg[k]) { lg[k] = ahora; nuevos.push({ tipo: "corona", materia: e.n }); }
    }
    const c = contexto(datos, todas, porMateria);
    for (const l of LOGROS) {
      if (lg[l.id]) continue;
      const [v, m] = l.avance(c);
      if (m > 0 && v >= m) { lg[l.id] = ahora; nuevos.push({ tipo: "logro", logro: l }); }
    }
    return nuevos;
  }

  // ---------- Pantallas (necesitan app.js) ----------
  const A = window.App;
  if (!A) return;
  const { h, ico, fila, grupo, cabecera, cifras, pantalla, plural } = A;
  const MATS = () => A.POR_MATERIA, TODAS = () => A.TODAS;
  const nombre = n => A.materia(n)[1];
  const pct = x => `${Math.floor(x * 100)} %`;

  function textoEtapa(e) {
    if (!e.total) return "Aún sin preguntas verificadas";
    if (e.coronada) return e.bajo ? `Coronada · ha bajado al ${pct(e.dominio)}, repásala` : `Coronada · ${pct(e.dominio)} dominado`;
    if (e.nivel === 2) return `Superada · ${pct(e.dominio)}, corónala con el 80 %`;
    if (e.nivel === 1) return `${pct(e.dominio)} dominado · supérala con el 60 %`;
    return plural(e.total, "pregunta", "preguntas");
  }
  function claseEtapa(e) {
    return "etapa n" + e.nivel + (e.coronada ? " coronada" : "") + (e.siguiente ? " siguiente" : "") + (e.desbloqueada ? "" : " adelante") + (e.bajo ? " bajo" : "");
  }

  // Vista del camino: carretera con curvas y una etapa por materia, alternando izquierda y derecha.
  const FILA = 116; // alto de cada etapa en px
  function carretera(lista) {
    const xs = lista.map((_, i) => i % 2 ? 70 : 30), ys = lista.map((_, i) => FILA / 2 + i * FILA);
    const alto = lista.length * FILA + FILA * 0.9; // y la meta
    xs.push(50); ys.push(lista.length * FILA + FILA * 0.35);
    let d = `M${xs[0]} 0 L${xs[0]} ${ys[0]}`;
    for (let i = 1; i < xs.length; i++) { const ym = (ys[i - 1] + ys[i]) / 2; d += ` C${xs[i - 1]} ${ym} ${xs[i]} ${ym} ${xs[i]} ${ys[i]}`; }
    const NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 100 ${alto}`); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("class", "camino-via"); svg.setAttribute("aria-hidden", "true");
    for (const c of ["arcen", "asfalto", "linea"]) { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("class", c); p.setAttribute("vector-effect", "non-scaling-stroke"); svg.append(p); }
    // Tramo ya recorrido: hasta la última etapa superada seguida desde el principio.
    let hecho = 0; while (hecho < lista.length && (lista[hecho].nivel >= 2 || !lista[hecho].total)) hecho++;
    if (hecho) {
      let dh = `M${xs[0]} 0 L${xs[0]} ${ys[0]}`;
      for (let i = 1; i < Math.min(hecho + (hecho === lista.length ? 1 : 0), xs.length); i++) { const ym = (ys[i - 1] + ys[i]) / 2; dh += ` C${xs[i - 1]} ${ym} ${xs[i]} ${ym} ${xs[i]} ${ys[i]}`; }
      const p = document.createElementNS(NS, "path"); p.setAttribute("d", dh); p.setAttribute("class", "recorrido"); p.setAttribute("vector-effect", "non-scaling-stroke"); svg.insertBefore(p, svg.lastChild);
    }
    return { svg, xs, ys, alto };
  }
  function mapa(lista) {
    const { svg, xs, ys, alto } = carretera(lista);
    const caja = h("ol", { class: "camino", style: `height:${alto}px`, "aria-label": "Camino del temario" });
    caja.append(svg);
    lista.forEach((e, i) => {
      const izq = xs[i] < 50;
      const voz = `Materia ${e.n}: ${nombre(e.n)}. ${textoEtapa(e)}${e.siguiente ? ". Siguiente etapa recomendada" : ""}${e.desbloqueada ? "" : ". Más adelante en el camino, puedes practicarla igualmente"}`;
      caja.append(h("li", { class: claseEtapa(e) + (izq ? " izq" : " der"), style: `--x:${xs[i]}%;--y:${ys[i]}px;--p:${Math.round(Math.min(1, e.dominio / CORONADA) * 100)}` },
        e.siguiente ? h("span", { class: "etapa-globo", "aria-hidden": "true" }, e.nivel ? "Sigue aquí" : "Empieza aquí") : null,
        h("a", { class: "etapa-boton", href: `#/temario/${e.n}`, "aria-label": voz, "aria-disabled": e.total ? null : "true", tabindex: e.total ? null : "-1" },
          h("span", { class: "etapa-anillo" }, h("span", { class: "etapa-disco" }, e.coronada ? ico("corona") : h("b", {}, e.n)))),
        h("a", { class: "etapa-texto", href: `#/temario/${e.n}`, tabindex: "-1", "aria-hidden": "true" },
          h("small", {}, `Materia ${e.n}`), h("strong", {}, nombre(e.n)), h("span", {}, textoEtapa(e)))));
    });
    const meta = lista.every(e => e.coronada || !e.total);
    caja.append(h("li", { class: "etapa meta-final" + (meta ? " coronada" : ""), style: `--x:50%;--y:${ys[ys.length - 1]}px` },
      h("a", { class: "etapa-boton", href: "#/examen", "aria-label": "Meta: examen final" }, h("span", { class: "etapa-disco" }, ico("bandera"))),
      h("span", { class: "etapa-texto centro", "aria-hidden": "true" }, h("strong", {}, "Meta: examen final"))));
    return caja;
  }
  function listaSimple(lista) {
    return grupo("con-icono mosaico", lista.map(e => fila({ numero: e.coronada ? null : e.n, icono: e.coronada ? "corona" : null,
      color: !e.total ? "gris" : e.coronada ? "ambar" : e.nivel === 2 ? "verde" : e.siguiente ? "azul" : "indigo",
      titulo: nombre(e.n), detalle: `${e.siguiente ? "Siguiente etapa · " : ""}${textoEtapa(e)}`,
      accion: () => { location.hash = `#/temario/${e.n}`; }, deshabilitada: !e.total, chevron: !!e.total })));
  }
  let vista = "camino";
  try { vista = localStorage.getItem("testB.vistaTemario") === "lista" ? "lista" : "camino"; } catch (e) { /* sin almacenamiento */ }
  function pantallaCamino() {
    const lista = etapas(A.datos, MATS()), coronas = lista.filter(e => e.coronada).length, superadas = lista.filter(e => e.nivel >= 2).length;
    const sig = lista.find(e => e.siguiente);
    const cuerpo = h("div", {});
    const pintar = () => {
      cuerpo.replaceChildren(vista === "lista" ? listaSimple(lista) : mapa(lista));
      try { localStorage.setItem("testB.vistaTemario", vista); } catch (e) { /* sin almacenamiento */ }
    };
    pantalla({ titulo: "Temario", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Temario"),
      h("p", { class: "subtitulo" }, "Tu camino por las 16 materias. Supera cada etapa dominando el 60 % de sus preguntas y corónala con el 80 %. Es una guía: puedes practicar cualquier materia cuando quieras."),
      cifras([`${coronas}/16`, "Coronadas"], [`${superadas}/16`, "Superadas"], [sig ? String(sig.n) : "–", "Siguiente materia"]),
      A.segmentos([["camino", "Camino"], ["lista", "Lista"]], vista, v => { vista = v; pintar(); }),
      cuerpo,
      h("p", { class: "nota-pie" }, "Materias según el Reglamento General de Conductores (RD 818/2009), anexo V.B.1. Una pregunta está dominada cuando aciertas las dos últimas veces que la respondes y no está en el repaso de fallos."));
    pintar();
    // Lleva la vista a la etapa en la que va, si queda fuera de la pantalla.
    const el = vista === "camino" && cuerpo.querySelector(".etapa.siguiente");
    if (el) requestAnimationFrame(() => { if (el.getBoundingClientRect().bottom > innerHeight - 40) el.scrollIntoView({ block: "center", behavior: "auto" }); });
  }
  // Portada de una materia: la de siempre, con su estado en el camino.
  function guiaMateria(n) {
    A.pantallas.portadaMateria(n);
    const lista = etapas(A.datos, MATS()), e = lista[n - 1];
    if (!e || !e.total) return;
    const sub = document.querySelector("#app .subtitulo");
    if (!sub) return;
    const previa = !e.desbloqueada ? lista.slice(0, n - 1).reverse().find(x => x.total && x.nivel < 2) : null;
    const falta = e.coronada ? null : Math.max(0, Math.ceil((e.nivel >= 2 ? CORONADA : SUPERADA) * e.total) - e.resumen.dominada);
    sub.after(h("div", { class: "guia-etapa " + claseEtapa(e) },
      h("span", { class: "etapa-disco mini" }, e.coronada ? ico("corona") : h("b", {}, n)),
      h("span", {}, h("strong", {}, e.coronada ? (e.bajo ? "Coronada, pero ha bajado" : "Materia coronada") : e.nivel === 2 ? "Etapa superada" : e.siguiente ? "Tu siguiente etapa" : "Etapa del camino"),
        h("span", {}, e.coronada ? (e.bajo ? `Dominas el ${pct(e.dominio)}. Repásala para volver al 80 %.` : `Dominas el ${pct(e.dominio)} de sus preguntas.`)
          : `Dominas ${e.resumen.dominada} de ${e.total}. ${falta ? `Te ${falta === 1 ? "falta 1 pregunta" : `faltan ${falta} preguntas`} para ${e.nivel >= 2 ? "coronarla" : "superarla"}.` : ""}`,
          previa ? ` En el camino va antes la materia ${previa.n}, pero puedes practicar esta ya.` : ""))));
  }

  // ---------- Pantalla de logros ----------
  function tarjetaLogro(l) {
    const hecho = !!l.conseguido, avance = l.meta ? l.valor / l.meta : 0;
    return h("li", { class: "logro" + (hecho ? " conseguido" : "") },
      h("span", { class: "logro-sello" }, ico(l.icono)),
      h("span", { class: "logro-cuerpo" },
        h("strong", {}, l.titulo), h("span", {}, l.texto),
        hecho ? h("small", {}, `Conseguido el ${new Date(l.conseguido).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`)
          : h("span", { class: "logro-avance" },
            h("span", { class: "progreso", role: "progressbar", "aria-label": l.titulo, "aria-valuemin": 0, "aria-valuemax": l.meta, "aria-valuenow": l.valor }, h("i", { style: `width:${Math.round(avance * 100)}%` })),
            h("small", {}, `${l.valor}/${l.meta}`))));
  }
  function pantallaLogros() {
    const ls = estadoLogros(A.datos, TODAS(), MATS()), n = ls.filter(l => l.conseguido).length;
    const grupos = [...new Set(ls.map(l => l.grupo))];
    pantalla({ titulo: "Logros", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Logros"),
      h("p", { class: "subtitulo" }, "Premian lo que aprendes: preguntas dominadas, fallos superados, materias coronadas y exámenes aprobados. Una vez conseguidos, son tuyos."),
      cifras([`${n}/${ls.length}`, "Conseguidos"], [String(Object.keys(logrosDe(A.datos)).filter(k => /^corona-m/.test(k)).length), "Coronas"], [String(contexto(A.datos, TODAS(), MATS()).superados), "Fallos superados"]),
      grupos.map(g => [cabecera(g), h("ul", { class: "logros" }, ls.filter(l => l.grupo === g).sort((a, b) => (!!b.conseguido) - (!!a.conseguido)).map(tarjetaLogro))]));
  }

  // ---------- Portada: resumen del camino y de los logros ----------
  function bloqueInicio() {
    const lista = etapas(A.datos, MATS()), coronas = lista.filter(e => e.coronada).length, sig = lista.find(e => e.siguiente);
    const ls = estadoLogros(A.datos, TODAS(), MATS()), n = ls.filter(l => l.conseguido).length;
    const proximo = ls.filter(l => !l.conseguido).sort((a, b) => b.valor / b.meta - a.valor / a.meta)[0];
    return grupo("con-icono mosaico",
      fila({ icono: "mapa", color: "ambar", titulo: sig ? `Camino: sigue en la materia ${sig.n}` : "Camino completado",
        detalle: `${plural(coronas, "materia coronada", "materias coronadas")} de 16${sig ? ` · ${nombre(sig.n)}` : ""}`, href: sig ? `#/temario/${sig.n}` : "#/temario" }),
      fila({ icono: "medalla", color: "verde", titulo: `Logros: ${n} de ${ls.length}`, detalle: proximo ? `Próximo: ${proximo.titulo} (${proximo.valor}/${proximo.meta})` : "¡Los tienes todos!", href: "#/logros" }));
  }

  // ---------- Celebraciones ----------
  let cola = [], celebrando = false;
  function celebrar(nuevos) {
    if (window.Celebracion && Celebracion.abierta) return; // la celebración de fin de lección ya los enseña
    cola.push(...nuevos);
    if (celebrando) return;
    celebrando = true;
    (function siguiente() {
      const x = cola.shift();
      if (!x) { celebrando = false; return; }
      if (window.Animo) {
        if (x.tipo === "corona") { Animo.sonar("aprobado"); Animo.confeti(140); Animo.aviso(`¡Materia ${x.materia} coronada!`, "corona"); }
        else { Animo.sonar("meta"); if (/^(coronas-16|lista|aptos-10|perfecto)$/.test(x.logro.id)) Animo.confeti(); Animo.aviso(`Logro: ${x.logro.titulo}`, "logro"); }
      }
      setTimeout(siguiente, 2300);
    })();
  }
  // Revisa tras responder o corregir. silencio: apunta sin celebrar (al abrir la web o al llegar progreso de otro dispositivo).
  function comprobar(silencio, retraso = 1100) {
    const nuevos = revisar(A.datos, TODAS(), MATS());
    if (!nuevos.length) return;
    A.guardar();
    if (!silencio) setTimeout(() => celebrar(nuevos), retraso);
  }
  window.addEventListener("respuesta", e => { if (e.detail && e.detail.modo !== "examen") comprobar(false); });
  window.addEventListener("examen-corregido", () => comprobar(false, 1300));
  window.addEventListener("progreso-nube", () => setTimeout(() => comprobar(true)));
  comprobar(true);

  A.ruta("temario", partes => { if (partes.length) guiaMateria(Number(partes[0])); else pantallaCamino(); });
  A.ruta("logros", () => pantallaLogros());
  A.inicioExtra(bloqueInicio, "arriba");
  A.lateralExtra({ id: "logros", href: "#/logros", icono: "medalla", color: "verde", texto: "Logros" });

  window.Camino = { SUPERADA, CORONADA, LOGROS, etapas, estadoLogros, revisar, normalizarLogros, combinarLogros, contexto, POR_ID_LOGRO };
})();
