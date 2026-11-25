/* Ficha de cada cuenta para el sitio de administración (/admin/).
   El progreso en la nube (usuarios/{uid}) solo lleva un id. Para que quien administra sepa quién es quién,
   cada persona con sesión guarda en fichas/{uid} su nombre y correo de Google, la fecha de alta (la pone el
   servidor la primera vez y ya no cambia) y la de su última visita. Como mucho una vez al día por dispositivo.
   También añade al perfil una nota de transparencia: quien administra puede ver el progreso (solo verlo).
   Usa window.Nube y window.App. Expone window.Fichas. */
(function () {
  "use strict";
  const N = window.Nube, A = window.App;
  if (!N || !A) return;
  const CLAVE = "testB.ficha"; // "<uid>|<día>" de la última ficha guardada en este dispositivo
  const leer = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const escribir = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
  const hoy = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
  let enCurso = false;

  async function guardar() {
    const c = N.conexion();
    if (!c || !c.usuario.email || enCurso) return;
    const marca = c.usuario.uid + "|" + hoy();
    if (leer(CLAVE) === marca) return;
    enCurso = true;
    try {
      const { fb, db, usuario } = c, ref = fb.doc(db, "fichas", usuario.uid);
      const antes = await fb.getDoc(ref);
      const alta = antes.exists() && antes.data().alta ? antes.data().alta : fb.serverTimestamp();
      await fb.setDoc(ref, { v: 1, nombre: (usuario.displayName || "").slice(0, 60), correo: usuario.email.toLowerCase(), alta, visto: fb.serverTimestamp() });
      escribir(CLAVE, marca);
    } catch (e) { /* sin conexión o reglas antiguas: se reintenta en la próxima sincronización */ }
    finally { enCurso = false; }
  }
  window.addEventListener("nube-estado", guardar);

  function notaPerfil() {
    if (!N.estado || !N.estado.usuario) return null;
    return A.h("p", { class: "nota-pie" }, "Quien gestiona esta web puede ver tu progreso (solo verlo, no cambiarlo) para mejorarla y ayudarte a preparar el examen.");
  }
  window.Fichas = { guardar, notaPerfil };
})();
