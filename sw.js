// Caché sencilla para usar la web sin conexión. Cambia VERSION al publicar cambios.
const VERSION = "v33";
const FICHEROS = ["./", "index.html", "estilos.css", "progreso.js", "nube.js", "vendor/firebase.js", "animo.js", "app.js", "estudiar.js", "estudiar.css", "camino.js", "camino.css", "errores.js", "companero.js", "perfil.js", "perfil.css", "fuentes-web/nunito.woff2", "data/preguntas.js", "data/errores.js", "data/escenas.js", "escenas.js", "escenas.css", "escenas-via.js", "escenas-via.css", "data/explora.js", "explora.js", "explora.css", "celebracion.js", "celebracion.css", "icono.svg", "manifest.webmanifest"];
self.addEventListener("install", e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHEROS)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// Red primero (para recibir preguntas nuevas), caché si no hay conexión.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Inicio de sesión de Firebase y llamadas a Google: siempre directas, sin caché.
  if (url.origin !== location.origin || url.pathname.startsWith("/__/auth/")) return;
  e.respondWith(fetch(e.request).then(r => {
    const copia = r.clone();
    if (r.ok) caches.open(VERSION).then(c => c.put(e.request, copia));
    return r;
  }).catch(() => caches.match(e.request)));
});
