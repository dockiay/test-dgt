#!/usr/bin/env python3
"""Extrae las marcas viales del Catálogo de marcas viales (apartado 5.2 del anexo I
del Reglamento General de Circulación, BOE-A-2003-23514, págs. 687-717 del PDF).

Cada página es una tabla con la celda del código en amarillo claro (RGB 255,242,204)
y, a su derecha, la geometría de la marca. El script localiza cada celda amarilla,
lee el código con OCR y recorta la geometría que hay a su derecha en esa misma franja.
También guarda el texto de la celda de función (a la izquierda) como descripción.

Uso: python3 extraer_marcas_boe.py <dir_paginas_png> <dir_salida>
(las páginas se sacan antes con: pdfimages -png -p -f 687 -l 717 <pdf> <dir>/m)
"""
import glob
import json
import os
import re
import subprocess
import sys

import numpy as np
from PIL import Image

AMARILLO = np.array([255, 242, 204])


def agrupar(idx, sep=3):
    g = []
    for i in idx:
        if g and i - g[-1][-1] <= sep:
            g[-1].append(i)
        else:
            g.append([i])
    return [(x[0], x[-1]) for x in g]


def ocr(img, psm="6"):
    tmp = f"/tmp/_m{os.getpid()}.png"
    img.save(tmp)
    return subprocess.run(["tesseract", tmp, "-", "-l", "spa", "--psm", psm],
                          capture_output=True, text=True).stdout


def recorte(img):
    a = np.asarray(img.convert("RGB")).astype(int)
    nb = (a < 240).any(axis=2)
    ys, xs = np.where(nb)
    if len(xs) == 0:
        return None
    p = 10
    return img.crop((max(xs.min() - p, 0), max(ys.min() - p, 0),
                     min(xs.max() + p, a.shape[1]), min(ys.max() + p, a.shape[0])))


def main():
    dirpag, salida = sys.argv[1], sys.argv[2]
    os.makedirs(salida, exist_ok=True)
    regs = []
    for ruta in sorted(glob.glob(os.path.join(dirpag, "m-*.png"))):
        pag = int(os.path.basename(ruta).split("-")[1])
        img = Image.open(ruta).convert("RGB")
        a = np.asarray(img).astype(int)
        amar = (np.abs(a - AMARILLO).sum(axis=2) < 12)
        cols = agrupar(np.where(amar.mean(axis=0) > 0.05)[0], 6)
        if not cols:
            continue
        x0, x1 = max(cols, key=lambda c: c[1] - c[0])
        filas = agrupar(np.where(amar[:, x0:x1 + 1].mean(axis=1) > 0.5)[0], 1)
        for y0, y1 in filas:
            if y1 - y0 < 40:
                continue
            celda = img.crop((x0, y0, x1 + 1, y1 + 1))
            celda = celda.resize((celda.width * 3, celda.height * 3), Image.LANCZOS)
            cod_txt = ocr(celda)
            m = re.search(r"M\s*[-‑–]\s*(\d+)\s*[.,]\s*(\d+)([a-h]?)\b", cod_txt)
            if not m:
                regs.append({"pagina_pdf": pag, "y": int(y0), "error": "sin código", "ocr": cod_txt})
                continue
            codigo = f"M-{m.group(1)}.{m.group(2)}{m.group(3).lower()}"
            # geometría: desde la celda amarilla hasta el borde derecho de la tabla
            # la celda de geometría va entre las dos primeras líneas verticales a la derecha del código
            banda = (a[y0 + 4:y1 - 4].max(axis=2) < 140)
            vl = [g for g in agrupar(np.where(banda.mean(axis=0) > 0.9)[0]) if g[0] > x1 - 3]
            gx0 = vl[0][1] + 3 if vl else x1 + 8
            gx1 = vl[1][0] - 3 if len(vl) > 1 else img.width - 20
            geo = recorte(img.crop((gx0, y0 + 4, gx1, y1 - 4)))
            funcion = re.sub(r"\s+", " ", ocr(img.crop((20, y0 + 4, x0 - 8, y1 - 4)))).strip()
            if geo is None:
                continue
            fichero = f"{codigo}.png"
            if os.path.exists(os.path.join(salida, fichero)):
                fichero = f"{codigo}_p{pag}.png"
            geo.save(os.path.join(salida, fichero), optimize=True)
            regs.append({"codigo": codigo, "texto_ocr": funcion, "pagina_pdf": pag,
                         "fichero": fichero, "px": list(geo.size)})
        print(pag, len(regs), flush=True)
    with open(os.path.join(salida, "marcas_ocr.json"), "w", encoding="utf-8") as f:
        json.dump(regs, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
