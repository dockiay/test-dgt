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

# ---------------------------------------------------------------- utilidades extra
import base64

SENALES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "senales")
CIELO = "#cfe6f5"


def senal_img(codigo, x, y, ancho):
    """Inserta la señal oficial (PNG del catálogo del BOE) embebida en el SVG. Devuelve (svg, alto)."""
    from PIL import Image
    ruta = os.path.join(SENALES_DIR, f"{codigo}.png")
    w, h = Image.open(ruta).size
    alto = ancho * h / w
    datos = base64.b64encode(open(ruta, "rb").read()).decode()
    return (f'<image x="{x:.1f}" y="{y:.1f}" width="{ancho:.1f}" height="{alto:.1f}" '
            f'href="data:image/png;base64,{datos}"/>', alto)


def poste(x, y_arriba, y_abajo):
    return f'<rect x="{x - 2.5}" y="{y_arriba}" width="5" height="{y_abajo - y_arriba}" fill="#8a8f96"/>'


def semaforo(x, y, luces, escala=1.0, flecha_verde=None):
    """Semáforo circular de 3 luces. luces: dict con 'rojo'/'ambar'/'verde' -> True (encendida) o 'intermitente'.
    flecha_verde: None o 'derecha' (módulo adicional con flecha verde encendida)."""
    s = escala
    cols = [("rojo", "#e0322b", "#4a1a18"), ("ambar", "#f2a516", "#4a3a12"), ("verde", "#22b35a", "#163a24")]
    els = [f'<rect x="{x - 16 * s}" y="{y}" width="{32 * s}" height="{90 * s}" rx="{5 * s}" fill="#1f2328"/>']
    for i, (k, on, off) in enumerate(cols):
        cy = y + (16 + 29 * i) * s
        estado = luces.get(k)
        els.append(f'<circle cx="{x}" cy="{cy}" r="{11 * s}" fill="{on if estado else off}"/>')
        if estado == "intermitente":
            for ang in range(0, 360, 45):
                r1, r2 = 15 * s, 21 * s
                a = math.radians(ang)
                els.append(f'<line x1="{x + r1 * math.cos(a):.1f}" y1="{cy + r1 * math.sin(a):.1f}" '
                           f'x2="{x + r2 * math.cos(a):.1f}" y2="{cy + r2 * math.sin(a):.1f}" '
                           f'stroke="{on}" stroke-width="{2.5 * s}" stroke-linecap="round"/>')
    if flecha_verde == "derecha":
        mx, my = x + 34 * s, y + 74 * s
        els += [f'<rect x="{mx - 16 * s}" y="{my - 16 * s}" width="{32 * s}" height="{32 * s}" rx="{5 * s}" fill="#1f2328"/>',
                f'<circle cx="{mx}" cy="{my}" r="{11 * s}" fill="#0b0d10"/>',
                f'<path d="M{mx - 7 * s},{my} L{mx + 6 * s},{my} M{mx + 1 * s},{my - 5 * s} L{mx + 7 * s},{my} '
                f'L{mx + 1 * s},{my + 5 * s}" stroke="#22b35a" stroke-width="{3 * s}" fill="none" '
                f'stroke-linecap="round" stroke-linejoin="round"/>']
    return els


def semaforo_carril(x, y, tipo, escala=1.0):
    """Semáforo cuadrado de carril: tipo 'flecha_abajo_verde' o 'aspa_roja'."""
    s = escala
    els = [f'<rect x="{x - 20 * s}" y="{y - 20 * s}" width="{40 * s}" height="{40 * s}" rx="{3 * s}" fill="#1f2328"/>']
    if tipo == "flecha_abajo_verde":
        els.append(f'<path d="M{x},{y - 12 * s} L{x},{y + 10 * s} M{x - 8 * s},{y + 2 * s} L{x},{y + 11 * s} '
                   f'L{x + 8 * s},{y + 2 * s}" stroke="#22b35a" stroke-width="{4 * s}" fill="none" '
                   f'stroke-linecap="round" stroke-linejoin="round"/>')
    else:
        els.append(f'<path d="M{x - 10 * s},{y - 10 * s} L{x + 10 * s},{y + 10 * s} M{x + 10 * s},{y - 10 * s} '
                   f'L{x - 10 * s},{y + 10 * s}" stroke="#e0322b" stroke-width="{4 * s}" stroke-linecap="round"/>')
    return els


