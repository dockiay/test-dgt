# Ampliación del banco (24/11/2026)

**731 preguntas nuevas** escritas desde la norma (no salen de ningún vídeo), en seis bancos `banco-ampliacion-*.json`. El banco pasa de 758 a **1.489** preguntas (unas 1.690 con los vídeos 2-5 del PR #19). Cobertura antes y después: `cobertura-antes.md` y `cobertura.md` (las genera `tools/cobertura.py`).

| Banco | Prefijo | Preguntas | Contenido |
|---|---|---|---|
| banco-ampliacion-x1a.json | x1a- | 127 | Materia 1, RGC arts. 1-90: sentido de circulación, velocidades, distancias, prioridad, vehículos prioritarios, incorporaciones, maniobras, adelantamiento |
| banco-ampliacion-x1b.json | x1b- | 99 | Materia 1, RGC arts. 90-173: parada y estacionamiento, luces, advertencias, señales de agentes, semáforos, obras, catálogo de señales (con imagen), marcas viales; infracciones y multas (LSV 75-82, anexo IV) |
| banco-ampliacion-xb.json | xb- | 121 | Materias 4 (pruebas de alcohol y drogas, delitos, factores del conductor), 10 (permiso, puntos, documentación del vehículo, ITV, seguro) y 12 (carga, personas, remolques) |
| banco-ampliacion-xc.json | xc- | 131 | Materias 2 (accidentes), 3 (actitudes), 5 (distancias y frenado) y 7 (la vía) |
| banco-ampliacion-xd.json | xd- | 114 | Materias 6 (meteorología, noche, túneles), 8 (vulnerables), 9 (tipo de vehículo) y 13 (abandonar el vehículo) |
| banco-ampliacion-xe.json | xe- | 139 | Materias 11 (accidente y primeros auxilios), 14 (mecánica), 15 (equipos de seguridad) y 16 (conducción eficiente) |

- Fuentes: RGC 322, Manual DGT 240 (solo temas no normativos), LSV 69, RGV 46, catálogo de señales 18, RGCOND 12, ITV 9, CP 8, seguro 7. 29 llevan imagen de la biblioteca (`img/`), ninguna pendiente.
- Todas pasan `preguntas/scripts/comprobar_lote.py`: cita literal en el texto consolidado y única, sin duplicar preguntas existentes (se quitaron 21 casi duplicadas entre estos bancos y 60 que coincidían con las de los vídeos 2-5 del PR #19, que tienen preferencia), opciones equilibradas, explicación que se entiende sola. Respuestas correctas repartidas a/b/c.
- RGC: de 101 a 145 artículos con preguntas.

## Pendiente
- Revisión independiente de las 791 y de las parejas nuevas del «¿por qué?» (`porques-parejas-ampliacion.json`, 2.012 parejas).

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
