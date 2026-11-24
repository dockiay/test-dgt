#!/usr/bin/env python3
"""Dibuja las marcas viales de las preguntas «como se ven desde el coche».

Los planos del Catálogo de marcas viales (RGC, anexo I) llevan cotas y, como las
inscripciones se pintan alargadas a propósito para que se lean bien en perspectiva,
vistos de frente parecen aplastados. Aquí cada marca se coloca sobre un plano de la
vía en metros (vista cenital) y se proyecta con la perspectiva de un conductor
(ojos a 1,2 m del suelo). Las letras, números, flechas y triángulos salen del propio
plano del BOE (img/marcas/*.png): se quitan las cotas con una apertura morfológica
y se conserva la forma oficial. Las líneas, cebreados, damero, cuadrícula y zigzag
se dibujan por código con las medidas del catálogo.

Uso:  python3 imagenes/marcas/vista_marcas.py        -> img/marcas-vista/*.jpg
"""
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLANOS = os.path.join(RAIZ, "img", "marcas")
SALIDA = os.path.join(RAIZ, "img", "marcas-vista")

PXM = 50                 # píxeles por metro en el plano cenital
ANCHO, ALTO = 960, 600   # imagen final (se dibuja al doble y se reduce)
SS = 2
HORIZONTE = 0.16         # fracción de la altura donde queda el horizonte
FOCAL = 1250             # en píxeles de la imagen final
OJOS = 4.0               # altura del punto de vista (m): algo por encima del coche, para que la marca se lea

ASFALTO = (88, 93, 102)
ASFALTO_LEJOS = (128, 132, 140)
BLANCO = (246, 246, 242)
AMARILLO = (242, 190, 40)
ROJO = (208, 52, 44)
HIERBA = (126, 160, 92)
HIERBA_LEJOS = (170, 190, 140)
ACERA = (196, 190, 180)
BORDILLO = (228, 225, 218)
CIELO_ARRIBA = (176, 208, 238)
CIELO_ABAJO = (232, 241, 250)


class Plano:
    """Plano cenital: x lateral (m, 0 en el centro), y hacia delante (m, 0 = borde inferior de la vista)."""

    def __init__(self, ancho=24.0, largo=70.0, fondo=HIERBA):
        self.w, self.l = ancho, largo
        self.im = Image.new("RGB", (int(ancho * PXM), int(largo * PXM)), fondo)
        self.d = ImageDraw.Draw(self.im)

    def p(self, x, y):
        return ((x + self.w / 2) * PXM, (self.l - y) * PXM)

    def poli(self, pts, color):
        self.d.polygon([self.p(x, y) for x, y in pts], fill=color)

    def rect(self, x0, y0, x1, y1, color):
        self.poli([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], color)

    def calzada(self, x0, x1, y0=-5, y1=None, color=ASFALTO):
        self.rect(x0, y0, x1, self.l if y1 is None else y1, color)

    def linea(self, x, y0=-5, y1=None, ancho=0.15, color=BLANCO):
        self.rect(x - ancho / 2, y0, x + ancho / 2, self.l if y1 is None else y1, color)

    def discontinua(self, x, trazo, vano, y0=-5, y1=None, ancho=0.15, color=BLANCO, fase=0.0):
        y = y0 + fase
        fin = self.l if y1 is None else y1
        while y < fin:
            self.rect(x - ancho / 2, y, x + ancho / 2, min(y + trazo, fin), color)
            y += trazo + vano

    def transversal(self, x0, x1, y, ancho=0.4, trazo=None, vano=None, color=BLANCO):
        if trazo is None:
            self.rect(x0, y, x1, y + ancho, color)
            return
        x = x0
        while x < x1:
            self.rect(x, y, min(x + trazo, x1), y + ancho, color)
            x += trazo + vano

    def figura(self, mascara, cx, y0, alto, color=BLANCO, ancho=None, girar=0):
        """Pega una máscara (L) del plano del BOE; y0 es su extremo cercano."""
        m = mascara.rotate(girar, expand=True) if girar else mascara
        if ancho is None:
            ancho = alto * m.width / m.height
        m = m.resize((max(1, int(ancho * PXM)), max(1, int(alto * PXM))), Image.LANCZOS)
        x, y = self.p(cx - ancho / 2, y0 + alto)
        self.im.paste(Image.new("RGB", m.size, color), (int(x), int(y)), m)


