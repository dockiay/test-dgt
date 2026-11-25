#!/usr/bin/env python3
"""Ejercicios «Empareja» (tercera tanda): señales por familias, marcas viales, velocidades, luces,
semáforos y puntos. Escribe datos-emparejar.js.

Cada pareja lleva el trozo literal de la norma que la respalda. Con las señales, el trozo tiene que
estar además en la entrada de ESA señal del catálogo (catalogo_ocr.txt), no solo en algún sitio del
catálogo; si no, el script se para. Después, `python3 comprobar.py` vuelve a buscar todas las citas.

Uso:  python3 prototipos/ejercicios/generar_emparejar.py [carpeta de textos]
"""
import json, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
TXT = sys.argv[1] if len(sys.argv) > 1 else "/mnt/project-files/fuentes/txt"
URL_RGC = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514"
URL_LSV = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722"
norm = lambda t: re.sub(r"\s+", " ", t).strip()

# ---------- Catálogo: una entrada por señal ----------
cat = open(os.path.join(TXT, "catalogo_ocr.txt"), encoding="utf-8").read()
cat = re.sub(r"=== p-\d+\.png\.txt\nBOLETÍN OFICIAL DEL ESTADO\nLEGISLACIÓN CONSOLIDADA\n", "", cat)
cat = re.sub(r"\nPágina \d+\n", "\n", cat)
ENTRADA = {}
for trozo in re.split(r"\n(?=[PRS]-?\d+[a-z]?(?:\s|\.))", cat):
    m = re.match(r"([PRS])-?(\d+[a-z]?)", trozo)
    if m:
        ENTRADA.setdefault(m.group(1) + "-" + m.group(2), norm(trozo))
TEXTOS = {"RGC": norm(open(os.path.join(TXT, "rgc_full.txt"), encoding="utf-8").read()),
          "LSV": norm(open(os.path.join(TXT, "l.txt"), encoding="utf-8").read())}

