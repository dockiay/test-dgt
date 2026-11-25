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
  B (azul), C (amarillo), D (verde). Morro redondeado con faros y parabrisas grande; detrás, pilotos rojos.
  Delante del morro, un chevrón del color del vehículo marca el sentido
  (se quita solo cuando ese vehículo ya lleva flecha de trayectoria).
- La trayectoria prevista se dibuja como flecha del color del vehículo.
- Ángulos: 0 = hacia arriba, 90 = hacia la derecha, 180 = abajo, 270 = izquierda.
- El dibujo muestra la situación; nunca escribe la respuesta.
"""
import math
import re
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


def _aclarar(c, k):
    """Mezcla el color `c` (#rrggbb) con blanco (k > 0) o con negro (k < 0)."""
    r, g, b = (int(c[i:i + 2], 16) for i in (1, 3, 5))
    f = (lambda v: v + (255 - v) * k) if k > 0 else (lambda v: v * (1 + k))
    return "#%02x%02x%02x" % tuple(round(f(v)) for v in (r, g, b))


def vehiculo(x, y, angulo, letra, color=None, largo=44, ancho=22, sentido=True):
    """Turismo visto desde arriba, centrado en (x, y), con el morro hacia `angulo`.

    El sentido de marcha se lee por la forma (morro redondeado con faros
    blancos, parabrisas grande delante, luna trasera pequeña y pilotos rojos
    detrás) y por un chevrón del color del vehículo delante del morro.
    El chevrón se omite solo si ese vehículo ya tiene su flecha de trayectoria
    (ver `svg`), o con sentido=False.
    """
    c = color or COLORES.get(letra, "#777")
    borde, techo = _aclarar(c, -0.45), _aclarar(c, 0.18)
    l, a = largo, ancho
    h, m = l / 2, a / 2
    # Carrocería: morro más redondeado que la trasera.
    cuerpo = (f"M{-m},{-h + 9} Q{-m},{-h} {-m + 8},{-h} L{m - 8},{-h} Q{m},{-h} {m},{-h + 9} "
              f"L{m},{h - 5} Q{m},{h} {m - 5},{h} L{-m + 5},{h} Q{-m},{h} {-m},{h - 5} Z")
    partes = [
        f'<path d="{cuerpo}" transform="translate(1.5 2)" fill="#000" opacity=".22"/>',
        f'<path d="{cuerpo}" fill="{c}" stroke="{borde}" stroke-width="1.4"/>',
        # techo
        f'<rect x="{-m + 3.5}" y="{-h + 15}" width="{a - 7}" height="{l - 25}" rx="3" fill="{techo}"/>',
        # parabrisas (grande, delante) y luna trasera (pequeña, detrás)
        f'<path d="M{-m + 2.5},{-h + 9.5} Q0,{-h + 6} {m - 2.5},{-h + 9.5} L{m - 4},{-h + 15.5} '
        f'Q0,{-h + 14} {-m + 4},{-h + 15.5} Z" fill="#1f2630"/>',
        f'<path d="M{-m + 4},{h - 8.5} Q0,{h - 7.5} {m - 4},{h - 8.5} L{m - 3},{h - 4.5} '
        f'Q0,{h - 3} {-m + 3},{h - 4.5} Z" fill="#1f2630"/>',
        # faros delante y pilotos detrás
        f'<rect x="{-m + 2}" y="{-h + 0.6}" width="6" height="3" rx="1.5" fill="#fff7cf" stroke="{borde}" stroke-width=".6"/>',
        f'<rect x="{m - 8}" y="{-h + 0.6}" width="6" height="3" rx="1.5" fill="#fff7cf" stroke="{borde}" stroke-width=".6"/>',
        f'<rect x="{-m + 2}" y="{h - 2.6}" width="5" height="2.2" rx="1.1" fill="#ff3b30"/>',
        f'<rect x="{m - 7}" y="{h - 2.6}" width="5" height="2.2" rx="1.1" fill="#ff3b30"/>',
    ]
    if letra:
        partes.append(f'<text x="0" y="5.5" transform="translate(0 {(l - 25) / 2 + 15 - h - 2.5:.1f}) rotate({-angulo:.1f})" '
                      f'text-anchor="middle" font-family="-apple-system, \'Helvetica Neue\', Arial, sans-serif" '
                      f'font-weight="800" font-size="14" fill="#fff" stroke="{borde}" stroke-width="2.2" '
                      f'paint-order="stroke">{letra}</text>')
    if sentido:
        # Chevrón de sentido delante del morro, con contorno blanco para que se vea sobre el asfalto.
        d = f"M-7,{-h - 5} L0,{-h - 12} L7,{-h - 5}"
        partes.append(f'<g class="sentido" data-letra="{letra}" fill="none" stroke-linecap="round" stroke-linejoin="round">'
                      f'<path d="{d}" stroke="#fff" stroke-width="6.5"/><path d="{d}" stroke="{c}" stroke-width="3.5"/></g>')
    return f'<g transform="translate({x:.1f} {y:.1f}) rotate({angulo:.1f})">' + "".join(partes) + "</g>"


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
    cuerpo = list(cuerpo)
    con_flecha = {m for e in cuerpo for m in re.findall(r'marker-end="url\(#punta-(\w)\)"', e)}
    cuerpo = [re.sub(r'<g class="sentido" data-letra="(\w)"[^>]*>.*?</g></g>$',
                     lambda k: "</g>" if k.group(1) in con_flecha else k.group(0), e) for e in cuerpo]
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
           vehiculo(240, 225, 0, "A", color="#9aa0a6", sentido=False)]  # sin chevrón: pisaría la línea; las flechas pintadas ya dan el sentido
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

