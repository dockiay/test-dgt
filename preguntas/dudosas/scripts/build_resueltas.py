#!/usr/bin/env python3
"""Preguntas nuevas que salen de resolver las afirmaciones dudosas del vídeo
(revision-piloto-video1.json y revision-video1-cap09-38.json).

Uso: python3 -I build_resueltas.py  [carpeta_txt]  -> escribe ../../banco-dudosas-video1.json

Verificación de citas:
- Cita normal: debe aparecer literal (normalizando espacios y guiones de fin de línea) en el
  texto de la norma, extraído con pdftotext en modo normal (<nombre>.txt) o con -layout
  (<nombre>_layout.txt). El modo -layout conserva las filas de las tablas.
- Cita de tabla con varios trozos: los trozos van separados por " […] ". Cada trozo debe
  aparecer literal y en orden, con no más de 40 caracteres entre un trozo y el siguiente en la
  misma extracción (en la práctica, la misma fila de la tabla). La pregunta lleva notas_revision indicando que es una tabla.
- Cita de imagen del catálogo de señales: fuente.tipo_cita = "imagen_catalogo" y fuente.pagina_pdf.
  No se puede comprobar contra texto; se comprobó viendo la página del PDF del BOE.
"""
import json, os, re, sys

TXT = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("FUENTES_TXT", "/mnt/project-files/fuentes/txt")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "banco-dudosas-video1.json")
HOY = "2026-11-24"
VID = "YyTF43W4wOo"

FUENTES = {
    # norma: (fichero base, url, version consolidada consultada, nombre)
    "RGC": ("rgc_full", "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514", "2026-06-26", "Reglamento General de Circulación (RD 1428/2003)"),
    "LSV": ("l", "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722", "2026-06-26", "Ley de Tráfico y Seguridad Vial (RDL 6/2015)"),
    "RGV": ("rgv", "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", "2026-06-26", "Reglamento General de Vehículos (RD 2822/1998)"),
    "RGCOND": ("rgcond", "https://www.boe.es/buscar/act.php?id=BOE-A-2009-9481", "consolidado descargado 2026-11-24", "Reglamento General de Conductores (RD 818/2009)"),
    "MANUAL_DGT": ("manual_dgt", "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf", "2024", "Manual DGT permiso B, lectura fácil"),
    "CP": ("cp", "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444", "2026-04-09", "Código Penal (LO 10/1995)"),
    "ITV": ("itv", "https://www.boe.es/buscar/act.php?id=BOE-A-2017-12841", "2024-09-18", "RD 920/2017, inspección técnica de vehículos"),
    "LRCSCVM": ("lrcscvm", "https://www.boe.es/buscar/act.php?id=BOE-A-2004-18911", "2026-02-18", "Ley de responsabilidad civil y seguro en la circulación (RDL 8/2004)"),
    "OCURSOS": ("ocursos", "https://www.boe.es/buscar/act.php?id=BOE-A-2005-13723", "2024-09-04", "Orden INT/2596/2005, cursos de sensibilización y reeducación vial"),
}

MINUTO_REV = {"rev-0001": "7:50", "rev-0002": "8:10", "rev-0003": "3:00", "rev-0004": "6:40", "rev-0005": "5:40",
              "rev-0006": "13:30", "rev-0007": "15:30", "rev-0008": "20:50", "rev-0009": "19:50", "rev-0010": "28:30",
              "rev-0011": "46:04", "rev-0012": "42:23", "rev-0013": "40:13", "rev-0014": "51:37", "rev-0015": "59:59",
              "rev-0016": "1:04:53", "rev-0017": "1:06:51", "rev-0018": "1:08:29"}

Q = []


def F(norma, art, cita, **extra):
    base, url, ver, _ = FUENTES[norma]
    f = {"norma": norma, "articulo": art, "url": url, "cita": cita, "version_consultada": ver}
    f.update(extra)
    return f


def q(id, materia, tema, sub, enun, a, b, c, ok, expl, fuente, resuelve, minuto=None, notas="", tipo="video_clase"):
    origen = {"tipo": tipo, "ref": VID if tipo == "video_clase" else None, "minuto": minuto, "resuelve": resuelve}
    Q.append({"id": id, "tema": tema, "subtema": sub, "enunciado": enun,
              "opciones": {"a": a, "b": b, "c": c}, "correcta": ok, "explicacion": expl,
              "fuente": fuente, "origen": origen, "imagen": None, "estado": "verificada",
              "verificado_el": HOY, "notas_revision": notas, "materia": materia})


# =====================================================================
# Capítulos 1-8 (revision-piloto-video1.json)
# =====================================================================
q("res-def-0001", 1, "definiciones", "masa_orden_marcha",
  "¿Qué es la masa en orden de marcha de un turismo?",
  "La tara más la masa estándar del conductor, de 75 kg.",
  "La masa mínima para poder circular: el vehículo con un poco de combustible y el conductor.",
  "La masa máxima con la que puede circular cargado.",
  "a", "La masa en orden de marcha es la tara (que ya incluye el depósito de combustible lleno, agua, lubricante, repuestos y herramientas) más 75 kg del conductor.",
  F("RGV", "Anexo IX.1.2", "se considera como masa en orden de marcha el resultado de sumar a la tara la masa estándar del conductor de 75 kg"),
  "rev-0002", MINUTO_REV["rev-0002"],
  "Ojo: el anexo de VMP del mismo RGV usa otra definición de masa en orden de marcha (sin conductor) solo para esos vehículos. Para turismos vale la del anexo IX.")

q("res-def-0002", 1, "definiciones", "furgoneta",
  "¿Qué diferencia a una furgoneta de un camión?",
  "Que la furgoneta tiene la cabina integrada en el resto de la carrocería.",
  "Que la furgoneta puede llevar más de 9 plazas.",
  "Que la furgoneta no puede transportar mercancías.",
  "a", "Los dos transportan mercancías y tienen como máximo 9 plazas incluido el conductor. En la furgoneta la cabina está integrada en la carrocería; en el camión, no.",
  F("RGV", "Anexo II.A", "cuya cabina está integrada en el resto de la carrocería y con un máximo de 9 plazas, incluido el conductor"),
  "rev-0003", MINUTO_REV["rev-0003"])

