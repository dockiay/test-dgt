# Banco «materias sin cobertura» (banco-materias-boe.json)

**Fecha:** 24/11/2026 · **75 preguntas**, todas con cita literal comprobada automáticamente.
Script: `scripts/build_materias_boe.py` (genera el banco, comprueba cada cita contra el texto de la norma y que los ids no chocan con otros bancos).

| Materia (anexo V.B.1) | Preguntas | Fuente principal |
|---|---|---|
| 13. Precauciones al abandonar el vehículo | 19 | RGC arts. 92.3, 97.3 (túneles), 114 (puertas), 115 (apagado de motor, repostaje), 130.1-2 |
| 3. Vigilancia y actitudes con los demás usuarios | 19 | RGC arts. 2, 3, 5, 6, 17, 46, 108-110; Manual DGT (conducción preventiva, ciclistas, motos) |
| 9. Riesgos según el vehículo y la visibilidad | 15 | RGC arts. 12.3, 14, 18.1, 19, 45, 86.3, 107; Manual DGT (ángulo muerto, viento, hielo) |
| 6. Noche y meteorología | 12 | RGC arts. 46, 106.1; Manual DGT tema 14 (noche, deslumbramiento, niebla, polvo) |
| 1. Delitos contra la seguridad vial | 10 | Código Penal arts. 379-385 |

- 57 preguntas citan el BOE (47 RGC y 10 Código Penal) y 18 el Manual DGT en Lectura Fácil (solo en temas de conducta y prevención, sin contradecir el BOE).
- Se ha evitado repetir lo que ya está en los bancos del vídeo (por ejemplo marchas en pendiente, calzos y bordillo, luces, intermitentes, claxon, carga saliente, avería en la vía).
- Las respuestas correctas están repartidas: 25 a, 25 b, 25 c.
- Ninguna necesita imagen.
- Código Penal: extracto en `fuentes/BOE-A-1995-25444-Codigo-Penal-arts-379-385ter.txt` (versión consolidada publicada el 09/04/2026). Para que la web lo admita se ha añadido `CP` a las normas válidas de `web/tools/build_data.py` y su nombre en `web/app.js`.
- Comprobado con `web/tools/build_data.py`: las 75 pasan la validación.

## Para el revisor
- El Manual DGT dice en la p. 351 que, si te adelantan de noche, mantengas la luz larga; no se ha usado porque choca con el art. 102.2 del RGC (no deslumbrar por el retrovisor). Conviene revisar si alguna pregunta del vídeo se basa en esa página.
- bm13-0009 (art. 115.2) y bm13-0008 (art. 115.1): el 115.1 manda parar el motor siempre que se esté detenido en un túnel; el 115.2 habla de más de dos minutos. Las preguntas se han redactado para no depender de esa diferencia.
