# Escenas animadas (`preguntas/escenas.json`)

Situaciones de tráfico dibujadas y animadas con código (`escenas.js`, sin librerías). Van en un fichero aparte, por id de pregunta, para no tocar los bancos.

Después de cambiar este fichero (o de regenerar `data/preguntas.js`):

```
node tools/build_escenas.mjs
```

El script termina con error y no publica nada si: el id no existe; en un cruce sin pasos escritos, el orden que calcula `escenas.js` no coincide con `orden`; o alguna cita no aparece literal en el texto consolidado del BOE (`FUENTES_TXT`, por defecto `/mnt/project-files/fuentes/txt`). Sube `VERSION` en `sw.js`.

## Campos

| Campo | Qué es |
|---|---|
| `tipo` | `cruce` o `glorieta` |
| `antes` | Qué se ve antes de responder: `escena` (fotograma quieto que sustituye a la imagen), `imagen` (la imagen de siempre, por ejemplo la señal) o `nada` |
| `titulo` | Texto alternativo. No debe dar pistas de la respuesta |
| `vehiculos` | `[{letra: "A"-"D", desde: "N"/"S"/"E"/"O", hacia, inicio?, tu?}]`. En glorieta, `dentro: ángulo` para un vehículo que ya circula por el anillo. `inicio`: `lejos`, `cerca`, `espera` (por defecto, parado antes de la línea) o `dentro` |
| `vias` | Por brazo: `{senal: "stop"/"ceda", firme: "tierra"}` |
| `entorno` | `campo` (sin aceras ni casas) |
| `centro` | `true` marca el centro de la intersección |
| `orden` | Cruces automáticos: grupos que pasan, por ejemplo `[["C"],["B"],["A"]]`. Se comprueba contra el cálculo |
| `pasos` | Opcional. Si falta, en los cruces se generan solos (regla de la derecha, vía pavimentada, STOP y ceda el paso). Cada paso: `texto`, `cita {norma, articulo, texto literal}`, `mover [{v, hasta: marca o fracción, modo: arranca/frena/sigue/suave/valle, retraso?, dura?}]`, `etiquetas {letra: "Pasa"/"Espera"/"Cede"/"STOP"/...}`, `foco [letras]`, `ms` |

Los giros a la izquierda no se calculan solos: hay que escribir los pasos. Las escenas escritas a mano pasan por la revisión independiente como cualquier pregunta.