# ---------- Grupos ----------
# Señales: (código, significado corto, trozo literal de su entrada en el catálogo).
S = "Empareja cada señal con lo que indica."
P = "Empareja cada señal de peligro con lo que avisa."
SENALES = [
    ("int", P, [
        ("P-1a", "Cruce: los que llegan por tu derecha te ceden el paso", "intersección con una vía a la derecha, cuyos usuarios deben ceder el paso"),
        ("P-2", "Cruce con la regla general: prioridad de la derecha", "una intersección en la que rige la regla general de prioridad de paso"),
        ("P-3", "Cruce o tramo regulado por semáforos", "P-3 Semáforos"),
        ("P-4", "Glorieta próxima", "P-4 Glorieta"),
    ], "La cruz (P-2) es la prioridad de la derecha. Si una vía es más gruesa (P-1a), la tuya es la preferente."),
    ("tren", P, [
        ("P-6", "Cruce con una línea de tranvía, que tiene prioridad", "cruce con una línea de tranvía, que tiene prioridad de paso"),
        ("P-7", "Paso a nivel con barreras", "P-7 Paso a nivel con barreras"),
        ("P-8", "Paso a nivel sin barreras", "P-8 Paso a nivel sin barreras"),
        ("P-11", "Paso a nivel sin barreras, ya inmediato", "Peligro por la presencia inmediata de un paso a nivel sin barreras"),
    ], "Valla dibujada: tiene barreras. Tren dibujado: no tiene. El aspa roja y blanca está justo en el paso."),
    ("balizas", "Empareja cada baliza o señal con lo que indica.", [
        ("P-9a", "Paso a nivel, puente móvil o muelle a 200 m", "un puente móvil o un muelle a una distancia de 200 m"),
        ("P-9b", "Paso a nivel, puente móvil o muelle a 150 m", "un puente móvil o un muelle a una distancia de 150 m"),
        ("P-9c", "Paso a nivel, puente móvil o muelle a 100 m", "un puente móvil o un muelle a una distancia de 100 m"),
        ("P-5", "Puente que se puede levantar o girar", "Peligro ante la proximidad de un puente que puede ser levantado"),
    ], "Tres franjas, 200 m; dos, 150 m; una, 100 m. Cada franja que falta son 50 m menos."),
    ("curvas", P, [
        ("P-13a", "Una curva peligrosa hacia la derecha", "Peligro por la proximidad de una curva peligrosa hacia la derecha."),
        ("P-14a", "Varias curvas seguidas; la primera, a la derecha", "siendo la primera de ellas hacia la derecha"),
        ("P-16a", "Bajada con fuerte pendiente", "P-16a Bajada con fuerte pendiente"),
        ("P-16b", "Subida con fuerte pendiente", "P-16b Subida con fuerte pendiente"),
    ], "La cifra de las pendientes dice cuánto inclina el tramo, en porcentaje."),
    ("pavimento", P, [
        ("P-15a", "Resalte en la vía", "Peligro por la proximidad de un resalte en la vía."),
        ("P-15b", "Badén en la vía", "Peligro por la proximidad de un badén en la vía"),
        ("P-19", "Pavimento que puede resbalar", "cuyo pavimento puede resultar deslizante"),
        ("P-28", "Riesgo de que salte gravilla al pasar los coches", "riesgo de que se proyecte gravilla"),
    ], "Resalte: el bulto va hacia arriba. Badén: el hundimiento va hacia abajo."),
    ("estrecho", P, [
        ("P-17", "La calzada se estrecha por los dos lados", "P-17 Estrechamiento de calzada Peligro por la proximidad de una zona de la vía en la que se estrecha la calzada."),
        ("P-17a", "La calzada se estrecha por la derecha", "P-17a Estrechamiento de calzada por la derecha"),
        ("P-17b", "La calzada se estrecha por la izquierda", "P-17b Estrechamiento de calzada por la izquierda"),
        ("P-25", "Tramo con circulación en los dos sentidos", "Peligro por la proximidad de un tramo con circulación en ambos sentidos."),
    ], "Fíjate en qué línea se dobla: ese es el lado por el que se estrecha."),
    ("peatones-ciclos", P, [
        ("P-20b", "Lugar con muchos peatones", "un lugar o tramo con elevado tránsito de peatones"),
        ("P-20c", "Paso para peatones junto a uno para ciclistas", "Peligro por la proximidad de un paso para peatones adosado o compartido con un paso para"),
        ("P-22a", "Paso para ciclistas", "Peligro por la proximidad de uno o varios pasos para ciclistas."),
        ("P-22b", "Tramo con muchos ciclistas circulando", "Peligro por la proximidad de un tramo con circulación frecuente de ciclistas."),
    ], None),
    ("entorno", P, [
        ("P-12", "Aviones a baja altura sobre la vía", "P-12 Aeropuerto"),
        ("P-26", "Desprendimientos: puede haber piedras en la calzada", "zona con desprendimientos frecuentes"),
        ("P-27", "La vía termina en un muelle o en un río", "Peligro debido a que la vía desemboca en un muelle o en una corriente de agua."),
        ("P-29", "Viento fuerte de lado", "P-29 Viento transversal"),
    ], "La manga de viento (P-29) avisa de viento fuerte de lado."),
    ("clima", P, [
        ("P-31", "Tramo donde suele haber atascos", "P-31 Congestión"),
        ("P-32", "Vehículos parados en la calzada por avería o accidente", "hay vehículos que obstruyen la calzada debido a avería, accidente u otras causas"),
        ("P-33", "Tramo con poca visibilidad por niebla, lluvia o humo", "P-33 Visibilidad reducida"),
        ("P-34", "Tramo con hielo o nieve en invierno", "P-34 Presencia de hielo o nieve"),
    ], None),
    ("otros-peligros", P, [
        ("P-18", "Obras", "P-18 Obras Peligro por la proximidad de un tramo de vía en obras."),
        ("P-30", "Desnivel al lado de la vía", "Peligro por la existencia de un desnivel a lo largo de la vía"),
        ("P-35", "Tramo en el que los carriles se cruzan (trenzado)", "P-35 Trenzado"),
        ("P-50", "Otro peligro que no tiene señal propia", "Indica la proximidad de un peligro distinto de los advertidos por otras señales."),
    ], "La exclamación (P-50) se usa para cualquier peligro que no tenga su propia señal."),
    ("incorporaciones", P, [
        ("P-1c", "Se incorpora una vía por la derecha y debe cederte el paso", "Peligro por la proximidad de una incorporación por la derecha de una vía, cuyos usuarios deben ceder el paso."),
        ("P-1e", "Tramo con varios accesos directos que deben ceder el paso", "P-1e Tramo con accesos directos"),
        ("P-21b", "Lugar con personas con dificultades motrices", "P-21b Personas con dificultades motrices"),
        ("P-24a", "Paso de animales en libertad, sobre todo jabalíes", "P-24a Paso de animales en libertad (jabalíes)"),
    ], None),
    ("prioridad", "Empareja cada señal de prioridad con lo que significa.", [
        ("R-3", "Tu calzada tiene prioridad en los cruces", "R3 Calzada con prioridad"),
        ("R-4", "Tu calzada va a dejar de tener prioridad", "la calzada por la que se circula pierde su prioridad respecto a otra calzada"),
        ("R-5", "Paso estrecho: no entres si obligas a parar al que viene", "Prohibición de entrada en un paso estrecho mientras no sea posible atravesarlo sin obligar a los vehículos que circulen en sentido contrario a detenerse."),
        ("R-6", "Paso estrecho: tú tienes prioridad sobre el que viene", "en un próximo paso estrecho, tienen prioridad con relación a los vehículos que circulen en sentido contrario"),
    ], "La flecha roja es la del que cede. En R-5 la roja es la tuya (hacia arriba): esperas. En R-6 es la del otro: pasas tú."),
    ("entrada-motor", "Empareja cada señal de entrada prohibida con a quién se lo prohíbe.", [
        ("R-103", "Vehículos de motor, salvo motos de dos ruedas", "R-103 Entrada prohibida a vehículos de motor, excepto motocicletas de dos ruedas"),
        ("R-104", "Motocicletas", "R-104 Entrada prohibida a motocicletas"),
        ("R-105", "Ciclomotores", "R-105 Entrada prohibida a ciclomotores"),
        ("R-111", "Tractores y máquinas agrícolas", "Prohibición de acceso a tractores y otras máquinas agrícolas autopropulsadas"),
    ], None),
    ("entrada-mercancias", "Empareja cada señal de entrada prohibida con a quién se lo prohíbe.", [
        ("R-106", "Vehículos de mercancías, pesen lo que pesen", "R-106 Entrada prohibida a vehículos destinados al transporte de mercancías"),
        ("R-107", "Vehículos de mercancías de más masa que la indicada", "con mayor masa autorizada que la indicada"),
        ("R-112", "Vehículos con remolque, salvo los de un solo eje", "R-112 Entrada prohibida a vehículos de motor con remolque exceptuando los de un solo eje"),
        ("R-120", "Vehículos según su distintivo ambiental", "Prohibición de acceso a vehículos en función de su distintivo ambiental"),
    ], "Si el camión lleva una cifra en toneladas (R-107), solo se prohíbe a los que pasen de esa masa."),
    ("entrada-peligrosas", "Empareja cada señal de entrada prohibida con a quién se lo prohíbe.", [
        ("R-108", "Vehículos con mercancías peligrosas", "R-108 Entrada prohibida a vehículos que transporten mercancías peligrosas"),
        ("R-109", "Vehículos con mercancías explosivas o inflamables", "R-109 Entrada prohibida a vehículos que transporten mercancías explosivas o inflamables"),
        ("R-110", "Vehículos con productos que contaminan el agua", "R-110 Entrada prohibida a vehículos que transporten productos contaminantes del agua"),
    ], None),
    ("entrada-sin-motor", "Empareja cada señal de entrada prohibida con a quién se lo prohíbe.", [
        ("R-113", "Vehículos de tracción animal (carros)", "R-113 Entrada prohibida a vehículos de tracción animal"),
        ("R-115", "Carros de mano", "R-115 Entrada prohibida a carros de mano"),
        ("R-116", "Peatones", "R-116 Entrada prohibida a peatones"),
        ("R-117", "Animales de montura (jinetes)", "R-117 Entrada prohibida a animales de montura"),
    ], None),
    ("entrada-ciclos", "Empareja cada señal con lo que indica.", [
        ("R-114", "Prohibida la entrada a bicicletas (ciclos)", "R-114 Entrada prohibida a ciclos"),
        ("R-118", "Prohibida la entrada a patinetes eléctricos (VMP)", "R-118 Entrada prohibida a vehículos de movilidad personal"),
        ("R-119", "Prohibida la entrada a ciclos y a VMP", "Prohibición de acceso a ciclos y a vehículos de movilid"),
        ("R-422", "Ciclistas: bajad de la bici y seguid a pie", "Obligación para los usuarios de ciclos de continuar a pie."),
    ], "Borde rojo: prohibido entrar. Fondo azul: obligación."),
    ("medidas", "Empareja cada señal con lo que limita.", [
        ("R-201", "Masa total del vehículo cargado", "R-201 Limitación de masa"),
        ("R-203", "Longitud, incluida la carga", "R-203 Limitación de longitud"),
        ("R-204", "Anchura, incluida la carga", "R-204 Limitación de anchura"),
        ("R-205", "Altura, incluida la carga", "R-205 Limitación de altura"),
    ], "Mira hacia dónde apuntan las flechas: arriba y abajo, altura; a los lados, anchura."),
    ("restricciones", S, [
        ("R-200", "Para obligatoriamente: aduana, policía o peaje", "R-200 Prohibición de pasar sin detenerse"),
        ("R-300", "Guarda al menos esa distancia con el de delante", "R-300 Separación mínima"),
        ("R-301", "No pases de esa velocidad", "R-301 Velocidad máxima"),
        ("R-411", "Circula al menos a esa velocidad", "R-411 Velocidad mínima"),
    ], "Disco blanco con borde rojo: máximo. Disco azul: mínimo."),
    ("giros", S, [
        ("R-302", "Prohibido girar a la derecha", "R-302 Giro a la derecha prohibido"),
        ("R-303", "Prohibido girar a la izquierda y cambiar de sentido", "Prohibición de girar a la izquierda. Incluye, también, la prohibición del cambio de sentido de marcha."),
        ("R-304", "Prohibido cambiar de sentido", "R-304 Cambio de sentido prohibido"),
        ("R-403a", "Solo puedes seguir recto o girar a la derecha", "Las flechas señalan las únicas direcciones y sentidos que los vehículos pueden tomar."),
    ], "Si está prohibido girar a la izquierda (R-303), también lo está cambiar de sentido."),
    ("estacionar", S, [
        ("R-308c", "No estaciones del día 1 al 15 del mes", "Estacionamiento prohibido la primera quincena"),
        ("R-308d", "No estaciones del día 16 al final del mes", "Estacionamiento prohibido la segunda quincena"),
        ("R-308e", "No estaciones delante del vado", "Prohíbe el estacionamiento delante de un vado."),
        ("R-309", "Estacionamiento limitado: indica a qué hora llegas", "Zona de estacionamiento de duración limitada y obligación para el conductor de indicar"),
    ], "Los números dicen los días: 1-15 o 16-31. El cambio es a las 9 de la mañana."),
    ("adelantar", S, [
        ("R-305", "Prohibido adelantar a vehículos de motor", "indica la prohibición a todos los vehículos de adelantar a los vehículos a motor"),
        ("R-306", "Los camiones de más de 3.500 kg no pueden adelantar", "Prohibición a los camiones cuya masa máxima autorizada exceda de 3.500 kilogramos de adelantar"),
        ("R-502", "Se acaba la prohibición de adelantar", "R-502 Fin de la prohibición de adelantamiento"),
        ("R-503", "Los camiones ya pueden volver a adelantar", "R-503 Fin de la prohibición de adelantamiento para camiones"),
    ], "Si el vehículo rojo es un camión (R-306), solo afecta a camiones de más de 3.500 kg. Blanca y tachada: se acaba."),
    ("sentidos", "Empareja cada señal de obligación con lo que te obliga a hacer.", [
        ("R-400c", "Solo puedes seguir recto", "La flecha señala la dirección y sentido que los vehículos tienen la obligación de seguir."),
        ("R-400e", "Tienes que girar a la izquierda", "R-400e Sentido obligatorio"),
        ("R-403b", "Solo puedes seguir recto o girar a la izquierda", "R-403b || Únicas direcciones y sentidos permitidos"),
        ("R-401c", "Pasa el obstáculo por cualquiera de sus dos lados", "Las flechas señalan los lados del refugio, de la isleta o del obstáculo por uno de los cuales"),
    ], "Una flecha: es obligatoria. Varias flechas: son las únicas opciones."),
    ("calzadas", "Empareja cada señal de obligación con a quién obliga.", [
        ("R-404", "Automóviles, salvo motos de dos ruedas", "R-404 Calzada obligatoria para automóviles, excepto motocicletas de dos ruedas"),
        ("R-405", "Motocicletas de dos ruedas", "R-405 Calzada obligatoria para motocicletas de dos ruedas"),
        ("R-406", "Camiones y furgonetas, pesen lo que pesen", "independientemente de su masa, de circular por la calzada"),
        ("R-407b", "Ciclomotores", "R-407b Vía reservada y obligatoria para ciclomotores"),
    ], None),
    ("caminos", "Empareja cada señal de obligación con a quién obliga.", [
        ("R-408", "Carros de tracción animal", "R-408 Camino obligatorio para vehículos de tracción animal"),
        ("R-409", "Jinetes con sus animales", "R-409 Camino reservado y obligatorio para animales de montura"),
        ("R-410", "Peatones", "R-410 Camino reservado y obligatorio para peatones"),
        ("R-419", "Tractores", "R-419 Camino obligatorio para tractores"),
    ], None),
    ("equipamiento", S, [
        ("R-412", "No sigas sin cadenas u otro antideslizante autorizado", "Obligación de no proseguir la marcha sin cadenas para nieve u otros dispositivos antideslizantes"),
        ("R-412b", "No sigas sin neumáticos de invierno", "Obligación de no proseguir la marcha sin neumáticos especiales de invierno"),
        ("R-413", "Lleva encendida al menos la luz de cruce", "R-413 Alumbrado de corto alcance"),
        ("R-417", "Recuerda que hay que usar el cinturón", "Recuerda la obligación de utilizar el cinturón de seguridad."),
    ], None),
    ("calzadas-mercancias", "Empareja cada señal de obligación con a quién obliga.", [
        ("R-414", "Vehículos con mercancías peligrosas", "R-414 — | Calzada obligatoria para vehículos que transporten mercancías peligrosas"),
        ("R-415", "Vehículos con productos que contaminan el agua", "R-415 Calzada obligatoria para vehículos que transporten productos contaminantes del agua"),
        ("R-416", "Vehículos con mercancías explosivas o inflamables", "mercancías explosivas O fácilmente inflamables"),
        ("R-418", "Vehículos con telepeaje que funcione", "R-418 Vía exclusiva para vehículos dotados de equipo de telepeaje operativo."),
    ], "Son las mismas que las de entrada prohibida, pero en azul: aquí te obligan a ir por esa calzada."),
    ("bicis-vmp", S, [
        ("R-407a", "Vía obligatoria para ciclos: tienen que ir por ella", "R-407a Vía reservada y obligatoria para ciclos"),
        ("R-420", "Vía obligatoria para patinetes eléctricos (VMP)", "R-420 — || Vía reservada y obligatoria para vehículos de movilidad personal"),
        ("R-421", "Vía obligatoria para ciclos y VMP", "R-421 — || Vía reservada y obligatoria para ciclos y para vehículos de movilidad personal"),
        ("S-35", "Vía para ciclos, prohibida a los demás", "Indica la existencia de una vía destinada a la circulación de ciclos y prohibición a los demás usuarios de la vía de utilizarla."),
    ], "Las redondas azules obligan a usar esa vía. La cuadrada (S-35) informa de que la vía es para ciclos."),
    ("fin-obligaciones", "Empareja cada señal con lo que se acaba.", [
        ("R-504", "La zona de estacionamiento limitado", "R-504 Fin de zona de estacionamiento limitado."),
        ("R-505", "La vía obligatoria para ciclos", "R-505 Fin de vía reservada y obligatoria para ciclos."),
        ("R-506", "La velocidad mínima", "R-506 Fin de velocidad mínima"),
        ("R-509", "La calzada obligatoria para camiones y furgonetas", "R-509 Fin de calzada obligatoria para camiones, tractocamiones y furgones o furgonetas"),
    ], "La franja que cruza la señal indica que lo anterior se acaba."),
    ("tipos-via", "Empareja cada señal con el tipo de vía que empieza.", [
        ("S-1", "Autopista", "Indica el principio de una autopista"),
        ("S-1b", "Carretera multicarril", "Indica el principio de una carretera multicarril"),
        ("S-1c", "Carretera 2+1: el carril central sirve para adelantar", "El carril central se destina a facilitar la maniobra de adelantamiento"),
        ("S-5", "Túnel o paso inferior", "Indica el principio y eventualmente el nombre de un túnel, de un paso inferior"),
    ], None),
    ("sentido-unico", S, [
        ("S-11", "Calle de sentido único", "S-11 Calzada de un carril de sentido único"),
        ("S-15a", "Calle sin salida", "S-15a Calzada sin salida"),
        ("S-22", "Cambio de sentido al mismo nivel", "Indica la proximidad de un lugar en el que se puede efectuar un cambio de sentido al mismo nivel."),
        ("S-25", "Salida para cambiar de sentido a distinto nivel", "Indica la proximidad de una salida a través de la cual se puede efectuar un cambio de sentido a distinto nivel."),
    ], None),
    ("zonas", S, [
        ("S-28", "Zona de estancia y juego: máximo 10 km/h", "la velocidad máxima de los vehículos está fijada en 10 kilómetros por hora"),
        ("S-30a", "Zona peatonal", "Indica una zona reservada para el uso peatonal."),
        ("S-47", "Zona de coexistencia: máximo 20 km/h", "la velocidad máxima de los vehículos será de 20 kmíh"),
        ("S-49", "Zona de espera delante del semáforo para motos o bicis", "Indica la existencia de una zona de espera previa a la línea de detención"),
    ], "Con niños jugando (S-28), 10 km/h. Coexistencia (S-47), 20 km/h. En las dos, el peatón tiene prioridad."),
    ("pasos", S, [
        ("S-13", "Paso para peatones", "S-13 Situación de un paso para peatones"),
        ("S-33", "Senda para peatones y bicis, lejos del tráfico", "S-33 Senda ciclopeatonal"),
        ("S-45", "Paso para ciclistas", "S-45 Situación de un paso para ciclistas"),
        ("S-46", "Paso para peatones junto a uno para ciclistas", "S-46 Situación de un paso para peatones y ciclistas"),
    ], "Las cuadradas azules dicen dónde está el paso. Las triangulares (P-20a, P-22a) avisan antes de que llegues."),
    ("seguridad", S, [
        ("S-7", "Velocidad que se aconseja no superar", "S-7 Velocidad máxima aconsejada"),
        ("S-16", "Zona de frenado si te fallan los frenos", "S-16 Zona de frenado de emergencia"),
        ("S-34", "Apartadero para emergencias", "S-34 Apartadero"),
        ("S-26a", "La próxima salida está a unos 300 m", "que la próxima salida Za está situada aproximadamente a 300 m"),
    ], "Velocidad en cuadrado azul: solo es un consejo. En círculo rojo: es obligatoria."),
    ("parar", S, [
        ("S-17", "Lugar donde se puede estacionar", "S-17 Estacionamiento Indica el lugar donde está autorizado el estacionamiento de vehículos."),
        ("S-17a", "Estacionamiento solo para un fin, como ir a la farmacia", "S-17a Estacionamiento de necesidad"),
        ("S-18", "Lugar reservado para taxis", "S-18 Lugar reservado para taxis"),
        ("S-19", "Parada de autobuses", "S-19 Parada de autobuses"),
    ], None),
    ("carriles", S, [
        ("S-51a", "Carril solo para ciertos vehículos (bus, taxi…)", "S-51a Carril reservado para tipos específicos de vehículos"),
        ("S-51b", "Carril para vehículos con varios ocupantes (VAO)", "S-51b Carril reservado para vehículos con alta ocupación (VAO)"),
        ("S-52", "Se acaba el carril derecho: cámbiate", "la desaparición del carril derecho y el cambio de carril preciso"),
        ("S-53", "Se pasa de uno a dos carriles", "S-53 Paso de uno a dos carriles de circulación"),
    ], None),
    ("servicios", S, [
        ("S-100", "Puesto de socorro", "S-100 Puesto de socorro"),
        ("S-101", "Base de ambulancia", "S-101 Base de ambulancia"),
        ("S-102", "Estación de ITV", "S-102 Servicio de inspección técnica de vehículos"),
        ("S-103", "Taller de reparación", "S-103 Taller de reparación"),
    ], None),
    ("surtidores", S, [
        ("S-105", "Gasolinera", "S-105 Surtidor de carburante"),
        ("S-105c", "Surtidor de gas (GLP)", "S-105c Surtidor de GLP"),
        ("S-105d", "Gasolinera con recarga eléctrica", "S-105d Surtidor de carburante y estación de recarga eléctrica"),
        ("S-123", "Área de descanso", "S-123 Área de descanso"),
    ], None),
    ("controles", S, [
        ("S-991a", "Control de velocidad (radar)", "Indica la existencia de un dispositivo de control de velocidad en un punto o tramo de una carretera convencional"),
        ("S-991c", "Control de saltarse el semáforo en rojo", "Indica la existencia de un dispositivo de control de paso con semáforo en rojo."),
        ("S-991e", "Control de la distancia con el de delante", "S-991e Control de separación mínima en carretera convencional"),
        ("S-991g", "Control de velocidad desde helicóptero o dron", "S-991g Control de velocidad mediante medios aéreos"),
    ], None),
    ("paneles", "Empareja cada panel complementario con lo que indica.", [
        ("S-890a", "La señal de encima vale solo cuando hay nieve", "que esta se aplica únicamente cuando se den circunstancias de nieve"),
        ("S-890b", "La señal de encima vale solo cuando llueve", "que esta se aplica únicamente cuando se den circunstancias de lluvia"),
        ("S-891", "Distancia lateral al adelantar a ciclos o ciclomotores", "S-891 Distancia lateral en adelantamiento a ciclo o ciclomotor"),
        ("S-892", "Se vigila con medios automáticos que denuncian", "S-892 Vigilancia por medios automáticos"),
    ], None),
]

