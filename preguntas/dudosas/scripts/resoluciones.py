#!/usr/bin/env python3
"""Veredicto de cada afirmación dudosa del vídeo y lista de erratas para Denisse.

Uso: python3 -I resoluciones.py
Lee:    ../../revision-piloto-video1.json, ../../revision-video1-cap09-38.json, ../../banco-dudosas-video1.json
Escribe: ../resoluciones-video1.json y ../erratas-video1.md
"""
import json, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
PREG = os.path.join(AQUI, "..", "..")
OUTD = os.path.join(AQUI, "..")

# veredicto: error | matiz | correcta | no_norma | sin_fuente | pendiente
# (veredicto, lo correcto explicado para Denisse, fuente, preguntas existentes de otros bancos que ya lo cubren)
V = {
 # ---------------- capítulos 1-8 ----------------
 "rev-0001": ("error", "La tara incluye el depósito de combustible lleno, el agua, el lubricante, los repuestos y las herramientas. Lo que no incluye son personas ni carga.", "Ley de Tráfico, anexo I.35", ["def-0009"]),
 "rev-0002": ("error", "La masa en orden de marcha es la tara (con el depósito lleno) más 75 kg del conductor. No es «lo mínimo para circular con un poco de carburante».", "Reglamento General de Vehículos, anexo IX.1.2", []),
 "rev-0003": ("correcta", "Furgoneta y camión llevan mercancías y como máximo 9 plazas; en la furgoneta la cabina va integrada en la carrocería. El derivado de turismo conserva la carrocería del turismo y tiene una sola fila de asientos.", "Reglamento General de Vehículos, anexo II", []),
 "rev-0004": ("matiz", "Los patinetes eléctricos (VMP) sí tienen motor, pero la norma no los considera «vehículos a motor». Decir que son «de no motor» confunde.", "Reglamento General de Vehículos, anexo II; manual DGT, tema 1", []),
 "rev-0005": ("correcta", "Los ciclomotores llevan matrícula de fondo amarillo. Los remolques, de fondo rojo.", "Reglamento General de Vehículos, anexo XVIII", []),
 "rev-0006": ("no_norma", "La ley no fija un número mínimo de carriles para autopistas y autovías. Lo que exige es que tengan calzadas separadas para cada sentido. No conviene preguntarlo.", "Ley de Tráfico, anexo I.66 y 67", ["via-0003"]),
 "rev-0007": ("correcta", "Peatones y animales no pueden circular por autopistas ni autovías (los peatones, salvo emergencia). Tampoco se puede hacer autostop, ni siquiera en los peajes.", "Reglamento General de Circulación, arts. 125 y 128", []),
 "rev-0008": ("error", "Quien va en silla de ruedas al paso es peatón, y los peatones van por el arcén izquierdo. Ninguna norma manda a las sillas de ruedas por la derecha.", "Ley de Tráfico, anexo I.4; Reglamento General de Circulación, art. 122", ["def-0001"]),
 "rev-0009": ("matiz", "La norma no exige un chaleco: exige al menos un elemento luminoso o reflectante visible a 150 metros (en vía interurbana, de noche o con poca visibilidad).", "Reglamento General de Circulación, art. 123.1", ["arc-0004"]),
 "rev-0010": ("correcta", "Con nieve, en autopistas y autovías, se va por el carril derecho y, si hay tres o más carriles, también por el de al lado.", "Reglamento General de Circulación, art. 32.2", ["arc-0013"]),
 "rev-0011": ("error", "Las motos pueden usar el VAO, pero tienen que cumplir el número mínimo de ocupantes como los turismos. Solo se libran los vehículos con la señal V-15 o la tarjeta de discapacidad y los autobuses de más de 3.500 kg.", "Reglamento General de Circulación, art. 35.2; manual DGT, tema 9", ["cesp-0007", "cesp-0008"]),
 "rev-0012": ("sin_fuente", "La norma del carril adicional no dice qué vehículos pueden usarlo y remite «en lo que sea aplicable» a la del carril en sentido contrario (que solo deja a motos y turismos). No está claro. Mejor no darlo como seguro.", "Reglamento General de Circulación, arts. 41 y 42", ["cesp-0004"]),
 "rev-0013": ("matiz", "Los del carril contiguo solo van entre 60 y 80 km/h si les queda un único carril en su sentido. Si tienen más, van a los límites normales. En los dos casos, con luz de cruce.", "Reglamento General de Circulación, art. 41.1", []),
 "rev-0014": ("correcta", "Los 2 o 3 segundos son un consejo del manual de la DGT (y un segundo más con lluvia o de noche). La norma no habla de segundos: exige poder frenar sin chocar.", "Manual DGT, tema 17; Reglamento General de Circulación, art. 54.1", []),
 "rev-0015": ("error", "Lo de 1,5 metros y bajar 20 km/h es para un vehículo inmovilizado que ocupa la calzada en tu carril, no para uno parado en el arcén.", "Reglamento General de Circulación, art. 88.1", ["adel-0005"]),
 "rev-0016": ("error", "Restar 10 km/h a las mercancías peligrosas es solo fuera de poblado. Dentro de poblado, en vías de dos o más carriles por sentido y en travesías, su máximo es 40 km/h.", "Reglamento General de Circulación, arts. 48.1.b y 50.4", ["vel-0006", "vel-0018"]),
 "rev-0017": ("correcta", "Vehículos especiales: 40 km/h, o 70 km/h si pueden pasar de 60 en llano y cumplen sus normas técnicas.", "Reglamento General de Circulación, art. 48.1.c", ["vel-0007"]),
 "rev-0018": ("matiz", "El límite de 45 km/h es también para las bicicletas, pero las bicicletas pueden superarlo donde la vía lo permita.", "Reglamento General de Circulación, art. 48.1.e", ["vel-0008"]),

 # ---------------- capítulos 9-10: prioridad, maniobras, parada ----------------
 "A-rev-0001": ("error", "En un estrechamiento, si no se sabe quién entró antes, pasa el vehículo con más dificultad de maniobra según la lista del reglamento. Lo de «más metros de marcha atrás» solo desempata entre vehículos del mismo tipo.", "Reglamento General de Circulación, arts. 60.1 y 62", ["A-est-0002", "A-est-0003"]),
 "A-rev-0002": ("matiz", "La parada dura menos de 2 minutos «sin que el conductor pueda abandonar» el vehículo. La norma no dice que puedas bajarte; mejor no enseñarlo así.", "Ley de Tráfico, anexo I.81", ["A-par-0001"]),
 "A-rev-0003": ("matiz", "Estacionar no es solo pasar de 2 minutos: es toda inmovilización que no sea detención ni parada. Si el conductor se va del coche, aunque sea un minuto, ya es estacionamiento.", "Ley de Tráfico, anexo I.82", ["A-par-0003"]),
 "A-rev-0004": ("error", "Está prohibido calzar con piedras u objetos que no sean calzos. Si no hay calzos, se apoya una rueda directriz contra el bordillo.", "Reglamento General de Circulación, art. 92.3.d", ["A-par-0020"]),
 "A-rev-0005": ("error", "Con línea continua se puede adelantar a vehículos especiales agrícolas y sus conjuntos, sin límite de masa (no «hasta 3.500 kg»), y también a VMP, bicicletas, ciclomotores, peatones y animales, si van lo bastante despacio.", "Reglamento General de Circulación, art. 88.2", ["A-adel-0016"]),
 "A-rev-0006": ("matiz", "La norma dice «intersecciones con vías para ciclistas», no «pasos para ciclistas». (En los pasos para ciclistas lo que está prohibido es parar.)", "Reglamento General de Circulación, arts. 87.1.b y 94.1.b", ["A-adel-0013"]),
 "A-rev-0007": ("error", "La norma no exige cambiar de sentido «en una sola maniobra». Pide un lugar adecuado, avisar y no molestar ni poner en peligro; y permite la marcha atrás como maniobra complementaria.", "Reglamento General de Circulación, arts. 78.1 y 80.1", []),
 "A-rev-0008": ("matiz", "El cambio de sentido está prohibido donde está prohibido adelantar, y eso incluye los pasos para peatones. Para ciclistas la norma habla de «intersecciones con vías para ciclistas».", "Reglamento General de Circulación, arts. 79.1 y 87.1.b", []),
 "A-rev-0009": ("error", "Para girar a la izquierda en una calle de doble sentido hay que ceñirse a la línea central (sin invadir el sentido contrario), no colocarse a la derecha.", "Reglamento General de Circulación, art. 75.1.b", ["A-dir-0004"]),
 "A-rev-0010": ("sin_fuente", "El zigzag amarillo prohíbe estacionar. Si es una parada de autobús urbano, también está prohibido parar. No se puede afirmar en general que se pueda parar a bajar maletas.", "Reglamento General de Circulación, anexo I (M-7.9) y art. 94.1.i", []),
 "A-rev-0011": ("sin_fuente", "Delante de un vado está prohibido estacionar. Parar no está en la lista de prohibiciones, pero sí es infracción si impide usar el vado. Depende del caso.", "Reglamento General de Circulación, arts. 94.2.f y 91.2.c", []),
 "A-rev-0012": ('correcta', 'Lo que dice el vídeo coincide con el catálogo: la prohibición de estacionar (y la de parar y estacionar) rige hasta la próxima intersección; el estacionamiento quincenal va de las 9:00 del día 1 a las 9:00 del día 16 y de las 9:00 del 16 a las 9:00 del día 1; y existe la señal de vado.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.5 (R-307, R-308, R-308c, R-308d, R-308e)', []),
 "A-rev-0013": ("correcta", "Las motos de hasta 100 km/h solo necesitan el retrovisor izquierdo; las de más de 100 km/h, los dos.", "Reglamento General de Vehículos, anexo III.3", []),
 "A-rev-0014": ("matiz", "Según el Reglamento de Vehículos, la tercera luz de freno es un dispositivo opcional, no obligatorio (puede que la homologación de los coches nuevos la exija, pero eso no está en las fuentes). Lo de los retrovisores convexos no se ha podido comprobar. No preguntarlo.", "Reglamento General de Vehículos, art. 17.1", []),
 "A-rev-0015": ("no_norma", "La definición de maniobra y el orden «observar, señalizar, ejecutar» son didácticos; no están en la norma.", "-", []),
 "A-rev-0016": ("matiz", "El vehículo no prioritario en urgencia avisa con el claxon intermitente, la luz de emergencia o agitando un pañuelo «o algo parecido». La norma no nombra las ráfagas.", "Reglamento General de Circulación, art. 70.1", ["A-urg-0005"]),
 "A-rev-0017": ("matiz", "Los peatones tienen prioridad en pasos «debidamente señalizados». Las que tienen prioridad son «unidades militares, filas escolares y comitivas organizadas»; la norma no dice «manifestaciones autorizadas».", "Reglamento General de Circulación, art. 65.1", []),
 "A-rev-0018": ("sin_fuente", "Fuera de poblado se puede avisar con el claxon de que vas a adelantar. Las ráfagas se permiten incluso en poblado, pero la norma no deja claro si dentro de poblado sirven para avisar del adelantamiento.", "Reglamento General de Circulación, arts. 109 y 110", ["A-adv-0009"]),
 "A-rev-0019": ("matiz", "En la acera está prohibido estacionar. La lista de sitios donde está prohibido parar no nombra la acera, y no he encontrado que sea «muy grave».", "Reglamento General de Circulación, art. 94", []),

 # ---------------- capítulos 11-13: agentes, semáforos, señales ----------------
 "B1-rev-0001": ("error", "Con el brazo horizontal, el agente obliga a parar a quienes se acercan desde direcciones que cortan la que marca su brazo, vengan por donde vengan; no «solo a los de ese carril».", "Reglamento General de Circulación, anexo I.1.1.b", []),
 "B1-rev-0002": ("matiz", "La norma dice «serie de toques de silbato cortos y frecuentes» para detenerse; no dice que sean tres.", "Reglamento General de Circulación, anexo I.1.1.e", []),
 "B1-rev-0003": ("matiz", "El ámbar intermitente obliga a extremar la precaución y, si toca, ceder el paso. No es «como un ceda el paso a derecha e izquierda»: a quién se cede depende de las demás señales. Lo de parar si hay STOP sí es correcto.", "Reglamento General de Circulación, anexo I.4.2.d", []),
 "B1-rev-0004": ("error", "Si se enciende la flecha verde y estás en el carril de esa dirección, debes avanzar en esa dirección, haya o no alguien detrás.", "Reglamento General de Circulación, anexo I.4.2.g", []),
 "B1-rev-0005": ("matiz", "El verde intermitente para peatones avisa de que se acaba el tiempo para cruzar. Lo que prohíbe empezar a cruzar es el rojo. No esperar es un buen consejo, pero no es la norma.", "Reglamento General de Circulación, anexo I.4.1", []),
 "B1-rev-0006": ('sin_fuente', 'El reglamento solo dice que los paneles direccionales marcan el trazado de la curva en relación con la reducción de velocidad. Que más paneles signifique curva más cerrada no aparece en el texto ni en el catálogo de señales. No preguntarlo.', 'Reglamento General de Circulación, anexo I.3.1.2', []),
 "B1-rev-0007": ('correcta', 'Las balizas antes de un paso a nivel, puente móvil o muelle son tres franjas a 200 m, dos a 150 m y una a 100 m. Ojo: el manual de la DGT de 2024 dice 300, 200 y 100 m, pero eso es para las salidas de autopista; manda el catálogo del BOE.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.1 (P-9a, P-9b, P-9c y P-10), pág. 90', []),
 "B1-rev-0008": ('matiz', 'La marca «PN» avisa de un paso a nivel; la norma no dice que esté siempre.', 'Reglamento General de Circulación, anexo I.5.2 (M-7.5)', []),
 "B1-rev-0009": ('matiz', 'La regla de formas (triángulo peligro, redonda roja prohíbe, azul obliga, cuadrada informa) sirve como orientación, pero tiene excepciones (ceda el paso, STOP, calzada con prioridad). No preguntarla como regla absoluta.', 'Catálogo de señales verticales', []),
 "B1-rev-0010": ('correcta', 'La señal de masa con la cifra sola prohíbe el paso a los vehículos cuya masa en carga supere la indicada, es decir, lo que pesan en ese momento, y afecta a todos.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.4 (R-201)', []),
 "B1-rev-0011": ('correcta', 'Así lo dice la ficha de velocidad máxima: si está en el mismo poste o panel que una señal de peligro, termina cuando termina el peligro. La de adelantamiento prohibido no tiene esta regla.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.5 (R-301 y R-305), pág. 109', []),
 "B1-rev-0012": ('correcta', 'Todas esas señales existen en el catálogo vigente (por ejemplo, peligro por trenzado P-35, entrada prohibida a VMP, a VMP y ciclos y por clasificación ambiental, obligación de cinturón, de bajarse de la bici y de neumáticos de invierno). El manual de la DGT de 2024 no las recoge todas.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.1, 3.3 y 3.6', []),
 "B1-rev-0013": ('correcta', 'En obras, las señales que normalmente tienen fondo blanco pasan a tener fondo amarillo; son las mismas señales.', 'Catálogo de señales verticales, tomo I, 2.5', []),
 "B1-rev-0014": ('matiz', 'La norma regula que el agente, desde el vehículo de detrás, encienda una luz roja intermitente hacia delante (o use el brazo inclinado) para que pares a la derecha. No habla de «la moto delante».', 'Reglamento General de Circulación, anexo I.1.2', []),

 # ---------------- capítulos 14-16: señales verticales, marcas viales ----------------
 "B2-rev-0001": ('matiz', 'Las señales existen (telepeaje, bajarse de la bici y continuar a pie, camino para tractores, y las tachadas son «fin de»). Pero la de telepeaje no obliga a entrar a quien tenga telepeaje: es al revés, quien entre por ese carril tiene que llevar el aparato de telepeaje.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.6 y 3.7 (R-418, R-419, R-422)', []),
 "B2-rev-0002": ('correcta', 'Bien. La prohibición de vehículos de motor afecta a todos; la del dibujo del coche, a los de motor salvo motos de dos ruedas; la obligación con ese dibujo, a los automóviles salvo motos de dos ruedas. La prohibición de vehículos agrícolas afecta a tractores y máquinas agrícolas, y el camino obligatorio es para tractores.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.3 y 3.6 (R-102, R-103, R-111, R-404, R-419)', []),
 "B2-rev-0003": ('matiz', 'La cuadrada es velocidad aconsejada, también con buen tiempo. Pero la redonda de borde rojo es velocidad máxima; la de velocidad mínima es la redonda azul.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.5, 3.6 y 3.8 (R-301, R-411, S-7)', []),
 "B2-rev-0004": ('matiz', 'La señal cuadrada solo dice que el tramo es de sentido único; no dice nada sobre girar o cambiar de sentido (eso depende de otras señales). La redonda azul de sentido obligatorio sí obliga a seguir la dirección y el sentido de la flecha.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.6 y 3.8 (R-400, S-12a)', []),
 "B2-rev-0005": ('matiz', 'Las señales existen, pero la de estacionamiento de farmacias no fija 10 minutos: el tiempo lo indica un panel complementario.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.8 (S-15e, S-16, S-17a, S-21 a S-25)', []),
 "B2-rev-0006": ('correcta', 'Salida de autopista o autovía: 300, 200 y 100 m. Paso a nivel: 200, 150 y 100 m.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.1 (P-9a a P-9c) y 3.8 (S-26a a S-26c)', []),
 "B2-rev-0007": ('correcta', 'Zona de estancia y juego: 10 km/h, prioridad de peatones y juegos permitidos. Zona de coexistencia: 20 km/h, prioridad de peatones y sin juegos.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.8 (S-28, pág. 134, y S-47)', []),
 "B2-rev-0008": ("matiz", "La zona peatonal es de uso prioritario de peatones, no exclusivo: el ayuntamiento puede permitir bicis y VMP en las que no sean aceras.", "Ley de Tráfico, anexo I.59; Reglamento General de Circulación, art. 152.1", ["B2-via-0012"]),
 "B2-rev-0009": ('correcta', 'En la carretera 2+1 el carril central sirve para adelantar y se va alternando entre los dos sentidos por tramos.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.8 (S-1c)', []),
 "B2-rev-0010": ('correcta', 'Los carriles con velocidad mínima solo se pueden usar yendo a esa velocidad o más, y se circula por el derecho siempre que se pueda.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.9 (S-50)', []),
 "B2-rev-0011": ("matiz", "En el VAO pueden ir solo con el conductor los vehículos con V-15 o tarjeta de discapacidad y los autobuses de más de 3.500 kg (no dice «de línea regular»). Las motos no están exentas. Los «cero emisiones» solo si la autoridad lo permite en ese tramo.", "Reglamento General de Circulación, art. 35.2; manual DGT, temas 9 y 15", ["cesp-0007", "cesp-0008"]),
 "B2-rev-0012": ('correcta', 'Todas existen en el catálogo. La de fuente dice «fuente con agua», sin decir que sea potable. Los aparcamientos para usuarios del autobús, metro o tren son para los coches de quienes siguen el viaje en ese transporte, no para los autobuses.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.10 (S-100 a S-129), págs. 150-155', []),
 "B2-rev-0013": ('correcta', 'En los carteles de preseñalización, el destino en fondo azul indica que la salida lleva a una autopista o autovía; en fondo blanco, a una carretera convencional. Existen carteles de salida a vía de servicio y de servicios en autopista.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.11 (S-200 a S-271), págs. 156-165', []),
 "B2-rev-0014": ("correcta", "Los colores que da el vídeo coinciden con el catálogo vigente: E verde, autopista y autovía azul, carreteras del Estado rojo, autonómicas de primer nivel naranja, de segundo nivel marrón y de tercer nivel amarillo. Lo de los hitos «miriamétricos» no se ha comprobado.", "Catálogo de señales verticales, tomo I, 3.13 (págs. 178-179)", []),
 "B2-rev-0015": ('matiz', 'Bien en verde (calles), amarillo (viajeros), naranja (deportes), marrón (geografía y monumentos), azul (autopistas y autovías) y blanco (otras carreteras). Pero en el catálogo los lugares de interés cultural y las zonas industriales aparecen sobre fondo blanco, no morado ni gris.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.16 (S-700 a S-770), págs. 190-191', []),
 "B2-rev-0016": ('correcta', 'Coincide con el catálogo: bajo un estrechamiento, el panel puede indicar la anchura libre; la cifra entre flechas es la longitud del tramo; la flecha indica que solo afecta al ramal de salida; y hay paneles para camiones, autobuses, nieve, lluvia, niebla, etc.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.17 (S-800 a S-892), págs. 193-196', []),
 "B2-rev-0017": ('correcta', 'Existen todas: control de velocidad, de semáforo en rojo, de STOP y de separación mínima (blanca en carretera convencional, azul en autopista o autovía), control por medios aéreos, peligro de incendio, extintor, teléfono de emergencia y salida de emergencia.', 'Catálogo de señales verticales (RGC, anexo I), tomo I, 3.18 (S-900 a S-993), págs. 197-204', []),
 "B2-rev-0018": ("matiz", "Dos líneas continuas significan lo mismo que una continua; la norma no dice que separen «siempre» los dos sentidos.", "Reglamento General de Circulación, anexo I.5.2", []),
 "B2-rev-0019": ("matiz", "Por un carril bus separado con línea discontinua se puede entrar «para realizar determinadas maniobras permitidas». La norma no dice que sea solo para girar a la derecha.", "Reglamento General de Circulación, anexo I.5.2 (M-1.6 y M-1.7)", []),
 "B2-rev-0020": ("matiz", "La línea de borde se puede atravesar para usar el arcén cuando sea necesario. Lo de entrar a un camino no está tratado así en la norma.", "Reglamento General de Circulación, anexo I.5.2", []),
 "B2-rev-0021": ("error", "Un paso de peatones marcado solo con dos líneas discontinuas solo se admite si está regulado por semáforo; no por ser grande ni para ahorrar pintura.", "Reglamento General de Circulación, anexo I.5.2, 4.2", []),
 "B2-rev-0022": ("error", "En el cebreado no se puede entrar. La única excepción es para los que deben circular por el arcén; no hay excepción por un obstáculo.", "Reglamento General de Circulación, art. 147.2.d y anexo I.5.2, 4.6", []),
 "B2-rev-0023": ("matiz", "Las marcas de otros colores indican limitaciones de tiempo, tipo de usuario o fines concretos. Que sean de pago depende de cada ayuntamiento.", "Reglamento General de Circulación, anexo I.5.2, 4.7", []),
 "B2-rev-0024": ("error", "Las flechas del suelo marcan los movimientos permitidos u obligados en ese carril. Girar a la izquierda desde un carril cuya flecha no lo permite es una infracción, no un «por poder, podría».", "Reglamento General de Circulación, anexo I.5.2, 4.3", []),

 # ---------------- capítulos 17-24: luces, carga, documentos, permisos, puntos ----------------
 "C-rev-0001": ("matiz", "No hay una prohibición expresa de las largas en poblado. Lo que dice la norma es que las largas son obligatorias fuera de poblado en vías mal iluminadas, y que en poblado mal iluminado hay que llevar al menos la de cruce.", "Reglamento General de Circulación, arts. 100 y 101", []),
 "C-rev-0002": ("no_norma", "Lo de que en curva deslumbra antes el que va por dentro es una explicación técnica, no una norma. La norma solo dice que hay que cambiar a cruce en cuanto se pueda deslumbrar.", "Reglamento General de Circulación, art. 102", []),
 "C-rev-0003": ("matiz", "En túneles bien iluminados, luz de cruce. En túneles mal iluminados, a más de 40 km/h, luz de carretera (largas), salvo que se deslumbre a alguien.", "Reglamento General de Circulación, arts. 100.1 y 101", []),
 "C-rev-0004": ("correcta", "La antiniebla trasera es obligatoria en los automóviles; la delantera es opcional. Los colores de los catadióptricos no se han comprobado.", "Reglamento General de Vehículos, arts. 16.1 y 17.1", []),
 "C-rev-0005": ("correcta", "Vehículo de motor rígido (no autobús): 12 m; anchura general 2,55 m; altura 4 m, todo con la carga. Un camión de 10 m solo puede sacar 2 m de carga en total aunque el reglamento permita hasta 3 m por detrás, porque con la carga no puede pasar de 12 m. Los articulados (16,50 m) y los trenes de carretera (18,75 m) tienen otros límites.", "Reglamento General de Vehículos, anexo IX; Reglamento General de Circulación, arts. 13 y 15", []),
 "C-rev-0006": ("correcta", "Los plazos de ITV del vídeo coinciden con la norma: turismos exentos 4 años, cada 2 hasta 10 y luego cada año; motos exentas 4 años y luego cada 2; furgonetas exentas 2 años, cada 2 hasta 6, cada año hasta 10 y luego cada 6 meses; camiones de más de 3.500 kg cada año hasta 10 y luego cada 6 meses.", "RD 920/2017, art. 6", []),
 "C-rev-0007": ("matiz", "Correcto en lo esencial. Desfavorable: 2 meses para volver y solo se puede conducir para ir al taller y a la ITV. Negativa: el coche sale de la ITV por medios ajenos (grúa) y también hay 2 meses.", "RD 920/2017, art. 11", []),
 "C-rev-0008": ("sin_fuente", "La norma dice dónde se pone la pegatina de la ITV (esquina superior derecha del parabrisas, por dentro), pero no he encontrado que haya que quitar las viejas ni una multa por llevar varias.", "Reglamento General de Vehículos, anexo XI (V-19)", ["C-doc-0001"]),
 "C-rev-0009": ("correcta", "El seguro obligatorio cubre daños a personas y bienes de terceros. No cubre las lesiones del conductor causante, ni su coche, ni las cosas que lleva, ni los bienes suyos o de su familia cercana. Los pasajeros sí están cubiertos.", "RDL 8/2004, art. 5", []),
 "C-rev-0010": ("correcta", "Los remolques de hasta 750 kg no tienen que tener seguro propio.", "RDL 8/2004, art. 2.8.b", ["C-doc-0008", "C-doc-0009"]),
 "C-rev-0011": ("matiz", "No es el remolque el que lleva extintor: es el conjunto. Un turismo con cualquier remolque es un «conjunto de vehículos» y debe llevar extintor. Lo de que el remolque no necesita rueda de repuesto es correcto: la norma solo la pide a turismos, mixtos y furgonetas.", "Reglamento General de Vehículos, anexos II y XII", ["E-mec-0012"]),
 "C-rev-0012": ("sin_fuente", "La validez de la app miDGT no está en las fuentes consultadas.", "-", []),
 "C-rev-0013": ("correcta", "Edades: AM 15, A1 16, A2 18, A 20 (con 2 años de A2), B 18.", "Reglamento General de Conductores, art. 4.2", ["C-perm-0011"]),
 "C-rev-0014": ("matiz", "No existe un permiso «E» suelto: existen B+E, C1+E, C+E, D1+E y D+E.", "Reglamento General de Conductores, art. 4.2", []),
 "C-rev-0015": ("error", "El A2 no es «de cualquier cilindrada»: se limita por potencia (máximo 35 kW y 0,2 kW/kg).", "Reglamento General de Conductores, art. 4.2", []),
 "C-rev-0016": ("sin_fuente", "El orden reconocimiento médico / examen no se ha comprobado.", "-", []),
 "C-rev-0017": ("error", "El curso parcial dura 12 horas (no 10) y el de recuperación del permiso 24 horas (no 20). Con el parcial se recuperan hasta 6 puntos, no 4 (la Ley de Tráfico dice 6; la orden antigua aún dice 4, pero manda la ley).", "Orden INT/2596/2005, apartados cuarto y quinto; Ley de Tráfico, art. 65.4", ["C-pun-0005", "C-pun-0008"]),
 "C-rev-0018": ("no_norma", "Lo de los 15 puntos en 8 años es una cuenta del profesor. La ley da 2 puntos extra tras 3 años sin sanciones y 1 más tras otros 3, hasta 15; la cuenta para un novel no viene escrita.", "Ley de Tráfico, art. 63.4", []),
 "C-rev-0019": ("correcta", "En el texto vigente solo pueden ir sin cinturón quien hace marcha atrás o estaciona y quien tiene certificado médico. Taxistas, repartidores y profesores ya no están exentos. La fecha exacta del cambio no la he comprobado.", "Reglamento General de Circulación, art. 119.1", ["C-per-0009"]),

 # ---------------- capítulos 25-31: alcohol, drogas, delitos, factores de riesgo ----------------
 "D-rev-0001": ("correcta", "Es delito superar en más de 60 km/h el límite en vía urbana o en más de 80 km/h en interurbana.", "Código Penal, art. 379.1", ["bmp-0001"]),
 "D-rev-0002": ("correcta", "Más de 0,60 mg/l en aire (o 1,2 g/l en sangre) es siempre delito. Con menos también puede serlo si se conduce bajo la influencia del alcohol.", "Código Penal, art. 379.2", ["bmp-0003"]),
 "D-rev-0003": ("matiz", "Para el conductor al que se lo pide un agente, negarse es delito. Pero no «siempre»: si se niega un peatón implicado en un accidente, es infracción administrativa muy grave, no delito.", "Código Penal, art. 383; Ley de Tráfico, art. 77", ["bmp-0005"]),
 "D-rev-0004": ("matiz", "Es delito conducir «bajo la influencia» de drogas. Dar positivo (presencia de drogas) sin ir bajo sus efectos es infracción administrativa muy grave (multa de 1.000 €), no delito.", "Código Penal, art. 379.2; Ley de Tráfico, arts. 14.1 y 80", ["D-dro-0002"]),
 "D-rev-0005": ("matiz", "Es delito conducir sin haber tenido nunca permiso, con el permiso sin puntos o tras quitártelo un juez. Pero conducir con el permiso suspendido por Tráfico (no por un juez) es infracción con pérdida de 4 puntos, no delito.", "Código Penal, art. 384; Ley de Tráfico, anexo II.17", ["bmp-0006", "bmp-0007"]),
 "D-rev-0006": ("correcta", "Es delito si con ello se crea un grave riesgo para la circulación.", "Código Penal, art. 385", ["bmp-0010"]),
 "D-rev-0007": ("matiz", "Los puntos solo se pierden por sanciones administrativas firmes, así que una condena penal no quita puntos: esa parte cuadra. Lo demás (con cuántos puntos se devuelve el permiso y el curso) no se ha comprobado.", "Ley de Tráfico, art. 64.1", []),
 "D-rev-0008": ("error", "Los peatones también deben hacer la prueba si han cometido una infracción, no solo si están implicados en un accidente.", "Ley de Tráfico, art. 14.2", ["D-alc-0009"]),
 "D-rev-0009": ("error", "Los profesores de autoescuela no están en la lista de tasa reducida (0,15). Sí lo están, entre otros, camiones de más de 3.500 kg, autobuses, taxis y otros servicios públicos, transporte escolar, mercancías peligrosas, urgencias y noveles.", "Reglamento General de Circulación, art. 20", []),
 "D-rev-0010": ("correcta", "Un adulto en patinete eléctrico tiene la tasa general: 0,25 mg/l en aire. Si es menor de edad, 0.", "Reglamento General de Circulación, art. 20; Ley de Tráfico, art. 14.1", []),
 "D-rev-0011": ("sin_fuente", "Que la antigüedad del permiso AM cuente para no ser novel con el B es una interpretación razonable, pero la norma no lo dice literalmente.", "Reglamento General de Circulación, art. 20", ["D-nov-0001"]),
 "D-rev-0012": ("sin_fuente", "Los porcentajes de eliminación del alcohol (90 % hígado) no están en el manual de la DGT.", "-", []),
 "D-rev-0013": ("error", "Fuera del temario, pero mal explicado: la fermentación la hacen levaduras, no bacterias, y en la destilación lo que se evapora y se recoge es el alcohol.", "-", []),
 "D-rev-0014": ("no_norma", "Truco didáctico, no está en el manual. No usarlo en preguntas.", "Manual DGT, tema 3", []),
 "D-rev-0015": ("no_norma", "Es razonable, pero el manual no lo dice; solo dice que con el suelo mojado aumenta la distancia de frenado.", "Manual DGT, tema 10", []),
 "D-rev-0016": ("no_norma", "La cuenta es correcta (a 120 km/h se recorren unos 33 m por segundo), pero ni la cifra ni el término «microsueño» están en el manual.", "-", ["D-fat-0002"]),
 "D-rev-0017": ("error", "El manual de la DGT dice dormir 20 o 30 minutos, no 15.", "Manual DGT, tema 3", ["D-fat-0001"]),
 "D-rev-0018": ("matiz", "El manual dice no tener conversaciones de más de un minuto (no «minuto y medio»).", "Manual DGT", ["D-mov-0007"]),
 "D-rev-0019": ("error", "El manual de la DGT dice que el volante se coge «sin cruzar las manos al girar».", "Manual DGT, tema 6", []),
 "D-rev-0020": ("no_norma", "Lo de las 10 y 10 no está en el manual; el manual dice dos manos, por fuera, con firmeza pero sin mucha fuerza.", "Manual DGT, tema 6", []),
 "D-rev-0021": ("matiz", "El manual atribuye al éxtasis alucinaciones, sensibilidad a la luz, pérdida de concentración, depresión o ansiedad; al LSD alucinaciones, agresividad, ansiedad y pánico. No usa «activan» ni «relaja».", "Manual DGT", []),
 "D-rev-0022": ("correcta", "Hay más accidentes los fines de semana y festivos, sobre todo de madrugada.", "Manual DGT, tema 16", []),

 # ---------------- capítulos 32-38: vehículo, ADAS, accidentes, medio ambiente ----------------
 "E-rev-0001": ("matiz", "Como regla general no se puede poner un neumático con código de velocidad inferior al de la ficha, pero hay excepción para los de invierno (M+S con el símbolo de la montaña), avisando de la velocidad límite dentro del coche.", "Reglamento General de Vehículos, anexo VII", []),
 "E-rev-0002": ("error", "La parte de arriba del reposacabezas debe quedar a la altura de la parte de arriba de la cabeza, no de los ojos.", "Manual DGT, tema 5", ["E-pas-0011"]),
 "E-rev-0003": ("sin_fuente", "Cristales templados y laminados: no está en las fuentes. Además el vídeo mezcla los dos (hacerse añicos es propio del templado).", "-", []),
 "E-rev-0004": ("no_norma", "El manual de la DGT solo habla de seguridad activa y pasiva; no usa «seguridad preventiva».", "Manual DGT", []),
 "E-rev-0005": ("sin_fuente", "Frenos de disco y cambio de rueda: no están en las fuentes.", "-", []),
 "E-rev-0006": ("sin_fuente", "La desconexión de los ADAS está en normativa europea que no se ha consultado y depende de cada sistema.", "-", []),
 "E-rev-0007": ("sin_fuente", "Definiciones de TPMS, DDR, EDR, ISA, etc.: no están en las fuentes consultadas.", "-", []),
 "E-rev-0008": ("sin_fuente", "El manual solo dice que el RCTA avisa con un sonido; lo de frenar y los 15 km/h no está.", "Manual DGT, tema 6", []),
 "E-rev-0009": ("sin_fuente", "ADAS instalados después: no está en las fuentes.", "-", []),
 "E-rev-0010": ("matiz", "El manual de la DGT llama EBD al aviso de frenada de emergencia; en terminología técnica EBD suele ser el reparto de frenada. Las preguntas dicen «según el manual de la DGT».", "Manual DGT", ["E-ada-0002"]),
 "E-rev-0011": ("error", "El chaleco no tiene que ser «visible a 150 m»: debe ser de alta visibilidad certificado. Los 150 m son para el elemento reflectante de ciclistas y usuarios de patinete de noche.", "Reglamento General de Circulación, art. 118", []),
 "E-rev-0012": ("no_norma", "Llevar el chaleco y la V-16 a mano es un buen consejo, pero la norma solo obliga a llevarlos.", "Reglamento General de Vehículos, anexo XII", []),
 "E-rev-0013": ("correcta", "Un turismo con remolque, aunque sea ligero, es un conjunto de vehículos y debe llevar extintor (la obligación es del conjunto).", "Reglamento General de Vehículos, anexos II y XII", ["E-mec-0012"]),
 "E-rev-0014": ("correcta", "No socorrer a quien está en peligro grave, pudiendo hacerlo sin riesgo, es delito de omisión del deber de socorro.", "Código Penal, art. 195", []),
 "E-rev-0015": ("matiz", "El manual dice qué proteger (a ti, a las víctimas y el lugar), pero no fija el orden entre víctimas y lugar. Lo seguro es: primero protegerse uno mismo.", "Manual DGT, tema 16", []),
 "E-rev-0016": ("error", "El manual dice presionar la herida con la mano o el puño usando una gasa o pañuelo lo más limpio posible; el torniquete, con un pañuelo doblado y sin objetos finos; y no echar alcohol ni pomadas en las heridas.", "Manual DGT, tema 16", []),
 "E-rev-0017": ("no_norma", "Las cifras de cada cuántos segundos mirar los retrovisores no están en el manual; solo dice que depende de la vía.", "Manual DGT, tema 17", []),
 "E-rev-0018": ("sin_fuente", "Las revoluciones para cambiar de marcha no están en el manual de la DGT (y el vídeo dice «entre 100 y 2.000», que será un lapsus por 1.000).", "-", []),
 "E-rev-0019": ("error", "Las etiquetas no van por año de matriculación sino por norma Euro: C = gasolina Euro 4, 5 o 6 o diésel Euro 6; B = gasolina Euro 3 o diésel Euro 4 o 5.", "Reglamento General de Vehículos, anexo II.E", ["E-amb-0005", "E-amb-0006"]),
 "E-rev-0020": ("matiz", "Un híbrido enchufable con 40 km o más de autonomía eléctrica lleva «0 emisiones»; con menos de 40 km, ECO. Con 40 justos, 0 emisiones (el vídeo dice las dos cosas).", "Reglamento General de Vehículos, anexo II.E", []),
 "E-rev-0021": ("matiz", "Quién entra en cada zona de bajas emisiones lo decide cada ayuntamiento; no hay una regla única.", "Reglamento General de Vehículos, anexo XI (V-25); manual DGT", []),
 "E-rev-0022": ("error", "Lo que describe el vídeo (comprimir aire, calentarse y explotar al entrar el combustible) es el motor diésel. El de gasolina enciende la mezcla con la chispa de la bujía.", "Manual DGT, tema 15", []),
}

