#!/usr/bin/env python3
"""Variante oscura de los esquemas SVG (imagenes/esquemas e img/esquemas).

Los esquemas se muestran con <img>, así que la web no puede cambiarles los colores desde fuera.
Este script mete en cada SVG un <style> con @media (prefers-color-scheme: dark) que oscurece
solo el escenario (césped, asfalto, aceras, árboles, tejados), igual que las escenas animadas
(escenas.css). Los coches, las señales y las marcas no cambian. En modo claro el dibujo queda
idéntico. Se puede lanzar las veces que haga falta: sustituye el bloque si ya existe.

Uso: python3 tools/oscuro_esquemas.py
"""
import glob
import os
import re

# color claro -> color oscuro (los mismos tonos que --esc-* en escenas.css)
RELLENOS = {
    "#cfe0b8": "#3d5233",  # césped
    "#b9c7a5": "#344828",  # mediana
    "#8fa77a": "#2c3d22",
    "#5f646b": "#3a3f47",  # asfalto
    "#e6e1d6": "#7d7b74",  # acera
    "#5fae5f": "#4c8f44",  # copa de árbol, luz
    "#3f8f4a": "#2f6b31",  # copa de árbol
    "#d98b6a": "#9a5e48",  # tejado
    "#cfe6f5": "#22364a",  # cielo
    "#eef1f4": "#262d3b",  # fondo neutro
    "#20304f": "#4d74b8",  # uniforme del agente: que no se pierda sobre el asfalto oscuro
}
TRAZOS = {
    "#5f646b": "#3a3f47",
    "#b86a4c": "#7c4835",  # cumbrera
    "#c8c0ae": "#6b6555",  # bordillo
}
MARCA_INI, MARCA_FIN = '<style id="oscuro">', "</style>"


def estilo():
    reglas = "".join(f'[fill="{a}"]{{fill:{b}}}' for a, b in RELLENOS.items())
    reglas += "".join(f'[stroke="{a}"]{{stroke:{b}}}' for a, b in TRAZOS.items())
    return f"{MARCA_INI}@media (prefers-color-scheme:dark){{{reglas}}}{MARCA_FIN}"


def aplicar(svg):
    svg = re.sub(re.escape(MARCA_INI) + r".*?" + re.escape(MARCA_FIN) + r"\n?", "", svg, flags=re.S)
    m = re.search(r"<svg\b[^>]*>", svg)
    if not m:
        return svg
    return svg[:m.end()] + "\n" + estilo() + svg[m.end():]


def main():
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    n = 0
    for carpeta in ("imagenes/esquemas", "img/esquemas"):
        for ruta in sorted(glob.glob(os.path.join(raiz, carpeta, "*.svg"))):
            with open(ruta, encoding="utf-8") as f:
                antes = f.read()
            despues = aplicar(antes)
            if despues != antes:
                with open(ruta, "w", encoding="utf-8") as f:
                    f.write(despues)
                n += 1
    print(f"{n} ficheros actualizados")


if __name__ == "__main__":
    main()
