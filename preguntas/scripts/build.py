import json, re, sys

RGC_URL = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514"
LSV_URL = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722"
V = "2026-06-26"
VID = "video1"

def F(norma, art, cita):
    url = (RGC_URL if norma == "RGC" else LSV_URL)
    a = re.match(r"(\d+)", art)
    if norma == "LSV" and art.startswith("Anexo"):
        url += "#ani"
    elif a:
        url += "#a" + a.group(1)
    return {"norma": norma, "articulo": art, "url": url, "cita": cita, "version_consultada": V}

Q = []
def q(id, tema, sub, enun, a, b, c, ok, expl, fuente, minuto):
    Q.append({"id": id, "tema": tema, "subtema": sub, "enunciado": enun,
              "opciones": {"a": a, "b": b, "c": c}, "correcta": ok,
              "explicacion": expl, "fuente": fuente,
              "origen": {"tipo": "video_clase", "ref": VID, "minuto": minuto},
              "imagen": None, "estado": "verificada", "verificado_el": "2026-11-24", "notas_revision": ""})

# ---------- Definiciones (LSV Anexo I) ----------
q("def-0001","definiciones","peaton",
  "Una persona con discapacidad que circula al paso en una silla de ruedas con motor, ¿tiene la consideración de peatón?",
  "Sí, con o sin motor.","No, porque la silla tiene motor; es un vehículo para personas de movilidad reducida.","Solo si la silla no tiene motor.",
  "a","La Ley de Tráfico considera peatones a las personas con discapacidad que circulan al paso en silla de ruedas, tenga o no motor.",
  F("LSV","Anexo I.4","y las personas con discapacidad que circulan al paso en una silla de ruedas, con o sin motor"),"1:52")
q("def-0002","definiciones","peaton",
  "Quien conduce a pie una bicicleta, sin ir montado en ella, ¿qué consideración tiene?",
  "Conductor de un ciclo.","Peatón.","Conductor de un vehículo de tracción humana.",
  "b","Los que conducen a pie un ciclo o un ciclomotor de dos ruedas tienen la consideración de peatones.",
  F("LSV","Anexo I.4","los que conducen a pie un ciclo o ciclomotor de dos ruedas"),"1:43")
q("def-0003","definiciones","conductor",
  "¿Quién es el conductor de un rebaño de animales que circula por la vía?",
  "Nadie; solo se considera conductor a quien maneja un vehículo.","La persona a cuyo cargo están los animales.","El propietario de los animales, aunque no esté presente.",
  "b","Es conductor también la persona a cuyo cargo está un animal o animales.",
  F("LSV","Anexo I.1","va al mando de un vehículo, o a cuyo cargo está un animal o animales"),"1:28")
q("def-0004","definiciones","ciclo",
  "Una bicicleta de pedaleo asistido (con un pequeño motor que ayuda al pedaleo), ¿es un ciclo?",
  "No, es un ciclomotor.","No, es un vehículo de movilidad personal.","Sí, los ciclos de pedaleo asistido se incluyen en la definición de ciclo.",
  "c","La definición de ciclo incluye expresamente los ciclos de pedaleo asistido.",
  F("LSV","Anexo I.7","Se incluyen en esta definición los ciclos de pedaleo asistido."),"5:00")
q("def-0005","definiciones","ciclomotor",
  "¿Cuál es la velocidad máxima por construcción de un ciclomotor de dos ruedas?",
  "No superior a 45 km/h.","No superior a 50 km/h.","No superior a 60 km/h.",
  "a","Un ciclomotor de dos ruedas tiene una velocidad máxima por construcción no superior a 45 km/h.",
  F("LSV","Anexo I.9.a","Vehículo de dos ruedas, con una velocidad máxima por construcción no superior a 45 km/h"),"5:20")
q("def-0006","definiciones","ciclomotor",
  "Un vehículo de cuatro ruedas, con masa en vacío de hasta 350 kg y velocidad máxima por construcción de 45 km/h (cuadriciclo ligero), ¿qué tipo de vehículo es?",
  "Un turismo.","Un ciclomotor.","Un vehículo especial.",
  "b","La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h.",
  F("LSV","Anexo I.9.c","Vehículos de cuatro ruedas, cuya masa en vacío sea inferior o igual a 350 kilogramos"),"6:10")
q("def-0007","definiciones","vehiculo_de_motor",
  "Según la Ley de Tráfico, ¿cuál de estos vehículos queda excluido de la definición de «vehículo de motor»?",
  "La motocicleta.","El ciclomotor.","El camión.",
  "b","La definición de vehículo de motor excluye los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida.",
  F("LSV","Anexo I.12","Se excluyen de esta definición los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida."),"5:30")
q("def-0008","definiciones","mma",
  "¿Qué es la masa máxima autorizada (MMA)?",
  "La masa del vehículo vacío, sin conductor ni carga.","La masa máxima para la utilización de un vehículo con carga en circulación por las vías públicas.","La masa que soporta cada eje del vehículo.",
  "b","La MMA es la masa máxima con la que un vehículo cargado puede circular por las vías públicas.",
  F("LSV","Anexo I.37","La masa máxima para la utilización de un vehículo con carga en circulación por las vías públicas."),"8:30")
q("def-0009","definiciones","tara",
  "La tara de un vehículo es su masa…",
  "sin personal de servicio, pasajeros ni carga, y con su dotación completa de agua, combustible, lubricante, repuestos, herramientas y accesorios reglamentarios.","sin conductor y sin combustible.","con el conductor y la carga máxima permitida.",
  "a","La tara es la masa sin personas ni carga, pero con la dotación completa de combustible, agua, lubricante, repuestos, herramientas y accesorios.",
  F("LSV","Anexo I.35","sin personal de servicio, pasajeros ni carga, y con su dotación completa de agua, combustible, lubricante"),"7:50")
