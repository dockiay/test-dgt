/* Ejercicios del camino que no son tipo test (cifra, tocar, ordenar, emparejar, clasificar, caza el error,
   ¿y si…?, completar y «Piénsala antes»), mezclados con el tipo test en los niveles del camino.
   - Datos: data/ejercicios.js (GENERADO por tools/build_ejercicios.js desde prototipos/). Motores en ejercicios/.
   - Escalones de dificultad: 1 reconocer (emparejar, clasificar, tocar en un esquema), 2 recordar (completar, cifra,
     ordenar, caza el error) y 3 aplicar (¿y si…?, tocar en una escena animada, «Piénsala antes»).
   - Mezcla de los 7 sitios de la unidad en cada nivel (los 3 de repaso escondido no cambian):
       primer nivel: 3 de reconocer · intermedios: 2 de recordar y 1 «Piénsala antes» ·
       último nivel: 2 de aplicar y 2 «Piénsala antes». Reto legendario: 8 de recordar o aplicar de 20.
     El test de paso y los simulacros siguen siendo tipo test, como el examen.
   - Si una unidad no tiene ejercicios del escalón, se prueba el siguiente; si no hay, queda tipo test.
   - Un ejercicio no va en el mismo nivel que la pregunta del banco de la que sale; los ejercicios ya hechos en la
     última hora no vuelven; los fallados vuelven antes que los nuevos y los acertados, los últimos.
   - Progreso: datos.ejercicios {id: {t, ok}}. «Piénsala antes» es la misma pregunta del banco y cuenta como respuesta
     suya. En los demás, un fallo pone en repaso la pregunta de la que sale (si sale de una sola); un acierto no la da
     por dominada: el dominio se sigue midiendo con tipo test. */