ETIQ = {"error": "El vídeo se equivoca", "matiz": "Hay que matizarlo", "correcta": "El vídeo acierta",
        "no_norma": "No es una norma (consejo o explicación)", "sin_fuente": "No se puede confirmar con las fuentes oficiales",
        "pendiente": "Pendiente: comprobar en el catálogo de señales"}


def minuto(r):
    m = re.search(r"(\d+:\d{2}:\d{2}|\b\d{1,2}:\d{2}\b)", r["afirmacion_del_video"])
    if m:
        return m.group(1)
    return (r.get("origen") or {}).get("minuto")


MIN18 = {"rev-0001": "7:50", "rev-0002": "8:10", "rev-0003": "3:00", "rev-0004": "6:40", "rev-0005": "5:40",
         "rev-0006": "13:30", "rev-0007": "15:30", "rev-0008": "20:50", "rev-0009": "19:50", "rev-0010": "28:30",
         "rev-0011": "46:04", "rev-0012": "42:23", "rev-0013": "40:13", "rev-0014": "51:37", "rev-0015": "59:59",
         "rev-0016": "1:04:53", "rev-0017": "1:06:51", "rev-0018": "1:08:29"}

revs = json.load(open(os.path.join(PREG, "revision-piloto-video1.json")))["revision"] + \
       json.load(open(os.path.join(PREG, "revision-video1-cap09-38.json")))["revision"]
