/* Demo del prototipo: una lección de prueba con los 8 ejercicios, o cada uno suelto.
   Imita el flujo de la práctica de la web: «Comprobar» abajo, franja verde o roja y «Continuar». */
(function () {
  "use strict";
  const { h, ico, TIPOS } = Ejercicios;
  const app = document.getElementById("app"), barra = document.getElementById("barra");
  const LISTA = window.EJERCICIOS;
  const sonar = (n, a) => window.Animo && Animo.sonar(n, a);
  let actual = null;

  function ponerBarra(contenido, fb) {
    barra.hidden = !contenido;
    barra.className = "barra-inferior" + (fb ? " feedback " + (fb.ok ? "ok" : "ko") : "");
    if (!contenido) return;
    barra.replaceChildren(h("div", {}, fb ? h("div", { class: "feedback-texto" },
      h("span", { class: "sello" }, ico(fb.ok ? "check" : "x")), h("div", {}, h("strong", {}, fb.titulo), fb.texto ? h("span", {}, fb.texto) : null)) : null, contenido));
    app.classList.add("con-barra"); app.classList.toggle("con-feedback", !!fb);
  }

  // ---------- Portada: los cuatro tipos con sus dos ejemplos ----------
  function portada() {
    if (actual) { actual.soltar(); actual = null; }
    ponerBarra(null); app.classList.remove("con-barra", "con-feedback");
    const grupos = Object.entries(TIPOS).map(([tipo, t]) => [
      h("h2", { class: "cabecera" }, t.nombre),
      h("div", { class: "grupo con-icono" }, LISTA.map((e, i) => e.tipo !== tipo ? null :
        h("button", { class: "fila", type: "button", onclick: () => leccion([i]) },
          h("span", { class: "tesela " + COLOR[tipo] }, ico(t.icono)),
          h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, e.enunciado)),
          h("span", { class: "chevron-txt", "aria-hidden": "true" }, "›")))),
    ]);
    app.replaceChildren(
      h("p", { class: "proto-aviso" }, "Prototipo · no cambia el camino real"),
      h("h1", { class: "titulo-grande" }, "Ejercicios nuevos"),
      h("p", { class: "subtitulo" }, "Para los niveles del camino: recordar sin ver opciones fija mejor. Los simulacros siguen siendo tipo test, como el examen."),
      h("div", { class: "pila" }, h("button", { class: "boton ancho verde", type: "button", onclick: () => leccion(mezcla()) }, "Probar una lección (8 al azar)")),
      h("p", { class: "nota-pie" }, `${LISTA.length} ejercicios: ${Object.entries(TIPOS).map(([t, x]) => `${LISTA.filter(e => e.tipo === t).length} de «${x.nombre.toLowerCase()}»`).join(", ")}.`),
      ...grupos.flat());
    window.scrollTo(0, 0);
  }
  // Lección de prueba: 2 de cada tipo al azar, intercalados.
  function mezcla() {
    const azar = l => l.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
    const porTipo = Object.keys(TIPOS).map(t => azar(LISTA.map((e, i) => e.tipo === t ? i : null).filter(i => i != null)).slice(0, 2));
    return [0, 1].flatMap(r => azar(porTipo.map(l => l[r]).filter(i => i != null)));
  }
  const COLOR = { cifra: "t-azul", tocar: "t-naranja", ordenar: "t-indigo", emparejar: "t-verde" };

  // ---------- Lección ----------
  function leccion(indices) {
    const res = [];
    let k = 0, anchoPrevio = 0;
    function paso() {
      if (actual) actual.soltar();
      if (k >= indices.length) return final(res, indices);
      const ej = LISTA[indices[k]], t = TIPOS[ej.tipo];
      const comprobar = h("button", { class: "boton ancho", type: "button", disabled: true, onclick: () => corregir(actual.comprobar()) }, "Comprobar");
      actual = Ejercicios.crear(ej, { cambio: listo => { comprobar.disabled = !listo; }, fin: r => corregir(r) });
      const ancho = indices.length > 1 ? (k / indices.length) * 100 : 0;
      const barraAvance = h("i", { style: `width:${anchoPrevio}%` });
      requestAnimationFrame(() => requestAnimationFrame(() => { barraAvance.style.width = ancho + "%"; }));
      anchoPrevio = ancho;
      const cuerpo = h("div", { class: "ej-cuerpo" }, actual.nodo);
      app.replaceChildren(
        h("div", { class: "leccion-cabeza" },
          h("button", { class: "cerrar", type: "button", "aria-label": "Salir", onclick: portada }, ico("cerrar")),
          h("div", { class: "progreso", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": indices.length, "aria-valuenow": k }, barraAvance)),
        h("p", { class: "tipo-chip t-" + ej.tipo }, ico(t.icono), t.nombre),
        h("p", { class: "enunciado" }, ej.enunciado),
        cuerpo);
      ponerBarra(actual.auto ? h("p", { class: "pista-emparejar" }, "Toca una casilla de cada columna") : comprobar);
      app.focus({ preventScroll: true }); window.scrollTo(0, 0);
      function corregir(r) {
        if (!r) return;
        res.push(r.ok);
        if (r.ok) sonar("acierto"); else if (r.fallos == null) { sonar("fallo"); if (window.Animo) Animo.vibrar(60); }
        const ex = Ejercicios.explicacion(ej, r);
        cuerpo.append(ex);
        const texto = r.ok ? null : r.fallos != null ? "Repasa las parejas abajo." : `Respuesta: ${r.correcta}`;
        const seguir = h("button", { class: "boton ancho " + (r.ok ? "verde" : "rojo"), type: "button", onclick: () => { k++; paso(); } }, "Continuar");
        ponerBarra(seguir, { ok: r.ok, titulo: r.ok ? elegir(["¡Correcto!", "¡Muy bien!", "¡Eso es!", "¡Perfecto!"]) : r.fallos != null ? "Casi" : "No es eso", texto });
        seguir.focus({ preventScroll: true });
        if (!r.ok) setTimeout(() => ex.scrollIntoView({ behavior: Ejercicios.sinMovimiento() ? "auto" : "smooth", block: "nearest" }), 250);
      }
    }
    paso();
  }
  const elegir = l => l[Math.floor(Math.random() * l.length)];

  function final(res, indices) {
    actual = null;
    if (indices.length === 1) return portada();
    const bien = res.filter(Boolean).length, todo = bien === res.length;
    app.replaceChildren(h("div", { class: "resultado " + (todo ? "apto" : "noapto") },
      h("div", { class: "simbolo" }, ico(todo ? "check" : "x")),
      h("h1", { class: "titulo-grande" }, todo ? "¡Lección perfecta!" : "Lección terminada"),
      h("p", { class: "subtitulo" }, `${bien} de ${res.length} ejercicios a la primera.`)),
      h("div", { class: "pila" },
        h("button", { class: "boton ancho", type: "button", onclick: () => leccion(indices) }, "Repetir"),
        h("button", { class: "boton ancho gris", type: "button", onclick: portada }, "Ver los ejercicios")));
    ponerBarra(null); app.classList.remove("con-barra", "con-feedback");
    setTimeout(() => { sonar(todo ? "aprobado" : "meta"); if (todo && window.Animo) Animo.confeti(); }, 150);
  }

  // #ej=<id> abre ese ejercicio suelto (para enlazarlo o probarlo).
  const directo = (location.hash.match(/^#ej=(.+)$/) || [])[1], k = directo ? LISTA.findIndex(e => e.id === decodeURIComponent(directo)) : -1;
  if (k >= 0) leccion([k]); else portada();
})();
