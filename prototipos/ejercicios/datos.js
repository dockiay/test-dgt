/* Prototipo de ejercicios del camino que no son tipo test: 2 de cada tipo.
   Cada ejercicio lleva su fuente con la cita literal (para comprobarla con comprobar.py; no se enseña)
   y la explicación corta que sale al responder: porqué + truco + enlace a la referencia.

   Tipos:
   - cifra:     respuesta numérica con teclado propio. `respuesta` (número) y `unidad`.
   - tocar:     tocar una zona de un esquema (esquemas.js). `zonas` en unidades del viewBox 0-400.
   - ordenar:   `pasos` en el orden correcto; se enseñan barajados.
   - emparejar: `parejas` [izquierda, derecha]; la izquierda puede ser una señal {senal: "R-1"}. */
window.EJERCICIOS = [
  {
    id: "cifra-velocidad-autovia", tipo: "cifra", materia: 1,
    enunciado: "¿A qué velocidad máxima puede circular un turismo por una autovía?",
    respuesta: 120, unidad: "km/h",
    porque: "En autopista y autovía, el límite de los turismos y las motocicletas es 120 km/h.",
    truco: "Turismo fuera de poblado: 120 en autopista y autovía, 90 en carretera convencional.",
    fuente: { norma: "RGC", articulo: "48.1.a", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a48",
      cita: "Turismos, motocicletas, autocaravanas de masa máxima autorizada igual o inferior a 3.500 kg, Pick-up | Autopista y autovía 120 | Convencional 90",
      comprobar: ["Autopista y\n                               120", "Convencional                 90"] },
  },
  {
    id: "cifra-adelantar-ciclista", tipo: "cifra", materia: 8,
    enunciado: "Vas a adelantar a un ciclista en una carretera con un solo carril por sentido. ¿Qué separación lateral mínima tienes que dejarle?",
    respuesta: 1.5, unidad: "metros",
    porque: "Para adelantar a un ciclista hay que ocupar parte o todo el carril contrario y dejar al menos 1,5 metros de separación lateral.",
    truco: "Si la calzada tiene más de un carril por sentido, no basta con 1,5 m: tienes que cambiarte de carril por completo.",
    fuente: { norma: "RGC", articulo: "85.4", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a85",
      cita: "debe efectuarlo ocupando parte o la totalidad del carril contiguo o contrario, en su caso, de la calzada y guardando una anchura de seguridad de, al menos, 1,5 metros, salvo cuando la calzada cuente con más de un carril por sentido, en cuyo caso será obligatorio el cambio completo de carril" },
  },
  {
    id: "tocar-cruce-derecha", tipo: "tocar", materia: 1, esquema: "cruce", vista: [50, 50, 300, 300],
    enunciado: "Cruce sin señales. Los tres vehículos van a seguir recto. Toca el que pasa primero.",
    zonas: [
      { id: "A", etiqueta: "Vehículo A", forma: "circulo", x: 220, y: 300, r: 36 },
      { id: "B", etiqueta: "Vehículo B", forma: "circulo", x: 100, y: 220, r: 36 },
      { id: "C", etiqueta: "Vehículo C", forma: "circulo", x: 300, y: 180, r: 36 },
    ],
    correcta: "C", textoCorrecta: "el vehículo C",
    porque: "Sin señales, cada uno cede el paso al que llega por su derecha. C no tiene a nadie a su derecha, así que pasa primero. Después pasa A y, por último, B.",
    truco: "Busca al que tiene la derecha libre: ese sale primero.",
    fuente: { norma: "RGC", articulo: "57.1", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a57",
      cita: "En defecto de señal que regule la preferencia de paso, el conductor está obligado a cederlo a los vehículos que se aproximen por su derecha" },
  },
  {
    id: "tocar-carril-emergencia", tipo: "tocar", materia: 1, esquema: "retencion", vista: [80, 60, 260, 280],
    enunciado: "Retención en una autovía con dos carriles en tu sentido. Toca dónde hay que dejar el carril de emergencia.",
    zonas: [
      { id: "izq", etiqueta: "Junto a la mediana", forma: "franja", x: 126, y: 0, w: 38, h: 400 },
      { id: "centro", etiqueta: "Entre los dos carriles", forma: "franja", x: 181, y: 0, w: 38, h: 400 },
      { id: "arcen", etiqueta: "Por el arcén", forma: "franja", x: 240, y: 0, w: 44, h: 400 },
    ],
    correcta: "centro", textoCorrecta: "entre los dos carriles",
    porque: "Con dos carriles en el mismo sentido, el carril de emergencia se forma en el centro, entre los dos carriles.",
    truco: "Con tres carriles o más, se forma entre el de más a la izquierda y el siguiente.",
    fuente: { norma: "RGC", articulo: "32.1", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a32",
      cita: "En las autopistas y autovías que tengan dos carriles en el mismo sentido, el carril de emergencia deberá formarse en el centro de la vía, entre esos dos carriles." },
  },
  {
    id: "ordenar-pas", tipo: "ordenar", materia: 11,
    enunciado: "Llegas el primero a un accidente. Ordena lo que tienes que hacer.",
    pasos: [
      { texto: "Proteger", detalle: "A ti, a las víctimas y el lugar" },
      { texto: "Avisar", detalle: "Llamar al 112" },
      { texto: "Socorrer", detalle: "Atender a los heridos" },
    ],
    porque: "Es la regla PAS: primero proteges (a ti, a las víctimas y el lugar), después avisas a emergencias y, por último, socorres.",
    truco: "Si no te proteges primero, puede haber un accidente más.",
    fuente: { norma: "MANUAL_DGT", articulo: "Tema 16, Regla PAS (p. 415-419)",
      url: "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf",
      cita: "Proteger | Avisar | Socorrer · Para pedir ayuda debes llamar al número de emergencias 112 desde tu móvil.",
      comprobar: ["Proteger\n\nAvisar\n\nSocorrer", "de emergencias 112 desde tu móvil."] },
  },
  {
    id: "ordenar-prioridad-senales", tipo: "ordenar", materia: 1,
    enunciado: "Si dos señales dicen cosas distintas, ¿cuál manda? Ordénalas de más a menos prioridad.",
    pasos: [
      { texto: "Agente de tráfico" },
      { texto: "Semáforo" },
      { texto: "Señal vertical" },
      { texto: "Marca vial" },
    ],
    porque: "Manda primero el agente, luego el semáforo, después la señal vertical y, al final, la marca vial. La señalización de obras va justo detrás del agente.",
    truco: "Persona, luz, poste y pintura: cuanto más «viva», más manda.",
    fuente: { norma: "RGC", articulo: "133.1", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a133",
      cita: "a) Señales y órdenes de los agentes de la autoridad encargados de la vigilancia del tráfico [...] b) Señalización y balizamiento circunstancial [...] c) Semáforos. d) Señales verticales de circulación. e) Marcas viales.",
      comprobar: ["a) Señales y órdenes de los agentes de la autoridad encargados de la vigilancia del", "b) Señalización y balizamiento circunstancial", "c) Semáforos.\nd) Señales verticales de circulación.\ne) Marcas viales."] },
  },
  {
    id: "emparejar-senales-entrada", tipo: "emparejar", materia: 1,
    enunciado: "Empareja cada señal con lo que significa.",
    parejas: [
      [{ senal: "R-100" }, "Nadie puede circular, en ningún sentido"],
      [{ senal: "R-101" }, "Prohibida la entrada a todos los vehículos"],
      [{ senal: "R-102" }, "Prohibida la entrada a vehículos de motor"],
      [{ senal: "R-1" }, "Ceda el paso en el próximo cruce"],
    ],
    porque: "R-100 prohíbe circular en los dos sentidos. R-101 prohíbe entrar a toda clase de vehículos y R-102, solo a los de motor. R-1 obliga a ceder el paso en la próxima intersección.",
    truco: "Círculo vacío con borde rojo: no circula nadie. Disco rojo con franja blanca: no entra nadie.",
    fuente: { norma: "RGC_CATALOGO", articulo: "Anexo I, catálogo de señales, R-1, R-100, R-101 y R-102",
      url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#ani",
      cita: "R-100 Circulación prohibida. Prohibición de circulación de toda clase de vehículos en ambos sentidos. R-101 Entrada prohibida. Prohibición de acceso a toda clase de vehículos. R-102 Entrada prohibida a vehículos de motor. Prohibición de acceso a vehículos de motor. R-1 Ceda el paso. Obligación para todo conductor de ceder el paso en la próxima intersección",
      comprobar: ["Prohibición de circulación de toda clase de vehículos en ambos", "R-101 Entrada prohibida\n\nProhibición de acceso a toda clase de vehículos.", "Prohibición de acceso a vehículos de motor.", "Obligación para todo conductor de ceder el paso en la próxima"] },
  },
  {
    id: "emparejar-tasas-alcohol", tipo: "emparejar", materia: 4,
    enunciado: "Empareja cada caso con su tasa máxima de alcohol.",
    parejas: [
      ["Conductor general, en sangre", "0,5 g/l"],
      ["Conductor general, en aire espirado", "0,25 mg/l"],
      ["Novel (2 primeros años), en sangre", "0,3 g/l"],
      ["Novel (2 primeros años), en aire espirado", "0,15 mg/l"],
    ],
    porque: "La tasa general es 0,5 g/l en sangre o 0,25 mg/l en aire espirado. Durante los dos años siguientes a sacar el permiso, baja a 0,3 g/l en sangre o 0,15 mg/l en aire.",
    truco: "La cifra del aire es la mitad que la de la sangre.",
    fuente: { norma: "RGC", articulo: "20", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a20",
      cita: "con una tasa de alcohol en sangre superior a 0,5 gramos por litro, o de alcohol en aire espirado superior a 0,25 miligramos por litro. [...] no podrán superar la tasa de alcohol en sangre de 0,3 gramos por litro ni de alcohol en aire espirado de 0,15 miligramos por litro durante los dos años siguientes a la obtención del permiso",
      comprobar: ["con una tasa de alcohol en sangre superior a 0,5 gramos por litro, o de alcohol en aire espirado superior a 0,25 miligramos por litro.", "no podrán superar la tasa de alcohol en sangre de 0,3 gramos por litro ni de alcohol en aire espirado de 0,15 miligramos por litro durante los dos años siguientes a la obtención del permiso"] },
  },
];
