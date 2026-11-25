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
  // Objetivo en uso: el elegido o, si una extensión lo ajusta (cuenta atrás al examen, estudiar.js),
  // el que esta devuelva. fn(elegido) devuelve un número mayor que 0 o null para dejar el elegido.
  let ajuste = null;
  function objetivo() {
    let o = null;
    if (ajuste) { try { o = ajuste(estado.objetivo); } catch (e) { o = null; } }
    return o > 0 ? Math.round(o) : estado.objetivo;
  }
  function ajustarObjetivo(fn) { ajuste = typeof fn === "function" ? fn : null; }
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
  // Con progreso.js, la racha incluye el protector: un día de descanso por semana (de lunes a domingo)
  // no la rompe. Sin progreso.js, racha simple de días seguidos.
  function racha() {
    const hechasHoy = respuestasDe(clave(0)), pr = P();
    let dias = 0, descansos = [], protector = null;
    if (pr && typeof pr.rachaDetalle === "function") {
      const r = pr.rachaDetalle(pr.actual);
      dias = r.dias; descansos = r.descansos;
      protector = { disponible: r.protectorDisponible, usado: r.descansoSemana };
    } else {
      let n = hechasHoy > 0 ? 0 : 1;
      while (respuestasDe(clave(n)) > 0) { dias++; n++; }
    }
    const semana = [];
    for (let i = 6; i >= 0; i--) {
      const d = haceDias(i), k = clave(i), r = respuestasDe(k);
      semana.push({ fecha: fecha(d), letra: "DLMXJVS"[d.getDay()], hecho: r > 0, meta: r >= estado.objetivo, hoy: i === 0, descanso: descansos.includes(k) });
    }
    const o = objetivo(), ayer = clave(1);
    return { dias, hoy: hechasHoy, objetivo: o, elegido: estado.objetivo, ajustado: o !== estado.objetivo, cumplidoHoy: hechasHoy >= o, semana, protector, descansoAyer: descansos.includes(ayer) };
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
    const o = objetivo();
    return antes < o && despues >= o;
  }
  function cambiarObjetivo(n) { if (OBJETIVOS.includes(n)) { estado.objetivo = n; guardar(); } }

  // ---------- Sonidos sintetizados (sin ficheros) ----------
  // Todo sale de osciladores de Web Audio: no hay audios de terceros. Los sonidos pasan por un bus común
  // (filtro suave + compresor) para que suenen presentes en el altavoz del móvil sin saturar ni chillar.
  let ctx = null, bus = null;
  function crearBus(c) {
    const filtro = c.createBiquadFilter(), comp = c.createDynamicsCompressor(), g = c.createGain();
    filtro.type = "lowpass"; filtro.frequency.value = 7000; filtro.Q.value = 0.4;
    comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.002; comp.release.value = 0.12;
    g.gain.value = 1.25;
    filtro.connect(comp).connect(g).connect(c.destination);
    return filtro;
  }
  function audio() {
    if (!estado.sonido) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) { try { ctx = new AC({ latencyHint: "interactive" }); bus = crearBus(ctx); } catch (e) { ctx = null; return null; } }
    return ctx;
  }
  // iOS y Chrome solo dejan sonar tras un gesto: al primer toque se "despierta" el audio con un silencio,
  // así el primer acierto ya suena. Si el sistema lo suspende (llamada, segundo plano), se reanuda al volver.
  function despertar() {
    const c = audio(); if (!c) return;
    if (c.state !== "running") { try { c.resume(); } catch (e) { /* sin audio */ } }
    try { const s = c.createBufferSource(); s.buffer = c.createBuffer(1, 1, c.sampleRate); s.connect(c.destination); s.start(0); } catch (e) { /* sin audio */ }
  }
  ["pointerdown", "keydown"].forEach(ev => window.addEventListener(ev, despertar, { capture: true, passive: true }));
  document.addEventListener("visibilitychange", () => { if (!document.hidden && ctx && ctx.state !== "running") { try { ctx.resume(); } catch (e) { /* sin audio */ } } });

  // Nota corta con ataque y caída suaves para que no "pique" al oído.
  function nota(c, frec, inicio, dur, { tipo = "sine", vol = 0.16, hasta, ataque = 0.008 } = {}) {
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + inicio;
    o.type = tipo;
    o.frequency.setValueAtTime(frec, t);
    if (hasta) o.frequency.exponentialRampToValueAtTime(hasta, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + ataque);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(bus || c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  // Campanita: fundamental redonda y armónicos que se apagan antes, como una marimba o un glockenspiel.
  function campana(c, frec, inicio, dur, vol = 0.2) {
    nota(c, frec, inicio, dur, { vol, ataque: 0.004 });
    nota(c, frec * 2, inicio, dur * 0.55, { vol: vol * 0.32, ataque: 0.003 });
    nota(c, frec * 3.01, inicio, dur * 0.28, { vol: vol * 0.12, ataque: 0.002 });
  }
  // Pulsación de opción: "pop" corto y grave-medio, que se nota sin cansar aunque se toque mucho.
  function pop(c, inicio = 0, vol = 0.22) {
    nota(c, 520, inicio, 0.075, { vol, hasta: 300, ataque: 0.003 });
    nota(c, 1560, inicio, 0.025, { tipo: "triangle", vol: vol * 0.18, ataque: 0.002 });
  }
  // Ruido filtrado (soplo, derrape): ruido blanco por un paso banda que barre de una frecuencia a otra.
  let ruidoBuf = null;
  function ruido(c, inicio, dur, { vol = 0.1, desde = 2000, hasta = 500, q = 1.2 } = {}) {
    if (!ruidoBuf) { ruidoBuf = c.createBuffer(1, c.sampleRate, c.sampleRate); const d = ruidoBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t = c.currentTime + inicio;
    s.buffer = ruidoBuf; s.loop = true;
    f.type = "bandpass"; f.Q.value = q;
    f.frequency.setValueAtTime(desde, t); f.frequency.exponentialRampToValueAtTime(hasta, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.08, dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(bus || c.destination);
    s.start(t); s.stop(t + dur + 0.02);
  }
  // Tono que sube y baja (salto de dibujos animados): de f0 a f1 en "sube" segundos y vuelta en "baja".
  function arco(c, inicio, f0, f1, sube, baja, { tipo = "sine", vol = 0.14 } = {}) {
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + inicio, fin = t + sube + baja;
    o.type = tipo;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + sube);
    o.frequency.exponentialRampToValueAtTime(f0 * 1.1, fin);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.setValueAtTime(vol, t + sube);
    g.gain.exponentialRampToValueAtTime(0.0001, fin);
    o.connect(g).connect(bus || c.destination);
    o.start(t); o.stop(fin + 0.02);
  }
  const SONIDOS = {
    // Elegir una opción (examen, ejercicios), interruptores y botones pequeños.
    toque: c => pop(c),
    // Acierto: dos campanitas que suben una quinta (La5 → Mi6) con un brillo encima. Alegre y corto (~0,4 s).
    acierto: c => { campana(c, 880, 0, 0.22, 0.2); campana(c, 1319, 0.085, 0.42, 0.24); nota(c, 2637, 0.1, 0.25, { vol: 0.025 }); },
    // Fallo: dos notas graves y suaves que bajan, sin pitido ni zumbido (más "uy" que "error").
    fallo: c => {
      nota(c, 294, 0, 0.17, { tipo: "triangle", vol: 0.24, ataque: 0.006 }); nota(c, 147, 0, 0.17, { vol: 0.14 });
      nota(c, 220, 0.14, 0.32, { tipo: "triangle", vol: 0.22, hasta: 196, ataque: 0.006 }); nota(c, 110, 0.14, 0.32, { vol: 0.13 });
    },
    serie: (c, n = 3) => { const base = 523 * Math.pow(2, Math.min(n, 12) / 24); [0, 4, 7, 12].forEach((s, i) => campana(c, base * Math.pow(2, s / 12), i * 0.06, 0.2, 0.13)); },
    meta: c => { [0, 4, 7, 12, 16].forEach((s, i) => campana(c, 523 * Math.pow(2, s / 12), i * 0.08, 0.34, 0.14)); },
    aprobado: c => { [0, 4, 7].forEach((s, i) => campana(c, 523 * Math.pow(2, s / 12), i * 0.11, 0.24, 0.15)); [0, 4, 7, 12].forEach(s => nota(c, 523 * Math.pow(2, (s + 12) / 12), 0.36, 0.7, { tipo: "triangle", vol: 0.07 })); },
    // Fin de lección (celebracion.js): fanfarria, tictac de los contadores, golpe de cada cifra, brillo final,
    // subida de la racha y logro.
    fanfarria: c => {
      [0, 4, 7, 12].forEach((s, i) => campana(c, 523 * Math.pow(2, s / 12), i * 0.09, 0.22, 0.15));
      [0, 4, 7, 12, 16].forEach(s => nota(c, 523 * Math.pow(2, (s + 12) / 12), 0.4, 0.9, { tipo: "triangle", vol: 0.06 }));
      [0, 0.07, 0.14].forEach((t, i) => nota(c, 3136 + i * 400, 0.44 + t, 0.18, { vol: 0.03 }));
    },
    // Tictac de los contadores: muy corto y agudo, que acompañe sin tapar.
    tic: (c, k = 0) => nota(c, 1500 + k * 600, 0, 0.035, { vol: 0.3, ataque: 0.002 }),
    // Cada cifra que aparece: "pop" con campanita, subiendo de tono una tras otra.
    golpe: (c, i = 0) => { const f = 659 * Math.pow(2, [0, 3, 7, 12][i % 4] / 12); pop(c, 0, 0.3); campana(c, f, 0.01, 0.3, 0.42); },
    // Brillo final al quedar todas las cifras: arpegio de campanitas agudas.
    brillo: c => [0, 0.06, 0.12, 0.18].forEach((t, i) => campana(c, 1047 * Math.pow(2, [0, 4, 7, 12][i] / 12), t, 0.3, 0.16)),
    racha: c => { nota(c, 262, 0, 0.5, { tipo: "triangle", vol: 0.1, hasta: 784 }); [0, 4, 7, 12].forEach((s, i) => campana(c, 784 * Math.pow(2, s / 12), 0.45 + i * 0.07, 0.35, 0.12)); },
    logro: c => { [0, 7, 12, 16, 19].forEach((s, i) => campana(c, 587 * Math.pow(2, s / 12), i * 0.07, 0.4, 0.12)); nota(c, 2349, 0.36, 0.5, { vol: 0.035 }); },
    // El coche de la celebración (celebracion.js los lanza con los eventos de su animación CSS, así van a la par):
    // llega rodando y frenando, derrapa un poco y da saltitos.
    llegada: (c, dur = 0.8) => { ruido(c, 0, dur * 0.85, { vol: 0.16, desde: 2600, hasta: 380 }); nota(c, 150, 0, dur * 0.85, { tipo: "triangle", vol: 0.09, hasta: 70, ataque: 0.04 }); },
    frenazo: c => { nota(c, 1650, 0, 0.15, { tipo: "triangle", vol: 0.06, hasta: 1250 }); nota(c, 1480, 0.07, 0.15, { tipo: "triangle", vol: 0.05, hasta: 1100 }); ruido(c, 0, 0.2, { vol: 0.05, desde: 3200, hasta: 1800, q: 3 }); },
    salto: (c, dur = 1.1) => { arco(c, dur * 0.15, 260, 640, dur * 0.3, dur * 0.3, { tipo: "triangle", vol: 0.13 }); pop(c, dur * 0.75, 0.2); },
    suspenso: c => { [7, 3, 0].forEach((s, i) => nota(c, 330 * Math.pow(2, s / 12), i * 0.16, 0.3, { tipo: "triangle", vol: 0.13 })); },
  };
  function sonar(nombre, arg) {
    const c = audio(); if (!c || !SONIDOS[nombre]) return;
    const tocar = () => { try { SONIDOS[nombre](c, arg); } catch (e) { /* sin audio */ } };
    // Si el contexto está dormido, primero se reanuda y luego suena (si no, en iOS el sonido se pierde).
    if (c.state === "running") tocar();
    else { try { c.resume().then(tocar, () => {}); } catch (e) { /* sin audio */ } }
  }
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
    b.addEventListener("click", () => cambiarSonido(!estado.sonido));
  }
  // Activa o silencia los sonidos (botón de la barra o ajustes del perfil) y lo avisa con "animo-sonido".
  function cambiarSonido(activo) {
    estado.sonido = !!activo; guardar();
    const b = document.getElementById("sonido"); if (b) pintarBoton(b);
    sonar("toque");
    try { window.dispatchEvent(new CustomEvent("animo-sonido", { detail: estado.sonido })); } catch (e) { /* sin eventos */ }
  }

  // ---------- Confeti (canvas propio, se retira solo) ----------
  // Pensado para ir a 60 fps en móviles modestos: lienzo a resolución 1× (las piezas son pequeñas
  // y se mueven rápido, no se nota), menos piezas en pantallas pequeñas, una transformación por pieza
  // sin save/restore, piezas agrupadas por color y las que ya han salido de la pantalla no se dibujan.
  function confeti(cantidad = 120) {
    if (sinMovimiento()) return;
    const cv = document.createElement("canvas"), dpr = 1;
    cv.className = "confeti"; cv.setAttribute("aria-hidden", "true");
    if (confetiActivo) confetiActivo.remove();
    confetiActivo = cv;
    const W = innerWidth, H = innerHeight;
    cantidad = Math.round(cantidad * Math.min(1, Math.max(0.55, (W * H) / (1280 * 800))));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    document.body.append(cv);
    const g = cv.getContext("2d", { alpha: true, desynchronized: true });
    const estilo = getComputedStyle(document.documentElement);
    const colores = ["--tinte", "--verde", "--ambar", "--violeta", "--rojo"].map(v => estilo.getPropertyValue(v).trim() || "#2f6bff");
    const piezas = Array.from({ length: cantidad }, (_, i) => {
      const izq = i % 2 === 0;
      return { x: izq ? -10 : W + 10, y: H * (0.55 + Math.random() * 0.25), vx: (izq ? 1 : -1) * (4 + Math.random() * 7), vy: -(9 + Math.random() * 9),
        r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.35, w: 7 + Math.random() * 6, h: 4 + Math.random() * 4, c: i % colores.length, forma: i % 3 };
    }).sort((a, b) => a.c - b.c);
    const t0 = performance.now();
    let previo = t0;
    (function paso(t) {
      // Avance según el tiempo real (60 pasos por segundo), para que la caída no se ralentice si se pierde un fotograma.
      const k = Math.min(3, (t - previo) / 16.67); previo = t;
      const fin = t - t0 > 2600;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, cv.width, cv.height);
      g.globalAlpha = Math.max(0, Math.min(1, 1 - (t - t0 - 1800) / 800));
      let color = -1, vivas = 0;
      if (!fin) for (const p of piezas) {
        if (k > 0) { const f = Math.pow(0.985, k); p.vy += 0.32 * k; p.vx *= f; p.vy *= f; p.x += p.vx * k; p.y += p.vy * k; p.r += p.vr * k; }
        if (p.y > H + 20 || p.x < -40 || p.x > W + 40) continue;
        vivas++;
        if (p.c !== color) { color = p.c; g.fillStyle = colores[color]; }
        const cs = Math.cos(p.r) * dpr, sn = Math.sin(p.r) * dpr;
        g.setTransform(cs, sn, -sn, cs, p.x * dpr, p.y * dpr);
        if (p.forma === 0) { g.beginPath(); g.arc(0, 0, p.h * 0.7, 0, Math.PI * 2); g.fill(); } else g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * (p.forma === 2 ? 0.5 : 1));
      }
      if (!fin && (vivas || t - t0 < 400) && cv.isConnected) requestAnimationFrame(paso); else { cv.remove(); if (confetiActivo === cv) confetiActivo = null; }
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

  window.Animo = { racha, limpiar, sumar, cambiarObjetivo, ajustarObjetivo, objetivo, OBJETIVOS, sonar, vibrar, confeti, contar, aviso, prepararBoton, cambiarSonido, sinMovimiento,
    get sonido() { return estado.sonido; } };
  prepararBoton(document.getElementById("sonido"));
})();