# Marcas viales (imágenes en perspectiva de img/marcas-vista; texto del anexo I del RGC).
MARCAS = [
    ("marcas-amarillas", [
        ("M-7.7", "Prohibido estacionar en ese lado", "● Marca longitudinal discontinua de prohibición de estacionamiento (M-7.7): indica la prohibición del estacionamiento a lo largo de toda su longitud en el lado de la calzada donde esté situada."),
        ("M-7.8", "Prohibido parar y estacionar en ese lado", "● Marca longitudinal continua de prohibición de parada (M-7.8): indica la prohibición de la parada y del estacionamiento a lo largo de toda su longitud"),
        ("M-7.9", "Prohibido estacionar: reservado para bus o carga y descarga", "● Marca en zigzag (M-7.9): indica el lugar de la calzada en que el estacionamiento está prohibido a los vehículos en general"),
        ("M-7.10", "No entres en el cruce si te vas a quedar parado dentro", "● Cuadrícula (M-7.10): recuerda la prohibición de penetrar en una intersección"),
    ], "Amarilla discontinua: no estaciones. Amarilla continua: ni pares ni estaciones.", "Empareja cada marca amarilla con lo que significa."),
    ("marcas-otras", [
        ("M-7.11", "Empieza una zona de frenado de emergencia", "– Marca de acceso a un lecho de frenado (M-7.11): damero formado por cuadrados de colores blanco y rojo que indica el lugar donde empieza una zona de frenado de emergencia"),
        ("M-7.12", "Referencia para guardar distancia con el de delante", "– Marca de separación de seguridad entre vehículos (M-7.12): facilita, sirviendo como referencia, el mantenimiento de la separación mínima"),
        ("M-7.5", "Se acerca un paso a nivel", "– Marca de paso a nivel (M-7.5): indica la proximidad de un paso a nivel"),
        ("M-7.6", "Empieza un carril reservado (bus, taxi…)", "– Marca de comienzo de carril reservado (M-7.6): indica el comienzo de un carril reservado a determinados vehículos"),
    ], None, "Empareja cada marca vial con lo que indica."),
    ("marcas-avisos", [
        ("M-8.1", "Llegas a una travesía o calle: reduce mucho la velocidad", "● Dientes de dragón (M-8.1): advierten de la aproximación a una travesía o vía urbana"),
        ("M-8.2", "Se acerca un paso para peatones o ciclistas", "● Líneas de borde quebradas (M-8.2): advierten de la aproximación a un paso para peatones o para ciclistas"),
        ("M-4.5", "Reductor de velocidad (lomo de asno)", "– Marca de reductor de velocidad tipo «lomo de asno» (M-4.5): la presencia de un reductor de velocidad tipo «lomo de asno» se advertirá mediante tres triángulos"),
        ("M-5.5", "Viene una línea continua: no empieces a adelantar", "– Flecha de retorno (M-5.5): anuncia la proximidad de una línea continua"),
    ], "La flecha de retorno (M-5.5) te pide volver a tu carril: si ya estás adelantando, termina cuanto antes.", "Empareja cada marca vial con lo que te avisa."),
    ("marcas-carriles", [
        ("M-1.4", "Carril reversible: su sentido puede cambiar", "Delimitan por ambos lados los carriles reversibles"),
        ("M-5.4b", "Tu carril se acaba: déjalo hacia donde marca", "– Flecha de fin de carril (M-5.4): indica que el carril en que está situada termina próximamente"),
        ("M-5.8", "Miniglorieta y el sentido de giro", "– Flechas en miniglorietas (M-5.8 y M-5.9): indican la existencia de una glorieta de radio reducido"),
        ("M-7.1a", "Cebreado: no entres en esa zona", "Una zona marcada por franjas oblicuas paralelas enmarcadas en una línea continua significa que ningún conductor debe entrar con su vehículo o animal en ella"),
    ], "Doble línea discontinua a los dos lados: el carril es reversible y lo regulan semáforos de carril.", "Empareja cada marca vial con lo que indica."),
]