def recuadro(x, y, w, h, titulo):
    """Recuadro de detalle (lupa) para mostrar un semáforo u otro elemento ampliado."""
    return [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#ffffff" fill-opacity="0.92" '
            f'stroke="#33383f" stroke-width="1.5"/>',
            f'<text x="{x + w / 2}" y="{y + 14}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" '
            f'font-size="11" fill="#33383f">{titulo}</text>']


def perspectiva_cruce():
    """Vista desde el puesto de conducción: la vía propia sube hacia el horizonte y la cruza otra vía."""
    return [rect(0, 0, W, 150, CIELO), rect(0, 150, W, 250, ENTORNO),
            f'<polygon points="40,400 360,400 232,150 168,150" fill="{ASFALTO}"/>',
            f'<polygon points="0,205 400,205 400,248 0,248" fill="{ASFALTO}"/>',
            f'<polygon points="0,205 400,205 400,207 0,207" fill="#4d5258"/>',
            # eje discontinuo de la vía propia (antes del cruce)
            '<path d="M200,400 L200,250" stroke="#fff" stroke-width="3" stroke-dasharray="22 16"/>']


def flecha_grande(d, color="#d43d3d"):
    return (f'<path d="{d}" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round" '
            f'stroke-linejoin="round" marker-end="url(#punta-A)" opacity="0.9"/>')


def moto_glifo(x, y, s=1.0, color="#fff"):
    return (f'<g transform="translate({x} {y}) scale({s})" stroke="{color}" stroke-width="2.2" fill="none">'
            f'<circle cx="-9" cy="4" r="5"/><circle cx="9" cy="4" r="5"/>'
            f'<path d="M-9,4 L-2,-3 L6,-3 L9,4 M6,-3 L4,-8 L8,-8"/></g>')


def bici_glifo(x, y, s=1.0, color="#fff"):
    return (f'<g transform="translate({x} {y}) scale({s})" stroke="{color}" stroke-width="2" fill="none">'
            f'<circle cx="-9" cy="4" r="5.5"/><circle cx="9" cy="4" r="5.5"/>'
            f'<path d="M-9,4 L-3,-5 L6,-5 L9,4 M-3,-5 L1,4 L6,-5 M-4,-8 L-1,-8"/></g>')


# ---------------------------------------------------------------- esquemas pedidos por las preguntas
def cruce_tres_vehiculos():
    """A-pri-0001: cruce sin señales ni marcas; A (sur), B (este), C (norte)."""
    els = via_vertical(central=None) + via_horizontal(central=None)
    els += [vehiculo(220, 275, 0, "A"), flecha("M220,250 L220,110", "A"),
            vehiculo(275, 180, 270, "B"), flecha("M250,180 L110,180", "B"),
            vehiculo(180, 125, 180, "C"), flecha("M180,150 L180,290", "C")]
    return els


def semaforo_ambar_y_stop():
    """B1-sen-0006: acceso con semáforo en ámbar intermitente y señal STOP en el mismo poste."""
    els = perspectiva_cruce()
    els.append(poste(330, 95, 300))
    els += semaforo(330, 40, {"ambar": "intermitente"}, escala=0.75)
    img, _ = senal_img("R-2", 306, 120, 48)
    els.append(img)
    return els


