#!/usr/bin/env node
/* «Toca en la imagen» sobre las escenas animadas: quién pasa primero, quién pasa el último o quién da marcha atrás.

   Dos fuentes de escenas:
   - Escenas de la web (data/escenas.js), por id de pregunta. Si en el fotograma quieto algún vehículo queda fuera
     del dibujo, `inicio` lo coloca en otra marca de su trayecto; entonces la escena va como objeto (copia con ese
     cambio) y los pasos son los mismos. `inicio: "dentro"` pone a todos recién entrados en el tramo estrecho;
     `inicio: "encuentro"` coloca a cada vehículo donde lo deja el primer paso.
   - Cruces propios (PROPIAS): solo vehículos y señales; el orden y los pasos los calcula escenas.js
     (ordenCruce / pasosCruce, RGC 56.5, 57.1 y 57.1.a), igual que en los cruces de la web con «orden».

   Lo que comprueba este script (si algo no cuadra, se para):
   - «primero»: el primer grupo que llega al final de su trayecto en los pasos de la escena es solo `correcta`.
   - «ultimo»: el último grupo es solo `correcta`.
   - «retrocede»: la escena dice `retrocede: correcta` y un paso lleva a `correcta` hacia atrás (marca «antes»).
   - La cita de `fuente` sale de los pasos de la propia escena (artículo `art`), y comprobar.py la busca en el BOE.
   - En los cruces propios, ordenCruce no se bloquea.
   Uso:  node prototipos/ejercicios/generar_tocar.js   → escribe datos-tocar.js */
"use strict";
const fs = require("fs"), path = require("path");
const RAIZ = path.join(__dirname, "..", ".."), AQUI = __dirname;
global.window = {};
require(path.join(RAIZ, "data", "escenas.js"));
require(path.join(RAIZ, "data", "preguntas.js"));
const Esc = require(path.join(RAIZ, "escenas.js"));
const E = window.ESCENAS, BANCO = new Map(window.BANCO.preguntas.map(p => [p.id, p]));
const URL_RGC = "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514";

// Trucos que se repiten (cortos, como en el resto de ejercicios).
const T = {
  derecha: "Sin señales, busca al que tiene la derecha libre: ese sale primero.",
  ceda: "Con ceda el paso o STOP cedes a todos los de la vía preferente, vengan por la derecha o por la izquierda.",
  stop: "En el STOP te detienes siempre, venga alguien o no, y luego cedes el paso.",
  tierra: "La vía pavimentada gana al camino de tierra, aunque el de tierra venga por la derecha.",
  prioridad: "La señal de prioridad manda sobre la regla de la derecha.",
  glorieta: "En la glorieta tiene preferencia el que ya está dentro del anillo.",
  railes: "Tren y tranvía pasan siempre primero.",
  urgencia: "Con sirena y luces, el vehículo prioritario en servicio urgente pasa antes que nadie.",
  ciclistas: "En grupo, si el primero ya entró, pasa el grupo entero.",
  peatones: "Al girar para entrar en otra vía, peatones y animales que la cruzan tienen prioridad.",
  arcen: "Si cruzas un arcén por el que van peatones o animales, ellos pasan primero.",
  giroIzq: "Para girar a la izquierda, deja pasar primero a los que vienen de frente.",
  tipo: "Cuanto más fácil de maniobrar, antes da marcha atrás. Ojo: el autobús va por delante del camión.",
  igual: "Del mismo tipo: retrocede el que tiene que hacer menos marcha atrás; si es igual, el más pequeño.",
  pendiente: "En una cuesta estrecha (7 % o más) tiene preferencia el que sube.",
  puente: "Con prioridad en sentido contrario o ceda el paso en tu extremo, retrocedes tú.",
  agente: "Lo que ordena el agente va por delante de cualquier otra norma.",
  entro: "En un tramo estrecho tiene preferencia el que entró primero.",
};

