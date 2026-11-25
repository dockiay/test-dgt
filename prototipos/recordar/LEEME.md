# Prototipo: ejercicios para recordar

Cinco tipos más para los niveles del camino (no para simulacros), distintos del tipo test y de los de
`prototipos/ejercicios` (cifra, tocar, ordenar, emparejar). Dos ejemplos de cada uno:

| Tipo | Por qué ayuda a recordar | Ejemplos | Fuente |
|---|---|---|---|
| Clasifica (cartas a 2 o 3 cubos; con 2 se desliza) | Discriminar casos parecidos, intercalados; las falladas vuelven al final | prohibido parar o solo estacionar · avisa, prohíbe u obliga | RGC 94 · catálogo de señales |
| Caza el error (tocar la parte falsa y corregirla) | Lectura atenta y corrección generada por uno mismo | límites en vías urbanas · stop | RGC 50.1 · señal R-2 |
| ¿Y si…? (un caso que cambia de detalle en detalle) | Casos contrastados: qué detalle manda en la regla | turismo/remolque/vía · cruce sin señales | RGC 48.1.a · 57.1 |
| Piénsala antes (opciones tapadas + seguridad) | Recuerdo sin pistas antes de reconocer; los fallos «con seguridad» se corrigen mejor | chaleco · curva (preguntas del banco) | RGC 118.4 · manual DGT |
| Completa la regla (huecos con fichas) | Generar la regla con sus palabras exactas | parada · glorietas | Ley de Tráfico, anexo I · RGC 57.1.c |

- Abrir `index.html` con un servidor desde la raíz del repo y entrar en `/prototipos/recordar/`.
- `datos.js`: los ejercicios (formato al principio del fichero). `python3 comprobar.py` comprueba las citas contra
  `/mnt/project-files/fuentes/txt/`, los nombres de las señales contra el índice del catálogo y las preguntas de
  «Piénsala antes» contra el banco verificado.
- `recordar.js`: motor (`Recordar.crear`), `demo.js`: portada y lección de prueba, `construir_vista.py SALIDA.html`: todo en un HTML.
- No toca la web: nada de esto se carga desde `index.html` de la raíz ni está en `sw.js`.
- En «Piénsala antes», la seguridad declarada solo cambia el mensaje. En la web serviría para decidir cuándo vuelve la pregunta.