q("def-0010","definiciones","turismo",
  "¿Cuántas plazas puede tener como máximo un turismo, además del asiento del conductor?",
  "Seis.","Ocho.","Nueve.",
  "b","Un turismo tiene, además del asiento del conductor, ocho plazas como máximo.",
  F("LSV","Anexo I.15","además del asiento del conductor, ocho plazas como máximo"),"3:10")
q("def-0011","definiciones","camion",
  "¿Qué caracteriza a un camión según la Ley de Tráfico?",
  "Que su cabina no está integrada en el resto de la carrocería.","Que tiene más de nueve plazas.","Que su masa máxima autorizada supera siempre los 3.500 kg.",
  "a","El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería.",
  F("LSV","Anexo I.18","cuya cabina no está integrada en el resto de la carrocería"),"3:45")
q("def-0012","definiciones","mixto_adaptable",
  "Un vehículo en el que se puede sustituir la carga, parcial o totalmente, por personas mediante la adición de asientos, es un…",
  "derivado de turismo.","vehículo mixto adaptable.","furgón.",
  "b","Es la definición de vehículo mixto adaptable: transporte simultáneo o no de mercancías y personas, hasta nueve incluido el conductor.",
  F("LSV","Anexo I.19","se puede sustituir eventualmente la carga, parcial o totalmente, por personas mediante la adición de asientos"),"3:25")

# ---------- Tipos de vías ----------
q("via-0001","vias","travesia",
  "¿Qué es una travesía?",
  "Un tramo de carretera que discurre por poblado.","Una vía urbana con un solo carril por sentido.","Un camino rural que une dos poblaciones.",
  "a","La travesía es el tramo de carretera que discurre por poblado.",
  F("LSV","Anexo I.71","Tramo de carretera que discurre por poblado."),"11:30")
q("via-0002","vias","interurbana",
  "Una vía interurbana es una vía pública situada…",
  "dentro de poblado.","fuera de poblado.","entre dos carriles bici.",
  "b","Vía interurbana es la vía pública situada fuera de poblado.",
  F("LSV","Anexo I.72","Vía interurbana. Vía pública situada fuera de poblado."),"10:30")
q("via-0003","vias","autopista_autovia",
  "¿Cuál es la diferencia entre autopista y autovía respecto a las propiedades colindantes?",
  "Ninguna; en ambas tienen acceso libre.","En la autopista no tienen acceso; en la autovía tienen acceso limitado.","En la autovía no tienen acceso; en la autopista tienen acceso limitado.",
  "b","La autopista no permite el acceso de las propiedades colindantes; la autovía lo tiene limitado.",
  F("LSV","Anexo I.66","No tener acceso a la misma las propiedades colindantes."),"14:30")
q("via-0004","vias","carretera_convencional",
  "¿Qué es una carretera convencional?",
  "La que no reúne las características de autopistas, autovías y vías para automóviles.","Cualquier carretera con un solo carril por sentido.","Cualquier carretera sin arcén.",
  "a","Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles.",
  F("LSV","Anexo I.69","Carretera que no reúne las características propias de las autopistas, autovías y vías para automóviles."),"16:30")
q("via-0005","vias","autopista_autovia",
  "¿Pueden circular las bicicletas por una autovía?",
  "No, nunca.","Sí, por los arcenes, si el ciclista es mayor de 14 años y no lo prohíbe la señalización.","Sí, por cualquier carril, a partir de 16 años.",
  "b","Está prohibido circular en bicicleta por autopistas y autovías, pero los mayores de 14 años pueden ir por los arcenes de las autovías salvo prohibición señalizada.",
  F("RGC","38.1","los conductores de bicicletas mayores de 14 años podrán circular por los arcenes de las autovías"),"15:50")
q("via-0006","vias","autopista_autovia",
  "¿Puede circular un ciclomotor por una autopista o autovía?",
  "Sí, por el arcén.","Sí, si no supera los 45 km/h.","No, está prohibido.",
  "c","Se prohíbe circular por autopistas y autovías con vehículos de tracción animal, bicicletas, ciclomotores y vehículos para personas de movilidad reducida.",
  F("RGC","38.1","Se prohíbe circular por autopistas y autovías con vehículos de tracción animal, bicicletas, ciclomotores"),"15:30")
q("via-0007","vias","vmp",
  "¿Puede circular un patinete eléctrico (vehículo de movilidad personal) por una travesía?",
  "Sí, porque la travesía está dentro de poblado.","No, está prohibido.","Sí, pero solo por el arcén.",
  "b","Se prohíbe circular con vehículos de movilidad personal por autopistas y autovías, por travesías y por vías interurbanas y túneles urbanos (salvo vías ciclistas y similares).",
  F("RGC","38.4.b","Por travesías."),"17:40")

# ---------- Por dónde circular / arcén ----------
q("arc-0001","por_donde_circular","arcen",
  "Fuera de poblado, si no hay zona peatonal practicable, ¿por dónde debe circular un peatón que va solo?",
  "Por el arcén derecho.","Por el arcén izquierdo, si existe y es practicable.","Siempre por la calzada.",
  "b","Los peatones deben circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable; si no, por la calzada.",
  F("RGC","122.1","los peatones deberán circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable"),"19:30")
