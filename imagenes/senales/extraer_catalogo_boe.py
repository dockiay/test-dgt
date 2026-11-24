#!/usr/bin/env python3
"""Extrae las señales del Catálogo oficial de señales verticales de circulación
(tomo I), incluido en el anexo I del Reglamento General de Circulación
(BOE-A-2003-23514, versión consolidada en /mnt/project-files/fuentes/).

Cada página del catálogo es una imagen con una tabla: a la izquierda el dibujo
de la señal y a la derecha su código, nombre y definición. El script:
  1. saca las imágenes de las páginas con `pdfimages`;
  2. localiza las celdas de la columna izquierda por sus bordes;
  3. lee con OCR (tesseract, español) el código, nombre y definición;
  4. recorta el dibujo y lo guarda como PNG con fondo transparente.

Uso: python3 extraer_catalogo_boe.py <pdf> <pag_ini> <pag_fin> <dir_paginas> <dir_salida>
Genera <dir_salida>/<CODIGO>.png y <dir_salida>/catalogo_ocr.json.
El OCR se revisa después: el índice final marca qué entradas se han comprobado.
"""
import glob
import json
import os
import re
import subprocess
import sys

import numpy as np
from PIL import Image

CODE_RE = re.compile(r"^\s*([PRS])\s*[-‑–]\s*(\d{1,3})\s*([a-z]?)\b")


def lineas(mask, eje, umbral):
    """Índices donde la proporción de píxeles oscuros supera `umbral`."""
    frac = mask.mean(axis=eje)
    return np.where(frac > umbral)[0]


def max_run(mask, eje):
    """Longitud del tramo oscuro continuo más largo en cada columna (eje=0)."""
    m = mask if eje == 0 else mask.T
    best = np.zeros(m.shape[1], dtype=int)
    cur = np.zeros(m.shape[1], dtype=int)
    for fila in m:
        cur = np.where(fila, cur + 1, 0)
        best = np.maximum(best, cur)
    return best


def agrupar(idx, sep=3):
    grupos = []
    for i in idx:
        if grupos and i - grupos[-1][-1] <= sep:
            grupos[-1].append(i)
        else:
            grupos.append([i])
    return [(g[0], g[-1]) for g in grupos]


def ocr(img):
    tmp = "/tmp/_ocr.png"
    img.save(tmp)
    out = subprocess.run(["tesseract", tmp, "-", "-l", "spa", "--psm", "6"],
                         capture_output=True, text=True).stdout
    return out