# ---------------------------------------------------------------- señales en vehículos (RGV, anexo XI) y semáforos especiales
FONDO_NEUTRO = "#eef1f4"


def v5_vehiculo_lento():
    """V-5 según el plano del anexo XI del RGV: triángulo de vértices redondeados, borde reflectante
    rojo (1) y triángulo interior fluorescente rojo (2) separado por una franja fina."""
    cx, cy = 200, 225
    def tri(r):
        pts = [(cx + r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a))) for a in (90, 210, 330)]
        return " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    return [rect(0, 0, W, W, FONDO_NEUTRO),
            f'<polygon points="{tri(170)}" fill="#b5121b" stroke="#b5121b" stroke-width="22" stroke-linejoin="round"/>',
            f'<polygon points="{tri(116)}" fill="#ffffff"/>',
            f'<polygon points="{tri(108)}" fill="#ff3b1f"/>']


def v20_carga_saliente():
    """V-20 según el plano del anexo XI del RGV: panel cuadrado con franjas diagonales alternas rojas y blancas."""
    els = [rect(0, 0, W, W, FONDO_NEUTRO), '<clipPath id="v20"><rect x="60" y="60" width="280" height="280" rx="6"/></clipPath>',
           '<g clip-path="url(#v20)">', rect(60, 60, 280, 280, "#ffffff")]
    paso = 66  # anchura de cada franja medida en diagonal
    for i in range(-6, 8, 2):
        o = i * paso
        els.append(f'<polygon points="{60 + o},{340} {60 + o + paso},{340} {340 + o + paso},{60} {340 + o},{60}" fill="#d0021b"/>')
    els += ['</g>', '<rect x="60" y="60" width="280" height="280" rx="6" fill="none" stroke="#555" stroke-width="3"/>']
    return els


def semaforo_tranvia(barra):
    """Semáforo de fondo circular negro con una franja blanca iluminada (vertical u horizontal)."""
    els = [rect(0, 0, W, W, CIELO), rect(0, 300, W, 100, ASFALTO),
           # carriles del tranvía
           '<path d="M150,400 L185,300 M250,400 L215,300" stroke="#b9bec4" stroke-width="5"/>',
           poste(320, 120, 330),
           '<rect x="285" y="40" width="70" height="200" rx="8" fill="#1f2328"/>']
    for i, cy in enumerate((75, 140, 205)):
        els.append(f'<circle cx="320" cy="{cy}" r="26" fill="#0b0d10"/>')
    if barra == "vertical":
        els.append('<rect x="315" y="55" width="10" height="40" rx="3" fill="#ffffff"/>')
    else:
        els.append('<rect x="300" y="70" width="40" height="10" rx="3" fill="#ffffff"/>')
    return els


