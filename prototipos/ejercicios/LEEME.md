# Prototipo: ejercicios que no son tipo test

Para los niveles del camino del temario (no para simulacros). Primera tanda, dos de cada tipo (`datos.js`); la segunda tanda está en `datos-tanda2.js` (29 en total). Las cifras son solo las «de examen» y fáciles de recordar.

| Tipo | Ejemplos | Fuente |
|---|---|---|
| Escribe la cifra (teclado propio) | 120 km/h en autovía · 1,5 m al adelantar a un ciclista | RGC 48.1.a · 85.4 |
| Toca en la imagen | quién pasa primero en un cruce sin señales · dónde va el carril de emergencia | RGC 57.1 · 32.1 |
| Ordena los pasos | regla PAS · prioridad entre señales | Manual DGT tema 16 · RGC 133.1 |
| Empareja | R-100 / R-101 / R-102 / R-1 · tasas de alcohol | Catálogo de señales · RGC 20 |

- Abrir `index.html` con un servidor desde la raíz del repo (`python3 -m http.server`) y entrar en `/prototipos/ejercicios/`.
- `datos.js` y `datos-*.js`: los ejercicios (formato al principio de `datos.js`). `python3 comprobar.py` comprueba las citas contra `/mnt/project-files/fuentes/txt`.
- `generar_esquemas.py`: esquemas de «toca en la imagen» con la plantilla común → `esquemas.js`.
- `construir_vista.py SALIDA.html`: todo en un solo HTML para la vista previa.
- No toca la web: nada de esto se carga desde `index.html` de la raíz ni está en `sw.js`.
