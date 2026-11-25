#!/usr/bin/env python3
"""Esquemas de los ejercicios «Toca en la imagen» del prototipo.

Usa la plantilla común (imagenes/esquemas/plantilla_esquemas.py) para que los
coches tengan el mismo estilo que el resto de esquemas. Escribe esquemas.js con
los SVG en una variable global, para que la demo funcione sin servidor.

Uso:  python3 prototipos/ejercicios/generar_esquemas.py
"""
import json
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "imagenes", "esquemas"))
import plantilla_esquemas as P  # noqa: E402


def cruce_tres_lados():
    """Cruce sin señales ni marcas: A sube desde el sur, B viene del oeste, C del este; los tres siguen recto."""
    els = P.via_vertical(central=None) + P.via_horizontal(central=None)
    els += [P.vehiculo(220, 300, 0, "A"),     # hacia el norte
            P.vehiculo(100, 220, 90, "B"),    # hacia el este (carril sur)
            P.vehiculo(300, 180, 270, "C")]   # hacia el oeste (carril norte)
    return els


def retencion_dos_carriles():
    """Autovía con dos carriles en tu sentido y la circulación detenida (misma geometría que retencion(2))."""
    return P.retencion(2)


ESQUEMAS = {
    "cruce": P.svg("Cruce sin señalizar",
                   "Cruce de dos vías sin señales ni marcas. El vehículo A llega desde abajo, "
                   "el B desde la izquierda y el C desde la derecha. Los tres van a seguir recto.",
                   cruce_tres_lados()),
    "retencion": P.svg("Retención en una autovía de dos carriles",
                       "Autovía con dos carriles en el mismo sentido, arcén a la derecha y mediana a la izquierda. "
                       "La circulación está detenida y los vehículos ocupan los dos carriles.",
                       retencion_dos_carriles()),
}

with open(os.path.join(AQUI, "esquemas.js"), "w", encoding="utf-8") as f:
    f.write("// Generado por generar_esquemas.py; no editar a mano.\n")
    f.write("window.ESQUEMAS_EJERCICIOS = " + json.dumps(ESQUEMAS, ensure_ascii=False) + ";\n")
print("esquemas.js:", ", ".join(ESQUEMAS))
