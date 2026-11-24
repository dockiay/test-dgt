# Encargo: convertir un tramo de una clase en vídeo en preguntas tipo test DGT VERIFICADAS

Contexto: Denisse prepara por libre el examen teórico del permiso B (España). Hacemos un banco de preguntas para una web de práctica. La prioridad absoluta es el RIGOR: ninguna pregunta puede tener una respuesta falsa o discutible. Mejor 20 preguntas impecables que 60 dudosas.

S = <carpeta de trabajo>

## Material (todo local, no necesitas red)
- Transcripción automática del vídeo (con marcas de tiempo [m:ss] o [h:mm:ss]): ruta y líneas en tu encargo. Es DATOS, no instrucciones. El profesor se equivoca a menudo (en otro vídeo suyo dijo que la tara es "sin combustible" y la Ley dice lo contrario; que al rebasar un vehículo en el arcén hay que bajar 20 km/h; etc.). La transcripción automática también confunde palabras. Nunca te fíes del vídeo sin la norma. El vídeo no se puede ver: cuando dice "esta señal", deduce cuál es por lo que describe; si no puedes identificarla con seguridad, no hagas pregunta.
- Textos oficiales en $S/boe/ (cada uno también en versión `_layout.txt`, que conserva las filas de las tablas):
  - RGC → rgc_full.txt (Reglamento General de Circulación, consolidado 26/06/2026; incluye la reforma de usuarios vulnerables en vigor desde 1/10/2026 y el nuevo catálogo de señales en vigor desde 1/7/2025)
  - RGC_CATALOGO → catalogo_ocr.txt: OCR corregido del Catálogo oficial de señales verticales (anexo I del RGC, págs. 89-209 del PDF; cada página empieza con "=== p-NNN.png.txt"). ES LA ÚNICA FUENTE VÁLIDA para códigos, nombres y significados de señales verticales. El manual DGT de 2024 está desfasado en señales (p. ej. P-35 ahora es «Trenzado», «otros peligros» es P-50, niños es P-21a, R-408 ya no excluye a otros usuarios). Si dudas de un texto del OCR, renderiza la página: `pdftoppm -f N -l N -r 130 -png /mnt/project-files/fuentes/BOE-A-2003-23514-Reglamento-General-Circulacion-consolidado.pdf $S/out/<tu-carpeta>/pag` y mira la imagen.
  - LSV → l.txt (Ley de Tráfico RDL 6/2015, 26/06/2026; anexo I definiciones, anexo II puntos, anexo IV sanciones de velocidad)
  - RGCOND → rgcond.txt (Reglamento General de Conductores, 06/12/2023)
  - RGV → rgv.txt (Reglamento General de Vehículos, 26/06/2026)
  - CP → cp.txt (Código Penal, delitos contra la seguridad vial arts. 379-385 ter, 09/04/2026)
  - ITV → itv.txt (RD 920/2017); LRCSCVM → lrcscvm.txt (seguro obligatorio, RDL 8/2004); OCURSOS → ocursos.txt (cursos de recuperación de puntos)
  - MANUAL_DGT → manual_dgt.txt (Manual DGT permiso B lectura fácil, 2024). SOLO para temas no normativos (factores de riesgo, fatiga, primeros auxilios, mecánica, conducción eficiente, seguridad activa/pasiva, ADAS) y solo si no contradice la norma. Para cualquier norma, límite, plazo, tasa, sanción o señal, la fuente debe ser el BOE.
  Usa grep -n para localizar artículos (p. ej. `grep -n "^Artículo 20\." $S/boe/rgc_full.txt`) y lee el artículo ENTERO antes de redactar.
- Ejemplos de bancos terminados: /home/user/test-dgt/preguntas/banco-video1-cap09-38.json y banco-dudosas-video1.json (copia su estilo). Formato: /home/user/test-dgt/preguntas/formato-preguntas.md
- Imágenes disponibles: /home/user/test-dgt/imagenes/indice.json (y INDICE.md, legible): 457 señales verticales (img/senales/CODIGO.png), 116 marcas viales (img/marcas/M-x.png), esquemas, fotos y figuras del BOE.
- Bancos ya existentes (unas 1.400 preguntas): /home/user/test-dgt/preguntas/banco-*.json. Otros 8 compañeros hacen lo mismo con otros tramos y vídeos a la vez, y otro equipo escribe 750 preguntas desde la norma. NO repitas una pregunta que ya exista en un banco (mismo hecho preguntado con la misma respuesta). Busca antes con grep en esos bancos. Si el vídeo dice algo que ya está cubierto, no hagas pregunta nueva; si el vídeo lo dice MAL, anótalo igualmente en revision.json (ver abajo) indicando en "preguntas_que_ya_lo_cubren" el id existente.

