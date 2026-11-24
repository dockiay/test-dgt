// Pruebas de firestore.rules con el emulador de Firestore.
// Uso (necesita Node y Java):
//   cd pruebas/reglas && npm install && npx firebase-tools@14.24.0 emulators:exec --only firestore --project demo-testb "node reglas.test.mjs"
// Sustituye la marca de la lista de correos por correos de prueba, como hace el workflow al publicar.
import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp, setLogLevel } from "firebase/firestore";
setLogLevel("silent"); // los rechazos esperados no ensucian la salida

const reglas = readFileSync(new URL("../../firestore.rules", import.meta.url), "utf8")
  .replace('return ["__CORREOS_PERMITIDOS__"];', 'return ["denisse@example.com", "sergio@example.com", "otra@example.com"];');
const [host, port] = (process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080").split(":");
const env = await initializeTestEnvironment({ projectId: "demo-testb", firestore: { rules: reglas, host, port: +port } });

const cuenta = (uid, email, verificado = true) => env.authenticatedContext(uid, { email, email_verified: verificado }).firestore();
const denisse = cuenta("den", "Denisse@Example.com");
const sergio = cuenta("ser", "sergio@example.com");
const otra = cuenta("otr", "otra@example.com");          // permitida, pero Denisse no comparte con ella
const fuera = cuenta("fue", "fuera@example.com");        // no está en la lista de permitidos
const sinVerificar = cuenta("sv", "sergio@example.com", false);
const anonimo = env.unauthenticatedContext().firestore();

const resumen = (extra = {}) => Object.assign({ v: 1, nombre: "Denisse", companeros: ["sergio@example.com"], resumen: "{}", actualizado: serverTimestamp() }, extra);
const animo = (extra = {}) => Object.assign({ de: "ser", deNombre: "Sergio", para: "den", texto: "¡Ánimo!", creado: serverTimestamp(), leido: false }, extra);

let fallos = 0, n = 0;
async function caso(nombre, f) {
  n++;
  try { await f(); console.log("ok  ", nombre); }
  catch (e) { fallos++; console.log("FALLO", nombre, "\n     ", e.message.split("\n")[0]); }
}
const comp = db => doc(db, "compartidos", "den");

// ---------- usuarios ----------
await caso("Denisse guarda su progreso", () => assertSucceeds(setDoc(doc(denisse, "usuarios", "den"), { v: 2, datos: "{}", animo: null, actualizado: serverTimestamp() })));
await caso("Sergio no lee el progreso de Denisse", () => assertFails(getDoc(doc(sergio, "usuarios", "den"))));
await caso("Sergio no escribe el progreso de Denisse", () => assertFails(setDoc(doc(sergio, "usuarios", "den"), { v: 2, datos: "{}", animo: null, actualizado: serverTimestamp() })));

// ---------- compartidos: antes de compartir ----------
await caso("Sergio no lee un resumen que no existe", () => assertFails(getDoc(comp(sergio))));
await caso("Sergio no puede crear el resumen de Denisse", () => assertFails(setDoc(comp(sergio), resumen())));
await caso("No se comparte con una misma", () => assertFails(setDoc(comp(denisse), resumen({ companeros: ["denisse@example.com"] }))));
await caso("No se comparte con una lista vacía", () => assertFails(setDoc(comp(denisse), resumen({ companeros: [] }))));
await caso("Máximo 5 compañeros", () => assertFails(setDoc(comp(denisse), resumen({ companeros: ["a@x.es", "b@x.es", "c@x.es", "d@x.es", "e@x.es", "f@x.es"] }))));
await caso("Campos extra no", () => assertFails(setDoc(comp(denisse), resumen({ datos: "x" }))));
await caso("Resumen demasiado grande no", () => assertFails(setDoc(comp(denisse), resumen({ resumen: "x".repeat(20000) }))));
await caso("Hora del servidor obligatoria", () => assertFails(setDoc(comp(denisse), resumen({ actualizado: Timestamp.fromMillis(0) }))));
await caso("Una cuenta no permitida no comparte", () => assertFails(setDoc(doc(fuera, "compartidos", "fue"), resumen({ companeros: ["sergio@example.com"], nombre: "X" }))));
await caso("Sergio no manda ánimos si no le comparten", () => assertFails(addDoc(collection(sergio, "animos"), animo())));

// ---------- compartidos: Denisse comparte con Sergio ----------
await caso("Denisse comparte con Sergio", () => assertSucceeds(setDoc(comp(denisse), resumen())));
await caso("Denisse lee su resumen", () => assertSucceeds(getDoc(comp(denisse))));
await caso("Sergio lee el resumen", () => assertSucceeds(getDoc(comp(sergio))));
await caso("Sergio encuentra lo compartido con él", async () => {
  const r = await assertSucceeds(getDocs(query(collection(sergio, "compartidos"), where("companeros", "array-contains", "sergio@example.com"))));
  if (r.size !== 1) throw new Error("esperaba 1, hay " + r.size);
});
await caso("Sergio no puede listar todo", () => assertFails(getDocs(collection(sergio, "compartidos"))));
await caso("Sergio no busca con el correo de otra", () => assertFails(getDocs(query(collection(sergio, "compartidos"), where("companeros", "array-contains", "otra@example.com")))));
await caso("Sergio no cambia el resumen", () => assertFails(updateDoc(comp(sergio), { resumen: "{\"falso\":1}", actualizado: serverTimestamp() })));
await caso("Sergio no se añade a otra persona", () => assertFails(updateDoc(comp(sergio), { companeros: ["sergio@example.com", "otra@example.com"], actualizado: serverTimestamp() })));
await caso("Sergio no borra el resumen", () => assertFails(deleteDoc(comp(sergio))));
await caso("Otra cuenta permitida no lo lee", () => assertFails(getDoc(comp(otra))));
await caso("Una cuenta fuera de la lista no lo lee aunque esté en companeros", async () => {
  await assertSucceeds(updateDoc(comp(denisse), { companeros: ["sergio@example.com", "fuera@example.com"], actualizado: serverTimestamp() }));
  await assertFails(getDoc(comp(fuera)));
  await assertSucceeds(updateDoc(comp(denisse), { companeros: ["sergio@example.com"], actualizado: serverTimestamp() }));
});
await caso("Sin correo verificado no lo lee", () => assertFails(getDoc(comp(sinVerificar))));
await caso("Sin sesión no lo lee", () => assertFails(getDoc(comp(anonimo))));

// ---------- ánimos ----------
let idAnimo;
await caso("Sergio manda ánimos", async () => { idAnimo = (await assertSucceeds(addDoc(collection(sergio, "animos"), animo()))).id; });
await caso("Sergio no se hace pasar por otro", () => assertFails(addDoc(collection(sergio, "animos"), animo({ de: "otr" }))));
await caso("Texto vacío no", () => assertFails(addDoc(collection(sergio, "animos"), animo({ texto: "" }))));
await caso("Texto de más de 300 no", () => assertFails(addDoc(collection(sergio, "animos"), animo({ texto: "x".repeat(301) }))));
await caso("No se manda ya leído", () => assertFails(addDoc(collection(sergio, "animos"), animo({ leido: true }))));
await caso("Campos extra no", () => assertFails(addDoc(collection(sergio, "animos"), animo({ url: "x" }))));
await caso("Otra cuenta no manda ánimos a Denisse", () => assertFails(addDoc(collection(otra, "animos"), animo({ de: "otr" }))));
await caso("Denisse ve sus ánimos", async () => {
  const r = await assertSucceeds(getDocs(query(collection(denisse, "animos"), where("para", "==", "den"), where("leido", "==", false))));
  if (r.size !== 1) throw new Error("esperaba 1, hay " + r.size);
});
await caso("Sergio ve los que ha mandado", () => assertSucceeds(getDocs(query(collection(sergio, "animos"), where("de", "==", "ser"), where("para", "==", "den")))));
await caso("Otra cuenta no ve los ánimos de Denisse", () => assertFails(getDocs(query(collection(otra, "animos"), where("para", "==", "den")))));
await caso("Sergio no cambia el texto después", () => assertFails(updateDoc(doc(sergio, "animos", idAnimo), { texto: "otro" })));
await caso("Sergio no lo marca como leído", () => assertFails(updateDoc(doc(sergio, "animos", idAnimo), { leido: true })));
await caso("Denisse no cambia el texto", () => assertFails(updateDoc(doc(denisse, "animos", idAnimo), { texto: "otro" })));
await caso("Denisse lo marca como leído", () => assertSucceeds(updateDoc(doc(denisse, "animos", idAnimo), { leido: true })));

// ---------- dejar de compartir ----------
await caso("Denisse deja de compartir", () => assertSucceeds(deleteDoc(comp(denisse))));
await caso("Sergio ya no lee el resumen", () => assertFails(getDoc(comp(sergio))));
await caso("Sergio ya no manda ánimos", () => assertFails(addDoc(collection(sergio, "animos"), animo())));
await caso("Denisse conserva y puede borrar sus ánimos", () => assertSucceeds(deleteDoc(doc(denisse, "animos", idAnimo))));

await env.cleanup();
console.log(`\n${n - fallos} de ${n} pruebas correctas`);
process.exit(fallos ? 1 : 0);