def mascara(fichero, caja=None, abrir=5, tinta=150, color=False, minimo=0.01):
    """Forma de la marca sin cotas: umbral + apertura (quita líneas finas y textos pequeños)."""
    im = Image.open(os.path.join(PLANOS, fichero)).convert("RGBA")
    fondo = Image.new("RGBA", im.size, "white")
    fondo.alpha_composite(im)
    im = fondo.convert("RGB")
    if caja:
        im = im.crop(caja)
    a = np.asarray(im).astype(int)
    m = a.min(-1) < tinta
    if color:
        m |= (a.max(-1) - a.min(-1)) > 80
    mi = Image.fromarray((m * 255).astype("uint8"))
    if abrir:
        mi = mi.filter(ImageFilter.MinFilter(abrir)).filter(ImageFilter.MaxFilter(abrir))
    return quitar_restos(mi, minimo)


def quitar_restos(mi, minimo):
    """Borra las manchas pequeñas (restos de cifras de las cotas): se queda con las piezas grandes."""
    mi = mi.copy()
    total = np.count_nonzero(np.asarray(mi))
    while True:
        a = np.asarray(mi)
        quedan = np.argwhere(a == 255)
        if not len(quedan):
            break
        y, x = quedan[0]
        ImageDraw.floodfill(mi, (int(x), int(y)), 100)
        b = np.asarray(mi)
        area = np.count_nonzero(b == 100)
        mi = Image.fromarray(np.where(b == 100, 60 if area >= minimo * total else 0, b).astype("uint8")).copy()
    mi = Image.fromarray(np.where(np.asarray(mi) == 60, 255, 0).astype("uint8"))
    return mi.crop(mi.getbbox())


def homografia(src, dst):
    """Coeficientes (a..h) que llevan dst -> src, como pide Image.transform(PERSPECTIVE)."""
    filas, b = [], []
    for (x, y), (u, v) in zip(src, dst):
        filas.append([u, v, 1, 0, 0, 0, -x * u, -x * v]); b.append(x)
        filas.append([0, 0, 0, u, v, 1, -y * u, -y * v]); b.append(y)
    return np.linalg.solve(np.array(filas, float), np.array(b, float)).tolist()


def vista(plano, camara_x=1.75, fondo_lejos=HIERBA_LEJOS, ojos=OJOS, focal=FOCAL, horizonte=HORIZONTE):
    """Proyecta el plano. El borde inferior de la imagen corresponde a y = 0."""
    W, H = ANCHO * SS, ALTO * SS
    f, hz = focal * SS, horizonte * H
    d0 = f * ojos / (H - hz)

    def proy(x, y):
        z = y + d0
        return (W / 2 + f * (x - camara_x) / z, hz + f * ojos / z)

    # cuatro puntos del suelo -> pantalla
    pts = [(-6 + camara_x, 0), (6 + camara_x, 0), (6 + camara_x, 30), (-6 + camara_x, 30)]
    coef = homografia([plano.p(x, y) for x, y in pts], [proy(x, y) for x, y in pts])
    suelo = plano.im.transform((W, H), Image.PERSPECTIVE, coef, Image.BICUBIC, fillcolor=fondo_lejos)
    # neblina hacia el horizonte (perspectiva aérea) y cielo
    out = Image.new("RGB", (W, H))
    cielo = Image.linear_gradient("L").resize((W, int(hz) + 1))
    out.paste(Image.composite(Image.new("RGB", cielo.size, CIELO_ABAJO), Image.new("RGB", cielo.size, CIELO_ARRIBA), cielo), (0, 0))
    filas = np.arange(H, dtype=float)
    prof = np.where(filas > hz + 1, f * ojos / np.maximum(filas - hz, 1e-3), 1e9) - d0
    niebla = np.clip((prof - 35) / 140, 0, 0.55)
    mezcla = Image.fromarray((np.repeat(niebla[:, None], W, 1) * 255).astype("uint8"))
    suelo = Image.composite(Image.new("RGB", (W, H), CIELO_ABAJO), suelo, mezcla)
    mascara_suelo = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mascara_suelo).rectangle([0, int(hz) + 1, W, H], fill=255)
    out.paste(suelo, (0, 0), mascara_suelo)
    return out.resize((ANCHO, ALTO), Image.LANCZOS)


