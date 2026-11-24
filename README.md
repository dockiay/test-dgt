# test-dgt

Web para practicar el examen teórico del permiso B, con preguntas verificadas contra el BOE y el manual de la DGT.

Es una web estática (HTML, CSS y JavaScript, sin dependencias ni compilación). Funciona en móvil y ordenador, también abriendo `index.html` directamente, y se puede instalar como app (PWA) cuando se sirve por https. El diseño sigue las Human Interface Guidelines de Apple.

## Modos

- **Examen final**: 30 preguntas al azar, 30 minutos, apto con 3 fallos como máximo (RD 818/2009, anexo VI). Corrección al final con explicación y cita.
- **Examen por temario**: práctica por cada una de las 16 materias del anexo V.B.1 del Reglamento General de Conductores, con explicación y cita tras cada respuesta.
- **Mis fallos** y **Preguntas dudosas**: se guardan en el navegador (localStorage). Las dudosas se pueden copiar para revisarlas.

El orden de las opciones se baraja en cada sesión para que no se pueda acertar por posición.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html`, `app.js`, `estilos.css`, `sw.js`, `manifest.webmanifest`, `icono.svg` | La web |
| `data/preguntas.js` | Banco publicado. Se genera con `tools/build_data.py`; no se edita a mano |
| `img/` | Imágenes que usa la web (copiadas desde `imagenes/` al generar) |
| `preguntas/` | Bancos de preguntas (`banco-*.json`), revisiones, formato y scripts de verificación |
| `imagenes/` | Señales y esquemas preparados para las preguntas, con su índice |
| `tools/build_data.py` | Valida los bancos y genera `data/preguntas.js` |

## Añadir preguntas

1. Deja el banco nuevo como `preguntas/banco-<nombre>.json` (formato en `preguntas/formato-preguntas.md`).
2. Ejecuta `python3 tools/build_data.py`.
3. Sube los cambios. Cambia `VERSION` en `sw.js` para que los móviles con la app instalada recojan las preguntas nuevas.

El script solo publica preguntas con `estado: "verificada"`, tres opciones, respuesta válida, materia de 1 a 16 y fuente completa (norma, artículo, URL oficial del BOE o la DGT y cita literal). Las preguntas cuya imagen está `"pendiente"` se aplazan hasta que la imagen exista. Si alguna pregunta no cumple, el script la lista y termina con error.

## Publicar

Con GitHub Pages: *Settings → Pages → Deploy from a branch → `main` / raíz*. En cuentas gratuitas, Pages solo está disponible para repositorios públicos.

## Fuentes

Basado en datos de la Agencia Estatal Boletín Oficial del Estado (legislación consolidada) y en el manual del permiso B de la DGT. No es una web oficial de la DGT.
