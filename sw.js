// Caché sencilla para usar la web sin conexión. Cambia VERSION al publicar cambios.
const VERSION = "v7";
const FICHEROS = ["./", "index.html", "estilos.css", "progreso.js", "app.js", "data/preguntas.js", "icono.svg", "manifest.webmanifest"];
self.addEventListener("install", e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHEROS)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// Red primero (para recibir preguntas nuevas), caché si no hay conexión.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    const copia = r.clone();
    if (r.ok && new URL(e.request.url).origin === location.origin) caches.open(VERSION).then(c => c.put(e.request, copia));
    return r;
  }).catch(() => caches.match(e.request)));
});
