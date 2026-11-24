# Ampliación del banco (24/11/2026)

**707 preguntas nuevas** escritas desde la norma (no salen de ningún vídeo), en seis bancos `banco-ampliacion-*.json`. El banco pasa de 758 a **1.465** preguntas (unas 1.670 con los vídeos 2-5 del PR #19). Cobertura antes y después: `cobertura-antes.md` y `cobertura.md` (las genera `tools/cobertura.py`).

| Banco | Prefijo | Preguntas | Contenido |
|---|---|---|---|
| banco-ampliacion-x1a.json | x1a- | 127 | Materia 1, RGC arts. 1-90: sentido de circulación, velocidades, distancias, prioridad, vehículos prioritarios, incorporaciones, maniobras, adelantamiento |
| banco-ampliacion-x1b.json | x1b- | 98 | Materia 1, RGC arts. 90-173: parada y estacionamiento, luces, advertencias, señales de agentes, semáforos, obras, catálogo de señales (con imagen), marcas viales; infracciones y multas (LSV 75-82, anexo IV) |
| banco-ampliacion-xb.json | xb- | 120 | Materias 4 (pruebas de alcohol y drogas, delitos, factores del conductor), 10 (permiso, puntos, documentación del vehículo, ITV, seguro) y 12 (carga, personas, remolques) |
| banco-ampliacion-xc.json | xc- | 131 | Materias 2 (accidentes), 3 (actitudes), 5 (distancias y frenado) y 7 (la vía) |
| banco-ampliacion-xd.json | xd- | 96 | Materias 6 (meteorología, noche, túneles), 8 (vulnerables), 9 (tipo de vehículo) y 13 (abandonar el vehículo) |
| banco-ampliacion-xe.json | xe- | 135 | Materias 11 (accidente y primeros auxilios), 14 (mecánica), 15 (equipos de seguridad) y 16 (conducción eficiente) |

- Fuentes: RGC 302, Manual DGT 237 (solo temas no normativos), LSV 68, RGV 46, catálogo de señales 18, RGCOND 12, ITV 9, CP 8, seguro 7. 29 llevan imagen de la biblioteca (`img/`), ninguna pendiente.
- Todas pasan `preguntas/scripts/comprobar_lote.py`: cita literal en el texto consolidado y única, sin duplicar preguntas existentes (se quitaron 21 casi duplicadas entre estos bancos y 60 que coincidían con las de los vídeos 2-5 del PR #19, que tienen preferencia), opciones equilibradas, explicación que se entiende sola. Respuestas correctas repartidas a/b/c.
- RGC: de 101 a 145 artículos con preguntas.

## Revisión independiente (24/11/2026)
- Veredictos en `/mnt/project-files/preguntas/revision-ampliacion.json`: de 731, 726 ok, 4 corregir y 1 rechazar (xb-0095: la LSV vigente, art. 76.u, califica de grave la ocupación excesiva). Aplicadas las 4 correcciones (x1b-0012, x1b-0128, xe-0058, xd-0024) y la nota de x1b-0026.
- Quitadas otras 23 que el revisor encontró duplicadas entre bancos con distintas palabras.
- Parejas del «¿por qué?»: de 1.960, 1.948 ok y 12 excluidas en `porques-excluidos.json` (la distractora también justificaba la respuesta). Las 24 parejas que las sustituyen, leídas a mano.
- Aparte: la explicación existente de D-cal-0002 repite el dato de 20-23 °C del aire acondicionado, que el manual contradice en la p. 460.

## Temas dejados fuera por dudosos (para el revisor)
- RGC 48.1.a.2º frente a 48.1.h: límites de los vehículos de tres ruedas, se contradicen.
- RGC 37.6 (muy grave, remite a LSV 77.l) frente a LSV 76.z3 (no respetar zonas de bajas emisiones, grave).
- RGC 28.1.a (reconocimiento médico) frente a LSV 14.3 (prueba salival).
- Orden INT/2596/2005 (curso parcial: 4 puntos) frente a LSV 65.4 (6 puntos): se usa solo la LSV.
- RGC 115.1 frente a 115.2: apagado del motor en túneles, siempre o a partir de dos minutos.
- RGC 91.2.g frente a 94.2.c: carga y descarga.

## Manual DGT que contradice el BOE (no se ha usado)
- p. 351-352: mantener la luz larga cuando te adelantan o en el exterior de una curva (RGC 102).
- p. 108-110: exenciones del cinturón (taxistas, repartidores, profesores) y sillas infantiles; el RGC 117 y 119 vigentes dicen otra cosa.
- p. 250: 50 km/h al acercarse a pasos a nivel, glorietas y cruces (RGC 46.1.h solo para visibilidad prácticamente nula).
- p. 262: «cuanto más rápido, menos distancia de reacción» (es al revés).
- p. 438: «la luz o los triángulos» (RGV anexo XII vigente: solo V-16).
- p. 465: colocación del distintivo ambiental (RGV V-25.3).
- p. 60-62: etilómetro «en la sangre», inmovilización, peatones obligados a la prueba (RGC 25, LSV 14.2).
- Tema 13: carga que suelta polvo, posición de la L, remolques de bicicletas.
- Aire acondicionado: 20-23 °C (p. 364) frente a 23-24 °C (p. 460).

## Preguntas existentes a revisar
- res-itv-0001: la cita une fragmentos de una tabla con «[…]», así que no es literal.
- res-veh-0002: extintor en un turismo con remolque ligero; la lectura del RGV anexo XII.2 es discutible.
