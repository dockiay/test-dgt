#!/usr/bin/env python3
"""Criba las preguntas que no siguen la guía de estilo DGT (preguntas/estilo/guia-estilo-dgt.md).

Uso:  python3 tools/criba_estilo.py [--json salida.json]
Muestra cuántas preguntas incumplen cada regla. Con --json guarda {id: [reglas]}.
"""
import glob, json, os, re, sys

WEB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEGUN = re.compile(r"[Ss]egún (la DGT|el manual|el Reglamento|la Ley|el RGC|el Código|la norma)")
PORQUE = re.compile(r"\bporque\b|es decir|o sea")
TU = re.compile(r"\b(tienes|puedes|debes|estás|vas|presencias|conduces|circulas|tu)\b", re.I)


def reglas(p):
    op, k = p["opciones"], p["correcta"]
    resto = max(len(v) for l, v in op.items() if l != k)
    con_img = bool((p.get("imagen") or {}).get("src"))
    r = []
    if SEGUN.search(p["enunciado"]): r.append("E3")
    if con_img and ("(" in p["enunciado"] or re.search(r"\b[RPSMV]-\d", p["enunciado"])): r.append("E4")
    if PORQUE.search(op[k]): r.append("O1")
    if len(op[k]) > 1.5 * resto: r.append("O2")
    if TU.search(p["enunciado"]): r.append("T")
    if len(p["enunciado"]) > 150: r.append("E1")
    if any(v[:1].islower() for v in op.values()): r.append("T3")
    return r


def main():
    res = {}
    for f in sorted(glob.glob(os.path.join(WEB, "preguntas", "banco-*.json"))):
        for p in json.load(open(f, encoding="utf-8"))["preguntas"]:
            r = reglas(p)
            if r: res[p["id"]] = r
    cuenta = {}
    for r in res.values():
        for x in r: cuenta[x] = cuenta.get(x, 0) + 1
    print(len(res), "preguntas a revisar:", cuenta)
    if "--json" in sys.argv:
        json.dump(res, open(sys.argv[sys.argv.index("--json") + 1], "w", encoding="utf-8"), ensure_ascii=False, indent=0)


if __name__ == "__main__":
    main()
