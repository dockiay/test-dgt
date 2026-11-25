# Tandas de «Ejercicios para recordar»: reparto y reglas

Un hilo por tipo. Cada hilo **solo edita su fichero** `datos-<tipo>.js` (ya está cargado en `index.html`
y en `construir_vista.py`), en su propia rama, partiendo de `claude/project-thread-l7d9x4`.
El motor (`recordar.js`), `datos.js` (los 10 ejemplos) y `comprobar.py` los mantiene el hilo principal:
si hace falta un cambio en el motor, pedirlo, no hacerlo.

## Reglas comunes
- Formato del ejercicio: el de la cabecera de `datos.js`, más `de`: lista de ids del banco publicado
  (`data/preguntas.js`) que el ejercicio «reinterpreta». Un id del banco va en un solo ejercicio, de todos los tipos.
- Rigor: todo dato sale del BOE o del manual de la DGT con cita literal en `fuente.cita` (o trozos en
  `fuente.comprobar`). `python3 prototipos/recordar/comprobar.py` debe terminar en «Todo comprobado.».
- No reutilizar ids que ya estén en `de` de `prototipos/ejercicios/datos-*.js` de la rama
  `origin/claude/project-thread-pdritv` (otro hilo: cifra, tocar, ordenar, emparejar).
- Textos: frases cortas, lenguaje neutro, sin nombres de personas. Explicación al fallar simple: porqué + truco + enlace.
- Nada de esto se carga en la web ni en `sw.js`.

## Qué preguntas sirven para cada tipo
- **clasificar**: grupos de 6-8 preguntas del banco que comparten una distinción binaria o ternaria
  (parar/estacionar, grave/muy grave, obligatoria/prohibida, peligro/prohibición/obligación…). Cartas de 2-6 palabras.
- **error**: preguntas con una regla enunciable en una frase de 2-3 trozos, donde el distractor típico sirve de
  trozo falso y el arreglo bueno es la respuesta correcta. Solo un trozo puede ser falso, sin ambigüedad.
- **ysi**: familias de preguntas que son la misma regla con un detalle cambiado (vehículo, vía, conductor, luz,
  hora). 3-5 pasos, mismas opciones en todos.
- **piensa**: preguntas con enunciado autosuficiente que se pueden contestar sin ver las opciones
  (no «¿Cuál de estas…?», «¿Qué afirmación…?», «Todas…», ni opciones que se apoyan unas en otras).
  Se copian idénticas del banco (comprobar.py lo exige).
- **completar**: definiciones y reglas cortas citadas literalmente (Ley de Tráfico anexo I, RGC); 1-3 huecos con
  la palabra clave; señuelos plausibles sacados de los distractores de las preguntas.