def semaforo_paso_nivel():
    """Dos luces rojas en horizontal (una encendida) bajo la cruz de paso a nivel (P-11 del catálogo)."""
    els = [rect(0, 0, W, W, CIELO), rect(0, 300, W, 100, ENTORNO),
           f'<polygon points="80,400 320,400 230,300 170,300" fill="{ASFALTO}"/>',
           '<path d="M0,318 L400,318 M0,330 L400,330" stroke="#7a6a58" stroke-width="5"/>',
           poste(300, 60, 320)]
    img, h = senal_img("P-11", 245, 40, 110)
    els.append(img)
    y = 40 + h + 20
    els += [f'<rect x="250" y="{y}" width="100" height="46" rx="23" fill="#1f2328"/>',
            f'<circle cx="275" cy="{y + 23}" r="16" fill="#e0322b"/>',
            f'<circle cx="325" cy="{y + 23}" r="16" fill="#4a1a18"/>']
    for ang in range(0, 360, 45):
        a = math.radians(ang)
        els.append(f'<line x1="{275 + 20 * math.cos(a):.1f}" y1="{y + 23 + 20 * math.sin(a):.1f}" '
                   f'x2="{275 + 27 * math.cos(a):.1f}" y2="{y + 23 + 27 * math.sin(a):.1f}" stroke="#e0322b" '
                   f'stroke-width="3" stroke-linecap="round"/>')
    return els


ESQUEMAS_EXTRA2 = [
    ("senal-V-5-vehiculo-lento.svg", "Señal en la parte trasera de un vehículo (triángulo rojo)",
     "Placa triangular con los vértices redondeados: borde rojo reflectante y triángulo interior rojo fluorescente.",
     v5_vehiculo_lento),
    ("senal-V-20-carga-saliente.svg", "Panel cuadrado de franjas rojas y blancas",
     "Panel cuadrado con franjas diagonales alternas rojas y blancas.",
     v20_carga_saliente),
    ("semaforo-tranvia-franja-vertical.svg", "Semáforo con franja blanca vertical",
     "Semáforo de luces circulares negras junto a unas vías de tranvía; la luz superior muestra una franja blanca vertical iluminada.",
     lambda: semaforo_tranvia("vertical")),
    ("semaforo-tranvia-franja-horizontal.svg", "Semáforo con franja blanca horizontal",
     "Semáforo de luces circulares negras junto a unas vías de tranvía; la luz superior muestra una franja blanca horizontal iluminada.",
     lambda: semaforo_tranvia("horizontal")),
    ("semaforo-paso-a-nivel.svg", "Semáforo de paso a nivel",
     "Carretera que cruza una vía férrea. En el poste, la señal de situación de paso a nivel y debajo dos luces rojas en horizontal, con una de ellas encendida.",
     semaforo_paso_nivel),
]

ESQUEMAS += ESQUEMAS_EXTRA2

ESQUEMAS += ESQUEMAS_EXTRA

# ---------------------------------------------------------------- tanda 3: más preguntas con imagen (24/11/2026)
def rayos(x, y, r1, r2, color, ancho=2.5):
    """Rayos alrededor de una luz para indicar que parpadea (intermitente)."""
    els = []
    for ang in range(0, 360, 45):
        a = math.radians(ang)
        els.append(f'<line x1="{x + r1 * math.cos(a):.1f}" y1="{y + r1 * math.sin(a):.1f}" '
                   f'x2="{x + r2 * math.cos(a):.1f}" y2="{y + r2 * math.sin(a):.1f}" '
                   f'stroke="{color}" stroke-width="{ancho}" stroke-linecap="round"/>')
    return els


def semaforo_vista(luces):
    """Vista desde el conductor: semáforo circular en el lado derecho, sin otras señales."""
    els = perspectiva_cruce()
    els.append(poste(330, 95, 300))
    els += semaforo(330, 30, luces, escala=0.9)
    return els


def verde_y_stop():
    """Semáforo con la luz verde encendida y, en el mismo poste, una señal de STOP."""
    els = perspectiva_cruce()
    els.append(poste(330, 95, 300))
    els += semaforo(330, 40, {"verde": True}, escala=0.75)
    img, _ = senal_img("R-2", 306, 120, 48)
    els.append(img)
    return els


def peaton_glifo(x, y, s, color, andando):
    """Silueta de peatón (inmóvil o andando) centrada en (x, y)."""
    g = [f'<g transform="translate({x} {y}) scale({s})" fill="{color}" stroke="{color}" stroke-linecap="round">',
         '<circle cx="0" cy="-20" r="5" stroke="none"/>',
         '<rect x="-5" y="-14" width="10" height="16" rx="3" stroke="none"/>']
    if andando:
        g += ['<line x1="-2" y1="1" x2="-9" y2="19" stroke-width="5"/>',
              '<line x1="2" y1="1" x2="8" y2="19" stroke-width="5"/>',
              '<line x1="-4" y1="-12" x2="-11" y2="-1" stroke-width="4"/>',
              '<line x1="4" y1="-12" x2="10" y2="-3" stroke-width="4"/>']
    else:
        g += ['<line x1="-2.5" y1="1" x2="-2.5" y2="19" stroke-width="5"/>',
              '<line x1="2.5" y1="1" x2="2.5" y2="19" stroke-width="5"/>',
              '<line x1="-6" y1="-12" x2="-7" y2="1" stroke-width="4"/>',
              '<line x1="6" y1="-12" x2="7" y2="1" stroke-width="4"/>']
    g.append('</g>')
    return g


