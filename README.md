# test-dgt

Web para practicar el examen teórico del permiso B, con preguntas verificadas contra el BOE y el manual de la DGT.

Es una web estática (HTML, CSS y JavaScript, sin dependencias ni compilación). Funciona en móvil y ordenador, también abriendo `index.html` directamente, y se puede instalar como app (PWA) cuando se sirve por https. El diseño sigue las Human Interface Guidelines de Apple.

## Modos

- **Examen final**: 30 preguntas al azar, 30 minutos, apto con 3 fallos como máximo (RD 818/2009, anexo VI). Corrección al final con explicación y cita.
- **Examen por temario**: práctica por cada una de las 16 materias del anexo V.B.1 del Reglamento General de Conductores, con explicación y cita tras cada respuesta.
- **Camino del temario y logros**: las 16 materias como etapas de una carretera. Una etapa se supera al dominar el 60 % de sus preguntas y se corona con el 80 %; es una guía, cualquier materia se puede practicar siempre. Los logros premian lo aprendido (preguntas dominadas, fallos superados, materias coronadas, exámenes aprobados).
- **Racha con protector**: un día sin estudiar por semana (de lunes a domingo) no rompe la racha.
- **¿Por qué?**: en la práctica, al fallar una pregunta, antes de ver la solución hay que elegir qué norma la explica entre tres. Las tres opciones son explicaciones de preguntas ya verificadas (la de esa pregunta y dos de otras del mismo tema basadas en otro artículo), así que no hay texto nuevo sin revisar.
- **Errores típicos**: los fallos agrupados por trampas (velocidades, prioridad, alcohol...), cada una con una mini lección cuyos puntos llevan la cita literal del BOE, comprobada automáticamente.
- **Mis fallos** y **Preguntas dudosas**: se guardan en el navegador (localStorage). Las dudosas se pueden copiar para revisarlas.
- **Guardado en la nube**: en Firebase Hosting, iniciando sesión con Google el progreso se sincroniza solo entre dispositivos (ver [FIREBASE.md](FIREBASE.md)). Sin sesión o sin conexión, todo sigue funcionando en local.

El orden de las opciones se baraja en cada sesión para que no se pueda acertar por posición.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html`, `app.js`, `estilos.css`, `sw.js`, `manifest.webmanifest`, `icono.svg` | La web |
| `progreso.js`, `nube.js` | Modelo del progreso y sincronización con Firebase |
| `camino.js`, `camino.css` | Camino del temario (etapas que se superan con el 60 % y se coronan con el 80 %), logros y estilos del protector de racha |
| `companero.js` | Compañero de estudio: compartir un resumen del progreso y recibir ánimos (ver [FIREBASE.md](FIREBASE.md)) |
| `pruebas/reglas/` | Pruebas de `firestore.rules` con el emulador |
| `vendor/firebase.js` | SDK de Firebase empaquetado (ver `vendor/LEEME.md`) |
| `firebase.json`, `firestore.rules`, `.github/workflows/firebase.yml` | Alojamiento, reglas y publicación automática en Firebase |
| `errores.js`, `data/errores.js` | «¿Por qué?» y errores típicos. `data/errores.js` se genera con `tools/build_errores.py` desde `preguntas/errores-tipicos.json` |
| `data/preguntas.js` | Banco publicado. Se genera con `tools/build_data.py`; no se edita a mano |
| `img/` | Imágenes que usa la web (copiadas desde `imagenes/` al generar) |
| `preguntas/` | Bancos de preguntas (`banco-*.json`), revisiones, formato y scripts de verificación |
| `imagenes/` | Señales y esquemas preparados para las preguntas, con su índice |
| `tools/build_data.py` | Valida los bancos y genera `data/preguntas.js` |

## Añadir preguntas

1. Deja el banco nuevo como `preguntas/banco-<nombre>.json` (formato en `preguntas/formato-preguntas.md`).
2. Ejecuta `python3 tools/build_data.py` y después `python3 tools/build_errores.py` (comprueba las citas de las mini lecciones contra los textos del BOE de `FUENTES_TXT` y vuelve a elegir las opciones del «¿por qué?»; deja la lista para revisar en `preguntas/porques-para-revisar.md`).
3. Para poner imagen a preguntas que ya existen, añade su id y el `src` en `preguntas/imagenes-nuevas-ids.json` y ejecuta `python3 imagenes/asignar_imagenes.py` (solo toca `imagen` e `imagen_requerida`). Los esquemas nuevos se dibujan en `imagenes/esquemas/plantilla_esquemas.py`.
4. Sube los cambios. Cambia `VERSION` en `sw.js` para que los móviles con la app instalada recojan las preguntas nuevas.

El script solo publica preguntas con `estado: "verificada"`, tres opciones, respuesta válida, materia de 1 a 16 y fuente completa (norma, artículo, URL oficial del BOE o la DGT y cita literal). Las preguntas cuya imagen está `"pendiente"` se aplazan hasta que la imagen exista. Si alguna pregunta no cumple, el script la lista y termina con error.

## Publicar

En Firebase Hosting, automáticamente con cada cambio en `main` (configuración en [FIREBASE.md](FIREBASE.md)).

También funciona con GitHub Pages, sin el guardado en la nube: *Settings → Pages → Deploy from a branch → `main` / raíz*. En cuentas gratuitas, Pages solo está disponible para repositorios públicos.

## Fuentes

Basado en datos de la Agencia Estatal Boletín Oficial del Estado (legislación consolidada) y en el manual del permiso B de la DGT. No es una web oficial de la DGT.