q("res-def-0003", 1, "definiciones", "derivado_turismo",
  "¿Qué es un vehículo derivado de turismo?",
  "Un turismo con más de nueve plazas.",
  "Un automóvil para servicios o transporte exclusivo de mercancías que conserva la carrocería del turismo del que deriva y tiene una sola fila de asientos.",
  "Una furgoneta con dos filas de asientos.",
  "b", "El derivado de turismo sale de un turismo, conserva su carrocería y solo tiene una fila de asientos; se destina a servicios o a transporte de mercancías.",
  F("RGV", "Anexo II.A", "derivado de un turismo del cual conserva la carrocería y dispone únicamente de una fila de asientos"),
  "rev-0003", MINUTO_REV["rev-0003"])

q("res-def-0004", 1, "definiciones", "vmp",
  "Según el Reglamento General de Vehículos, un patinete eléctrico (vehículo de movilidad personal), ¿es un «vehículo a motor»?",
  "Sí, porque tiene motor eléctrico.",
  "No: aunque tiene motor, el Reglamento lo excluye expresamente de la definición de vehículo a motor.",
  "Solo cuando circula por vías interurbanas.",
  "b", "El Reglamento General de Vehículos excluye de «vehículo a motor» a ciclomotores, tranvías, vehículos para personas de movilidad reducida, bicicletas de pedaleo asistido y vehículos de movilidad personal. El manual de la DGT los incluye entre los «vehículos no considerados a motor».",
  F("RGV", "Anexo II.A", "ciclos de pedales con pedaleo asistido y los vehículos de movilidad personal."),
  "rev-0004", MINUTO_REV["rev-0004"],
  "La cita es el final de la definición de «Vehículo a motor» del anexo II. Comprobado también en el manual DGT (Tema 1, «Vehículos no considerados a motor»).")

q("res-def-0005", 10, "documentacion", "placa_matricula",
  "¿De qué color es el fondo de la placa de matrícula de un ciclomotor?",
  "Blanco.", "Amarillo.", "Rojo.",
  "b", "Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros.",
  F("RGV", "Anexo XVIII.A.d", "d) Ciclomotores y ciclos de motor: El fondo de las placas será retrorreflectante, de color amarillo."),
  "rev-0005", MINUTO_REV["rev-0005"],
  "El vídeo acierta. Matiz: también son amarillas las placas especiales del personal técnico-administrativo de misiones diplomáticas (TA).")

q("res-def-0006", 10, "documentacion", "placa_matricula",
  "¿De qué color es el fondo de la placa de matrícula de un remolque?",
  "Rojo.", "Amarillo.", "Blanco.",
  "a", "Las placas de remolques y semirremolques tienen fondo rojo retrorreflectante y caracteres negros.",
  F("RGV", "Anexo XVIII.A.c", "c) Remolques y semirremolques: El fondo de las placas será retrorreflectante, de color rojo."),
  "rev-0005", None, tipo="normativa_relacionada")

q("res-via-0001", 7, "vias", "peatones_autopista",
  "¿Puede un peatón circular por una autovía?",
  "Sí, por el arcén y de día.",
  "No, salvo en los casos y condiciones que fija el reglamento (por ejemplo, al salir del vehículo por una emergencia).",
  "Sí, si lleva chaleco reflectante.",
  "b", "Los peatones no pueden circular por autopistas ni autovías, salvo en los casos y condiciones del artículo 130 (inmovilización del vehículo por emergencia).",
  F("RGC", "125.1", "Los peatones no podrán circular por autopistas ni autovías, salvo en los casos y condiciones que se determinan en el artículo 130"),
  "rev-0007", MINUTO_REV["rev-0007"])

q("res-via-0002", 7, "vias", "peatones_autopista",
  "En la explanada de una estación de peaje de una autopista, ¿se puede hacer autostop (pedir que te lleven)?",
  "Sí, porque la explanada no es calzada.",
  "Sí, si se hace fuera de los carriles de pago.",
  "No, está prohibido pedir pasaje en cualquier tramo de la autopista, incluidas las explanadas de peaje.",
  "c", "Los peatones no pueden hacer peticiones de pasaje en ningún tramo de autopistas y autovías, incluidas las explanadas de las estaciones de peaje.",
  F("RGC", "125.1", "no podrán hacer peticiones de pasaje en ningún tramo de ellas, incluidas las explanadas de estaciones de peaje"),
  "rev-0007", None, tipo="normativa_relacionada")

q("res-via-0003", 7, "vias", "animales_autopista",
  "¿Puede circular una persona a caballo por el arcén de una autovía?",
  "Sí, siempre que vaya por el arcén.",
  "No, está prohibida la circulación de animales por autopistas y autovías.",
  "Solo de día.",
  "b", "Se prohíbe la circulación de animales por autopistas y autovías; la prohibición incluye también los vehículos de tracción animal.",
  F("RGC", "128", "Se prohíbe la circulación de animales por autopistas o autovías"),
  "rev-0007", MINUTO_REV["rev-0007"])

q("res-arc-0001", 1, "por_donde_circular", "silla_ruedas",
  "Una persona en silla de ruedas circula sola por una carretera sin acera ni zona peatonal practicable. Como norma general, ¿por dónde debe ir?",
  "Por el arcén derecho, como los vehículos.",
  "Por el arcén izquierdo en el sentido de su marcha (o por la calzada si no hay arcén), lo más alejada posible de los vehículos.",
  "Por el centro de la calzada, para que la vean.",
  "b", "Quien va en silla de ruedas al paso es peatón (con o sin motor). Los peatones van por el arcén izquierdo; solo deben ir por la derecha quienes empujan un ciclo o similar, los grupos dirigidos o cuando haya razones de seguridad.",
  F("RGC", "122.1", "los peatones deberán circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable o, en su defecto, por la calzada"),
  "rev-0008", MINUTO_REV["rev-0008"],
  "Pregunta deducida de dos normas: LSV anexo I.4 (silla de ruedas al paso = peatón, ver def-0001) y RGC 122.1. La lista del 122.2 de quién debe ir por la derecha es cerrada y no incluye las sillas de ruedas. Conviene que lo revise una persona.")

q("res-arc-0002", 6, "condiciones_adversas", "nieve",
  "En una autovía con tres carriles por sentido, la circulación está dificultada por la nieve. ¿Qué carriles puede utilizar?",
  "Solo el de la derecha.",
  "El de la derecha y su contiguo, dejando libres los de la izquierda para emergencias y quitanieves.",
  "Cualquiera, con cadenas.",
  "b", "Con nieve está prohibido adelantar y hay que ir por el carril derecho, pudiendo usar el contiguo si hay tres o más carriles por sentido.",
  F("RGC", "32.2", "pudiendo utilizar su contiguo en tramos con tres o más carriles por sentido, dejando expeditos para la circulación de vehículos de emergencia y quitanieves el resto de carriles a la izquierda"),
  "rev-0010", MINUTO_REV["rev-0010"])

