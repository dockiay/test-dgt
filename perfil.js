/* Bienvenida con inicio de sesión y pantalla de perfil (#/perfil).
   - Bienvenida: cuando la web tiene nube (Firebase), pide iniciar sesión con Google antes de empezar,
     para que el progreso quede guardado en la cuenta desde el primer día. Si ya había progreso en este
     dispositivo, nube.js lo combina con el de la cuenta al entrar (no se borra nada). Si la cuenta no está
     autorizada, lo explica y deja entrar con otra. Hay una salida discreta para usar la web sin cuenta,
     avisando de que entonces el progreso solo vive en este navegador.
   - Perfil: foto y nombre de Google, estadísticas, racha, logros, fecha del examen, compañero, ajustes
     (sonido y objetivo diario), copia de seguridad y cerrar sesión.
   Usa window.App (app.js), window.Progreso, window.Nube y, si están, Animo, Estudiar, Camino y Companero. */
(function () {
  "use strict";
  const A = window.App, P = window.Progreso;
  if (!A || !P) return;
  const { h, ico, fila, grupo, cabecera, cifras, pantalla, hoja, plural, segmentos } = A;
  const CLAVE_SIN_CUENTA = "testB.sinCuenta"; // eligió usar la web sin cuenta en este dispositivo
  const CLAVE_CUENTA = "testB.cuenta";        // uid de la última cuenta que la nube aceptó aquí
  const ESPERA_MAX = 6000;                    // ms como mucho mostrando «Cargando…» antes de dejar pasar
  const leer = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const escribir = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
  const nube = () => window.Nube ? window.Nube.estado : null;
  const seccion = () => (location.hash || "#/").slice(2).split("/")[0] || "inicio";
  const fechaLarga = f => new Date(f + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  // Foto de Google algo más grande que la de por defecto (96 px), para pantallas de alta densidad.
  const fotoGrande = url => url.replace(/=s\d+-c$/, "=s192-c");
  const iniciales = u => ((u && (u.nombre || u.correo)) || "?").trim().split(/\s+/).slice(0, 2).map(x => x[0]).join("").toUpperCase();
  function avatar(u, clase) {
    const caja = h("span", { class: "avatar " + (clase || ""), "aria-hidden": "true" });
    const sinFoto = () => caja.replaceChildren(u ? h("span", {}, iniciales(u)) : ico("persona"));
    if (u && u.foto) {
      const img = h("img", { src: fotoGrande(u.foto), alt: "", referrerpolicy: "no-referrer", decoding: "async" });
      img.addEventListener("error", sinFoto, { once: true });
      caja.append(img);
    } else sinFoto();
    return caja;
  }
  function resumenLocal() {
    const g = P.resumen(A.datos, A.TODAS);
    return { vistas: g.vistas, examenes: A.datos.historial.length };
  }

  // ---------- Bienvenida (capa sobre toda la web) ----------
  // Se muestra «Cargando…» solo la primera vez en un dispositivo donde probablemente haya nube; si ya
  // entró antes (o eligió no usar cuenta) se pinta la web enseguida y la capa solo aparece si hace falta.
  const probable = !!window.NUBE_CONFIG || /\.(web\.app|firebaseapp\.com)$/.test(location.hostname);
  let agotado = false, vista = null, firma = "", vioCapa = false, entrando = false;
  setTimeout(() => { agotado = true; revisar(); }, ESPERA_MAX);

  function modo() {
    const e = nube(), conocido = leer(CLAVE_CUENTA) || leer(CLAVE_SIN_CUENTA);
    if (!e || !e.listo) return probable && !conocido && !agotado && e ? "cargando" : null;
    if (!e.disponible) return null;
    if (e.usuario) {
      if (e.ultima) return null;                                  // la nube ya aceptó la cuenta
      if (leer(CLAVE_CUENTA) === e.usuario.uid) return null;      // aceptada antes en este dispositivo
      if (e.error || (e.pendiente && !e.sincronizando)) return null; // sin conexión: no se puede comprobar, no bloquea
      return "comprobando";
    }
    if (e.rechazada) return "rechazada";
    if (leer(CLAVE_SIN_CUENTA)) return null;
    return "entrar";
  }

  const capa = h("div", { class: "bienvenida", role: "dialog", "aria-modal": "true", "aria-labelledby": "bienvenida-titulo", hidden: true });
  document.body.append(capa);
  const FONDO = ["nav", "app", "lateral", "barra"].map(id => document.getElementById(id)).concat([document.querySelector(".pie")]).filter(Boolean);

  function usarSinCuenta() {
    hoja({ titulo: "¿Usar sin cuenta?",
      mensaje: "Tu progreso solo se guardará en este navegador. Si borras los datos del navegador, cambias de móvil o de ordenador, o lo pierdes, perderás también lo estudiado. Puedes iniciar sesión cuando quieras desde tu perfil y se combinará con tu cuenta.",
      acciones: [{ texto: "Usar sin cuenta", clase: "gris destructivo", accion: () => {
        escribir(CLAVE_SIN_CUENTA, String(Date.now()));
        const e = nube(); if (e) e.rechazada = null;
        revisar();
      } }],
      cancelar: "Volver" });
  }
  function entrar() { entrando = true; window.Nube.entrar(); }

  function pintarCapa(m) {
    const e = nube() || {}, partes = [];
    const marca = h("img", { class: "bienvenida-icono", src: "icono.svg", alt: "" });
    if (m === "cargando" || m === "comprobando") {
      partes.push(marca, h("div", { class: "bienvenida-cargando", "aria-hidden": "true" }),
        h("h1", { id: "bienvenida-titulo", class: "titulo-medio" }, m === "cargando" ? "Cargando…" : "Comprobando tu cuenta…"),
        m === "comprobando" ? h("p", { class: "subtitulo", role: "status" }, "Estamos uniendo el progreso de este dispositivo con el de tu cuenta.") : null);
    } else if (m === "rechazada") {
      partes.push(h("span", { class: "bienvenida-sello aviso-sello" }, ico("aviso")),
        h("h1", { id: "bienvenida-titulo", class: "titulo-medio" }, "Esta cuenta no tiene acceso"),
        h("p", { class: "subtitulo" }, h("strong", {}, e.rechazada), " no está entre las cuentas autorizadas. Esta web es privada: solo pueden entrar las cuentas que ha dado de alta quien la gestiona."),
        h("p", { class: "subtitulo" }, "Pídele que añada tu correo y vuelve a intentarlo, o entra con otra cuenta de Google. El progreso de este dispositivo no se ha tocado."),
        h("div", { class: "pila" },
          h("button", { class: "boton ancho", onclick: entrar }, "Entrar con otra cuenta"),
          h("button", { class: "boton ancho plano", onclick: usarSinCuenta }, "Usar sin cuenta")));
    } else {
      const loc = resumenLocal();
      partes.push(marca,
        h("h1", { id: "bienvenida-titulo", class: "titulo-grande" }, "Test permiso B"),
        h("p", { class: "subtitulo" }, "Inicia sesión para empezar. Así tu progreso queda guardado en tu cuenta y no se pierde nunca."),
        h("ul", { class: "bienvenida-ventajas" },
          h("li", {}, h("span", { class: "tesela t-azul" }, ico("nube")), h("span", {}, h("strong", {}, "Guardado automático"), h("span", {}, "Cada respuesta se guarda en tu cuenta al momento."))),
          h("li", {}, h("span", { class: "tesela t-verde" }, ico("enlace")), h("span", {}, h("strong", {}, "En el móvil y en el ordenador"), h("span", {}, "Sigue donde lo dejaste, en cualquier dispositivo."))),
          h("li", {}, h("span", { class: "tesela t-ambar" }, ico("llama")), h("span", {}, h("strong", {}, "Racha y logros a salvo"), h("span", {}, "Aunque cambies de móvil o borres el navegador.")))),
        loc.vistas || loc.examenes ? h("div", { class: "aviso bienvenida-local" }, ico("check"),
          h("span", {}, `Ya tienes progreso en este dispositivo (${plural(loc.vistas, "pregunta vista", "preguntas vistas")}${loc.examenes ? `, ${plural(loc.examenes, "examen", "exámenes")}` : ""}). Al iniciar sesión se suma al de tu cuenta, sin borrar nada.`)) : null,
        e.error ? h("p", { class: "bienvenida-error", role: "alert" }, e.error) : null,
        h("div", { class: "pila" },
          h("button", { class: "boton ancho boton-google", onclick: entrar }, h("span", { class: "g" }, "G"), "Iniciar sesión con Google"),
          h("button", { class: "boton ancho plano bienvenida-sin-cuenta", onclick: usarSinCuenta }, "Usar sin cuenta")));
    }
    capa.replaceChildren(h("div", { class: "bienvenida-cuerpo" }, partes));
  }

  function revisar() {
    const m = modo(), e = nube() || {};
    // Recuerda la cuenta aceptada y olvida «sin cuenta» en cuanto la nube da el visto bueno.
    if (e.usuario && e.ultima) {
      if (leer(CLAVE_CUENTA) !== e.usuario.uid) escribir(CLAVE_CUENTA, e.usuario.uid);
      if (leer(CLAVE_SIN_CUENTA)) escribir(CLAVE_SIN_CUENTA, null);
    }
    const f = [m, e.error, e.rechazada, m === "entrar" ? JSON.stringify(resumenLocal()) : ""].join("|");
    if (m !== vista || f !== firma) {
      const antes = vista;
      vista = m; firma = f;
      const visible = !!m;
      if (visible) { pintarCapa(m); vioCapa = true; }
      capa.hidden = !visible;
      document.body.classList.toggle("con-bienvenida", visible);
      for (const el of FONDO) { if (visible) el.setAttribute("inert", ""); else el.removeAttribute("inert"); }
      if (visible && antes !== m) { const b = capa.querySelector("button"); (b || capa).focus({ preventScroll: true }); }
      if (!visible && antes && vioCapa && e.usuario && e.ultima && (entrando || antes === "comprobando")) {
        entrando = false;
        if (window.Animo) { window.Animo.sonar("meta"); window.Animo.aviso(`¡Hola${e.usuario.nombre ? ", " + e.usuario.nombre.split(" ")[0] : ""}! Tu progreso está a salvo`, "meta"); }
      }
    }
    pintarBotonNav();
  }
  window.addEventListener("nube-estado", revisar);
  window.addEventListener("progreso-guardado", () => { if (vista === "entrar") revisar(); });

  // ---------- Botón del perfil en la barra superior ----------
  const navDer = document.querySelector(".nav-der");
  const botonNav = h("a", { class: "nav-avatar", href: "#/perfil", "aria-label": "Mi perfil", title: "Mi perfil" });
  if (navDer) navDer.append(botonNav);
  let firmaBoton = null;
  function pintarBotonNav() {
    const e = nube(), u = e && e.usuario, f = u ? u.foto + "|" + u.nombre : "-";
    if (f === firmaBoton) return;
    firmaBoton = f;
    botonNav.replaceChildren(avatar(u, "pequeno"));
  }

  // ---------- Pantalla de perfil ----------
  function cabeceraPerfil() {
    const e = nube(), u = e && e.usuario;
    if (u) return h("section", { class: "perfil-cabecera" }, avatar(u, "grande"),
      h("h1", { class: "titulo-medio" }, u.nombre || "Tu cuenta"),
      u.correo ? h("p", { class: "perfil-correo" }, u.correo) : null,
      h("p", { class: "perfil-estado" + (e.error ? " error" : ""), role: "status" }, ico("nube"), A.textoNube(e)));
    return h("section", { class: "perfil-cabecera" }, avatar(null, "grande"),
      h("h1", { class: "titulo-medio" }, "Sin cuenta"),
      h("p", { class: "perfil-correo" }, "Tu progreso solo se guarda en este navegador."),
      e && e.disponible ? [
        h("button", { class: "boton boton-google", onclick: entrar }, h("span", { class: "g" }, "G"), "Iniciar sesión con Google"),
        e.error ? h("p", { class: "bienvenida-error", role: "alert" }, e.error) : null,
        h("p", { class: "nota-pie centrado" }, "Al entrar, lo que has estudiado aquí se suma a tu cuenta, sin borrar nada.")] : null);
  }

  function interruptor({ icono, color, titulo, detalle, activo, alCambiar }) {
    return h("button", { class: "fila", role: "switch", "aria-checked": String(!!activo), onclick: () => alCambiar(!activo) },
      h("span", { class: "tesela t-" + color }, ico(icono)),
      h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, titulo), detalle ? h("span", { class: "fila-detalle" }, detalle) : null),
      h("span", { class: "interruptor", "aria-hidden": "true" }, h("i")));
  }

  function bloqueLogros() {
    if (!window.Camino) return null;
    const ls = window.Camino.estadoLogros(A.datos, A.TODAS, A.POR_MATERIA);
    const hechos = ls.filter(l => l.conseguido).sort((a, b) => b.conseguido - a.conseguido);
    const proximo = ls.filter(l => !l.conseguido).sort((a, b) => b.valor / b.meta - a.valor / a.meta)[0];
    return [cabecera("Logros"),
      hechos.length ? h("ul", { class: "perfil-insignias", "aria-label": "Últimos logros conseguidos" }, hechos.slice(0, 4).map(l =>
        h("li", {}, h("span", { class: "logro-sello" }, ico(l.icono)), h("span", {}, l.titulo)))) : null,
      grupo("con-icono", fila({ icono: "medalla", color: "verde", titulo: `${hechos.length} de ${ls.length} conseguidos`,
        detalle: proximo ? `Próximo: ${proximo.titulo} (${proximo.valor}/${proximo.meta})` : "¡Los tienes todos!", href: "#/logros" }))];
  }

  function bloqueExamen() {
    if (!window.Estudiar || !window.Estudiar.elegirFecha) return null;
    const c = window.Estudiar.cuentaAtras();
    return [cabecera("Tu examen"),
      grupo("con-icono", fila({ icono: "calendario", color: "rojo", titulo: c ? fechaLarga(c.fecha) : "Fecha del examen",
        detalle: c ? window.Estudiar.textoCuentaAtras(c) : "Ponla y la web ajusta tu objetivo diario", valor: c ? null : "Sin fecha", accion: () => window.Estudiar.elegirFecha() }))];
  }

  function bloqueCompanero() {
    const e = nube();
    if (!window.Companero || !e || !e.disponible) return null;
    const est = window.Companero.estado, comp = (est.compartido && est.compartido.companeros) || [], conmigo = est.conmigo || [];
    const detalle = !e.usuario ? "Inicia sesión para compartir tu avance con alguien de confianza"
      : [comp.length ? `Compartes tu progreso con ${plural(comp.length, "persona", "personas")}` : "Comparte tu avance con alguien de confianza",
        conmigo.length ? `${plural(conmigo.length, "persona comparte", "personas comparten")} contigo` : null].filter(Boolean).join(" · ");
    const sinLeer = (est.recibidos || []).filter(a => !a.leido).length;
    return [cabecera("Compañero de estudio"),
      grupo("con-icono", fila({ icono: "corazon", color: "rojo", titulo: "Compañero de estudio", detalle, insignia: sinLeer || null, href: "#/companero" }))];
  }

  function bloqueAjustes() {
    const An = window.Animo;
    if (!An) return null;
    const r = An.racha();
    return [cabecera("Ajustes"),
      grupo("con-icono",
        interruptor({ icono: "altavoz", color: "indigo", titulo: "Sonidos", detalle: "Sonidos y vibración al responder", activo: An.sonido, alCambiar: v => An.cambiarSonido(v) }),
        h("div", { class: "fila perfil-objetivo" },
          h("span", { class: "tesela t-ambar" }, ico("diana")),
          h("span", { class: "fila-cuerpo" },
            h("span", { class: "fila-titulo" }, "Objetivo diario"),
            h("span", { class: "fila-detalle" }, r.ajustado ? `Por la fecha del examen, hoy tu objetivo sube a ${r.objetivo} preguntas.` : "Preguntas que quieres responder cada día"),
            segmentos(An.OBJETIVOS.map(o => [o, String(o)]), r.elegido, v => { An.cambiarObjetivo(v); A.sonar("toque"); const y = window.scrollY; A.repintar(); window.scrollTo(0, y); }))))];
  }

  function bloqueCuenta() {
    const e = nube();
    const filas = [fila({ icono: "lista", color: "gris", titulo: "Copia de seguridad", detalle: "Descarga tu progreso en un fichero o pásalo a otro dispositivo", href: "#/copia" })];
    if (e && e.usuario) filas.push(Object.assign(fila({ icono: "salir", color: "rojo", titulo: "Cerrar sesión", chevron: false, accion: () => hoja({ titulo: "¿Cerrar sesión?",
      mensaje: "Lo que has estudiado sigue guardado en tu cuenta y en este dispositivo. Para seguir estudiando tendrás que volver a iniciar sesión.",
      acciones: [{ texto: "Cerrar sesión", clase: "gris destructivo", accion: () => { escribir(CLAVE_SIN_CUENTA, null); window.Nube.salir(); location.hash = "#/"; } }] }) }), { className: "fila destructiva" }));
    filas.push(Object.assign(fila({ icono: "repetir", color: "rojo", titulo: "Borrar mi progreso", detalle: "Empezar desde cero en todos tus dispositivos", chevron: false, accion: () => hoja({ titulo: "¿Borrar todo tu progreso?",
      mensaje: e && e.usuario ? "Se borran tus respuestas, fallos, exámenes, racha, camino y logros, aquí y en tu cuenta. Tus otros dispositivos también empezarán de cero al conectarse. No se puede deshacer: si quieres guardarlo, haz antes una copia de seguridad."
        : "Se borran tus respuestas, fallos, exámenes, racha, camino y logros de este navegador. No se puede deshacer: si quieres guardarlo, haz antes una copia de seguridad.",
      acciones: [{ texto: "Borrar mi progreso", clase: "gris destructivo", accion: () => {
        P.reiniciar();
        try { sessionStorage.removeItem("testB.avance"); } catch (x) { /* sin almacenamiento */ }
        const nb = window.Nube, fin = () => { location.hash = "#/"; location.reload(); };
        // Sube el borrado a la nube antes de recargar (si no hay conexión, se subirá al volver).
        if (e && e.usuario && nb && nb.sincronizar) Promise.race([nb.sincronizar(), new Promise(r => setTimeout(r, 4000))]).then(fin, fin); else fin();
      } }] }) }), { className: "fila destructiva" }));
    return [cabecera(e && e.usuario ? "Cuenta y copia" : "Copia de seguridad"), grupo("con-icono", filas)];
  }

  function pantallaPerfil() {
    const d = A.datos, prep = P.preparacion(d, A.TODAS, A.POR_MATERIA);
    const exs = d.historial, aptos = exs.filter(r => r.apto).length;
    const r = window.Animo ? window.Animo.racha() : null;
    pantalla({ titulo: "Mi perfil", atras: { texto: "Inicio", href: "#/" } },
      cabeceraPerfil(),
      cabecera("Estadísticas"),
      cifras([`${prep.global.vistas}`, "Vistas"], [`${prep.global.dominada}`, "Dominadas"], [`${Math.round(prep.avance * 100)} %`, "Preparación"]),
      cifras([String(exs.length), plural(exs.length, "examen", "exámenes").replace(/^\d+ /, "")], [String(aptos), aptos === 1 ? "Apto" : "Aptos"], [r ? String(r.dias) : String(P.racha(d)), "Días de racha"]),
      grupo("con-icono perfil-progreso", fila({ icono: prep.lista ? "check" : "examen", color: prep.lista ? "verde" : "azul", titulo: "Mi progreso",
        detalle: `${prep.criterios.filter(c => c.cumple).length} de ${prep.criterios.length} criterios para el examen · dominio por materia`, href: "#/progreso" })),
      cabecera("Racha"),
      A.tarjetaRacha(),
      bloqueLogros(),
      bloqueExamen(),
      bloqueCompanero(),
      bloqueAjustes(),
      bloqueCuenta());
  }

  A.ICONOS.persona = A.ICONOS.persona || "M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6";
  A.ICONOS.altavoz = "M4.5 9.5h3l4.5-4v13l-4.5-4h-3zM15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11";
  A.ruta("perfil", () => pantallaPerfil());
  window.addEventListener("animo-sonido", () => { if (seccion() === "perfil") A.repintarSiSeguro(); });
  window.Perfil = { modo, usarSinCuenta };
  revisar();
})();