q("arc-0002","por_donde_circular","arcen",
  "Una persona que arrastra su bicicleta por una carretera, ¿por qué lado debe circular?",
  "Por la derecha.","Por la izquierda.","Por el lado que prefiera.",
  "a","Es obligatorio circular por la derecha para quienes empujen o arrastren un ciclo, ciclomotor de dos ruedas o VMP.",
  F("RGC","122.2.a","Quienes empujen o arrastren un ciclo, ciclomotor de dos ruedas, vehículo de movilidad personal"),"20:30")
q("arc-0003","por_donde_circular","arcen",
  "Un grupo de peatones dirigido por una persona que circula por una carretera, ¿por qué lado debe ir?",
  "Por la izquierda.","Por la derecha.","Por el centro de la calzada.",
  "b","Todo grupo de peatones dirigido por una persona debe circular por la derecha.",
  F("RGC","122.2.b","Todo grupo de peatones dirigido por una persona."),"20:00")
q("arc-0004","por_donde_circular","visibilidad_peaton",
  "Un peatón que de noche camina por el arcén de una vía interurbana, ¿qué debe llevar?",
  "Nada, si camina por el arcén.","Al menos un elemento luminoso o reflectante visible a 150 metros.","Una linterna de luz roja hacia delante.",
  "b","Entre el ocaso y la salida del sol, o con poca visibilidad, deben llevar al menos un elemento luminoso o reflectante visible a una distancia mínima de 150 metros.",
  F("RGC","123.1","que sea visible a una distancia mínima de 150 metros"),"19:50")
q("arc-0005","por_donde_circular","visibilidad_peaton",
  "Un grupo de peatones que circula de noche por una vía interurbana debe llevar luces. ¿De qué color hacia atrás?",
  "Blanco.","Amarillo.","Rojo.",
  "c","Las luces del grupo serán de color blanco o amarillo hacia adelante y rojo hacia atrás, en el lado más próximo al centro de la calzada.",
  F("RGC","123.2","que serán de color blanco o amarillo hacia adelante y rojo hacia atrás"),"21:00")
q("arc-0006","por_donde_circular","visibilidad_peaton",
  "Las luces que debe llevar de noche un grupo de peatones en vía interurbana, ¿en qué lado se llevan?",
  "En el lado más próximo al centro de la calzada.","En el lado más alejado de la calzada.","Da igual el lado.",
  "a","Se llevan en el lado más próximo al centro de la calzada.",
  F("RGC","123.2","en el lado más próximo al centro de la calzada, las luces necesarias para precisar su situación y dimensiones"),"21:10")
q("arc-0007","por_donde_circular","arcen",
  "¿Por dónde debe circular un vehículo especial de 3.000 kg de MMA fuera de poblado, si el arcén es transitable y suficiente?",
  "Por el arcén de su derecha.","Por el carril derecho de la calzada.","Por el carril izquierdo.",
  "a","Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente.",
  F("RGC","36.1","vehículos especiales con masa máxima autorizada no superior a 3.500 kilogramos"),"22:20")
q("arc-0008","por_donde_circular","ciclistas",
  "Los ciclistas que circulan por el arcén, ¿pueden ir en columna de a dos?",
  "No, nunca.","Sí.","Solo dentro de poblado.",
  "b","Los conductores de bicicletas pueden circular en columna de a dos por el arcén (en hilera en tramos sin visibilidad, de noche o con poca visibilidad, entre otros casos).",
  F("RGC","36.2","los conductores de bicicletas podrán circular en columna de a dos por el arcén"),"21:30")
q("arc-0009","por_donde_circular","ciclistas",
  "Dos ciclistas circulan de noche por la calzada de una carretera sin arcén. ¿Cómo deben ir?",
  "En columna de a dos.","En hilera, uno detrás de otro.","Como prefieran.",
  "b","Deben colocarse en hilera, entre otros casos, cuando circulen entre el ocaso y la salida del sol.",
  F("RGC","36.2","cuando circulen entre el ocaso y la salida del sol"),"21:40")
q("arc-0010","por_donde_circular","motos_arcen",
  "En un tramo señalizado para ello, con la circulación detenida por congestión, ¿a qué velocidad máxima puede circular una motocicleta por el arcén?",
  "20 km/h.","30 km/h.","50 km/h.",
  "b","En los tramos habilitados y señalizados, y solo con la circulación detenida por congestión, la velocidad por el arcén está limitada a 30 km/h, en columna de a uno.",
  F("RGC","36.3","La velocidad estará limitada a 30 km/h y únicamente se podrá circular en columna de a uno"),"24:10")
q("arc-0011","por_donde_circular","carril_emergencia",
  "En una autovía con tres carriles por sentido hay una retención. ¿Dónde debe formarse el carril de emergencia?",
  "Entre el carril situado más a la izquierda y el carril contiguo a él.","Entre el carril derecho y el arcén.","En el centro, entre el segundo y el tercer carril contando desde la izquierda.",
  "a","Con tres o más carriles en el mismo sentido, el carril de emergencia se forma entre el carril más a la izquierda y su contiguo.",
  F("RGC","32.1","el carril de emergencia deberá formarse entre el carril situado más a la izquierda y el carril contiguo a él"),"25:00")
q("arc-0012","por_donde_circular","carril_emergencia",
  "En una autopista con dos carriles por sentido, con la circulación detenida, ¿dónde se forma el carril de emergencia?",
  "En el arcén.","En el centro de la vía, entre esos dos carriles.","No es obligatorio formarlo.",
  "b","Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro de la vía, entre esos dos carriles.",
  F("RGC","32.1","el carril de emergencia deberá formarse en el centro de la vía, entre esos dos carriles"),"24:40")