def semaforo_peatones(encendida, intermitente):
    """Paso para peatones visto desde la acera con un semáforo de peatones de dos luces."""
    els = [rect(0, 0, W, 170, CIELO), rect(0, 170, W, 230, ACERA),
           f'<polygon points="0,215 400,215 400,330 0,330" fill="{ASFALTO}"/>']
    for i in range(9):
        x = 10 + i * 44
        els.append(f'<polygon points="{x},222 {x + 26},222 {x + 30},322 {x - 2},322" fill="{MARCA}"/>')
    els += [poste(300, 150, 360),
            '<rect x="262" y="20" width="76" height="150" rx="8" fill="#1f2328"/>',
            '<rect x="270" y="28" width="60" height="62" rx="5" fill="#0b0d10"/>',
            '<rect x="270" y="100" width="60" height="62" rx="5" fill="#0b0d10"/>']
    if encendida == "rojo":
        els += peaton_glifo(300, 60, 1.2, "#e0322b", andando=False)
        els += peaton_glifo(300, 131, 1.2, "#163a24", andando=True)
    else:
        els += peaton_glifo(300, 60, 1.2, "#4a1a18", andando=False)
        els += peaton_glifo(300, 131, 1.2, "#22b35a", andando=True)
        if intermitente:
            els += [f'<path d="M262,{y} l-16,0" stroke="#22b35a" stroke-width="3" stroke-linecap="round"/>' for y in (112, 131, 150)]
            els += [f'<path d="M338,{y} l16,0" stroke="#22b35a" stroke-width="3" stroke-linecap="round"/>' for y in (112, 131, 150)]
    return els


def semaforo_tranvia_v2(barra, intermitente=False):
    """Como semaforo_tranvia, con franja oblicua hacia la derecha o franja intermitente."""
    els = [rect(0, 0, W, W, CIELO), rect(0, 300, W, 100, ASFALTO),
           '<path d="M150,400 L185,300 M250,400 L215,300" stroke="#b9bec4" stroke-width="5"/>',
           poste(320, 120, 330),
           '<rect x="285" y="40" width="70" height="200" rx="8" fill="#1f2328"/>']
    for cy in (75, 140, 205):
        els.append(f'<circle cx="320" cy="{cy}" r="26" fill="#0b0d10"/>')
    if barra == "vertical":
        els.append('<rect x="315" y="55" width="10" height="40" rx="3" fill="#ffffff"/>')
    elif barra == "oblicua_derecha":
        els.append('<rect x="315" y="55" width="10" height="40" rx="3" fill="#ffffff" transform="rotate(45 320 75)"/>')
    if intermitente:
        els += rayos(320, 75, 31, 39, "#ffffff", ancho=3)
    return els


def carril_flecha_y_ceda():
    """Semáforo de carril con flecha verde sobre el carril de A y, más adelante, señal de ceda el paso."""
    els = [rect(140, 0, 120, W, ASFALTO), rect(0, 40, W, 80, ASFALTO),
           linea(200, 120, 200, W, discontinua=True), linea(140, 120, 140, W, ancho=3),
           linea(260, 120, 260, W, ancho=3), linea(0, 80, 140, 80, discontinua=True),
           linea(260, 80, W, 80, discontinua=True),
           linea(200, 128, 260, 128, discontinua=True, ancho=5),
           '<rect x="130" y="268" width="140" height="6" fill="#8a8f96"/>',
           vehiculo(230, 350, 0, "A")]
    els += semaforo_carril(230, 271, "flecha_abajo_verde", escala=0.7)
    els += semaforo_carril(170, 271, "aspa_roja", escala=0.7)
    els.append(poste(276, 135, 180))
    img, _ = senal_img("R-1", 262, 120, 30)
    els.append(img)
    els += recuadro(8, 150, 112, 120, "semáforo de carril")
    els += semaforo_carril(64, 215, "flecha_abajo_verde", escala=1.4)
    els += recuadro(292, 150, 100, 120, "más adelante")
    img2, _ = senal_img("R-1", 312, 175, 60)
    els.append(img2)
    return els


