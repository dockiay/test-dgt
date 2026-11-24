#!/usr/bin/env python3
"""Plantilla de esquemas de tráfico en vista cenital (dibujos propios).

Uso:  python3 plantilla_esquemas.py   -> regenera todos los SVG de esta carpeta.

Para añadir un esquema nuevo: escribe una función que devuelva una lista de
elementos SVG usando las primitivas de abajo y regístrala en ESQUEMAS con su
nombre de fichero, título y descripción (alt).

Convenciones de estilo (mantenerlas para que todo se vea coherente):
- Lienzo cuadrado, viewBox 0 0 400 400, sin width/height fijos.
- Se circula por la DERECHA. Calzada gris, arcén/entorno verde, marcas blancas.
- Vehículos vistos desde arriba, con letra: A (rojo, "tu vehículo" por defecto),
  B (azul), C (amarillo), D (verde). Morro = parte con parabrisas oscuro.
- La trayectoria prevista se dibuja como flecha del color del vehículo.
- Ángulos: 0 = hacia arriba, 90 = hacia la derecha, 180 = abajo, 270 = izquierda.
- El dibujo muestra la situación; nunca escribe la respuesta.
"""
import math
import os

W = 400
ASFALTO = "#5f646b"
ENTORNO = "#cfe0b8"
ACERA = "#e6e1d6"
MARCA = "#ffffff"
COLORES = {"A": "#d43d3d", "B": "#2a66cc", "C": "#e3a21a", "D": "#2e9a4f"}
LANE = 40  # ancho de carril


# ---------------------------------------------------------------- primitivas
def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" {extra}/>'


def linea(x1, y1, x2, y2, discontinua=False, ancho=3, color=MARCA):
    dash = ' stroke-dasharray="16 14"' if discontinua else ""
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" '
            f'stroke-width="{ancho}"{dash}/>')


def via_vertical(cx=200, carriles=2, y1=0, y2=W, central="discontinua"):
    """Vía N-S. carriles=2 -> un carril por sentido."""
    w = carriles * LANE
    els = [rect(cx - w / 2, y1, w, y2 - y1, ASFALTO)]
    if central:
        els.append(linea(cx, y1, cx, y2, discontinua=(central == "discontinua")))
    return els


def via_horizontal(cy=200, carriles=2, x1=0, x2=W, central="discontinua"):
    w = carriles * LANE
    els = [rect(x1, cy - w / 2, x2 - x1, w, ASFALTO)]
    if central:
        els.append(linea(x1, cy, x2, cy, discontinua=(central == "discontinua")))
    return els


def vehiculo(x, y, angulo, letra, color=None, largo=40, ancho=22):
    """Turismo visto desde arriba, centrado en (x, y), con el morro hacia `angulo`."""
    c = color or COLORES.get(letra, "#777")
    l, a = largo, ancho
    return (
        f'<g transform="translate({x:.1f} {y:.1f}) rotate({angulo:.1f})">'
        f'<rect x="{-a/2}" y="{-l/2}" width="{a}" height="{l}" rx="6" fill="{c}" '
        f'stroke="#1b1b1b" stroke-width="1.5"/>'
        f'<rect x="{-a/2+3}" y="{-l/2+6}" width="{a-6}" height="8" rx="2" fill="#20262e"/>'
        f'<rect x="{-a/2+3}" y="{l/2-9}" width="{a-6}" height="5" rx="2" fill="#20262e"/>'
        f'<text x="0" y="5" transform="rotate({-angulo:.1f})" text-anchor="middle" '
        f'font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="15" '
        f'fill="#fff">{letra}</text>'
        f'</g>'
    )


def flecha(d, letra="A", color=None):
    """Trayectoria: `d` es un path SVG. Usa el marcador del color del vehículo."""
    c = color or COLORES.get(letra, "#333")
    return (f'<path d="{d}" fill="none" stroke="{c}" stroke-width="4" '
            f'stroke-linecap="round" stroke-dasharray="2 9" marker-end="url(#punta-{letra})"/>')


def linea_detencion(x1, y1, x2, y2):
    return linea(x1, y1, x2, y2, ancho=6)


def texto_calzada(x, y, txt, angulo=0, size=16):
    return (f'<text x="{x}" y="{y}" transform="rotate({angulo} {x} {y})" text-anchor="middle" '
            f'font-family="Arial, Helvetica, sans-serif" font-weight="bold" '
            f'font-size="{size}" fill="{MARCA}">{txt}</text>')


def svg(titulo, desc, cuerpo):
    marcadores = "".join(
        f'<marker id="punta-{k}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" '
        f'markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{v}"/></marker>'
        for k, v in COLORES.items())
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {W}" role="img" '
        f'aria-labelledby="t d">\n<title id="t">{titulo}</title>\n<desc id="d">{desc}</desc>\n'
        f'<defs>{marcadores}</defs>\n{rect(0, 0, W, W, ENTORNO)}\n' + "\n".join(cuerpo) + "\n</svg>\n"
    )


# ---------------------------------------------------------------- ejemplos
def cruce_sin_senalizar():
    els = via_vertical(central=None) + via_horizontal(central=None)
    # marcas centrales solo fuera del cruce
    for a, b in ((0, 160), (240, 400)):
        els.append(linea(200, a, 200, b, discontinua=True))
        els.append(linea(a, 200, b, 200, discontinua=True))
    els += [
        vehiculo(220, 300, 0, "A"),
        flecha("M220,272 L220,95", "A"),
        vehiculo(300, 180, 270, "B"),
        flecha("M272,180 L95,180", "B"),
    ]
    return els