(function () {
  "use strict";
  const A = window.App, P = window.Progreso, E = window.Ejercicios, R = window.Recordar;
  if (!A || !P || !E || !Array.isArray(window.EJERCICIOS_CAMINO)) return;
  const HORA = 3600 * 1000;

  // ---------- Datos: datos.ejercicios ----------
  function normalizar(v) {
    const n = {};
    for (const [id, x] of Object.entries(v && typeof v === "object" ? v : {}))
      if (/^[\w.-]{1,80}$/.test(id) && x && +x.t > 0) n[id] = { t: +x.t, ok: x.ok ? 1 : 0 };
    return n;
  }
  function combinar(a, b) {
    a = normalizar(a); b = normalizar(b);
    const n = Object.assign({}, b);
    for (const [id, x] of Object.entries(a)) if (!n[id] || x.t >= n[id].t) n[id] = x;
    return n;
  }
  P.extender("ejercicios", { vacio: () => ({}), normalizar, combinar });
  const hechos = () => { const d = A.datos; return d.ejercicios && typeof d.ejercicios === "object" ? d.ejercicios : (d.ejercicios = {}); };

  // ---------- Catálogo ----------
  const LISTA = window.EJERCICIOS_CAMINO.filter(e => E.TIPOS[e.tipo] && e.fuente && e.fuente.url);
  const POR_ID = new Map(LISTA.map(e => [e.id, e]));
  const PIENSA = new Set((window.PIENSA_IDS || []).filter(id => A.POR_ID.has(id)));
  const DE_RECORDAR = new Set(Object.keys((R && R.TIPOS) || {}));
  function escalon(e) {
    if (e.tipo === "tocar") return e.escena ? 3 : 1;
    return { emparejar: 1, clasificar: 1, completar: 2, cifra: 2, ordenar: 2, error: 2, ysi: 3, piensa: 3 }[e.tipo] || 2;
  }
  // Unidad de cada ejercicio: la de la mayoría de sus preguntas del banco o, si no sale de ninguna, la que dice el dato.
  let POR_UNIDAD = null;
  function indexar() {
    if (POR_UNIDAD) return POR_UNIDAD;
    const C = window.Camino, us = (C && C.UNIDADES) || [], de = new Map();
    for (const u of us) for (const id of u.ids) de.set(id, u.id);
    POR_UNIDAD = {};
    for (const e of LISTA) {
      const votos = {};
      for (const id of e.de || []) if (de.has(id)) votos[de.get(id)] = (votos[de.get(id)] || 0) + 1;
      const u = Object.keys(votos).sort((x, y) => votos[y] - votos[x])[0] || e.uCamino;
      if (u) (POR_UNIDAD[u] = POR_UNIDAD[u] || []).push(e);
    }
    return POR_UNIDAD;
  }

  // ---------- Elementos para App.practicar ----------
  function cabecera(e) {
    const t = E.TIPOS[e.tipo], color = DE_RECORDAR.has(e.tipo) ? R.TIPOS[e.tipo].color : "t-" + e.tipo;
    return [h("p", { class: "tipo-chip " + color }, E.ico(t.icono), t.nombre), h("p", { class: "enunciado" }, e.enunciado)];
  }
  const h = A.h;
  const explicar = (e, r) => (DE_RECORDAR.has(e.tipo) ? R.explicacion(e, r) : E.explicacion(e, r));
  function anotar(e, ok) {
    hechos()[e.id] = { t: Date.now(), ok: ok ? 1 : 0 };
    const de = (e.de || []).filter(id => A.POR_ID.has(id));
    if (!ok && de.length === 1) A.registrar(A.POR_ID.get(de[0]), false); else A.guardar();
  }
  function item(e) {
    return { id: "ej-" + e.id, materia: e.materia, enunciado: e.enunciado, correcta: "a", tipoEj: e.tipo, de: e.de || [],
      ej: { crear: op => E.crear(e, op), cabecera: () => cabecera(e), explicar: r => explicar(e, r), alResponder: ok => anotar(e, ok) } };
  }
  // «Piénsala antes»: la pregunta del banco con las opciones tapadas hasta decir si se sabe.
  function piensa(q) {
    const e = { id: "piensa-" + q.id, tipo: "piensa", materia: q.materia, enunciado: q.enunciado, opciones: ["a", "b", "c"].map(k => q.opciones[k]),
      correcta: "abc".indexOf(q.correcta), porque: q.explicacion, fuente: q.fuente, imagen: q.imagen || null, de: [q.id] };
    return { id: "pz-" + q.id, materia: q.materia, enunciado: q.enunciado, correcta: "a", tipoEj: "piensa", de: [q.id],
      ej: { crear: op => E.crear(e, op), cabecera: () => cabecera(e), explicar: r => explicar(e, r), alResponder: ok => A.registrar(q, ok) } };
  }
  // Para retomar un test a medias.
  A.items(id => {
    let m = /^ej-(.+)$/.exec(id);
    if (m && POR_ID.has(m[1])) return item(POR_ID.get(m[1]));
    m = /^pz-(.+)$/.exec(id);
    if (m && A.POR_ID.has(m[1]) && E.TIPOS.piensa) return piensa(A.POR_ID.get(m[1]));
    return null;
  });

  // ---------- Mezcla ----------
  const PLAN = {
    primero: { nuevos: 3, escalones: [1, 2], piensa: 0 },
    medio: { nuevos: 2, escalones: [2, 1, 3], piensa: 1 },
    ultimo: { nuevos: 2, escalones: [3, 2], piensa: 2 },
    legendario: { nuevos: 6, escalones: [3, 2], piensa: 2 },
  };
  // Fallados primero (los más antiguos antes), luego los que no se han hecho nunca y por último los acertados.
  function ordenar(lista, ahora) {
    const d = hechos();
    return A.barajar(lista).filter(e => !(d[e.id] && ahora - d[e.id].t < HORA))
      .map(e => [d[e.id] ? (d[e.id].ok ? 2 : 0) + d[e.id].t / 1e14 : 1, e]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  }
  // Reparte los ejercicios entre las preguntas tipo test, sin que el nivel empiece o acabe con uno.
  function intercalar(test, nuevos) {
    const n = test.length + nuevos.length, sitios = new Set(nuevos.map((_, k) => Math.min(n - 2, Math.max(1, Math.round((k + 1) * n / (nuevos.length + 1))))));
    while (sitios.size < nuevos.length) { for (let i = 1; i < n - 1 && sitios.size < nuevos.length; i++) sitios.add(i); }
    const fuera = [], t = test.slice(), x = nuevos.slice();
    for (let i = 0; i < n; i++) fuera.push(sitios.has(i) && x.length ? x.shift() : t.length ? t.shift() : x.shift());
    return fuera;
  }
  function mezclar(lista, u, nivel) {
    if (!u) return lista;
    const plan = nivel === "legendario" ? PLAN.legendario : nivel === 1 ? PLAN.primero : nivel >= u.niveles ? PLAN.ultimo : PLAN.medio;
    const ahora = Date.now(), ids = new Set(u.ids);
    const propias = lista.filter(p => ids.has(p.id)), repaso = lista.filter(p => !ids.has(p.id));
    const enRepaso = new Set(repaso.map(p => p.id)), elegidos = [];
    const cands = (indexar()[u.id] || []);
    // Ejercicios, por escalones, cada uno en lugar de una pregunta tipo test de la unidad.
    for (const esc of plan.escalones) {
      if (elegidos.length >= plan.nuevos) break;
      // Primero uno de cada tipo, para que el nivel no repita tipo si hay donde elegir.
      const orden = ordenar(cands.filter(c => escalon(c) === esc), ahora), vistos = new Set();
      const primeros = orden.filter(e => !vistos.has(e.tipo) && vistos.add(e.tipo));
      for (const e of primeros.concat(orden.filter(e => !primeros.includes(e)))) {
        if (elegidos.length >= plan.nuevos || propias.length <= 2) break;
        // Ni con una pregunta de la que sale en el repaso, ni con dos de la unidad (el nivel se quedaría corto).
        if ((e.de || []).some(id => enRepaso.has(id)) || propias.filter(p => (e.de || []).includes(p.id)).length > 1) continue;
        // Si sale de una pregunta que estaba en el nivel, va en su lugar; si no, sustituye a la última de la unidad.
        const k = propias.findIndex(p => (e.de || []).includes(p.id));
        propias.splice(k >= 0 ? k : propias.length - 1, 1);
        elegidos.push(item(e));
      }
    }
    // Faltan ejercicios en el legendario: más «Piénsala antes».
    const npiensa = plan.piensa + (nivel === "legendario" ? plan.nuevos - elegidos.length : 0);
    const usados = new Set(elegidos.flatMap(x => x.de));
    const aPensar = propias.filter(p => PIENSA.has(p.id) && !usados.has(p.id))
      .sort((p, q) => (P.estado(A.datos, p.id) === "nueva") - (P.estado(A.datos, q.id) === "nueva")).slice(0, E.TIPOS.piensa ? npiensa : 0);
    const pensadas = new Set(aPensar.map(p => p.id));
    const test = A.barajar(propias.filter(p => !pensadas.has(p.id)).concat(repaso));
    return intercalar(test, A.barajar(elegidos.concat(aPensar.map(piensa))));
  }

  window.CaminoEjercicios = { mezclar, escalon, PLAN, get POR_UNIDAD() { return indexar(); }, LISTA, PIENSA, item, piensa };
})();
