#!/usr/bin/env python3
"""Genera data/errores.js: las mini lecciones de errores típicos y los «¿por qué?» de cada pregunta.

Uso:  python3 tools/build_errores.py [--sin-comprobar-citas]
Antes hay que generar data/preguntas.js con tools/build_data.py.

1. Errores típicos (preguntas/errores-tipicos.json). Cada punto de cada mini lección lleva una cita
   del BOE. Se comprueba que la cita aparece LITERALMENTE (normalizando espacios y guiones de corte)
   en el texto consolidado de la norma (carpeta FUENTES_TXT, por defecto /mnt/project-files/fuentes/txt).
   Si alguna cita no aparece, el script termina con error y no escribe nada.

2. «¿Por qué?». Tras un fallo, la web pregunta qué norma explica la respuesta correcta. Las opciones
   son explicaciones de preguntas ya verificadas: la de la propia pregunta y dos de otras preguntas
   del mismo subtema o tema que se apoyan en OTRO artículo. Así no se escribe ningún texto nuevo:
   todas las opciones son normas ciertas y revisadas; solo una explica esta pregunta.
   Para que ninguna distractora explique también la respuesta, se descartan las que:
     - citan el mismo artículo (o uno que lo contiene) o tienen una cita que se solapa con la suya,
     - se parecen mucho a la explicación correcta (palabras en común),
     - contienen el texto de la respuesta correcta,
     - vienen de preguntas con imagen (su explicación suele depender del dibujo), no se entienden
       sin su pregunta (empiezan sin sujeto o dicen «esta señal») o miden más de 240 caracteres,
     - están en la lista de exclusiones de preguntas/porques-excluidos.json (revisión humana).
   La elección es determinista (no cambia entre ejecuciones si no cambian los bancos).
"""
import hashlib, json, os, re, sys, unicodedata

AQUI = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.dirname(AQUI)
BASE = os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
TEXTOS = {"RGC": "rgc_full.txt", "LSV": "l.txt", "CP": "cp.txt", "RGCOND": "rgcond.txt", "RGV": "rgv.txt"}
URLS = {"RGC": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", "LSV": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722",
        "CP": "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", "RGCOND": "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481",
        "RGV": "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826"}
# Explicaciones que no se entienden sin su pregunta (empiezan sin sujeto o señalan «esta señal»):
# no sirven como distractoras.
SIN_SUJETO = set("Deben Debe Puede Pueden Esa Ese Esta Este Estas Estos Están Son Tienen Rigen Indica Excepcionalmente "
                 "Quedan Excepciones Mide Evita Además Su Salvo Aparte Apoyando Es Sirve Significa Obliga Prohíbe".split())
DEICTICO = re.compile(r"\b(esta|este|estas|estos|esa|ese|dicha|dicho)\s+(señal|señales|marca|marcas|caso|situación|vehículo|panel|luz|imagen|pregunta)\b", re.I)
VACIAS = set("a al ante con de del el en es la las lo los o para por que se si sin su sus un una y no ni más le les cada este esta".split())


def norm(s):
    s = s.replace("­", "").replace("‐", "-").replace("‑", "-")
    s = re.sub(r"-\s*\n\s*", "", s)
    s = s.replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()


_textos = {}
def texto(n):
    if n not in _textos:
        t = norm(open(os.path.join(BASE, TEXTOS[n]), encoding="utf-8", errors="replace").read())
        # Los saltos de página del PDF meten la cabecera del BOE en mitad de las frases.
        _textos[n] = re.sub(r"Página \d+ BOLETÍN OFICIAL DEL ESTADO LEGISLACIÓN CONSOLIDADA ", "", t)
    return _textos[n]