# Otros: casillas de texto o de semáforo, con su trozo literal de la norma.
OTROS = [
    {"id": "velocidad-fuera-poblado", "materia": 1, "enunciado": "Empareja cada caso con su velocidad máxima fuera de poblado.",
     "norma": "RGC", "articulo": "48.1", "url": URL_RGC + "#a48",
     "parejas": [("Turismo por autovía", "120 km/h", "Autopista y 120 90 100"),
                 ("Turismo por carretera convencional", "90 km/h", "Convencional 90 80 90"),
                 ("Camión por carretera convencional", "80 km/h", "Camiones, tractocamiones,"),
                 ("Ciclomotor", "45 km/h", "e) Para ciclos, ciclomotores de dos y tres ruedas y cuadriciclos ligeros: 45 kilómetros por hora.")],
     "comprobar_layout": ["Autopista y\n                               120                                90                         100", "Convencional                 90                                 80                          90"],
     "truco": "Turismo: 120 en autovía y 90 en convencional. Camión: 10 menos en convencional (80).",
     "porque": "Fuera de poblado, el turismo puede ir a 120 km/h por autopista y autovía y a 90 por carretera convencional; el camión, a 80 por convencional. Los ciclomotores tienen un máximo de 45 km/h."},
    {"id": "velocidad-poblado", "materia": 1, "enunciado": "Empareja cada vía urbana con su velocidad máxima.",
     "norma": "RGC", "articulo": "50", "url": URL_RGC + "#a50",
     "parejas": [("Calle con calzada y acera al mismo nivel", "20 km/h", "a) 20 km/h en vías que dispongan de plataforma única de calzada y acera."),
                 ("Calle con un carril por sentido", "30 km/h", "b) 30 km/h en vías de un único carril por sentido de circulación."),
                 ("Calle con dos o más carriles por sentido", "50 km/h", "c) 50 km/h en vías de dos o más carriles por sentido de circulación."),
                 ("Autovía dentro de poblado", "80 km/h", "6. El límite genérico de velocidad en autopistas y autovías que transcurren dentro de poblado será de 80 km/h")],
     "truco": "En ciudad, 20, 30 y 50 según cuántos carriles haya: plataforma única, uno por sentido, dos o más.",
     "porque": "En vías urbanas el límite es 20 km/h si calzada y acera están al mismo nivel, 30 si hay un carril por sentido y 50 si hay dos o más. Las autovías que pasan por un poblado tienen un límite de 80."},
    {"id": "puntos-permiso", "materia": 10, "enunciado": "Empareja cada caso con sus puntos del permiso.",
     "norma": "LSV", "articulo": "63", "url": URL_LSV + "#a63",
     "parejas": [("Saldo inicial de un permiso nuevo", "8 puntos", "Excepcionalmente se asignará un crédito inicial de ocho puntos"),
                 ("Saldo inicial general", "12 puntos", "se le asignará un crédito inicial de doce puntos."),
                 ("Máximo con las bonificaciones", "15 puntos", "pudiendo llegar a acumular hasta un máximo de quince puntos en lugar de los doce iniciales.")],
     "truco": "Empiezas con 8. Llegas a 12 y, sin sanciones, puedes subir hasta 15.",
     "porque": "Quien tiene el permiso desde hace tres años o menos parte de 8 puntos; el resto, de 12. Sin sanciones se ganan puntos de bonificación hasta un máximo de 15."},
    {"id": "luces-cuando", "materia": 6, "enunciado": "Empareja cada luz con cuándo se usa.",
     "norma": "RGC", "articulo": "100, 101 y 106", "url": URL_RGC + "#a100",
     "parejas": [("Luz de largo alcance (carretera)", "De noche, fuera de poblado y en vía sin iluminar", "que circule a más de 40 kilómetros por hora, entre el ocaso y la salida del sol, fuera de poblado, por vías insuficientemente iluminadas"),
                 ("Luz de corto alcance (cruce)", "De noche, en una vía bien iluminada", "entre el ocaso y la salida del sol por vías urbanas o interurbanas suficientemente iluminadas"),
                 ("Antiniebla delantera", "Con niebla o en vías estrechas con muchas curvas", "La luz antiniebla delantera solo podrá utilizarse en dichos casos o en tramos de vías estrechas con muchas curvas"),
                 ("Antiniebla trasera", "Solo con niebla espesa, lluvia muy intensa o fuerte nevada", "La luz antiniebla trasera solamente deberá llevarse encendida cuando las condiciones meteorológicas o ambientales sean especialmente desfavorables, como en caso de niebla espesa, lluvia muy intensa, fuerte nevada")],
     "truco": "La antiniebla trasera deslumbra al de atrás: solo cuando de verdad no se ve.",
     "porque": "La luz de carretera se lleva de noche fuera de poblado por vías sin iluminar (a más de 40 km/h, sin deslumbrar). La de cruce, de noche en vías bien iluminadas. La antiniebla delantera, con niebla y parecidos o en vías estrechas con muchas curvas; la trasera, solo con niebla espesa, lluvia muy intensa o fuerte nevada."},
    {"id": "semaforos-especiales", "materia": 1, "enunciado": "Empareja cada luz con lo que significa.",
     "norma": "RGC", "articulo": "Anexo I, semáforos", "url": URL_RGC + "#ani",
     "parejas": [({"luz": "roja", "intermitente": True, "texto": "Roja intermitente"}, "Prohibido pasar un momento: tren, puente móvil, bomberos…", "b) Una luz roja intermitente, o dos luces rojas alternativamente intermitentes, prohíben temporalmente el paso"),
                 ({"img": "img/fotos-boe/semaforo-flecha-verde.jpg", "texto": "Flecha verde"}, "Puedes ir hacia la flecha, aunque haya otra luz", "significa que los vehículos pueden tomar la dirección y sentido indicados por aquella, cualquiera que sea la luz que esté simultáneamente encendida"),
                 ({"img": "img/fotos-boe/semaforo-flecha-negra.jpg", "texto": "Flecha negra sobre luz"}, "La luz solo vale para el giro de la flecha", "f) Una flecha negra sobre una luz roja no intermitente o sobre una luz amarilla no cambia el significado de dichas luces, pero lo limita exclusivamente al movimiento indicado por la flecha."),
                 ("Peatón verde parpadeando", "Al peatón se le acaba el tiempo para cruzar", "Cuando dicha luz pase a intermitente, significa que el tiempo de que aún disponen para terminar de atravesar la calzada está a punto de finalizar")],
     "truco": "Flecha verde: pasas. Flecha negra: la luz de debajo manda, pero solo para ese giro.",
     "porque": "La roja intermitente prohíbe pasar mientras dura (pasos a nivel, puentes móviles, salida de bomberos, aviones bajos). La flecha verde deja ir en su dirección sea cual sea la otra luz. La flecha negra limita la luz roja o ámbar a ese movimiento. El peatón verde intermitente avisa de que se acaba su tiempo."},
    {"id": "semaforos-carril", "materia": 1, "enunciado": "Empareja cada luz del semáforo de carril con lo que indica.",
     "norma": "RGC", "articulo": "Anexo I, semáforos de carril", "url": URL_RGC + "#ani",
     "parejas": [("Aspa roja", "No puedes ir por ese carril: déjalo cuanto antes", "a) Una luz roja en forma de aspa determina la prohibición de ocupar el carril indicado. Los conductores de los vehículos que circulen por este carril deberán abandonarlo en el tiempo más breve posible."),
                 ("Flecha verde hacia abajo", "Puedes circular por ese carril", "b) Una luz verde en forma de flecha apuntada hacia abajo indica que está permitido circular por el carril correspondiente."),
                 ({"img": "img/fotos-boe/semaforo-carril-flecha-oblicua.jpg", "texto": "Flecha oblicua"}, "El carril se cierra: cámbiate hacia donde apunta", "apuntada hacia abajo en forma oblicua, indica a los usuarios del carril correspondiente la necesidad de irse incorporando en condiciones de seguridad al carril hacia el que apunta la flecha")],
     "truco": "Son semáforos cuadrados encima de cada carril: solo afectan al carril que tienen debajo.",
     "porque": "En los semáforos de carril, el aspa roja prohíbe ocupar ese carril y obliga a dejarlo cuanto antes; la flecha verde hacia abajo permite circular por él, y la flecha blanca o amarilla oblicua avisa de que el carril va a cerrarse y hay que pasarse al que señala."},
]

