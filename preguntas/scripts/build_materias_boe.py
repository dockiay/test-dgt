#!/usr/bin/env python3
"""Banco de preguntas escritas directamente desde la norma para las materias del anexo V.B.1
con poca o ninguna cobertura en los vídeos: 3 (actitudes), 6 (noche y meteorología),
9 (riesgos según el vehículo y la visibilidad), 13 (al abandonar el vehículo) y los delitos
contra la seguridad vial del Código Penal (materia 1).

Uso: python3 build_materias_boe.py <carpeta_txt> <salida.json>
<carpeta_txt> contiene los .txt de pdftotext -layout de las fuentes y el extracto del Código Penal.
Comprueba que cada cita aparece literalmente en su texto (quitando cabeceras de página del BOE
y normalizando espacios) y que los ids no chocan con otros bancos.
"""
import glob, json, os, re, sys

RGC_URL = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514"
LSV_URL = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722"
CP_URL = "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444"
MAN_URL = ("https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/"
           "permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf")
VERS = {"RGC": "2026-06-26", "LSV": "2026-06-26", "CP": "2026-04-09", "MANUAL_DGT": "2024-10"}
HOY = "2026-11-24"


def F(norma, art, cita):
    if norma == "MANUAL_DGT":
        url = MAN_URL
    else:
        base = {"RGC": RGC_URL, "LSV": LSV_URL, "CP": CP_URL}[norma]
        a = re.match(r"(\d+)", art)
        url = base + ("#a" + a.group(1) if a else "")
    return {"norma": norma, "articulo": art, "url": url, "cita": cita, "version_consultada": VERS[norma]}


Q = []


def q(id, materia, tema, sub, enun, a, b, c, ok, expl, fuente, notas=""):
    Q.append({"id": id, "tema": tema, "subtema": sub, "enunciado": enun,
              "opciones": {"a": a, "b": b, "c": c}, "correcta": ok,
              "explicacion": expl, "fuente": fuente,
              "origen": {"tipo": "normativa_relacionada", "ref": None, "minuto": None},
              "imagen": None, "estado": "verificada", "verificado_el": HOY,
              "notas_revision": notas, "materia": materia, "imagen_requerida": None})


# =====================================================================
# MATERIA 13. Precauciones necesarias al abandonar el vehículo
# =====================================================================
T13 = "abandonar_vehiculo"
q("bm13-0001", 13, T13, "motor_y_arranque",
  "Para un turismo y tiene que dejar su puesto de conductor. ¿Qué debe hacer con el motor?",
  "Pararlo y desconectar el sistema de arranque.",
  "Puede dejarlo en marcha si va a volver en menos de dos minutos.",
  "Dejarlo en marcha, siempre que deje accionado el freno de estacionamiento.",
  "a", "Si el conductor de un vehículo a motor tiene que dejar su puesto, debe parar el motor y desconectar el sistema de arranque.",
  F("RGC", "92.3.a", "Parar el motor y desconectar el sistema de arranque"))
q("bm13-0002", 13, T13, "uso_sin_autorizacion",
  "Si, además de dejar su puesto, se aleja del vehículo, ¿qué obligación añadida tiene?",
  "Ninguna, basta con parar el motor.",
  "Adoptar las precauciones necesarias para impedir su uso sin autorización.",
  "Encender la luz de emergencia mientras esté fuera.",
  "b", "Cuando el conductor se aleja del vehículo debe adoptar las precauciones necesarias para impedir que otra persona lo use sin autorización (por ejemplo, cerrarlo y llevarse la llave).",
  F("RGC", "92.3.a", "si se alejara del vehículo, adoptar las precauciones necesarias para impedir su uso sin autorización"))
q("bm13-0003", 13, T13, "cambio_automatico",
  "Estaciona un turismo con cambio automático. Además del freno de estacionamiento, ¿qué debe dejar seleccionado?",
  "La posición de estacionamiento.",
  "El punto muerto, para no forzar la transmisión.",
  "La posición de marcha adelante.",
  "a", "El reglamento pide dejar la primera o la marcha atrás en los vehículos con caja de cambios manual, «o, en su caso, la posición de estacionamiento» (la P de los cambios automáticos).",
  F("RGC", "92.3.c", "y la marcha hacia atrás, en descendente, o, en su caso, la posición de estacionamiento"))
q("bm13-0004", 13, T13, "calzos",
  "El conductor de un camión que calzó su vehículo para estacionar en una pendiente va a reanudar la marcha. ¿Qué debe hacer con los calzos?",
  "Puede dejarlos en la vía, porque no son un obstáculo.",
  "Retirarlos de la vía.",
  "Dejarlos junto al bordillo para que los use el siguiente vehículo.",
  "b", "Los calzos, una vez utilizados, deben retirarse de la vía al reanudar la marcha.",
  F("RGC", "92.3.d", "Los calzos, una vez utilizados, deberán ser retirados de las vías al reanudar la marcha."))
q("bm13-0005", 13, T13, "puertas",
  "Antes de abrir la puerta para bajar del vehículo, ¿qué debe hacer?",
  "Asegurarse de que no supone peligro ni entorpecimiento para otros usuarios, especialmente ciclistas.",
  "Nada, si el vehículo está correctamente estacionado.",
  "Encender la luz de emergencia; así los demás deben esperar.",
  "a", "Se prohíbe abrir las puertas o apearse sin haberse cerciorado antes de que no implica peligro o entorpecimiento para otros usuarios, especialmente para los ciclistas.",
  F("RGC", "114.1", "abrirlas o apearse de aquél sin haberse cerciorado previamente de que ello no implica peligro o entorpecimiento para otros usuarios, especialmente cuando se refiere a conductores de bicicletas"))
q("bm13-0006", 13, T13, "puertas",
  "Un pasajero quiere abrir la puerta cuando el vehículo aún avanza muy despacio, a punto de detenerse. ¿Está permitido?",
  "Sí, si la velocidad es inferior a 10 km/h.",
  "Sí, si mira antes por el retrovisor.",
  "No, se prohíbe abrir las puertas antes de la completa inmovilización del vehículo.",
  "c", "Está prohibido abrir las puertas del vehículo antes de su completa inmovilización.",
  F("RGC", "114.1", "Se prohíbe llevar abiertas las puertas del vehículo, abrirlas antes de su completa inmovilización"))
q("bm13-0007", 13, T13, "lado_salida",
  "Como norma general, ¿por qué lado se debe entrar y salir del vehículo?",
  "Por el lado del conductor.",
  "Por el lado más próximo al borde de la vía, y solo con el vehículo parado.",
  "Por cualquier lado, siempre que el vehículo esté parado.",
  "b", "Como norma general se entra y se sale por el lado más próximo al borde de la vía y solo cuando el vehículo está parado.",
  F("RGC", "114.2", "se entrará y saldrá del vehículo por el lado más próximo al borde de la vía y sólo cuando aquél se halle parado"))