# ---------------------------------------------------------------- escenas

def via_dos_sentidos(p, centro="continua", arcen=0.0, borde=True):
    """Carretera convencional: carril propio x 0..3.5, contrario -3.5..0."""
    p.calzada(-3.5 - arcen, 3.5 + arcen)
    if borde:
        p.linea(3.5 - 0.075); p.linea(-3.5 + 0.075)
    if centro == "continua":
        p.linea(0, ancho=0.10)
    elif centro == "discontinua":
        p.discontinua(0, 3.5, 9, ancho=0.10)


def autovia(p, carriles=2, arcen=2.5):
    """Calzada de un solo sentido: carriles hacia la derecha desde x=0."""
    w = 3.5 * carriles
    p.calzada(-1.0, w + arcen)
    p.linea(-1.0 + 0.6, ancho=0.15)
    p.linea(w + 0.15, ancho=0.30)
    for i in range(1, carriles):
        p.discontinua(3.5 * i, 5, 12, ancho=0.15)


def cruce(p, y0, y1, x0=-30, x1=30):
    p.calzada(x0, x1, y0, y1)


def acera(p, x, y0=-5, y1=None, ancho=4.0):
    p.rect(x, y0, x + 0.25, p.l if y1 is None else y1, BORDILLO)
    p.rect(x + 0.25, y0, x + ancho, p.l if y1 is None else y1, ACERA)


def calle(p, sentidos=2):
    p.calzada(-4.5, 4.5)
    acera(p, 4.5)
    p.rect(-8.5, -5, -4.75, p.l, ACERA)
    p.rect(-4.75, -5, -4.5, p.l, BORDILLO)
    if sentidos == 2:
        p.discontinua(0, 3.5, 3.5, ancho=0.10)


def m_1_1():
    p = Plano(fondo=HIERBA)
    autovia(p)
    return vista(p, camara_x=5.25)


def m_1_4():
    p = Plano()
    p.calzada(-5.25, 5.25)
    p.linea(-5.25 + 0.075); p.linea(5.25 - 0.075)
    for x in (-1.75, 1.75):
        for dx in (-0.175, 0.175):
            p.discontinua(x + dx, 3.5, 1.5, ancho=0.15)
    return vista(p, camara_x=3.5)


def m_1_9():
    p = Plano()
    via_dos_sentidos(p, centro=None)
    p.discontinua(0, 3.5, 1.5, y0=-1, y1=22, ancho=0.10)
    p.linea(0, y0=22.5, ancho=0.10)
    return vista(p, camara_x=1.75)


def interseccion_delante(p, y_cruce=11, ancho_cruce=7):
    via_dos_sentidos(p, centro=None)
    p.linea(0, y1=y_cruce - 0.6, ancho=0.10)
    p.calzada(-40, 40, y_cruce, y_cruce + ancho_cruce)
    p.linea(0, y0=y_cruce + ancho_cruce, ancho=0.10)
    for yb in (y_cruce + 0.075, y_cruce + ancho_cruce - 0.075):
        p.rect(-40, yb - 0.075, -3.5, yb + 0.075, BLANCO)
        p.rect(3.5, yb - 0.075, 40, yb + 0.075, BLANCO)
    for xa in range(-40, 40, 12):
        p.rect(xa, y_cruce + ancho_cruce / 2 - 0.05, xa + 3.5, y_cruce + ancho_cruce / 2 + 0.05, BLANCO)


def triangulo_ceda():
    return mascara("M-6.5.png")


def m_4_2():
    p = Plano()
    interseccion_delante(p)
    p.transversal(0.1, 3.4, 10.2, ancho=0.40, trazo=0.8, vano=0.4)
    p.figura(triangulo_ceda(), 1.75, 2.5, 3.6, ancho=1.2)
    return vista(p)


def m_6_5():
    return m_4_2()


def m_6_3():
    p = Plano()
    interseccion_delante(p)
    p.transversal(0.1, 3.4, 10.2, ancho=0.40)
    p.figura(mascara("M-6.3.png", abrir=7), 1.75, 3.0, 4.0, ancho=2.25)
    return vista(p)