def leer_codigo(celda):
    """OCR de la celda del código, con corrección de confusiones típicas (S/5, O/0, l/1)."""
    tmp = "/tmp/_cod.png"
    w, h = celda.size
    celda.crop((min(18, w // 4), min(8, h // 4), max(w - 18, w * 3 // 4), max(h - 8, h * 3 // 4))).save(tmp)
    txt = subprocess.run(["tesseract", tmp, "-", "-l", "spa", "--psm", "7"],
                         capture_output=True, text=True).stdout.strip()
    txt = re.sub(r"[\s|!l\[\]]+$", "", re.sub(r"^[\s|!\[\]]+", "", txt)).replace(" ", "")
    m = re.match(r"^([PRS5])[-‑–—~.]?([0-9SOolIB]{1,3})([a-zA-Z]?)$", txt)
    if not m:
        # "R-3089" -> R-308g (la g minúscula se lee a veces como 9)
        m2 = re.match(r"^([PRS5])[-‑–—~]?([0-9]{3})9$", txt)
        if not m2:
            return None
        return f"{'S' if m2.group(1) == '5' else m2.group(1)}-{int(m2.group(2))}g"
    letra = "S" if m.group(1) == "5" else m.group(1)
    num = m.group(2).translate(str.maketrans("SOolIB", "500118"))
    return f"{letra}-{int(num)}{m.group(3).lower()}"


def recortar_firma(img):
    a = np.asarray(img.convert("RGB")).astype(int)
    # borra restos de los bordes de la celda (líneas negras que ocupan casi todo el alto/ancho)
    negro = (a.max(axis=2) < 160) & ((a.max(axis=2) - a.min(axis=2)) < 30)
    for eje in (0, 1):
        f = negro.mean(axis=eje)
        fp = np.pad(f, 4)
        aisl = (f > 0.25) & (fp[:-8] < 0.05) & (fp[8:] < 0.05)  # línea fina y aislada
        if eje == 0:
            a[:, aisl] = 255
        else:
            a[aisl, :] = 255
    img = Image.fromarray(a.astype("uint8"))
    no_blanco = (a < 235).any(axis=2)
    ys, xs = np.where(no_blanco)
    if len(xs) == 0:
        return None
    pad = 6
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, a.shape[1] - 1)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, a.shape[0] - 1)
    rec = img.convert("RGBA").crop((x0, y0, x1 + 1, y1 + 1))
    arr = np.asarray(rec).copy()
    blanco = (arr[:, :, :3] > 245).all(axis=2)
    # transparencia solo en el blanco conectado con el borde (no en el interior de la señal)
    from collections import deque
    h, w = blanco.shape
    vis = np.zeros_like(blanco)
    q = deque([(y, x) for y in range(h) for x in (0, w - 1)] + [(y, x) for x in range(w) for y in (0, h - 1)])
    while q:
        y, x = q.popleft()
        if 0 <= y < h and 0 <= x < w and blanco[y, x] and not vis[y, x]:
            vis[y, x] = True
            q.extend([(y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)])
    arr[vis, 3] = 0
    return Image.fromarray(arr)


def procesar_pagina(ruta, pagina, salida, registros, sin_codigo):
    img = Image.open(ruta).convert("RGB")
    g = np.asarray(img.convert("L"))
    osc = g < 110
    H, W = g.shape
    # bordes verticales de la tabla: columnas con un trazo oscuro continuo largo
    runs = max_run(osc, 0)
    cand = agrupar(np.where(runs > 250)[0])
    # los bordes de la tabla son dobles (dos líneas separadas ~12 px); los trazos de las señales no
    dobles = [(g, h) for g, h in zip(cand, cand[1:]) if 5 <= h[0] - g[1] <= 20]
    izq = None
    if len(dobles) >= 2 and 300 < dobles[1][0][0] - dobles[0][1][1] < 1300:
        izq = (dobles[0][1][1] + 1, dobles[1][0][0] - 1)
    elif dobles:
        x0 = dobles[0][1][1]
        sig = [g for g in cand if g[0] - x0 > 300]
        if sig and sig[0][0] - x0 < 1300:
            izq = (x0 + 1, sig[0][0] - 1)
    if not izq:
        return
    xl, xr = izq
    franja = osc[:, xl + 8:xr - 8]
    # líneas de la tabla: casi todo el ancho oscuro Y pegadas a ambos bordes de la columna
    # (los bordes de los carteles no llegan a tocar los bordes de la celda)
    filas_ok = (franja.mean(axis=1) > 0.85) & (franja[:, :12].mean(axis=1) > 0.9) & (franja[:, -12:].mean(axis=1) > 0.9)
    hfilas = agrupar(np.where(filas_ok)[0])
    for (t0, t1), (b0, b1) in zip(hfilas, hfilas[1:]):
        if b0 - t1 < 60:
            continue
        celda = img.crop((xl + 4, t1 + 4, xr - 4, b0 - 4))
        derecha = img.crop((xr + 4, t1 + 2, W - int(W * 0.06), b0 - 2))
        # la parte derecha tiene dos cajas: arriba código + nombre, abajo definición
        dosc = np.asarray(derecha.convert("L")) < 160
        hl = [g for g in agrupar(lineas(dosc[:, 20:-20], 1, 0.8)) if 25 < g[0] < dosc.shape[0] - 25]
        if hl:
            cab = derecha.crop((0, 0, derecha.width, hl[0][0]))
            cuerpo = derecha.crop((0, hl[-1][1] + 1, derecha.width, derecha.height))
        else:
            cab, cuerpo = derecha, None
        # dentro de la cabecera, una línea vertical separa la celda del código de la del nombre
        dcab = np.asarray(cab.convert("L")) < 160
        vl = [g for g in agrupar(lineas(dcab[5:-5], 0, 0.7)) if 60 < g[0] < dcab.shape[1] * 0.5]
        if vl:
            celda_cod = cab.crop((0, 0, vl[0][0], cab.height))
            celda_nom = cab.crop((vl[-1][1] + 1, 0, cab.width, cab.height))
        else:
            celda_cod, celda_nom = cab, cab
        codigo = leer_codigo(celda_cod)
        if not codigo:
            m = CODE_RE.match(re.sub(r"^[\s|!\[\]]+", "", ocr(cab)))
            if m:
                codigo = f"{m.group(1)}-{m.group(2)}{m.group(3)}"
        if not codigo:
            sin_codigo.append({"pagina_pdf": pagina, "y": int(t1), "texto": ocr(cab)})
            continue
        nombre = re.sub(r"\s+", " ", ocr(celda_nom).replace("|", " ")).strip(" .")
        if celda_nom is cab:
            nombre = CODE_RE.sub("", nombre).strip(" .")
        resto = re.sub(r"\s+", " ", ocr(cuerpo).replace("|", " ")).strip() if cuerpo else ""
        sig = recortar_firma(celda)
        if sig is None:
            continue
        fichero = f"{codigo}.png"
        if os.path.exists(os.path.join(salida, fichero)):
            fichero = f"{codigo}_p{pagina}.png"
        sig.save(os.path.join(salida, fichero), optimize=True)
        registros.append({"codigo": codigo, "nombre_ocr": nombre, "texto_ocr": resto,
                          "pagina_pdf": pagina, "fichero": fichero,
                          "px": list(sig.size)})


def main():
    pdf, p0, p1, dirpag, salida = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4], sys.argv[5]
    os.makedirs(dirpag, exist_ok=True)
    os.makedirs(salida, exist_ok=True)
    if not glob.glob(os.path.join(dirpag, "*.png")):
        subprocess.run(["pdfimages", "-png", "-p", "-f", str(p0), "-l", str(p1), pdf,
                        os.path.join(dirpag, "pg")], check=True)
    registros = []
    sin_codigo = []
    for ruta in sorted(glob.glob(os.path.join(dirpag, "pg-*.png"))):
        pagina = int(os.path.basename(ruta).split("-")[1])
        if os.environ.get("PAGINAS") and str(pagina) not in os.environ["PAGINAS"].split(","):
            continue
        procesar_pagina(ruta, pagina, salida, registros, sin_codigo)
        print(pagina, len(registros), flush=True)
    with open(os.path.join(salida, "catalogo_ocr.json"), "w", encoding="utf-8") as f:
        json.dump(registros, f, ensure_ascii=False, indent=1)
    with open(os.path.join(salida, "filas_sin_codigo.json"), "w", encoding="utf-8") as f:
        json.dump(sin_codigo, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
