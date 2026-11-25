# Firebase: alojamiento y guardado en la nube

La web se publica en Firebase Hosting y, si la persona que estudia inicia sesión con Google, guarda el progreso en
Firestore y lo sincroniza sola entre el móvil y el ordenador. Todo cabe en el plan gratuito **Spark**
(no hace falta tarjeta).

## Cómo funciona

- El progreso sigue guardándose en el navegador (localStorage), así que la web funciona igual sin
  conexión y sin iniciar sesión.
- Con sesión iniciada, `nube.js` combina el progreso local con el de la nube (`Progreso.combinar`:
  de cada pregunta gana la respuesta más reciente, y se unen exámenes, días de estudio y dudosas) y
  guarda el resultado en los dos sitios. Lo hace al iniciar sesión, unos segundos después de cada
  respuesta, al volver a la web y al recuperar la conexión. Usa una transacción, así que dos
  dispositivos a la vez no se pisan.
- Desmarcar una dudosa o vaciar el repaso también se sincroniza (no reaparece desde el otro dispositivo).
- Cada persona tiene un documento `usuarios/{uid}`. Las reglas (`firestore.rules`) solo dejan leer y
  escribir el propio, con un formato fijo.
- **Solo entran los correos de la lista.** El workflow lee `CORREOS_PERMITIDOS` del entorno
  `produccion` de GitHub Actions y lo escribe en `firestore.rules` al publicar.
  Cualquiera puede pulsar «Iniciar sesión con Google», pero si su correo no está en la lista la nube no le
  deja leer ni guardar nada: la web cierra su sesión y le explica que no tiene permiso (su progreso
  local no se toca).
- La configuración pública la sirve Firebase Hosting en `/__/firebase/init.json`, así que no hay
  claves en el repositorio. Fuera de Firebase Hosting (por ejemplo, GitHub Pages) la web funciona
  como antes, sin la opción de la nube.
- La copia manual (enlace o fichero) sigue disponible como copia de seguridad.

## Puesta en marcha (una sola vez)

1. **Crear el proyecto.** En <https://console.firebase.google.com> → *Crear un proyecto*. Nombre, por
   ejemplo, `test-permiso-b`. Google Analytics no hace falta. Apunta el **id del proyecto** (aparece
   debajo del nombre, p. ej. `test-permiso-b` o `test-permiso-b-1a2b3`).
2. **Registrar la web.** En la portada del proyecto, icono `</>` (*Añadir app web*). Nombre `Test B`;
   marca *Configurar también Firebase Hosting*. Lo demás que proponga (instalar el SDK o la CLI) se
   puede saltar con *Siguiente*.
3. **Activar el inicio de sesión con Google.** *Compilación → Authentication → Comenzar → Google →
   Habilitar*, elige el correo de asistencia y *Guardar*.
4. **Crear la base de datos.** *Compilación → Firestore Database → Crear base de datos*, ubicación
   `eur3 (Europe)` y *modo de producción*. Las reglas buenas las publica GitHub en el paso 6.
5. **Clave para que GitHub publique.** En <https://console.cloud.google.com/iam-admin/serviceaccounts>
   (con el proyecto elegido arriba) → *Crear cuenta de servicio*, nombre `github-publicar`. En
   *Permisos* añade estos cuatro roles:
   - Administrador de Firebase Hosting
   - Administrador de reglas de Firebase
   - Consumidor de Service Usage
   - Lector de claves de API

   Después, en la cuenta creada → *Claves → Agregar clave → Crear clave nueva → JSON*. Se descarga
   un fichero `.json`. Es una contraseña: no lo compartas ni lo subas al repositorio.
6. **Darle los datos a GitHub.** En *Settings → Environments*, crea `produccion` y permite los
   despliegues desde la rama `main`. En *Environment secrets*, añade estos dos secretos:
   - `FIREBASE_SERVICE_ACCOUNT` con el contenido completo del `.json`.
   - `CORREOS_PERMITIDOS` con las cuentas de Google autorizadas, separadas por comas. Pueden ser
     cuentas de Gmail o cuentas de Google creadas con otro proveedor de correo.

   En *Settings → Secrets and variables → Actions → Variables*, añade la variable de repositorio
   `FIREBASE_PROJECT_ID` con el ID del proyecto del paso 1.

   Luego *Actions → Publicar en Firebase → Run workflow*. Desde entonces, cada cambio en `main` se
   publica solo. La web queda en `https://<id-del-proyecto>.web.app`.

