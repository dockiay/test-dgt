# Piloto: vídeo «Intensivo de teórica completo y actualizado 2027» → preguntas verificadas

**Fecha:** 24/11/2026
**Alcance:** capítulos 1 a 8 de 38 (definiciones, tipos de vías, por dónde circular, carriles especiales, distancias, distancia lateral y velocidades), es decir, más o menos la primera 1 h 20 min de las 6 h del vídeo.

## Resultado

| | Cantidad |
|---|---|
| Preguntas verificadas (`banco-piloto-video1.json`) | **70** |
| Afirmaciones del vídeo que van a revisión (`revision-piloto-video1.json`) | **18** |
| Errores del vídeo detectados frente al BOE | 2 claros y varios matices |

Cada pregunta verificada lleva el artículo y una **cita literal** del BOE. Un script comprueba que cada cita aparece tal cual en el texto consolidado (Reglamento General de Circulación y Ley de Tráfico, ambos con última modificación del 26/06/2026, que ya incluye la reforma de usuarios vulnerables en vigor desde el 1/10/2026). Las 70 citas se encontraron.

## Dónde el vídeo no coincide con la norma

1. **Tara** (rev-0001). El vídeo dice que es el peso «sin conductor, sin combustible». La Ley dice que la tara incluye la dotación completa de agua, **combustible**, lubricante, repuestos y herramientas (Anexo I.35). La pregunta del banco usa la definición legal.
2. **Rebasar un vehículo averiado** (rev-0015). El vídeo habla de un vehículo «en el arcén». El art. 88.1 del RGC exige 1,5 m y reducir 20 km/h cuando el vehículo inmovilizado **ocupa la calzada** en tu carril.
3. **Mercancías peligrosas dentro de poblado** (rev-0016). No se «restan 10 km/h»: el art. 50.4 fija un máximo de **40 km/h** en travesías y en vías urbanas de dos o más carriles por sentido.
4. **Matices menores:** el peatón de noche debe llevar «al menos un elemento luminoso o reflectante» visible a 150 m (no específicamente un chaleco); los «2 o 3 segundos» de distancia son un consejo, no una norma; y en el carril contiguo a uno habilitado en sentido contrario, el 60 a 80 km/h solo se aplica si hay un único carril en tu sentido.

## Lo que queda pendiente de comprobar (no está en el banco)

- Definiciones que están en el **Reglamento General de Vehículos** (furgoneta, derivado de turismo, masa en orden de marcha, matrícula amarilla del ciclomotor). Ese texto no estaba entre las fuentes descargadas.
- Que las motocicletas puedan usar el carril VAO con un solo ocupante (el art. 35 no lo dice expresamente).
- Que la persona en silla de ruedas deba ir por el arcén derecho (el art. 122 no lo menciona).
- La prohibición de peatones y animales en autopista (hay que localizar la cita, probablemente en la Ley de Tráfico).

## Formato

Ver `formato-preguntas.md`. Cada pregunta tiene: `id`, `tema`, `subtema`, `enunciado`, 3 `opciones`, `correcta`, `explicacion`, `fuente` (norma, artículo, URL del BOE, cita literal y versión), `origen` (vídeo y minuto), `estado` y `notas_revision`. La pregunta vel-0018 no sale del vídeo: se añadió para corregir el matiz de mercancías peligrosas.

## Cómo seguir

- Con el mismo método se pueden procesar los capítulos 9 a 38 (prioridad, maniobras, señales, luces, documentación, alcohol y drogas, seguridad vial, etc.). Algunos temas, como señales, documentación o mecánica, necesitarán otras fuentes (Reglamento General de Vehículos, Reglamento de Conductores y el manual de la DGT).
- Antes de usar el banco, conviene que una persona repase las 70 preguntas (unos 20 minutos). La comprobación automática garantiza que la cita existe, pero no que la pregunta esté bien planteada.
