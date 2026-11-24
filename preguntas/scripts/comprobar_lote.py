#!/usr/bin/env python3
"""Comprueba un lote nuevo de preguntas antes de añadirlo a los bancos.

Uso:  python3 -I preguntas/scripts/comprobar_lote.py <lote.json> [--escribir]

Además de lo que exige tools/build_data.py, comprueba:
  - que fuente.cita aparece LITERALMENTE en el texto consolidado de la norma (carpeta FUENTES_TXT),
    normalizando espacios, guiones de corte y las cabeceras de página del BOE;
  - que la cita es única en la norma (si aparece varias veces, hay que alargarla);
  - que la pregunta no repite otra ya publicada (mismo enunciado o misma idea con la misma respuesta);
  - que las opciones no se delatan (la correcta mucho más larga, «todas las anteriores», repetidas);
  - que la explicación se sostiene sola (se reutiliza como distractora del «¿por qué?»);
  - que la imagen, si la hay, existe.
Con --escribir rellena fuente.url y fuente.version_consultada cuando faltan y guarda el lote.
Sale con código 1 si hay fallos. Los avisos no paran, pero hay que leerlos.
"""
import glob, json, os, re, sys, unicodedata

AQUI = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.dirname(os.path.dirname(AQUI))
BASE = os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
FUENTES = {
    "RGC": ("rgc_full.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", "2026-06-26"),
    "RGC_CATALOGO": ("catalogo_ocr.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", "2026-06-26"),
    "LSV": ("l.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", "2026-06-26"),
    "RGCOND": ("rgcond.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481", "2023-12-06"),
    "RGV": ("rgv.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", "2026-06-26"),
    "CP": ("cp.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", "2026-04-09"),
    "ITV": ("itv.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12841", None),
    "LRCSCVM": ("lrcscvm.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2004-18911", None),
    "OCURSOS": ("ocursos.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2005-13723", None),
    "MANUAL_DGT": ("manual_dgt.txt", "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf", "2024-10"),
}
VACIAS = set("a al ante con de del el en es la las lo los o para por que se si sin su sus un una y no ni más le les "
             "cada este esta qué cuál cuáles cómo debe puede debo puedo usted conductor vehículo".split())
SIN_SUJETO = set("Deben Debe Puede Pueden Esa Ese Esta Este Estas Estos Están Son Tienen Rigen Indica Excepcionalmente "
                 "Quedan Excepciones Mide Evita Además Su Salvo Aparte Apoyando Es Sirve Significa Obliga Prohíbe".split())
DEICTICO = re.compile(r"\b(esta|este|estas|estos|esa|ese|dicha|dicho)\s+(señal|señales|marca|marcas|caso|situación|"
                      r"vehículo|panel|luz|imagen|pregunta|esquema)\b", re.I)


def norm(s):
    s = s.replace("­", "").replace("‐", "-").replace("‑", "-")
    s = re.sub(r"-\s*\n\s*", "", s)
    s = s.replace("’", "'").replace("“", '"').replace("”", '"').replace("«", '"').replace("»", '"')
    return re.sub(r"\s+", " ", s).strip()


_textos = {}
def texto(n):
    if n not in _textos:
        t = norm(open(os.path.join(BASE, FUENTES[n][0]), encoding="utf-8", errors="replace").read())
        _textos[n] = re.sub(r"Página \d+ BOLETÍN OFICIAL DEL ESTADO LEGISLACIÓN CONSOLIDADA ", "", t)
    return _textos[n]