q("bm13-0008", 13, T13, "apagado_motor",
  "Aunque no vaya a abandonar su puesto, ¿en cuál de estos casos debe parar el motor?",
  "Durante la carga de combustible.",
  "Al detenerse en un semáforo en rojo.",
  "Al detenerse en un paso para peatones.",
  "a", "Aun cuando el conductor no abandone su puesto, debe parar el motor cuando el vehículo esté detenido dentro de un túnel o en un lugar cerrado y durante la carga de combustible.",
  F("RGC", "115.1", "deberá parar el motor siempre que el vehículo se encuentre detenido en el interior de un túnel o en lugar cerrado y durante la carga de combustible"))
q("bm13-0009", 13, T13, "apagado_motor",
  "Debe permanecer detenido dentro de un túnel más de dos minutos. Al parar el motor, ¿qué alumbrado debe conservar encendido?",
  "Ninguno, para no gastar batería.",
  "El de largo alcance o carretera.",
  "El de posición.",
  "c", "Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición.",
  F("RGC", "115.2", "deberá interrumpir el funcionamiento del motor hasta que pueda proseguir la marcha, conservando encendido el alumbrado de posición"))
q("bm13-0010", 13, T13, "repostaje",
  "Para cargar combustible en una gasolinera, ¿qué debe estar apagado?",
  "Solo el motor.",
  "El motor, las luces, los sistemas eléctricos como la radio y los teléfonos móviles.",
  "El motor y el aire acondicionado; la radio puede seguir encendida.",
  "b", "No se puede facilitar combustible si no están parados el motor y apagadas las luces, los sistemas eléctricos como la radio y los dispositivos que emiten radiación electromagnética, como los móviles. Si no hay empleados, el conductor debe cumplir lo mismo.",
  F("RGC", "115.3", "si no está parado el motor y apagadas las luces de los vehículos, los sistemas eléctricos como la radio y los dispositivos emisores de radiación electromagnética como los teléfonos móviles"))
q("bm13-0011", 13, T13, "repostaje",
  "En una gasolinera sin empleados, ¿quién debe asegurarse de que el motor, las luces, la radio y los móviles estén apagados al repostar?",
  "Nadie, porque esa obligación solo afecta a los empleados.",
  "El conductor o la persona que vaya a cargar el combustible.",
  "El titular de la gasolinera, de forma remota.",
  "b", "En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos.",
  F("RGC", "115.4", "el conductor del vehículo o, en su caso, la persona que vaya a cargar el combustible en el vehículo deberá cumplir los mismos requisitos establecidos en el apartado anterior"))
q("bm13-0012", 13, T13, "tunel_emergencia",
  "Por una emergencia, su vehículo queda inmovilizado dentro de un túnel. ¿Qué debe hacer con el motor y las luces?",
  "Apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición.",
  "Dejar el motor en marcha y encender la luz de largo alcance.",
  "Apagar el motor y todas las luces para no deslumbrar.",
  "a", "Si un conductor queda inmovilizado en un túnel por una emergencia, debe apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición.",
  F("RGC", "97.3.a", "Apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición."))
q("bm13-0013", 13, T13, "tunel_emergencia",
  "Su vehículo queda inmovilizado por una emergencia dentro de un túnel. ¿Qué deben hacer usted y sus pasajeros?",
  "Permanecer dentro del vehículo con el cinturón abrochado hasta que llegue la ayuda.",
  "Abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si hay zonas excluidas a la circulación.",
  "Salir y caminar por la calzada en sentido contrario a la circulación para avisar a los demás.",
  "b", "Tanto el conductor como los demás ocupantes deben abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si existen zonas excluidas a la circulación de vehículos.",
  F("RGC", "97.3.e", "Tanto el conductor como los demás ocupantes abandonarán el vehículo, dirigiéndose rápidamente al refugio o salida más próximos"))
q("bm13-0014", 13, T13, "tunel_incendio",
  "Su vehículo se incendia dentro de un túnel. Tras acercarlo a la derecha y apagar el motor, ¿qué debe hacer con la llave y las puertas antes de abandonarlo?",
  "Llevarse la llave y cerrar las puertas para evitar robos.",
  "Dejar la llave puesta y las puertas abiertas.",
  "Llevarse la llave y dejar las puertas abiertas.",
  "b", "En caso de incendio en un túnel, el conductor apaga el motor y deja la llave puesta y las puertas abiertas.",
  F("RGC", "97.3", "Apagará el motor y dejará la llave puesta y las puertas abiertas."))
q("bm13-0015", 13, T13, "tunel_incendio",
  "Hay un incendio dentro de un túnel y debe abandonar su vehículo. ¿Hacia dónde debe dirigirse?",
  "Hacia el refugio o salida más próximos, en sentido contrario al del fuego.",
  "Hacia el fuego, para ayudar a apagarlo con el extintor.",
  "Hacia la salida por la que entró, caminando por el centro de la calzada.",
  "a", "En caso de incendio, el conductor y los ocupantes abandonan el vehículo y se dirigen rápidamente al refugio o salida más próximos, en sentido contrario al del fuego.",
  F("RGC", "97.3", "abandonarán el vehículo dirigiéndose rápidamente al refugio o salida más próximos, en sentido contrario al del fuego"))
q("bm13-0016", 13, T13, "tunel_atasco",
  "Queda detenido dentro de un túnel por un atasco (por necesidades de la circulación). ¿Deben abandonar el vehículo usted y sus pasajeros?",
  "Sí, siempre que el vehículo esté detenido en un túnel.",
  "Solo los pasajeros; el conductor debe quedarse.",
  "No, no deben abandonar el vehículo.",
  "c", "Si un vehículo queda inmovilizado en un túnel por necesidades de la circulación, el conductor y los pasajeros no deben abandonarlo; deben conectar temporalmente la señal de emergencia, mantener las luces de posición y apagar el motor.",
  F("RGC", "97.3", "el conductor y los pasajeros no deben abandonar el vehículo"))
q("bm13-0017", 13, T13, "tunel_atasco",
  "Queda detenido por un atasco dentro de un túnel. ¿Dónde debe detenerse respecto al vehículo que le precede?",
  "Lo más cerca posible, para ocupar menos espacio.",
  "Lo más lejos posible del vehículo que le precede.",
  "A un metro exacto, para poder salir si es necesario.",
  "b", "En un túnel, si queda inmovilizado por necesidades de la circulación, debe detenerse lo más lejos posible del vehículo que le precede.",
  F("RGC", "97.3", "Deberá detenerse lo más lejos posible del vehículo que le precede."))
q("bm13-0018", 13, T13, "averia_retirar",
  "Su vehículo averiado obstaculiza la calzada. Después de señalizarlo, ¿qué debe hacer?",
  "Esperar dentro del vehículo hasta que llegue la grúa, sin moverlo.",
  "Adoptar las medidas necesarias para que sea retirado cuanto antes y, si es factible, sacarlo de la calzada y situarlo cumpliendo las normas de estacionamiento.",
  "Dejarlo donde está; la señalización basta.",
  "b", "Si por accidente o avería el vehículo o su carga obstaculizan la calzada, tras señalizar hay que retirarlo en el menor tiempo posible y, siempre que sea factible, sacarlo de la calzada y estacionarlo correctamente.",
  F("RGC", "130.1", "deberán sacarlo de la calzada y situarlo cumpliendo las normas de estacionamiento siempre que sea factible"))
