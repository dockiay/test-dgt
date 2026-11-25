# «Piénsala antes»: qué hace el repaso con la seguridad declarada

Antes de ver las opciones se dice «La sé», «Creo que la sé» o «No la sé». `comprobar()` devuelve
`seguridad` (`segura` | `duda` | `nada`) junto con `ok`. Propuesta para cuando pase a la web (no está hecha:
toca `progreso.js` y `camino.js`, que son compartidos).

| | Acierta | Falla |
|---|---|---|
| **La sé** | Acierto normal: sube de caja si le tocaba y alarga la vida media. | Fallo normal y además **fallo con seguridad**: pasada la hora sin repetir (RECIENTE_MS, PR #47), es la primera del repaso escondido ese mismo día. |
| **Creo que la sé** | Cuenta como acierto, pero **no sube de caja ni alarga la vida media**: vuelve en un día. | Fallo normal. |
| **No la sé** | **No cuenta como sabida** (fue suerte): no suma para «dominada»; vuelve en medio día, como un fallo, pero no entra en «Mis fallos». | Fallo normal. |

Por qué:
- Acertar con duda o por suerte no es saberla. Si contara igual, una pregunta adivinada dos veces quedaría
  «dominada» (`h` acaba en `11`) y desaparecería del repaso.
- Los errores cometidos con seguridad son los que mejor se corrigen si se vuelven a ver pronto, con la
  explicación delante (efecto de hipercorrección). Por eso vuelven ese mismo día, no días después, pero respetando
  la hora sin repetir que pidió Sergio (camino.js, RECIENTE_MS).
- «No la sé» no castiga: no suma un fallo ni manda la pregunta a «Mis fallos». Solo hace que vuelva antes.

## Cómo encajaría en el código actual

Un campo nuevo en el registro de cada pregunta: `s`, la última seguridad declarada (`"s"`, `"d"`, `"n"`; vacío si
se contestó como test normal). Viaja con el progreso sincronizado como el resto de `datos.preguntas[id]`.

```js
// progreso.js: registrar(datos, id, acierto, ahora, seguridad)   seguridad: "segura" | "duda" | "nada" | undefined
const s = { segura: "s", duda: "d", nada: "n" }[seguridad] || "";
if (acierto && s === "n") {          // acertó sin saberla: se apunta como vista, sin sumar acierto
  r.t = ahora; r.s = "n";            // no toca r.ok, r.h ni la caja; sí cuenta en el día como respuesta
  return r;
}
// ... registro normal ...
r.s = s;
if (acierto && s === "d") { /* no subir de caja: deshacer el r.c++ del bloque de aciertos */ }

// camino.js: vidaMedia(r)
if (r.s === "n") return 0.5;                 // como un fallo
if (r.s === "d") return Math.min(1, vm);     // vuelve en un día como mucho
// candidatasRepaso: un fallo con seguridad (r.s === "s" y r.h acaba en "0") va primero: riesgo = 2 + riesgo(r),
// siempre después del filtro de RECIENTE_MS (1 h) que ya aplica preguntasNivel
```

En la vista previa la seguridad solo cambia el mensaje del resultado.