def m_4_3b():
    p = Plano()
    via_dos_sentidos(p, centro="continua")
    y0, y1 = 7.0, 11.0
    p.rect(-3.5, y0 - 1.2, 3.5, y1 + 1.2, (100, 105, 114))  # paso sobreelevado (algo más claro)
    x = -3.25
    while x < 3.3:
        p.rect(x, y0, x + 0.5, y1, BLANCO)
        if x + 0.25 > 0:   # nuestro sentido: el triángulo prolonga la franja hacia quien llega
            p.poli([(x, y0), (x + 0.5, y0), (x + 0.25, y0 - 0.7)], BLANCO)
        else:
            p.poli([(x, y1), (x + 0.5, y1), (x + 0.25, y1 + 0.7)], BLANCO)
        x += 1.0
    return vista(p, camara_x=1.0)


def m_4_5():
    p = Plano()
    via_dos_sentidos(p, centro="continua")
    yb = 7.0   # parte alta del lomo: aquí van los lados cortos de los triángulos
    p.rect(0.05, yb, 3.45, yb + 3.0, (100, 105, 114))
    p.rect(0.05, yb - 2.2, 3.45, yb, (94, 99, 108))
    for i in range(3):
        x0 = 0.7 + i * 0.7
        p.poli([(x0, yb), (x0 + 0.7, yb), (x0 + 0.35, yb - 2.0)], BLANCO)
    return vista(p)


def m_5_2d():
    p = Plano(fondo=ACERA)
    calle(p, sentidos=1)
    p.discontinua(0, 3.5, 3.5, ancho=0.10)
    p.figura(mascara("M-5.2d.png", abrir=3), 2.25, 2.0, 5.0)
    return vista(p, camara_x=2.25, fondo_lejos=ACERA)


def m_5_4b():
    p = Plano()
    autovia(p)
    # el carril derecho termina más adelante: la calzada se estrecha hacia la izquierda
    p.poli([(7.3, 18), (14, 18), (14, 80), (3.65, 80), (3.65, 48)], HIERBA)
    p.d.line([p.p(7.3, 18), p.p(3.65, 48), p.p(3.65, 80)], fill=BLANCO, width=int(0.30 * PXM))
    p.figura(mascara("M-5.4b.png", abrir=3), 5.25, 2.0, 4.35)
    return vista(p, camara_x=4.5)


def m_5_5():
    p = Plano()
    via_dos_sentidos(p, centro=None)
    p.discontinua(0, 3.5, 9, y1=1.5, ancho=0.10)
    p.figura(mascara("M-5.5.png", abrir=3), 0.0, 2.0, 5.0)
    p.discontinua(0, 3.5, 9, y0=8.5, ancho=0.10)
    return vista(p, camara_x=-1.5)


def m_5_8():
    p = Plano(fondo=ACERA)
    p.calzada(-4, 4)
    p.calzada(-40, 40, 4, 13)
    p.linea(0, y1=3.4, ancho=0.10)
    p.figura(mascara("M-5.8.png", abrir=5), 0.0, 7.6, 2.0, ancho=4.45)
    return vista(p, camara_x=1.5, fondo_lejos=ACERA)


def m_6_6():
    p = Plano()
    autovia(p)
    p.figura(mascara("M-6.6.png", caja=(0, 0, 260, 883), abrir=5), 5.25, 1.5, 9.0)
    return vista(p, camara_x=5.25)


def m_6_20():
    p = Plano()
    autovia(p, arcen=3.0)
    m = mascara("M-6.20.png", caja=(40, 75, 881, 250), abrir=7)
    p.figura(m, 8.75, 1.0, 7.0, girar=90)
    return vista(p, camara_x=6.5)


def m_6_21():
    p = Plano()
    autovia(p)
    p.figura(mascara("M-6.21.png", abrir=7), 5.25, 2.5, 4.5)
    return vista(p, camara_x=5.25)