Con eso ya se puede borrar el `.json` descargado.

## Dar o quitar acceso

Edita `CORREOS_PERMITIDOS` en *Settings → Environments → produccion → Environment secrets* y ejecuta
*Actions → Publicar en Firebase → Run workflow*. En un minuto rigen las reglas nuevas. Quitar un correo no borra su progreso; solo deja de poder leerlo y guardarlo.

## Compañero de estudio

Desde *Compañero* (`#/companero`), quien estudia puede compartir su avance con otra persona, y esa persona
puede verlo y mandarle ánimos. Lo decide siempre quien estudia:

- Escribe el correo de la cuenta de Google de su compañero (hasta 5) y puede dejar de compartir cuando quiera.
  Al dejar de compartir con todos, el resumen se borra de la nube.
- Mientras comparte, la web publica un **resumen** en `compartidos/{su uid}`: preguntas vistas y dominadas,
  racha, días estudiados de las dos últimas semanas, preparación, dominio por materia, últimos 10 exámenes y
  la fecha del examen si la ha puesto. Nunca las respuestas pregunta a pregunta, los fallos ni las dudosas.
  Se actualiza solo, como mucho cada 30 segundos, después de cada guardado en la nube.
- El compañero solo puede **leer** ese resumen. Las reglas no le dejan leer ni escribir `usuarios/{uid}`
  de quien estudia, ni cambiar el resumen.
- Los ánimos van en `animos/{id}`. Solo puede mandarlos alguien con quien se comparte en ese momento; los
  leen quien los manda y quien los recibe. Quien los recibe solo puede marcarlos como leídos o borrarlos.
- **Las dos cuentas tienen que estar en `CORREOS_PERMITIDOS`**. Si quien estudia comparte con un correo
  que no está en la lista, esa cuenta no podrá ver nada.

Pruebas de las reglas: `pruebas/reglas/reglas.test.mjs` (instrucciones dentro del fichero).

## Sitio de administración

En `https://<id-del-proyecto>.web.app/admin/` hay un panel con las métricas de todas las cuentas: altas,
uso y retención, resultado (preparación, simulacros) y contenido (preguntas y materias que más se fallan,
preguntas dudosas), más el detalle de cada cuenta. No tiene enlaces desde la web de estudio.

- **Quién entra.** Las cuentas del secreto `CORREO_ADMIN` (en el mismo entorno `produccion`; puede llevar
  varios correos separados por comas). El workflow los pone en `firestore.rules` al publicar, como
  `CORREOS_PERMITIDOS`. Esas cuentas tienen que estar también en `CORREOS_PERMITIDOS`. Sin el secreto, nadie
  administra y el panel dice «Sin acceso».
- **Solo lectura.** Las reglas dejan a quien administra leer `usuarios/` y `fichas/` de todas las cuentas,
  nunca cambiarlas ni borrarlas.
- **Fichas.** La web de estudio guarda en `fichas/{uid}` el nombre y el correo de Google de cada cuenta, la
  fecha de alta (la pone el servidor y no cambia) y la de la última visita, como mucho una vez al día. Las
  cuentas aparecen con su nombre cuando abren la versión nueva de la web; antes, como «Cuenta …».
- **Transparencia.** El perfil de cada cuenta avisa de que quien gestiona la web puede ver su progreso.
- Las cifras salen de la copia que sincronizó el último dispositivo de cada cuenta. Aún no se miden el origen
  de las altas, los minutos de estudio, dónde se abandona el camino ni el aprobado real (fase 2).

## Probar en local

Con Node y Java instalados:

```sh
npx firebase-tools emulators:start --only auth,firestore,hosting --project demo-testb
```

La web queda en <http://localhost:5000>. Para que use los emuladores en vez de la nube real, define
antes de cargar `nube.js`:

```js
window.NUBE_CONFIG = { apiKey: "fake-api-key", projectId: "demo-testb", authDomain: "localhost",
  emulador: { auth: "http://127.0.0.1:9099", host: "127.0.0.1", puerto: 8080 } };
```
