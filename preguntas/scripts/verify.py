"""Verifica un banco de preguntas.

Uso: python3 -I verify.py <banco.json> [--fix-minutes]

- Comprueba campos obligatorios, 3 opciones, correcta válida, materia 1-16, ids únicos.
- Comprueba que fuente.cita aparece LITERALMENTE (normalizando espacios y guiones de corte de línea)
  en el texto de la norma indicada en fuente.norma.
- Si una pregunta tiene "_kw" (fragmento literal de la transcripción), calcula origen.minuto y borra _kw.
Sale con código 1 si algo falla, e imprime qué.
"""
import json, re, sys, os

BASE = os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
FUENTES = {
    "RGC": ("rgc_full.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514"),
    "LSV": ("l.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722"),
    "RGCOND": ("rgcond.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481"),
    "RGV": ("rgv.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826"),
    "RGC_CATALOGO": ("catalogo_ocr.txt", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#ani"),
    "MANUAL_DGT": ("manual_dgt.txt", "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf"),
}
TRANSCRIPT = "/root/.claude/uploads/12b2bf29-f4a7-5cb2-9800-bf522daa352f/e5a0fc61-transcripcion_intensivo_teorica_2027.txt"

def norm(s):
    s = s.replace("­", "").replace("‐", "-").replace("‑", "-")
    s = re.sub(r"-\s*\n\s*", "", s)          # palabras cortadas por guion a final de línea
    s = s.replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()

_cache = {}
def text(n):
    if n not in _cache:
        _cache[n] = norm(open(os.path.join(BASE, FUENTES[n][0]), encoding="utf-8", errors="replace").read())
    return _cache[n]

def transcript_index():
    buf, offs = "", []
    for line in open(TRANSCRIPT, encoding="utf-8-sig").read().splitlines():
        m = re.match(r"\[([0-9:]+)\] (.*)", line)
        if m:
            offs.append((len(buf), m.group(1))); buf += m.group(2) + " "
    return buf, offs

def main():
    path = sys.argv[1]
    doc = json.load(open(path, encoding="utf-8"))
    qs = doc["preguntas"]
    errs = []
    warns = []
    buf, offs = transcript_index()
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
        elif c not in text(n): errs.append(f"{i}: CITA NO ENCONTRADA en {n}: {c[:90]}")
        elif text(n).count(c) > 1: warns.append(f"{i}: AVISO cita repetida {text(n).count(c)} veces en {n}; alárgala para que sea única")
        kw = q.pop("_kw", None)
        if kw:
            p = buf.find(kw)
            if p < 0: errs.append(f"{i}: _kw no encontrada en transcripción: {kw}")
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