q("arc-0013","por_donde_circular","nieve",
  "En una autopista con dos carriles por sentido y la circulación dificultada por la nieve, ¿qué debe hacer?",
  "Circular por el carril más a la derecha; está prohibido adelantar.","Circular por el carril izquierdo, que suele estar más limpio.","Adelantar solo a los vehículos pesados.",
  "a","Con nieve, en autopistas y autovías está prohibido adelantar y es obligatorio circular por el carril más a la derecha.",
  F("RGC","32.2","estará prohibido adelantar y será obligatorio circular por el carril situado más a la derecha"),"28:00")
q("arc-0014","por_donde_circular","carriles",
  "Fuera de poblado, en una calzada con tres carriles para su sentido, ¿qué carriles puede usar normalmente un camión de más de 3.500 kg de MMA?",
  "Cualquiera de los tres.","El situado más a la derecha y el inmediato.","Solo el situado más a la derecha, sin poder adelantar.",
  "b","Camiones y furgones de más de 3.500 kg y conjuntos de más de 7 m circulan normalmente por el carril más a la derecha y pueden utilizar el inmediato.",
  F("RGC","31.2","circularán normalmente por el situado más a la derecha, y podrán utilizar el inmediato"),"27:00")
q("arc-0015","por_donde_circular","carriles",
  "Dentro de poblado, en una calzada con dos carriles para su sentido delimitados por marcas, ¿qué carril puede utilizar un turismo?",
  "Obligatoriamente el de la derecha.","El que mejor convenga a su destino.","El de la izquierda, salvo para girar a la derecha.",
  "b","En poblado, con al menos dos carriles delimitados para el mismo sentido, se puede usar el que mejor convenga al destino, sin ser un obstáculo.",
  F("RGC","33","podrá utilizar el que mejor convenga a su destino"),"25:40")

# ---------- Carriles especiales ----------
q("cesp-0001","carriles_especiales","sentido_contrario",
  "¿Qué vehículos pueden circular por un carril habilitado en sentido contrario al habitual por razones de fluidez?",
  "Todos los vehículos.","Solo motocicletas y turismos (sin remolque).","Turismos, furgonetas y autobuses.",
  "b","Su utilización queda limitada a motocicletas y turismos, y está prohibida al resto, incluidos los turismos con remolque.",
  F("RGC","41.1","queda limitada a las motocicletas y turismos, y está prohibida, por lo tanto, al resto de los vehículos, incluidos los turismos con remolque"),"39:35")
q("cesp-0002","carriles_especiales","sentido_contrario",
  "¿A qué velocidad se circula por un carril habilitado en sentido contrario al habitual, salvo que se señalice otra inferior?",
  "Máxima 80 km/h y mínima 60 km/h.","Máxima 100 km/h y mínima 60 km/h.","Máxima 120 km/h, como en la autopista.",
  "a","Se circula con al menos la luz de cruce, de día y de noche, a un máximo de 80 km/h y un mínimo de 60 km/h, o inferiores si así se señaliza.",
  F("RGC","41.1","a una velocidad máxima de 80 kilómetros por hora y a una mínima de 60"),"39:55")
q("cesp-0003","carriles_especiales","sentido_contrario",
  "Si el carril se habilita en sentido contrario al habitual por obras en la calzada, ¿quién puede circular por él?",
  "Solo turismos y motocicletas.","Todos los tipos de vehículos autorizados a circular por la vía en obra, salvo prohibición expresa.","Solo vehículos de servicio de las obras.",
  "b","Cuando se habilita por obras, pueden circular todos los tipos de vehículos autorizados en la vía en obra, salvo prohibición expresa.",
  F("RGC","41.1","podrán circular por dichos carriles todos los tipos de vehículos que estén autorizados a circular por la vía en obra"),"40:45")
q("cesp-0004","carriles_especiales","adicional_circunstancial",
  "¿A qué velocidad máxima se circula por un carril adicional circunstancial, salvo que se señalice otra inferior?",
  "60 km/h.","80 km/h.","90 km/h.",
  "b","Los vehículos que circulen por los arcenes y por el carril adicional lo harán a un máximo de 80 km/h y un mínimo de 60 km/h, con al menos la luz de cruce.",
  F("RGC","42.1","lo harán a una velocidad máxima de 80 kilómetros por hora y a una mínima de 60"),"42:25")
q("cesp-0005","carriles_especiales","reversible",
  "Al circular por un carril reversible, ¿qué alumbrado debe llevar?",
  "Ninguno, si es de día.","Al menos la luz de corto alcance o de cruce, de día y de noche.","Las luces antiniebla traseras.",
  "b","En un carril reversible hay que llevar encendida, al menos, la luz de corto alcance o de cruce, tanto de día como de noche.",
  F("RGC","40.1","deberán llevar encendida, al menos, la luz de corto alcance o de cruce en sus vehículos tanto de día como de noche"),"43:45")
q("cesp-0006","carriles_especiales","vao",
  "¿Puede circular un turismo con remolque por un carril VAO?",
  "Sí, si lleva el número mínimo de ocupantes.","No, está prohibido.","Sí, si el remolque es ligero.",
  "b","El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque.",
  F("RGC","35.2.a","incluidos los turismos con remolque"),"45:26")
q("cesp-0007","carriles_especiales","vao",
  "¿Puede usar un carril VAO un turismo ocupado solo por su conductor que lleva la señal V-15?",
  "Sí.","No, debe llevar siempre el número mínimo de ocupantes.","Solo si es un vehículo eléctrico.",
  "a","Los vehículos autorizados pueden usar el VAO aun cuando solo lo ocupe el conductor si ostentan la señal V-15 o la tarjeta de estacionamiento para personas con discapacidad.",
  F("RGC","35.2.a","aun cuando sólo lo ocupe su conductor, si el vehículo ostenta la señal V-15"),"46:21")
