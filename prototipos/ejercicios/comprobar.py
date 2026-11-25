#!/usr/bin/env python3
"""Comprueba que las citas de datos.js están, literalmente, en los textos de las fuentes.

Cada ejercicio lleva `fuente.cita`; si la cita junta trozos (con [...] o |), lleva además
`fuente.comprobar` con los trozos literales. Se compara ignorando espacios y saltos de línea.
Uso:  python3 prototipos/ejercicios/comprobar.py [carpeta de textos]
"""
import json, os, re, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
TXT = sys.argv[1] if len(sys.argv) > 1 else "/mnt/project-files/fuentes/txt"
FICHEROS = {"RGC": ["rgc_full.txt", "rgc_full_layout.txt"], "RGC_CATALOGO": ["catalogo_ocr.txt"],
            "MANUAL_DGT": ["manual_dgt.txt", "manual_dgt_layout.txt"]}
norm = lambda t: re.sub(r"\s+", " ", t).strip()

js = subprocess.run(["node", "-e", "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.EJERCICIOS))",
                     os.path.join(AQUI, "datos.js")], capture_output=True, text=True, check=True).stdout
fallos = 0
for e in json.loads(js):
    f = e["fuente"]
    textos = [norm(open(os.path.join(TXT, n), encoding="utf-8").read()) for n in FICHEROS[f["norma"]]]
    for trozo in f.get("comprobar") or [f["cita"]]:
        ok = any(norm(trozo) in t for t in textos)
        fallos += not ok
        print(("ok   " if ok else "FALTA"), e["id"], "·", norm(trozo)[:70])
print("Todo comprobado." if not fallos else f"{fallos} citas sin encontrar.")
sys.exit(1 if fallos else 0)