// ---------- Escenas de la web ----------
// pregunta: primero | ultimo | retrocede. art: artículo de los pasos que se cita. zonas: ids extra sin letra (id del vehículo).
const LISTA = [
  // Cruces sin señales
  { escena: "A-pri-0001", pregunta: "primero", correcta: "C", art: "57.1", enunciado: "Cruce sin señales. Los tres siguen recto. Toca el vehículo que pasa primero.",
    porque: "Sin señales, cada uno cede el paso al que se acerca por su derecha. C no tiene a nadie a su derecha.", truco: T.derecha },
  { escena: "A-pri-0001", pregunta: "ultimo", correcta: "A", art: "57.1", id: "tocar-esc-A-pri-0001-ultimo", enunciado: "Cruce sin señales. Los tres siguen recto. Toca el vehículo que pasa el último.",
    porque: "A tiene a B por su derecha y B tiene a C por la suya: pasa C, luego B y, por último, A.", truco: T.derecha },
  { escena: "B1-pri-0066", pregunta: "primero", correcta: "B", art: "57.1", enunciado: "Cruce sin señales. Los tres siguen recto. Toca el vehículo que pasa primero.",
    porque: "B no tiene a nadie por su derecha, así que pasa primero. Después A y, por último, C.", truco: T.derecha },
  { escena: "B1-pri-0066", pregunta: "ultimo", correcta: "C", art: "57.1", id: "tocar-esc-B1-pri-0066-ultimo", enunciado: "Cruce sin señales. Los tres siguen recto. Toca el vehículo que pasa el último.",
    porque: "C tiene a A por su derecha y A tiene a B por la suya: pasa B, luego A y, por último, C.", truco: T.derecha },
  { escena: "B1-sen-0075", pregunta: "primero", correcta: "B", art: "57.1", enunciado: "Cruce con esta señal de peligro y sin otras señales. Toca el vehículo que pasa primero.",
    porque: "La señal solo avisa del cruce: rige la regla general y B, que viene por la derecha de A, pasa primero.", truco: T.derecha },
  { escena: "A-pri-0002", pregunta: "primero", correcta: "A", art: "57.1.a", enunciado: "Cruce sin señales. B sale de un camino de tierra. Toca el vehículo que pasa primero.",
    porque: "Quien circula por una vía pavimentada tiene preferencia sobre quien sale de un camino sin pavimentar, aunque venga por su derecha.", truco: T.tierra },
  // Señales de prioridad
  { escena: "A-pri-0006", pregunta: "ultimo", correcta: "A", art: "56.5", enunciado: "Fíjate en las señales. Toca el vehículo que tiene que esperar a que pasen los otros dos.",
    porque: "A tiene ceda el paso: cede a todos los que van por la vía preferente, B por la derecha y C por la izquierda.", truco: T.ceda },
  { escena: "x1a-0059", pregunta: "primero", correcta: "B", art: "56.5", enunciado: "A tiene ceda el paso. Hay un hueco, pero B ya está cerca. Toca el vehículo que pasa primero.",
    porque: "Si A saliera, B tendría que frenar de golpe. A espera y B pasa primero.", truco: "Si al salir obligas al otro a frenar o a desviarse, no salgas." },
  { escena: "B1-pri-0064", pregunta: "primero", correcta: "B", art: "56.5", inicio: { B: "cerca" }, enunciado: "A llega a un STOP sin línea pintada. Toca el vehículo que pasa primero.",
    porque: "A se detiene justo antes de la calzada y cede el paso a B, que circula por ella.", truco: T.stop },
  { escena: "B1-pri-0065", pregunta: "primero", correcta: "B", art: "56.5", inicio: { B: "cerca" }, enunciado: "A llega a un STOP y el edificio le tapa la vista. Toca el vehículo que pasa primero.",
    porque: "A se detiene en la línea, avanza despacio hasta ver y vuelve a detenerse. Cede el paso a B, que va por la vía preferente.", truco: T.stop },
  { escena: "B2-mv-0031", pregunta: "primero", correcta: "B", art: "56.5", inicio: { A: "cerca", B: "cerca" }, enunciado: "Fíjate en lo que hay pintado en el carril de A. Toca el vehículo que pasa primero.",
    porque: "La marca STOP obliga a A a detenerse y ceder el paso a B, que circula por la calzada a la que llega.", truco: T.stop },
  { escena: "B2-mv-0032", pregunta: "primero", correcta: "B", art: "56.5", inicio: { A: "cerca", B: "cerca" }, enunciado: "Fíjate en lo que hay pintado en el carril de A. Toca el vehículo que pasa primero.",
    porque: "El triángulo pintado es un ceda el paso: A cede a B, que circula por la calzada a la que se aproxima.", truco: T.ceda },
  { escena: "B1-pri-0059", pregunta: "primero", correcta: "A", art: "56.4", enunciado: "Fíjate en las señales. B viene por la derecha de A. Toca el vehículo que pasa primero.",
    porque: "La señal avisa de una intersección con prioridad para A, y la vía de B tiene ceda el paso. Pasa A aunque B venga por su derecha.", truco: T.prioridad },
  { escena: "B1-pri-0060", pregunta: "primero", correcta: "A", art: "56.4", enunciado: "A circula por una calzada con prioridad. Toca el vehículo que pasa primero.",
    porque: "Con calzada con prioridad, A pasa antes que los que vienen de la otra vía, por la derecha o por la izquierda.", truco: T.prioridad },
  { escena: "A-pri-0009", pregunta: "ultimo", correcta: "A", art: "72.2", inicio: { B: "cerca", C: "cerca" }, enunciado: "A sale a la carretera desde el camino privado de su casa. Toca el vehículo que tiene que esperar.",
    porque: "Quien sale de un camino privado cede el paso a todos los que circulan por la vía, vengan por donde vengan.", truco: "Al salir de un garaje o de un camino privado, cedes a todos." },
  // Glorieta, raíles y giros
  { escena: "A-pri-0004", pregunta: "primero", correcta: "A", art: "57.1.c", enunciado: "Glorieta sin señales. A ya va por el anillo y B quiere entrar. Toca el vehículo que pasa primero.",
    porque: "En las glorietas tienen preferencia los que ya circulan por el anillo sobre los que quieren entrar.", truco: T.glorieta },
  { escena: "A-pri-0003", pregunta: "primero", correcta: "B", art: "57.1.b", inicio: { B: "cerca" }, enunciado: "Cruce sin señales. El tranvía (B) viene por la izquierda de A. Toca el vehículo que pasa primero.",
    porque: "Los vehículos que circulan por raíles tienen prioridad sobre los demás, aunque vengan por la izquierda.", truco: T.railes },
  { escena: "B1-pri-0067", pregunta: "primero", correcta: "tren", art: "57.1.b", inicio: { tren: "cerca" }, zonas: { tren: "El tren" }, textoCorrecta: "el tren",
    enunciado: "Paso a nivel sin barreras. Toca quién pasa primero.",
    porque: "El tren circula por raíles y tiene prioridad: A se detiene antes del paso a nivel y espera a que pase entero.", truco: T.railes },
  { escena: "A-pri-0008", pregunta: "primero", correcta: "B", art: "74.1", enunciado: "A quiere girar a la izquierda y B viene de frente, cerca, para seguir recto. Toca el vehículo que pasa primero.",
    porque: "Antes de girar, A tiene que comprobar que puede hacerlo sin peligro. Con B tan cerca, espera a que pase.", truco: T.giroIzq },
  { escena: "x1a-0062", pregunta: "primero", correcta: "A", art: "59.2", enunciado: "A se ha quedado parado dentro del cruce y ahora el semáforo de B está en verde. Toca el vehículo que se mueve primero.",
    porque: "Quien se queda detenido dentro de un cruce con semáforos y estorba debe salir sin esperar a que se abra su dirección, si no entorpece a nadie.", truco: "Si te quedas atrapado dentro del cruce, sal en cuanto puedas sin estorbar." },
  { escena: "A-dir-0008", pregunta: "ultimo", correcta: "A", art: "76.2", inicio: { A: "fuera", B: "cerca", C: "cerca" }, enunciado: "El ciclista (A) quiere girar a la izquierda y no hay carril para girar. Toca el vehículo que pasa el último.",
    porque: "Sin carril para girar, el ciclista se sitúa a la derecha, fuera de la calzada si puede, y cruza cuando no viene nadie.", truco: "Ciclista fuera de poblado sin carril de giro: se aparta a la derecha y cruza cuando está libre." },
  // Urgencias
  { escena: "A-urg-0006", pregunta: "primero", correcta: "B", art: "70.2", inicio: { A: "cerca", B: "cerca" }, enunciado: "A lleva a un herido con las luces de emergencia y el claxon, pero su semáforo está en rojo. Toca el vehículo que pasa primero.",
    porque: "Un turismo que no es prioritario debe respetar las normas, sobre todo en los cruces: A espera a su verde y B pasa.", truco: "Un coche particular con un herido no es un vehículo prioritario." },
  { escena: "x1a-0075", pregunta: "primero", correcta: "ambulancia", art: "67.1", inicio: { B: "cerca", C: "cerca" }, zonas: { ambulancia: "La ambulancia" }, textoCorrecta: "la ambulancia",
    enunciado: "Una ambulancia privada llega en servicio urgente, con sirena y luces. Toca quién pasa primero.",
    porque: "En servicio urgente, la ambulancia tiene prioridad, sea pública o privada. B y C se detienen.", truco: T.urgencia },
  { escena: "x1a-0077", pregunta: "primero", correcta: "ambulancia", art: "67.1", inicio: { ambulancia: "cerca", B: "cerca", C: "cerca" }, zonas: { ambulancia: "La ambulancia" }, textoCorrecta: "la ambulancia",
    enunciado: "Una ambulancia en servicio urgente llega con su semáforo en rojo; B y C tienen verde. Toca quién cruza primero.",
    porque: "La ambulancia tiene prioridad, pero con el semáforo en rojo extrema la precaución y no cruza hasta ver que B y C se han detenido.", truco: T.urgencia },
  { escena: "x1a-0084", pregunta: "primero", correcta: "ambulancia", art: "67.1", inicio: { A: "cerca", ambulancia: "cerca" }, zonas: { ambulancia: "La ambulancia" }, textoCorrecta: "la ambulancia",
    enunciado: "Cruce sin señales. Por la izquierda de A llega una ambulancia en servicio urgente. Toca quién pasa primero.",
    porque: "Por la regla de la derecha pasaría A, pero los vehículos prioritarios en servicio urgente tienen prioridad sobre todos.", truco: T.urgencia },
  // Ciclistas, peatones y animales
  { escena: "A-cic-0001", pregunta: "primero", correcta: "ciclistas", art: "64.2.c", zonas: { ciclistas: "Los ciclistas" }, textoCorrecta: "los ciclistas",
    enunciado: "Un grupo de ciclistas cruza y el primero ya está dentro del cruce. Toca quién pasa primero.",
    porque: "Si el primero de un grupo de ciclistas ya ha entrado en el cruce, todo el grupo tiene prioridad, aunque venga por la izquierda.", truco: T.ciclistas },
  { escena: "A-cic-0002", pregunta: "primero", correcta: "ciclista", art: "64.2.b", inicio: { A: "cerca", ciclista: "borde" }, zonas: { ciclista: "El ciclista" }, textoCorrecta: "el ciclista",
    enunciado: "A va a girar a la derecha y el ciclista sigue recto. Toca quién pasa primero.",
    porque: "Cuando un vehículo gira para entrar en otra vía y hay un ciclista cerca, el ciclista tiene prioridad.", truco: "Al girar, el ciclista que sigue recto pasa antes que tú." },
  { escena: "A-pea-0001", pregunta: "primero", correcta: "p1", art: "65.1.b", zonas: { p1: "Los peatones" }, juntos: { p2: "p1" }, textoCorrecta: "los peatones",
    enunciado: "A va a girar a la derecha y en la calle a la que entra hay peatones cruzando, sin paso para peatones. Toca quién pasa primero.",
    porque: "Al girar para entrar en otra vía, los peatones que la cruzan tienen prioridad, aunque no haya paso para peatones.", truco: T.peatones },
  { escena: "A-pea-0002", pregunta: "primero", correcta: "p1", art: "65.1.c", zonas: { p1: "Los peatones" }, juntos: { p2: "p1" }, textoCorrecta: "los peatones",
    enunciado: "A va a entrar en un camino y tiene que cruzar el arcén, por el que caminan peatones sin acera. Toca quién pasa primero.",
    porque: "Si un vehículo cruza un arcén por el que van peatones que no tienen zona peatonal, los peatones tienen prioridad.", truco: T.arcen },
  { escena: "x1a-0073", pregunta: "primero", correcta: "rebano", art: "66.1.b", zonas: { rebano: "El rebaño" }, textoCorrecta: "el rebaño",
    enunciado: "A va a girar a la derecha y un rebaño cruza la calle a la que entra, sin paso para animales. Toca quién pasa primero.",
    porque: "Al girar para entrar en otra vía, los animales que la cruzan tienen prioridad, aunque no haya paso para ellos.", truco: T.peatones },
  { escena: "x1a-0074", pregunta: "primero", correcta: "vacas", art: "66.1.c", zonas: { vacas: "Las vacas" }, textoCorrecta: "las vacas",
    enunciado: "A va a entrar en una finca y tiene que cruzar el arcén, por el que van unas vacas. Toca quién pasa primero.",
    porque: "Si un vehículo cruza un arcén por el que circulan animales, los animales tienen prioridad.", truco: T.arcen },
  // Tramos estrechos, puentes y pendientes
  { escena: "A-est-0001", pregunta: "primero", correcta: "A", art: "60.1", inicio: { A: "encuentro", B: "antes" }, enunciado: "Tramo estrecho sin señales donde solo cabe un vehículo. Toca el vehículo que pasa primero.",
    porque: "En un tramo estrecho sin señales tiene preferencia el que entró primero: A ya está dentro y B espera fuera.", truco: T.entro },
  ...[["x1a-0067", "B"], ["x1a-0068", "A"], ["x1a-0069", "B"], ["A-est-0002", "A"], ["A-est-0004", "B"], ["A-est-0005", "A"], ["A-est-0006", "B"], ["v5a-est-0001", "A"]].map(([escena, correcta]) => (
    { escena, pregunta: "retrocede", correcta, art: "62.1", inicio: "dentro", porque: "auto", truco: T.tipo,
      enunciado: "Tramo estrecho sin señales. Entraron a la vez y no se sabe quién fue primero. Toca el vehículo que da marcha atrás." })),
  { escena: "x1a-0070", pregunta: "retrocede", correcta: "B", art: "62.1", inicio: "dentro", enunciado: "Dos camiones se encuentran en el centro de un tramo estrecho: los dos tendrían que retroceder lo mismo. Toca el que da marcha atrás.",
    porque: "Del mismo tipo y con la misma distancia, tiene preferencia el de mayor anchura, longitud o masa. A es más largo, así que retrocede B.", truco: T.igual },
  { escena: "A-est-0003", pregunta: "retrocede", correcta: "B", art: "62.1", inicio: "encuentro", enunciado: "Dos turismos se encuentran en un tramo estrecho sin señales. Toca el que da marcha atrás.",
    porque: "Del mismo tipo, tiene preferencia el que tendría que retroceder más. A ya ha recorrido casi todo el tramo; B acaba de entrar y retrocede.", truco: T.igual },
  { escena: "A-est-0010", pregunta: "retrocede", correcta: "A", art: "61.2", inicio: "dentro", enunciado: "Puente estrecho con señales en los dos extremos. Toca el vehículo que da marcha atrás.",
    porque: "El que llega por el extremo con la señal de prioridad en sentido contrario retrocede para dejar paso al otro.", truco: T.puente },
  { escena: "A-est-0008", pregunta: "retrocede", correcta: "B", art: "63.1", inicio: "dentro", enunciado: "Tramo estrecho de gran pendiente: la carretera sube de izquierda a derecha. Toca el vehículo que da marcha atrás.",
    porque: "En un tramo estrecho de gran pendiente tiene preferencia el que sube. B baja, así que retrocede.", truco: T.pendiente },
  { escena: "x1a-0072", pregunta: "retrocede", correcta: "A", art: "62.1", inicio: "dentro", enunciado: "Tramo estrecho que sube de izquierda a derecha, pero no está claro que llegue al 7 %. Toca el vehículo que da marcha atrás.",
    porque: "Si hay duda sobre la pendiente, se aplica el orden por tipos de vehículo: el camión (B) va antes que el turismo (A), así que A retrocede aunque suba.", truco: "Con duda sobre la pendiente, manda el orden por tipos de vehículo." },
  { escena: "x1a-0071", pregunta: "retrocede", correcta: "A", art: "62.1", inicio: "dentro", enunciado: "Tramo estrecho con un agente, que ordena retroceder al autobús (A). Toca el vehículo que da marcha atrás.",
    porque: "Por tipos tendría preferencia el autobús, pero lo que ordena el agente va por delante: el autobús retrocede.", truco: T.agente },
];

