/* Prototipo «Ejercicios para recordar»: clasificar, cazar el error, «¿y si…?», pensar antes de ver y completar.
   Recordar.crear(ej, { cambio(listo), fin(resultado) }) devuelve { nodo, comprobar(), soltar(), auto }:
   - cambio(true|false): si ya se puede pulsar «Comprobar».
   - comprobar(): corrige, bloquea y devuelve { ok, correcta, ... }.
   - auto + fin(resultado): los tipos por pasos (clasificar, ysi) se corrigen solos y avisan al terminar.
   No depende de app.js; usa Animo (animo.js) para sonidos si está cargado. */
(function () {
  "use strict";
  const ICONOS = {
    check: "M5 12.5l4.5 4.5L19 7.5", x: "M6.5 6.5l11 11M17.5 6.5l-11 11", cerrar: "M6.5 6.5l11 11M17.5 6.5l-11 11",
    libro: "M4 5.5c2.7-1.3 5.5-1.1 8 .7 2.5-1.8 5.3-2 8-.7V19c-2.7-1.3-5.5-1.1-8 .7-2.5-1.8-5.3-2-8-.7zM12 6.2v13.5",
    enlace: "M14 5h5v5M19 5l-8 8M10 6.5H5.5v12h12V14",
    bombilla: "M9.5 18h5M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z",
    izq: "M14.5 5.5L8 12l6.5 6.5", der: "M9.5 5.5L16 12l-6.5 6.5",
    cartas: "M8 4.5h8A1.5 1.5 0 0117.5 6v12a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 18V6A1.5 1.5 0 018 4.5zM3 8v8M21 8v8",
    lupa: "M10.5 4a6.5 6.5 0 110 13 6.5 6.5 0 010-13zM15.5 15.5L20 20",
    ramas: "M4 12h5M9 12c4 0 3-6 10-6M9 12c4 0 3 6 10 6M16.5 3.5L19 6l-2.5 2.5M16.5 15.5L19 18l-2.5 2.5",
    pensar: "M12 4.5a7.5 6 0 00-6 9.6c.3.5.3 1.1.1 1.7L5.5 18l2.9-.8c.5-.1 1 0 1.5.2a7.5 6 0 102.1-12.9zM9 10.5h.1M12 10.5h.1M15 10.5h.1",
    huecos: "M4 7h16M4 12h4M16 12h4M9.5 14h5M4 17h16",
    vuelta: "M5 12a7 7 0 0112-4.9L19 9M19 4.5V9h-4.5M19 12a7 7 0 01-12 4.9L5 15M5 19.5V15h4.5",
  };
  function ico(nombre, clase) {
    const NS = "http://www.w3.org/2000/svg", s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "ico" + (clase ? " " + clase : "")); s.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", ICONOS[nombre]); s.append(p);
    return s;
  }
  function h(tag, attrs, ...hijos) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    for (const c of hijos.flat(Infinity)) if (c != null && c !== false) e.append(c.nodeType ? c : String(c));
    return e;
  }
  const sonar = (n, a) => window.Animo && Animo.sonar(n, a);
  const vibrar = p => window.Animo && Animo.vibrar && Animo.vibrar(p);
  const sinMovimiento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const espera = ms => (sinMovimiento() ? Math.min(ms, 500) : ms);
  function barajar(lista) {
    for (let n = 0; n < 20; n++) {
      const a = lista.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      if (a.length < 2 || a.some((x, i) => x !== lista[i])) return a;
    }
    return lista.slice().reverse();
  }
  function animar(el, clase) { el.classList.remove(clase); void el.offsetWidth; el.classList.add(clase); }
  const RAIZ = window.EJ_RAIZ != null ? window.EJ_RAIZ : "../../";
  const rutaImagen = src => (window.IMAGENES_EMBEBIDAS || {})[src] || RAIZ + src;
  const rutaSenal = s => (window.SENALES_EMBEBIDAS || {})[s] || `${RAIZ}img/senales/${s}.png`;

  const TIPOS = {
    clasificar: { nombre: "Clasifica", icono: "cartas", color: "t-naranja",
      porque: "Decidir caso a caso entre cosas que se confunden entrena lo que pide el examen: distinguir. Las cartas falladas vuelven al final." },
    error: { nombre: "Caza el error", icono: "lupa", color: "t-rojo",
      porque: "Buscar el fallo obliga a leer cada palabra, como en las preguntas trampa. Y lo que corriges por tu cuenta se queda más que lo que solo lees." },
    ysi: { nombre: "¿Y si…?", icono: "ramas", color: "t-indigo",
      porque: "El mismo caso con un solo detalle cambiado enseña qué detalle manda en la regla y cuál no cambia nada." },
    piensa: { nombre: "Piénsala antes", icono: "pensar", color: "t-azul",
      porque: "Sacar la respuesta de la memoria fija más que reconocerla entre opciones. Y los fallos cometidos con seguridad son los que mejor se corrigen." },
    completar: { nombre: "Completa la regla", icono: "huecos", color: "t-verde",
      porque: "Reconstruir la regla con sus palabras exactas obliga a producirla, no solo a leerla." },
  };

  // ---------- Clasificar: una carta cada vez, a uno de 2 o 3 cubos. Con 2 cubos también se desliza. ----------
  function clasificar(ej, op) {
    const cola = barajar(ej.cartas.map((_, i) => i)), veces = {}, dos = ej.cubos.length === 2;
    let fallos = 0, ocupado = false, terminado = false, arrastre = null, cartaNodo = null;
    const pila = h("div", { class: "cl-pila" });
    const cuenta = h("p", { class: "cl-cuenta", "aria-live": "polite" });
    const aviso = h("p", { class: "cl-aviso", role: "status" });
    const botones = ej.cubos.map((c, i) => h("button", { type: "button", class: "cl-cubo", onclick: () => elegir(i) },
      dos && i === 0 ? ico("izq") : null, h("span", {}, c.nombre), dos && i === 1 ? ico("der") : null));
    const cubos = h("div", { class: "cl-cubos n" + ej.cubos.length, role: "group", "aria-label": "Dónde va la carta" }, botones);
    const nodo = h("div", { class: "ej-clasificar" + (dos ? " dos" : "") }, cuenta, pila, aviso, cubos);

    function pintar() {
      aviso.textContent = dos ? "Desliza la carta o toca un botón" : "Toca dónde va";
      aviso.className = "cl-aviso";
      botones.forEach(b => { b.className = "cl-cubo"; b.disabled = false; });
      const quedan = cola.length;
      cuenta.textContent = quedan === 1 ? "Última carta" : `Quedan ${quedan} cartas`;
      const c = ej.cartas[cola[0]];
      cartaNodo = h("div", { class: "cl-carta entra" + (c.senal ? " con-senal" : "") + (veces[cola[0]] ? " repetida" : "") },
        veces[cola[0]] ? h("span", { class: "cl-vuelve" }, ico("vuelta"), "Otra vez") : null,
        c.senal ? h("img", { src: rutaSenal(c.senal), alt: "Señal de tráfico", draggable: "false" }) : h("span", { class: "cl-texto" }, c.texto));
      pila.replaceChildren(cola.length > 1 ? h("div", { class: "cl-carta detras", "aria-hidden": "true" }) : null, cartaNodo);
      if (dos) prepararArrastre(cartaNodo);
      ocupado = false;
    }
    function prepararArrastre(el) {
      el.addEventListener("pointerdown", e => {
        if (ocupado || (e.pointerType === "mouse" && e.button !== 0)) return;
        arrastre = { x: e.clientX, dx: 0 }; el.setPointerCapture(e.pointerId); el.classList.remove("entra"); el.classList.add("arrastrando");
      });
      el.addEventListener("pointermove", e => {
        if (!arrastre) return;
        arrastre.dx = e.clientX - arrastre.x;
        el.style.transform = `translateX(${arrastre.dx}px) rotate(${arrastre.dx / 22}deg)`;
        botones[0].classList.toggle("apunta", arrastre.dx < -40); botones[1].classList.toggle("apunta", arrastre.dx > 40);
      });
      const soltarCarta = () => {
        if (!arrastre) return;
        const dx = arrastre.dx; arrastre = null; el.classList.remove("arrastrando");
        botones.forEach(b => b.classList.remove("apunta"));
        if (Math.abs(dx) > 70) elegir(dx < 0 ? 0 : 1, true); else el.style.transform = "";
      };
      el.addEventListener("pointerup", soltarCarta); el.addEventListener("pointercancel", soltarCarta);
    }
    function elegir(n, arrastrada) {
      if (ocupado || terminado) return;
      ocupado = true;
      const i = cola.shift(), c = ej.cartas[i], bueno = ej.cubos.findIndex(q => q.id === c.cubo), ok = n === bueno;
      botones.forEach(b => (b.disabled = true));
      const hacia = dos ? (bueno === 0 ? -1 : 1) : bueno - 1;
      cartaNodo.style.setProperty("--hacia", hacia);
      if (ok) {
        sonar("acierto"); botones[n].classList.add("bien"); cartaNodo.style.transform = ""; cartaNodo.classList.add("bien", "sale");
        aviso.textContent = c.nombre || "";
        setTimeout(seguir, espera(c.nombre ? 900 : 520));
      } else {
        fallos++; veces[i] = (veces[i] || 0) + 1; if (veces[i] < 2) cola.push(i);
        sonar("fallo"); vibrar(60);
        botones[n].classList.add("mal"); botones[bueno].classList.add("bien");
        cartaNodo.style.transform = ""; animar(cartaNodo, "mal");
        aviso.textContent = (c.nombre ? c.nombre + ". " : "") + `Va en «${ej.cubos[bueno].nombre}»`; aviso.className = "cl-aviso mal";
        setTimeout(() => cartaNodo.classList.add("sale"), espera(1300));
        setTimeout(seguir, espera(1700));
      }
    }
    function seguir() { if (cola.length) pintar(); else acabar(); }
    function acabar() {
      terminado = true;
      nodo.replaceChildren(h("div", { class: "cl-resumen n" + ej.cubos.length }, ej.cubos.map(q =>
        h("section", { class: "cl-grupo" }, h("h3", {}, q.nombre), h("ul", {}, ej.cartas.map((c, i) => c.cubo !== q.id ? null :
          h("li", { class: veces[i] ? "fallada" : "" }, c.senal ? h("img", { src: rutaSenal(c.senal), alt: "" }) : null, h("span", {}, c.nombre || c.texto))))))));
      op.fin({ ok: fallos === 0, fallos, pasos: true });
    }
    const alTeclear = e => {
      if (e.metaKey || e.ctrlKey || e.altKey || terminado) return;
      const n = dos ? { ArrowLeft: 0, ArrowRight: 1 }[e.key] : { 1: 0, 2: 1, 3: 2 }[e.key];
      if (n != null && n < ej.cubos.length) { e.preventDefault(); elegir(n); }
    };
    document.addEventListener("keydown", alTeclear);
    pintar();
    return { nodo, auto: true, pista: dos ? "Clasifica las cartas una a una" : "Clasifica las señales una a una", soltar() { document.removeEventListener("keydown", alTeclear); } };
  }

  // ---------- Cazar el error: tocar el trozo falso de una frase y elegir cómo debería decir ----------
  function error(ej, op) {
    let fase = 1, fallos = 0, elegido = null;
    const guia = h("p", { class: "er-guia", "aria-live": "polite" }, "Toca la parte que está mal");
    const trozos = ej.trozos.map((t, i) => h("button", { type: "button", class: "er-trozo", onclick: () => tocar(i) }, t));
    const frase = h("div", { class: "er-frase tarjeta" }, ej.antes ? h("span", { class: "er-antes" }, ej.antes) : null, trozos.map(t => [t, " "]));
    const chips = ej.arreglos.map(a => h("button", { type: "button", class: "er-chip", "aria-pressed": "false", onclick: () => {
      if (fase !== 2) return;
      elegido = a; sonar("toque"); chips.forEach(c => c.setAttribute("aria-pressed", String(c === chip(a)))); animar(chip(a), "pulsada"); op.cambio(true);
    } }, a));
    const chip = a => chips[ej.arreglos.indexOf(a)];
    const arreglo = h("div", { class: "er-arreglo", hidden: true }, h("p", { class: "er-pregunta" }, "¿Qué debería decir?"), h("div", { class: "er-chips" }, chips));
    function tocar(i) {
      if (fase !== 1 || trozos[i].disabled) return;
      if (i === ej.malo) {
        fase = 2; sonar("acierto"); trozos.forEach(t => (t.disabled = true)); trozos[i].classList.add("cazado"); animar(trozos[i], "pulsada");
        guia.textContent = fallos ? "Ahí estaba. Ahora corrígelo" : "¡Cazado! Ahora corrígelo";
        arreglo.hidden = false;
        if (arreglo.getBoundingClientRect().bottom > innerHeight - 120) arreglo.scrollIntoView({ behavior: sinMovimiento() ? "auto" : "smooth", block: "center" });
      } else {
        fallos++; sonar("fallo"); vibrar(40); trozos[i].disabled = true; trozos[i].classList.add("cierto"); animar(trozos[i], "tiembla");
        guia.textContent = "Esa parte es verdad. Prueba con otra";
      }
    }
    op.cambio(false);
    return {
      nodo: h("div", { class: "ej-error" }, guia, frase, arreglo),
      comprobar() {
        fase = 3;
        const okChip = elegido === ej.bueno, t = trozos[ej.malo];
        chips.forEach(c => { c.disabled = true; c.setAttribute("aria-pressed", "false"); if (c === chip(ej.bueno)) c.classList.add("bien"); else if (c === chip(elegido)) c.classList.add("mal"); });
        const [antes, despues] = ej.trozos[ej.malo].split(ej.parte);
        t.replaceChildren(antes, h("s", {}, ej.parte), " ", h("strong", {}, ej.bueno), despues);
        t.classList.add("corregido");
        guia.textContent = "Así queda bien";
        return { ok: okChip && fallos === 0, fallos: okChip && fallos ? fallos : null, correcta: ej.bueno };
      },
      soltar() {},
    };
  }

  // ---------- ¿Y si…?: un caso que cambia de un detalle en un detalle; mismas opciones cada vez ----------
  function ysi(ej, op) {
    let k = 0, fallos = 0, ocupado = false;
    const valores = {};
    const filas = ej.caso.map(c => {
      const v = h("dd", {}, c.valor); valores[c.clave] = v;
      return h("div", { class: "ys-dato" }, h("dt", {}, c.clave), v);
    });
    const ficha = h("dl", { class: "ys-ficha tarjeta" }, filas);
    const pregunta = h("p", { class: "ys-pregunta", "aria-live": "polite" });
    const paso = h("p", { class: "ys-paso" });
    const botones = ej.opciones.map(o => h("button", { type: "button", class: "ys-opcion", onclick: () => responder(o) },
      h("strong", {}, o), ej.unidad ? h("small", {}, ej.unidad) : null));
    const opciones = h("div", { class: "ys-opciones n" + ej.opciones.length, role: "group", "aria-label": "Respuesta" }, botones);
    const historial = h("ol", { class: "ys-historial" });
    const nodo = h("div", { class: "ej-ysi" }, ficha, paso, pregunta, opciones, historial);
    function pintar() {
      const p = ej.pasos[k];
      paso.textContent = `Caso ${k + 1} de ${ej.pasos.length}`;
      pregunta.textContent = p.pregunta || "Empezamos por el caso normal";
      pregunta.classList.toggle("base", !p.pregunta);
      filas.forEach(f => f.classList.remove("cambia"));
      for (const [clave, valor] of Object.entries(p.cambios || {})) {
        if (valores[clave].textContent === valor) continue;
        valores[clave].textContent = valor; animar(valores[clave].parentNode, "cambia");
      }
      botones.forEach(b => { b.className = "ys-opcion"; b.disabled = false; });
      if (k) animar(pregunta, "entra");
      ocupado = false;
    }
    function responder(o) {
      if (ocupado) return;
      ocupado = true;
      const p = ej.pasos[k], ok = o === p.respuesta, b = botones[ej.opciones.indexOf(o)], buena = botones[ej.opciones.indexOf(p.respuesta)];
      botones.forEach(x => (x.disabled = true));
      buena.classList.add("bien"); if (!ok) { b.classList.add("mal"); fallos++; }
      sonar(ok ? "acierto" : "fallo"); if (!ok) vibrar(60);
      const fila = h("li", { class: ok ? "" : "fallada" }, h("span", {}, p.resumen), h("strong", {}, p.respuesta + (ej.unidad ? " " + ej.unidad : "")));
      historial.append(fila); historial.classList.add("con-filas");
      setTimeout(() => { k++; if (k < ej.pasos.length) pintar(); else acabar(); }, espera(ok ? 850 : 1700));
    }
    function acabar() {
      paso.remove(); pregunta.remove(); opciones.remove(); ficha.remove();
      nodo.classList.add("terminado");
      op.fin({ ok: fallos === 0, fallos, pasos: true });
    }
    const alTeclear = e => {
      if (e.metaKey || e.ctrlKey || e.altKey || !/^[1-9]$/.test(e.key)) return;
      const n = Number(e.key) - 1; if (n < ej.opciones.length && opciones.isConnected) { e.preventDefault(); responder(ej.opciones[n]); }
    };
    document.addEventListener("keydown", alTeclear);
    pintar();
    return { nodo, auto: true, pista: "Responde a cada cambio", soltar() { document.removeEventListener("keydown", alTeclear); } };
  }

  // ---------- Piénsala antes: opciones tapadas hasta decir cuánta seguridad se tiene ----------
  const SEGURIDAD = [{ id: "segura", texto: "La sé" }, { id: "duda", texto: "Creo que la sé" }, { id: "nada", texto: "No la sé" }];
  function piensa(ej, op) {
    let seguridad = null, elegida = null;
    const tapadas = h("div", { class: "pi-tapadas", "aria-hidden": "true" }, ej.opciones.map(() => h("div", { class: "pi-tapada" }, h("i", {}), h("b", {}))));
    const previo = h("div", { class: "pi-previo" },
      h("p", { class: "pi-guia" }, "Piensa la respuesta antes de ver las opciones."),
      h("div", { class: "pi-seguridad", role: "group", "aria-label": "¿La sabes?" }, SEGURIDAD.map(s =>
        h("button", { type: "button", class: "pi-nivel " + s.id, onclick: () => destapar(s) }, s.texto))));
    const botones = ej.opciones.map((o, i) => h("button", { type: "button", class: "opcion", onclick: () => {
      if (botones[i].disabled) return;
      elegida = i; sonar("toque"); botones.forEach((b, j) => b.classList.toggle("elegida", j === i)); animar(botones[i], "pulsada"); op.cambio(true);
    } }, h("span", { class: "letra" }, "abc"[i]), h("span", { class: "texto" }, o), h("span", { class: "estado" })));
    const opciones = h("div", { class: "opciones pi-opciones", hidden: true }, botones);
    const marca = h("p", { class: "pi-marca", hidden: true });
    const im = ej.imagen && ej.imagen.src ? h("figure", { class: "figura" }, h("img", { src: rutaImagen(ej.imagen.src), alt: ej.imagen.alt_detalle || ej.imagen.alt || "" })) : null;
    const nodo = h("div", { class: "ej-piensa" }, im, previo, tapadas, marca, opciones);
    function destapar(s) {
      seguridad = s.id; sonar("toque");
      previo.remove(); tapadas.remove();
      marca.textContent = `Has dicho: «${s.texto}»`; marca.className = "pi-marca " + s.id; marca.hidden = false;
      opciones.hidden = false; botones[0].focus({ preventScroll: true });
    }
    op.cambio(false);
    return {
      nodo, pista: "Primero, piénsala",
      comprobar() {
        const ok = elegida === ej.correcta;
        opciones.classList.add("recien");
        botones.forEach((b, i) => {
          b.disabled = true; b.classList.remove("elegida");
          if (i === ej.correcta) { b.classList.add("correcta"); b.querySelector(".estado").append(ico("check")); }
          else if (i === elegida) { b.classList.add("incorrecta"); b.querySelector(".estado").append(ico("x")); }
          else b.classList.add("apagada");
        });
        const nota = seguridad === "segura" ? (ok ? "La sabías y acertaste: esta ya está en su sitio." : "Ibas con seguridad y era otra. Estos fallos, bien corregidos, son los que menos se repiten: quédate un momento con el porqué.")
          : seguridad === "duda" ? (ok ? "Dudabas y era esa: la sabes mejor de lo que crees." : "Dudabas, y con razón. Volverá a salir pronto.")
          : (ok ? "Acertaste sin saberla: cuenta como repaso pendiente, volverá a salir." : "No la sabías: ahora ya la has visto. Volverá a salir pronto.");
        return { ok, tuya: elegida == null ? null : ej.opciones[elegida], correcta: ej.opciones[ej.correcta], nota, seguridad };
      },
      soltar() {},
    };
  }

  // ---------- Completar: huecos en la regla que se rellenan tocando fichas ----------
  function completar(ej, op) {
    const partes = ej.texto.split(/\{([^}]+)\}/), buenas = partes.filter((_, i) => i % 2);
    const puesto = buenas.map(() => null);
    let bloqueado = false;
    const huecos = buenas.map((_, n) => h("button", { type: "button", class: "co-hueco vacio", "aria-label": `Hueco ${n + 1}, vacío`, onclick: () => quitar(n) }));
    const frase = h("p", { class: "co-frase tarjeta" }, partes.map((p, i) => (i % 2 ? huecos[(i - 1) / 2] : p)));
    const fichas = barajar(buenas.concat(ej.senuelos)).map(t => h("button", { type: "button", class: "co-ficha", onclick: e => poner(t, e.currentTarget) }, t));
    const banco = h("div", { class: "co-banco", role: "group", "aria-label": "Fichas" }, fichas);
    function pintar() {
      huecos.forEach((hu, n) => {
        hu.textContent = puesto[n] ? puesto[n].texto : ""; hu.classList.toggle("vacio", !puesto[n]);
        hu.setAttribute("aria-label", `Hueco ${n + 1}: ${puesto[n] ? puesto[n].texto + ". Toca para quitarlo" : "vacío"}`);
      });
      const libre = puesto.indexOf(null);
      huecos.forEach((hu, n) => hu.classList.toggle("siguiente", n === libre));
      op.cambio(libre === -1);
    }
    function poner(texto, ficha) {
      const n = puesto.indexOf(null);
      if (bloqueado || n === -1 || ficha.classList.contains("usada")) return;
      puesto[n] = { texto, ficha }; ficha.classList.add("usada"); ficha.setAttribute("aria-disabled", "true");
      sonar("toque"); pintar(); animar(huecos[n], "pulsada");
    }
    function quitar(n) {
      if (bloqueado || !puesto[n]) return;
      puesto[n].ficha.classList.remove("usada"); puesto[n].ficha.removeAttribute("aria-disabled"); puesto[n] = null; sonar("toque"); pintar();
    }
    pintar();
    return {
      nodo: h("div", { class: "ej-completar" }, frase, banco),
      comprobar() {
        bloqueado = true; let ok = true;
        huecos.forEach((hu, n) => {
          const bien = puesto[n].texto === buenas[n]; ok = ok && bien; hu.disabled = true; hu.classList.remove("siguiente");
          hu.classList.add(bien ? "bien" : "mal");
          if (!bien) hu.replaceChildren(h("s", {}, puesto[n].texto), " ", h("strong", {}, buenas[n]));
        });
        fichas.forEach(f => (f.disabled = true)); banco.classList.add("apagado");
        return { ok, correcta: buenas.join(" · ") };
      },
      soltar() {},
    };
  }

  const CREAR = { clasificar, error, ysi, piensa, completar };
  const NORMA = { RGC: "Reglamento General de Circulación", RGC_CATALOGO: "Reglamento General de Circulación", LSV: "Ley de Tráfico", MANUAL_DGT: "Manual de la DGT",
    RGCOND: "Reglamento General de Conductores", RGV: "Reglamento General de Vehículos", CP: "Código Penal", ITV: "Reglamento de ITV",
    LRCSCVM: "Ley del seguro obligatorio", OCURSOS: "Orden de cursos de recuperación de puntos", RSO: "Reglamento del seguro obligatorio" };

  // Explicación corta como la de la web: veredicto, porqué, truco y enlace a la referencia (sin cita larga).
  function explicacion(ej, r) {
    const f = ej.fuente;
    const ref = `${NORMA[f.norma] || f.norma}, ${/^(anexo|tema)/i.test(f.articulo) ? f.articulo : "art. " + f.articulo}`;
    const veredicto = r.ok ? "Correcto" : r.fallos ? `Hecho, con ${r.fallos === 1 ? "1 fallo" : r.fallos + " fallos"}` : "Incorrecto";
    return h("div", { class: "explicacion animada" + (r.ok ? "" : " mal"), role: "status" },
      h("p", { class: "veredicto" }, ico(r.ok ? "check" : "x"), veredicto),
      h("div", { class: "explicacion-cuerpo" },
        r.nota ? h("p", { class: "nota-seguridad" }, r.nota) : null,
        h("p", { class: "lec-porque" }, ej.porque),
        ej.truco ? h("p", { class: "lec-truco" }, ico("bombilla"), h("span", {}, ej.truco)) : null),
      h("a", { class: "fila", href: f.url, target: "_blank", rel: "noopener" }, ico("libro"),
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, ref)), ico("enlace", "chevron")));
  }

  window.Recordar = { crear: (ej, op) => CREAR[ej.tipo](ej, op), explicacion, TIPOS, ico, h, sinMovimiento };
  // Si está cargado el motor común (prototipos/ejercicios/ejercicios.js), los cinco tipos se registran en él.
  if (window.Ejercicios && Ejercicios.registrar)
    for (const [tipo, d] of Object.entries(TIPOS))
      Ejercicios.registrar(tipo, { nombre: d.nombre, icono: ICONOS[d.icono], crear: CREAR[tipo] });
})();