q("res-cesp-0001", 1, "carriles_especiales", "vao",
  "Una motocicleta ocupada solo por su conductor, ¿puede circular por un carril VAO?",
  "Sí, siempre: las motos no necesitan cumplir el número mínimo de ocupantes.",
  "Solo si cumple el número mínimo de ocupantes que se haya fijado para ese carril VAO.",
  "No, las motocicletas nunca pueden usar el carril VAO.",
  "b", "Las motos pueden usar el VAO, pero, como los turismos, deben cumplir los requisitos de alta ocupación del tramo. Solo se libran del número mínimo de ocupantes los vehículos con la señal V-15 o la tarjeta de estacionamiento para personas con discapacidad y los autobuses de más de 3.500 kg.",
  F("MANUAL_DGT", "Tema 9, Carril VAO (p. 233)", "Motocicletas, turismos o vehículos mixtos adaptables cuando cumplan los tres requisitos necesarios para automóviles VAO"),
  "rev-0011", MINUTO_REV["rev-0011"],
  "RGC 35.2.a: la exención del número de ocupantes solo es para V-15/tarjeta PMR y autobuses de más de 3.500 kg. El número de ocupantes lo fija la autoridad para cada tramo (35.2.d).")

q("res-cesp-0002", 1, "carriles_especiales", "sentido_contrario",
  "Circula por el carril contiguo a uno habilitado en sentido contrario al habitual y en su sentido solo queda ese carril. ¿A qué velocidad debe circular, salvo señal de otra inferior?",
  "Entre 60 y 80 km/h.",
  "A la velocidad genérica de la vía.",
  "Como máximo a 50 km/h.",
  "a", "Si solo dispone de un carril en su sentido, debe ir entre 60 y 80 km/h y con luz de cruce. Si dispone de más de uno, se aplican los límites normales.",
  F("RGC", "41.1", "si disponen de un solo carril en su sentido de circulación, lo harán a una velocidad máxima de 80 kilómetros por hora y a una mínima de 60"),
  "rev-0013", MINUTO_REV["rev-0013"])

q("res-cesp-0003", 1, "carriles_especiales", "sentido_contrario",
  "Circula por un carril contiguo a uno habilitado en sentido contrario al habitual y en su sentido dispone de dos carriles. ¿A qué velocidad puede circular?",
  "Obligatoriamente entre 60 y 80 km/h.",
  "A las velocidades genéricas de la vía (máximas y mínimas).",
  "Como máximo a 60 km/h.",
  "b", "Cuando en su sentido hay más de un carril, se aplican las velocidades genéricas; el tramo de 60 a 80 km/h solo rige si queda un único carril. En todo caso, con la luz de cruce encendida.",
  F("RGC", "41.1", "si disponen de más de un carril en su sentido de circulación, lo harán a las velocidades que se establecen en los artículos 48.1.a).1.ª y 2.a, 49 y 50"),
  "rev-0013", MINUTO_REV["rev-0013"])

q("res-cesp-0004", 1, "carriles_especiales", "sentido_contrario",
  "Los vehículos que circulan por el carril contiguo a uno habilitado en sentido contrario al habitual, ¿qué alumbrado deben llevar?",
  "Ninguno especial de día.",
  "Al menos la luz de corto alcance o de cruce, de día y de noche.",
  "La luz de largo alcance.",
  "b", "Deben llevar encendida al menos la luz de cruce, tanto de día como de noche, y no pueden invadir el carril habilitado en sentido contrario.",
  F("RGC", "41.1", "llevarán encendida la luz de corto alcance o cruce, al menos, tanto de día como de noche"),
  "rev-0013", MINUTO_REV["rev-0013"])

q("res-dist-0001", 5, "distancias", "distancia_frontal",
  "Según el manual de la DGT, ¿qué separación es aconsejable dejar con el vehículo de delante en condiciones normales?",
  "Un segundo.", "Dos o tres segundos.", "Cinco segundos.",
  "b", "El manual aconseja dos o tres segundos de separación, y al menos un segundo más con lluvia, nieve, niebla, de noche o si el de atrás se acerca demasiado. El reglamento no fija segundos: exige un espacio que permita detenerse sin chocar (RGC 54.1).",
  F("MANUAL_DGT", "Tema 17, Espacio delantero (p. 446)", "Es aconsejable que entre tu vehículo y el de delante haya dos o tres segundos de separación."),
  "rev-0014", MINUTO_REV["rev-0014"], "Es una recomendación del manual de la DGT, no una norma del reglamento.")

q("res-dist-0002", 5, "distancias", "distancia_frontal",
  "Según el manual de la DGT, si llueve o es de noche, ¿cuánto conviene aumentar la separación con el vehículo de delante?",
  "Al menos un segundo más.", "No hace falta aumentarla.", "Hay que duplicarla siempre.",
  "a", "El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado.",
  F("MANUAL_DGT", "Tema 17, Espacio delantero (p. 446)", "hay circunstancias en las que se debe dejar, al menos, un segundo más de espacio."),
  "rev-0014", MINUTO_REV["rev-0014"])

q("res-vel-0001", 1, "velocidad", "vehiculos_especiales",
  "Fuera de poblado, un vehículo especial sin remolque, con señalización de frenado, que por construcción puede superar los 60 km/h en llano y cumple sus normas técnicas, ¿a qué velocidad máxima puede circular?",
  "40 km/h.", "70 km/h.", "25 km/h.",
  "b", "Los vehículos especiales tienen 40 km/h, salvo que puedan superar 60 km/h en llano y cumplan las normas de los vehículos: entonces 70 km/h. Si no tienen señalización de frenado, llevan remolque o son motocultores, 25 km/h.",
  F("RGC", "48.1.c.2º", "salvo cuando puedan desarrollar una velocidad superior a los 60 kilómetros por hora en llano con arreglo a sus características, y cumplan las condiciones que se señalan en las normas reguladoras de los vehículos; en tal caso, la velocidad máxima será de 70 kilómetros por hora"),
  "rev-0017", MINUTO_REV["rev-0017"])