// ---------- Cruces propios: el orden lo calcula escenas.js ----------
const PROPIAS = [
  { id: "propio-tres-sur-oeste-norte", pregunta: "primero", titulo: "Cruce sin señales. A llega por el sur, B por el oeste y C por el norte; los tres siguen recto.",
    vehiculos: [{ letra: "A", desde: "S", hacia: "N" }, { letra: "B", desde: "O", hacia: "E" }, { letra: "C", desde: "N", hacia: "S" }], truco: T.derecha },
  { id: "propio-tres-este-norte-oeste", pregunta: "primero", titulo: "Cruce sin señales. A llega por el este, B por el norte y C por el oeste; los tres siguen recto.",
    vehiculos: [{ letra: "A", desde: "E", hacia: "O" }, { letra: "B", desde: "N", hacia: "S" }, { letra: "C", desde: "O", hacia: "E" }], truco: T.derecha },
  { id: "propio-tres-norte-oeste-sur", pregunta: "ultimo", titulo: "Cruce sin señales. A llega por el norte, B por el oeste y C por el sur; los tres siguen recto.",
    vehiculos: [{ letra: "A", desde: "N", hacia: "S" }, { letra: "B", desde: "O", hacia: "E" }, { letra: "C", desde: "S", hacia: "N" }], truco: T.derecha },
  { id: "propio-dos-izquierda", pregunta: "primero", titulo: "Cruce sin señales. A llega por el sur y B por el oeste, a la izquierda de A; los dos siguen recto.",
    vehiculos: [{ letra: "A", desde: "S", hacia: "N" }, { letra: "B", desde: "O", hacia: "E" }], truco: T.derecha },
  { id: "propio-stop-derecha", pregunta: "primero", titulo: "Cruce. A llega por el sur; B llega por el este, a la derecha de A, y tiene STOP. Los dos siguen recto.",
    vias: { E: { senal: "stop" } }, vehiculos: [{ letra: "A", desde: "S", hacia: "N" }, { letra: "B", desde: "E", hacia: "O" }], truco: T.ceda },
  { id: "propio-ceda-norte", pregunta: "ultimo", titulo: "Cruce. A llega por el sur, B por el este y C por el norte, con ceda el paso. Los tres siguen recto.",
    vias: { N: { senal: "ceda" } }, vehiculos: [{ letra: "A", desde: "S", hacia: "N" }, { letra: "B", desde: "E", hacia: "O" }, { letra: "C", desde: "N", hacia: "S" }], truco: T.ceda },
  { id: "propio-ceda-sur-dos", pregunta: "ultimo", titulo: "Cruce. A llega por el este, B por el sur, con ceda el paso, y C por el oeste. Los tres siguen recto.",
    vias: { S: { senal: "ceda" } }, vehiculos: [{ letra: "A", desde: "E", hacia: "O" }, { letra: "B", desde: "S", hacia: "N" }, { letra: "C", desde: "O", hacia: "E" }], truco: T.ceda },
  { id: "propio-tierra-sur", pregunta: "ultimo", titulo: "Cruce sin señales. A sale de un camino de tierra por el sur; B y C circulan por la carretera asfaltada. Todos siguen recto.",
    vias: { S: { firme: "tierra" } }, vehiculos: [{ letra: "A", desde: "S", hacia: "N" }, { letra: "B", desde: "O", hacia: "E" }, { letra: "C", desde: "E", hacia: "O" }], truco: T.tierra },
  { id: "propio-tierra-dos", pregunta: "primero", titulo: "Cruce sin señales. A llega por un camino de tierra (sur), B por otro camino de tierra (este) y C por la carretera asfaltada (oeste). Todos siguen recto.",
    vias: { S: { firme: "tierra" }, E: { firme: "tierra" } }, vehiculos: [{ letra: "A", desde: "S", hacia: "N" }, { letra: "B", desde: "E", hacia: "O" }, { letra: "C", desde: "O", hacia: "E" }], truco: T.tierra },
];

