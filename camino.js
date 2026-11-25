/* Camino del temario, logros y celebraciones de coronas.
   - Camino: las 16 materias partidas en unidades por tema. Cada unidad tiene de 2 a 5 niveles de 10
     preguntas (7 de la unidad y 3 de repaso escondido de unidades anteriores), un cofre a mitad y un test de
     paso final (20 preguntas, máximo 3 fallos). Aprobar el test de una unidad más adelante («saltar aquí»)
     da por hechas las anteriores de la misma materia. Con la unidad superada, el reto legendario (20 sin
     ningún fallo) la pone en oro. Lo hecho va en datos.camino. Quien ya dominaba el 60 % de una materia o
     unidad (regla anterior) la conserva superada. Una materia se «corona» al dominar el 80 %. Todo es una
     guía: cualquier paso o materia se puede practicar siempre.
   - Al completar un paso, la próxima vez que se abre el camino se anima el avance (animarAvance).
   - Logros: premian aprender (preguntas dominadas, fallos convertidos en aciertos, materias coronadas,
     exámenes aprobados), no el tiempo ni puntos sin sentido. Una vez conseguidos se conservan.
   Los logros se guardan en datos.logros ({id: ms en que se consiguió}) y viajan con el progreso
   (copia y nube). Depende de progreso.js (window.Progreso), animo.js y app.js (window.App). */
