#!/usr/bin/env node
/* Ejercicios de «Ordena» (hilo de ordenar). Escribe datos-ordenar.js.

   - Cruces: escenas de data/escenas.js (por id) y escenas nuevas en línea, con el mismo formato.
     El orden es el que calcula escenas.js (Escenas.ordenCruce: regla de la derecha, RGC 57.1),
     y aquí se exige que no haya bloqueo, que coincida con `orden` escrito a mano, que todos pasen
     de uno en uno y que nadie gire a la izquierda (el orden automático no lo cubre).
     El porqué y las citas salen de Escenas.pasosCruce, igual que en la web.
   - Procedimientos: el orden sale literal de la fuente (lista numerada o con letras, «pasos que
     debes dar», «antes / dentro / al salir», «primer / segundo / último momento»).

   Uso:  node prototipos/ejercicios/generar_ordenar.js   → escribe datos-ordenar.js
   Después: python3 prototipos/ejercicios/comprobar.py */
"use strict";
const fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..", ".."), AQUI = __dirname;
global.window = {};
require(path.join(RAIZ, "data", "escenas.js"));
const Esc = require(path.join(RAIZ, "escenas.js"));
const E = window.ESCENAS;
const URL_RGC = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";
const URL_MANUAL = "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf";
const salida = [];

// ---------- Cruces ----------
// Sin señales y con un brazo vacío (o cortado, en una T): cada uno cede al que llega por su derecha
// y sale una cadena de uno en uno. Con cuatro coches la regla de la derecha se bloquea, así que no hay.
const CRUCES = [
  { escena: "A-pri-0001", enunciado: "Cruce sin señales. Los tres siguen recto. Ordena los vehículos según pasan." },
  { escena: "B1-pri-0066", enunciado: "Cruce sin señales. Usted es A; B llega por su derecha y C por su izquierda. Todos siguen recto. Ordena los vehículos según pasan." },
  { id: "cruce-vacio-este", enunciado: "Cruce sin señales. Nadie llega por el este y los tres siguen recto. Ordena los vehículos según pasan.",
    escena: { tipo: "cruce", antes: "escena",
      titulo: "Cruce de cuatro brazos sin señales. A llega por el oeste, B por el norte y C por el sur; los tres siguen recto. El brazo este está vacío.",
      vehiculos: [{ letra: "A", desde: "O", hacia: "E" }, { letra: "B", desde: "N", hacia: "S" }, { letra: "C", desde: "S", hacia: "N" }],
      orden: [["C"], ["A"], ["B"]] } },
  { id: "cruce-vacio-sur", enunciado: "Cruce sin señales. Usted es A y llega por el este; nadie llega por el sur. Todos siguen recto. Ordena los vehículos según pasan.",
    escena: { tipo: "cruce", antes: "escena",
      titulo: "Cruce de cuatro brazos sin señales. Usted (A) llega por el este, B por el oeste y C por el norte; todos siguen recto. El brazo sur está vacío.",
      vehiculos: [{ letra: "A", desde: "E", hacia: "O", tu: true }, { letra: "B", desde: "O", hacia: "E" }, { letra: "C", desde: "N", hacia: "S" }],
      orden: [["B"], ["C"], ["A"]] } },
  { id: "cruce-t-sur", enunciado: "Intersección en T sin señales. Usted es A y gira a la derecha; B y C siguen recto. Ordena los vehículos según pasan.",
    escena: { tipo: "cruce", antes: "escena",
      titulo: "Intersección en T sin señales. Usted (A) llega por el sur y gira a la derecha; B llega por el oeste y C por el este, y los dos siguen recto.",
      vias: { N: { cerrada: true } },
      vehiculos: [{ letra: "A", desde: "S", hacia: "E", tu: true }, { letra: "B", desde: "O", hacia: "E" }, { letra: "C", desde: "E", hacia: "O" }],
      orden: [["C"], ["A"], ["B"]] } },
  { id: "cruce-t-este", enunciado: "Intersección en T sin señales. C gira a la derecha; A y B siguen recto. Ordena los vehículos según pasan.",
    escena: { tipo: "cruce", antes: "escena",
      titulo: "Intersección en T sin señales. A llega por el norte y B por el sur, y los dos siguen recto; C llega por el este y gira a la derecha.",
      vias: { O: { cerrada: true } },
      vehiculos: [{ letra: "A", desde: "N", hacia: "S" }, { letra: "B", desde: "S", hacia: "N" }, { letra: "C", desde: "E", hacia: "N" }],
      orden: [["A"], ["C"], ["B"]] } },
];
const anclaRGC = art => URL_RGC + "#a" + String(art).split(".")[0];
for (const c of CRUCES) {
  const id = typeof c.escena === "string" ? c.escena : c.id, e = typeof c.escena === "string" ? E[c.escena] : c.escena;
  const mal = m => { throw new Error(`${id}: ${m}`); };
  if (!e) mal("no existe la escena");
  if (e.tipo !== "cruce" || e.pasos) mal("solo cruces con orden automático");
  if (e.vehiculos.some(v => Esc.giroDe(v.desde, v.hacia) === "izquierda")) mal("el orden automático no cubre giros a la izquierda");
  const { grupos, bloqueo } = Esc.ordenCruce(e.vehiculos, e.vias);
  if (bloqueo) mal("la regla de la derecha no da un orden (bloqueo)");
  const calculado = grupos.map(g => g.map(v => v.letra).sort());
  if (JSON.stringify(calculado) !== JSON.stringify(e.orden.map(g => g.slice().sort()))) mal(`orden calculado ${JSON.stringify(calculado)} distinto del escrito ${JSON.stringify(e.orden)}`);
  if (grupos.length < 3 || grupos.some(g => g.length !== 1)) mal("tienen que pasar al menos tres, de uno en uno");
  const pasos = Esc.pasosCruce(e), citas = [...new Set(pasos.filter(x => x.cita).map(x => x.cita.texto))], cita = pasos.find(x => x.cita).cita;
  salida.push({ id: "ordenar-" + id, tipo: "ordenar", materia: 1, escena: c.escena, enunciado: c.enunciado,
    pasos: grupos.map(g => ({ texto: "Vehículo " + g[0].letra })),
    porque: pasos.map(x => x.texto).join(" "),
    truco: "Empieza por el que tiene la derecha libre y ve quitando coches.",
    fuente: { norma: cita.norma, articulo: cita.articulo, url: anclaRGC(cita.articulo), cita: citas.join(" | "), comprobar: citas } });
}

