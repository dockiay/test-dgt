/* Guardado en la nube con Firebase: inicio de sesión con Google y copia del progreso en Firestore.
   El progreso sigue viviendo en localStorage (progreso.js), así que la web funciona igual sin conexión
   y sin sesión. Con sesión iniciada, cada cambio se combina con la copia de la nube con
   Progreso.combinar (no se pierde nada de ningún dispositivo) y el resultado se guarda en los dos sitios.
   Solo se activa cuando la web se sirve desde Firebase Hosting, que publica la configuración en
   /__/firebase/init.json. Expone window.Nube; avisa de los cambios con el evento "nube-estado"
   y entrega el progreso combinado con el evento "progreso-nube". No toca el DOM. */
(function () {
  "use strict";
  const P = window.Progreso;
  const ESPERA_SUBIDA = 3000; // ms de calma tras un cambio antes de subirlo
  const estado = { disponible: false, usuario: null, sincronizando: false, ultima: null, error: null, pendiente: false };
  let fb = null, auth = null, db = null, temporizador = null, enCurso = null, otraVez = false, ultimoSubido = null, aviso = null;
  // Solo pueden guardar en la nube los correos de la lista de firestore.rules. Si una cuenta no está,
  // la nube responde "permission-denied" desde el primer acceso: se cierra la sesión y se explica.
  const sinPermiso = correo => `La cuenta ${correo || "con la que has entrado"} no tiene permiso para guardar en la nube. Entra con una cuenta autorizada o pide acceso a quien gestiona la web. Mientras, tu progreso sigue guardado en este dispositivo.`;

  const avisar = () => window.dispatchEvent(new CustomEvent("nube-estado", { detail: estado }));
  // JSON con las claves ordenadas, para comparar dos progresos sin que importe el orden.
  function canonico(v) {
    if (Array.isArray(v)) return "[" + v.map(canonico).join(",") + "]";
    if (v && typeof v === "object") return "{" + Object.keys(v).sort().map(k => JSON.stringify(k) + ":" + canonico(v[k])).join(",") + "}";
    return JSON.stringify(v === undefined ? null : v);
  }
  function mensaje(e) {
    const c = (e && e.code) || "";
    if (c === "auth/popup-closed-by-user" || c === "auth/cancelled-popup-request") return null;
    if (c === "auth/network-request-failed" || c === "unavailable") return "Sin conexión. Se guardará en la nube cuando vuelva.";
    if (c === "auth/unauthorized-domain") return "Esta dirección no está autorizada para iniciar sesión.";
    if (c === "permission-denied") return "La nube ha rechazado el guardado. Prueba a cerrar sesión y volver a entrar.";
    return "No se ha podido conectar con la nube. Se reintentará más tarde.";
  }

  async function config() {
    if (window.NUBE_CONFIG) return window.NUBE_CONFIG; // pruebas o alojamiento fuera de Firebase
    if (!/^https?:$/.test(location.protocol)) return null;
    try {
      const r = await fetch("/__/firebase/init.json", { cache: "no-cache" });
      if (!r.ok || !(r.headers.get("content-type") || "").includes("json")) return null;
      const c = await r.json();
      // Iniciar sesión desde el mismo dominio evita los problemas de cookies de terceros de Safari.
      if (/\.(web\.app|firebaseapp\.com)$/.test(location.hostname)) c.authDomain = location.host;
      return c.apiKey && c.projectId ? c : null;
    } catch (e) { return null; }
  }

  async function iniciar() {
    const c = await config();
    if (!c) return;
    try { fb = await import("./vendor/firebase.js"); } catch (e) { return; }
    const app = fb.initializeApp(c);
    auth = fb.getAuth(app); db = fb.getFirestore(app);
    if (c.emulador) { fb.connectAuthEmulator(auth, c.emulador.auth, { disableWarnings: true }); fb.connectFirestoreEmulator(db, c.emulador.host, c.emulador.puerto); }
    estado.disponible = true; avisar();
    fb.getRedirectResult(auth).catch(e => { estado.error = mensaje(e); avisar(); });
    fb.onAuthStateChanged(auth, u => {
      estado.usuario = u ? { nombre: u.displayName || "", correo: u.email || "", foto: u.photoURL || "" } : null;
      estado.error = aviso; aviso = null; ultimoSubido = null; estado.ultima = null; avisar();
      if (u) sincronizar();
    });
  }

  // Lee la copia de la nube, la combina con la local y guarda el resultado en los dos sitios.
  // Usa una transacción para que dos dispositivos que guardan a la vez no se pisen.
  async function sincronizar() {
    clearTimeout(temporizador); temporizador = null;
    if (!auth || !auth.currentUser) return;
    if (enCurso) { otraVez = true; return enCurso; }
    if (navigator.onLine === false) { estado.pendiente = true; avisar(); return; }
    estado.sincronizando = true; avisar();
    enCurso = (async () => {
      const u = auth.currentUser, ref = fb.doc(db, "usuarios", u.uid);
      const local = P.normalizar(P.actual || P.cargar()), animoLocal = P.leerAnimo();
      try {
        const res = await fb.runTransaction(db, async tx => {
          const snap = await tx.get(ref);
          let remoto = null, animoRemoto = null;
          if (snap.exists()) {
            const d = snap.data();
            try { remoto = P.normalizar(JSON.parse(d.datos)); } catch (e) { remoto = null; }
            try { animoRemoto = d.animo ? JSON.parse(d.animo) : null; } catch (e) { animoRemoto = null; }
          }
          const datos = remoto ? P.combinar(local, remoto) : local;
          const animo = P.mezclarAnimo(animoLocal, animoRemoto);
          const texto = canonico(datos), textoAnimo = animo ? canonico(animo) : null;
          const cambia = !remoto || texto !== canonico(remoto) || textoAnimo !== (animoRemoto ? canonico(animoRemoto) : null);
          if (cambia) tx.set(ref, { v: 2, datos: JSON.stringify(datos), animo: animo ? JSON.stringify(animo) : null, actualizado: fb.serverTimestamp() });
          return { datos, animo, texto, animoRemoto };
        });
        if (auth.currentUser !== u) return; // cerró sesión mientras tanto
        ultimoSubido = res.texto;
        if (res.animoRemoto) P.combinarAnimo(res.animoRemoto);
        // Solo avisa a la app si la nube traía algo que no estaba en este dispositivo.
        if (res.texto !== canonico(local)) window.dispatchEvent(new CustomEvent("progreso-nube", { detail: res.datos }));
        estado.ultima = Date.now(); estado.error = null; estado.pendiente = false;
      } catch (e) {
        if (e && e.code === "permission-denied" && !estado.ultima) {
          // Nunca ha podido leer su copia: la cuenta no está en la lista de permitidas.
          aviso = sinPermiso(u.email); estado.pendiente = false;
          fb.signOut(auth).catch(() => {});
          return;
        }
        estado.error = mensaje(e); estado.pendiente = true;
      } finally {
        estado.sincronizando = false; enCurso = null; avisar();
        if (otraVez) { otraVez = false; programar(); }
      }
    })();
    return enCurso;
  }
  function programar(ms = ESPERA_SUBIDA) {
    if (!auth || !auth.currentUser) return;
    clearTimeout(temporizador);
    temporizador = setTimeout(sincronizar, ms);
  }

  // Cada guardado local se sube unos segundos después (si de verdad cambió algo).
  window.addEventListener("progreso-guardado", () => {
    if (!auth || !auth.currentUser) return;
    if (ultimoSubido && canonico(P.normalizar(P.actual)) === ultimoSubido) return;
    estado.pendiente = true; programar();
  });
  // Al volver a la web (otra pestaña, desbloquear el móvil) trae lo de otros dispositivos;
  // al salir, sube lo pendiente sin esperar.
  document.addEventListener("visibilitychange", () => {
    if (!auth || !auth.currentUser) return;
    if (document.visibilityState === "visible") sincronizar();
    else if (temporizador) sincronizar();
  });
  window.addEventListener("online", () => { if (auth && auth.currentUser) sincronizar(); });

  async function entrar() {
    if (!auth) return;
    const proveedor = new fb.GoogleAuthProvider();
    proveedor.setCustomParameters({ prompt: "select_account" });
    estado.error = null; avisar();
    // En la app instalada (pantalla completa) las ventanas emergentes fallan a menudo: mejor redirigir.
    const instalada = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    try {
      if (instalada) return await fb.signInWithRedirect(auth, proveedor);
      await fb.signInWithPopup(auth, proveedor);
    } catch (e) {
      if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) {
        try { return await fb.signInWithRedirect(auth, proveedor); } catch (e2) { e = e2; }
      }
      estado.error = mensaje(e); avisar();
    }
  }
  async function salir() {
    if (!auth) return;
    if (temporizador) await sincronizar(); // sube lo último antes de cerrar
    await fb.signOut(auth);
  }

  // Acceso a Firestore para otros módulos (companero.js): solo con sesión iniciada y permiso comprobado.
  function conexion() { return auth && auth.currentUser && estado.ultima ? { fb, db, usuario: auth.currentUser } : null; }
  window.Nube = { estado, entrar, salir, sincronizar, canonico, conexion };
  iniciar();
})();