def ceda_y_stop(giro):
    els = perspectiva_cruce()
    els += [poste(335, 150, 300), poste(65, 150, 300)]
    a, _ = senal_img("R-1", 305, 100, 60)
    b, _ = senal_img("R-2", 38, 102, 54)
    els += [a, b]
    if giro == "recto":
        els.append(flecha_grande("M258,385 L222,205"))
    else:
        els.append(flecha_grande("M262,385 C250,300 262,236 345,228"))
    return els


def agente_brazos_horizontales():
    """B1-sen-0016: agente en el centro con los brazos extendidos en dirección este-oeste."""
    els = via_vertical(central=None) + via_horizontal(central=None)
    for a, b in ((0, 150), (250, 400)):
        els.append(linea(200, a, 200, b, discontinua=True))
        els.append(linea(a, 200, b, 200, discontinua=True))
    els += [vehiculo(220, 320, 0, "A"), vehiculo(180, 80, 180, "B"),
            vehiculo(320, 180, 270, "C"), vehiculo(80, 220, 90, "D")]
    # agente visto desde arriba: gorra blanca, uniforme azul oscuro, brazos hacia el este y el oeste
    els += ['<g transform="translate(200 200)">',
            '<rect x="-30" y="-4" width="60" height="8" rx="4" fill="#20304f"/>',
            '<circle cx="-31" cy="0" r="4" fill="#f0c9a0"/><circle cx="31" cy="0" r="4" fill="#f0c9a0"/>',
            '<ellipse cx="0" cy="0" rx="11" ry="8" fill="#20304f"/>',
            '<circle cx="0" cy="0" r="6.5" fill="#ffffff" stroke="#20304f" stroke-width="1.5"/>',
            '</g>',
            f'<text x="200" y="232" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" '
            f'font-size="11" font-weight="bold" fill="#fff">agente</text>']
    return els


def semaforo_flecha_derecha():
    """B1-sen-0049: dos carriles; el derecho, solo giro a la derecha; rojo + flecha verde derecha."""
    els = [rect(120, 0, 160, W, ASFALTO), rect(0, 90, W, 90, ASFALTO),
           linea(200, 180, 200, W, discontinua=True), linea(120, 180, 120, W, ancho=3),
           linea(280, 180, 280, W, ancho=3), linea(0, 135, 120, 135, discontinua=True),
           linea(280, 135, W, 135, discontinua=True), linea_detencion(120, 196, 280, 196),
           # flecha pintada de giro a la derecha en el carril derecho y de frente en el izquierdo
           '<path d="M240,330 L240,268 Q240,252 256,252 L262,252" stroke="#fff" stroke-width="7" fill="none"/>',
           '<path d="M260,242 L274,252 L260,262 Z" fill="#fff"/>',
           '<path d="M160,330 L160,262" stroke="#fff" stroke-width="7"/>',
           '<path d="M150,264 L160,248 L170,264 Z" fill="#fff"/>',
           vehiculo(240, 225, 0, "A", color="#9aa0a6")]
    els += recuadro(300, 200, 92, 128, "semáforo")
    els += semaforo(330, 222, {"rojo": True}, escala=0.9, flecha_verde="derecha")
    return els


def carril_reversible():
    """B1-sen-0051: semáforo de carril con flecha verde y, más adelante, semáforo circular en rojo."""
    els = [rect(120, 0, 160, W, ASFALTO), linea(200, 0, 200, W, discontinua=True),
           linea(120, 0, 120, W, ancho=3), linea(280, 0, 280, W, ancho=3),
           # pórtico con semáforos de carril
           '<rect x="110" y="248" width="180" height="6" fill="#8a8f96"/>',
           linea_detencion(120, 92, 280, 92),
           vehiculo(240, 345, 0, "A")]
    els += semaforo_carril(240, 251, "flecha_abajo_verde", escala=0.8)
    els += semaforo_carril(160, 251, "aspa_roja", escala=0.8)
    els += [poste(292, 30, 95)]
    els += semaforo(292, 20, {"rojo": True}, escala=0.6)
    els += recuadro(8, 150, 104, 120, "semáforo de carril")
    els += semaforo_carril(60, 215, "flecha_abajo_verde", escala=1.4)
    els += recuadro(300, 110, 92, 125, "más adelante")
    els += semaforo(346, 132, {"rojo": True}, escala=0.9)
    return els