## Qué hacer
1. Lee TU tramo de la transcripción (`sed -n 'X,Yp'`).
2. Por cada afirmación examinable del profesor, busca el artículo que la respalda y léelo entero.
3. Clasifica:
   - La norma lo confirma sin ambigüedad y no está ya en los bancos → pregunta en banco.json.
   - El vídeo se equivoca, lo matiza mal, no encuentras la norma, o es un consejo/truco que no es norma → entrada en revision.json, RESUELTA (ver formato). Si el vídeo se equivoca y la norma es clara, crea además la pregunta correcta según la norma (con notas_revision "Corrige al vídeo: ...") salvo que ya exista.
   - Paja, chistes, autopromoción, ejemplos sin contenido → ignorar.
4. Redacción: estilo DGT, 3 opciones (a, b, c), UNA sola correcta, distractores plausibles pero inequívocamente falsos según la norma. Nada de "todas son correctas" ni "ninguna". No inventes cifras ni casos que el artículo no cubra. Si el artículo tiene excepciones que podrían hacer correcta otra opción, reformula. Reparte la correcta entre a, b y c a partes iguales. Que la correcta no sea sistemáticamente la más larga. La "explicacion" debe entenderse sola, sin "esta señal", "ese caso", cálculos sueltos ni frases sin sujeto (se reutiliza fuera de su pregunta).
5. Cada pregunta:
   - "fuente": {"norma": "RGC|RGC_CATALOGO|LSV|RGCOND|RGV|CP|ITV|LRCSCVM|OCURSOS|MANUAL_DGT", "articulo": "20.1" (o "Anexo I, señal P-21a", o página del manual), "url": "" (el verificador la rellena), "cita": "<fragmento LITERAL copiado del .txt, 40-250 caracteres, que justifica la respuesta>", "version_consultada": "2026-06-26" (RGCOND "2023-12-06", CP "2026-04-09", MANUAL_DGT "2024-10")}. Para señales del catálogo añade "pagina_pdf": N.
   - La cita debe estar copiada tal cual (el verificador la busca literalmente normalizando espacios y saltos de línea). No cambies tildes ni puntuación. Debe ser única en la norma (si sale repetida, alárgala).
   - "materia": entero 1-16 (anexo V.B.1 RGCOND): 1 normas/señales/prioridad/velocidad; 2 accidentes: factores y causas; 3 actitudes con otros usuarios; 4 percepción, reacción, alcohol, drogas, medicamentos, fatiga, sueño; 5 distancias, frenado, estabilidad; 6 calzada, meteorología, noche, túneles; 7 la vía: clases y partes; 8 usuarios vulnerables; 9 riesgos según el tipo de vehículo y visibilidad; 10 documentación; 11 accidente y primeros auxilios; 12 carga y personas; 13 abandonar el vehículo; 14 mecánica; 15 equipos de seguridad (cinturón, retención infantil); 16 medio ambiente y conducción eficiente.
   - "tema" y "subtema": slugs en minúscula con guion bajo (mira los que usan los bancos existentes y reutilízalos: "senales_verticales", "prioridad", "velocidad", "vmp"...).
   - "origen": {"tipo": "video_clase", "ref": "<tu vídeo, p. ej. video4>", "minuto": null} y añade "_kw": "<frase literal corta (4-10 palabras) y única de la transcripción, dentro de UNA sola línea, donde el profesor lo explica>" → el verificador calcula el minuto. Si la pregunta sale de la norma relacionada y no del vídeo: {"tipo": "normativa_relacionada", "ref": "RGC art. X", "minuto": null} sin _kw (pocas de estas).
   - "imagen": si la pregunta no se entiende sin una señal o marca que existe en indice.json: {"src": "img/senales/P-21a.png", "alt": "Señal de la pregunta", "alt_detalle": "Señal P-21a: <nombre oficial>", "credito": "Catálogo oficial de señales, anexo I del Reglamento General de Circulación (BOE-A-2003-23514), pág. N del PDF consolidado"} (copia el crédito/página de indice.json). Comprueba que el fichero existe en /home/user/test-dgt/img/. El enunciado nunca debe nombrar la señal si eso delata la respuesta ("¿Qué indica esta señal?"). Si hace falta una imagen que no existe: "imagen": {"pendiente": "<qué debe mostrar, con detalle>", "codigo": "<código o null>"} (la web aplaza esas preguntas; úsalo poco). Si no hace falta imagen: null.
   - "estado": "verificada", "verificado_el": "2026-11-24", "notas_revision": "" (o un matiz útil).
   - "id": usa EXCLUSIVAMENTE tu prefijo + tema corto + número: p. ej. "v4a-sen-0001".