def palabras(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return {w for w in re.findall(r"[a-z0-9]+(?:,[0-9]+)?", s) if w not in VACIAS and len(w) > 2}


def parecido(a, b):
    a, b = palabras(a), palabras(b)
    return len(a & b) / max(1, min(len(a), len(b)))


def articulo_base(f):
    """«48.1.a.1º» -> «RGC 48»; «Anexo I.3.1.4.1º» -> «RGC Anexo I.3»."""
    a = str(f.get("articulo", "")).strip()
    m = re.match(r"(?i)(anexo\s+[ivx]+(?:\.\d+)?|disposici\S*\s+\S+\s+\S+|\d+(?:\s*bis|\s*ter)?)", a)
    return f"{f.get('norma')} {(m.group(1) if m else a).lower()}"


def solapan(c1, c2):
    c1, c2 = norm(c1).lower(), norm(c2).lower()
    if not c1 or not c2:
        return False
    if c1 in c2 or c2 in c1:
        return True
    return parecido(c1, c2) > 0.6


def leer_banco():
    s = open(os.path.join(WEB, "data", "preguntas.js"), encoding="utf-8").read()
    return json.loads(s[s.index("=") + 1:].strip().rstrip(";"))["preguntas"]


def comprobar_lecciones(grupos, comprobar):
    errores, avisos, temas_vistos = [], [], {}
    for g in grupos:
        for k in ("id", "titulo", "trampa", "temas", "puntos"):
            if not g.get(k):
                errores.append(f"grupo {g.get('id')}: falta {k}")
        for t in g.get("temas", []):
            if t in temas_vistos:
                errores.append(f"tema {t} en dos grupos: {temas_vistos[t]} y {g['id']}")
            temas_vistos[t] = g["id"]
        for i, p in enumerate(g.get("puntos", []), 1):
            ref = f"{g.get('id')} punto {i}"
            for k in ("texto", "norma", "articulo", "url", "cita"):
                if not str(p.get(k, "")).strip():
                    errores.append(f"{ref}: falta {k}")
            if p.get("norma") not in TEXTOS:
                errores.append(f"{ref}: norma {p.get('norma')} sin texto para comprobar")
                continue
            if not p["url"].startswith(URLS[p["norma"]]):
                errores.append(f"{ref}: la url no es la de {p['norma']} en el BOE")
            if not comprobar:
                continue
            c, t = norm(p["cita"]), texto(p["norma"])
            n = t.count(c)
            if n == 0:
                errores.append(f"{ref}: CITA NO ENCONTRADA en {p['norma']}: {c[:100]}")
            elif n > 1:
                avisos.append(f"{ref}: la cita aparece {n} veces en {p['norma']}")
    return errores, avisos, temas_vistos


def elegir_porques(preguntas, excluidos):
    por_sub, por_tema, por_materia = {}, {}, {}
    for q in preguntas:
        e = q.get("explicacion") or ""
        if q.get("imagen") or not e or len(e) > 240 or e.split()[0].strip(",:") in SIN_SUJETO or DEICTICO.search(e):
            continue
        por_sub.setdefault((q["tema"], q.get("subtema")), []).append(q)
        por_tema.setdefault(q["tema"], []).append(q)
        por_materia.setdefault(q["materia"], []).append(q)
    salida, sin = {}, []
    for q in preguntas:
        if not q.get("explicacion"):
            sin.append(q["id"]); continue
        prohibidos = set(excluidos.get(q["id"], []))
        correcta = norm(q["opciones"][q["correcta"]]).lower().rstrip(".")
        base = articulo_base(q["fuente"])
        elegidas, vistos = [], {base}
        semilla = lambda d: hashlib.sha1((q["id"] + "|" + d["id"]).encode()).hexdigest()
        for grupo in (por_sub.get((q["tema"], q.get("subtema")), []), por_tema.get(q["tema"], []), por_materia.get(q["materia"], [])):
            cand = []
            for d in grupo:
                if d["id"] == q["id"] or d["id"] in prohibidos or any(e["id"] == d["id"] for e in elegidas):
                    continue
                b = articulo_base(d["fuente"])
                if b in vistos or b.startswith(base + ".") or base.startswith(b + "."):
                    continue
                if solapan(d["fuente"]["cita"], q["fuente"]["cita"]) or any(solapan(d["fuente"]["cita"], e["fuente"]["cita"]) for e in elegidas):
                    continue
                if parecido(d["explicacion"], q["explicacion"]) > 0.35 or any(parecido(d["explicacion"], e["explicacion"]) > 0.5 for e in elegidas):
                    continue
                if len(correcta) >= 4 and correcta in norm(d["explicacion"]).lower():
                    continue
                cand.append(d)
            # Entre las candidatas, las de longitud parecida a la correcta, para que el largo no delate.
            cand.sort(key=lambda d: (abs(len(d["explicacion"]) - len(q["explicacion"])) // 60, semilla(d)))
            for d in cand:
                if len(elegidas) == 2:
                    break
                b = articulo_base(d["fuente"])
                if b in vistos:
                    continue
                elegidas.append(d); vistos.add(b)
            if len(elegidas) == 2:
                break
        if len(elegidas) == 2:
            salida[q["id"]] = [e["id"] for e in elegidas]
        else:
            sin.append(q["id"])
    return salida, sin


def main():
    comprobar = "--sin-comprobar-citas" not in sys.argv
    if comprobar and not os.path.isdir(BASE):
        sys.exit(f"No encuentro los textos del BOE en {BASE}. Indica la carpeta con FUENTES_TXT=... "
                 "o usa --sin-comprobar-citas (solo para pruebas; no publiques así).")
    lecciones = json.load(open(os.path.join(WEB, "preguntas", "errores-tipicos.json"), encoding="utf-8"))
    exc_ruta = os.path.join(WEB, "preguntas", "porques-excluidos.json")
    excluidos = json.load(open(exc_ruta, encoding="utf-8")).get("excluir", {}) if os.path.isfile(exc_ruta) else {}
    preguntas = leer_banco()
    errores, avisos, temas = comprobar_lecciones(lecciones["grupos"], comprobar)
    temas_banco = {q["tema"] for q in preguntas}
    for t, g in temas.items():
        if t not in temas_banco:
            avisos.append(f"{g}: el tema {t} no tiene preguntas publicadas")
    for a in avisos:
        print("AVISO", a)
    if errores:
        for e in errores:
            print("ERROR", e)
        sys.exit(f"{len(errores)} errores en preguntas/errores-tipicos.json; no se escribe data/errores.js")
    porques, sin = elegir_porques(preguntas, excluidos)
    salida = {"lecciones": lecciones, "porques": porques}
    with open(os.path.join(WEB, "data", "errores.js"), "w", encoding="utf-8") as o:
        o.write("// Generado por tools/build_errores.py. No editar a mano.\n")
        o.write("window.ERRORES = ")
        json.dump(salida, o, ensure_ascii=False, separators=(",", ":"))
        o.write(";\n")
    n = sum(len(g["puntos"]) for g in lecciones["grupos"])
    print(f"{len(lecciones['grupos'])} mini lecciones con {n} citas {'comprobadas' if comprobar else 'SIN COMPROBAR'}; "
          f"«¿por qué?» para {len(porques)} de {len(preguntas)} preguntas ({len(sin)} sin distractoras suficientes).")
    # Fichero legible para la revisión humana: cada pregunta con su explicación y las dos distractoras.
    por_id = {q["id"]: q for q in preguntas}
    with open(os.path.join(WEB, "preguntas", "porques-para-revisar.md"), "w", encoding="utf-8") as o:
        o.write("# «¿Por qué?»: opciones que verá tras fallar cada pregunta\n\n"
                "Generado por `tools/build_errores.py`. Para cada pregunta: la explicación correcta (✔) y las dos distractoras (✘), "
                "que son explicaciones de otras preguntas verificadas basadas en otro artículo. "
                "Hay que comprobar que ninguna ✘ explica también la respuesta correcta. Para quitar una, añádela a "
                "`preguntas/porques-excluidos.json` como `{\"excluir\": {\"<id pregunta>\": [\"<id distractora>\"]}}` y vuelve a generar.\n\n")
        for qid, ds in porques.items():
            q = por_id[qid]
            o.write(f"## {qid}\n\n{q['enunciado']}  \nRespuesta: **{q['opciones'][q['correcta']]}**\n\n"
                    f"- ✔ {q['explicacion']} _({q['fuente']['norma']} {q['fuente']['articulo']})_\n")
            for d in ds:
                e = por_id[d]
                o.write(f"- ✘ `{d}` {e['explicacion']} _({e['fuente']['norma']} {e['fuente']['articulo']})_\n")
            o.write("\n")


if __name__ == "__main__":
    main()
