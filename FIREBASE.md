# Firebase: alojamiento y guardado en la nube

La web se publica en Firebase Hosting y, si Denisse inicia sesión con Google, guarda el progreso en
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
- **Solo entran los correos de la lista.** Al principio de `firestore.rules` está `correosPermitidos()`.
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
6. **Darle los datos a GitHub.** En el repositorio → *Settings → Secrets and variables → Actions*:
   - pestaña *Secrets* → *New repository secret*: nombre `FIREBASE_SERVICE_ACCOUNT`, valor: todo el
     contenido del `.json`.
   - pestaña *Variables* → *New repository variable*: nombre `FIREBASE_PROJECT_ID`, valor: el id del
     paso 1.

   Luego *Actions → Publicar en Firebase → Run workflow*. Desde entonces, cada cambio en `main` se
   publica solo. La web queda en `https://<id-del-proyecto>.web.app`.

Con eso ya se puede borrar el `.json` descargado.

## Dar o quitar acceso

Edita la lista `correosPermitidos()` al principio de `firestore.rules` (correos de Google, en
minúsculas, entre comillas y separados por comas) y súbelo a `main`. GitHub publica las reglas nuevas
en un minuto. Quitar un correo no borra su progreso; solo deja de poder leerlo y guardarlo.

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