q("bm13-0019", 13, T13, "averia_continuar",
  "Tras una avería, su vehículo puede seguir circulando pero necesita un servicio de auxilio. ¿Qué debe hacer?",
  "Detenerse inmediatamente en el carril izquierdo.",
  "Abandonar cuanto antes los carriles de circulación y dirigirse a la primera salida disponible usando el arcén derecho.",
  "Detenerse en el carril por el que circula y encender la luz de emergencia.",
  "b", "Si el vehículo puede continuar pero necesita auxilio, debe abandonar lo antes posible los carriles de circulación y dirigirse hacia la primera salida usando el arcén derecho; si no es posible, detenerse en el arcén derecho o donde cause menor obstáculo.",
  F("RGC", "130.2", "deberán abandonar lo antes posible los carriles de circulación y dirigirse hacia la primera salida disponible utilizando para ello el arcén derecho"))

# =====================================================================
# MATERIA 3. Vigilancia y actitudes con respecto a los demás usuarios
# =====================================================================
T3 = "actitudes"
q("bm3-0001", 3, T3, "comportamiento_general",
  "¿Cómo deben comportarse todos los usuarios de la vía?",
  "De forma que no entorpezcan indebidamente la circulación ni causen peligro, perjuicios o molestias innecesarias a las personas, o daños a los bienes.",
  "Basta con que respeten las señales; las molestias a los demás no están reguladas.",
  "Esta obligación solo afecta a los conductores, no a los peatones.",
  "a", "La norma general obliga a todos los usuarios de la vía (no solo a los conductores) a no entorpecer indebidamente ni causar peligro, perjuicios o molestias innecesarias, ni daños a los bienes.",
  F("RGC", "2", "Los usuarios de la vía están obligados a comportarse de forma que no entorpezcan indebidamente la circulación ni causen peligro, perjuicios o molestias innecesarias a las personas, o daños a los bienes"))
q("bm3-0002", 3, T3, "diligencia",
  "Se debe conducir con la diligencia y precaución necesarias para evitar…",
  "solo los daños a otras personas.",
  "solo los daños materiales a otros vehículos.",
  "todo daño, propio o ajeno.",
  "c", "Hay que conducir con la diligencia y precaución necesarias para evitar todo daño, propio o ajeno, sin poner en peligro al conductor, a los ocupantes ni al resto de usuarios.",
  F("RGC", "3.1", "Se deberá conducir con la diligencia y precaución necesarias para evitar todo daño, propio o ajeno"))
q("bm3-0003", 3, T3, "negligente_temeraria",
  "La conducción negligente, ¿qué tipo de infracción es?",
  "Leve.",
  "Grave.",
  "Muy grave.",
  "b", "La conducción negligente es infracción grave; la temeraria, muy grave (también en la Ley de Tráfico, arts. 76.m y 77.e).",
  F("RGC", "3.2", "Las conductas referidas a la conducción negligente tendrán la consideración de infracciones graves"))
q("bm3-0004", 3, T3, "negligente_temeraria",
  "La conducción temeraria, cuando no es delito, ¿qué tipo de infracción es?",
  "Muy grave.",
  "Grave.",
  "Leve, si no hay accidente.",
  "a", "La conducción temeraria tiene la consideración de infracción muy grave (Ley de Tráfico, art. 77.e). Si además pone en concreto peligro la vida o la integridad de las personas, es delito (Código Penal, art. 380).",
  F("RGC", "3.2", "las referidas a la conducción temeraria tendrán la consideración de infracciones muy graves"))
q("bm3-0005", 3, T3, "usuarios_vulnerables",
  "Al aproximarse a otros usuarios de la vía, ¿con quiénes debe extremar especialmente las precauciones?",
  "Con los vehículos de mayor tamaño.",
  "Con los niños, los ancianos, los invidentes y otras personas manifiestamente impedidas.",
  "Con los conductores noveles que llevan la «L».",
  "b", "El reglamento obliga a adoptar las precauciones necesarias al aproximarse a otros usuarios, especialmente niños, ancianos, invidentes u otras personas manifiestamente impedidas.",
  F("RGC", "17.1", "especialmente cuando se trate de niños, ancianos, invidentes u otras personas manifiestamente impedidas"))
q("bm3-0006", 3, T3, "prever_peatones",
  "¿Hay que moderar la velocidad solo cuando ya hay peatones en la calzada?",
  "Sí; si no hay peatones en la calzada se puede mantener la velocidad.",
  "No, también cuando pueda preverse racionalmente su irrupción en ella.",
  "No, solo hay que moderarla cerca de los pasos para peatones.",
  "b", "Se circula a velocidad moderada, e incluso se detiene el vehículo, cuando hay peatones en la vía o pueda preverse racionalmente su irrupción en ella, principalmente si se trata de niños, ancianos o personas con discapacidad.",
  F("RGC", "46.1.a", "Cuando haya peatones en la parte de la vía que se esté utilizando o pueda preverse racionalmente su irrupción en ella"))
q("bm3-0007", 3, T3, "autobus_escolar",
  "Se aproxima a un autobús de transporte escolar detenido en una parada. ¿Qué debe hacer?",
  "Mantener la velocidad, porque el autobús está detenido.",
  "Tocar el claxon para avisar a los niños de que se acerca.",
  "Circular a velocidad moderada y, si fuera preciso, detenerse.",
  "c", "Al aproximarse a un autobús en situación de parada, principalmente si es de transporte escolar, hay que circular a velocidad moderada y detenerse si fuera preciso.",
  F("RGC", "46.1.e", "Al aproximarse a un autobús en situación de parada, principalmente si se trata de un autobús de transporte escolar."))
q("bm3-0008", 3, T3, "advertir_maniobras",
  "¿Están obligados los conductores a advertir a los demás usuarios de las maniobras que van a efectuar?",
  "Sí, siempre.",
  "Solo si hay otros vehículos detrás.",
  "Solo fuera de poblado.",
  "a", "Los conductores están obligados a advertir al resto de usuarios de las maniobras que vayan a efectuar; como norma general, con la señalización luminosa o, en su defecto, con el brazo.",
  F("RGC", "108.1", "Los conductores están obligados a advertir al resto de los usuarios de la vía acerca de las maniobras que vayan a efectuar con sus vehículos"))
q("bm3-0009", 3, T3, "advertir_frenado",
  "Va a frenar de modo considerable por las circunstancias del tráfico. ¿Debe advertirlo?",
  "No, solo se advierten los desplazamientos laterales.",
  "Sí, siempre que sea posible, con el empleo reiterado de las luces de frenado o con el brazo.",
  "Sí, con el intermitente derecho.",
  "b", "La intención de inmovilizar el vehículo o de frenar de modo considerable, aunque la impongan las circunstancias del tráfico, debe advertirse, siempre que sea posible, con el empleo reiterado de las luces de frenado o moviendo el brazo de arriba abajo.",
  F("RGC", "109.2.c", "mediante el empleo reiterado de las luces de frenado o bien moviendo el brazo alternativamente de arriba abajo con movimientos cortos y rápidos"))