// ---------- Utilidades ----------
const anclaRGC = art => URL_RGC + "#a" + String(art).split(".")[0];
const letraDe = v => v.letra || v.id;
const pasosDe = e => (e.pasos && e.pasos.length ? e.pasos : Esc.pasosCruce(e));
// Grupos según el momento en que cada uno termina de pasar: el paso de su último movimiento, si ese movimiento
// lo lleva al final (o, en peatones y animales, a su marca de «ya han pasado»); dentro de un paso, el que sale
// con retraso pasa después.
const PASADO = m => m.hasta === "fin" || /^(pasad[oa]s|cruzado)$/.test(m.hasta) || (typeof m.hasta === "number" && m.hasta >= .95);
function gruposFin(e) {
  const ultimo = {};
  pasosDe(e).forEach((p, i) => (p.mover || []).forEach(m => { ultimo[m.v] = { i, m }; }));
  const fin = Object.entries(ultimo).filter(([, x]) => PASADO(x.m)).map(([v, x]) => ({ v, t: x.i * 1e6 + (x.m.retraso || 0) }));
  return [...new Set(fin.map(x => x.t))].sort((a, b) => a - b).map(t => fin.filter(x => x.t === t).map(x => x.v));
}
function fuenteDe(e, art, quien) {
  const citas = pasosDe(e).map(p => p.cita).filter(c => c && c.articulo === art);
  if (!citas.length) throw new Error(`${quien}: ningún paso cita el art. ${art}`);
  const textos = [...new Set(citas.map(c => c.texto))];
  return { norma: citas[0].norma, articulo: art, url: anclaRGC(art), cita: textos.join(" | "), comprobar: textos };
}
function comprobarRespuesta(e, ej, quien) {
  // `juntos` {p2: "p1"}: los que se tocan como uno solo (dos peatones que cruzan a la vez).
  const g = gruposFin(e).map(x => [...new Set(x.map(v => (ej.juntos || {})[v] || v))]);
  if (ej.pregunta === "primero" && !(g[0] && g[0].length === 1 && g[0][0] === ej.correcta)) throw new Error(`${quien}: pasa primero ${JSON.stringify(g[0])}, no ${ej.correcta}`);
  if (ej.pregunta === "ultimo") { const u = g[g.length - 1]; if (!(u && u.length === 1 && u[0] === ej.correcta)) throw new Error(`${quien}: pasa el último ${JSON.stringify(u)}, no ${ej.correcta}`); }
  if (ej.pregunta === "retrocede") {
    if (e.retrocede && e.retrocede !== ej.correcta) throw new Error(`${quien}: la escena dice que retrocede ${e.retrocede}`);
    if (!pasosDe(e).some(p => (p.mover || []).some(m => m.v === ej.correcta && m.hasta === "antes"))) throw new Error(`${quien}: ningún paso lleva a ${ej.correcta} hacia atrás`);
  }
}
const nombre = (e, k) => { const v = e.vehiculos.find(x => letraDe(x) === k); return v && v.letra ? "Vehículo " + v.letra : k; };
const ENUN = { primero: "Toca el vehículo que pasa primero.", ultimo: "Toca el vehículo que pasa el último." };