def incorporacion_autopista():
    """B1-pri-0071: A circula por el carril derecho; B se incorpora por el carril de aceleración."""
    els = [rect(140, 0, 80, W, ASFALTO),
           linea(180, 0, 180, W, discontinua=True),
           f'<path d="M220,400 L260,400 L260,190 L220,90 Z" fill="{ASFALTO}"/>',
           linea(220, 400, 220, 190, discontinua=True, ancho=3),
           linea(140, 0, 140, W, ancho=3), linea(220, 0, 220, 90, ancho=3),
           vehiculo(200, 250, 0, "A"), flecha("M200,222 L200,60", "A"),
           vehiculo(240, 260, 0, "B"), flecha("M240,232 L240,200 C240,170 210,165 205,140", "B")]
    return els


def doble_continua():
    """B2-mv-0018: eje con dos líneas continuas paralelas."""
    els = via_horizontal(central=None)
    els += [linea(0, 195, W, 195, ancho=3), linea(0, 205, W, 205, ancho=3),
            vehiculo(120, 223, 90, "A"), vehiculo(300, 177, 270, "B")]
    return els


def continua_adosada():
    """B2-mv-0019: continua adosada a discontinua; A circula junto a la discontinua."""
    els = via_horizontal(central=None)
    els += [linea(0, 195, W, 195, ancho=3), linea(0, 205, W, 205, discontinua=True, ancho=3),
            vehiculo(130, 223, 90, "A"), vehiculo(300, 177, 270, "B")]
    return els


def avanza_motos():
    """B2-mv-0045: avanza-motos/bicis delimitado por dos líneas transversales antes del paso de peatones."""
    els = [rect(120, 0, 160, W, ASFALTO), rect(0, 0, 120, W, ACERA), rect(280, 0, 120, W, ACERA),
           linea(120, 0, 120, W, ancho=2, color="#9a948a"), linea(280, 0, 280, W, ancho=2, color="#9a948a"),
           linea(200, 240, 200, W, discontinua=True)]
    for i in range(8):  # paso de peatones
        els.append(rect(124 + i * 20, 70, 11, 60, MARCA))
    els += [linea_detencion(120, 150, 280, 150), linea_detencion(120, 230, 280, 230),
            moto_glifo(160, 190, 1.2), bici_glifo(240, 190, 1.2),
            vehiculo(160, 290, 0, "A"), vehiculo(240, 300, 0, "B"),
            texto_calzada(200, 222, "4 m", size=11)]
    els += [poste(296, 60, 140)]
    els += semaforo(296, 40, {"rojo": True}, escala=0.55)
    return els


def poblado_y_velocidad():
    """B1-sen-0009: señal de límite de velocidad 40 (R-301) en el mismo poste que la de entrada a poblado (S-500)."""
    els = [rect(0, 0, W, 250, CIELO), rect(0, 250, W, 150, ENTORNO),
           f'<polygon points="60,400 340,400 225,250 175,250" fill="{ASFALTO}"/>',
           poste(330, 150, 330)]
    a, ha = senal_img("R-301", 300, 30, 60)
    b, hb = senal_img("S-500", 260, 30 + ha + 8, 140)
    els += [a, b]
    return els


