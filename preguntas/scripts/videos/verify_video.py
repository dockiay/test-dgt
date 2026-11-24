"""Verifica un banco de preguntas sacado de un vídeo.

Uso: python3 -I verify_video.py <banco.json> <transcripcion.txt>

- Campos obligatorios, 3 opciones, correcta válida, materia 1-16, ids únicos.
- fuente.cita debe aparecer LITERALMENTE (normalizando espacios y guiones de corte) en el texto
  de fuente.norma (versión normal o -layout del pdftotext).
- "_kw" (fragmento literal de la transcripción) -> calcula origen.minuto y borra _kw.
Sale con código 1 si algo falla.
"""
import json, re, sys, os

BASE = os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
FUENTES = {
    "RGC": ("rgc_full", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514"),
    "LSV": ("l", "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722"),
    "RGCOND": ("rgcond", "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481"),
    "RGV": ("rgv", "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826"),
    "RGC_CATALOGO": ("catalogo_ocr", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514"),
    "CP": ("cp", "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444"),
    "ITV": ("itv", "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12841"),
    "LRCSCVM": ("lrcscvm", "https://www.boe.es/buscar/act.php?id=BOE-A-2004-18911"),
    "OCURSOS": ("ocursos", "https://www.boe.es/buscar/act.php?id=BOE-A-2005-13723"),
    "MANUAL_DGT": ("manual_dgt", "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf"),
}

def norm(s):
    s = s.replace("­", "").replace("‐", "-").replace("‑", "-")
    s = re.sub(r"-\s*\n\s*", "", s)
    s = s.replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()

_cache = {}
def texts(n):
    if n not in _cache:
        out = []
        for suf in ("", "_layout"):
            p = os.path.join(BASE, FUENTES[n][0] + suf + ".txt")
            if os.path.exists(p):
                out.append(norm(open(p, encoding="utf-8", errors="replace").read()))
        _cache[n] = out
    return _cache[n]

def transcript_index(path):
    buf, offs = "", []
    for line in open(path, encoding="utf-8-sig").read().splitlines():
        m = re.match(r"\[([0-9:]+)\] (.*)", line)
        if m:
            offs.append((len(buf), m.group(1))); buf += m.group(2) + " "
    return re.sub(r"\s+", " ", buf), offs

def main():
    path, tpath = sys.argv[1], sys.argv[2]
    doc = json.load(open(path, encoding="utf-8"))
    qs = doc["preguntas"]
    errs, warns = [], []
    buf, offs = transcript_index(tpath)
    ids = set()
    for q in qs:
        i = q.get("id", "?")
        if i in ids: errs.append(f"{i}: id duplicado")
        ids.add(i)
        for k in ("tema", "subtema", "enunciado", "opciones", "correcta", "explicacion", "fuente", "origen", "estado", "materia"):
            if k not in q: errs.append(f"{i}: falta {k}")
        if sorted(q.get("opciones", {})) != ["a", "b", "c"]: errs.append(f"{i}: opciones deben ser a,b,c")
        if q.get("correcta") not in ("a", "b", "c"): errs.append(f"{i}: correcta inválida")
        if not isinstance(q.get("materia"), int) or not 1 <= q["materia"] <= 16: errs.append(f"{i}: materia 1-16")
        f = q.get("fuente", {})
        n = f.get("norma")
        if n not in FUENTES: errs.append(f"{i}: norma desconocida {n}"); continue
        if not f.get("url"): f["url"] = FUENTES[n][1]
        c = norm(f.get("cita", ""))
        if len(c) < 15: errs.append(f"{i}: cita demasiado corta")
        else:
            hits = [t for t in texts(n) if c in t]
            if not hits: errs.append(f"{i}: CITA NO ENCONTRADA en {n}: {c[:90]}")
            elif hits[0].count(c) > 1: warns.append(f"{i}: AVISO cita repetida {hits[0].count(c)} veces en {n}; alárgala")
        kw = q.pop("_kw", None)
        if kw:
            p = buf.find(re.sub(r"\s+", " ", kw).strip())
            if p < 0: errs.append(f"{i}: _kw no encontrada en transcripción: {kw}"); q["_kw"] = kw
            else:
                t = None
                for o, s in offs:
                    if o <= p: t = s
                    else: break
                q.setdefault("origen", {})["minuto"] = t
    if warns: print("\n".join(warns)); print(f"AVISOS: {len(warns)}")
    if errs:
        print("\n".join(errs)); print(f"FALLOS: {len(errs)}"); sys.exit(1)
    json.dump(doc, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"OK {len(qs)} preguntas verificadas en {path}")

main()
