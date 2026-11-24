# Escenas animadas (`preguntas/escenas.json`)

Situaciones de tráfico dibujadas y animadas con código (`escenas.js`, sin librerías). Van en un fichero aparte, por id de pregunta, para no tocar los bancos.

Cada tanda puede ir en su propio fichero `preguntas/escenas/<tanda>.json` (mismo formato); el script los junta todos y falla si un id está en dos sitios.

Después de cambiar este fichero (o de regenerar `data/preguntas.js`):

```
node tools/build_escenas.mjs
```

El script termina con error y no publica nada si: el id no existe; en un cruce sin pasos escritos, el orden que calcula `escenas.js` no coincide con `orden`; o alguna cita no aparece literal en el texto consolidado del BOE (`FUENTES_TXT`, por defecto `/mnt/project-files/fuentes/txt`). Sube `VERSION` en `sw.js`.

## Campos

| Campo | Qué es |
|---|---|
| `tipo` | `cruce`, `glorieta`, `recta` (vía horizontal; `via: {urbana, sentidoUnico, carriles: 2, mediana, sinCasasSur}`; vehículos con `desde: O/E`, `y` del carril y `marcas: {nombre: x del frontal}`, o con `puntos`) o `estrecho` (tramo de un solo carril o puente, vía horizontal; los vehículos entran por `O` o `E`) |
| `antes` | Qué se ve antes de responder: `escena` (fotograma quieto que sustituye a la imagen), `imagen` (la imagen de siempre, por ejemplo la señal) o `nada` |
| `titulo` | Texto alternativo. No debe dar pistas de la respuesta |
| `vehiculos` | `[{letra: "A"-"D" o id, tipo?, desde: "N"/"S"/"E"/"O", hacia, inicio?, tu?}]`. `tipo`: `turismo` (por defecto), `autocaravana`, `camion` (con `largo` opcional), `autobus`, `moto`, `bici`, `peaton`, `nino`, `carro`, `tranvia`, `tren`, `oveja`, `vaca`, `turismo+remolque`, `camion+remolque`, `furgoneta` y los de urgencia `ambulancia`, `policia`, `bomberos` (llevan encendidos rotativos y sirena). `avisos: {rotativo, sirena, roja (luz roja hacia delante de la policía), emergencia (luz de emergencia), claxon, panuelo, megafonia, salpica}` enciende avisos desde el principio; `paso.avisos {id: {sirena: false, …}}` los cambia al empezar un paso. `puntos` vale en cualquier escenario, también en la glorieta. `intermitente: izquierda/derecha` en trayectos a medida; `desorden` desordena un grupo (rebaños). Sin letra hace falta `id` (por ejemplo, ciclistas). `grupo: n` dibuja n en fila (`separacion` en px); `lat` cambia la distancia al eje; `puntos: [[x,y],…]` da un trayecto a medida (peatones); `color: "A"-"D"` para los que no llevan letra. En glorieta, `dentro: ángulo` para un vehículo que ya circula por el anillo. `inicio`: `lejos`, `cerca`, `espera` (por defecto, parado antes de la línea), `borde` (justo antes de la calzada), `dentro` o `medio` (centro, solo recto). En `estrecho`: `lejos`, `cerca`, `antes` (fuera del tramo), `dentro`, `encuentro` |
| `vias` | Por brazo: `{flechas: ángulo (sentido único, sin eje), senal: "stop"/"ceda", linea: false (sin línea de detención), poste: false (sin señal vertical), pintada: true (STOP o triángulo en el suelo), cartel: "P-1" (imagen de img/senales), firme: "tierra", cerrada: true (intersección en T)}` |
| `entorno` | `campo` (sin aceras ni casas); en `estrecho`, `puente` |
| `elementos` | Añadidos sobre cualquier escenario: `zona` (rect con `clase` asfalto/acera/tierra/cesped/pintura), `casa`, `arbol`, `cebra`, `pasoCiclistas`, `isleta` (`peatones: true` = refugio), `obras`, `conos`, `railes` (`eje`, `enCalzada`), `cartel` (`cod`, `panel`), `flecha`, `guia`, `parada`, `texto`, `persona` (`agente: true`), `semaforo` (`id`, `color`; cambia con `paso.semaforos {id: color}`), `niebla` (`cx`, `cy`, `r`), `pendiente` (`alto: E/O`), `charco` (`x`, `y`, `rx`, `ry`), `carrilReservado` (`y` de la línea continua, `rotulo`: BUS/VAO, `rombo`, `rotulos`: x de cada rótulo) |
| `edificios` | `[[x, y, ancho, alto]]` en lugar de las casas de siempre (por ejemplo, uno que tapa la vista) |
| `encuentro`, `senales`, `retrocede`, `criterio` | Solo `estrecho`: x del encuentro (200 por defecto); señales en los extremos `[{cod: "R-5", extremo: "O"}]`; quién da marcha atrás y por qué norma (`62.1`, `62.1-distancia`, `62.1-tamano`, `61.2`, `63.1` con `sube: O/E`). El script comprueba que retrocede quien manda esa norma |
| `centro` | `true` marca el centro de la intersección |
| `orden` | Cruces automáticos: grupos que pasan, por ejemplo `[["C"],["B"],["A"]]`. Se comprueba contra el cálculo |
| `pasos` | Opcional. Si falta, en los cruces se generan solos (regla de la derecha, vía pavimentada, STOP y ceda el paso). Cada paso: `texto`, `cita {norma, articulo, texto literal}`, `mover [{v (letra o id), hasta: marca o fracción, modo: arranca/frena/sigue/suave/valle, retraso?, dura?}]`, `etiquetas {letra: "Pasa"/"Espera"/"Cede"/"STOP"/...}`, `foco [letras]`, `ms` |

Los giros a la izquierda no se calculan solos: hay que escribir los pasos. Las escenas escritas a mano pasan por la revisión independiente como cualquier pregunta.
