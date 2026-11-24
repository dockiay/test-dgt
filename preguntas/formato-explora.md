# «Explóralo» (`preguntas/explora.json`)

Escenas que se manipulan con deslizadores, al final de la explicación (solo después de responder, para no dar pistas). Código en `explora.js` y `explora.css`; se engancha envolviendo `Escenas.enExplicacion`, sin tocar `app.js`. Ruta de prueba: `#/explora`.

Después de cambiar este fichero, `explora.js` o `data/preguntas.js`:

```
node tools/build_explora.mjs
```

El script no publica nada si: un id no existe; el estado inicial o el reto usan claves o valores que no son del tipo; el reto ya se cumple al empezar; alguna cita no aparece literal en el BOE o en el manual de la DGT (`FUENTES_TXT`, por defecto `/mnt/project-files/fuentes/txt`); alguna cifra de `explora.js` (`CIFRAS`, límites en poblado) no aparece literal en su cita; o la tabla de límites fuera de poblado no coincide con la tabla del RGC 48.1.a (texto maquetado del BOE) y con las preguntas del banco que citan esa tabla. Sube `VERSION` en `sw.js`.

## Tipos

| Tipo | Qué se mueve | Claves del estado |
|---|---|---|
| `detencion` | Velocidad, tiempo de reacción (franja normal 0,5-1 s), suelo mojado, mucha carga, frenos o neumáticos mal. Botón «Frenar». | `velocidad`, `reaccion`, `mojado`, `carga`, `frenos`, `frenado` (ya pulsó «Frenar») |
| `seguimiento` | Velocidad, separación en segundos, vehículo (turismo, más de 3.500 kg, más de 10 m), lluvia o noche, túnel, carretera de un carril por sentido donde se puede adelantar. Botón «Contar los segundos» (cuenta en tiempo real). | `velocidad`, `segundos`, `lluvia`, `tunel`, `vehiculo`, `unCarril`, `contado`; derivadas para retos: `cumpleTunel`, `cumple50` |
| `limites` | Vía y grupo de vehículo; velocímetro y señal con el límite genérico y su cita. | `vehiculo` (`turismo`, `autobus`, `camion`), `via` (`autopista`, `convencional`, `travesia`, `autopistaPoblado`, `urbana2`, `urbana1`, `plataforma`) |

## Campos por pregunta

`tipo`, `titulo`, `inicial` (estado de partida), `destacar` (solo `detencion`: `reaccion`, `frenado` o `detencion`), `reto` `{texto, si}`: condición que, al cumplirse, marca el reto como hecho (`{clave: valor}` o `{clave: {min, max}}`).

## Cifras

Los metros de reacción y de hueco son aritmética (velocidad ÷ 3,6 × segundos). El manual de la DGT no da metros de frenado: la barra roja es un dibujo para comparar y no muestra ninguna cifra. Las citas viven en `citas` de este mismo fichero.