q("cesp-0008","carriles_especiales","vao",
  "Un autobús de más de 3.500 kg de MMA, ¿puede usar un carril VAO aunque vaya vacío?",
  "No.","Sí, con independencia de su número de ocupantes, si así se indica para ese tramo.","Solo si lleva al menos dos pasajeros.",
  "b","Los autobuses de más de 3.500 kg y los articulados pueden usarlo con independencia del número de ocupantes, en las condiciones fijadas para el tramo.",
  F("RGC","35.2.a","por autobuses con masa máxima autorizada superior a 3.500 kilogramos y autobuses articulados, con independencia de su número de ocupantes"),"47:12")

# ---------- Distancias ----------
q("dist-0001","distancias","tunel",
  "Dentro de un túnel, sin intención de adelantar, ¿qué distancia mínima debe mantener un turismo con el vehículo precedente?",
  "50 metros o 2 segundos.","100 metros o 4 segundos.","150 metros o 6 segundos.",
  "b","En túneles o pasos inferiores hay que mantener al menos 100 metros o un intervalo mínimo de cuatro segundos.",
  F("RGC","95.6","de, al menos, 100 metros o un intervalo mínimo de cuatro segundos"),"52:55")
q("dist-0002","distancias","tunel",
  "Dentro de un túnel, ¿qué distancia mínima debe mantener un vehículo de más de 3.500 kg de MMA con el precedente?",
  "100 metros o 4 segundos.","150 metros o 6 segundos.","200 metros o 8 segundos.",
  "b","Los vehículos de MMA superior a 3.500 kg deben guardar al menos 150 metros o seis segundos.",
  F("RGC","95.6","será de, al menos, 150 metros o un intervalo mínimo de seguridad de seis segundos"),"53:05")
q("dist-0003","distancias","facilitar_adelantamiento",
  "Fuera de poblado, en una vía con un solo carril por sentido donde está permitido adelantar, un camión de 12.000 kg que no va a adelantar, ¿qué separación mínima debe dejar con el vehículo de delante para facilitar que le adelanten?",
  "25 metros.","50 metros.","100 metros.",
  "b","Los vehículos de más de 3.500 kg y los de más de 10 m deben guardar una separación mínima de 50 metros para que puedan adelantarles con seguridad. No se aplica en poblado, donde está prohibido adelantar o donde hay más de un carril por sentido.",
  F("RGC","54.2","deberán guardar, a estos efectos, una separación mínima de 50 metros"),"52:20")
q("dist-0004","distancias","facilitar_adelantamiento",
  "La obligación de dejar una separación extra para que otro pueda adelantarle, ¿se aplica en una vía donde está prohibido adelantar?",
  "Sí, siempre.","No.","Solo a los turismos.",
  "b","Esa obligación no se aplica en poblado, donde esté prohibido adelantar, donde haya más de un carril en el mismo sentido o con circulación muy saturada.",
  F("RGC","54.3.b","Donde estuviese prohibido el adelantamiento."),"55:30")
q("dist-0005","distancias","ciclistas",
  "En vía urbana, un turismo circula detrás de un ciclista en el mismo carril. ¿Qué separación mínima debe dejar?",
  "1,5 metros.","3 metros.","5 metros.",
  "c","Los conductores de vehículos a motor deben dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril.",
  F("RGC","153.4","deberán dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril"),"1:00:13")

# ---------- Adelantamiento a vulnerables ----------
q("adel-0001","adelantamiento","vulnerables",
  "Al adelantar a un ciclista, ¿qué anchura de seguridad mínima hay que guardar?",
  "1 metro.","1,5 metros.","2 metros.",
  "b","Al adelantar a peatones, animales, vehículos de tracción animal, ciclomotores, VMP o ciclistas hay que guardar una anchura de seguridad de al menos 1,5 metros.",
  F("RGC","85.4","guardando una anchura de seguridad de, al menos, 1,5 metros"),"57:35")
q("adel-0002","adelantamiento","vulnerables",
  "Va a adelantar a un ciclista en una calzada con dos carriles para su sentido. ¿Qué debe hacer?",
  "Basta con dejar 1,5 metros, aunque no cambie de carril.","Cambiar completamente de carril.","Tocar el claxon y adelantar por el mismo carril.",
  "b","Cuando la calzada tiene más de un carril por sentido, es obligatorio el cambio completo de carril.",
  F("RGC","85.4","salvo cuando la calzada cuente con más de un carril por sentido, en cuyo caso será obligatorio el cambio completo de carril"),"1:00:34")
q("adel-0003","adelantamiento","vulnerables",
  "Fuera de poblado, en una vía limitada a 90 km/h, va a adelantar a un ciclista. ¿A qué velocidad máxima puede hacerlo?",
  "90 km/h.","80 km/h.","70 km/h.",
  "c","Fuera de poblado hay que reducir la velocidad al menos 20 km/h respecto al límite de la vía, antes y durante todo el adelantamiento: 90 − 20 = 70 km/h.",
  F("RGC","85.4","deberá reducir la velocidad respecto al límite existente en la vía en al menos 20 km/h"),"59:34")
q("adel-0004","adelantamiento","vulnerables",
  "A efectos del adelantamiento, un grupo de ciclistas que circula junto…",
  "se considera una única unidad móvil.","se adelanta ciclista a ciclista, volviendo al carril entre ellos.","no puede ser adelantado.",
  "a","Cuando los ciclistas circulen en grupo, se consideran como una única unidad móvil.",
  F("RGC","85.4","Cuando los conductores de bicicletas circulen en grupo, se considerarán como una única unidad móvil."),"1:00:30")