def m_7_1a():
    p = Plano()
    autovia(p, arcen=0.0)
    # salida por la derecha: el carril de salida se separa y entre ambos queda la zona cebreada
    div = lambda y: 7.3 + max(0.0, y - 2.0) * 0.30          # borde izquierdo del carril de salida
    ys = np.linspace(-5, 80, 300)
    p.poli([(7.0, -5)] + [(div(y) + 3.6, y) for y in ys] + [(7.0, 80)], ASFALTO)
    p.d.line([p.p(div(y) + 3.6, y) for y in ys], fill=BLANCO, width=int(0.15 * PXM))
    p.d.line([p.p(div(y), y) for y in ys if y >= 2], fill=BLANCO, width=int(0.20 * PXM))
    p.linea(7.15, y0=2.0, ancho=0.20)
    capa = Image.new("L", p.im.size, 0)
    dc = ImageDraw.Draw(capa)
    y = 3.0
    while y < 80:
        dc.line([p.p(7.15, y), p.p(7.15 + 12, y + 12 * 1.6)], fill=255, width=int(0.45 * PXM))
        y += 3.0
    zona = Image.new("L", p.im.size, 0)
    ImageDraw.Draw(zona).polygon([p.p(7.25, 2.0)] + [p.p(div(y) - 0.1, y) for y in ys if y > 2.2] + [p.p(7.25, 80)], fill=255)
    capa = Image.fromarray(np.minimum(np.asarray(capa), np.asarray(zona)))
    p.im.paste(Image.new("RGB", p.im.size, BLANCO), (0, 0), capa)
    return vista(p, camara_x=6.5, ojos=5.0)


def m_7_5():
    p = Plano()
    via_dos_sentidos(p, centro="continua")
    p.figura(mascara("M-7.5.png", caja=(150, 0, 783, 994), abrir=5), 1.75, 1.0, 15.0, ancho=3.0)
    return vista(p)


def m_7_6():
    p = Plano(fondo=ACERA)
    p.calzada(-4.0, 7.0)
    acera(p, 7.0)
    p.discontinua(0, 3.5, 3.5, ancho=0.10)
    m = mascara("M-7.6.png", abrir=3, minimo=0.004)
    alto = 7.5
    ancho = alto * m.width / m.height
    p.figura(m, 3.5 + ancho / 2, 0.5, alto)
    return vista(p, camara_x=3.5, fondo_lejos=ACERA, ojos=6.0)


def calle_bordillo(amarillo):
    p = Plano(fondo=ACERA)
    calle(p)
    amarillo(p)
    return vista(p, camara_x=2.2, fondo_lejos=ACERA)


def m_7_7():
    return calle_bordillo(lambda p: p.discontinua(4.5 - 0.25, 1.0, 2.0, ancho=0.15, color=AMARILLO))


def m_7_8():
    return calle_bordillo(lambda p: p.linea(4.5 - 0.25, ancho=0.15, color=AMARILLO))


def m_7_9():
    def zig(p):
        pts, y, k = [], 1.0, 0
        while y < 24:
            pts.append(p.p(4.5 - 0.1 - (1.0 if k % 2 else 0.0), y)); y += 1.0; k += 1
        p.d.line(pts, fill=AMARILLO, width=int(0.15 * PXM), joint="curve")
    return calle_bordillo(zig)


def m_7_10():
    p = Plano(fondo=ACERA)
    p.calzada(-4, 4)
    y0, y1 = 5.0, 13.0
    p.calzada(-40, 40, y0, y1)
    p.linea(0, y1=y0 - 2.0, ancho=0.10)
    p.transversal(0.05, 3.95, y0 - 2.0, ancho=0.40)
    # cuadrícula amarilla: recuadro y diagonales cruzadas
    x0, x1 = -4.0, 4.0
    lw = int(0.15 * PXM)
    p.d.rectangle([p.p(x0, y1), p.p(x1, y0)], outline=AMARILLO, width=lw)
    for k in np.arange(-12, 12, 1.4):
        a = [(x0 + t, y0 + t + k) for t in np.linspace(0, 8, 2)]
        b = [(x0 + t, y1 - t + k) for t in np.linspace(0, 8, 2)]
        for seg in (a, b):
            (xa, ya), (xb, yb) = seg
            # recorta a la caja
            ts = np.linspace(0, 1, 400)
            dentro = [(xa + (xb - xa) * t, ya + (yb - ya) * t) for t in ts if y0 <= ya + (yb - ya) * t <= y1]
            if len(dentro) > 1:
                p.d.line([p.p(*q) for q in (dentro[0], dentro[-1])], fill=AMARILLO, width=lw)
    return vista(p, camara_x=2.0, fondo_lejos=ACERA)