q("res-vel-0002", 1, "velocidad", "ciclos",
  "Fuera de poblado, el límite de velocidad de los ciclos es de 45 km/h. ¿Puede un ciclista superarlo?",
  "No, nunca.",
  "Sí, en los tramos en que las circunstancias de la vía permitan una velocidad superior.",
  "Solo en bajadas, hasta 60 km/h.",
  "b", "El límite de 45 km/h es para ciclos, ciclomotores y cuadriciclos ligeros, pero los conductores de bicicletas pueden superarlo donde las circunstancias de la vía lo permitan.",
  F("RGC", "48.1.e", "los conductores de bicicletas podrán superar dicha velocidad máxima en aquellos tramos en los que las circunstancias de la vía permitan desarrollar una velocidad superior"),
  "rev-0018", MINUTO_REV["rev-0018"])

# =====================================================================
# Capítulos 9-38 (revision-video1-cap09-38.json)
# =====================================================================
q("res-adel-0001", 1, "adelantamiento", "prohibiciones",
  "¿Está permitido adelantar en una intersección con una vía para ciclistas?",
  "Sí, si no hay ciclistas a la vista.",
  "No, está prohibido adelantar en las intersecciones con vías para ciclistas y en sus proximidades.",
  "Solo a vehículos de dos ruedas.",
  "b", "Está prohibido adelantar en los pasos para peatones señalizados, en las intersecciones con vías para ciclistas, en los pasos a nivel y en sus proximidades.",
  F("RGC", "87.1.b", "En los pasos para peatones señalizados como tales, en las intersecciones con vías para ciclistas y en los pasos a nivel, y en sus proximidades."),
  "A-rev-0006", "1:46:17")

q("res-luc-0001", 6, "luces", "tuneles",
  "A media mañana entra en un túnel insuficientemente iluminado, a 80 km/h y sin nadie a quien deslumbrar. ¿Qué alumbrado debe llevar?",
  "El de corto alcance o cruce, porque es un túnel.",
  "El de largo alcance o carretera.",
  "Solo las luces de posición, porque es de día.",
  "b", "En túneles insuficientemente iluminados, a más de 40 km/h, hay que llevar la luz de carretera salvo que haya que usar la de cruce (por ejemplo, para no deslumbrar). En túneles suficientemente iluminados, la de cruce.",
  F("RGC", "100.1", "a cualquier hora del día por túneles, pasos inferiores y tramos de vía afectados por la señal «Túnel» (S-5) insuficientemente iluminados, la llevará encendida"),
  "C-rev-0003", None)

q("res-luc-0002", 14, "vehiculo", "alumbrado_obligatorio",
  "En un turismo, ¿qué luces antiniebla son obligatorias?",
  "Las delanteras y las traseras.",
  "Solo la trasera; la delantera es opcional.",
  "Ninguna; las dos son opcionales.",
  "b", "Todo automóvil debe llevar luz antiniebla trasera. La antiniebla delantera es un dispositivo facultativo.",
  F("RGV", "17.1", "Todo automóvil, con excepción de los que se reseñan en los apartados siguientes, puede llevar: Luz antiniebla delantera."),
  "C-rev-0004", None,
  "La cita (art. 17.1, dispositivos facultativos) muestra que la delantera es opcional. Que la trasera es obligatoria sale del art. 16.1 (dispositivos obligatorios de todo automóvil), que la incluye en su lista: «deberá estar provisto de: [...] Luz antiniebla trasera».")

q("res-veh-0001", 14, "vehiculo", "retrovisores",
  "Una motocicleta cuya velocidad máxima por construcción es superior a 100 km/h, ¿qué retrovisores exteriores debe llevar?",
  "Solo el izquierdo.",
  "El izquierdo y el derecho.",
  "Ninguno es obligatorio.",
  "b", "En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo).",
  F("RGV", "Anexo III.3 (tabla)", "Si la velocidad máxima es mayor de […] 1 oblig. 1 oblig. […] 100 Km/h"),
  "A-rev-0013", "1:32:08",
  "Tabla del anexo III.3, comprobada en el texto extraído con -layout (fila «Motocicletas / Si la velocidad máxima es mayor de 100 Km/h / 1 oblig. / 1 oblig.»).")

q("res-car-0001", 12, "carga", "dimensiones",
  "¿Cuál es la longitud máxima de un camión rígido (vehículo de motor que no es autobús), incluida la carga?",
  "12 metros.", "16,50 metros.", "18,75 metros.",
  "a", "La longitud máxima de los vehículos de motor (excepto autobuses) es 12 m. Los vehículos articulados llegan a 16,50 m y los trenes de carretera a 18,75 m. La carga no puede hacer que se superen estas medidas (RGC 13.1).",
  F("RGV", "Anexo IX.3.1, tabla 3", "Vehículos de motor excepto autobuses (1). 12,00"),
  "C-rev-0005", None, "Fila de la tabla 3, citada desde el texto extraído con -layout.")

q("res-car-0002", 12, "carga", "dimensiones",
  "Como norma general, ¿cuál es la altura máxima de un vehículo, incluida la carga?",
  "3,50 metros.", "4,00 metros.", "4,50 metros.",
  "b", "La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m.",
  F("RGV", "Anexo IX.3.1, tabla 3", "Altura máxima de los vehículos incluida la carga, como norma general. 4,00"),
  "C-rev-0005", None, "Fila de la tabla 3, citada desde el texto extraído con -layout.")

q("res-itv-0001", 10, "documentacion", "itv",
  "Un turismo particular, ¿con qué frecuencia debe pasar la ITV?",
  "Exento hasta los 4 años; cada dos años hasta los 10; y después, cada año.",
  "Cada año desde la matriculación.",
  "Exento hasta los 2 años; después, cada año.",
  "a", "Turismos (M1): exentos hasta 4 años, bienal de 4 a 10 años y anual a partir de 10. No se aplica a taxis, ambulancias, autoescuelas ni transporte escolar, que tienen plazos más cortos.",
  F("ITV", "6.1 (tabla)", "M1: vehículos de motor concebidos y fabricados principalmente para el transporte de personas y de […] De más de 4 años: Bienal. […] Hasta 4 años: Exento. […] sus equipajes, con un máximo de ocho plazas, excluida la del conductor. […] De más de 10 años: Anual."),
  "C-rev-0006", None, "Tabla del art. 6.1. Filas comprobadas en el texto extraído con -layout.")

