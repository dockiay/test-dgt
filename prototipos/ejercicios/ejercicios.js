/* Prototipo: ejercicios del camino que no son tipo test (cifra, tocar, ordenar, emparejar).
   Ejercicios.crear(ej, { cambio(listo), fin(resultado) }) devuelve { nodo, comprobar(), soltar() }:
   - cambio(true|false): si ya se puede pulsar «Comprobar».
   - comprobar(): corrige, bloquea y devuelve { ok, tuya, correcta }.
   - fin(resultado): solo «emparejar», que se corrige sola al terminar.
   No depende de app.js; usa Animo (animo.js) para sonidos si está cargado. */
(function () {
  "use strict";
  const ICONOS = {
    check: "M5 12.5l4.5 4.5L19 7.5", x: "M6.5 6.5l11 11M17.5 6.5l-11 11",
    libro: "M4 5.5c2.7-1.3 5.5-1.1 8 .7 2.5-1.8 5.3-2 8-.7V19c-2.7-1.3-5.5-1.1-8 .7-2.5-1.8-5.3-2-8-.7zM12 6.2v13.5",
    enlace: "M14 5h5v5M19 5l-8 8M10 6.5H5.5v12h12V14",
    bombilla: "M9.5 18h5M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z",
    borrar: "M9 5.5h10.5v13H9L3.5 12zM12 9.5l5 5M17 9.5l-5 5",
    teclado: "M3.5 6.5h17v11h-17zM7 10h.1M10.5 10h.1M14 10h.1M17.5 10h.1M7.5 14h9",
    dedo: "M9.5 11V5a1.5 1.5 0 013 0v5.5M12.5 10V9a1.5 1.5 0 013 0v2M15.5 10.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-1a6 6 0 01-4.8-2.4L4 15.5a1.6 1.6 0 012.5-2l3 3",
    ordenar: "M8 6h11M8 12h11M8 18h11M4 5.5v1M4 11.5v1M4 17.5v1",
    parejas: "M4 7h6M4 17h6M14 7h6M14 17h6M10 7l4 10M10 17l4-10",
    cerrar: "M6.5 6.5l11 11M17.5 6.5l-11 11",
  };
  function ico(nombre, clase) {
    const NS = "http://www.w3.org/2000/svg", s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "ico" + (clase ? " " + clase : "")); s.setAttribute("aria-hidden", "true");
    const p = document.createElementNS(NS, "path"); p.setAttribute("d", ICONOS[nombre]); s.append(p);
    return s;
  }
  function h(tag, attrs, ...hijos) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else if (k === "html") e.innerHTML = v;
      else e.setAttribute(k, v === true ? "" : v);
    }
    for (const c of hijos.flat(Infinity)) if (c != null && c !== false) e.append(c.nodeType ? c : String(c));
    return e;
  }
  const sonar = (n, a) => window.Animo && Animo.sonar(n, a);
  const vibrar = p => window.Animo && Animo.vibrar && Animo.vibrar(p);
  const sinMovimiento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  function barajar(lista, distintoDe) {
    for (let n = 0; n < 20; n++) {
      const a = lista.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      if (!distintoDe || a.some((x, i) => x !== distintoDe[i])) return a;
    }
    return lista.slice().reverse();
  }
  const cifraES = n => String(n).replace(".", ",");
  // Reinicia una animación CSS aunque la clase ya estuviera puesta.
  function animar(el, clase) { el.classList.remove(clase); void el.offsetWidth; el.classList.add(clase); }

  const TIPOS = {
    cifra: { nombre: "Escribe la cifra", icono: "teclado" },
    tocar: { nombre: "Toca en la imagen", icono: "dedo" },
    ordenar: { nombre: "Ordena los pasos", icono: "ordenar" },
    emparejar: { nombre: "Empareja", icono: "parejas" },
  };

  // ---------- Escribir la cifra: teclado numérico propio (no tapa la pantalla) y teclado físico ----------
  function cifra(ej, op) {
    let valor = "", bloqueado = false;
    const texto = h("span", { class: "cifra-valor" });
    const caja = h("div", { class: "cifra-caja", role: "textbox", "aria-label": `Respuesta en ${ej.unidad}`, "aria-live": "polite" },
      texto, h("span", { class: "cifra-cursor", "aria-hidden": "true" }), h("span", { class: "cifra-unidad" }, ej.unidad));
    const pintar = () => {
      texto.textContent = valor || "";
      caja.classList.toggle("vacia", !valor);
      caja.setAttribute("aria-label", `Respuesta: ${valor || "vacía"} ${ej.unidad}`);
      op.cambio(/\d/.test(valor));
    };
    function tecla(t) {
      if (bloqueado) return;
      if (t === "⌫") valor = valor.slice(0, -1);
      else if (t === ",") { if (!valor.includes(",")) valor = (valor || "0") + ","; }
      else if (valor.replace(",", "").length < 5) valor = valor === "0" ? t : valor + t;
      sonar("toque"); animar(caja, "latido-cifra"); pintar();
    }
    const teclas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "⌫"];
    const teclado = h("div", { class: "teclado", role: "group", "aria-label": "Teclado numérico" }, teclas.map(t =>
      h("button", { type: "button", class: "tecla" + (t === "⌫" ? " tecla-borrar" : t === "," ? " tecla-coma" : ""),
        "aria-label": t === "⌫" ? "Borrar" : t === "," ? "Coma decimal" : t, onclick: () => tecla(t) },
        t === "⌫" ? ico("borrar") : t)));
    const alTeclear = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[0-9]$/.test(e.key)) tecla(e.key);
      else if (e.key === "," || e.key === ".") tecla(",");
      else if (e.key === "Backspace") tecla("⌫");
      else return;
      e.preventDefault();
    };
    document.addEventListener("keydown", alTeclear);
    pintar();
    return {
      nodo: h("div", { class: "ej-cifra" }, caja, teclado),
      comprobar() {
        bloqueado = true; teclado.querySelectorAll("button").forEach(b => (b.disabled = true));
        const n = Number(valor.replace(",", "."));
        const ok = Math.abs(n - ej.respuesta) < 1e-9;
        caja.classList.add(ok ? "bien" : "mal");
        if (!ok) caja.append(h("span", { class: "cifra-buena" }, ico("check"), `${cifraES(ej.respuesta)} ${ej.unidad}`));
        return { ok, tuya: `${valor} ${ej.unidad}`, correcta: `${cifraES(ej.respuesta)} ${ej.unidad}` };
      },
      soltar() { document.removeEventListener("keydown", alTeclear); },
    };
  }

  // Esquema SVG de esquemas.js. `vista` recorta el dibujo (x, y, ancho, alto en unidades del viewBox) para ampliar lo que importa.
  function esquema(ej) {
    const [vx, vy, vw, vh] = ej.vista || [0, 0, 400, 400];
    const lienzo = h("div", { class: "ej-lienzo", html: (window.ESQUEMAS_EJERCICIOS || {})[ej.esquema] || "" });
    const dibujo = lienzo.querySelector("svg");
    if (dibujo) dibujo.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
    return h("div", { class: "figura ej-tocar", style: `aspect-ratio:${vw}/${vh}` }, lienzo);
  }
  const rutaImagen = src => (window.IMAGENES_EMBEBIDAS || {})[src] || "../../" + src;

  // ---------- Tocar en la imagen: zonas encima del esquema (botones reales, accesibles con teclado) ----------
  function tocar(ej, op) {
    let elegida = null;
    const [vx, vy, vw, vh] = ej.vista || [0, 0, 400, 400];
    const fig = esquema(ej);
    const px = v => ((v - vx) / vw * 100) + "%", py = v => ((v - vy) / vh * 100) + "%";
    const zonas = ej.zonas.map((z, i) => {
      const caja = z.forma === "circulo" ? { left: z.x - z.r, top: z.y - z.r, w: 2 * z.r, hh: 2 * z.r } : { left: z.x, top: Math.max(z.y, vy), w: z.w, hh: Math.min(z.y + z.h, vy + vh) - Math.max(z.y, vy) }; // franja y caja
      const b = h("button", { type: "button", class: "zona zona-" + z.forma, "aria-pressed": "false", "aria-label": z.etiqueta,
        style: `left:${px(caja.left)};top:${py(caja.top)};width:${caja.w / vw * 100}%;height:${caja.hh / vh * 100}%`,
        onclick: () => {
          if (b.disabled) return;
          elegida = z.id; sonar("toque");
          botones.forEach(o => o.setAttribute("aria-pressed", String(o === b)));
          animar(b, "pulsada"); op.cambio(true);
        } }, z.forma === "franja" ? h("span", { class: "zona-num", "aria-hidden": "true" }, i + 1) : null);
      return b;
    });
    const botones = zonas;
    fig.append(...zonas);
    op.cambio(false);
    return {
      nodo: fig,
      comprobar() {
        const ok = elegida === ej.correcta;
        ej.zonas.forEach((z, i) => {
          const b = botones[i]; b.disabled = true;
          if (z.id === ej.correcta) b.classList.add("correcta");
          else if (z.id === elegida) b.classList.add("incorrecta");
        });
        const et = id => (ej.zonas.find(z => z.id === id) || {}).etiqueta;
        return { ok, tuya: et(elegida), correcta: ej.textoCorrecta || et(ej.correcta) };
      },
      soltar() {},
    };
  }

  // ---------- Ordenar: tocar fichas del banco para colocarlas en los huecos (sin arrastrar) ----------
  function ordenar(ej, op) {
    const n = ej.pasos.length;
    const orden = barajar(ej.pasos.map((_, i) => i), ej.pasos.map((_, i) => i));
    const colocadas = Array(n).fill(null); // índice del paso en cada hueco
    let bloqueado = false;
    // `ocultarDetalle`: el detalle daría la respuesta (p. ej. la velocidad), así que solo se ve al corregir.
    const ficha = (i, extra) => h("span", { class: "ficha-cuerpo" }, h("span", { class: "ficha-texto" }, ej.pasos[i].texto),
      ej.pasos[i].detalle && (!ej.ocultarDetalle || bloqueado) ? h("span", { class: "ficha-detalle" }, ej.pasos[i].detalle) : null, extra);
    const huecos = h("ol", { class: "ord-huecos" });
    const banco = h("div", { class: "ord-banco", role: "group", "aria-label": "Pasos por colocar" });
    const enBanco = orden.map(i => h("button", { type: "button", class: "ficha", onclick: () => poner(i) }, ficha(i)));
    banco.append(...enBanco);
    function pintar(nuevo) {
      huecos.replaceChildren(...colocadas.map((i, pos) => h("li", { class: "hueco" + (i == null ? " libre" : "") },
        h("span", { class: "hueco-num", "aria-hidden": "true" }, pos + 1),
        i == null ? h("span", { class: "hueco-vacio" }, pos === colocadas.indexOf(null) ? "Toca un paso" : "")
          : h("button", { type: "button", class: "ficha puesta" + (pos === nuevo ? " recien" : ""), disabled: bloqueado,
            "aria-label": `${pos + 1}. ${ej.pasos[i].texto}. Toca para quitarlo`, onclick: () => quitar(pos) }, ficha(i), h("span", { class: "estado" })))));
      orden.forEach((i, k) => { const usada = colocadas.includes(i); enBanco[k].classList.toggle("usada", usada); enBanco[k].disabled = usada || bloqueado; enBanco[k].setAttribute("aria-hidden", String(usada)); });
      op.cambio(colocadas.every(x => x != null));
    }
    function poner(i) { const pos = colocadas.indexOf(null); if (pos < 0 || bloqueado) return; colocadas[pos] = i; sonar("toque"); pintar(pos); }
    function quitar(pos) { if (bloqueado) return; colocadas[pos] = null; sonar("toque"); pintar(); }
    pintar();
    return {
      nodo: h("div", { class: "ej-ordenar" }, ej.esquema ? esquema(ej) : null, huecos, banco),
      comprobar() {
        bloqueado = true; pintar();
        const ok = colocadas.every((i, pos) => i === pos);
        huecos.querySelectorAll(".ficha").forEach((b, pos) => {
          const bien = colocadas[pos] === pos;
          b.classList.add(bien ? "correcta" : "incorrecta");
          b.querySelector(".estado").replaceChildren(ico(bien ? "check" : "x"));
        });
        huecos.classList.add("corregido");
        return { ok, tuya: colocadas.map(i => ej.pasos[i].texto).join(", "), correcta: ej.pasos.map((p, i) => `${i + 1}. ${p.texto}`).join("  ") };
      },
      soltar() {},
    };
  }

  // ---------- Emparejar: tocar uno de cada columna; se corrige sola al terminar ----------
  function emparejar(ej, op) {
    const n = ej.parejas.length;
    const izq = barajar(ej.parejas.map((_, i) => i)), der = barajar(ej.parejas.map((_, i) => i), izq);
    let sel = { i: null, d: null }, hechas = 0, fallos = 0;
    // Casilla: texto, señal {senal}, imagen {img, texto} o luz de semáforo {luz, intermitente, texto}.
    const etiqueta = (v, k) => typeof v === "string" ? v : v.texto || `Señal ${k + 1}`;
    const contenido = v => typeof v === "string" ? h("span", {}, v)
      : v.senal ? h("img", { src: rutaImagen("img/senales/" + v.senal + ".png"), alt: "", decoding: "async" })
      : v.img ? h("span", { class: "emp-foto" }, h("img", { src: rutaImagen(v.img), alt: "", decoding: "async" }), v.texto ? h("small", {}, v.texto) : null)
      : v.luz ? h("span", { class: "emp-luz" }, h("span", { class: "semaforo-mini" }, ["roja", "ambar", "verde"].map(c =>
          h("i", { class: c + (c === v.luz ? " on" + (v.intermitente ? " parpadea" : "") : "") }))), h("span", {}, v.texto))
      : h("span", {}, v.texto);
    const btn = (lado, idx, k) => h("button", { type: "button", class: "emp-item" + (lado === "i" && (ej.parejas[idx][0].senal || ej.parejas[idx][0].img) ? " con-senal" : ""),
      "aria-pressed": "false", "aria-label": etiqueta(ej.parejas[idx][lado === "i" ? 0 : 1], k),
      onclick: e => elegir(lado, idx, e.currentTarget) }, contenido(ej.parejas[idx][lado === "i" ? 0 : 1]));
    const colI = izq.map((idx, k) => btn("i", idx, k)), colD = der.map((idx, k) => btn("d", idx, k));
    const grid = h("div", { class: "ej-emparejar" }, h("div", { class: "emp-col" }, colI), h("div", { class: "emp-col" }, colD));
    function elegir(lado, idx, b) {
      if (b.disabled) return;
      const prev = sel[lado];
      [...(lado === "i" ? colI : colD)].forEach(x => x.setAttribute("aria-pressed", "false"));
      sel[lado] = prev && prev.idx === idx ? null : { idx, b };
      if (sel[lado]) b.setAttribute("aria-pressed", "true");
      sonar("toque");
      if (sel.i && sel.d) {
        const a = sel.i, c = sel.d; sel = { i: null, d: null };
        a.b.setAttribute("aria-pressed", "false"); c.b.setAttribute("aria-pressed", "false");
        if (a.idx === c.idx) {
          hechas++;
          [a.b, c.b].forEach(x => { x.disabled = true; animar(x, "bien"); });
          setTimeout(() => [a.b, c.b].forEach(x => x.classList.add("hecha")), 450);
          sonar("golpe", hechas - 1);
          if (hechas === n) setTimeout(() => op.fin({ ok: fallos === 0, fallos,
            correcta: ej.parejas.map(p => `${typeof p[0] === "string" ? p[0] : p[0].senal || p[0].texto} → ${p[1]}`).join(" · ") }), 520);
        } else {
          fallos++;
          [a.b, c.b].forEach(x => animar(x, "mal"));
          setTimeout(() => [a.b, c.b].forEach(x => x.classList.remove("mal")), 650);
          sonar("fallo"); vibrar(40);
        }
      }
    }
    op.cambio(false);
    return { nodo: grid, auto: true, comprobar() { return null; }, soltar() {} };
  }

  const CREAR = { cifra, tocar, ordenar, emparejar };
  // Bloque de explicación con las mismas clases que la pantalla al fallar de la web:
  // veredicto, porqué, truco y el enlace a la referencia (sin citas a la vista).
  const NORMA = { LSV: "Ley de Tráfico", RGC: "Reglamento General de Circulación", RGC_CATALOGO: "Catálogo de señales del Reglamento General de Circulación", MANUAL_DGT: "Manual del permiso B (DGT)" };
  function explicacion(ej, r) {
    const f = ej.fuente;
    const ref = `${NORMA[f.norma] || f.norma}, ${/^(anexo|tema)/i.test(f.articulo) ? f.articulo : "art. " + f.articulo}`;
    const veredicto = r.ok ? "Correcto" : r.fallos != null ? `Hecho, con ${r.fallos === 1 ? "1 fallo" : r.fallos + " fallos"}` : "Incorrecto";
    return h("div", { class: "explicacion animada" + (r.ok ? "" : " mal"), role: "status" },
      h("p", { class: "veredicto" }, ico(r.ok ? "check" : "x"), veredicto),
      h("div", { class: "explicacion-cuerpo" }, h("div", { class: "leccion-pregunta" },
        h("p", { class: "lec-porque" }, ej.porque),
        ej.truco ? h("p", { class: "lec-truco" }, ico("bombilla"), h("span", {}, ej.truco)) : null)),
      h("a", { class: "fila", href: f.url, target: "_blank", rel: "noopener" }, ico("libro"),
        h("span", { class: "fila-cuerpo" }, h("span", { class: "fila-titulo" }, ref)), ico("enlace", "chevron")));
  }
  window.Ejercicios = { crear: (ej, op) => CREAR[ej.tipo](ej, op), explicacion, TIPOS, ico, h, sinMovimiento };
})();