q("bm3-0010", 3, T3, "claxon",
  "¿Está permitido usar el claxon de forma inmotivada o exagerada?",
  "Sí, en vías fuera de poblado.",
  "Sí, para mostrar el enfado con otro conductor.",
  "No, está prohibido.",
  "c", "Las señales acústicas solo se usan excepcionalmente o cuando lo prevea una norma, de sonido no estridente, y queda prohibido su uso inmotivado o exagerado.",
  F("RGC", "110.1", "queda prohibido su uso inmotivado o exagerado"))
q("bm3-0011", 3, T3, "obstaculos",
  "Quien ha creado un obstáculo o peligro en la vía, ¿qué debe hacer?",
  "Hacerlo desaparecer lo antes posible y, mientras tanto, adoptar las medidas para que los demás lo adviertan.",
  "Avisar a las autoridades y marcharse.",
  "Nada, si el obstáculo es pequeño.",
  "a", "Quien crea un obstáculo o peligro en la vía debe hacerlo desaparecer lo antes posible y, mientras tanto, tomar las medidas necesarias para que lo adviertan los demás usuarios y no se dificulte la circulación.",
  F("RGC", "5.1", "deberán hacerlo desaparecer lo antes posible, y adoptarán entre tanto las medidas necesarias para que pueda ser advertido por los demás usuarios"))
q("bm3-0012", 3, T3, "arrojar_objetos",
  "¿Puede arrojar una colilla encendida por la ventanilla?",
  "Sí, si la vía está asfaltada.",
  "No, se prohíbe arrojar a la vía o sus inmediaciones cualquier objeto que pueda producir incendios.",
  "Sí, salvo en zonas forestales señalizadas.",
  "b", "Se prohíbe arrojar a la vía o a sus inmediaciones cualquier objeto que pueda dar lugar a incendios o poner en peligro la seguridad vial. Es infracción grave.",
  F("RGC", "6.1", "Se prohíbe arrojar a la vía o en sus inmediaciones cualquier objeto que pueda dar lugar a la producción de incendios"))
q("bm3-0013", 3, T3, "anticipacion",
  "En la conducción preventiva, ¿en qué consiste la «anticipación»?",
  "En prever los movimientos y reacciones de los demás conductores para poder reaccionar a tiempo.",
  "En adelantar a los vehículos lentos lo antes posible.",
  "En salir de viaje con tiempo de sobra.",
  "a", "La conducción preventiva se basa en visión, anticipación y espacio. Anticiparse es prever los movimientos y reacciones de los demás para reaccionar a tiempo.",
  F("MANUAL_DGT", "Tema 17, Conducción preventiva (p. 441)", "Prever los movimientos y reacciones de los demás conductores para poder reaccionar a tiempo."))
q("bm3-0014", 3, T3, "vehiculos_aparcados",
  "Circula junto a vehículos aparcados con personas dentro. ¿Qué precaución recomienda la DGT?",
  "Ninguna especial; quienes salen deben mirar antes.",
  "Tocar el claxon para que no abran la puerta.",
  "Conducir con más cuidado, porque alguna de esas personas puede bajarse sin mirar.",
  "c", "La DGT recomienda conducir con más cuidado cerca de vehículos aparcados con personas dentro, porque alguna puede bajarse sin mirar.",
  F("MANUAL_DGT", "Tema 16, Los peatones (p. 397)", "Alguna de estas personas puede bajarse del vehículo sin mirar."))
q("bm3-0015", 3, T3, "ciclistas_claxon",
  "Para evitar accidentes con ciclistas, ¿qué recomienda la DGT sobre el claxon?",
  "Tocarlo siempre al acercarse por detrás.",
  "No tocarlo cerca de ellos para no asustarles.",
  "Tocarlo solo dentro de poblado.",
  "b", "La DGT aconseja no tocar el claxon cerca de los ciclistas para no asustarles.",
  F("MANUAL_DGT", "Tema 16, Bicicletas (p. 409)", "No tocar el claxon o bocina cerca de ciclistas para no asustarles."))
q("bm3-0016", 3, T3, "ciclistas_adelantar",
  "Vienen ciclistas en sentido contrario. ¿Qué recomienda la DGT sobre adelantar a otros vehículos en ese momento?",
  "Adelantar rápido para terminar cuanto antes.",
  "Adelantar tocando el claxon para avisarles.",
  "No adelantar.",
  "c", "Entre las medidas para evitar atropellos a ciclistas, la DGT indica no adelantar a otros vehículos si vienen ciclistas en sentido contrario.",
  F("MANUAL_DGT", "Tema 16, Bicicletas (p. 408)", "No adelantar a otros vehículos si vienen ciclistas en sentido contrario."))
q("bm3-0017", 3, T3, "dos_ruedas",
  "Circula cerca de una motocicleta. ¿Dónde recomienda la DGT situarse?",
  "Delante o detrás de ella, no a su lado.",
  "A su lado, para que el motorista le vea.",
  "Lo más cerca posible por detrás.",
  "a", "La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad.",
  F("MANUAL_DGT", "Tema 16, Motocicletas y ciclomotores (p. 411)", "No quedarse al lado de un vehículo de dos ruedas. Circular por delante de él o por detrás."))
q("bm3-0018", 3, T3, "detencion_atasco",
  "Se detiene en un atasco o en un semáforo. ¿Qué distancia recomienda la DGT dejar como mínimo con el vehículo de delante?",
  "Unos 50 centímetros.",
  "Dos o tres metros.",
  "Diez metros.",
  "b", "La DGT recomienda dejar al menos dos o tres metros al detenerse: así se puede avisar si el de delante echa marcha atrás, rodearlo si se queda parado y no golpearlo si a usted le golpean por detrás.",
  F("MANUAL_DGT", "Tema 17, Espacio al detener el vehículo (p. 448)", "debes mantener una distancia de, al menos, dos o tres metros con el vehículo de delante."))
q("bm3-0019", 3, T3, "detencion_atasco",
  "Es el último vehículo de una fila detenida en un atasco. Según la DGT, ¿qué puede hacer para evitar que le alcancen por detrás?",
  "Mantener el freno pisado, encender las luces de emergencia y vigilar por el retrovisor a los que vienen detrás.",
  "Bajarse del vehículo para avisar a los que llegan.",
  "Pegarse al vehículo de delante para dejar más espacio detrás.",
  "a", "El último de la fila puede dejar cinco o seis metros con el de delante, mantener el freno pisado y encender las luces de emergencia para que se le vea mejor, y vigilar por el retrovisor.",
  F("MANUAL_DGT", "Tema 17, Espacio al detener el vehículo (p. 448)", "Mantener el freno pisado y encender las luces de emergencia en un atasco para que se le vea mejor."))