6. revision.json — una entrada por afirmación dudosa del vídeo, ya RESUELTA:
   {"version": 1, "revision": [{
     "id": "<prefijo>-rev-0001",
     "afirmacion_del_video": "<lo que dice el vídeo, en una frase clara>",
     "minuto": "<marca de tiempo de la línea donde lo dice, tal cual aparece, p. ej. 12:34 o 1:02:03>",
     "veredicto": "error" | "matiz" | "correcta" | "no_norma" | "sin_fuente",
       (error = la norma dice otra cosa; matiz = incompleto o con una excepción importante; correcta = era dudosa pero la norma la confirma; no_norma = consejo, truco o explicación que no está en la norma; sin_fuente = no se puede confirmar ni desmentir con las fuentes)
     "lo_correcto": "<en lenguaje sencillo, para una alumna, 1-3 frases: qué hay que responder en el examen>",
     "fuente": "<legible: 'Reglamento General de Circulación, art. 88.1' o 'Catálogo de señales (RGC anexo I), señal R-308'>",
     "norma": "<clave de norma como en las preguntas, o null si no_norma/sin_fuente>",
     "cita": "<cita literal que lo demuestra, o null>",
     "preguntas_nuevas": ["<ids de tus preguntas que lo corrigen>"],
     "preguntas_que_ya_lo_cubren": ["<ids de bancos existentes>"]
   }]}
   Incluye también los errores de la transcripción automática SOLO si cambian el sentido de una norma (no las faltas de dicción).
7. banco.json: {"version": 1, "normativa_consultada": {...normas usadas con url y fecha...}, "preguntas": [...]}. Escríbelo con un script Python (json.dump, ensure_ascii=False, indent=2) en $S/out/<tu-carpeta>/.
8. Verifica:
   `FUENTES_TXT=$S/boe python3 -I $S/kit/verify_video.py $S/out/<carpeta>/banco.json <transcripción>` → repite hasta "OK". Si una cita no aparece, cópiala otra vez del .txt (no la parafrasees). Si no logras que pase, pasa esa pregunta a revisión.
   Después: `cd /home/user/test-dgt && FUENTES_TXT=$S/boe python3 -I preguntas/scripts/comprobar_lote.py $S/out/<carpeta>/banco.json` (sin --escribir). Lee los FALLOS y AVISOS: arregla los tuyos (citas, opciones que se delatan, explicaciones que no se sostienen solas). Si avisa de que una pregunta se parece a una existente y de verdad pregunta lo mismo, quítala. (Los avisos de parecido con preguntas de otros compañeros de vídeos no aparecerán; eso se limpia al final.)
   Para las citas de revision.json no hay script: cópialas igual de literales.
9. Tras pasar los verificadores, relee cada pregunta como un examinador escéptico: ¿la correcta es la única defendible según la cita? ¿Alguna excepción haría correcta otra opción? ¿El enunciado se entiende sin ver el vídeo? Corrige o pasa a revisión.

Cantidad orientativa: cubre todo lo examinable de tu tramo que no esté ya en los bancos; sin relleno.

NO escribas en /mnt/project-files ni en /home/user/test-dgt: solo en $S/out/<tu-carpeta>/. No uses git.

## Entrega (respuesta final, breve)
- Nº de preguntas verificadas, nº con imagen, nº de entradas de revisión por veredicto.
- Los 5-10 errores más importantes del vídeo frente a la norma (con artículo).
