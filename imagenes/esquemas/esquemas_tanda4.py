#!/usr/bin/env python3
"""Esquemas de la cuarta tanda (25/11/2026): preguntas sin imagen que se entienden mejor con un dibujo.

Usa las primitivas y el estilo de plantilla_esquemas.py (coche con morro, faros y chevrón de sentido),
pero escribe solo sus propios SVG, para no reescribir los antiguos (perderían sus metadatos).

Uso:  python3 esquemas_tanda4.py   -> escribe los SVG de ESQUEMAS_TANDA4 en esta carpeta.

Regla de siempre: el dibujo muestra la situación del enunciado y nunca la respuesta.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from plantilla_esquemas import (W, ASFALTO, ENTORNO, ACERA, MARCA, COLORES, rect, linea, via_horizontal,  # noqa: E402
                                vehiculo, flecha, texto_calzada, svg, senal_img, poste, recuadro, peaton_glifo,
                                linea_detencion, _aclarar)

BORDILLO = "#9a948a"
CASA = "#d98b6a"
NIEVE = "#f4f8fb"


# ---------------------------------------------------------------- piezas
def camion(x, y, angulo, letra, largo=96, ancho=28, color=None):
    """Camión rígido visto desde arriba: cabina del color de la letra y caja clara detrás."""
    c = color or COLORES.get(letra, "#777")
    borde = _aclarar(c, -0.45)
    h, m = largo / 2, ancho / 2
    cab = 26
    partes = [
        f'<rect x="{-m + 1.5}" y="{-h + 2}" width="{ancho}" height="{largo}" rx="4" fill="#000" opacity=".22"/>',
        # caja
        f'<rect x="{-m}" y="{-h + cab + 3}" width="{ancho}" height="{largo - cab - 3}" rx="3" fill="#eef0f2" stroke="#7d8389" stroke-width="1.4"/>',
        f'<line x1="0" y1="{-h + cab + 8}" x2="0" y2="{h - 5}" stroke="#c9cdd2" stroke-width="1.2"/>',
        # cabina
        f'<path d="M{-m},{-h + 8} Q{-m},{-h} {-m + 7},{-h} L{m - 7},{-h} Q{m},{-h} {m},{-h + 8} L{m},{-h + cab} L{-m},{-h + cab} Z" '
        f'fill="{c}" stroke="{borde}" stroke-width="1.4"/>',
        f'<path d="M{-m + 3},{-h + 7} Q0,{-h + 4} {m - 3},{-h + 7} L{m - 4},{-h + 12} Q0,{-h + 10.5} {-m + 4},{-h + 12} Z" fill="#1f2630"/>',
        f'<rect x="{-m + 2}" y="{-h + 0.6}" width="6" height="3" rx="1.5" fill="#fff7cf"/>',
        f'<rect x="{m - 8}" y="{-h + 0.6}" width="6" height="3" rx="1.5" fill="#fff7cf"/>',
        f'<rect x="{-m + 2}" y="{h - 2.6}" width="5" height="2.2" rx="1.1" fill="#ff3b30"/>',
        f'<rect x="{m - 7}" y="{h - 2.6}" width="5" height="2.2" rx="1.1" fill="#ff3b30"/>',
    ]
    if letra:
        partes.append(f'<text x="0" y="5.5" transform="translate(0 {cab + 10}) rotate({-angulo:.1f})" text-anchor="middle" '
                      f'font-family="-apple-system, \'Helvetica Neue\', Arial, sans-serif" font-weight="800" font-size="15" '
                      f'fill="#fff" stroke="{borde}" stroke-width="2.4" paint-order="stroke">{letra}</text>')
    d = f"M-7,{-h - 5} L0,{-h - 12} L7,{-h - 5}"
    partes.append(f'<g class="sentido" data-letra="{letra}" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                  f'<path d="{d}" stroke="#fff" stroke-width="6.5"/><path d="{d}" stroke="{c}" stroke-width="3.5"/></g>')
    return f'<g transform="translate({x:.1f} {y:.1f}) rotate({angulo:.1f})">' + "".join(partes) + "</g>"


def caravana(x, y, angulo, letra):
    """Turismo con caravana enganchada, visto desde arriba (morro hacia `angulo`)."""
    a = math.radians(angulo)
    dx, dy = -math.sin(a), math.cos(a)  # hacia atrás
    cx, cy = x + dx * 58, y + dy * 58
    rem = (f'<g transform="translate({cx:.1f} {cy:.1f}) rotate({angulo:.1f})">'
           f'<rect x="-14.5" y="-33" width="31" height="68" rx="6" fill="#000" opacity=".2"/>'
           f'<rect x="-16" y="-35" width="32" height="68" rx="6" fill="#f7f7f5" stroke="#7d8389" stroke-width="1.4"/>'
           f'<rect x="-16" y="-8" width="32" height="7" fill="#9aa0a6"/>'
           f'<line x1="0" y1="-35" x2="0" y2="-44" stroke="#33383f" stroke-width="3"/>'
           f'<rect x="-14" y="30" width="5" height="2.2" rx="1.1" fill="#ff3b30"/><rect x="9" y="30" width="5" height="2.2" rx="1.1" fill="#ff3b30"/></g>')
    return rem + vehiculo(x, y, angulo, letra)


def bici_arriba(x, y, angulo, color="#2e9a4f", escala=1.4):
    """Ciclista visto desde arriba (bicicleta y persona), morro hacia `angulo`."""
    return (f'<g transform="translate({x:.1f} {y:.1f}) rotate({angulo:.1f}) scale({escala})">'
            f'<line x1="0" y1="-15" x2="0" y2="15" stroke="#22262b" stroke-width="3" stroke-linecap="round"/>'
            f'<line x1="-6" y1="-9" x2="6" y2="-9" stroke="#22262b" stroke-width="2.4" stroke-linecap="round"/>'
            f'<ellipse cx="0" cy="1" rx="8" ry="6" fill="{color}" stroke="{_aclarar(color, -0.4)}" stroke-width="1.2"/>'
            f'<circle cx="0" cy="-2" r="4" fill="#f0c9a6" stroke="#5a3b26" stroke-width="1"/></g>')


def persona_arriba(x, y, color="#7b5cd6", escala=1.4):
    return (f'<g transform="translate({x:.1f} {y:.1f}) scale({escala})"><ellipse cx="1.5" cy="2" rx="9" ry="6" fill="#000" opacity=".2"/>'
            f'<ellipse cx="0" cy="0" rx="9" ry="5.5" fill="{color}" stroke="{_aclarar(color, -0.4)}" stroke-width="1"/>'
            f'<circle cx="0" cy="0" r="4.2" fill="#5a3b26"/></g>')


def arbol(x, y, r=14):
    return (f'<circle cx="{x + 2}" cy="{y + 3}" r="{r}" fill="#000" opacity=".15"/>'
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="#3f8f4a"/><circle cx="{x - r * .3}" cy="{y - r * .3}" r="{r * .45}" fill="#5fae5f"/>')


def casa(x, y, w, h):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{CASA}" stroke="#b86a4c" stroke-width="2"/>'
            f'<line x1="{x}" y1="{y + h / 2}" x2="{x + w}" y2="{y + h / 2}" stroke="#b86a4c" stroke-width="2"/>')


def conos(puntos):
    return "".join(f'<circle cx="{x + 1}" cy="{y + 1.5}" r="5" fill="#000" opacity=".2"/><circle cx="{x}" cy="{y}" r="5" fill="#ff7a1a"/>'
                   f'<circle cx="{x}" cy="{y}" r="2.2" fill="#fff"/>' for x, y in puntos)


def flecha_pintada(x, y, ang=0, escala=1.0):
    """Flecha blanca pintada en el carril (ang 0 = hacia arriba)."""
    return (f'<path d="M0,-22 L10,-6 L3.5,-6 L3.5,20 L-3.5,20 L-3.5,-6 L-10,-6 Z" fill="#fff" '
            f'transform="translate({x} {y}) rotate({ang}) scale({escala})"/>')


def calzada_vertical(x0, carriles, ancho=50, lineas=None, bordes=True):
    """Calzada N-S desde x0 con `carriles` carriles; lineas: lista de tipos entre carriles ('d', 'c' o None)."""
    els = [rect(x0, 0, carriles * ancho, W, ASFALTO)]
    if bordes:
        els += [linea(x0 + 3, 0, x0 + 3, W, ancho=3), linea(x0 + carriles * ancho - 3, 0, x0 + carriles * ancho - 3, W, ancho=3)]
    for i in range(1, carriles):
        t = (lineas or ["d"] * (carriles - 1))[i - 1]
        if t:
            els.append(linea(x0 + i * ancho, 0, x0 + i * ancho, W, discontinua=(t == "d")))
    return els


def autovia_vertical(carriles, ancho=50):
    """Autovía hacia arriba: mediana con barrera a la izquierda, carriles y arcén a la derecha. Devuelve (els, x0)."""
    total = carriles * ancho
    x0 = 200 - total / 2
    els = [rect(x0 - 60, 0, 44, W, "#b9c7a5"), f'<rect x="{x0 - 40:.0f}" y="0" width="4" height="400" fill="#8a8f96"/>',
           rect(x0 - 14, 0, total + 50, W, ASFALTO), linea(x0, 0, x0, W, ancho=3), linea(x0 + total, 0, x0 + total, W, ancho=3)]
    for i in range(1, carriles):
        els.append(linea(x0 + i * ancho, 0, x0 + i * ancho, W, discontinua=True))
    return els, x0


def tunel_horizontal(x_boca):
    """Boca de túnel en una vía horizontal: desde x_boca hacia la derecha la vía va bajo tierra."""
    return [f'<rect x="{x_boca}" y="0" width="{W - x_boca}" height="{W}" fill="#8fa77a"/>',
            f'<path d="M{x_boca},0 L{x_boca},400" stroke="#6e8160" stroke-width="10"/>',
            f'<rect x="{x_boca}" y="118" width="{W - x_boca}" height="164" fill="#2d3136" opacity=".88"/>',
            f'<rect x="{x_boca - 6}" y="112" width="14" height="176" rx="3" fill="#b8b2a6" stroke="#8a847a" stroke-width="2"/>']


def vista_trasera(x, y, color, letra="", escala=1.0):
    """Turismo visto desde detrás. Devuelve (elementos, puntos útiles)."""
    s = escala
    c = color
    borde = _aclarar(c, -0.45)
    els = [f'<g transform="translate({x} {y}) scale({s})">',
           '<ellipse cx="0" cy="62" rx="98" ry="10" fill="#000" opacity=".2"/>',
           f'<path d="M-62,-30 Q-58,-70 -30,-72 L30,-72 Q58,-70 62,-30 Z" fill="{_aclarar(c, 0.1)}" stroke="{borde}" stroke-width="3"/>',
           '<path d="M-52,-34 Q-48,-62 -26,-63 L26,-63 Q48,-62 52,-34 Z" fill="#26303b"/>',
           f'<rect x="-92" y="-34" width="184" height="80" rx="16" fill="{c}" stroke="{borde}" stroke-width="3"/>',
           '<rect x="-30" y="8" width="60" height="18" rx="3" fill="#fff" stroke="#33383f" stroke-width="2"/>',
           '<rect x="-74" y="46" width="30" height="16" rx="4" fill="#22262b"/><rect x="44" y="46" width="30" height="16" rx="4" fill="#22262b"/>']
    if letra:
        els.append(f'<text x="0" y="22" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" '
                   f'font-size="15" fill="#22262b">{letra}</text>')
    els.append('</g>')
    return els


def piloto(x, y, ancho, alto, color):
    return f'<rect x="{x}" y="{y}" width="{ancho}" height="{alto}" rx="5" fill="{color}" stroke="#33383f" stroke-width="2"/>'


def rayos(x, y, r1, r2, color, ancho=3):
    out = []
    for ang in range(0, 360, 45):
        a = math.radians(ang)
        out.append(f'<line x1="{x + r1 * math.cos(a):.1f}" y1="{y + r1 * math.sin(a):.1f}" x2="{x + r2 * math.cos(a):.1f}" '
                   f'y2="{y + r2 * math.sin(a):.1f}" stroke="{color}" stroke-width="{ancho}" stroke-linecap="round"/>')
    return out


def perspectiva_recta():
    """Vista desde el puesto de conducción en una carretera recta de doble sentido."""
    return [rect(0, 0, W, 170, "#cfe6f5"), rect(0, 170, W, 230, ENTORNO),
            f'<polygon points="10,400 390,400 222,170 178,170" fill="{ASFALTO}"/>',
            '<path d="M200,400 L200,175" stroke="#fff" stroke-width="3" stroke-dasharray="22 16"/>',
            '<path d="M30,400 L181,172 M370,400 L219,172" stroke="#fff" stroke-width="3"/>']


# ---------------------------------------------------------------- adelantamientos
def glorieta_dos_carriles():
    cx = cy = 200
    r_ext, r_isla = 150, 60
    els = [rect(160, 0, 80, W, ASFALTO), rect(0, 160, W, 80, ASFALTO),
           linea(200, 0, 200, 40, discontinua=True), linea(200, 360, 200, 400, discontinua=True),
           linea(0, 200, 40, 200, discontinua=True), linea(360, 200, 400, 200, discontinua=True),
           f'<circle cx="{cx}" cy="{cy}" r="{r_ext}" fill="{ASFALTO}"/>',
           f'<circle cx="{cx}" cy="{cy}" r="{(r_ext + r_isla) / 2}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="16 14"/>',
           f'<circle cx="{cx}" cy="{cy}" r="{r_isla}" fill="{ENTORNO}" stroke="{MARCA}" stroke-width="3"/>',
           arbol(200, 200, 22)]
    # líneas de ceda el paso en las entradas (carril derecho de cada brazo)
    els += [linea(200, 352, 240, 352, discontinua=True, ancho=5), linea(160, 48, 200, 48, discontinua=True, ancho=5),
            linea(48, 200, 48, 240, discontinua=True, ancho=5), linea(352, 160, 352, 200, discontinua=True, ancho=5)]
    r = r_ext - 23  # carril exterior

    def en(t):
        tr = math.radians(t)
        return cx + r * math.cos(tr), cy - r * math.sin(tr), (math.degrees(math.atan2(-math.sin(tr), math.cos(tr)))) % 360

    for letra, t in (("A", 210), ("B", 250)):
        x, y, ang = en(t)
        els.append(vehiculo(x, y, ang, letra))
    return els


def tranvia_arriba(x, y, angulo, largo=150):
    h = largo / 2
    partes = [f'<rect x="-14" y="{-h + 2}" width="30" height="{largo}" rx="10" fill="#000" opacity=".2"/>',
              f'<rect x="-15" y="{-h}" width="30" height="{largo}" rx="12" fill="#f2f2ee" stroke="#5f646b" stroke-width="1.6"/>']
    for k in (1, 2):
        yy = -h + k * largo / 3
        partes.append(f'<rect x="-15" y="{yy - 3}" width="30" height="6" fill="#5f646b"/>')
    partes += [f'<rect x="-15" y="{-h + 14}" width="30" height="5" fill="#e3a21a"/>',
               f'<path d="M-11,{-h + 9} Q0,{-h + 3} 11,{-h + 9}" stroke="#1f2630" stroke-width="5" fill="none"/>']
    return f'<g transform="translate({x} {y}) rotate({angulo})">' + "".join(partes) + "</g>"


def tranvia_central():
    els = [rect(0, 120, W, 160, ACERA), rect(0, 130, W, 140, ASFALTO),
           linea(0, 130, W, 130, ancho=2, color=BORDILLO), linea(0, 270, W, 270, ancho=2, color=BORDILLO),
           rect(0, 0, W, 120, ENTORNO), rect(0, 280, W, 120, ENTORNO),
           casa(10, 30, 110, 70), casa(140, 30, 120, 70), casa(280, 30, 110, 70),
           casa(10, 300, 110, 70), casa(140, 300, 120, 70), casa(280, 300, 110, 70)]
    for o in (-9, 9):
        els.append(f'<line x1="0" y1="{200 + o}" x2="{W}" y2="{200 + o}" stroke="#8a8f96" stroke-width="3"/>')
    els += [linea(0, 178, W, 178, discontinua=True), linea(0, 222, W, 222, discontinua=True),
            tranvia_arriba(250, 200, 90), vehiculo(90, 247, 90, "A"), vehiculo(330, 153, 270, "B")]
    return els


def tunel_un_carril():
    els = via_horizontal(cy=200, carriles=2, central="discontinua")
    els += [linea(0, 160, W, 160, ancho=2), linea(0, 240, W, 240, ancho=2)]
    els += tunel_horizontal(250)
    els += [vehiculo(70, 220, 90, "A"), vehiculo(170, 220, 90, "B")]
    img, _ = senal_img("S-5", 214, 258, 30)
    els += [poste(229, 290, 318), img]
    return els


def tunel_dos_carriles():
    els = [rect(0, 140, W, 120, ASFALTO), linea(0, 142, W, 142, ancho=2), linea(0, 258, W, 258, ancho=2),
           linea(0, 180, W, 180), linea(0, 220, W, 220, discontinua=True)]
    els += tunel_horizontal(250)
    els[-3] = f'<rect x="250" y="136" width="150" height="128" fill="#2d3136" opacity=".88"/>'
    els[-2] = f'<rect x="244" y="130" width="14" height="140" rx="3" fill="#b8b2a6" stroke="#8a847a" stroke-width="2"/>'
    els += [vehiculo(70, 240, 90, "A"), vehiculo(170, 240, 90, "B"), vehiculo(330, 160, 270, "C")]
    img, _ = senal_img("S-5", 214, 278, 30)
    els += [poste(229, 310, 338), img]
    return els


def interseccion_via_ciclista():
    els = [rect(240, 0, 44, W, "#c0584a"), linea(240, 0, 240, W, ancho=2), linea(284, 0, 284, W, ancho=2),
           linea(262, 0, 262, 150, discontinua=True, ancho=2), linea(262, 250, 262, 400, discontinua=True, ancho=2)]
    els += via_horizontal(cy=200, carriles=2, central=None)
    els += [linea(0, 200, 220, 200, discontinua=True), linea(304, 200, W, 200, discontinua=True),
            linea(0, 162, W, 162, ancho=2), linea(0, 238, W, 238, ancho=2)]
    for y in range(162, 238, 12):
        els += [rect(238, y, 6, 6, MARCA), rect(280, y, 6, 6, MARCA)]
    els += [bici_arriba(262, 100, 180, "#e3a21a"), vehiculo(60, 220, 90, "A"), vehiculo(160, 220, 90, "B")]
    return els


def ciclistas_de_frente():
    els = via_horizontal(cy=200, carriles=2, central="discontinua")
    els += [linea(0, 162, W, 162, ancho=2), linea(0, 238, W, 238, ancho=2)]
    els += [arbol(60, 90), arbol(300, 80), arbol(150, 330), arbol(360, 320)]
    els += [vehiculo(50, 220, 90, "A"), camion(160, 220, 90, "B", largo=92),
            bici_arriba(300, 170, 270), bici_arriba(345, 170, 270, "#2a66cc")]
    return els


# ---------------------------------------------------------------- carriles y por dónde circular
def curva_sin_marcas():
    els = [rect(0, 0, W, W, ENTORNO),
           f'<path d="M150,400 L150,250 Q150,120 280,120 L400,120" stroke="{ASFALTO}" stroke-width="84" fill="none"/>']
    els += [arbol(270, 230, 30), arbol(320, 215, 22), arbol(240, 280, 20), arbol(60, 60, 18), arbol(360, 330, 18)]
    els += [vehiculo(172, 340, 0, "A")]
    return els


def inset_vehiculo(x, y, w, h, titulo, dibujo):
    return recuadro(x, y, w, h, titulo) + [dibujo]


def autovia_dos():
    els, x0 = autovia_vertical(2)
    els += [flecha_pintada(x0 + 25, 300), flecha_pintada(x0 + 75, 300), flecha_pintada(x0 + 25, 90), flecha_pintada(x0 + 75, 90)]
    return els


def autovia_tres_vao():
    els, x0 = autovia_vertical(3)
    # carril VAO a la izquierda, separado por línea continua
    els[-2] = linea(x0 + 50, 0, x0 + 50, W, ancho=4)
    els += [f'<path d="M{x0 + 25},250 l-12,-30 l12,-30 l12,30 z" fill="none" stroke="#fff" stroke-width="4"/>',
            texto_calzada(x0 + 25, 150, "VAO", angulo=-90, size=17)]
    els += [flecha_pintada(x0 + 75, 300), flecha_pintada(x0 + 125, 300)]
    img, _ = senal_img("S-51b", 330, 30, 56)
    els += [poste(358, 90, 140), img]
    return els


def tres_calzadas():
    els = [rect(40, 0, 90, W, ASFALTO), rect(150, 0, 100, W, ASFALTO), rect(270, 0, 90, W, ASFALTO),
           rect(130, 0, 20, W, "#b9c7a5"), rect(250, 0, 20, W, "#b9c7a5"),
           linea(85, 0, 85, W, discontinua=True), linea(315, 0, 315, W, discontinua=True), linea(200, 0, 200, W, discontinua=True)]
    for x in (62, 108):
        els += [flecha_pintada(x, 120, 180), flecha_pintada(x, 300, 180)]
    for x in (292, 338):
        els += [flecha_pintada(x, 120, 0), flecha_pintada(x, 300, 0)]
    return els


def salida_deceleracion():
    els, x0 = autovia_vertical(2)
    xd = x0 + 100
    els += [f'<path d="M{xd},400 L{xd},180 L{xd + 50},180 L{xd + 50},400 Z" fill="{ASFALTO}"/>',
            f'<path d="M{xd},180 C{xd},110 {xd + 40},70 {xd + 100},20 L{xd + 150},20 C{xd + 90},80 {xd + 50},120 {xd + 50},180 Z" fill="{ASFALTO}"/>',
            linea(xd, 400, xd, 180, discontinua=True, ancho=5),
            f'<path d="M{xd + 50},400 L{xd + 50},180 C{xd + 50},120 {xd + 90},80 {xd + 150},20" fill="none" stroke="#fff" stroke-width="3"/>']
    els[4] = linea(x0 + 100, 0, x0 + 100, 180, ancho=3)
    els += [vehiculo(x0 + 25, 340, 0, "A")]
    return els


def autovia_tres_con(titulo, dibujo):
    els, x0 = autovia_vertical(3)
    els += [flecha_pintada(x0 + 25, 330), flecha_pintada(x0 + 75, 330), flecha_pintada(x0 + 125, 330)]
    els += recuadro(300, 120, 94, 160, titulo) + [dibujo]
    return [e for e in els]


def autovia_tres_camion():
    els, x0 = autovia_vertical(3, ancho=46)
    els += [flecha_pintada(x0 + 23, 330), flecha_pintada(x0 + 69, 330), flecha_pintada(x0 + 115, 330)]
    els += recuadro(300, 110, 94, 180, "su vehículo") + [camion(347, 210, 0, "A", largo=110, ancho=30)]
    return els


def autovia_tres_caravana():
    els, x0 = autovia_vertical(3, ancho=46)
    els += [flecha_pintada(x0 + 23, 330), flecha_pintada(x0 + 69, 330), flecha_pintada(x0 + 115, 330)]
    els += recuadro(300, 96, 94, 210, "su vehículo") + [caravana(347, 160, 0, "A")]
    return els


def copos(n, semilla=7):
    import random
    rnd = random.Random(semilla)
    out = []
    for _ in range(n):
        x, y, r = rnd.uniform(0, W), rnd.uniform(0, W), rnd.uniform(1.5, 3.2)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="#fff" opacity=".9"/>')
    return out


def autovia_nieve(carriles):
    els, x0 = autovia_vertical(carriles, ancho=50 if carriles == 2 else 46)
    els[0] = rect(0, 0, W, W, NIEVE)
    total = carriles * (50 if carriles == 2 else 46)
    els.insert(1, rect(x0 - 60, 0, 44, W, "#e8eef2"))
    # nieve acumulada en los bordes de la calzada y manchas sueltas
    els += [rect(x0 - 14, 0, 12, W, "#eef3f6"), rect(x0 + total + 4, 0, 32, W, "#eef3f6")]
    for (x, y, rx, ry) in ((x0 + 30, 80, 18, 40), (x0 + total - 30, 230, 16, 46), (x0 + total / 2, 340, 20, 30)):
        els.append(f'<ellipse cx="{x:.0f}" cy="{y}" rx="{rx}" ry="{ry}" fill="#fff" opacity=".55"/>')
    els += copos(70)
    img, _ = senal_img("R-412", 20 if carriles == 2 else 16, 30, 50)
    els += [img]
    return els


def carril_habilitado(carriles_propios):
    """Calzada con un carril habilitado en sentido contrario al habitual, separado con conos del carril contiguo."""
    n = 2 + carriles_propios  # normal contrario + habilitado + propios
    ancho = 48
    x0 = 200 - n * ancho / 2
    els = calzada_vertical(x0, n, ancho, lineas=["c", None] + ["d"] * (carriles_propios - 1))
    xc = x0 + 2 * ancho
    els.append(conos([(xc, y) for y in range(10, 400, 34)]))
    els += [vehiculo(x0 + ancho / 2, 90, 180, "C"), vehiculo(x0 + ancho * 1.5, 150, 180, "B"),
            vehiculo(x0 + ancho * 2.5, 310, 0, "A")]
    return els


def carril_bus():
    els = [rect(0, 0, 90, W, ACERA), rect(310, 0, 90, W, ACERA), rect(90, 0, 220, W, ASFALTO),
           linea(90, 0, 90, W, ancho=2, color=BORDILLO), linea(310, 0, 310, W, ancho=2, color=BORDILLO),
           linea(163, 0, 163, W, discontinua=True), linea(236, 0, 236, W, discontinua=True, ancho=5),
           texto_calzada(273, 200, "BUS", angulo=-90, size=22)]
    els += [flecha_pintada(126, 330), flecha_pintada(200, 330), vehiculo(200, 120, 0, "A")]
    return els


# ---------------------------------------------------------------- maniobras, parada y estacionamiento
def sin_salida_estrecha():
    els = [rect(0, 0, W, W, ACERA), rect(165, 60, 70, 340, ASFALTO),
           casa(20, 20, 140, 120), casa(20, 160, 140, 120), casa(20, 300, 140, 100),
           casa(240, 20, 140, 120), casa(240, 160, 140, 120), casa(240, 300, 140, 100),
           casa(150, 0, 100, 56), vehiculo(200, 150, 0, "A")]
    return els


def brazo_horizontal_intermitente():
    els = perspectiva_recta()
    els += vista_trasera(200, 250, "#2a66cc", "B", escala=1.0)
    # intermitente derecho encendido (lado derecho visto desde detrás)
    els += [piloto(118, 228, 22, 20, "#8c2b24"), piloto(260, 228, 22, 20, "#f2a516")] + rayos(271, 238, 16, 26, "#f2a516")
    # brazo izquierdo del conductor (lado izquierdo del coche) extendido horizontalmente, palma hacia abajo
    els += ['<path d="M118,190 L40,190" stroke="#e8c9b0" stroke-width="13" stroke-linecap="round"/>',
            '<path d="M118,190 L80,190" stroke="#2a66cc" stroke-width="15" stroke-linecap="round"/>',
            '<ellipse cx="30" cy="192" rx="13" ry="7" fill="#e8c9b0" stroke="#b08c70" stroke-width="1.5"/>']
    return els


def brazo_doblado_arriba():
    els = perspectiva_recta()
    els += vista_trasera(200, 260, "#2a66cc", "", escala=1.0)
    els += [piloto(118, 238, 22, 20, "#8c2b24"), piloto(260, 238, 22, 20, "#8c2b24")]
    # brazo izquierdo fuera de la ventanilla, doblado hacia arriba, palma extendida
    els += ['<path d="M120,200 L75,200" stroke="#2a66cc" stroke-width="15" stroke-linecap="round"/>',
            '<path d="M75,200 L75,140" stroke="#e8c9b0" stroke-width="13" stroke-linecap="round"/>',
            '<path d="M66,140 L66,112 Q66,106 70,106 L70,128 M70,108 Q70,100 75,100 L75,128 M75,102 Q75,95 80,96 L80,128 '
            'M80,100 Q81,96 85,98 L85,132 Q86,124 90,124 L90,138 Q84,152 74,152 Q64,152 64,142 Z" fill="#e8c9b0" '
            'stroke="#b08c70" stroke-width="1.5"/>']
    return els


def estacionado_isleta():
    els = via_horizontal(cy=130, carriles=2, central="discontinua")
    els += [f'<path d="M140,150 Q160,150 160,170 L160,400 L240,400 L240,170 Q240,150 260,150 Z" fill="{ASFALTO}"/>',
            linea(200, 330, 200, 400, discontinua=True),
            # isleta elevada en forma de gota que separa la entrada y la salida de la vía que llega por abajo
            '<path d="M200,172 Q228,240 222,312 Q200,336 178,312 Q172,240 200,172 Z" fill="#e6e1d6" stroke="#9a948a" stroke-width="3"/>',
            vehiculo(200, 268, 2, "A", sentido=False)]
    return els


def parado_tapa_senal():
    els = via_horizontal(cy=200, carriles=2, central="discontinua")
    els += [linea(0, 162, W, 162, ancho=2), linea(0, 238, W, 238, ancho=2)]
    img, _ = senal_img("P-1a", 250, 260, 36)
    els += [poste(268, 290, 320), img,
            vehiculo(222, 234, 90, "A"),
            vehiculo(70, 220, 90, "B"),
            '<path d="M94,214 L250,272" stroke="#33383f" stroke-width="2" stroke-dasharray="5 5"/>']
    return els


def parado_delante_vado():
    els = [rect(0, 0, W, 120, ENTORNO), casa(0, 20, 150, 100), casa(250, 20, 150, 100),
           rect(150, 20, 100, 100, "#c7c2b8"), '<rect x="160" y="30" width="80" height="90" fill="#8a8f96"/>',
           rect(0, 120, W, 50, ACERA), rect(150, 120, 100, 50, "#d4cfc4"),
           rect(0, 170, W, 160, ASFALTO), linea(0, 170, W, 170, ancho=2, color=BORDILLO),
           linea(0, 250, W, 250, discontinua=True), rect(0, 330, W, 70, ACERA)]
    els += [vehiculo(200, 75, 180, "B"), vehiculo(205, 205, 270, "A")]
    els += ['<rect x="252" y="96" width="44" height="20" rx="2" fill="#fff" stroke="#2a66cc" stroke-width="2"/>',
            '<text x="274" y="111" text-anchor="middle" font-family="Arial" font-weight="700" font-size="11" fill="#2a66cc">VADO</text>']
    return els


def calle_sentido_unico():
    els = [rect(0, 0, 110, W, ACERA), rect(290, 0, 110, W, ACERA), rect(110, 0, 180, W, ASFALTO),
           linea(110, 0, 110, W, ancho=2, color=BORDILLO), linea(290, 0, 290, W, ancho=2, color=BORDILLO),
           casa(0, 20, 60, 160), casa(0, 220, 60, 160), casa(340, 20, 60, 160), casa(340, 220, 60, 160)]
    els += [flecha_pintada(160, 110), flecha_pintada(240, 110), vehiculo(200, 320, 0, "A")]
    img, _ = senal_img("S-11", 300, 120, 34)
    els += [img]
    return els


def calle_doble_sentido():
    els = [rect(0, 0, 110, W, ACERA), rect(290, 0, 110, W, ACERA), rect(110, 0, 180, W, ASFALTO),
           linea(110, 0, 110, W, ancho=2, color=BORDILLO), linea(290, 0, 290, W, ancho=2, color=BORDILLO),
           linea(200, 0, 200, W, discontinua=True),
           casa(0, 20, 60, 160), casa(0, 220, 60, 160), casa(340, 20, 60, 160), casa(340, 220, 60, 160)]
    els += [vehiculo(245, 320, 0, "A"), vehiculo(155, 90, 180, "B")]
    return els


# ---------------------------------------------------------------- señales y agentes
def flecha_y_conos():
    els, x0 = autovia_vertical(2)
    els += [flecha_pintada(x0 + 75, 290), flecha_pintada(x0 + 25, 290)]
    els.append(conos([(x0 + 100 - k * 8, 200 - k * 22) for k in range(0, 7)] + [(x0 + 52, 40 - 0), (x0 + 60, 10)]))
    els += [vehiculo(x0 + 75, 355, 0, "A")]
    return els


def agente_brazo_abajo():
    els = perspectiva_recta()
    els += vista_trasera(200, 250, "#f2f2ee", "", escala=1.0)
    els += [rect(108, 196, 184, 8, "#2a66cc"), piloto(118, 220, 22, 20, "#8c2b24"), piloto(260, 220, 22, 20, "#8c2b24"),
            '<rect x="160" y="165" width="80" height="10" rx="4" fill="#2a66cc"/>',
            '<text x="200" y="245" text-anchor="middle" font-family="Arial" font-weight="800" font-size="13" fill="#2a66cc">POLICÍA</text>']
    # brazo del agente fuera de la ventanilla izquierda, extendido hacia abajo e inclinado
    els += ['<path d="M118,190 L80,232" stroke="#1f3a8a" stroke-width="14" stroke-linecap="round"/>',
            '<path d="M80,232 L66,248" stroke="#e8c9b0" stroke-width="11" stroke-linecap="round"/>']
    return els


# ---------------------------------------------------------------- prioridad y usuarios vulnerables
def autobus_arriba(x, y, angulo, letra="", largo=120):
    h = largo / 2
    partes = [f'<rect x="-14" y="{-h + 2}" width="30" height="{largo}" rx="5" fill="#000" opacity=".2"/>',
              f'<rect x="-15" y="{-h}" width="30" height="{largo}" rx="6" fill="#2e9a4f" stroke="#1d5f31" stroke-width="1.6"/>',
              f'<rect x="-11" y="{-h + 10}" width="22" height="{largo - 20}" rx="3" fill="#43b866"/>',
              f'<path d="M-12,{-h + 6} Q0,{-h + 2} 12,{-h + 6}" stroke="#1f2630" stroke-width="5" fill="none"/>']
    if letra:
        partes.append(f'<text x="0" y="5" transform="rotate({-angulo})" text-anchor="middle" font-family="Arial" '
                      f'font-weight="800" font-size="15" fill="#fff" stroke="#1d5f31" stroke-width="2.4" paint-order="stroke">{letra}</text>')
    return f'<g transform="translate({x} {y}) rotate({angulo})">' + "".join(partes) + "</g>"


def peatones_autobus():
    els = [rect(0, 0, W, 80, ENTORNO), casa(10, 0, 160, 70), casa(200, 0, 190, 70),
           rect(0, 80, W, 60, ACERA), rect(0, 140, W, 160, ASFALTO), linea(0, 140, W, 140, ancho=2, color=BORDILLO),
           linea(0, 220, W, 220, discontinua=True), rect(0, 300, W, 100, ACERA)]
    els += ['<rect x="150" y="142" width="150" height="66" fill="none" stroke="#e3a21a" stroke-width="3" stroke-dasharray="8 6"/>',
            '<rect x="306" y="96" width="34" height="18" rx="2" fill="#2a66cc"/>',
            '<text x="323" y="109" text-anchor="middle" font-family="Arial" font-weight="800" font-size="11" fill="#fff">BUS</text>',
            poste(323, 114, 136)]
    els += [autobus_arriba(225, 190, 270, "B"), persona_arriba(195, 156), persona_arriba(245, 158, "#2a66cc"),
            vehiculo(345, 186, 270, "A")]
    return els


def ciclista_descenso():
    els = [rect(0, 0, W, W, ENTORNO),
           f'<path d="M60,0 C60,120 340,100 340,200 C340,300 60,280 60,400" stroke="#c9c4b6" stroke-width="104" fill="none"/>',
           f'<path d="M60,0 C60,120 340,100 340,200 C340,300 60,280 60,400" stroke="{ASFALTO}" stroke-width="80" fill="none"/>',
           f'<path d="M60,0 C60,120 340,100 340,200 C340,300 60,280 60,400" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="16 14"/>']
    els += [arbol(200, 40, 20), arbol(210, 350, 20), arbol(370, 60, 16), arbol(30, 210, 16)]
    els += [bici_arriba(294, 200, 180)]
    img, _ = senal_img("P-16a", 345, 300, 44)
    els += [img]
    return els


# ---------------------------------------------------------------- partes de la vía
def glorieta_partida():
    els = [rect(160, 0, 80, W, ASFALTO), rect(0, 160, W, 80, ASFALTO),
           f'<circle cx="200" cy="200" r="130" fill="{ASFALTO}"/>',
           f'<circle cx="200" cy="200" r="62" fill="{ENTORNO}" stroke="#fff" stroke-width="3"/>',
           rect(160, 130, 80, 140, ASFALTO),
           linea(200, 0, 200, W, discontinua=True), linea(0, 200, 70, 200, discontinua=True), linea(330, 200, W, 200, discontinua=True),
           linea(160, 138, 160, 262, ancho=3), linea(240, 138, 240, 262, ancho=3)]
    els += [vehiculo(220, 340, 0, "A")]
    return els


def calzada_ancha_sin_marcas():
    els = [rect(0, 0, 70, W, ENTORNO), rect(330, 0, 70, W, ENTORNO), rect(70, 0, 260, W, ASFALTO),
           linea(72, 0, 72, W, ancho=2, color="#cfd3d8"), linea(328, 0, 328, W, ancho=2, color="#cfd3d8"),
           arbol(30, 60), arbol(370, 160), arbol(30, 300), arbol(370, 340)]
    els += [vehiculo(300, 300, 0, "A"), vehiculo(100, 110, 180, "B")]
    return els


def ida_y_vuelta():
    els = via_horizontal(cy=200, carriles=2, central="discontinua")
    els += [linea(0, 162, W, 162, ancho=2), linea(0, 238, W, 238, ancho=2), arbol(80, 90), arbol(320, 310)]
    els += [vehiculo(110, 220, 90, "A"), vehiculo(290, 180, 270, "B")]
    return els


def plataforma_unica():
    els = [rect(0, 0, W, W, "#d9d2c3")]
    for y in range(0, 400, 20):
        els.append(linea(0, y, W, y, ancho=1, color="#c8c0ae"))
    els += [rect(120, 0, 160, W, "#bdb5a5")]
    for y in range(0, 400, 40):
        els += [f'<circle cx="112" cy="{y + 20}" r="5" fill="#5f646b"/>', f'<circle cx="288" cy="{y + 20}" r="5" fill="#5f646b"/>']
    els += [casa(0, 0, 70, 180), casa(0, 220, 70, 180), casa(330, 0, 70, 180), casa(330, 220, 70, 180)]
    els += [persona_arriba(95, 90), persona_arriba(170, 160, "#2a66cc"), persona_arriba(300, 280, "#e3a21a"),
            vehiculo(230, 330, 0, "A")]
    return els


ESQUEMAS_TANDA4 = [
    ("glorieta-dos-carriles.svg", "Glorieta con dos carriles",
     "Glorieta con dos carriles en el anillo. El vehículo A circula por el anillo, por el carril exterior, detrás del vehículo B.",
     glorieta_dos_carriles),
    ("tranvia-zona-central.svg", "Tranvía por la zona central",
     "Calle de doble sentido con las vías del tranvía en el centro de la calzada. Un tranvía circula por la zona central hacia la derecha; el vehículo A va detrás, por el carril de la derecha; el B circula en sentido contrario.",
     tranvia_central),
    ("tunel-un-carril-por-sentido.svg", "Túnel con un carril por sentido",
     "Carretera con un carril para cada sentido que entra en un túnel, con la señal de túnel en la entrada. El vehículo A circula detrás del B y se acercan a la boca del túnel.",
     tunel_un_carril),
    ("tunel-dos-carriles-mismo-sentido.svg", "Túnel con dos carriles en su sentido",
     "Túnel con circulación en ambos sentidos: dos carriles hacia la derecha, separados por una línea discontinua, y uno hacia la izquierda, separado por una línea continua. El vehículo A circula detrás del B por el carril derecho; el C, en sentido contrario.",
     tunel_dos_carriles),
    ("interseccion-via-ciclista.svg", "Cruce con una vía ciclista",
     "Carretera de doble sentido que cruza una vía ciclista por un paso para ciclistas. Por la vía ciclista se acerca un ciclista. El vehículo A circula detrás del B.",
     interseccion_via_ciclista),
    ("ciclistas-de-frente.svg", "Ciclistas en sentido contrario",
     "Carretera de doble sentido con un carril para cada sentido. El vehículo A circula detrás de un camión (B); por el carril contrario se acercan dos ciclistas.",
     ciclistas_de_frente),
    ("curva-sin-marcas.svg", "Curva sin marcas viales",
     "Carretera de doble sentido sin marcas viales que gira a la derecha; los árboles del interior de la curva tapan la vista. El vehículo A se acerca a la curva.",
     curva_sin_marcas),
    ("autovia-dos-carriles.svg", "Autovía de dos carriles",
     "Calzada de autovía con dos carriles en el mismo sentido, separados por una línea discontinua, con flechas de frente. A la izquierda, la mediana con barrera; a la derecha, el arcén.",
     autovia_dos),
    ("autovia-tres-carriles-vao.svg", "Autovía con un carril VAO",
     "Calzada de autovía con tres carriles en el mismo sentido. El de la izquierda está reservado a vehículos con alta ocupación: lleva un rombo y la inscripción VAO, y lo separa una línea continua. Junto a la vía, la señal de carril VAO.",
     autovia_tres_vao),
    ("via-tres-calzadas.svg", "Vía con tres calzadas",
     "Vía dividida en tres calzadas separadas por medianas. La calzada de la izquierda lleva flechas hacia abajo y la de la derecha, hacia arriba; la central no lleva flechas.",
     tres_calzadas),
    ("salida-carril-deceleracion.svg", "Salida con carril de deceleración",
     "Autovía de dos carriles con una salida por la derecha precedida de un carril de deceleración. El vehículo A circula por el carril izquierdo, todavía lejos de la salida.",
     salida_deceleracion),
    ("autovia-tres-carriles-camion.svg", "Autovía de tres carriles y camión",
     "Calzada de autovía con tres carriles en el mismo sentido, sin vehículos. En un recuadro aparte, su vehículo: un camión (A).",
     autovia_tres_camion),
    ("autovia-tres-carriles-caravana.svg", "Autovía de tres carriles y caravana",
     "Calzada de autovía con tres carriles en el mismo sentido, sin vehículos. En un recuadro aparte, su vehículo: un turismo con una caravana enganchada (A).",
     autovia_tres_caravana),
    ("autovia-nieve-dos-carriles.svg", "Nieve en una calzada de dos carriles",
     "Calzada de autopista con dos carriles en el mismo sentido, con nieve en la calzada y en los bordes y nevando. Junto a la vía, la señal de cadenas para nieve.",
     lambda: autovia_nieve(2)),
    ("autovia-nieve-tres-carriles.svg", "Nieve en una calzada de tres carriles",
     "Calzada de autovía con tres carriles en el mismo sentido, con nieve en la calzada y en los bordes y nevando. Junto a la vía, la señal de cadenas para nieve.",
     lambda: autovia_nieve(3)),
    ("carril-habilitado-un-carril.svg", "Carril habilitado en sentido contrario (queda un carril)",
     "Calzada en la que un carril se ha habilitado en sentido contrario al habitual y está separado con conos. Por él baja el vehículo B; por el carril de la izquierda baja el C. En el sentido del vehículo A solo queda su carril, contiguo al habilitado.",
     lambda: carril_habilitado(1)),
    ("carril-habilitado-dos-carriles.svg", "Carril habilitado en sentido contrario (quedan dos carriles)",
     "Calzada en la que un carril se ha habilitado en sentido contrario al habitual y está separado con conos. Por él baja el vehículo B; por el carril de la izquierda baja el C. En el sentido del vehículo A quedan dos carriles; A va por el contiguo al habilitado.",
     lambda: carril_habilitado(2)),
    ("carril-bus-discontinua.svg", "Carril bus con línea discontinua",
     "Calle con dos carriles en el mismo sentido y, a la derecha, un carril con la inscripción BUS separado por una línea discontinua ancha. El vehículo A circula por el carril central.",
     carril_bus),
    ("calle-sin-salida-estrecha.svg", "Calle estrecha sin salida",
     "Calle muy estrecha entre edificios que termina en un edificio, sin salida. El vehículo A ha entrado y está cerca del final.",
     sin_salida_estrecha),
    ("intermitente-derecho-y-brazo.svg", "Intermitente derecho y brazo",
     "Vista desde detrás de un turismo (B): tiene encendido el intermitente derecho y su conductor saca el brazo izquierdo por la ventanilla, extendido horizontalmente.",
     brazo_horizontal_intermitente),
    ("brazo-doblado-hacia-arriba.svg", "Brazo doblado hacia arriba",
     "Vista desde detrás de un turismo: su conductor saca el brazo izquierdo por la ventanilla, doblado hacia arriba y con la palma de la mano extendida.",
     brazo_doblado_arriba),
    ("estacionado-isleta.svg", "Turismo sobre una isleta",
     "Intersección en T con una isleta que separa el ramal de giro a la derecha. El turismo A está estacionado encima de la isleta.",
     estacionado_isleta),
    ("parado-tapa-senal.svg", "Vehículo que tapa una señal",
     "Carretera de doble sentido. El vehículo A está parado junto al borde derecho, justo delante de una señal vertical; el vehículo B viene detrás y la línea de puntos muestra que A le tapa la señal.",
     parado_tapa_senal),
    ("parado-delante-vado.svg", "Parado delante de un vado",
     "Calle con la entrada de un garaje señalizada con una placa de vado. Dentro del garaje, el vehículo B quiere salir; el vehículo A está parado en la calzada justo delante de la entrada.",
     parado_delante_vado),
    ("calle-sentido-unico.svg", "Calle de sentido único",
     "Calle urbana de sentido único, con flechas pintadas hacia arriba, aceras a los dos lados y la señal de sentido único. El vehículo A circula por ella.",
     calle_sentido_unico),
    ("calle-doble-sentido.svg", "Calle de doble sentido",
     "Calle urbana de doble sentido con una línea discontinua en el centro y aceras a los dos lados. El vehículo A sube por su carril; el B baja por el otro.",
     calle_doble_sentido),
    ("flecha-y-conos.svg", "Flecha pintada y conos",
     "Calzada de dos carriles. En el carril derecho, por el que circula A, hay una flecha pintada de seguir de frente; más adelante, una hilera de conos cierra ese carril.",
     flecha_y_conos),
    ("agente-brazo-abajo.svg", "Agente con el brazo hacia abajo",
     "Vista desde detrás de un coche de policía que circula delante: el agente saca el brazo por la ventanilla, extendido hacia abajo e inclinado.",
     agente_brazo_abajo),
    ("peatones-entre-autobus-y-acera.svg", "Peatones entre el autobús y la acera",
     "Calle con una parada de autobús señalizada. El autobús (B) está detenido en la parada, algo separado de la acera, y dos peatones que acaban de bajar están entre el autobús y la acera.",
     peatones_autobus),
    ("ciclista-descenso-curvas.svg", "Ciclista en un descenso con curvas",
     "Carretera convencional con curvas que baja con fuerte pendiente, con la señal de bajada con fuerte pendiente. Un ciclista circula por el arcén.",
     ciclista_descenso),
    ("glorieta-partida.svg", "Glorieta partida",
     "Intersección con un anillo y una isleta central, pero la vía que llega de abajo atraviesa la isleta central y sigue recta hacia arriba. El vehículo A llega por esa vía.",
     glorieta_partida),
    ("calzada-ancha-sin-marcas.svg", "Calzada ancha sin marcas",
     "Calzada de doble sentido sin ninguna marca vial longitudinal, con anchura para dos filas de turismos en cada sentido. El vehículo A sube junto al borde derecho; el B baja junto al otro borde.",
     calzada_ancha_sin_marcas),
    ("ida-y-vuelta.svg", "Dos coches en la misma carretera",
     "Carretera con un carril para cada sentido. El vehículo A circula hacia la derecha por el carril de abajo; el B, hacia la izquierda por el de arriba.",
     ida_y_vuelta),
    ("plataforma-unica.svg", "Plataforma única de calzada y acera",
     "Calle en la que la calzada y la acera están al mismo nivel, sin bordillo, separadas solo por un cambio de pavimento y bolardos. Hay peatones andando, uno en la zona central, y el vehículo A circula por ella.",
     plataforma_unica),
]


if __name__ == "__main__":
    aqui = os.path.dirname(os.path.abspath(__file__))
    solo = set(sys.argv[1:])
    for fichero, titulo, desc, fn in ESQUEMAS_TANDA4:
        if solo and fichero not in solo:
            continue
        with open(os.path.join(aqui, fichero), "w", encoding="utf-8") as f:
            f.write(svg(titulo, desc, fn()))
        print("ok", fichero)