# =====================================================================
# MATERIA 9. Riesgos según el tipo de vehículo y la visibilidad del conductor
# =====================================================================
T9 = "riesgos_vehiculo_visibilidad"
q("bm9-0001", 9, T9, "atencion_vision",
  "¿Qué está obligado a mantener el conductor para garantizar su seguridad y la de los demás?",
  "Su propia libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción.",
  "Solo la atención permanente; el campo de visión depende del vehículo.",
  "Las manos en el volante; la posición del resto de ocupantes no le afecta.",
  "a", "El conductor debe mantener su libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción, y cuidar de la posición de los pasajeros y de los objetos o animales transportados.",
  F("RGC", "18.1", "El conductor de un vehículo está obligado a mantener su propia libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción"))
q("bm9-0002", 9, T9, "laminas",
  "¿Cuándo se permite circular con láminas adhesivas o cortinillas contra el sol en las ventanillas posteriores?",
  "Nunca.",
  "Cuando el vehículo lleve dos espejos retrovisores exteriores que cumplan las especificaciones técnicas.",
  "Solo de día.",
  "b", "Las láminas o cortinillas en las ventanillas posteriores solo se permiten si el vehículo lleva dos espejos retrovisores exteriores reglamentarios.",
  F("RGC", "19.1", "Únicamente se permitirá circular con láminas adhesivas o cortinillas contra el sol en las ventanillas posteriores cuando el vehículo lleve dos espejos retrovisores exteriores"))
q("bm9-0003", 9, T9, "vidrios_tintados",
  "¿Se pueden colocar vidrios tintados o coloreados no homologados?",
  "Sí, si solo afectan a las ventanillas traseras.",
  "Sí, si el vehículo tiene dos retrovisores exteriores.",
  "No, está prohibido en todo caso.",
  "c", "Queda prohibida, en todo caso, la colocación de vidrios tintados o coloreados no homologados.",
  F("RGC", "19.2", "Queda prohibida, en todo caso, la colocación de vidrios tintados o coloreados no homologados."))
q("bm9-0004", 9, T9, "visibilidad_cristales",
  "La superficie acristalada del vehículo, ¿cómo debe permitir la visión del conductor?",
  "De forma diáfana sobre toda la vía, sin interferencias de láminas o adhesivos.",
  "Basta con que el parabrisas esté limpio en la zona del conductor.",
  "Puede tener adhesivos siempre que no tapen más de la mitad de la luna.",
  "a", "La superficie acristalada debe permitir en todo caso la visibilidad diáfana del conductor sobre toda la vía, sin interferencias de láminas o adhesivos (salvo las excepciones reglamentarias).",
  F("RGC", "19.1", "La superficie acristalada del vehículo deberá permitir, en todo caso, la visibilidad diáfana del conductor sobre toda la vía por la que circule, sin interferencias de láminas o adhesivos."))
q("bm9-0005", 9, T9, "campo_vision",
  "Además de respetar los límites, ¿cómo debe adecuar la velocidad?",
  "De manera que siempre pueda detener el vehículo dentro de los límites de su campo de visión y ante cualquier obstáculo.",
  "Basta con no superar el límite señalizado.",
  "De manera que no tarde más de lo previsto en llegar a su destino.",
  "a", "Además de los límites, hay que adecuar la velocidad a las circunstancias (propias, de la vía, del vehículo, meteorológicas…) para poder detenerse siempre dentro del campo de visión y ante cualquier obstáculo.",
  F("RGC", "45", "de manera que siempre pueda detenerlo dentro de los límites de su campo de visión y ante cualquier obstáculo que pueda presentarse"))
q("bm9-0006", 9, T9, "vehiculos_pesados",
  "Conduce un vehículo pesado y le siguen otros que no pueden adelantarle con facilidad ni sin peligro por la anchura de la calzada. ¿Qué debe hacer?",
  "Mantener su velocidad; son los demás quienes deben esperar.",
  "Aminorar la marcha o apartarse cuanto antes al arcén, si es practicable, para dejarles paso.",
  "Acelerar para no entorpecer.",
  "b", "Los conductores de vehículos pesados, de grandes dimensiones u obligados a un límite específico de velocidad deben aminorar la marcha o apartarse al arcén practicable para dejar paso cuando no puedan ser adelantados con facilidad y sin peligro.",
  F("RGC", "86.3", "deberán bien aminorar la marcha o apartarse cuanto antes al arcén, si resulta practicable, para dejar paso a los que le siguen"))
q("bm9-0007", 9, T9, "moto_remolque",
  "Una motocicleta quiere arrastrar un remolque. ¿Qué masa máxima puede tener el remolque?",
  "Hasta el 50 % de la masa en vacío de la motocicleta.",
  "Hasta el 100 % de la masa en vacío de la motocicleta.",
  "Hasta 750 kg, sea cual sea la motocicleta.",
  "a", "Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar un remolque que no supere el 50 % de la masa en vacío del vehículo tractor, de día, sin transportar personas y con la velocidad reducida un 10 %.",
  F("RGC", "12.3", "siempre que no superen el 50 por ciento de la masa en vacío del vehículo tractor"))
q("bm9-0008", 9, T9, "moto_remolque",
  "Una motocicleta con remolque circula por una carretera. ¿Cómo afecta el remolque a su velocidad máxima?",
  "No le afecta.",
  "Debe reducirla un 10 % respecto a la velocidad genérica de la motocicleta.",
  "No puede superar los 45 km/h.",
  "b", "Con remolque, la velocidad queda reducida en un 10 % respecto a la genérica para esos vehículos.",
  F("RGC", "12.3.b", "Que la velocidad a que se circule en estas condiciones quede reducida en un 10 por ciento respecto a las velocidades genéricas"))
q("bm9-0009", 9, T9, "carga_visibilidad",
  "La carga que transporta tapa parcialmente las luces traseras y la placa de matrícula. ¿Es correcto?",
  "Sí, si la carga está bien sujeta.",
  "Sí, si circula de día.",
  "No, la carga no puede ocultar los dispositivos de alumbrado o señalización ni las placas o distintivos obligatorios.",
  "c", "La carga debe ir dispuesta de forma que no oculte los dispositivos de alumbrado o de señalización luminosa, las placas o distintivos obligatorios ni las advertencias manuales del conductor.",
  F("RGC", "14.1.d", "Ocultar los dispositivos de alumbrado o de señalización luminosa, las placas o distintivos obligatorios y las advertencias manuales de sus conductores."))
q("bm9-0010", 9, T9, "carga_polvo",
  "Transporta en un camión arena que puede producir polvo o caer. ¿Cómo debe llevarla?",
  "Cubriéndola total y eficazmente.",
  "Sin cubrir, si no supera la altura de la caja.",
  "Mojándola antes de salir.",
  "a", "El transporte de materias que produzcan polvo o puedan caer se efectúa siempre cubriéndolas total y eficazmente.",
  F("RGC", "14.2", "El transporte de materias que produzcan polvo o puedan caer se efectuará siempre cubriéndolas total y eficazmente."))
q("bm9-0011", 9, T9, "alumbrado_averiado",
  "De noche se le avería en ruta el alumbrado y solo puede circular con uno de menor intensidad. ¿Qué debe hacer?",
  "Encender la luz de emergencia y mantener la velocidad.",
  "Reducir la velocidad hasta la que le permita detener el vehículo dentro de la zona iluminada.",
  "Circular a un máximo de 40 km/h, sea cual sea la zona iluminada.",
  "b", "Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada.",
  F("RGC", "107", "se deberá reducir la velocidad hasta la que permita la detención del vehículo dentro de la zona iluminada"))
