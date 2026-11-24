#!/usr/bin/env python3
"""Informe de cobertura del banco: preguntas por materia y por artículo de cada norma.

Uso:  python3 tools/cobertura.py [--md preguntas/cobertura.md]
Lee preguntas/banco-*.json (solo estado "verificada") y los textos de FUENTES_TXT para listar
los artículos de cada norma que no tienen ninguna pregunta.
"""
import collections, glob, json, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.dirname(AQUI)
BASE = os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
TEXTOS = {"RGC": "rgc_full.txt", "LSV": "l.txt", "RGCOND": "rgcond.txt", "RGV": "rgv.txt"}
MATERIAS = {
    1: "Normas, señales, prioridad, velocidad", 2: "Accidentes: factores y causas",
    3: "Actitudes con los demás usuarios", 4: "Percepción, alcohol, drogas, fatiga",
    5: "Distancias, frenado, estabilidad", 6: "Calzada, meteorología, noche, túneles",
    7: "La vía: clases y partes", 8: "Usuarios vulnerables", 9: "Riesgos según el vehículo",
    10: "Documentación", 11: "Accidente y primeros auxilios", 12: "Carga y personas",
    13: "Abandonar el vehículo", 14: "Elementos mecánicos", 15: "Equipos de seguridad",
    16: "Medio ambiente y conducción eficiente",
}
# Objetivo orientativo (unas 1.500 en total): materia 1 sigue siendo la mitad larga del examen,
# y ninguna otra baja de unas 45 para que la práctica por temario tenga variedad.
OBJETIVO = {1: 560, 2: 50, 3: 55, 4: 100, 5: 55, 6: 80, 7: 55, 8: 70, 9: 50, 10: 100,
            11: 60, 12: 60, 13: 45, 14: 80, 15: 65, 16: 55}


def articulos(norma):
    """Primer bloque de artículos de la norma (el reglamento, sin anexos de otros textos)."""
    t = open(os.path.join(BASE, TEXTOS[norma]), encoding="utf-8", errors="replace").read()
    indice = [m.end() for m in re.finditer(r"^Artículo .*(?:\. ){4}.*$", t[:len(t) // 3], re.M)]
    t = t[indice[-1]:] if indice else t  # salta el índice del principio
    vistos = {}
    for m in re.finditer(r"^Artículo (\d+)(?: bis| ter)?\. (.*)$", t, re.M):
        n = m.group(1)
        if ". . ." in m.group(2) or m.group(2).endswith(".."):
            continue  # línea del índice
        # Si el número se repite, es otro texto anexo (p. ej. el reglamento de pruebas deportivas del RGC).
        vistos.setdefault(n, m.group(2).strip()[:70])
    return vistos


def main():
    md = None
    if "--md" in sys.argv:
        md = sys.argv[sys.argv.index("--md") + 1]
    por_materia, por_art = collections.Counter(), collections.Counter()
    for f in sorted(glob.glob(os.path.join(WEB, "preguntas", "banco-*.json"))):
        for q in json.load(open(f, encoding="utf-8"))["preguntas"]:
            if q.get("estado") != "verificada":
                continue
            por_materia[q["materia"]] += 1
            n, a = q["fuente"]["norma"], str(q["fuente"]["articulo"])
            m = re.match(r"\s*(?:art\.?\s*)?(\d+)", a)
            por_art[(n, m.group(1) if m else a.split(",")[0].split("(")[0].strip())] += 1
    lineas = ["# Cobertura del banco de preguntas", "",
              f"Total verificadas: **{sum(por_materia.values())}**. Objetivo orientativo: {sum(OBJETIVO.values())}.", "",
              "| Materia | Preguntas | Objetivo | Faltan |", "|---|---|---|---|"]
    for m, nombre in MATERIAS.items():
        lineas.append(f"| {m}. {nombre} | {por_materia[m]} | {OBJETIVO[m]} | {max(0, OBJETIVO[m] - por_materia[m])} |")
    for norma in TEXTOS:
        arts = articulos(norma)
        sin = [f"{n} ({t})" for n, t in arts.items() if por_art[(norma, n)] == 0]
        con = sorted(((n, por_art[(norma, n)]) for n in arts if por_art[(norma, n)]), key=lambda x: int(x[0]))
        lineas += ["", f"## {norma}: {len(arts) - len(sin)} de {len(arts)} artículos con preguntas", "",
                   "Con preguntas (artículo: nº): " + ", ".join(f"{n}: {c}" for n, c in con), "",
                   "Sin preguntas: " + "; ".join(sin)]
    anexos = sorted(((k[1], v) for k, v in por_art.items() if not k[1].isdigit()), key=str)
    lineas += ["", "## Anexos y otras fuentes", ""] + [f"- {a}: {v}" for a, v in anexos]
    salida = "\n".join(lineas) + "\n"
    if md:
        open(md, "w", encoding="utf-8").write(salida)
    print(salida)


if __name__ == "__main__":
    main()
