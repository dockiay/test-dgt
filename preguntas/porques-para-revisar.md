# «¿Por qué?»: opciones que verá tras fallar cada pregunta

Generado por `tools/build_errores.py`. Para cada pregunta: la explicación correcta (✔) y las dos distractoras (✘), que son explicaciones de otras preguntas verificadas basadas en otro artículo. Hay que comprobar que ninguna ✘ explica también la respuesta correcta. Para quitar una, añádela a `preguntas/porques-excluidos.json` como `{"excluir": {"<id pregunta>": ["<id distractora>"]}}` y vuelve a generar.

## res-def-0001

¿Qué es la masa en orden de marcha de un turismo?  
Respuesta: **La tara más la masa estándar del conductor, de 75 kg.**

- ✔ La masa en orden de marcha es la tara (que ya incluye el depósito de combustible lleno, agua, lubricante, repuestos y herramientas) más 75 kg del conductor. _(RGV Anexo IX.1.2)_
- ✘ `def-0006` La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_
- ✘ `def-0011` El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_

## res-def-0002

¿Qué diferencia a una furgoneta de un camión?  
Respuesta: **Que la furgoneta tiene la cabina integrada en el resto de la carrocería.**

- ✔ Los dos transportan mercancías y tienen como máximo 9 plazas incluido el conductor. En la furgoneta la cabina está integrada en la carrocería; en el camión, no. _(RGV Anexo II.A)_
- ✘ `res-def-0001` La masa en orden de marcha es la tara (que ya incluye el depósito de combustible lleno, agua, lubricante, repuestos y herramientas) más 75 kg del conductor. _(RGV Anexo IX.1.2)_
- ✘ `def-0006` La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_

## res-def-0003

¿Qué es un vehículo derivado de turismo?  
Respuesta: **Un automóvil para servicios o transporte exclusivo de mercancías que conserva la carrocería del turismo del que deriva y tiene una sola fila de asientos.**

- ✔ El derivado de turismo sale de un turismo, conserva su carrocería y solo tiene una fila de asientos; se destina a servicios o a transporte de mercancías. _(RGV Anexo II.A)_
- ✘ `def-0011` El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_
- ✘ `def-0009` La tara es la masa sin personas ni carga, pero con la dotación completa de combustible, agua, lubricante, repuestos, herramientas y accesorios. _(LSV Anexo I.35)_

## res-def-0004

Según el Reglamento General de Vehículos, un patinete eléctrico (vehículo de movilidad personal), ¿es un «vehículo a motor»?  
Respuesta: **No: aunque tiene motor, el Reglamento lo excluye expresamente de la definición de vehículo a motor.**

- ✔ El Reglamento General de Vehículos excluye de «vehículo a motor» a ciclomotores, tranvías, vehículos para personas de movilidad reducida, bicicletas de pedaleo asistido y vehículos de movilidad personal. El manual de la DGT los incluye entre los «vehículos no considerados a motor». _(RGV Anexo II.A)_
- ✘ `def-0011` El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_
- ✘ `def-0006` La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_

## res-def-0005

¿De qué color es el fondo de la placa de matrícula de un ciclomotor?  
Respuesta: **Amarillo.**

- ✔ Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.d)_
- ✘ `res-itv-0003` Motocicletas (resto de categoría L): exentas hasta 4 años y después bienal. Los ciclomotores: exentos hasta 3 años y después bienal. _(ITV 6.1 (tabla))_
- ✘ `C-doc-0003` El conductor debe llevar y exhibir el permiso de circulación (o autorización provisional) y la tarjeta de inspección técnica. _(RGV 26.1)_

## res-def-0006

¿De qué color es el fondo de la placa de matrícula de un remolque?  
Respuesta: **Rojo.**

- ✔ Las placas de remolques y semirremolques tienen fondo rojo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.c)_
- ✘ `C-doc-0004` Los ciclomotores llevan licencia de circulación y certificado de características técnicas en lugar de permiso de circulación y tarjeta ITV. _(RGV 26.1.b)_
- ✘ `C-doc-0006` La tarjeta de inspección técnica documenta las características técnicas esenciales del vehículo y en ella se hacen constar las reformas autorizadas. _(LSV 67.2)_

## res-via-0001

¿Puede un peatón circular por una autovía?  
Respuesta: **No, salvo en los casos y condiciones que fija el reglamento (por ejemplo, al salir del vehículo por una emergencia).**

- ✔ Los peatones no pueden circular por autopistas ni autovías, salvo en los casos y condiciones del artículo 130 (inmovilización del vehículo por emergencia). _(RGC 125.1)_
- ✘ `res-via-0003` Se prohíbe la circulación de animales por autopistas y autovías; la prohibición incluye también los vehículos de tracción animal. _(RGC 128)_
- ✘ `via-0007` Se prohíbe circular con vehículos de movilidad personal por autopistas y autovías, por travesías y por vías interurbanas y túneles urbanos (salvo vías ciclistas y similares). _(RGC 38.4.b)_

## res-via-0002

En la explanada de una estación de peaje de una autopista, ¿se puede hacer autostop (pedir que te lleven)?  
Respuesta: **No, está prohibido pedir pasaje en cualquier tramo de la autopista, incluidas las explanadas de peaje.**

- ✔ Los peatones no pueden hacer peticiones de pasaje en ningún tramo de autopistas y autovías, incluidas las explanadas de las estaciones de peaje. _(RGC 125.1)_
- ✘ `B2-via-0013` En las aceras está prohibida la circulación de cualquier tipo de vehículo, pero las ordenanzas pueden permitir que circulen niños de hasta doce años en bicicleta a cargo de un adulto que vaya a pie. _(RGC 152.1)_
- ✘ `via-0006` Se prohíbe circular por autopistas y autovías con vehículos de tracción animal, bicicletas, ciclomotores y vehículos para personas de movilidad reducida. _(RGC 38.1)_

## res-via-0003

¿Puede circular una persona a caballo por el arcén de una autovía?  
Respuesta: **No, está prohibida la circulación de animales por autopistas y autovías.**

- ✔ Se prohíbe la circulación de animales por autopistas y autovías; la prohibición incluye también los vehículos de tracción animal. _(RGC 128)_
- ✘ `res-via-0001` Los peatones no pueden circular por autopistas ni autovías, salvo en los casos y condiciones del artículo 130 (inmovilización del vehículo por emergencia). _(RGC 125.1)_
- ✘ `via-0004` Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles. _(LSV Anexo I.69)_

## res-arc-0001

Una persona en silla de ruedas circula sola por una carretera sin acera ni zona peatonal practicable. Como norma general, ¿por dónde debe ir?  
Respuesta: **Por el arcén izquierdo en el sentido de su marcha (o por la calzada si no hay arcén), lo más alejada posible de los vehículos.**

- ✔ Quien va en silla de ruedas al paso es peatón (con o sin motor). Los peatones van por el arcén izquierdo; solo deben ir por la derecha quienes empujan un ciclo o similar, los grupos dirigidos o cuando haya razones de seguridad. _(RGC 122.1)_
- ✘ `arc-0008` Los conductores de bicicletas pueden circular en columna de a dos por el arcén. Si no hay arcén transitable y van por la calzada, deben ponerse en hilera en tramos sin visibilidad, si afectan a la fluidez, de noche o con poca visibilidad. _(RGC 36.2)_
- ✘ `arc-0004` Entre el ocaso y la salida del sol, o con poca visibilidad, deben llevar al menos un elemento luminoso o reflectante visible a una distancia mínima de 150 metros. _(RGC 123.1)_

## res-cesp-0001

Una motocicleta ocupada solo por su conductor, ¿puede circular por un carril VAO?  
Respuesta: **Solo si cumple el número mínimo de ocupantes que se haya fijado para ese carril VAO.**

- ✔ Las motos pueden usar el VAO, pero, como los turismos, deben cumplir los requisitos de alta ocupación del tramo. Solo se libran del número mínimo de ocupantes los vehículos con la señal V-15 o la tarjeta de estacionamiento para personas con discapacidad y los autobuses de más de 3.500 kg. _(MANUAL_DGT Tema 9, Carril VAO (p. 233))_
- ✘ `cesp-0006` El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_
- ✘ `res-cesp-0003` Cuando en su sentido hay más de un carril, se aplican las velocidades genéricas; el tramo de 60 a 80 km/h solo rige si queda un único carril. En todo caso, con la luz de cruce encendida. _(RGC 41.1)_

## res-cesp-0002

Circula por el carril contiguo a uno habilitado en sentido contrario al habitual y en su sentido solo queda ese carril. ¿A qué velocidad debe circular, salvo señal de otra inferior?  
Respuesta: **Entre 60 y 80 km/h.**

- ✔ Si solo dispone de un carril en su sentido, debe ir entre 60 y 80 km/h y con luz de cruce. Si dispone de más de uno, se aplican los límites normales. _(RGC 41.1)_
- ✘ `cesp-0006` El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_
- ✘ `cesp-0005` En un carril reversible hay que llevar encendida, al menos, la luz de corto alcance o de cruce, tanto de día como de noche. _(RGC 40.1)_

## res-cesp-0003

Circula por un carril contiguo a uno habilitado en sentido contrario al habitual y en su sentido dispone de dos carriles. ¿A qué velocidad puede circular?  
Respuesta: **A las velocidades genéricas de la vía (máximas y mínimas).**

- ✔ Cuando en su sentido hay más de un carril, se aplican las velocidades genéricas; el tramo de 60 a 80 km/h solo rige si queda un único carril. En todo caso, con la luz de cruce encendida. _(RGC 41.1)_
- ✘ `cesp-0008` Los autobuses de más de 3.500 kg y los articulados pueden usarlo con independencia del número de ocupantes, en las condiciones fijadas para el tramo. _(RGC 35.2.a)_
- ✘ `cesp-0004` Los vehículos que circulen por los arcenes y por el carril adicional lo harán a un máximo de 80 km/h y un mínimo de 60 km/h, con al menos la luz de cruce. _(RGC 42.1)_

## res-cesp-0004

Los vehículos que circulan por el carril contiguo a uno habilitado en sentido contrario al habitual, ¿qué alumbrado deben llevar?  
Respuesta: **Al menos la luz de corto alcance o de cruce, de día y de noche.**

- ✔ Deben llevar encendida al menos la luz de cruce, tanto de día como de noche, y no pueden invadir el carril habilitado en sentido contrario. _(RGC 41.1)_
- ✘ `cesp-0008` Los autobuses de más de 3.500 kg y los articulados pueden usarlo con independencia del número de ocupantes, en las condiciones fijadas para el tramo. _(RGC 35.2.a)_
- ✘ `A-adel-0014` Está prohibido adelantar en los túneles, pasos inferiores y tramos afectados por la señal «Túnel» (S-5) en los que solo se disponga de un carril para el sentido de circulación. _(RGC 87.1.d)_

## res-dist-0001

Según el manual de la DGT, ¿qué separación es aconsejable dejar con el vehículo de delante en condiciones normales?  
Respuesta: **Dos o tres segundos.**

- ✔ El manual aconseja dos o tres segundos de separación, y al menos un segundo más con lluvia, nieve, niebla, de noche o si el de atrás se acerca demasiado. El reglamento no fija segundos: exige un espacio que permita detenerse sin chocar (RGC 54.1). _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_
- ✘ `D-dis-0003` La distancia de reacción es el espacio recorrido desde que se detecta un imprevisto (un obstáculo, una señal, un ruido) hasta que se puede reaccionar, por ejemplo hasta que se pisa el freno. _(MANUAL_DGT Tema 10, Distancia de reacción (pág. 261))_
- ✘ `D-dis-0002` El clima y el estado del suelo influyen en la distancia de frenado: en un suelo mojado el vehículo puede necesitar más distancia para frenar. _(MANUAL_DGT Tema 10, Distancia de frenado (pág. 262))_

## res-dist-0002

Según el manual de la DGT, si llueve o es de noche, ¿cuánto conviene aumentar la separación con el vehículo de delante?  
Respuesta: **Al menos un segundo más.**

- ✔ El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado. _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_
- ✘ `dist-0005` Los conductores de vehículos a motor deben dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril. _(RGC 153.4)_
- ✘ `dist-0001` En túneles o pasos inferiores hay que mantener al menos 100 metros o un intervalo mínimo de cuatro segundos. _(RGC 95.6)_

## res-vel-0001

Fuera de poblado, un vehículo especial sin remolque, con señalización de frenado, que por construcción puede superar los 60 km/h en llano y cumple sus normas técnicas, ¿a qué velocidad máxima puede circular?  
Respuesta: **70 km/h.**

- ✔ Los vehículos especiales tienen 40 km/h, salvo que puedan superar 60 km/h en llano y cumplan las normas de los vehículos: entonces 70 km/h. Si no tienen señalización de frenado, llevan remolque o son motocultores, 25 km/h. _(RGC 48.1.c.2º)_
- ✘ `vel-0018` En travesías y en vías urbanas de dos o más carriles por sentido, los vehículos con mercancías peligrosas circulan como máximo a 40 km/h. _(RGC 50.4)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## res-vel-0002

Fuera de poblado, el límite de velocidad de los ciclos es de 45 km/h. ¿Puede un ciclista superarlo?  
Respuesta: **Sí, en los tramos en que las circunstancias de la vía permitan una velocidad superior.**

- ✔ El límite de 45 km/h es para ciclos, ciclomotores y cuadriciclos ligeros, pero los conductores de bicicletas pueden superarlo donde las circunstancias de la vía lo permitan. _(RGC 48.1.e)_
- ✘ `vel-0017` El límite genérico en autopistas y autovías que transcurren dentro de poblado es 80 km/h (ampliable con señalización específica). _(RGC 50.6)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## res-luc-0001

A media mañana entra en un túnel insuficientemente iluminado, a 80 km/h y sin nadie a quien deslumbrar. ¿Qué alumbrado debe llevar?  
Respuesta: **El de largo alcance o carretera.**

- ✔ En túneles insuficientemente iluminados, a más de 40 km/h, hay que llevar la luz de carretera salvo que haya que usar la de cruce (por ejemplo, para no deslumbrar). En túneles suficientemente iluminados, la de cruce. _(RGC 100.1)_
- ✘ `C-luc-0008` En una travesía insuficientemente iluminada el vehículo parado o estacionado de noche debe llevar las luces de posición, sustituibles por las de estacionamiento o por las dos de posición del lado de la calzada si está en línea. _(RGC 105.2)_
- ✘ `C-luc-0005` La luz de carretera debe sustituirse por la de cruce en cuanto exista posibilidad de deslumbrar, especialmente a quienes circulan en sentido contrario, aunque estos no cumplan la norma. _(RGC 102.1)_

## res-luc-0002

En un turismo, ¿qué luces antiniebla son obligatorias?  
Respuesta: **Solo la trasera; la delantera es opcional.**

- ✔ Todo automóvil debe llevar luz antiniebla trasera. La antiniebla delantera es un dispositivo facultativo. _(RGV 17.1)_
- ✘ `E-neu-0005` El Reglamento de Vehículos exige que los neumáticos no presenten ampollas, deformaciones anormales ni roturas, con independencia de la profundidad del dibujo. _(RGV Anexo VII.4)_
- ✘ `res-veh-0001` En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo). _(RGV Anexo III.3 (tabla))_

## res-veh-0001

Una motocicleta cuya velocidad máxima por construcción es superior a 100 km/h, ¿qué retrovisores exteriores debe llevar?  
Respuesta: **El izquierdo y el derecho.**

- ✔ En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo). _(RGV Anexo III.3 (tabla))_
- ✘ `A-adv-0010` En los turismos (M1), cuando el retrovisor interior no permite la visión del campo reglamentario hacia atrás, este pasa a ser opcional y debe colocarse un segundo retrovisor exterior en el lado derecho. _(RGV Anexo III.2, nota (1))_
- ✘ `E-mec-0001` La suspensión mantiene los neumáticos en contacto con la carretera, lo que da estabilidad y además comodidad. _(MANUAL_DGT Tema 15, Sistema de suspensión (p. 382))_

## res-car-0001

¿Cuál es la longitud máxima de un camión rígido (vehículo de motor que no es autobús), incluida la carga?  
Respuesta: **12 metros.**

- ✔ La longitud máxima de los vehículos de motor (excepto autobuses) es 12 m. Los vehículos articulados llegan a 16,50 m y los trenes de carretera a 18,75 m. La carga no puede hacer que se superen estas medidas (RGC 13.1). _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0012` En vehículos exclusivamente de mercancías, si la dimensión menor de la carga indivisible supera el ancho del vehículo, puede sobresalir 0,40 m por cada lateral con un ancho total máximo de 2,55 m. _(RGC 15.2.b)_
- ✘ `C-car-0002` Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar remolque solo de día y sin condiciones que disminuyan la visibilidad (entre otras condiciones). _(RGC 12.3.a)_

## res-car-0002

Como norma general, ¿cuál es la altura máxima de un vehículo, incluida la carga?  
Respuesta: **4,00 metros.**

- ✔ La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0002` Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar remolque solo de día y sin condiciones que disminuyan la visibilidad (entre otras condiciones). _(RGC 12.3.a)_
- ✘ `C-car-0010` En vehículos no destinados exclusivamente a mercancías, la carga puede sobresalir por detrás hasta el 10 % de su longitud, o el 15 % si es indivisible. _(RGC 15.3)_

## res-itv-0001

Un turismo particular, ¿con qué frecuencia debe pasar la ITV?  
Respuesta: **Exento hasta los 4 años; cada dos años hasta los 10; y después, cada año.**

- ✔ Turismos (M1): exentos hasta 4 años, bienal de 4 a 10 años y anual a partir de 10. No se aplica a taxis, ambulancias, autoescuelas ni transporte escolar, que tienen plazos más cortos. _(ITV 6.1 (tabla))_
- ✘ `res-itv-0005` Los defectos muy graves inhabilitan al vehículo para circular: el traslado se hace por medios ajenos al vehículo. Una vez reparado, debe volver a la ITV en un plazo no superior a dos meses. _(ITV 11.3)_
- ✘ `C-doc-0008` En conjuntos con remolque de MMA igual o inferior a 750 kg se lleva la tarjeta de inspección técnica del remolque, y en la del automóvil debe constar que tiene un enganche compatible. _(RGV 26.1.c)_

## res-itv-0002

Una furgoneta de 3.500 kg de MMA o menos (categoría N1), ¿con qué frecuencia debe pasar la ITV?  
Respuesta: **Exenta hasta 2 años; cada dos años de 2 a 6; cada año de 6 a 10; y cada seis meses a partir de 10.**

- ✔ N1 (mercancías hasta 3,5 t): exenta hasta 2 años, bienal de 2 a 6, anual de 6 a 10 y semestral a partir de 10 años. _(ITV 6.1 (tabla))_
- ✘ `res-itv-0004` Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_
- ✘ `C-doc-0002` El distintivo V-19 indica que el vehículo ha superado favorablemente la ITV periódica y la fecha de la próxima inspección. _(RGV Anexo XI, V-19)_

## res-itv-0003

Una motocicleta, ¿con qué frecuencia debe pasar la ITV?  
Respuesta: **Exenta hasta 4 años y después cada dos años.**

- ✔ Motocicletas (resto de categoría L): exentas hasta 4 años y después bienal. Los ciclomotores: exentos hasta 3 años y después bienal. _(ITV 6.1 (tabla))_
- ✘ `res-itv-0004` Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_
- ✘ `C-doc-0003` El conductor debe llevar y exhibir el permiso de circulación (o autorización provisional) y la tarjeta de inspección técnica. _(RGV 26.1)_

## res-itv-0004

Su turismo saca una ITV desfavorable (defectos graves). ¿Puede circular con él?  
Respuesta: **Solo para llevarlo al taller y volver a la ITV, en un plazo no superior a dos meses.**

- ✔ Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_
- ✘ `res-itv-0002` N1 (mercancías hasta 3,5 t): exenta hasta 2 años, bienal de 2 a 6, anual de 6 a 10 y semestral a partir de 10 años. _(ITV 6.1 (tabla))_
- ✘ `C-doc-0003` El conductor debe llevar y exhibir el permiso de circulación (o autorización provisional) y la tarjeta de inspección técnica. _(RGV 26.1)_

## res-itv-0005

Si la ITV es negativa (defectos muy graves), ¿cómo se traslada el vehículo desde la estación?  
Respuesta: **Por medios ajenos al propio vehículo (por ejemplo, en grúa).**

- ✔ Los defectos muy graves inhabilitan al vehículo para circular: el traslado se hace por medios ajenos al vehículo. Una vez reparado, debe volver a la ITV en un plazo no superior a dos meses. _(ITV 11.3)_
- ✘ `res-itv-0001` Turismos (M1): exentos hasta 4 años, bienal de 4 a 10 años y anual a partir de 10. No se aplica a taxis, ambulancias, autoescuelas ni transporte escolar, que tienen plazos más cortos. _(ITV 6.1 (tabla))_
- ✘ `C-doc-0008` En conjuntos con remolque de MMA igual o inferior a 750 kg se lleva la tarjeta de inspección técnica del remolque, y en la del automóvil debe constar que tiene un enganche compatible. _(RGV 26.1.c)_

## res-seg-0001

El seguro obligatorio del vehículo causante de un accidente, ¿cubre las lesiones de su propio conductor?  
Respuesta: **No, el seguro obligatorio no cubre las lesiones ni el fallecimiento del conductor del vehículo causante.**

- ✔ El seguro obligatorio cubre los daños a terceros (personas y bienes), pero no las lesiones o el fallecimiento del conductor causante ni los daños de su propio vehículo. _(LRCSCVM 5.1)_
- ✘ `res-itv-0005` Los defectos muy graves inhabilitan al vehículo para circular: el traslado se hace por medios ajenos al vehículo. Una vez reparado, debe volver a la ITV en un plazo no superior a dos meses. _(ITV 11.3)_
- ✘ `C-doc-0006` La tarjeta de inspección técnica documenta las características técnicas esenciales del vehículo y en ella se hacen constar las reformas autorizadas. _(LSV 67.2)_

## res-seg-0002

¿Cubre el seguro obligatorio los daños sufridos por el propio vehículo asegurado?  
Respuesta: **No.**

- ✔ La cobertura del seguro obligatorio no alcanza a los daños en el propio vehículo asegurado ni en las cosas transportadas en él. Si el otro conductor tiene la culpa, paga el seguro del otro, no el propio. _(LRCSCVM 5.2)_
- ✘ `C-doc-0006` La tarjeta de inspección técnica documenta las características técnicas esenciales del vehículo y en ella se hacen constar las reformas autorizadas. _(LSV 67.2)_
- ✘ `res-itv-0001` Turismos (M1): exentos hasta 4 años, bienal de 4 a 10 años y anual a partir de 10. No se aplica a taxis, ambulancias, autoescuelas ni transporte escolar, que tienen plazos más cortos. _(ITV 6.1 (tabla))_

## res-seg-0003

Un remolque de 600 kg de masa máxima autorizada, ¿necesita su propio seguro obligatorio?  
Respuesta: **No, los remolques de hasta 750 kg de MMA están exceptuados.**

- ✔ Están exceptuados de la obligación de asegurarse los remolques y semirremolques que no excedan de 750 kg de MMA. _(LRCSCVM 2.8.b)_
- ✘ `res-seg-0001` El seguro obligatorio cubre los daños a terceros (personas y bienes), pero no las lesiones o el fallecimiento del conductor causante ni los daños de su propio vehículo. _(LRCSCVM 5.1)_
- ✘ `res-def-0005` Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.d)_

## res-veh-0002

Un turismo arrastra un remolque ligero. ¿Debe llevar extintor?  
Respuesta: **Sí, porque turismo y remolque forman un conjunto de vehículos, y los conjuntos no especiales deben llevar extintor.**

- ✔ Un vehículo de motor enganchado a un remolque es un tren de carretera, es decir, un conjunto de vehículos. Los conjuntos de vehículos no especiales deben llevar un extintor homologado, además del V-16 y el chaleco. _(RGV Anexo XII.2)_
- ✘ `E-mec-0011` La dotación incluye una rueda completa de repuesto o de uso temporal con las herramientas para cambiarla, o un sistema alternativo con garantías suficientes (por ejemplo, un kit antipinchazos). _(RGV Anexo XII.1.c)_
- ✘ `E-aux-0011` El botiquín no figura en la dotación obligatoria del turismo (RGV, Anexo XII), pero el manual de la DGT aconseja llevarlo. _(MANUAL_DGT Tema 17, Comprobaciones de seguridad (p. 438))_

## res-perm-0001

¿A qué edad mínima se puede obtener el permiso de la clase A (motocicletas sin límite de potencia)?  
Respuesta: **20 años.**

- ✔ El permiso A se obtiene con 20 años cumplidos (y dos años de antigüedad en el A2). Hasta los 21 no autoriza a conducir triciclos de más de 15 kW. _(RGCOND 4.2 (tabla))_
- ✘ `C-perm-0017` A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_
- ✘ `C-perm-0009` Para vehículos especiales no agrícolas basta el B si no superan 40 km/h ni 3.500 kg de MMA; si superan cualquiera de los límites se requiere el permiso correspondiente a su MMA. _(RGCOND 5.8)_

## res-perm-0002

¿A qué edad mínima se puede obtener el permiso AM (ciclomotores)?  
Respuesta: **15 años.**

- ✔ El permiso AM se obtiene con 15 años cumplidos. El A1, con 16; el A2 y el B, con 18; el A, con 20. _(RGCOND 4.2 (tabla))_
- ✘ `C-perm-0009` Para vehículos especiales no agrícolas basta el B si no superan 40 km/h ni 3.500 kg de MMA; si superan cualquiera de los límites se requiere el permiso correspondiente a su MMA. _(RGCOND 5.8)_
- ✘ `C-perm-0005` Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_

## res-perm-0003

¿Qué limita el permiso A2?  
Respuesta: **La potencia de la moto: como máximo 35 kW y 0,2 kW/kg, y que no derive de un vehículo con más del doble de potencia.**

- ✔ El A2 se define por la potencia (máximo 35 kW y relación potencia/peso de 0,2 kW/kg), no por la cilindrada. _(RGCOND 4.2 (tabla))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0017` A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_

## res-pun-0001

¿Cuánto dura el curso de recuperación parcial de puntos?  
Respuesta: **12 horas.**

- ✔ El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial. _(OCURSOS Cuarto)_
- ✘ `C-pun-0016` No se pierden más de ocho puntos al día por acumulación de infracciones, salvo que concurran determinadas infracciones muy graves del art. 77, en cuyo caso se pierden todos los que correspondan. _(LSV 64.4)_
- ✘ `C-pun-0007` Los conductores profesionales son la excepción: pueden hacer el curso de recuperación parcial con frecuencia anual. _(LSV 65.4)_

## res-pun-0002

¿Cuánto dura el curso para recuperar el permiso tras perder todos los puntos?  
Respuesta: **24 horas.**

- ✔ El curso de recuperación del permiso o licencia dura 24 horas; el de recuperación parcial, 12. _(OCURSOS Quinto)_
- ✘ `C-pun-0015` La bonificación es de dos puntos durante los tres primeros años y de un punto por los tres siguientes. _(LSV 63.4)_
- ✘ `C-pun-0013` La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_

## res-del-0007

No socorrer a una persona herida en un accidente, desamparada y en peligro grave, pudiendo hacerlo sin riesgo propio ni de terceros, ¿qué es?  
Respuesta: **Un delito de omisión del deber de socorro.**

- ✔ Es delito no socorrer a quien está desamparado y en peligro manifiesto y grave, si se puede hacer sin riesgo. Si no se puede ayudar, hay que pedir auxilio con urgencia. _(CP 195.1)_
- ✘ `E-acc-0011` La V-16, de color amarillo auto, se coloca en la parte más alta posible del vehículo inmovilizado para que sea lo más visible posible; así no hay que caminar por la calzada. _(RGV Anexo XI, V-16.2)_
- ✘ `E-acc-0009` Se prohíbe cumplimentar el parte de accidente en la plataforma de circulación; debe hacerse en un lugar seguro fuera de la vía. _(RGC 130.5)_

## res-alc-0001

Una persona adulta que conduce un patinete eléctrico (vehículo de movilidad personal), con carácter general, ¿qué tasa máxima de alcohol en aire espirado puede tener?  
Respuesta: **0,25 mg/l.**

- ✔ El VMP es un vehículo y la tasa general para conductores de vehículos es 0,25 mg/l en aire espirado (0,5 g/l en sangre). Los conductores menores de edad no pueden tener ninguna tasa (0). _(RGC 20)_
- ✘ `D-alc-0001` El alcohol produce falsa seguridad en uno mismo, más exposición a riesgos, más faltas y un trato más agresivo o impulsivo hacia otros conductores. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 56))_
- ✘ `D-alc-0004` El momento en que la tasa de alcoholemia es más alta es aproximadamente una hora después de beber; después baja muy poco a poco. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_

## res-fat-0001

Al volante empieza a notar los primeros síntomas de sueño. Según el manual de la DGT, ¿qué debe hacer?  
Respuesta: **Parar en un lugar seguro y dormir 20 o 30 minutos.**

- ✔ El manual de la DGT dice que, con los primeros síntomas, hay que parar en un lugar seguro y dormir 20 o 30 minutos, y descansar 20 o 30 minutos cada dos horas o 200 km. _(MANUAL_DGT Tema 3, fatiga y somnolencia (p. 51))_
- ✘ `D-cal-0001` Con calor aparecen antes el sueño y la fatiga, se puede necesitar más tiempo para reaccionar ante imprevistos y puede aumentar la agresividad hacia otros conductores. _(MANUAL_DGT Tema 14, Conducir con calor (pág. 363))_
- ✘ `D-tre-0002` La fatiga, el sueño, la edad avanzada, oír o ver mal y las enfermedades son factores que hacen que se tarde más tiempo en reaccionar. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 45))_

## res-seg-0004

Según el manual de la DGT, al girar el volante, ¿se deben cruzar las manos?  
Respuesta: **No: el volante se coge sin cruzar las manos al girarlo.**

- ✔ El manual de la DGT indica coger el volante con las dos manos, por la parte exterior, con firmeza pero sin mucha fuerza y sin cruzar las manos al girar. _(MANUAL_DGT Tema 6, cómo coger el volante (p. 123))_
- ✘ `D-pos-0004` El asiento está bien ajustado cuando se llega bien a los pedales pudiendo pisarlos a fondo y las piernas no están extendidas del todo, sino ligeramente dobladas. _(MANUAL_DGT Tema 6, Reglas para conducir turismos (pág. 130))_
- ✘ `D-man-0005` El embrague de la motocicleta es una palanca de la mano izquierda; el cambio de marchas se hace con un pedal que suele estar a la izquierda. _(MANUAL_DGT Tema 6, Mandos de las motocicletas (pág. 124))_

## res-acc-0001

Según el manual de la DGT, ¿cuándo hay más accidentes?  
Respuesta: **Los fines de semana y los días de fiesta, en especial de madrugada.**

- ✔ El manual de la DGT indica que hay más accidentes los fines de semana y los días de fiesta, en especial en las horas de la madrugada. _(MANUAL_DGT Tema 16 (p. 391))_
- ✘ `E-acc-0003` Si aparentemente hay heridos o muertos, el implicado debe avisar a la autoridad y permanecer o volver al lugar hasta su llegada, salvo las excepciones del artículo. _(RGC 129.2.e)_
- ✘ `D-acc-0005` Hay menos accidentes en autopistas y autovías que en el resto de carreteras: tienen calzadas separadas para cada sentido y no tienen cruces a nivel. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_

## res-ref-0001

Un ciclista circula de noche por una vía interurbana. ¿A qué distancia mínima debe ser visible el elemento luminoso o reflectante que debe llevar?  
Respuesta: **150 metros.**

- ✔ Entre el ocaso y la salida del sol o con poca visibilidad, en vía interurbana, el ciclista debe llevar al menos un elemento luminoso o reflectante visible a 150 m. El chaleco del conductor de un turismo no tiene esa exigencia de distancia: debe ser de alta visibilidad certificado. _(RGC 118.2)_
- ✘ `D-vul-0001` Las personas mayores tienen más accidentes cuando van solas que cuando van acompañadas por niños: con niños son más prudentes para darles buen ejemplo y protegerles. _(MANUAL_DGT Tema 16, Las personas mayores (pág. 402))_
- ✘ `D-vul-0002` Los niños son más bajos que los adultos: ven menos tramo de carretera y los conductores los ven peor. Además prestan menos atención y no conocen las normas de tráfico. _(MANUAL_DGT Tema 16, Los niños (pág. 401))_

## res-sen-0001

¿De qué color es el fondo del cartel que identifica una carretera autonómica de segundo nivel (por ejemplo, ZA-320)?  
Respuesta: **Marrón.**

- ✔ En el catálogo vigente de señales: itinerario europeo (E) en verde; autopistas y autovías en azul; carreteras del Estado en rojo; autonómicas de primer nivel en naranja, de segundo nivel en marrón y de tercer nivel en amarillo. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.13 (S-440))_
- ✘ `B2-sen-0004` Mediante un panel complementario puede indicarse la distancia entre la señal y el principio del tramo peligroso y también la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B2-sen-0006` Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_

## res-sen-0002

¿De qué color es el fondo del cartel que identifica una carretera de la red del Estado que no es autopista ni autovía (por ejemplo, N-401)?  
Respuesta: **Rojo.**

- ✔ Las carreteras convencionales o multicarril de la red del Estado se identifican con fondo rojo (S-420). Las autopistas y autovías, con fondo azul (S-410). _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.13 (S-420))_
- ✘ `B2-sen-0004` Mediante un panel complementario puede indicarse la distancia entre la señal y el principio del tramo peligroso y también la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_

## res-sen-0003

Antes de un paso a nivel, una baliza rectangular con tres franjas rojas en el lado derecho indica que el paso a nivel está a...  
Respuesta: **200 metros.**

- ✔ La baliza de tres franjas (P-9a) está a 200 m; la de dos franjas (P-9b) a 150 m, y la de una franja (P-9c) a 100 m. Las de 300, 200 y 100 m son las de aproximación a una salida de autopista o autovía. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.1 (P-9a))_
- ✘ `B2-sen-0004` Mediante un panel complementario puede indicarse la distancia entre la señal y el principio del tramo peligroso y también la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_

## res-sen-0004

Una señal de velocidad máxima está en el mismo poste que una señal de peligro. ¿Hasta dónde obliga la limitación?  
Respuesta: **Hasta que termine el peligro señalado.**

- ✔ Si la R-301 está en el mismo poste o panel que una señal de peligro, la limitación termina cuando termina el peligro. Esto lo dice la ficha de la velocidad máxima; la de adelantamiento prohibido no tiene esta regla. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.5 (R-301))_
- ✘ `B2-sen-0006` Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_

## res-sen-0005

En una zona de estancia y juego, ¿cuál es la velocidad máxima de los vehículos?  
Respuesta: **10 km/h.**

- ✔ En la zona de estancia y juego (S-28) la velocidad máxima es 10 km/h, los peatones tienen prioridad y los juegos y deportes están autorizados. No hay que confundirla con la zona de coexistencia, que es de 20 km/h. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.8 (S-28))_
- ✘ `B2-sen-0016` En el orden de prioridad las marcas viales van detrás de semáforos y señales verticales; en caso de contradicción prevalece la preferente según ese orden. _(RGC 133)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_

## bm13-0001

Para un turismo y tiene que dejar su puesto de conductor. ¿Qué debe hacer con el motor?  
Respuesta: **Pararlo y desconectar el sistema de arranque.**

- ✔ Si el conductor de un vehículo a motor tiene que dejar su puesto, debe parar el motor y desconectar el sistema de arranque. _(RGC 92.3.a)_
- ✘ `bm13-0015` En caso de incendio, el conductor y los ocupantes abandonan el vehículo y se dirigen rápidamente al refugio o salida más próximos, en sentido contrario al del fuego. _(RGC 97.3)_
- ✘ `bm13-0011` En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos. _(RGC 115.4)_

## bm13-0002

Si, además de dejar su puesto, se aleja del vehículo, ¿qué obligación añadida tiene?  
Respuesta: **Adoptar las precauciones necesarias para impedir su uso sin autorización.**

- ✔ Cuando el conductor se aleja del vehículo debe adoptar las precauciones necesarias para impedir que otra persona lo use sin autorización (por ejemplo, cerrarlo y llevarse la llave). _(RGC 92.3.a)_
- ✘ `bm13-0012` Si un conductor queda inmovilizado en un túnel por una emergencia, debe apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición. _(RGC 97.3.a)_
- ✘ `bm13-0005` Se prohíbe abrir las puertas o apearse sin haberse cerciorado antes de que no implica peligro o entorpecimiento para otros usuarios, especialmente para los ciclistas. _(RGC 114.1)_

## bm13-0003

Estaciona un turismo con cambio automático. Además del freno de estacionamiento, ¿qué debe dejar seleccionado?  
Respuesta: **La posición de estacionamiento.**

- ✔ El reglamento pide dejar la primera o la marcha atrás en los vehículos con caja de cambios manual, «o, en su caso, la posición de estacionamiento» (la P de los cambios automáticos). _(RGC 92.3.c)_
- ✘ `bm13-0009` Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición. _(RGC 115.2)_
- ✘ `bm13-0017` En un túnel, si queda inmovilizado por necesidades de la circulación, debe detenerse lo más lejos posible del vehículo que le precede. _(RGC 97.3)_

## bm13-0004

El conductor de un camión que calzó su vehículo para estacionar en una pendiente va a reanudar la marcha. ¿Qué debe hacer con los calzos?  
Respuesta: **Retirarlos de la vía.**

- ✔ Los calzos, una vez utilizados, deben retirarse de la vía al reanudar la marcha. _(RGC 92.3.d)_
- ✘ `bm13-0007` Como norma general se entra y se sale por el lado más próximo al borde de la vía y solo cuando el vehículo está parado. _(RGC 114.2)_
- ✘ `bm13-0011` En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos. _(RGC 115.4)_

## bm13-0005

Antes de abrir la puerta para bajar del vehículo, ¿qué debe hacer?  
Respuesta: **Asegurarse de que no supone peligro ni entorpecimiento para otros usuarios, especialmente ciclistas.**

- ✔ Se prohíbe abrir las puertas o apearse sin haberse cerciorado antes de que no implica peligro o entorpecimiento para otros usuarios, especialmente para los ciclistas. _(RGC 114.1)_
- ✘ `bm13-0013` Tanto el conductor como los demás ocupantes deben abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si existen zonas excluidas a la circulación de vehículos. _(RGC 97.3.e)_
- ✘ `bm13-0001` Si el conductor de un vehículo a motor tiene que dejar su puesto, debe parar el motor y desconectar el sistema de arranque. _(RGC 92.3.a)_

## bm13-0006

Un pasajero quiere abrir la puerta cuando el vehículo aún avanza muy despacio, a punto de detenerse. ¿Está permitido?  
Respuesta: **No, se prohíbe abrir las puertas antes de la completa inmovilización del vehículo.**

- ✔ Está prohibido abrir las puertas del vehículo antes de su completa inmovilización. _(RGC 114.1)_
- ✘ `bm13-0001` Si el conductor de un vehículo a motor tiene que dejar su puesto, debe parar el motor y desconectar el sistema de arranque. _(RGC 92.3.a)_
- ✘ `bm13-0017` En un túnel, si queda inmovilizado por necesidades de la circulación, debe detenerse lo más lejos posible del vehículo que le precede. _(RGC 97.3)_

## bm13-0007

Como norma general, ¿por qué lado se debe entrar y salir del vehículo?  
Respuesta: **Por el lado más próximo al borde de la vía, y solo con el vehículo parado.**

- ✔ Como norma general se entra y se sale por el lado más próximo al borde de la vía y solo cuando el vehículo está parado. _(RGC 114.2)_
- ✘ `bm13-0004` Los calzos, una vez utilizados, deben retirarse de la vía al reanudar la marcha. _(RGC 92.3.d)_
- ✘ `bm13-0011` En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos. _(RGC 115.4)_

## bm13-0008

Aunque no vaya a abandonar su puesto, ¿en cuál de estos casos debe parar el motor?  
Respuesta: **Durante la carga de combustible.**

- ✔ Aun cuando el conductor no abandone su puesto, debe parar el motor cuando el vehículo esté detenido dentro de un túnel o en un lugar cerrado y durante la carga de combustible. _(RGC 115.1)_
- ✘ `bm13-0002` Cuando el conductor se aleja del vehículo debe adoptar las precauciones necesarias para impedir que otra persona lo use sin autorización (por ejemplo, cerrarlo y llevarse la llave). _(RGC 92.3.a)_
- ✘ `bm13-0007` Como norma general se entra y se sale por el lado más próximo al borde de la vía y solo cuando el vehículo está parado. _(RGC 114.2)_

## bm13-0009

Debe permanecer detenido dentro de un túnel más de dos minutos. Al parar el motor, ¿qué alumbrado debe conservar encendido?  
Respuesta: **El de posición.**

- ✔ Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición. _(RGC 115.2)_
- ✘ `bm13-0013` Tanto el conductor como los demás ocupantes deben abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si existen zonas excluidas a la circulación de vehículos. _(RGC 97.3.e)_
- ✘ `bm13-0005` Se prohíbe abrir las puertas o apearse sin haberse cerciorado antes de que no implica peligro o entorpecimiento para otros usuarios, especialmente para los ciclistas. _(RGC 114.1)_

## bm13-0010

Para cargar combustible en una gasolinera, ¿qué debe estar apagado?  
Respuesta: **El motor, las luces, los sistemas eléctricos como la radio y los teléfonos móviles.**

- ✔ No se puede facilitar combustible si no están parados el motor y apagadas las luces, los sistemas eléctricos como la radio y los dispositivos que emiten radiación electromagnética, como los móviles. Si no hay empleados, el conductor debe cumplir lo mismo. _(RGC 115.3)_
- ✘ `bm13-0016` Si un vehículo queda inmovilizado en un túnel por necesidades de la circulación, el conductor y los pasajeros no deben abandonarlo; deben conectar temporalmente la señal de emergencia, mantener las luces de posición y apagar el motor. _(RGC 97.3)_
- ✘ `bm13-0018` Si por accidente o avería el vehículo o su carga obstaculizan la calzada, tras señalizar hay que retirarlo en el menor tiempo posible y, siempre que sea factible, sacarlo de la calzada y estacionarlo correctamente. _(RGC 130.1)_

## bm13-0011

En una gasolinera sin empleados, ¿quién debe asegurarse de que el motor, las luces, la radio y los móviles estén apagados al repostar?  
Respuesta: **El conductor o la persona que vaya a cargar el combustible.**

- ✔ En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos. _(RGC 115.4)_
- ✘ `bm13-0012` Si un conductor queda inmovilizado en un túnel por una emergencia, debe apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición. _(RGC 97.3.a)_
- ✘ `bm13-0005` Se prohíbe abrir las puertas o apearse sin haberse cerciorado antes de que no implica peligro o entorpecimiento para otros usuarios, especialmente para los ciclistas. _(RGC 114.1)_

## bm13-0012

Por una emergencia, su vehículo queda inmovilizado dentro de un túnel. ¿Qué debe hacer con el motor y las luces?  
Respuesta: **Apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición.**

- ✔ Si un conductor queda inmovilizado en un túnel por una emergencia, debe apagar el motor, conectar la señal de emergencia y mantener encendidas las luces de posición. _(RGC 97.3.a)_
- ✘ `bm13-0003` El reglamento pide dejar la primera o la marcha atrás en los vehículos con caja de cambios manual, «o, en su caso, la posición de estacionamiento» (la P de los cambios automáticos). _(RGC 92.3.c)_
- ✘ `bm13-0011` En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos. _(RGC 115.4)_

## bm13-0013

Su vehículo queda inmovilizado por una emergencia dentro de un túnel. ¿Qué deben hacer usted y sus pasajeros?  
Respuesta: **Abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si hay zonas excluidas a la circulación.**

- ✔ Tanto el conductor como los demás ocupantes deben abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si existen zonas excluidas a la circulación de vehículos. _(RGC 97.3.e)_
- ✘ `bm13-0009` Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición. _(RGC 115.2)_
- ✘ `bm13-0018` Si por accidente o avería el vehículo o su carga obstaculizan la calzada, tras señalizar hay que retirarlo en el menor tiempo posible y, siempre que sea factible, sacarlo de la calzada y estacionarlo correctamente. _(RGC 130.1)_

## bm13-0014

Su vehículo se incendia dentro de un túnel. Tras acercarlo a la derecha y apagar el motor, ¿qué debe hacer con la llave y las puertas antes de abandonarlo?  
Respuesta: **Dejar la llave puesta y las puertas abiertas.**

- ✔ En caso de incendio en un túnel, el conductor apaga el motor y deja la llave puesta y las puertas abiertas. _(RGC 97.3)_
- ✘ `bm13-0011` En ausencia de empleados, el conductor o la persona que vaya a cargar el combustible debe cumplir los mismos requisitos. _(RGC 115.4)_
- ✘ `bm13-0004` Los calzos, una vez utilizados, deben retirarse de la vía al reanudar la marcha. _(RGC 92.3.d)_

## bm13-0015

Hay un incendio dentro de un túnel y debe abandonar su vehículo. ¿Hacia dónde debe dirigirse?  
Respuesta: **Hacia el refugio o salida más próximos, en sentido contrario al del fuego.**

- ✔ En caso de incendio, el conductor y los ocupantes abandonan el vehículo y se dirigen rápidamente al refugio o salida más próximos, en sentido contrario al del fuego. _(RGC 97.3)_
- ✘ `bm13-0005` Se prohíbe abrir las puertas o apearse sin haberse cerciorado antes de que no implica peligro o entorpecimiento para otros usuarios, especialmente para los ciclistas. _(RGC 114.1)_
- ✘ `bm13-0009` Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición. _(RGC 115.2)_

## bm13-0016

Queda detenido dentro de un túnel por un atasco (por necesidades de la circulación). ¿Deben abandonar el vehículo usted y sus pasajeros?  
Respuesta: **No, no deben abandonar el vehículo.**

- ✔ Si un vehículo queda inmovilizado en un túnel por necesidades de la circulación, el conductor y los pasajeros no deben abandonarlo; deben conectar temporalmente la señal de emergencia, mantener las luces de posición y apagar el motor. _(RGC 97.3)_
- ✘ `bm13-0009` Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición. _(RGC 115.2)_
- ✘ `bm13-0003` El reglamento pide dejar la primera o la marcha atrás en los vehículos con caja de cambios manual, «o, en su caso, la posición de estacionamiento» (la P de los cambios automáticos). _(RGC 92.3.c)_

## bm13-0017

Queda detenido por un atasco dentro de un túnel. ¿Dónde debe detenerse respecto al vehículo que le precede?  
Respuesta: **Lo más lejos posible del vehículo que le precede.**

- ✔ En un túnel, si queda inmovilizado por necesidades de la circulación, debe detenerse lo más lejos posible del vehículo que le precede. _(RGC 97.3)_
- ✘ `bm13-0001` Si el conductor de un vehículo a motor tiene que dejar su puesto, debe parar el motor y desconectar el sistema de arranque. _(RGC 92.3.a)_
- ✘ `bm13-0006` Está prohibido abrir las puertas del vehículo antes de su completa inmovilización. _(RGC 114.1)_

## bm13-0018

Su vehículo averiado obstaculiza la calzada. Después de señalizarlo, ¿qué debe hacer?  
Respuesta: **Adoptar las medidas necesarias para que sea retirado cuanto antes y, si es factible, sacarlo de la calzada y situarlo cumpliendo las normas de estacionamiento.**

- ✔ Si por accidente o avería el vehículo o su carga obstaculizan la calzada, tras señalizar hay que retirarlo en el menor tiempo posible y, siempre que sea factible, sacarlo de la calzada y estacionarlo correctamente. _(RGC 130.1)_
- ✘ `bm13-0002` Cuando el conductor se aleja del vehículo debe adoptar las precauciones necesarias para impedir que otra persona lo use sin autorización (por ejemplo, cerrarlo y llevarse la llave). _(RGC 92.3.a)_
- ✘ `bm13-0009` Si debe permanecer detenido en un túnel u otro lugar cerrado más de dos minutos, ha de interrumpir el funcionamiento del motor, conservando encendido el alumbrado de posición. _(RGC 115.2)_

## bm13-0019

Tras una avería, su vehículo puede seguir circulando pero necesita un servicio de auxilio. ¿Qué debe hacer?  
Respuesta: **Abandonar cuanto antes los carriles de circulación y dirigirse a la primera salida disponible usando el arcén derecho.**

- ✔ Si el vehículo puede continuar pero necesita auxilio, debe abandonar lo antes posible los carriles de circulación y dirigirse hacia la primera salida usando el arcén derecho; si no es posible, detenerse en el arcén derecho o donde cause menor obstáculo. _(RGC 130.2)_
- ✘ `bm13-0013` Tanto el conductor como los demás ocupantes deben abandonar el vehículo y dirigirse rápidamente al refugio o salida más próximos, sin transitar por la calzada si existen zonas excluidas a la circulación de vehículos. _(RGC 97.3.e)_
- ✘ `bm13-0002` Cuando el conductor se aleja del vehículo debe adoptar las precauciones necesarias para impedir que otra persona lo use sin autorización (por ejemplo, cerrarlo y llevarse la llave). _(RGC 92.3.a)_

## bm3-0001

¿Cómo deben comportarse todos los usuarios de la vía?  
Respuesta: **De forma que no entorpezcan indebidamente la circulación ni causen peligro, perjuicios o molestias innecesarias a las personas, o daños a los bienes.**

- ✔ La norma general obliga a todos los usuarios de la vía (no solo a los conductores) a no entorpecer indebidamente ni causar peligro, perjuicios o molestias innecesarias, ni daños a los bienes. _(RGC 2)_
- ✘ `bm3-0019` El último de la fila puede dejar cinco o seis metros con el de delante, mantener el freno pisado y encender las luces de emergencia para que se le vea mejor, y vigilar por el retrovisor. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_
- ✘ `bm3-0005` El reglamento obliga a adoptar las precauciones necesarias al aproximarse a otros usuarios, especialmente niños, ancianos, invidentes u otras personas manifiestamente impedidas. _(RGC 17.1)_

## bm3-0002

Se debe conducir con la diligencia y precaución necesarias para evitar…  
Respuesta: **todo daño, propio o ajeno.**

- ✔ Hay que conducir con la diligencia y precaución necesarias para evitar todo daño, propio o ajeno, sin poner en peligro al conductor, a los ocupantes ni al resto de usuarios. _(RGC 3.1)_
- ✘ `bm3-0006` Se circula a velocidad moderada, e incluso se detiene el vehículo, cuando hay peatones en la vía o pueda preverse racionalmente su irrupción en ella, principalmente si se trata de niños, ancianos o personas con discapacidad. _(RGC 46.1.a)_
- ✘ `bm3-0013` La conducción preventiva se basa en visión, anticipación y espacio. Anticiparse es prever los movimientos y reacciones de los demás para reaccionar a tiempo. _(MANUAL_DGT Tema 17, Conducción preventiva (p. 441))_

## bm3-0003

La conducción negligente, ¿qué tipo de infracción es?  
Respuesta: **Grave.**

- ✔ La conducción negligente es infracción grave; la temeraria, muy grave (también en la Ley de Tráfico, arts. 76.m y 77.e). _(RGC 3.2)_
- ✘ `bm3-0010` Las señales acústicas solo se usan excepcionalmente o cuando lo prevea una norma, de sonido no estridente, y queda prohibido su uso inmotivado o exagerado. _(RGC 110.1)_
- ✘ `bm3-0014` La DGT recomienda conducir con más cuidado cerca de vehículos aparcados con personas dentro, porque alguna puede bajarse sin mirar. _(MANUAL_DGT Tema 16, Los peatones (p. 397))_

## bm3-0004

La conducción temeraria, cuando no es delito, ¿qué tipo de infracción es?  
Respuesta: **Muy grave.**

- ✔ La conducción temeraria tiene la consideración de infracción muy grave (Ley de Tráfico, art. 77.e). Si además pone en concreto peligro la vida o la integridad de las personas, es delito (Código Penal, art. 380). _(RGC 3.2)_
- ✘ `bm3-0007` Al aproximarse a un autobús en situación de parada, principalmente si es de transporte escolar, hay que circular a velocidad moderada y detenerse si fuera preciso. _(RGC 46.1.e)_
- ✘ `bm3-0001` La norma general obliga a todos los usuarios de la vía (no solo a los conductores) a no entorpecer indebidamente ni causar peligro, perjuicios o molestias innecesarias, ni daños a los bienes. _(RGC 2)_

## bm3-0005

Al aproximarse a otros usuarios de la vía, ¿con quiénes debe extremar especialmente las precauciones?  
Respuesta: **Con los niños, los ancianos, los invidentes y otras personas manifiestamente impedidas.**

- ✔ El reglamento obliga a adoptar las precauciones necesarias al aproximarse a otros usuarios, especialmente niños, ancianos, invidentes u otras personas manifiestamente impedidas. _(RGC 17.1)_
- ✘ `bm3-0011` Quien crea un obstáculo o peligro en la vía debe hacerlo desaparecer lo antes posible y, mientras tanto, tomar las medidas necesarias para que lo adviertan los demás usuarios y no se dificulte la circulación. _(RGC 5.1)_
- ✘ `bm3-0004` La conducción temeraria tiene la consideración de infracción muy grave (Ley de Tráfico, art. 77.e). Si además pone en concreto peligro la vida o la integridad de las personas, es delito (Código Penal, art. 380). _(RGC 3.2)_

## bm3-0006

¿Hay que moderar la velocidad solo cuando ya hay peatones en la calzada?  
Respuesta: **No, también cuando pueda preverse racionalmente su irrupción en ella.**

- ✔ Se circula a velocidad moderada, e incluso se detiene el vehículo, cuando hay peatones en la vía o pueda preverse racionalmente su irrupción en ella, principalmente si se trata de niños, ancianos o personas con discapacidad. _(RGC 46.1.a)_
- ✘ `bm3-0018` La DGT recomienda dejar al menos dos o tres metros al detenerse: así se puede avisar si el de delante echa marcha atrás, rodearlo si se queda parado y no golpearlo si a usted le golpean por detrás. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_
- ✘ `bm3-0011` Quien crea un obstáculo o peligro en la vía debe hacerlo desaparecer lo antes posible y, mientras tanto, tomar las medidas necesarias para que lo adviertan los demás usuarios y no se dificulte la circulación. _(RGC 5.1)_

## bm3-0007

Se aproxima a un autobús de transporte escolar detenido en una parada. ¿Qué debe hacer?  
Respuesta: **Circular a velocidad moderada y, si fuera preciso, detenerse.**

- ✔ Al aproximarse a un autobús en situación de parada, principalmente si es de transporte escolar, hay que circular a velocidad moderada y detenerse si fuera preciso. _(RGC 46.1.e)_
- ✘ `bm3-0017` La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad. _(MANUAL_DGT Tema 16, Motocicletas y ciclomotores (p. 411))_
- ✘ `bm3-0002` Hay que conducir con la diligencia y precaución necesarias para evitar todo daño, propio o ajeno, sin poner en peligro al conductor, a los ocupantes ni al resto de usuarios. _(RGC 3.1)_

## bm3-0008

¿Están obligados los conductores a advertir a los demás usuarios de las maniobras que van a efectuar?  
Respuesta: **Sí, siempre.**

- ✔ Los conductores están obligados a advertir al resto de usuarios de las maniobras que vayan a efectuar; como norma general, con la señalización luminosa o, en su defecto, con el brazo. _(RGC 108.1)_
- ✘ `bm3-0012` Se prohíbe arrojar a la vía o a sus inmediaciones cualquier objeto que pueda dar lugar a incendios o poner en peligro la seguridad vial. Es infracción grave. _(RGC 6.1)_
- ✘ `bm3-0007` Al aproximarse a un autobús en situación de parada, principalmente si es de transporte escolar, hay que circular a velocidad moderada y detenerse si fuera preciso. _(RGC 46.1.e)_

## bm3-0009

Va a frenar de modo considerable por las circunstancias del tráfico. ¿Debe advertirlo?  
Respuesta: **Sí, siempre que sea posible, con el empleo reiterado de las luces de frenado o con el brazo.**

- ✔ La intención de inmovilizar el vehículo o de frenar de modo considerable, aunque la impongan las circunstancias del tráfico, debe advertirse, siempre que sea posible, con el empleo reiterado de las luces de frenado o moviendo el brazo de arriba abajo. _(RGC 109.2.c)_
- ✘ `bm3-0006` Se circula a velocidad moderada, e incluso se detiene el vehículo, cuando hay peatones en la vía o pueda preverse racionalmente su irrupción en ella, principalmente si se trata de niños, ancianos o personas con discapacidad. _(RGC 46.1.a)_
- ✘ `bm3-0018` La DGT recomienda dejar al menos dos o tres metros al detenerse: así se puede avisar si el de delante echa marcha atrás, rodearlo si se queda parado y no golpearlo si a usted le golpean por detrás. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_

## bm3-0010

¿Está permitido usar el claxon de forma inmotivada o exagerada?  
Respuesta: **No, está prohibido.**

- ✔ Las señales acústicas solo se usan excepcionalmente o cuando lo prevea una norma, de sonido no estridente, y queda prohibido su uso inmotivado o exagerado. _(RGC 110.1)_
- ✘ `bm3-0019` El último de la fila puede dejar cinco o seis metros con el de delante, mantener el freno pisado y encender las luces de emergencia para que se le vea mejor, y vigilar por el retrovisor. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_
- ✘ `bm3-0017` La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad. _(MANUAL_DGT Tema 16, Motocicletas y ciclomotores (p. 411))_

## bm3-0011

Quien ha creado un obstáculo o peligro en la vía, ¿qué debe hacer?  
Respuesta: **Hacerlo desaparecer lo antes posible y, mientras tanto, adoptar las medidas para que los demás lo adviertan.**

- ✔ Quien crea un obstáculo o peligro en la vía debe hacerlo desaparecer lo antes posible y, mientras tanto, tomar las medidas necesarias para que lo adviertan los demás usuarios y no se dificulte la circulación. _(RGC 5.1)_
- ✘ `bm3-0013` La conducción preventiva se basa en visión, anticipación y espacio. Anticiparse es prever los movimientos y reacciones de los demás para reaccionar a tiempo. _(MANUAL_DGT Tema 17, Conducción preventiva (p. 441))_
- ✘ `bm3-0017` La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad. _(MANUAL_DGT Tema 16, Motocicletas y ciclomotores (p. 411))_

## bm3-0012

¿Puede arrojar una colilla encendida por la ventanilla?  
Respuesta: **No, se prohíbe arrojar a la vía o sus inmediaciones cualquier objeto que pueda producir incendios.**

- ✔ Se prohíbe arrojar a la vía o a sus inmediaciones cualquier objeto que pueda dar lugar a incendios o poner en peligro la seguridad vial. Es infracción grave. _(RGC 6.1)_
- ✘ `bm3-0001` La norma general obliga a todos los usuarios de la vía (no solo a los conductores) a no entorpecer indebidamente ni causar peligro, perjuicios o molestias innecesarias, ni daños a los bienes. _(RGC 2)_
- ✘ `bm3-0010` Las señales acústicas solo se usan excepcionalmente o cuando lo prevea una norma, de sonido no estridente, y queda prohibido su uso inmotivado o exagerado. _(RGC 110.1)_

## bm3-0013

En la conducción preventiva, ¿en qué consiste la «anticipación»?  
Respuesta: **En prever los movimientos y reacciones de los demás conductores para poder reaccionar a tiempo.**

- ✔ La conducción preventiva se basa en visión, anticipación y espacio. Anticiparse es prever los movimientos y reacciones de los demás para reaccionar a tiempo. _(MANUAL_DGT Tema 17, Conducción preventiva (p. 441))_
- ✘ `bm3-0007` Al aproximarse a un autobús en situación de parada, principalmente si es de transporte escolar, hay que circular a velocidad moderada y detenerse si fuera preciso. _(RGC 46.1.e)_
- ✘ `bm3-0017` La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad. _(MANUAL_DGT Tema 16, Motocicletas y ciclomotores (p. 411))_

## bm3-0014

Circula junto a vehículos aparcados con personas dentro. ¿Qué precaución recomienda la DGT?  
Respuesta: **Conducir con más cuidado, porque alguna de esas personas puede bajarse sin mirar.**

- ✔ La DGT recomienda conducir con más cuidado cerca de vehículos aparcados con personas dentro, porque alguna puede bajarse sin mirar. _(MANUAL_DGT Tema 16, Los peatones (p. 397))_
- ✘ `bm3-0017` La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad. _(MANUAL_DGT Tema 16, Motocicletas y ciclomotores (p. 411))_
- ✘ `bm3-0005` El reglamento obliga a adoptar las precauciones necesarias al aproximarse a otros usuarios, especialmente niños, ancianos, invidentes u otras personas manifiestamente impedidas. _(RGC 17.1)_

## bm3-0015

Para evitar accidentes con ciclistas, ¿qué recomienda la DGT sobre el claxon?  
Respuesta: **No tocarlo cerca de ellos para no asustarles.**

- ✔ La DGT aconseja no tocar el claxon cerca de los ciclistas para no asustarles. _(MANUAL_DGT Tema 16, Bicicletas (p. 409))_
- ✘ `bm3-0014` La DGT recomienda conducir con más cuidado cerca de vehículos aparcados con personas dentro, porque alguna puede bajarse sin mirar. _(MANUAL_DGT Tema 16, Los peatones (p. 397))_
- ✘ `bm3-0003` La conducción negligente es infracción grave; la temeraria, muy grave (también en la Ley de Tráfico, arts. 76.m y 77.e). _(RGC 3.2)_

## bm3-0016

Vienen ciclistas en sentido contrario. ¿Qué recomienda la DGT sobre adelantar a otros vehículos en ese momento?  
Respuesta: **No adelantar.**

- ✔ Entre las medidas para evitar atropellos a ciclistas, la DGT indica no adelantar a otros vehículos si vienen ciclistas en sentido contrario. _(MANUAL_DGT Tema 16, Bicicletas (p. 408))_
- ✘ `bm3-0013` La conducción preventiva se basa en visión, anticipación y espacio. Anticiparse es prever los movimientos y reacciones de los demás para reaccionar a tiempo. _(MANUAL_DGT Tema 17, Conducción preventiva (p. 441))_
- ✘ `bm3-0008` Los conductores están obligados a advertir al resto de usuarios de las maniobras que vayan a efectuar; como norma general, con la señalización luminosa o, en su defecto, con el brazo. _(RGC 108.1)_

## bm3-0017

Circula cerca de una motocicleta. ¿Dónde recomienda la DGT situarse?  
Respuesta: **Delante o detrás de ella, no a su lado.**

- ✔ La DGT aconseja no quedarse al lado de un vehículo de dos ruedas, sino circular por delante o por detrás de él, y mantener la distancia de seguridad. _(MANUAL_DGT Tema 16, Motocicletas y ciclomotores (p. 411))_
- ✘ `bm3-0018` La DGT recomienda dejar al menos dos o tres metros al detenerse: así se puede avisar si el de delante echa marcha atrás, rodearlo si se queda parado y no golpearlo si a usted le golpean por detrás. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_
- ✘ `bm3-0012` Se prohíbe arrojar a la vía o a sus inmediaciones cualquier objeto que pueda dar lugar a incendios o poner en peligro la seguridad vial. Es infracción grave. _(RGC 6.1)_

## bm3-0018

Se detiene en un atasco o en un semáforo. ¿Qué distancia recomienda la DGT dejar como mínimo con el vehículo de delante?  
Respuesta: **Dos o tres metros.**

- ✔ La DGT recomienda dejar al menos dos o tres metros al detenerse: así se puede avisar si el de delante echa marcha atrás, rodearlo si se queda parado y no golpearlo si a usted le golpean por detrás. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_
- ✘ `bm3-0011` Quien crea un obstáculo o peligro en la vía debe hacerlo desaparecer lo antes posible y, mientras tanto, tomar las medidas necesarias para que lo adviertan los demás usuarios y no se dificulte la circulación. _(RGC 5.1)_
- ✘ `bm3-0013` La conducción preventiva se basa en visión, anticipación y espacio. Anticiparse es prever los movimientos y reacciones de los demás para reaccionar a tiempo. _(MANUAL_DGT Tema 17, Conducción preventiva (p. 441))_

## bm3-0019

Es el último vehículo de una fila detenida en un atasco. Según la DGT, ¿qué puede hacer para evitar que le alcancen por detrás?  
Respuesta: **Mantener el freno pisado, encender las luces de emergencia y vigilar por el retrovisor a los que vienen detrás.**

- ✔ El último de la fila puede dejar cinco o seis metros con el de delante, mantener el freno pisado y encender las luces de emergencia para que se le vea mejor, y vigilar por el retrovisor. _(MANUAL_DGT Tema 17, Espacio al detener el vehículo (p. 448))_
- ✘ `bm3-0010` Las señales acústicas solo se usan excepcionalmente o cuando lo prevea una norma, de sonido no estridente, y queda prohibido su uso inmotivado o exagerado. _(RGC 110.1)_
- ✘ `bm3-0001` La norma general obliga a todos los usuarios de la vía (no solo a los conductores) a no entorpecer indebidamente ni causar peligro, perjuicios o molestias innecesarias, ni daños a los bienes. _(RGC 2)_

## bm9-0001

¿Qué está obligado a mantener el conductor para garantizar su seguridad y la de los demás?  
Respuesta: **Su propia libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción.**

- ✔ El conductor debe mantener su libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción, y cuidar de la posición de los pasajeros y de los objetos o animales transportados. _(RGC 18.1)_
- ✘ `bm9-0007` Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar un remolque que no supere el 50 % de la masa en vacío del vehículo tractor, de día, sin transportar personas y con la velocidad reducida un 10 %. _(RGC 12.3)_
- ✘ `bm9-0011` Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada. _(RGC 107)_

## bm9-0002

¿Cuándo se permite circular con láminas adhesivas o cortinillas contra el sol en las ventanillas posteriores?  
Respuesta: **Cuando el vehículo lleve dos espejos retrovisores exteriores que cumplan las especificaciones técnicas.**

- ✔ Las láminas o cortinillas en las ventanillas posteriores solo se permiten si el vehículo lleva dos espejos retrovisores exteriores reglamentarios. _(RGC 19.1)_
- ✘ `bm9-0012` Para anticiparse a los riesgos, la DGT aconseja no permanecer mucho tiempo en el ángulo muerto de otro vehículo, sobre todo si es muy grande. _(MANUAL_DGT Tema 17, Anticipación (p. 445))_
- ✘ `bm9-0010` El transporte de materias que produzcan polvo o puedan caer se efectúa siempre cubriéndolas total y eficazmente. _(RGC 14.2)_

## bm9-0003

¿Se pueden colocar vidrios tintados o coloreados no homologados?  
Respuesta: **No, está prohibido en todo caso.**

- ✔ Queda prohibida, en todo caso, la colocación de vidrios tintados o coloreados no homologados. _(RGC 19.2)_
- ✘ `bm9-0008` Con remolque, la velocidad queda reducida en un 10 % respecto a la genérica para esos vehículos. _(RGC 12.3.b)_
- ✘ `bm9-0015` Antes de conducir hay que rascar el hielo de todos los cristales, sin rayarlos, y limpiar los espejos retrovisores. _(MANUAL_DGT Tema 14, Conducir con hielo (p. 359))_

## bm9-0004

La superficie acristalada del vehículo, ¿cómo debe permitir la visión del conductor?  
Respuesta: **De forma diáfana sobre toda la vía, sin interferencias de láminas o adhesivos.**

- ✔ La superficie acristalada debe permitir en todo caso la visibilidad diáfana del conductor sobre toda la vía, sin interferencias de láminas o adhesivos (salvo las excepciones reglamentarias). _(RGC 19.1)_
- ✘ `bm9-0009` La carga debe ir dispuesta de forma que no oculte los dispositivos de alumbrado o de señalización luminosa, las placas o distintivos obligatorios ni las advertencias manuales del conductor. _(RGC 14.1.d)_
- ✘ `bm9-0001` El conductor debe mantener su libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción, y cuidar de la posición de los pasajeros y de los objetos o animales transportados. _(RGC 18.1)_

## bm9-0005

Además de respetar los límites, ¿cómo debe adecuar la velocidad?  
Respuesta: **De manera que siempre pueda detener el vehículo dentro de los límites de su campo de visión y ante cualquier obstáculo.**

- ✔ Además de los límites, hay que adecuar la velocidad a las circunstancias (propias, de la vía, del vehículo, meteorológicas…) para poder detenerse siempre dentro del campo de visión y ante cualquier obstáculo. _(RGC 45)_
- ✘ `bm9-0014` Si hay demasiado peso atrás, la luz de cruce puede quedar muy alta y deslumbrar. Por eso hay que repartir bien la carga y mantener las luces bien reguladas. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 348))_
- ✘ `bm9-0007` Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar un remolque que no supere el 50 % de la masa en vacío del vehículo tractor, de día, sin transportar personas y con la velocidad reducida un 10 %. _(RGC 12.3)_

## bm9-0006

Conduce un vehículo pesado y le siguen otros que no pueden adelantarle con facilidad ni sin peligro por la anchura de la calzada. ¿Qué debe hacer?  
Respuesta: **Aminorar la marcha o apartarse cuanto antes al arcén, si es practicable, para dejarles paso.**

- ✔ Los conductores de vehículos pesados, de grandes dimensiones u obligados a un límite específico de velocidad deben aminorar la marcha o apartarse al arcén practicable para dejar paso cuando no puedan ser adelantados con facilidad y sin peligro. _(RGC 86.3)_
- ✘ `bm9-0009` La carga debe ir dispuesta de forma que no oculte los dispositivos de alumbrado o de señalización luminosa, las placas o distintivos obligatorios ni las advertencias manuales del conductor. _(RGC 14.1.d)_
- ✘ `bm9-0004` La superficie acristalada debe permitir en todo caso la visibilidad diáfana del conductor sobre toda la vía, sin interferencias de láminas o adhesivos (salvo las excepciones reglamentarias). _(RGC 19.1)_

## bm9-0007

Una motocicleta quiere arrastrar un remolque. ¿Qué masa máxima puede tener el remolque?  
Respuesta: **Hasta el 50 % de la masa en vacío de la motocicleta.**

- ✔ Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar un remolque que no supere el 50 % de la masa en vacío del vehículo tractor, de día, sin transportar personas y con la velocidad reducida un 10 %. _(RGC 12.3)_
- ✘ `bm9-0001` El conductor debe mantener su libertad de movimientos, el campo necesario de visión y la atención permanente a la conducción, y cuidar de la posición de los pasajeros y de los objetos o animales transportados. _(RGC 18.1)_
- ✘ `bm9-0004` La superficie acristalada debe permitir en todo caso la visibilidad diáfana del conductor sobre toda la vía, sin interferencias de láminas o adhesivos (salvo las excepciones reglamentarias). _(RGC 19.1)_

## bm9-0008

Una motocicleta con remolque circula por una carretera. ¿Cómo afecta el remolque a su velocidad máxima?  
Respuesta: **Debe reducirla un 10 % respecto a la velocidad genérica de la motocicleta.**

- ✔ Con remolque, la velocidad queda reducida en un 10 % respecto a la genérica para esos vehículos. _(RGC 12.3.b)_
- ✘ `bm9-0002` Las láminas o cortinillas en las ventanillas posteriores solo se permiten si el vehículo lleva dos espejos retrovisores exteriores reglamentarios. _(RGC 19.1)_
- ✘ `bm9-0012` Para anticiparse a los riesgos, la DGT aconseja no permanecer mucho tiempo en el ángulo muerto de otro vehículo, sobre todo si es muy grande. _(MANUAL_DGT Tema 17, Anticipación (p. 445))_

## bm9-0009

La carga que transporta tapa parcialmente las luces traseras y la placa de matrícula. ¿Es correcto?  
Respuesta: **No, la carga no puede ocultar los dispositivos de alumbrado o señalización ni las placas o distintivos obligatorios.**

- ✔ La carga debe ir dispuesta de forma que no oculte los dispositivos de alumbrado o de señalización luminosa, las placas o distintivos obligatorios ni las advertencias manuales del conductor. _(RGC 14.1.d)_
- ✘ `bm9-0011` Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada. _(RGC 107)_
- ✘ `bm9-0007` Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar un remolque que no supere el 50 % de la masa en vacío del vehículo tractor, de día, sin transportar personas y con la velocidad reducida un 10 %. _(RGC 12.3)_

## bm9-0010

Transporta en un camión arena que puede producir polvo o caer. ¿Cómo debe llevarla?  
Respuesta: **Cubriéndola total y eficazmente.**

- ✔ El transporte de materias que produzcan polvo o puedan caer se efectúa siempre cubriéndolas total y eficazmente. _(RGC 14.2)_
- ✘ `bm9-0012` Para anticiparse a los riesgos, la DGT aconseja no permanecer mucho tiempo en el ángulo muerto de otro vehículo, sobre todo si es muy grande. _(MANUAL_DGT Tema 17, Anticipación (p. 445))_
- ✘ `bm9-0003` Queda prohibida, en todo caso, la colocación de vidrios tintados o coloreados no homologados. _(RGC 19.2)_

## bm9-0011

De noche se le avería en ruta el alumbrado y solo puede circular con uno de menor intensidad. ¿Qué debe hacer?  
Respuesta: **Reducir la velocidad hasta la que le permita detener el vehículo dentro de la zona iluminada.**

- ✔ Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada. _(RGC 107)_
- ✘ `bm9-0002` Las láminas o cortinillas en las ventanillas posteriores solo se permiten si el vehículo lleva dos espejos retrovisores exteriores reglamentarios. _(RGC 19.1)_
- ✘ `bm9-0009` La carga debe ir dispuesta de forma que no oculte los dispositivos de alumbrado o de señalización luminosa, las placas o distintivos obligatorios ni las advertencias manuales del conductor. _(RGC 14.1.d)_

## bm9-0012

Según la DGT, ¿qué debe evitar respecto al ángulo muerto de los retrovisores de otros vehículos?  
Respuesta: **Estar mucho tiempo en él, en especial al lado o detrás de un vehículo muy grande.**

- ✔ Para anticiparse a los riesgos, la DGT aconseja no permanecer mucho tiempo en el ángulo muerto de otro vehículo, sobre todo si es muy grande. _(MANUAL_DGT Tema 17, Anticipación (p. 445))_
- ✘ `bm9-0011` Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada. _(RGC 107)_
- ✘ `bm9-0015` Antes de conducir hay que rascar el hielo de todos los cristales, sin rayarlos, y limpiar los espejos retrovisores. _(MANUAL_DGT Tema 14, Conducir con hielo (p. 359))_

## bm9-0013

Según la DGT, ¿a qué vehículos afecta más el viento fuerte?  
Respuesta: **A los vehículos de dos ruedas y a los que llevan un remolque.**

- ✔ El viento, sobre todo lateral, puede hacer perder el control; afecta más a los vehículos de dos ruedas y a los que llevan remolque. _(MANUAL_DGT Tema 14, Conducir con mucho viento (p. 361))_
- ✘ `bm9-0010` El transporte de materias que produzcan polvo o puedan caer se efectúa siempre cubriéndolas total y eficazmente. _(RGC 14.2)_
- ✘ `bm9-0011` Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada. _(RGC 107)_

## bm9-0014

Lleva mucho peso en la parte de atrás del vehículo. ¿Qué riesgo señala la DGT respecto a las luces?  
Respuesta: **Que la luz de cruce quede muy alta y deslumbre.**

- ✔ Si hay demasiado peso atrás, la luz de cruce puede quedar muy alta y deslumbrar. Por eso hay que repartir bien la carga y mantener las luces bien reguladas. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 348))_
- ✘ `bm9-0011` Si por avería irreparable en ruta se ha de circular con alumbrado de intensidad inferior, se debe reducir la velocidad hasta la que permita detener el vehículo dentro de la zona iluminada. _(RGC 107)_
- ✘ `bm9-0015` Antes de conducir hay que rascar el hielo de todos los cristales, sin rayarlos, y limpiar los espejos retrovisores. _(MANUAL_DGT Tema 14, Conducir con hielo (p. 359))_

## bm9-0015

Hay hielo en los cristales de su vehículo. ¿Qué debe hacer antes de empezar a conducir?  
Respuesta: **Rascar el hielo de todos los cristales, sin rayarlos, y limpiar los retrovisores.**

- ✔ Antes de conducir hay que rascar el hielo de todos los cristales, sin rayarlos, y limpiar los espejos retrovisores. _(MANUAL_DGT Tema 14, Conducir con hielo (p. 359))_
- ✘ `bm9-0002` Las láminas o cortinillas en las ventanillas posteriores solo se permiten si el vehículo lleva dos espejos retrovisores exteriores reglamentarios. _(RGC 19.1)_
- ✘ `bm9-0013` El viento, sobre todo lateral, puede hacer perder el control; afecta más a los vehículos de dos ruedas y a los que llevan remolque. _(MANUAL_DGT Tema 14, Conducir con mucho viento (p. 361))_

## bm6-0001

Circula por una calzada con charcos y hay peatones en la acera. ¿Qué debe hacer?  
Respuesta: **Circular a velocidad moderada para no salpicarles.**

- ✔ Hay que circular a velocidad moderada al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios. _(RGC 46.1.g)_
- ✘ `bm6-0012` En invierno: llevar cadenas, evitar conducir de noche, viajar con el depósito lleno y llevar ropa de abrigo, agua, comida y linterna. _(MANUAL_DGT Tema 17, Elegir la ruta (p. 439))_
- ✘ `bm6-0008` Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_

## bm6-0002

¿En cuál de estas situaciones obliga el reglamento a circular a velocidad moderada?  
Respuesta: **En caso de niebla densa, lluvia intensa, nevada o nubes de polvo o humo.**

- ✔ Entre los casos en que se circula a velocidad moderada y, si es preciso, se detiene el vehículo, están la niebla densa, la lluvia intensa, la nevada y las nubes de polvo o humo. _(RGC 46.1.k)_
- ✘ `bm6-0008` Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_

## bm6-0003

Se acerca a una intersección debidamente señalizada y la visibilidad de la vía es prácticamente nula. ¿Qué velocidad no debe superar?  
Respuesta: **50 km/h.**

- ✔ Si las intersecciones están debidamente señalizadas y la visibilidad de la vía es prácticamente nula, la velocidad no deberá exceder de 50 km/h. _(RGC 46.1.h)_
- ✘ `bm6-0011` Las nubes de polvo y humo impiden ver bien y pueden aparecer de repente; hay que tomar las mismas precauciones que con niebla. _(MANUAL_DGT Tema 14, Conducir con nubes de polvo o de humo (p. 361))_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_

## bm6-0004

Al aproximarse a un lugar de reducida visibilidad o a un estrechamiento, ¿qué debe hacer?  
Respuesta: **Circular a velocidad moderada y, si fuera preciso, detenerse.**

- ✔ Al aproximarse a pasos a nivel, glorietas e intersecciones sin prioridad, lugares de reducida visibilidad o estrechamientos se circula a velocidad moderada. _(RGC 46.1.h)_
- ✘ `bm6-0009` La DGT desaconseja las gafas oscuras o de sol de noche: pueden reducir el deslumbramiento, pero se ve mucho peor la carretera. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_

## bm6-0005

Es de día y una nube de humo disminuye sensiblemente la visibilidad. ¿Es obligatorio llevar el alumbrado encendido?  
Respuesta: **Sí, es obligatorio en condiciones meteorológicas o ambientales que disminuyan sensiblemente la visibilidad.**

- ✔ Es obligatorio usar el alumbrado cuando las condiciones meteorológicas o ambientales disminuyan sensiblemente la visibilidad: niebla, lluvia intensa, nevada, nubes de humo o de polvo… _(RGC 106.1)_
- ✘ `bm6-0008` Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0004` Al aproximarse a pasos a nivel, glorietas e intersecciones sin prioridad, lugares de reducida visibilidad o estrechamientos se circula a velocidad moderada. _(RGC 46.1.h)_

## bm6-0006

Según la DGT, ¿por qué es más peligroso conducir de noche?  
Respuesta: **Porque la carretera está menos iluminada, se ven peor las distancias, personas y vehículos, y otros pueden deslumbrarle.**

- ✔ De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_
- ✘ `bm6-0008` Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0003` Si las intersecciones están debidamente señalizadas y la visibilidad de la vía es prácticamente nula, la velocidad no deberá exceder de 50 km/h. _(RGC 46.1.h)_

## bm6-0007

De noche pasa de una zona bien iluminada a otra mal iluminada. ¿Por qué debe extremar la atención?  
Respuesta: **Porque a los ojos les cuesta unos segundos acostumbrarse al cambio de luz.**

- ✔ Al pasar de una zona iluminada a otra oscura, los ojos tardan unos segundos en adaptarse al cambio de luz. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_
- ✘ `bm6-0009` La DGT desaconseja las gafas oscuras o de sol de noche: pueden reducir el deslumbramiento, pero se ve mucho peor la carretera. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0004` Al aproximarse a pasos a nivel, glorietas e intersecciones sin prioridad, lugares de reducida visibilidad o estrechamientos se circula a velocidad moderada. _(RGC 46.1.h)_

## bm6-0008

Le deslumbra un vehículo que viene de frente y reduce la velocidad. ¿Por dónde recomienda guiarse la DGT?  
Respuesta: **Por la línea del borde derecho.**

- ✔ Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_
- ✘ `bm6-0011` Las nubes de polvo y humo impiden ver bien y pueden aparecer de repente; hay que tomar las mismas precauciones que con niebla. _(MANUAL_DGT Tema 14, Conducir con nubes de polvo o de humo (p. 361))_

## bm6-0009

¿Es aconsejable usar gafas de sol por la noche para evitar los deslumbramientos?  
Respuesta: **No, porque se ve mucho peor la carretera.**

- ✔ La DGT desaconseja las gafas oscuras o de sol de noche: pueden reducir el deslumbramiento, pero se ve mucho peor la carretera. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0012` En invierno: llevar cadenas, evitar conducir de noche, viajar con el depósito lleno y llevar ropa de abrigo, agua, comida y linterna. _(MANUAL_DGT Tema 17, Elegir la ruta (p. 439))_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_

## bm6-0010

Circula con niebla. ¿Cuál de estas precauciones recomienda la DGT?  
Respuesta: **Mantener el vehículo bien ventilado para que no se empañen los cristales.**

- ✔ Con niebla: ventilar el vehículo para que no se empañen los cristales, encender las luces de cruce y antiniebla, ir despacio, mantener mucha distancia, evitar adelantar si no es necesario y extremar la precaución en los cruces. _(MANUAL_DGT Tema 14, Conducir con niebla (p. 360))_
- ✘ `bm6-0001` Hay que circular a velocidad moderada al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios. _(RGC 46.1.g)_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_

## bm6-0011

Según la DGT, ¿qué precauciones se toman con nubes de polvo o de humo?  
Respuesta: **Las mismas que para conducir con niebla.**

- ✔ Las nubes de polvo y humo impiden ver bien y pueden aparecer de repente; hay que tomar las mismas precauciones que con niebla. _(MANUAL_DGT Tema 14, Conducir con nubes de polvo o de humo (p. 361))_
- ✘ `bm6-0004` Al aproximarse a pasos a nivel, glorietas e intersecciones sin prioridad, lugares de reducida visibilidad o estrechamientos se circula a velocidad moderada. _(RGC 46.1.h)_
- ✘ `bm6-0006` De noche la vía está menos iluminada, se calculan peor las distancias y se ven peor personas, objetos y vehículos, y además hay riesgo de deslumbramiento. _(MANUAL_DGT Tema 14, Conducir por la noche (p. 347))_

## bm6-0012

Va a viajar en invierno. ¿Cuál de estas precauciones recomienda la DGT?  
Respuesta: **Llevar el depósito lleno de combustible y cadenas en el vehículo.**

- ✔ En invierno: llevar cadenas, evitar conducir de noche, viajar con el depósito lleno y llevar ropa de abrigo, agua, comida y linterna. _(MANUAL_DGT Tema 17, Elegir la ruta (p. 439))_
- ✘ `bm6-0008` Cuando le deslumbren, reduzca la velocidad o incluso pare con precaución, sin moverse a otros carriles; puede guiarse por la línea del borde derecho. _(MANUAL_DGT Tema 14, Deslumbramientos (p. 349))_
- ✘ `bm6-0002` Entre los casos en que se circula a velocidad moderada y, si es preciso, se detiene el vehículo, están la niebla densa, la lluvia intensa, la nevada y las nubes de polvo o humo. _(RGC 46.1.k)_

## bmp-0001

En vía urbana, ¿en cuánto hay que superar la velocidad permitida para que el exceso sea delito?  
Respuesta: **En más de 60 km/h.**

- ✔ Es delito conducir a velocidad superior en 60 km/h en vía urbana o en 80 km/h en vía interurbana a la permitida. _(CP 379.1)_
- ✘ `bmp-0007` Conducir con el permiso sin vigencia por pérdida total de los puntos es delito, castigado con prisión de tres a seis meses, multa o trabajos en beneficio de la comunidad. _(CP 384)_
- ✘ `bmp-0010` Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_

## bmp-0002

En una autovía limitada a 120 km/h, ¿a partir de qué velocidad el exceso constituye delito?  
Respuesta: **A partir de más de 200 km/h.**

- ✔ En vía interurbana es delito superar en 80 km/h la velocidad permitida: con límite de 120 km/h, circular a más de 200 km/h. _(CP 379.1)_
- ✘ `bmp-0005` Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años. _(CP 383)_
- ✘ `bmp-0010` Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_

## bmp-0003

¿A partir de qué tasa de alcohol en aire espirado se comete en todo caso delito?  
Respuesta: **Superior a 0,60 mg/l.**

- ✔ En todo caso es delito conducir con una tasa de alcohol en aire espirado superior a 0,60 mg/l o en sangre superior a 1,2 g/l. Con tasas menores también puede ser delito si se conduce bajo la influencia del alcohol. _(CP 379.2)_
- ✘ `bmp-0008` La conducción con temeridad manifiesta que pone en concreto peligro la vida o la integridad de las personas es delito, con prisión de seis meses a dos años y privación del derecho a conducir de más de uno y hasta seis años. _(CP 380.1)_
- ✘ `bmp-0006` El Código Penal castiga a quien conduce un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia, y también a quien conduce tras perder todos los puntos o estando privado del permiso por decisión judicial. _(CP 384)_

## bmp-0004

¿A partir de qué tasa de alcohol en sangre se comete en todo caso delito?  
Respuesta: **Superior a 1,2 g/l.**

- ✔ Es delito en todo caso conducir con una tasa de alcohol en sangre superior a 1,2 g/l (o en aire espirado superior a 0,60 mg/l). _(CP 379.2)_
- ✘ `bmp-0010` Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_
- ✘ `bmp-0005` Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años. _(CP 383)_

## bmp-0005

El conductor que, requerido por un agente, se niega a someterse a las pruebas de alcohol o drogas…  
Respuesta: **comete un delito castigado con prisión de seis meses a un año y privación del derecho a conducir.**

- ✔ Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años. _(CP 383)_
- ✘ `bmp-0010` Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_
- ✘ `bmp-0007` Conducir con el permiso sin vigencia por pérdida total de los puntos es delito, castigado con prisión de tres a seis meses, multa o trabajos en beneficio de la comunidad. _(CP 384)_

## bmp-0006

Conducir un turismo sin haber obtenido nunca el permiso de conducción, ¿qué es?  
Respuesta: **Un delito.**

- ✔ El Código Penal castiga a quien conduce un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia, y también a quien conduce tras perder todos los puntos o estando privado del permiso por decisión judicial. _(CP 384)_
- ✘ `bmp-0008` La conducción con temeridad manifiesta que pone en concreto peligro la vida o la integridad de las personas es delito, con prisión de seis meses a dos años y privación del derecho a conducir de más de uno y hasta seis años. _(CP 380.1)_
- ✘ `bmp-0005` Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años. _(CP 383)_

## bmp-0007

Ha perdido la vigencia de su permiso por pérdida total de los puntos y sigue conduciendo. ¿Qué comete?  
Respuesta: **Un delito.**

- ✔ Conducir con el permiso sin vigencia por pérdida total de los puntos es delito, castigado con prisión de tres a seis meses, multa o trabajos en beneficio de la comunidad. _(CP 384)_
- ✘ `bmp-0008` La conducción con temeridad manifiesta que pone en concreto peligro la vida o la integridad de las personas es delito, con prisión de seis meses a dos años y privación del derecho a conducir de más de uno y hasta seis años. _(CP 380.1)_
- ✘ `bmp-0003` En todo caso es delito conducir con una tasa de alcohol en aire espirado superior a 0,60 mg/l o en sangre superior a 1,2 g/l. Con tasas menores también puede ser delito si se conduce bajo la influencia del alcohol. _(CP 379.2)_

## bmp-0008

Conducir con temeridad manifiesta poniendo en concreto peligro la vida o la integridad de las personas, ¿qué es?  
Respuesta: **Un delito castigado con prisión de seis meses a dos años y privación del derecho a conducir.**

- ✔ La conducción con temeridad manifiesta que pone en concreto peligro la vida o la integridad de las personas es delito, con prisión de seis meses a dos años y privación del derecho a conducir de más de uno y hasta seis años. _(CP 380.1)_
- ✘ `bmp-0006` El Código Penal castiga a quien conduce un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia, y también a quien conduce tras perder todos los puntos o estando privado del permiso por decisión judicial. _(CP 384)_
- ✘ `bmp-0003` En todo caso es delito conducir con una tasa de alcohol en aire espirado superior a 0,60 mg/l o en sangre superior a 1,2 g/l. Con tasas menores también puede ser delito si se conduce bajo la influencia del alcohol. _(CP 379.2)_

## bmp-0009

El conductor que, voluntariamente y sin riesgo propio o ajeno, abandona el lugar tras causar un accidente con fallecidos o heridos graves, ¿qué comete?  
Respuesta: **Un delito de abandono del lugar del accidente.**

- ✔ Es delito de abandono del lugar del accidente, también si el origen fue fortuito (en ese caso con pena de tres a seis meses de prisión y privación del derecho a conducir de seis meses a dos años). _(CP 382 bis.1)_
- ✘ `bmp-0003` En todo caso es delito conducir con una tasa de alcohol en aire espirado superior a 0,60 mg/l o en sangre superior a 1,2 g/l. Con tasas menores también puede ser delito si se conduce bajo la influencia del alcohol. _(CP 379.2)_
- ✘ `bmp-0010` Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_

## bmp-0010

Colocar en la vía obstáculos imprevisibles o derramar sustancias deslizantes, originando un grave riesgo para la circulación, ¿qué es?  
Respuesta: **Un delito.**

- ✔ Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_
- ✘ `bmp-0006` El Código Penal castiga a quien conduce un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia, y también a quien conduce tras perder todos los puntos o estando privado del permiso por decisión judicial. _(CP 384)_
- ✘ `bmp-0005` Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años. _(CP 383)_

## def-0001

Una persona con discapacidad que circula al paso en una silla de ruedas con motor, ¿tiene la consideración de peatón?  
Respuesta: **Sí, con o sin motor.**

- ✔ La Ley de Tráfico considera peatones a las personas con discapacidad que circulan al paso en silla de ruedas, tenga o no motor. _(LSV Anexo I.4)_
- ✘ `def-0006` La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_
- ✘ `def-0007` La definición de vehículo de motor excluye los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## def-0002

Quien conduce a pie una bicicleta, sin ir montado en ella, ¿qué consideración tiene?  
Respuesta: **Peatón.**

- ✔ Los que conducen a pie un ciclo o un ciclomotor de dos ruedas tienen la consideración de peatones. _(LSV Anexo I.4)_
- ✘ `def-0007` La definición de vehículo de motor excluye los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `def-0004` La definición de ciclo incluye expresamente los ciclos de pedaleo asistido. _(LSV Anexo I.7)_

## def-0003

¿Quién es el conductor de un rebaño de animales que circula por la vía?  
Respuesta: **La persona a cuyo cargo están los animales.**

- ✔ Es conductor también la persona a cuyo cargo está un animal o animales. _(LSV Anexo I.1)_
- ✘ `def-0004` La definición de ciclo incluye expresamente los ciclos de pedaleo asistido. _(LSV Anexo I.7)_
- ✘ `def-0011` El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_

## def-0004

Una bicicleta de pedaleo asistido (con un pequeño motor que ayuda al pedaleo), ¿es un ciclo?  
Respuesta: **Sí, los ciclos de pedaleo asistido se incluyen en la definición de ciclo.**

- ✔ La definición de ciclo incluye expresamente los ciclos de pedaleo asistido. _(LSV Anexo I.7)_
- ✘ `def-0010` Un turismo tiene, además del asiento del conductor, ocho plazas como máximo. _(LSV Anexo I.15)_
- ✘ `def-0002` Los que conducen a pie un ciclo o un ciclomotor de dos ruedas tienen la consideración de peatones. _(LSV Anexo I.4)_

## def-0005

¿Cuál es la velocidad máxima por construcción de un ciclomotor de dos ruedas?  
Respuesta: **No superior a 45 km/h.**

- ✔ Un ciclomotor de dos ruedas tiene una velocidad máxima por construcción no superior a 45 km/h. _(LSV Anexo I.9.a)_
- ✘ `def-0004` La definición de ciclo incluye expresamente los ciclos de pedaleo asistido. _(LSV Anexo I.7)_
- ✘ `def-0007` La definición de vehículo de motor excluye los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## def-0006

Un vehículo de cuatro ruedas, con masa en vacío de hasta 350 kg y velocidad máxima por construcción de 45 km/h (cuadriciclo ligero), ¿qué tipo de vehículo es?  
Respuesta: **Un ciclomotor.**

- ✔ La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_
- ✘ `def-0009` La tara es la masa sin personas ni carga, pero con la dotación completa de combustible, agua, lubricante, repuestos, herramientas y accesorios. _(LSV Anexo I.35)_
- ✘ `def-0001` La Ley de Tráfico considera peatones a las personas con discapacidad que circulan al paso en silla de ruedas, tenga o no motor. _(LSV Anexo I.4)_

## def-0007

Según la Ley de Tráfico, ¿cuál de estos vehículos queda excluido de la definición de «vehículo de motor»?  
Respuesta: **El ciclomotor.**

- ✔ La definición de vehículo de motor excluye los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `def-0006` La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_
- ✘ `res-def-0001` La masa en orden de marcha es la tara (que ya incluye el depósito de combustible lleno, agua, lubricante, repuestos y herramientas) más 75 kg del conductor. _(RGV Anexo IX.1.2)_

## def-0008

¿Qué es la masa máxima autorizada (MMA)?  
Respuesta: **La masa máxima para la utilización de un vehículo con carga en circulación por las vías públicas.**

- ✔ La MMA es la masa máxima con la que un vehículo cargado puede circular por las vías públicas. _(LSV Anexo I.37)_
- ✘ `def-0010` Un turismo tiene, además del asiento del conductor, ocho plazas como máximo. _(LSV Anexo I.15)_
- ✘ `def-0002` Los que conducen a pie un ciclo o un ciclomotor de dos ruedas tienen la consideración de peatones. _(LSV Anexo I.4)_

## def-0009

La tara de un vehículo es su masa…  
Respuesta: **sin personal de servicio, pasajeros ni carga, y con su dotación completa de agua, combustible, lubricante, repuestos, herramientas y accesorios reglamentarios.**

- ✔ La tara es la masa sin personas ni carga, pero con la dotación completa de combustible, agua, lubricante, repuestos, herramientas y accesorios. _(LSV Anexo I.35)_
- ✘ `def-0011` El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_
- ✘ `def-0006` La Ley de Tráfico incluye entre los ciclomotores a los vehículos de cuatro ruedas de masa en vacío hasta 350 kg y velocidad máxima de 45 km/h. _(LSV Anexo I.9.c)_

## def-0010

¿Cuántas plazas puede tener como máximo un turismo, además del asiento del conductor?  
Respuesta: **Ocho.**

- ✔ Un turismo tiene, además del asiento del conductor, ocho plazas como máximo. _(LSV Anexo I.15)_
- ✘ `def-0011` El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_
- ✘ `def-0005` Un ciclomotor de dos ruedas tiene una velocidad máxima por construcción no superior a 45 km/h. _(LSV Anexo I.9.a)_

## def-0011

¿Qué caracteriza a un camión según la Ley de Tráfico?  
Respuesta: **Que su cabina no está integrada en el resto de la carrocería.**

- ✔ El camión es un automóvil para transporte de mercancías cuya cabina no está integrada en el resto de la carrocería. _(LSV Anexo I.18)_
- ✘ `res-def-0001` La masa en orden de marcha es la tara (que ya incluye el depósito de combustible lleno, agua, lubricante, repuestos y herramientas) más 75 kg del conductor. _(RGV Anexo IX.1.2)_
- ✘ `res-def-0003` El derivado de turismo sale de un turismo, conserva su carrocería y solo tiene una fila de asientos; se destina a servicios o a transporte de mercancías. _(RGV Anexo II.A)_

## def-0012

Un vehículo en el que se puede sustituir la carga, parcial o totalmente, por personas mediante la adición de asientos, es un…  
Respuesta: **vehículo mixto adaptable.**

- ✔ Es la definición de vehículo mixto adaptable: transporte simultáneo o no de mercancías y personas, hasta nueve incluido el conductor. _(LSV Anexo I.19)_
- ✘ `res-def-0001` La masa en orden de marcha es la tara (que ya incluye el depósito de combustible lleno, agua, lubricante, repuestos y herramientas) más 75 kg del conductor. _(RGV Anexo IX.1.2)_
- ✘ `def-0004` La definición de ciclo incluye expresamente los ciclos de pedaleo asistido. _(LSV Anexo I.7)_

## via-0001

¿Qué es una travesía?  
Respuesta: **Un tramo de carretera que discurre por poblado.**

- ✔ La travesía es el tramo de carretera que discurre por poblado. _(LSV Anexo I.71)_
- ✘ `via-0002` Vía interurbana es la vía pública situada fuera de poblado. _(LSV Anexo I.72)_
- ✘ `via-0004` Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles. _(LSV Anexo I.69)_

## via-0002

Una vía interurbana es una vía pública situada…  
Respuesta: **fuera de poblado.**

- ✔ Vía interurbana es la vía pública situada fuera de poblado. _(LSV Anexo I.72)_
- ✘ `via-0004` Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles. _(LSV Anexo I.69)_
- ✘ `via-0003` La autopista no permite el acceso de las propiedades colindantes; la autovía lo tiene limitado. _(LSV Anexo I.66)_

## via-0003

¿Cuál es la diferencia entre autopista y autovía respecto a las propiedades colindantes?  
Respuesta: **En la autopista no tienen acceso; en la autovía tienen acceso limitado.**

- ✔ La autopista no permite el acceso de las propiedades colindantes; la autovía lo tiene limitado. _(LSV Anexo I.66)_
- ✘ `via-0006` Se prohíbe circular por autopistas y autovías con vehículos de tracción animal, bicicletas, ciclomotores y vehículos para personas de movilidad reducida. _(RGC 38.1)_
- ✘ `via-0001` La travesía es el tramo de carretera que discurre por poblado. _(LSV Anexo I.71)_

## via-0004

¿Qué es una carretera convencional?  
Respuesta: **La que no reúne las características de autopistas, autovías y vías para automóviles.**

- ✔ Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles. _(LSV Anexo I.69)_
- ✘ `res-via-0001` Los peatones no pueden circular por autopistas ni autovías, salvo en los casos y condiciones del artículo 130 (inmovilización del vehículo por emergencia). _(RGC 125.1)_
- ✘ `via-0005` Está prohibido circular en bicicleta por autopistas y autovías, pero los mayores de 14 años pueden ir por los arcenes de las autovías salvo prohibición señalizada. _(RGC 38.1)_

## via-0005

¿Pueden circular las bicicletas por una autovía?  
Respuesta: **Sí, por los arcenes, si el ciclista es mayor de 14 años y no lo prohíbe la señalización.**

- ✔ Está prohibido circular en bicicleta por autopistas y autovías, pero los mayores de 14 años pueden ir por los arcenes de las autovías salvo prohibición señalizada. _(RGC 38.1)_
- ✘ `via-0003` La autopista no permite el acceso de las propiedades colindantes; la autovía lo tiene limitado. _(LSV Anexo I.66)_
- ✘ `B2-via-0012` En las zonas peatonales distintas de las aceras, la autoridad municipal puede autorizar mediante ordenanza la coexistencia de peatones con ciclistas y usuarios de VMP, respetando la prioridad de los peatones. _(RGC 152.1)_

## via-0006

¿Puede circular un ciclomotor por una autopista o autovía?  
Respuesta: **No, está prohibido.**

- ✔ Se prohíbe circular por autopistas y autovías con vehículos de tracción animal, bicicletas, ciclomotores y vehículos para personas de movilidad reducida. _(RGC 38.1)_
- ✘ `via-0003` La autopista no permite el acceso de las propiedades colindantes; la autovía lo tiene limitado. _(LSV Anexo I.66)_
- ✘ `B2-via-0013` En las aceras está prohibida la circulación de cualquier tipo de vehículo, pero las ordenanzas pueden permitir que circulen niños de hasta doce años en bicicleta a cargo de un adulto que vaya a pie. _(RGC 152.1)_

## via-0007

¿Puede circular un patinete eléctrico (vehículo de movilidad personal) por una travesía?  
Respuesta: **No, está prohibido.**

- ✔ Se prohíbe circular con vehículos de movilidad personal por autopistas y autovías, por travesías y por vías interurbanas y túneles urbanos (salvo vías ciclistas y similares). _(RGC 38.4.b)_
- ✘ `via-0004` Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles. _(LSV Anexo I.69)_
- ✘ `res-via-0002` Los peatones no pueden hacer peticiones de pasaje en ningún tramo de autopistas y autovías, incluidas las explanadas de las estaciones de peaje. _(RGC 125.1)_

## arc-0001

Fuera de poblado, si no hay zona peatonal practicable, ¿por dónde debe circular un peatón que va solo?  
Respuesta: **Por el arcén izquierdo, si existe y es practicable.**

- ✔ Los peatones deben circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable; si no, por la calzada. _(RGC 122.1)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_
- ✘ `arc-0013` Con nieve, en autopistas y autovías está prohibido adelantar y es obligatorio circular por el carril más a la derecha. _(RGC 32.2)_

## arc-0002

Una persona que arrastra su bicicleta por una carretera, ¿por qué lado debe circular?  
Respuesta: **Por la derecha.**

- ✔ Es obligatorio circular por la derecha para quienes empujen o arrastren un ciclo, ciclomotor de dos ruedas o VMP. _(RGC 122.2.a)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_
- ✘ `arc-0012` Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro de la vía, entre esos dos carriles. _(RGC 32.1)_

## arc-0003

Un grupo de peatones dirigido por una persona que circula por una carretera, ¿por qué lado debe ir?  
Respuesta: **Por la derecha.**

- ✔ Todo grupo de peatones dirigido por una persona debe circular por la derecha. _(RGC 122.2.b)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_
- ✘ `arc-0012` Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro de la vía, entre esos dos carriles. _(RGC 32.1)_

## arc-0004

Un peatón que de noche camina por el arcén de una vía interurbana, ¿qué debe llevar?  
Respuesta: **Al menos un elemento luminoso o reflectante visible a 150 metros.**

- ✔ Entre el ocaso y la salida del sol, o con poca visibilidad, deben llevar al menos un elemento luminoso o reflectante visible a una distancia mínima de 150 metros. _(RGC 123.1)_
- ✘ `arc-0015` En poblado, con al menos dos carriles delimitados para el mismo sentido, se puede usar el que mejor convenga al destino, sin ser un obstáculo. _(RGC 33)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_

## arc-0005

Un grupo de peatones que circula de noche por una vía interurbana debe llevar luces. ¿De qué color hacia atrás?  
Respuesta: **Rojo.**

- ✔ Las luces del grupo serán de color blanco o amarillo hacia adelante y rojo hacia atrás, en el lado más próximo al centro de la calzada. _(RGC 123.2)_
- ✘ `arc-0013` Con nieve, en autopistas y autovías está prohibido adelantar y es obligatorio circular por el carril más a la derecha. _(RGC 32.2)_
- ✘ `arc-0010` En los tramos habilitados y señalizados, y solo con la circulación detenida por congestión, la velocidad por el arcén está limitada a 30 km/h, en columna de a uno. _(RGC 36.3)_

## arc-0006

Las luces que debe llevar de noche un grupo de peatones en vía interurbana, ¿en qué lado se llevan?  
Respuesta: **En el lado más próximo al centro de la calzada.**

- ✔ Se llevan en el lado más próximo al centro de la calzada. _(RGC 123.2)_
- ✘ `arc-0003` Todo grupo de peatones dirigido por una persona debe circular por la derecha. _(RGC 122.2.b)_
- ✘ `arc-0012` Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro de la vía, entre esos dos carriles. _(RGC 32.1)_

## arc-0007

¿Por dónde debe circular un vehículo especial de 3.000 kg de MMA fuera de poblado, si el arcén es transitable y suficiente?  
Respuesta: **Por el arcén de su derecha.**

- ✔ Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_
- ✘ `arc-0003` Todo grupo de peatones dirigido por una persona debe circular por la derecha. _(RGC 122.2.b)_
- ✘ `arc-0004` Entre el ocaso y la salida del sol, o con poca visibilidad, deben llevar al menos un elemento luminoso o reflectante visible a una distancia mínima de 150 metros. _(RGC 123.1)_

## arc-0008

Los ciclistas que circulan por el arcén, ¿pueden ir en columna de a dos?  
Respuesta: **Sí.**

- ✔ Los conductores de bicicletas pueden circular en columna de a dos por el arcén. Si no hay arcén transitable y van por la calzada, deben ponerse en hilera en tramos sin visibilidad, si afectan a la fluidez, de noche o con poca visibilidad. _(RGC 36.2)_
- ✘ `res-arc-0001` Quien va en silla de ruedas al paso es peatón (con o sin motor). Los peatones van por el arcén izquierdo; solo deben ir por la derecha quienes empujan un ciclo o similar, los grupos dirigidos o cuando haya razones de seguridad. _(RGC 122.1)_
- ✘ `arc-0005` Las luces del grupo serán de color blanco o amarillo hacia adelante y rojo hacia atrás, en el lado más próximo al centro de la calzada. _(RGC 123.2)_

## arc-0009

Dos ciclistas circulan de noche por la calzada de una carretera sin arcén. ¿Cómo deben ir?  
Respuesta: **En hilera, uno detrás de otro.**

- ✔ Deben colocarse en hilera, entre otros casos, cuando circulen entre el ocaso y la salida del sol. _(RGC 36.2)_
- ✘ `arc-0011` Con tres o más carriles en el mismo sentido, el carril de emergencia se forma entre el carril más a la izquierda y su contiguo. _(RGC 32.1)_
- ✘ `arc-0014` Camiones y furgones de más de 3.500 kg y conjuntos de más de 7 m circulan normalmente por el carril más a la derecha y pueden utilizar el inmediato. _(RGC 31.2)_

## arc-0010

En un tramo señalizado para ello, con la circulación detenida por congestión, ¿a qué velocidad máxima puede circular una motocicleta por el arcén?  
Respuesta: **30 km/h.**

- ✔ En los tramos habilitados y señalizados, y solo con la circulación detenida por congestión, la velocidad por el arcén está limitada a 30 km/h, en columna de a uno. _(RGC 36.3)_
- ✘ `arc-0011` Con tres o más carriles en el mismo sentido, el carril de emergencia se forma entre el carril más a la izquierda y su contiguo. _(RGC 32.1)_
- ✘ `arc-0014` Camiones y furgones de más de 3.500 kg y conjuntos de más de 7 m circulan normalmente por el carril más a la derecha y pueden utilizar el inmediato. _(RGC 31.2)_

## arc-0011

En una autovía con tres carriles por sentido hay una retención. ¿Dónde debe formarse el carril de emergencia?  
Respuesta: **Entre el carril situado más a la izquierda y el carril contiguo a él.**

- ✔ Con tres o más carriles en el mismo sentido, el carril de emergencia se forma entre el carril más a la izquierda y su contiguo. _(RGC 32.1)_
- ✘ `arc-0001` Los peatones deben circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable; si no, por la calzada. _(RGC 122.1)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_

## arc-0012

En una autopista con dos carriles por sentido, con la circulación detenida, ¿dónde se forma el carril de emergencia?  
Respuesta: **En el centro de la vía, entre esos dos carriles.**

- ✔ Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro de la vía, entre esos dos carriles. _(RGC 32.1)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_
- ✘ `arc-0001` Los peatones deben circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable; si no, por la calzada. _(RGC 122.1)_

## arc-0013

En una autopista con dos carriles por sentido y la circulación dificultada por la nieve, ¿qué debe hacer?  
Respuesta: **Circular por el carril más a la derecha; está prohibido adelantar.**

- ✔ Con nieve, en autopistas y autovías está prohibido adelantar y es obligatorio circular por el carril más a la derecha. _(RGC 32.2)_
- ✘ `arc-0004` Entre el ocaso y la salida del sol, o con poca visibilidad, deben llevar al menos un elemento luminoso o reflectante visible a una distancia mínima de 150 metros. _(RGC 123.1)_
- ✘ `arc-0015` En poblado, con al menos dos carriles delimitados para el mismo sentido, se puede usar el que mejor convenga al destino, sin ser un obstáculo. _(RGC 33)_

## arc-0014

Fuera de poblado, en una calzada con tres carriles para su sentido, ¿qué carriles puede usar normalmente un camión de más de 3.500 kg de MMA?  
Respuesta: **El situado más a la derecha y el inmediato.**

- ✔ Camiones y furgones de más de 3.500 kg y conjuntos de más de 7 m circulan normalmente por el carril más a la derecha y pueden utilizar el inmediato. _(RGC 31.2)_
- ✘ `arc-0015` En poblado, con al menos dos carriles delimitados para el mismo sentido, se puede usar el que mejor convenga al destino, sin ser un obstáculo. _(RGC 33)_
- ✘ `arc-0013` Con nieve, en autopistas y autovías está prohibido adelantar y es obligatorio circular por el carril más a la derecha. _(RGC 32.2)_

## arc-0015

Dentro de poblado, en una calzada con dos carriles para su sentido delimitados por marcas, ¿qué carril puede utilizar un turismo?  
Respuesta: **El que mejor convenga a su destino.**

- ✔ En poblado, con al menos dos carriles delimitados para el mismo sentido, se puede usar el que mejor convenga al destino, sin ser un obstáculo. _(RGC 33)_
- ✘ `arc-0014` Camiones y furgones de más de 3.500 kg y conjuntos de más de 7 m circulan normalmente por el carril más a la derecha y pueden utilizar el inmediato. _(RGC 31.2)_
- ✘ `arc-0001` Los peatones deben circular por el arcén izquierdo en el sentido de su marcha, si existe y es practicable; si no, por la calzada. _(RGC 122.1)_

## cesp-0001

¿Qué vehículos pueden circular por un carril habilitado en sentido contrario al habitual por razones de fluidez?  
Respuesta: **Solo motocicletas y turismos (sin remolque).**

- ✔ Su utilización queda limitada a motocicletas y turismos, y está prohibida al resto, incluidos los turismos con remolque. _(RGC 41.1)_
- ✘ `cesp-0008` Los autobuses de más de 3.500 kg y los articulados pueden usarlo con independencia del número de ocupantes, en las condiciones fijadas para el tramo. _(RGC 35.2.a)_
- ✘ `cesp-0005` En un carril reversible hay que llevar encendida, al menos, la luz de corto alcance o de cruce, tanto de día como de noche. _(RGC 40.1)_

## cesp-0002

¿A qué velocidad se circula por un carril habilitado en sentido contrario al habitual, salvo que se señalice otra inferior?  
Respuesta: **Máxima 80 km/h y mínima 60 km/h.**

- ✔ Se circula con al menos la luz de cruce, de día y de noche, a un máximo de 80 km/h y un mínimo de 60 km/h, o inferiores si así se señaliza. _(RGC 41.1)_
- ✘ `cesp-0006` El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_
- ✘ `A-pri-0003` Los vehículos que circulan por raíles tienen prioridad de paso sobre los demás usuarios en las intersecciones sin señalizar. _(RGC 57.1.b)_

## cesp-0003

Si el carril se habilita en sentido contrario al habitual por obras en la calzada, ¿quién puede circular por él?  
Respuesta: **Todos los tipos de vehículos autorizados a circular por la vía en obra, salvo prohibición expresa.**

- ✔ Cuando se habilita por obras, pueden circular todos los tipos de vehículos autorizados en la vía en obra, salvo prohibición expresa. _(RGC 41.1)_
- ✘ `cesp-0004` Los vehículos que circulen por los arcenes y por el carril adicional lo harán a un máximo de 80 km/h y un mínimo de 60 km/h, con al menos la luz de cruce. _(RGC 42.1)_
- ✘ `cesp-0006` El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_

## cesp-0004

¿A qué velocidad máxima se circula por un carril adicional circunstancial, salvo que se señalice otra inferior?  
Respuesta: **80 km/h.**

- ✔ Los vehículos que circulen por los arcenes y por el carril adicional lo harán a un máximo de 80 km/h y un mínimo de 60 km/h, con al menos la luz de cruce. _(RGC 42.1)_
- ✘ `cesp-0006` El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_
- ✘ `cesp-0003` Cuando se habilita por obras, pueden circular todos los tipos de vehículos autorizados en la vía en obra, salvo prohibición expresa. _(RGC 41.1)_

## cesp-0005

Al circular por un carril reversible, ¿qué alumbrado debe llevar?  
Respuesta: **Al menos la luz de corto alcance o de cruce, de día y de noche.**

- ✔ En un carril reversible hay que llevar encendida, al menos, la luz de corto alcance o de cruce, tanto de día como de noche. _(RGC 40.1)_
- ✘ `res-cesp-0002` Si solo dispone de un carril en su sentido, debe ir entre 60 y 80 km/h y con luz de cruce. Si dispone de más de uno, se aplican los límites normales. _(RGC 41.1)_
- ✘ `cesp-0006` El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_

## cesp-0006

¿Puede circular un turismo con remolque por un carril VAO?  
Respuesta: **No, está prohibido.**

- ✔ El uso del carril VAO se limita a motocicletas, turismos y mixtos adaptables, y está prohibido al resto, incluidos los turismos con remolque. _(RGC 35.2.a)_
- ✘ `cesp-0005` En un carril reversible hay que llevar encendida, al menos, la luz de corto alcance o de cruce, tanto de día como de noche. _(RGC 40.1)_
- ✘ `res-cesp-0002` Si solo dispone de un carril en su sentido, debe ir entre 60 y 80 km/h y con luz de cruce. Si dispone de más de uno, se aplican los límites normales. _(RGC 41.1)_

## cesp-0007

¿Puede usar un carril VAO un turismo ocupado solo por su conductor que lleva la señal V-15?  
Respuesta: **Sí, si así se indica para ese tramo.**

- ✔ Los vehículos autorizados pueden usar el VAO aun cuando solo lo ocupe el conductor si ostentan la señal V-15 o la tarjeta de estacionamiento para personas con discapacidad. Siempre que así se indique en la relación de tramos de ese carril VAO. _(RGC 35.2.a)_
- ✘ `res-cesp-0003` Cuando en su sentido hay más de un carril, se aplican las velocidades genéricas; el tramo de 60 a 80 km/h solo rige si queda un único carril. En todo caso, con la luz de cruce encendida. _(RGC 41.1)_
- ✘ `cesp-0004` Los vehículos que circulen por los arcenes y por el carril adicional lo harán a un máximo de 80 km/h y un mínimo de 60 km/h, con al menos la luz de cruce. _(RGC 42.1)_

## cesp-0008

Un autobús de más de 3.500 kg de MMA, ¿puede usar un carril VAO aunque vaya vacío?  
Respuesta: **Sí, con independencia de su número de ocupantes, si así se indica para ese tramo.**

- ✔ Los autobuses de más de 3.500 kg y los articulados pueden usarlo con independencia del número de ocupantes, en las condiciones fijadas para el tramo. _(RGC 35.2.a)_
- ✘ `cesp-0003` Cuando se habilita por obras, pueden circular todos los tipos de vehículos autorizados en la vía en obra, salvo prohibición expresa. _(RGC 41.1)_
- ✘ `cesp-0005` En un carril reversible hay que llevar encendida, al menos, la luz de corto alcance o de cruce, tanto de día como de noche. _(RGC 40.1)_

## dist-0001

Dentro de un túnel, sin intención de adelantar, ¿qué distancia mínima debe mantener un turismo con el vehículo precedente?  
Respuesta: **100 metros o 4 segundos.**

- ✔ En túneles o pasos inferiores hay que mantener al menos 100 metros o un intervalo mínimo de cuatro segundos. _(RGC 95.6)_
- ✘ `dist-0005` Los conductores de vehículos a motor deben dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril. _(RGC 153.4)_
- ✘ `D-dis-0002` El clima y el estado del suelo influyen en la distancia de frenado: en un suelo mojado el vehículo puede necesitar más distancia para frenar. _(MANUAL_DGT Tema 10, Distancia de frenado (pág. 262))_

## dist-0002

Dentro de un túnel, ¿qué distancia mínima debe mantener un vehículo de más de 3.500 kg de MMA con el precedente?  
Respuesta: **150 metros o 6 segundos.**

- ✔ Los vehículos de MMA superior a 3.500 kg deben guardar al menos 150 metros o seis segundos. _(RGC 95.6)_
- ✘ `dist-0005` Los conductores de vehículos a motor deben dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril. _(RGC 153.4)_
- ✘ `res-dist-0002` El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado. _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_

## dist-0003

Fuera de poblado, en una vía con un solo carril por sentido donde está permitido adelantar, un camión de 12.000 kg que no va a adelantar, ¿qué separación mínima debe dejar con el vehículo de delante para facilitar que le adelanten?  
Respuesta: **50 metros.**

- ✔ Los vehículos de más de 3.500 kg y los de más de 10 m deben guardar una separación mínima de 50 metros para que puedan adelantarles con seguridad. No se aplica en poblado, donde está prohibido adelantar o donde hay más de un carril por sentido. _(RGC 54.2)_
- ✘ `D-dis-0003` La distancia de reacción es el espacio recorrido desde que se detecta un imprevisto (un obstáculo, una señal, un ruido) hasta que se puede reaccionar, por ejemplo hasta que se pisa el freno. _(MANUAL_DGT Tema 10, Distancia de reacción (pág. 261))_
- ✘ `res-dist-0002` El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado. _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_

## dist-0004

La obligación de dejar una separación extra para que otro pueda adelantarle, ¿se aplica en una vía donde está prohibido adelantar?  
Respuesta: **No.**

- ✔ Esa obligación no se aplica en poblado, donde esté prohibido adelantar, donde haya más de un carril en el mismo sentido o con circulación muy saturada. _(RGC 54.3.b)_
- ✘ `res-dist-0002` El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado. _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_
- ✘ `dist-0001` En túneles o pasos inferiores hay que mantener al menos 100 metros o un intervalo mínimo de cuatro segundos. _(RGC 95.6)_

## dist-0005

En vía urbana, un turismo circula detrás de un ciclista en el mismo carril. ¿Qué separación mínima debe dejar?  
Respuesta: **5 metros.**

- ✔ Los conductores de vehículos a motor deben dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril. _(RGC 153.4)_
- ✘ `D-dis-0003` La distancia de reacción es el espacio recorrido desde que se detecta un imprevisto (un obstáculo, una señal, un ruido) hasta que se puede reaccionar, por ejemplo hasta que se pisa el freno. _(MANUAL_DGT Tema 10, Distancia de reacción (pág. 261))_
- ✘ `res-dist-0002` El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado. _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_

## adel-0001

Al adelantar a un ciclista, ¿qué anchura de seguridad mínima hay que guardar?  
Respuesta: **1,5 metros.**

- ✔ Al adelantar a peatones, animales, vehículos de tracción animal, ciclomotores, VMP o ciclistas hay que guardar una anchura de seguridad de al menos 1,5 metros. _(RGC 85.4)_
- ✘ `A-adel-0013` Queda prohibido adelantar en los pasos para peatones señalizados, en las intersecciones con vías para ciclistas, en los pasos a nivel y en sus proximidades. _(RGC 87.1.b)_
- ✘ `A-adel-0004` El que va a adelantar debe asegurarse de que ningún conductor que le siga por el mismo carril ha iniciado la maniobra de adelantarle, y de que tiene espacio para volver a su carril. _(RGC 84.3)_

## adel-0002

Va a adelantar a un ciclista en una calzada con dos carriles para su sentido. ¿Qué debe hacer?  
Respuesta: **Cambiar completamente de carril.**

- ✔ Cuando la calzada tiene más de un carril por sentido, es obligatorio el cambio completo de carril. _(RGC 85.4)_
- ✘ `A-adel-0011` Por excepción, en vías con circulación en ambos sentidos, a los tranvías que marchan por la zona central se les adelanta por la derecha. _(RGC 82.2)_
- ✘ `A-adel-0013` Queda prohibido adelantar en los pasos para peatones señalizados, en las intersecciones con vías para ciclistas, en los pasos a nivel y en sus proximidades. _(RGC 87.1.b)_

## adel-0003

Fuera de poblado, en una vía limitada a 90 km/h, va a adelantar a un ciclista. ¿A qué velocidad máxima puede hacerlo?  
Respuesta: **70 km/h.**

- ✔ Fuera de poblado hay que reducir la velocidad al menos 20 km/h respecto al límite de la vía, antes y durante todo el adelantamiento: 90 − 20 = 70 km/h. _(RGC 85.4)_
- ✘ `A-adel-0011` Por excepción, en vías con circulación en ambos sentidos, a los tranvías que marchan por la zona central se les adelanta por la derecha. _(RGC 82.2)_
- ✘ `A-adel-0007` El conductor adelantado está obligado a disminuir su velocidad cuando, iniciada la maniobra, se produce una situación de peligro para cualquiera de los implicados. _(RGC 86.2)_

## adel-0004

A efectos del adelantamiento, un grupo de ciclistas que circula junto…  
Respuesta: **se considera una única unidad móvil.**

- ✔ Cuando los ciclistas circulen en grupo, se consideran como una única unidad móvil. _(RGC 85.4)_
- ✘ `A-adel-0011` Por excepción, en vías con circulación en ambos sentidos, a los tranvías que marchan por la zona central se les adelanta por la derecha. _(RGC 82.2)_
- ✘ `A-adel-0013` Queda prohibido adelantar en los pasos para peatones señalizados, en las intersecciones con vías para ciclistas, en los pasos a nivel y en sus proximidades. _(RGC 87.1.b)_

## adel-0005

Un vehículo averiado está inmovilizado ocupando parte de su carril. Al rebasarlo, ¿qué debe hacer?  
Respuesta: **Mantener al menos 1,5 metros y reducir la velocidad al menos 20 km/h respecto al límite de la vía.**

- ✔ Al rebasar un vehículo inmovilizado por avería, accidente o servicio de urgencia o auxilio que ocupe la calzada, hay que mantener al menos 1,5 m y reducir la velocidad al menos 20 km/h. _(RGC 88.1)_
- ✘ `A-adel-0014` Está prohibido adelantar en los túneles, pasos inferiores y tramos afectados por la señal «Túnel» (S-5) en los que solo se disponga de un carril para el sentido de circulación. _(RGC 87.1.d)_
- ✘ `A-adel-0007` El conductor adelantado está obligado a disminuir su velocidad cuando, iniciada la maniobra, se produce una situación de peligro para cualquiera de los implicados. _(RGC 86.2)_

## vel-0001

¿Cuál es la velocidad máxima genérica de un turismo en una autopista?  
Respuesta: **120 km/h.**

- ✔ Para turismos, motocicletas, autocaravanas de hasta 3.500 kg y pick-up, el límite genérico en autopista y autovía es 120 km/h. _(RGC 48.1.a)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_
- ✘ `vel-0014` En vías con plataforma única de calzada y acera el límite genérico es 20 km/h. _(RGC 50.1.a)_

## vel-0002

¿Cuál es la velocidad máxima genérica de un turismo en una carretera convencional?  
Respuesta: **90 km/h.**

- ✔ El límite genérico de turismos y motocicletas en carretera convencional es 90 km/h (el titular de la vía puede fijar 100 km/h si hay separación física de sentidos). _(RGC 48.1.a)_
- ✘ `vel-0018` En travesías y en vías urbanas de dos o más carriles por sentido, los vehículos con mercancías peligrosas circulan como máximo a 40 km/h. _(RGC 50.4)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0003

¿Cuál es la velocidad máxima genérica de un autobús en una autovía?  
Respuesta: **100 km/h.**

- ✔ Autobuses, derivados de turismo y mixtos adaptables: 100 km/h en autopista y autovía y 90 km/h en convencional. _(RGC 48.1.a)_
- ✘ `vel-0017` El límite genérico en autopistas y autovías que transcurren dentro de poblado es 80 km/h (ampliable con señalización específica). _(RGC 50.6)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0004

¿Cuál es la velocidad máxima genérica de un turismo con remolque en una autopista?  
Respuesta: **90 km/h.**

- ✔ Los automóviles con remolque están en el grupo de camiones, furgonetas y vehículos articulados: 90 km/h en autopista y autovía y 80 km/h en convencional. _(RGC 48.1.a)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_
- ✘ `vel-0017` El límite genérico en autopistas y autovías que transcurren dentro de poblado es 80 km/h (ampliable con señalización específica). _(RGC 50.6)_

## vel-0005

Un autobús que realiza transporte escolar circula por una autopista. ¿Cuál es su velocidad máxima genérica?  
Respuesta: **90 km/h.**

- ✔ El transporte escolar y de menores reduce en 10 km/h la velocidad máxima de su vehículo y vía: 100 − 10 = 90 km/h. _(RGC 48.1.b)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_
- ✘ `vel-0013` El límite genérico en vías urbanas de un único carril por sentido es 30 km/h. _(RGC 50.1.b)_

## vel-0006

Un camión que transporta mercancías peligrosas circula por una carretera convencional. ¿Cuál es su velocidad máxima genérica?  
Respuesta: **70 km/h.**

- ✔ El límite del camión en convencional es 80 km/h y se reduce 10 km/h por llevar mercancías peligrosas: 70 km/h. _(RGC 48.1.b)_
- ✘ `vel-0018` En travesías y en vías urbanas de dos o más carriles por sentido, los vehículos con mercancías peligrosas circulan como máximo a 40 km/h. _(RGC 50.4)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0007

¿Cuál es la velocidad máxima de un tractor agrícola que lleva remolque, fuera de poblado?  
Respuesta: **25 km/h.**

- ✔ Los vehículos especiales que carecen de señalización de frenado, llevan remolque o son motocultores tienen un máximo de 25 km/h. _(RGC 48.1.c)_
- ✘ `vel-0013` El límite genérico en vías urbanas de un único carril por sentido es 30 km/h. _(RGC 50.1.b)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0008

¿Cuál es la velocidad máxima de un cuadriciclo ligero fuera de poblado?  
Respuesta: **45 km/h.**

- ✔ Ciclos, ciclomotores de dos y tres ruedas y cuadriciclos ligeros: 45 km/h. _(RGC 48.1.e)_
- ✘ `vel-0014` En vías con plataforma única de calzada y acera el límite genérico es 20 km/h. _(RGC 50.1.a)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0009

¿Cuál es la velocidad máxima de un cuadriciclo (no ligero) en una carretera convencional?  
Respuesta: **70 km/h.**

- ✔ A los vehículos de tres ruedas y cuadriciclos se les aplica el límite de 70 km/h en cualquier vía donde esté permitida su circulación. _(RGC 48.1.h)_
- ✘ `vel-0018` En travesías y en vías urbanas de dos o más carriles por sentido, los vehículos con mercancías peligrosas circulan como máximo a 40 km/h. _(RGC 50.4)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0010

¿Cuál es el límite de velocidad máximo en una vía sin pavimentar?  
Respuesta: **30 km/h.**

- ✔ En las vías sin pavimentar el límite de velocidad máximo es de 30 km/h. _(RGC 48.1.f)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_
- ✘ `vel-0017` El límite genérico en autopistas y autovías que transcurren dentro de poblado es 80 km/h (ampliable con señalización específica). _(RGC 50.6)_

## vel-0011

¿Cuál es la velocidad mínima en autopistas y autovías para los vehículos a motor?  
Respuesta: **60 km/h.**

- ✔ Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_
- ✘ `vel-0007` Los vehículos especiales que carecen de señalización de frenado, llevan remolque o son motocultores tienen un máximo de 25 km/h. _(RGC 48.1.c)_
- ✘ `vel-0014` En vías con plataforma única de calzada y acera el límite genérico es 20 km/h. _(RGC 50.1.a)_

## vel-0012

¿Cuál es la velocidad mínima de un turismo en una carretera convencional, en condiciones normales?  
Respuesta: **45 km/h.**

- ✔ En las vías que no son autopista o autovía, la mínima es la mitad de la genérica de cada vehículo: 90 / 2 = 45 km/h. _(RGC 49.1)_
- ✘ `vel-0010` En las vías sin pavimentar el límite de velocidad máximo es de 30 km/h. _(RGC 48.1.f)_
- ✘ `vel-0016` El límite genérico en travesías es 50 km/h para todo tipo de vehículos. _(RGC 50.5)_

## vel-0013

¿Cuál es el límite genérico de velocidad en una vía urbana con un único carril por sentido?  
Respuesta: **30 km/h.**

- ✔ El límite genérico en vías urbanas de un único carril por sentido es 30 km/h. _(RGC 50.1.b)_
- ✘ `vel-0006` El límite del camión en convencional es 80 km/h y se reduce 10 km/h por llevar mercancías peligrosas: 70 km/h. _(RGC 48.1.b)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0014

¿Cuál es el límite genérico de velocidad en una vía urbana con plataforma única de calzada y acera?  
Respuesta: **20 km/h.**

- ✔ En vías con plataforma única de calzada y acera el límite genérico es 20 km/h. _(RGC 50.1.a)_
- ✘ `vel-0007` Los vehículos especiales que carecen de señalización de frenado, llevan remolque o son motocultores tienen un máximo de 25 km/h. _(RGC 48.1.c)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0015

Una calle tiene dos carriles en su sentido, pero uno de ellos es un carril bus. ¿Cuál es el límite genérico?  
Respuesta: **30 km/h, porque los carriles reservados no se cuentan.**

- ✔ Los carriles reservados para determinados usuarios o para transporte público no se contabilizan, así que queda un único carril por sentido: 30 km/h. _(RGC 50.1)_
- ✘ `vel-0002` El límite genérico de turismos y motocicletas en carretera convencional es 90 km/h (el titular de la vía puede fijar 100 km/h si hay separación física de sentidos). _(RGC 48.1.a)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0016

¿Cuál es el límite genérico de velocidad en una travesía?  
Respuesta: **50 km/h para todo tipo de vehículos.**

- ✔ El límite genérico en travesías es 50 km/h para todo tipo de vehículos. _(RGC 50.5)_
- ✘ `vel-0001` Para turismos, motocicletas, autocaravanas de hasta 3.500 kg y pick-up, el límite genérico en autopista y autovía es 120 km/h. _(RGC 48.1.a)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0017

¿Cuál es el límite genérico de velocidad en una autopista que transcurre dentro de poblado?  
Respuesta: **80 km/h.**

- ✔ El límite genérico en autopistas y autovías que transcurren dentro de poblado es 80 km/h (ampliable con señalización específica). _(RGC 50.6)_
- ✘ `vel-0009` A los vehículos de tres ruedas y cuadriciclos se les aplica el límite de 70 km/h en cualquier vía donde esté permitida su circulación. _(RGC 48.1.h)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_

## vel-0018

¿Cuál es la velocidad máxima de un vehículo que transporta mercancías peligrosas en una travesía?  
Respuesta: **40 km/h.**

- ✔ En travesías y en vías urbanas de dos o más carriles por sentido, los vehículos con mercancías peligrosas circulan como máximo a 40 km/h. _(RGC 50.4)_
- ✘ `vel-0011` Se prohíbe circular en autopistas y autovías con vehículos a motor a menos de 60 km/h (salvo las excepciones del art. 49.2). _(RGC 49.1)_
- ✘ `vel-0001` Para turismos, motocicletas, autocaravanas de hasta 3.500 kg y pick-up, el límite genérico en autopista y autovía es 120 km/h. _(RGC 48.1.a)_

## A-pri-0001

En la intersección sin señalizar del esquema, ¿qué vehículo pasa primero?  
Respuesta: **El vehículo C.**

- ✔ Sin señal que regule la preferencia, se cede el paso a los vehículos que se aproximan por la derecha. C es el único que no tiene ningún vehículo a su derecha; después pasa B y, por último, A. _(RGC 57.1)_
- ✘ `A-cic-0003` Los conductores de bicicletas tienen prioridad de paso cuando circulan por un carril bici, paso para ciclistas o arcén debidamente señalizados. _(RGC 64.2.a)_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_

## A-pri-0002

Circula por una vía pavimentada y llega a un cruce sin señalizar. Por su derecha se acerca un vehículo que sale de un camino sin pavimentar. ¿Quién tiene preferencia de paso?  
Respuesta: **Usted, porque circula por la vía pavimentada.**

- ✔ En las intersecciones sin señalizar, los vehículos que circulan por una vía pavimentada tienen preferencia sobre los que proceden de otra sin pavimentar, aunque estos vengan por la derecha. _(RGC 57.1.a)_
- ✘ `A-urg-0005` El conductor de un vehículo no prioritario que realiza un servicio de urgencia procurará que los demás lo adviertan usando el claxon de forma intermitente y la luz de emergencia, o agitando un pañuelo o procedimiento similar. _(RGC 70.1)_
- ✘ `A-cic-0001` Los ciclistas que circulan en grupo tienen prioridad cuando el primero ha iniciado ya el cruce o ha entrado en una glorieta; el grupo se trata como una unidad. _(RGC 64.2.c)_

## A-pri-0003

En una intersección sin señales ni semáforos se acerca un tranvía por su izquierda. ¿Quién tiene prioridad de paso?  
Respuesta: **El tranvía, porque circula por raíles.**

- ✔ Los vehículos que circulan por raíles tienen prioridad de paso sobre los demás usuarios en las intersecciones sin señalizar. _(RGC 57.1.b)_
- ✘ `A-pri-0009` Quien sale a una vía pública por un camino exclusivamente privado debe ceder el paso a los vehículos que circulen por ella, sea cual sea su sentido. _(RGC 72.2)_
- ✘ `A-pea-0001` Los peatones tienen prioridad cuando un vehículo va a girar para entrar en otra vía y hay peatones cruzándola, aunque no exista paso para ellos. _(RGC 65.1.b)_

## A-pri-0004

En una glorieta sin señalizar, ¿quién tiene preferencia de paso?  
Respuesta: **Los vehículos que ya se hallan dentro de la vía circular.**

- ✔ En las glorietas, los que se hallan dentro de la vía circular tienen preferencia sobre los que pretenden acceder a ella. _(RGC 57.1.c)_
- ✘ `A-pea-0005` Los peatones tienen prioridad cuando transitan unidades militares a pie, filas escolares y comitivas organizadas. _(RGC 65.1.e)_
- ✘ `A-cic-0002` Los ciclistas tienen prioridad cuando, para entrar en otra vía, el vehículo de motor gira a la derecha o a la izquierda y hay un ciclista en sus proximidades. _(RGC 64.2.b)_

## A-pri-0005

En ausencia de señalización, un vehículo que circula por una autopista y otro que pretende acceder a ella, ¿quién tiene preferencia?  
Respuesta: **El que circula por la autopista.**

- ✔ Los vehículos que circulan por una autopista o autovía tienen preferencia de paso sobre los que pretenden acceder a ella. _(RGC 57.1.d)_
- ✘ `A-cic-0002` Los ciclistas tienen prioridad cuando, para entrar en otra vía, el vehículo de motor gira a la derecha o a la izquierda y hay un ciclista en sus proximidades. _(RGC 64.2.b)_
- ✘ `A-est-0009` Se entienden por tramos de gran pendiente los que tienen una inclinación mínima del siete por ciento. _(RGC 63.1)_

## A-pri-0006

Ante una señal de «ceda el paso» o de «stop» en una intersección, ¿a quién debe ceder el paso?  
Respuesta: **A los vehículos que transiten por la vía preferente, cualquiera que sea el lado por el que se aproximen.**

- ✔ En las intersecciones con «ceda el paso» o «stop», se cede siempre el paso a los vehículos de la vía preferente, vengan por el lado que vengan. _(RGC 56.5)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_

## A-pri-0007

Tiene el semáforo en verde, pero la circulación está tan densa que previsiblemente quedará detenido dentro del cruce, obstruyendo la circulación transversal. ¿Qué debe hacer?  
Respuesta: **No entrar en la intersección, aunque goce de prioridad de paso.**

- ✔ Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_
- ✘ `A-pri-0002` En las intersecciones sin señalizar, los vehículos que circulan por una vía pavimentada tienen preferencia sobre los que proceden de otra sin pavimentar, aunque estos vengan por la derecha. _(RGC 57.1.a)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_

## A-pri-0008

Va a girar a la izquierda en un cruce y de frente se acerca, a poca distancia, un vehículo que sigue recto. ¿Qué debe hacer?  
Respuesta: **Abstenerse de girar hasta que la velocidad y la distancia del otro vehículo le permitan hacerlo sin peligro.**

- ✔ Quien va a girar debe cerciorarse de que la velocidad y la distancia de los vehículos que se acercan en sentido contrario le permiten hacer la maniobra sin peligro y, si no es así, abstenerse. _(RGC 74.1)_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_
- ✘ `A-cic-0001` Los ciclistas que circulan en grupo tienen prioridad cuando el primero ha iniciado ya el cruce o ha entrado en una glorieta; el grupo se trata como una unidad. _(RGC 64.2.c)_

## A-pri-0009

Va a salir a una vía pública desde un camino exclusivamente privado (por ejemplo, el de su casa). ¿A quién debe ceder el paso?  
Respuesta: **A los vehículos que circulen por la vía, cualquiera que sea el sentido en que lo hagan.**

- ✔ Quien sale a una vía pública por un camino exclusivamente privado debe ceder el paso a los vehículos que circulen por ella, sea cual sea su sentido. _(RGC 72.2)_
- ✘ `A-pea-0004` Los peatones tienen prioridad de paso en los pasos para peatones señalizados, en las aceras y en las demás zonas peatonales. _(RGC 65.1.a)_
- ✘ `A-pri-0003` Los vehículos que circulan por raíles tienen prioridad de paso sobre los demás usuarios en las intersecciones sin señalizar. _(RGC 57.1.b)_

## A-pea-0001

Al girar para entrar en otra calle encuentra peatones cruzándola, aunque allí no hay paso para peatones. ¿Quién tiene prioridad?  
Respuesta: **Los peatones.**

- ✔ Los peatones tienen prioridad cuando un vehículo va a girar para entrar en otra vía y hay peatones cruzándola, aunque no exista paso para ellos. _(RGC 65.1.b)_
- ✘ `A-est-0006` En el orden de preferencia, los vehículos de tracción animal van por delante de los turismos que arrastran remolques de hasta 750 kg de MMA. _(RGC 62.1.c y d)_
- ✘ `A-pri-0006` En las intersecciones con «ceda el paso» o «stop», se cede siempre el paso a los vehículos de la vía preferente, vengan por el lado que vengan. _(RGC 56.5)_

## A-pea-0002

Va a cruzar con su vehículo un arcén por el que circulan peatones que no disponen de zona peatonal. ¿Quién tiene prioridad?  
Respuesta: **Los peatones.**

- ✔ Los peatones tienen prioridad cuando el vehículo cruza un arcén por el que circulan peatones que no disponen de zona peatonal. _(RGC 65.1.c)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `B1-pri-0067` Los vehículos que circulan por raíles tienen derecho de prioridad de paso sobre los demás usuarios. _(RGC 57.1.b)_

## A-pea-0003

Unos peatones acaban de bajar de un autobús en una parada señalizada y se encuentran entre el autobús y la acera. ¿Tienen prioridad respecto a los vehículos?  
Respuesta: **Sí, mientras se encuentren entre el autobús y la zona peatonal o refugio más próximo.**

- ✔ Los peatones que vayan a subir o hayan bajado de un vehículo de transporte colectivo, en una parada señalizada, tienen prioridad mientras estén entre el vehículo y la zona peatonal o refugio más próximo. _(RGC 65.1.d)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_

## A-pea-0004

Sale de un garaje y tiene que atravesar la acera para llegar a la calzada. Por la acera camina un peatón. ¿Quién tiene prioridad?  
Respuesta: **El peatón.**

- ✔ Los peatones tienen prioridad de paso en los pasos para peatones señalizados, en las aceras y en las demás zonas peatonales. _(RGC 65.1.a)_
- ✘ `A-est-0008` En los tramos estrechos de gran pendiente, tiene preferencia el vehículo que sube, salvo si este puede llegar antes a un apartadero establecido al efecto. _(RGC 63.1)_
- ✘ `A-pri-0007` Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_

## A-pea-0005

Una fila escolar cruza la calzada fuera de un paso para peatones. ¿Quién tiene prioridad?  
Respuesta: **La fila escolar.**

- ✔ Los peatones tienen prioridad cuando transitan unidades militares a pie, filas escolares y comitivas organizadas. _(RGC 65.1.e)_
- ✘ `B1-pri-0067` Los vehículos que circulan por raíles tienen derecho de prioridad de paso sobre los demás usuarios. _(RGC 57.1.b)_
- ✘ `A-est-0006` En el orden de preferencia, los vehículos de tracción animal van por delante de los turismos que arrastran remolques de hasta 750 kg de MMA. _(RGC 62.1.c y d)_

## A-cic-0001

Un grupo de ciclistas cruza una intersección y el primero de ellos ya ha iniciado el cruce. ¿Qué debe hacer usted?  
Respuesta: **Dejar pasar a todo el grupo.**

- ✔ Los ciclistas que circulan en grupo tienen prioridad cuando el primero ha iniciado ya el cruce o ha entrado en una glorieta; el grupo se trata como una unidad. _(RGC 64.2.c)_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_

## A-cic-0002

Va a girar a la derecha para entrar en otra vía y hay un ciclista en sus proximidades que sigue recto. ¿Quién tiene prioridad?  
Respuesta: **El ciclista.**

- ✔ Los ciclistas tienen prioridad cuando, para entrar en otra vía, el vehículo de motor gira a la derecha o a la izquierda y hay un ciclista en sus proximidades. _(RGC 64.2.b)_
- ✘ `A-est-0009` Se entienden por tramos de gran pendiente los que tienen una inclinación mínima del siete por ciento. _(RGC 63.1)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_

## A-cic-0003

Un ciclista cruza por un paso para ciclistas debidamente señalizado, sin semáforo. ¿Quién tiene prioridad?  
Respuesta: **El ciclista.**

- ✔ Los conductores de bicicletas tienen prioridad de paso cuando circulan por un carril bici, paso para ciclistas o arcén debidamente señalizados. _(RGC 64.2.a)_
- ✘ `A-est-0007` Los camiones, tractocamiones y furgones tienen preferencia sobre los turismos y vehículos derivados de turismos. _(RGC 62.1.f y g)_
- ✘ `A-est-0009` Se entienden por tramos de gran pendiente los que tienen una inclinación mínima del siete por ciento. _(RGC 63.1)_

## A-ani-0001

Esta señal lleva debajo un panel complementario con la inscripción «Cañada». Si hay ganado cruzando la vía, ¿quién tiene prioridad?  
Respuesta: **Los animales.**

- ✔ Las cañadas se señalizan con un panel «cañada» bajo la señal de paso de animales domésticos. En las cañadas debidamente señalizadas, los animales tienen prioridad sobre los vehículos. _(RGC 66.1.a y 66.2)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_
- ✘ `A-pri-0007` Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_

## A-urg-0001

Como regla general, ¿cómo advierte de su presencia un vehículo prioritario (policía, bomberos, ambulancia) que circula en servicio urgente?  
Respuesta: **Utilizando a la vez la señal luminosa y el aparato emisor de señales acústicas especiales.**

- ✔ Tienen carácter de prioritarios estos vehículos cuando circulan en servicio urgente y advierten su presencia con la utilización simultánea de la señal luminosa y de las señales acústicas especiales. Solo pueden usar la luminosa aislada cuando omitir la acústica no entrañe peligro. _(RGC 68.2)_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_
- ✘ `A-urg-0005` El conductor de un vehículo no prioritario que realiza un servicio de urgencia procurará que los demás lo adviertan usando el claxon de forma intermitente y la luz de emergencia, o agitando un pañuelo o procedimiento similar. _(RGC 70.1)_

## A-urg-0002

El conductor de un vehículo prioritario en servicio urgente puede dejar de cumplir algunas normas de circulación. ¿Qué debe cumplir siempre?  
Respuesta: **Las órdenes y señales de los agentes.**

- ✔ Los conductores de vehículos prioritarios, si se han cerciorado de que no ponen en peligro a nadie, pueden dejar de cumplir bajo su responsabilidad determinadas normas, salvo las órdenes y señales de los agentes, que son siempre obligatorias. _(RGC 68.1)_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_

## A-urg-0003

Percibe las señales especiales de una ambulancia en servicio urgente que se aproxima. ¿Qué debe hacer?  
Respuesta: **Adoptar las medidas adecuadas para facilitarle el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso.**

- ✔ Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_
- ✘ `A-est-0008` En los tramos estrechos de gran pendiente, tiene preferencia el vehículo que sube, salvo si este puede llegar antes a un apartadero establecido al efecto. _(RGC 63.1)_
- ✘ `A-pea-0001` Los peatones tienen prioridad cuando un vehículo va a girar para entrar en otra vía y hay peatones cruzándola, aunque no exista paso para ellos. _(RGC 65.1.b)_

## A-urg-0004

Un vehículo de policía con sus señales luminosas y acústicas se sitúa detrás de usted y activa una luz roja intermitente hacia delante. ¿Qué debe hacer?  
Respuesta: **Detenerse con precaución en el lado derecho, delante del vehículo policial, y permanecer en el interior.**

- ✔ Ante esa señal, el conductor debe detenerse con las debidas precauciones en el lado derecho, delante del vehículo policial, en un lugar sin riesgos, permanecer en su interior y seguir las instrucciones del agente. _(RGC 69)_
- ✘ `A-pri-0008` Quien va a girar debe cerciorarse de que la velocidad y la distancia de los vehículos que se acercan en sentido contrario le permiten hacer la maniobra sin peligro y, si no es así, abstenerse. _(RGC 74.1)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_

## A-urg-0005

Por una circunstancia especialmente grave tiene que llevar urgentemente a un herido en su turismo, sin poder recurrir a otro medio. ¿Cómo advertirá a los demás usuarios?  
Respuesta: **Con el avisador acústico de forma intermitente y la luz de emergencia, o agitando un pañuelo o similar.**

- ✔ El conductor de un vehículo no prioritario que realiza un servicio de urgencia procurará que los demás lo adviertan usando el claxon de forma intermitente y la luz de emergencia, o agitando un pañuelo o procedimiento similar. _(RGC 70.1)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_
- ✘ `A-pri-0007` Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_

## A-urg-0006

Un turismo no prioritario que realiza un servicio de urgencia (lleva a un herido), ¿puede saltarse un semáforo en rojo?  
Respuesta: **No, debe respetar las normas de circulación, sobre todo en las intersecciones.**

- ✔ Los vehículos no prioritarios en servicio de urgencia deben respetar las normas de circulación, sobre todo en las intersecciones; los demás usuarios deben facilitarles el paso. _(RGC 70.2)_
- ✘ `A-cic-0002` Los ciclistas tienen prioridad cuando, para entrar en otra vía, el vehículo de motor gira a la derecha o a la izquierda y hay un ciclista en sus proximidades. _(RGC 64.2.b)_
- ✘ `A-pri-0007` Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_

## A-est-0001

En un tramo estrecho sin señalización, donde no caben dos vehículos en sentido contrario, ¿quién tiene preferencia de paso?  
Respuesta: **El que hubiese entrado primero.**

- ✔ En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_
- ✘ `A-cic-0002` Los ciclistas tienen prioridad cuando, para entrar en otra vía, el vehículo de motor gira a la derecha o a la izquierda y hay un ciclista en sus proximidades. _(RGC 64.2.b)_

## A-est-0002

Un camión y un turismo se encuentran en un estrechamiento sin señalizar y hay duda sobre cuál entró primero. ¿Quién tiene la preferencia?  
Respuesta: **El que tenga mayores dificultades de maniobra según el orden del reglamento: el camión.**

- ✔ En caso de duda sobre quién entró primero, tiene preferencia el vehículo con mayores dificultades de maniobra según el orden del artículo 62 (los camiones van antes que los turismos). La distancia de marcha atrás solo decide entre vehículos del mismo tipo. _(RGC 60.1)_
- ✘ `A-pea-0003` Los peatones que vayan a subir o hayan bajado de un vehículo de transporte colectivo, en una parada señalizada, tienen prioridad mientras estén entre el vehículo y la zona peatonal o refugio más próximo. _(RGC 65.1.d)_
- ✘ `A-urg-0005` El conductor de un vehículo no prioritario que realiza un servicio de urgencia procurará que los demás lo adviertan usando el claxon de forma intermitente y la luz de emergencia, o agitando un pañuelo o procedimiento similar. _(RGC 70.1)_

## A-est-0003

Dos turismos entran a la vez en un estrechamiento sin señalizar (no se puede saber quién entró primero) y uno de ellos tiene que dar marcha atrás. ¿Cuál tiene la preferencia?  
Respuesta: **El que tuviera que dar marcha atrás mayor distancia.**

- ✔ Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-pri-0002` En las intersecciones sin señalizar, los vehículos que circulan por una vía pavimentada tienen preferencia sobre los que proceden de otra sin pavimentar, aunque estos vengan por la derecha. _(RGC 57.1.a)_

## A-est-0004

Un autobús y un camión entran a la vez en un estrechamiento sin señalizar (no se puede saber quién entró primero) y uno debe dar marcha atrás. ¿Cuál tiene preferencia de paso?  
Respuesta: **El autobús.**

- ✔ En el orden de preferencia, los vehículos destinados al transporte colectivo de viajeros van por delante de los camiones, tractocamiones y furgones. _(RGC 62.1.e y f)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-pri-0006` En las intersecciones con «ceda el paso» o «stop», se cede siempre el paso a los vehículos de la vía preferente, vengan por el lado que vengan. _(RGC 56.5)_

## A-est-0005

Un turismo que arrastra un remolque de 500 kg de MMA y un autobús entran a la vez en un estrechamiento sin señalizar (no se puede saber quién entró primero). ¿Cuál de ellos debe dar marcha atrás?  
Respuesta: **El autobús.**

- ✔ Los turismos que arrastran remolques de hasta 750 kg de MMA tienen preferencia sobre los vehículos de transporte colectivo de viajeros, por lo que es el autobús el que debe retroceder. _(RGC 62.1.d y e)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-urg-0005` El conductor de un vehículo no prioritario que realiza un servicio de urgencia procurará que los demás lo adviertan usando el claxon de forma intermitente y la luz de emergencia, o agitando un pañuelo o procedimiento similar. _(RGC 70.1)_

## A-est-0006

Un vehículo de tracción animal y un turismo con un remolque de 600 kg de MMA entran a la vez en un estrechamiento sin señalizar (no se puede saber quién entró primero). ¿Cuál tiene preferencia de paso?  
Respuesta: **El vehículo de tracción animal.**

- ✔ En el orden de preferencia, los vehículos de tracción animal van por delante de los turismos que arrastran remolques de hasta 750 kg de MMA. _(RGC 62.1.c y d)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-pri-0008` Quien va a girar debe cerciorarse de que la velocidad y la distancia de los vehículos que se acercan en sentido contrario le permiten hacer la maniobra sin peligro y, si no es así, abstenerse. _(RGC 74.1)_

## A-est-0007

Un camión y un turismo sin remolque entran a la vez en un estrechamiento sin señalizar (no se puede saber quién entró primero). ¿Quién debe dar marcha atrás?  
Respuesta: **El turismo.**

- ✔ Los camiones, tractocamiones y furgones tienen preferencia sobre los turismos y vehículos derivados de turismos. _(RGC 62.1.f y g)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-pea-0001` Los peatones tienen prioridad cuando un vehículo va a girar para entrar en otra vía y hay peatones cruzándola, aunque no exista paso para ellos. _(RGC 65.1.b)_

## A-est-0008

En un tramo estrecho de gran pendiente sin señalizar, ¿quién tiene, como norma general, la preferencia de paso?  
Respuesta: **El vehículo que circula en sentido ascendente, salvo que pueda llegar antes a un apartadero.**

- ✔ En los tramos estrechos de gran pendiente, tiene preferencia el vehículo que sube, salvo si este puede llegar antes a un apartadero establecido al efecto. _(RGC 63.1)_
- ✘ `A-pri-0004` En las glorietas, los que se hallan dentro de la vía circular tienen preferencia sobre los que pretenden acceder a ella. _(RGC 57.1.c)_
- ✘ `A-est-0006` En el orden de preferencia, los vehículos de tracción animal van por delante de los turismos que arrastran remolques de hasta 750 kg de MMA. _(RGC 62.1.c y d)_

## A-est-0009

A efectos de la preferencia de paso, ¿qué se considera un tramo de gran pendiente?  
Respuesta: **El que tiene una inclinación mínima del 7 %.**

- ✔ Se entienden por tramos de gran pendiente los que tienen una inclinación mínima del siete por ciento. _(RGC 63.1)_
- ✘ `B1-pri-0067` Los vehículos que circulan por raíles tienen derecho de prioridad de paso sobre los demás usuarios. _(RGC 57.1.b)_
- ✘ `A-est-0006` En el orden de preferencia, los vehículos de tracción animal van por delante de los turismos que arrastran remolques de hasta 750 kg de MMA. _(RGC 62.1.c y d)_

## A-est-0010

Llega a un puente estrecho por el extremo en el que está colocada esta señal y, ya en el puente, se encuentra con otro vehículo con el que no puede cruzarse. ¿Qué debe hacer?  
Respuesta: **Retroceder para dejar paso al otro vehículo.**

- ✔ Si en uno de los extremos del puente está la señal de prioridad en sentido contrario o la de ceda el paso, el que llega por ese extremo debe retroceder para dejar paso al otro. _(RGC 61.2)_
- ✘ `A-cic-0002` Los ciclistas tienen prioridad cuando, para entrar en otra vía, el vehículo de motor gira a la derecha o a la izquierda y hay un ciclista en sus proximidades. _(RGC 64.2.b)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_

## A-adv-0001

Un vehículo lleva encendido el intermitente derecho, pero su conductor indica con el brazo que va a desplazarse a la izquierda. ¿A qué indicación debe hacer caso?  
Respuesta: **A la del brazo, que anula cualquier otra indicación óptica que la contradiga.**

- ✔ Las advertencias hechas con el brazo, si son perceptibles y se hacen conforme al reglamento, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_
- ✘ `A-adv-0006` En los desplazamientos laterales solo se avisa el desplazamiento, por lo que la advertencia debe concluir en cuanto el vehículo ha adoptado su nueva trayectoria. _(RGC 109.2.a)_
- ✘ `A-dir-0005` Cuando la calzada es de doble sentido y tres carriles separados por líneas discontinuas, para girar a la izquierda hay que colocarse en el carril central. _(RGC 75.1.b)_

## A-adv-0002

El conductor de un turismo saca el brazo izquierdo por la ventanilla, doblado hacia arriba y con la palma de la mano extendida. ¿Qué indica?  
Respuesta: **Que va a desplazarse hacia la derecha.**

- ✔ El desplazamiento lateral hacia el lado contrario al que indica la mano se advierte con el brazo doblado hacia arriba y la palma extendida. Con el brazo izquierdo, indica desplazamiento a la derecha. _(RGC 109.2.a)_
- ✘ `A-dir-0008` En vías interurbanas, los ciclos y ciclomotores de dos ruedas, si no hay un carril acondicionado para el giro a la izquierda, deben situarse a la derecha, fuera de la calzada si es posible, e iniciar el giro desde allí. _(RGC 76.2)_
- ✘ `A-adv-0001` Las advertencias hechas con el brazo, si son perceptibles y se hacen conforme al reglamento, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_

## A-adv-0003

Para advertir con el brazo que va a desplazarse hacia el lado que indica la mano, ¿cómo debe colocarlo?  
Respuesta: **En posición horizontal, con la palma de la mano extendida hacia abajo.**

- ✔ El desplazamiento lateral hacia el lado que la mano indica se advierte con el brazo en posición horizontal y la palma extendida hacia abajo. _(RGC 109.2.a)_
- ✘ `A-inc-0005` Toda maniobra de desplazamiento lateral que implique cambio de carril debe hacerse respetando la prioridad del que circula por el carril que se pretende ocupar. _(RGC 74.2)_
- ✘ `A-adv-0008` Las advertencias acústicas pueden hacerse para advertir, fuera de poblado, al conductor de otro vehículo el propósito de adelantarlo. _(RGC 110.2.b)_

## A-adv-0004

Si las luces de frenado no funcionan, ¿cómo puede advertir con el brazo que va a frenar de modo considerable?  
Respuesta: **Moviendo el brazo alternativamente de arriba abajo con movimientos cortos y rápidos.**

- ✔ La intención de inmovilizar el vehículo o frenar de modo considerable se advierte con las luces de frenado o moviendo el brazo alternativamente de arriba abajo con movimientos cortos y rápidos. _(RGC 109.2.c)_
- ✘ `A-inc-0002` En el carril de aceleración, el conductor debe cerciorarse al principio del carril de que puede incorporarse sin peligro, incluso deteniéndose si es necesario, y después acelerar hasta la velocidad adecuada al final del carril. _(RGC 72.4)_
- ✘ `A-inc-0005` Toda maniobra de desplazamiento lateral que implique cambio de carril debe hacerse respetando la prioridad del que circula por el carril que se pretende ocupar. _(RGC 74.2)_

## A-adv-0005

Un vehículo sin luz de marcha atrás va a circular hacia atrás. ¿Cómo debe advertirlo su conductor?  
Respuesta: **Extendiendo el brazo horizontalmente con la palma de la mano hacia atrás.**

- ✔ La marcha hacia atrás se advierte con la luz de marcha atrás o, si no se dispone de ella, extendiendo el brazo horizontalmente con la palma de la mano hacia atrás. _(RGC 109.2.b)_
- ✘ `A-dir-0004` Si el giro es a la izquierda en una calzada de doble sentido, hay que ceñirse a la marca longitudinal de separación entre sentidos o, si no existe, al eje de la calzada, sin invadir la zona del sentido contrario. _(RGC 75.1.b)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_

## A-adv-0006

En una maniobra de desplazamiento lateral, como un cambio de carril, ¿cuándo debe dejar de funcionar el intermitente?  
Respuesta: **Tan pronto como el vehículo haya adoptado su nueva trayectoria.**

- ✔ En los desplazamientos laterales solo se avisa el desplazamiento, por lo que la advertencia debe concluir en cuanto el vehículo ha adoptado su nueva trayectoria. _(RGC 109.2.a)_
- ✘ `A-adv-0001` Las advertencias hechas con el brazo, si son perceptibles y se hacen conforme al reglamento, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_
- ✘ `A-inc-0003` Quien sale a una vía pública por un camino exclusivamente privado debe asegurarse de que puede hacerlo sin peligro y hacerlo a una velocidad que le permita detenerse en el acto. _(RGC 72.2)_

## A-adv-0007

Dentro de poblado, el conductor de un vehículo no prioritario, ¿para qué puede utilizar el claxon?  
Respuesta: **Para evitar un posible accidente.**

- ✔ Las advertencias acústicas solo se pueden hacer para evitar un posible accidente, para advertir fuera de poblado el propósito de adelantar y en los servicios de urgencia de vehículos no prioritarios. Avisar del adelantamiento con el claxon solo vale fuera de poblado. _(RGC 110.2.a)_
- ✘ `A-adv-0009` Con la misma finalidad que las acústicas y para sustituirlas, pueden hacerse advertencias luminosas incluso en poblado, con las luces de corto o largo alcance de forma intermitente y evitando el deslumbramiento. _(RGC 109.3)_
- ✘ `A-inc-0004` En poblado, para facilitar la salida de los autobuses de las paradas señalizadas, los demás conductores deben desplazarse lateralmente, siempre que sea posible, o reducir su velocidad, llegando a detenerse si fuera preciso. _(RGC 73.2)_

## A-adv-0008

¿Dónde puede utilizar el claxon para advertir a otro conductor de su propósito de adelantarlo?  
Respuesta: **Solo fuera de poblado.**

- ✔ Las advertencias acústicas pueden hacerse para advertir, fuera de poblado, al conductor de otro vehículo el propósito de adelantarlo. _(RGC 110.2.b)_
- ✘ `A-adv-0005` La marcha hacia atrás se advierte con la luz de marcha atrás o, si no se dispone de ella, extendiendo el brazo horizontalmente con la palma de la mano hacia atrás. _(RGC 109.2.b)_
- ✘ `A-dir-0006` En el cambio de dirección a la izquierda hay que dejar a la izquierda el centro de la intersección, salvo que esté acondicionada o señalizada para dejarlo a la derecha. _(RGC 75.1.c)_

## A-adv-0009

Las ráfagas de luz (alumbrado de corto o largo alcance de forma intermitente), usadas para sustituir a las advertencias acústicas, ¿pueden emplearse dentro de poblado?  
Respuesta: **Sí, incluso en poblado, a intervalos muy cortos y evitando el deslumbramiento.**

- ✔ Con la misma finalidad que las acústicas y para sustituirlas, pueden hacerse advertencias luminosas incluso en poblado, con las luces de corto o largo alcance de forma intermitente y evitando el deslumbramiento. _(RGC 109.3)_
- ✘ `A-inc-0002` En el carril de aceleración, el conductor debe cerciorarse al principio del carril de que puede incorporarse sin peligro, incluso deteniéndose si es necesario, y después acelerar hasta la velocidad adecuada al final del carril. _(RGC 72.4)_
- ✘ `A-dir-0005` Cuando la calzada es de doble sentido y tres carriles separados por líneas discontinuas, para girar a la izquierda hay que colocarse en el carril central. _(RGC 75.1.b)_

## A-adv-0010

En un turismo, si el retrovisor interior no permite ver la carretera por detrás con el campo de visión reglamentario, ¿qué debe llevar además del retrovisor exterior izquierdo?  
Respuesta: **Un segundo retrovisor exterior, en el lado derecho.**

- ✔ En los turismos (M1), cuando el retrovisor interior no permite la visión del campo reglamentario hacia atrás, este pasa a ser opcional y debe colocarse un segundo retrovisor exterior en el lado derecho. _(RGV Anexo III.2, nota (1))_
- ✘ `res-veh-0001` En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo). _(RGV Anexo III.3 (tabla))_
- ✘ `E-mec-0004` Con el filtro del aire muy sucio o roto puede salir humo negro y se gasta más combustible. El humo blanco azulado indica exceso de aceite y el blanco al arrancar en frío es vapor de agua. _(MANUAL_DGT Tema 15, Sistema de alimentación (p. 367))_

## A-inc-0001

El conductor de un vehículo estacionado que va a incorporarse a la circulación, ¿debe ceder el paso a los vehículos que circulan?  
Respuesta: **Sí, debe cerciorarse de que puede hacerlo sin peligro y ceder el paso a otros vehículos.**

- ✔ Quien se incorpora a la circulación debe cerciorarse de que puede hacerlo sin peligro, cediendo el paso a otros vehículos y teniendo en cuenta su posición, trayectoria y velocidad, y advertirlo con las señales obligatorias. _(RGC 72.1)_
- ✘ `A-dir-0002` Para girar a la derecha hay que ceñirse todo lo posible al borde derecho de la calzada, colocándose con antelación y haciendo la maniobra en el menor espacio y tiempo posibles. _(RGC 75.1.b)_
- ✘ `A-adv-0002` El desplazamiento lateral hacia el lado contrario al que indica la mano se advierte con el brazo doblado hacia arriba y la palma extendida. Con el brazo izquierdo, indica desplazamiento a la derecha. _(RGC 109.2.a)_

## A-inc-0002

Va a utilizar un carril de aceleración para incorporarse a una autovía. ¿Dónde debe cerciorarse de que puede hacerlo sin peligro, deteniéndose si fuera necesario?  
Respuesta: **Al principio del carril de aceleración.**

- ✔ En el carril de aceleración, el conductor debe cerciorarse al principio del carril de que puede incorporarse sin peligro, incluso deteniéndose si es necesario, y después acelerar hasta la velocidad adecuada al final del carril. _(RGC 72.4)_
- ✘ `A-adv-0009` Con la misma finalidad que las acústicas y para sustituirlas, pueden hacerse advertencias luminosas incluso en poblado, con las luces de corto o largo alcance de forma intermitente y evitando el deslumbramiento. _(RGC 109.3)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_

## A-inc-0003

Al salir a una vía de uso público por un camino exclusivamente privado, ¿a qué velocidad debe hacerlo?  
Respuesta: **A una velocidad que le permita detenerse en el acto.**

- ✔ Quien sale a una vía pública por un camino exclusivamente privado debe asegurarse de que puede hacerlo sin peligro y hacerlo a una velocidad que le permita detenerse en el acto. _(RGC 72.2)_
- ✘ `A-adv-0008` Las advertencias acústicas pueden hacerse para advertir, fuera de poblado, al conductor de otro vehículo el propósito de adelantarlo. _(RGC 110.2.b)_
- ✘ `A-dir-0006` En el cambio de dirección a la izquierda hay que dejar a la izquierda el centro de la intersección, salvo que esté acondicionada o señalizada para dejarlo a la derecha. _(RGC 75.1.c)_

## A-inc-0004

Dentro de poblado, un autobús va a salir de una parada señalizada para proseguir su marcha. ¿Qué deben hacer los demás conductores?  
Respuesta: **Desplazarse lateralmente si es posible o reducir la velocidad, llegando a detenerse si fuera preciso.**

- ✔ En poblado, para facilitar la salida de los autobuses de las paradas señalizadas, los demás conductores deben desplazarse lateralmente, siempre que sea posible, o reducir su velocidad, llegando a detenerse si fuera preciso. _(RGC 73.2)_
- ✘ `A-inc-0003` Quien sale a una vía pública por un camino exclusivamente privado debe asegurarse de que puede hacerlo sin peligro y hacerlo a una velocidad que le permita detenerse en el acto. _(RGC 72.2)_
- ✘ `A-sen-0001` Cuando la espera en la calzada para cambiar de sentido impide la marcha de los que vienen detrás, hay que salir de ella por el lado derecho, si es posible, hasta que las condiciones permitan hacerlo. _(RGC 78.1)_

## A-inc-0005

Va a cambiar de carril. ¿Quién tiene la prioridad?  
Respuesta: **El que circula por el carril que usted pretende ocupar.**

- ✔ Toda maniobra de desplazamiento lateral que implique cambio de carril debe hacerse respetando la prioridad del que circula por el carril que se pretende ocupar. _(RGC 74.2)_
- ✘ `A-adv-0006` En los desplazamientos laterales solo se avisa el desplazamiento, por lo que la advertencia debe concluir en cuanto el vehículo ha adoptado su nueva trayectoria. _(RGC 109.2.a)_
- ✘ `A-sen-0004` Se prohíbe el cambio de sentido en todos los tramos en que está prohibido el adelantamiento, salvo que el cambio de sentido esté expresamente autorizado. _(RGC 79.1)_

## A-adel-0001

Con circulación densa, los vehículos ocupan todos los carriles y los de un carril avanzan más rápido que los de otro. ¿Se considera adelantamiento?  
Respuesta: **No, no se considera adelantamiento.**

- ✔ Cuando la densidad del tráfico es tal que los vehículos ocupan toda la anchura de la calzada y su velocidad depende de la del que les precede, que los de un carril circulen más rápido que los de otro no se considera adelantamiento. _(RGC 83.2)_
- ✘ `A-adel-0016` La excepción del artículo 88.2 incluye a los vehículos especiales agrícolas y sus conjuntos (además de ciclos, ciclomotores, VMP, peatones, animales y vehículos de tracción animal), pero no a turismos ni camiones. _(RGC 88.2)_
- ✘ `A-adel-0012` Está prohibido adelantar en curvas y cambios de rasante de visibilidad reducida, salvo que los dos sentidos estén claramente delimitados y la maniobra pueda hacerse sin invadir la zona del sentido contrario. _(RGC 87.1.a)_

## A-adel-0002

Un vehículo que circula por el carril de aceleración avanza más rápido que los que circulan por el carril contiguo de la calzada. ¿Se considera adelantamiento?  
Respuesta: **No, no se considera adelantamiento.**

- ✔ En los tramos con carriles de aceleración o deceleración, o reservados a determinados vehículos, avanzar más rápido por ellos que por los normales de circulación (o viceversa) no se considera adelantamiento. _(RGC 83.3)_
- ✘ `A-adel-0012` Está prohibido adelantar en curvas y cambios de rasante de visibilidad reducida, salvo que los dos sentidos estén claramente delimitados y la maniobra pueda hacerse sin invadir la zona del sentido contrario. _(RGC 87.1.a)_
- ✘ `adel-0001` Al adelantar a peatones, animales, vehículos de tracción animal, ciclomotores, VMP o ciclistas hay que guardar una anchura de seguridad de al menos 1,5 metros. _(RGC 85.4)_

## A-adel-0003

Quiere adelantar, pero el conductor que le precede en el mismo carril ya ha indicado su propósito de desplazarse hacia el mismo lado. ¿Qué debe hacer?  
Respuesta: **Respetar la preferencia del vehículo de delante.**

- ✔ Antes de adelantar hay que cerciorarse de que el vehículo que precede no ha indicado su propósito de desplazarse hacia el mismo lado; si lo ha hecho, hay que respetar su preferencia. _(RGC 84.2)_
- ✘ `adel-0001` Al adelantar a peatones, animales, vehículos de tracción animal, ciclomotores, VMP o ciclistas hay que guardar una anchura de seguridad de al menos 1,5 metros. _(RGC 85.4)_
- ✘ `A-adel-0011` Por excepción, en vías con circulación en ambos sentidos, a los tranvías que marchan por la zona central se les adelanta por la derecha. _(RGC 82.2)_

## A-adel-0004

Antes de iniciar un adelantamiento, ¿de qué debe asegurarse respecto a los vehículos que le siguen por el mismo carril?  
Respuesta: **De que ninguno ha iniciado ya la maniobra de adelantar a su vehículo.**

- ✔ El que va a adelantar debe asegurarse de que ningún conductor que le siga por el mismo carril ha iniciado la maniobra de adelantarle, y de que tiene espacio para volver a su carril. _(RGC 84.3)_
- ✘ `A-adel-0007` El conductor adelantado está obligado a disminuir su velocidad cuando, iniciada la maniobra, se produce una situación de peligro para cualquiera de los implicados. _(RGC 86.2)_
- ✘ `A-adel-0001` Cuando la densidad del tráfico es tal que los vehículos ocupan toda la anchura de la calzada y su velocidad depende de la del que les precede, que los de un carril circulen más rápido que los de otro no se considera adelantamiento. _(RGC 83.2)_

## A-adel-0005

En una autovía con tres carriles en su sentido, ¿puede adelantar a un vehículo que, a su vez, está adelantando a otro?  
Respuesta: **Sí, porque para hacerlo no tiene que invadir la parte de la calzada reservada al sentido contrario.**

- ✔ Solo se prohíbe adelantar a un vehículo que ya está adelantando a otro si, para hacerlo, hay que invadir la parte de la calzada reservada al sentido contrario. _(RGC 84.2)_
- ✘ `A-adel-0013` Queda prohibido adelantar en los pasos para peatones señalizados, en las intersecciones con vías para ciclistas, en los pasos a nivel y en sus proximidades. _(RGC 87.1.b)_
- ✘ `A-adel-0009` Por excepción, si hay espacio suficiente, el adelantamiento se hace por la derecha cuando el vehículo de delante indica claramente que va a girar a la izquierda o a parar en ese lado. _(RGC 82.2)_

## A-adel-0006

Advierte que el vehículo que le sigue quiere adelantarle. Usted no va a girar a la izquierda ni a parar en ese lado. ¿Qué debe hacer?  
Respuesta: **Ceñirse al borde derecho de la calzada.**

- ✔ El conductor que va a ser adelantado debe ceñirse al borde derecho de la calzada (salvo si va a girar o parar a la izquierda) y tiene prohibido aumentar la velocidad o dificultar el adelantamiento. _(RGC 86.1)_
- ✘ `A-adel-0003` Antes de adelantar hay que cerciorarse de que el vehículo que precede no ha indicado su propósito de desplazarse hacia el mismo lado; si lo ha hecho, hay que respetar su preferencia. _(RGC 84.2)_
- ✘ `A-adel-0009` Por excepción, si hay espacio suficiente, el adelantamiento se hace por la derecha cuando el vehículo de delante indica claramente que va a girar a la izquierda o a parar en ese lado. _(RGC 82.2)_

## A-adel-0007

Le están adelantando y, ya iniciada la maniobra, aparece un vehículo de frente que crea una situación de peligro. El que le adelanta sigue con la maniobra. ¿Qué debe hacer usted?  
Respuesta: **Disminuir la velocidad.**

- ✔ El conductor adelantado está obligado a disminuir su velocidad cuando, iniciada la maniobra, se produce una situación de peligro para cualquiera de los implicados. _(RGC 86.2)_
- ✘ `A-adel-0016` La excepción del artículo 88.2 incluye a los vehículos especiales agrícolas y sus conjuntos (además de ciclos, ciclomotores, VMP, peatones, animales y vehículos de tracción animal), pero no a turismos ni camiones. _(RGC 88.2)_
- ✘ `A-adel-0003` Antes de adelantar hay que cerciorarse de que el vehículo que precede no ha indicado su propósito de desplazarse hacia el mismo lado; si lo ha hecho, hay que respetar su preferencia. _(RGC 84.2)_

## A-adel-0008

Un camión que no puede ceñirse por completo al borde derecho quiere indicarle que puede adelantarle con seguridad, pero no cree conveniente hacer la señal con el brazo. ¿Qué señal utilizará?  
Respuesta: **El intermitente derecho.**

- ✔ Los vehículos pesados o de grandes dimensiones que no puedan ceñirse por completo a la derecha indican al que se acerca que puede adelantar con el brazo o, si no lo creen conveniente, con el intermitente derecho. _(RGC 86.1)_
- ✘ `A-adel-0005` Solo se prohíbe adelantar a un vehículo que ya está adelantando a otro si, para hacerlo, hay que invadir la parte de la calzada reservada al sentido contrario. _(RGC 84.2)_
- ✘ `A-adel-0016` La excepción del artículo 88.2 incluye a los vehículos especiales agrícolas y sus conjuntos (además de ciclos, ciclomotores, VMP, peatones, animales y vehículos de tracción animal), pero no a turismos ni camiones. _(RGC 88.2)_

## A-adel-0009

El vehículo que le precede indica claramente que va a girar a la izquierda y deja espacio suficiente. ¿Por dónde debe adelantarlo?  
Respuesta: **Por la derecha, adoptando las máximas precauciones.**

- ✔ Por excepción, si hay espacio suficiente, el adelantamiento se hace por la derecha cuando el vehículo de delante indica claramente que va a girar a la izquierda o a parar en ese lado. _(RGC 82.2)_
- ✘ `adel-0005` Al rebasar un vehículo inmovilizado por avería, accidente o servicio de urgencia o auxilio que ocupe la calzada, hay que mantener al menos 1,5 m y reducir la velocidad al menos 20 km/h. _(RGC 88.1)_
- ✘ `A-adel-0007` El conductor adelantado está obligado a disminuir su velocidad cuando, iniciada la maniobra, se produce una situación de peligro para cualquiera de los implicados. _(RGC 86.2)_

## A-adel-0010

Dentro de poblado, en una calzada con dos carriles para su sentido delimitados por marcas longitudinales, ¿puede adelantar por la derecha?  
Respuesta: **Sí, siempre que se cerciore previamente de que puede hacerlo sin peligro.**

- ✔ Dentro de poblado, en calzadas con al menos dos carriles para el mismo sentido delimitados por marcas longitudinales, se permite adelantar por la derecha si se comprueba antes que no hay peligro. _(RGC 82.3)_
- ✘ `A-adel-0004` El que va a adelantar debe asegurarse de que ningún conductor que le siga por el mismo carril ha iniciado la maniobra de adelantarle, y de que tiene espacio para volver a su carril. _(RGC 84.3)_
- ✘ `A-adel-0008` Los vehículos pesados o de grandes dimensiones que no puedan ceñirse por completo a la derecha indican al que se acerca que puede adelantar con el brazo o, si no lo creen conveniente, con el intermitente derecho. _(RGC 86.1)_

## A-adel-0011

En una vía con circulación en ambos sentidos, un tranvía marcha por la zona central. ¿Por dónde debe adelantarlo?  
Respuesta: **Por la derecha, si hay espacio suficiente y con las máximas precauciones.**

- ✔ Por excepción, en vías con circulación en ambos sentidos, a los tranvías que marchan por la zona central se les adelanta por la derecha. _(RGC 82.2)_
- ✘ `A-adel-0014` Está prohibido adelantar en los túneles, pasos inferiores y tramos afectados por la señal «Túnel» (S-5) en los que solo se disponga de un carril para el sentido de circulación. _(RGC 87.1.d)_
- ✘ `A-adel-0003` Antes de adelantar hay que cerciorarse de que el vehículo que precede no ha indicado su propósito de desplazarse hacia el mismo lado; si lo ha hecho, hay que respetar su preferencia. _(RGC 84.2)_

## A-adel-0012

En una curva de visibilidad reducida, ¿puede adelantar?  
Respuesta: **Sí, si los dos sentidos están claramente delimitados y puede hacerlo sin invadir la zona del sentido contrario.**

- ✔ Está prohibido adelantar en curvas y cambios de rasante de visibilidad reducida, salvo que los dos sentidos estén claramente delimitados y la maniobra pueda hacerse sin invadir la zona del sentido contrario. _(RGC 87.1.a)_
- ✘ `A-adel-0005` Solo se prohíbe adelantar a un vehículo que ya está adelantando a otro si, para hacerlo, hay que invadir la parte de la calzada reservada al sentido contrario. _(RGC 84.2)_
- ✘ `adel-0001` Al adelantar a peatones, animales, vehículos de tracción animal, ciclomotores, VMP o ciclistas hay que guardar una anchura de seguridad de al menos 1,5 metros. _(RGC 85.4)_

## A-adel-0013

¿Puede adelantar a un turismo en un paso para peatones señalizado?  
Respuesta: **No, está prohibido adelantar en los pasos para peatones señalizados y en sus proximidades.**

- ✔ Queda prohibido adelantar en los pasos para peatones señalizados, en las intersecciones con vías para ciclistas, en los pasos a nivel y en sus proximidades. _(RGC 87.1.b)_
- ✘ `A-adel-0002` En los tramos con carriles de aceleración o deceleración, o reservados a determinados vehículos, avanzar más rápido por ellos que por los normales de circulación (o viceversa) no se considera adelantamiento. _(RGC 83.3)_
- ✘ `A-adel-0006` El conductor que va a ser adelantado debe ceñirse al borde derecho de la calzada (salvo si va a girar o parar a la izquierda) y tiene prohibido aumentar la velocidad o dificultar el adelantamiento. _(RGC 86.1)_

## A-adel-0014

En un túnel que solo dispone de un carril para su sentido de circulación, ¿puede adelantar?  
Respuesta: **No, está prohibido.**

- ✔ Está prohibido adelantar en los túneles, pasos inferiores y tramos afectados por la señal «Túnel» (S-5) en los que solo se disponga de un carril para el sentido de circulación. _(RGC 87.1.d)_
- ✘ `A-adel-0010` Dentro de poblado, en calzadas con al menos dos carriles para el mismo sentido delimitados por marcas longitudinales, se permite adelantar por la derecha si se comprueba antes que no hay peligro. _(RGC 82.3)_
- ✘ `A-adel-0002` En los tramos con carriles de aceleración o deceleración, o reservados a determinados vehículos, avanzar más rápido por ellos que por los normales de circulación (o viceversa) no se considera adelantamiento. _(RGC 83.3)_

## A-adel-0015

En un tramo con prohibición de adelantar, circula detrás de un ciclomotor que va muy despacio. ¿Puede adelantarlo aunque tenga que ocupar el sentido contrario?  
Respuesta: **Sí, si por su velocidad puede ser adelantado sin riesgo y se ha cerciorado de que la maniobra puede hacerse sin peligro.**

- ✔ En tramos donde está prohibido adelantar se puede adelantar, ocupando el sentido contrario y tras cerciorarse de que no hay peligro, a bicicletas, ciclomotores, VMP, peatones, animales, vehículos de tracción animal y vehículos especiales agrícolas, cuando por su velocidad puedan ser adelantados sin riesgo. _(RGC 88.2)_
- ✘ `A-adel-0012` Está prohibido adelantar en curvas y cambios de rasante de visibilidad reducida, salvo que los dos sentidos estén claramente delimitados y la maniobra pueda hacerse sin invadir la zona del sentido contrario. _(RGC 87.1.a)_
- ✘ `A-adel-0010` Dentro de poblado, en calzadas con al menos dos carriles para el mismo sentido delimitados por marcas longitudinales, se permite adelantar por la derecha si se comprueba antes que no hay peligro. _(RGC 82.3)_

## A-adel-0016

En un tramo con prohibición de adelantar, ¿a cuál de estos vehículos se permite adelantar ocupando el sentido contrario, si por su velocidad puede hacerse sin riesgo y tras cerciorarse de que no hay peligro?  
Respuesta: **A un tractor agrícola.**

- ✔ La excepción del artículo 88.2 incluye a los vehículos especiales agrícolas y sus conjuntos (además de ciclos, ciclomotores, VMP, peatones, animales y vehículos de tracción animal), pero no a turismos ni camiones. _(RGC 88.2)_
- ✘ `A-adel-0001` Cuando la densidad del tráfico es tal que los vehículos ocupan toda la anchura de la calzada y su velocidad depende de la del que les precede, que los de un carril circulen más rápido que los de otro no se considera adelantamiento. _(RGC 83.2)_
- ✘ `A-adel-0006` El conductor que va a ser adelantado debe ceñirse al borde derecho de la calzada (salvo si va a girar o parar a la izquierda) y tiene prohibido aumentar la velocidad o dificultar el adelantamiento. _(RGC 86.1)_

## A-dir-0001

Va a girar a la izquierda y hay niebla espesa, de modo que no tiene visibilidad suficiente. ¿Qué debe hacer?  
Respuesta: **Abstenerse de realizar el giro.**

- ✔ El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_
- ✘ `A-dir-0002` Para girar a la derecha hay que ceñirse todo lo posible al borde derecho de la calzada, colocándose con antelación y haciendo la maniobra en el menor espacio y tiempo posibles. _(RGC 75.1.b)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_

## A-dir-0002

Si la vía no está acondicionada ni señalizada para hacerlo de otra manera, ¿cómo debe colocarse para girar a la derecha?  
Respuesta: **Ciñéndose todo lo posible al borde derecho de la calzada.**

- ✔ Para girar a la derecha hay que ceñirse todo lo posible al borde derecho de la calzada, colocándose con antelación y haciendo la maniobra en el menor espacio y tiempo posibles. _(RGC 75.1.b)_
- ✘ `A-dir-0008` En vías interurbanas, los ciclos y ciclomotores de dos ruedas, si no hay un carril acondicionado para el giro a la izquierda, deben situarse a la derecha, fuera de la calzada si es posible, e iniciar el giro desde allí. _(RGC 76.2)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_

## A-dir-0003

Circula por una calzada de sentido único y va a girar a la izquierda. Si la vía no está señalizada de otra manera, ¿cómo debe colocarse?  
Respuesta: **Ciñéndose todo lo posible al borde izquierdo de la calzada.**

- ✔ Si el giro es a la izquierda y la calzada es de un solo sentido, hay que ceñirse todo lo posible al borde izquierdo. _(RGC 75.1.b)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_

## A-dir-0004

Circula por una calzada de doble sentido (un carril por sentido) y va a girar a la izquierda. ¿Cómo debe colocarse?  
Respuesta: **Ciñéndose a la marca de separación entre sentidos o, si no existe, al eje de la calzada, sin invadir el sentido contrario.**

- ✔ Si el giro es a la izquierda en una calzada de doble sentido, hay que ceñirse a la marca longitudinal de separación entre sentidos o, si no existe, al eje de la calzada, sin invadir la zona del sentido contrario. _(RGC 75.1.b)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_

## A-dir-0005

En una calzada de doble sentido con tres carriles separados por líneas discontinuas, ¿dónde debe colocarse para girar a la izquierda?  
Respuesta: **En el carril central.**

- ✔ Cuando la calzada es de doble sentido y tres carriles separados por líneas discontinuas, para girar a la izquierda hay que colocarse en el carril central. _(RGC 75.1.b)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_

## A-dir-0006

Al girar a la izquierda en una intersección que no está acondicionada ni señalizada de otro modo, ¿cómo debe dejar el centro de la intersección?  
Respuesta: **A su izquierda.**

- ✔ En el cambio de dirección a la izquierda hay que dejar a la izquierda el centro de la intersección, salvo que esté acondicionada o señalizada para dejarlo a la derecha. _(RGC 75.1.c)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_
- ✘ `A-dir-0008` En vías interurbanas, los ciclos y ciclomotores de dos ruedas, si no hay un carril acondicionado para el giro a la izquierda, deben situarse a la derecha, fuera de la calzada si es posible, e iniciar el giro desde allí. _(RGC 76.2)_

## A-dir-0007

Por las dimensiones de su vehículo no puede girar ajustándose estrictamente a las normas de colocación. ¿Qué debe hacer?  
Respuesta: **Adoptar las precauciones necesarias para evitar todo peligro al realizarlo.**

- ✔ Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_
- ✘ `A-dir-0005` Cuando la calzada es de doble sentido y tres carriles separados por líneas discontinuas, para girar a la izquierda hay que colocarse en el carril central. _(RGC 75.1.b)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_

## A-dir-0008

En una vía interurbana sin carril especialmente acondicionado para el giro a la izquierda, ¿cómo debe girar a la izquierda un ciclista?  
Respuesta: **Situándose a la derecha, fuera de la calzada siempre que sea posible, e iniciando el giro desde ese lugar.**

- ✔ En vías interurbanas, los ciclos y ciclomotores de dos ruedas, si no hay un carril acondicionado para el giro a la izquierda, deben situarse a la derecha, fuera de la calzada si es posible, e iniciar el giro desde allí. _(RGC 76.2)_
- ✘ `A-dir-0004` Si el giro es a la izquierda en una calzada de doble sentido, hay que ceñirse a la marca longitudinal de separación entre sentidos o, si no existe, al eje de la calzada, sin invadir la zona del sentido contrario. _(RGC 75.1.b)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_

## A-sen-0001

Espera para cambiar de sentido y su permanencia en la calzada impide continuar a los vehículos que circulan detrás. ¿Qué debe hacer?  
Respuesta: **Salir de la calzada por su lado derecho, si es posible, hasta que pueda realizar la maniobra.**

- ✔ Cuando la espera en la calzada para cambiar de sentido impide la marcha de los que vienen detrás, hay que salir de ella por el lado derecho, si es posible, hasta que las condiciones permitan hacerlo. _(RGC 78.1)_
- ✘ `A-sen-0004` Se prohíbe el cambio de sentido en todos los tramos en que está prohibido el adelantamiento, salvo que el cambio de sentido esté expresamente autorizado. _(RGC 79.1)_
- ✘ `A-inc-0004` En poblado, para facilitar la salida de los autobuses de las paradas señalizadas, los demás conductores deben desplazarse lateralmente, siempre que sea posible, o reducir su velocidad, llegando a detenerse si fuera preciso. _(RGC 73.2)_

## A-sen-0002

¿En cuál de estos lugares está prohibido el cambio de sentido?  
Respuesta: **En un paso a nivel.**

- ✔ Se prohíbe el cambio de sentido en toda situación que impida comprobar que no hay peligro, en los pasos a nivel, en túneles y pasos inferiores, en autopistas y autovías (salvo lugares habilitados) y en los tramos donde está prohibido adelantar, salvo autorización expresa. _(RGC 79.1)_
- ✘ `A-sen-0001` Cuando la espera en la calzada para cambiar de sentido impide la marcha de los que vienen detrás, hay que salir de ella por el lado derecho, si es posible, hasta que las condiciones permitan hacerlo. _(RGC 78.1)_
- ✘ `A-inc-0001` Quien se incorpora a la circulación debe cerciorarse de que puede hacerlo sin peligro, cediendo el paso a otros vehículos y teniendo en cuenta su posición, trayectoria y velocidad, y advertirlo con las señales obligatorias. _(RGC 72.1)_

## A-sen-0003

¿Puede cambiar de sentido en una autopista atravesando la mediana?  
Respuesta: **No; en autopistas y autovías solo se puede en los lugares habilitados al efecto.**

- ✔ Se prohíbe el cambio de sentido en autopistas y autovías, salvo en los lugares habilitados al efecto. _(RGC 79.1)_
- ✘ `A-sen-0001` Cuando la espera en la calzada para cambiar de sentido impide la marcha de los que vienen detrás, hay que salir de ella por el lado derecho, si es posible, hasta que las condiciones permitan hacerlo. _(RGC 78.1)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_

## A-sen-0004

En un tramo en el que está prohibido adelantar, ¿se puede cambiar de sentido?  
Respuesta: **No, salvo que el cambio de sentido esté expresamente autorizado.**

- ✔ Se prohíbe el cambio de sentido en todos los tramos en que está prohibido el adelantamiento, salvo que el cambio de sentido esté expresamente autorizado. _(RGC 79.1)_
- ✘ `A-sen-0001` Cuando la espera en la calzada para cambiar de sentido impide la marcha de los que vienen detrás, hay que salir de ella por el lado derecho, si es posible, hasta que las condiciones permitan hacerlo. _(RGC 78.1)_
- ✘ `A-adv-0005` La marcha hacia atrás se advierte con la luz de marcha atrás o, si no se dispone de ella, extendiendo el brazo horizontalmente con la palma de la mano hacia atrás. _(RGC 109.2.b)_

## A-ma-0001

Como maniobra complementaria de la parada, el estacionamiento o la incorporación a la circulación, ¿qué recorrido máximo puede hacer marcha atrás?  
Respuesta: **15 metros, sin invadir un cruce de vías.**

- ✔ El recorrido hacia atrás como maniobra complementaria de la parada, el estacionamiento o la incorporación no puede superar 15 metros ni invadir un cruce de vías. _(RGC 80.2)_
- ✘ `A-dir-0004` Si el giro es a la izquierda en una calzada de doble sentido, hay que ceñirse a la marca longitudinal de separación entre sentidos o, si no existe, al eje de la calzada, sin invadir la zona del sentido contrario. _(RGC 75.1.b)_
- ✘ `A-adv-0005` La marcha hacia atrás se advierte con la luz de marcha atrás o, si no se dispone de ella, extendiendo el brazo horizontalmente con la palma de la mano hacia atrás. _(RGC 109.2.b)_

## A-ma-0002

Ha entrado en una calle sin salida tan estrecha que no puede seguir hacia delante ni dar la vuelta. ¿Puede salir marcha atrás?  
Respuesta: **Sí, con el recorrido mínimo indispensable.**

- ✔ Se permite circular hacia atrás cuando no sea posible marchar hacia delante ni cambiar de dirección o sentido, y siempre con el recorrido mínimo indispensable. El límite de 15 m se refiere a la marcha atrás complementaria de la parada, el estacionamiento o la incorporación. _(RGC 80.1)_
- ✘ `A-inc-0004` En poblado, para facilitar la salida de los autobuses de las paradas señalizadas, los demás conductores deben desplazarse lateralmente, siempre que sea posible, o reducir su velocidad, llegando a detenerse si fuera preciso. _(RGC 73.2)_
- ✘ `A-inc-0001` Quien se incorpora a la circulación debe cerciorarse de que puede hacerlo sin peligro, cediendo el paso a otros vehículos y teniendo en cuenta su posición, trayectoria y velocidad, y advertirlo con las señales obligatorias. _(RGC 72.1)_

## A-ma-0003

¿Está permitida la maniobra de marcha atrás en una autovía para volver a una salida que se ha pasado?  
Respuesta: **No, está prohibida la marcha atrás en autovías y autopistas.**

- ✔ Se prohíbe la maniobra de marcha atrás en autovías y autopistas. _(RGC 80.3)_
- ✘ `A-dir-0001` El conductor debe abstenerse de realizar un cambio de dirección a la izquierda cuando no exista visibilidad suficiente. _(RGC 74.1)_
- ✘ `A-dir-0003` Si el giro es a la izquierda y la calzada es de un solo sentido, hay que ceñirse todo lo posible al borde izquierdo. _(RGC 75.1.b)_

## A-par-0001

Según la Ley de Tráfico, ¿qué es una parada?  
Respuesta: **La inmovilización de un vehículo durante menos de dos minutos, sin que el conductor pueda abandonarlo.**

- ✔ Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_
- ✘ `A-par-0011` Está prohibido parar en las intersecciones y sus proximidades si se dificulta el giro a otros vehículos o, en vías interurbanas, si se genera peligro por falta de visibilidad. _(RGC 94.1.d)_

## A-par-0002

Se inmoviliza ante un semáforo en rojo. ¿Qué tipo de inmovilización realiza?  
Respuesta: **Una detención.**

- ✔ Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_

## A-par-0003

Inmoviliza su vehículo voluntariamente y se aleja de él durante un minuto para entrar en una tienda. ¿Qué maniobra ha realizado?  
Respuesta: **Un estacionamiento, porque ha abandonado el vehículo.**

- ✔ La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_
- ✘ `A-par-0015` En vías interurbanas, la parada o el estacionamiento debe hacerse siempre fuera de la calzada, en el lado derecho y dejando libre la parte transitable del arcén. _(RGC 90.1)_

## A-par-0004

¿Qué indica esta marca vial amarilla continua junto al bordillo?  
Respuesta: **Prohibición de parada y de estacionamiento en ese lado de la calzada.**

- ✔ La marca longitudinal continua amarilla (M-7.8) indica la prohibición de la parada y del estacionamiento a lo largo de toda su longitud en el lado de la calzada donde está situada. _(RGC Anexo I, apdo. 4.7 (M-7.8))_
- ✘ `A-par-0015` En vías interurbanas, la parada o el estacionamiento debe hacerse siempre fuera de la calzada, en el lado derecho y dejando libre la parte transitable del arcén. _(RGC 90.1)_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_

## A-par-0005

¿Qué indica esta marca vial amarilla discontinua junto al bordillo?  
Respuesta: **Prohibición de estacionamiento en ese lado de la calzada.**

- ✔ La marca longitudinal discontinua amarilla (M-7.7) indica la prohibición del estacionamiento a lo largo de toda su longitud en el lado de la calzada donde está situada; no prohíbe la parada. _(RGC Anexo I, apdo. 4.7 (M-7.7))_
- ✘ `A-par-0016` En vías urbanas, el vehículo se sitúa lo más cerca posible del borde derecho, salvo en las vías de único sentido, en las que también puede situarse en el lado izquierdo. _(RGC 90.2)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_

## A-par-0006

¿Qué indica esta marca vial amarilla en zigzag?  
Respuesta: **Un lugar donde el estacionamiento está prohibido por estar reservado a algún uso especial, como una parada de autobús o carga y descarga.**

- ✔ La marca en zigzag (M-7.9) indica el lugar de la calzada en que el estacionamiento está prohibido a los vehículos en general, por estar reservado para algún uso especial que no implique larga permanencia, como paradas de autobús o carga y descarga. _(RGC Anexo I, apdo. 4.7 (M-7.9))_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_
- ✘ `A-par-0008` Está prohibido parar, entre otros lugares, en pasos a nivel, pasos para ciclistas y pasos para peatones. En las calles de sentido único se puede parar también en el lado izquierdo, y la línea amarilla discontinua solo prohíbe estacionar. _(RGC 94.1.b)_

## A-par-0007

Una parada o estacionamiento se considera que obstaculiza gravemente la circulación cuando la distancia entre el vehículo y el borde opuesto de la calzada (o una marca longitudinal que prohíba atravesarla) es inferior a…  
Respuesta: **3 metros.**

- ✔ Se consideran paradas o estacionamientos en lugares peligrosos o que obstaculizan gravemente la circulación, entre otros, cuando esa distancia es inferior a tres metros o no permite el paso de otros vehículos. _(RGC 91.2.a)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_
- ✘ `A-par-0015` En vías interurbanas, la parada o el estacionamiento debe hacerse siempre fuera de la calzada, en el lado derecho y dejando libre la parte transitable del arcén. _(RGC 90.1)_

## A-par-0008

¿En cuál de estos lugares está prohibido parar?  
Respuesta: **En un paso para peatones.**

- ✔ Está prohibido parar, entre otros lugares, en pasos a nivel, pasos para ciclistas y pasos para peatones. En las calles de sentido único se puede parar también en el lado izquierdo, y la línea amarilla discontinua solo prohíbe estacionar. _(RGC 94.1.b)_
- ✘ `A-par-0017` En un vehículo con caja de cambios hay que dejar colocada la primera velocidad en pendiente ascendente y la marcha atrás en descendente (o, en su caso, la posición de estacionamiento). _(RGC 92.3.c)_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_

## A-par-0009

¿Puede hacer una breve parada en un carril destinado al uso exclusivo del transporte público urbano?  
Respuesta: **No, está prohibido parar en esos carriles.**

- ✔ Queda prohibido parar en los carriles destinados al uso exclusivo del transporte público urbano y en los reservados para las bicicletas. _(RGC 94.1.h)_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_
- ✘ `A-par-0017` En un vehículo con caja de cambios hay que dejar colocada la primera velocidad en pendiente ascendente y la marcha atrás en descendente (o, en su caso, la posición de estacionamiento). _(RGC 92.3.c)_

## A-par-0010

¿Está permitido parar en una zona señalizada para uso exclusivo de personas con discapacidad, si no se está autorizado a usarla?  
Respuesta: **No, está prohibido parar y, por tanto, también estacionar.**

- ✔ Queda prohibido parar en zonas señalizadas para uso exclusivo de minusválidos; en todos los lugares donde está prohibida la parada también lo está el estacionamiento. _(RGC 94.1.j)_
- ✘ `A-par-0019` Cuando se trate de un vehículo de más de 3.500 kg de MMA, de un autobús o de un conjunto de vehículos y se pare o estacione en sensible pendiente, el conductor debe dejarlo debidamente calzado. _(RGC 92.3.d)_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_

## A-par-0011

¿Cuándo está prohibido parar en una intersección o en sus proximidades?  
Respuesta: **Cuando se dificulte el giro a otros vehículos.**

- ✔ Está prohibido parar en las intersecciones y sus proximidades si se dificulta el giro a otros vehículos o, en vías interurbanas, si se genera peligro por falta de visibilidad. _(RGC 94.1.d)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_

## A-par-0012

Va por una autopista y quiere parar un momento para descansar. ¿Puede hacerlo en el arcén?  
Respuesta: **No, en autopistas y autovías está prohibido parar, salvo en las zonas habilitadas para ello.**

- ✔ Queda prohibido parar en autopistas y autovías, salvo en las zonas habilitadas para ello. _(RGC 94.1.g)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_
- ✘ `A-par-0018` En pendiente descendente hay que dejar colocada la marcha hacia atrás; en ascendente, la primera. _(RGC 92.3.c)_

## A-par-0013

¿Está permitido estacionar en doble fila?  
Respuesta: **No, está prohibido estacionar en doble fila.**

- ✔ Queda prohibido estacionar en doble fila. _(RGC 94.2.g)_
- ✘ `A-par-0018` En pendiente descendente hay que dejar colocada la marcha hacia atrás; en ascendente, la primera. _(RGC 92.3.c)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_

## A-par-0014

¿Está permitido estacionar delante de un vado señalizado correctamente?  
Respuesta: **No, está prohibido.**

- ✔ Queda prohibido estacionar delante de los vados señalizados correctamente. _(RGC 94.2.f)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_
- ✘ `A-par-0018` En pendiente descendente hay que dejar colocada la marcha hacia atrás; en ascendente, la primera. _(RGC 92.3.c)_

## A-par-0015

En una vía interurbana, ¿dónde debe efectuarse la parada o el estacionamiento?  
Respuesta: **Fuera de la calzada, en el lado derecho, dejando libre la parte transitable del arcén.**

- ✔ En vías interurbanas, la parada o el estacionamiento debe hacerse siempre fuera de la calzada, en el lado derecho y dejando libre la parte transitable del arcén. _(RGC 90.1)_
- ✘ `A-par-0003` La parada exige que el conductor no pueda abandonar el vehículo. Si lo abandona, aunque sea menos de dos minutos, la inmovilización no es detención ni parada y, por tanto, es estacionamiento. _(LSV Anexo I.82)_
- ✘ `A-par-0021` Si se calza apoyando una rueda directriz en el bordillo, las ruedas se inclinan hacia el centro de la calzada en las pendientes ascendentes y hacia fuera en las descendentes. _(RGC 92.3.d)_

## A-par-0016

En una calle urbana de sentido único, si tiene que parar o estacionar en la calzada, ¿en qué lado puede hacerlo?  
Respuesta: **En el lado derecho o también en el izquierdo.**

- ✔ En vías urbanas, el vehículo se sitúa lo más cerca posible del borde derecho, salvo en las vías de único sentido, en las que también puede situarse en el lado izquierdo. _(RGC 90.2)_
- ✘ `A-par-0011` Está prohibido parar en las intersecciones y sus proximidades si se dificulta el giro a otros vehículos o, en vías interurbanas, si se genera peligro por falta de visibilidad. _(RGC 94.1.d)_
- ✘ `A-par-0019` Cuando se trate de un vehículo de más de 3.500 kg de MMA, de un autobús o de un conjunto de vehículos y se pare o estacione en sensible pendiente, el conductor debe dejarlo debidamente calzado. _(RGC 92.3.d)_

## A-par-0017

Estaciona un turismo con caja de cambios manual en una pendiente ascendente. Además de accionar el freno de estacionamiento, ¿qué marcha debe dejar colocada?  
Respuesta: **La primera.**

- ✔ En un vehículo con caja de cambios hay que dejar colocada la primera velocidad en pendiente ascendente y la marcha atrás en descendente (o, en su caso, la posición de estacionamiento). _(RGC 92.3.c)_
- ✘ `A-par-0010` Queda prohibido parar en zonas señalizadas para uso exclusivo de minusválidos; en todos los lugares donde está prohibida la parada también lo está el estacionamiento. _(RGC 94.1.j)_
- ✘ `A-par-0016` En vías urbanas, el vehículo se sitúa lo más cerca posible del borde derecho, salvo en las vías de único sentido, en las que también puede situarse en el lado izquierdo. _(RGC 90.2)_

## A-par-0018

Estaciona un turismo con caja de cambios manual en una pendiente descendente. Además de accionar el freno de estacionamiento, ¿qué marcha debe dejar colocada?  
Respuesta: **La marcha atrás.**

- ✔ En pendiente descendente hay que dejar colocada la marcha hacia atrás; en ascendente, la primera. _(RGC 92.3.c)_
- ✘ `A-par-0013` Queda prohibido estacionar en doble fila. _(RGC 94.2.g)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_

## A-par-0019

¿Qué vehículos, además de las otras precauciones, deben quedar debidamente calzados cuando paran o estacionan en un lugar con sensible pendiente?  
Respuesta: **Los de más de 3.500 kg de MMA, los autobuses y los conjuntos de vehículos.**

- ✔ Cuando se trate de un vehículo de más de 3.500 kg de MMA, de un autobús o de un conjunto de vehículos y se pare o estacione en sensible pendiente, el conductor debe dejarlo debidamente calzado. _(RGC 92.3.d)_
- ✘ `A-par-0010` Queda prohibido parar en zonas señalizadas para uso exclusivo de minusválidos; en todos los lugares donde está prohibida la parada también lo está el estacionamiento. _(RGC 94.1.j)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_

## A-par-0020

El conductor de un camión de más de 3.500 kg que estaciona en una sensible pendiente no lleva calzos. ¿Puede utilizar una piedra como calzo?  
Respuesta: **No, no pueden emplearse piedras ni otros elementos no destinados expresamente a esa función.**

- ✔ Estos vehículos deben quedar calzados con calzos, sin que puedan emplearse piedras u otros elementos no destinados expresamente a esa función, o apoyando una rueda directriz en el bordillo. _(RGC 92.3.d)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_
- ✘ `A-par-0009` Queda prohibido parar en los carriles destinados al uso exclusivo del transporte público urbano y en los reservados para las bicicletas. _(RGC 94.1.h)_

## A-par-0021

Un camión de más de 3.500 kg estaciona en una pendiente ascendente sensible y, en lugar de calzos, apoya una rueda directriz en el bordillo. ¿Hacia dónde debe inclinar las ruedas directrices?  
Respuesta: **Hacia el centro de la calzada.**

- ✔ Si se calza apoyando una rueda directriz en el bordillo, las ruedas se inclinan hacia el centro de la calzada en las pendientes ascendentes y hacia fuera en las descendentes. _(RGC 92.3.d)_
- ✘ `A-par-0002` Detención es la inmovilización de un vehículo por emergencia, por necesidades de la circulación o para cumplir algún precepto reglamentario, como detenerse ante un semáforo en rojo. _(LSV Anexo I.80)_
- ✘ `A-par-0001` Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. _(LSV Anexo I.81)_

## B1-sen-0001

Un agente de la autoridad le ordena detenerse en una intersección cuyo semáforo está en verde para usted. ¿Qué debe hacer?  
Respuesta: **Detenerse, porque las órdenes del agente prevalecen sobre los semáforos.**

- ✔ Las señales y órdenes de los agentes encabezan el orden de preferencia entre señales, por delante de los semáforos. _(RGC 133.1.a)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_

## B1-sen-0002

En una intersección hay un semáforo en verde para usted y, a la vez, una señal vertical de STOP. ¿A qué indicación debe obedecer?  
Respuesta: **Al semáforo en verde.**

- ✔ En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_

## B1-sen-0003

Hay una señal vertical de ceda el paso y, pintada en la calzada, una marca de STOP. ¿Qué debe hacer?  
Respuesta: **Ceder el paso, porque las señales verticales prevalecen sobre las marcas viales.**

- ✔ Las señales verticales están por delante de las marcas viales en el orden de preferencia; la más restrictiva solo prevalece si las señales son del mismo tipo. _(RGC 133.1.d-e)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0004

Si dos señales verticales de circulación parecen contradecirse entre sí, ¿cuál prevalece?  
Respuesta: **La más restrictiva.**

- ✔ Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0024` La bandera amarilla indica a los conductores y usuarios la necesidad de extremar la atención o la proximidad de un peligro. _(RGC Anexo I.1.2.c)_

## B1-sen-0005

¿Qué prevalece sobre los semáforos según el orden de preferencia entre señales?  
Respuesta: **La señalización y el balizamiento circunstancial que modifique el régimen normal de utilización de la vía.**

- ✔ El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0006

Un semáforo emite luz amarilla intermitente y en el mismo acceso hay una señal de STOP. ¿Qué debe hacer?  
Respuesta: **Detenerse, porque el amarillo intermitente no exime del cumplimiento de otras señales que obliguen a detenerse.**

- ✔ La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso, y no exime de cumplir otras señales que obliguen a detenerse, como el STOP. _(RGC Anexo I.4.2.d)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0007

Va a seguir de frente y hay señales verticales con indicaciones distintas a la derecha y a la izquierda de la calzada. ¿A cuáles debe obedecer?  
Respuesta: **A las situadas a su izquierda.**

- ✔ Si hay semáforos o señales verticales con indicaciones distintas a derecha e izquierda, quienes pretendan girar a la izquierda o seguir de frente solo deben obedecer las de su izquierda. _(RGC 132.3)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0038` La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_

## B1-sen-0008

Va a girar a la derecha y hay señales verticales con indicaciones distintas a la derecha y a la izquierda de la calzada. ¿A cuáles debe obedecer?  
Respuesta: **A las situadas inmediatamente a su derecha.**

- ✔ Los usuarios deben obedecer los semáforos y señales situados inmediatamente a su derecha (o encima de la calzada o del carril); las de la izquierda solo rigen para quienes giran a la izquierda o siguen de frente. _(RGC 132.3)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0009

Una señal de limitación de velocidad está colocada en el mismo poste que la señal con el nombre de un poblado. ¿Dónde se aplica esa limitación?  
Respuesta: **En todo el poblado, salvo en los tramos en los que otras señales indiquen una reglamentación distinta.**

- ✔ Las señales de reglamentación colocadas al lado o en la vertical de la señal con el nombre del poblado se aplican a todo el poblado, excepto donde otras señales indiquen otra reglamentación en ciertos tramos. _(RGC 145.3)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0010

¿Desde dónde rigen, como norma general, las obligaciones o prohibiciones de una señal de reglamentación?  
Respuesta: **Desde la sección transversal donde está colocada la señal, salvo que un panel complementario indique la distancia a la que empiezan a regir.**

- ✔ Rigen a partir de la sección transversal donde están colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0011

Una señal le obliga a detenerse. ¿Cuándo puede reanudar la marcha?  
Respuesta: **Cuando haya cumplido la prescripción que la señal establece.**

- ✔ Cuando una señal impone detenerse, el conductor no puede reanudar la marcha hasta haber cumplido la prescripción que la señal establece (por ejemplo, en un control o peaje). _(RGC 132.1)_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_

## B1-sen-0012

Para utilizar un carril de telepeaje (peaje dinámico), ¿qué requisito debe cumplir el vehículo?  
Respuesta: **Estar provisto del medio técnico que posibilite su uso en condiciones operativas.**

- ✔ Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0013

Las indicaciones de una señal parecen contradecir una norma general de comportamiento en la circulación. Salvo circunstancias especiales que lo justifiquen, ¿qué debe hacer?  
Respuesta: **Obedecer la señal.**

- ✔ Salvo circunstancias especiales que lo justifiquen, hay que obedecer las señales aun cuando parezcan contradecir las normas de comportamiento. _(RGC 132.2)_
- ✘ `B1-sen-0023` La bandera verde indica que, a partir del paso del vehículo que la porta, la calzada queda de nuevo abierta al tráfico. _(RGC Anexo I.1.2.b)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_

## B1-sen-0014

Un agente que regula el tráfico levanta el brazo verticalmente. ¿A quién obliga a detenerse?  
Respuesta: **A todos los usuarios de la vía que se acerquen al agente, salvo los que no puedan hacerlo en condiciones de seguridad suficiente.**

- ✔ El brazo levantado verticalmente obliga a detenerse a todos los usuarios que se acerquen al agente, salvo a los conductores que no puedan hacerlo con seguridad suficiente. _(RGC Anexo I.1.1.a)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0015

Ya ha entrado en una intersección cuando el agente que la regula levanta el brazo verticalmente. ¿Qué debe hacer?  
Respuesta: **Continuar, porque esa señal no obliga a detenerse a quienes ya han entrado en la intersección.**

- ✔ Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_

## B1-sen-0016

Un agente tiene los brazos extendidos horizontalmente. ¿Quiénes deben detenerse?  
Respuesta: **Los usuarios que se acerquen al agente desde direcciones que corten la indicada por los brazos, cualquiera que sea el sentido de su marcha.**

- ✔ Los brazos extendidos horizontalmente obligan a detenerse a quienes se acerquen desde direcciones que corten la indicada por los brazos, cualquiera que sea su sentido de marcha. _(RGC Anexo I.1.1.b)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0017

El agente, tras extender los brazos horizontalmente, los baja sin cambiar de posición ni hacer otra señal. ¿Sigue en vigor su indicación?  
Respuesta: **Sí, permanece en vigor mientras no cambie de posición o efectúe otra señal.**

- ✔ La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0033` Los captafaros horizontales luminosos emiten luz verde, naranja o roja, y el único franqueable es el verde. _(RGC Anexo I.3.1.4.1º)_

## B1-sen-0018

El agente mueve el brazo extendido alternativamente de arriba abajo. ¿Qué indica a los conductores que se acercan por el lado de ese brazo?  
Respuesta: **Que disminuyan la velocidad.**

- ✔ Esta señal obliga a disminuir la velocidad a los conductores que se acerquen por el lado del brazo que la ejecuta y perpendicularmente a él. _(RGC Anexo I.1.1.d)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_

## B1-sen-0019

Un agente balancea una luz roja o amarilla dirigiéndola hacia usted. ¿Qué significa?  
Respuesta: **Que debe detenerse.**

- ✔ El balanceo de una luz roja o amarilla obliga a detenerse a los usuarios hacia los que el agente dirija la luz. _(RGC Anexo I.1.1.c)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_

## B1-sen-0020

Un agente da un toque largo de silbato. ¿Qué ordena?  
Respuesta: **La reanudación de la marcha.**

- ✔ El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_

## B1-sen-0021

¿Qué ordena un agente mediante una serie de toques de silbato cortos y frecuentes?  
Respuesta: **La detención de los vehículos.**

- ✔ La serie de toques de silbato cortos y frecuentes ordena la detención de vehículos. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_

## B1-sen-0022

Desde un vehículo de los agentes se muestra una bandera roja. ¿Qué indica?  
Respuesta: **Que, a partir del paso de ese vehículo, la calzada queda temporalmente cerrada al tráfico, salvo para quienes vayan acompañados o escoltados por los agentes.**

- ✔ La bandera roja indica que, a partir del paso del vehículo que la porta, la calzada queda temporalmente cerrada al tráfico de todos los vehículos y usuarios, excepto los acompañados o escoltados por agentes. _(RGC Anexo I.1.2.a)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0023

Durante una prueba ciclista, desde un vehículo se muestra una bandera verde. ¿Qué indica?  
Respuesta: **Que, a partir del paso de ese vehículo, la calzada queda de nuevo abierta al tráfico.**

- ✔ La bandera verde indica que, a partir del paso del vehículo que la porta, la calzada queda de nuevo abierta al tráfico. _(RGC Anexo I.1.2.b)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0024

¿Qué indica una bandera amarilla mostrada desde un vehículo durante una marcha ciclista?  
Respuesta: **La necesidad de extremar la atención o la proximidad de un peligro.**

- ✔ La bandera amarilla indica a los conductores y usuarios la necesidad de extremar la atención o la proximidad de un peligro. _(RGC Anexo I.1.2.c)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0001` Las señales y órdenes de los agentes encabezan el orden de preferencia entre señales, por delante de los semáforos. _(RGC 133.1.a)_

## B1-sen-0025

Un vehículo policial que circula detrás de usted le hace señales con una luz roja intermitente o destellante hacia delante. ¿Qué debe hacer?  
Respuesta: **Detener el vehículo en el lado derecho, delante del vehículo policial, en un lugar donde no genere mayores riesgos o molestias.**

- ✔ Esa señal indica al conductor que le precede que debe detenerse en el lado derecho, delante del vehículo policial, en un lugar sin mayores riesgos o molestias y siguiendo las instrucciones por megafonía. _(RGC Anexo I.1.2.e)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_

## B1-sen-0026

En un tramo en obras, el personal de la obra regula el paso de vehículos con paletas como estas. ¿Está obligado a seguir sus indicaciones?  
Respuesta: **Sí, los usuarios están obligados a seguir las indicaciones del personal que regula el paso de vehículos en las obras.**

- ✔ Los usuarios de la vía están obligados a seguir las indicaciones del personal destinado a la regulación del paso de vehículos en las obras. _(RGC 139.3)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_

## B1-sen-0027

¿Puede una patrulla escolar invitar a los conductores a que detengan su marcha?  
Respuesta: **Sí, mediante las señales del catálogo oficial incorporadas a una paleta.**

- ✔ Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0023` La bandera verde indica que, a partir del paso del vehículo que la porta, la calzada queda de nuevo abierta al tráfico. _(RGC Anexo I.1.2.b)_
- ✘ `B1-sen-0003` Las señales verticales están por delante de las marcas viales en el orden de preferencia; la más restrictiva solo prevalece si las señales son del mismo tipo. _(RGC 133.1.d-e)_

## B1-sen-0028

El personal de obras que regula el paso de vehículos debe usar prendas de colores llamativos y elementos retrorreflectantes que permitan distinguirlo a una distancia mínima de...  
Respuesta: **150 metros.**

- ✔ Deben poder ser distinguidos a una distancia mínima de 150 metros. _(RGC 141.1)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_

## B1-sen-0029

Una hilera de conos delimita una zona de la calzada. ¿Qué significa?  
Respuesta: **Que está prohibido el paso a través de la línea real o imaginaria que los une.**

- ✔ Las balizas de borde provisionales, conos o dispositivos análogos prohíben el paso a través de la línea real o imaginaria que los une. _(RGC Anexo I.3.1.1.4º)_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_

## B1-sen-0030

¿Qué indica un panel direccional provisional colocado en una zona de obras?  
Respuesta: **Prohíbe el paso e informa, además, sobre el sentido de la circulación.**

- ✔ El panel direccional provisional prohíbe el paso e informa sobre el sentido de la circulación. _(RGC Anexo I.3.1.1.3º)_
- ✘ `B1-sen-0019` El balanceo de una luz roja o amarilla obliga a detenerse a los usuarios hacia los que el agente dirija la luz. _(RGC Anexo I.1.1.c)_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_

## B1-sen-0031

¿Cuál es la finalidad de los paneles direccionales permanentes colocados en el exterior de una curva?  
Respuesta: **Marcar el trazado de la curva en relación con la reducción de velocidad necesaria y señalar el sentido de circulación.**

- ✔ Los paneles direccionales permanentes marcan el trazado de una curva en relación con la reducción de velocidad necesaria para circular por ella con seguridad, además de indicar el sentido de circulación. _(RGC Anexo I.3.1.2.3º)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0032

En el balizamiento de la vía, ¿qué indica una luz roja fija?  
Respuesta: **Que la calzada está totalmente cerrada al tránsito.**

- ✔ Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0033

Unos captafaros horizontales luminosos colocados sobre la calzada separan dos carriles. ¿De qué color tienen que estar para poder franquearlos?  
Respuesta: **Verde.**

- ✔ Los captafaros horizontales luminosos emiten luz verde, naranja o roja, y el único franqueable es el verde. _(RGC Anexo I.3.1.4.1º)_
- ✘ `B1-sen-0021` La serie de toques de silbato cortos y frecuentes ordena la detención de vehículos. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0034

¿Hasta cuándo rigen las modificaciones que la señalización circunstancial introduce respecto de la señalización vertical y horizontal habitual?  
Respuesta: **Hasta que lo establezca la propia señalización o cesen las causas que motivaron su imposición.**

- ✔ Las modificaciones terminan cuando lo establezca la propia señalización o las causas que las motivaron; a partir de ese momento vuelve a regir la señalización habitual. _(RGC 142.1)_
- ✘ `B1-sen-0032` Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0035

Llega a un paso a nivel cuya barrera se está levantando, pero todavía está en movimiento. ¿Qué debe hacer?  
Respuesta: **No penetrar en el paso a nivel mientras la barrera esté en movimiento.**

- ✔ Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_

## B1-sen-0036

Se enciende la luz amarilla fija de un semáforo cuando usted está tan cerca que no podría detenerse antes del semáforo con seguridad suficiente. ¿Qué debe hacer?  
Respuesta: **Continuar la marcha.**

- ✔ La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0037

¿Qué significa una luz amarilla fija (no intermitente) en un semáforo circular para vehículos?  
Respuesta: **Que hay que detenerse en las mismas condiciones que ante la luz roja fija, salvo que no se pueda hacer con seguridad suficiente.**

- ✔ La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_

## B1-sen-0038

En un semáforo para peatones, la luz verde en forma de peatón pasa a ser intermitente. ¿Qué indica?  
Respuesta: **Que el tiempo para terminar de atravesar la calzada está a punto de finalizar y se va a encender la luz roja.**

- ✔ La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0039

¿Qué indica a los peatones una luz roja no intermitente en forma de peatón inmóvil?  
Respuesta: **Que no deben comenzar a cruzar la calzada.**

- ✔ La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_
- ✘ `B1-sen-0021` La serie de toques de silbato cortos y frecuentes ordena la detención de vehículos. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_

## B1-sen-0040

Un semáforo muestra luces con la silueta iluminada de un ciclo. ¿A quién se refieren sus indicaciones?  
Respuesta: **Exclusivamente a los ciclos.**

- ✔ Cuando las luces del semáforo presentan la silueta iluminada de un ciclo, sus indicaciones se refieren exclusivamente a ellos. _(RGC Anexo I.4.4.1)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_

## B1-sen-0041

Un semáforo consistente en una franja blanca iluminada sobre fondo circular negro, sin que exista carril reservado, ¿a qué vehículos se refiere?  
Respuesta: **A los tranvías y autobuses de líneas regulares.**

- ✔ Este semáforo se refiere exclusivamente a tranvías y autobuses de líneas regulares, salvo que exista un carril reservado, en cuyo caso solo se refiere a los que circulen por él. _(RGC Anexo I.4.4.2)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0042

En un semáforo para tranvías y autobuses, ¿qué significa una franja blanca horizontal iluminada?  
Respuesta: **Que prohíbe el paso en las mismas condiciones que la luz roja no intermitente.**

- ✔ La franja blanca horizontal iluminada prohíbe el paso en las mismas condiciones que la luz roja no intermitente. _(RGC Anexo I.4.4.2.a)_
- ✘ `B1-sen-0023` La bandera verde indica que, a partir del paso del vehículo que la porta, la calzada queda de nuevo abierta al tráfico. _(RGC Anexo I.1.2.b)_
- ✘ `B1-sen-0032` Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_

## B1-sen-0043

En un semáforo para tranvías y autobuses, la franja blanca vertical se ilumina de forma intermitente. ¿Qué indica?  
Respuesta: **Que deben detenerse en las mismas condiciones que ante una luz amarilla fija.**

- ✔ La franja blanca, vertical u oblicua, iluminada intermitentemente indica que deben detenerse en las mismas condiciones que ante una luz amarilla fija. _(RGC Anexo I.4.4.2.d)_
- ✘ `B1-sen-0032` Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_

## B1-sen-0044

¿Qué significan dos luces rojas alternativamente intermitentes antes de un paso a nivel?  
Respuesta: **Que el paso está prohibido temporalmente.**

- ✔ Una luz roja intermitente o dos luces rojas alternativamente intermitentes prohíben temporalmente el paso antes de un paso a nivel, un puente móvil, un pontón transbordador, una salida de vehículos de extinción de incendios o ante la aproximación de una aeronave a escasa altura. _(RGC Anexo I.4.2.b)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_

## B1-sen-0045

Además de en los pasos a nivel, ¿dónde puede encontrar dos luces rojas alternativamente intermitentes que prohíben temporalmente el paso?  
Respuesta: **En las proximidades de una salida de vehículos de extinción de incendios.**

- ✔ Estas luces se usan antes de un paso a nivel, de un puente móvil o pontón transbordador, cerca de una salida de vehículos de extinción de incendios o ante la aproximación de una aeronave a escasa altura. _(RGC Anexo I.4.2.b)_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_

## B1-sen-0046

¿Qué obliga a hacer una luz amarilla intermitente en un semáforo circular para vehículos?  
Respuesta: **A extremar la precaución y, en su caso, ceder el paso.**

- ✔ La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0024` La bandera amarilla indica a los conductores y usuarios la necesidad de extremar la atención o la proximidad de un peligro. _(RGC Anexo I.1.2.c)_

## B1-sen-0047

Un semáforo circular muestra una flecha negra sobre la luz amarilla encendida. ¿Qué significa?  
Respuesta: **Que el significado de la luz amarilla se limita exclusivamente al movimiento indicado por la flecha.**

- ✔ Una flecha negra sobre una luz roja o amarilla no cambia su significado, pero lo limita exclusivamente al movimiento indicado por la flecha. _(RGC Anexo I.4.2.f)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0048

El semáforo tiene la luz roja circular encendida y, a la vez, una flecha verde iluminada hacia la derecha. ¿Puede girar a la derecha?  
Respuesta: **Sí, pero con precaución, dejando pasar a los vehículos que circulen por el carril al que se incorpora y sin poner en peligro a quien esté cruzando la calzada.**

- ✔ La flecha verde permite tomar la dirección indicada cualquiera que sea la otra luz encendida, pero con precaución, dejando pasar a quienes circulan por el carril al que se incorpora y sin poner en peligro a quien cruza. _(RGC Anexo I.4.2.g)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0049

Está detenido ante un semáforo en rojo, en un carril reservado exclusivamente para girar a la derecha, aunque usted quería seguir de frente. Se enciende la flecha verde de giro a la derecha. ¿Qué debe hacer?  
Respuesta: **Avanzar en la dirección y sentido indicados por la flecha.**

- ✔ Cualquier vehículo que, al encenderse la flecha verde, se encuentre en un carril reservado exclusivamente para la dirección indicada por ella deberá avanzar en esa dirección y sentido. _(RGC Anexo I.4.2.g)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0050

Un semáforo de carril (cuadrado) sobre su carril muestra un aspa roja. ¿Qué significa?  
Respuesta: **Prohibición de ocupar ese carril; si circula por él, debe abandonarlo en el tiempo más breve posible.**

- ✔ La luz roja en forma de aspa prohíbe ocupar el carril y quienes circulen por él deben abandonarlo en el tiempo más breve posible. _(RGC Anexo I.4.3.a)_
- ✘ `B1-sen-0033` Los captafaros horizontales luminosos emiten luz verde, naranja o roja, y el único franqueable es el verde. _(RGC Anexo I.3.1.4.1º)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_

## B1-sen-0051

Circula por un carril con un semáforo de carril que muestra una flecha verde apuntando hacia abajo. Más adelante, un semáforo circular está en rojo. ¿Qué debe hacer?  
Respuesta: **Detenerse ante el semáforo circular en rojo.**

- ✔ La flecha verde de carril solo autoriza a circular por ese carril y no exime de detenerse ante una luz roja circular ni de obedecer otras señales que obliguen a detenerse o ceder el paso. _(RGC Anexo I.4.3.b)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_

## B1-sen-0052

Un semáforo de carril muestra una flecha amarilla o blanca oblicua apuntando hacia abajo. ¿Qué indica?  
Respuesta: **Que debe irse incorporando con seguridad al carril hacia el que apunta la flecha, porque el suyo va a quedar cerrado en corto espacio.**

- ✔ Indica la necesidad de irse incorporando con seguridad al carril hacia el que apunta la flecha, ya que el carril por el que se circula va a quedar cerrado en corto espacio. _(RGC Anexo I.4.3.c)_
- ✘ `B1-sen-0024` La bandera amarilla indica a los conductores y usuarios la necesidad de extremar la atención o la proximidad de un peligro. _(RGC Anexo I.1.2.c)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_

## B1-sen-0054

¿Qué objeto tienen las señales de advertencia de peligro?  
Respuesta: **Indicar la proximidad y naturaleza de un peligro difícil de ser percibido a tiempo.**

- ✔ Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0055

Las señales que indican a los usuarios las obligaciones, limitaciones o prohibiciones especiales que deben observar son las señales de...  
Respuesta: **Reglamentación.**

- ✔ Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0056

Bajo una señal de advertencia de peligro hay un panel complementario con una cifra en metros. ¿Qué puede indicar?  
Respuesta: **La distancia entre la señal y el principio del tramo peligroso.**

- ✔ Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0057

En un tramo con obras encuentra una señal de peligro con fondo amarillo en lugar de blanco. ¿Por qué tiene ese color?  
Respuesta: **Porque en los tramos con obras o tareas de conservación las señales de peligro que normalmente tienen fondo blanco llevan fondo amarillo.**

- ✔ En tramos con obras o tareas de conservación, las señales de peligro y de reglamentación cuyo fondo convencional es blanco tienen fondo amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.5))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0058

Cuando la señalización circunstancial se debe a causas distintas de las obras (por ejemplo, un accidente), ¿de qué color es el fondo de las señales que en su versión convencional lo tienen blanco?  
Respuesta: **Naranja.**

- ✔ Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_

## B1-pri-0059

Se aproxima a una intersección señalizada con la señal de advertencia de 'intersección con prioridad'. ¿Quién tiene prioridad de paso?  
Respuesta: **Usted, sobre los vehículos que circulen por la otra vía o procedan de ella.**

- ✔ Los conductores que se aproximen a una intersección señalizada con señal de intersección con prioridad tienen prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella. _(RGC 56.4)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `A-cic-0003` Los conductores de bicicletas tienen prioridad de paso cuando circulan por un carril bici, paso para ciclistas o arcén debidamente señalizados. _(RGC 64.2.a)_

## B1-pri-0060

Circula por una vía señalizada con la señal de 'calzada con prioridad'. ¿Qué significa?  
Respuesta: **Que tiene prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella.**

- ✔ Quienes circulen por una vía señalizada con señal de calzada con prioridad tienen prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella. _(RGC 56.4)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `A-pri-0008` Quien va a girar debe cerciorarse de que la velocidad y la distancia de los vehículos que se acercan en sentido contrario le permiten hacer la maniobra sin peligro y, si no es así, abstenerse. _(RGC 74.1)_

## B1-pri-0061

Llega a una intersección con señal de ceda el paso. ¿A quién debe ceder el paso?  
Respuesta: **A los vehículos que transiten por la vía preferente, cualquiera que sea el lado por el que se aproximen.**

- ✔ Ante ceda el paso o STOP se cede siempre el paso a los vehículos de la vía preferente, cualquiera que sea el lado por el que se aproximen. _(RGC 56.5)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `B1-pri-0066` En defecto de señal que regule la preferencia de paso, el conductor debe cederlo a los vehículos que se aproximen por su derecha, salvo las excepciones previstas. _(RGC 57.1)_

## B1-pri-0062

Ante una señal de ceda el paso, si no se aproxima ningún vehículo por la vía preferente, ¿está obligado a detenerse?  
Respuesta: **No; solo debe detenerse cuando sea preciso para ceder el paso.**

- ✔ Ante ceda el paso hay que detener la marcha cuando sea preciso; la detención en todo caso solo es obligatoria cuando así lo indique la señal (STOP). _(RGC 56.5)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `A-pri-0004` En las glorietas, los que se hallan dentro de la vía circular tienen preferencia sobre los que pretenden acceder a ella. _(RGC 57.1.c)_

## B1-pri-0063

Llega a una intersección con señal de STOP y no se aproxima ningún vehículo. ¿Qué debe hacer?  
Respuesta: **Detenerse por completo igualmente.**

- ✔ La señal de detención obligatoria o STOP obliga a detener por completo la marcha en todo caso, venga o no algún vehículo, y después ceder el paso. _(RGC 56.5)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `A-est-0007` Los camiones, tractocamiones y furgones tienen preferencia sobre los turismos y vehículos derivados de turismos. _(RGC 62.1.f y g)_

## B1-pri-0064

Ante una señal de STOP, ¿dónde debe detener el vehículo si no hay línea de detención?  
Respuesta: **Inmediatamente antes de la calzada a la que se aproxima.**

- ✔ La obligación de detención es ante la línea de detención o, si no existe, inmediatamente antes de la calzada a la que se aproxima; después hay que ceder el paso. _(RGC Anexo I.5.2 (marcas viales, 4.4, M-6.3))_
- ✘ `A-cic-0001` Los ciclistas que circulan en grupo tienen prioridad cuando el primero ha iniciado ya el cruce o ha entrado en una glorieta; el grupo se trata como una unidad. _(RGC 64.2.c)_
- ✘ `A-pri-0009` Quien sale a una vía pública por un camino exclusivamente privado debe ceder el paso a los vehículos que circulen por ella, sea cual sea su sentido. _(RGC 72.2)_

## B1-pri-0065

Se ha detenido en la línea de detención de un STOP, pero desde ese lugar no tiene visibilidad suficiente. ¿Qué debe hacer?  
Respuesta: **Detenerse de nuevo en el lugar desde donde tenga visibilidad, sin poner en peligro a nadie.**

- ✔ Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_
- ✘ `A-est-0008` En los tramos estrechos de gran pendiente, tiene preferencia el vehículo que sube, salvo si este puede llegar antes a un apartadero establecido al efecto. _(RGC 63.1)_
- ✘ `A-pea-0004` Los peatones tienen prioridad de paso en los pasos para peatones señalizados, en las aceras y en las demás zonas peatonales. _(RGC 65.1.a)_

## B1-pri-0066

Llega a una intersección donde no hay ninguna señal que regule la preferencia de paso (ni semáforo, ni agente, ni ceda el paso, ni STOP). Como norma general, ¿a quién debe ceder el paso?  
Respuesta: **A los vehículos que se aproximen por su derecha.**

- ✔ En defecto de señal que regule la preferencia de paso, el conductor debe cederlo a los vehículos que se aproximen por su derecha, salvo las excepciones previstas. _(RGC 57.1)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_
- ✘ `A-cic-0001` Los ciclistas que circulan en grupo tienen prioridad cuando el primero ha iniciado ya el cruce o ha entrado en una glorieta; el grupo se trata como una unidad. _(RGC 64.2.c)_

## B1-pri-0067

En un paso a nivel, ¿quién tiene prioridad de paso?  
Respuesta: **Los vehículos que circulan por raíles.**

- ✔ Los vehículos que circulan por raíles tienen derecho de prioridad de paso sobre los demás usuarios. _(RGC 57.1.b)_
- ✘ `A-pea-0001` Los peatones tienen prioridad cuando un vehículo va a girar para entrar en otra vía y hay peatones cruzándola, aunque no exista paso para ellos. _(RGC 65.1.b)_
- ✘ `A-pri-0009` Quien sale a una vía pública por un camino exclusivamente privado debe ceder el paso a los vehículos que circulen por ella, sea cual sea su sentido. _(RGC 72.2)_

## B1-pri-0068

¿Qué indica la marca vial de paso a nivel (M-7.5) pintada en la calzada?  
Respuesta: **La proximidad de un paso a nivel en el que los vehículos de la calzada deben ceder el paso cuando se aproxime un tren o tranvía.**

- ✔ La marca M-7.5 indica la proximidad de un paso a nivel por una vía de ferrocarril o tranvía, en el que los vehículos de la calzada deben ceder el paso cuando se aproxime un tren o tranvía. _(RGC Anexo I.5.2 (marcas viales, M-7.5))_
- ✘ `B1-pri-0067` Los vehículos que circulan por raíles tienen derecho de prioridad de paso sobre los demás usuarios. _(RGC 57.1.b)_
- ✘ `A-est-0008` En los tramos estrechos de gran pendiente, tiene preferencia el vehículo que sube, salvo si este puede llegar antes a un apartadero establecido al efecto. _(RGC 63.1)_

## B1-pri-0069

Ve la señal de peligro 'paso de animales domésticos' con un panel complementario que dice 'cañada'. Si hay ganado cruzando, ¿quién tiene prioridad?  
Respuesta: **Los animales, porque se trata de una cañada debidamente señalizada.**

- ✔ Los conductores tienen prioridad sobre los animales salvo, entre otros casos, en las cañadas debidamente señalizadas, que se indican con el panel 'cañada' bajo la señal de paso de animales domésticos. _(RGC 66.2)_
- ✘ `A-urg-0003` Al percibir las señales de un vehículo prioritario, los demás conductores deben facilitarle el paso según las circunstancias, apartándose normalmente a la derecha o deteniéndose si fuera preciso. _(RGC 69)_
- ✘ `B1-pri-0065` Si desde el lugar de detención no hay visibilidad suficiente, el conductor debe detenerse de nuevo donde tenga visibilidad, sin poner en peligro a ningún usuario. _(RGC Anexo I.5.2 (marcas viales, 4.2, M-4.1))_

## B1-pri-0070

Encuentra la señal de peligro 'paso de animales domésticos' sin ningún panel complementario. Como norma general, ¿quién tiene prioridad de paso?  
Respuesta: **Los conductores, salvo en los supuestos que establece el Reglamento (cañadas señalizadas, giros con animales cruzando, cruce de arcén por el que circulan animales sin cañada).**

- ✔ Los conductores tienen prioridad de paso respecto de los animales, salvo en las cañadas debidamente señalizadas y en los demás supuestos del art. 66.1; la señal sola solo advierte del peligro. _(RGC 66.1)_
- ✘ `A-est-0006` En el orden de preferencia, los vehículos de tracción animal van por delante de los turismos que arrastran remolques de hasta 750 kg de MMA. _(RGC 62.1.c y d)_
- ✘ `A-pri-0008` Quien va a girar debe cerciorarse de que la velocidad y la distancia de los vehículos que se acercan en sentido contrario le permiten hacer la maniobra sin peligro y, si no es así, abstenerse. _(RGC 74.1)_

## B1-pri-0071

Circula por una autopista y, por la derecha, otros vehículos se incorporan desde el carril de aceleración. ¿Qué debe hacer?  
Respuesta: **Facilitar la maniobra en la medida de lo posible, aunque usted tenga preferencia.**

- ✔ Los vehículos que circulan por la autopista tienen preferencia, pero los demás conductores deben facilitar, en la medida de lo posible, la incorporación. _(RGC 73.1)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_
- ✘ `A-pri-0007` Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_

## B1-pri-0072

Ha entrado en un puente estrecho, donde no pueden cruzarse dos vehículos, por el extremo en el que hay colocada una señal de prioridad en sentido contrario. Si se encuentra con otro vehículo dentro del puente, ¿quién debe retroceder?  
Respuesta: **El que haya llegado por el extremo donde está la señal de prioridad en sentido contrario, es decir, usted.**

- ✔ En caso de encuentro en puentes u obras de paso con señal de prioridad en sentido contrario o de ceda el paso en uno de sus extremos, el que llegue por ese extremo debe retroceder. _(RGC 61.2)_
- ✘ `A-est-0004` En el orden de preferencia, los vehículos destinados al transporte colectivo de viajeros van por delante de los camiones, tractocamiones y furgones. _(RGC 62.1.e y f)_
- ✘ `A-est-0001` En los tramos donde por su estrechez es imposible o muy difícil el paso simultáneo y no hay señalización, tiene preferencia el que hubiese entrado primero. _(RGC 60.1)_

## B1-sen-0073

Una prohibición de entrada se refiere a los 'vehículos de motor'. ¿Afecta a los ciclomotores?  
Respuesta: **No, porque los ciclomotores están excluidos de la definición de vehículo de motor.**

- ✔ La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_

## B1-sen-0074

¿Qué indica esta señal?  
Respuesta: **La proximidad de una incorporación por la derecha de una vía cuyos usuarios deben ceder el paso.**

- ✔ La P-1c advierte de la proximidad de una incorporación por la derecha de una vía cuyos usuarios deben ceder el paso: usted tiene prioridad. _(RGC_CATALOGO Anexo I, catálogo de señales, P-1c (pág. 89 del PDF consolidado))_
- ✘ `B1-sen-0033` Los captafaros horizontales luminosos emiten luz verde, naranja o roja, y el único franqueable es el verde. _(RGC Anexo I.3.1.4.1º)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_

## B1-sen-0075

Esta señal advierte de una intersección. ¿Qué prioridad rige en ella?  
Respuesta: **La regla general de prioridad de paso: la de los vehículos que vienen por la derecha.**

- ✔ La P-2 («Intersección con prioridad de la derecha») advierte de una intersección en la que rige la regla general de prioridad de paso: ceder el paso a los que se aproximan por la derecha (art. 57.1 RGC). _(RGC_CATALOGO Anexo I, catálogo de señales, P-2 (pág. 89 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_

## B1-sen-0076

¿Qué indica esta señal?  
Respuesta: **La proximidad de una glorieta con circulación en el sentido indicado por las flechas.**

- ✔ La P-4 («Glorieta») advierte de la proximidad de una glorieta con circulación en el sentido indicado por las flechas. _(RGC_CATALOGO Anexo I, catálogo de señales, P-4 (pág. 90 del PDF consolidado))_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0077

¿Qué indica esta señal?  
Respuesta: **La proximidad de un cruce con una línea de tranvía, que tiene prioridad de paso.**

- ✔ La P-6 («Cruce de tranvía») advierte de la proximidad de un cruce con una línea de tranvía, que tiene prioridad de paso. _(RGC_CATALOGO Anexo I, catálogo de señales, P-6 (pág. 90 del PDF consolidado))_
- ✘ `B1-sen-0038` La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0078

¿Qué indica esta señal con el dibujo de una valla?  
Respuesta: **La proximidad de un paso a nivel provisto de barreras o semibarreras.**

- ✔ La P-7 («Paso a nivel con barreras») advierte de la proximidad de un paso a nivel provisto de barreras o semibarreras. _(RGC_CATALOGO Anexo I, catálogo de señales, P-7 (pág. 90 del PDF consolidado))_
- ✘ `B1-sen-0032` Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_

## B1-sen-0079

¿Qué indica esta señal con el dibujo de un tren visto de frente?  
Respuesta: **La proximidad de un paso a nivel no provisto de barreras o semibarreras.**

- ✔ La P-8 («Paso a nivel sin barreras») advierte de la proximidad de un paso a nivel no provisto de barreras o semibarreras. _(RGC_CATALOGO Anexo I, catálogo de señales, P-8 (pág. 90 del PDF consolidado))_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_

## B1-sen-0080

¿Qué indica esta señal con forma de aspa (cruz de San Andrés) de borde rojo?  
Respuesta: **La presencia inmediata de un paso a nivel sin barreras.**

- ✔ La P-11 («Situación de un paso a nivel sin barreras») advierte de la presencia inmediata de un paso a nivel sin barreras. _(RGC_CATALOGO Anexo I, catálogo de señales, P-11 (pág. 91 del PDF consolidado))_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0081

¿Qué indica esta señal formada por un aspa doble?  
Respuesta: **La presencia inmediata de un paso a nivel sin barreras con más de una vía férrea.**

- ✔ La P-11a advierte de la presencia inmediata de un paso a nivel sin barreras con más de una vía férrea. _(RGC_CATALOGO Anexo I, catálogo de señales, P-11a (pág. 92 del PDF consolidado))_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_

## B1-sen-0082

¿De qué advierte esta señal con la silueta de un avión?  
Respuesta: **De un lugar donde frecuentemente vuelan aeronaves a baja altura sobre la vía, que pueden originar ruidos imprevistos.**

- ✔ La P-12 («Aeropuerto») advierte de la proximidad de un lugar donde frecuentemente vuelan aeronaves a baja altura sobre la vía y que pueden originar ruidos imprevistos. _(RGC_CATALOGO Anexo I, catálogo de señales, P-12 (pág. 92 del PDF consolidado))_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_

## B1-sen-0083

¿Qué anuncia esta señal de peligro?  
Respuesta: **Un resalte en la vía.**

- ✔ La P-15a («Resalte») advierte de la proximidad de un resalte en la vía; el badén es la P-15b y la subida con fuerte pendiente, la P-16b. _(RGC_CATALOGO Anexo I, catálogo de señales, P-15a (pág. 93 del PDF consolidado))_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_

## B1-sen-0084

¿Qué anuncia esta señal de peligro?  
Respuesta: **Un badén en la vía.**

- ✔ La P-15b («Badén») advierte de la proximidad de un badén en la vía; el resalte es la P-15a y el escalón lateral, la P-30. _(RGC_CATALOGO Anexo I, catálogo de señales, P-15b (pág. 93 del PDF consolidado))_
- ✘ `B1-sen-0003` Las señales verticales están por delante de las marcas viales en el orden de preferencia; la más restrictiva solo prevalece si las señales son del mismo tipo. _(RGC 133.1.d-e)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0085

¿Qué indica esta señal?  
Respuesta: **Que la calzada se estrecha por el lado de la derecha.**

- ✔ La P-17a advierte de la proximidad de una zona de la vía en la que la calzada se estrecha por el lado de la derecha (por la izquierda es la P-17b). _(RGC_CATALOGO Anexo I, catálogo de señales, P-17a (pág. 93 del PDF consolidado))_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0086

¿Qué indica esta señal con un vehículo derrapando?  
Respuesta: **La proximidad de una zona de la calzada cuyo pavimento puede resultar deslizante.**

- ✔ La P-19 («Pavimento deslizante») advierte de una zona de la calzada cuyo pavimento puede resultar deslizante, sin limitarse a una causa; la de hielo o nieve es la P-34. _(RGC_CATALOGO Anexo I, catálogo de señales, P-19 (pág. 94 del PDF consolidado))_
- ✘ `B1-sen-0001` Las señales y órdenes de los agentes encabezan el orden de preferencia entre señales, por delante de los semáforos. _(RGC 133.1.a)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_

## B1-sen-0087

¿De qué advierte esta señal?  
Respuesta: **De la proximidad de un lugar frecuentado por niños, como una escuela o una zona de juegos.**

- ✔ La P-21a («Niños») advierte de la proximidad de un lugar frecuentado por niños, como una escuela, una zona de juegos, etc. _(RGC_CATALOGO Anexo I, catálogo de señales, P-21a (pág. 95 del PDF consolidado))_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `B1-sen-0043` La franja blanca, vertical u oblicua, iluminada intermitentemente indica que deben detenerse en las mismas condiciones que ante una luz amarilla fija. _(RGC Anexo I.4.4.2.d)_

## B1-sen-0088

¿De qué advierte esta señal con un ciervo?  
Respuesta: **De un lugar donde frecuentemente la vía puede ser atravesada por animales en libertad.**

- ✔ La P-24 («Paso de animales en libertad») advierte de la proximidad de un lugar donde frecuentemente la vía puede ser atravesada por animales en libertad. _(RGC_CATALOGO Anexo I, catálogo de señales, P-24 (pág. 95 del PDF consolidado))_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0023` La bandera verde indica que, a partir del paso del vehículo que la porta, la calzada queda de nuevo abierta al tráfico. _(RGC Anexo I.1.2.b)_

## B1-sen-0089

¿Qué indica esta señal con dos flechas de sentidos opuestos?  
Respuesta: **La proximidad de un tramo con circulación en ambos sentidos.**

- ✔ La P-25 («Circulación en los dos sentidos») advierte de la proximidad de un tramo con circulación en ambos sentidos. _(RGC_CATALOGO Anexo I, catálogo de señales, P-25 (pág. 96 del PDF consolidado))_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_

## B1-sen-0090

¿De qué advierte esta señal?  
Respuesta: **De una zona con desprendimientos frecuentes y la consiguiente posible presencia de obstáculos en la calzada.**

- ✔ La P-26 («Desprendimiento») advierte de la proximidad a una zona con desprendimientos frecuentes y la consiguiente posible presencia de obstáculos en la calzada. _(RGC_CATALOGO Anexo I, catálogo de señales, P-26 (pág. 96 del PDF consolidado))_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0091

¿De qué advierte esta señal con un vehículo cayendo al agua?  
Respuesta: **De que la vía desemboca en un muelle o en una corriente de agua.**

- ✔ La P-27 («Muelle») advierte de que la vía desemboca en un muelle o en una corriente de agua; el puente móvil es la P-5. _(RGC_CATALOGO Anexo I, catálogo de señales, P-27 (pág. 96 del PDF consolidado))_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_

## B1-sen-0092

¿De qué advierte esta señal?  
Respuesta: **Del riesgo de que se proyecte gravilla al pasar los vehículos.**

- ✔ La P-28 («Proyección de gravilla») advierte de un tramo de vía donde existe el riesgo de que se proyecte gravilla al pasar los vehículos; los desprendimientos son la P-26. _(RGC_CATALOGO Anexo I, catálogo de señales, P-28 (pág. 96 del PDF consolidado))_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_

## B1-sen-0093

¿Qué elemento complementa la advertencia de la señal P-29 (viento lateral), informando sobre la existencia, sentido e intensidad del viento?  
Respuesta: **Una manga de viento.**

- ✔ La manga de viento complementa la señal P-29 informando de la existencia, sentido e intensidad de un viento continuo o racheado. _(RGC Anexo I.3.1.3.1º)_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_

## B1-sen-0094

¿De qué advierte esta señal?  
Respuesta: **De un desnivel a lo largo de la vía en el lado que indique el símbolo (escalón lateral).**

- ✔ La P-30 («Escalón lateral») advierte de la existencia de un desnivel a lo largo de la vía en el lado que indique el símbolo; el resalte es la P-15a. _(RGC_CATALOGO Anexo I, catálogo de señales, P-30 (pág. 96 del PDF consolidado))_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_

## B1-sen-0095

¿De qué advierte esta señal?  
Respuesta: **De un tramo en el que frecuentemente la circulación se encuentra detenida o dificultada por congestión del tráfico.**

- ✔ La P-31 («Congestión») advierte de un tramo en el que frecuentemente la circulación se encuentra detenida o dificultada por congestión del tráfico. _(RGC_CATALOGO Anexo I, catálogo de señales, P-31 (pág. 96 del PDF consolidado))_
- ✘ `B1-sen-0019` El balanceo de una luz roja o amarilla obliga a detenerse a los usuarios hacia los que el agente dirija la luz. _(RGC Anexo I.1.1.c)_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_

## B1-sen-0096

¿De qué advierte esta señal?  
Respuesta: **De un lugar en que hay vehículos que obstruyen la calzada debido a avería, accidente u otras causas.**

- ✔ La P-32 («Obstrucción en la calzada») advierte de la proximidad de un lugar en que hay vehículos que obstruyen la calzada debido a avería, accidente u otras causas. _(RGC_CATALOGO Anexo I, catálogo de señales, P-32 (pág. 97 del PDF consolidado))_
- ✘ `B1-sen-0032` Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_
- ✘ `B1-sen-0043` La franja blanca, vertical u oblicua, iluminada intermitentemente indica que deben detenerse en las mismas condiciones que ante una luz amarilla fija. _(RGC Anexo I.4.4.2.d)_

## B1-sen-0097

¿De qué advierte esta señal?  
Respuesta: **De un tramo en el que frecuentemente hay una pérdida notable de visibilidad debida a niebla, lluvia, nieve, humos, etc.**

- ✔ La P-33 («Visibilidad reducida») advierte de un tramo en el que frecuentemente la circulación se ve dificultada por una pérdida notable de visibilidad debida a niebla, lluvia, nieve, humos, etc. _(RGC_CATALOGO Anexo I, catálogo de señales, P-33 (pág. 97 del PDF consolidado))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_

## B1-sen-0098

¿De qué advierte esta señal con un copo de nieve?  
Respuesta: **De un tramo en el que frecuentemente, durante la época invernal, hay presencia de hielo o nieve.**

- ✔ La P-34 («Presencia de hielo o nieve») advierte de un tramo en el que frecuentemente, durante la época invernal, hay hielo o nieve; la obligación de cadenas es una señal de obligación distinta (R-412). _(RGC_CATALOGO Anexo I, catálogo de señales, P-34 (pág. 97 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_

## B1-sen-0099

¿Qué significa esta señal con un signo de admiración?  
Respuesta: **La proximidad de un peligro distinto de los advertidos por otras señales.**

- ✔ La P-50 («Otros peligros») indica la proximidad de un peligro distinto de los advertidos por otras señales. _(RGC_CATALOGO Anexo I, catálogo de señales, P-50 (pág. 97 del PDF consolidado))_
- ✘ `B1-sen-0021` La serie de toques de silbato cortos y frecuentes ordena la detención de vehículos. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_

## B1-sen-0100

¿Qué indica esta señal (rombo blanco con el centro amarillo cruzado por una franja negra)?  
Respuesta: **La proximidad del lugar en que la calzada por la que circula pierde su prioridad respecto a otra calzada.**

- ✔ La R-4 («Fin de prioridad») indica la proximidad del lugar en que la calzada por la que se circula pierde su prioridad respecto a otra calzada; la de calzada con prioridad es la R-3. _(RGC_CATALOGO Anexo I, catálogo de señales, R-4 (pág. 99 del PDF consolidado))_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_

## B1-sen-0101

Ante un paso estrecho encuentra esta señal (flecha roja y flecha negra). ¿Qué indica?  
Respuesta: **Que no puede entrar en el paso estrecho mientras no sea posible atravesarlo sin obligar a detenerse a los que vienen en sentido contrario.**

- ✔ La R-5 («Prioridad del sentido contrario») prohíbe entrar en un paso estrecho mientras no sea posible atravesarlo sin obligar a los vehículos que circulen en sentido contrario a detenerse. _(RGC_CATALOGO Anexo I, catálogo de señales, R-5 (pág. 99 del PDF consolidado))_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0043` La franja blanca, vertical u oblicua, iluminada intermitentemente indica que deben detenerse en las mismas condiciones que ante una luz amarilla fija. _(RGC Anexo I.4.4.2.d)_

## B1-sen-0102

Ante un paso estrecho encuentra esta señal cuadrada azul. ¿Qué indica?  
Respuesta: **Que en el próximo paso estrecho tiene prioridad con relación a los vehículos que circulen en sentido contrario.**

- ✔ La R-6 («Prioridad respecto al sentido contrario») indica que, en un próximo paso estrecho, usted tiene prioridad con relación a los vehículos que circulen en sentido contrario. _(RGC_CATALOGO Anexo I, catálogo de señales, R-6 (pág. 100 del PDF consolidado))_
- ✘ `B1-sen-0043` La franja blanca, vertical u oblicua, iluminada intermitentemente indica que deben detenerse en las mismas condiciones que ante una luz amarilla fija. _(RGC Anexo I.4.4.2.d)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0103

¿Qué indica esta señal (círculo blanco con orla roja, sin símbolo)?  
Respuesta: **Prohibición de circulación de toda clase de vehículos en ambos sentidos.**

- ✔ La R-100 («Circulación prohibida») prohíbe la circulación de toda clase de vehículos en ambos sentidos. _(RGC_CATALOGO Anexo I, catálogo de señales, R-100 (pág. 102 del PDF consolidado))_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_
- ✘ `B1-sen-0043` La franja blanca, vertical u oblicua, iluminada intermitentemente indica que deben detenerse en las mismas condiciones que ante una luz amarilla fija. _(RGC Anexo I.4.4.2.d)_

## B1-sen-0104

¿Qué indica esta señal (círculo rojo con una franja horizontal blanca)?  
Respuesta: **Prohibición de acceso a toda clase de vehículos.**

- ✔ La R-101 («Entrada prohibida») prohíbe el acceso a toda clase de vehículos. La prohibición de circular en ambos sentidos es la R-100 y la de acceso a vehículos de motor, la R-102. _(RGC_CATALOGO Anexo I, catálogo de señales, R-101 (pág. 102 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_

## B1-sen-0105

¿A quién prohíbe el acceso esta señal?  
Respuesta: **A los vehículos de motor.**

- ✔ La R-102 («Entrada prohibida a vehículos de motor») prohíbe el acceso a vehículos de motor, no solo a los turismos y motocicletas del dibujo. La prohibición de acceso a toda clase de vehículos es la R-101. _(RGC_CATALOGO Anexo I, catálogo de señales, R-102 (pág. 102 del PDF consolidado))_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_

## B1-sen-0106

¿Puede entrar con una motocicleta de dos ruedas ante esta señal?  
Respuesta: **Sí: prohíbe el acceso a vehículos de motor, pero no a motocicletas de dos ruedas ni a vehículos de tres ruedas asimilados a motocicletas.**

- ✔ La R-103 prohíbe el acceso a vehículos de motor, pero no a motocicletas de dos ruedas ni a vehículos de tres ruedas asimilados a motocicletas. La prohibición de acceso a motocicletas es la R-104. _(RGC_CATALOGO Anexo I, catálogo de señales, R-103 (pág. 102 del PDF consolidado))_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0107

¿A quién prohíbe la entrada esta señal?  
Respuesta: **A los ciclomotores y a los vehículos para personas de movilidad reducida.**

- ✔ La R-105 («Entrada prohibida a ciclomotores») prohíbe el acceso a ciclomotores e igualmente a vehículos para personas de movilidad reducida. _(RGC_CATALOGO Anexo I, catálogo de señales, R-105 (pág. 102 del PDF consolidado))_
- ✘ `B1-sen-0038` La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_

## B1-sen-0108

¿A quién prohíbe la entrada esta señal con la silueta de un camión, sin ninguna cifra?  
Respuesta: **A los vehículos destinados al transporte de mercancías (camiones, tractocamiones y furgones o furgonetas), independientemente de su masa.**

- ✔ La R-106 prohíbe el acceso a vehículos destinados al transporte de mercancías, entendiéndose como tales camiones, tractocamiones y furgones o furgonetas, independientemente de su masa. _(RGC_CATALOGO Anexo I, catálogo de señales, R-106 (pág. 103 del PDF consolidado))_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_

## B1-sen-0109

Conduce un camión cuya masa máxima autorizada es 7,5 t; va vacío y pesa 4,5 t. Encuentra esta señal (camión con la cifra 5,5 t). ¿Puede entrar?  
Respuesta: **No, porque su masa máxima autorizada es superior a 5,5 t, aunque vaya vacío.**

- ✔ La R-107 prohíbe el acceso a los vehículos destinados al transporte de mercancías cuya masa máxima autorizada sea superior a la indicada en la señal, aunque circulen vacíos. _(RGC_CATALOGO Anexo I, catálogo de señales, R-107 (pág. 103 del PDF consolidado))_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_

## B1-sen-0110

¿A quién prohíbe la entrada esta señal?  
Respuesta: **A los vehículos que transporten mercancías explosivas o fácilmente inflamables y requieran estar señalizados de acuerdo con su normativa específica.**

- ✔ La R-109 prohíbe el acceso a toda clase de vehículos que transporten mercancías explosivas o fácilmente inflamables y requieran estar señalizados de acuerdo con su normativa específica. La de productos contaminantes del agua es la R-110. _(RGC_CATALOGO Anexo I, catálogo de señales, R-109 (pág. 103 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0111

¿A quién prohíbe la entrada esta señal?  
Respuesta: **A los vehículos que transporten más de 1.000 litros de productos capaces de contaminar el agua.**

- ✔ La R-110 prohíbe el acceso a toda clase de vehículos que transporten más de 1.000 litros de productos capaces de contaminar el agua. _(RGC_CATALOGO Anexo I, catálogo de señales, R-110 (pág. 104 del PDF consolidado))_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_
- ✘ `B1-sen-0035` Nadie debe penetrar en un paso a nivel cuyas barreras o semibarreras estén atravesadas o en movimiento para levantarse o colocarse atravesadas. _(RGC 96.1)_

## B1-sen-0112

¿A quién prohíbe la entrada esta señal con la silueta de un tractor?  
Respuesta: **A los tractores y otras máquinas agrícolas autopropulsadas.**

- ✔ La R-111 («Entrada prohibida a vehículos agrícolas de motor») prohíbe el acceso a tractores y otras máquinas agrícolas autopropulsadas. _(RGC_CATALOGO Anexo I, catálogo de señales, R-111 (pág. 104 del PDF consolidado))_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0019` El balanceo de una luz roja o amarilla obliga a detenerse a los usuarios hacia los que el agente dirija la luz. _(RGC Anexo I.1.1.c)_

## B1-sen-0113

Conduce un turismo que arrastra un remolque de un solo eje y encuentra esta señal. ¿Puede entrar?  
Respuesta: **Sí, porque la señal exceptúa los remolques de un solo eje.**

- ✔ La R-112 prohíbe el acceso a vehículos de motor con remolque, exceptuando los de un solo eje. Si lleva una cifra de tonelaje, la prohibición solo se aplica cuando la masa máxima autorizada del remolque supere dicha cifra. _(RGC_CATALOGO Anexo I, catálogo de señales, R-112 (pág. 104 del PDF consolidado))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0114

¿A quién prohíbe la entrada esta señal?  
Respuesta: **A los carros de mano.**

- ✔ La R-115 («Entrada prohibida a carros de mano») prohíbe el acceso a carros de mano; la de vehículos de tracción animal es la R-113. _(RGC_CATALOGO Anexo I, catálogo de señales, R-115 (pág. 104 del PDF consolidado))_
- ✘ `B1-sen-0001` Las señales y órdenes de los agentes encabezan el orden de preferencia entre señales, por delante de los semáforos. _(RGC 133.1.a)_
- ✘ `B1-sen-0019` El balanceo de una luz roja o amarilla obliga a detenerse a los usuarios hacia los que el agente dirija la luz. _(RGC Anexo I.1.1.c)_

## B1-sen-0115

¿A quién prohíbe la entrada esta señal con un jinete?  
Respuesta: **A los animales de montura.**

- ✔ La R-117 («Entrada prohibida a animales de montura») prohíbe el acceso a animales de montura; la de vehículos de tracción animal es la R-113. _(RGC_CATALOGO Anexo I, catálogo de señales, R-117 (pág. 105 del PDF consolidado))_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_

## B1-sen-0116

¿Qué prohíbe esta señal con la cifra 2,4 t sobre un eje?  
Respuesta: **El paso de los vehículos cuya masa por eje supere 2,4 toneladas.**

- ✔ La R-202 («Limitación de masa por eje») prohíbe el paso a los vehículos cuya masa por eje, transmitida por la totalidad de las ruedas acopladas a algún eje, supere la indicada; la de masa total es la R-201. _(RGC_CATALOGO Anexo I, catálogo de señales, R-202 (pág. 107 del PDF consolidado))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0117

Conduce un turismo con remolque y el conjunto mide 11 metros de largo. Encuentra esta señal con la cifra 10 m. ¿Puede pasar?  
Respuesta: **No, porque prohíbe el paso a los vehículos o conjuntos de vehículos de longitud superior a la indicada.**

- ✔ La R-203 prohíbe el paso a los vehículos o conjunto de vehículos cuya longitud máxima, incluida la carga, supere la indicada. _(RGC_CATALOGO Anexo I, catálogo de señales, R-203 (pág. 107 del PDF consolidado))_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_

## B1-sen-0118

¿Qué prohíbe esta señal con la cifra 4,5 m entre dos puntas de flecha verticales?  
Respuesta: **El paso de los vehículos cuya altura máxima, incluida la carga, supere 4,5 m.**

- ✔ La R-205 («Limitación de altura») prohíbe el paso a los vehículos cuya altura máxima, incluida la carga, supere la indicada; la de anchura es la R-204. _(RGC_CATALOGO Anexo I, catálogo de señales, R-205 (pág. 107 del PDF consolidado))_
- ✘ `B1-sen-0039` La luz roja no intermitente en forma de peatón inmóvil indica a los peatones que no deben comenzar a cruzar la calzada. _(RGC Anexo I.4.1.a)_
- ✘ `B1-sen-0003` Las señales verticales están por delante de las marcas viales en el orden de preferencia; la más restrictiva solo prevalece si las señales son del mismo tipo. _(RGC 133.1.d-e)_

## B1-sen-0119

¿Qué indica esta señal con dos vehículos y la cifra 70 m?  
Respuesta: **Prohibición de circular a menos de 70 m del vehículo precedente, excepto cuando se vaya a adelantar.**

- ✔ La R-300 («Separación mínima») prohíbe circular sin mantener con el vehículo precedente una separación igual o mayor a la indicada, excepto cuando se vaya a efectuar la maniobra de adelantamiento. _(RGC_CATALOGO Anexo I, catálogo de señales, R-300 (pág. 109 del PDF consolidado))_
- ✘ `B1-sen-0056` Un panel complementario puede indicar la distancia entre la señal y el principio del tramo peligroso, o la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0120

Circula por una vía con prioridad y encuentra esta señal, sola en su poste (sin ninguna señal de peligro). ¿Hasta dónde obliga?  
Respuesta: **Hasta la próxima señal de fin de limitación de velocidad, de fin de prohibiciones u otra de velocidad máxima.**

- ✔ La R-301 obliga desde el lugar en que esté situada hasta la próxima señal «Fin de limitación de velocidad», de «Fin de prohibiciones» u otra de «Velocidad máxima». Las excepciones de la ficha (señal en el mismo poste o panel que una de peligro, o situada en una vía sin prioridad) quedan fuera por el enunciado. _(RGC_CATALOGO Anexo I, catálogo de señales, R-301 (pág. 109 del PDF consolidado))_
- ✘ `B1-sen-0038` La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_

## B1-sen-0121

Esta señal prohíbe girar a la izquierda. ¿Puede cambiar de sentido de la marcha?  
Respuesta: **No, porque la señal incluye también la prohibición del cambio de sentido de marcha.**

- ✔ La R-303 («Giro a la izquierda prohibido») prohíbe girar a la izquierda e incluye también la prohibición del cambio de sentido de marcha. _(RGC_CATALOGO Anexo I, catálogo de señales, R-303 (pág. 109 del PDF consolidado))_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0033` Los captafaros horizontales luminosos emiten luz verde, naranja o roja, y el único franqueable es el verde. _(RGC Anexo I.3.1.4.1º)_

## B1-sen-0122

¿Qué prohíbe esta señal (flecha en U tachada)?  
Respuesta: **Efectuar la maniobra de cambio de sentido de la marcha.**

- ✔ La R-304 («Cambio de sentido prohibido») prohíbe efectuar la maniobra de cambio de sentido de la marcha; la que prohíbe girar a la izquierda (y con ello cambiar de sentido) es la R-303. _(RGC_CATALOGO Anexo I, catálogo de señales, R-304 (pág. 109 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0002` En el orden de preferencia los semáforos van antes que las señales verticales; la regla de la señal más restrictiva solo se aplica entre señales del mismo tipo. _(RGC 133.1.c-d)_

## B1-sen-0123

¿Qué prohíbe esta señal?  
Respuesta: **Adelantar a los vehículos a motor cuando la maniobra implique invadir la zona reservada al sentido contrario de circulación.**

- ✔ La R-305 («Adelantamiento prohibido») prohíbe a todos los vehículos adelantar a los vehículos a motor que circulen por la calzada cuando la maniobra implique invadir la zona reservada al sentido contrario; rige hasta la señal de «Fin de prohibición de adelantamiento» o «Fin de prohibiciones». La de camiones es la R-306. _(RGC_CATALOGO Anexo I, catálogo de señales, R-305 (pág. 110 del PDF consolidado))_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_
- ✘ `B1-sen-0012` Los vehículos que utilicen peajes dinámicos o telepeajes deben estar provistos del medio técnico que posibilite su uso en condiciones operativas. _(RGC 132.1)_

## B1-sen-0124

Conduce un autobús y encuentra esta señal (camión rojo y turismo negro). ¿Le afecta la prohibición de esta señal?  
Respuesta: **No, porque se dirige a los camiones cuya masa máxima autorizada exceda de 3.500 kg.**

- ✔ La R-306 prohíbe adelantar a los camiones cuya masa máxima autorizada exceda de 3.500 kg (incluso sin invadir el sentido contrario); no se dirige a los autobuses, que siguen sujetos a las normas generales de adelantamiento. _(RGC_CATALOGO Anexo I, catálogo de señales, R-306 (pág. 110 del PDF consolidado))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0125

Encuentra esta señal (círculo azul con flecha blanca hacia delante) a la entrada de una intersección. ¿Puede girar a la derecha en ella?  
Respuesta: **No, porque la flecha señala la dirección y sentido que está obligado a seguir: recto.**

- ✔ En la R-400c («Sentido obligatorio») la flecha señala la dirección y sentido que los vehículos tienen la obligación de seguir: hacia delante. _(RGC_CATALOGO Anexo I, catálogo de señales, R-400c (pág. 115 del PDF consolidado))_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_
- ✘ `B1-sen-0023` La bandera verde indica que, a partir del paso del vehículo que la porta, la calzada queda de nuevo abierta al tráfico. _(RGC Anexo I.1.2.b)_

## B1-sen-0126

¿Qué indica esta señal (círculo azul con flechas blancas hacia delante y hacia la derecha)?  
Respuesta: **Que las únicas direcciones y sentidos permitidos son seguir recto o girar a la derecha.**

- ✔ En la R-403a («Únicas direcciones y sentidos permitidos») las flechas señalan las únicas direcciones y sentidos que los vehículos pueden tomar: recto o a la derecha. _(RGC_CATALOGO Anexo I, catálogo de señales, R-403a (pág. 116 del PDF consolidado))_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0127

Esta señal azul con la silueta de un turismo indica una calzada obligatoria para automóviles. ¿Están obligadas a circular por ella las motocicletas de dos ruedas?  
Respuesta: **No, la obligación exceptúa a las motocicletas de dos ruedas y a los vehículos de tres ruedas asimilados a motocicletas.**

- ✔ La R-404 obliga a los conductores de automóviles a circular por la calzada a cuya entrada está situada, excepto a las motocicletas de dos ruedas y vehículos de tres ruedas asimilados a motocicletas. _(RGC_CATALOGO Anexo I, catálogo de señales, R-404 (pág. 116 del PDF consolidado))_
- ✘ `B1-sen-0003` Las señales verticales están por delante de las marcas viales en el orden de preferencia; la más restrictiva solo prevalece si las señales son del mismo tipo. _(RGC 133.1.d-e)_
- ✘ `B1-sen-0038` La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_

## B1-sen-0128

Circula en una motocicleta de dos ruedas y encuentra esta señal azul con una motocicleta. ¿Qué debe hacer?  
Respuesta: **Circular por esa calzada, porque es obligatoria para las motocicletas de dos ruedas.**

- ✔ La R-405 obliga a los conductores de motocicletas de dos ruedas y vehículos de tres ruedas asimilados a motocicletas a circular por la calzada a cuya entrada está situada. _(RGC_CATALOGO Anexo I, catálogo de señales, R-405 (pág. 117 del PDF consolidado))_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_
- ✘ `B1-sen-0003` Las señales verticales están por delante de las marcas viales en el orden de preferencia; la más restrictiva solo prevalece si las señales son del mismo tipo. _(RGC 133.1.d-e)_

## B1-sen-0129

¿Puede circular un turismo por una vía señalizada con esta señal azul con una bicicleta?  
Respuesta: **No, porque es una vía reservada a los ciclos y prohibida a los demás usuarios.**

- ✔ La R-407a («Vía reservada y obligatoria para ciclos») obliga a los conductores de ciclos a circular por esa vía y prohíbe a los demás usuarios utilizarla. _(RGC_CATALOGO Anexo I, catálogo de señales, R-407a (pág. 117 del PDF consolidado))_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_
- ✘ `B1-sen-0058` Para la señalización circunstancial por causas distintas de las obras se aplica lo establecido para las obras, pero con color naranja en lugar de amarillo. _(RGC Anexo I.5 (Catálogo, tomo I, 2.6))_

## B1-sen-0130

¿Qué indica esta señal azul con un ciclomotor?  
Respuesta: **Vía reservada y obligatoria para ciclomotores; los demás usuarios no pueden utilizarla.**

- ✔ La R-407b obliga a los conductores de ciclomotores a circular por esa vía y prohíbe a los demás usuarios utilizarla. _(RGC_CATALOGO Anexo I, catálogo de señales, R-407b (pág. 117 del PDF consolidado))_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_

## B1-sen-0131

¿Qué indica esta señal azul con un carro tirado por un caballo?  
Respuesta: **Obligación para los conductores de vehículos de tracción animal de utilizar el camino a cuya entrada está situada.**

- ✔ La R-408 («Camino obligatorio para vehículos de tracción animal») obliga a los conductores de vehículos de tracción animal a utilizar ese camino. La prohibición de entrada a estos vehículos es la R-113 (círculo blanco con orla roja) y el camino para animales de montura, la R-409. _(RGC_CATALOGO Anexo I, catálogo de señales, R-408 (pág. 117 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0132

¿Qué indica esta señal azul con una persona a caballo?  
Respuesta: **Camino reservado y obligatorio para animales de montura; los demás usuarios no pueden utilizarlo.**

- ✔ La R-409 obliga a los jinetes a utilizar con sus animales de montura ese camino y prohíbe a los demás usuarios de la vía utilizarlo. La prohibición de entrada a animales de montura es la R-117. _(RGC_CATALOGO Anexo I, catálogo de señales, R-409 (pág. 118 del PDF consolidado))_
- ✘ `B1-sen-0038` La luz verde intermitente indica que el tiempo para terminar de atravesar la calzada está a punto de finalizar y que se va a encender la roja. _(RGC Anexo I.4.1.b)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0133

¿Qué indica esta señal azul con un peatón?  
Respuesta: **Camino reservado y obligatorio para peatones; los demás usuarios no pueden utilizarlo.**

- ✔ La R-410 obliga a los peatones a transitar por ese camino y prohíbe a los demás usuarios de la vía utilizarlo. _(RGC_CATALOGO Anexo I, catálogo de señales, R-410 (pág. 118 del PDF consolidado))_
- ✘ `B1-sen-0020` El toque largo de silbato ordena reanudar la marcha; una serie de toques cortos y frecuentes ordena la detención. _(RGC Anexo I.1.1.e)_
- ✘ `B1-sen-0055` Las señales de reglamentación tienen por objeto indicar las obligaciones, limitaciones o prohibiciones especiales. _(RGC 145.1)_

## B1-sen-0134

¿Qué indica esta señal azul con la cifra 40?  
Respuesta: **Velocidad mínima: obligación de circular, por lo menos, a 40 km/h.**

- ✔ La R-411 («Velocidad mínima») obliga a circular, por lo menos, a la velocidad indicada en kilómetros por hora. _(RGC_CATALOGO Anexo I, catálogo de señales, R-411 (pág. 118 del PDF consolidado))_
- ✘ `B1-sen-0027` Las patrullas escolares pueden invitar a los usuarios a detener su marcha mediante las señales del catálogo oficial incorporadas a una paleta. _(RGC 141.4)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B1-sen-0135

¿Qué indica esta señal azul con un faro?  
Respuesta: **Obligación de circular con el alumbrado al menos de corto alcance, con independencia de la visibilidad, hasta una señal de fin de esta obligación.**

- ✔ La R-413 («Alumbrado de corto alcance») obliga a circular con el alumbrado al menos de corto alcance, con independencia de las condiciones de visibilidad e iluminación, desde la señal hasta otra de fin de esta obligación. _(RGC_CATALOGO Anexo I, catálogo de señales, R-413 (pág. 119 del PDF consolidado))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B1-sen-0136

¿Qué indica esta señal azul con un neumático con cadenas?  
Respuesta: **Obligación de no proseguir la marcha sin cadenas para nieve u otros dispositivos antideslizantes autorizados, o neumáticos especiales de nieve.**

- ✔ La R-412 («Cadenas para nieve») obliga a no proseguir la marcha sin cadenas para nieve u otros dispositivos antideslizantes autorizados que actúen al menos en una rueda a cada lado del mismo eje motor, o neumáticos especiales de nieve. _(RGC_CATALOGO Anexo I, catálogo de señales, R-412 (pág. 118 del PDF consolidado))_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B1-sen-0137

Transporta 5.000 litros de un producto capaz de contaminar el agua y encuentra esta señal azul. ¿Qué debe hacer?  
Respuesta: **Circular por esa calzada, porque es obligatoria para su vehículo.**

- ✔ La R-415 obliga a los conductores de toda clase de vehículos que transporten más de 1.000 litros de productos capaces de contaminar el agua a circular por la calzada a cuya entrada está situada. _(RGC_CATALOGO Anexo I, catálogo de señales, R-415 (pág. 119 del PDF consolidado))_
- ✘ `B1-sen-0004` Entre señales de distinto tipo prevalece la preferente según el orden reglamentario; si son del mismo tipo, prevalece la más restrictiva. _(RGC 133.2)_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_

## B1-sen-0138

¿Qué indica esta señal sobre uno de los carriles de un peaje?  
Respuesta: **Vía exclusiva para vehículos dotados de equipo de telepeaje operativo: telepeaje obligatorio.**

- ✔ La R-418 indica una vía exclusiva para vehículos dotados de equipo de telepeaje operativo: el pago del peaje debe hacerse mediante telepeaje y el vehículo debe llevar el medio técnico operativo. _(RGC_CATALOGO Anexo I, catálogo de señales, R-418 (pág. 120 del PDF consolidado))_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_
- ✘ `B1-sen-0073` La Ley excluye de la definición de vehículo de motor a los ciclomotores, los tranvías y los vehículos para personas de movilidad reducida. _(LSV Anexo I.12)_

## B2-sen-0001

Esta señal indica el comienzo de una vía para automóviles. ¿Qué vehículos pueden circular por ella?  
Respuesta: **Exclusivamente los automóviles.**

- ✔ La vía para automóviles está reservada exclusivamente a la circulación de automóviles, tiene una sola calzada y limitación total de accesos a las propiedades colindantes; se señaliza con S-3 (comienzo) y S-4 (fin). _(LSV Anexo I.68)_
- ✘ `res-sen-0005` En la zona de estancia y juego (S-28) la velocidad máxima es 10 km/h, los peatones tienen prioridad y los juegos y deportes están autorizados. No hay que confundirla con la zona de coexistencia, que es de 20 km/h. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.8 (S-28))_
- ✘ `B2-sen-0006` Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_

## B2-luz-0002

De día, entra en un tramo afectado por esta señal (Túnel) que está suficientemente iluminado. ¿Qué alumbrado debe llevar encendido su turismo?  
Respuesta: **El de posición y el de corto alcance o de cruce.**

- ✔ A cualquier hora del día, en túneles, pasos inferiores y tramos afectados por la señal S-5 suficientemente iluminados, los vehículos de motor y ciclomotores llevarán, además del alumbrado de posición, el de cruce. Si el túnel está insuficientemente iluminado, deberá llevar el de carretera salvo que deba usar el de cruce para no deslumbrar. _(RGC 101.1)_
- ✘ `C-luc-0008` En una travesía insuficientemente iluminada el vehículo parado o estacionado de noche debe llevar las luces de posición, sustituibles por las de estacionamiento o por las dos de posición del lado de la calzada si está en línea. _(RGC 105.2)_
- ✘ `C-luc-0007` El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_

## B2-sen-0003

Como norma general, ¿a qué distancia de la intersección se colocan las señales de preseñalización en autopistas y autovías?  
Respuesta: **A 500 metros.**

- ✔ En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_
- ✘ `res-sen-0003` La baliza de tres franjas (P-9a) está a 200 m; la de dos franjas (P-9b) a 150 m, y la de una franja (P-9c) a 100 m. Las de 300, 200 y 100 m son las de aproximación a una salida de autopista o autovía. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.1 (P-9a))_
- ✘ `B2-sen-0004` Mediante un panel complementario puede indicarse la distancia entre la señal y el principio del tramo peligroso y también la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_

## B2-sen-0004

Un panel complementario colocado bajo una señal de advertencia de peligro, ¿qué puede indicar?  
Respuesta: **La distancia entre la señal y el principio del tramo peligroso.**

- ✔ Mediante un panel complementario puede indicarse la distancia entre la señal y el principio del tramo peligroso y también la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_
- ✘ `res-sen-0002` Las carreteras convencionales o multicarril de la red del Estado se identifican con fondo rojo (S-420). Las autopistas y autovías, con fondo azul (S-410). _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.13 (S-420))_

## B2-sen-0005

¿Puede un panel complementario indicar la longitud del tramo a lo largo del cual existe el peligro que anuncia la señal?  
Respuesta: **Sí.**

- ✔ Además de la distancia hasta el principio del peligro, un panel complementario puede indicar la longitud a lo largo de la cual existe el peligro. _(RGC 144.3)_
- ✘ `B2-sen-0006` Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_

## B2-sen-0006

Una señal de prohibición sin ningún panel complementario debajo, ¿a partir de dónde rige?  
Respuesta: **A partir de la sección transversal donde está colocada.**

- ✔ Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_
- ✘ `B2-sen-0004` Mediante un panel complementario puede indicarse la distancia entre la señal y el principio del tramo peligroso y también la longitud a lo largo de la cual existe el peligro. _(RGC 144.2)_
- ✘ `res-sen-0004` Si la R-301 está en el mismo poste o panel que una señal de peligro, la limitación termina cuando termina el peligro. Esto lo dice la ficha de la velocidad máxima; la de adelantamiento prohibido no tiene esta regla. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.5 (R-301))_

## B2-sen-0007

¿Qué indica esta señal?  
Respuesta: **La existencia de un dispositivo de control de velocidad.**

- ✔ La S-991a indica la existencia de un dispositivo de control de velocidad en un punto o tramo de una carretera convencional o una carretera multicarril (en autopista o autovía es la S-991b, de fondo azul). _(RGC_CATALOGO Anexo I, catálogo de señales, S-991a (pág. 200 del PDF consolidado))_
- ✘ `res-sen-0001` En el catálogo vigente de señales: itinerario europeo (E) en verde; autopistas y autovías en azul; carreteras del Estado en rojo; autonómicas de primer nivel en naranja, de segundo nivel en marrón y de tercer nivel en amarillo. _(RGC Anexo I, Catálogo de señales verticales, tomo I, 3.13 (S-440))_
- ✘ `B2-sen-0016` En el orden de prioridad las marcas viales van detrás de semáforos y señales verticales; en caso de contradicción prevalece la preferente según ese orden. _(RGC 133)_

## B2-cic-0009

Hay un carril bici junto a la calzada y al inicio no hay ninguna señal que obligue a usarlo. Para un ciclista, el uso de ese carril bici es...  
Respuesta: **Preferente.**

- ✔ Si hay carril bici o vía específica, su uso por las bicicletas es preferente; la autoridad competente puede hacerlo obligatorio mediante la señal R-407a. _(RGC 153.1)_
- ✘ `arc-0004` Entre el ocaso y la salida del sol, o con poca visibilidad, deben llevar al menos un elemento luminoso o reflectante visible a una distancia mínima de 150 metros. _(RGC 123.1)_
- ✘ `D-vul-0005` Los vehículos de dos ruedas son más frágiles y se ven peor que el resto de vehículos, por lo que sus conductores deben circular con especial cuidado. _(MANUAL_DGT Tema 16, Conductores de vehículos de dos ruedas (pág. 407))_

## B2-cic-0010

Al comienzo de un carril bici está colocada esta señal. ¿Qué supone para el ciclista?  
Respuesta: **Que el uso del carril bici es obligatorio.**

- ✔ La señal R-407a convierte en obligatorio para los ciclos el uso del carril o vía ciclista, que de otro modo solo es de uso preferente. _(RGC 153.1)_
- ✘ `A-cic-0001` Los ciclistas que circulan en grupo tienen prioridad cuando el primero ha iniciado ya el cruce o ha entrado en una glorieta; el grupo se trata como una unidad. _(RGC 64.2.c)_
- ✘ `D-vul-0001` Las personas mayores tienen más accidentes cuando van solas que cuando van acompañadas por niños: con niños son más prudentes para darles buen ejemplo y protegerles. _(MANUAL_DGT Tema 16, Las personas mayores (pág. 402))_

## B2-via-0011

Según la Ley de Tráfico, ¿qué es una senda ciclable?  
Respuesta: **Una vía para peatones y ciclos, segregada del tráfico motorizado, que discurre por espacios abiertos, parques, jardines o bosques.**

- ✔ La senda ciclable es una vía para peatones y ciclos, segregada del tráfico motorizado, que discurre por espacios abiertos, parques, jardines o bosques. _(LSV Anexo I.79)_
- ✘ `via-0004` Carretera convencional es la que no reúne las características propias de autopistas, autovías y vías para automóviles. _(LSV Anexo I.69)_
- ✘ `res-via-0001` Los peatones no pueden circular por autopistas ni autovías, salvo en los casos y condiciones del artículo 130 (inmovilización del vehículo por emergencia). _(RGC 125.1)_

## B2-via-0012

En una zona peatonal que no sea acera, ¿puede la autoridad municipal permitir la circulación de ciclistas y usuarios de vehículos de movilidad personal?  
Respuesta: **Sí, mediante ordenanza y respetando la prioridad de los peatones.**

- ✔ En las zonas peatonales distintas de las aceras, la autoridad municipal puede autorizar mediante ordenanza la coexistencia de peatones con ciclistas y usuarios de VMP, respetando la prioridad de los peatones. _(RGC 152.1)_
- ✘ `via-0007` Se prohíbe circular con vehículos de movilidad personal por autopistas y autovías, por travesías y por vías interurbanas y túneles urbanos (salvo vías ciclistas y similares). _(RGC 38.4.b)_
- ✘ `B2-via-0011` La senda ciclable es una vía para peatones y ciclos, segregada del tráfico motorizado, que discurre por espacios abiertos, parques, jardines o bosques. _(LSV Anexo I.79)_

## B2-via-0013

¿Qué pueden permitir las ordenanzas municipales respecto a la circulación por las aceras?  
Respuesta: **Que circulen niños de hasta doce años en bicicleta, siempre que vayan a cargo de un adulto que circule a pie.**

- ✔ En las aceras está prohibida la circulación de cualquier tipo de vehículo, pero las ordenanzas pueden permitir que circulen niños de hasta doce años en bicicleta a cargo de un adulto que vaya a pie. _(RGC 152.1)_
- ✘ `via-0007` Se prohíbe circular con vehículos de movilidad personal por autopistas y autovías, por travesías y por vías interurbanas y túneles urbanos (salvo vías ciclistas y similares). _(RGC 38.4.b)_
- ✘ `res-via-0002` Los peatones no pueden hacer peticiones de pasaje en ningún tramo de autopistas y autovías, incluidas las explanadas de las estaciones de peaje. _(RGC 125.1)_

## B2-sen-0016

Si lo que indica una marca vial parece contradecir lo que indica una señal vertical, ¿a cuál debe obedecer?  
Respuesta: **A la señal vertical.**

- ✔ En el orden de prioridad las marcas viales van detrás de semáforos y señales verticales; en caso de contradicción prevalece la preferente según ese orden. _(RGC 133)_
- ✘ `B2-sen-0003` En autopistas y autovías la distancia de las señales de preseñalización será, como norma general, de 500 metros; en poblado puede reducirse a unos 50 metros. _(RGC 146.2.d).1ª)_
- ✘ `B2-sen-0006` Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_

## B2-mv-0017

¿Qué significa esta marca longitudinal discontinua que separa dos carriles?  
Respuesta: **Que puede atravesarse para maniobras permitidas, como cambiar de carril, respetando la prioridad del vehículo que circula por el carril que se pretende ocupar.**

- ✔ Las marcas longitudinales discontinuas delimitan carriles y pueden atravesarse para maniobras permitidas, como giros o cambios de carril, respetando la prioridad del vehículo que circula por el carril que se quiere ocupar. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `A-adv-0004` La intención de inmovilizar el vehículo o frenar de modo considerable se advierte con las luces de frenado o moviendo el brazo alternativamente de arriba abajo con movimientos cortos y rápidos. _(RGC 109.2.c)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_

## B2-mv-0018

Una marca longitudinal formada por dos líneas continuas y paralelas, ¿qué significa?  
Respuesta: **Lo mismo que una sola línea continua: no se debe atravesar ni circular sobre ella.**

- ✔ Una marca longitudinal de dos líneas continuas y paralelas tiene el mismo significado que la formada por una sola línea continua. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_
- ✘ `C-luc-0018` Las advertencias con el brazo, si son perceptibles y correctas, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_

## B2-mv-0019

Circula junto a una marca formada por una línea continua adosada a otra discontinua. ¿Qué línea debe tener en cuenta?  
Respuesta: **Únicamente la línea situada en el lado por el que circula.**

- ✔ Cuando una línea continua está adosada a otra discontinua, los conductores deben tener en cuenta únicamente la línea situada en el lado por el que circulan. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `A-adv-0004` La intención de inmovilizar el vehículo o frenar de modo considerable se advierte con las luces de frenado o moviendo el brazo alternativamente de arriba abajo con movimientos cortos y rápidos. _(RGC 109.2.c)_
- ✘ `adel-0002` Cuando la calzada tiene más de un carril por sentido, es obligatorio el cambio completo de carril. _(RGC 85.4)_

## B2-mv-0020

En una marca continua adosada a discontinua que separa sentidos opuestos, usted inició un adelantamiento desde el carril contiguo a la línea discontinua. ¿Puede atravesar después la línea continua para volver a su carril?  
Respuesta: **Sí, para volver a su carril tras realizar el adelantamiento o desistir de él.**

- ✔ Quien inició el adelantamiento desde el carril contiguo a la línea discontinua puede atravesar la continua y volver a su carril tras adelantar o desistir del adelantamiento. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_
- ✘ `def-0009` La tara es la masa sin personas ni carga, pero con la dotación completa de combustible, agua, lubricante, repuestos, herramientas y accesorios. _(LSV Anexo I.35)_

## B2-mv-0021

Un carril está delimitado a ambos lados por marcas longitudinales discontinuas dobles. ¿Qué tipo de carril es?  
Respuesta: **Un carril reversible.**

- ✔ Las marcas longitudinales discontinuas dobles delimitan por ambos lados los carriles reversibles, cuyo sentido se regula con semáforos de carril u otros medios. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `B1-sen-0032` Como dispositivo delimitador, la luz roja fija indica que la calzada está totalmente cerrada al tránsito. _(RGC Anexo I.3.1.1.5º)_
- ✘ `C-sev-0007` La V-16 indica que el vehículo está inmovilizado en la calzada o que su carga ha caído sobre la misma. _(RGV Anexo XI, V-16)_

## B2-mv-0022

Una línea longitudinal discontinua de preaviso, con separaciones entre trazos más cortas que las de una línea discontinua normal, ¿qué anuncia?  
Respuesta: **La proximidad de una marca longitudinal continua o de un tramo con un riesgo especial.**

- ✔ Las marcas de preaviso (M-1.9 y M-1.10) anuncian la proximidad de una marca longitudinal continua y la prohibición que implica, o de un tramo de vía con un riesgo especial. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `A-ma-0001` El recorrido hacia atrás como maniobra complementaria de la parada, el estacionamiento o la incorporación no puede superar 15 metros ni invadir un cruce de vías. _(RGC 80.2)_
- ✘ `A-est-0003` Entre vehículos del mismo tipo, la preferencia se decide a favor del que tuviera que dar marcha atrás mayor distancia y, en caso de igualdad, del de mayor anchura, longitud o masa máxima autorizada. _(RGC 62.1)_

## B2-mv-0023

Que la línea de borde de calzada sea continua o discontinua, ¿supone alguna diferencia en el uso del arcén?  
Respuesta: **No conlleva ninguna diferencia respecto al uso del arcén reglamentariamente establecido.**

- ✔ Las líneas de borde de calzada delimitan el borde de la calzada; que sean continuas o discontinuas no conlleva diferencia respecto al uso del arcén reglamentariamente establecido. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `bmp-0006` El Código Penal castiga a quien conduce un vehículo de motor o ciclomotor sin haber obtenido nunca permiso o licencia, y también a quien conduce tras perder todos los puntos o estando privado del permiso por decisión judicial. _(CP 384)_
- ✘ `C-luc-0018` Las advertencias con el brazo, si son perceptibles y correctas, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_

## B2-mv-0025

Una línea discontinua transversal acompañada de un triángulo invertido pintado en el carril, ¿qué indica?  
Respuesta: **Que no debe franquearla cuando tenga que ceder el paso.**

- ✔ La marca transversal discontinua indica que, salvo circunstancias anormales que reduzcan la visibilidad, ningún vehículo debe franquearla cuando tenga que ceder el paso. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.2)_
- ✘ `A-pri-0008` Quien va a girar debe cerciorarse de que la velocidad y la distancia de los vehículos que se acercan en sentido contrario le permiten hacer la maniobra sin peligro y, si no es así, abstenerse. _(RGC 74.1)_
- ✘ `bmp-0010` Quien origina un grave riesgo para la circulación colocando obstáculos imprevisibles, derramando sustancias deslizantes o inflamables o alterando la señalización comete un delito. _(CP 385)_

## B2-mv-0026

¿En qué caso puede señalizarse un paso para peatones solo con dos líneas transversales discontinuas y paralelas, sin las franjas blancas?  
Respuesta: **Cuando el paso para peatones esté regulado por semáforo.**

- ✔ En los pasos para peatones regulados por semáforo podrá utilizarse la marca constituida por dos líneas transversales discontinuas y paralelas. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.2)_
- ✘ `B1-sen-0017` La señal de brazos extendidos horizontalmente permanece en vigor aunque el agente los baje, siempre que no cambie de posición o efectúe otra señal. _(RGC Anexo I.1.1.b)_
- ✘ `A-est-0004` En el orden de preferencia, los vehículos destinados al transporte colectivo de viajeros van por delante de los camiones, tractocamiones y furgones. _(RGC 62.1.e y f)_

## B2-mv-0027

En un paso para ciclistas señalizado con marca vial, ¿qué deben hacer los vehículos que circulan por la calzada?  
Respuesta: **Deben dejar paso a los ciclistas.**

- ✔ La marca de paso para ciclistas (dos líneas transversales discontinuas y paralelas) indica un paso en el que los vehículos que circulan por la calzada deben dejarles paso. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.2)_
- ✘ `D-vul-0005` Los vehículos de dos ruedas son más frágiles y se ven peor que el resto de vehículos, por lo que sus conductores deben circular con especial cuidado. _(MANUAL_DGT Tema 16, Conductores de vehículos de dos ruedas (pág. 407))_
- ✘ `A-pea-0002` Los peatones tienen prioridad cuando el vehículo cruza un arcén por el que circulan peatones que no disponen de zona peatonal. _(RGC 65.1.c)_

## B2-mv-0028

Un paso para peatones cuyas franjas se prolongan cada una con un triángulo indica que el paso...  
Respuesta: **Está sobreelevado.**

- ✔ Cuando el paso para peatones es sobreelevado se usa la marca M-4.3b, que tiene un triángulo como prolongación de cada una de las franjas. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.2)_
- ✘ `B1-pri-0066` En defecto de señal que regule la preferencia de paso, el conductor debe cederlo a los vehículos que se aproximen por su derecha, salvo las excepciones previstas. _(RGC 57.1)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_

## B2-mv-0029

Si la acera está alineada con el límite exterior de la banda de estacionamiento, ¿en cuántos metros anteriores al paso para peatones, como mínimo, no se permitirá aparcar automóviles?  
Respuesta: **En 6 metros.**

- ✔ No se permitirá aparcar automóviles en al menos los 6 m anteriores al paso si la acera está alineada con el límite exterior de la banda de estacionamiento, o en los 3 m anteriores si está alineada con el límite interior. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.2)_
- ✘ `C-luc-0010` Todo vehículo inmovilizado de noche en calzada o arcén debe tener encendidas las luces de posición y, en su caso, las de gálibo. Además, en autopista o autovía o con visibilidad reducida debe usar la luz de emergencia (art. 109.2.c). _(RGC 105.1)_
- ✘ `A-pri-0007` Aun gozando de prioridad, ningún conductor debe entrar en una intersección si previsiblemente puede quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC 59.1)_

## B2-mv-0030

Una limitación de velocidad pintada en un carril delimitado por marcas longitudinales, ¿a quién afecta?  
Respuesta: **Exclusivamente a los vehículos que circulen por ese carril.**

- ✔ Las señales horizontales tienen el mismo significado que sus homólogas verticales, pero si están en un carril delimitado por líneas longitudinales solo obligan a los vehículos que circulan por ese carril. _(RGC 147.2.e))_
- ✘ `B2-mv-0027` La marca de paso para ciclistas (dos líneas transversales discontinuas y paralelas) indica un paso en el que los vehículos que circulan por la calzada deben dejarles paso. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.2)_
- ✘ `A-adel-0007` El conductor adelantado está obligado a disminuir su velocidad cuando, iniciada la maniobra, se produce una situación de peligro para cualquiera de los implicados. _(RGC 86.2)_

## B2-mv-0031

La marca STOP pintada en la calzada, ¿qué obligación impone?  
Respuesta: **Detenerse ante la línea de detención (o, si no existe, inmediatamente antes de la calzada a la que se aproxima) y ceder el paso.**

- ✔ La marca STOP tiene el mismo significado que la señal vertical: obliga a detener el vehículo ante la línea de detención o, si no existe, inmediatamente antes de la calzada a la que se aproxima, y después ceder el paso. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.4)_
- ✘ `A-adel-0012` Está prohibido adelantar en curvas y cambios de rasante de visibilidad reducida, salvo que los dos sentidos estén claramente delimitados y la maniobra pueda hacerse sin invadir la zona del sentido contrario. _(RGC 87.1.a)_
- ✘ `bmp-0008` La conducción con temeridad manifiesta que pone en concreto peligro la vida o la integridad de las personas es delito, con prisión de seis meses a dos años y privación del derecho a conducir de más de uno y hasta seis años. _(CP 380.1)_

## B2-mv-0032

¿Qué significa este triángulo pintado en la calzada?  
Respuesta: **Obligación de ceder el paso a los vehículos que circulen por la calzada a la que se aproxima, deteniéndose si es preciso.**

- ✔ La marca de ceda el paso (M-6.5) obliga a ceder el paso a los vehículos que circulen por la calzada a la que se aproxima, deteniéndose si es preciso ante la línea de ceda el paso. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.4)_
- ✘ `adel-0005` Al rebasar un vehículo inmovilizado por avería, accidente o servicio de urgencia o auxilio que ocupe la calzada, hay que mantener al menos 1,5 m y reducir la velocidad al menos 20 km/h. _(RGC 88.1)_
- ✘ `B1-sen-0054` Las señales de advertencia de peligro indican la proximidad y naturaleza de un peligro difícil de percibir a tiempo, para que se cumplan las normas de comportamiento procedentes. _(RGC 144.1)_

## B2-mv-0033

En un carril con una flecha de selección que incluye la dirección de frente, ¿puede cambiarse de carril?  
Respuesta: **Sí, siempre que se mantenga la dirección de circulación y las marcas longitudinales lo permitan.**

- ✔ Las flechas que incluyen la dirección de frente no impiden el cambio de carril, siempre que se mantenga la dirección de circulación y las marcas longitudinales lo permitan. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.3)_
- ✘ `A-par-0011` Está prohibido parar en las intersecciones y sus proximidades si se dificulta el giro a otros vehículos o, en vías interurbanas, si se genera peligro por falta de visibilidad. _(RGC 94.1.d)_
- ✘ `B1-sen-0015` Si la señal de brazo levantado se efectúa en una intersección, no obliga a detenerse a los conductores que ya hayan entrado en ella. _(RGC Anexo I.1.1.a)_

## B2-mv-0034

¿Qué indica esta flecha pintada en su carril?  
Respuesta: **Que el carril termina próximamente y debe abandonarlo hacia la dirección indicada, respetando la prioridad de quienes circulan por el carril que va a ocupar.**

- ✔ La flecha de fin de carril indica que el carril termina próximamente y hay que abandonarlo hacia la dirección indicada, respetando la prioridad de los vehículos del carril que se va a ocupar. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.3)_
- ✘ `res-vel-0001` Los vehículos especiales tienen 40 km/h, salvo que puedan superar 60 km/h en llano y cumplan las normas de los vehículos: entonces 70 km/h. Si no tienen señalización de frenado, llevan remolque o son motocultores, 25 km/h. _(RGC 48.1.c.2º)_
- ✘ `B1-sen-0046` La luz amarilla intermitente obliga a extremar la precaución y, en su caso, ceder el paso; además, no exime de cumplir otras señales que obliguen a detenerse. _(RGC Anexo I.4.2.d)_

## B2-mv-0035

Ve esta flecha en el eje de una calzada de doble sentido mientras está adelantando. ¿Qué debe hacer?  
Respuesta: **Finalizar el adelantamiento lo antes posible, porque se aproxima una línea continua.**

- ✔ La flecha de retorno anuncia la proximidad de una línea continua que prohíbe circular por su izquierda; hay que desistir de iniciar el adelantamiento o finalizarlo lo antes posible. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.3)_
- ✘ `vel-0004` Los automóviles con remolque están en el grupo de camiones, furgonetas y vehículos articulados: 90 km/h en autopista y autovía y 80 km/h en convencional. _(RGC 48.1.a)_
- ✘ `def-0001` La Ley de Tráfico considera peatones a las personas con discapacidad que circulan al paso en silla de ruedas, tenga o no motor. _(LSV Anexo I.4)_

## B2-mv-0036

¿Qué indica esta marca pintada en la calzada (aspa con las letras PN)?  
Respuesta: **La proximidad de un paso a nivel.**

- ✔ La marca de paso a nivel indica la proximidad de un paso a nivel por una vía de ferrocarril o tranvía, en el que los vehículos deben ceder el paso cuando se aproxime un tren o tranvía. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `A-adv-0002` El desplazamiento lateral hacia el lado contrario al que indica la mano se advierte con el brazo doblado hacia arriba y la palma extendida. Con el brazo izquierdo, indica desplazamiento a la derecha. _(RGC 109.2.a)_
- ✘ `arc-0014` Camiones y furgones de más de 3.500 kg y conjuntos de más de 7 m circulan normalmente por el carril más a la derecha y pueden utilizar el inmediato. _(RGC 31.2)_

## B2-mv-0037

¿Qué indica esta marca?  
Respuesta: **El comienzo de un carril reservado a determinados vehículos, como autobuses o taxis.**

- ✔ La marca de comienzo de carril reservado indica el comienzo de un carril reservado a determinados vehículos, como autobuses, taxis o ciclos. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `def-0002` Los que conducen a pie un ciclo o un ciclomotor de dos ruedas tienen la consideración de peatones. _(LSV Anexo I.4)_
- ✘ `A-par-0012` Queda prohibido parar en autopistas y autovías, salvo en las zonas habilitadas para ello. _(RGC 94.1.g)_

## B2-mv-0038

¿Puede entrar con su vehículo en una zona marcada con franjas oblicuas paralelas enmarcadas por una línea continua (cebreado)?  
Respuesta: **No; solo pueden entrar los obligados a circular por el arcén.**

- ✔ El cebreado significa que ningún conductor debe entrar con su vehículo o animal en esa zona, excepto los obligados a circular por el arcén. _(RGC 147.2.d))_
- ✘ `B2-mv-0023` Las líneas de borde de calzada delimitan el borde de la calzada; que sean continuas o discontinuas no conlleva diferencia respecto al uso del arcén reglamentariamente establecido. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.1)_
- ✘ `bmp-0005` Negarse a las pruebas legalmente establecidas de alcohol y drogas es delito, con prisión de seis meses a un año y privación del derecho a conducir de más de uno y hasta cuatro años. _(CP 383)_

## B2-mv-0039

¿Qué indica una línea amarilla continua pintada junto al bordillo?  
Respuesta: **Prohibición de parar y de estacionar a lo largo de toda su longitud en ese lado de la calzada.**

- ✔ La marca longitudinal continua amarilla indica la prohibición de la parada y del estacionamiento a lo largo de toda su longitud en el lado de la calzada donde está situada. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `B1-sen-0037` La luz amarilla no intermitente obliga a detenerse como ante la luz roja fija, salvo que no sea posible con seguridad suficiente. _(RGC Anexo I.4.2.c)_
- ✘ `A-par-0010` Queda prohibido parar en zonas señalizadas para uso exclusivo de minusválidos; en todos los lugares donde está prohibida la parada también lo está el estacionamiento. _(RGC 94.1.j)_

## B2-mv-0041

¿Qué indica una marca amarilla en zigzag junto al bordillo?  
Respuesta: **Que el estacionamiento está prohibido por estar ese lugar reservado a un uso especial, como una parada de autobuses o la carga y descarga.**

- ✔ La marca amarilla en zigzag indica el lugar en que el estacionamiento está prohibido a los vehículos en general por estar reservado a un uso especial que no implique larga permanencia, como paradas de autobús o carga y descarga. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `A-dir-0007` Si por las dimensiones del vehículo u otras circunstancias no es posible girar con estricta sujeción a las normas, el conductor debe adoptar las precauciones necesarias para evitar todo peligro. _(RGC 76.1)_
- ✘ `C-luc-0012` Durante el día deben llevar encendida la luz de cruce todos los vehículos que circulen por un carril reversible, por un carril adicional circunstancial o por un carril habilitado en sentido contrario al habitual. _(RGC 104.b)_

## B2-mv-0042

Una intersección tiene pintada una cuadrícula amarilla. El semáforo está en verde, pero hay retención a la salida. ¿Qué debe hacer?  
Respuesta: **No entrar en la intersección si previsiblemente va a quedar detenido obstruyendo la circulación transversal.**

- ✔ La cuadrícula recuerda la prohibición de penetrar en una intersección, aun con semáforo que lo permita o con prioridad, si previsiblemente se va a quedar detenido impidiendo u obstruyendo la circulación transversal. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `C-luc-0010` Todo vehículo inmovilizado de noche en calzada o arcén debe tener encendidas las luces de posición y, en su caso, las de gálibo. Además, en autopista o autovía o con visibilidad reducida debe usar la luz de emergencia (art. 109.2.c). _(RGC 105.1)_
- ✘ `B1-sen-0036` La luz amarilla fija obliga a detenerse como si fuera roja, salvo que el vehículo esté tan cerca que no pueda detenerse antes del semáforo en condiciones de seguridad suficientes. _(RGC Anexo I.4.2.c)_

## B2-mv-0043

¿Qué indica un damero de cuadrados blancos y rojos pintado en la calzada?  
Respuesta: **El lugar donde empieza una zona de frenado de emergencia, en la que está prohibido parar y estacionar.**

- ✔ La marca de acceso a un lecho de frenado es un damero de cuadrados blancos y rojos que indica dónde empieza una zona de frenado de emergencia, prohibiendo la parada, el estacionamiento o el uso de esa superficie con otros fines. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `B2-sen-0006` Las prohibiciones de las señales de reglamentación rigen a partir de la sección transversal donde estén colocadas, salvo que un panel complementario debajo indique la distancia a la sección donde empiezan a regir. _(RGC 145.4)_
- ✘ `A-adel-0016` La excepción del artículo 88.2 incluye a los vehículos especiales agrícolas y sus conjuntos (además de ciclos, ciclomotores, VMP, peatones, animales y vehículos de tracción animal), pero no a turismos ni camiones. _(RGC 88.2)_

## B2-mv-0044

¿Para qué sirven estas marcas en forma de galón (punta de flecha) pintadas en el carril?  
Respuesta: **Como referencia para mantener la separación mínima con el vehículo que le precede.**

- ✔ La marca de separación de seguridad entre vehículos sirve como referencia para mantener la separación mínima con el vehículo precedente en túneles, secciones especiales y tramos con mayor riesgo de alcance. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `E-ent-0001` Antes de entrar en la curva hay que reducir la velocidad o frenar si es necesario; dentro, no acelerar ni frenar bruscamente, y a la salida aumentar poco a poco. _(MANUAL_DGT Tema 14, Pasos para tomar bien una curva (p. 343))_
- ✘ `D-dis-0001` La distancia de detención es el espacio recorrido desde que se detecta el obstáculo hasta que el vehículo se para por completo: la suma de la distancia de reacción y la de frenado. _(MANUAL_DGT Tema 10, Distancia de detención (pág. 263))_

## B2-mv-0045

En un espacio avanza-motos o avanza-bici delante de un semáforo, cuando el semáforo está en rojo, ¿quién puede ocupar ese espacio?  
Respuesta: **Solo determinados vehículos, como ciclos, vehículos de movilidad personal, motocicletas o ciclomotores.**

- ✔ El avanza-bici o avanza-motos es un espacio anterior a la intersección o paso de peatones regulado por semáforo que, con el semáforo en rojo, solo pueden ocupar determinados vehículos como ciclos, VMP, motocicletas o ciclomotores. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `A-adel-0012` Está prohibido adelantar en curvas y cambios de rasante de visibilidad reducida, salvo que los dos sentidos estén claramente delimitados y la maniobra pueda hacerse sin invadir la zona del sentido contrario. _(RGC 87.1.a)_
- ✘ `A-adel-0008` Los vehículos pesados o de grandes dimensiones que no puedan ceñirse por completo a la derecha indican al que se acerca que puede adelantar con el brazo o, si no lo creen conveniente, con el intermitente derecho. _(RGC 86.1)_

## B2-mv-0046

¿Qué advierten las marcas llamadas 'dientes de dragón'?  
Respuesta: **La aproximación a una travesía o vía urbana en la que debe reducirse sensiblemente la velocidad.**

- ✔ Los dientes de dragón advierten de la aproximación a una travesía o vía urbana en la que debe reducirse la velocidad sensiblemente y extremar la precaución. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `arc-0007` Los vehículos especiales con MMA no superior a 3.500 kg deben circular por el arcén de su derecha si es transitable y suficiente. _(RGC 36.1)_
- ✘ `arc-0013` Con nieve, en autopistas y autovías está prohibido adelantar y es obligatorio circular por el carril más a la derecha. _(RGC 32.2)_

## B2-mv-0047

Las líneas de borde quebradas (en zigzag blanco a los lados del carril), ¿de qué advierten?  
Respuesta: **De la aproximación a un paso para peatones o para ciclistas.**

- ✔ Las líneas de borde quebradas advierten de la aproximación a un paso para peatones o para ciclistas, con la necesidad de disminuir la velocidad y aumentar la atención. _(RGC Anexo I.5.2 (Catálogo de marcas viales) 4.7)_
- ✘ `res-cesp-0002` Si solo dispone de un carril en su sentido, debe ir entre 60 y 80 km/h y con luz de cruce. Si dispone de más de uno, se aplican los límites normales. _(RGC 41.1)_
- ✘ `B1-sen-0005` El orden es: agentes; señalización y balizamiento circunstancial; semáforos; señales verticales; marcas viales. _(RGC 133.1.b)_

## C-luc-0001

¿Qué vehículos deben llevar encendido, además de las luces de posición, el alumbrado de gálibo cuando es obligatorio usar el alumbrado?  
Respuesta: **Los que tengan una anchura superior a 2,10 metros.**

- ✔ Las luces de gálibo son obligatorias, junto con las de posición, si la anchura del vehículo excede de 2,10 metros. _(RGC 99.1)_
- ✘ `C-luc-0006` La misma precaución que con los vehículos de frente se guarda con los que circulan en el mismo sentido y pueden ser deslumbrados por el retrovisor. _(RGC 102.2)_
- ✘ `C-luc-0002` El Reglamento define la vía insuficientemente iluminada con dos referencias: matrícula ilegible a 10 metros o vehículo oscuro no distinguible a 50 metros. _(RGC 100.3)_

## C-luc-0002

Se considera vía insuficientemente iluminada aquella en la que, con vista normal, en algún punto de su calzada...  
Respuesta: **no pueda leerse la placa de matrícula a 10 metros o no se distinga un vehículo pintado de oscuro a 50 metros.**

- ✔ El Reglamento define la vía insuficientemente iluminada con dos referencias: matrícula ilegible a 10 metros o vehículo oscuro no distinguible a 50 metros. _(RGC 100.3)_
- ✘ `C-luc-0016` La antiniebla trasera solo debe encenderse con condiciones especialmente desfavorables: niebla espesa, lluvia muy intensa, fuerte nevada o nubes densas de polvo o humo. _(RGC 106.2)_
- ✘ `C-luc-0007` El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_

## C-luc-0003

De noche circula a 80 km/h por una carretera fuera de poblado insuficientemente iluminada y no hay ningún usuario al que pueda deslumbrar. ¿Qué alumbrado debe llevar encendido?  
Respuesta: **El de largo alcance o carretera.**

- ✔ La luz de largo alcance es obligatoria a más de 40 km/h, de noche, fuera de poblado y en vías insuficientemente iluminadas, salvo cuando haya que usar la de cruce (por ejemplo, para no deslumbrar). _(RGC 100.1)_
- ✘ `C-luc-0009` En vías urbanas que no sean travesías no es obligatorio dejar las luces de posición si la iluminación permite a otros usuarios distinguir el vehículo a distancia suficiente. _(RGC 105.3)_
- ✘ `C-luc-0012` Durante el día deben llevar encendida la luz de cruce todos los vehículos que circulen por un carril reversible, por un carril adicional circunstancial o por un carril habilitado en sentido contrario al habitual. _(RGC 104.b)_

## C-luc-0004

¿Está permitido llevar encendida la luz de largo alcance o de carretera con el vehículo estacionado?  
Respuesta: **No, está prohibido siempre que el vehículo esté parado o estacionado.**

- ✔ El Reglamento prohíbe utilizar la luz de largo alcance siempre que el vehículo se encuentre parado o estacionado. _(RGC 100.2)_
- ✘ `C-luc-0018` Las advertencias con el brazo, si son perceptibles y correctas, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_
- ✘ `C-luc-0016` La antiniebla trasera solo debe encenderse con condiciones especialmente desfavorables: niebla espesa, lluvia muy intensa, fuerte nevada o nubes densas de polvo o humo. _(RGC 106.2)_

## C-luc-0005

Circula de noche con la luz de largo alcance. ¿Cuándo debe sustituirla por la de corto alcance o cruce?  
Respuesta: **Tan pronto como aprecie la posibilidad de deslumbrar a otros usuarios, aunque el que viene de frente no la cambie.**

- ✔ La luz de carretera debe sustituirse por la de cruce en cuanto exista posibilidad de deslumbrar, especialmente a quienes circulan en sentido contrario, aunque estos no cumplan la norma. _(RGC 102.1)_
- ✘ `C-luc-0016` La antiniebla trasera solo debe encenderse con condiciones especialmente desfavorables: niebla espesa, lluvia muy intensa, fuerte nevada o nubes densas de polvo o humo. _(RGC 106.2)_
- ✘ `C-luc-0002` El Reglamento define la vía insuficientemente iluminada con dos referencias: matrícula ilegible a 10 metros o vehículo oscuro no distinguible a 50 metros. _(RGC 100.3)_

## C-luc-0006

Circula con la luz de largo alcance detrás de otro vehículo que va en su mismo sentido. ¿Debe cambiar a la luz de cruce?  
Respuesta: **Sí, si su conductor puede ser deslumbrado a través del espejo retrovisor.**

- ✔ La misma precaución que con los vehículos de frente se guarda con los que circulan en el mismo sentido y pueden ser deslumbrados por el retrovisor. _(RGC 102.2)_
- ✘ `C-luc-0016` La antiniebla trasera solo debe encenderse con condiciones especialmente desfavorables: niebla espesa, lluvia muy intensa, fuerte nevada o nubes densas de polvo o humo. _(RGC 106.2)_
- ✘ `C-luc-0002` El Reglamento define la vía insuficientemente iluminada con dos referencias: matrícula ilegible a 10 metros o vehículo oscuro no distinguible a 50 metros. _(RGC 100.3)_

## C-luc-0007

Si sufre un deslumbramiento mientras conduce, ¿qué debe hacer?  
Respuesta: **Reducir la velocidad lo necesario, incluso hasta detenerse por completo.**

- ✔ El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_
- ✘ `C-luc-0001` Las luces de gálibo son obligatorias, junto con las de posición, si la anchura del vehículo excede de 2,10 metros. _(RGC 99.1)_
- ✘ `C-luc-0017` La niebla espesa es una de las condiciones especialmente desfavorables en las que debe llevarse encendida la antiniebla trasera. _(RGC 106.2)_

## C-luc-0008

De noche deja su turismo estacionado en línea en la calzada de una travesía insuficientemente iluminada. ¿Qué alumbrado debe dejar encendido?  
Respuesta: **Las luces de posición, que puede sustituir por las de estacionamiento.**

- ✔ En una travesía insuficientemente iluminada el vehículo parado o estacionado de noche debe llevar las luces de posición, sustituibles por las de estacionamiento o por las dos de posición del lado de la calzada si está en línea. _(RGC 105.2)_
- ✘ `C-luc-0007` El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_
- ✘ `C-luc-0016` La antiniebla trasera solo debe encenderse con condiciones especialmente desfavorables: niebla espesa, lluvia muy intensa, fuerte nevada o nubes densas de polvo o humo. _(RGC 106.2)_

## C-luc-0009

De noche estaciona en una calle urbana (que no es travesía) con buena iluminación, que permite a los demás distinguir su vehículo a distancia suficiente. ¿Debe dejar encendidas las luces de posición?  
Respuesta: **No es obligatorio.**

- ✔ En vías urbanas que no sean travesías no es obligatorio dejar las luces de posición si la iluminación permite a otros usuarios distinguir el vehículo a distancia suficiente. _(RGC 105.3)_
- ✘ `C-luc-0007` El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_
- ✘ `C-luc-0002` El Reglamento define la vía insuficientemente iluminada con dos referencias: matrícula ilegible a 10 metros o vehículo oscuro no distinguible a 50 metros. _(RGC 100.3)_

## C-luc-0010

Su vehículo queda inmovilizado por avería en el arcén de una carretera durante la noche. ¿Qué luces debe tener encendidas como mínimo?  
Respuesta: **Las de posición y, en su caso, las de gálibo.**

- ✔ Todo vehículo inmovilizado de noche en calzada o arcén debe tener encendidas las luces de posición y, en su caso, las de gálibo. Además, en autopista o autovía o con visibilidad reducida debe usar la luz de emergencia (art. 109.2.c). _(RGC 105.1)_
- ✘ `res-luc-0001` En túneles insuficientemente iluminados, a más de 40 km/h, hay que llevar la luz de carretera salvo que haya que usar la de cruce (por ejemplo, para no deslumbrar). En túneles suficientemente iluminados, la de cruce. _(RGC 100.1)_
- ✘ `C-luc-0012` Durante el día deben llevar encendida la luz de cruce todos los vehículos que circulen por un carril reversible, por un carril adicional circunstancial o por un carril habilitado en sentido contrario al habitual. _(RGC 104.b)_

## C-luc-0011

Cuando circula de noche con el alumbrado encendido, ¿qué placa de matrícula debe ir iluminada?  
Respuesta: **La placa posterior.**

- ✔ En las circunstancias en que es obligatorio el alumbrado, el vehículo debe llevar siempre iluminada la placa posterior de matrícula. _(RGC 103)_
- ✘ `C-luc-0006` La misma precaución que con los vehículos de frente se guarda con los que circulan en el mismo sentido y pueden ser deslumbrados por el retrovisor. _(RGC 102.2)_
- ✘ `C-luc-0002` El Reglamento define la vía insuficientemente iluminada con dos referencias: matrícula ilegible a 10 metros o vehículo oscuro no distinguible a 50 metros. _(RGC 100.3)_

## C-luc-0012

Circula de día por un carril reversible. ¿Qué alumbrado debe llevar encendido?  
Respuesta: **La luz de corto alcance o cruce.**

- ✔ Durante el día deben llevar encendida la luz de cruce todos los vehículos que circulen por un carril reversible, por un carril adicional circunstancial o por un carril habilitado en sentido contrario al habitual. _(RGC 104.b)_
- ✘ `C-luc-0014` Cuando condiciones como la lluvia intensa disminuyen sensiblemente la visibilidad, es obligatorio el alumbrado: la antiniebla delantera o la luz de corto o largo alcance. _(RGC 106.2)_
- ✘ `C-luc-0007` El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_

## C-luc-0013

Las motocicletas, ¿deben llevar encendida durante el día la luz de corto alcance o cruce?  
Respuesta: **Sí, por cualquier vía.**

- ✔ Las motocicletas deben llevar encendida durante el día la luz de cruce cuando circulen por cualquier vía. _(RGC 104.a)_
- ✘ `C-luc-0011` En las circunstancias en que es obligatorio el alumbrado, el vehículo debe llevar siempre iluminada la placa posterior de matrícula. _(RGC 103)_
- ✘ `C-luc-0018` Las advertencias con el brazo, si son perceptibles y correctas, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_

## C-luc-0014

Durante el día empieza a llover de forma intensa y la visibilidad disminuye sensiblemente. ¿Qué alumbrado debe utilizar?  
Respuesta: **La luz antiniebla delantera o la luz de corto o largo alcance.**

- ✔ Cuando condiciones como la lluvia intensa disminuyen sensiblemente la visibilidad, es obligatorio el alumbrado: la antiniebla delantera o la luz de corto o largo alcance. _(RGC 106.2)_
- ✘ `C-luc-0019` De noche, en vías urbanas o interurbanas suficientemente iluminadas, se lleva el alumbrado de cruce además del de posición; nunca solo el de posición. _(RGC 101.1)_
- ✘ `C-luc-0001` Las luces de gálibo son obligatorias, junto con las de posición, si la anchura del vehículo excede de 2,10 metros. _(RGC 99.1)_

## C-luc-0015

Sin niebla, lluvia ni otras condiciones adversas, ¿en qué tramos se permite utilizar la luz antiniebla delantera?  
Respuesta: **En vías estrechas con muchas curvas señalizadas, con calzada de 6,50 metros de anchura o inferior.**

- ✔ Aparte de las condiciones que disminuyen la visibilidad, la antiniebla delantera solo puede usarse en tramos de vías estrechas (calzada de 6,50 m o menos) señalizados con sucesión de curvas. _(RGC 106.2)_
- ✘ `C-luc-0012` Durante el día deben llevar encendida la luz de cruce todos los vehículos que circulen por un carril reversible, por un carril adicional circunstancial o por un carril habilitado en sentido contrario al habitual. _(RGC 104.b)_
- ✘ `C-luc-0009` En vías urbanas que no sean travesías no es obligatorio dejar las luces de posición si la iluminación permite a otros usuarios distinguir el vehículo a distancia suficiente. _(RGC 105.3)_

## C-luc-0016

¿En cuál de estas situaciones debe llevarse encendida la luz antiniebla trasera?  
Respuesta: **Con lluvia muy intensa.**

- ✔ La antiniebla trasera solo debe encenderse con condiciones especialmente desfavorables: niebla espesa, lluvia muy intensa, fuerte nevada o nubes densas de polvo o humo. _(RGC 106.2)_
- ✘ `C-luc-0001` Las luces de gálibo son obligatorias, junto con las de posición, si la anchura del vehículo excede de 2,10 metros. _(RGC 99.1)_
- ✘ `res-luc-0001` En túneles insuficientemente iluminados, a más de 40 km/h, hay que llevar la luz de carretera salvo que haya que usar la de cruce (por ejemplo, para no deslumbrar). En túneles suficientemente iluminados, la de cruce. _(RGC 100.1)_

## C-luc-0017

Circula con niebla espesa. ¿Debe llevar encendida la luz antiniebla trasera?  
Respuesta: **Sí.**

- ✔ La niebla espesa es una de las condiciones especialmente desfavorables en las que debe llevarse encendida la antiniebla trasera. _(RGC 106.2)_
- ✘ `C-luc-0001` Las luces de gálibo son obligatorias, junto con las de posición, si la anchura del vehículo excede de 2,10 metros. _(RGC 99.1)_
- ✘ `C-luc-0007` El conductor deslumbrado debe reducir la velocidad lo necesario, incluso hasta la detención total, para no alcanzar a vehículos o peatones que vayan en su mismo sentido. _(RGC 102.3)_

## C-luc-0018

Un conductor indica una maniobra con el brazo y, a la vez, con el intermitente en sentido contrario. ¿Qué indicación prevalece?  
Respuesta: **La realizada con el brazo.**

- ✔ Las advertencias con el brazo, si son perceptibles y correctas, anulan cualquier otra indicación óptica que las contradiga. _(RGC 108.2)_
- ✘ `C-luc-0001` Las luces de gálibo son obligatorias, junto con las de posición, si la anchura del vehículo excede de 2,10 metros. _(RGC 99.1)_
- ✘ `C-luc-0017` La niebla espesa es una de las condiciones especialmente desfavorables en las que debe llevarse encendida la antiniebla trasera. _(RGC 106.2)_

## C-luc-0019

De noche circula por una vía urbana suficientemente iluminada. ¿Qué alumbrado debe llevar?  
Respuesta: **El de posición y el de corto alcance o cruce.**

- ✔ De noche, en vías urbanas o interurbanas suficientemente iluminadas, se lleva el alumbrado de cruce además del de posición; nunca solo el de posición. _(RGC 101.1)_
- ✘ `C-luc-0013` Las motocicletas deben llevar encendida durante el día la luz de cruce cuando circulen por cualquier vía. _(RGC 104.a)_
- ✘ `C-luc-0014` Cuando condiciones como la lluvia intensa disminuyen sensiblemente la visibilidad, es obligatorio el alumbrado: la antiniebla delantera o la luz de corto o largo alcance. _(RGC 106.2)_

## C-per-0001

Un turismo tiene 5 plazas autorizadas. ¿Cuántas personas puede transportar, incluido el conductor?  
Respuesta: **Cinco como máximo.**

- ✔ El número de personas transportadas no puede ser superior al de plazas autorizadas. _(RGC 9.1)_
- ✘ `C-per-0015` En bicicletas y ciclos se puede transportar carga y pasajeros si el conductor es mayor de edad y se cumplen los requisitos técnicos. _(RGC 154.1)_
- ✘ `C-car-0011` En los vehículos no destinados exclusivamente al transporte de mercancías la carga solo puede sobresalir por la parte posterior. _(RGC 15.3)_

## C-per-0002

¿Qué ocupantes de un turismo deben utilizar un sistema de retención infantil?  
Respuesta: **Los menores de edad de estatura igual o inferior a 135 centímetros.**

- ✔ El criterio es la estatura: los menores de edad que midan 135 cm o menos deben usar sistemas de retención infantil. _(RGC 117.1)_
- ✘ `E-seg-0002` El reposacabezas, igual que el cinturón y el airbag, es un elemento de seguridad pasiva: reduce los daños cuando el accidente ya se ha producido. _(MANUAL_DGT Tema 5, Seguridad pasiva (p. 88))_
- ✘ `E-pas-0012` El reposacabezas es un elemento de seguridad pasiva que protege el cuello y las cervicales en un golpe brusco. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_

## C-per-0003

En un turismo, un menor de 125 cm de estatura, ¿puede viajar en el asiento delantero?  
Respuesta: **Sí, de forma excepcional, por ejemplo si todos los asientos traseros ya están ocupados por menores de esa estatura, y usando su sistema de retención infantil.**

- ✔ Estos menores deben ir detrás, pero excepcionalmente pueden ir delante con su sistema de retención homologado si no hay asientos traseros, si todos están ocupados por menores de 135 cm o si no caben todos los sistemas de retención. _(RGC 117.3)_
- ✘ `C-per-0013` Para ciclistas el casco es obligatorio en vías interurbanas y, en todo tipo de vías, para los menores de dieciséis años. Los ciclistas profesionales también deben llevarlo en vías urbanas y travesías. _(RGC 118.2)_
- ✘ `E-pas-0004` La Ley de Tráfico califica como infracción grave no usar, o no usar de forma adecuada, el cinturón, los sistemas de retención infantil, el casco y demás elementos de protección obligatorios. _(LSV 76.h)_

## C-per-0004

Un bebé viaja en el asiento delantero en un sistema de retención orientado hacia atrás. El vehículo dispone de airbag frontal para ese asiento. ¿Es correcto?  
Respuesta: **Solo si el airbag ha sido desactivado.**

- ✔ En asientos delanteros con airbag frontal solo pueden usarse sistemas de retención orientados hacia atrás si el airbag ha sido desactivado. _(RGC 117.3)_
- ✘ `D-pos-0002` El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_
- ✘ `E-pas-0002` La cinta torácica debe pasar por la clavícula, entre hombro y cuello, y bajar por el centro del pecho. Sobre el cuello puede causar lesiones graves y sobre el hombro puede resbalar. _(MANUAL_DGT Tema 5, ¿Cómo se abrocha el cinturón de seguridad? (p. 113))_

## C-per-0005

Su vehículo no dispone de asientos traseros. ¿Puede llevar a un niño de 110 cm de estatura?  
Respuesta: **Sí, en el asiento delantero, utilizando un sistema de retención infantil homologado adaptado a su talla y peso.**

- ✔ Cuando el vehículo no dispone de asientos traseros, el menor puede ir delante, siempre con un sistema de retención homologado adaptado a su talla y peso. _(RGC 117.3)_
- ✘ `D-pos-0001` El efecto submarino se produce cuando en un accidente el cuerpo se desliza por debajo del cinturón; ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_
- ✘ `E-pas-0017` Los conductores de vehículos de movilidad personal están obligados a utilizar casco homologado o certificado. _(RGC 118.3)_

## C-per-0006

Los conductores y pasajeros de vehículos en servicio de urgencia, ¿pueden circular sin cinturón de seguridad?  
Respuesta: **Sí, cuando circulen en poblado, pero nunca por autopistas, autovías o carreteras convencionales.**

- ✔ La exención para vehículos en servicio de urgencia solo alcanza a la circulación en poblado. (Los pasajeros que asisten al paciente en ambulancias asistenciales tienen una exención propia.) _(RGC 119.2)_
- ✘ `C-per-0009` Conductor y ocupantes deben usar el cinturón en vías urbanas e interurbanas. Las exenciones vigentes del art. 119 (marcha atrás o estacionamiento, certificado médico y urgencias en poblado) no incluyen a los taxistas. _(RGC 117.1)_
- ✘ `D-pos-0001` El efecto submarino se produce cuando en un accidente el cuerpo se desliza por debajo del cinturón; ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_

## C-per-0007

¿Puede el conductor circular sin el cinturón abrochado mientras realiza la maniobra de marcha atrás?  
Respuesta: **Sí, al efectuar la maniobra de marcha atrás o de estacionamiento.**

- ✔ Los conductores pueden circular sin cinturón al efectuar la maniobra de marcha atrás o de estacionamiento. _(RGC 119.1.a)_
- ✘ `E-seg-0002` El reposacabezas, igual que el cinturón y el airbag, es un elemento de seguridad pasiva: reduce los daños cuando el accidente ya se ha producido. _(MANUAL_DGT Tema 5, Seguridad pasiva (p. 88))_
- ✘ `E-pas-0010` El manual de la DGT recomienda que la distancia entre la cabeza y el reposacabezas sea de cuatro centímetros o menos. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_

## C-per-0008

Una mujer embarazada, ¿está exenta de usar el cinturón de seguridad?  
Respuesta: **No, salvo que disponga de un certificado de exención por razones médicas graves.**

- ✔ El embarazo no exime por sí solo. Solo están exentas las personas con certificado de exención por razones médicas graves o con discapacidad. _(RGC 119.1.b)_
- ✘ `C-per-0009` Conductor y ocupantes deben usar el cinturón en vías urbanas e interurbanas. Las exenciones vigentes del art. 119 (marcha atrás o estacionamiento, certificado médico y urgencias en poblado) no incluyen a los taxistas. _(RGC 117.1)_
- ✘ `E-pas-0003` La cinta abdominal va sobre los huesos de la cadera, por debajo del estómago; por encima puede causar lesiones internas graves. _(MANUAL_DGT Tema 5, ¿Cómo se abrocha el cinturón de seguridad? (p. 113))_

## C-per-0009

Un taxista que circula de servicio por una vía urbana, ¿está obligado a llevar abrochado el cinturón de seguridad?  
Respuesta: **Sí.**

- ✔ Conductor y ocupantes deben usar el cinturón en vías urbanas e interurbanas. Las exenciones vigentes del art. 119 (marcha atrás o estacionamiento, certificado médico y urgencias en poblado) no incluyen a los taxistas. _(RGC 117.1)_
- ✘ `C-per-0006` La exención para vehículos en servicio de urgencia solo alcanza a la circulación en poblado. (Los pasajeros que asisten al paciente en ambulancias asistenciales tienen una exención propia.) _(RGC 119.2)_
- ✘ `D-pos-0002` El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_

## C-per-0010

Como regla general, ¿qué edad debe tener una persona para viajar como pasajero en una motocicleta?  
Respuesta: **Más de 12 años.**

- ✔ Puede viajar un pasajero mayor de doce años, con casco homologado, a horcajadas y detrás del conductor, si así consta en el permiso o licencia de circulación. _(RGC 12.1)_
- ✘ `C-per-0015` En bicicletas y ciclos se puede transportar carga y pasajeros si el conductor es mayor de edad y se cumplen los requisitos técnicos. _(RGC 154.1)_
- ✘ `C-per-0001` El número de personas transportadas no puede ser superior al de plazas autorizadas. _(RGC 9.1)_

## C-per-0011

Un niño de 9 años, ¿puede viajar como pasajero en un ciclomotor?  
Respuesta: **Sí, si conduce su padre, madre, tutor o una persona mayor de edad autorizada por ellos, y lleva casco homologado.**

- ✔ Excepcionalmente, los mayores de siete años pueden ir en motocicleta o ciclomotor si conduce el padre, la madre, el tutor o una persona mayor de edad autorizada por ellos, con casco homologado. _(RGC 12.2)_
- ✘ `C-per-0014` Las bicicletas para una sola persona pueden llevar menores de hasta 22 kg capaces de sentarse solos en asientos adicionales que cumplan las especificaciones del Ministerio del Interior. _(RGC 154.2)_
- ✘ `C-per-0001` El número de personas transportadas no puede ser superior al de plazas autorizadas. _(RGC 9.1)_

## C-per-0012

¿Cuándo pueden el conductor y el pasajero de una motocicleta circular sin casco?  
Respuesta: **Cuando la moto cuente con estructura de autoprotección y cinturones, conste así en la tarjeta ITV y usen el cinturón.**

- ✔ Quedan exentos del casco (y de guantes y calzado cerrado) si el vehículo tiene estructura de autoprotección y cinturones, así consta en la tarjeta ITV, y usan el cinturón. _(RGC 118.1)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `E-pas-0001` En un accidente el chasis y la carrocería se deforman para proteger a los ocupantes, que así sufren menos daños. _(MANUAL_DGT Tema 5, El chasis y la carrocería (p. 106))_

## C-per-0013

Un ciclista de 30 años, que no circula por motivos profesionales, va en bicicleta por una vía urbana. ¿Está obligado a llevar casco?  
Respuesta: **No. El casco es obligatorio en vías interurbanas y, para los menores de 16 años, en todo tipo de vías.**

- ✔ Para ciclistas el casco es obligatorio en vías interurbanas y, en todo tipo de vías, para los menores de dieciséis años. Los ciclistas profesionales también deben llevarlo en vías urbanas y travesías. _(RGC 118.2)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `C-per-0006` La exención para vehículos en servicio de urgencia solo alcanza a la circulación en poblado. (Los pasajeros que asisten al paciente en ambulancias asistenciales tienen una exención propia.) _(RGC 119.2)_

## C-per-0014

En una bicicleta construida para una sola persona, se puede llevar a un menor en un asiento adicional que cumpla las especificaciones técnicas. ¿Hasta qué peso puede tener el menor?  
Respuesta: **Hasta 22 kg, si es capaz de sentarse por sí solo.**

- ✔ Las bicicletas para una sola persona pueden llevar menores de hasta 22 kg capaces de sentarse solos en asientos adicionales que cumplan las especificaciones del Ministerio del Interior. _(RGC 154.2)_
- ✘ `C-per-0001` El número de personas transportadas no puede ser superior al de plazas autorizadas. _(RGC 9.1)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_

## C-per-0015

Para transportar un pasajero en una bicicleta, ¿qué requisito debe cumplir su conductor?  
Respuesta: **Ser mayor de edad.**

- ✔ En bicicletas y ciclos se puede transportar carga y pasajeros si el conductor es mayor de edad y se cumplen los requisitos técnicos. _(RGC 154.1)_
- ✘ `C-per-0001` El número de personas transportadas no puede ser superior al de plazas autorizadas. _(RGC 9.1)_
- ✘ `C-car-0015` La carga que sobresale por detrás debe señalizarse siempre con la señal V-20; de noche o con visibilidad sensiblemente reducida se añade una luz roja. _(RGC 15.6)_

## C-car-0001

Una motocicleta arrastra un remolque. ¿Puede transportar personas en él?  
Respuesta: **No, en ningún caso.**

- ✔ Las motocicletas, vehículos de tres ruedas y ciclomotores que arrastran remolque no pueden transportar personas en el vehículo remolcado en ningún caso. _(RGC 12.3.c)_
- ✘ `C-car-0008` En vehículos exclusivamente de mercancías de más de 5 m, la carga indivisible puede sobresalir 2 m por delante y 3 m por detrás. _(RGC 15.2.a.1º)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_

## C-car-0002

Un ciclomotor que arrastra un remolque, ¿cuándo puede circular?  
Respuesta: **Solo de día y en condiciones que no disminuyan la visibilidad.**

- ✔ Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar remolque solo de día y sin condiciones que disminuyan la visibilidad (entre otras condiciones). _(RGC 12.3.a)_
- ✘ `C-car-0015` La carga que sobresale por detrás debe señalizarse siempre con la señal V-20; de noche o con visibilidad sensiblemente reducida se añade una luz roja. _(RGC 15.6)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_

## C-car-0003

Lleva toda la carga colocada en un mismo lado de la caja de su furgoneta, bien sujeta. ¿Es correcto?  
Respuesta: **No, si compromete la estabilidad del vehículo.**

- ✔ La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_
- ✘ `C-car-0010` En vehículos no destinados exclusivamente a mercancías, la carga puede sobresalir por detrás hasta el 10 % de su longitud, o el 15 % si es indivisible. _(RGC 15.3)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_

## C-car-0004

Cuando sea inexcusable descargar mercancía en la vía, ¿dónde puede depositarla?  
Respuesta: **En ninguno de estos lugares: está prohibido depositarla en la calzada, en el arcén y en las zonas peatonales.**

- ✔ Las operaciones deben hacerse sin depositar la mercancía en la calzada, el arcén ni las zonas peatonales. _(RGC 16.c)_
- ✘ `C-car-0010` En vehículos no destinados exclusivamente a mercancías, la carga puede sobresalir por detrás hasta el 10 % de su longitud, o el 15 % si es indivisible. _(RGC 15.3)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_

## C-car-0005

Cuando sea inexcusable cargar o descargar en la vía, ¿por qué lado del vehículo se hará, en lo posible?  
Respuesta: **Por el lado más próximo al borde de la calzada.**

- ✔ La carga y descarga se efectuará, en lo posible, por el lado del vehículo más próximo al borde de la calzada. _(RGC 16.b)_
- ✘ `C-car-0013` En vehículos de anchura inferior a 1 m la carga no puede sobresalir por delante ni más de 0,25 m por detrás. _(RGC 15.4)_
- ✘ `C-car-0001` Las motocicletas, vehículos de tres ruedas y ciclomotores que arrastran remolque no pueden transportar personas en el vehículo remolcado en ningún caso. _(RGC 12.3.c)_

## C-car-0006

Como norma general, ¿puede la carga sobresalir de la proyección en planta del vehículo?  
Respuesta: **No, salvo en los casos y condiciones previstos en el Reglamento.**

- ✔ La regla general es que la carga no sobresalga de la proyección en planta, con las excepciones del propio artículo 15. _(RGC 15.1)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_

## C-car-0007

Una furgoneta destinada exclusivamente al transporte de mercancías, de 4 metros de longitud, lleva un tubo de longitud indivisible. ¿Cuánto puede sobresalir como máximo por delante?  
Respuesta: **Un tercio de la longitud del vehículo.**

- ✔ En vehículos exclusivamente de mercancías de longitud igual o inferior a 5 m, la carga indivisible puede sobresalir el tercio de la longitud del vehículo por cada extremo. _(RGC 15.2.a.2º)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_

## C-car-0008

Un camión de 8 metros de longitud, destinado exclusivamente al transporte de mercancías, transporta una viga indivisible. ¿Cuánto puede sobresalir la carga como máximo por la parte posterior?  
Respuesta: **3 metros.**

- ✔ En vehículos exclusivamente de mercancías de más de 5 m, la carga indivisible puede sobresalir 2 m por delante y 3 m por detrás. _(RGC 15.2.a.1º)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0004` Las operaciones deben hacerse sin depositar la mercancía en la calzada, el arcén ni las zonas peatonales. _(RGC 16.c)_

## C-car-0009

En un autobús, ¿cuánto puede sobresalir la carga por su parte delantera?  
Respuesta: **Nada.**

- ✔ En los vehículos no destinados exclusivamente al transporte de mercancías la carga solo puede sobresalir por la parte posterior (10 %, o 15 % si es indivisible). _(RGC 15.3)_
- ✘ `C-car-0005` La carga y descarga se efectuará, en lo posible, por el lado del vehículo más próximo al borde de la calzada. _(RGC 16.b)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_

## C-car-0010

En un turismo, ¿cuánto puede sobresalir por detrás una carga indivisible?  
Respuesta: **Hasta un 15 % de la longitud del vehículo.**

- ✔ En vehículos no destinados exclusivamente a mercancías, la carga puede sobresalir por detrás hasta el 10 % de su longitud, o el 15 % si es indivisible. _(RGC 15.3)_
- ✘ `C-car-0005` La carga y descarga se efectuará, en lo posible, por el lado del vehículo más próximo al borde de la calzada. _(RGC 16.b)_
- ✘ `C-car-0001` Las motocicletas, vehículos de tres ruedas y ciclomotores que arrastran remolque no pueden transportar personas en el vehículo remolcado en ningún caso. _(RGC 12.3.c)_

## C-car-0011

En un turismo, ¿puede sobresalir la carga por los laterales?  
Respuesta: **No.**

- ✔ En los vehículos no destinados exclusivamente al transporte de mercancías la carga solo puede sobresalir por la parte posterior. _(RGC 15.3)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_
- ✘ `C-car-0004` Las operaciones deben hacerse sin depositar la mercancía en la calzada, el arcén ni las zonas peatonales. _(RGC 16.c)_

## C-car-0012

Un camión transporta una carga indivisible cuya dimensión menor es superior al ancho del vehículo. ¿Cuánto puede sobresalir por cada lateral?  
Respuesta: **Hasta 0,40 metros por cada lateral, siempre que el ancho total no supere 2,55 metros.**

- ✔ En vehículos exclusivamente de mercancías, si la dimensión menor de la carga indivisible supera el ancho del vehículo, puede sobresalir 0,40 m por cada lateral con un ancho total máximo de 2,55 m. _(RGC 15.2.b)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0002` Motocicletas, vehículos de tres ruedas y ciclomotores pueden arrastrar remolque solo de día y sin condiciones que disminuyan la visibilidad (entre otras condiciones). _(RGC 12.3.a)_

## C-car-0013

En una motocicleta de anchura inferior a 1 metro, ¿cuánto puede sobresalir la carga por la parte posterior?  
Respuesta: **0,25 metros como máximo.**

- ✔ En vehículos de anchura inferior a 1 m la carga no puede sobresalir por delante ni más de 0,25 m por detrás. _(RGC 15.4)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0004` Las operaciones deben hacerse sin depositar la mercancía en la calzada, el arcén ni las zonas peatonales. _(RGC 16.c)_

## C-car-0014

En un vehículo de anchura inferior a 1 metro, ¿cuánto puede sobresalir lateralmente la carga?  
Respuesta: **No más de 0,50 metros a cada lado de su eje longitudinal.**

- ✔ En vehículos de anchura inferior a 1 m la carga no debe sobresalir lateralmente más de 0,50 m a cada lado de su eje longitudinal. _(RGC 15.4)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0003` La carga debe ir dispuesta y, si es necesario, sujeta de modo que no pueda caer, desplazarse peligrosamente ni comprometer la estabilidad del vehículo. _(RGC 14.1)_

## C-car-0015

La carga sobresale por detrás de su turismo, dentro de los límites permitidos. ¿Cómo debe señalizarla?  
Respuesta: **Con la señal V-20 en todo caso y, además, de noche o con visibilidad reducida, con una luz roja.**

- ✔ La carga que sobresale por detrás debe señalizarse siempre con la señal V-20; de noche o con visibilidad sensiblemente reducida se añade una luz roja. _(RGC 15.6)_
- ✘ `C-car-0005` La carga y descarga se efectuará, en lo posible, por el lado del vehículo más próximo al borde de la calzada. _(RGC 16.b)_
- ✘ `C-car-0001` Las motocicletas, vehículos de tres ruedas y ciclomotores que arrastran remolque no pueden transportar personas en el vehículo remolcado en ningún caso. _(RGC 12.3.c)_

## C-car-0016

De noche, ¿cómo debe señalizarse la carga que sobresale por delante del vehículo?  
Respuesta: **Con una luz blanca.**

- ✔ Entre la puesta y la salida del sol, si la carga sobresale por delante, se señaliza con luz blanca; si sobresale por detrás, con luz roja además de la V-20. _(RGC 15.6)_
- ✘ `res-car-0002` La altura máxima general de los vehículos, incluida la carga, es de 4 metros (los autobuses urbanos de clase I, 4,20 m). La anchura máxima general es de 2,55 m. _(RGV Anexo IX.3.1, tabla 3)_
- ✘ `C-car-0001` Las motocicletas, vehículos de tres ruedas y ciclomotores que arrastran remolque no pueden transportar personas en el vehículo remolcado en ningún caso. _(RGC 12.3.c)_

## C-car-0017

¿Qué indica esta señal colocada en la parte trasera de un vehículo?  
Respuesta: **Que la carga del vehículo sobresale posteriormente.**

- ✔ La señal V-20 (panel de franjas rojas y blancas) indica que la carga sobresale por detrás. _(RGV Anexo XI, V-20)_
- ✘ `B1-sen-0024` La bandera amarilla indica a los conductores y usuarios la necesidad de extremar la atención o la proximidad de un peligro. _(RGC Anexo I.1.2.c)_
- ✘ `arc-0015` En poblado, con al menos dos carriles delimitados para el mismo sentido, se puede usar el que mejor convenga al destino, sin ser un obstáculo. _(RGC 33)_

## C-sev-0001

¿Qué indica esta señal colocada en la parte posterior de un vehículo?  
Respuesta: **Que el vehículo, por construcción, no puede sobrepasar los 40 km/h.**

- ✔ La señal V-5 de vehículo lento indica que, por construcción, no puede superar los 40 km/h. _(RGV Anexo XI, V-5)_
- ✘ `cesp-0008` Los autobuses de más de 3.500 kg y los articulados pueden usarlo con independencia del número de ocupantes, en las condiciones fijadas para el tramo. _(RGC 35.2.a)_
- ✘ `A-est-0009` Se entienden por tramos de gran pendiente los que tienen una inclinación mínima del siete por ciento. _(RGC 63.1)_

## C-sev-0002

La señal V-6 de «vehículo largo» indica que el vehículo o conjunto de vehículos tiene una longitud superior a...  
Respuesta: **12 metros.**

- ✔ La V-6 indica que el vehículo o conjunto tiene una longitud superior a 12 metros. _(RGV Anexo XI, V-6)_
- ✘ `A-adv-0008` Las advertencias acústicas pueden hacerse para advertir, fuera de poblado, al conductor de otro vehículo el propósito de adelantarlo. _(RGC 110.2.b)_
- ✘ `A-ma-0003` Se prohíbe la maniobra de marcha atrás en autovías y autopistas. _(RGC 80.3)_

## C-sev-0003

¿Qué indica la placa con las letras «S.P.» (señal V-9) colocada junto a la matrícula?  
Respuesta: **Que el vehículo está dedicado a prestar servicios públicos.**

- ✔ La señal V-9 indica que el vehículo está dedicado a prestar servicios públicos. _(RGV Anexo XI, V-9)_
- ✘ `def-0004` La definición de ciclo incluye expresamente los ciclos de pedaleo asistido. _(LSV Anexo I.7)_
- ✘ `arc-0012` Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro de la vía, entre esos dos carriles. _(RGC 32.1)_

## C-sev-0004

¿Durante cuánto tiempo debe llevar la señal V-13 (L de conductor novel) quien obtiene por primera vez un permiso de conducción?  
Respuesta: **Un año.**

- ✔ Deben llevar la señal V-13 los vehículos cuyos conductores hayan obtenido por primera vez un permiso de conducción, durante el período de un año. _(RGV Anexo XI, V-13)_
- ✘ `res-def-0005` Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.d)_
- ✘ `C-doc-0006` La tarjeta de inspección técnica documenta las características técnicas esenciales del vehículo y en ella se hacen constar las reformas autorizadas. _(LSV 67.2)_

## C-sev-0005

¿Dónde debe colocarse la señal V-13 de conductor novel en un turismo?  
Respuesta: **En la parte posterior izquierda, en sitio visible.**

- ✔ La V-13 se coloca en la parte posterior izquierda del vehículo, en sitio visible (en motos basta con la parte posterior). _(RGV Anexo XI, V-13)_
- ✘ `C-doc-0007` Remolque ligero es aquel cuya masa máxima autorizada no excede de 750 kg (se excluyen los agrícolas). _(LSV Anexo I.21)_
- ✘ `res-perm-0002` El permiso AM se obtiene con 15 años cumplidos. El A1, con 16; el A2 y el B, con 18; el A, con 20. _(RGCOND 4.2 (tabla))_

## C-sev-0006

¿Qué dimensiones tiene la placa V-13 de conductor novel para un turismo?  
Respuesta: **150 mm de anchura y 195 mm de altura.**

- ✔ Para vehículos distintos de motocicletas, vehículos de tres ruedas, cuadriciclos y de movilidad reducida, la placa mide 150 mm de ancho por 195 mm de alto (100 x 130 mm es la medida para motocicletas). _(RGV Anexo XI, V-13)_
- ✘ `C-perm-0005` Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_
- ✘ `C-perm-0004` Con remolque de más de 750 kg, el B basta si el conjunto no supera 3.500 kg; la prueba adicional solo se exige si el conjunto excede de 3.500 kg (hasta 4.250 kg). _(RGCOND 5.5)_

## C-sev-0007

¿Qué indica el dispositivo luminoso V-16 colocado sobre un vehículo?  
Respuesta: **Que el vehículo ha quedado inmovilizado en la calzada o que su carga ha caído sobre ella.**

- ✔ La V-16 indica que el vehículo está inmovilizado en la calzada o que su carga ha caído sobre la misma. _(RGV Anexo XI, V-16)_
- ✘ `vel-0010` En las vías sin pavimentar el límite de velocidad máximo es de 30 km/h. _(RGC 48.1.f)_
- ✘ `def-0009` La tara es la masa sin personas ni carga, pero con la dotación completa de combustible, agua, lubricante, repuestos, herramientas y accesorios. _(LSV Anexo I.35)_

## C-doc-0001

En un turismo, ¿dónde debe colocarse el distintivo de la inspección técnica periódica (V-19)?  
Respuesta: **En el ángulo superior derecho del parabrisas, por su cara interior.**

- ✔ En vehículos con parabrisas, el distintivo de ITV se coloca en el ángulo superior derecho del parabrisas por su cara interior. _(RGV Anexo XI, V-19)_
- ✘ `res-def-0005` Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.d)_
- ✘ `C-doc-0008` En conjuntos con remolque de MMA igual o inferior a 750 kg se lleva la tarjeta de inspección técnica del remolque, y en la del automóvil debe constar que tiene un enganche compatible. _(RGV 26.1.c)_

## C-doc-0002

¿Qué indica el distintivo de inspección técnica periódica (V-19)?  
Respuesta: **Que el vehículo ha superado favorablemente la ITV periódica y la fecha en que debe pasar la próxima.**

- ✔ El distintivo V-19 indica que el vehículo ha superado favorablemente la ITV periódica y la fecha de la próxima inspección. _(RGV Anexo XI, V-19)_
- ✘ `C-doc-0003` El conductor debe llevar y exhibir el permiso de circulación (o autorización provisional) y la tarjeta de inspección técnica. _(RGV 26.1)_
- ✘ `res-itv-0004` Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_

## C-doc-0003

¿Qué documentos del vehículo debe llevar consigo el conductor de un turismo, según el Reglamento General de Vehículos?  
Respuesta: **El permiso de circulación y la tarjeta de inspección técnica.**

- ✔ El conductor debe llevar y exhibir el permiso de circulación (o autorización provisional) y la tarjeta de inspección técnica. _(RGV 26.1)_
- ✘ `res-itv-0004` Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_
- ✘ `res-seg-0001` El seguro obligatorio cubre los daños a terceros (personas y bienes), pero no las lesiones o el fallecimiento del conductor causante ni los daños de su propio vehículo. _(LRCSCVM 5.1)_

## C-doc-0004

En el caso de un ciclomotor, ¿qué documento sustituye a la tarjeta de inspección técnica?  
Respuesta: **El certificado de características técnicas.**

- ✔ Los ciclomotores llevan licencia de circulación y certificado de características técnicas en lugar de permiso de circulación y tarjeta ITV. _(RGV 26.1.b)_
- ✘ `res-itv-0002` N1 (mercancías hasta 3,5 t): exenta hasta 2 años, bienal de 2 a 6, anual de 6 a 10 y semestral a partir de 10 años. _(ITV 6.1 (tabla))_
- ✘ `res-seg-0001` El seguro obligatorio cubre los daños a terceros (personas y bienes), pero no las lesiones o el fallecimiento del conductor causante ni los daños de su propio vehículo. _(LRCSCVM 5.1)_

## C-doc-0005

¿Pueden llevarse en el vehículo fotocopias de su documentación en lugar de los originales?  
Respuesta: **Sí, si están debidamente cotejadas.**

- ✔ Los documentos deben ser originales, aunque pueden sustituirse por fotocopias debidamente cotejadas. _(RGV 26.2)_
- ✘ `res-itv-0002` N1 (mercancías hasta 3,5 t): exenta hasta 2 años, bienal de 2 a 6, anual de 6 a 10 y semestral a partir de 10 años. _(ITV 6.1 (tabla))_
- ✘ `C-doc-0007` Remolque ligero es aquel cuya masa máxima autorizada no excede de 750 kg (se excluyen los agrícolas). _(LSV Anexo I.21)_

## C-doc-0006

Usted instala en su vehículo una reforma que debe ser autorizada. ¿Dónde debe constar?  
Respuesta: **En la tarjeta de inspección técnica.**

- ✔ La tarjeta de inspección técnica documenta las características técnicas esenciales del vehículo y en ella se hacen constar las reformas autorizadas. _(LSV 67.2)_
- ✘ `res-itv-0004` Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_
- ✘ `C-doc-0001` En vehículos con parabrisas, el distintivo de ITV se coloca en el ángulo superior derecho del parabrisas por su cara interior. _(RGV Anexo XI, V-19)_

## C-doc-0007

Se considera remolque ligero aquel cuya masa máxima autorizada no excede de...  
Respuesta: **750 kg.**

- ✔ Remolque ligero es aquel cuya masa máxima autorizada no excede de 750 kg (se excluyen los agrícolas). _(LSV Anexo I.21)_
- ✘ `res-def-0005` Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.d)_
- ✘ `C-doc-0001` En vehículos con parabrisas, el distintivo de ITV se coloca en el ángulo superior derecho del parabrisas por su cara interior. _(RGV Anexo XI, V-19)_

## C-doc-0008

Un turismo arrastra un remolque de 600 kg de masa máxima autorizada. ¿Qué documento del remolque debe llevar el conductor?  
Respuesta: **La tarjeta de inspección técnica del remolque.**

- ✔ En conjuntos con remolque de MMA igual o inferior a 750 kg se lleva la tarjeta de inspección técnica del remolque, y en la del automóvil debe constar que tiene un enganche compatible. _(RGV 26.1.c)_
- ✘ `res-itv-0004` Los defectos graves inhabilitan para circular, salvo para ir al taller o regularizar la situación y volver a la ITV en un plazo no superior a dos meses. _(ITV 11.2)_
- ✘ `res-seg-0001` El seguro obligatorio cubre los daños a terceros (personas y bienes), pero no las lesiones o el fallecimiento del conductor causante ni los daños de su propio vehículo. _(LRCSCVM 5.1)_

## C-doc-0009

¿Es preciso matricular un remolque de 600 kg de masa máxima autorizada?  
Respuesta: **No; solo hay que matricular los remolques de masa máxima autorizada superior a 750 kg.**

- ✔ Deben matricularse los vehículos de motor y los remolques y semirremolques de MMA superior a 750 kg. _(RGV 25.1)_
- ✘ `C-doc-0008` En conjuntos con remolque de MMA igual o inferior a 750 kg se lleva la tarjeta de inspección técnica del remolque, y en la del automóvil debe constar que tiene un enganche compatible. _(RGV 26.1.c)_
- ✘ `res-def-0005` Las placas de ciclomotores y ciclos de motor tienen fondo amarillo retrorreflectante y caracteres negros. _(RGV Anexo XVIII.A.d)_

## C-perm-0001

¿Qué automóviles autoriza a conducir el permiso de la clase B?  
Respuesta: **Los de MMA no superior a 3.500 kg diseñados para transportar no más de 8 pasajeros además del conductor.**

- ✔ El B autoriza automóviles de MMA no superior a 3.500 kg para no más de ocho pasajeros además del conductor (nueve plazas en total). _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_
- ✘ `C-perm-0004` Con remolque de más de 750 kg, el B basta si el conjunto no supera 3.500 kg; la prueba adicional solo se exige si el conjunto excede de 3.500 kg (hasta 4.250 kg). _(RGCOND 5.5)_

## C-perm-0002

Un camión de reparto de 3.200 kg de masa máxima autorizada, con plazas para el conductor y dos pasajeros, ¿se puede conducir con permiso B?  
Respuesta: **Sí.**

- ✔ El permiso B autoriza cualquier automóvil de MMA no superior a 3.500 kg diseñado para no más de 8 pasajeros además del conductor, también si es un camión. _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0004` Con remolque de más de 750 kg, el B basta si el conjunto no supera 3.500 kg; la prueba adicional solo se exige si el conjunto excede de 3.500 kg (hasta 4.250 kg). _(RGCOND 5.5)_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_

## C-perm-0003

Con un turismo arrastra un remolque de 700 kg de MMA. ¿Qué permiso necesita?  
Respuesta: **El B.**

- ✔ Los automóviles que autoriza el B pueden llevar enganchado un remolque de MMA no superior a 750 kg sin más requisitos. _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0005` Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_

## C-perm-0004

Un turismo de 2.000 kg de MMA arrastra un remolque de 1.000 kg de MMA (conjunto de 3.000 kg). ¿Qué permiso necesita?  
Respuesta: **El B, sin requisitos adicionales.**

- ✔ Con remolque de más de 750 kg, el B basta si el conjunto no supera 3.500 kg; la prueba adicional solo se exige si el conjunto excede de 3.500 kg (hasta 4.250 kg). _(RGCOND 5.5)_
- ✘ `C-perm-0003` Los automóviles que autoriza el B pueden llevar enganchado un remolque de MMA no superior a 750 kg sin más requisitos. _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0017` A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_

## C-perm-0005

Un turismo de 3.000 kg de MMA arrastra un remolque de 1.000 kg de MMA (conjunto de 4.000 kg). ¿Qué necesita para conducirlo?  
Respuesta: **El permiso B, habiendo superado la prueba específica para estos conjuntos (código 96).**

- ✔ Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_
- ✘ `C-perm-0003` Los automóviles que autoriza el B pueden llevar enganchado un remolque de MMA no superior a 750 kg sin más requisitos. _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0010` Los vehículos especiales agrícolas autopropulsados pueden conducirse con el B (o licencia); si superan los límites de masa o dimensiones de los vehículos ordinarios o 45 km/h, se requiere el B en todo caso. _(RGCOND 5.9)_

## C-perm-0006

Un turismo de 3.500 kg de MMA arrastra un remolque de 1.000 kg de MMA (conjunto de 4.500 kg). ¿Qué permiso necesita?  
Respuesta: **El B+E.**

- ✔ Con el B (incluso con el código 96) el conjunto no puede superar 4.250 kg. El B+E autoriza un tractor de clase B con remolque de hasta 3.500 kg de MMA. _(RGCOND 4.2 (clase B+E))_
- ✘ `C-perm-0017` A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_
- ✘ `C-perm-0010` Los vehículos especiales agrícolas autopropulsados pueden conducirse con el B (o licencia); si superan los límites de masa o dimensiones de los vehículos ordinarios o 45 km/h, se requiere el B en todo caso. _(RGCOND 5.9)_

## C-perm-0007

Con un permiso B de más de tres años de antigüedad, ¿puede conducir en España una motocicleta de 125 cm³ de las que autoriza el A1?  
Respuesta: **Sí, dentro del territorio nacional.**

- ✔ Con el permiso B con antigüedad superior a tres años se pueden conducir en España las motocicletas que autoriza el A1. _(RGCOND 4.2 (clase B, excepciones))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_

## C-perm-0008

¿Autoriza el permiso de la clase B a conducir ciclomotores?  
Respuesta: **Sí.**

- ✔ Entre los vehículos que autoriza el permiso B están los ciclomotores. _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_

## C-perm-0009

¿Qué vehículos especiales no agrícolas se pueden conducir con el permiso B?  
Respuesta: **Los que no superen 40 km/h de velocidad máxima autorizada y tampoco superen 3.500 kg de MMA.**

- ✔ Para vehículos especiales no agrícolas basta el B si no superan 40 km/h ni 3.500 kg de MMA; si superan cualquiera de los límites se requiere el permiso correspondiente a su MMA. _(RGCOND 5.8)_
- ✘ `C-perm-0005` Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_
- ✘ `C-perm-0002` El permiso B autoriza cualquier automóvil de MMA no superior a 3.500 kg diseñado para no más de 8 pasajeros además del conductor, también si es un camión. _(RGCOND 4.2 (clase B))_

## C-perm-0010

Con el permiso B, ¿puede conducir un tractor agrícola de 4.500 kg de masa máxima autorizada?  
Respuesta: **Sí.**

- ✔ Los vehículos especiales agrícolas autopropulsados pueden conducirse con el B (o licencia); si superan los límites de masa o dimensiones de los vehículos ordinarios o 45 km/h, se requiere el B en todo caso. _(RGCOND 5.9)_
- ✘ `C-perm-0005` Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_
- ✘ `C-perm-0002` El permiso B autoriza cualquier automóvil de MMA no superior a 3.500 kg diseñado para no más de 8 pasajeros además del conductor, también si es un camión. _(RGCOND 4.2 (clase B))_

## C-perm-0011

¿Qué requisito de permiso previo se exige para obtener el permiso de la clase A?  
Respuesta: **Ser titular del permiso A2 con, al menos, dos años de antigüedad.**

- ✔ El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0014` El D1 autoriza automóviles para no más de dieciséis pasajeros además del conductor (17 plazas) y de longitud no superior a ocho metros. _(RGCOND 4.2 (clase D1))_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_

## C-perm-0012

El permiso de la clase A1 autoriza a conducir motocicletas con una cilindrada máxima de...  
Respuesta: **125 cm³.**

- ✔ El A1 autoriza motocicletas de hasta 125 cm³, 11 kW y 0,1 kW/kg, y triciclos de motor de hasta 15 kW. _(RGCOND 4.2 (clase A1))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0016` El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_

## C-perm-0013

El permiso C1 autoriza a conducir automóviles cuya masa máxima autorizada...  
Respuesta: **exceda de 3.500 kg y no sobrepase los 7.500 kg.**

- ✔ El C1 autoriza automóviles (distintos de los de D1 y D) de MMA superior a 3.500 kg y no superior a 7.500 kg, para no más de ocho pasajeros además del conductor. _(RGCOND 4.2 (clase C1))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0017` A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_

## C-perm-0014

El permiso D1 autoriza a conducir automóviles diseñados para el transporte de...  
Respuesta: **no más de 16 pasajeros además del conductor, con una longitud máxima de 8 metros.**

- ✔ El D1 autoriza automóviles para no más de dieciséis pasajeros además del conductor (17 plazas) y de longitud no superior a ocho metros. _(RGCOND 4.2 (clase D1))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0005` Si el remolque supera 750 kg y el conjunto excede de 3.500 kg sin pasar de 4.250 kg, se puede conducir con B tras superar la prueba o formación específica (código comunitario 96). _(RGCOND Anexo I (código 96))_

## C-perm-0015

¿Qué permiso se necesita para conducir un camión de la clase C con un remolque de más de 750 kg de MMA?  
Respuesta: **El C+E.**

- ✔ El C+E autoriza conjuntos formados por un tractor de la clase C y un remolque o semirremolque de MMA superior a 750 kg. _(RGCOND 4.2 (clase C+E))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_
- ✘ `C-perm-0017` A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_

## C-perm-0016

¿Cuál es el período de vigencia del permiso B de un titular de 40 años?  
Respuesta: **Diez años.**

- ✔ El permiso B tiene una vigencia de diez años hasta que el titular cumple 65 años, y de cinco a partir de esa edad. _(RGCOND 12.2)_
- ✘ `C-perm-0002` El permiso B autoriza cualquier automóvil de MMA no superior a 3.500 kg diseñado para no más de 8 pasajeros además del conductor, también si es un camión. _(RGCOND 4.2 (clase B))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_

## C-perm-0017

¿Cuál es el período de vigencia del permiso B de un titular de 70 años?  
Respuesta: **Cinco años.**

- ✔ A partir de los 65 años, la vigencia del permiso B es de cinco años (puede reducirse por motivos médicos). _(RGCOND 12.2)_
- ✘ `res-perm-0001` El permiso A se obtiene con 20 años cumplidos (y dos años de antigüedad en el A2). Hasta los 21 no autoriza a conducir triciclos de más de 15 kW. _(RGCOND 4.2 (tabla))_
- ✘ `C-perm-0011` El permiso A solo puede expedirse a titulares de un A2 en vigor con al menos dos años de antigüedad (y superando una formación). _(RGCOND 5.1.a)_

## C-pun-0001

Con carácter general, ¿cuál es el crédito inicial de puntos asignado al titular de un permiso de conducción?  
Respuesta: **12 puntos.**

- ✔ Al titular de un permiso se le asigna un crédito inicial de doce puntos; ocho en los casos excepcionales de la ley. _(LSV 63.1)_
- ✘ `C-pun-0005` La recuperación parcial mediante curso permite recuperar hasta un máximo de seis puntos. _(LSV 65.4)_
- ✘ `C-pun-0010` Para los conductores profesionales el plazo de seis meses se reduce a tres meses. _(LSV 71.1)_

## C-pun-0002

¿Con cuántos puntos empieza quien obtiene su primer permiso de conducción?  
Respuesta: **8 puntos.**

- ✔ Se asignan 8 puntos al titular de un permiso con antigüedad no superior a tres años, salvo que ya fuera titular de otro permiso con esa antigüedad. _(LSV 63.2.a)_
- ✘ `C-pun-0006` El curso de recuperación parcial puede hacerse una sola vez cada dos años; los conductores profesionales, con frecuencia anual. _(LSV 65.4)_
- ✘ `C-pun-0016` No se pierden más de ocho puntos al día por acumulación de infracciones, salvo que concurran determinadas infracciones muy graves del art. 77, en cuyo caso se pierden todos los que correspondan. _(LSV 64.4)_

## C-pun-0003

Un conductor novel empezó con 8 puntos. ¿Cuándo pasa a disponer de 12 puntos?  
Respuesta: **Cuando transcurren dos años sin ser sancionado en firme por infracciones que impliquen pérdida de puntos.**

- ✔ Los titulares con 8 puntos iniciales pasan a tener 12 si en dos años no son sancionados en firme por infracciones que impliquen pérdida de puntos. _(LSV 65.2)_
- ✘ `res-pun-0001` El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial. _(OCURSOS Cuarto)_
- ✘ `res-pun-0002` El curso de recuperación del permiso o licencia dura 24 horas; el de recuperación parcial, 12. _(OCURSOS Quinto)_

## C-pun-0004

Un conductor tiene 5 puntos y pasan dos años sin ser sancionado en firme por infracciones que lleven pérdida de puntos. ¿Qué ocurre?  
Respuesta: **Recupera la totalidad del crédito inicial de 12 puntos.**

- ✔ Transcurridos dos años sin sanciones firmes que lleven aparejada pérdida de puntos, se recupera la totalidad del crédito inicial de doce puntos. _(LSV 65.1)_
- ✘ `C-pun-0016` No se pierden más de ocho puntos al día por acumulación de infracciones, salvo que concurran determinadas infracciones muy graves del art. 77, en cuyo caso se pierden todos los que correspondan. _(LSV 64.4)_
- ✘ `res-pun-0001` El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial. _(OCURSOS Cuarto)_

## C-pun-0005

¿Cuántos puntos se pueden recuperar como máximo con un curso de sensibilización y reeducación vial de recuperación parcial?  
Respuesta: **6 puntos.**

- ✔ La recuperación parcial mediante curso permite recuperar hasta un máximo de seis puntos. _(LSV 65.4)_
- ✘ `C-pun-0001` Al titular de un permiso se le asigna un crédito inicial de doce puntos; ocho en los casos excepcionales de la ley. _(LSV 63.1)_
- ✘ `C-pun-0010` Para los conductores profesionales el plazo de seis meses se reduce a tres meses. _(LSV 71.1)_

## C-pun-0006

Un conductor no profesional, ¿con qué frecuencia máxima puede realizar el curso de recuperación parcial de puntos?  
Respuesta: **Una sola vez cada dos años.**

- ✔ El curso de recuperación parcial puede hacerse una sola vez cada dos años; los conductores profesionales, con frecuencia anual. _(LSV 65.4)_
- ✘ `C-pun-0001` Al titular de un permiso se le asigna un crédito inicial de doce puntos; ocho en los casos excepcionales de la ley. _(LSV 63.1)_
- ✘ `C-pun-0010` Para los conductores profesionales el plazo de seis meses se reduce a tres meses. _(LSV 71.1)_

## C-pun-0007

Los conductores profesionales, ¿con qué frecuencia pueden realizar el curso de recuperación parcial de puntos?  
Respuesta: **Con frecuencia anual.**

- ✔ Los conductores profesionales son la excepción: pueden hacer el curso de recuperación parcial con frecuencia anual. _(LSV 65.4)_
- ✘ `C-pun-0002` Se asignan 8 puntos al titular de un permiso con antigüedad no superior a tres años, salvo que ya fuera titular de otro permiso con esa antigüedad. _(LSV 63.2.a)_
- ✘ `res-pun-0001` El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial. _(OCURSOS Cuarto)_

## C-pun-0008

Según la Ley de Tráfico, ¿cuál es la duración máxima de los cursos de recuperación parcial de puntos?  
Respuesta: **Quince horas.**

- ✔ La ley fija que la duración de los cursos de recuperación parcial será como máximo de quince horas. _(LSV 65.4)_
- ✘ `C-pun-0001` Al titular de un permiso se le asigna un crédito inicial de doce puntos; ocho en los casos excepcionales de la ley. _(LSV 63.1)_
- ✘ `C-pun-0013` La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_

## C-pun-0009

Un conductor no profesional pierde todos sus puntos por primera vez. ¿Cuánto tiempo debe pasar, desde la notificación, para que pueda obtener un nuevo permiso?  
Respuesta: **Seis meses.**

- ✔ Tras la pérdida de vigencia por falta de puntos no se puede obtener un nuevo permiso hasta pasados seis meses desde la notificación (tres para profesionales; doce si se reincide en los tres años siguientes). _(LSV 71.1)_
- ✘ `C-pun-0012` Se asigna un crédito inicial de ocho puntos al titular que, tras perder todos sus puntos, obtiene nuevamente el permiso. _(LSV 63.2.b)_
- ✘ `C-pun-0013` La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_

## C-pun-0010

En el caso de un conductor profesional que pierde todos sus puntos por primera vez, ¿cuál es el plazo para obtener un nuevo permiso?  
Respuesta: **Tres meses.**

- ✔ Para los conductores profesionales el plazo de seis meses se reduce a tres meses. _(LSV 71.1)_
- ✘ `C-pun-0012` Se asigna un crédito inicial de ocho puntos al titular que, tras perder todos sus puntos, obtiene nuevamente el permiso. _(LSV 63.2.b)_
- ✘ `C-pun-0013` La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_

## C-pun-0011

¿Qué debe hacer el titular cuyo permiso ha perdido vigencia por la pérdida total de puntos para obtener de nuevo un permiso, una vez cumplido el plazo?  
Respuesta: **Superar un curso de sensibilización y reeducación vial de recuperación del permiso y después la prueba de control de conocimientos.**

- ✔ Puede obtener un permiso de la misma clase y con la misma antigüedad tras superar el curso de recuperación del permiso y la prueba de control de conocimientos. _(RGCOND 38.1)_
- ✘ `C-pun-0012` Se asigna un crédito inicial de ocho puntos al titular que, tras perder todos sus puntos, obtiene nuevamente el permiso. _(LSV 63.2.b)_
- ✘ `C-pun-0009` Tras la pérdida de vigencia por falta de puntos no se puede obtener un nuevo permiso hasta pasados seis meses desde la notificación (tres para profesionales; doce si se reincide en los tres años siguientes). _(LSV 71.1)_

## C-pun-0012

¿Con cuántos puntos empieza quien obtiene de nuevo el permiso tras haber perdido la totalidad de los puntos?  
Respuesta: **8 puntos.**

- ✔ Se asigna un crédito inicial de ocho puntos al titular que, tras perder todos sus puntos, obtiene nuevamente el permiso. _(LSV 63.2.b)_
- ✘ `C-pun-0010` Para los conductores profesionales el plazo de seis meses se reduce a tres meses. _(LSV 71.1)_
- ✘ `C-pun-0013` La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_

## C-pun-0013

Al obtener de nuevo el permiso tras haber perdido todos los puntos, ¿se conserva la antigüedad del permiso anterior?  
Respuesta: **Sí, la antigüedad permanece.**

- ✔ La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_
- ✘ `C-pun-0010` Para los conductores profesionales el plazo de seis meses se reduce a tres meses. _(LSV 71.1)_
- ✘ `C-pun-0012` Se asigna un crédito inicial de ocho puntos al titular que, tras perder todos sus puntos, obtiene nuevamente el permiso. _(LSV 63.2.b)_

## C-pun-0014

¿Cuál es el número máximo de puntos que puede llegar a acumular un conductor gracias a las bonificaciones?  
Respuesta: **15 puntos.**

- ✔ Quien mantiene todos sus puntos sin ser sancionado recibe 2 puntos durante los tres primeros años y 1 punto por los tres siguientes, hasta un máximo de quince. _(LSV 63.4)_
- ✘ `C-pun-0004` Transcurridos dos años sin sanciones firmes que lleven aparejada pérdida de puntos, se recupera la totalidad del crédito inicial de doce puntos. _(LSV 65.1)_
- ✘ `res-pun-0001` El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial. _(OCURSOS Cuarto)_

## C-pun-0015

Un conductor con 12 puntos mantiene la totalidad de sus puntos durante tres años, sin ser sancionado en firme. ¿Qué bonificación recibe?  
Respuesta: **Dos puntos.**

- ✔ La bonificación es de dos puntos durante los tres primeros años y de un punto por los tres siguientes. _(LSV 63.4)_
- ✘ `C-pun-0013` La antigüedad permanece en los permisos obtenidos tras la total extinción de los puntos. _(LSV 64.6)_
- ✘ `C-pun-0007` Los conductores profesionales son la excepción: pueden hacer el curso de recuperación parcial con frecuencia anual. _(LSV 65.4)_

## C-pun-0016

Como norma general, ¿cuántos puntos como máximo puede perder un conductor por acumulación de infracciones en un solo día?  
Respuesta: **8 puntos.**

- ✔ No se pierden más de ocho puntos al día por acumulación de infracciones, salvo que concurran determinadas infracciones muy graves del art. 77, en cuyo caso se pierden todos los que correspondan. _(LSV 64.4)_
- ✘ `C-pun-0004` Transcurridos dos años sin sanciones firmes que lleven aparejada pérdida de puntos, se recupera la totalidad del crédito inicial de doce puntos. _(LSV 65.1)_
- ✘ `res-pun-0001` El curso de recuperación parcial dura 12 horas y el de recuperación del permiso (pérdida total), 24 horas. La Ley fija un máximo de 15 horas para el parcial. _(OCURSOS Cuarto)_

## D-acc-0001

Según la DGT, ¿en qué proporción aproximada de los accidentes de tráfico interviene el factor humano?  
Respuesta: **Entre 70 y 90 de cada 100.**

- ✔ El factor humano (exceso de velocidad, alcohol, distracciones...) interviene en la mayoría de los accidentes: entre 70 y 90 de cada 100. El estado de la carretera interviene en 10-35 de cada 100 y los fallos del vehículo en 4-13 de cada 100. _(MANUAL_DGT Tema 16, Factores de riesgo (pág. 390))_
- ✘ `E-acc-0010` La dotación obligatoria de turismos (y de mixtos y mercancías de hasta 3.500 kg) incluye el dispositivo luminoso V-16, el chaleco reflectante y la rueda de repuesto o sistema alternativo. Los triángulos ya no forman parte de ella. _(RGV Anexo XII.1.a)_
- ✘ `E-acc-0013` El conductor debe señalizar el vehículo o el obstáculo y procurar que se retire en el menor tiempo posible, sacándolo de la calzada y situándolo conforme a las normas de estacionamiento siempre que sea factible. _(LSV 51.2)_

## D-acc-0002

La mayoría de los accidentes de tráfico...  
Respuesta: **se pueden evitar.**

- ✔ La mayoría de los accidentes se pueden evitar, sobre todo actuando sobre el factor humano (no beber, moderar la velocidad, no distraerse). _(MANUAL_DGT Tema 16, Evitar accidentes de tráfico (pág. 389))_
- ✘ `E-acc-0009` Se prohíbe cumplimentar el parte de accidente en la plataforma de circulación; debe hacerse en un lugar seguro fuera de la vía. _(RGC 130.5)_
- ✘ `E-acc-0012` La V-16 comunica su activación, desactivación y ubicación al punto de acceso nacional de la DGT, sin depender del móvil ni de aplicaciones. _(RGV Anexo XI, V-16.4)_

## D-acc-0003

¿Dónde se producen la mayoría de los accidentes de tráfico?  
Respuesta: **En las rectas.**

- ✔ Según la DGT, la mayoría de los accidentes se producen en rectas y no en curvas: en las rectas aparecen más fácilmente la somnolencia y las distracciones. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `E-acc-0001` La obligación de auxiliar o pedir auxilio alcanza a los implicados, a quienes presencian el accidente y a quienes tienen conocimiento de él. _(RGC 129.1)_
- ✘ `E-acc-0008` Si no pueden abandonar el vehículo con seguridad, los ocupantes permanecerán en el habitáculo con el cinturón abrochado. _(RGC 130.3)_

## D-acc-0004

¿Dónde se producen la mayoría de los accidentes mortales?  
Respuesta: **En carreteras fuera de pueblos o ciudades.**

- ✔ La mayoría de los accidentes mortales se producen en carreteras fuera de poblado, donde se circula a más velocidad y los accidentes son más graves. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `E-acc-0004` PAS: primero Proteger (a uno mismo, a las víctimas y el lugar), después Avisar a emergencias y por último Socorrer. _(MANUAL_DGT Tema 16, Proteger, Avisar, Socorrer (p. 416))_
- ✘ `E-acc-0009` Se prohíbe cumplimentar el parte de accidente en la plataforma de circulación; debe hacerse en un lugar seguro fuera de la vía. _(RGC 130.5)_

## D-acc-0005

Comparadas con el resto de carreteras, en las autopistas y autovías...  
Respuesta: **hay menos accidentes.**

- ✔ Hay menos accidentes en autopistas y autovías que en el resto de carreteras: tienen calzadas separadas para cada sentido y no tienen cruces a nivel. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `E-acc-0005` Los conductores de turismos deben usar el chaleco reflectante de alta visibilidad cuando salgan del vehículo y ocupen la calzada o el arcén de las vías interurbanas. _(RGC 118.4)_
- ✘ `D-acc-0002` La mayoría de los accidentes se pueden evitar, sobre todo actuando sobre el factor humano (no beber, moderar la velocidad, no distraerse). _(MANUAL_DGT Tema 16, Evitar accidentes de tráfico (pág. 389))_

## D-acc-0006

Durante el día, ¿cuándo se produce la mayor parte de los accidentes?  
Respuesta: **A las horas de entrar y salir del trabajo.**

- ✔ Durante el día, la mayor parte de los accidentes se producen a las horas de entrar y salir del trabajo, en especial al final de la jornada laboral. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `E-acc-0002` El usuario no implicado debe cumplir esas prescripciones salvo que manifiestamente no sea necesaria su colaboración o que la autoridad o sus agentes ya estén en el lugar. _(RGC 129.3)_
- ✘ `E-acc-0012` La V-16 comunica su activación, desactivación y ubicación al punto de acceso nacional de la DGT, sin depender del móvil ni de aplicaciones. _(RGV Anexo XI, V-16.4)_

## D-acc-0007

¿En qué épocas del año hay más accidentes de tráfico?  
Respuesta: **En Semana Santa, diciembre y verano.**

- ✔ Las épocas con más accidentes son Semana Santa, diciembre y verano, cuando hay más desplazamientos. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `D-acc-0002` La mayoría de los accidentes se pueden evitar, sobre todo actuando sobre el factor humano (no beber, moderar la velocidad, no distraerse). _(MANUAL_DGT Tema 16, Evitar accidentes de tráfico (pág. 389))_
- ✘ `E-acc-0006` Para pedir ayuda se llama al número de emergencias 112 (o se usa el poste SOS si no hay móvil). _(MANUAL_DGT Tema 16, Avisar (p. 419))_

## D-acc-0008

¿Cómo considera la Organización Mundial de la Salud los accidentes de tráfico?  
Respuesta: **Como un problema de salud que afecta a toda la sociedad.**

- ✔ La OMS considera los accidentes de tráfico un problema de salud que afecta a toda la sociedad, por sus consecuencias humanas, materiales, sanitarias y de recursos de seguridad. _(MANUAL_DGT Tema 16, Consecuencias de los accidentes (pág. 394))_
- ✘ `res-acc-0001` El manual de la DGT indica que hay más accidentes los fines de semana y los días de fiesta, en especial en las horas de la madrugada. _(MANUAL_DGT Tema 16 (p. 391))_
- ✘ `E-acc-0001` La obligación de auxiliar o pedir auxilio alcanza a los implicados, a quienes presencian el accidente y a quienes tienen conocimiento de él. _(RGC 129.1)_

## D-vul-0001

Según los estudios de la DGT, las personas mayores, como peatones, tienen más accidentes...  
Respuesta: **cuando van solas.**

- ✔ Las personas mayores tienen más accidentes cuando van solas que cuando van acompañadas por niños: con niños son más prudentes para darles buen ejemplo y protegerles. _(MANUAL_DGT Tema 16, Las personas mayores (pág. 402))_
- ✘ `D-vul-0005` Los vehículos de dos ruedas son más frágiles y se ven peor que el resto de vehículos, por lo que sus conductores deben circular con especial cuidado. _(MANUAL_DGT Tema 16, Conductores de vehículos de dos ruedas (pág. 407))_
- ✘ `D-vul-0002` Los niños son más bajos que los adultos: ven menos tramo de carretera y los conductores los ven peor. Además prestan menos atención y no conocen las normas de tráfico. _(MANUAL_DGT Tema 16, Los niños (pág. 401))_

## D-vul-0002

¿Por qué los niños peatones tienen un riesgo especial?  
Respuesta: **Porque, al ser más bajos, ven menos tramo de carretera y los conductores los ven peor.**

- ✔ Los niños son más bajos que los adultos: ven menos tramo de carretera y los conductores los ven peor. Además prestan menos atención y no conocen las normas de tráfico. _(MANUAL_DGT Tema 16, Los niños (pág. 401))_
- ✘ `D-vul-0001` Las personas mayores tienen más accidentes cuando van solas que cuando van acompañadas por niños: con niños son más prudentes para darles buen ejemplo y protegerles. _(MANUAL_DGT Tema 16, Las personas mayores (pág. 402))_
- ✘ `D-vul-0004` Los accidentes de tráfico son la primera causa de muerte de los jóvenes de entre 15 y 29 años en España. _(MANUAL_DGT Tema 16, Conductores jóvenes (pág. 403))_

## D-vul-0003

En caso de accidente, las personas mayores...  
Respuesta: **tienen lesiones más graves y menos posibilidades de sobrevivir.**

- ✔ En caso de accidente las personas mayores tienen lesiones más graves y menos posibilidades de sobrevivir. _(MANUAL_DGT Tema 16, Personas mayores de 65 años (pág. 406))_
- ✘ `D-vul-0005` Los vehículos de dos ruedas son más frágiles y se ven peor que el resto de vehículos, por lo que sus conductores deben circular con especial cuidado. _(MANUAL_DGT Tema 16, Conductores de vehículos de dos ruedas (pág. 407))_
- ✘ `D-vul-0004` Los accidentes de tráfico son la primera causa de muerte de los jóvenes de entre 15 y 29 años en España. _(MANUAL_DGT Tema 16, Conductores jóvenes (pág. 403))_

## D-vul-0004

En España, ¿qué lugar ocupan los accidentes de tráfico entre las causas de muerte de los jóvenes de 15 a 29 años?  
Respuesta: **Son la primera causa de muerte.**

- ✔ Los accidentes de tráfico son la primera causa de muerte de los jóvenes de entre 15 y 29 años en España. _(MANUAL_DGT Tema 16, Conductores jóvenes (pág. 403))_
- ✘ `D-vul-0005` Los vehículos de dos ruedas son más frágiles y se ven peor que el resto de vehículos, por lo que sus conductores deben circular con especial cuidado. _(MANUAL_DGT Tema 16, Conductores de vehículos de dos ruedas (pág. 407))_
- ✘ `D-vul-0003` En caso de accidente las personas mayores tienen lesiones más graves y menos posibilidades de sobrevivir. _(MANUAL_DGT Tema 16, Personas mayores de 65 años (pág. 406))_

## D-vul-0005

¿Por qué los conductores de vehículos de dos ruedas son un grupo de especial riesgo?  
Respuesta: **Porque sus vehículos son más frágiles y se ven peor que el resto de vehículos.**

- ✔ Los vehículos de dos ruedas son más frágiles y se ven peor que el resto de vehículos, por lo que sus conductores deben circular con especial cuidado. _(MANUAL_DGT Tema 16, Conductores de vehículos de dos ruedas (pág. 407))_
- ✘ `D-vul-0001` Las personas mayores tienen más accidentes cuando van solas que cuando van acompañadas por niños: con niños son más prudentes para darles buen ejemplo y protegerles. _(MANUAL_DGT Tema 16, Las personas mayores (pág. 402))_
- ✘ `D-vul-0003` En caso de accidente las personas mayores tienen lesiones más graves y menos posibilidades de sobrevivir. _(MANUAL_DGT Tema 16, Personas mayores de 65 años (pág. 406))_

## D-vel-0001

Al aumentar la velocidad, la capacidad del conductor de ver lo que pasa a los lados...  
Respuesta: **disminuye; es la llamada visión túnel.**

- ✔ Cuanto más rápido se circula, menos se ve lo que pasa a los lados: solo se ve lo que hay enfrente, como en un túnel (visión o efecto túnel). Hay que tener especial cuidado en las intersecciones. _(MANUAL_DGT Tema 10, Cosas que pueden pasar si conduces muy rápido (pág. 260))_
- ✘ `D-fat-0002` La somnolencia hace que se tarde más en reaccionar, cueste tomar decisiones, los movimientos sean más lentos y el conductor pueda dormirse unos segundos sin darse cuenta. _(MANUAL_DGT Tema 3, Efectos de la somnolencia (pág. 50))_
- ✘ `D-fat-0004` Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_

## D-tre-0001

En condiciones normales, el tiempo de reacción de un conductor es de...  
Respuesta: **entre medio segundo y un segundo.**

- ✔ El tiempo de reacción es el que pasa entre ver u oír algo y reaccionar. En condiciones normales está entre medio segundo y un segundo. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 44))_
- ✘ `D-tre-0002` La fatiga, el sueño, la edad avanzada, oír o ver mal y las enfermedades son factores que hacen que se tarde más tiempo en reaccionar. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 45))_
- ✘ `res-fat-0001` El manual de la DGT dice que, con los primeros síntomas, hay que parar en un lugar seguro y dormir 20 o 30 minutos, y descansar 20 o 30 minutos cada dos horas o 200 km. _(MANUAL_DGT Tema 3, fatiga y somnolencia (p. 51))_

## D-tre-0002

Un conductor que está enfermo o muy cansado, ¿cómo tendrá su tiempo de reacción?  
Respuesta: **Más largo de lo normal.**

- ✔ La fatiga, el sueño, la edad avanzada, oír o ver mal y las enfermedades son factores que hacen que se tarde más tiempo en reaccionar. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 45))_
- ✘ `D-tre-0001` El tiempo de reacción es el que pasa entre ver u oír algo y reaccionar. En condiciones normales está entre medio segundo y un segundo. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 44))_
- ✘ `D-fat-0004` Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_

## D-tre-0003

¿Cuál de estos factores hace que un conductor tarde más tiempo en reaccionar?  
Respuesta: **Haber comido mucho antes de conducir.**

- ✔ Comer mucho antes de conducir, el mucho calor en el coche, el alcohol, las drogas o algunos medicamentos aumentan el tiempo de reacción. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 45))_
- ✘ `D-tre-0001` El tiempo de reacción es el que pasa entre ver u oír algo y reaccionar. En condiciones normales está entre medio segundo y un segundo. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 44))_
- ✘ `D-fat-0004` Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_

## D-dis-0001

La distancia de detención es...  
Respuesta: **la suma de la distancia de reacción y la distancia de frenado.**

- ✔ La distancia de detención es el espacio recorrido desde que se detecta el obstáculo hasta que el vehículo se para por completo: la suma de la distancia de reacción y la de frenado. _(MANUAL_DGT Tema 10, Distancia de detención (pág. 263))_
- ✘ `D-dis-0002` El clima y el estado del suelo influyen en la distancia de frenado: en un suelo mojado el vehículo puede necesitar más distancia para frenar. _(MANUAL_DGT Tema 10, Distancia de frenado (pág. 262))_
- ✘ `res-dist-0002` El manual indica dejar al menos un segundo más de espacio con lluvia, nieve, niebla, de noche o cuando el vehículo de atrás se acerca demasiado. _(MANUAL_DGT Tema 17, Espacio delantero (p. 446))_

## D-dis-0002

Con el suelo mojado, ¿qué distancia puede aumentar?  
Respuesta: **La distancia de frenado.**

- ✔ El clima y el estado del suelo influyen en la distancia de frenado: en un suelo mojado el vehículo puede necesitar más distancia para frenar. _(MANUAL_DGT Tema 10, Distancia de frenado (pág. 262))_
- ✘ `dist-0002` Los vehículos de MMA superior a 3.500 kg deben guardar al menos 150 metros o seis segundos. _(RGC 95.6)_
- ✘ `D-dis-0001` La distancia de detención es el espacio recorrido desde que se detecta el obstáculo hasta que el vehículo se para por completo: la suma de la distancia de reacción y la de frenado. _(MANUAL_DGT Tema 10, Distancia de detención (pág. 263))_

## D-dis-0003

La distancia de reacción es el espacio que recorre el vehículo...  
Respuesta: **desde que el conductor detecta un imprevisto hasta que puede reaccionar a él.**

- ✔ La distancia de reacción es el espacio recorrido desde que se detecta un imprevisto (un obstáculo, una señal, un ruido) hasta que se puede reaccionar, por ejemplo hasta que se pisa el freno. _(MANUAL_DGT Tema 10, Distancia de reacción (pág. 261))_
- ✘ `dist-0005` Los conductores de vehículos a motor deben dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril. _(RGC 153.4)_
- ✘ `D-dis-0002` El clima y el estado del suelo influyen en la distancia de frenado: en un suelo mojado el vehículo puede necesitar más distancia para frenar. _(MANUAL_DGT Tema 10, Distancia de frenado (pág. 262))_

## D-fat-0001

Para evitar la fatiga y la somnolencia en un viaje largo, la DGT recomienda descansar...  
Respuesta: **20 o 30 minutos cada dos horas o cada 200 kilómetros, aunque no se sienta fatiga.**

- ✔ Se recomienda descansar 20 o 30 minutos cada dos horas o cada 200 kilómetros aunque no se sienta fatiga ni somnolencia; y, si aparecen los primeros síntomas, parar en un lugar seguro y dormir 20 o 30 minutos. _(MANUAL_DGT Tema 3, ¿Cómo puedes evitar la fatiga y la somnolencia? (pág. 51))_
- ✘ `D-fat-0002` La somnolencia hace que se tarde más en reaccionar, cueste tomar decisiones, los movimientos sean más lentos y el conductor pueda dormirse unos segundos sin darse cuenta. _(MANUAL_DGT Tema 3, Efectos de la somnolencia (pág. 50))_
- ✘ `D-fat-0004` Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_

## D-fat-0002

¿Cuál de los siguientes es un efecto de la somnolencia al volante?  
Respuesta: **Dormirse durante unos segundos sin darse cuenta.**

- ✔ La somnolencia hace que se tarde más en reaccionar, cueste tomar decisiones, los movimientos sean más lentos y el conductor pueda dormirse unos segundos sin darse cuenta. _(MANUAL_DGT Tema 3, Efectos de la somnolencia (pág. 50))_
- ✘ `D-fat-0004` Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_
- ✘ `D-fat-0003` Una comida abundante o pesada antes de conducir puede provocar sueño y fatiga; es mejor hacer varias comidas ligeras. _(MANUAL_DGT Tema 3, Alimentación (pág. 66))_

## D-fat-0003

Comer mucha cantidad y alimentos difíciles de digerir antes de conducir...  
Respuesta: **puede provocar sueño y fatiga.**

- ✔ Una comida abundante o pesada antes de conducir puede provocar sueño y fatiga; es mejor hacer varias comidas ligeras. _(MANUAL_DGT Tema 3, Alimentación (pág. 66))_
- ✘ `D-fat-0002` La somnolencia hace que se tarde más en reaccionar, cueste tomar decisiones, los movimientos sean más lentos y el conductor pueda dormirse unos segundos sin darse cuenta. _(MANUAL_DGT Tema 3, Efectos de la somnolencia (pág. 50))_
- ✘ `D-fat-0004` Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_

## D-fat-0004

¿Cuál de estas circunstancias de la carretera puede causar fatiga al conductor?  
Respuesta: **Que el suelo de la carretera esté en mal estado.**

- ✔ Entre las causas de fatiga relacionadas con la carretera están el mucho tráfico, el suelo en mal estado, no conocer la carretera y el mal tiempo o el calor excesivo. _(MANUAL_DGT Tema 3, ¿Qué puede causar fatiga? (pág. 46))_
- ✘ `D-fat-0001` Se recomienda descansar 20 o 30 minutos cada dos horas o cada 200 kilómetros aunque no se sienta fatiga ni somnolencia; y, si aparecen los primeros síntomas, parar en un lugar seguro y dormir 20 o 30 minutos. _(MANUAL_DGT Tema 3, ¿Cómo puedes evitar la fatiga y la somnolencia? (pág. 51))_
- ✘ `D-fat-0002` La somnolencia hace que se tarde más en reaccionar, cueste tomar decisiones, los movimientos sean más lentos y el conductor pueda dormirse unos segundos sin darse cuenta. _(MANUAL_DGT Tema 3, Efectos de la somnolencia (pág. 50))_

## D-med-0001

¿Puede circular un conductor bajo el efecto de un medicamento que altera el estado físico o mental apropiado para circular sin peligro?  
Respuesta: **No, está prohibido.**

- ✔ El Reglamento General de Circulación prohíbe circular a los conductores de vehículos o bicicletas que hayan incorporado a su organismo sustancias, incluidos los medicamentos, bajo cuyo efecto se altere el estado físico o mental apropiado para circular sin peligro. _(RGC 27.1)_
- ✘ `D-med-0002` Según la DGT, los antihistamínicos pueden producir sueño, depresión y pérdida de reflejos. _(MANUAL_DGT Tema 3, ¿Qué medicamentos pueden ser peligrosos para conducir? (pág. 65))_
- ✘ `D-alc-0014` La tasa reducida para mercancías solo se aplica a vehículos de más de 3.500 kg de MMA (o mercancías peligrosas, transportes especiales, etc.). Con 3.500 kg exactos y carga general rige la tasa general de 0,25 mg/l. _(RGC 20)_

## D-med-0002

Los antihistamínicos, que se toman para tratar las alergias, pueden producir...  
Respuesta: **sueño.**

- ✔ Según la DGT, los antihistamínicos pueden producir sueño, depresión y pérdida de reflejos. _(MANUAL_DGT Tema 3, ¿Qué medicamentos pueden ser peligrosos para conducir? (pág. 65))_
- ✘ `D-alc-0006` La comida ayuda a que el alcohol llegue a la sangre de forma más lenta, pero no impide que llegue. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-alc-0001` El alcohol produce falsa seguridad en uno mismo, más exposición a riesgos, más faltas y un trato más agresivo o impulsivo hacia otros conductores. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 56))_

## D-cal-0001

¿Por qué es peligroso conducir con mucho calor?  
Respuesta: **Porque aparecen antes el sueño y la fatiga y se puede necesitar más tiempo para reaccionar.**

- ✔ Con calor aparecen antes el sueño y la fatiga, se puede necesitar más tiempo para reaccionar ante imprevistos y puede aumentar la agresividad hacia otros conductores. _(MANUAL_DGT Tema 14, Conducir con calor (pág. 363))_
- ✘ `D-fat-0001` Se recomienda descansar 20 o 30 minutos cada dos horas o cada 200 kilómetros aunque no se sienta fatiga ni somnolencia; y, si aparecen los primeros síntomas, parar en un lugar seguro y dormir 20 o 30 minutos. _(MANUAL_DGT Tema 3, ¿Cómo puedes evitar la fatiga y la somnolencia? (pág. 51))_
- ✘ `D-tre-0001` El tiempo de reacción es el que pasa entre ver u oír algo y reaccionar. En condiciones normales está entre medio segundo y un segundo. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 44))_

## D-cal-0002

Un día de mucho calor, ¿a qué temperatura aconseja la DGT mantener el aire acondicionado del vehículo?  
Respuesta: **Entre 20 y 23 grados.**

- ✔ En días de mucho calor se aconseja usar el aire acondicionado a una temperatura de entre 20 y 23 grados, hacer más descansos y beber agua. _(MANUAL_DGT Tema 14, Conducir con calor (pág. 363))_
- ✘ `res-fat-0001` El manual de la DGT dice que, con los primeros síntomas, hay que parar en un lugar seguro y dormir 20 o 30 minutos, y descansar 20 o 30 minutos cada dos horas o 200 km. _(MANUAL_DGT Tema 3, fatiga y somnolencia (p. 51))_
- ✘ `D-tre-0001` El tiempo de reacción es el que pasa entre ver u oír algo y reaccionar. En condiciones normales está entre medio segundo y un segundo. _(MANUAL_DGT Tema 3, El tiempo de reacción (pág. 44))_

## D-mov-0001

¿Está permitido a un conductor de turismo utilizar el teléfono móvil mientras conduce?  
Respuesta: **Solo si la comunicación tiene lugar sin emplear las manos ni usar cascos, auriculares o instrumentos similares.**

- ✔ Se prohíbe utilizar el móvil durante la conducción. Se exceptúa cuando la comunicación tiene lugar sin emplear las manos ni usar cascos, auriculares o instrumentos similares (manos libres). _(RGC 18.2)_
- ✘ `D-mov-0003` Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_
- ✘ `D-mov-0006` El manos libres está permitido, pero también es peligroso porque el conductor presta parte de su atención a la conversación. La DGT aconseja no tener conversaciones de más de un minuto. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_

## D-mov-0002

¿Cuántos puntos pierde el conductor sancionado en firme por utilizar, sujetándolo con la mano, el teléfono móvil mientras conduce?  
Respuesta: **6 puntos.**

- ✔ Utilizar el móvil sujetándolo con la mano mientras se conduce supone la pérdida de 6 puntos (LSV, Anexo II, apartado 8). _(LSV Anexo II.8)_
- ✘ `D-mov-0008` Al prestar atención a la conversación se calculan peor las distancias, se dejan de ver señales y se producen salidas de la carretera e invasiones del carril contrario. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_
- ✘ `D-mov-0005` El riesgo de accidente al usar el móvil en el vehículo es cuatro veces mayor que cuando no se utiliza. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 70))_

## D-mov-0003

Un conductor manipula con la mano el navegador GPS, que está fijo en su soporte, mientras conduce. ¿Cuántos puntos pierde si es sancionado en firme?  
Respuesta: **3 puntos.**

- ✔ Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_
- ✘ `D-mov-0008` Al prestar atención a la conversación se calculan peor las distancias, se dejan de ver señales y se producen salidas de la carretera e invasiones del carril contrario. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_
- ✘ `D-mov-0001` Se prohíbe utilizar el móvil durante la conducción. Se exceptúa cuando la comunicación tiene lugar sin emplear las manos ni usar cascos, auriculares o instrumentos similares (manos libres). _(RGC 18.2)_

## D-mov-0004

¿Puede un conductor de turismo circular escuchando música con auriculares conectados al teléfono?  
Respuesta: **No, está prohibido.**

- ✔ Está prohibido conducir utilizando cualquier tipo de casco de audio, auriculares o instrumentos similares conectados a aparatos receptores o reproductores de sonido. _(RGC 18.2)_
- ✘ `D-mov-0010` El GPS se debe programar antes de empezar a conducir, nunca mientras se conduce; debe quedar fijo y en un lugar visible sin apartar la vista de la carretera. _(MANUAL_DGT Tema 3, Navegadores GPS (pág. 73))_
- ✘ `D-mov-0006` El manos libres está permitido, pero también es peligroso porque el conductor presta parte de su atención a la conversación. La DGT aconseja no tener conversaciones de más de un minuto. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_

## D-mov-0005

Según la DGT, el riesgo de accidente cuando se usa el móvil en el vehículo es...  
Respuesta: **cuatro veces mayor que cuando no se usa.**

- ✔ El riesgo de accidente al usar el móvil en el vehículo es cuatro veces mayor que cuando no se utiliza. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 70))_
- ✘ `D-mov-0002` Utilizar el móvil sujetándolo con la mano mientras se conduce supone la pérdida de 6 puntos (LSV, Anexo II, apartado 8). _(LSV Anexo II.8)_
- ✘ `D-mov-0001` Se prohíbe utilizar el móvil durante la conducción. Se exceptúa cuando la comunicación tiene lugar sin emplear las manos ni usar cascos, auriculares o instrumentos similares (manos libres). _(RGC 18.2)_

## D-mov-0006

Hablar por teléfono con un dispositivo de manos libres mientras se conduce...  
Respuesta: **está permitido, pero también es peligroso porque parte de la atención se dedica a la conversación.**

- ✔ El manos libres está permitido, pero también es peligroso porque el conductor presta parte de su atención a la conversación. La DGT aconseja no tener conversaciones de más de un minuto. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_
- ✘ `D-mov-0003` Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_
- ✘ `D-mov-0001` Se prohíbe utilizar el móvil durante la conducción. Se exceptúa cuando la comunicación tiene lugar sin emplear las manos ni usar cascos, auriculares o instrumentos similares (manos libres). _(RGC 18.2)_

## D-mov-0007

Si habla por el móvil con un dispositivo de manos libres mientras conduce, la DGT recomienda que la conversación...  
Respuesta: **no dure más de un minuto.**

- ✔ Entre las recomendaciones para usar el manos libres está no tener conversaciones que duren más de un minuto, avisar al interlocutor de que se está conduciendo y, si hay que hacer una llamada, parar en un lugar seguro. _(MANUAL_DGT Tema 3, Recomendaciones para usar el móvil (pág. 72))_
- ✘ `D-mov-0008` Al prestar atención a la conversación se calculan peor las distancias, se dejan de ver señales y se producen salidas de la carretera e invasiones del carril contrario. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_
- ✘ `D-mov-0003` Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_

## D-mov-0008

¿Cuál de estas consecuencias puede tener prestar atención a una conversación telefónica mientras se conduce?  
Respuesta: **Salirse de la carretera o invadir el carril contrario.**

- ✔ Al prestar atención a la conversación se calculan peor las distancias, se dejan de ver señales y se producen salidas de la carretera e invasiones del carril contrario. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_
- ✘ `D-mov-0007` Entre las recomendaciones para usar el manos libres está no tener conversaciones que duren más de un minuto, avisar al interlocutor de que se está conduciendo y, si hay que hacer una llamada, parar en un lugar seguro. _(MANUAL_DGT Tema 3, Recomendaciones para usar el móvil (pág. 72))_
- ✘ `D-mov-0003` Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_

## D-mov-0009

Con el vehículo en movimiento, ¿puede el conductor ver una película en un monitor o reproductor de vídeo?  
Respuesta: **No, se considera incompatible con la atención permanente a la conducción.**

- ✔ Se considera incompatible con la obligatoria atención permanente a la conducción el uso por el conductor, con el vehículo en movimiento, de pantallas con acceso a internet, monitores de televisión y reproductores de vídeo o DVD. Se exceptúan el GPS y los monitores de ayuda a maniobras o de acceso de peatones. _(RGC 18.1)_
- ✘ `D-mov-0007` Entre las recomendaciones para usar el manos libres está no tener conversaciones que duren más de un minuto, avisar al interlocutor de que se está conduciendo y, si hay que hacer una llamada, parar en un lugar seguro. _(MANUAL_DGT Tema 3, Recomendaciones para usar el móvil (pág. 72))_
- ✘ `D-mov-0003` Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_

## D-mov-0010

Según la DGT, ¿cuándo se debe programar el navegador GPS?  
Respuesta: **Antes de empezar a conducir.**

- ✔ El GPS se debe programar antes de empezar a conducir, nunca mientras se conduce; debe quedar fijo y en un lugar visible sin apartar la vista de la carretera. _(MANUAL_DGT Tema 3, Navegadores GPS (pág. 73))_
- ✘ `D-mov-0006` El manos libres está permitido, pero también es peligroso porque el conductor presta parte de su atención a la conversación. La DGT aconseja no tener conversaciones de más de un minuto. _(MANUAL_DGT Tema 3, Usar el teléfono móvil (pág. 71))_
- ✘ `D-mov-0003` Utilizar manualmente navegadores u otros sistemas de comunicación, o el móvil en condiciones distintas a sujetarlo con la mano, supone la pérdida de 3 puntos (LSV, Anexo II, apartado 20). _(LSV Anexo II.20)_

## D-alc-0001

¿Cuál de estos es un efecto del alcohol en el comportamiento del conductor?  
Respuesta: **Una falsa seguridad en sí mismo.**

- ✔ El alcohol produce falsa seguridad en uno mismo, más exposición a riesgos, más faltas y un trato más agresivo o impulsivo hacia otros conductores. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 56))_
- ✘ `D-alc-0002` El alcohol hace que se vean peor las señales, se calculen peor las distancias, se tenga menos capacidad de ver lo que pasa a un lado y a otro y que el conductor se deslumbre más. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 57))_
- ✘ `D-dro-0003` Conducir con presencia de drogas en el organismo supone la pérdida de 6 puntos (LSV, Anexo II, apartado 2). _(LSV Anexo II.2)_

## D-alc-0002

¿Cómo afecta el alcohol a la visión del conductor?  
Respuesta: **Reduce la capacidad de ver lo que pasa a los lados y hace que se deslumbre más.**

- ✔ El alcohol hace que se vean peor las señales, se calculen peor las distancias, se tenga menos capacidad de ver lo que pasa a un lado y a otro y que el conductor se deslumbre más. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 57))_
- ✘ `D-alc-0001` El alcohol produce falsa seguridad en uno mismo, más exposición a riesgos, más faltas y un trato más agresivo o impulsivo hacia otros conductores. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 56))_
- ✘ `D-alc-0021` Para conductores en general, una tasa superior a 0,25 y hasta 0,50 mg/l en aire supone la pérdida de 4 puntos; más de 0,50 mg/l, 6 puntos. _(LSV Anexo II.1)_

## D-alc-0003

Dos personas beben exactamente la misma cantidad de la misma bebida. ¿Tendrán necesariamente la misma tasa de alcoholemia?  
Respuesta: **No; influyen factores como el peso, el sexo, la edad o haber comido.**

- ✔ El alcohol no afecta a todas las personas igual: influyen la cantidad, el peso, el sexo, el tiempo transcurrido, el tipo de bebida, la velocidad a la que se bebe, beber sin comer, la edad y las circunstancias personales. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 54))_
- ✘ `D-alc-0004` El momento en que la tasa de alcoholemia es más alta es aproximadamente una hora después de beber; después baja muy poco a poco. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-alc-0022` Para profesionales y titulares de permisos con menos de dos años de antigüedad, más de 0,30 mg/l en aire supone la pérdida de 6 puntos (de más de 0,15 hasta 0,30 mg/l, 4 puntos). _(LSV Anexo II.1)_

## D-alc-0004

¿Cuándo alcanza la tasa de alcoholemia su valor más alto?  
Respuesta: **Aproximadamente una hora después de beber.**

- ✔ El momento en que la tasa de alcoholemia es más alta es aproximadamente una hora después de beber; después baja muy poco a poco. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-alc-0003` El alcohol no afecta a todas las personas igual: influyen la cantidad, el peso, el sexo, el tiempo transcurrido, el tipo de bebida, la velocidad a la que se bebe, beber sin comer, la edad y las circunstancias personales. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 54))_
- ✘ `D-alc-0016` Los conductores de cualquier vehículo no pueden superar 0,3 g/l en sangre ni 0,15 mg/l en aire espirado durante los dos años siguientes a la obtención del permiso. _(RGC 20)_

## D-alc-0005

¿Con cuál de estas bebidas llega el alcohol más rápido a la sangre?  
Respuesta: **Whisky.**

- ✔ El alcohol llega más rápido a la sangre con bebidas como la ginebra o el whisky (destiladas) que con el vino o la cerveza (fermentadas). _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-alc-0003` El alcohol no afecta a todas las personas igual: influyen la cantidad, el peso, el sexo, el tiempo transcurrido, el tipo de bebida, la velocidad a la que se bebe, beber sin comer, la edad y las circunstancias personales. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 54))_
- ✘ `D-dro-0002` Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_

## D-alc-0006

Beber alcohol con el estómago lleno...  
Respuesta: **hace que el alcohol llegue a la sangre de forma más lenta.**

- ✔ La comida ayuda a que el alcohol llegue a la sangre de forma más lenta, pero no impide que llegue. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_
- ✘ `D-dro-0002` Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_

## D-alc-0007

¿Quién está obligado a someterse a las pruebas de detección de alcohol?  
Respuesta: **Los conductores de vehículos y de bicicletas, entre otros.**

- ✔ Todos los conductores de vehículos y de bicicletas están obligados. Los demás usuarios (por ejemplo, los peatones) solo lo están cuando se hallan implicados en un accidente o han cometido una infracción; por eso no es correcto decir 'todos los usuarios en cualquier caso'. _(RGC 21)_
- ✘ `D-alc-0019` Las pruebas de contraste a petición del interesado consistirán preferentemente en análisis de sangre, salvo causas excepcionales justificadas. Si da positivo, la paga el interesado. _(LSV 14.5)_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_

## D-alc-0008

Un peatón implicado en un accidente de circulación, ¿está obligado a someterse a las pruebas de detección de alcohol?  
Respuesta: **Sí.**

- ✔ Además de los conductores, quedan obligados los demás usuarios de la vía, como los peatones, cuando se hallen implicados en algún accidente de circulación. _(RGC 21)_
- ✘ `D-alc-0019` Las pruebas de contraste a petición del interesado consistirán preferentemente en análisis de sangre, salvo causas excepcionales justificadas. Si da positivo, la paga el interesado. _(LSV 14.5)_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_

## D-alc-0009

Un peatón que no está implicado en ningún accidente comete una infracción de tráfico. ¿Está obligado a someterse a las pruebas de alcohol y drogas si se lo requiere un agente?  
Respuesta: **Sí, la Ley obliga también a los usuarios que hayan cometido una infracción.**

- ✔ La Ley de Tráfico obliga a los conductores y, además, a los demás usuarios de la vía cuando se hallen implicados en un accidente de tráfico o hayan cometido una infracción. Esto matiza lo que dice el vídeo (solo en caso de accidente). _(LSV 14.2)_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_
- ✘ `D-alc-0014` La tasa reducida para mercancías solo se aplica a vehículos de más de 3.500 kg de MMA (o mercancías peligrosas, transportes especiales, etc.). Con 3.500 kg exactos y carga general rige la tasa general de 0,25 mg/l. _(RGC 20)_

## D-alc-0010

¿Cuál es la tasa máxima de alcohol en aire espirado para el conductor de un turismo con más de dos años de antigüedad de permiso?  
Respuesta: **0,25 miligramos por litro.**

- ✔ La tasa general es 0,5 gramos por litro en sangre o 0,25 miligramos por litro en aire espirado. _(RGC 20)_
- ✘ `D-alc-0005` El alcohol llega más rápido a la sangre con bebidas como la ginebra o el whisky (destiladas) que con el vino o la cerveza (fermentadas). _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-dro-0007` La cocaína puede volver al conductor más impulsivo o agresivo, hacerle perder la sensación de peligro y conducir de forma más peligrosa. _(MANUAL_DGT Tema 3, Otras drogas (pág. 59))_

## D-alc-0011

¿Cuál es la tasa máxima de alcohol en sangre para el conductor de un turismo con más de dos años de antigüedad de permiso?  
Respuesta: **0,5 gramos por litro.**

- ✔ La tasa general en sangre es 0,5 gramos por litro (el doble de la cifra en aire, 0,25 mg/l). _(RGC 20)_
- ✘ `D-alc-0017` En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-alc-0001` El alcohol produce falsa seguridad en uno mismo, más exposición a riesgos, más faltas y un trato más agresivo o impulsivo hacia otros conductores. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 56))_

## D-alc-0012

Un ciclista mayor de edad, con permiso de conducir de más de dos años de antigüedad, ¿qué tasa máxima de alcohol en aire espirado puede tener?  
Respuesta: **0,25 miligramos por litro.**

- ✔ La tasa general (0,5 g/l en sangre o 0,25 mg/l en aire) se aplica a los conductores de vehículos y también a los conductores de bicicletas. _(RGC 20)_
- ✘ `D-alc-0017` En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-alc-0004` El momento en que la tasa de alcoholemia es más alta es aproximadamente una hora después de beber; después baja muy poco a poco. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_

## D-alc-0013

El conductor de un camión de transporte de mercancías de más de 3.500 kg de masa máxima autorizada, ¿qué tasa máxima de alcohol en aire espirado puede tener?  
Respuesta: **0,15 miligramos por litro.**

- ✔ En vehículos de transporte de mercancías de más de 3.500 kg de MMA, la tasa máxima es 0,3 g/l en sangre o 0,15 mg/l en aire espirado. _(RGC 20)_
- ✘ `D-alc-0017` En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-dro-0007` La cocaína puede volver al conductor más impulsivo o agresivo, hacerle perder la sensación de peligro y conducir de forma más peligrosa. _(MANUAL_DGT Tema 3, Otras drogas (pág. 59))_

## D-alc-0014

Un conductor con diez años de permiso conduce una furgoneta particular, de uso privado, de 3.500 kg de masa máxima autorizada, con carga general (no peligrosa). ¿Qué tasa máxima de alcohol en aire espirado puede tener?  
Respuesta: **0,25 miligramos por litro.**

- ✔ La tasa reducida para mercancías solo se aplica a vehículos de más de 3.500 kg de MMA (o mercancías peligrosas, transportes especiales, etc.). Con 3.500 kg exactos y carga general rige la tasa general de 0,25 mg/l. _(RGC 20)_
- ✘ `D-alc-0017` En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-alc-0024` Si el resultado es positivo, el agente puede inmovilizar inmediatamente el vehículo, a no ser que pueda hacerse cargo de su conducción otra persona debidamente habilitada. _(RGC 25.1)_

## D-alc-0015

El conductor de un autobús de más de nueve plazas, ¿qué tasa máxima de alcohol en sangre puede tener?  
Respuesta: **0,3 gramos por litro.**

- ✔ Para vehículos de transporte de viajeros de más de nueve plazas, de servicio público, transporte escolar y de menores, mercancías peligrosas, urgencias o transportes especiales: 0,3 g/l en sangre o 0,15 mg/l en aire. _(RGC 20)_
- ✘ `D-alc-0017` En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-alc-0002` El alcohol hace que se vean peor las señales, se calculen peor las distancias, se tenga menos capacidad de ver lo que pasa a un lado y a otro y que el conductor se deslumbre más. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 57))_

## D-alc-0016

Durante los dos años siguientes a la obtención del permiso, ¿qué tasa máxima de alcohol en aire espirado puede tener un conductor mayor de edad?  
Respuesta: **0,15 miligramos por litro.**

- ✔ Los conductores de cualquier vehículo no pueden superar 0,3 g/l en sangre ni 0,15 mg/l en aire espirado durante los dos años siguientes a la obtención del permiso. _(RGC 20)_
- ✘ `D-alc-0017` En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-alc-0024` Si el resultado es positivo, el agente puede inmovilizar inmediatamente el vehículo, a no ser que pueda hacerse cargo de su conducción otra persona debidamente habilitada. _(RGC 25.1)_

## D-alc-0017

Un conductor de ciclomotor de 17 años, con dos años de antigüedad en su permiso, ¿qué tasa máxima de alcohol puede tener?  
Respuesta: **0; el conductor menor de edad no puede circular con ninguna tasa de alcohol.**

- ✔ En ningún caso el conductor menor de edad puede circular con una tasa de alcohol superior a 0 g/l en sangre o 0 mg/l en aire espirado, tenga la antigüedad de permiso que tenga. _(LSV 14.1)_
- ✘ `D-alc-0014` La tasa reducida para mercancías solo se aplica a vehículos de más de 3.500 kg de MMA (o mercancías peligrosas, transportes especiales, etc.). Con 3.500 kg exactos y carga general rige la tasa general de 0,25 mg/l. _(RGC 20)_
- ✘ `D-alc-0024` Si el resultado es positivo, el agente puede inmovilizar inmediatamente el vehículo, a no ser que pueda hacerse cargo de su conducción otra persona debidamente habilitada. _(RGC 25.1)_

## D-alc-0018

Entre la primera y la segunda prueba de alcoholemia por aire espirado, ¿qué tiempo mínimo debe transcurrir?  
Respuesta: **10 minutos.**

- ✔ El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_
- ✘ `D-alc-0019` Las pruebas de contraste a petición del interesado consistirán preferentemente en análisis de sangre, salvo causas excepcionales justificadas. Si da positivo, la paga el interesado. _(LSV 14.5)_
- ✘ `D-med-0002` Según la DGT, los antihistamínicos pueden producir sueño, depresión y pérdida de reflejos. _(MANUAL_DGT Tema 3, ¿Qué medicamentos pueden ser peligrosos para conducir? (pág. 65))_

## D-alc-0019

Si el interesado pide repetir la prueba de alcohol a efectos de contraste, ¿en qué consistirá preferentemente?  
Respuesta: **En un análisis de sangre.**

- ✔ Las pruebas de contraste a petición del interesado consistirán preferentemente en análisis de sangre, salvo causas excepcionales justificadas. Si da positivo, la paga el interesado. _(LSV 14.5)_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_
- ✘ `D-dro-0002` Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_

## D-alc-0020

Si la prueba de contraste solicitada por el interesado da resultado positivo, ¿quién la paga?  
Respuesta: **El interesado.**

- ✔ Cuando la prueba de contraste arroja un resultado positivo, la abona el interesado. _(LSV 14.5)_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_
- ✘ `D-dro-0002` Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_

## D-alc-0021

Un conductor con permiso de más de dos años da 0,40 mg/l de alcohol en aire espirado. ¿Cuántos puntos pierde si es sancionado en firme en vía administrativa?  
Respuesta: **4 puntos.**

- ✔ Para conductores en general, una tasa superior a 0,25 y hasta 0,50 mg/l en aire supone la pérdida de 4 puntos; más de 0,50 mg/l, 6 puntos. _(LSV Anexo II.1)_
- ✘ `D-alc-0013` En vehículos de transporte de mercancías de más de 3.500 kg de MMA, la tasa máxima es 0,3 g/l en sangre o 0,15 mg/l en aire espirado. _(RGC 20)_
- ✘ `D-alc-0005` El alcohol llega más rápido a la sangre con bebidas como la ginebra o el whisky (destiladas) que con el vino o la cerveza (fermentadas). _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_

## D-alc-0022

Un conductor novel, con menos de dos años de permiso, da 0,35 mg/l de alcohol en aire espirado. ¿Cuántos puntos pierde si es sancionado en firme en vía administrativa?  
Respuesta: **6 puntos.**

- ✔ Para profesionales y titulares de permisos con menos de dos años de antigüedad, más de 0,30 mg/l en aire supone la pérdida de 6 puntos (de más de 0,15 hasta 0,30 mg/l, 4 puntos). _(LSV Anexo II.1)_
- ✘ `D-alc-0001` El alcohol produce falsa seguridad en uno mismo, más exposición a riesgos, más faltas y un trato más agresivo o impulsivo hacia otros conductores. _(MANUAL_DGT Tema 3, Efectos del alcohol mientras conduces (pág. 56))_
- ✘ `D-dro-0002` Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_

## D-alc-0023

Un conductor con permiso de más de dos años, que no ha sido sancionado por alcohol en el año anterior, da 0,30 mg/l en aire espirado. ¿Qué multa le corresponde?  
Respuesta: **500 euros.**

- ✔ Conducir con una tasa superior a la permitida es infracción muy grave (LSV 77.c), sancionada con 500 euros (80.1). La multa de 1.000 euros solo se impone si ya fue sancionado en el año anterior por alcohol o si supera el doble de la tasa permitida (0,50 mg/l en este caso). _(LSV 80.2.a)_
- ✘ `D-alc-0022` Para profesionales y titulares de permisos con menos de dos años de antigüedad, más de 0,30 mg/l en aire supone la pérdida de 6 puntos (de más de 0,15 hasta 0,30 mg/l, 4 puntos). _(LSV Anexo II.1)_
- ✘ `D-alc-0003` El alcohol no afecta a todas las personas igual: influyen la cantidad, el peso, el sexo, el tiempo transcurrido, el tipo de bebida, la velocidad a la que se bebe, beber sin comer, la edad y las circunstancias personales. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 54))_

## D-alc-0024

Si la prueba de alcoholemia de un conductor da positivo, ¿qué puede hacer el agente con el vehículo?  
Respuesta: **Inmovilizarlo, salvo que pueda hacerse cargo de su conducción otra persona debidamente habilitada.**

- ✔ Si el resultado es positivo, el agente puede inmovilizar inmediatamente el vehículo, a no ser que pueda hacerse cargo de su conducción otra persona debidamente habilitada. _(RGC 25.1)_
- ✘ `D-alc-0004` El momento en que la tasa de alcoholemia es más alta es aproximadamente una hora después de beber; después baja muy poco a poco. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_

## D-nov-0001

Una persona tiene desde hace tres años el permiso AM de ciclomotor y acaba de obtener el permiso B. ¿Debe llevar la señal de conductor novel (L) en el turismo?  
Respuesta: **No, porque ya ha sido titular de otro permiso durante al menos un año.**

- ✔ La señal V-13 la llevan quienes obtienen por primera vez un permiso de conducción, durante un año. No se considera que lo obtienen por primera vez quienes han sido titulares, con posesión efectiva durante al menos un año, de otro permiso de cualquier clase. _(RGV Anexo XI, V-13.2)_
- ✘ `res-seg-0002` La cobertura del seguro obligatorio no alcanza a los daños en el propio vehículo asegurado ni en las cosas transportadas en él. Si el otro conductor tiene la culpa, paga el seguro del otro, no el propio. _(LRCSCVM 5.2)_
- ✘ `res-itv-0001` Turismos (M1): exentos hasta 4 años, bienal de 4 a 10 años y anual a partir de 10. No se aplica a taxis, ambulancias, autoescuelas ni transporte escolar, que tienen plazos más cortos. _(ITV 6.1 (tabla))_

## D-dro-0001

¿Puede conducir una persona que tiene presencia de drogas en el organismo, aunque ya no note sus efectos?  
Respuesta: **No, está prohibido conducir con presencia de drogas en el organismo.**

- ✔ No puede circular el conductor de cualquier vehículo con presencia de drogas en el organismo. Se excluyen solo las sustancias usadas bajo prescripción facultativa y con finalidad terapéutica, si se está en condiciones de conducir con diligencia. _(LSV 14.1)_
- ✘ `D-alc-0015` Para vehículos de transporte de viajeros de más de nueve plazas, de servicio público, transporte escolar y de menores, mercancías peligrosas, urgencias o transportes especiales: 0,3 g/l en sangre o 0,15 mg/l en aire. _(RGC 20)_
- ✘ `D-alc-0003` El alcohol no afecta a todas las personas igual: influyen la cantidad, el peso, el sexo, el tiempo transcurrido, el tipo de bebida, la velocidad a la que se bebe, beber sin comer, la edad y las circunstancias personales. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 54))_

## D-dro-0002

¿Con qué multa se sanciona conducir con presencia de drogas en el organismo, cuando no es delito?  
Respuesta: **1.000 euros.**

- ✔ Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_
- ✘ `D-alc-0011` La tasa general en sangre es 0,5 gramos por litro (el doble de la cifra en aire, 0,25 mg/l). _(RGC 20)_
- ✘ `D-med-0002` Según la DGT, los antihistamínicos pueden producir sueño, depresión y pérdida de reflejos. _(MANUAL_DGT Tema 3, ¿Qué medicamentos pueden ser peligrosos para conducir? (pág. 65))_

## D-dro-0003

¿Cuántos puntos pierde el conductor sancionado en firme por conducir con presencia de drogas en el organismo?  
Respuesta: **6 puntos.**

- ✔ Conducir con presencia de drogas en el organismo supone la pérdida de 6 puntos (LSV, Anexo II, apartado 2). _(LSV Anexo II.2)_
- ✘ `D-alc-0012` La tasa general (0,5 g/l en sangre o 0,25 mg/l en aire) se aplica a los conductores de vehículos y también a los conductores de bicicletas. _(RGC 20)_
- ✘ `D-alc-0004` El momento en que la tasa de alcoholemia es más alta es aproximadamente una hora después de beber; después baja muy poco a poco. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 55))_

## D-dro-0004

¿En qué consiste normalmente la prueba de detección de drogas que realizan los agentes de tráfico?  
Respuesta: **En una prueba salival mediante un dispositivo autorizado y un posterior análisis de una muestra salival.**

- ✔ La detección de la presencia de drogas consiste en una prueba salival mediante dispositivo autorizado y un posterior análisis de una muestra salival en cantidad suficiente. _(LSV 14.3)_
- ✘ `D-alc-0013` En vehículos de transporte de mercancías de más de 3.500 kg de MMA, la tasa máxima es 0,3 g/l en sangre o 0,15 mg/l en aire espirado. _(RGC 20)_
- ✘ `D-dro-0002` Conducir con presencia de drogas en el organismo es infracción muy grave (LSV 77.c) y se sanciona con multa de 1.000 euros (80.2.a). _(LSV 80.2.a)_

## D-dro-0005

Un conductor toma un medicamento con una sustancia considerada droga, recetado por su médico con finalidad terapéutica, y está en condiciones de conducir con seguridad. ¿Comete la infracción de conducir con presencia de drogas?  
Respuesta: **No, esas sustancias están excluidas si se está en condiciones de conducir con diligencia.**

- ✔ La prohibición de conducir con presencia de drogas excluye las sustancias usadas bajo prescripción facultativa y con finalidad terapéutica, siempre que se esté en condiciones de utilizar el vehículo con diligencia, precaución y sin distracción. _(LSV 14.1)_
- ✘ `D-alc-0014` La tasa reducida para mercancías solo se aplica a vehículos de más de 3.500 kg de MMA (o mercancías peligrosas, transportes especiales, etc.). Con 3.500 kg exactos y carga general rige la tasa general de 0,25 mg/l. _(RGC 20)_
- ✘ `D-alc-0003` El alcohol no afecta a todas las personas igual: influyen la cantidad, el peso, el sexo, el tiempo transcurrido, el tipo de bebida, la velocidad a la que se bebe, beber sin comer, la edad y las circunstancias personales. _(MANUAL_DGT Tema 3, ¿Qué factores influyen en la tasa de alcoholemia? (pág. 54))_

## D-dro-0006

¿Cuál de estos es un posible efecto del cannabis en la conducción?  
Respuesta: **Necesitar más tiempo para reaccionar y poder dormirse conduciendo.**

- ✔ El cannabis puede alterar la percepción del entorno, hacer calcular peor las distancias, perder la concentración, necesitar más tiempo para reaccionar y dormirse conduciendo. _(MANUAL_DGT Tema 3, Otras drogas (pág. 58))_
- ✘ `D-dro-0007` La cocaína puede volver al conductor más impulsivo o agresivo, hacerle perder la sensación de peligro y conducir de forma más peligrosa. _(MANUAL_DGT Tema 3, Otras drogas (pág. 59))_
- ✘ `D-alc-0018` El agente debe advertir al interesado de su derecho a controlar que entre la primera y la segunda prueba medie un tiempo mínimo de 10 minutos. _(RGC 23.2)_

## D-dro-0007

¿Qué efecto puede producir la cocaína en el conductor?  
Respuesta: **Volverse más impulsivo o agresivo y perder la sensación de peligro.**

- ✔ La cocaína puede volver al conductor más impulsivo o agresivo, hacerle perder la sensación de peligro y conducir de forma más peligrosa. _(MANUAL_DGT Tema 3, Otras drogas (pág. 59))_
- ✘ `D-dro-0006` El cannabis puede alterar la percepción del entorno, hacer calcular peor las distancias, perder la concentración, necesitar más tiempo para reaccionar y dormirse conduciendo. _(MANUAL_DGT Tema 3, Otras drogas (pág. 58))_
- ✘ `D-dro-0004` La detección de la presencia de drogas consiste en una prueba salival mediante dispositivo autorizado y un posterior análisis de una muestra salival en cantidad suficiente. _(LSV 14.3)_

## D-pos-0001

¿Qué es el efecto submarino?  
Respuesta: **Que, en un accidente, el cuerpo se desliza hacia abajo, por debajo del cinturón.**

- ✔ El efecto submarino se produce cuando en un accidente el cuerpo se desliza por debajo del cinturón; ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_
- ✘ `C-per-0004` En asientos delanteros con airbag frontal solo pueden usarse sistemas de retención orientados hacia atrás si el airbag ha sido desactivado. _(RGC 117.3)_
- ✘ `C-per-0013` Para ciclistas el casco es obligatorio en vías interurbanas y, en todo tipo de vías, para los menores de dieciséis años. Los ciclistas profesionales también deben llevarlo en vías urbanas y travesías. _(RGC 118.2)_

## D-pos-0002

¿Qué favorece que se produzca el efecto submarino?  
Respuesta: **Llevar el respaldo del asiento muy inclinado hacia atrás y el cinturón mal colocado.**

- ✔ El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_
- ✘ `E-pas-0002` La cinta torácica debe pasar por la clavícula, entre hombro y cuello, y bajar por el centro del pecho. Sobre el cuello puede causar lesiones graves y sobre el hombro puede resbalar. _(MANUAL_DGT Tema 5, ¿Cómo se abrocha el cinturón de seguridad? (p. 113))_
- ✘ `C-per-0006` La exención para vehículos en servicio de urgencia solo alcanza a la circulación en poblado. (Los pasajeros que asisten al paciente en ambulancias asistenciales tienen una exención propia.) _(RGC 119.2)_

## D-pos-0003

¿Cómo puede comprobar si el respaldo está a la distancia adecuada del volante?  
Respuesta: **Con la espalda apoyada en el respaldo y los brazos estirados, las muñecas deben poder apoyarse sobre la parte de arriba del volante.**

- ✔ Apoyando la espalda en el respaldo y estirando los brazos, las muñecas deben poder apoyarse sobre la parte de arriba del volante. Las piernas deben quedar ligeramente dobladas. _(MANUAL_DGT Tema 6, Reglas para conducir turismos (pág. 130))_
- ✘ `res-seg-0004` El manual de la DGT indica coger el volante con las dos manos, por la parte exterior, con firmeza pero sin mucha fuerza y sin cruzar las manos al girar. _(MANUAL_DGT Tema 6, cómo coger el volante (p. 123))_
- ✘ `D-pos-0005` El volante se coge con las dos manos (soltando una solo el tiempo justo para manejar otros mandos), por la parte exterior y con firmeza, pero sin hacer mucha fuerza. _(MANUAL_DGT Tema 6, ¿Cómo debes coger el volante? (pág. 123))_

## D-pos-0004

Con el asiento bien ajustado, las piernas del conductor deben quedar...  
Respuesta: **ligeramente dobladas.**

- ✔ El asiento está bien ajustado cuando se llega bien a los pedales pudiendo pisarlos a fondo y las piernas no están extendidas del todo, sino ligeramente dobladas. _(MANUAL_DGT Tema 6, Reglas para conducir turismos (pág. 130))_
- ✘ `D-pos-0005` El volante se coge con las dos manos (soltando una solo el tiempo justo para manejar otros mandos), por la parte exterior y con firmeza, pero sin hacer mucha fuerza. _(MANUAL_DGT Tema 6, ¿Cómo debes coger el volante? (pág. 123))_
- ✘ `res-seg-0004` El manual de la DGT indica coger el volante con las dos manos, por la parte exterior, con firmeza pero sin mucha fuerza y sin cruzar las manos al girar. _(MANUAL_DGT Tema 6, cómo coger el volante (p. 123))_

## D-pos-0005

¿Cómo debe cogerse el volante?  
Respuesta: **Con las dos manos, por la parte exterior.**

- ✔ El volante se coge con las dos manos (soltando una solo el tiempo justo para manejar otros mandos), por la parte exterior y con firmeza, pero sin hacer mucha fuerza. _(MANUAL_DGT Tema 6, ¿Cómo debes coger el volante? (pág. 123))_
- ✘ `D-pos-0004` El asiento está bien ajustado cuando se llega bien a los pedales pudiendo pisarlos a fondo y las piernas no están extendidas del todo, sino ligeramente dobladas. _(MANUAL_DGT Tema 6, Reglas para conducir turismos (pág. 130))_
- ✘ `E-neu-0006` La goma envejece: el manual de la DGT indica cambiar los neumáticos cada cinco años aunque estén en buen estado. _(MANUAL_DGT Tema 5, Desgaste de los neumáticos (p. 100))_

## D-man-0001

Cuando se pisa a fondo el pedal de embrague...  
Respuesta: **el movimiento del motor no se transmite a la caja de cambios ni a las ruedas.**

- ✔ Al pisar a fondo el embrague, el movimiento del motor no se transmite a la caja de cambios ni a las ruedas, lo que permite cambiar de velocidad. _(MANUAL_DGT Tema 6, Pedal de embrague (pág. 122))_
- ✘ `D-man-0002` Tanto el acelerador como el freno se pisan con el pie derecho; el embrague, con el izquierdo. _(MANUAL_DGT Tema 6, Pedal del freno (pág. 121))_
- ✘ `D-man-0005` El embrague de la motocicleta es una palanca de la mano izquierda; el cambio de marchas se hace con un pedal que suele estar a la izquierda. _(MANUAL_DGT Tema 6, Mandos de las motocicletas (pág. 124))_

## D-man-0002

En un turismo, ¿con qué pie se pisa el pedal del freno?  
Respuesta: **Con el pie derecho.**

- ✔ Tanto el acelerador como el freno se pisan con el pie derecho; el embrague, con el izquierdo. _(MANUAL_DGT Tema 6, Pedal del freno (pág. 121))_
- ✘ `D-man-0005` El embrague de la motocicleta es una palanca de la mano izquierda; el cambio de marchas se hace con un pedal que suele estar a la izquierda. _(MANUAL_DGT Tema 6, Mandos de las motocicletas (pág. 124))_
- ✘ `D-man-0001` Al pisar a fondo el embrague, el movimiento del motor no se transmite a la caja de cambios ni a las ruedas, lo que permite cambiar de velocidad. _(MANUAL_DGT Tema 6, Pedal de embrague (pág. 122))_

## D-man-0003

En una motocicleta, ¿con qué se acciona normalmente el freno de la rueda de atrás?  
Respuesta: **Con un pedal, normalmente en la parte derecha.**

- ✔ El freno de la rueda trasera se acciona con un pedal que suele estar en la parte derecha de la motocicleta. El freno delantero y el acelerador están en el lado derecho del manillar; el embrague, en la mano izquierda, y el pedal de cambio suele estar a la izquierda. _(MANUAL_DGT Tema 6, Mandos de las motocicletas (pág. 125))_
- ✘ `D-man-0001` Al pisar a fondo el embrague, el movimiento del motor no se transmite a la caja de cambios ni a las ruedas, lo que permite cambiar de velocidad. _(MANUAL_DGT Tema 6, Pedal de embrague (pág. 122))_
- ✘ `res-veh-0002` Un vehículo de motor enganchado a un remolque es un tren de carretera, es decir, un conjunto de vehículos. Los conjuntos de vehículos no especiales deben llevar un extintor homologado, además del V-16 y el chaleco. _(RGV Anexo XII.2)_

## D-man-0004

En una motocicleta, ¿con qué mano se acciona el freno de la rueda delantera?  
Respuesta: **Con la mano derecha.**

- ✔ El freno delantero es una palanca que se acciona con la mano derecha, en el mismo lado que el acelerador. _(MANUAL_DGT Tema 6, Mandos de las motocicletas (pág. 124))_
- ✘ `D-man-0002` Tanto el acelerador como el freno se pisan con el pie derecho; el embrague, con el izquierdo. _(MANUAL_DGT Tema 6, Pedal del freno (pág. 121))_
- ✘ `D-man-0001` Al pisar a fondo el embrague, el movimiento del motor no se transmite a la caja de cambios ni a las ruedas, lo que permite cambiar de velocidad. _(MANUAL_DGT Tema 6, Pedal de embrague (pág. 122))_

## D-man-0005

En una motocicleta, ¿con qué mano se acciona el embrague?  
Respuesta: **Con la mano izquierda.**

- ✔ El embrague de la motocicleta es una palanca de la mano izquierda; el cambio de marchas se hace con un pedal que suele estar a la izquierda. _(MANUAL_DGT Tema 6, Mandos de las motocicletas (pág. 124))_
- ✘ `D-man-0001` Al pisar a fondo el embrague, el movimiento del motor no se transmite a la caja de cambios ni a las ruedas, lo que permite cambiar de velocidad. _(MANUAL_DGT Tema 6, Pedal de embrague (pág. 122))_
- ✘ `D-man-0002` Tanto el acelerador como el freno se pisan con el pie derecho; el embrague, con el izquierdo. _(MANUAL_DGT Tema 6, Pedal del freno (pág. 121))_

## E-seg-0001

¿Qué son los elementos de seguridad activa de un vehículo?  
Respuesta: **Los elementos pensados para evitar que se produzca un accidente, como los frenos, las ruedas o las luces.**

- ✔ La seguridad activa la forman los elementos del vehículo pensados para evitar accidentes (frenos, ruedas, alumbrado). _(MANUAL_DGT Tema 5, Seguridad activa (p. 88))_
- ✘ `E-fre-0002` Con ABS, en una frenada de emergencia hay que pisar fuerte y a fondo y mantener el pedal pisado hasta la detención; la vibración es el funcionamiento normal del sistema. _(MANUAL_DGT Tema 5, ¿Cómo se usan los frenos? (p. 95))_
- ✘ `E-seg-0003` Las luces adaptativas ajustan intensidad y zona iluminada; las angulares iluminan hacia el lado al que se gira, lo que ayuda a ver en las curvas. _(MANUAL_DGT Tema 5, Luces adaptativas (p. 90))_

## E-seg-0002

El reposacabezas, ¿a qué tipo de seguridad del vehículo pertenece?  
Respuesta: **A la seguridad pasiva, porque ayuda a que los ocupantes sufran menos daños en un accidente.**

- ✔ El reposacabezas, igual que el cinturón y el airbag, es un elemento de seguridad pasiva: reduce los daños cuando el accidente ya se ha producido. _(MANUAL_DGT Tema 5, Seguridad pasiva (p. 88))_
- ✘ `E-pas-0016` El casco en bicicleta es obligatorio en vías interurbanas y, para los menores de dieciséis años, en todo tipo de vías. _(RGC 118.2)_
- ✘ `C-per-0005` Cuando el vehículo no dispone de asientos traseros, el menor puede ir delante, siempre con un sistema de retención homologado adaptado a su talla y peso. _(RGC 117.3)_

## E-neu-0001

¿Cuál es la profundidad mínima de las ranuras principales de la banda de rodadura de los neumáticos de un turismo?  
Respuesta: **1,6 mm.**

- ✔ Los neumáticos de las categorías M1, N1, O1 y O2 (turismos, furgonetas ligeras y remolques ligeros) deben tener como mínimo 1,6 mm de profundidad en las ranuras principales. _(RGV Anexo VII.2)_
- ✘ `A-adv-0010` En los turismos (M1), cuando el retrovisor interior no permite la visión del campo reglamentario hacia atrás, este pasa a ser opcional y debe colocarse un segundo retrovisor exterior en el lado derecho. _(RGV Anexo III.2, nota (1))_
- ✘ `E-mec-0007` El líquido refrigerante absorbe el calor del motor, se enfría en el radiador y vuelve al motor impulsado por la bomba de agua. _(MANUAL_DGT Tema 15, Sistema de refrigeración (p. 377))_

## E-neu-0002

¿Cuál es la profundidad mínima del dibujo de los neumáticos de un autobús o de un camión de más de 3.500 kg?  
Respuesta: **1,0 mm.**

- ✔ Para las categorías M2, M3, N2, N3, O3 y O4 (autobuses, camiones de más de 3.500 kg y remolques pesados) el mínimo es 1,0 mm; el de 1,6 mm es para turismos y vehículos ligeros. _(RGV Anexo VII.2)_
- ✘ `E-mec-0003` El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_
- ✘ `A-adv-0010` En los turismos (M1), cuando el retrovisor interior no permite la visión del campo reglamentario hacia atrás, este pasa a ser opcional y debe colocarse un segundo retrovisor exterior en el lado derecho. _(RGV Anexo III.2, nota (1))_

## E-neu-0003

¿Quién establece la presión de inflado que deben llevar los neumáticos de un turismo?  
Respuesta: **El fabricante del vehículo.**

- ✔ Es el fabricante de cada vehículo quien marca la presión de inflado de sus neumáticos (suele indicarse en una etiqueta en el marco de la puerta o en el manual). _(MANUAL_DGT Tema 5, Presión de inflado (p. 98))_
- ✘ `E-neu-0004` Con exceso de presión el neumático apoya peor, se agarra menos y se desgasta más por el centro que por los lados. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_
- ✘ `A-adv-0010` En los turismos (M1), cuando el retrovisor interior no permite la visión del campo reglamentario hacia atrás, este pasa a ser opcional y debe colocarse un segundo retrovisor exterior en el lado derecho. _(RGV Anexo III.2, nota (1))_

## E-neu-0004

Si un neumático lleva una presión de inflado mayor de la recomendada, ¿por dónde se desgasta más?  
Respuesta: **Por el centro de la banda de rodadura.**

- ✔ Con exceso de presión el neumático apoya peor, se agarra menos y se desgasta más por el centro que por los lados. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_
- ✘ `res-luc-0002` Todo automóvil debe llevar luz antiniebla trasera. La antiniebla delantera es un dispositivo facultativo. _(RGV 17.1)_
- ✘ `E-mec-0003` El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_

## E-neu-0005

Un neumático presenta un bulto (ampolla) en su costado, aunque el dibujo tiene más de 1,6 mm. ¿Puede seguir usándose?  
Respuesta: **No; un neumático no debe presentar ampollas ni deformaciones anormales.**

- ✔ El Reglamento de Vehículos exige que los neumáticos no presenten ampollas, deformaciones anormales ni roturas, con independencia de la profundidad del dibujo. _(RGV Anexo VII.4)_
- ✘ `E-neu-0006` La goma envejece: el manual de la DGT indica cambiar los neumáticos cada cinco años aunque estén en buen estado. _(MANUAL_DGT Tema 5, Desgaste de los neumáticos (p. 100))_
- ✘ `res-luc-0002` Todo automóvil debe llevar luz antiniebla trasera. La antiniebla delantera es un dispositivo facultativo. _(RGV 17.1)_

## E-neu-0006

Según el manual de la DGT, ¿cada cuánto tiempo conviene cambiar los neumáticos, aunque parezcan en buen estado?  
Respuesta: **Cada cinco años.**

- ✔ La goma envejece: el manual de la DGT indica cambiar los neumáticos cada cinco años aunque estén en buen estado. _(MANUAL_DGT Tema 5, Desgaste de los neumáticos (p. 100))_
- ✘ `E-neu-0005` El Reglamento de Vehículos exige que los neumáticos no presenten ampollas, deformaciones anormales ni roturas, con independencia de la profundidad del dibujo. _(RGV Anexo VII.4)_
- ✘ `E-mec-0010` Si el impulso llega a las ruedas delanteras es de tracción; a las traseras, de propulsión; a todas, de tracción total. _(MANUAL_DGT Tema 15, Sistema de transmisión (p. 379))_

## E-fre-0001

¿Qué hace el sistema ABS?  
Respuesta: **Evita que las ruedas se bloqueen al frenar, lo que ayuda a mantener el control del vehículo.**

- ✔ El ABS (sistema antibloqueo de frenos) evita el bloqueo de las ruedas al frenar, de modo que se conserva el control de la dirección y se frena en menos espacio. _(MANUAL_DGT Tema 5, Sistema antibloqueo de frenos (ABS) (p. 93))_
- ✘ `E-fre-0002` Con ABS, en una frenada de emergencia hay que pisar fuerte y a fondo y mantener el pedal pisado hasta la detención; la vibración es el funcionamiento normal del sistema. _(MANUAL_DGT Tema 5, ¿Cómo se usan los frenos? (p. 95))_
- ✘ `E-seg-0001` La seguridad activa la forman los elementos del vehículo pensados para evitar accidentes (frenos, ruedas, alumbrado). _(MANUAL_DGT Tema 5, Seguridad activa (p. 88))_

## E-fre-0002

En una frenada de emergencia con un vehículo que tiene ABS, notas que el pedal del freno vibra. ¿Qué debes hacer?  
Respuesta: **Seguir pisando el freno fuerte y a fondo hasta que el vehículo se pare.**

- ✔ Con ABS, en una frenada de emergencia hay que pisar fuerte y a fondo y mantener el pedal pisado hasta la detención; la vibración es el funcionamiento normal del sistema. _(MANUAL_DGT Tema 5, ¿Cómo se usan los frenos? (p. 95))_
- ✘ `E-seg-0003` Las luces adaptativas ajustan intensidad y zona iluminada; las angulares iluminan hacia el lado al que se gira, lo que ayuda a ver en las curvas. _(MANUAL_DGT Tema 5, Luces adaptativas (p. 90))_
- ✘ `E-seg-0001` La seguridad activa la forman los elementos del vehículo pensados para evitar accidentes (frenos, ruedas, alumbrado). _(MANUAL_DGT Tema 5, Seguridad activa (p. 88))_

## E-mec-0001

¿Cuál es la función principal del sistema de suspensión?  
Respuesta: **Mantener el contacto entre los neumáticos y la carretera en todo momento.**

- ✔ La suspensión mantiene los neumáticos en contacto con la carretera, lo que da estabilidad y además comodidad. _(MANUAL_DGT Tema 15, Sistema de suspensión (p. 382))_
- ✘ `res-veh-0001` En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo). _(RGV Anexo III.3 (tabla))_
- ✘ `E-mec-0003` El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_

## E-seg-0003

¿Qué hacen las luces adaptativas?  
Respuesta: **Ajustan la intensidad de las luces y el lugar donde alumbran según las necesidades de cada momento, por ejemplo en las curvas.**

- ✔ Las luces adaptativas ajustan intensidad y zona iluminada; las angulares iluminan hacia el lado al que se gira, lo que ayuda a ver en las curvas. _(MANUAL_DGT Tema 5, Luces adaptativas (p. 90))_
- ✘ `E-seg-0001` La seguridad activa la forman los elementos del vehículo pensados para evitar accidentes (frenos, ruedas, alumbrado). _(MANUAL_DGT Tema 5, Seguridad activa (p. 88))_
- ✘ `E-fre-0002` Con ABS, en una frenada de emergencia hay que pisar fuerte y a fondo y mantener el pedal pisado hasta la detención; la vibración es el funcionamiento normal del sistema. _(MANUAL_DGT Tema 5, ¿Cómo se usan los frenos? (p. 95))_

## E-pas-0001

¿Por qué la carrocería de un vehículo está diseñada para deformarse en un choque?  
Respuesta: **Para que los ocupantes sufran menos daños.**

- ✔ En un accidente el chasis y la carrocería se deforman para proteger a los ocupantes, que así sufren menos daños. _(MANUAL_DGT Tema 5, El chasis y la carrocería (p. 106))_
- ✘ `C-per-0002` El criterio es la estatura: los menores de edad que midan 135 cm o menos deben usar sistemas de retención infantil. _(RGC 117.1)_
- ✘ `E-pas-0005` El airbag es un complemento del cinturón: hay que usar siempre el cinturón para que el impacto contra el airbag sea menor. _(MANUAL_DGT Tema 5, Los airbags (p. 115))_

## E-pas-0002

¿Por dónde debe pasar la banda torácica (la del pecho) del cinturón de seguridad?  
Respuesta: **Por la clavícula, entre el hombro y el cuello, bajando por el centro del pecho.**

- ✔ La cinta torácica debe pasar por la clavícula, entre hombro y cuello, y bajar por el centro del pecho. Sobre el cuello puede causar lesiones graves y sobre el hombro puede resbalar. _(MANUAL_DGT Tema 5, ¿Cómo se abrocha el cinturón de seguridad? (p. 113))_
- ✘ `E-pas-0005` El airbag es un complemento del cinturón: hay que usar siempre el cinturón para que el impacto contra el airbag sea menor. _(MANUAL_DGT Tema 5, Los airbags (p. 115))_
- ✘ `E-pas-0007` En vehículos de hasta nueve plazas estos menores deben ir en los asientos traseros con SRI homologado; solo excepcionalmente pueden ir delante. _(RGC 117.3)_

## E-pas-0003

¿Dónde debe colocarse la banda abdominal del cinturón de seguridad?  
Respuesta: **Sobre los huesos de la cadera, siempre por debajo del estómago.**

- ✔ La cinta abdominal va sobre los huesos de la cadera, por debajo del estómago; por encima puede causar lesiones internas graves. _(MANUAL_DGT Tema 5, ¿Cómo se abrocha el cinturón de seguridad? (p. 113))_
- ✘ `C-per-0007` Los conductores pueden circular sin cinturón al efectuar la maniobra de marcha atrás o de estacionamiento. _(RGC 119.1.a)_
- ✘ `D-pos-0002` El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_

## E-pas-0004

Según la Ley de Tráfico, no hacer uso del cinturón de seguridad, o no hacerlo de forma adecuada (por ejemplo, llevarlo flojo con una pinza), ¿qué tipo de infracción es?  
Respuesta: **Grave.**

- ✔ La Ley de Tráfico califica como infracción grave no usar, o no usar de forma adecuada, el cinturón, los sistemas de retención infantil, el casco y demás elementos de protección obligatorios. _(LSV 76.h)_
- ✘ `D-pos-0002` El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_
- ✘ `E-pas-0015` Tras la reforma del Reglamento General de Circulación, conductores y pasajeros de motocicletas, ciclomotores y similares deben llevar guantes de protección en vías interurbanas, y calzado cerrado en todo tipo de vías. _(RGC 118.1.b)_

## E-pas-0005

El airbag frontal, ¿hace innecesario el cinturón de seguridad?  
Respuesta: **No; hay que llevar siempre el cinturón, también para que el impacto contra el airbag sea menor.**

- ✔ El airbag es un complemento del cinturón: hay que usar siempre el cinturón para que el impacto contra el airbag sea menor. _(MANUAL_DGT Tema 5, Los airbags (p. 115))_
- ✘ `C-per-0008` El embarazo no exime por sí solo. Solo están exentas las personas con certificado de exención por razones médicas graves o con discapacidad. _(RGC 119.1.b)_
- ✘ `E-pas-0008` Si el asiento delantero tiene airbag frontal, los sistemas orientados hacia atrás solo pueden usarse con el airbag desactivado. _(RGC 117.3)_

## E-pas-0007

En un turismo, un menor de 1,20 m de estatura, ¿dónde debe viajar como norma general?  
Respuesta: **En los asientos traseros, con un sistema de retención infantil adaptado a su talla y peso.**

- ✔ En vehículos de hasta nueve plazas estos menores deben ir en los asientos traseros con SRI homologado; solo excepcionalmente pueden ir delante. _(RGC 117.3)_
- ✘ `D-pos-0002` El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_
- ✘ `E-pas-0010` El manual de la DGT recomienda que la distancia entre la cabeza y el reposacabezas sea de cuatro centímetros o menos. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_

## E-pas-0008

Un menor que debe usar sistema de retención infantil viaja excepcionalmente en el asiento delantero, que tiene airbag frontal. ¿Puede usar una silla orientada hacia atrás?  
Respuesta: **Solo si el airbag ha sido desactivado.**

- ✔ Si el asiento delantero tiene airbag frontal, los sistemas orientados hacia atrás solo pueden usarse con el airbag desactivado. _(RGC 117.3)_
- ✘ `E-pas-0016` El casco en bicicleta es obligatorio en vías interurbanas y, para los menores de dieciséis años, en todo tipo de vías. _(RGC 118.2)_
- ✘ `D-pos-0001` El efecto submarino se produce cuando en un accidente el cuerpo se desliza por debajo del cinturón; ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_

## E-pas-0009

¿En qué caso puede un menor de 135 cm o menos ocupar el asiento delantero de un turismo (siempre con su sistema de retención)?  
Respuesta: **Cuando todos los asientos traseros estén ya ocupados por menores que deben usar sistema de retención.**

- ✔ Excepciones: que no haya asientos traseros, que estén todos ocupados por menores en esa situación o que no se puedan instalar en ellos todos los SRI. _(RGC 117.3)_
- ✘ `E-pas-0003` La cinta abdominal va sobre los huesos de la cadera, por debajo del estómago; por encima puede causar lesiones internas graves. _(MANUAL_DGT Tema 5, ¿Cómo se abrocha el cinturón de seguridad? (p. 113))_
- ✘ `E-pas-0010` El manual de la DGT recomienda que la distancia entre la cabeza y el reposacabezas sea de cuatro centímetros o menos. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_

## E-pas-0010

¿Qué distancia aproximada debe haber entre la cabeza y el reposacabezas?  
Respuesta: **Cuatro centímetros o menos.**

- ✔ El manual de la DGT recomienda que la distancia entre la cabeza y el reposacabezas sea de cuatro centímetros o menos. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_
- ✘ `C-per-0007` Los conductores pueden circular sin cinturón al efectuar la maniobra de marcha atrás o de estacionamiento. _(RGC 119.1.a)_
- ✘ `E-pas-0001` En un accidente el chasis y la carrocería se deforman para proteger a los ocupantes, que así sufren menos daños. _(MANUAL_DGT Tema 5, El chasis y la carrocería (p. 106))_

## E-pas-0011

¿A qué altura debe quedar la parte de arriba del reposacabezas?  
Respuesta: **A la misma altura que la parte de arriba de la cabeza.**

- ✔ La parte superior del reposacabezas debe quedar a la misma altura que la parte superior de la cabeza. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_
- ✘ `E-seg-0002` El reposacabezas, igual que el cinturón y el airbag, es un elemento de seguridad pasiva: reduce los daños cuando el accidente ya se ha producido. _(MANUAL_DGT Tema 5, Seguridad pasiva (p. 88))_
- ✘ `E-pas-0016` El casco en bicicleta es obligatorio en vías interurbanas y, para los menores de dieciséis años, en todo tipo de vías. _(RGC 118.2)_

## E-pas-0012

¿Para qué sirve principalmente el reposacabezas?  
Respuesta: **Para proteger el cuello y las cervicales en caso de un golpe brusco, como un alcance por detrás.**

- ✔ El reposacabezas es un elemento de seguridad pasiva que protege el cuello y las cervicales en un golpe brusco. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_
- ✘ `C-per-0002` El criterio es la estatura: los menores de edad que midan 135 cm o menos deben usar sistemas de retención infantil. _(RGC 117.1)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_

## E-pas-0013

En cuanto al color del casco, ¿cuáles se consideran más seguros?  
Respuesta: **Los claros y brillantes.**

- ✔ Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `E-pas-0017` Los conductores de vehículos de movilidad personal están obligados a utilizar casco homologado o certificado. _(RGC 118.3)_
- ✘ `E-pas-0010` El manual de la DGT recomienda que la distancia entre la cabeza y el reposacabezas sea de cuatro centímetros o menos. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_

## E-pas-0014

¿En qué vías deben usar casco homologado los conductores y pasajeros de motocicletas y ciclomotores?  
Respuesta: **En todo tipo de vías.**

- ✔ Conductores y pasajeros de motocicletas, ciclomotores, vehículos de tres ruedas, cuadriciclos y quads deben usar casco homologado abrochado en todo tipo de vías (salvo vehículos con estructura de autoprotección y cinturón). _(RGC 118.1.a)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `D-pos-0002` El efecto submarino ocurre porque el asiento está inclinado hacia atrás y el cinturón mal colocado. Para evitarlo hay que abrocharse bien el cinturón y no inclinar mucho el asiento. _(MANUAL_DGT Tema 5, El efecto submarino (pág. 114))_

## E-pas-0015

El conductor de una motocicleta, ¿cuándo está obligado a usar guantes de protección?  
Respuesta: **Cuando circule por vías interurbanas.**

- ✔ Tras la reforma del Reglamento General de Circulación, conductores y pasajeros de motocicletas, ciclomotores y similares deben llevar guantes de protección en vías interurbanas, y calzado cerrado en todo tipo de vías. _(RGC 118.1.b)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `C-per-0006` La exención para vehículos en servicio de urgencia solo alcanza a la circulación en poblado. (Los pasajeros que asisten al paciente en ambulancias asistenciales tienen una exención propia.) _(RGC 119.2)_

## E-pas-0016

¿Hasta qué edad es obligatorio el casco en bicicleta en todo tipo de vías, también en ciudad?  
Respuesta: **Para los menores de 16 años.**

- ✔ El casco en bicicleta es obligatorio en vías interurbanas y, para los menores de dieciséis años, en todo tipo de vías. _(RGC 118.2)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `E-pas-0011` La parte superior del reposacabezas debe quedar a la misma altura que la parte superior de la cabeza. _(MANUAL_DGT Tema 5, El reposacabezas (p. 116))_

## E-pas-0017

El conductor de un patinete eléctrico (vehículo de movilidad personal), ¿debe llevar casco?  
Respuesta: **Sí, casco de protección homologado o certificado, adecuadamente abrochado.**

- ✔ Los conductores de vehículos de movilidad personal están obligados a utilizar casco homologado o certificado. _(RGC 118.3)_
- ✘ `E-pas-0013` Los cascos claros y brillantes son más seguros porque se ven mejor, sobre todo con poca visibilidad. _(MANUAL_DGT Tema 5, El casco (p. 118))_
- ✘ `E-pas-0007` En vehículos de hasta nueve plazas estos menores deben ir en los asientos traseros con SRI homologado; solo excepcionalmente pueden ir delante. _(RGC 117.3)_

## E-ada-0001

¿Qué hace el sistema de frenado autónomo de emergencia (AEB)?  
Respuesta: **Avisa al conductor si se acerca demasiado al vehículo de delante y, si no reacciona y hay peligro de accidente, realiza un frenado de emergencia.**

- ✔ El AEB calcula la distancia con el vehículo de delante, avisa con voz y sonido y, si el conductor no hace caso y hay peligro, frena de emergencia. _(MANUAL_DGT Tema 5, Frenado autónomo de emergencia (AEB) (p. 93))_
- ✘ `E-ada-0003` El LDW avisa (luz, sonido o vibración) cuando el vehículo cambia de carril de forma imprevista. _(MANUAL_DGT Tema 6, Aviso de salida de carril (LDW) (p. 135))_
- ✘ `E-ada-0011` El eCall envía un mensaje automático al 112 en caso de accidente para que acudan los servicios de emergencia. _(MANUAL_DGT Tema 16, Avisar (p. 420))_

## E-ada-0002

Según el manual de la DGT, ¿qué hace el sistema de aviso de frenada de emergencia (EBD)?  
Respuesta: **Hace parpadear las luces de freno del vehículo que frena de forma brusca, para avisar al de detrás.**

- ✔ Cuando el conductor pisa el freno de forma firme y rápida, las luces de freno parpadean para que el de detrás tenga más tiempo para frenar. _(MANUAL_DGT Tema 5, Aviso de frenada de emergencia (EBD) (p. 94))_
- ✘ `E-ada-0010` El Start-Stop detiene el motor en paradas breves (semáforo, atasco): parado no gasta combustible ni emite gases. _(MANUAL_DGT Tema 17, Función Start-Stop (p. 462))_
- ✘ `E-ada-0007` El TSR detecta las señales de límite de velocidad; en algunos vehículos muestra el límite en el cuadro y en otros reduce también la velocidad. _(MANUAL_DGT Tema 6, Sistema de reconocimiento de señales de tráfico (TSR) (p. 134))_

## E-ada-0003

¿Qué hace el sistema de aviso de salida de carril (LDW)?  
Respuesta: **Avisa al conductor cuando hace un cambio de carril imprevisto, por ejemplo por distracción o sueño.**

- ✔ El LDW avisa (luz, sonido o vibración) cuando el vehículo cambia de carril de forma imprevista. _(MANUAL_DGT Tema 6, Aviso de salida de carril (LDW) (p. 135))_
- ✘ `E-ada-0006` La cámara de 360 grados capta todo lo que hay alrededor del vehículo y lo muestra en la pantalla delantera. _(MANUAL_DGT Tema 6, Cámara de marcha atrás y cámara de 360 grados (p. 136))_
- ✘ `E-ada-0002` Cuando el conductor pisa el freno de forma firme y rápida, las luces de freno parpadean para que el de detrás tenga más tiempo para frenar. _(MANUAL_DGT Tema 5, Aviso de frenada de emergencia (EBD) (p. 94))_

## E-ada-0004

¿Qué sistema detecta las líneas de la carretera para ayudar al conductor a guiar el vehículo y no salirse de su carril?  
Respuesta: **El asistente de mantenimiento de carril (LKA).**

- ✔ El LKA detecta las líneas y ayuda a guiar el coche para no salirse del carril. _(MANUAL_DGT Tema 6, Asistencia de mantenimiento de carril (LKA) (p. 135))_
- ✘ `E-ada-0010` El Start-Stop detiene el motor en paradas breves (semáforo, atasco): parado no gasta combustible ni emite gases. _(MANUAL_DGT Tema 17, Función Start-Stop (p. 462))_
- ✘ `E-ada-0009` El BSM enciende una luz en el retrovisor cuando hay otro vehículo en la zona de ángulo muerto. _(MANUAL_DGT Tema 17, Detector de ángulos muertos (BSM) (p. 444))_

## E-ada-0005

¿En qué maniobra ayuda el sistema de alerta de tráfico cruzado (RCTA)?  
Respuesta: **Al circular marcha atrás, por ejemplo al salir de un aparcamiento.**

- ✔ El RCTA avisa si hay otros vehículos detrás cuando se circula marcha atrás, por ejemplo al salir de una plaza de aparcamiento. _(MANUAL_DGT Tema 6, Sistema de alerta de tráfico cruzado (RCTA) (p. 138))_
- ✘ `E-ada-0010` El Start-Stop detiene el motor en paradas breves (semáforo, atasco): parado no gasta combustible ni emite gases. _(MANUAL_DGT Tema 17, Función Start-Stop (p. 462))_
- ✘ `E-ada-0006` La cámara de 360 grados capta todo lo que hay alrededor del vehículo y lo muestra en la pantalla delantera. _(MANUAL_DGT Tema 6, Cámara de marcha atrás y cámara de 360 grados (p. 136))_

## E-ada-0006

La imagen que muestra la cámara de 360 grados de un vehículo, ¿de dónde procede?  
Respuesta: **De las cámaras del propio vehículo, que captan lo que hay a su alrededor.**

- ✔ La cámara de 360 grados capta todo lo que hay alrededor del vehículo y lo muestra en la pantalla delantera. _(MANUAL_DGT Tema 6, Cámara de marcha atrás y cámara de 360 grados (p. 136))_
- ✘ `E-ada-0004` El LKA detecta las líneas y ayuda a guiar el coche para no salirse del carril. _(MANUAL_DGT Tema 6, Asistencia de mantenimiento de carril (LKA) (p. 135))_
- ✘ `E-ada-0007` El TSR detecta las señales de límite de velocidad; en algunos vehículos muestra el límite en el cuadro y en otros reduce también la velocidad. _(MANUAL_DGT Tema 6, Sistema de reconocimiento de señales de tráfico (TSR) (p. 134))_

## E-ada-0007

¿Qué hace el sistema de reconocimiento de señales de tráfico (TSR)?  
Respuesta: **Detecta las señales de límite de velocidad de la carretera y las muestra al conductor.**

- ✔ El TSR detecta las señales de límite de velocidad; en algunos vehículos muestra el límite en el cuadro y en otros reduce también la velocidad. _(MANUAL_DGT Tema 6, Sistema de reconocimiento de señales de tráfico (TSR) (p. 134))_
- ✘ `E-ada-0003` El LDW avisa (luz, sonido o vibración) cuando el vehículo cambia de carril de forma imprevista. _(MANUAL_DGT Tema 6, Aviso de salida de carril (LDW) (p. 135))_
- ✘ `E-ada-0001` El AEB calcula la distancia con el vehículo de delante, avisa con voz y sonido y, si el conductor no hace caso y hay peligro, frena de emergencia. _(MANUAL_DGT Tema 5, Frenado autónomo de emergencia (AEB) (p. 93))_

## E-ada-0008

¿Para qué sirve el sistema de ayuda de salida en pendiente (hill holder)?  
Respuesta: **Para que el vehículo no se vaya hacia atrás al arrancar en una cuesta.**

- ✔ Evita que el vehículo retroceda al arrancar en pendiente o al pasar el pie del freno al acelerador. _(MANUAL_DGT Tema 6, Sistema de ayuda de salida en pendiente (p. 137))_
- ✘ `E-ada-0010` El Start-Stop detiene el motor en paradas breves (semáforo, atasco): parado no gasta combustible ni emite gases. _(MANUAL_DGT Tema 17, Función Start-Stop (p. 462))_
- ✘ `E-ada-0007` El TSR detecta las señales de límite de velocidad; en algunos vehículos muestra el límite en el cuadro y en otros reduce también la velocidad. _(MANUAL_DGT Tema 6, Sistema de reconocimiento de señales de tráfico (TSR) (p. 134))_

## E-ada-0009

¿Cómo avisa normalmente el detector de ángulo muerto (BSM) de que hay un vehículo en esa zona?  
Respuesta: **Encendiendo una luz colocada en el espejo retrovisor.**

- ✔ El BSM enciende una luz en el retrovisor cuando hay otro vehículo en la zona de ángulo muerto. _(MANUAL_DGT Tema 17, Detector de ángulos muertos (BSM) (p. 444))_
- ✘ `E-ada-0002` Cuando el conductor pisa el freno de forma firme y rápida, las luces de freno parpadean para que el de detrás tenga más tiempo para frenar. _(MANUAL_DGT Tema 5, Aviso de frenada de emergencia (EBD) (p. 94))_
- ✘ `E-ada-0007` El TSR detecta las señales de límite de velocidad; en algunos vehículos muestra el límite en el cuadro y en otros reduce también la velocidad. _(MANUAL_DGT Tema 6, Sistema de reconocimiento de señales de tráfico (TSR) (p. 134))_

## E-ada-0010

¿Qué efecto positivo tiene el sistema Start-Stop?  
Respuesta: **Reduce el consumo de combustible y la contaminación, porque detiene el motor cuando el vehículo se para un momento.**

- ✔ El Start-Stop detiene el motor en paradas breves (semáforo, atasco): parado no gasta combustible ni emite gases. _(MANUAL_DGT Tema 17, Función Start-Stop (p. 462))_
- ✘ `E-ada-0002` Cuando el conductor pisa el freno de forma firme y rápida, las luces de freno parpadean para que el de detrás tenga más tiempo para frenar. _(MANUAL_DGT Tema 5, Aviso de frenada de emergencia (EBD) (p. 94))_
- ✘ `E-ada-0001` El AEB calcula la distancia con el vehículo de delante, avisa con voz y sonido y, si el conductor no hace caso y hay peligro, frena de emergencia. _(MANUAL_DGT Tema 5, Frenado autónomo de emergencia (AEB) (p. 93))_

## E-ada-0011

En caso de accidente, ¿qué sistema envía automáticamente un aviso al 112, aunque nadie llame?  
Respuesta: **El eCall.**

- ✔ El eCall envía un mensaje automático al 112 en caso de accidente para que acudan los servicios de emergencia. _(MANUAL_DGT Tema 16, Avisar (p. 420))_
- ✘ `E-ada-0002` Cuando el conductor pisa el freno de forma firme y rápida, las luces de freno parpadean para que el de detrás tenga más tiempo para frenar. _(MANUAL_DGT Tema 5, Aviso de frenada de emergencia (EBD) (p. 94))_
- ✘ `E-ada-0001` El AEB calcula la distancia con el vehículo de delante, avisa con voz y sonido y, si el conductor no hace caso y hay peligro, frena de emergencia. _(MANUAL_DGT Tema 5, Frenado autónomo de emergencia (AEB) (p. 93))_

## E-ada-0012

¿Qué hace el sistema de activación automática del alumbrado?  
Respuesta: **Mide la luz exterior y enciende o apaga las luces automáticamente.**

- ✔ Mide la luz exterior y enciende o apaga las luces de forma automática. _(MANUAL_DGT Tema 5, Activación automática de alumbrado (p. 90))_
- ✘ `E-ada-0006` La cámara de 360 grados capta todo lo que hay alrededor del vehículo y lo muestra en la pantalla delantera. _(MANUAL_DGT Tema 6, Cámara de marcha atrás y cámara de 360 grados (p. 136))_
- ✘ `E-ada-0009` El BSM enciende una luz en el retrovisor cuando hay otro vehículo en la zona de ángulo muerto. _(MANUAL_DGT Tema 17, Detector de ángulos muertos (BSM) (p. 444))_

## E-ent-0001

¿Cuándo se debe reducir la velocidad para tomar una curva?  
Respuesta: **Antes de entrar en la curva.**

- ✔ Antes de entrar en la curva hay que reducir la velocidad o frenar si es necesario; dentro, no acelerar ni frenar bruscamente, y a la salida aumentar poco a poco. _(MANUAL_DGT Tema 14, Pasos para tomar bien una curva (p. 343))_
- ✘ `E-ent-0002` El viento es más peligroso al cruzarse con otro vehículo, al adelantar a un vehículo voluminoso o al pasar junto a edificios u obstáculos. _(MANUAL_DGT Tema 14, Conducir con mucho viento (p. 362))_
- ✘ `E-ent-0008` Con nieve se elige una marcha que permita arrancar con poca fuerza del motor (marcha más larga), para que las ruedas no patinen. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 356))_

## E-ent-0002

Con viento lateral fuerte, ¿en qué situación hay más peligro?  
Respuesta: **Al adelantar a un vehículo que ocupa mucho espacio, como un camión.**

- ✔ El viento es más peligroso al cruzarse con otro vehículo, al adelantar a un vehículo voluminoso o al pasar junto a edificios u obstáculos. _(MANUAL_DGT Tema 14, Conducir con mucho viento (p. 362))_
- ✘ `E-ent-0001` Antes de entrar en la curva hay que reducir la velocidad o frenar si es necesario; dentro, no acelerar ni frenar bruscamente, y a la salida aumentar poco a poco. _(MANUAL_DGT Tema 14, Pasos para tomar bien una curva (p. 343))_
- ✘ `E-ent-0007` Con niebla se ve peor y, además, el suelo húmedo reduce la adherencia de los neumáticos. _(MANUAL_DGT Tema 14, Conducir con niebla (p. 360))_

## E-ent-0003

¿Cuál es la mejor forma de prevenir el aquaplaning?  
Respuesta: **Circular despacio por las zonas en las que hay agua.**

- ✔ El aquaplaning es más probable a mucha velocidad y con neumáticos muy anchos o desgastados; la mejor prevención es circular despacio donde hay agua. _(MANUAL_DGT Tema 14, Aquaplaning (p. 355))_
- ✘ `E-ent-0006` Las primeras gotas se mezclan con polvo, grasa y suciedad y forman un barro que puede hacer patinar el vehículo. _(MANUAL_DGT Tema 14, Conducir con lluvia (p. 354))_
- ✘ `E-ent-0001` Antes de entrar en la curva hay que reducir la velocidad o frenar si es necesario; dentro, no acelerar ni frenar bruscamente, y a la salida aumentar poco a poco. _(MANUAL_DGT Tema 14, Pasos para tomar bien una curva (p. 343))_

## E-ent-0004

¿Cuál de estas circunstancias facilita que se produzca aquaplaning?  
Respuesta: **Llevar neumáticos muy desgastados.**

- ✔ Es más fácil hacer aquaplaning a mucha velocidad y con neumáticos muy anchos o muy desgastados. _(MANUAL_DGT Tema 14, Aquaplaning (p. 355))_
- ✘ `E-ent-0009` En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0007` Con niebla se ve peor y, además, el suelo húmedo reduce la adherencia de los neumáticos. _(MANUAL_DGT Tema 14, Conducir con niebla (p. 360))_

## E-ent-0005

Con el suelo mojado, las ruedas de tu vehículo empiezan a patinar. ¿Qué debes hacer?  
Respuesta: **Levantar el pie del acelerador, pero sin frenar.**

- ✔ Cuando las ruedas patinan hay que levantar el pie del acelerador sin frenar. _(MANUAL_DGT Tema 14, Conducir con lluvia (p. 354))_
- ✘ `E-ent-0008` Con nieve se elige una marcha que permita arrancar con poca fuerza del motor (marcha más larga), para que las ruedas no patinen. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 356))_
- ✘ `E-ent-0009` En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_

## E-ent-0006

¿Por qué hay que tener especial cuidado cuando empiezan a caer las primeras gotas de lluvia?  
Respuesta: **Porque el agua se mezcla con el polvo, la grasa y la suciedad de la carretera y forma un barro deslizante.**

- ✔ Las primeras gotas se mezclan con polvo, grasa y suciedad y forman un barro que puede hacer patinar el vehículo. _(MANUAL_DGT Tema 14, Conducir con lluvia (p. 354))_
- ✘ `E-ent-0009` En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0001` Antes de entrar en la curva hay que reducir la velocidad o frenar si es necesario; dentro, no acelerar ni frenar bruscamente, y a la salida aumentar poco a poco. _(MANUAL_DGT Tema 14, Pasos para tomar bien una curva (p. 343))_

## E-ent-0007

Además de la visibilidad, ¿por qué es peligrosa la niebla?  
Respuesta: **Porque el suelo está húmedo y los neumáticos se agarran menos.**

- ✔ Con niebla se ve peor y, además, el suelo húmedo reduce la adherencia de los neumáticos. _(MANUAL_DGT Tema 14, Conducir con niebla (p. 360))_
- ✘ `E-ent-0009` En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0002` El viento es más peligroso al cruzarse con otro vehículo, al adelantar a un vehículo voluminoso o al pasar junto a edificios u obstáculos. _(MANUAL_DGT Tema 14, Conducir con mucho viento (p. 362))_

## E-ent-0008

Para arrancar y circular en llano sobre nieve, ¿qué marcha conviene usar?  
Respuesta: **Una marcha más larga (por ejemplo, segunda), que dé poca fuerza a las ruedas para que no patinen.**

- ✔ Con nieve se elige una marcha que permita arrancar con poca fuerza del motor (marcha más larga), para que las ruedas no patinen. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 356))_
- ✘ `E-ent-0009` En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0002` El viento es más peligroso al cruzarse con otro vehículo, al adelantar a un vehículo voluminoso o al pasar junto a edificios u obstáculos. _(MANUAL_DGT Tema 14, Conducir con mucho viento (p. 362))_

## E-ent-0009

¿Cómo debes bajar una pendiente con la calzada nevada?  
Respuesta: **En una marcha corta (primera o segunda), para que el motor retenga el vehículo.**

- ✔ En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0008` Con nieve se elige una marcha que permita arrancar con poca fuerza del motor (marcha más larga), para que las ruedas no patinen. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 356))_
- ✘ `E-ent-0001` Antes de entrar en la curva hay que reducir la velocidad o frenar si es necesario; dentro, no acelerar ni frenar bruscamente, y a la salida aumentar poco a poco. _(MANUAL_DGT Tema 14, Pasos para tomar bien una curva (p. 343))_

## E-ent-0010

Al circular sobre nieve, ¿por dónde es aconsejable llevar las ruedas?  
Respuesta: **Por encima de las marcas que han dejado las ruedas de otros vehículos.**

- ✔ Es aconsejable circular por encima de las rodadas que han dejado otros vehículos. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0008` Con nieve se elige una marcha que permita arrancar con poca fuerza del motor (marcha más larga), para que las ruedas no patinen. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 356))_
- ✘ `E-ent-0007` Con niebla se ve peor y, además, el suelo húmedo reduce la adherencia de los neumáticos. _(MANUAL_DGT Tema 14, Conducir con niebla (p. 360))_

## E-ent-0011

¿En qué lugares es más probable encontrar placas de hielo?  
Respuesta: **En zonas húmedas o en las que no llega el sol.**

- ✔ Puede haber hielo en zonas húmedas, zonas donde no llega el sol, puentes, pasos elevados y badenes. _(MANUAL_DGT Tema 14, Conducir con hielo (p. 358))_
- ✘ `E-ent-0009` En bajada con nieve hay que ir más despacio de lo normal y usar marchas cortas para que el motor retenga el vehículo. _(MANUAL_DGT Tema 14, Conducir con nieve (p. 357))_
- ✘ `E-ent-0003` El aquaplaning es más probable a mucha velocidad y con neumáticos muy anchos o desgastados; la mejor prevención es circular despacio donde hay agua. _(MANUAL_DGT Tema 14, Aquaplaning (p. 355))_

## E-acc-0001

Presencias un accidente de tráfico en el que no estás implicado. ¿Tienes obligación de auxiliar o solicitar auxilio?  
Respuesta: **Sí; quienes se vean implicados, lo presencien o tengan conocimiento de él están obligados a auxiliar o solicitar auxilio.**

- ✔ La obligación de auxiliar o pedir auxilio alcanza a los implicados, a quienes presencian el accidente y a quienes tienen conocimiento de él. _(RGC 129.1)_
- ✘ `D-acc-0008` La OMS considera los accidentes de tráfico un problema de salud que afecta a toda la sociedad, por sus consecuencias humanas, materiales, sanitarias y de recursos de seguridad. _(MANUAL_DGT Tema 16, Consecuencias de los accidentes (pág. 394))_
- ✘ `E-acc-0004` PAS: primero Proteger (a uno mismo, a las víctimas y el lugar), después Avisar a emergencias y por último Socorrer. _(MANUAL_DGT Tema 16, Proteger, Avisar, Socorrer (p. 416))_

## E-acc-0002

Llegas a un accidente en el que no estás implicado y ya se encuentran allí los agentes de la autoridad. ¿Estás obligado a cumplir las medidas que se exigen a los implicados?  
Respuesta: **No, porque la autoridad o sus agentes ya se han personado en el lugar.**

- ✔ El usuario no implicado debe cumplir esas prescripciones salvo que manifiestamente no sea necesaria su colaboración o que la autoridad o sus agentes ya estén en el lugar. _(RGC 129.3)_
- ✘ `D-acc-0006` Durante el día, la mayor parte de los accidentes se producen a las horas de entrar y salir del trabajo, en especial al final de la jornada laboral. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `E-acc-0004` PAS: primero Proteger (a uno mismo, a las víctimas y el lugar), después Avisar a emergencias y por último Socorrer. _(MANUAL_DGT Tema 16, Proteger, Avisar, Socorrer (p. 416))_

## E-acc-0003

Si como implicado en un accidente aparentemente hay algún herido, ¿qué debes hacer?  
Respuesta: **Avisar a la autoridad o a sus agentes y permanecer o volver al lugar hasta su llegada, salvo que te autoricen a irte o debas atender a heridos.**

- ✔ Si aparentemente hay heridos o muertos, el implicado debe avisar a la autoridad y permanecer o volver al lugar hasta su llegada, salvo las excepciones del artículo. _(RGC 129.2.e)_
- ✘ `D-acc-0005` Hay menos accidentes en autopistas y autovías que en el resto de carreteras: tienen calzadas separadas para cada sentido y no tienen cruces a nivel. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `D-acc-0008` La OMS considera los accidentes de tráfico un problema de salud que afecta a toda la sociedad, por sus consecuencias humanas, materiales, sanitarias y de recursos de seguridad. _(MANUAL_DGT Tema 16, Consecuencias de los accidentes (pág. 394))_

## E-acc-0004

¿En qué orden se aplica la conducta PAS ante un accidente?  
Respuesta: **Proteger, avisar y socorrer.**

- ✔ PAS: primero Proteger (a uno mismo, a las víctimas y el lugar), después Avisar a emergencias y por último Socorrer. _(MANUAL_DGT Tema 16, Proteger, Avisar, Socorrer (p. 416))_
- ✘ `E-acc-0008` Si no pueden abandonar el vehículo con seguridad, los ocupantes permanecerán en el habitáculo con el cinturón abrochado. _(RGC 130.3)_
- ✘ `E-acc-0001` La obligación de auxiliar o pedir auxilio alcanza a los implicados, a quienes presencian el accidente y a quienes tienen conocimiento de él. _(RGC 129.1)_

## E-acc-0005

El conductor de un turismo inmovilizado en una carretera interurbana, ¿cuándo debe ponerse el chaleco reflectante de alta visibilidad?  
Respuesta: **Cuando salga del vehículo y ocupe la calzada o el arcén.**

- ✔ Los conductores de turismos deben usar el chaleco reflectante de alta visibilidad cuando salgan del vehículo y ocupen la calzada o el arcén de las vías interurbanas. _(RGC 118.4)_
- ✘ `E-acc-0011` La V-16, de color amarillo auto, se coloca en la parte más alta posible del vehículo inmovilizado para que sea lo más visible posible; así no hay que caminar por la calzada. _(RGV Anexo XI, V-16.2)_
- ✘ `D-acc-0002` La mayoría de los accidentes se pueden evitar, sobre todo actuando sobre el factor humano (no beber, moderar la velocidad, no distraerse). _(MANUAL_DGT Tema 16, Evitar accidentes de tráfico (pág. 389))_

## E-acc-0006

¿A qué número de teléfono hay que llamar para pedir ayuda en caso de accidente?  
Respuesta: **Al 112.**

- ✔ Para pedir ayuda se llama al número de emergencias 112 (o se usa el poste SOS si no hay móvil). _(MANUAL_DGT Tema 16, Avisar (p. 419))_
- ✘ `D-acc-0004` La mayoría de los accidentes mortales se producen en carreteras fuera de poblado, donde se circula a más velocidad y los accidentes son más graves. _(MANUAL_DGT Tema 16, ¿Dónde y cuándo hay más accidentes? (pág. 391))_
- ✘ `E-acc-0012` La V-16 comunica su activación, desactivación y ubicación al punto de acceso nacional de la DGT, sin depender del móvil ni de aplicaciones. _(RGV Anexo XI, V-16.4)_

## E-acc-0007

Tu vehículo queda inmovilizado en la vía tras una avería, sin poder reemprender la marcha, y existe un lugar seguro fuera de la plataforma. ¿Qué deben hacer los ocupantes?  
Respuesta: **Abandonar el vehículo por el lado contrario al flujo del tráfico, sin transitar ni permanecer en carriles y arcenes.**

- ✔ Como norma general los ocupantes deben abandonar el vehículo si hay un lugar seguro fuera de la plataforma, saliendo por el lado contrario al tráfico y sin quedarse en carriles ni arcenes. Si no pueden salir con seguridad, permanecerán dentro con el cinturón abrochado. _(RGC 130.3)_
- ✘ `E-acc-0013` El conductor debe señalizar el vehículo o el obstáculo y procurar que se retire en el menor tiempo posible, sacándolo de la calzada y situándolo conforme a las normas de estacionamiento siempre que sea factible. _(LSV 51.2)_
- ✘ `E-acc-0010` La dotación obligatoria de turismos (y de mixtos y mercancías de hasta 3.500 kg) incluye el dispositivo luminoso V-16, el chaleco reflectante y la rueda de repuesto o sistema alternativo. Los triángulos ya no forman parte de ella. _(RGV Anexo XII.1.a)_

## E-acc-0008

Tras un accidente, si las condiciones de circulación no permiten a los ocupantes abandonar el vehículo con seguridad, ¿qué deben hacer?  
Respuesta: **Permanecer en el habitáculo con el cinturón abrochado.**

- ✔ Si no pueden abandonar el vehículo con seguridad, los ocupantes permanecerán en el habitáculo con el cinturón abrochado. _(RGC 130.3)_
- ✘ `E-acc-0013` El conductor debe señalizar el vehículo o el obstáculo y procurar que se retire en el menor tiempo posible, sacándolo de la calzada y situándolo conforme a las normas de estacionamiento siempre que sea factible. _(LSV 51.2)_
- ✘ `D-acc-0002` La mayoría de los accidentes se pueden evitar, sobre todo actuando sobre el factor humano (no beber, moderar la velocidad, no distraerse). _(MANUAL_DGT Tema 16, Evitar accidentes de tráfico (pág. 389))_

## E-acc-0009

¿Dónde se puede rellenar el parte de accidente tras un siniestro?  
Respuesta: **En un lugar seguro fuera de la vía; está prohibido hacerlo en la plataforma de circulación.**

- ✔ Se prohíbe cumplimentar el parte de accidente en la plataforma de circulación; debe hacerse en un lugar seguro fuera de la vía. _(RGC 130.5)_
- ✘ `E-acc-0001` La obligación de auxiliar o pedir auxilio alcanza a los implicados, a quienes presencian el accidente y a quienes tienen conocimiento de él. _(RGC 129.1)_
- ✘ `E-acc-0012` La V-16 comunica su activación, desactivación y ubicación al punto de acceso nacional de la DGT, sin depender del móvil ni de aplicaciones. _(RGV Anexo XI, V-16.4)_

## E-acc-0010

¿Qué dispositivo de preseñalización de peligro forma parte de la dotación obligatoria de un turismo?  
Respuesta: **El dispositivo luminoso de preseñalización de peligro V-16.**

- ✔ La dotación obligatoria de turismos (y de mixtos y mercancías de hasta 3.500 kg) incluye el dispositivo luminoso V-16, el chaleco reflectante y la rueda de repuesto o sistema alternativo. Los triángulos ya no forman parte de ella. _(RGV Anexo XII.1.a)_
- ✘ `E-acc-0011` La V-16, de color amarillo auto, se coloca en la parte más alta posible del vehículo inmovilizado para que sea lo más visible posible; así no hay que caminar por la calzada. _(RGV Anexo XI, V-16.2)_
- ✘ `E-acc-0013` El conductor debe señalizar el vehículo o el obstáculo y procurar que se retire en el menor tiempo posible, sacándolo de la calzada y situándolo conforme a las normas de estacionamiento siempre que sea factible. _(LSV 51.2)_

## E-acc-0011

¿Dónde se debe colocar el dispositivo luminoso V-16 en un vehículo inmovilizado?  
Respuesta: **En la parte más alta posible del vehículo, para garantizar su máxima visibilidad.**

- ✔ La V-16, de color amarillo auto, se coloca en la parte más alta posible del vehículo inmovilizado para que sea lo más visible posible; así no hay que caminar por la calzada. _(RGV Anexo XI, V-16.2)_
- ✘ `E-acc-0010` La dotación obligatoria de turismos (y de mixtos y mercancías de hasta 3.500 kg) incluye el dispositivo luminoso V-16, el chaleco reflectante y la rueda de repuesto o sistema alternativo. Los triángulos ya no forman parte de ella. _(RGV Anexo XII.1.a)_
- ✘ `E-acc-0013` El conductor debe señalizar el vehículo o el obstáculo y procurar que se retire en el menor tiempo posible, sacándolo de la calzada y situándolo conforme a las normas de estacionamiento siempre que sea factible. _(LSV 51.2)_

## E-acc-0012

Además de emitir luz, ¿qué hace el dispositivo V-16 cuando se activa?  
Respuesta: **Comunica su activación, desactivación y geoposicionamiento al punto de acceso nacional en materia de tráfico y movilidad (DGT).**

- ✔ La V-16 comunica su activación, desactivación y ubicación al punto de acceso nacional de la DGT, sin depender del móvil ni de aplicaciones. _(RGV Anexo XI, V-16.4)_
- ✘ `E-acc-0010` La dotación obligatoria de turismos (y de mixtos y mercancías de hasta 3.500 kg) incluye el dispositivo luminoso V-16, el chaleco reflectante y la rueda de repuesto o sistema alternativo. Los triángulos ya no forman parte de ella. _(RGV Anexo XII.1.a)_
- ✘ `D-acc-0002` La mayoría de los accidentes se pueden evitar, sobre todo actuando sobre el factor humano (no beber, moderar la velocidad, no distraerse). _(MANUAL_DGT Tema 16, Evitar accidentes de tráfico (pág. 389))_

## E-acc-0013

Si por accidente o avería tu vehículo obstaculiza la calzada, ¿qué debes hacer?  
Respuesta: **Señalizarlo convenientemente y adoptar las medidas para que sea retirado cuanto antes, sacándolo de la calzada siempre que sea factible.**

- ✔ El conductor debe señalizar el vehículo o el obstáculo y procurar que se retire en el menor tiempo posible, sacándolo de la calzada y situándolo conforme a las normas de estacionamiento siempre que sea factible. _(LSV 51.2)_
- ✘ `E-acc-0008` Si no pueden abandonar el vehículo con seguridad, los ocupantes permanecerán en el habitáculo con el cinturón abrochado. _(RGC 130.3)_
- ✘ `D-acc-0008` La OMS considera los accidentes de tráfico un problema de salud que afecta a toda la sociedad, por sus consecuencias humanas, materiales, sanitarias y de recursos de seguridad. _(MANUAL_DGT Tema 16, Consecuencias de los accidentes (pág. 394))_

## E-aux-0001

Como norma general, ¿se debe mover a un herido de un accidente?  
Respuesta: **No, salvo que sea necesario para ponerlo a salvo.**

- ✔ No hay que mover a los heridos salvo que sea necesario para ponerlos a salvo, y siempre protegiendo el cuello. _(MANUAL_DGT Tema 16, Socorrer (p. 421))_
- ✘ `E-aux-0007` Hay que escribir la hora a la que se hizo el torniquete y dónde se ha colocado; solo el personal médico puede quitarlo. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_
- ✘ `E-aux-0010` Al herido en shock se le coloca tumbado con los pies más altos que la cabeza (si vomita, de lado y con los pies elevados). _(MANUAL_DGT Tema 16, Hemorragia interna (p. 432))_

## E-aux-0002

Un motorista herido en un accidente lleva puesto el casco. ¿Qué debes hacer?  
Respuesta: **No quitarle el casco.**

- ✔ No se debe quitar el casco a la persona herida. _(MANUAL_DGT Tema 16, Socorrer (p. 421))_
- ✘ `E-aux-0009` Con una quemadura: no tocar la zona, no quitar la ropa pegada, echar agua fría y no pinchar las ampollas. _(MANUAL_DGT Tema 16, Quemaduras (p. 434))_
- ✘ `E-aux-0008` Si la hemorragia se debe a un objeto clavado, no hay que intentar sacarlo. _(MANUAL_DGT Tema 16, Hemorragias (p. 428))_

## E-aux-0003

Al valorar a un herido, ¿qué constantes vitales se comprueban y en qué orden?  
Respuesta: **Primero la consciencia y después la respiración.**

- ✔ Se comprueban siempre en el mismo orden: primero consciencia y después respiración. _(MANUAL_DGT Tema 16, Constantes vitales (p. 424))_
- ✘ `E-aux-0001` No hay que mover a los heridos salvo que sea necesario para ponerlos a salvo, y siempre protegiendo el cuello. _(MANUAL_DGT Tema 16, Socorrer (p. 421))_
- ✘ `E-aux-0005` Si respira con normalidad y hay que dejarlo solo, se le coloca de lado (posición lateral de seguridad), lo que evita que se ahogue si vomita. _(MANUAL_DGT Tema 16, Respiración (p. 427))_

## E-aux-0004

En la reanimación cardiopulmonar de un adulto que no respira, ¿qué secuencia se recomienda?  
Respuesta: **30 compresiones en el tórax y 2 ventilaciones boca a boca.**

- ✔ Se hacen 30 compresiones en el centro del tórax (unas 100 por minuto, con los codos extendidos) y 2 ventilaciones, hasta que llegue la ayuda médica. _(MANUAL_DGT Tema 16, Respiración (p. 427))_
- ✘ `E-aux-0010` Al herido en shock se le coloca tumbado con los pies más altos que la cabeza (si vomita, de lado y con los pies elevados). _(MANUAL_DGT Tema 16, Hemorragia interna (p. 432))_
- ✘ `E-aux-0001` No hay que mover a los heridos salvo que sea necesario para ponerlos a salvo, y siempre protegiendo el cuello. _(MANUAL_DGT Tema 16, Socorrer (p. 421))_

## E-aux-0005

Un herido inconsciente respira con normalidad y tienes que dejarlo solo para atender a otros heridos. ¿Cómo debes dejarlo?  
Respuesta: **Colocado de lado.**

- ✔ Si respira con normalidad y hay que dejarlo solo, se le coloca de lado (posición lateral de seguridad), lo que evita que se ahogue si vomita. _(MANUAL_DGT Tema 16, Respiración (p. 427))_
- ✘ `E-aux-0007` Hay que escribir la hora a la que se hizo el torniquete y dónde se ha colocado; solo el personal médico puede quitarlo. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_
- ✘ `E-aux-0001` No hay que mover a los heridos salvo que sea necesario para ponerlos a salvo, y siempre protegiendo el cuello. _(MANUAL_DGT Tema 16, Socorrer (p. 421))_

## E-aux-0006

¿Cuándo se puede aplicar un torniquete?  
Respuesta: **Solo en brazos y piernas, cuando no han funcionado la compresión directa ni la arterial.**

- ✔ El torniquete es el último recurso: solo en extremidades y cuando han fallado la compresión directa y la arterial. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_
- ✘ `E-aux-0008` Si la hemorragia se debe a un objeto clavado, no hay que intentar sacarlo. _(MANUAL_DGT Tema 16, Hemorragias (p. 428))_
- ✘ `E-aux-0010` Al herido en shock se le coloca tumbado con los pies más altos que la cabeza (si vomita, de lado y con los pies elevados). _(MANUAL_DGT Tema 16, Hemorragia interna (p. 432))_

## E-aux-0007

Si se aplica un torniquete, ¿qué es importante anotar?  
Respuesta: **La hora a la que se hizo y el lugar en el que se ha colocado.**

- ✔ Hay que escribir la hora a la que se hizo el torniquete y dónde se ha colocado; solo el personal médico puede quitarlo. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_
- ✘ `E-aux-0008` Si la hemorragia se debe a un objeto clavado, no hay que intentar sacarlo. _(MANUAL_DGT Tema 16, Hemorragias (p. 428))_
- ✘ `E-aux-0009` Con una quemadura: no tocar la zona, no quitar la ropa pegada, echar agua fría y no pinchar las ampollas. _(MANUAL_DGT Tema 16, Quemaduras (p. 434))_

## E-aux-0008

Un herido tiene un objeto clavado en el cuerpo que le provoca una hemorragia. ¿Qué debes hacer con el objeto?  
Respuesta: **No intentar sacarlo.**

- ✔ Si la hemorragia se debe a un objeto clavado, no hay que intentar sacarlo. _(MANUAL_DGT Tema 16, Hemorragias (p. 428))_
- ✘ `E-aux-0007` Hay que escribir la hora a la que se hizo el torniquete y dónde se ha colocado; solo el personal médico puede quitarlo. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_
- ✘ `E-aux-0010` Al herido en shock se le coloca tumbado con los pies más altos que la cabeza (si vomita, de lado y con los pies elevados). _(MANUAL_DGT Tema 16, Hemorragia interna (p. 432))_

## E-aux-0009

Ante una quemadura, ¿cuál de estas acciones es correcta?  
Respuesta: **Echar agua fría sobre la zona quemada.**

- ✔ Con una quemadura: no tocar la zona, no quitar la ropa pegada, echar agua fría y no pinchar las ampollas. _(MANUAL_DGT Tema 16, Quemaduras (p. 434))_
- ✘ `E-aux-0007` Hay que escribir la hora a la que se hizo el torniquete y dónde se ha colocado; solo el personal médico puede quitarlo. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_
- ✘ `E-aux-0001` No hay que mover a los heridos salvo que sea necesario para ponerlos a salvo, y siempre protegiendo el cuello. _(MANUAL_DGT Tema 16, Socorrer (p. 421))_

## E-aux-0010

¿En qué posición se coloca a un herido que presenta síntomas de shock?  
Respuesta: **Tumbado, con los pies más altos que la cabeza.**

- ✔ Al herido en shock se le coloca tumbado con los pies más altos que la cabeza (si vomita, de lado y con los pies elevados). _(MANUAL_DGT Tema 16, Hemorragia interna (p. 432))_
- ✘ `E-aux-0005` Si respira con normalidad y hay que dejarlo solo, se le coloca de lado (posición lateral de seguridad), lo que evita que se ahogue si vomita. _(MANUAL_DGT Tema 16, Respiración (p. 427))_
- ✘ `E-aux-0007` Hay que escribir la hora a la que se hizo el torniquete y dónde se ha colocado; solo el personal médico puede quitarlo. _(MANUAL_DGT Tema 16, Torniquete (p. 431))_

## E-aux-0011

¿Es obligatorio llevar botiquín de primeros auxilios en un turismo particular?  
Respuesta: **No es obligatorio, pero sí conveniente.**

- ✔ El botiquín no figura en la dotación obligatoria del turismo (RGV, Anexo XII), pero el manual de la DGT aconseja llevarlo. _(MANUAL_DGT Tema 17, Comprobaciones de seguridad (p. 438))_
- ✘ `E-mec-0012` Autobuses, mixtos y vehículos de mercancías de más de 3.500 kg de MMA y los conjuntos de vehículos no especiales deben llevar extintor homologado; los turismos no. _(RGV Anexo XII.2)_
- ✘ `E-mec-0013` Las motocicletas deben llevar un chaleco reflectante de alta visibilidad. _(RGV Anexo XII.3)_

## E-mec-0002

¿Está permitido circular con un turismo o una motocicleta con el escape libre, sin silenciador?  
Respuesta: **No, está prohibido tanto en vías urbanas como interurbanas.**

- ✔ Se prohíbe la circulación de vehículos a motor y ciclomotores con escape libre, sin el preceptivo silenciador, en vías urbanas e interurbanas. _(RGC 7.2)_
- ✘ `E-mec-0003` El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_
- ✘ `E-mec-0004` Con el filtro del aire muy sucio o roto puede salir humo negro y se gasta más combustible. El humo blanco azulado indica exceso de aceite y el blanco al arrancar en frío es vapor de agua. _(MANUAL_DGT Tema 15, Sistema de alimentación (p. 367))_

## E-mec-0003

¿Qué función tiene el catalizador?  
Respuesta: **Reducir la contaminación de los gases que salen por el tubo de escape.**

- ✔ El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_
- ✘ `E-mec-0002` Se prohíbe la circulación de vehículos a motor y ciclomotores con escape libre, sin el preceptivo silenciador, en vías urbanas e interurbanas. _(RGC 7.2)_
- ✘ `E-mec-0001` La suspensión mantiene los neumáticos en contacto con la carretera, lo que da estabilidad y además comodidad. _(MANUAL_DGT Tema 15, Sistema de suspensión (p. 382))_

## E-mec-0004

Sale humo negro por el tubo de escape. ¿Qué puede indicar?  
Respuesta: **Que el filtro del aire está muy sucio o roto.**

- ✔ Con el filtro del aire muy sucio o roto puede salir humo negro y se gasta más combustible. El humo blanco azulado indica exceso de aceite y el blanco al arrancar en frío es vapor de agua. _(MANUAL_DGT Tema 15, Sistema de alimentación (p. 367))_
- ✘ `E-mec-0002` Se prohíbe la circulación de vehículos a motor y ciclomotores con escape libre, sin el preceptivo silenciador, en vías urbanas e interurbanas. _(RGC 7.2)_
- ✘ `res-veh-0001` En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo). _(RGV Anexo III.3 (tabla))_

## E-mec-0005

¿Cuándo se debe comprobar el nivel de aceite con la varilla?  
Respuesta: **Con el motor parado y frío.**

- ✔ El nivel se mira con la varilla con el motor parado y frío, y debe estar entre las marcas de mínimo y máximo. _(MANUAL_DGT Tema 15, Sistema de lubricación (p. 372))_
- ✘ `E-mec-0002` Se prohíbe la circulación de vehículos a motor y ciclomotores con escape libre, sin el preceptivo silenciador, en vías urbanas e interurbanas. _(RGC 7.2)_
- ✘ `E-mec-0009` La transmisión lleva la fuerza del motor a las ruedas (motrices) para que el vehículo se mueva. _(MANUAL_DGT Tema 15, Sistema de transmisión (p. 379))_

## E-mec-0006

Durante la marcha se enciende el testigo luminoso de presión de aceite. ¿Qué debes hacer?  
Respuesta: **Parar el vehículo y no continuar hasta conocer el problema y arreglarlo.**

- ✔ El testigo indica poco aceite o falta de presión: hay que parar y no continuar hasta conocer y arreglar el problema. _(MANUAL_DGT Tema 15, Sistema de lubricación (p. 372))_
- ✘ `E-neu-0001` Los neumáticos de las categorías M1, N1, O1 y O2 (turismos, furgonetas ligeras y remolques ligeros) deben tener como mínimo 1,6 mm de profundidad en las ranuras principales. _(RGV Anexo VII.2)_
- ✘ `E-mec-0003` El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_

## E-mec-0007

En el sistema de refrigeración, ¿dónde se enfría el líquido refrigerante antes de volver al motor?  
Respuesta: **En el radiador.**

- ✔ El líquido refrigerante absorbe el calor del motor, se enfría en el radiador y vuelve al motor impulsado por la bomba de agua. _(MANUAL_DGT Tema 15, Sistema de refrigeración (p. 377))_
- ✘ `E-neu-0005` El Reglamento de Vehículos exige que los neumáticos no presenten ampollas, deformaciones anormales ni roturas, con independencia de la profundidad del dibujo. _(RGV Anexo VII.4)_
- ✘ `E-neu-0006` La goma envejece: el manual de la DGT indica cambiar los neumáticos cada cinco años aunque estén en buen estado. _(MANUAL_DGT Tema 5, Desgaste de los neumáticos (p. 100))_

## E-mec-0008

¿Qué elemento proporciona la energía necesaria para arrancar el motor?  
Respuesta: **La batería.**

- ✔ La batería proporciona la energía para arrancar el motor y alimenta otros elementos cuando es necesario. _(MANUAL_DGT Tema 15, Sistema eléctrico (p. 368))_
- ✘ `E-mec-0010` Si el impulso llega a las ruedas delanteras es de tracción; a las traseras, de propulsión; a todas, de tracción total. _(MANUAL_DGT Tema 15, Sistema de transmisión (p. 379))_
- ✘ `E-neu-0005` El Reglamento de Vehículos exige que los neumáticos no presenten ampollas, deformaciones anormales ni roturas, con independencia de la profundidad del dibujo. _(RGV Anexo VII.4)_

## E-mec-0009

¿Qué sistema se encarga de llevar la fuerza del motor a las ruedas?  
Respuesta: **El sistema de transmisión.**

- ✔ La transmisión lleva la fuerza del motor a las ruedas (motrices) para que el vehículo se mueva. _(MANUAL_DGT Tema 15, Sistema de transmisión (p. 379))_
- ✘ `E-mec-0001` La suspensión mantiene los neumáticos en contacto con la carretera, lo que da estabilidad y además comodidad. _(MANUAL_DGT Tema 15, Sistema de suspensión (p. 382))_
- ✘ `E-mec-0002` Se prohíbe la circulación de vehículos a motor y ciclomotores con escape libre, sin el preceptivo silenciador, en vías urbanas e interurbanas. _(RGC 7.2)_

## E-mec-0010

Un vehículo en el que el motor da impulso solo a las ruedas traseras, ¿cómo se denomina?  
Respuesta: **De propulsión.**

- ✔ Si el impulso llega a las ruedas delanteras es de tracción; a las traseras, de propulsión; a todas, de tracción total. _(MANUAL_DGT Tema 15, Sistema de transmisión (p. 379))_
- ✘ `E-neu-0004` Con exceso de presión el neumático apoya peor, se agarra menos y se desgasta más por el centro que por los lados. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_
- ✘ `res-veh-0001` En las motocicletas de más de 100 km/h son obligatorios los dos retrovisores exteriores; si no superan 100 km/h, solo el izquierdo (el derecho es optativo). _(RGV Anexo III.3 (tabla))_

## E-mec-0011

Respecto a la rueda de repuesto, ¿qué debe llevar un turismo?  
Respuesta: **Una rueda de repuesto o de uso temporal con las herramientas para el cambio, o un sistema alternativo que garantice la movilidad.**

- ✔ La dotación incluye una rueda completa de repuesto o de uso temporal con las herramientas para cambiarla, o un sistema alternativo con garantías suficientes (por ejemplo, un kit antipinchazos). _(RGV Anexo XII.1.c)_
- ✘ `E-mec-0012` Autobuses, mixtos y vehículos de mercancías de más de 3.500 kg de MMA y los conjuntos de vehículos no especiales deben llevar extintor homologado; los turismos no. _(RGV Anexo XII.2)_
- ✘ `E-mec-0013` Las motocicletas deben llevar un chaleco reflectante de alta visibilidad. _(RGV Anexo XII.3)_

## E-mec-0012

¿Cuál de estos vehículos está obligado a llevar un equipo homologado de extinción de incendios (extintor)?  
Respuesta: **Un autobús.**

- ✔ Autobuses, mixtos y vehículos de mercancías de más de 3.500 kg de MMA y los conjuntos de vehículos no especiales deben llevar extintor homologado; los turismos no. _(RGV Anexo XII.2)_
- ✘ `E-mec-0011` La dotación incluye una rueda completa de repuesto o de uso temporal con las herramientas para cambiarla, o un sistema alternativo con garantías suficientes (por ejemplo, un kit antipinchazos). _(RGV Anexo XII.1.c)_
- ✘ `E-mec-0013` Las motocicletas deben llevar un chaleco reflectante de alta visibilidad. _(RGV Anexo XII.3)_

## E-mec-0013

¿Qué elemento de la dotación obligatoria deben llevar las motocicletas?  
Respuesta: **Un chaleco reflectante de alta visibilidad.**

- ✔ Las motocicletas deben llevar un chaleco reflectante de alta visibilidad. _(RGV Anexo XII.3)_
- ✘ `E-mec-0012` Autobuses, mixtos y vehículos de mercancías de más de 3.500 kg de MMA y los conjuntos de vehículos no especiales deben llevar extintor homologado; los turismos no. _(RGV Anexo XII.2)_
- ✘ `E-mec-0011` La dotación incluye una rueda completa de repuesto o de uso temporal con las herramientas para cambiarla, o un sistema alternativo con garantías suficientes (por ejemplo, un kit antipinchazos). _(RGV Anexo XII.1.c)_

## E-pre-0001

En la conducción preventiva, ¿hasta dónde conviene mirar a lo lejos?  
Respuesta: **Hasta el espacio que recorrerá el vehículo en los siguientes 20 segundos.**

- ✔ Hay que mirar a lo lejos para controlar lo que pasa en el espacio que recorrerá el vehículo en los siguientes 20 segundos; cuanto más rápido, más lejos. _(MANUAL_DGT Tema 17, Visión (p. 441))_
- ✘ `E-pre-0002` Siempre hay zonas que los retrovisores no cubren; para comprobarlas se puede girar la cabeza y mirar por la ventanilla. _(MANUAL_DGT Tema 17, Visión (p. 443))_
- ✘ `E-pre-0003` Si el de detrás se acerca mucho, hay que dejar más distancia con el de delante para no tener que frenar bruscamente, señalizar con más tiempo y frenar con suavidad. _(MANUAL_DGT Tema 17, Espacio trasero (p. 447))_

## E-pre-0002

Antes de cambiar de carril, ¿cómo puedes comprobar que no hay ningún vehículo en el ángulo muerto?  
Respuesta: **Girando la cabeza y mirando a través de la ventanilla.**

- ✔ Siempre hay zonas que los retrovisores no cubren; para comprobarlas se puede girar la cabeza y mirar por la ventanilla. _(MANUAL_DGT Tema 17, Visión (p. 443))_
- ✘ `E-pre-0003` Si el de detrás se acerca mucho, hay que dejar más distancia con el de delante para no tener que frenar bruscamente, señalizar con más tiempo y frenar con suavidad. _(MANUAL_DGT Tema 17, Espacio trasero (p. 447))_
- ✘ `E-pre-0001` Hay que mirar a lo lejos para controlar lo que pasa en el espacio que recorrerá el vehículo en los siguientes 20 segundos; cuanto más rápido, más lejos. _(MANUAL_DGT Tema 17, Visión (p. 441))_

## E-pre-0003

El vehículo que circula detrás de ti se acerca demasiado. ¿Qué es lo más aconsejable?  
Respuesta: **Dejar más distancia de seguridad con el vehículo de delante.**

- ✔ Si el de detrás se acerca mucho, hay que dejar más distancia con el de delante para no tener que frenar bruscamente, señalizar con más tiempo y frenar con suavidad. _(MANUAL_DGT Tema 17, Espacio trasero (p. 447))_
- ✘ `E-pre-0002` Siempre hay zonas que los retrovisores no cubren; para comprobarlas se puede girar la cabeza y mirar por la ventanilla. _(MANUAL_DGT Tema 17, Visión (p. 443))_
- ✘ `E-pre-0001` Hay que mirar a lo lejos para controlar lo que pasa en el espacio que recorrerá el vehículo en los siguientes 20 segundos; cuanto más rápido, más lejos. _(MANUAL_DGT Tema 17, Visión (p. 441))_

## E-efi-0001

¿Qué se consigue con la conducción eficiente?  
Respuesta: **Gastar menos combustible, contaminar menos y una conducción más segura.**

- ✔ La conducción eficiente gasta menos combustible, contamina menos y es más segura y cómoda. _(MANUAL_DGT Tema 17, Conducción eficiente (p. 449))_
- ✘ `E-efi-0006` Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_
- ✘ `E-efi-0003` Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_

## E-efi-0002

En conducción eficiente, después de iniciar la marcha en primera, ¿cuándo conviene cambiar a segunda?  
Respuesta: **A los pocos segundos.**

- ✔ Se arranca en primera y se pasa a segunda a los pocos segundos; las marchas largas son las que menos consumen. _(MANUAL_DGT Tema 17, Técnicas para conducir de forma eficiente (p. 453))_
- ✘ `E-efi-0006` Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_
- ✘ `E-efi-0003` Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_

## E-efi-0003

En conducción eficiente, ¿cuándo es aconsejable apagar el motor?  
Respuesta: **Cuando el vehículo vaya a estar parado más de un minuto.**

- ✔ Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_
- ✘ `E-efi-0002` Se arranca en primera y se pasa a segunda a los pocos segundos; las marchas largas son las que menos consumen. _(MANUAL_DGT Tema 17, Técnicas para conducir de forma eficiente (p. 453))_
- ✘ `E-efi-0006` Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_

## E-efi-0004

Llevar instalada la baca en el techo sin necesidad, ¿cómo influye en el consumo?  
Respuesta: **Lo aumenta, porque al vehículo le cuesta más vencer la resistencia del aire.**

- ✔ Elementos como la baca o los deflectores aumentan la resistencia al aire y el consumo; es mejor llevar el equipaje en el maletero. _(MANUAL_DGT Tema 17, El aire de la calle (p. 455))_
- ✘ `E-efi-0003` Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_
- ✘ `E-efi-0005` Un vehículo consume más cuanto más peso lleva; hay que llevar solo la carga necesaria. _(MANUAL_DGT Tema 17, Cargar mucho peso (p. 460))_

## E-efi-0005

Llevar en el maletero peso innecesario durante meses, ¿qué efecto tiene?  
Respuesta: **Aumenta el consumo de combustible.**

- ✔ Un vehículo consume más cuanto más peso lleva; hay que llevar solo la carga necesaria. _(MANUAL_DGT Tema 17, Cargar mucho peso (p. 460))_
- ✘ `E-efi-0003` Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_
- ✘ `E-efi-0001` La conducción eficiente gasta menos combustible, contamina menos y es más segura y cómoda. _(MANUAL_DGT Tema 17, Conducción eficiente (p. 449))_

## E-efi-0006

¿Qué ocurre con el consumo si los neumáticos llevan una presión inferior a la recomendada?  
Respuesta: **Aumenta.**

- ✔ Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_
- ✘ `E-efi-0005` Un vehículo consume más cuanto más peso lleva; hay que llevar solo la carga necesaria. _(MANUAL_DGT Tema 17, Cargar mucho peso (p. 460))_
- ✘ `E-efi-0003` Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_

## E-amb-0001

¿Cuáles son los distintivos ambientales que existen para los vehículos?  
Respuesta: **0 emisiones, ECO, C y B.**

- ✔ Los distintivos identifican la clasificación ambiental del Registro: 0 emisiones, ECO, C y B. No se crea distintivo para la categoría A. _(RGV Anexo XI, V-25.1)_
- ✘ `E-amb-0002` Los vehículos se clasifican en el Registro según su potencial contaminante, en relación con su nivel de emisiones y el combustible empleado. _(RGV Anexo II.E.1)_
- ✘ `E-ada-0010` El Start-Stop detiene el motor en paradas breves (semáforo, atasco): parado no gasta combustible ni emite gases. _(MANUAL_DGT Tema 17, Función Start-Stop (p. 462))_

## E-amb-0002

¿En función de qué se clasifican los vehículos para asignarles un distintivo ambiental?  
Respuesta: **De su nivel de emisiones y el combustible empleado (potencial contaminante).**

- ✔ Los vehículos se clasifican en el Registro según su potencial contaminante, en relación con su nivel de emisiones y el combustible empleado. _(RGV Anexo II.E.1)_
- ✘ `E-amb-0008` El distintivo de uso compartido va preferentemente en el ángulo superior izquierdo del parabrisas, por la cara interior (el ambiental va en el inferior derecho). _(RGV Anexo XI, V-26.3)_
- ✘ `E-efi-0003` Se aconseja apagar el motor cuando el vehículo vaya a estar más de un minuto parado, por ejemplo en un atasco prolongado. _(MANUAL_DGT Tema 17, Al reducir la velocidad y parar el vehículo (p. 454))_

## E-amb-0003

¿Qué distintivo corresponde a un turismo eléctrico de batería o a un híbrido enchufable con una autonomía mínima de 40 km?  
Respuesta: **0 emisiones.**

- ✔ Son 0 emisiones los eléctricos de batería (BEV), de autonomía extendida (REEV), de hidrógeno, de pila de combustible y los híbridos enchufables (PHEV) con autonomía mínima de 40 km. _(RGV Anexo II.E.2.a)_
- ✘ `E-amb-0007` El distintivo ambiental va en el ángulo inferior derecho del parabrisas, por la cara interior; sin parabrisas, en un sitio bien visible. _(RGV Anexo XI, V-25.3)_
- ✘ `E-efi-0004` Elementos como la baca o los deflectores aumentan la resistencia al aire y el consumo; es mejor llevar el equipaje en el maletero. _(MANUAL_DGT Tema 17, El aire de la calle (p. 455))_

## E-amb-0004

Un turismo híbrido no enchufable (HEV), ¿qué distintivo ambiental obtiene?  
Respuesta: **ECO.**

- ✔ Los turismos híbridos no enchufables, los enchufables con autonomía menor de 40 km y los de gas natural, GNC o GLP (que cumplan los criterios C) son ECO. _(RGV Anexo II.E.2.b)_
- ✘ `E-amb-0001` Los distintivos identifican la clasificación ambiental del Registro: 0 emisiones, ECO, C y B. No se crea distintivo para la categoría A. _(RGV Anexo XI, V-25.1)_
- ✘ `E-efi-0006` Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_

## E-amb-0005

Un turismo de gasolina clasificado como Euro 4, ¿qué distintivo ambiental obtiene?  
Respuesta: **C.**

- ✔ Son C los turismos de gasolina Euro 4, 5 o 6 y los diésel Euro 6. Los de gasolina Euro 3 y los diésel Euro 4 o 5 son B. _(RGV Anexo II.E.2.c)_
- ✘ `E-amb-0001` Los distintivos identifican la clasificación ambiental del Registro: 0 emisiones, ECO, C y B. No se crea distintivo para la categoría A. _(RGV Anexo XI, V-25.1)_
- ✘ `E-efi-0005` Un vehículo consume más cuanto más peso lleva; hay que llevar solo la carga necesaria. _(MANUAL_DGT Tema 17, Cargar mucho peso (p. 460))_

## E-amb-0006

Un turismo diésel clasificado como Euro 5, ¿qué distintivo ambiental obtiene?  
Respuesta: **B.**

- ✔ Los turismos diésel Euro 4 o 5 y los de gasolina Euro 3 obtienen el distintivo B; los diésel solo son C si son Euro 6. _(RGV Anexo II.E.2.d)_
- ✘ `E-amb-0007` El distintivo ambiental va en el ángulo inferior derecho del parabrisas, por la cara interior; sin parabrisas, en un sitio bien visible. _(RGV Anexo XI, V-25.3)_
- ✘ `E-mec-0003` El catalizador, situado en el tubo de escape, reduce la contaminación de los gases de escape; el ruido lo reduce el silenciador. _(MANUAL_DGT Tema 17, La contaminación (p. 451))_

## E-amb-0007

Si un vehículo con parabrisas delantero debe llevar el distintivo ambiental, ¿dónde se coloca?  
Respuesta: **En el ángulo inferior derecho del parabrisas, por su cara interior.**

- ✔ El distintivo ambiental va en el ángulo inferior derecho del parabrisas, por la cara interior; sin parabrisas, en un sitio bien visible. _(RGV Anexo XI, V-25.3)_
- ✘ `E-amb-0004` Los turismos híbridos no enchufables, los enchufables con autonomía menor de 40 km y los de gas natural, GNC o GLP (que cumplan los criterios C) son ECO. _(RGV Anexo II.E.2.b)_
- ✘ `E-efi-0005` Un vehículo consume más cuanto más peso lleva; hay que llevar solo la carga necesaria. _(MANUAL_DGT Tema 17, Cargar mucho peso (p. 460))_

## E-amb-0008

El distintivo de uso compartido (V-26), en un vehículo con parabrisas, ¿dónde se coloca preferentemente?  
Respuesta: **En el ángulo superior izquierdo del parabrisas, por su cara interior.**

- ✔ El distintivo de uso compartido va preferentemente en el ángulo superior izquierdo del parabrisas, por la cara interior (el ambiental va en el inferior derecho). _(RGV Anexo XI, V-26.3)_
- ✘ `E-amb-0006` Los turismos diésel Euro 4 o 5 y los de gasolina Euro 3 obtienen el distintivo B; los diésel solo son C si son Euro 6. _(RGV Anexo II.E.2.d)_
- ✘ `E-efi-0006` Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_

## E-amb-0009

¿Qué identifica este distintivo colocado en el parabrisas de un vehículo?  
Respuesta: **Que el vehículo está clasificado en el Registro de Vehículos como vehículo de uso compartido.**

- ✔ El distintivo V-26 identifica la clasificación del vehículo en el Registro de Vehículos como vehículo de uso compartido. _(RGV Anexo XI, V-26.1)_
- ✘ `E-amb-0004` Los turismos híbridos no enchufables, los enchufables con autonomía menor de 40 km y los de gas natural, GNC o GLP (que cumplan los criterios C) son ECO. _(RGV Anexo II.E.2.b)_
- ✘ `E-efi-0006` Con presión menor de la recomendada el neumático se calienta, se desgasta antes y se gasta más combustible. _(MANUAL_DGT Tema 5, Presión de inflado (p. 99))_

