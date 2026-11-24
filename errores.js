// Aprender de los errores: el paso «¿Por qué?» tras un fallo y las mini lecciones de errores típicos.
// Contenido en data/errores.js (generado por tools/build_errores.py, con las citas comprobadas contra el BOE).
// Datos propios en la clave «errores» del progreso: { porque: {ok, total}, leidas: {grupo: ms} }.
(function () {
  const A = window.App, P = window.Progreso, E = window.ERRORES;
  if (!A || !P || !E) return;
  const { h, ico, fila, grupo, cabecera, cifras, pantalla, vacio, barajar, plural } = A;

  Object.assign(A.ICONOS, {
    bombilla: "M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z",
    diana: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM12 12.6v-.1",
  });

  // ---------- Datos ----------
  const num = v => Math.max(0, Math.floor(+v || 0));
  P.extender("errores", {
    normalizar(v) {
      v = v && typeof v === "object" ? v : {};
      const pq = v.porque && typeof v.porque === "object" ? v.porque : {};
      const leidas = {};
      for (const [k, ms] of Object.entries(v.leidas || {})) if (/^[a-z0-9_-]{1,40}$/.test(k) && +ms > 0) leidas[k] = +ms;
      const total = num(pq.total);
      return { porque: { ok: Math.min(num(pq.ok), total), total }, leidas };
    },
    // Los contadores solo crecen, así que el mayor de los dos es el más reciente.
    combinar(a, b) {
      const leidas = Object.assign({}, a.leidas);
      for (const [k, ms] of Object.entries(b.leidas)) leidas[k] = Math.max(leidas[k] || 0, ms);
      const pq = a.porque.total >= b.porque.total ? a.porque : b.porque;
      return { porque: { ok: pq.ok, total: pq.total }, leidas };
    },
  });
  const mis = () => A.datos.errores;

  // ---------- Grupos de errores típicos ----------
  const GRUPOS = E.lecciones.grupos;
  const GRUPO_DE_TEMA = new Map();
  for (const g of GRUPOS) for (const t of g.temas) GRUPO_DE_TEMA.set(t, g);
  const PREGUNTAS_DE = new Map(GRUPOS.map(g => [g.id, A.PREGUNTAS.filter(p => GRUPO_DE_TEMA.get(p.tema) === g)]));
  const reg = id => A.datos.preguntas[id] || {};
  function estadoGrupo(g) {
    const ps = PREGUNTAS_DE.get(g.id);
    const falladas = ps.filter(p => reg(p.id).ko > 0), pendientes = ps.filter(p => reg(p.id).c > 0);
    const fallos = falladas.reduce((s, p) => s + reg(p.id).ko, 0);
    return { ps, falladas, pendientes, fallos };
  }
  // Primero los grupos con más preguntas pendientes de repaso; después, los que más fallos acumulan.
  const ordenados = () => GRUPOS.map(g => ({ g, e: estadoGrupo(g) }))
    .sort((x, y) => (y.e.pendientes.length - x.e.pendientes.length) || (y.e.fallos - x.e.fallos));
  const nombreNorma = n => ({ RGC: "Reglamento General de Circulación", LSV: "Ley de Tráfico", CP: "Código Penal" })[n] || n;
  const textoArt = a => /^(anexo|disposici)/i.test(a) ? a : `art. ${a}`;

  function listaErrores() {
    const lista = ordenados(), conFallos = lista.filter(x => x.e.falladas.length);
    pantalla({ titulo: "Errores típicos", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Errores típicos"),
      h("p", { class: "subtitulo" }, "Tus fallos agrupados por la trampa en la que caen, con una mini lección de cada una. Todo sale del texto literal del BOE."),
      conFallos.length ? [cabecera("Donde más fallas"), grupo("con-icono", conFallos.map(filaGrupo))] :
        h("div", { class: "aviso" }, ico("info"), h("span", {}, "Aún no has fallado preguntas de estos temas. Cuando falles, aquí verás en qué trampas caes más.")),
      lista.length > conFallos.length ? [cabecera(conFallos.length ? "Otras trampas" : "Todas las trampas"), grupo("con-icono", lista.filter(x => !x.e.falladas.length).map(filaGrupo))] : null,
      mis().porque.total ? h("p", { class: "nota-pie" }, `En el paso «¿Por qué?» has elegido la norma correcta ${mis().porque.ok} de ${plural(mis().porque.total, "vez", "veces")}.`) : null);
  }
  function filaGrupo({ g, e }) {
    const leida = mis().leidas[g.id];
    return fila({ icono: e.pendientes.length ? "diana" : "bombilla", color: e.pendientes.length ? "naranja" : leida ? "verde" : "gris", titulo: g.titulo,
      detalle: e.falladas.length ? `${plural(e.falladas.length, "pregunta fallada", "preguntas falladas")}${e.pendientes.length ? ` · ${e.pendientes.length} por repasar` : ""}` : (leida ? "Lección leída" : g.trampa),
      insignia: e.pendientes.length || null, href: `#/errores/${g.id}` });
  }

  function leccion(id) {
    const g = GRUPOS.find(x => x.id === id);
    if (!g) { location.hash = "#/errores"; return; }
    const e = estadoGrupo(g), vuelta = `#/errores/${g.id}`;
    mis().leidas[g.id] = Date.now(); A.guardar();
    const practicar = (lista, titulo) => A.practicar(lista, "errores", titulo, vuelta);
    const repaso = e.pendientes.length ? e.pendientes : e.falladas;
    pantalla({ titulo: g.titulo, atras: { texto: "Errores típicos", href: "#/errores" },
      barra: [h("button", { class: "boton", onclick: () => practicar(barajar(repaso.length ? repaso : e.ps).slice(0, 10), g.titulo) },
        repaso.length ? `Repasar ${plural(Math.min(10, repaso.length), "fallo", "fallos")}` : "Practicar 10 preguntas")] },
      h("h1", { class: "titulo-grande" }, g.titulo),
      h("div", { class: "trampa" }, h("span", { class: "trampa-etiqueta" }, ico("diana"), "La trampa"), h("p", {}, g.trampa)),
      cifras([String(e.ps.length), "Preguntas"], [String(e.falladas.length), "Falladas"], [String(e.pendientes.length), "Por repasar"]),
      cabecera("Mini lección"),
      h("ol", { class: "leccion" }, g.puntos.map(pt => h("li", {},
        h("p", { class: "leccion-texto" }, pt.texto),
        h("details", { class: "leccion-cita" },
          h("summary", {}, ico("libro"), `${nombreNorma(pt.norma)}, ${textoArt(pt.articulo)}`),
          h("blockquote", { class: "cita" }, h("small", {}, "Texto literal del BOE"), `«${pt.cita}»`),
          h("a", { class: "enlace-boe", href: pt.url, target: "_blank", rel: "noopener" }, "Abrir en el BOE", ico("enlace")))))),
      repaso.length && e.ps.length > repaso.length ? grupo("con-icono", fila({ icono: "libro", color: "indigo", titulo: "Practicar todo el tema", detalle: plural(e.ps.length, "pregunta", "preguntas"),
        accion: () => practicar(barajar(e.ps).slice(0, 20), g.titulo) })) : null,
      h("p", { class: "nota-pie" }, `Texto consolidado del BOE, versión del ${A.fechaES(E.lecciones.version_consultada.RGC)}. Pulsa cada norma para ver la cita literal.`));
  }

  A.ruta("errores", partes => partes[0] ? leccion(partes[0]) : listaErrores());
  A.inicioExtra(() => {
    const top = ordenados().find(x => x.e.pendientes.length) || ordenados().find(x => x.e.falladas.length);
    return fila({ icono: "diana", color: "ambar", titulo: "Errores típicos", detalle: top ? `Tu trampa más frecuente: ${top.g.titulo.toLowerCase()}` : "Las trampas del examen, con mini lección", href: "#/errores" });
  }, "practicar");
  A.lateralExtra({ id: "errores", href: "#/errores", icono: "diana", color: "ambar", texto: "Errores típicos", cuenta: () => null });

  // ---------- «¿Por qué?» tras un fallo ----------
  // Las opciones son explicaciones de preguntas verificadas: la de esta pregunta y dos de otras del mismo
  // tema que se apoyan en otro artículo. Las tres son normas ciertas; solo una explica esta pregunta.
  const textoFuente = p => `${p.fuente.norma === "MANUAL_DGT" ? "Manual de la DGT" : p.fuente.norma === "RGC_CATALOGO" ? "Catálogo de señales" : nombreNorma(p.fuente.norma)}, ${textoArt(p.fuente.articulo)}`;
  A.alFallar(({ p, contenedor, continuar }) => {
    const ids = E.porques[p.id];
    const otras = ids && ids.map(id => A.POR_ID.get(id)).filter(Boolean);
    if (!otras || otras.length !== 2 || !p.explicacion) return false;
    const opciones = barajar([p, ...otras]);
    let elegida = null;
    const pintar = () => {
      const hecha = elegida != null, bien = elegida === p;
      contenedor.replaceChildren(h("div", { class: "porque" + (hecha ? (bien ? " bien" : " mal") : ""), role: "group", "aria-labelledby": "porque-titulo" },
        h("p", { class: "porque-titulo", id: "porque-titulo" }, ico(hecha ? (bien ? "check" : "info") : "bombilla"),
          hecha ? (bien ? "¡Eso es! Esa es la norma que se aplica." : "Esa norma es cierta, pero no es la que explica esta pregunta.") : "No es esa. Antes de ver la correcta: ¿qué norma se aplica aquí?"),
        h("ul", { class: "porque-opciones" }, opciones.map(o => {
          let cls = "porque-opcion";
          if (hecha) cls += o === p ? " correcta" : o === elegida ? " incorrecta" : " apagada";
          return h("li", {}, h("button", { class: cls, disabled: hecha, onclick: () => elegir(o) },
            h("span", { class: "texto" }, o.explicacion),
            hecha ? h("span", { class: "porque-fuente" }, textoFuente(o), o !== p ? " · habla de otra cosa" : "") : null));
        })),
        hecha ? h("button", { class: "boton ancho" + (bien ? " verde" : ""), onclick: continuar }, "Ver la solución")
          : h("button", { class: "boton plano", onclick: () => { contenedor.replaceChildren(); continuar(); } }, "No lo sé, ver la solución")));
    };
    const elegir = o => {
      if (elegida) return;
      elegida = o;
      const d = mis(); d.porque.total++; if (o === p) d.porque.ok++; A.guardar();
      A.sonar(o === p ? "acierto" : "fallo");
      pintar();
      const b = contenedor.querySelector(".boton"); if (b) b.focus({ preventScroll: true });
    };
    pintar();
    // Mientras se responde el «¿por qué?», la opción elegida se marca ya como fallada (sin revelar la correcta).
    requestAnimationFrame(() => {
      const raiz = contenedor.closest("#app") || document;
      for (const o of raiz.querySelectorAll(".opciones .opcion.elegida")) {
        o.classList.replace("elegida", "incorrecta");
        const est = o.querySelector(".estado"); if (est) est.replaceChildren(ico("x"));
      }
    });
    setTimeout(() => contenedor.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }), 60);
    return true;
  });
})();