# ---------- Construcción y comprobaciones ----------
salida, errores = [], []
def revisar_casillas(id_, parejas):
    der = [p[1] for p in parejas]
    if len(set(x.lower() for x in der)) != len(der): errores.append(f"{id_}: significados repetidos")
    for t in der:
        if len(t) > 70: errores.append(f"{id_}: casilla de {len(t)} caracteres: {t}")
    if not 3 <= len(parejas) <= 4: errores.append(f"{id_}: {len(parejas)} parejas")

usadas = {}
for clave, enunciado, parejas, truco in SENALES:
    revisar_casillas(clave, parejas)
    for cod, texto, cita in parejas:
        if cod in usadas: errores.append(f"{cod} repetida en {usadas[cod]} y {clave}")
        usadas[cod] = clave
        if not os.path.exists(os.path.join(AQUI, "..", "..", "img", "senales", cod + ".png")): errores.append(f"{cod}: sin imagen")
        if norm(cita) not in ENTRADA.get(cod, ""): errores.append(f"{cod}: la cita no está en su entrada del catálogo: {cita[:60]}")
    cods = [p[0] for p in parejas]
    salida.append({"id": "emparejar-" + clave, "tipo": "emparejar", "materia": 1, "enunciado": enunciado,
                   "parejas": [[{"senal": c}, t] for c, t, _ in parejas],
                   "porque": " ".join(f"{c}, {t[0].lower() + t[1:]}." for c, t, _ in parejas),
                   "truco": truco,
                   "fuente": {"norma": "RGC_CATALOGO", "articulo": "Anexo I, catálogo de señales, " + ", ".join(cods[:-1]) + " y " + cods[-1],
                              "url": URL_RGC + "#ani", "cita": " | ".join(c for _, _, c in parejas), "comprobar": [c for _, _, c in parejas]}})

