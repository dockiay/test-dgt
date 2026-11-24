# Formato de datos para el banco de preguntas (propuesta v1)

Un fichero JSON por banco. Solo entran en `banco.json` las preguntas con `estado: "verificada"`.
Las dudosas van a `revision.json` con el mismo formato y `estado: "pendiente_revision"`.

```json
{
  "version": 1,
  "normativa_consultada": {
    "RGC": { "ref": "BOE-A-2003-23514", "ultima_actualizacion": "2026-06-26" },
    "LSV": { "ref": "BOE-A-2015-11722" }
  },
  "preguntas": [
    {
      "id": "vel-0001",
      "tema": "velocidad",
      "subtema": "limites_genericos_fuera_poblado",
      "enunciado": "¿Cuál es la velocidad máxima genérica de un turismo en autopista?",
      "opciones": {
        "a": "100 km/h",
        "b": "120 km/h",
        "c": "130 km/h"
      },
      "correcta": "b",
      "explicacion": "El límite genérico para turismos en autopistas y autovías es 120 km/h.",
      "fuente": {
        "norma": "RGC",
        "articulo": "48.1.a.1º",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a48",
        "cita": "Texto literal del BOE que justifica la respuesta",
        "version_consultada": "2026-06-26"
      },
      "origen": {
        "tipo": "video_clase",
        "ref": "video1",
        "minuto": "12:34"
      },
      "imagen": null,
      "estado": "verificada",
      "verificado_el": "2026-11-24",
      "notas_revision": ""
    }
  ]
}
```

## Reglas de los campos

- `opciones`: siempre 3 (a, b, c), como en el examen DGT. `correcta` es una sola letra.
- `fuente.cita`: obligatoria para pasar a `verificada`. Es el texto literal del artículo, para que cualquiera pueda comprobarlo.
- `fuente.version_consultada`: fecha de la versión consolidada del BOE. Si la norma cambia después, la web puede marcar para revisar las preguntas basadas en versiones antiguas.
- `origen`: de dónde salió la idea (vídeo y minuto, manual DGT, etc.). No sustituye a `fuente`.
- `estado`: `verificada`, `pendiente_revision` o `descartada`.
- `tema`: lista cerrada, por ejemplo: `senales`, `velocidad`, `prioridad`, `adelantamiento`, `alcohol_drogas`, `documentacion`, `vehiculo`, `seguridad_pasiva`, `primeros_auxilios`, `conduccion_eficiente`, `infracciones_sanciones`, `vias`, `luces`, `parada_estacionamiento`.

- `materia` (obligatorio): entero 1-16 según el anexo V.B.1 del Reglamento General de Conductores (1 normas, señales, prioridad, velocidad; 2 accidentes; 3 actitudes; 4 percepción, alcohol, drogas, fatiga; 5 distancias y frenado; 6 calzada, meteorología, noche, túneles; 7 la vía; 8 vulnerables; 9 riesgos según el vehículo; 10 documentación; 11 accidente y primeros auxilios; 12 carga y personas; 13 abandonar el vehículo; 14 mecánica; 15 equipos de seguridad; 16 medio ambiente).
- `imagen`: `null`, `{"src": "img/...svg", "alt": "...", "credito": "..."}` o, mientras no exista, `{"pendiente": "descripción", "codigo": "R-1" o null}`. La web no muestra preguntas con imagen pendiente.
- `imagen_requerida`: `null` o `{"tipo": "senal|marca_vial|esquema|foto", "codigo": ..., "descripcion": ...}` (informativo; indica que la pregunta no se entiende sin imagen).
- Normas admitidas en `fuente.norma`: `RGC`, `LSV`, `RGCOND`, `RGV`, `CP` (Código Penal, delitos contra la seguridad vial, arts. 379-385 ter), `MANUAL_DGT` (este último solo para temas no normativos y si no contradice el BOE).
- `origen.tipo`: `video_clase` (con `ref` del vídeo y `minuto`) o `normativa_relacionada` (pregunta añadida a partir de la norma, no del vídeo).
- `revision.json` usa otra estructura: `afirmacion_del_video`, `motivo` (por qué no se ha podido verificar o qué dice la norma) y `sugerencia`.
- Los scripts `scripts/build.py` (genera el banco y comprueba que cada cita aparece literalmente en el texto del BOE) y `scripts/ts.py` (calcula el minuto del vídeo) sirven de plantilla para los siguientes vídeos.

El ejemplo de arriba es ilustrativo; su artículo y cita se comprobarán contra el BOE antes de usarlo.