def palabras(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return {w for w in re.findall(r"[a-z0-9]+(?:,[0-9]+)?", s) if w not in VACIAS and len(w) > 2}


def jaccard(a, b):
    return len(a & b) / max(1, len(a | b))


def publicadas(excluir):
    out = []
    for f in sorted(glob.glob(os.path.join(WEB, "preguntas", "banco-*.json"))):
        if os.path.abspath(f) == os.path.abspath(excluir):
            continue
        for q in json.load(open(f, encoding="utf-8"))["preguntas"]:
            out.append((os.path.basename(f), q))
    return out


def clave(q):
    return palabras(q["enunciado"]), palabras(q["opciones"].get(q["correcta"], ""))


def main():
    ruta = sys.argv[1]
    escribir = "--escribir" in sys.argv
    doc = json.load(open(ruta, encoding="utf-8"))
    qs = doc["preguntas"]
    otras = publicadas(ruta)
    ids_otros = {q["id"] for _, q in otras}
    claves_otras = [(f, q["id"], clave(q)) for f, q in otras]
    fallos, avisos, vistas, letras = [], [], [], {"a": 0, "b": 0, "c": 0}
    for q in qs:
        i = q.get("id", "?")
        for k in ("id", "tema", "subtema", "enunciado", "opciones", "correcta", "explicacion", "fuente", "origen",
                  "estado", "materia", "imagen"):
            if k not in q:
                fallos.append(f"{i}: falta {k}")
        if i in ids_otros or i in [v[0] for v in vistas]:
            fallos.append(f"{i}: id repetido")
        op = q.get("opciones", {})
        if sorted(op) != ["a", "b", "c"] or not all(str(v).strip() for v in op.values()):
            fallos.append(f"{i}: opciones deben ser a, b, c"); continue
        if q.get("correcta") not in op:
            fallos.append(f"{i}: correcta inválida"); continue
        letras[q["correcta"]] += 1
        if not isinstance(q.get("materia"), int) or not 1 <= q["materia"] <= 16:
            fallos.append(f"{i}: materia fuera de 1-16")
        if q.get("estado") != "verificada":
            avisos.append(f"{i}: estado {q.get('estado')}")
        textos_op = [norm(v).lower() for v in op.values()]
        if len(set(textos_op)) < 3:
            fallos.append(f"{i}: opciones repetidas")
        if any(re.search(r"\b(todas|ninguna) (las|de las) (anteriores|respuestas|opciones)", t) for t in textos_op):
            fallos.append(f"{i}: opción «todas/ninguna de las anteriores»")
        lc = len(op[q["correcta"]]); lo = max(len(v) for k, v in op.items() if k != q["correcta"])
        if lc > 1.8 * lo and lc - lo > 40:
            avisos.append(f"{i}: la correcta es mucho más larga que las demás ({lc} frente a {lo})")
        # Fuente
        f = q.get("fuente", {})
        n = f.get("norma")
        if n not in FUENTES:
            fallos.append(f"{i}: norma desconocida {n}"); continue
        for k in ("articulo", "cita"):
            if not str(f.get(k, "")).strip():
                fallos.append(f"{i}: fuente sin {k}")
        if escribir:
            f.setdefault("url", FUENTES[n][1]) if f.get("url") else f.__setitem__("url", FUENTES[n][1])
            if not f.get("version_consultada") and FUENTES[n][2]:
                f["version_consultada"] = FUENTES[n][2]
        c = norm(f.get("cita", ""))
        if len(c) < 25:
            fallos.append(f"{i}: cita demasiado corta")
        elif c not in texto(n):
            fallos.append(f"{i}: CITA NO ENCONTRADA en {n}: {c[:100]}")
        elif texto(n).count(c) > 1:
            avisos.append(f"{i}: la cita aparece {texto(n).count(c)} veces en {n}; alárgala")
        # Explicación reutilizable
        e = q.get("explicacion", "").strip()
        if not e:
            fallos.append(f"{i}: sin explicación")
        elif e.split()[0] in SIN_SUJETO or DEICTICO.search(e):
            avisos.append(f"{i}: la explicación no se entiende sola: «{e[:60]}»")
        # Imagen
        img = q.get("imagen")
        if isinstance(img, dict) and img.get("src") and not os.path.isfile(os.path.join(WEB, img["src"])):
            ruta_img = img["src"].replace("img/", "imagenes/", 1)
            if not os.path.isfile(os.path.join(WEB, ruta_img)):
                fallos.append(f"{i}: no existe la imagen {img['src']}")
        # Duplicados
        ce, cr = clave(q)
        for fo, io, (oe, orr) in claves_otras + [(ruta, v[0], v[1]) for v in vistas]:
            je = jaccard(ce, oe)
            if je >= 0.75 or (je >= 0.5 and jaccard(cr, orr) >= 0.6):
                avisos.append(f"{i}: parecida a {io} ({os.path.basename(fo)}), enunciado {je:.2f}")
        vistas.append((i, (ce, cr)))
    for a in avisos:
        print("AVISO", a)
    for x in fallos:
        print("FALLO", x)
    print(f"{len(qs)} preguntas; correctas a/b/c: {letras['a']}/{letras['b']}/{letras['c']}; "
          f"{len(avisos)} avisos; {len(fallos)} fallos")
    if fallos:
        sys.exit(1)
    if escribir:
        json.dump(doc, open(ruta, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        open(ruta, "a", encoding="utf-8").write("\n")


if __name__ == "__main__":
    main()