for clave, parejas, truco, enunciado in MARCAS:
    revisar_casillas(clave, parejas)
    for cod, texto, cita in parejas:
        if not os.path.exists(os.path.join(AQUI, "..", "..", "img", "marcas-vista", cod + ".jpg")): errores.append(f"{cod}: sin imagen")
        if norm(cita) not in TEXTOS["RGC"]: errores.append(f"{cod}: cita no encontrada: {cita[:60]}")
    cods = [p[0] for p in parejas]
    salida.append({"id": "emparejar-" + clave, "tipo": "emparejar", "materia": 1, "enunciado": enunciado,
                   "parejas": [[{"img": f"img/marcas-vista/{c}.jpg", "texto": c}, t] for c, t, _ in parejas],
                   "porque": " ".join(f"{c}, {t[0].lower() + t[1:]}." for c, t, _ in parejas),
                   "truco": truco,
                   "fuente": {"norma": "RGC", "articulo": "Anexo I, marcas viales " + ", ".join(cods[:-1]) + " y " + cods[-1],
                              "url": URL_RGC + "#ani", "cita": " | ".join(c for _, _, c in parejas), "comprobar": [c for _, _, c in parejas]}})

for o in OTROS:
    revisar_casillas(o["id"], o["parejas"])
    citas = o.get("comprobar_layout") or [c for _, _, c in o["parejas"]]
    texto_norma = TEXTOS[o["norma"]]
    if o["norma"] == "RGC": texto_norma += " " + norm(open(os.path.join(TXT, "rgc_full_layout.txt"), encoding="utf-8").read())
    for c in [c for _, _, c in o["parejas"]] + citas:
        if norm(c) not in texto_norma: errores.append(f"{o['id']}: cita no encontrada: {c[:60]}")
    salida.append({"id": "emparejar-" + o["id"], "tipo": "emparejar", "materia": o["materia"], "enunciado": o["enunciado"],
                   "parejas": [[i, d] for i, d, _ in o["parejas"]], "porque": o["porque"], "truco": o["truco"],
                   "fuente": {"norma": o["norma"], "articulo": o["articulo"], "url": o["url"],
                              "cita": " | ".join(c for _, _, c in o["parejas"]),
                              "comprobar": list(dict.fromkeys([c for _, _, c in o["parejas"] if norm(c) in TEXTOS[o["norma"]]] + citas))}})

ids = [e["id"] for e in salida]
if len(set(ids)) != len(ids): errores.append("ids repetidos")
if errores:
    print("\n".join(errores)); sys.exit(1)
with open(os.path.join(AQUI, "datos-emparejar.js"), "w", encoding="utf-8") as f:
    f.write("// Generado por generar_emparejar.py; no editar a mano.\n// Empareja: señales por familias, marcas viales, velocidades, puntos, luces y semáforos.\n")
    f.write("window.EJERCICIOS.push(\n" + ",\n".join(json.dumps(e, ensure_ascii=False) for e in salida) + "\n);\n")
print("datos-emparejar.js:", len(salida), "ejercicios de emparejar,", sum(len(e["parejas"]) for e in salida), "parejas")