q("res-itv-0002", 10, "documentacion", "itv",
  "Una furgoneta de 3.500 kg de MMA o menos (categoría N1), ¿con qué frecuencia debe pasar la ITV?",
  "Exenta hasta 4 años y después cada dos años.",
  "Exenta hasta 2 años; cada dos años de 2 a 6; cada año de 6 a 10; y cada seis meses a partir de 10.",
  "Cada año desde la matriculación.",
  "b", "N1 (mercancías hasta 3,5 t): exenta hasta 2 años, bienal de 2 a 6, anual de 6 a 10 y semestral a partir de 10 años.",
  F("ITV", "6.1 (tabla)", "De 2 a 6 años: Bienal. […] N1: Vehículos de motor concebidos y fabricados principalmente para el transporte de mercancías y […] Hasta 2 años: Exento. […] De 6 a 10 años: Anual. […] cuya masa máxima no sea superior a 3,5 toneladas. […] De más de 10 años: Semestral."),
  "C-rev-0006", None, "Tabla del art. 6.1. Filas comprobadas en el texto extraído con -layout.")

q("res-itv-0003", 10, "documentacion", "itv",
  "Una motocicleta, ¿con qué frecuencia debe pasar la ITV?",
  "Exenta hasta 4 años y después cada dos años.",
  "Cada año desde la matriculación.",
  "Nunca, las motos no pasan ITV.",
  "a", "Motocicletas (resto de categoría L): exentas hasta 4 años y después bienal. Los ciclomotores: exentos hasta 3 años y después bienal.",
  F("ITV", "6.1 (tabla)", "Resto L: Vehículos de motor de dos o tres ruedas, gemelas o no, y cuadriciclos, destinados a circular […] Hasta 4 años: Exento. […] De más de 4 años: Bienal."),
  "C-rev-0006", None, "Tabla del art. 6.1. Filas comprobadas en el texto extraído con -layout.")

q("res-itv-0004", 10, "documentacion", "itv",
  "Su turismo saca una ITV desfavorable (defectos graves). ¿Puede circular con él?",
  "Sí, con normalidad durante dos meses.",
  "Solo para llevarlo al taller y volver a la ITV, en un plazo no superior a dos meses.",
  "No, debe trasladarse en grúa.",
  "b", "Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses.",
  F("ITV", "11.2", "Los defectos calificados como graves son defectos que inhabilitan al vehículo para circular por las vías públicas excepto para su traslado al taller"),
  "C-rev-0007", None)

q("res-itv-0005", 10, "documentacion", "itv",
  "Si la ITV es negativa (defectos muy graves), ¿cómo se traslada el vehículo desde la estación?",
  "Conduciéndolo directamente al taller.",
  "Por medios ajenos al propio vehículo (por ejemplo, en grúa).",
  "Conduciéndolo, pero solo de día.",
  "b", "Los defectos muy graves inhabilitan al vehículo para circular: el traslado se hace por medios ajenos al vehículo. Una vez reparado, debe volver a la ITV en un plazo no superior a dos meses.",
  F("ITV", "11.3", "el traslado del vehículo desde la estación hasta su destino se realizará por medios ajenos al propio vehículo"),
  "C-rev-0007", None)

q("res-seg-0001", 10, "documentacion", "seguro_obligatorio",
  "El seguro obligatorio del vehículo causante de un accidente, ¿cubre las lesiones de su propio conductor?",
  "Sí, siempre.",
  "No, el seguro obligatorio no cubre las lesiones ni el fallecimiento del conductor del vehículo causante.",
  "Solo si llevaba puesto el cinturón.",
  "b", "El seguro obligatorio cubre los daños a terceros (personas y bienes), pero no las lesiones o el fallecimiento del conductor causante ni los daños de su propio vehículo.",
  F("LRCSCVM", "5.1", "no alcanzará a los daños y perjuicios ocasionados por las lesiones o fallecimiento del conductor del vehículo causante del accidente"),
  "C-rev-0009", None)

q("res-seg-0002", 10, "documentacion", "seguro_obligatorio",
  "¿Cubre el seguro obligatorio los daños sufridos por el propio vehículo asegurado?",
  "Sí.", "No.", "Solo si el accidente fue culpa del otro conductor.",
  "b", "La cobertura del seguro obligatorio no alcanza a los daños en el propio vehículo asegurado ni en las cosas transportadas en él. Si el otro conductor tiene la culpa, paga el seguro del otro, no el propio.",
  F("LRCSCVM", "5.2", "tampoco alcanzará a los daños en los bienes sufridos por el vehículo asegurado"),
  "C-rev-0009", None)

q("res-seg-0003", 10, "documentacion", "seguro_obligatorio",
  "Un remolque de 600 kg de masa máxima autorizada, ¿necesita su propio seguro obligatorio?",
  "No, los remolques de hasta 750 kg de MMA están exceptuados.",
  "Sí, todos los remolques.",
  "Solo si circula de noche.",
  "a", "Están exceptuados de la obligación de asegurarse los remolques y semirremolques que no excedan de 750 kg de MMA.",
  F("LRCSCVM", "2.8.b", "Los remolques y semirremolques que no excedan de 750 kilogramos de masa máxima autorizada."),
  "C-rev-0010", None)

q("res-veh-0002", 14, "accesorios_obligatorios", "extintor",
  "Un turismo arrastra un remolque ligero. ¿Debe llevar extintor?",
  "No, solo los camiones y autobuses.",
  "Sí, porque turismo y remolque forman un conjunto de vehículos, y los conjuntos no especiales deben llevar extintor.",
  "Solo si el remolque supera 750 kg.",
  "b", "Un vehículo de motor enganchado a un remolque es un tren de carretera, es decir, un conjunto de vehículos. Los conjuntos de vehículos no especiales deben llevar un extintor homologado, además del V-16 y el chaleco.",
  F("RGV", "Anexo XII.2", "y los conjuntos de vehículos no especiales, deberán llevar, además de la dotación que se establece en el apartado 1 a) y b), un equipo homologado de extinción de incendios"),
  "E-rev-0013", "5:51:40",
  "Deducción con dos citas del RGV: anexo XII.2 y anexo II («Tren de carretera: Automóvil constituido por un vehículo de motor enganchado a un remolque»; «Conjunto de vehículos: Un tren de carretera, o un vehículo articulado»). La obligación es del conjunto, no del remolque suelto.")