def ceda_vertical_stop_marca():
    """Vista desde el conductor: señal vertical de ceda el paso y, en la calzada, línea de detención con STOP."""
    els = perspectiva_cruce()
    els += [poste(335, 150, 300)]
    a, _ = senal_img("R-1", 305, 100, 60)
    els.append(a)
    els += ['<polygon points="200,262 287,262 290,270 200,270" fill="#fff"/>',
            '<text x="246" y="300" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" '
            'font-weight="bold" font-size="30" fill="#fff" transform="scale(1 0.7) translate(0 128)">STOP</text>']
    return els


def agente_glifo(x, y, s=1.0):
    """Agente de frente con el brazo derecho levantado verticalmente."""
    return [f'<g transform="translate({x} {y}) scale({s})">',
            '<rect x="-9" y="-30" width="18" height="34" rx="4" fill="#20304f"/>',
            '<rect x="-8" y="4" width="7" height="30" fill="#20304f"/><rect x="1" y="4" width="7" height="30" fill="#20304f"/>',
            '<rect x="-15" y="-29" width="6" height="26" rx="3" fill="#20304f"/>',
            '<rect x="9" y="-62" width="6" height="34" rx="3" fill="#20304f"/>',
            '<circle cx="12" cy="-64" r="3.5" fill="#ffffff"/>',
            '<circle cx="0" cy="-38" r="7" fill="#f0c9a0"/>',
            '<rect x="-8" y="-47" width="16" height="6" rx="2" fill="#ffffff"/>',
            '</g>']


def agente_y_verde():
    """Vista desde el conductor: semáforo en verde a la derecha y un agente en el cruce con el brazo levantado."""
    els = perspectiva_cruce()
    els.append(poste(330, 95, 300))
    els += semaforo(330, 30, {"verde": True}, escala=0.9)
    els += agente_glifo(185, 225, 1.1)
    return els


def tres_carriles_doble_sentido():
    """Calzada de doble sentido con tres carriles separados por líneas discontinuas."""
    els = [rect(0, 140, W, 120, ASFALTO), linea(0, 142, W, 142, ancho=3), linea(0, 258, W, 258, ancho=3),
           linea(0, 180, W, 180, discontinua=True), linea(0, 220, W, 220, discontinua=True),
           vehiculo(110, 240, 90, "A"), vehiculo(220, 240, 90, "B"), vehiculo(330, 160, 270, "C")]
    return els


def retencion(carriles):
    """Vía con 2 o 3 carriles por sentido y la circulación detenida; los vehículos ocupan todos los carriles."""
    ancho = 50
    x0 = 200 - carriles * ancho / 2
    els = [rect(x0 - 60, 0, 40, W, "#b9c7a5"),  # mediana
           '<rect x="{:.0f}" y="0" width="4" height="400" fill="#8a8f96"/>'.format(x0 - 42),
           rect(x0 - 14, 0, carriles * ancho + 50, W, ASFALTO),
           linea(x0, 0, x0, W, ancho=3), linea(x0 + carriles * ancho, 0, x0 + carriles * ancho, W, ancho=3)]
    for i in range(1, carriles):
        els.append(linea(x0 + i * ancho, 0, x0 + i * ancho, W, discontinua=True))
    colores = ["#9aa0a6", "#c9cdd2", "#7d8389"]
    for i in range(carriles):
        for j, y in enumerate((60, 125, 190, 255, 320)):
            els.append(vehiculo(x0 + ancho * (i + 0.5), y + (i % 2) * 18, 0, "", color=colores[(i + j) % 3], sentido=(j == 0)))
    return els


def glorieta_sin_senalizar():
    """Glorieta sin señales ni marcas de ceda el paso: A circula por el anillo; B llega a la entrada sur."""
    cx = cy = 200
    r_ext, r_isla = 125, 58
    els = via_vertical(central="discontinua") + via_horizontal(central="discontinua")
    els += [f'<circle cx="{cx}" cy="{cy}" r="{r_ext}" fill="{ASFALTO}"/>',
            f'<circle cx="{cx}" cy="{cy}" r="{r_isla}" fill="{ENTORNO}" stroke="{MARCA}" stroke-width="3"/>']
    r = (r_ext + r_isla) / 2

    def punto(t):
        t = math.radians(t)
        return cx + r * math.cos(t), cy - r * math.sin(t)

    def rumbo(t):
        t = math.radians(t)
        return math.degrees(math.atan2(-math.sin(t), math.cos(t))) % 360

    xa, ya = punto(215)
    x1, y1 = punto(235)
    x2, y2 = punto(300)
    els += [vehiculo(xa, ya, rumbo(215), "A"),
            flecha(f"M{x1:.1f},{y1:.1f} A{r},{r} 0 0 0 {x2:.1f},{y2:.1f}", "A"),
            vehiculo(220, 360, 0, "B"),
            flecha("M220,333 L220,318", "B")]
    return els