q("bm9-0012", 9, T9, "angulo_muerto",
  "Según la DGT, ¿qué debe evitar respecto al ángulo muerto de los retrovisores de otros vehículos?",
  "Nada; el ángulo muerto solo afecta al conductor del otro vehículo.",
  "Estar mucho tiempo en él, en especial al lado o detrás de un vehículo muy grande.",
  "Circular por delante del otro vehículo.",
  "b", "Para anticiparse a los riesgos, la DGT aconseja no permanecer mucho tiempo en el ángulo muerto de otro vehículo, sobre todo si es muy grande.",
  F("MANUAL_DGT", "Tema 17, Anticipación (p. 445)", "No estar mucho tiempo en el ángulo muerto de los retrovisores de otro vehículo. En especial si circulas al lado o detrás de un vehículo muy grande."))
q("bm9-0013", 9, T9, "viento",
  "Según la DGT, ¿a qué vehículos afecta más el viento fuerte?",
  "A los turismos de gran cilindrada.",
  "A los vehículos de dos ruedas y a los que llevan un remolque.",
  "A todos por igual.",
  "b", "El viento, sobre todo lateral, puede hacer perder el control; afecta más a los vehículos de dos ruedas y a los que llevan remolque.",
  F("MANUAL_DGT", "Tema 14, Conducir con mucho viento (p. 361)", "El viento afecta más a los vehículos de dos ruedas y a los que llevan un remolque."))
q("bm9-0014", 9, T9, "carga_luces",
  "Lleva mucho peso en la parte de atrás del vehículo. ¿Qué riesgo señala la DGT respecto a las luces?",
  "Que la luz de cruce quede muy alta y deslumbre.",
  "Que las luces de freno dejen de funcionar.",
  "Ninguno; el peso no influye en las luces.",
  "a", "Si hay demasiado peso atrás, la luz de cruce puede quedar muy alta y deslumbrar. Por eso hay que repartir bien la carga y mantener las luces bien reguladas.",
  F("MANUAL_DGT", "Tema 14, Deslumbramientos (p. 348)", "La luz de cruce puede quedar muy alta y deslumbrar porque hay demasiado peso en la parte de atrás del vehículo."))
q("bm9-0015", 9, T9, "hielo_cristales",
  "Hay hielo en los cristales de su vehículo. ¿Qué debe hacer antes de empezar a conducir?",
  "Rascar el hielo de todos los cristales, sin rayarlos, y limpiar los retrovisores.",
  "Basta con limpiar la parte del parabrisas que queda delante del conductor.",
  "Arrancar y dejar que se derrita mientras circula.",
  "a", "Antes de conducir hay que rascar el hielo de todos los cristales, sin rayarlos, y limpiar los espejos retrovisores.",
  F("MANUAL_DGT", "Tema 14, Conducir con hielo (p. 359)", "Rascar el hielo de todos los cristales, sin rayarlos."))

# =====================================================================
# MATERIA 6. Estado de la calzada, meteorología, noche
# =====================================================================
T6 = "meteorologia_noche"
q("bm6-0001", 6, T6, "moderar_velocidad",
  "Circula por una calzada con charcos y hay peatones en la acera. ¿Qué debe hacer?",
  "Mantener la velocidad; mojar a los peatones no es una infracción.",
  "Circular a velocidad moderada para no salpicarles.",
  "Pasar rápido para no estar mucho tiempo junto a ellos.",
  "b", "Hay que circular a velocidad moderada al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios.",
  F("RGC", "46.1.g", "Al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios de la vía."))
q("bm6-0002", 6, T6, "moderar_velocidad",
  "¿En cuál de estas situaciones obliga el reglamento a circular a velocidad moderada?",
  "En caso de niebla densa, lluvia intensa, nevada o nubes de polvo o humo.",
  "Solo cuando una señal lo indique.",
  "Solo de noche.",
  "a", "Entre los casos en que se circula a velocidad moderada y, si es preciso, se detiene el vehículo, están la niebla densa, la lluvia intensa, la nevada y las nubes de polvo o humo.",
  F("RGC", "46.1.k", "En los casos de niebla densa, lluvia intensa, nevada o nubes de polvo o humo."))
q("bm6-0003", 6, T6, "visibilidad_nula",
  "Se acerca a una intersección debidamente señalizada y la visibilidad de la vía es prácticamente nula. ¿Qué velocidad no debe superar?",
  "30 km/h.",
  "50 km/h.",
  "70 km/h.",
  "b", "Si las intersecciones están debidamente señalizadas y la visibilidad de la vía es prácticamente nula, la velocidad no deberá exceder de 50 km/h.",
  F("RGC", "46.1.h", "la velocidad de los vehículos no deberá exceder de 50 kilómetros por hora"))
q("bm6-0004", 6, T6, "visibilidad_reducida",
  "Al aproximarse a un lugar de reducida visibilidad o a un estrechamiento, ¿qué debe hacer?",
  "Circular a velocidad moderada y, si fuera preciso, detenerse.",
  "Tocar el claxon y mantener la velocidad.",
  "Encender la luz antiniebla trasera.",
  "a", "Al aproximarse a pasos a nivel, glorietas e intersecciones sin prioridad, lugares de reducida visibilidad o estrechamientos se circula a velocidad moderada.",
  F("RGC", "46.1.h", "a lugares de reducida visibilidad o a estrechamientos"))
q("bm6-0005", 6, T6, "alumbrado_dia",
  "Es de día y una nube de humo disminuye sensiblemente la visibilidad. ¿Es obligatorio llevar el alumbrado encendido?",
  "No, el alumbrado solo es obligatorio de noche.",
  "Sí, es obligatorio en condiciones meteorológicas o ambientales que disminuyan sensiblemente la visibilidad.",
  "Solo en autopistas y autovías.",
  "b", "Es obligatorio usar el alumbrado cuando las condiciones meteorológicas o ambientales disminuyan sensiblemente la visibilidad: niebla, lluvia intensa, nevada, nubes de humo o de polvo…",
  F("RGC", "106.1", "También será obligatorio utilizar el alumbrado cuando existan condiciones meteorológicas o ambientales que disminuyan sensiblemente la visibilidad, como en caso de niebla, lluvia intensa, nevada, nubes de humo o de polvo"))
q("bm6-0006", 6, T6, "noche_peligro",
  "Según la DGT, ¿por qué es más peligroso conducir de noche?",
  "Porque hay más vehículos en la carretera.",
  "Porque la carretera está menos iluminada, se ven peor las distancias, personas y vehículos, y otros pueden deslumbrarle.",
  "Porque los límites de velocidad son más altos.",
  "b", "De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento.",
  F("MANUAL_DGT", "Tema 14, Conducir por la noche (p. 347)", "Se ven peor las distancias, las personas, los objetos y los vehículos."))
