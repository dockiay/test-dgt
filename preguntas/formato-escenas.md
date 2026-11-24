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

## Carretera y autovía (`escenas-via.js`)

Dos tipos más, registrados desde `escenas-via.js` con `Escenas.registrarTipo` (así se pueden añadir tipos sin tocar `escenas.js`; el script carga cada `escenas-*.js` de la raíz):

| Campo | Qué es |
|---|---|
| `tipo` | `carretera` (doble sentido, un carril por sentido, arcenes) o `autovia` (un solo sentido, 2 o 3 carriles, mediana) |
| `via` | `carretera`: `eje: [{desde, hasta, tipo}]` con `discontinua`, `continua`, `adosada-sur` (la discontinua del lado de quien va hacia el este) o `adosada-norte`; `cruces: [{x, lado: "norte"/"sur", ancho}]` (vía lateral). `autovia`: `carriles: 2/3`, `aceleracion: {desde, hasta}` (carril de aceleración con su ramal) |
| `vehiculos[].ruta` | Puntos `[x, carril]` (x del centro del vehículo). Entre dos carriles distintos, curva en S. Carriles de `carretera`: `d` (el propio), `i` (el contrario), `eje`, `borde`, `arcen`, `arcen-i` o una y; de `autovia`: `der`, `centro`, `izq`, `acel`, `rampa` (empieza en x = -40), `arcen`. `[x, "N"]` al final: gira hacia la vía lateral en x |
| `vehiculos[].sentido` | `O` para los que vienen de frente: sus x bajan y sus carriles se ven girados (su `d` queda arriba) |
| `vehiculos[].marcas` | `{nombre: x}` para usar en `mover.hasta`; además `p0`, `p1`… en cada punto de la ruta |
| `paso.intermitentes` | `{letra: "izquierda"/"derecha"/"emergencia"}` en ese paso (vale para cualquier tipo) |
| `objetos` | `piedras`, `triangulo` (de emergencia) y `cebra` (paso para peatones en x) |
| `carteles` | `[{cod, x, lado: "sur"/"norte"}]`, imágenes de `img/senales` |
| `anotaciones` | `cota` (`x`, `y1`, `y2`, `texto`) y `zona` (`x`, `y`, `w`, `h`, `texto`); `en: [estados]` dice cuándo se ven (0 = antes del primer paso, 1 = tras el primero…) |
| `comprobar` | `[{adelanta, a, minimo}]`: el script comprueba que, mientras van a la par, la separación lateral (con retrovisores) es de al menos `minimo` metros |

El script comprueba también que en estas escenas ningún vehículo toca a otro en ningún momento de la animación.
