"""Junta los tramos de cada vídeo en un banco, una lista de resoluciones y las erratas.

Uso: python3 -I ensamblar.py <carpeta_out> <repo>
Escribe en <repo>/preguntas/:
  banco-videoN.json, dudosas/resoluciones-videoN.json, dudosas/erratas-videoN.md
Comprueba que las citas de las resoluciones aparecen literalmente en la norma.
"""
import json, os, re, sys

OUT, REPO = sys.argv[1], sys.argv[2]
BASE = os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
FICH = {"RGC": "rgc_full", "LSV": "l", "RGCOND": "rgcond", "RGV": "rgv", "RGC_CATALOGO": "catalogo_ocr",
        "CP": "cp", "ITV": "itv", "LRCSCVM": "lrcscvm", "OCURSOS": "ocursos", "MANUAL_DGT": "manual_dgt"}
VIDEOS = {
    "video2": (["v2"], "Nuevas normas DGT de octubre de 2026"),
    "video3": (["v3"], "Nuevas señales de tráfico"),
    "video4": (["v4a", "v4b"], "Señales verticales actualizadas"),
    "video5": (["v5a", "v5b", "v5c", "v5d", "v5e", "v5f"], "Intensivo de teórica completo y actualizado 2026"),
}
SECC = [("error", "El vídeo se equivoca", "Lo importante. Aquí el vídeo dice algo distinto a la norma."),
        ("matiz", "Hay que matizarlo", "Casi bien, pero con un detalle que puede caer en el examen."),
        ("correcta", "El vídeo acierta", "Parecía dudoso, pero la norma le da la razón."),
        ("no_norma", "No es una norma (consejo o explicación)", "Sirve como truco o consejo, pero no lo pone la norma."),
        ("sin_fuente", "No se puede confirmar con las fuentes oficiales", "Ni la norma ni el manual de la DGT lo dicen; no cuentes con ello en el examen.")]

def norm(s):
    s = s.replace("­", "").replace("‐", "-").replace("‑", "-")
    s = re.sub(r"-\s*\n\s*", "", s)
    s = s.replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()

_c = {}
def textos(n):
    if n not in _c:
        _c[n] = [norm(open(os.path.join(BASE, FICH[n] + s + ".txt"), encoding="utf-8", errors="replace").read())
                 for s in ("", "_layout") if os.path.exists(os.path.join(BASE, FICH[n] + s + ".txt"))]
    return _c[n]

def clave_min(m):
    p = [int(x) for x in str(m or "99:99:99").split(":")]
    while len(p) < 3: p.insert(0, 0)
    return p

fallos = []
def pl(n, s, p): return f"{n} {s if n == 1 else p}"
def resumen(c):
    return (f"**{pl(c['error'], 'error', 'errores')}**, {pl(c['matiz'], 'matiz', 'matices')}, "
            f"{c['correcta']} en {'la' if c['correcta'] == 1 else 'las'} que el vídeo acierta, "
            f"{pl(c['no_norma'], 'consejo que no es norma', 'consejos que no son norma')} y "
            f"{c['sin_fuente']} que no se {'puede' if c['sin_fuente'] == 1 else 'pueden'} confirmar")
DUP = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "duplicados.json")))
for video, (tramos, titulo) in VIDEOS.items():
    preguntas, normativa, revs = [], {}, []
    for t in tramos:
        b = os.path.join(OUT, t, "banco.json")
        r = os.path.join(OUT, t, "revision.json")
        if os.path.exists(b):
            d = json.load(open(b, encoding="utf-8"))
            preguntas += d["preguntas"]; normativa.update(d.get("normativa_consultada", {}))
        if os.path.exists(r):
            revs += json.load(open(r, encoding="utf-8"))["revision"]
    preguntas = [q for q in preguntas if q["id"] not in DUP]
    for e in revs:
        nuevas = [DUP.get(i, i) for i in e.get("preguntas_nuevas") or []]
        e["preguntas_nuevas"] = list(dict.fromkeys(nuevas))
    if not preguntas and not revs:
        continue
    ids = [q["id"] for q in preguntas]
    assert len(ids) == len(set(ids)), f"ids duplicados en {video}"
    for e in revs:
        c, n = e.get("cita"), e.get("norma")
        if c and n:
            if n not in FICH or not any(norm(c) in t for t in textos(n)):
                fallos.append(f"{e['id']}: cita de resolución no encontrada en {n}: {c[:80]}")
    banco = {"version": 1,
             "descripcion": f"Preguntas sacadas del vídeo {video} ({titulo}) y comprobadas contra la norma.",
             "normativa_consultada": normativa, "preguntas": preguntas}
    json.dump(banco, open(os.path.join(REPO, "preguntas", f"banco-{video}.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    revs.sort(key=lambda e: clave_min(e.get("minuto")))
    leyenda = {k: t for k, t, _ in SECC}
    json.dump({"version": 1, "fecha": "2026-11-24", "video": video, "leyenda": leyenda, "resoluciones": revs},
              open(os.path.join(REPO, "preguntas", "dudosas", f"resoluciones-{video}.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    cuenta = {k: sum(1 for e in revs if e.get("veredicto") == k) for k, _, _ in SECC}
    md = [f"# Erratas del vídeo «{titulo}» ({video})", "",
          f"He comparado con la norma oficial (BOE) y con el manual de la DGT las {len(revs)} frases del vídeo que no estaban claras. "
          "Resultado: " + resumen(cuenta) + ".", "",
          "Si en el examen te preguntan por algo de la sección «El vídeo se equivoca», responde lo que pone aquí, no lo del vídeo.", "",
          "El minuto indica dónde lo dice el vídeo.", ""]
    for k, tit, intro in SECC:
        es = [e for e in revs if e.get("veredicto") == k]
        if not es: continue
        md += ["", f"## {tit} ({len(es)})", "", intro, ""]
        for e in es:
            m = f" ({e['minuto']})" if e.get("minuto") else ""
            md.append(f"- **El vídeo{m}:** {e['afirmacion_del_video'].strip()}  ")
            md.append(f"  **Lo correcto:** {e['lo_correcto'].strip()}  ")
            md.append(f"  _Fuente: {(e.get('fuente') or '-').strip().rstrip('.')}._")
    md += ["", "---", "Fuentes: normas consolidadas del BOE (Reglamento General de Circulación y su catálogo de señales, Ley de Tráfico, "
           "Reglamentos de Conductores y de Vehículos, Código Penal, ITV, seguro obligatorio) y el manual del permiso B de la DGT "
           f"en lectura fácil. Detalle de cada caso, con la cita literal, en resoluciones-{video}.json.", ""]
    open(os.path.join(REPO, "preguntas", "dudosas", f"erratas-{video}.md"), "w", encoding="utf-8").write("\n".join(md))
    print(f"{video}: {len(preguntas)} preguntas, {len(revs)} resoluciones {cuenta}")
if fallos:
    print("\n".join(fallos)); print(f"FALLOS: {len(fallos)}"); sys.exit(1)