q("adel-0005","adelantamiento","inmovilizados",
  "Un vehículo averiado está inmovilizado ocupando parte de su carril. Al rebasarlo, ¿qué debe hacer?",
  "Mantener al menos 1,5 metros y reducir la velocidad al menos 20 km/h respecto al límite de la vía.","Basta con poner el intermitente.","Pararse siempre detrás hasta que lo retiren.",
  "a","Al rebasar un vehículo inmovilizado por avería, accidente o servicio de urgencia o auxilio que ocupe la calzada, hay que mantener al menos 1,5 m y reducir la velocidad al menos 20 km/h.",
  F("RGC","88.1","deben mantener una anchura de seguridad de al menos 1,5 metros"),"59:59")

# ---------- Velocidad ----------
q("vel-0001","velocidad","limites_fuera_poblado",
  "¿Cuál es la velocidad máxima genérica de un turismo en una autopista?",
  "100 km/h.","120 km/h.","130 km/h.",
  "b","Para turismos, motocicletas, autocaravanas de hasta 3.500 kg y pick-up, el límite genérico en autopista y autovía es 120 km/h.",
  F("RGC","48.1.a","Turismos, motocicletas,"),"1:03:10")
q("vel-0002","velocidad","limites_fuera_poblado",
  "¿Cuál es la velocidad máxima genérica de un turismo en una carretera convencional?",
  "80 km/h.","90 km/h.","100 km/h.",
  "b","El límite genérico de turismos y motocicletas en carretera convencional es 90 km/h (el titular de la vía puede fijar 100 km/h si hay separación física de sentidos).",
  F("RGC","48.1.a","el titular de la vía podrá fijar un límite máximo de 100 km/h para turismos"),"1:03:15")
q("vel-0003","velocidad","limites_fuera_poblado",
  "¿Cuál es la velocidad máxima genérica de un autobús en una autovía?",
  "90 km/h.","100 km/h.","120 km/h.",
  "b","Autobuses, derivados de turismo y mixtos adaptables: 100 km/h en autopista y autovía y 90 km/h en convencional.",
  F("RGC","48.1.a","vehículos derivados"),"1:03:25")
q("vel-0004","velocidad","limites_fuera_poblado",
  "¿Cuál es la velocidad máxima genérica de un turismo con remolque en una autopista?",
  "80 km/h.","90 km/h.","100 km/h.",
  "b","Los automóviles con remolque están en el grupo de camiones, furgonetas y vehículos articulados: 90 km/h en autopista y autovía y 80 km/h en convencional.",
  F("RGC","48.1.a","automóviles con remolque y resto"),"1:02:31")
q("vel-0005","velocidad","reducciones",
  "Un autobús que realiza transporte escolar circula por una autopista. ¿Cuál es su velocidad máxima genérica?",
  "80 km/h.","90 km/h.","100 km/h.",
  "b","El transporte escolar y de menores reduce en 10 km/h la velocidad máxima de su vehículo y vía: 100 − 10 = 90 km/h.",
  F("RGC","48.1.b","Para los vehículos que realicen transporte escolar y de menores o que transporten mercancías peligrosas, se reducirá en 10 kilómetros por hora"),"1:05:13")
q("vel-0006","velocidad","reducciones",
  "Un camión que transporta mercancías peligrosas circula por una carretera convencional. ¿Cuál es su velocidad máxima genérica?",
  "60 km/h.","70 km/h.","80 km/h.",
  "b","El límite del camión en convencional es 80 km/h y se reduce 10 km/h por llevar mercancías peligrosas: 70 km/h.",
  F("RGC","48.1.b","que transporten mercancías peligrosas, se reducirá en 10 kilómetros por hora"),"1:04:45")
q("vel-0007","velocidad","especiales",
  "¿Cuál es la velocidad máxima de un tractor agrícola que lleva remolque, fuera de poblado?",
  "25 km/h.","40 km/h.","70 km/h.",
  "a","Los vehículos especiales que carecen de señalización de frenado, llevan remolque o son motocultores tienen un máximo de 25 km/h.",
  F("RGC","48.1.c","Si carecen de señalización de frenado, llevan remolque o son motocultores: 25"),"1:06:35")
q("vel-0008","velocidad","ciclomotores",
  "¿Cuál es la velocidad máxima de un cuadriciclo ligero fuera de poblado?",
  "45 km/h.","70 km/h.","90 km/h.",
  "a","Ciclos, ciclomotores de dos y tres ruedas y cuadriciclos ligeros: 45 km/h.",
  F("RGC","48.1.e","Para ciclos, ciclomotores de dos y tres ruedas y cuadriciclos ligeros: 45 kilómetros por"),"1:07:29")
q("vel-0009","velocidad","cuadriciclos",
  "¿Cuál es la velocidad máxima de un cuadriciclo (no ligero) en una carretera convencional?",
  "45 km/h.","70 km/h.","90 km/h.",
  "b","A los vehículos de tres ruedas y cuadriciclos se les aplica el límite de 70 km/h en cualquier vía donde esté permitida su circulación.",
  F("RGC","48.1.h","A los vehículos de tres ruedas y cuadriciclos en cualquier tipo de vía donde esté permitida su circulación se aplica el límite de 70"),"1:07:38")
q("vel-0010","velocidad","sin_pavimentar",
  "¿Cuál es el límite de velocidad máximo en una vía sin pavimentar?",
  "20 km/h.","30 km/h.","40 km/h.",
  "b","En las vías sin pavimentar el límite de velocidad máximo es de 30 km/h.",
  F("RGC","48.1.f","En las vías sin pavimentar el límite de velocidad máximo será de 30 km/h."),"1:08:45")
