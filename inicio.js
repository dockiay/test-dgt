/* Portada. Una sola acción principal (continuar el test a medias o, si no lo hay, el paso que toca del
   camino), «Estudiar hoy» justo debajo, y lo demás recogido: racha, objetivo y fecha de examen
   en una tira de estado; el resto de la práctica en teselas; el progreso en dos filas.
   Las extensiones siguen añadiendo bloques con App.inicioExtra ("arriba", "practicar", "abajo"). */
(function () {
  "use strict";
  const A = window.App, P = window.Progreso;
  if (!A || !P) return;
  const { h, ico, fila, grupo, cabecera, plural, hoja } = A;
  const NS = "http://www.w3.org/2000/svg";

  // Anillo de avance (0 a 1). Decorativo: el dato va siempre en texto al lado.
  function anillo(valor, clase) {
    const s = document.createElementNS(NS, "svg"), R = 15.5, L = 2 * Math.PI * R;
    s.setAttribute("viewBox", "0 0 40 40"); s.setAttribute("class", "anillo " + (clase || "")); s.setAttribute("aria-hidden", "true");
    const c = (cl, extra) => { const e = document.createElementNS(NS, "circle"); e.setAttribute("cx", 20); e.setAttribute("cy", 20); e.setAttribute("r", R); e.setAttribute("class", cl);
      for (const [k, v] of Object.entries(extra || {})) e.setAttribute(k, v); return e; };
    const v = Math.max(0, Math.min(1, valor || 0));
    s.append(c("anillo-fondo"), c("anillo-valor", { "stroke-dasharray": `${(L * v).toFixed(1)} ${L.toFixed(1)}`, transform: "rotate(-90 20 20)" }));
    return s;
  }

  // ---------- Saludo ----------
  function saludo(r, enCurso) {
    const u = window.Nube && window.Nube.estado.usuario;
    const nombre = u && u.nombre ? u.nombre.trim().split(/\s+/)[0] : "";
    const faltan = r ? r.objetivo - r.hoy : 0;
    const texto = enCurso ? "Tienes un test a medias: termínalo y sigue con lo de hoy."
      : !r ? "Tu sesión de hoy ya está preparada."
      : r.cumplidoHoy ? "Objetivo de hoy cumplido. ¡Así se hace!"
      : r.hoy ? `Te ${faltan === 1 ? "falta 1 pregunta" : `faltan ${faltan} preguntas`} para el objetivo de hoy.`
      : r.dias > 0 ? `Llevas ${plural(r.dias, "día", "días")} de racha. Responde hoy para sumar otro.`
      : "Responde hoy tus primeras preguntas y empieza tu racha.";
    return [h("h1", { class: "titulo-grande" }, nombre ? `Hola, ${nombre}` : "Test permiso B"), h("p", { class: "subtitulo" }, texto)];
  }

  // ---------- Tira de estado: racha y protector, objetivo de hoy, fecha de examen ----------
  function verRacha() {
    hoja({ titulo: "Racha y objetivo diario", contenido: A.tarjetaRacha("en-hoja"), cancelar: "Cerrar" });
  }
  function tiraEstado(r) {
    const E = window.Estudiar, c = E ? E.cuentaAtras() : null, pr = r && r.protector;
    const chips = [];
    if (r) {
      chips.push(h("button", { class: "chip chip-racha" + (r.dias > 0 ? " viva" : ""), onclick: verRacha,
        "aria-label": `Racha: ${plural(r.dias, "día", "días")}${pr ? (pr.disponible ? ". Protector de racha listo" : ". Descanso de esta semana usado") : ""}. Ver la semana` },
        ico("llama"), h("b", {}, String(r.dias)), h("span", {}, r.dias === 1 ? "día" : "días"),
        pr ? h("span", { class: "chip-escudo" + (pr.disponible ? " listo" : "") }, ico("escudo")) : null));
      chips.push(h("button", { class: "chip chip-meta" + (r.cumplidoHoy ? " cumplida" : ""), onclick: verRacha,
        "aria-label": `Objetivo de hoy: ${Math.min(r.hoy, r.objetivo)} de ${r.objetivo} preguntas. Ver o cambiar` },
        r.cumplidoHoy ? ico("check") : anillo(r.hoy / r.objetivo), h("b", {}, `${Math.min(r.hoy, r.objetivo)}/${r.objetivo}`), h("span", {}, "hoy")));
    }
    if (E) {
      const cerca = c && c.dias >= 0 && c.dias <= 7;
      chips.push(h("button", { class: "chip chip-fecha" + (cerca ? " cerca" : ""), onclick: E.elegirFecha, "aria-label": c ? `${E.textoCuentaAtras(c)}. Cambiar la fecha` : "Poner la fecha de tu examen" },
        ico("calendario"), c && c.dias >= 0 ? [h("b", {}, c.dias === 0 ? "Hoy" : String(c.dias)), h("span", {}, c.dias === 0 ? "es tu examen" : c.dias === 1 ? "día para el examen" : "días para el examen")]
          : h("span", {}, c ? "Nueva fecha de examen" : "Fecha de examen")));
    }
    return chips.length ? h("div", { class: "tira-estado", role: "group", "aria-label": "Racha, objetivo de hoy y fecha de examen" }, chips) : null;
  }

  // ---------- Acción principal: «Estudiar hoy» ----------
  function resumenPlan(pl) {
    const p = pl.partes, l = [];
    if (p.repaso) l.push(plural(p.repaso, "repaso", "repasos"));
    if (p.flojas) l.push(`${p.flojas} de tus materias flojas`);
    if (p.nuevas) l.push(plural(p.nuevas, "nueva", "nuevas"));
    if (p.otras) l.push(`${p.otras} para afianzar`);
    return l.join(" · ");
  }
  // principal: es la acción de la pantalla (solo cuando el camino está completo); si no, va debajo del camino.
  function tarjetaHoy(r, principal) {
    const E = window.Estudiar;
    if (!E) return null;
    const pl = E.planDeHoy(), n = pl.lista.length;
    if (!n) return null;
    const hecho = r && r.cumplidoHoy, repasos = pl.partes.repaso, descanso = hecho && !repasos;
    const titulo = !hecho ? "Estudiar hoy" : repasos ? "Aún quedan repasos de hoy" : "Objetivo de hoy cumplido";
    return h("section", { class: "tarjeta principal" + (principal ? "" : " secundaria") + (descanso ? " hecho" : ""), "aria-label": "Estudiar hoy" },
      h("div", { class: "principal-cabeza" },
        h("span", { class: "tesela t-" + (descanso ? "verde" : "azul") }, ico(descanso ? "check" : "diana")),
        h("div", {}, h("p", { class: "principal-etiqueta" }, descanso ? "Hecho por hoy" : "Tu repaso de hoy"), h("h2", {}, titulo))),
      h("a", { class: "principal-plan", href: "#/hoy", "aria-label": `Ver el plan de hoy: ${resumenPlan(pl)}` }, h("span", {}, descanso ? "Si te apetece seguir, hay otra tanda preparada." : resumenPlan(pl)), ico("chevron", "chevron")),
      h("button", { class: "boton ancho" + (descanso || !principal ? " gris" : ""), onclick: E.empezarHoy }, descanso ? "Otra tanda" : `Empezar · ${plural(n, "pregunta", "preguntas")}`));
  }
  // Con un test a medias, la acción principal es continuarlo y «Estudiar hoy» pasa a una fila.
  function filaHoy() {
    const E = window.Estudiar;
    if (!E) return null;
    const pl = E.planDeHoy();
    return pl.lista.length ? grupo("con-icono", fila({ icono: "diana", color: "azul", titulo: "Estudiar hoy", detalle: `Después: ${plural(pl.lista.length, "pregunta", "preguntas")} · ${resumenPlan(pl)}`, href: "#/hoy" })) : null;
  }

  // ---------- El camino: la unidad en curso y el paso que toca ----------
  // principal: lleva el botón grande que empieza el paso que toca. Si no (hay un test a medias), es un enlace al camino.
  function tarjetaCamino(principal) {
    const C = window.Camino;
    if (!C || !C.UNIDADES || !C.UNIDADES.length) return null;
    const d = A.datos, act = C.nodoActual(d), nodos = C.NODOS, hechos = nodos.filter(x => C.hecho(d, x)).length;
    if (!act) return h("a", { class: "tarjeta camino-inicio completo", href: "#/temario" },
      h("div", { class: "ci-cabeza" }, h("span", { class: "ci-num" }, ico("corona")),
        h("div", {}, h("small", {}, "Tu camino"), h("strong", {}, "Camino completado"))),
      h("div", { class: "ci-pie" }, h("span", {}, `${nodos.length} pasos superados. Repasa o ve a por el oro.`), h("span", { class: "ci-ir" }, "Ver", ico("chevron"))));
    const u = act.unidad, tono = C.UNIDADES.indexOf(u) % 8;
    const paso = act.tipo === "paso" ? "Test de paso" : act.tipo === "cofre" ? "Abre el cofre" : `Nivel ${act.i} de ${u.niveles}`;
    const ruta = h("ol", { class: "ci-ruta", "aria-label": `Pasos de la unidad: toca ${paso.toLowerCase()}` }, u.nodos.map(x => {
      const estado = C.hecho(d, x) ? "hecho" : x === act ? "actual" : "pendiente";
      const dentro = x.tipo === "paso" ? ico("trofeo") : x.tipo === "cofre" ? ico("medalla") : estado === "hecho" ? ico("check") : h("b", {}, String(x.i));
      return h("li", { class: `ci-nodo ${estado} ${x.tipo}`, "aria-current": estado === "actual" ? "step" : null }, h("span", {}, dentro));
    }));
    const cabeza = h("div", { class: "ci-cabeza" }, h("span", { class: "ci-num" }, String(u.materia)),
      h("div", {}, h("small", {}, `Tu camino · materia ${u.materia}` + (u.de > 1 ? ` · unidad ${u.k} de ${u.de}` : "")), principal ? h("h2", {}, u.titulo) : h("strong", {}, u.titulo)));
    const avance = [h("b", {}, paso), ` · ${hechos} de ${nodos.length} pasos`];
    if (!principal) return h("a", { class: `tarjeta camino-inicio tono-${tono}`, href: "#/temario", "aria-label": `Tu camino: materia ${u.materia}, ${u.titulo}. Toca: ${paso}. ${hechos} de ${nodos.length} pasos hechos` },
      cabeza, ruta, h("div", { class: "ci-pie" }, h("span", {}, avance), h("span", { class: "ci-ir" }, "Seguir", ico("chevron"))));
    const n = act.tipo === "paso" ? C.PASO_N : C.NIVEL_N;
    const boton = act.tipo === "cofre" ? h("a", { class: "boton ancho", href: "#/temario" }, "Abrir el cofre")
      : h("button", { class: "boton ancho", onclick: () => C.empezarNodo(act) }, act.tipo === "paso" ? "Hacer el test de paso" : `Empezar el nivel ${act.i}`);
    return h("section", { class: `tarjeta camino-inicio es-principal tono-${tono}`, "aria-label": "Tu camino" },
      cabeza, ruta,
      h("a", { class: "principal-plan", href: "#/temario", "aria-label": "Ver el camino completo" }, h("span", {}, act.tipo === "cofre" ? avance : [h("b", {}, `${paso} · ${n} preguntas`), h("br"), `${hechos} de ${nodos.length} pasos`]), h("span", { class: "ci-ver" }, "Ver el camino"), ico("chevron", "chevron")),
      boton);
  }

  // ---------- Más práctica (teselas) ----------
  function masPractica() {
    const nf = A.fallosDeHoy().length, nd = Object.keys(A.datos.dudosas).length;
    return grupo("con-icono atajos",
      A.extrasInicio("practicar"),
      fila({ icono: "examen", color: "azul", titulo: "Examen final", detalle: "30 preguntas, 30 minutos", href: "#/examen" }),
      fila({ icono: "libro", color: "indigo", titulo: "Examen por temario", detalle: "Elige entre las 16 materias", href: "#/temario" }),
      fila({ icono: "repetir", color: "naranja", titulo: "Mis fallos", detalle: nf ? `${plural(nf, "repaso", "repasos")} para hoy` : "Nada que repasar hoy", insignia: nf || null, href: "#/fallos" }),
      fila({ icono: "bandera", color: "rojo", titulo: "Preguntas dudosas", detalle: nd ? plural(nd, "marcada", "marcadas") : "Ninguna marcada", href: "#/dudosas" }));
  }

  // ---------- Progreso: preparación para el examen y logros ----------
  function bloqueProgreso() {
    const d = A.datos, prep = P.preparacion(d, A.TODAS, A.POR_MATERIA), ok = prep.criterios.filter(c => c.cumple).length;
    const filas = [h("a", { class: "fila", href: "#/progreso" },
      h("span", { class: "anillo-caja" + (prep.lista ? " lista" : "") }, anillo(prep.lista ? 1 : prep.avance), h("b", {}, prep.lista ? ico("check") : `${Math.round(prep.avance * 100)}`)),
      h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, prep.lista ? "Todo listo para el examen" : "Preparación para el examen"),
        h("span", { class: "fila-detalle" }, prep.lista ? "Cumples todos los criterios" : `${ok} de ${prep.criterios.length} criterios · ${prep.global.vistas} de ${A.PREGUNTAS.length} preguntas vistas`)),
      ico("chevron", "chevron"))];
    const C = window.Camino;
    if (C && C.estadoLogros) {
      const ls = C.estadoLogros(d, A.TODAS, A.POR_MATERIA), n = ls.filter(l => l.conseguido).length;
      const prox = ls.filter(l => !l.conseguido).sort((a, b) => b.valor / b.meta - a.valor / a.meta)[0];
      filas.push(fila({ icono: "medalla", color: "verde", titulo: `Logros: ${n} de ${ls.length}`, detalle: prox ? `Próximo: ${prox.titulo} (${prox.valor}/${prox.meta})` : "¡Los tienes todos!", href: "#/logros" }));
    }
    return grupo("con-icono progreso-inicio", filas);
  }
  // Solo en pantallas anchas: la semana a la vista, sin abrir la hoja de la racha.
  function tarjetaSemana(r) {
    if (!r) return null;
    const pr = r.protector;
    return h("button", { class: "tarjeta semana-inicio", onclick: verRacha, "aria-label": "Tu semana. Ver racha y objetivo diario" },
      h("span", { class: "semana-inicio-titulo" }, "Tu semana"),
      h("span", { class: "semana", "aria-hidden": "true" }, r.semana.map(x => h("span", { class: (x.hecho ? "hecho" : "") + (x.meta ? " cumplido" : "") + (x.hoy ? " hoy" : "") + (x.descanso ? " descanso" : "") },
        h("i", {}, x.hecho ? ico("check") : x.descanso ? ico("escudo") : null), x.hoy ? "Hoy" : x.letra))),
      pr ? h("span", { class: "semana-inicio-pie" }, ico("escudo"), pr.disponible ? "Protector de racha listo" : "Descanso de esta semana usado") : null);
  }

  function pintar() {
    const r = window.Animo ? window.Animo.racha() : null;
    const continuar = A.tarjetaContinuar();
    // El camino es la acción principal; con un test a medias manda «Continuar test» y, con el camino completo, «Estudiar hoy».
    const C = window.Camino, enCamino = !!(C && C.nodoActual && C.nodoActual(A.datos));
    const camino = tarjetaCamino(!continuar && enCamino);
    A.pantalla({ titulo: "Test permiso B" },
      saludo(r, !!continuar),
      tiraEstado(r),
      h("div", { class: "inicio" },
        h("div", { class: "inicio-principal" }, continuar || camino || tarjetaHoy(r, true), continuar ? camino : null,
          continuar ? filaHoy() : camino ? tarjetaHoy(r, false) : null, A.extrasInicio("arriba")),
        h("div", { class: "inicio-practica" }, cabecera("Más práctica"), masPractica()),
        h("aside", { class: "inicio-lado", "aria-label": "Tu progreso" }, tarjetaSemana(r), cabecera("Tu progreso"), bloqueProgreso())),
      A.extrasInicio("abajo"),
      h("p", { class: "nota-pie inicio-pie" }, `${A.PREGUNTAS.length} preguntas verificadas, cada una con su fuente oficial. `, h("a", { href: "#/fuentes" }, "Fuentes y aviso legal"),
        A.PREGUNTAS.length < 300 ? " El banco todavía es pequeño y no cubre todo el temario." : null));
  }

  window.Inicio = { pintar };
})();