(function () {
  "use strict";
  const P = window.Progreso;
  if (!P) return;

  const SUPERADA = 0.6, CORONADA = 0.8; // mismo listón que «lista para el examen» (60 % por materia, 80 % global)
  const EXAMEN_MIN = 30;                 // solo cuentan simulacros completos

  // ---------- Datos: datos.logros ----------
  function normalizarLogros(v) {
    const n = {};
    for (const [id, ms] of Object.entries(v && typeof v === "object" ? v : {})) if (/^[a-z0-9-]{1,40}$/.test(id) && +ms > 0) n[id] = +ms;
    return n;
  }
  // Al combinar dos dispositivos, de cada logro se queda la fecha más antigua.
  function combinarLogros(a, b) {
    a = normalizarLogros(a); b = normalizarLogros(b);
    const n = Object.assign({}, b, a);
    for (const id of Object.keys(b)) if (a[id]) n[id] = Math.min(a[id], b[id]);
    return n;
  }
  if (typeof P.extender === "function") P.extender("logros", { vacio: () => ({}), normalizar: normalizarLogros, combinar: combinarLogros });
  const logrosDe = d => (d.logros && typeof d.logros === "object") ? d.logros : (d.logros = {});

  // ---------- Unidades y niveles ----------
  // Cada materia se parte en unidades por tema; cada unidad tiene de 2 a 5 niveles de 10 preguntas y
  // termina con un test de paso (20 preguntas, máximo 3 fallos). Lo hecho se guarda en datos.camino
  // ({clave: ms}): "nv-m1u3-2" (nivel 2 de la unidad 3 de la materia 1) y "paso-m1u3". Un nivel o test de paso
  // terminado sin ningún fallo se apunta además como "pf-" + su clave (p. ej. "pf-nv-m1u3-2") y se pinta en oro.
  const NIVEL_N = 10, PASO_N = 20, PASO_FALLOS = 3;
  if (typeof P.extender === "function") P.extender("camino", { vacio: () => ({}), normalizar: normalizarLogros, combinar: combinarLogros });
  const caminoDe = d => (d.camino && typeof d.camino === "object") ? d.camino : (d.camino = {});

  // Materia 1 (654 preguntas): por tema, subtema y código de la señal de la imagen.
  const M1 = [["vias", "Vías, carriles y definiciones"], ["s-normas", "Señales: normas, agentes y semáforos"], ["s-peligro", "Señales de peligro y de prioridad"],
    ["s-reglas", "Señales de prohibición y obligación"], ["s-indicacion", "Señales de indicación"], ["marcas", "Marcas viales"], ["prioridad", "Prioridad de paso"],
    ["velocidad", "Velocidad"], ["maniobras", "Incorporarse, girar, cambiar de sentido y marcha atrás"], ["adelantamiento", "Adelantamiento"],
    ["parada", "Parada, estacionamiento y luces"], ["sanciones", "Infracciones, sanciones y delitos"]];
  function unidadM1(p) {
    const t = p.tema, s = p.subtema || "", txt = (p.enunciado || "").toLowerCase();
    const m = String((p.imagen && p.imagen.src) || "").match(/\/([A-Z]{1,2})-(\d+)/), c = m ? [m[1], +m[2]] : null;
    if (["vias", "definiciones", "por_donde_circular", "carriles_especiales", "glorietas"].includes(t)) return "vias";
    if (t === "velocidad" || (s.includes("velocidad") && t !== "senales_verticales")) return "velocidad";
    if (["prioridad", "incorporacion"].includes(t)) return "prioridad";
    if (["maniobras", "cambio_direccion", "cambio_sentido", "marcha_atras"].includes(t)) return "maniobras";
    if (t === "adelantamiento") return "adelantamiento";
    if (["parada_estacionamiento", "luces", "senales_vehiculo", "documentacion"].includes(t)) return "parada";
    if (["infracciones", "infracciones_sanciones", "delitos_seguridad_vial", "distracciones"].includes(t)) return "sanciones";
    if (t === "marcas_viales" || (c && c[0] === "M") || s.includes("marcas")) return "marcas";
    if (/agente|semaforo|balizamiento|obras|paso_a_nivel|orden_pref|prelacion|obediencia|concepto|aplicacion|inscripciones|idioma|obligaciones|catalogo|paneles/.test(s) || /agente|semáforo/.test(txt)) return "s-normas";
    if ((c && c[0] === "P") || /peligro|advertencia|senales_prioridad|restriccion/.test(s) || (c && c[0] === "R" && c[1] < 100)) return "s-peligro";
    if ((c && c[0] === "R") || /prohib|obligacion/.test(s)) return "s-reglas";
    if ((c && c[0] === "S") || /indicacion/.test(s)) return "s-indicacion";
    return "s-normas";
  }
  // Materias que se parten en dos: [nombre y temas de la primera unidad, nombre de la segunda (el resto)].
  const DOS = {
    4: ["Alcohol, drogas y medicamentos", ["alcohol_drogas", "medicamentos", "delitos", "delitos_seguridad_vial"], "Percepción, fatiga y distracciones"],
    6: ["Luces, noche y túneles", ["luces", "noche", "tuneles", "senales", "senales_verticales", "infracciones_sanciones", "carriles_especiales"], "Lluvia, niebla y otras condiciones adversas"],
    8: ["Peatones, ciclistas y otros usuarios vulnerables", ["usuarios_vulnerables", "peatones", "vmp", "ciclos"], "Normas de circulación con usuarios vulnerables"],
    10: ["Permiso de conducción y puntos", ["permiso_conduccion", "puntos", "infracciones_sanciones"], "Documentación, ITV y seguro"],
    11: ["Qué hacer en un accidente", ["accidentes", "adas", "accesorios_obligatorios"], "Primeros auxilios"],
    14: ["Mecánica, neumáticos y mantenimiento", ["mecanica", "neumaticos", "vehiculo"], "Seguridad activa y asistentes (ADAS)"],
  };
  let UNIDADES = null, NODOS = null;
  // Se construyen una vez, a partir del banco: UNIDADES en orden y NODOS (niveles y tests) en el orden del camino.
  function construir() {
    if (UNIDADES) return;
    const A = window.App;
    if (!A || !A.PREGUNTAS) return;
    UNIDADES = []; NODOS = [];
    for (const [n, nombreM] of A.MATERIAS) {
      const ps = A.PREGUNTAS.filter(p => p.materia === n);
      if (!ps.length) continue;
      let grupos;
      if (n === 1) grupos = M1.map(([k, t]) => [t, ps.filter(p => unidadM1(p) === k)]);
      else if (DOS[n]) grupos = [[DOS[n][0], ps.filter(p => DOS[n][1].includes(p.tema))], [DOS[n][2], ps.filter(p => !DOS[n][1].includes(p.tema))]];
      else grupos = [[nombreM, ps]];
      grupos = grupos.filter(g => g[1].length);
      grupos.forEach(([titulo, lista], i) => {
        const u = { id: `m${n}u${i + 1}`, materia: n, k: i + 1, de: grupos.length, titulo, ids: lista.map(p => p.id), nodos: [] };
        u.niveles = Math.max(2, Math.min(5, Math.ceil(u.ids.length / 20)));
        const cofre = Math.ceil(u.niveles / 2); // cofre de recompensa a mitad de unidad
        for (let j = 1; j <= u.niveles; j++) {
          u.nodos.push({ tipo: "nivel", clave: `nv-${u.id}-${j}`, unidad: u, i: j });
          if (j === cofre) u.nodos.push({ tipo: "cofre", clave: `cofre-${u.id}`, unidad: u });
        }
        u.nodos.push({ tipo: "paso", clave: `paso-${u.id}`, unidad: u });
        u.nodos.forEach(x => { x.orden = NODOS.length; NODOS.push(x); });
        UNIDADES.push(u);
      });
    }
  }
  const hechoN = (datos, x) => !!caminoDe(datos)[x.clave];
  const perfectoN = (datos, x) => !!caminoDe(datos)["pf-" + x.clave];
  const unidadSuperada = (datos, u) => hechoN(datos, u.nodos[u.nodos.length - 1]);
  // Nodo actual: el primero sin hacer en el orden del camino.
  const nodoActual = datos => { construir(); return (NODOS || []).find(x => !hechoN(datos, x)) || null; };

  // ---------- Etapas (materias) del camino ----------
  // nivel: 0 sin empezar, 1 empezada, 2 superada (todas sus unidades), 3 coronada (80 % dominado). La corona,
  // una vez ganada, se conserva, pero si el dominio baja del 80 % se avisa para repasarla.
  function etapas(datos, porMateria) {
    construir();
    const lg = logrosDe(datos), out = [], act = nodoActual(datos);
    let anteriorSuperada = true;
    for (let n = 1; n <= 16; n++) {
      const ids = porMateria[n] || [];
      const r = P.resumen(datos, ids);
      const us = (UNIDADES || []).filter(u => u.materia === n), nodos = us.flatMap(u => u.nodos);
      const hechos = nodos.filter(x => hechoN(datos, x)).length, superadas = us.filter(u => unidadSuperada(datos, u)).length;
      const coronada = !!lg["corona-m" + n], corona = ids.length > 0 && r.dominio >= CORONADA;
      const nivel = coronada || corona ? 3 : us.length && superadas === us.length ? 2 : (hechos || r.vistas > 0) ? 1 : 0;
      out.push({ n, total: ids.length, resumen: r, dominio: r.dominio, nivel, coronada: coronada || corona, bajo: coronada && !corona,
        unidades: us.length, superadas, legendaria: us.length > 0 && us.every(u => !!caminoDe(datos)["oro-" + u.id]), nodos: nodos.length, hechos, desbloqueada: anteriorSuperada || r.vistas > 0 || hechos > 0 });
      anteriorSuperada = nivel >= 2 || !ids.length;
    }
    const sig = (act && out[act.unidad.materia - 1]) || out.find(e => e.total && !e.coronada);
    if (sig) sig.siguiente = true;
    return out;
  }

  // ---------- Logros ----------
  // Cada logro: id, grupo, título, descripción y una función que da [valor, meta] para mostrar el avance.
  const LOGROS = [
    { id: "dominadas-1", grupo: "Aprender", icono: "check", titulo: "Primera pregunta dominada", texto: "Acierta la misma pregunta dos veces seguidas.", avance: c => [c.g.dominada, 1] },
    { id: "dominadas-50", grupo: "Aprender", icono: "check", titulo: "50 preguntas dominadas", texto: "Domina 50 preguntas distintas.", avance: c => [c.g.dominada, 50] },
    { id: "dominadas-200", grupo: "Aprender", icono: "check", titulo: "200 preguntas dominadas", texto: "Domina 200 preguntas distintas.", avance: c => [c.g.dominada, 200] },
    { id: "dominadas-500", grupo: "Aprender", icono: "check", titulo: "500 preguntas dominadas", texto: "Domina 500 preguntas distintas.", avance: c => [c.g.dominada, 500] },
    { id: "superados-10", grupo: "Aprender", icono: "repetir", titulo: "Aprender del error", texto: "Domina 10 preguntas que habías fallado.", avance: c => [c.superados, 10] },
    { id: "superados-50", grupo: "Aprender", icono: "repetir", titulo: "Los fallos ya no se escapan", texto: "Domina 50 preguntas que habías fallado.", avance: c => [c.superados, 50] },
    { id: "materias-todas", grupo: "Temario", icono: "mapa", titulo: "Visión completa", texto: "Practica al menos una pregunta de cada una de las 16 materias.", avance: c => [c.tocadas, c.conPreguntas] },
    { id: "coronas-1", grupo: "Temario", icono: "corona", titulo: "Primera materia coronada", texto: "Domina el 80 % de las preguntas de una materia.", avance: c => [c.coronas, 1] },
    { id: "coronas-4", grupo: "Temario", icono: "corona", titulo: "Cuatro coronas", texto: "Corona 4 materias.", avance: c => [c.coronas, 4] },
    { id: "coronas-8", grupo: "Temario", icono: "corona", titulo: "Medio temario coronado", texto: "Corona 8 materias.", avance: c => [c.coronas, 8] },
    { id: "coronas-16", grupo: "Temario", icono: "corona", titulo: "Temario completo", texto: "Corona las 16 materias.", avance: c => [c.coronas, c.conPreguntas] },
    { id: "unidades-5", grupo: "Temario", icono: "mapa", titulo: "Cinco unidades superadas", texto: "Aprueba el test de paso de 5 unidades del camino.", avance: c => [c.unidades, 5] },
    { id: "cofres-5", grupo: "Temario", icono: "medalla", titulo: "Cinco cofres", texto: "Abre 5 cofres del camino.", avance: c => [c.cofres, 5] },
    { id: "legendaria-1", grupo: "Temario", icono: "corona", titulo: "Unidad legendaria", texto: "Supera el reto legendario de una unidad: 20 preguntas sin ningún fallo.", avance: c => [c.legendarias, 1] },
    { id: "legendaria-5", grupo: "Temario", icono: "corona", titulo: "Cinco unidades en oro", texto: "Consigue el oro en 5 unidades.", avance: c => [c.legendarias, 5] },
    { id: "aptos-1", grupo: "Examen", icono: "examen", titulo: "Primer apto", texto: "Aprueba un examen final.", avance: c => [c.aptos, 1] },
    { id: "perfecto", grupo: "Examen", icono: "trofeo", titulo: "Examen perfecto", texto: "Aprueba un examen final sin ningún fallo.", avance: c => [c.perfectos, 1] },
    { id: "seguidos-5", grupo: "Examen", icono: "examen", titulo: "Cinco aptos seguidos", texto: "Aprueba 5 exámenes finales seguidos.", avance: c => [c.mejorSerie, 5] },
    { id: "aptos-10", grupo: "Examen", icono: "trofeo", titulo: "10 exámenes aprobados", texto: "Aprueba 10 exámenes finales.", avance: c => [c.aptos, 10] },
    { id: "lista", grupo: "Examen", icono: "medalla", titulo: "Lista para el examen", texto: "Cumple los cuatro criterios de «Mi progreso».", avance: c => [c.criterios, 4] },
    { id: "racha-7", grupo: "Constancia", icono: "llama", titulo: "Una semana seguida", texto: "Estudia 7 días seguidos (el día de descanso no la rompe).", avance: c => [c.racha, 7] },
    { id: "racha-30", grupo: "Constancia", icono: "llama", titulo: "Un mes de constancia", texto: "Estudia 30 días seguidos.", avance: c => [c.racha, 30] },
  ];
  const POR_ID_LOGRO = new Map(LOGROS.map(l => [l.id, l]));

  function contexto(datos, todas, porMateria) {
    const prep = P.preparacion(datos, todas, porMateria), lg = logrosDe(datos);
    let superados = 0;
    for (const id of todas) { const r = datos.preguntas[id]; if (r && r.ko > 0 && P.estado(datos, id) === "dominada") superados++; }
    const exs = datos.historial.filter(r => r.total >= EXAMEN_MIN);
    let serie = 0, mejorSerie = 0;
    for (const r of exs) { serie = r.apto ? serie + 1 : 0; mejorSerie = Math.max(mejorSerie, serie); }
    const mats = Object.keys(porMateria), cm = Object.keys(caminoDe(datos));
    return {
      unidades: cm.filter(k => /^paso-/.test(k)).length, cofres: cm.filter(k => /^cofre-/.test(k)).length, legendarias: cm.filter(k => /^oro-/.test(k)).length,
      g: prep.global, superados, mejorSerie,
      aptos: exs.filter(r => r.apto).length, perfectos: exs.filter(r => r.apto && r.fallos === 0).length,
      conPreguntas: mats.length, tocadas: mats.filter(m => prep.materias[m].vistas > 0).length,
      coronas: Object.keys(lg).filter(k => /^corona-m\d+$/.test(k)).length,
      criterios: prep.criterios.filter(c => c.cumple).length, racha: P.rachaDetalle ? P.rachaDetalle(datos).dias : P.racha(datos),
    };
  }
  // Lista de logros con su estado, para pintar.
  function estadoLogros(datos, todas, porMateria) {
    const c = contexto(datos, todas, porMateria), lg = logrosDe(datos);
    return LOGROS.map(l => { const [v, m] = l.avance(c); return Object.assign({}, l, { valor: Math.min(v, m), meta: m, conseguido: lg[l.id] || 0 }); });
  }
  // Apunta coronas y logros nuevos. Devuelve lo nuevo, en orden (primero las coronas).
  function revisar(datos, todas, porMateria, ahora = Date.now()) {
    const lg = logrosDe(datos), nuevos = [];
    // Regla anterior (superar con el 60 % dominado): se respeta marcando hechos sus niveles y tests.
    construir();
    const cm = caminoDe(datos);
    for (const u of UNIDADES || []) {
      if (unidadSuperada(datos, u)) continue;
      const mat = P.resumen(datos, porMateria[u.materia] || []), uni = P.resumen(datos, u.ids);
      if (mat.dominio >= SUPERADA || uni.dominio >= SUPERADA) for (const x of u.nodos) if (!cm[x.clave]) cm[x.clave] = ahora;
    }
    for (const e of etapas(datos, porMateria)) {
      const k = "corona-m" + e.n;
      if (e.total && e.dominio >= CORONADA && !lg[k]) { lg[k] = ahora; nuevos.push({ tipo: "corona", materia: e.n }); }
    }
    const c = contexto(datos, todas, porMateria);
    for (const l of LOGROS) {
      if (lg[l.id]) continue;
      const [v, m] = l.avance(c);
      if (m > 0 && v >= m) { lg[l.id] = ahora; nuevos.push({ tipo: "logro", logro: l }); }
    }
    return nuevos;
  }

  // ---------- Pantallas (necesitan app.js) ----------
  const A = window.App;
  if (!A) return;
  const { h, ico, fila, grupo, cabecera, cifras, pantalla, plural } = A;
  const MATS = () => A.POR_MATERIA, TODAS = () => A.TODAS;
  const nombre = n => A.materia(n)[1];
  const pct = x => `${Math.floor(x * 100)} %`;

  function textoEtapa(e) {
    if (!e.total) return "Aún sin preguntas verificadas";
    if (e.legendaria) return `Legendaria: todas sus unidades en oro · ${pct(e.dominio)} dominado`;
    if (e.coronada) return e.bajo ? `Coronada · ha bajado al ${pct(e.dominio)}, repásala` : `Coronada · ${pct(e.dominio)} dominado`;
    if (e.nivel === 2) return `Superada · ${pct(e.dominio)} dominado, corónala con el 80 %`;
    if (e.nivel === 1) return `${e.superadas} de ${plural(e.unidades, "unidad superada", "unidades superadas")} · ${e.hechos}/${e.nodos} pasos`;
    return `${plural(e.unidades, "unidad", "unidades")} · ${plural(e.total, "pregunta", "preguntas")}`;
  }
  function claseEtapa(e) {
    return "etapa n" + e.nivel + (e.coronada ? " coronada" : "") + (e.siguiente ? " siguiente" : "") + (e.desbloqueada ? "" : " adelante") + (e.bajo ? " bajo" : "");
  }
  const reducido = () => (window.Animo && Animo.sinMovimiento && Animo.sinMovimiento()) || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sonar = (n, a) => { if (window.Animo) Animo.sonar(n, a); };

  // ---------- Preguntas de cada paso ----------
  const objs = ids => ids.map(id => A.POR_ID.get(id)).filter(Boolean);
  // ---------- Repaso escondido ----------
  // Modelo de olvido por pregunta (vida media): cada acierto seguido alarga lo que se tarda en olvidarla;
  // un fallo la deja en medio día. Probabilidad de recordarla = 2^(-días desde la última vez / vida media).
  const DIA_MS = 864e5;
  function vidaMedia(r) {
    const racha = (/1*$/.exec(r.h || "") || [""])[0].length;       // aciertos seguidos al final
    if (!racha) return 0.5;                                          // la última vez la falló
    const fiabilidad = (r.ok + 1) / (r.ok + r.ko + 2);               // las que ha fallado mucho se olvidan antes
    return Math.min(90, 0.75 * Math.pow(2.5, racha) * (0.5 + fiabilidad));
  }
  function riesgo(r, ahora) { return 1 - Math.pow(2, -Math.max(0, ahora - (r.t || 0)) / DIA_MS / vidaMedia(r)); }
  // Candidatas: preguntas ya vistas de cualquier unidad o materia menos la actual. Las de «Mis fallos» solo
  // si ya les toca (las que aún no, esperan a su día para no adelantar el repaso espaciado); las que tocan
  // van primero y, al acertarlas aquí, avanzan en «Mis fallos» igual que si se repasaran allí.
  // Lo respondido hace menos de una hora no vuelve en el siguiente nivel (ni otra pregunta con el mismo
  // esquema o foto: varias comparten dibujo y parecen repetidas). Los fallos siguen tocando hoy, pero más tarde.
  const RECIENTE_MS = 36e5;
  const reciente = (r, ahora) => !!r && ahora - (r.t || 0) < RECIENTE_MS;
  // Imagen que comparte con otras preguntas (las señales sueltas no cuentan: cada una tiene la suya).
  const imagenDe = p => { const s = p && p.imagen && p.imagen.src; return s && !/\/senales\//.test(s) ? s : null; };
  function imagenesRecientes(ahora) {
    const out = new Set();
    for (const [id, r] of Object.entries(A.datos.preguntas)) if (reciente(r, ahora)) { const s = imagenDe(A.POR_ID.get(id)); if (s) out.add(s); }
    return out;
  }
  function candidatasRepaso(u, ahora = Date.now()) {
    const d = A.datos, propias = new Set(u.ids), out = [], imgs = imagenesRecientes(ahora);
    for (const [id, r] of Object.entries(d.preguntas)) {
      if (propias.has(id) || !r || !r.h || !A.POR_ID.has(id)) continue;
      if (reciente(r, ahora) || imgs.has(imagenDe(A.POR_ID.get(id)))) continue;
      if (r.c > 0 && r.p > ahora) continue;
      const toca = r.c > 0;
      out.push({ p: A.POR_ID.get(id), toca, riesgo: toca ? 1 + riesgo(r, ahora) : riesgo(r, ahora) });
    }
    return out.sort((a, b) => b.riesgo - a.riesgo);
  }
  // Cuántas de repaso en un nivel de 10: 3 de normal; 4 o 5 si se acumula lo que está a punto de olvidarse
  // o lo que toca de «Mis fallos»; 1 o 2 si casi nada corre peligro.
  function cuantasRepaso(cands) {
    const urgentes = cands.filter(c => c.riesgo >= 0.5).length;
    if (urgentes >= 25) return 5;
    if (urgentes >= 10) return 4;
    if (urgentes >= 1) return 3;
    return Math.min(2, cands.filter(c => c.riesgo >= 0.2).length);
  }
  // Nivel: 10 preguntas de la unidad (primero las que aún no domina) más el repaso escondido, elegido por
  // riesgo de olvido y, entre las más urgentes, con preferencia por las de escena o imagen (App.priorizar).
  // De la unidad, por orden: fallos a los que ya toca volver, preguntas nuevas (con prioridad visual), las
  // vistas que aún no domina (las que hace más que no ve primero), las dominadas y, solo si no queda otra,
  // lo respondido en la última hora. Nunca dos con el mismo esquema o foto en el mismo nivel.
  function preguntasNivel(u, ahora = Date.now()) {
    const d = A.datos, reg = p => d.preguntas[p.id], est = p => P.estado(d, p.id);
    const cands = candidatasRepaso(u, ahora), k = cuantasRepaso(cands);
    const tocan = cands.filter(c => c.toca).slice(0, k).map(c => c.p);
    const resto = A.priorizar(cands.filter(c => !c.toca).slice(0, (k - tocan.length) * 2).map(c => c.p)).slice(0, k - tocan.length);
    const repaso = tocan.concat(resto);
    const imgs = imagenesRecientes(ahora), viejas = (a, b) => (reg(a).t || 0) - (reg(b).t || 0);
    const libres = [], recientes = [];
    for (const p of objs(u.ids)) (reciente(reg(p), ahora) || imgs.has(imagenDe(p)) ? recientes : libres).push(p);
    const orden = [
      ...libres.filter(p => est(p) === "repaso" && reg(p).p <= ahora).sort(viejas),
      ...A.priorizar(libres.filter(p => est(p) === "nueva")),
      ...libres.filter(p => est(p) === "vista" || (est(p) === "repaso" && reg(p).p > ahora)).sort(viejas),
      ...A.barajar(libres.filter(p => est(p) === "dominada")),
      ...recientes.sort((a, b) => ((reg(a) || {}).t || 0) - ((reg(b) || {}).t || 0)),
    ];
    const usadas = new Set(repaso.map(imagenDe).filter(Boolean)), propias = [], aparte = [];
    for (const p of orden) {
      const s = imagenDe(p);
      if (s && usadas.has(s)) { aparte.push(p); continue; }
      if (s) usadas.add(s);
      propias.push(p);
    }
    return A.barajar(propias.concat(aparte).slice(0, NIVEL_N - repaso.length).concat(repaso));
  }
  const preguntasPaso = u => A.barajar(objs(u.ids)).slice(0, PASO_N);
  const mezcla = (lista, u, nivel) => { try { return window.CaminoEjercicios ? CaminoEjercicios.mezclar(lista, u, nivel) : lista; } catch (e) { console.error(e); return lista; } };

  // Marca hechos varios nodos. Devuelve cuántos eran nuevos.
  function marcar(nodos) {
    const cm = caminoDe(A.datos), ahora = Date.now();
    let n = 0;
    for (const x of nodos) if (!cm[x.clave]) { cm[x.clave] = ahora; n++; }
    if (n) A.guardar();
    return n;
  }
  // Avance pendiente de animar la próxima vez que se abre el camino.
  let pendiente = null;
  function apuntarAvance(clave) { pendiente = clave; try { sessionStorage.setItem("testB.avance", clave); } catch (e) { /* sin almacenamiento */ } }
  function tomarAvance() {
    let c = pendiente; pendiente = null;
    try { c = c || sessionStorage.getItem("testB.avance"); sessionStorage.removeItem("testB.avance"); } catch (e) { /* sin almacenamiento */ }
    return c;
  }

  function tarjeta(tipo, icono, titulo, texto, boton) {
    return h("div", { class: "camino-tarjeta " + tipo },
      h("span", { class: "camino-tarjeta-sello" }, ico(icono)),
      h("span", { class: "camino-tarjeta-texto" }, h("strong", {}, titulo), h("span", {}, texto)),
      boton || null);
  }
  // El camino lanza la práctica sin cambiar de ruta (#/temario), así que hay que repintar a mano.
  const botonCamino = texto => h("a", { class: "boton ancho", href: "#/temario", onclick: () => setTimeout(A.repintar) }, texto);

  // Sin ningún fallo, el paso queda «perfecto» (en oro). Devuelve true si es la primera vez.
  function marcarPerfecto(x, fallos) {
    const cm = caminoDe(A.datos), k = "pf-" + x.clave;
    if (fallos || cm[k]) return false;
    cm[k] = Date.now(); A.guardar();
    return true;
  }
  function finNivel(x, s) {
    const u = x.unidad, hechas = Object.keys(s.resp).length, fallos = hechas - s.aciertos;
    if (hechas < s.lista.length) return tarjeta("neutro", "lista", "Nivel sin terminar", `Responde las ${s.lista.length} preguntas para completar el nivel.`);
    const nuevo = marcar([x]), pf = marcarPerfecto(x, fallos);
    if (nuevo) apuntarAvance(x.clave); else if (pf) apuntarAvance("pf-" + x.clave);
    if (!fallos) return tarjeta("oro", "medalla", nuevo || pf ? "¡Nivel perfecto!" : "Perfecto otra vez",
      `${u.titulo} · nivel ${x.i} de ${u.niveles}, sin un solo fallo.${nuevo || pf ? " Este nivel queda en oro en el camino." : ""}`,
      botonCamino(nuevo ? "Seguir por el camino" : pf ? "Ver mi nivel en oro" : "Volver al camino"));
    return tarjeta("ok", "check", nuevo ? "¡Nivel completado!" : "Nivel repasado",
      `${u.titulo} · nivel ${x.i} de ${u.niveles}. ${perfectoN(A.datos, x) ? "" : "Hazlo sin fallos y quedará en oro."}`, botonCamino(nuevo ? "Seguir por el camino" : "Volver al camino"));
  }
  function finPaso(x, s) {
    const u = x.unidad, hechas = Object.keys(s.resp).length, fallos = hechas - s.aciertos;
    if (hechas < s.lista.length) return tarjeta("neutro", "lista", "Test de paso sin terminar", `Para aprobarlo hay que responder las ${s.lista.length} preguntas.`);
    if (fallos > PASO_FALLOS) return tarjeta("ko", "repetir", `Esta vez no: ${plural(fallos, "fallo", "fallos")}`,
      `Para pasar se admiten ${PASO_FALLOS} como máximo, como en el examen. Tus fallos ya están en «Mis fallos»: repásalos y vuelve a intentarlo.`,
      h("button", { class: "boton ancho", onclick: () => empezarNodo(x) }, "Intentarlo otra vez"));
    const ya = hechoN(A.datos, x), pf = marcarPerfecto(x, fallos);
    // Aprobar el test de una unidad da por hechas sus etapas y las de las unidades anteriores de la misma materia («saltar aquí»).
    const antes = NODOS.filter(y => y.unidad.materia === u.materia && y.orden <= x.orden);
    marcar(antes);
    if (!ya) apuntarAvance(x.clave); else if (pf) apuntarAvance("pf-" + x.clave);
    return tarjeta("ok", "trofeo", ya ? "Test de paso aprobado otra vez" : "¡Test de paso aprobado!",
      `${plural(fallos, "fallo", "fallos")} de ${s.lista.length} preguntas. ${ya ? "" : `Has superado «${u.titulo}».`}`, botonCamino(ya ? "Volver al camino" : "Ver mi avance en el camino"));
  }
  // Lo que necesita un test del camino para terminar bien; ctx (la clave del nodo o la unidad) sirve para
  // retomarlo si se deja a medias (App.reanudable).
  const opNodo = x => ({ ctx: x.clave, alTerminar: s => x.tipo === "paso" ? finPaso(x, s) : finNivel(x, s), repetir: () => empezarNodo(x) });
  const opLegendario = u => ({ ctx: u.id, alTerminar: s => finLegendario(u, s), repetir: () => empezarLegendario(u) });
  function reanudableCamino() {
    const A = window.App;
    if (!A || !A.reanudable) return;
    const nodo = clave => { construir(); const x = (NODOS || []).find(y => y.clave === clave); return x ? opNodo(x) : null; };
    A.reanudable("nivel", nodo);
    A.reanudable("paso", nodo);
    A.reanudable("legendario", id => { construir(); const u = (UNIDADES || []).find(v => v.id === id); return u ? opLegendario(u) : null; });
  }
  function empezarNodo(x) {
    const u = x.unidad;
    // Con camino-ejercicios.js, parte del nivel son ejercicios que no son tipo test (mezcla según el nivel).
    if (x.tipo === "nivel") return A.practicar(mezcla(preguntasNivel(u), u, x.i), "nivel", `Nivel ${x.i} de ${u.niveles}`, "#/temario", opNodo(x));
    if (x.tipo === "paso") return A.practicar(preguntasPaso(u), "paso", "Test de paso", "#/temario", opNodo(x));
  }
  // Reto legendario: con la unidad superada, otras 20 preguntas de la unidad sin ningún fallo. La unidad pasa a oro.
  const legendaria = (datos, u) => !!caminoDe(datos)["oro-" + u.id];
  function empezarLegendario(u) {
    A.practicar(mezcla(preguntasPaso(u), u, "legendario"), "legendario", "Reto legendario", "#/temario", opLegendario(u));
  }
  function finLegendario(u, s) {
    const hechas = Object.keys(s.resp).length, fallos = hechas - s.aciertos;
    if (hechas < s.lista.length) return tarjeta("neutro", "lista", "Reto sin terminar", `Para conseguir el oro hay que responder las ${s.lista.length} preguntas sin fallar ninguna.`);
    if (fallos) return tarjeta("ko", "corona", `Casi: ${plural(fallos, "fallo", "fallos")}`, "El reto legendario no admite ningún fallo. Repasa esos fallos y vuelve a por el oro.",
      h("button", { class: "boton ancho", onclick: () => empezarLegendario(u) }, "Intentarlo otra vez"));
    const cm = caminoDe(A.datos), ya = !!cm["oro-" + u.id];
    if (!ya) { cm["oro-" + u.id] = Date.now(); A.guardar(); apuntarAvance("oro-" + u.id); }
    return tarjeta("oro", "corona", ya ? "Perfecto otra vez" : "¡Unidad legendaria!", `${s.lista.length} de ${s.lista.length} sin un solo fallo en «${u.titulo}».`, botonCamino(ya ? "Volver al camino" : "Ver mi unidad en oro"));
  }
  function abrirCofre(x) {
    if (!marcar([x])) return;
    const r = P.resumen(A.datos, x.unidad.ids);
    apuntarAvance(x.clave);
    pantallaCamino();
    const texto = r.dominada >= 5 ? `¡Cofre abierto! Ya dominas ${r.dominada} preguntas de esta unidad` : "¡Cofre abierto! Ya vas por la mitad de la unidad";
    setTimeout(() => { if (window.Animo) Animo.aviso(texto, "logro"); }, reducido() ? 0 : 900);
  }
  function tocarNodo(x) {
    sonar("toque");
    const act = nodoActual(A.datos), hecho = hechoN(A.datos, x), u = x.unidad;
    if (x.tipo === "cofre") {
      if (hecho) return A.hoja({ titulo: "Cofre ya abierto", mensaje: "Sigue avanzando: en cada unidad hay un cofre a mitad de camino.", cancelar: "Vale" });
      if (act && act.orden < x.orden) return A.hoja({ titulo: "Cofre cerrado", mensaje: "Completa los niveles anteriores de esta unidad para abrirlo.", cancelar: "Vale" });
      return abrirCofre(x);
    }
    if (x.tipo === "paso" && hecho) return A.hoja({ titulo: legendaria(A.datos, u) ? "Unidad legendaria" : "Unidad superada",
      mensaje: legendaria(A.datos, u) ? `Ya tienes el oro en «${u.titulo}». Puedes repetir el reto cuando quieras para repasar.`
        : `¿Vas a por el oro? El reto legendario son ${PASO_N} preguntas de «${u.titulo}» sin ningún fallo.`,
      acciones: [{ texto: "Reto legendario", clase: "ambar", accion: () => empezarLegendario(u) }, { texto: "Repetir el test de paso", clase: "gris", accion: () => empezarNodo(x) }] });
    if (hecho || !act || act.orden >= x.orden) return empezarNodo(x);
    if (x.tipo === "paso") return A.hoja({ titulo: "¿Saltar aquí?",
      mensaje: `Si ya sabes esta parte, haz el test de paso de «${u.titulo}»: ${PASO_N} preguntas y ${PASO_FALLOS} fallos como máximo. Si lo apruebas, se dan por hechas esta unidad y las anteriores de la materia ${u.materia}.`,
      acciones: [{ texto: "Hacer el test de paso", accion: () => empezarNodo(x) }] });
    return A.hoja({ titulo: "Este nivel va más adelante", mensaje: "Te recomendamos seguir el camino en orden, pero puedes hacerlo ya si quieres.",
      acciones: [{ texto: "Empezar igualmente", accion: () => empezarNodo(x) }] });
  }

  // ---------- Vista del camino ----------
  // La carretera entra en cada unidad por el centro, serpentea de lado a lado y sale por el centro hacia el
  // cartel de la unidad siguiente, así se ve como una sola ruta. La curva sigue el orden global de los pasos
  // para que cada unidad tenga un dibujo distinto.
  const FILA = 96, ENTRADA = 44, SALIDA = 64, TONOS = 8;
  const xNodo = orden => { const s = Math.sin((orden + .35) * 1.32); return Math.round(50 + (s < 0 ? -1 : 1) * (13 + 15 * Math.abs(s))); };
  const NS = "http://www.w3.org/2000/svg";
  const GEOM = new WeakMap(); // ol de cada unidad -> { xs, ys, svg }
  const COFRE = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path class="tapa" d="M4 10V8a3 3 0 013-3h10a3 3 0 013 3v2z"/><path d="M4 10h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M10.5 10v3h3v-3"/></svg>';
  // Adornos de la cuneta (decorativos): árbol, pino, cono, señal de peligro, hito kilométrico y señal redonda.
  const ADORNOS = [
    '<path class="a2" d="M11 14h2v7h-2z"/><circle class="a1" cx="12" cy="9" r="7"/>',
    '<path class="a2" d="M11 17h2v4h-2z"/><path class="a1" d="M12 2l6 8h-3l4 7H5l4-7H6z"/>',
    '<path class="a1" d="M10 4h4l4 14H6z"/><path class="a2" d="M4 18h16v3H4zM8.9 9h6.2l.9 3H8z"/>',
    '<path class="a2" d="M11 13h2v8h-2z"/><path class="a1" d="M12 2l8 13H4z"/><path class="a3" d="M12 6.2l4.4 7H7.6z"/>',
    '<path class="a1" d="M7 21V10a5 5 0 0110 0v11z"/><path class="a2" d="M7 10a5 5 0 0110 0v2H7z"/>',
    '<path class="a2" d="M11 13h2v8h-2z"/><circle class="a1" cx="12" cy="8" r="6.5"/><path class="a3" d="M8 6.8h8v2.4H8z"/>',
  ];
  function adorno(k, x, y) {
    const s = h("span", { class: "adorno", "aria-hidden": "true", style: `left:${x}%;top:${y}px` });
    s.innerHTML = `<svg viewBox="0 0 24 24">${ADORNOS[k % ADORNOS.length]}</svg>`;
    return s;
  }
  // Estrella rellena para los pasos hechos sin fallos.
  const ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.75 5.6 6.15.9-4.45 4.33 1.05 6.12L12 16.86l-5.5 2.9 1.05-6.12L3.1 9.3l6.15-.9z"/></svg>';
  const estrella = clase => { const s = h("span", { class: clase }); s.innerHTML = ESTRELLA; return s; };
  function iconoNodo(x, estado, pf) {
    if (x.tipo === "cofre") { const s = h("span", { class: "nodo-cofre" }); s.innerHTML = COFRE; return s; }
    if (x.tipo === "paso") return ico(legendaria(A.datos, x.unidad) ? "corona" : "trofeo");
    return estado === "hecho" ? (pf ? estrella("nodo-estrella") : ico("check")) : h("b", {}, x.i);
  }
  // Rótulo junto a cada paso: qué es y qué le espera.
  function rotulo(x, estado, oro, pf) {
    if (x.tipo === "cofre") return ["Cofre", estado === "hecho" ? "Abierto" : estado === "actual" ? "Tócalo para abrirlo" : "A mitad de la unidad"];
    if (x.tipo === "paso") return ["Test de paso", oro ? "Legendaria: sin fallos" : estado === "hecho" ? (pf ? "Sin fallos · ve a por el oro" : "Aprobado · ve a por el oro") : `${PASO_N} preguntas · máx. ${PASO_FALLOS} fallos`];
    return [`Nivel ${x.i}`, estado === "hecho" ? (pf ? "Perfecto: sin fallos" : "Completado") : `${NIVEL_N} preguntas`];
  }
  function tramo(xs, ys, i) { const ym = (ys[i - 1] + ys[i]) / 2; return [[xs[i - 1], ys[i - 1]], [xs[i - 1], ym], [xs[i], ym], [xs[i], ys[i]]]; }
  function bloqueUnidad(u, act, animar) {
    const d = A.datos, n = u.nodos.length, alto = ENTRADA + n * FILA + SALIDA;
    const xs = u.nodos.map(x => xNodo(x.orden)), ys = u.nodos.map((_, i) => ENTRADA + FILA / 2 + i * FILA);
    const hechos = u.nodos.map(x => hechoN(d, x)), perfectos = u.nodos.map(x => x.tipo !== "cofre" && hechoN(d, x) && perfectoN(d, x));
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 100 ${alto}`); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("class", "camino-via"); svg.setAttribute("aria-hidden", "true");
    const ruta = (desde, hasta, saltar, salida) => { // trazado de los tramos desde..hasta (índices de nodo), sin el tramo «saltar»
      let s = desde === 0 ? `M50 0 C50 ${ys[0] / 2} ${xs[0]} ${ys[0] / 2} ${xs[0]} ${ys[0]}` : `M${xs[desde]} ${ys[desde]}`;
      for (let i = Math.max(1, desde + 1); i <= hasta; i++) {
        const t = tramo(xs, ys, i);
        s += i === saltar ? ` M${t[3][0]} ${t[3][1]}` : ` C${t[1][0]} ${t[1][1]} ${t[2][0]} ${t[2][1]} ${t[3][0]} ${t[3][1]}`;
      }
      if (salida) { const ym = (ys[n - 1] + alto) / 2; s += ` C${xs[n - 1]} ${ym} 50 ${ym} 50 ${alto}`; }
      return s;
    };
    const capa = (cls, dd) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", dd); p.setAttribute("class", cls); p.setAttribute("vector-effect", "non-scaling-stroke"); svg.append(p); return p; };
    capa("arcen", ruta(0, n - 1, -1, true)); capa("asfalto", ruta(0, n - 1, -1, true));
    // Recorrido: hasta el último nodo hecho seguido desde el principio de la unidad (el tramo al siguiente también).
    let k = 0; while (k < n && hechos[k]) k++;
    const saltar = animar != null && animar + 1 < n ? animar + 1 : -1;
    if (k) capa("recorrido", ruta(0, Math.min(k, n - 1), saltar, k === n && animar == null));
    capa("linea", ruta(0, n - 1, -1, true));
    const caja = h("ol", { class: "camino", style: `height:${alto}px`, "aria-label": `Pasos de ${u.titulo}` });
    caja.append(svg);
    GEOM.set(caja, { xs, ys, svg });
    const oro = legendaria(d, u);
    u.nodos.forEach((x, i) => {
      const estado = hechos[i] ? "hecho" : act === x ? "actual" : act && act.orden < x.orden ? "bloqueado" : "pendiente";
      const nom = x.tipo === "nivel" ? `Nivel ${x.i} de ${u.niveles}` : x.tipo === "cofre" ? "Cofre" : "Test de paso";
      const pf = perfectos[i];
      const voz = `${nom} de ${u.titulo}. ${estado === "hecho" ? (pf ? "Hecho sin fallos" : "Hecho") : estado === "actual" ? "Siguiente paso" : estado === "bloqueado" ? "Más adelante" : "Pendiente"}`;
      const [t1, t2] = rotulo(x, estado, oro, pf);
      caja.append(h("li", { class: `nodo ${x.tipo} ${estado}${pf ? " perfecto" : ""} ${xs[i] > 50 ? "der" : "izq"}`, style: `--x:${xs[i]}%;--y:${ys[i]}px`, "data-clave": x.clave, "data-orden": x.orden, "data-i": i },
        estado === "actual" ? h("span", { class: "etapa-globo", "aria-hidden": "true" }, x.orden === 0 ? "Empieza aquí" : x.tipo === "cofre" ? "¡Ábrelo!" : x.tipo === "paso" ? "Test de paso" : "Sigue aquí") : null,
        h("button", { class: "nodo-boton", type: "button", "aria-label": voz, onclick: () => tocarNodo(x) }, h("span", { class: "nodo-disco" }, iconoNodo(x, estado, pf)), pf && x.tipo === "paso" && !oro ? estrella("nodo-sello") : null),
        h("span", { class: "nodo-texto", "aria-hidden": "true" }, h("strong", {}, t1), h("span", {}, t2))));
      // Un adorno en la cuneta, en el hueco entre dos pasos y del lado del paso anterior (su rótulo va al otro lado).
      if (i && (x.orden * 7 + u.materia) % 3 !== 0) caja.append(adorno(x.orden + u.materia, xs[i - 1] > 50 ? 95 : 5, (ys[i - 1] + ys[i]) / 2));
    });
    const hechosN = hechos.filter(Boolean).length, superada = hechos[n - 1];
    const enCurso = act && act.unidad === u;
    return h("section", { class: `unidad tono-${UNIDADES.indexOf(u) % TONOS}` + (oro ? " legendaria" : "") + (superada ? " superada" : enCurso ? " en-curso" : ""), "data-unidad": u.id },
      h("header", { class: "unidad-banner" },
        h("span", { class: "unidad-banner-num", "aria-hidden": "true" }, superada ? ico(oro ? "corona" : "check") : String(u.k)),
        h("span", { class: "unidad-banner-texto" },
          h("small", {}, u.de > 1 ? `Unidad ${u.k} de ${u.de}` : "Unidad única"),
          h("strong", {}, u.titulo),
          h("span", {}, oro ? "Legendaria: sin fallos" : superada ? "Superada · ve a por el oro en el test" : `${hechosN} de ${n} pasos · ${plural(u.ids.length, "pregunta", "preguntas")}`),
          h("span", { class: "unidad-pasos", "aria-hidden": "true" }, hechos.map((ok, i) => h("i", { class: (ok ? "ok" : "") + (perfectos[i] ? " pf" : "") + (u.nodos[i].tipo === "paso" ? " fin" : "") })))),
        enCurso && !superada ? h("span", { class: "unidad-banner-aqui" }, "Aquí") : null),
      caja);
  }
  function mapa(lista, animar) {
    construir();
    const act = nodoActual(A.datos), ruta = h("div", { class: "camino-ruta" }), caja = h("div", { class: "camino-unidades" }, ruta);
    const nAnim = animar ? NODOS.find(x => x.clave === animar) : null;
    let mat = 0, bloque = null;
    for (const u of UNIDADES) {
      if (u.materia !== mat) {
        mat = u.materia;
        const e = lista[mat - 1];
        const estado = e.legendaria ? " legendaria" : e.coronada ? " coronada" : e.nivel === 2 ? " superada" : "";
        bloque = h("div", { class: `materia-bloque tono-${UNIDADES.indexOf(u) % TONOS}${estado}`, "data-materia": mat },
          h("h2", { class: "materia-titulo" + estado },
            h("span", { class: "materia-num" }, e.legendaria || e.coronada ? ico("corona") : String(mat)),
            h("span", {}, h("small", {}, `Materia ${mat}`), h("strong", {}, nombre(mat)), h("span", {}, textoEtapa(e))),
            h("span", { class: "materia-avance", "aria-hidden": "true" }, h("i", { style: `width:${e.nodos ? Math.round(100 * e.hechos / e.nodos) : 0}%` }))));
        ruta.append(bloque);
      }
      bloque.append(bloqueUnidad(u, act, nAnim && nAnim.unidad === u ? u.nodos.indexOf(nAnim) : null));
    }
    const meta = lista.every(e => e.nivel >= 2 || !e.total);
    caja.append(h("div", { class: "camino-meta" + (meta ? " lograda" : "") },
      h("a", { class: "nodo-boton", href: "#/examen", "aria-label": "Meta: examen final" }, h("span", { class: "nodo-disco" }, ico("bandera"))),
      h("strong", {}, "Meta: examen final"),
      h("span", {}, "El simulacro real: 30 preguntas en 30 minutos")));
    return caja;
  }

  // ---------- Animación del avance ----------
  // Sello en el paso hecho, la carretera se pinta hasta el siguiente, este se abre con un pulso y el globo
  // «Sigue aquí» se desplaza. Con «reducir movimiento», solo el sonido y el estado final.
  function dibujarTramo(svg, pts, ms, listo) {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("class", "recorrido nuevo"); p.setAttribute("vector-effect", "non-scaling-stroke");
    svg.insertBefore(p, svg.querySelector(".linea"));
    const L = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const t0 = performance.now(), suave = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    (function paso(ahora) {
      const t = suave(Math.min(1, (ahora - t0) / ms));
      const [a, b, c, d] = pts, q1 = L(a, b, t), m = L(b, c, t), q2 = L(q1, m, t), r = L(m, L(c, d, t), t), q3 = L(q2, r, t);
      p.setAttribute("d", `M${a[0]} ${a[1]} C${q1[0]} ${q1[1]} ${q2[0]} ${q2[1]} ${q3[0]} ${q3[1]}`);
      if (t < 1) requestAnimationFrame(paso); else if (listo) listo();
    })(t0);
  }
  function verCentro(el, suave) {
    const r = el.getBoundingClientRect();
    if (r.top < 80 || r.bottom > innerHeight - 120) el.scrollIntoView({ block: "center", behavior: suave ? "smooth" : "auto" });
  }
  function animarAvance(raiz, clave) {
    if (clave.startsWith("pf-")) { // un paso ya hecho que ahora se ha hecho sin fallos: pasa a oro
      const o = raiz.querySelector(`.nodo[data-clave="${clave.slice(3)}"]`);
      if (!o) return;
      verCentro(o, false);
      sonar("aprobado");
      if (reducido()) return;
      o.classList.add("av-perfecto");
      setTimeout(() => { if (window.Animo) { Animo.confeti(70); Animo.vibrar(25); } }, 250);
      setTimeout(() => o.classList.remove("av-perfecto"), 1200);
      return;
    }
    if (clave.startsWith("oro-")) {
      const sec = raiz.querySelector(`.unidad[data-unidad="${clave.slice(4)}"]`);
      if (!sec) return;
      verCentro(sec, false);
      sonar("aprobado");
      if (reducido()) return;
      sec.classList.add("av-oro");
      setTimeout(() => { if (window.Animo) Animo.confeti(140); sonar("brillo"); }, 300);
      setTimeout(() => sec.classList.remove("av-oro"), 1600);
      return;
    }
    const o = raiz.querySelector(`.nodo[data-clave="${clave}"]`);
    if (!o) return;
    const d = raiz.querySelector(`.nodo[data-orden="${+o.dataset.orden + 1}"]`);
    const tipo = o.classList.contains("paso") ? "paso" : o.classList.contains("cofre") ? "cofre" : "nivel";
    const mismo = d && d.parentNode === o.parentNode;
    if (reducido()) {
      sonar(tipo === "paso" ? "aprobado" : "acierto");
      if (d) verCentro(d, false);
      return;
    }
    const globo = d && d.querySelector(".etapa-globo");
    o.classList.add("av-origen");
    if (d) d.classList.add("av-destino");
    if (globo) {
      globo.style.animation = "none";
      if (mismo) {
        const ancho = o.parentNode.clientWidth, g = GEOM.get(o.parentNode), io = +o.dataset.i, id = +d.dataset.i;
        globo.style.transform = `translate(calc(-50% + ${(g.xs[io] - g.xs[id]) / 100 * ancho}px), ${g.ys[io] - g.ys[id]}px)`;
      } else globo.style.opacity = "0";
    }
    verCentro(o, false);
    const T = [350, 1000];
    setTimeout(() => {
      // El sonido del sello sale cuando arranca de verdad su animación (si no llega, a los 120 ms).
      let sellado = false;
      const sellar = () => {
        if (sellado) return; sellado = true; o.removeEventListener("animationstart", alEmpezar);
        if (tipo === "paso") { sonar("aprobado"); if (window.Animo) Animo.confeti(120); }
        else if (tipo === "cofre") { sonar("meta"); if (window.Animo) Animo.confeti(60); }
        else sonar("acierto");
        if (window.Animo) Animo.vibrar(25);
      };
      const alEmpezar = e => { if (e.animationName === "av-sello" || e.animationName === "av-cofre") sellar(); };
      o.addEventListener("animationstart", alEmpezar);
      setTimeout(sellar, 120);
      o.classList.remove("av-origen"); o.classList.add("av-sello");
    }, T[0]);
    if (!d) return;
    const abrir = () => {
      d.classList.remove("av-destino"); d.classList.add("av-abre");
      sonar("abrir");
      if (globo) {
        sonar("globo");
        const fin = () => { globo.style.transform = ""; globo.style.animation = ""; globo.style.opacity = ""; };
        if (mismo && globo.animate) {
          const desde = globo.style.transform; globo.style.transform = "translateX(-50%)";
          globo.animate([{ transform: desde }, { transform: "translateX(-50%)" }], { duration: 600, easing: "cubic-bezier(.34,1.56,.64,1)" }).onfinish = fin;
        } else { globo.style.opacity = ""; globo.classList.add("av-globo-entra"); setTimeout(() => { globo.classList.remove("av-globo-entra"); fin(); }, 600); }
      }
      setTimeout(() => { o.classList.remove("av-sello"); d.classList.remove("av-abre"); }, 1200);
    };
    setTimeout(() => {
      verCentro(d, true);
      if (mismo) {
        const g = GEOM.get(o.parentNode);
        sonar("carretera", 0.65);
        dibujarTramo(g.svg, tramo(g.xs, g.ys, +d.dataset.i), 650, abrir);
      } else setTimeout(abrir, 650);
    }, T[1]);
  }

  function listaSimple(lista) {
    return grupo("con-icono mosaico", lista.map(e => fila({ numero: e.coronada || e.legendaria ? null : e.n, icono: e.coronada || e.legendaria ? "corona" : null,
      color: !e.total ? "gris" : e.coronada || e.legendaria ? "ambar" : e.nivel === 2 ? "verde" : e.siguiente ? "azul" : "indigo",
      titulo: nombre(e.n), detalle: `${e.siguiente ? "Siguiente etapa · " : ""}${textoEtapa(e)}`,
      accion: () => { location.hash = `#/temario/${e.n}`; }, deshabilitada: !e.total, chevron: !!e.total })));
  }
  let vista = "camino";
  try { vista = localStorage.getItem("testB.vistaTemario") === "lista" ? "lista" : "camino"; } catch (e) { /* sin almacenamiento */ }
  function pantallaCamino() {
    construir();
    const lista = etapas(A.datos, MATS()), coronas = lista.filter(e => e.coronada).length;
    const unidadesOk = UNIDADES.filter(u => unidadSuperada(A.datos, u)).length, pasos = NODOS.filter(x => hechoN(A.datos, x)).length;
    const cuerpo = h("div", {});
    let animar = tomarAvance();
    const pintar = () => {
      cuerpo.replaceChildren(vista === "lista" ? listaSimple(lista) : mapa(lista, animar));
      try { localStorage.setItem("testB.vistaTemario", vista); } catch (e) { /* sin almacenamiento */ }
    };
    pantalla({ titulo: "Temario", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Temario"),
      h("p", { class: "subtitulo" }, `Tu camino por las 16 materias, en ${UNIDADES.length} unidades. Cada nivel son ${NIVEL_N} preguntas, entre ellas unas pocas de repaso de lo que ya has visto, elegidas por riesgo de olvido, y cada unidad termina con un test de paso: ${PASO_N} preguntas, ${PASO_FALLOS} fallos como máximo, como en el examen. Si ya dominas una parte, puedes saltar a su test de paso. Es una guía: puedes practicar cualquier materia cuando quieras.`),
      cifras([`${pasos}/${NODOS.length}`, "Pasos"], [`${unidadesOk}/${UNIDADES.length}`, "Unidades"], [`${coronas}/16`, "Coronas"]),
      A.segmentos([["camino", "Camino"], ["lista", "Lista"]], vista, v => { vista = v; animar = null; pintar(); }),
      cuerpo,
      h("p", { class: "nota-pie" }, "Materias según el Reglamento General de Conductores (RD 818/2009), anexo V.B.1. Una materia se corona al dominar el 80 % de sus preguntas: una pregunta está dominada cuando aciertas las dos últimas veces que la respondes y no está en el repaso de fallos."));
    pintar();
    if (vista !== "camino") return;
    requestAnimationFrame(() => {
      if (animar) return animarAvance(cuerpo, animar);
      const el = cuerpo.querySelector(".nodo.actual");
      if (el) verCentro(el, false);
    });
  }
  // Portada de una materia: la de siempre, con su avance en el camino y un botón para seguir.
  function guiaMateria(n) {
    A.pantallas.portadaMateria(n);
    construir();
    const lista = etapas(A.datos, MATS()), e = lista[n - 1];
    if (!e || !e.total) return;
    const sub = document.querySelector("#app .subtitulo");
    if (!sub) return;
    const sig = NODOS.find(x => x.unidad.materia === n && !hechoN(A.datos, x) && x.tipo !== "cofre");
    const texto = e.coronada ? (e.bajo ? `Dominas el ${pct(e.dominio)}. Repásala para volver al 80 %.` : `Dominas el ${pct(e.dominio)} de sus preguntas.`)
      : e.nivel === 2 ? `Todas sus unidades superadas. Dominas el ${pct(e.dominio)}; corónala con el 80 %.`
      : `${e.superadas} de ${plural(e.unidades, "unidad superada", "unidades superadas")}. ${sig ? `Siguiente: ${sig.tipo === "paso" ? "test de paso" : `nivel ${sig.i}`} de «${sig.unidad.titulo}», ${sig.tipo === "paso" ? `${PASO_N} preguntas` : `${NIVEL_N} preguntas`}.` : ""}`;
    sub.after(h("div", { class: "guia-etapa " + claseEtapa(e) },
      h("span", { class: "etapa-disco mini" }, e.coronada ? ico("corona") : h("b", {}, n)),
      h("span", {}, h("strong", {}, e.coronada ? (e.bajo ? "Coronada, pero ha bajado" : "Materia coronada") : e.nivel === 2 ? "Materia superada" : "Tu camino en esta materia"),
        h("span", {}, texto),
        sig && e.nivel < 2 ? h("span", { class: "guia-acciones" },
          h("button", { class: "boton pequeno", onclick: () => empezarNodo(sig) }, sig.tipo === "paso" ? "Hacer el test de paso" : `Empezar nivel ${sig.i}`),
          h("a", { class: "enlace", href: "#/temario" }, "Ver el camino")) : null)));
  }

  // ---------- Pantalla de logros ----------
  function tarjetaLogro(l) {
    const hecho = !!l.conseguido, avance = l.meta ? l.valor / l.meta : 0;
    return h("li", { class: "logro" + (hecho ? " conseguido" : "") },
      h("span", { class: "logro-sello" }, ico(l.icono)),
      h("span", { class: "logro-cuerpo" },
        h("strong", {}, l.titulo), h("span", {}, l.texto),
        hecho ? h("small", {}, `Conseguido el ${new Date(l.conseguido).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`)
          : h("span", { class: "logro-avance" },
            h("span", { class: "progreso", role: "progressbar", "aria-label": l.titulo, "aria-valuemin": 0, "aria-valuemax": l.meta, "aria-valuenow": l.valor }, h("i", { style: `width:${Math.round(avance * 100)}%` })),
            h("small", {}, `${l.valor}/${l.meta}`))));
  }
  function pantallaLogros() {
    const ls = estadoLogros(A.datos, TODAS(), MATS()), n = ls.filter(l => l.conseguido).length;
    const grupos = [...new Set(ls.map(l => l.grupo))];
    pantalla({ titulo: "Logros", atras: { texto: "Inicio", href: "#/" } },
      h("h1", { class: "titulo-grande" }, "Logros"),
      h("p", { class: "subtitulo" }, "Premian lo que aprendes: preguntas dominadas, fallos superados, materias coronadas y exámenes aprobados. Una vez conseguidos, son tuyos."),
      cifras([`${n}/${ls.length}`, "Conseguidos"], [String(Object.keys(logrosDe(A.datos)).filter(k => /^corona-m/.test(k)).length), "Coronas"], [String(contexto(A.datos, TODAS(), MATS()).superados), "Fallos superados"]),
      grupos.map(g => [cabecera(g), h("ul", { class: "logros" }, ls.filter(l => l.grupo === g).sort((a, b) => (!!b.conseguido) - (!!a.conseguido)).map(tarjetaLogro))]));
  }

  // ---------- Portada: resumen del camino y de los logros ----------
  // ---------- Celebraciones ----------
  let cola = [], celebrando = false;
  function celebrar(nuevos) {
    if (window.Celebracion && Celebracion.abierta) return; // la celebración de fin de lección ya los enseña
    cola.push(...nuevos);
    if (celebrando) return;
    celebrando = true;
    (function siguiente() {
      const x = cola.shift();
      if (!x) { celebrando = false; return; }
      if (window.Animo) {
        if (x.tipo === "corona") { Animo.sonar("aprobado"); Animo.confeti(140); Animo.aviso(`¡Materia ${x.materia} coronada!`, "corona"); }
        else { Animo.sonar("meta"); if (/^(coronas-16|lista|aptos-10|perfecto)$/.test(x.logro.id)) Animo.confeti(); Animo.aviso(`Logro: ${x.logro.titulo}`, "logro"); }
      }
      setTimeout(siguiente, 2300);
    })();
  }
  // Revisa tras responder o corregir. silencio: apunta sin celebrar (al abrir la web o al llegar progreso de otro dispositivo).
  function comprobar(silencio, retraso = 1100) {
    const nuevos = revisar(A.datos, TODAS(), MATS());
    if (!nuevos.length) return;
    A.guardar();
    if (!silencio) setTimeout(() => celebrar(nuevos), retraso);
  }
  window.addEventListener("respuesta", e => { if (e.detail && e.detail.modo !== "examen") comprobar(false); });
  window.addEventListener("examen-corregido", () => comprobar(false, 1300));
  window.addEventListener("progreso-nube", () => setTimeout(() => comprobar(true)));
  comprobar(true);

  A.ruta("temario", partes => { if (partes.length) guiaMateria(Number(partes[0])); else pantallaCamino(); });
  A.ruta("logros", () => pantallaLogros());
  reanudableCamino();
  A.lateralExtra({ id: "logros", href: "#/logros", icono: "medalla", color: "verde", texto: "Logros" });

  window.Camino = { SUPERADA, CORONADA, LOGROS, etapas, construir, get UNIDADES() { construir(); return UNIDADES; }, get NODOS() { construir(); return NODOS; }, nodoActual, hecho: hechoN, legendaria, empezarNodo, NIVEL_N, PASO_N, PASO_FALLOS, animarAvance, estadoLogros, revisar, normalizarLogros, combinarLogros, contexto, POR_ID_LOGRO };
})();
