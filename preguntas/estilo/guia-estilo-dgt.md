# Guía de estilo DGT para las preguntas

Objetivo: que las preguntas suenen como las del examen teórico del permiso B, **sin cambiar lo que preguntan ni su respuesta**.

## De dónde sale el estilo

- **Suplemento «Test» de la revista Tráfico y Seguridad Vial, nº 240** (revista.dgt.es, «Selección de preguntas: Subdirección Adjunta de Conocimiento Vial (DGT)»): 50 preguntas tipo examen. Se ha estudiado su redacción; **no se copia ninguna pregunta**.
- **Licencia:** el aviso legal de dgt.es (10/02/2022) dice que la reproducción, distribución o transformación no autorizadas de sus contenidos es infracción salvo para uso personal y privado. La sede electrónica permite reproducir «fielmente, sin manipular ni alterar los contenidos» y citando la fuente, pero el pie dice «Todos los derechos reservados» y no hay licencia abierta declarada. El banco oficial de examen (unas 15.500 preguntas según el informe «Los conductores a examen II», 2014) no es público. **Conclusión: no se meten preguntas de la DGT en la web; solo se usa su estilo.** Si algún día se quisieran usar tal cual, habría que pedir autorización por escrito a la DGT.

## Enunciado

- **E1. Corto y con una sola situación.** Quitar los detalles que no cambian la respuesta. Orientativo: menos de 130 caracteres; más solo si el caso lo necesita (masas, distancias, tipo de vía).
- **E2. Si hay imagen, se nombra y no se describe:** «esta señal», «a la vista de la señal que realiza el agente», «en esta situación».
- **E3. Nunca citar la fuente en el enunciado** («Según la DGT», «según el manual», «según la Ley de Tráfico»). El examen nunca lo hace; la fuente va debajo, en la explicación.
- **E4. Sin códigos de señal (R-203, V-19, M-7.5) ni descripciones entre paréntesis** cuando la pregunta ya tiene imagen. Sin imagen, la descripción se queda (si no, la pregunta no se entiende).
- **Trato:** de usted implícito («¿Puede adelantar?», «¿Qué debe hacer?») o en tercera persona («un conductor», «un turismo»). Nunca de tú.
- **Mantener los matices legales** que deciden la respuesta: «como norma general», «fuera de poblado», «salvo…», masas, edades, horarios.

## Formas típicas del examen

- **T1. Tema delante, pregunta detrás:** «Conducir con sueño, ¿por qué es peligroso?», «Arrojar un cigarro por la ventanilla, ¿puede suponer una infracción?».
- **T2. Frase incompleta con puntos suspensivos** que completan las opciones: «La luz antiniebla trasera deberá utilizarse en caso de...».
- **T3. Opciones siempre con mayúscula inicial y punto final**, también cuando completan la frase.
- «Como norma general, …» cuando la regla tiene excepciones que no se preguntan.

## Opciones

- **O1. La correcta no se justifica.** Nada de «porque…», «es decir…» en la correcta: eso va en la explicación. Las de sí o no pueden ser «Sí.» o «No.» a secas, como en el examen.
- **O2. Longitudes parecidas.** Hoy la correcta es la opción más larga en el 63 % de las preguntas (por azar sería un 33 %): es una pista que el examen real no da.
- **O3. Distractoras creíbles**, con las trampas habituales del examen: absolutos («en ningún caso», «siempre», «únicamente»), condiciones que no existen («solo si…», «solo de día»), listas incompletas («Parar el motor, únicamente»), «indistintamente», «es indiferente». Nada caricaturesco («sin necesidad de comprobar nada», «el problema es del otro»).
- Las tres opciones con la misma forma gramatical.

## Reglas de seguridad (no negociables)

1. No cambia la letra `correcta`, ni `explicacion`, ni `fuente`, ni `imagen`.
2. La opción correcta reescrita sigue respaldada por la cita literal del BOE (o del manual).
3. Si una distractora pasa a decir algo nuevo, se marca `distractora_cambiada: true` y el revisor independiente confirma contra la norma que sigue siendo falsa.
4. Cada cambio queda registrado con el texto de antes y el de después.
5. Las preguntas a las que otro hilo pone imagen se reescriben después, con la imagen ya puesta.

## Cómo se aplicaría a las 1.666

1. Criba automática de candidatas (hoy 637): «Según…» (119), correcta 1,5 veces más larga que las demás (330), justificación en la correcta (78), enunciado de más de 150 caracteres (153), códigos o paréntesis con imagen (19), opciones en minúscula (30), trato de tú (14). El resto (unas 1.030) ya cumple y no se toca.
2. Reescritura por bancos en `preguntas/estilo/cambios-redaccion.json` (id, antes, después, reglas, distractora_cambiada).
3. Un script aplica los cambios y comprueba que la letra correcta, la explicación, la fuente y la imagen no cambian, y pasa `comprobar_lote.py`.
4. Revisión independiente de todos los antes y después; las distractoras cambiadas, contra el BOE.
5. Una PR; aviso al hilo de explicaciones con la lista de ids (cambia su huella).