def m_7_11():
    p = Plano()
    via_dos_sentidos(p, centro="continua")
    # lecho de frenado que sale por la derecha
    p.poli([(3.5, 0), (3.5, 60), (8.5, 60), (8.5, 6)], ASFALTO)
    p.linea(3.5 - 0.075, y1=0)
    for i in range(4):
        for j in range(6):
            if (i + j) % 2 == 0:
                c = ROJO
            else:
                c = BLANCO
            p.rect(4.4 + i * 0.9, 7 + j * 0.9, 4.4 + (i + 1) * 0.9, 7 + (j + 1) * 0.9, c)
    p.rect(4.4, 12.4, 8.0, 60, (176, 150, 120))  # grava
    return vista(p, camara_x=3.5)


def m_7_12():
    p = Plano()
    autovia(p)
    for y in (2.0, 18.0, 34.0, 50.0):
        cx, w, h, t = 5.25, 1.3, 3.0, 0.2
        p.poli([(cx - w / 2, y), (cx - w / 2 + 0.25, y), (cx, y + h - 0.45), (cx + w / 2 - 0.25, y),
                (cx + w / 2, y), (cx, y + h)], BLANCO)
    return vista(p, camara_x=5.25)


def m_8_1():
    p = Plano()
    via_dos_sentidos(p, centro="continua")
    y, k = 0.5, 0
    for alto, n in ((0.9, 12), (0.75, 12), (0.6, 14)):
        for _ in range(n):
            for xb, s in ((3.5 - 0.15, -1), (0.05, 1)):
                p.poli([(xb, y), (xb, y + 0.75), (xb + s * alto, y + 0.375)], BLANCO)
            y += 1.5
    return vista(p)


def m_8_2():
    p = Plano()
    via_dos_sentidos(p, centro=None, borde=False)
    yz = 24.0
    for x, lado, ancho in ((3.5 - 0.075, -1, 0.15), (0.0, -1, 0.10), (-3.5 + 0.075, 1, 0.15)):
        y = -2.0
        while y < yz - 2.5:   # trazos de 2 m quebrados 0,50 m hacia dentro, separados 0,15 m
            q = [p.p(x, y), p.p(x + lado * 0.5, y + 1.0), p.p(x, y + 2.0)]
            p.d.line(q, fill=BLANCO, width=int(ancho * PXM))
            y += 2.15
        p.linea(x, y0=yz + 4.5, ancho=ancho)
    xs = -3.25
    while xs < 3.3:
        p.rect(xs, yz, xs + 0.5, yz + 4.0, BLANCO)
        xs += 1.0
    return vista(p)


ESCENAS = {
    "M-1.1": m_1_1, "M-1.4": m_1_4, "M-1.9": m_1_9, "M-4.2": m_4_2, "M-4.3b": m_4_3b,
    "M-4.5": m_4_5, "M-5.2d": m_5_2d, "M-5.4b": m_5_4b, "M-5.5": m_5_5, "M-5.8": m_5_8,
    "M-6.3": m_6_3, "M-6.5": m_6_5, "M-6.6": m_6_6, "M-6.20": m_6_20, "M-6.21": m_6_21,
    "M-7.1a": m_7_1a, "M-7.5": m_7_5, "M-7.6": m_7_6, "M-7.7": m_7_7, "M-7.8": m_7_8,
    "M-7.9": m_7_9, "M-7.10": m_7_10, "M-7.11": m_7_11, "M-7.12": m_7_12, "M-8.1": m_8_1,
    "M-8.2": m_8_2,
}


def main():
    import sys
    os.makedirs(SALIDA, exist_ok=True)
    pedir = sys.argv[1:] or list(ESCENAS)
    for cod in pedir:
        ESCENAS[cod]().save(os.path.join(SALIDA, f"{cod}.jpg"), quality=86, optimize=True, progressive=True)
        print("ok", cod)


if __name__ == "__main__":
    main()