q("res-perm-0001", 10, "permiso_conduccion", "edades",
  "¿A qué edad mínima se puede obtener el permiso de la clase A (motocicletas sin límite de potencia)?",
  "18 años.", "20 años.", "21 años.",
  "b", "El permiso A se obtiene con 20 años cumplidos (y dos años de antigüedad en el A2). Hasta los 21 no autoriza a conducir triciclos de más de 15 kW.",
  F("RGCOND", "4.2 (tabla)", "A Motocicletas y triciclos de motor. 20"),
  "C-rev-0013", None, "Fila de la tabla del art. 4.2, citada desde el texto extraído con -layout.")

q("res-perm-0002", 10, "permiso_conduccion", "edades",
  "¿A qué edad mínima se puede obtener el permiso AM (ciclomotores)?",
  "14 años.", "15 años.", "16 años.",
  "b", "El permiso AM se obtiene con 15 años cumplidos. El A1, con 16; el A2 y el B, con 18; el A, con 20.",
  F("RGCOND", "4.2 (tabla)", "Ciclomotores de dos o tres ruedas y cuatriciclos ligeros. […] Podrá estar limitado a la conducción de ciclomotores de tres ruedas y […] AM 15"),
  "C-rev-0013", None, "Fila de la tabla del art. 4.2 comprobada en el texto extraído con -layout.")

q("res-perm-0003", 10, "permiso_conduccion", "a2",
  "¿Qué limita el permiso A2?",
  "La cilindrada de la moto, como máximo 500 cm³.",
  "La potencia de la moto: como máximo 35 kW y 0,2 kW/kg, y que no derive de un vehículo con más del doble de potencia.",
  "Nada: autoriza cualquier motocicleta.",
  "b", "El A2 se define por la potencia (máximo 35 kW y relación potencia/peso de 0,2 kW/kg), no por la cilindrada.",
  F("RGCOND", "4.2 (tabla)", "Motocicletas con una potencia máxima de 35 kW y una relación potencia/peso"),
  "C-rev-0015", None)

q("res-pun-0001", 10, "puntos", "cursos",
  "¿Cuánto dura el curso de recuperación parcial de puntos?",
  "10 horas.", "12 horas.", "20 horas.",
  "b", "El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial.",
  F("OCURSOS", "Cuarto", "Estos cursos tendrán una duración de doce horas."),
  "C-rev-0017", None)

q("res-pun-0002", 10, "puntos", "cursos",
  "¿Cuánto dura el curso para recuperar el permiso tras perder todos los puntos?",
  "12 horas.", "20 horas.", "24 horas.",
  "c", "El curso de recuperación del permiso o licencia dura 24 horas; el de recuperación parcial, 12.",
  F("OCURSOS", "Quinto", "Estos cursos tendrán una duración de veinticuatro horas"),
  "C-rev-0017", None)

q("res-del-0001", 1, "infracciones_sanciones", "delitos",
  "Circular a 140 km/h en una vía urbana limitada a 50 km/h (90 km/h por encima del límite), ¿qué es?",
  "Una infracción grave.",
  "Una infracción muy grave, pero no delito.",
  "Un delito contra la seguridad vial.",
  "c", "Es delito superar en más de 60 km/h el límite en vía urbana o en más de 80 km/h en vía interurbana.",
  F("CP", "379.1", "a velocidad superior en sesenta kilómetros por hora en vía urbana o en ochenta kilómetros por hora en vía interurbana a la permitida reglamentariamente"),
  "D-rev-0001", "4:51:05")

q("res-del-0002", 4, "alcohol_drogas", "delitos",
  "¿A partir de qué tasa de alcohol en aire espirado conducir es, en todo caso, delito?",
  "Más de 0,25 mg/l.", "Más de 0,50 mg/l.", "Más de 0,60 mg/l.",
  "c", "Siempre es delito conducir con más de 0,60 mg/l en aire espirado o más de 1,2 g/l en sangre. Con tasas menores también puede ser delito si se conduce bajo la influencia del alcohol.",
  F("CP", "379.2", "con una tasa de alcohol en aire espirado superior a 0,60 miligramos por litro"),
  "D-rev-0002", "4:52:29")

q("res-del-0003", 4, "alcohol_drogas", "delitos",
  "Un agente le pide a usted, que conduce, que se someta a la prueba de alcoholemia y usted se niega. ¿Qué comete?",
  "Nada, si no ha bebido.",
  "Un delito.",
  "Una infracción leve.",
  "b", "El conductor que, requerido por un agente, se niega a someterse a las pruebas de alcohol o drogas comete un delito castigado con prisión de seis meses a un año y privación del permiso de uno a cuatro años.",
  F("CP", "383", "El conductor que, requerido por un agente de la autoridad, se negare a someterse a las pruebas legalmente establecidas para la comprobación de las tasas de alcoholemia"),
  "D-rev-0003", "4:53:03",
  "La negativa de otros usuarios obligados (por ejemplo, un peatón implicado en un accidente) es infracción administrativa muy grave (LSV 77.d), no delito, porque el art. 383 CP habla del conductor.")

q("res-del-0004", 1, "infracciones_sanciones", "delitos",
  "Conducir un turismo sin haber obtenido nunca el permiso de conducción, ¿qué es?",
  "Una infracción grave.",
  "Una infracción muy grave.",
  "Un delito.",
  "c", "Es delito conducir sin haber obtenido nunca permiso, tras perder todos los puntos, o tras ser privado del permiso por un juez.",
  F("CP", "384", "al que condujere un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia de conducción"),
  "D-rev-0005", "4:53:18",
  "Matiz para Denisse: conducir con el permiso suspendido por la Administración (no por un juez) es infracción administrativa con pérdida de 4 puntos (LSV anexo II.17), no delito.")

q("res-del-0005", 1, "infracciones_sanciones", "delitos",
  "Conducir cuando el permiso ha perdido su vigencia por haber perdido todos los puntos, ¿qué es?",
  "Un delito.",
  "Una infracción leve.",
  "Nada, si se está haciendo el curso de recuperación.",
  "a", "Conducir con el permiso sin vigencia por pérdida total de los puntos es delito.",
  F("CP", "384", "en los casos de pérdida de vigencia del permiso o licencia por pérdida total de los puntos asignados legalmente"),
  "D-rev-0005", "4:53:18")

