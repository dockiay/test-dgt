# Vídeo «Intensivo de teórica completo y actualizado 2027»: los 38 capítulos convertidos en preguntas

**Fecha:** 24/11/2026

## Cifras

| Fichero | Contenido |
|---|---|
| `banco-piloto-video1.json` | 70 preguntas verificadas (capítulos 1-8) |
| `banco-video1-cap09-38.json` | **565 preguntas verificadas** (capítulos 9-38) |
| `revision-piloto-video1.json` + `revision-video1-cap09-38.json` | 18 + 120 afirmaciones del vídeo que no se pudieron confirmar o que la norma matiza |
| `imagenes-pendientes.json` | 136 preguntas que necesitan imagen (86 señales, 27 marcas viales, 15 fotos, 8 esquemas) |

**Total: 635 preguntas verificadas**, todas con artículo y cita literal. Un verificador automático (`scripts/verify.py`) comprueba que cada cita aparece tal cual en el texto oficial. Se quitaron 7 duplicados entre bloques. El piloto se corrigió según el revisor independiente (citas de la tabla de velocidades, citas repetidas y reparto de letras).

**Fuentes de las 635:** Reglamento General de Circulación 343, manual de la DGT 184 (para temas no normativos y para el significado de las señales verticales, porque el catálogo del BOE es solo imagen), Ley de Tráfico 55, Reglamento General de Vehículos 35 y Reglamento de Conductores 18.

**Por materia del examen (anexo V del Reglamento de Conductores):** 1 normas, señales, prioridad y velocidad: 323 · 4 alcohol, drogas, fatiga: 55 · 10 documentación y permisos: 45 · 14 mecánica: 39 · 15 equipos de seguridad: 30 · 8 vulnerables: 26 · 11 accidente y primeros auxilios: 25 · 6 meteorología y túneles: 23 · 12 carga y personas: 21 · 16 medio ambiente: 18 · 5 distancias: 9 · 7 la vía: 8 · 2 accidentes: 8 · 13 abandonar el vehículo: 5 · **3 actitudes y 9 riesgos según el vehículo: 0**.

## Errores del vídeo frente a la norma (los más importantes)

1. **Tara**: incluye el combustible (Ley de Tráfico, Anexo I.35); el vídeo dice lo contrario.
2. **Estrechamientos**: en caso de duda manda el tipo de vehículo; la distancia de marcha atrás solo decide entre vehículos del mismo tipo (RGC 60 y 62).
3. **Calzos**: la norma prohíbe expresamente usar piedras (RGC 92.3.d); el vídeo lo propone.
4. **Curso de recuperación parcial de puntos**: hasta 6 puntos, no 4 (Ley de Tráfico 65.4).
5. **Distintivos ambientales B y C**: se asignan por norma Euro, no por año de matriculación (RGV Anexo II.E).
6. **Chaleco «visible a 150 m»**: los 150 m son del elemento reflectante de ciclistas y peatones; el chaleco solo debe ser de alta visibilidad certificado.
7. **Reposacabezas**: la parte de arriba a la altura de la parte de arriba de la cabeza, no de los ojos (manual de la DGT).
8. **Flecha verde del semáforo**: obliga a avanzar a quien está en ese carril, haya o no alguien detrás (RGC Anexo I, 4.2.g).
9. **Agente con el brazo horizontal**: se detienen quienes llegan de direcciones que cortan la de los brazos, no solo «los de ese carril».
10. **Menor en bicicleta**: hasta 22 kg y capaz de sentarse solo, con conductor mayor de edad (RGC 154), no «menor de 7 años».
11. **Pruebas de alcohol a peatones**: también si han cometido una infracción, no solo si hay accidente (Ley de Tráfico 14.2).
12. **Cruzar las manos al girar el volante**: el manual de la DGT dice que no.
13. **Rebasar un vehículo averiado (20 km/h y 1,5 m)**: es cuando ocupa la calzada, no el arcén (RGC 88.1).
14. **Paso de peatones con dos líneas discontinuas**: solo en pasos regulados por semáforo.

Cada error tiene su explicación y artículo en los ficheros de revisión. En la mayoría de los casos se ha creado además la pregunta correcta según la norma.

## Lo que no se ha podido verificar (sigue en revisión)

- **Señales verticales**: las 65 preguntas de identificación de señales (P-, R-) se han rehecho con la ficha vigente del catálogo del RGC (OCR cotejado con la imagen de cada página: fuente `RGC_CATALOGO`). Se corrigieron una respuesta falsa (R-408), varios códigos (P-21a, P-50, S-991a) y definiciones (R-305, R-103, R-404, R-405, R-112, R-412). Faltan las S- (indicación) y algunas señales nuevas (VMP, zona de bajas emisiones, carril trenzado).
- **Código Penal** (delitos de alcohol, velocidad, sin permiso, omisión del deber de socorro): no está entre las fuentes.
- **ITV** (periodicidad, desfavorable o negativa) y **seguro obligatorio**: están en el RD 920/2017 y el RDL 8/2004, que no se han descargado.
- **Tablas** de edades por clase de permiso y de dimensiones máximas: el texto extraído desordena las tablas y no se pueden citar literalmente.
- Datos técnicos o estadísticos del profesor que no aparecen en ninguna fuente (algunos ADAS, revoluciones para cambiar de marcha, etc.).

## Siguientes pasos sugeridos

- Confirmar el código de las señales con los recortes oficiales del catálogo cuando estén.
- Descargar Código Penal, RD 920/2017 (ITV) y RDL 8/2004 (seguro) para resolver unas 15 entradas de revisión.
- Cubrir las materias 3 y 9, que el vídeo no trata (lo está haciendo el hilo «Cubrir las materias que faltan»).