const salida = [];
for (const it of LISTA) {
  const base = E[it.escena], quien = it.id || it.escena;
  if (!base) throw new Error("No hay escena " + it.escena);
  if (!BANCO.has(it.escena)) throw new Error("La escena no es de una pregunta del banco: " + it.escena);
  comprobarRespuesta(base, it, quien);
  // Fotograma quieto: si hace falta, otra marca de inicio (los pasos no cambian).
  let escena = it.escena, e = base;
  if (it.inicio) {
    e = JSON.parse(JSON.stringify(base));
    const ini = it.inicio === "encuentro" ? Object.fromEntries(pasosDe(base)[0].mover.map(m => [m.v, m.hasta]))
      : it.inicio === "dentro" ? Object.fromEntries(base.vehiculos.map(v => [letraDe(v), "dentro"])) : it.inicio;
    for (const [k, m] of Object.entries(ini)) { const v = e.vehiculos.find(x => letraDe(x) === k); if (!v) throw new Error(`${quien}: no hay ${k}`); v.inicio = m; }
    escena = e;
  }
  const extra = it.zonas || {};
  const ids = e.vehiculos.filter(v => v.letra).map(v => v.letra).concat(Object.keys(extra));
  if (!ids.includes(it.correcta)) throw new Error(`${quien}: la correcta ${it.correcta} no se puede tocar`);
  let porque = it.porque;
  if (porque === "auto") porque = (pasosDe(base).find(p => (p.mover || []).some(m => m.v === it.correcta && m.hasta === "antes")) || {}).texto;
  salida.push({ id: it.id || "tocar-esc-" + it.escena, de: it.escena, tipo: "tocar", materia: BANCO.get(it.escena).materia,
    escena, pregunta: it.pregunta, enunciado: it.enunciado,
    zonas: ids.map(k => ({ id: k, etiqueta: extra[k] || nombre(e, k) })),
    correcta: it.correcta, textoCorrecta: it.textoCorrecta || "el vehículo " + it.correcta,
    porque, truco: it.truco, fuente: fuenteDe(base, it.art, quien) });
}