def semaforo_otro_lado():
    """Cruce visto desde arriba: el semáforo está en la esquina del otro lado; no hay línea de detención."""
    els = via_vertical(central=None) + via_horizontal(central=None)
    for a, b in ((0, 160), (240, 400)):
        els.append(linea(200, a, 200, b, discontinua=True))
        els.append(linea(a, 200, b, 200, discontinua=True))
    els += [vehiculo(220, 320, 0, "A"), poste(256, 112, 126)]
    els += semaforo(256, 78, {"rojo": True}, escala=0.4)
    els += recuadro(300, 230, 92, 128, "semáforo")
    els += semaforo(346, 252, {"rojo": True}, escala=0.9)
    return els


def cruce_tranvia():
    """Cruce sin señales: A llega por el sur; un tranvía se acerca por la izquierda de A sobre sus raíles."""
    els = via_vertical(central=None) + via_horizontal(central=None)
    for a, b in ((0, 160), (240, 400)):
        els.append(linea(200, a, 200, b, discontinua=True))
    els += ['<path d="M0,170 L400,170 M0,190 L400,190" stroke="#b9bec4" stroke-width="4"/>',
            vehiculo(220, 320, 0, "A"), flecha("M220,292 L220,110", "A"),
            '<g transform="translate(70 180)"><rect x="-60" y="-14" width="120" height="28" rx="8" fill="#e3a21a" stroke="#1b1b1b" stroke-width="1.5"/>'
            '<line x1="0" y1="-14" x2="0" y2="14" stroke="#1b1b1b" stroke-width="1.5"/>'
            '<rect x="52" y="-10" width="6" height="20" rx="2" fill="#20262e"/>'
            '<text x="-30" y="5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="12" fill="#fff">tranvía</text></g>',
            flecha("M140,180 L180,180", "C")]
    return els


def cruce_camino():
    """A circula por una vía pavimentada; por su derecha llega B desde un camino de tierra."""
    els = via_vertical(central="discontinua")
    els += [rect(240, 165, 160, 50, "#c8a978"),
            '<path d="M250,175 L400,178 M255,205 L400,203" stroke="#a88a5a" stroke-width="2" stroke-dasharray="6 8"/>',
            vehiculo(220, 320, 0, "A"), flecha("M220,292 L220,90", "A"),
            vehiculo(320, 190, 270, "B"), flecha("M292,190 L120,190", "B")]
    return els


def incorporacion_autovia_sin_trayectorias():
    """Como incorporacion_autovia, pero sin flechas de trayectoria (para no sugerir dónde entra A)."""
    return [e for e in incorporacion_autovia() if "marker-end" not in e]


def giro_izquierda_de_frente():
    """A, en el cruce, quiere girar a la izquierda; B se acerca de frente a poca distancia y sigue recto."""
    els = via_vertical(central=None) + via_horizontal(central=None)
    for a, b in ((0, 160), (240, 400)):
        els.append(linea(200, a, 200, b, discontinua=True))
        els.append(linea(a, 200, b, 200, discontinua=True))
    els += [vehiculo(215, 255, 350, "A"), flecha("M210,228 C205,205 190,185 110,180", "A"),
            vehiculo(180, 105, 180, "B"), flecha("M180,133 L180,300", "B")]
    return els


def refugio_sentido_unico():
    """Calle de sentido único con un refugio para peatones en el centro de la calzada, sin señales."""
    els = [rect(110, 0, 180, W, ASFALTO), rect(0, 0, 110, W, ACERA), rect(290, 0, 110, W, ACERA),
           linea(110, 0, 110, W, ancho=2, color="#9a948a"), linea(290, 0, 290, W, ancho=2, color="#9a948a")]
    for i in range(8):
        els.append(rect(114 + i * 22, 120, 13, 70, MARCA))
    els += ['<rect x="182" y="105" width="36" height="100" rx="14" fill="#e6e1d6" stroke="#9a948a" stroke-width="2"/>',
            vehiculo(200, 330, 0, "A")]
    els += [f'<path d="M{x},380 l0,-30 m-8,10 l8,-12 l8,12" stroke="#fff" stroke-width="4" fill="none"/>' for x in (140, 260)]
    return els