banco = json.load(open(os.path.join(PREG, "banco-dudosas-video1.json")))["preguntas"]
nuevas = {}
for p in banco:
    nuevas.setdefault(p["origen"]["resuelve"], []).append(p["id"])

faltan = [r["id"] for r in revs if r["id"] not in V]
sobran = [k for k in V if k not in {r["id"] for r in revs}]
assert not faltan and not sobran, (faltan, sobran)

res = []
for r in revs:
    ver, txt, fuente, existentes = V[r["id"]]
    res.append({"id": r["id"], "afirmacion_del_video": r["afirmacion_del_video"],
                "minuto": MIN18.get(r["id"]) or minuto(r), "veredicto": ver, "lo_correcto": txt, "fuente": fuente,
                "preguntas_nuevas": nuevas.get(r["id"], []), "preguntas_que_ya_lo_cubren": existentes})
json.dump({"version": 1, "fecha": "2026-11-24",
           "leyenda": ETIQ, "resoluciones": res},
          open(os.path.join(OUTD, "resoluciones-video1.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)

# ---------- erratas en lenguaje sencillo ----------
def limpia(a):
    a = re.sub(r"\s*[\[(]\d+:\d{2}(:\d{2})?([-–]\d+:\d{2}(:\d{2})?)?[\])]\s*", " ", a)
    a = re.sub(r"^\s*\[[^\]]*\]\s*", "", a)
    return a.strip().rstrip(".").strip()

from collections import Counter
cnt = Counter(x["veredicto"] for x in res)
L = []
L.append("# Erratas del vídeo «Intensivo de teórica completo y actualizado 2027»\n")
L.append("Para Denisse. He comparado con la norma oficial (BOE) y con el manual de la DGT las "
         f"{len(res)} frases del vídeo que no estaban claras. Resultado: "
         f"**{cnt['error']} errores**, {cnt['matiz']} matices, {cnt['correcta']} en las que el vídeo acierta, "
         f"{cnt['no_norma']} consejos que no son norma y {cnt['sin_fuente']} que no se pueden confirmar"
         + (f", más {cnt['pendiente']} sobre señales pendientes de comprobar en el catálogo" if cnt['pendiente'] else "") + ".\n")
L.append("Si en el examen te preguntan por algo de la sección «El vídeo se equivoca», responde lo que pone aquí, no lo del vídeo.\n")
L.append("El minuto indica dónde lo dice el vídeo (h:mm:ss).\n")
orden = ["error", "matiz", "correcta", "no_norma", "sin_fuente", "pendiente"]
intro = {
 "error": "Lo importante. Aquí el vídeo dice algo distinto a la norma.",
 "matiz": "Casi bien, pero con un detalle que puede caer en el examen.",
 "correcta": "Había dudas, pero se ha comprobado que el vídeo tiene razón.",
 "no_norma": "Son trucos o consejos del profesor. Pueden ayudar, pero no son norma y no conviene darlos como respuesta segura.",
 "sin_fuente": "No están en la normativa ni en el manual que se han consultado. Ni bien ni mal: mejor no fiarse.",
 "pendiente": "Dependen de la definición exacta de cada señal en el catálogo oficial. Se revisarán en cuanto esté su texto.",
}
for v in orden:
    xs = [x for x in res if x["veredicto"] == v]
    if not xs:
        continue
    L.append(f"\n## {ETIQ[v]} ({len(xs)})\n")
    L.append(intro[v] + "\n")
    for x in xs:
        mi = f" ({x['minuto']})" if x.get("minuto") else ""
        if v == "pendiente":
            L.append(f"- **{limpia(x['afirmacion_del_video'])[:160]}**{mi}. {x['lo_correcto']}")
        else:
            L.append(f"- **El vídeo{mi}:** {limpia(x['afirmacion_del_video'])}.  \n  **Lo correcto:** {x['lo_correcto']}  \n  _Fuente: {x['fuente']}._")
L.append("\n---\nFuentes: Reglamento General de Circulación, Ley de Tráfico, Reglamento General de Vehículos, "
         "Reglamento General de Conductores, Código Penal, RD 920/2017 (ITV), RDL 8/2004 (seguro), "
         "Orden INT/2596/2005 (cursos de puntos), todos en su versión consolidada del BOE; y el manual del permiso B "
         "de la DGT en lectura fácil. Detalle de cada caso en resoluciones-video1.json.\n")
open(os.path.join(OUTD, "erratas-video1.md"), "w", encoding="utf-8").write("\n".join(L))
print("resoluciones:", len(res), dict(cnt))
