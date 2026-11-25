/* Compañero de estudio: compartir el avance con alguien de confianza y recibir sus ánimos.
   - Quien estudia decide compartir: añade el correo de su compañero y puede dejar de hacerlo cuando
     quiera. Mientras comparte, la web publica un RESUMEN (no el progreso completo) en
     compartidos/{su uid}: preguntas vistas y dominadas, racha, dominio por materia, preparación y
     últimos exámenes. Nunca sus respuestas, sus fallos concretos ni sus preguntas dudosas.
   - El compañero solo puede leer ese resumen y mandar mensajes de ánimo (colección animos).
     Las reglas de firestore.rules impiden que escriba nada en el progreso de quien estudia.
   Necesita la nube (nube.js, sesión iniciada con una cuenta permitida) y los ganchos de app.js
   (window.App). Pantalla: #/companero. */
(function () {
  "use strict";
  const P = window.Progreso, A = window.App;
  if (!P || !A || !window.Nube) return;
  const { h, ico, fila, grupo, cabecera, pantalla, hoja } = A;
  const DIA = 86400000, MAX_COMPANEROS = 5, MAX_TEXTO = 300;
  const PUBLICAR_CADA = 30000;   // ms mínimos entre dos subidas del resumen
  const REFRESCAR_CADA = 60000;  // ms mínimos entre dos lecturas al volver a la web
  const FRASES = ["¡Vas genial, sigue así!", "Estoy orgulloso de ti 💪", "¡Un día más de racha! 🔥", "Tú puedes con el examen", "Hoy toca repasar un poco, ¡ánimo!"];

  // compartido: mi documento compartidos/{uid} (null si no comparto; undefined mientras no se sabe).
  // conmigo: resúmenes que otras personas comparten conmigo. recibidos / enviados: ánimos.
  const est = { compartido: undefined, conmigo: [], recibidos: [], enviados: {}, error: null, cargando: false };
  let uidCargado = null, cargaActual = null, ultimaLectura = 0, ultimaPublicacion = 0, publicado = "", tPublicar = null;

  const conexion = () => window.Nube.conexion();
  const correoValido = c => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
  const ms = t => t && typeof t.toMillis === "function" ? t.toMillis() : 0;
  const primerNombre = u => (u.displayName || "").trim().split(/\s+/)[0].slice(0, 60) || (u.email || "").split("@")[0].slice(0, 60);
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const claveDia = t => P.claveDia(t);
  function haceDias(n) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - n); return d.getTime(); }
  function mensajeError(e) {
    const c = (e && e.code) || "";
    if (c === "unavailable" || navigator.onLine === false) return "Sin conexión. Vuelve a intentarlo cuando tengas internet.";
    if (c === "permission-denied") return "La nube no lo ha permitido.";
    if (c === "companeros-maximo") return "Ya tienes 5 compañeros. Deja de compartir con alguno para añadir otro.";
    return "No se ha podido conectar con la nube.";
  }
  // Repinta la portada o esta pantalla, sin interrumpir un examen ni una hoja abierta.
  function repintar() {
    const s = (location.hash || "#/").slice(2).split("/")[0] || "inicio";
    if (A.sesion || document.querySelector("dialog[open]")) return;
    if (s === "companero" || s === "inicio") { const y = window.scrollY; A.repintar(); window.scrollTo(0, y); }
  }

  const banco = () => ({ todas: A.TODAS, porMateria: A.POR_MATERIA });
  // Iconos propios (trazo como los de app.js).
  A.ICONOS.corazon = "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z";
  A.ICONOS.mas = "M12 5v14M5 12h14";

  // ---------- Resumen que se comparte ----------
  // Solo cifras agregadas: nada de qué preguntas ha fallado ni de sus notas.
  function construirResumen() {
    const d = A.datos, { todas, porMateria } = banco();
    const prep = P.preparacion(d, todas, porMateria);
    const dias = {};
    for (let i = 0; i < 14; i++) { const k = claveDia(haceDias(i)), x = d.dias[k]; if (x && x.r) dias[k] = x.r; }
    const ultimoDia = Object.keys(d.dias).filter(k => d.dias[k].r > 0).sort().pop() || null;
    const materias = {};
    for (const [n, r] of Object.entries(prep.materias)) materias[n] = [r.dominada, r.vista, r.repaso, r.total];
    const plan = d.plan && typeof d.plan === "object" ? d.plan : null;
    return {
      total: prep.global.total, vistas: prep.global.vistas, dominadas: prep.global.dominada,
      avance: Math.round(prep.avance * 1000) / 1000, lista: prep.lista,
      criterios: prep.criterios.map(c => ({ id: c.id, cumple: !!c.cumple, avance: Math.round(c.avance * 1000) / 1000 })),
      racha: P.racha(d), ultimoDia, dias,
      objetivo: window.Animo ? window.Animo.racha().objetivo : null,
      materias,
      examenes: d.historial.slice(-10).map(r => ({ fecha: r.fecha, fallos: r.fallos, total: r.total, apto: !!r.apto, tipo: r.tipo || null })),
      examen: plan && /^\d{4}-\d\d-\d\d$/.test(plan.examen || "") ? plan.examen : null,
    };
  }
  async function cambiarCompanero(correo, agregar) {
    const c = conexion();
    if (!c) throw Object.assign(new Error("sin sesión"), { code: "unauthenticated" });
    const ref = c.fb.doc(c.db, "compartidos", c.usuario.uid);
    const texto = window.Nube.canonico(construirResumen()), nombre = primerNombre(c.usuario);
    const companeros = await c.fb.runTransaction(c.db, async tx => {
      const anterior = await tx.get(ref);
      const actuales = anterior.exists() ? anterior.data().companeros : [];
      const nuevos = agregar ? Array.from(new Set([...actuales, correo])) : actuales.filter(x => x !== correo);
      if (nuevos.length > MAX_COMPANEROS) throw Object.assign(new Error("límite de compañeros"), { code: "companeros-maximo" });
      if (nuevos.length) {
        tx.set(ref, { v: 1, nombre, companeros: nuevos, resumen: texto, actualizado: c.fb.serverTimestamp() });
      } else if (anterior.exists()) {
        tx.delete(ref);
      }
      return nuevos;
    });
    if (conexion()?.usuario.uid !== c.usuario.uid) return;
    if (!companeros.length) {
      est.compartido = null; publicado = "";
      return;
    }
    est.compartido = { nombre, companeros, actualizado: Date.now() };
    publicado = texto; ultimaPublicacion = Date.now();
  }
  // Tras cada guardado en la nube, si comparte y el resumen ha cambiado, lo sube (como mucho cada 30 s).
  function programarPublicacion() {
    if (!est.compartido || tPublicar) return;
    const espera = Math.max(0, ultimaPublicacion + PUBLICAR_CADA - Date.now());
    tPublicar = setTimeout(async () => {
      tPublicar = null;
      const c = conexion(), compartido = est.compartido;
      if (!c || !compartido) return;
      const resumen = window.Nube.canonico(construirResumen());
      if (resumen === publicado) return;
      const ref = c.fb.doc(c.db, "compartidos", c.usuario.uid);
      try {
        // Actualiza solo el resumen para respetar los permisos que se cambien en otro dispositivo.
        await c.fb.updateDoc(ref, { resumen, actualizado: c.fb.serverTimestamp() });
        if (conexion()?.usuario.uid !== c.usuario.uid || est.compartido !== compartido) return;
        ultimaPublicacion = Date.now();
        compartido.actualizado = ultimaPublicacion;
        publicado = resumen;
      } catch (e) {
        if (e?.code === "not-found" && conexion()?.usuario.uid === c.usuario.uid && est.compartido === compartido) {
          est.compartido = null; publicado = "";
          repintar();
        }
      }
    }, espera);
  }

  // ---------- Lectura ----------
  async function cargar(forzar) {
    const c = conexion();
    if (!c) return;
    if (!forzar && uidCargado === c.usuario.uid && Date.now() - ultimaLectura < REFRESCAR_CADA) return;
    if (est.cargando) return;
    const carga = Symbol();
    cargaActual = carga;
    est.cargando = true; ultimaLectura = Date.now();
    const { fb, db, usuario: u } = c, correo = (u.email || "").toLowerCase();
    try {
      const [mio, conmigo, recibidos] = await Promise.all([
        fb.getDoc(fb.doc(db, "compartidos", u.uid)),
        fb.getDocs(fb.query(fb.collection(db, "compartidos"), fb.where("companeros", "array-contains", correo))),
        fb.getDocs(fb.query(fb.collection(db, "animos"), fb.where("para", "==", u.uid))),
      ]);
      if (cargaActual !== carga || conexion()?.usuario.uid !== u.uid) return;
      const resumenes = conmigo.docs.map(s => {
        const d = s.data(); let r = null;
        try { r = JSON.parse(d.resumen); } catch (e) { r = null; }
        return { uid: s.id, nombre: String(d.nombre || "Tu compañera").slice(0, 60), resumen: r && typeof r === "object" ? r : null, actualizado: ms(d.actualizado) };
      }).sort((a, b) => a.nombre.localeCompare(b.nombre));
      // Lo que he mandado a cada persona que comparte conmigo (para ver si lo ha leído).
      const enviados = await Promise.all(resumenes.map(p => fb.getDocs(fb.query(fb.collection(db, "animos"), fb.where("de", "==", u.uid), fb.where("para", "==", p.uid)))));
      if (cargaActual !== carga || conexion()?.usuario.uid !== u.uid) return;
      const d = mio.exists() ? mio.data() : null;
      est.compartido = d ? { nombre: d.nombre, companeros: Array.isArray(d.companeros) ? d.companeros : [], actualizado: ms(d.actualizado) } : null;
      publicado = String(d?.resumen || "");
      est.conmigo = resumenes;
      est.recibidos = recibidos.docs.map(s => leerAnimo(s)).sort((a, b) => b.creado - a.creado);
      est.enviados = {};
      est.conmigo.forEach((p, i) => { est.enviados[p.uid] = enviados[i].docs.map(s => leerAnimo(s)).sort((a, b) => b.creado - a.creado); });
      uidCargado = u.uid; est.error = null;
      if (est.compartido) programarPublicacion();
    } catch (e) {
      if (cargaActual === carga) est.error = mensajeError(e);
    } finally {
      if (cargaActual === carga) {
        est.cargando = false;
        repintar();
        avisarNuevos();
      }
    }
  }
  function leerAnimo(s) {
    const d = s.data();
    return { id: s.id, de: d.de, deNombre: String(d.deNombre || "Tu compañero").slice(0, 60), deCorreo: String(d.deCorreo || "").slice(0, 254), para: d.para, texto: String(d.texto || "").slice(0, MAX_TEXTO), creado: ms(d.creado), leido: !!d.leido };
  }

  // Al iniciar sesión (primer guardado correcto), al cerrarla y tras cada guardado.
  let ultimaVista = null, uidVisto = null, firma = "";
  window.addEventListener("nube-estado", () => {
    const c = conexion(), uid = c ? c.usuario.uid : null, n = window.Nube.estado;
    const f = [n.disponible, n.usuario && n.usuario.correo, n.error, !!c].join("|");
    if (f !== firma) { firma = f; if (((location.hash || "").split("/")[1] || "") === "companero") repintar(); }
    if (uid !== uidVisto) {
      uidVisto = uid;
      Object.assign(est, { compartido: undefined, conmigo: [], recibidos: [], enviados: {}, error: null, cargando: false });
      uidCargado = null; cargaActual = null; publicado = ""; clearTimeout(tPublicar); tPublicar = null;
      if (uid) cargar(true); else repintar();
      return;
    }
    const ultima = window.Nube.estado.ultima;
    if (uid && ultima && ultima !== ultimaVista) { ultimaVista = ultima; programarPublicacion(); }
  });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") cargar(false); });

  // ---------- Acciones de quien estudia ----------
  function invitar() {
    const c = conexion();
    if (!c) return;
    const actuales = (est.compartido && est.compartido.companeros) || [];
    if (actuales.length >= MAX_COMPANEROS) return hoja({ titulo: "Ya tienes 5 compañeros", mensaje: "Deja de compartir con alguno para añadir otro.", cancelar: "Aceptar" });
    const propio = (c.usuario.email || "").toLowerCase();
    const campo = h("input", { type: "email", class: "campo", inputmode: "email", autocomplete: "email", autocapitalize: "off", spellcheck: "false", placeholder: "correo@example.com", "aria-label": "Correo de tu compañero" });
    const aviso = h("p", { class: "nota-pie", role: "status" });
    const d = hoja({ titulo: "Compartir mi progreso",
      mensaje: "Escribe el correo de la cuenta de Google de la persona que quieres que vea tu avance.",
      contenido: h("div", {}, campo, aviso, queSeComparte()),
      acciones: [], cancelar: null });
    const boton = h("button", { class: "boton ancho verde", onclick: async () => {
      const correo = campo.value.trim().toLowerCase();
      if (!correoValido(correo)) { aviso.textContent = "Escribe un correo válido."; campo.focus(); return; }
      if (correo === propio) { aviso.textContent = "Ese es tu propio correo."; return; }
      if (actuales.includes(correo)) { aviso.textContent = "Ya compartes tu progreso con esa cuenta."; return; }
      boton.disabled = true; aviso.textContent = "Compartiendo…";
      try {
        await cambiarCompanero(correo, true);
        d.close();
        if (window.Animo) { window.Animo.sonar("acierto"); window.Animo.aviso("Progreso compartido", "meta"); }
        repintar();
      } catch (e) { boton.disabled = false; aviso.textContent = mensajeError(e); }
    } }, "Compartir");
    d.querySelector(".pila").prepend(boton, h("button", { class: "boton ancho plano", onclick: () => d.close() }, "Cancelar"));
    setTimeout(() => campo.focus(), 50);
  }
  function queSeComparte() {
    return h("div", { class: "comparte" },
      h("p", {}, h("strong", {}, "Verá: "), "preguntas vistas y dominadas, racha, actividad semanal, objetivo diario, dominio por materia, preparación y últimos exámenes. Si has indicado la fecha del examen, también la verá."),
      h("p", {}, h("strong", {}, "No verá: "), "qué respondes en cada pregunta, tus fallos concretos ni tus preguntas dudosas. No podrá cambiar nada de tu progreso."),
      h("p", {}, "Podrá mandarte mensajes de ánimo. Puedes dejar de compartir cuando quieras."));
  }
  function dejarDeCompartir(correo) {
    hoja({ titulo: "¿Dejar de compartir?", mensaje: `${correo} dejará de ver tu progreso y no podrá mandarte más ánimos. Los mensajes que ya te ha mandado se quedan.`,
      acciones: [{ texto: "Dejar de compartir", clase: "gris destructivo", accion: async () => {
        try { await cambiarCompanero(correo, false); repintar(); }
        catch (e) { hoja({ titulo: "No se ha podido cambiar", mensaje: mensajeError(e), cancelar: "Aceptar" }); }
      } }] });
  }
  async function marcarLeido(a) {
    const c = conexion();
    if (!c || a.leido) return;
    a.leido = true; repintar();
    try { await c.fb.updateDoc(c.fb.doc(c.db, "animos", a.id), { leido: true }); }
    catch (e) { a.leido = false; repintar(); }
  }
  function borrarAnimo(a) {
    hoja({ titulo: "¿Borrar este mensaje?", acciones: [{ texto: "Borrar", clase: "gris destructivo", accion: async () => {
      const c = conexion(); if (!c) return;
      try {
        await c.fb.deleteDoc(c.fb.doc(c.db, "animos", a.id));
        est.recibidos = est.recibidos.filter(x => x.id !== a.id);
        for (const k of Object.keys(est.enviados)) est.enviados[k] = est.enviados[k].filter(x => x.id !== a.id);
        repintar();
      } catch (e) { hoja({ titulo: "No se ha podido borrar", mensaje: mensajeError(e), cancelar: "Aceptar" }); }
    } }] });
  }

  // ---------- Acciones del compañero ----------
  function escribirAnimo(p) {
    const c = conexion();
    if (!c) return;
    const t = h("textarea", { maxlength: String(MAX_TEXTO), placeholder: `Escribe algo bonito para ${p.nombre}`, "aria-label": "Mensaje de ánimo" });
    const aviso = h("p", { class: "nota-pie", role: "status" });
    const rapidas = h("div", { class: "frases-rapidas" }, FRASES.map(f => h("button", { type: "button", class: "chip", onclick: () => { t.value = f; t.focus(); } }, f)));
    const d = hoja({ titulo: `Ánimos para ${p.nombre}`, contenido: h("div", {}, rapidas, t, aviso), acciones: [], cancelar: null });
    const boton = h("button", { class: "boton ancho verde", onclick: async () => {
      const texto = t.value.trim().slice(0, MAX_TEXTO);
      if (!texto) { aviso.textContent = "Escribe un mensaje."; t.focus(); return; }
      boton.disabled = true; aviso.textContent = "Enviando…";
      try {
        const ref = await c.fb.addDoc(c.fb.collection(c.db, "animos"), { de: c.usuario.uid, deNombre: primerNombre(c.usuario), deCorreo: (c.usuario.email || "").toLowerCase(), para: p.uid, texto, creado: c.fb.serverTimestamp(), leido: false });
        (est.enviados[p.uid] = est.enviados[p.uid] || []).unshift({ id: ref.id, de: c.usuario.uid, para: p.uid, texto, creado: Date.now(), leido: false });
        d.close();
        if (window.Animo) { window.Animo.sonar("acierto"); window.Animo.aviso("¡Ánimos enviados!", "meta"); }
        repintar();
      } catch (e) {
        boton.disabled = false;
        aviso.textContent = e && e.code === "permission-denied" ? `${p.nombre} ya no comparte su progreso contigo.` : mensajeError(e);
      }
    } }, "Enviar");
    d.querySelector(".pila").prepend(boton, h("button", { class: "boton ancho plano", onclick: () => d.close() }, "Cancelar"));
  }

  // ---------- Pintado ----------
  const fechaHora = t => t ? new Date(t).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
  const fechaES = iso => { if (!iso) return ""; const [y, m, d] = iso.slice(0, 10).split("-"); return [d, m, y].filter(Boolean).join("/"); };
  function hace(t) {
    if (!t) return "";
    const min = Math.round((Date.now() - t) / 60000);
    if (min < 2) return "ahora mismo"; if (min < 60) return `hace ${min} min`;
    const horas = Math.round(min / 60); if (horas < 24) return `hace ${plural(horas, "hora", "horas")}`;
    return `el ${fechaHora(t)}`;
  }
  // Racha vista por el compañero: solo sigue viva si estudió hoy o ayer (en su hora local).
  function rachaViva(r) {
    if (!r.ultimoDia) return 0;
    return r.ultimoDia >= claveDia(haceDias(1)) ? (r.racha || 0) : 0;
  }
  function diasAlExamen(fecha) {
    if (!fecha) return null;
    const [y, m, d] = fecha.split("-").map(Number), obj = new Date(y, m - 1, d), hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    return Math.round((obj - hoy) / DIA);
  }
  const TEXTO_CRITERIO = { examenes: `Aprobar ${P.CRITERIOS.examenes} exámenes finales seguidos`, dominio: `Dominar el ${Math.round(P.CRITERIOS.dominioGlobal * 100)} % de las preguntas`,
    materias: `Ninguna materia por debajo del ${Math.round(P.CRITERIOS.dominioMateria * 100)} %`, repaso: "Tener al día el repaso de fallos" };

  function tarjetaAnimo(a) {
    return h("section", { class: "tarjeta animo-recibido", "aria-label": `Mensaje de ánimo de ${a.deNombre}` },
      h("div", { class: "animo-cabecera" }, h("span", { class: "tesela t-rojo" }, ico("corazon")), h("span", {}, h("strong", {}, a.deNombre), " te manda ánimos", a.deCorreo ? h("span", { class: "animo-correo" }, a.deCorreo) : null), h("span", { class: "animo-fecha" }, hace(a.creado))),
      h("p", { class: "animo-texto" }, a.texto),
      a.leido ? null : h("button", { class: "boton verde", onclick: () => { if (window.Animo) { window.Animo.sonar("meta"); window.Animo.confeti(60); } marcarLeido(a); } }, "¡Gracias!"));
  }

  // Ánimos sin leer: lo primero de la portada, bajo el saludo, para que se vean nada más abrir.
  function bloqueAnimos() {
    if (!conexion()) return null;
    const nuevos = est.recibidos.filter(a => !a.leido);
    return nuevos.length ? h("div", { class: "bloque-companero animos-destacados" }, nuevos.slice(0, 3).map(tarjetaAnimo)) : null;
  }
  // Aviso al llegar un ánimo nuevo (una vez por mensaje y dispositivo), si está en la portada.
  const AVISADOS = "testB.animosAvisados";
  function avisarNuevos() {
    const nuevos = est.recibidos.filter(a => !a.leido);
    if (!nuevos.length || !window.Animo) return;
    let vistos = [];
    try { vistos = JSON.parse(localStorage.getItem(AVISADOS)) || []; } catch (e) { vistos = []; }
    const sinAvisar = nuevos.filter(a => !vistos.includes(a.id));
    if (!sinAvisar.length) return;
    const s = (location.hash || "#/").slice(2).split("/")[0] || "inicio";
    if (s !== "inicio" || A.sesion) return; // se avisará cuando vuelva a la portada
    try { localStorage.setItem(AVISADOS, JSON.stringify(nuevos.map(a => a.id).concat(vistos).slice(0, 50))); } catch (e) { /* sin almacenamiento */ }
    const de = [...new Set(sinAvisar.map(a => a.deNombre))];
    window.Animo.sonar("meta"); window.Animo.vibrar(40);
    window.Animo.aviso(de.length === 1 ? `💌 ${de[0]} te manda ánimos` : "💌 Tienes ánimos nuevos", "meta");
  }
  // Bloque para la portada: acceso al progreso que otros comparten contigo.
  function bloqueInicio() {
    if (!conexion()) return null;
    const partes = [];
    if (est.conmigo.length) partes.push(grupo("con-icono", est.conmigo.map(p => {
      const r = p.resumen || {};
      return fila({ icono: "corazon", color: "rojo", titulo: `Progreso de ${p.nombre}`,
        detalle: `${Math.round((r.avance || 0) * 100)} % preparada · ${plural(rachaViva(r), "día", "días")} de racha · ${hace(p.actualizado)}`, href: `#/companero/${p.uid}` });
    })));
    return partes.length ? h("div", { class: "bloque-companero" }, partes) : null;
  }

  function pantallaCompanero(partes) {
    if (partes && partes[0]) return vistaPersona(partes[0]);
    const c = conexion(), n = window.Nube.estado;
    if (!c) {
      return pantalla({ titulo: "Compañero de estudio", atras: { texto: "Inicio", href: "#/" } },
        h("h1", { class: "titulo-grande" }, "Compañero de estudio"),
        h("p", { class: "subtitulo" }, "Comparte tu avance con alguien de confianza para que te vea progresar y te mande ánimos."),
        n.disponible
          ? [grupo("con-icono", fila({ icono: "nube", color: "azul", titulo: n.usuario ? "Conectando con la nube…" : "Iniciar sesión con Google", detalle: "Hace falta la nube para compartir o ver un progreso", accion: n.usuario ? null : () => window.Nube.entrar() })),
             n.error ? h("p", { class: "nota-pie", role: "status" }, n.error) : null]
          : h("p", { class: "nota-pie" }, "Esta opción solo está disponible en la web con guardado en la nube."));
    }
    const comp = (est.compartido && est.compartido.companeros) || [];
    const recibidos = est.recibidos.slice(0, 30);
    pantalla({ titulo: "Compañero de estudio", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Compañero de estudio"),
      h("p", { class: "subtitulo" }, "Comparte tu avance con alguien de confianza para que te vea progresar y te mande ánimos."),
      est.error ? h("p", { class: "nota-pie", role: "status" }, est.error) : null,
      est.conmigo.length ? [cabecera("Compartido contigo"), grupo("con-icono", est.conmigo.map(p => fila({ icono: "corazon", color: "rojo", titulo: p.nombre,
        detalle: `Actualizado ${hace(p.actualizado)}`, href: `#/companero/${p.uid}` })))] : null,
      cabecera("Compartir mi progreso"),
      est.compartido === undefined ? h("p", { class: "nota-pie" }, "Cargando…")
        : grupo("con-icono",
          comp.map(correo => fila({ icono: "check", color: "verde", titulo: correo, detalle: "Ve tu progreso · toca para dejar de compartir", accion: () => dejarDeCompartir(correo), chevron: false })),
          comp.length < MAX_COMPANEROS ? fila({ icono: "mas", color: "azul", titulo: comp.length ? "Añadir otro compañero" : "Invitar a un compañero", detalle: "Elige tú con quién compartes", accion: invitar }) : null),
      comp.length ? h("p", { class: "nota-pie" }, `Se actualiza solo cuando estudias. Última actualización: ${hace(est.compartido.actualizado)}.`) : queSeComparte(),
      recibidos.length ? [cabecera("Ánimos recibidos"), recibidos.map(a => h("div", { class: "animo-fila" }, tarjetaAnimo(a),
        h("button", { class: "boton plano destructivo", onclick: () => borrarAnimo(a) }, "Borrar")))] : null);
    recibidos.filter(a => !a.leido).forEach(marcarLeido);
  }

  function vistaPersona(uid) {
    const p = est.conmigo.find(x => x.uid === uid);
    if (!p) {
      if (conexion() && uidCargado) location.hash = "#/companero";
      return pantalla({ titulo: "Compañero de estudio", atras: { texto: "Atrás", href: "#/companero" } }, h("p", { class: "nota-pie" }, "Cargando…"));
    }
    const r = p.resumen || {}, materias = r.materias || {}, racha = rachaViva(r), dias = diasAlExamen(r.examen);
    const semana = [];
    for (let i = 6; i >= 0; i--) { const t = haceDias(i), k = claveDia(t), n = (r.dias || {})[k] || 0; semana.push({ k, n, hoy: i === 0, letra: "DLMXJVS"[new Date(t).getDay()] }); }
    const enviados = (est.enviados[uid] || []).slice(0, 10);
    const pct = x => `${Math.floor((x || 0) * 100)} %`;
    pantalla({ titulo: p.nombre, atras: { texto: "Atrás", href: "#/companero" },
      barra: [h("button", { class: "boton ancho verde", onclick: () => escribirAnimo(p) }, "Mandar ánimos")] },
      h("div", { class: "resultado " + (r.lista ? "apto" : "neutro") },
        h("div", { class: "simbolo" }, ico(r.lista ? "check" : "examen")),
        h("h1", {}, r.lista ? "Lista para el examen" : `Preparación: ${Math.round((r.avance || 0) * 100)} %`),
        h("p", {}, `Progreso de ${p.nombre}, actualizado ${hace(p.actualizado)}.`)),
      dias != null && dias >= 0 ? h("p", { class: "subtitulo centrado" }, dias === 0 ? "¡El examen es hoy!" : `Faltan ${plural(dias, "día", "días")} para el examen (${fechaES(r.examen)}).`) : null,
      h("div", { class: "cifras" },
        [[plural(racha, "día", "días"), "Racha"], [`${r.dominadas || 0}/${r.total || 0}`, "Dominadas"], [String(r.vistas || 0), "Vistas"]].map(([v, t]) => h("div", { class: "cifra" }, h("b", {}, v), h("span", {}, t)))),
      cabecera("Esta semana"),
      h("div", { class: "tarjeta" }, h("div", { class: "semana", "aria-label": "Últimos 7 días" }, semana.map(d => h("span", { class: (d.n ? "hecho" : "") + (r.objetivo && d.n >= r.objetivo ? " cumplido" : "") + (d.hoy ? " hoy" : ""),
        "aria-label": `${d.hoy ? "Hoy" : fechaES(d.k)}: ${d.n ? plural(d.n, "respuesta", "respuestas") : "sin practicar"}` }, h("i", {}, d.n ? ico("check") : null), d.hoy ? "Hoy" : d.letra))),
        r.objetivo ? h("p", { class: "nota-pie" }, `Objetivo diario: ${r.objetivo} preguntas. Hoy lleva ${(r.dias || {})[claveDia(Date.now())] || 0}.`) : null),
      cabecera("Criterios para el examen"),
      grupo("con-icono", (r.criterios || []).filter(c => TEXTO_CRITERIO[c.id]).map(c => fila({ icono: c.cumple ? "check" : "x", color: c.cumple ? "verde" : "gris", titulo: TEXTO_CRITERIO[c.id], detalle: c.cumple ? "Cumplido" : `${Math.round(c.avance * 100)} %` }))),
      cabecera("Dominio por materia"),
      grupo("con-icono", A.MATERIAS.filter(([n]) => materias[n]).map(([n, nombre]) => {
        const [dom, vis, rep, tot] = materias[n], dominio = tot ? dom / tot : 0;
        return h("div", { class: "fila" },
          h("span", { class: "tesela t-" + (dominio >= P.CRITERIOS.dominioMateria ? "verde" : "indigo") }, n),
          h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, nombre),
            h("span", { class: "fila-detalle" }, `${dom} de ${tot} dominadas · ${dom + vis + rep} vistas${rep ? ` · ${rep} en repaso` : ""}`),
            h("span", { class: "dominio", role: "img", "aria-label": `${pct(dominio)} dominado` },
              h("i", { class: "d-dominada", style: `width:${tot ? dom / tot * 100 : 0}%` }), h("i", { class: "d-vista", style: `width:${tot ? vis / tot * 100 : 0}%` }), h("i", { class: "d-repaso", style: `width:${tot ? rep / tot * 100 : 0}%` }))),
          h("span", { class: "fila-valor" }, pct(dominio)));
      })),
      (r.examenes || []).length ? [cabecera("Últimos exámenes"), grupo("", r.examenes.slice().reverse().map(x => h("div", { class: "fila" },
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, fechaES(x.fecha) + (x.tipo === "semanal" ? " · simulacro semanal" : "")), h("span", { class: "fila-detalle" }, `${plural(x.fallos, "fallo", "fallos")} de ${x.total}`)),
        h("span", { class: "fila-valor " + (x.apto ? "apto" : "noapto") }, x.apto ? "Apto" : "No apto"))))] : null,
      cabecera("Tus ánimos"),
      enviados.length ? grupo("", enviados.map(a => h("div", { class: "fila" },
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, a.texto), h("span", { class: "fila-detalle" }, `${fechaHora(a.creado)} · ${a.leido ? "Leído" : "Enviado"}`)))))
        : h("p", { class: "nota-pie" }, `Aún no le has mandado ánimos. ${p.nombre} los verá al abrir la web.`),
      h("p", { class: "nota-pie" }, `Solo ves un resumen: ${p.nombre} decide si lo comparte y puede dejar de hacerlo cuando quiera.`));
  }

  A.ruta("companero", pantallaCompanero);
  A.inicioExtra(bloqueAnimos, "destacado");
  A.inicioExtra(bloqueInicio, "arriba");
  A.lateralExtra({ id: "companero", href: "#/companero", icono: "corazon", color: "rojo", texto: "Compañero",
    cuenta: () => { const n = est.recibidos.filter(a => !a.leido).length; return n ? String(n) : null; } });
  window.addEventListener("hashchange", () => setTimeout(avisarNuevos, 300));
  window.Companero = { estado: est, cargar, construirResumen };
})();