// ---------- Procedimientos (orden literal de la fuente) ----------
const manual = (tema, pags) => ({ norma: "MANUAL_DGT", articulo: `Tema ${tema} (p. ${pags})`, url: URL_MANUAL });
const PROC = [
  { id: "ordenar-rsm", materia: 1,
    enunciado: "Vas a hacer una maniobra. Ordena los pasos de la regla de seguridad R.S.M.",
    pasos: [{ texto: "Retrovisor", detalle: "Observar la vía" }, { texto: "Señal", detalle: "Avisar de la maniobra" }, { texto: "Maniobra", detalle: "Hacerla" }],
    porque: "R.S.M. son tres pasos: primero miras la vía y los retrovisores, después avisas de lo que vas a hacer y, por último, haces la maniobra.",
    truco: "Las iniciales van en orden: Retrovisor, Señal, Maniobra.",
    fuente: Object.assign(manual(11, "267-271"), { cita: "Regla de seguridad R.S.M. 1 Retrovisor 2 Señal 3 Maniobra · Después de comprobar que no hay peligro para hacer esa maniobra, debes avisar · Después de observar y señalar ya puedes hacer la maniobra.",
      comprobar: ["1\nRetrovisor\n2", "Después de comprobar que no hay peligro\npara hacer esa maniobra, debes avisar", "Después de observar y señalar\nya puedes hacer la maniobra."] }) },
  { id: "ordenar-giro-izquierda", materia: 1,
    enunciado: "Vas a girar a la izquierda en una calzada de doble sentido. Ordena lo que tienes que hacer.",
    pasos: [{ texto: "Avisar con el intermitente izquierdo" }, { texto: "Ceñirte a la línea que separa los sentidos" }, { texto: "Girar dejando el centro del cruce a tu izquierda" }],
    porque: "El reglamento lo pone en este orden: advertir la maniobra, colocarte con antelación junto a la marca que separa los sentidos (sin invadir el contrario) y girar dejando a tu izquierda el centro de la intersección.",
    truco: "Nada de cruzar en diagonal: el centro del cruce queda a tu izquierda.",
    fuente: { norma: "RGC", articulo: "75.1", url: URL_RGC + "#a75",
      cita: "a) Advertirá su propósito en la forma prevista en el artículo 109. b) [...] Si es a la izquierda, pero la calzada por la que circula es de doble sentido de la circulación, se ceñirá a la marca longitudinal de separación entre sentidos [...] c) Si el cambio de dirección es a la izquierda, dejará a la izquierda el centro de la intersección",
      comprobar: ["a) Advertirá su propósito en la forma prevista en el artículo 109.", "Si es a la izquierda, pero la calzada por la que circula es de doble sentido de la circulación, se ceñirá a la marca longitudinal de separación entre sentidos", "c) Si el cambio de dirección es a la izquierda, dejará a la izquierda el centro de la intersección"] } },
  { id: "ordenar-incorporacion", materia: 1,
    enunciado: "Entras en una autovía por el carril de aceleración y viene un coche por el carril derecho. Ordena lo que haces.",
    pasos: [{ texto: "Observar la vía y avisar con el intermitente" }, { texto: "Ceder el paso al que ya circula por la autovía" }, { texto: "Entrar en el carril adaptándote a su velocidad" }],
    porque: "Como en toda maniobra, primero observas y avisas. Si tienes que ceder el paso, esperas a que pase el que ya va por la autovía y después entras en tu carril adaptándote a la velocidad de los demás.",
    truco: "El que ya está dentro tiene preferencia: tú te adaptas a él.",
    fuente: Object.assign(manual(11, "271-272"), { cita: "Debes observar la carretera [...] y avisar de tu maniobra con el brazo o las luces. [...] Cuando tengas que ceder el paso a otro vehículo mientras estás en el carril de aceleración [...] Después entra al carril que te corresponda adaptándote a la velocidad de los demás vehículos.",
      comprobar: ["Debes observar la carretera, asegurarte siempre", "y avisar de tu maniobra con el brazo o las luces.", "Cuando tengas que ceder el paso a otro vehículo\nmientras estás en el carril de aceleración", "Después entra al carril que te corresponda\nadaptándote a la velocidad de los demás vehículos."] }) },
  { id: "ordenar-pinchazo", materia: 14,
    enunciado: "Se te pincha una rueda mientras conduces. Ordena lo que tienes que hacer.",
    pasos: [{ texto: "Reducir la velocidad poco a poco hasta parar" }, { texto: "Inmovilizar el coche en un lugar seguro" }, { texto: "Cambiar la rueda por la de repuesto" }],
    porque: "Primero reduces la velocidad de forma lenta, sin frenar de golpe; después dejas el coche quieto en un lugar seguro, fuera de la carretera y del arcén si puedes, y solo entonces cambias la rueda.",
    truco: "Nada de frenazos: con una rueda pinchada, un frenazo te saca de la carretera.",
    fuente: Object.assign(manual(5, "101"), { cita: "Los pasos que debes dar si se pincha una rueda mientras conduces son: Reducir la velocidad de forma lenta hasta parar el vehículo. No parar de forma brusca. Inmovilizar el vehículo en un lugar seguro. [...] Cambiar la rueda pinchada por la de repuesto.",
      comprobar: ["Los pasos que debes dar si se pincha una rueda\nmientras conduces son:\n■ Reducir la velocidad de forma lenta\nhasta parar el vehículo.\nNo parar de forma brusca.\n■ Inmovilizar el vehículo en un lugar seguro.", "■ Cambiar la rueda pinchada por la de repuesto."] }) },
  { id: "ordenar-curva", materia: 5,
    enunciado: "Ordena lo que tienes que hacer para tomar bien una curva.",
    pasos: [{ texto: "Reducir la velocidad antes de entrar" }, { texto: "Girar el volante de forma suave" }, { texto: "Enderezar el volante con suavidad" }, { texto: "Aumentar la velocidad poco a poco" }],
    porque: "Antes de la curva reduces la velocidad (y te acercas al borde derecho). Dentro, giras el volante con suavidad, sin acelerones ni frenazos. Al salir, enderezas el volante y vuelves a coger velocidad poco a poco.",
    truco: "Frena antes de la curva, no dentro.",
    fuente: Object.assign(manual(14, "342"), { cita: "Antes de entrar en la curva debes: Reducir la velocidad o frenar si es necesario. [...] Dentro de la curva debes: Girar el volante de forma suave. [...] Al salir de la curva debes: Girar con suavidad el volante para volver a circular recto. Aumentar la velocidad poco a poco.",
      comprobar: ["Antes de entrar en la curva debes:\n■ Reducir la velocidad o frenar\nsi es necesario.", "Dentro de la curva debes:\n■ Girar el volante de forma suave.", "Al salir de la curva debes:\n■ Girar con suavidad el volante\npara volver a circular recto.\n■ Aumentar la velocidad poco a poco."] }) },
  { id: "ordenar-detencion", materia: 5,
    enunciado: "Ves un semáforo en rojo y frenas. Ordena lo que pasa.",
    pasos: [{ texto: "Ves el semáforo en rojo" }, { texto: "Pisas el freno" }, { texto: "El coche se para por completo" }],
    porque: "Desde que ves el semáforo hasta que pisas el freno recorres la distancia de reacción; desde que pisas el freno hasta que el coche se para, la distancia de frenado. Las dos juntas son la distancia de detención.",
    truco: "Detención = reacción + frenado.",
    fuente: Object.assign(manual(10, "261-263"), { cita: "El conductor ve el semáforo · El conductor pisa el freno · Distancia de frenado: espacio que recorre el vehículo desde que pisas el freno hasta que se para por completo. · La distancia de detención es la suma de la distancia de reacción y la de frenado.",
      comprobar: ["El conductor\nve el semáforo\nEl conductor\npisa el freno", "Espacio que recorre el vehículo desde que pisas\nel freno hasta que se para por completo.", "La distancia de detención es la suma\nde la distancia de reacción y la de frenado."] }) },
  { id: "ordenar-sacar-herido", materia: 11,
    enunciado: "Tienes que sacar a un herido de su coche porque corre peligro dentro. Ordena los pasos.",
    pasos: [{ texto: "Pasar tus brazos por debajo de sus axilas" }, { texto: "Coger su brazo con una mano y su barbilla con la otra" }, { texto: "Sacarlo despacio, con cabeza, cuello y tronco en línea" }, { texto: "Dejarlo en un lugar seguro" }],
    porque: "Pasas los brazos por debajo de sus axilas, le sujetas el brazo y la barbilla, lo sacas despacio manteniendo cabeza, cuello y tronco en bloque y lo dejas en un lugar seguro.",
    truco: "Cabeza, cuello y tronco se mueven juntos, como un bloque.",
    fuente: Object.assign(manual(16, "422"), { cita: "Para sacar a una persona herida de su vehículo hay que seguir los siguientes pasos: Pasar los brazos por debajo de sus axilas, con cuidado. Coger su brazo con una mano y sujetar la barbilla con la otra. Sacar a la persona del vehículo de forma lenta y mantener su cabeza, cuello y tronco en la misma línea, como si fuera un bloque. Colocarle en un lugar seguro.",
      comprobar: ["Para sacar a una persona herida de su vehículo\nhay que seguir los siguientes pasos:\n■ Pasar los brazos por debajo de sus axilas,\ncon cuidado.\n■ Coger su brazo con una mano y sujetar\nla barbilla con la otra.\n■ Sacar a la persona del vehículo de forma lenta\ny mantener su cabeza, cuello y tronco\nen la misma línea, como si fuera un bloque.\n■ Colocarle en un lugar seguro."] }) },
  { id: "ordenar-valorar-herido", materia: 11,
    enunciado: "Atiendes a un herido. Ordena cómo compruebas su estado y qué haces si no respira.",
    pasos: [{ texto: "Comprobar si está consciente", detalle: "Preguntarle «¿Estás bien?»" }, { texto: "Comprobar si respira", detalle: "Mirar su pecho, oír y sentir el aire" }, { texto: "Si no respira, presionar el pecho 30 veces" }, { texto: "Hacer 2 ventilaciones boca a boca" }],
    porque: "Las constantes vitales se miran siempre en el mismo orden: primero la consciencia y después la respiración. Si no respira con normalidad, empiezas la reanimación: 30 compresiones en el tórax y 2 ventilaciones boca a boca, y vuelta a empezar.",
    truco: "Primero consciencia, luego respiración; la reanimación es 30 y 2.",
    fuente: Object.assign(manual(16, "423-426"), { cita: "el primer paso es comprobar sus constantes vitales siguiendo siempre el mismo orden. Consciencia Respiración [...] No respira de forma normal: Comenzar la reanimación cardiopulmonar [...] Presionar 30 veces [...] Haz 2 ventilaciones boca a boca cada 30 compresiones en el tórax",
      comprobar: ["el primer paso es comprobar sus constantes vitales\nsiguiendo siempre el mismo orden.\nConsciencia\nRespiración", "No respira\nde forma normal", "Presionar\n30 veces", "■ Haz 2 ventilaciones\nboca a boca\ncada 30 compresiones\nen el tórax"] }) },
  { id: "ordenar-momentos-accidente", materia: 11,
    enunciado: "Ordena los tres momentos en los que un herido de tráfico tiene riesgo de morir.",
    pasos: [{ texto: "Muerte inmediata", detalle: "Primeros segundos" }, { texto: "Hora de oro", detalle: "Una o dos horas después" }, { texto: "Mortalidad tardía", detalle: "Días o semanas después" }],
    ocultarDetalle: true,
    porque: "Primero, los segundos que siguen al accidente (muerte inmediata). Después, una o dos horas después del accidente, la hora de oro, en la que la reanimación puede salvar la vida. Por último, los días o semanas siguientes (mortalidad tardía).",
    truco: "En la hora de oro es cuando más ayuda que socorras bien.",
    fuente: Object.assign(manual(16, "413-414"), { cita: "Primer momento · Segundo momento · Primeros segundos después del accidente. Se llama muerte inmediata. Una o dos horas después del accidente. [...] Se llama hora de oro. Último momento · Días o semanas después del accidente. Se llama mortalidad tardía.",
      comprobar: ["Primer\nmomento\nSegundo\nmomento", "Primeros segundos después\ndel accidente.\nSe llama muerte inmediata.\nUna o dos horas después del accidente.", "Se llama hora de oro.\nÚltimo\nmomento", "Días o semanas después\ndel accidente.\nSe llama mortalidad tardía."] }) },
  { id: "ordenar-incendio-tunel", materia: 6,
    enunciado: "Hay un incendio dentro del túnel por el que circulas. Ordena los pasos.",
    pasos: [{ texto: "Llevar el coche a la derecha" }, { texto: "Apagar el motor" }, { texto: "Dejar la llave puesta y las puertas sin cerrar con llave" }, { texto: "Salir e ir al refugio o salida más próxima" }],
    porque: "Te apartas a la derecha para dejar pasar a los vehículos de emergencias, apagas el motor, dejas la llave puesta y las puertas sin cerrar y sales todos hacia el refugio o la salida más próxima, en sentido contrario al fuego.",
    truco: "Sal siempre en sentido contrario al del fuego.",
    fuente: Object.assign(manual(12, "317"), { cita: "En caso de que haya un incendio dentro de un túnel, los conductores de los vehículos deben seguir los siguientes pasos: Llevar el vehículo hacia la derecha para dejar pasar a los vehículos de emergencias. Apagar el motor. Dejar la llave puesta y las puertas del vehículo abiertas. Es decir, no cerradas con llave. Todas las personas que viajan en el vehículo deben salir de él e ir al refugio o salida más próxima. Siempre en el sentido contrario al del fuego.",
      comprobar: ["En caso de que haya un incendio dentro de un túnel,\nlos conductores de los vehículos deben seguir\nlos siguientes pasos:\n■ Llevar el vehículo hacia la derecha\npara dejar pasar a los vehículos de emergencias.\n■ Apagar el motor.\n■ Dejar la llave puesta y las puertas del vehículo\nabiertas. Es decir, no cerradas con llave.\n■ Todas las personas que viajan en el vehículo\ndeben salir de él e ir al refugio o salida\nmás próxima.\nSiempre en el sentido contrario al del fuego."] }) },
  { id: "ordenar-perder-puntos", materia: 10,
    enunciado: "Un conductor pierde todos los puntos. Ordena lo que pasa hasta que recupera el permiso.",
    pasos: [{ texto: "Pierde todos los puntos" }, { texto: "Pasan seis meses sin poder conducir" }, { texto: "Hace un curso de 24 horas" }, { texto: "Aprueba un examen en Tráfico" }],
    porque: "Quien pierde todos los puntos no puede conducir durante seis meses. Pasado ese plazo, tiene que hacer un curso de 24 horas y un examen en la Jefatura de Tráfico para recuperar los puntos y el permiso.",
    truco: "Primero el plazo de seis meses; después, curso y examen.",
    fuente: Object.assign(manual("Anexo puntos", "468"), { articulo: "Anexo puntos (p. 468)", cita: "La persona que pierde todos los puntos no podrá volver a conducir hasta que pasen seis meses. Después de esos seis meses, tendrá que hacer un curso de 24 horas y un examen en la Jefatura de Tráfico para recuperar los puntos y el permiso de conducir.",
      comprobar: ["La persona que pierde todos los puntos\nno podrá volver a conducir hasta que pasen\nseis meses.\nDespués de esos seis meses, tendrá que hacer\nun curso de 24 horas y un examen\nen la Jefatura de Tráfico para recuperar los puntos\ny el permiso de conducir."] }) },
  { id: "ordenar-estrechamiento-1", materia: 1,
    enunciado: "En un tramo estrecho sin señales, cuando uno tiene que dar marcha atrás, manda el tipo de vehículo. Ordena estos de más a menos preferencia.",
    pasos: [{ texto: "Autobús" }, { texto: "Camión" }, { texto: "Turismo" }, { texto: "Motocicleta" }],
    porque: "El reglamento da una lista: entre estos, va primero el autobús (transporte colectivo de viajeros), después el camión, luego el turismo y, al final, las motocicletas, ciclomotores de dos ruedas y bicicletas. Retrocede el que tiene menos preferencia.",
    truco: "Pasa primero el que entró antes en el tramo; la lista es para cuando hay duda.",
    fuente: { norma: "RGC", articulo: "62.1", url: URL_RGC + "#a62",
      cita: "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente: [...] e) Vehículos destinados al transporte colectivo de viajeros. f) Camiones, tractocamiones y furgones. g) Turismos y vehículos derivados de turismos. [...] j) Motocicletas, ciclomotores de dos ruedas y bicicletas.",
      comprobar: ["el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente:", "e) Vehículos destinados al transporte colectivo de viajeros.\nf) Camiones, tractocamiones y furgones.\ng) Turismos y vehículos derivados de turismos.", "j) Motocicletas, ciclomotores de dos ruedas y bicicletas."] } },
  { id: "ordenar-estrechamiento-2", materia: 1,
    enunciado: "Tramo estrecho sin señales: ¿quién tiene preferencia si uno debe dar marcha atrás? Ordena estos de más a menos preferencia.",
    pasos: [{ texto: "Vehículo de tracción animal" }, { texto: "Autocaravana" }, { texto: "Autobús" }, { texto: "Turismo" }],
    porque: "Según la lista del reglamento, el vehículo de tracción animal va antes que las autocaravanas (y los turismos con remolque de hasta 750 kg), después vienen los autobuses y más tarde los turismos.",
    truco: "Retrocede el que tiene menos preferencia en la lista.",
    fuente: { norma: "RGC", articulo: "62.1", url: URL_RGC + "#a62",
      cita: "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente: [...] c) Vehículos de tracción animal. d) Turismos que arrastran remolques de hasta 750 kilogramos de masa máxima autorizada y autocaravanas. e) Vehículos destinados al transporte colectivo de viajeros. f) [...] g) Turismos y vehículos derivados de turismos.",
      comprobar: ["el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente:", "c) Vehículos de tracción animal.\nd) Turismos que arrastran remolques de hasta 750 kilogramos de masa máxima autorizada y autocaravanas.\ne) Vehículos destinados al transporte colectivo de viajeros.", "g) Turismos y vehículos derivados de turismos."] } },
];
for (const p of PROC) salida.push(Object.assign({ tipo: "ordenar" }, p));

const ids = new Set();
for (const x of salida) { if (ids.has(x.id)) throw new Error("id repetido " + x.id); ids.add(x.id); if (x.pasos.length < 3) throw new Error(x.id + ": pocos pasos"); }
fs.writeFileSync(path.join(AQUI, "datos-ordenar.js"),
  "// Generado por generar_ordenar.js (hilo de ordenar); no editar a mano.\n" +
  "window.EJERCICIOS.push(...\n" + JSON.stringify(salida, null, 1) + ");\n");
console.log("datos-ordenar.js:", salida.length, "ejercicios de ordenar");