q("res-del-0006", 1, "infracciones_sanciones", "delitos",
  "Colocar en la vía obstáculos imprevisibles o derramar sustancias deslizantes, originando un grave riesgo para la circulación, ¿qué es?",
  "Un delito.",
  "Solo una infracción leve.",
  "Una infracción grave sin pérdida de puntos.",
  "a", "Es delito originar un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización.",
  F("CP", "385", "Colocando en la vía obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o mutando, sustrayendo o anulando la señalización"),
  "D-rev-0006", "4:53:37")

q("res-del-0007", 11, "accidentes", "omision_socorro",
  "No socorrer a una persona herida en un accidente, desamparada y en peligro grave, pudiendo hacerlo sin riesgo propio ni de terceros, ¿qué es?",
  "Una infracción leve.",
  "Un delito de omisión del deber de socorro.",
  "No es nada si no se ha causado el accidente.",
  "b", "Es delito no socorrer a quien está desamparado y en peligro manifiesto y grave, si se puede hacer sin riesgo. Si no se puede ayudar, hay que pedir auxilio con urgencia.",
  F("CP", "195.1", "El que no socorriere a una persona que se halle desamparada y en peligro manifiesto y grave, cuando pudiere hacerlo sin riesgo propio ni de terceros"),
  "E-rev-0014", "5:34:39")

q("res-alc-0001", 4, "alcohol_drogas", "tasas",
  "Una persona adulta que conduce un patinete eléctrico (vehículo de movilidad personal), con carácter general, ¿qué tasa máxima de alcohol en aire espirado puede tener?",
  "0 mg/l.", "0,15 mg/l.", "0,25 mg/l.",
  "c", "El VMP es un vehículo y la tasa general para conductores de vehículos es 0,25 mg/l en aire espirado (0,5 g/l en sangre). Los conductores menores de edad no pueden tener ninguna tasa (0).",
  F("RGC", "20", "los conductores de vehículos ni los conductores de bicicletas con una tasa de alcohol en sangre superior a 0,5 gramos por litro, o de alcohol en aire espirado superior a 0,25 miligramos por litro"),
  "D-rev-0010", "4:47:56",
  "El RGV (anexo II) define el VMP como vehículo. La tasa reducida de noveles va ligada a la obtención de un permiso o licencia, que el VMP no exige. Conviene que lo revise una persona.")

q("res-fat-0001", 4, "factores_riesgo", "somnolencia",
  "Al volante empieza a notar los primeros síntomas de sueño. Según el manual de la DGT, ¿qué debe hacer?",
  "Abrir la ventanilla y seguir hasta el destino.",
  "Parar en un lugar seguro y dormir 20 o 30 minutos.",
  "Tomar un café y seguir conduciendo.",
  "b", "El manual de la DGT dice que, con los primeros síntomas, hay que parar en un lugar seguro y dormir 20 o 30 minutos, y descansar 20 o 30 minutos cada dos horas o 200 km.",
  F("MANUAL_DGT", "Tema 3, fatiga y somnolencia (p. 51)", "cuando sientas los primeros síntomas y duerme 20 o 30 minutos."),
  "D-rev-0017", "4:36:07")

q("res-seg-0004", 14, "conduccion_segura", "volante",
  "Según el manual de la DGT, al girar el volante, ¿se deben cruzar las manos?",
  "Sí, para girar más rápido.",
  "No: el volante se coge sin cruzar las manos al girarlo.",
  "Solo en las curvas cerradas.",
  "b", "El manual de la DGT indica coger el volante con las dos manos, por la parte exterior, con firmeza pero sin mucha fuerza y sin cruzar las manos al girar.",
  F("MANUAL_DGT", "Tema 6, cómo coger el volante (p. 123)", "Sin cruzar las manos al girar el volante."),
  "D-rev-0019", "4:55:22")

q("res-acc-0001", 2, "accidentes", "estadistica",
  "Según el manual de la DGT, ¿cuándo hay más accidentes?",
  "Los martes y miércoles por la mañana.",
  "Los fines de semana y los días de fiesta, en especial de madrugada.",
  "Los lunes laborables a mediodía.",
  "b", "El manual de la DGT indica que hay más accidentes los fines de semana y los días de fiesta, en especial en las horas de la madrugada.",
  F("MANUAL_DGT", "Tema 16 (p. 391)", "Hay más accidentes los fines de semana y los días de fiesta."),
  "D-rev-0022", "4:25:28")

q("res-ref-0001", 8, "usuarios_vulnerables", "ciclistas",
  "Un ciclista circula de noche por una vía interurbana. ¿A qué distancia mínima debe ser visible el elemento luminoso o reflectante que debe llevar?",
  "50 metros.", "100 metros.", "150 metros.",
  "c", "Entre el ocaso y la salida del sol o con poca visibilidad, en vía interurbana, el ciclista debe llevar al menos un elemento luminoso o reflectante visible a 150 m. El chaleco del conductor de un turismo no tiene esa exigencia de distancia: debe ser de alta visibilidad certificado.",
  F("RGC", "118.2", "deberán hacer uso al menos de un elemento luminoso o reflectante conforme a la normativa de los equipos de protección individual, que sea visible a una distancia mínima de 150 metros, si circulan en vía interurbana"),
  "E-rev-0011", "5:50:58")


q("res-sen-0001", 1, "senales_verticales", "identificacion_carreteras",
  "¿De qué color es el fondo del cartel que identifica una carretera autonómica de segundo nivel (por ejemplo, ZA-320)?",
  "Verde.", "Marrón.", "Amarillo.",
  "b", "En el catálogo vigente de señales: itinerario europeo (E) en verde; autopistas y autovías en azul; carreteras del Estado en rojo; autonómicas de primer nivel en naranja, de segundo nivel en marrón y de tercer nivel en amarillo.",
  F("RGC", "Anexo I, Catálogo de señales verticales, tomo I, 3.13 (S-440)",
    "S-440 Carretera de segundo nivel perteneciente a una red diferente de la del Estado.",
    tipo_cita="imagen_catalogo", pagina_pdf=179),
  "B2-rev-0014", "3:12:12",
  "El color solo se ve en el dibujo de la señal (página 179 del PDF consolidado del RGC). Comprobado mirando la página. Conviene añadir la imagen de la S-440 cuando esté recortada.")