def glorieta():
    cx = cy = 200
    r_ext, r_isla = 125, 58
    els = via_vertical(central="discontinua") + via_horizontal(central="discontinua")
    els += [f'<circle cx="{cx}" cy="{cy}" r="{r_ext}" fill="{ASFALTO}"/>',
            f'<circle cx="{cx}" cy="{cy}" r="{r_isla}" fill="{ENTORNO}" stroke="{MARCA}" stroke-width="3"/>']
    # líneas de ceda el paso (discontinuas) en cada entrada, carril de la derecha
    els += [linea(200, 330, 240, 330, discontinua=True, ancho=5),
            linea(160, 70, 200, 70, discontinua=True, ancho=5),
            linea(70, 200, 70, 240, discontinua=True, ancho=5),
            linea(330, 160, 330, 200, discontinua=True, ancho=5)]
    r = (r_ext + r_isla) / 2

    def punto(t):
        t = math.radians(t)
        return cx + r * math.cos(t), cy - r * math.sin(t)

    def rumbo(t):  # sentido antihorario visto desde arriba
        t = math.radians(t)
        dx, dy = -math.sin(t), -math.cos(t)
        return math.degrees(math.atan2(dx, -dy)) % 360

    xa, ya = punto(215)
    x1, y1 = punto(235)
    x2, y2 = punto(300)
    els += [vehiculo(xa, ya, rumbo(215), "A"),
            flecha(f"M{x1:.1f},{y1:.1f} A{r},{r} 0 0 0 {x2:.1f},{y2:.1f}", "A"),
            vehiculo(220, 355, 0, "B"),
            flecha("M220,328 L220,300", "B")]
    return els


def adelantamiento():
    els = via_horizontal(central="discontinua")
    els += [
        vehiculo(90, 220, 90, "A"),
        vehiculo(190, 220, 90, "B"),
        flecha("M118,220 C150,220 140,180 175,180 L230,180 C265,180 255,220 290,220", "A"),
        vehiculo(360, 180, 270, "C"),
    ]
    return els


def incorporacion_autovia():
    els = [rect(140, 0, 80, W, ASFALTO),
           linea(180, 0, 180, W, discontinua=True),
           # carril de aceleración por la derecha, que acaba en cuña
           f'<path d="M220,400 L260,400 L260,190 L220,90 Z" fill="{ASFALTO}"/>',
           linea(220, 400, 220, 190, discontinua=True, ancho=3),
           linea(140, 0, 140, W, ancho=3), linea(220, 0, 220, 90, ancho=3),
           vehiculo(240, 320, 0, "A"),
           flecha("M240,292 L240,215 C240,175 200,170 200,130", "A"),
           vehiculo(200, 250, 0, "B"),
           flecha("M200,222 L200,40", "B")]
    return els


def interseccion_t_stop():
    els = via_horizontal(central="discontinua")
    els += [rect(160, 220, 80, 180, ASFALTO),
            linea(200, 240, 200, 400, discontinua=True),
            linea_detencion(200, 244, 240, 244),
            texto_calzada(220, 280, "STOP", size=11),
            vehiculo(220, 330, 0, "A"),
            flecha("M220,302 L220,215 C220,185 200,180 160,180 L90,180", "A"),
            vehiculo(330, 180, 270, "B"),
            flecha("M302,180 L250,180", "B")]
    return els


ESQUEMAS = [
    ("cruce-sin-senalizar.svg", "Cruce sin señalizar",
     "Cruce de dos vías sin señales. El vehículo A sube de frente; el vehículo B se acerca por la derecha de A con intención de seguir recto.",
     cruce_sin_senalizar),
    ("glorieta-entrada.svg", "Entrada a una glorieta",
     "Glorieta de un carril. El vehículo A circula por el anillo y se acerca a la entrada sur; el vehículo B espera en esa entrada, ante la línea de ceda el paso.",
     glorieta),
    ("adelantamiento-linea-discontinua.svg", "Adelantamiento con línea discontinua",
     "Vía de doble sentido con línea central discontinua. El vehículo A adelanta al vehículo B; el vehículo C circula de frente por el carril contrario.",
     adelantamiento),
    ("incorporacion-autovia.svg", "Incorporación a una autovía",
     "El vehículo A circula por el carril de aceleración para incorporarse a la autovía; el vehículo B circula por el carril derecho de la autovía.",
     incorporacion_autovia),
    ("interseccion-t-stop.svg", "Intersección en T con STOP",
     "Intersección en T. El vehículo A está en la vía secundaria, ante una línea de detención con la marca STOP, y quiere girar a la izquierda; el vehículo B circula por la vía principal acercándose desde la derecha de A.",
     interseccion_t_stop),
]

if __name__ == "__main__":
    aqui = os.path.dirname(os.path.abspath(__file__))
    for fichero, titulo, desc, fn in ESQUEMAS:
        with open(os.path.join(aqui, fichero), "w", encoding="utf-8") as f:
            f.write(svg(titulo, desc, fn()))
        print("ok", fichero)
