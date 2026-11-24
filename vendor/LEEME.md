# vendor/firebase.js

Paquete del SDK web de Firebase (licencia Apache 2.0, aviso al final del fichero) con solo lo que usa `nube.js`:
app, auth (inicio de sesión con Google) y Firestore *lite*. Se sirve desde la propia web para que funcione sin
depender de un CDN y quede en la caché del service worker.

Para regenerarlo (por ejemplo, al subir de versión):

```sh
npm i firebase@13.2.0 esbuild@0.24.0
cat > entrada.js <<'JS'
export { initializeApp } from "firebase/app";
export { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, connectAuthEmulator } from "firebase/auth";
export { getFirestore, doc, runTransaction, serverTimestamp, connectFirestoreEmulator } from "firebase/firestore/lite";
JS
npx esbuild entrada.js --bundle --format=esm --minify --legal-comments=eof --outfile=vendor/firebase.js
```
