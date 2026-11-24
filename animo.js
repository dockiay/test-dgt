/* Capa de ánimo: sonidos, confeti, racha de días y objetivo diario.
   No depende de app.js. Se guarda en su propia clave para no tocar el progreso de estudio.
   Respeta "reducir movimiento" (sin confeti ni contadores animados) y deja silenciar los sonidos. */
(function () {
  "use strict";
  const CLAVE = "testB.animo";
  const OBJETIVOS = [10, 20, 30, 50];
  let estado = leer();

  function leer() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { /* sin almacenamiento */ }
    d = d && typeof d === "object" ? d : {};
    return { dias: d.dias && typeof d.dias === "object" ? d.dias : {}, objetivo: OBJETIVOS.includes(d.objetivo) ? d.objetivo : 20, sonido: d.sonido !== false };
  }
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* sin almacenamiento */ } }
  // Si otra pestaña o la importación de una copia cambia la clave, la releemos.
  window.addEventListener("storage", e => { if (e.key === CLAVE) estado = leer(); });

  const sinMovimiento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Fechas (hora local, no UTC: el día acaba a medianoche en el dispositivo) ----------
  function fecha(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
  function haceDias(n) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - n); return d; }
  const hoy = () => fecha(new Date());

  // ---------- Racha ----------
  // Si está progreso.js (window.Progreso), los días estudiados salen de ahí, que es lo que se copia
  // entre dispositivos; si no, de nuestra propia clave. Un día cuenta para la racha con al menos una
  // respuesta; el objetivo diario es una meta aparte. Si hoy aún no ha estudiado, la racha sigue viva.
  const P = () => (window.Progreso && window.Progreso.actual && typeof window.Progreso.claveDia === "function") ? window.Progreso : null;
  function clave(n) { const pr = P(); return pr ? pr.claveDia(haceDias(n).getTime()) : fecha(haceDias(n)); }
  function respuestasDe(k) {
    const pr = P();
    if (pr) { const d = (pr.actual.dias || {})[k]; return d ? (d.r || 0) : 0; }
    return estado.dias[k] || 0;
  }
  function racha() {
    const hechasHoy = respuestasDe(clave(0));
    let dias = 0, n = hechasHoy > 0 ? 0 : 1;
    while (respuestasDe(clave(n)) > 0) { dias++; n++; }
    const semana = [];
    for (let i = 6; i >= 0; i--) {
      const d = haceDias(i), r = respuestasDe(clave(i));
      semana.push({ fecha: fecha(d), letra: "DLMXJVS"[d.getDay()], hecho: r > 0, meta: r >= estado.objetivo, hoy: i === 0 });
    }
    return { dias, hoy: hechasHoy, objetivo: estado.objetivo, cumplidoHoy: hechasHoy >= estado.objetivo, semana };
  }
  // Anota n respuestas de hoy (después de que app.js las registre). Devuelve true si con ellas se acaba
  // de cumplir el objetivo diario.
  function sumar(n) {
    let antes, despues;
    if (P()) { despues = respuestasDe(clave(0)); antes = despues - n; }
    else {
      const k = hoy(); antes = estado.dias[k] || 0; despues = antes + n; estado.dias[k] = despues;
      const corte = fecha(haceDias(400));
      for (const f of Object.keys(estado.dias)) if (f < corte) delete estado.dias[f];
      guardar();
    }
    return antes < estado.objetivo && despues >= estado.objetivo;
  }
  function cambiarObjetivo(n) { if (OBJETIVOS.includes(n)) { estado.objetivo = n; guardar(); } }

  // ---------- Sonidos sintetizados (sin ficheros) ----------
  let ctx = null;
  function audio() {
    if (!estado.sonido) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) { try { ctx = new AC(); } catch (e) { return null; } }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  // Nota corta con ataque y caída suaves para que no "pique" al oído.
  function nota(c, frec, inicio, dur, { tipo = "sine", vol = 0.16, hasta } = {}) {
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + inicio;
    o.type = tipo;
    o.frequency.setValueAtTime(frec, t);
    if (hasta) o.frequency.exponentialRampToValueAtTime(hasta, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  const SONIDOS = {
    toque: c => nota(c, 660, 0, 0.06, { tipo: "triangle", vol: 0.07 }),
    acierto: c => { nota(c, 784, 0, 0.12, { tipo: "triangle" }); nota(c, 1175, 0.085, 0.22, { tipo: "triangle" }); nota(c, 2350, 0.085, 0.16, { vol: 0.03 }); },
    fallo: c => { nota(c, 311, 0, 0.16, { tipo: "triangle", vol: 0.14 }); nota(c, 233, 0.12, 0.26, { tipo: "triangle", vol: 0.12, hasta: 220 }); },
    serie: (c, n = 3) => { const base = 523 * Math.pow(2, Math.min(n, 12) / 24); [0, 4, 7, 12].forEach((s, i) => nota(c, base * Math.pow(2, s / 12), i * 0.06, 0.14, { tipo: "triangle", vol: 0.1 })); },
    meta: c => { [0, 4, 7, 12, 16].forEach((s, i) => nota(c, 523 * Math.pow(2, s / 12), i * 0.08, 0.3, { tipo: "triangle", vol: 0.11 })); },
    aprobado: c => { [0, 4, 7].forEach((s, i) => nota(c, 523 * Math.pow(2, s / 12), i * 0.11, 0.2, { tipo: "triangle", vol: 0.12 })); [0, 4, 7, 12].forEach(s => nota(c, 523 * Math.pow(2, (s + 12) / 12), 0.36, 0.7, { tipo: "triangle", vol: 0.06 })); },
    suspenso: c => { [7, 3, 0].forEach((s, i) => nota(c, 330 * Math.pow(2, s / 12), i * 0.16, 0.3, { tipo: "triangle", vol: 0.1 })); },
  };
  function sonar(nombre, arg) { const c = audio(); if (c && SONIDOS[nombre]) { try { SONIDOS[nombre](c, arg); } catch (e) { /* sin audio */ } } }
  function vibrar(patron) { if (estado.sonido && navigator.vibrate && !sinMovimiento()) { try { navigator.vibrate(patron); } catch (e) { /* no disponible */ } } }

  // Botón de altavoz para la barra de navegación.
  const NS = "http://www.w3.org/2000/svg";
  function iconoAltavoz(activo) {
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "ico"); s.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", "M4 9.5h3.5L12 5.5v13l-4.5-4H4z" + (activo ? "M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" : "M16 9.5l5 5M21 9.5l-5 5"));
    s.append(p);
    return s;
  }
  function pintarBoton(b) {
    b.replaceChildren(iconoAltavoz(estado.sonido));
    b.setAttribute("aria-pressed", String(!estado.sonido));
    b.setAttribute("aria-label", "Silenciar sonidos");
    b.title = estado.sonido ? "Silenciar sonidos" : "Activar sonidos";
  }
  function prepararBoton(b) {
    if (!b) return;
    pintarBoton(b);
    b.addEventListener("click", () => { estado.sonido = !estado.sonido; guardar(); pintarBoton(b); sonar("toque"); });
  }

  // ---------- Confeti (canvas propio, se retira solo) ----------
  function confeti(cantidad = 120) {
    if (sinMovimiento()) return;
    const cv = document.createElement("canvas"), dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.className = "confeti"; cv.setAttribute("aria-hidden", "true");
    if (confetiActivo) confetiActivo.remove();
    confetiActivo = cv;
    const W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    document.body.append(cv);
    const g = cv.getContext("2d"); g.scale(dpr, dpr);
    const estilo = getComputedStyle(document.documentElement);
    const colores = ["--tinte", "--verde", "--ambar", "--violeta", "--rojo"].map(v => estilo.getPropertyValue(v).trim() || "#2f6bff");
    const piezas = Array.from({ length: cantidad }, (_, i) => {
      const izq = i % 2 === 0;
      return { x: izq ? -10 : W + 10, y: H * (0.55 + Math.random() * 0.25), vx: (izq ? 1 : -1) * (4 + Math.random() * 7), vy: -(9 + Math.random() * 9),
        r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.35, w: 7 + Math.random() * 6, h: 4 + Math.random() * 4, c: colores[i % colores.length], forma: i % 3 };
    });
    const t0 = performance.now();
    (function paso(t) {
      const fin = t - t0 > 2600;
      g.clearRect(0, 0, W, H);
      for (const p of piezas) {
        p.vy += 0.32; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.globalAlpha = fin ? 0 : Math.max(0, 1 - (t - t0 - 1800) / 800);
        if (p.forma === 0) { g.beginPath(); g.arc(0, 0, p.h * 0.7, 0, Math.PI * 2); g.fill(); } else g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * (p.forma === 2 ? 0.5 : 1));
        g.restore();
      }
      if (!fin && cv.isConnected) requestAnimationFrame(paso); else { cv.remove(); if (confetiActivo === cv) confetiActivo = null; }
    })(t0);
  }

  // Contador que sube hasta el valor final (o lo pone directamente sin movimiento).
  function contar(el, hasta, { ms = 900, formato = n => String(n) } = {}) {
    if (!el) return;
    if (sinMovimiento() || hasta <= 0) { el.textContent = formato(hasta); return; }
    const t0 = performance.now();
    (function paso(t) {
      const k = Math.min(1, (t - t0) / ms), suave = 1 - Math.pow(1 - k, 3);
      el.textContent = formato(Math.round(hasta * suave));
      if (k < 1) requestAnimationFrame(paso);
    })(t0);
  }

  // Aviso flotante breve (series de aciertos, objetivo cumplido). Se anuncia a lectores de pantalla.
  let zona = null;
  function aviso(texto, tipo = "serie") {
    if (!zona) { zona = document.createElement("div"); zona.className = "avisos"; zona.setAttribute("role", "status"); zona.setAttribute("aria-live", "polite"); document.body.append(zona); }
    const a = document.createElement("div");
    a.className = "aviso-flotante " + tipo; a.textContent = texto;
    zona.replaceChildren(a);
    setTimeout(() => a.classList.add("fuera"), 1700);
    setTimeout(() => a.remove(), 2100);
  }

  // Quita confeti y avisos al cambiar de pantalla.
  let confetiActivo = null;
  function limpiar() { if (confetiActivo) { confetiActivo.remove(); confetiActivo = null; } if (zona) zona.replaceChildren(); }

  window.Animo = { racha, limpiar, sumar, cambiarObjetivo, OBJETIVOS, sonar, vibrar, confeti, contar, aviso, prepararBoton, sinMovimiento,
    get sonido() { return estado.sonido; } };
  prepararBoton(document.getElementById("sonido"));
})();