q("bm6-0007", 6, T6, "adaptacion_ojos",
  "De noche pasa de una zona bien iluminada a otra mal iluminada. ¿Por qué debe extremar la atención?",
  "Porque a los ojos les cuesta unos segundos acostumbrarse al cambio de luz.",
  "Porque cambia el límite de velocidad.",
  "Porque debe apagar todas las luces.",
  "a", "Al pasar de una zona iluminada a otra oscura, los ojos tardan unos segundos en adaptarse al cambio de luz.",
  F("MANUAL_DGT", "Tema 14, Conducir por la noche (p. 347)", "A los ojos les cuesta unos segundos acostumbrarse al cambio de luz."))
q("bm6-0008", 6, T6, "deslumbramiento",
  "Le deslumbra un vehículo que viene de frente y reduce la velocidad. ¿Por dónde recomienda guiarse la DGT?",
  "Por las luces del vehículo que le deslumbra.",
  "Por la línea del borde derecho.",
  "Por la línea central, cambiando de carril si hace falta.",
  "b", "Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho.",
  F("MANUAL_DGT", "Tema 14, Deslumbramientos (p. 349)", "Puedes guiarte por la línea del borde derecho."))
q("bm6-0009", 6, T6, "gafas_sol_noche",
  "¿Es aconsejable usar gafas de sol por la noche para evitar los deslumbramientos?",
  "Sí, siempre.",
  "Sí, pero solo en autopista.",
  "No, porque se ve mucho peor la carretera.",
  "c", "La DGT desaconseja las gafas oscuras o de sol de noche: pueden reducir el deslumbramiento, pero se ve mucho peor la carretera.",
  F("MANUAL_DGT", "Tema 14, Deslumbramientos (p. 349)", "No uses gafas oscuras o de sol por la noche."))
q("bm6-0010", 6, T6, "niebla_precauciones",
  "Circula con niebla. ¿Cuál de estas precauciones recomienda la DGT?",
  "Mantener el vehículo bien ventilado para que no se empañen los cristales.",
  "Adelantar cuanto antes a los vehículos lentos.",
  "Circular pegado al vehículo de delante para guiarse por sus luces.",
  "a", "Con niebla: ventilar el vehículo para que no se empañen los cristales, encender las luces de cruce y antiniebla, ir despacio, mantener mucha distancia, evitar adelantar si no es necesario y extremar la precaución en los cruces.",
  F("MANUAL_DGT", "Tema 14, Conducir con niebla (p. 360)", "Mantén el vehículo bien ventilado para que no se empañen los cristales."))
q("bm6-0011", 6, T6, "polvo_humo",
  "Según la DGT, ¿qué precauciones se toman con nubes de polvo o de humo?",
  "Las mismas que para conducir con niebla.",
  "Ninguna especial, porque desaparecen enseguida.",
  "Acelerar para salir cuanto antes de la nube.",
  "a", "Las nubes de polvo y humo impiden ver bien y pueden aparecer de repente; hay que tomar las mismas precauciones que con niebla.",
  F("MANUAL_DGT", "Tema 14, Conducir con nubes de polvo o de humo (p. 361)", "debes tomar las mismas precauciones que para conducir con niebla."))
q("bm6-0012", 6, T6, "invierno",
  "Va a viajar en invierno. ¿Cuál de estas precauciones recomienda la DGT?",
  "Llevar el depósito lleno de combustible y cadenas en el vehículo.",
  "Viajar preferentemente de noche, cuando hay menos tráfico.",
  "Desinflar un poco los neumáticos para que agarren más.",
  "a", "En invierno: llevar cadenas, evitar conducir de noche, viajar con el depósito lleno y llevar ropa de abrigo, agua, comida y linterna.",
  F("MANUAL_DGT", "Tema 17, Elegir la ruta (p. 439)", "Viaja con el depósito lleno de combustible."))

# =====================================================================
# MATERIA 1. Delitos contra la seguridad vial (Código Penal)
# =====================================================================
TP = "delitos_seguridad_vial"
q("bmp-0001", 1, TP, "velocidad",
  "En vía urbana, ¿en cuánto hay que superar la velocidad permitida para que el exceso sea delito?",
  "En más de 30 km/h.",
  "En más de 50 km/h.",
  "En más de 60 km/h.",
  "c", "Es delito conducir a velocidad superior en 60 km/h en vía urbana o en 80 km/h en vía interurbana a la permitida.",
  F("CP", "379.1", "a velocidad superior en sesenta kilómetros por hora en vía urbana o en ochenta kilómetros por hora en vía interurbana a la permitida reglamentariamente"))
q("bmp-0002", 1, TP, "velocidad",
  "En una autovía limitada a 120 km/h, ¿a partir de qué velocidad el exceso constituye delito?",
  "A partir de más de 180 km/h.",
  "A partir de más de 200 km/h.",
  "A partir de más de 150 km/h.",
  "b", "En vía interurbana es delito superar en 80 km/h la velocidad permitida: con límite de 120 km/h, circular a más de 200 km/h.",
  F("CP", "379.1", "ochenta kilómetros por hora en vía interurbana a la permitida reglamentariamente"))
q("bmp-0003", 1, TP, "alcohol",
  "¿A partir de qué tasa de alcohol en aire espirado se comete en todo caso delito?",
  "Superior a 0,25 mg/l.",
  "Superior a 0,50 mg/l.",
  "Superior a 0,60 mg/l.",
  "c", "En todo caso es delito conducir con una tasa de alcohol en aire espirado superior a 0,60 mg/l o en sangre superior a 1,2 g/l. Con tasas menores también puede ser delito si se conduce bajo la influencia del alcohol.",
  F("CP", "379.2", "En todo caso será condenado con dichas penas el que condujere con una tasa de alcohol en aire espirado superior a 0,60 miligramos por litro"))
q("bmp-0004", 1, TP, "alcohol",
  "¿A partir de qué tasa de alcohol en sangre se comete en todo caso delito?",
  "Superior a 0,5 g/l.",
  "Superior a 1,2 g/l.",
  "Superior a 0,8 g/l.",
  "b", "Es delito en todo caso conducir con una tasa de alcohol en sangre superior a 1,2 g/l (o en aire espirado superior a 0,60 mg/l).",
  F("CP", "379.2", "o con una tasa de alcohol en sangre superior a 1,2 gramos por litro"))
q("bmp-0005", 1, TP, "negativa_pruebas",
  "El conductor que, requerido por un agente, se niega a someterse a las pruebas de alcohol o drogas…",
  "comete un delito castigado con prisión de seis meses a un año y privación del derecho a conducir.",
  "solo comete una infracción leve.",
  "no comete ninguna infracción si después demuestra que no había bebido.",
  "a", "Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años.",
  F("CP", "383", "será castigado con la penas de prisión de seis meses a un año y privación del derecho a conducir vehículos a motor y ciclomotores"))
q("bmp-0006", 1, TP, "sin_permiso",
  "Conducir un turismo sin haber obtenido nunca el permiso de conducción, ¿qué es?",
  "Una infracción administrativa leve.",
  "Un delito.",
  "Una infracción grave sin consecuencias penales.",
  "b", "El Código Penal castiga a quien conduce un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia, y también a quien conduce tras perder todos los puntos o estando privado del permiso por decisión judicial.",
  F("CP", "384", "al que condujere un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia de conducción"))