for (const it of PROPIAS) {
  const e = { tipo: "cruce", titulo: it.titulo, vias: it.vias, vehiculos: it.vehiculos };
  if (!e.vias) delete e.vias;
  const { grupos, bloqueo } = Esc.ordenCruce(e.vehiculos, e.vias || {});
  if (bloqueo) throw new Error(it.id + ": la regla de la derecha no resuelve el cruce");
  const g = it.pregunta === "primero" ? grupos[0] : grupos[grupos.length - 1];
  if (g.length !== 1) throw new Error(`${it.id}: el ${it.pregunta} no es un solo vehículo`);
  const correcta = g[0].letra;
  e.orden = grupos.map(x => x.map(v => v.letra)); // como los cruces de la web con «orden»
  comprobarRespuesta(e, { pregunta: it.pregunta, correcta }, it.id);
  const pasos = Esc.pasosCruce(e);
  // Cita y explicación: el paso en el que pasa (primero) o el que explica por qué espera hasta el final (último).
  const paso = pasos.find(p => p.foco.length === 1 && p.foco[0] === correcta && p.mover.length) || pasos[0];
  const cabecera = pasos.find(p => !p.mover.length); // el de las señales, si lo hay
  const porque = (it.pregunta === "ultimo" && cabecera ? cabecera.texto + " " : "") + pasos.filter(p => p.mover.length).map(p => p.texto).join(" ");
  const art = (it.pregunta === "ultimo" && cabecera ? cabecera : paso).cita.articulo;
  salida.push({ id: "tocar-cruce-" + it.id.replace(/^propio-/, ""), tipo: "tocar", materia: 1, escena: e, escenaPropia: true, pregunta: it.pregunta,
    enunciado: (!it.vias ? "Cruce sin señales. Todos siguen recto. " : JSON.stringify(it.vias).includes("tierra") ? "Cruce sin señales; fíjate en el firme. Todos siguen recto. " : "Fíjate en las señales. Todos siguen recto. ") + ENUN[it.pregunta],
    zonas: it.vehiculos.map(v => ({ id: v.letra, etiqueta: "Vehículo " + v.letra })),
    correcta, textoCorrecta: "el vehículo " + correcta, porque, truco: it.truco, fuente: fuenteDe(e, art, it.id) });
}

const ids = new Set(); salida.forEach(x => { if (ids.has(x.id)) throw new Error("Id repetido " + x.id); ids.add(x.id); });
const cuenta = {}; salida.forEach(x => cuenta[x.pregunta] = (cuenta[x.pregunta] || 0) + 1);
fs.writeFileSync(path.join(AQUI, "datos-tocar.js"),
  "// Generado por generar_tocar.js desde data/escenas.js; no editar a mano.\n" +
  "window.EJERCICIOS.push(...\n" + JSON.stringify(salida, null, 1) + ");\n");
console.log("datos-tocar.js:", salida.length, "ejercicios", cuenta);