def grupo_ciclistas():
    """Cruce: un grupo de ciclistas lo atraviesa de izquierda a derecha y el primero ya ha entrado; A espera en el sur."""
    els = via_vertical(central=None) + via_horizontal(central=None)
    for a, b in ((0, 160), (240, 400)):
        els.append(linea(200, a, 200, b, discontinua=True))
        els.append(linea(a, 200, b, 200, discontinua=True))
    els += [vehiculo(220, 300, 0, "A")]
    for x in (215, 175, 140, 105, 70, 35):
        els += [f'<circle cx="{x}" cy="220" r="11" fill="#2a66cc"/>', bici_glifo(x, 220, 0.6)]
    els.append(flecha("M235,220 L290,220", "B"))
    return els


def v13_conductor_novel():
    """V-13 según el plano del anexo XI del RGV: placa de fondo verde reflectante con una L blanca reflectante
    y borde blanco."""
    return [rect(0, 0, W, W, FONDO_NEUTRO),
            # proporción del plano: 150 mm de ancho por 195 mm de alto
            '<rect x="85" y="50" width="230" height="300" rx="16" fill="#ffffff" stroke="#555" stroke-width="3"/>',
            '<rect x="97" y="62" width="206" height="276" rx="10" fill="#0b8a43"/>',
            # L del plano: ancho/alto 0,70 y trazo de 1/5 de la altura
            '<path d="M130,100 L170,100 L170,262 L271,262 L271,302 L130,302 Z" fill="#ffffff"/>']