q("bmp-0007", 1, TP, "sin_puntos",
  "Ha perdido la vigencia de su permiso por pérdida total de los puntos y sigue conduciendo. ¿Qué comete?",
  "Un delito.",
  "Una infracción leve.",
  "Nada, mientras no le retiren físicamente el permiso.",
  "a", "Conducir con el permiso sin vigencia por pérdida total de los puntos es delito, castigado con prisión de tres a seis meses, multa o trabajos en beneficio de la comunidad.",
  F("CP", "384", "en los casos de pérdida de vigencia del permiso o licencia por pérdida total de los puntos asignados legalmente"))
q("bmp-0008", 1, TP, "temeridad",
  "Conducir con temeridad manifiesta poniendo en concreto peligro la vida o la integridad de las personas, ¿qué es?",
  "Un delito castigado con prisión de seis meses a dos años y privación del derecho a conducir.",
  "Una infracción grave.",
  "Solo una infracción muy grave sin consecuencias penales.",
  "a", "La conducción con temeridad manifiesta que pone en concreto peligro la vida o la integridad de las personas es delito, con prisión de seis meses a dos años y privación del derecho a conducir de más de uno y hasta seis años.",
  F("CP", "380.1", "con temeridad manifiesta y pusiere en concreto peligro la vida o la integridad de las personas"))
q("bmp-0009", 1, TP, "abandono_accidente",
  "El conductor que, voluntariamente y sin riesgo propio o ajeno, abandona el lugar tras causar un accidente con fallecidos o heridos graves, ¿qué comete?",
  "Un delito de abandono del lugar del accidente.",
  "Una infracción leve, si después se presenta ante la policía.",
  "Nada, si el accidente fue fortuito.",
  "a", "Es delito de abandono del lugar del accidente, también si el origen fue fortuito (en ese caso con pena de tres a seis meses de prisión y privación del derecho a conducir de seis meses a dos años).",
  F("CP", "382 bis.1", "será castigado como autor de un delito de abandono del lugar del accidente"))
q("bmp-0010", 1, TP, "obstaculos",
  "Colocar en la vía obstáculos imprevisibles o derramar sustancias deslizantes, originando un grave riesgo para la circulación, ¿qué es?",
  "Una infracción leve.",
  "Una infracción grave sin consecuencias penales.",
  "Un delito.",
  "c", "Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito.",
  F("CP", "385", "Colocando en la vía obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o mutando, sustrayendo o anulando la señalización"))


# Reparte la letra correcta entre a, b y c (intercambia la opción correcta con la de la letra objetivo).
for i, x in enumerate(Q):
    obj = "abc"[i % 3]
    if x["correcta"] != obj:
        o = x["opciones"]
        o[obj], o[x["correcta"]] = o[x["correcta"]], o[obj]
        x["correcta"] = obj


# ----------------------------------------------------------------------
def norm(s):
    s = s.replace("­", "").replace(" ", " ")
    return re.sub(r"\s+", " ", s).strip()


def limpiar_boe(t):
    out = []
    for l in t.split("\n"):
        s = l.strip()
        if re.fullmatch(r"Página \d+", s) or s in ("BOLETÍN OFICIAL DEL ESTADO", "LEGISLACIÓN CONSOLIDADA"):
            continue
        out.append(l)
    return "\n".join(out)


def limpiar_manual(t):
    # quita las líneas que son solo número de página y la cabecera «Tema N. …» de cada página
    out = []
    for l in t.split("\n"):
        s = l.strip()
        if re.fullmatch(r"\d{1,3}", s) or re.fullmatch(r"Tema \d+\. .*", s):
            continue
        out.append(l)
    return "\n".join(out)


def main():
    carpeta, salida = sys.argv[1], sys.argv[2]
    leer = lambda pat: open(glob.glob(os.path.join(carpeta, pat))[0], encoding="utf-8").read()
    crudo = {"RGC": leer("BOE-A-2003-23514*.txt"), "LSV": leer("BOE-A-2015-11722*.txt"),
             "CP": leer("BOE-A-1995-25444*.txt"), "MANUAL_DGT": leer("DGT-Manual*.txt")}
    estricto = {k: norm(v) for k, v in crudo.items()}
    limpio = {k: norm(limpiar_manual(v) if k == "MANUAL_DGT" else limpiar_boe(v)) for k, v in crudo.items()}
    no_encontradas, solo_limpio = [], []
    for x in Q:
        n, c = x["fuente"]["norma"], norm(x["fuente"]["cita"])
        if c in estricto[n]:
            continue
        if c in limpio[n]:
            solo_limpio.append(x["id"])
        else:
            no_encontradas.append(x["id"])
    ids = [x["id"] for x in Q]
    assert len(ids) == len(set(ids)), "ids repetidos"
    otros = set()
    for f in glob.glob(os.path.join(os.path.dirname(os.path.abspath(salida)), "banco-*.json")):
        if os.path.abspath(f) == os.path.abspath(salida):
            continue
        otros |= {p["id"] for p in json.load(open(f, encoding="utf-8")).get("preguntas", [])}
    choques = sorted(set(ids) & otros)
    for x in Q:
        assert sorted(x["opciones"]) == ["a", "b", "c"] and x["correcta"] in x["opciones"], x["id"]
        assert len(set(x["opciones"].values())) == 3, x["id"]
    from collections import Counter
    print("preguntas:", len(Q), dict(sorted(Counter(x["materia"] for x in Q).items())))
    print("correctas:", dict(Counter(x["correcta"] for x in Q)))
    print("citas no encontradas:", no_encontradas)
    print("citas que cruzan un salto de página (encontradas al quitar cabeceras):", solo_limpio)
    print("ids que chocan con otros bancos:", choques)
    doc = {"version": 1,
           "descripcion": "Preguntas escritas directamente desde la norma para materias con poca cobertura en los vídeos (3, 6, 9, 13) y delitos contra la seguridad vial.",
           "normativa_consultada": {
               "RGC": {"ref": "BOE-A-2003-23514", "nombre": "Reglamento General de Circulación (RD 1428/2003)", "ultima_actualizacion": VERS["RGC"]},
               "LSV": {"ref": "BOE-A-2015-11722", "nombre": "Ley de Tráfico y Seguridad Vial (RDL 6/2015)", "ultima_actualizacion": VERS["LSV"]},
               "CP": {"ref": "BOE-A-1995-25444", "nombre": "Código Penal (LO 10/1995), arts. 379 a 385 ter", "ultima_actualizacion": VERS["CP"]},
               "MANUAL_DGT": {"ref": "DGT Manual Permiso B Lectura Fácil", "nombre": "Manual del permiso B en Lectura Fácil (DGT)", "ultima_actualizacion": VERS["MANUAL_DGT"]}},
           "preguntas": Q}
    if no_encontradas or choques:
        sys.exit("No se escribe el banco: hay citas no encontradas o ids repetidos.")
    json.dump(doc, open(salida, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("escrito", salida)


if __name__ == "__main__":
    main()