q("vel-0011","velocidad","minimas",
  "¿Cuál es la velocidad mínima en autopistas y autovías para los vehículos a motor?",
  "40 km/h.","50 km/h.","60 km/h.",
  "c","Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2).",
  F("RGC","49.1","se prohíbe la circulación en autopistas y autovías de vehículos a motor a una velocidad inferior a 60 kilómetros por hora"),"1:04:00")
q("vel-0012","velocidad","minimas",
  "¿Cuál es la velocidad mínima de un turismo en una carretera convencional, en condiciones normales?",
  "45 km/h.","60 km/h.","No hay velocidad mínima.",
  "a","En las vías que no son autopista o autovía, la mínima es la mitad de la genérica de cada vehículo: 90 / 2 = 45 km/h.",
  F("RGC","49.1","a una velocidad inferior a la mitad de la genérica señalada para cada categoría de vehículos"),"1:04:09")
q("vel-0013","velocidad","limites_urbanos",
  "¿Cuál es el límite genérico de velocidad en una vía urbana con un único carril por sentido?",
  "20 km/h.","30 km/h.","50 km/h.",
  "b","El límite genérico en vías urbanas de un único carril por sentido es 30 km/h.",
  F("RGC","50.1.b","30 km/h en vías de un único carril por sentido de circulación."),"1:10:08")
q("vel-0014","velocidad","limites_urbanos",
  "¿Cuál es el límite genérico de velocidad en una vía urbana con plataforma única de calzada y acera?",
  "10 km/h.","20 km/h.","30 km/h.",
  "b","En vías con plataforma única de calzada y acera el límite genérico es 20 km/h.",
  F("RGC","50.1.a","20 km/h en vías que dispongan de plataforma única de calzada y acera."),"1:10:14")
q("vel-0015","velocidad","limites_urbanos",
  "Una calle tiene dos carriles en su sentido, pero uno de ellos es un carril bus. ¿Cuál es el límite genérico?",
  "30 km/h, porque los carriles reservados no se cuentan.","50 km/h, porque hay dos carriles.","40 km/h.",
  "a","Los carriles reservados para determinados usuarios o para transporte público no se contabilizan, así que queda un único carril por sentido: 30 km/h.",
  F("RGC","50.1","los carriles reservados para la circulación de determinados usuarios o uso exclusivo de transporte público no serán contabilizados"),"1:12:37")
q("vel-0016","velocidad","travesias",
  "¿Cuál es el límite genérico de velocidad en una travesía?",
  "30 km/h si tiene un solo carril por sentido.","50 km/h para todo tipo de vehículos.","Depende del tipo de vehículo.",
  "b","El límite genérico en travesías es 50 km/h para todo tipo de vehículos.",
  F("RGC","50.5","El límite genérico de velocidad en travesías es de 50 km/h para todo tipo de vehículos."),"1:14:36")
q("vel-0017","velocidad","autopista_en_poblado",
  "¿Cuál es el límite genérico de velocidad en una autopista que transcurre dentro de poblado?",
  "50 km/h.","80 km/h.","120 km/h para turismos.",
  "b","El límite genérico en autopistas y autovías que transcurren dentro de poblado es 80 km/h (ampliable con señalización específica).",
  F("RGC","50.6","El límite genérico de velocidad en autopistas y autovías que transcurren dentro de poblado será de 80 km/h"),"1:15:46")
q("vel-0018","velocidad","mercancias_peligrosas_urbano",
  "¿Cuál es la velocidad máxima de un vehículo que transporta mercancías peligrosas en una travesía?",
  "30 km/h.","40 km/h.","50 km/h.",
  "b","En travesías y en vías urbanas de dos o más carriles por sentido, los vehículos con mercancías peligrosas circulan como máximo a 40 km/h.",
  F("RGC","50.4","los vehículos que transporten mercancías peligrosas circularán como máximo a 40 km/h"),"1:05:05")

# ---------- Revisión ----------
R = []
def r(id, tema, afirmacion, minuto, motivo, sugerencia=""):
    R.append({"id": id, "tema": tema, "afirmacion_del_video": afirmacion,
              "origen": {"tipo": "video_clase", "ref": VID, "minuto": minuto},
              "estado": "pendiente_revision", "motivo": motivo, "sugerencia": sugerencia})

r("rev-0001","definiciones","La tara es lo que pesa el coche sin conductor y sin combustible.","7:50",
  "CONTRADICHO por la Ley de Tráfico (Anexo I.35): la tara incluye la dotación completa de agua, combustible, lubricante, repuestos, herramientas y accesorios.",
  "Usar la definición legal (pregunta def-0009).")
r("rev-0002","definiciones","La masa en orden de marcha es lo mínimo que necesita pesar para circular (algo de carburante y el conductor).","8:10",
  "No aparece en el Anexo I de la Ley de Tráfico. Está definida en el Reglamento General de Vehículos, que no se ha consultado en este piloto.")
r("rev-0003","definiciones","Furgoneta y derivado de turismo: definiciones y diferencias.","3:00",
  "No están definidos en el Anexo I de la Ley de Tráfico; hay que comprobarlos en el Reglamento General de Vehículos (Anexo II).")
r("rev-0004","definiciones","Los vehículos de movilidad personal son «vehículos de no motor».","6:40",
  "La Ley de Tráfico excluye de «vehículo de motor» a ciclomotores, tranvías y vehículos para personas de movilidad reducida, pero no menciona los VMP en esa exclusión. No confirmado.")