ESQUEMAS_EXTRA3 = [
    ("semaforo-ambar-fijo.svg", "Semáforo con luz amarilla fija",
     "Vista desde el conductor al llegar a una intersección: en el lado derecho, un semáforo circular con la luz amarilla encendida, sin parpadear.",
     lambda: semaforo_vista({"ambar": True})),
    ("semaforo-ambar-intermitente.svg", "Semáforo con luz amarilla intermitente",
     "Vista desde el conductor al llegar a una intersección: en el lado derecho, un semáforo circular con la luz amarilla parpadeando.",
     lambda: semaforo_vista({"ambar": "intermitente"})),
    ("semaforo-verde-y-stop.svg", "Semáforo en verde y señal de STOP",
     "Vista desde el conductor al llegar a una intersección: en el lado derecho, un semáforo con la luz verde encendida y, en el mismo poste, una señal de STOP.",
     verde_y_stop),
    ("semaforo-peatones-verde-intermitente.svg", "Semáforo de peatones en verde intermitente",
     "Paso para peatones con un semáforo de peatones: la luz verde con la figura de un peatón andando parpadea; la roja está apagada.",
     lambda: semaforo_peatones("verde", True)),
    ("semaforo-peatones-rojo.svg", "Semáforo de peatones en rojo",
     "Paso para peatones con un semáforo de peatones: encendida la luz roja con la figura de un peatón inmóvil; la verde está apagada.",
     lambda: semaforo_peatones("rojo", False)),
    ("semaforo-tranvia-franja-oblicua-derecha.svg", "Semáforo con franja blanca oblicua",
     "Semáforo de luces circulares negras junto a unas vías de tranvía; la luz superior muestra una franja blanca oblicua, inclinada hacia la derecha, iluminada.",
     lambda: semaforo_tranvia_v2("oblicua_derecha")),
    ("semaforo-tranvia-franja-vertical-intermitente.svg", "Semáforo con franja blanca vertical intermitente",
     "Semáforo de luces circulares negras junto a unas vías de tranvía; la luz superior muestra una franja blanca vertical que parpadea.",
     lambda: semaforo_tranvia_v2("vertical", intermitente=True)),
    ("semaforo-carril-flecha-y-ceda.svg", "Semáforo de carril y ceda el paso",
     "Calzada con un pórtico de semáforos de carril: sobre el carril del vehículo A, una flecha verde hacia abajo; sobre el otro, un aspa roja. Más adelante, antes de llegar a una intersección, hay una señal de ceda el paso y su línea en la calzada.",
     carril_flecha_y_ceda),
    ("ceda-vertical-y-stop-marca.svg", "Ceda el paso vertical y STOP pintado",
     "Vista desde el conductor al llegar a una intersección: a la derecha, una señal vertical de ceda el paso; en la calzada, una línea de detención continua con la palabra STOP pintada.",
     ceda_vertical_stop_marca),
    ("agente-y-semaforo-verde.svg", "Agente y semáforo en verde",
     "Vista desde el conductor al llegar a una intersección: en el lado derecho, un semáforo con la luz verde encendida; en el cruce, un agente de frente con un brazo levantado.",
     agente_y_verde),
    ("tres-carriles-doble-sentido.svg", "Calzada de tres carriles y doble sentido",
     "Calzada de doble sentido con tres carriles separados por líneas discontinuas. Los vehículos A y B circulan hacia la derecha por el carril de abajo; el C, en sentido contrario, por el carril de arriba. El carril central está libre.",
     tres_carriles_doble_sentido),
    ("retencion-dos-carriles.svg", "Retención en una vía de dos carriles",
     "Calzada con dos carriles en el mismo sentido y la circulación detenida: los turismos esperan en fila en los dos carriles. A la izquierda, la mediana; a la derecha, el arcén.",
     lambda: retencion(2)),
    ("retencion-tres-carriles.svg", "Retención en una vía de tres carriles",
     "Calzada con tres carriles en el mismo sentido y la circulación detenida: los turismos esperan en fila en los tres carriles. A la izquierda, la mediana; a la derecha, el arcén.",
     lambda: retencion(3)),
    ("glorieta-sin-senalizar.svg", "Glorieta sin señalizar",
     "Glorieta de un carril sin señales ni marcas de ceda el paso. El vehículo A circula por el anillo y se acerca a la entrada sur; el vehículo B llega por esa entrada.",
     glorieta_sin_senalizar),
    ("semaforo-otro-lado-cruce.svg", "Semáforo al otro lado del cruce",
     "Cruce visto desde arriba. El vehículo A llega por el sur. El semáforo, con la luz roja encendida, está en la esquina del otro lado del cruce. No hay línea de detención.",
     semaforo_otro_lado),
    ("cruce-tranvia-izquierda.svg", "Cruce con tranvía",
     "Cruce sin señales ni semáforos. El vehículo A llega por el sur y va a seguir recto; por su izquierda se acerca un tranvía sobre sus raíles.",
     cruce_tranvia),
    ("cruce-camino-sin-pavimentar.svg", "Cruce con un camino de tierra",
     "Cruce sin señales. El vehículo A circula hacia arriba por una vía pavimentada; por su derecha llega el vehículo B desde un camino de tierra sin pavimentar. Los dos quieren seguir recto.",
     cruce_camino),
    ("incorporacion-autovia-sin-trayectorias.svg", "Carril de aceleración",
     "El vehículo A está al principio del carril de aceleración para incorporarse a la autovía; el vehículo B circula por el carril derecho de la autovía.",
     incorporacion_autovia_sin_trayectorias),
    ("giro-izquierda-vehiculo-de-frente.svg", "Giro a la izquierda con un vehículo de frente",
     "Cruce visto desde arriba. El vehículo A está en el cruce y quiere girar a la izquierda; el vehículo B se acerca de frente, a poca distancia, y va a seguir recto.",
     giro_izquierda_de_frente),
    ("refugio-peatones-sentido-unico.svg", "Refugio para peatones en una calle de sentido único",
     "Calle de sentido único con un paso para peatones y un refugio en el centro de la calzada. No hay señales. El vehículo A se acerca al refugio.",
     refugio_sentido_unico),
    ("grupo-ciclistas-cruce.svg", "Grupo de ciclistas en un cruce",
     "Cruce visto desde arriba. Un grupo de seis ciclistas lo atraviesa de izquierda a derecha y el primero ya está dentro; el vehículo A llega por el sur.",
     grupo_ciclistas),
    ("senal-V-13-conductor-novel.svg", "Placa verde con una L blanca",
     "Placa rectangular de fondo verde con una letra L blanca y un borde blanco.",
     v13_conductor_novel),
]

ESQUEMAS += ESQUEMAS_EXTRA3

if __name__ == "__main__":
    aqui = os.path.dirname(os.path.abspath(__file__))
    for fichero, titulo, desc, fn in ESQUEMAS:
        with open(os.path.join(aqui, fichero), "w", encoding="utf-8") as f:
            f.write(svg(titulo, desc, fn()))
        print("ok", fichero)