ESQUEMAS_EXTRA = [
    ("cruce-sin-senalizar-tres-vehiculos.svg", "Cruce sin señalizar con tres vehículos",
     "Cruce de cuatro brazos sin señales, marcas ni semáforos. El vehículo A llega por el sur, el B por el este y el C por el norte; los tres quieren seguir recto. El brazo oeste está vacío.",
     cruce_tres_vehiculos),
    ("semaforo-ambar-intermitente-stop.svg", "Semáforo ámbar intermitente con STOP",
     "Vista desde el conductor al llegar a una intersección: en el lado derecho, un semáforo con la luz amarilla intermitente y, en el mismo poste, una señal de STOP.",
     semaforo_ambar_y_stop),
    ("ceda-y-stop-recto.svg", "Señales distintas a cada lado (recto)",
     "Vista desde el conductor al llegar a una intersección: a la derecha de la calzada, una señal de ceda el paso; a la izquierda, una señal de STOP. La flecha indica que el vehículo va a seguir de frente.",
     lambda: ceda_y_stop("recto")),
    ("ceda-y-stop-derecha.svg", "Señales distintas a cada lado (giro a la derecha)",
     "Vista desde el conductor al llegar a una intersección: a la derecha de la calzada, una señal de ceda el paso; a la izquierda, una señal de STOP. La flecha indica que el vehículo va a girar a la derecha.",
     lambda: ceda_y_stop("derecha")),
    ("agente-brazos-horizontales.svg", "Agente con los brazos extendidos",
     "Vista desde arriba de una intersección con un agente en el centro con los brazos extendidos horizontalmente hacia el este y el oeste. Se acercan vehículos por el sur (A), el norte (B), el este (C) y el oeste (D).",
     agente_brazos_horizontales),
    ("semaforo-flecha-verde-derecha.svg", "Rojo con flecha verde de giro",
     "Calzada de dos carriles ante un semáforo. En el carril derecho hay una flecha pintada de giro a la derecha y un turismo detenido ante la línea; en el izquierdo, una flecha de frente. El semáforo tiene la luz roja encendida y una flecha verde de giro a la derecha encendida.",
     semaforo_flecha_derecha),
    ("carril-reversible-semaforos.svg", "Semáforo de carril y semáforo en rojo",
     "Calzada con un pórtico de semáforos de carril: sobre el carril del vehículo A, una flecha verde hacia abajo; sobre el otro, un aspa roja. Más adelante hay un semáforo circular con la luz roja encendida.",
     carril_reversible),
    ("incorporacion-autopista.svg", "Incorporación a una autopista",
     "Autopista de dos carriles. El vehículo A circula por el carril derecho a la altura del carril de aceleración; el vehículo B se incorpora por el carril de aceleración. El carril izquierdo está libre.",
     incorporacion_autopista),
    ("marca-doble-continua.svg", "Doble línea continua",
     "Calzada de doble sentido cuyo eje está marcado con dos líneas blancas continuas y paralelas. El vehículo A circula hacia la derecha y el B en sentido contrario.",
     doble_continua),
    ("marca-continua-adosada-discontinua.svg", "Línea continua adosada a discontinua",
     "Calzada de doble sentido cuyo eje está formado por una línea continua adosada a una discontinua. El vehículo A circula por el carril contiguo a la línea discontinua; el B, en sentido contrario, junto a la continua.",
     continua_adosada),
    ("avanza-motos.svg", "Avanza-motos ante un semáforo",
     "Calle con un semáforo en rojo y un paso de peatones. Antes del paso hay un espacio de 4 m delimitado por dos líneas de detención, con pictogramas de motocicleta y bicicleta. Los turismos A y B esperan detrás.",
     avanza_motos),
    ("poblado-y-limite-velocidad.svg", "Límite de velocidad junto a la señal de poblado",
     "Carretera que llega a un poblado: en el mismo poste hay una señal de velocidad máxima 40 y, debajo, la señal de entrada a poblado con su nombre.",
     poblado_y_velocidad),
]

ESQUEMAS += ESQUEMAS_EXTRA

if __name__ == "__main__":
    aqui = os.path.dirname(os.path.abspath(__file__))
    for fichero, titulo, desc, fn in ESQUEMAS:
        with open(os.path.join(aqui, fichero), "w", encoding="utf-8") as f:
            f.write(svg(titulo, desc, fn()))
        print("ok", fichero)