r("rev-0005","definiciones","La matrícula amarilla identifica a un ciclomotor.","5:40",
  "No se ha comprobado en la normativa consultada (está en el Reglamento General de Vehículos).")
r("rev-0006","vias","Autopistas y autovías tienen al menos dos carriles por sentido.","13:30",
  "La definición legal (Anexo I.66 y 67) exige calzadas distintas para cada sentido, pero no fija un número mínimo de carriles.")
r("rev-0007","vias","Peatones y animales de montura no pueden circular por autopistas ni autovías.","15:30",
  "El art. 38.1 del RGC no menciona a peatones ni animales; la prohibición debe de estar en la Ley de Tráfico (art. 18) o en el art. 121 y siguientes del RGC. Pendiente de localizar la cita.")
r("rev-0008","por_donde_circular","Una persona en silla de ruedas que va sola debe ir por el arcén derecho.","20:50",
  "El art. 122.2 del RGC obliga a ir por la derecha a quien arrastra un ciclo, ciclomotor o VMP y a los grupos dirigidos, pero no menciona las sillas de ruedas. El propio profesor lo presenta como un truco. No confirmado.")
r("rev-0009","por_donde_circular","El peatón debe llevar chaleco reflectante de noche.","19:50",
  "Matiz: el art. 123.1 exige «al menos, un elemento luminoso o reflectante» visible a 150 m, no específicamente un chaleco. Se usa la redacción legal en arc-0004.")
r("rev-0010","por_donde_circular","Con nieve y tres o más carriles se pueden usar los dos de la derecha.","28:30",
  "CONFIRMADO por el art. 32.2 («pudiendo utilizar su contiguo en tramos con tres o más carriles por sentido»), pero solo para autopistas y autovías. Se puede convertir en pregunta si se quiere.")
r("rev-0011","carriles_especiales","Las motocicletas pueden ir por el carril VAO aunque solo vaya el conductor.","46:04",
  "El art. 35.2.a permite motocicletas en el VAO, pero solo exime del número mínimo de ocupantes a vehículos con V-15 y a autobuses de más de 3.500 kg. No se ha encontrado la exención para motos en el texto consultado.")
r("rev-0012","carriles_especiales","Por un carril adicional circunstancial pueden ir todos (también turismos con remolque).","42:23",
  "El art. 42 no restringe tipos de vehículos, pero remite a las normas del art. 41 «en cuanto sean aplicables». No es concluyente.")
r("rev-0013","carriles_especiales","Los vehículos del carril contiguo a uno habilitado en sentido contrario también deben ir entre 60 y 80 km/h.","40:13",
  "Matiz: según el art. 41.1, solo si disponen de un solo carril en su sentido; si tienen más de uno, se aplican los límites normales. Siempre con luz de cruce.")
r("rev-0014","distancias","Dejar 2 o 3 segundos de distancia frontal.","51:37",
  "El art. 54.1 no fija segundos: exige un espacio que permita detenerse sin colisionar. Es una recomendación práctica, no una norma.")
r("rev-0015","adelantamiento","Al rebasar un vehículo detenido en el arcén hay que reducir 20 km/h.","59:59",
  "El art. 88.1 se refiere a un vehículo inmovilizado que «ocupe la calzada en el carril del sentido de la marcha», no al que está en el arcén. Se usa la redacción legal en adel-0005.")
r("rev-0016","velocidad","Mercancías peligrosas: restar 10 km/h tanto dentro como fuera de poblado.","1:04:53",
  "Matiz: la reducción de 10 km/h (art. 48.1.b) es para vías fuera de poblado. Dentro de poblado, el art. 50.4 fija un máximo de 40 km/h en vías de dos o más carriles por sentido y travesías. Ver vel-0006 y vel-0018.")
r("rev-0017","velocidad","Vehículos especiales que superan 60 km/h: límite 70; si no, 40.","1:06:51",
  "CONFIRMADO por el art. 48.1.c.2º, con la condición de que cumplan las normas reguladoras de los vehículos. Se puede convertir en pregunta.")
r("rev-0018","velocidad","Ciclomotor, triciclo ligero: 45 km/h donde sea.","1:08:29",
  "Matiz: el art. 48.1.e incluye a los ciclos, pero permite a las bicicletas superar los 45 km/h donde la vía lo permita.")

doc = {"version": 1,
       "normativa_consultada": {
         "RGC": {"ref": "BOE-A-2003-23514", "nombre": "Reglamento General de Circulación (RD 1428/2003)", "ultima_actualizacion": V},
         "LSV": {"ref": "BOE-A-2015-11722", "nombre": "Ley de Tráfico y Seguridad Vial (RDL 6/2015)", "ultima_actualizacion": V}},
       "preguntas": Q}

# ----- verificación automática de citas -----
def norm(s):
    s = s.replace("­", "")
    return re.sub(r"\s+", " ", s)
texts = {"RGC": norm(open(sys.argv[1]).read()), "LSV": norm(open(sys.argv[2]).read())}
bad = [x["id"] for x in Q if norm(x["fuente"]["cita"]) not in texts[x["fuente"]["norma"]]]
ids = [x["id"] for x in Q]
assert len(ids) == len(set(ids))
for x in Q:
    assert x["correcta"] in x["opciones"]
print("preguntas:", len(Q), "revision:", len(R), "citas no encontradas:", bad)
json.dump(doc, open(sys.argv[3] + "/banco.json", "w"), ensure_ascii=False, indent=2)
json.dump({"version": 1, "revision": R}, open(sys.argv[3] + "/revision.json", "w"), ensure_ascii=False, indent=2)