q("res-sen-0002", 1, "senales_verticales", "identificacion_carreteras",
  "¿De qué color es el fondo del cartel que identifica una carretera de la red del Estado que no es autopista ni autovía (por ejemplo, N-401)?",
  "Rojo.", "Azul.", "Naranja.",
  "a", "Las carreteras convencionales o multicarril de la red del Estado se identifican con fondo rojo (S-420). Las autopistas y autovías, con fondo azul (S-410).",
  F("RGC", "Anexo I, Catálogo de señales verticales, tomo I, 3.13 (S-420)",
    "S-420 Carretera convencional o carretera multicarril de la red del Estado",
    tipo_cita="imagen_catalogo", pagina_pdf=178),
  "B2-rev-0014", "3:12:12",
  "El color solo se ve en el dibujo de la señal (página 178 del PDF consolidado del RGC). Comprobado mirando la página.")

q("res-sen-0003", 1, "senales_verticales", "balizas_paso_nivel",
  "Antes de un paso a nivel, una baliza rectangular con tres franjas rojas en el lado derecho indica que el paso a nivel está a...",
  "300 metros.", "200 metros.", "100 metros.",
  "b", "La baliza de tres franjas (P-9a) está a 200 m; la de dos franjas (P-9b) a 150 m, y la de una franja (P-9c) a 100 m. Las de 300, 200 y 100 m son las de aproximación a una salida de autopista o autovía.",
  F("RGC", "Anexo I, Catálogo de señales verticales, tomo I, 3.1 (P-9a)",
    "Indica la existencia de un paso a nivel, un puente móvil o un muelle a una distancia de 200 m. Esta baliza se sitúa en el lado derecho de la calzada y va siempre acompañada de la señal P-5, P-7, P-8 o P-27.",
    tipo_cita="imagen_catalogo", pagina_pdf=90),
  "B1-rev-0007", None,
  "Texto leído en la ficha P-9a (página 90 del PDF consolidado del RGC). Ojo: el manual de la DGT de 2024 da 300/200/100 m para el paso a nivel; manda el catálogo del BOE.")

q("res-sen-0004", 1, "senales_verticales", "limitacion_velocidad",
  "Una señal de velocidad máxima está en el mismo poste que una señal de peligro. ¿Hasta dónde obliga la limitación?",
  "Hasta la próxima intersección.", "Hasta que termine el peligro señalado.", "Hasta que aparezca una señal de fin de limitación, aunque haya terminado el peligro.",
  "b", "Si la R-301 está en el mismo poste o panel que una señal de peligro, la limitación termina cuando termina el peligro. Esto lo dice la ficha de la velocidad máxima; la de adelantamiento prohibido no tiene esta regla.",
  F("RGC", "Anexo I, Catálogo de señales verticales, tomo I, 3.5 (R-301)",
    "salvo que esté colocada en el mismo poste que una señal de advertencia de peligro o en el mismo panel que esta, en cuyo caso la prohibición finaliza cuando termine el peligro señalado.",
    tipo_cita="imagen_catalogo", pagina_pdf=109),
  "B1-rev-0011", None,
  "Texto leído en la ficha R-301 (página 109 del PDF consolidado del RGC).")

q("res-sen-0005", 1, "senales_verticales", "zona_estancia_juego",
  "En una zona de estancia y juego, ¿cuál es la velocidad máxima de los vehículos?",
  "10 km/h.", "20 km/h.", "30 km/h.",
  "a", "En la zona de estancia y juego (S-28) la velocidad máxima es 10 km/h, los peatones tienen prioridad y los juegos y deportes están autorizados. No hay que confundirla con la zona de coexistencia, que es de 20 km/h.",
  F("RGC", "Anexo I, Catálogo de señales verticales, tomo I, 3.8 (S-28)",
    "la velocidad máxima de los vehículos está fijada en 10 kilómetros por hora y los conductores deben conceder prioridad a los peatones",
    tipo_cita="imagen_catalogo", pagina_pdf=134),
  "B2-rev-0007", "2:55:36",
  "Texto leído en la ficha S-28 (página 134 del PDF consolidado del RGC).")

# =====================================================================
# Verificación
# =====================================================================
def norm(s):
    s = s.replace("­", "").replace("‐", "-").replace("‑", "-")
    s = re.sub(r"-\s*\n\s*", "", s)
    s = s.replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()


_cache = {}
def textos(norma):
    if norma not in _cache:
        base = FUENTES[norma][0]
        out = []
        for suf in ("", "_layout"):
            p = os.path.join(TXT, base + suf + ".txt")
            if os.path.exists(p):
                out.append(norm(open(p, encoding="utf-8", errors="replace").read()))
        _cache[norma] = out
    return _cache[norma]


def cita_ok(norma, cita):
    trozos = [norm(t) for t in cita.split("[…]") if norm(t)]
    for t in textos(norma):
        if len(trozos) == 1:
            if trozos[0] in t:
                return True
            continue
        start = 0
        while True:
            p0 = t.find(trozos[0], start)
            if p0 < 0:
                break
            pos, ok = p0 + len(trozos[0]), True
            for tr in trozos[1:]:
                p = t.find(tr, pos)
                if p < 0 or p - pos > 40:
                    ok = False
                    break
                pos = p + len(tr)
            if ok:
                return True
            start = p0 + 1
    return False


errs, ids = [], set()
for x in Q:
    i = x["id"]
    if i in ids:
        errs.append(f"{i}: id duplicado")
    ids.add(i)
    if sorted(x["opciones"]) != ["a", "b", "c"] or x["correcta"] not in x["opciones"]:
        errs.append(f"{i}: opciones/correcta")
    if not 1 <= x["materia"] <= 16:
        errs.append(f"{i}: materia")
    f = x["fuente"]
    if f.get("tipo_cita") == "imagen_catalogo":
        if not f.get("pagina_pdf"):
            errs.append(f"{i}: falta pagina_pdf")
        continue
    if len(norm(f["cita"])) < 15:
        errs.append(f"{i}: cita corta")
    elif not cita_ok(f["norma"], f["cita"]):
        errs.append(f"{i}: CITA NO ENCONTRADA en {f['norma']}: {f['cita'][:100]}")

print("preguntas:", len(Q))
if errs:
    print("\n".join(errs))
    print("FALLOS:", len(errs))
    sys.exit(1)

doc = {"version": 1,
       "descripcion": "Preguntas nuevas que salen de resolver las afirmaciones dudosas del vídeo YyTF43W4wOo. Cada pregunta indica en origen.resuelve qué afirmación de revisión resuelve.",
       "normativa_consultada": {k: {"url": v[1], "nombre": v[3], "ultima_actualizacion": v[2]} for k, v in FUENTES.items()},
       "preguntas": Q}
json.dump(doc, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("OK, escrito", os.path.abspath(OUT))
