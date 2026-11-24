#!/usr/bin/env python3
"""Lecciones al fallar: el porqué de la respuesta, por qué fallan las otras opciones y un truco.

Las lecciones viven en preguntas/lecciones/*.json, aparte de los bancos, para que reescribir una
pregunta y reescribir su lección no choquen. Cada lección guarda la «huella» de la pregunta
(enunciado + opciones + correcta). Si la pregunta cambia, la huella deja de coincidir, la lección
se da por desfasada y la web vuelve a mostrar la explicación corta hasta que se reescriba.

Formato de cada lección:
  {"id": "A-pri-0004", "huella": "…",
   "porque": "La lógica de la respuesta correcta.",
   "descartes": {"b": "Por qué no vale la b.", "c": "Por qué no vale la c."},
   "truco": "Regla para recordarlo (opcional, null si no ayuda).",
   "apoyos": [{"norma": "RGC", "articulo": "43.2", "cita": "texto literal"}]}   (opcional)

`apoyos` son citas literales adicionales en las que se apoya la lección cuando dice algo que no está
en la cita principal de la pregunta. Se comprueban contra los textos del BOE como fuente.cita.

Uso:
  python3 -I tools/lecciones.py               comprueba todas las lecciones (código 1 si hay fallos)
  python3 -I tools/lecciones.py --sellar      además pone la huella actual a las lecciones sin huella
  python3 -I tools/lecciones.py --sellar-todo pone la huella actual a todas (solo tras revisarlas)
"""
import glob, hashlib, json, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.dirname(AQUI)
sys.path.insert(0, os.path.join(WEB, "preguntas", "scripts"))

LETRA = re.compile(r"\b(?:la|opción|respuesta)\s+[«\"(]?[abcABC][»\")]?(?=[\s,.;:)]|$)")


def huella(p):
    base = json.dumps([p["enunciado"], p["opciones"], p["correcta"]], ensure_ascii=False, sort_keys=True)
    return hashlib.sha1(base.encode("utf-8")).hexdigest()[:12]


def preguntas():
    out = {}
    for f in sorted(glob.glob(os.path.join(WEB, "preguntas", "banco-*.json"))):
        for p in json.load(open(f, encoding="utf-8"))["preguntas"]:
            out[p["id"]] = p
    return out


def ficheros():
    return sorted(glob.glob(os.path.join(WEB, "preguntas", "lecciones", "*.json")))


def cargar():
    """{id: lección} de todos los ficheros. Si un id se repite, gana el último fichero (en orden)."""
    out = {}
    for f in ficheros():
        for l in json.load(open(f, encoding="utf-8"))["lecciones"]:
            out[l["id"]] = l
    return out


def para_web(l):
    """Lo que se publica en data/preguntas.js."""
    r = {"porque": l["porque"], "descartes": l["descartes"]}
    if l.get("truco"):
        r["truco"] = l["truco"]
    if l.get("apoyos"):
        r["apoyos"] = [{"norma": a["norma"], "articulo": a["articulo"], "cita": " ".join(a["cita"].split())} for a in l["apoyos"]]
    return r


def problemas(l, p, comprobar_citas=True):
    """Lista de fallos de una lección frente a su pregunta."""
    f = []
    if p is None:
        return ["la pregunta no existe"]
    if not str(l.get("porque", "")).strip():
        f.append("sin porque")
    malas = sorted(k for k in p["opciones"] if k != p["correcta"])
    d = l.get("descartes") or {}
    if sorted(d) != malas:
        f.append(f"descartes {sorted(d)} en vez de {malas}")
    textos = [l.get("porque", ""), l.get("truco") or ""] + [str(v) for v in d.values()]
    if any(not str(v).strip() for v in d.values()):
        f.append("descarte vacío")
    for t in textos:
        if LETRA.search(t):
            f.append(f"nombra una opción por su letra (las opciones se barajan): {LETRA.search(t).group(0)!r}")
    if len(l.get("porque", "")) > 420:
        f.append(f"porque demasiado largo ({len(l['porque'])} caracteres, máx. 420)")
    for k, v in d.items():
        if len(v) > 300:
            f.append(f"descarte {k} demasiado largo ({len(v)}, máx. 300)")
    if l.get("truco") and len(l["truco"]) > 360:
        f.append(f"truco demasiado largo ({len(l['truco'])}, máx. 360)")
    if comprobar_citas:
        import comprobar_lote as cl
        for a in l.get("apoyos") or []:
            if a.get("norma") not in cl.FUENTES:
                f.append(f"apoyo con norma desconocida {a.get('norma')!r}")
                continue
            if not a.get("articulo") or not a.get("cita"):
                f.append("apoyo sin artículo o sin cita")
                continue
            if cl.norm(a["cita"]) not in cl.texto(a["norma"]):
                f.append(f"apoyo {a['norma']} {a['articulo']}: la cita no aparece literalmente")
    return f


def main():
    sellar = "--sellar" in sys.argv or "--sellar-todo" in sys.argv
    todo = "--sellar-todo" in sys.argv
    qs = preguntas()
    fallos = desfasadas = total = 0
    vistos = {}
    for fich in ficheros():
        d = json.load(open(fich, encoding="utf-8"))
        cambiado = False
        for l in d["lecciones"]:
            total += 1
            nombre = os.path.basename(fich)
            if l["id"] in vistos:
                print(f"AVISO {nombre} {l['id']}: también está en {vistos[l['id']]}; gana el último")
            vistos[l["id"]] = nombre
            p = qs.get(l["id"])
            for x in problemas(l, p):
                print(f"FALLO {nombre} {l['id']}: {x}")
                fallos += 1
            if p is None:
                continue
            h = huella(p)
            if sellar and (todo or not l.get("huella")):
                if l.get("huella") != h:
                    l["huella"], cambiado = h, True
            elif l.get("huella") != h:
                print(f"DESFASADA {nombre} {l['id']}: la pregunta ha cambiado desde que se escribió la lección")
                desfasadas += 1
        if cambiado:
            with open(fich, "w", encoding="utf-8") as o:
                json.dump(d, o, ensure_ascii=False, indent=2)
                o.write("\n")
    sin = len(set(qs) - set(vistos))
    print(f"{total} lecciones; {fallos} fallos; {desfasadas} desfasadas; {sin} preguntas sin lección.")
    sys.exit(1 if fallos else 0)


if __name__ == "__main__":
    main()
