// Pruebas de firestore.rules con el emulador de Firestore.
// Uso (necesita Node y Java):
//   cd pruebas/reglas && npm install && npx firebase-tools@14.24.0 emulators:exec --only firestore --project demo-testb "node reglas.test.mjs"
// Sustituye la marca de la lista de correos por correos de prueba, como hace el workflow al publicar.
import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp, setLogLevel } from "firebase/firestore";
setLogLevel("silent"); // los rechazos esperados no ensucian la salida

const reglas = readFileSync(new URL("../../firestore.rules", import.meta.url), "utf8")
  .replace('return ["__CORREOS_PERMITIDOS__"];', 'return ["estudiante@example.com", "companero@example.com", "otra@example.com", "admin@example.com", "admin-fuera@example.com"];')
  .replace('return ["__CORREO_ADMIN__"];', 'return ["admin@example.com", "sinpermiso@example.com"];');
const [host, port] = (process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080").split(":");
const env = await initializeTestEnvironment({ projectId: "demo-testb", firestore: { rules: reglas, host, port: +port } });

const cuenta = (uid, email, verificado = true) => env.authenticatedContext(uid, { email, email_verified: verificado }).firestore();
const estudiante = cuenta("est", "Estudiante@Example.com");
const companero = cuenta("com", "companero@example.com");
const otra = cuenta("otr", "otra@example.com");          // permitida, pero Estudiante no comparte con ella
const fuera = cuenta("fue", "fuera@example.com");        // no está en la lista de permitidos
const sinVerificar = cuenta("sv", "companero@example.com", false);
const anonimo = env.unauthenticatedContext().firestore();
const admin = cuenta("adm", "Admin@Example.com");
const adminSinPermiso = cuenta("asp", "sinpermiso@example.com"); // administra, pero no está entre las permitidas

const resumen = (extra = {}) => Object.assign({ v: 1, nombre: "Estudiante", companeros: ["companero@example.com"], resumen: "{}", actualizado: serverTimestamp() }, extra);
const animo = (extra = {}) => Object.assign({ de: "com", deNombre: "Compañero", deCorreo: "companero@example.com", para: "est", texto: "¡Ánimo!", creado: serverTimestamp(), leido: false }, extra);

let fallos = 0, n = 0;
async function caso(nombre, f) {
  n++;
  try { await f(); console.log("ok  ", nombre); }
  catch (e) { fallos++; console.log("FALLO", nombre, "\n     ", e.message.split("\n")[0]); }
}
const comp = db => doc(db, "compartidos", "est");

// ---------- usuarios ----------
await caso("Estudiante guarda su progreso", () => assertSucceeds(setDoc(doc(estudiante, "usuarios", "est"), { v: 2, datos: "{}", animo: null, actualizado: serverTimestamp() })));
await caso("Compañero no lee el progreso de Estudiante", () => assertFails(getDoc(doc(companero, "usuarios", "est"))));
await caso("Compañero no escribe el progreso de Estudiante", () => assertFails(setDoc(doc(companero, "usuarios", "est"), { v: 2, datos: "{}", animo: null, actualizado: serverTimestamp() })));

// ---------- compartidos: antes de compartir ----------
await caso("Compañero no lee un resumen que no existe", () => assertFails(getDoc(comp(companero))));
await caso("Compañero no puede crear el resumen de Estudiante", () => assertFails(setDoc(comp(companero), resumen())));
await caso("No se comparte con una misma", () => assertFails(setDoc(comp(estudiante), resumen({ companeros: ["estudiante@example.com"] }))));
await caso("No se comparte con una lista vacía", () => assertFails(setDoc(comp(estudiante), resumen({ companeros: [] }))));
await caso("Máximo 5 compañeros", () => assertFails(setDoc(comp(estudiante), resumen({ companeros: ["a@x.es", "b@x.es", "c@x.es", "d@x.es", "e@x.es", "f@x.es"] }))));
await caso("Campos extra no", () => assertFails(setDoc(comp(estudiante), resumen({ datos: "x" }))));
await caso("Resumen demasiado grande no", () => assertFails(setDoc(comp(estudiante), resumen({ resumen: "x".repeat(20000) }))));
await caso("Hora del servidor obligatoria", () => assertFails(setDoc(comp(estudiante), resumen({ actualizado: Timestamp.fromMillis(0) }))));
await caso("Una cuenta no permitida no comparte", () => assertFails(setDoc(doc(fuera, "compartidos", "fue"), resumen({ companeros: ["companero@example.com"], nombre: "X" }))));
await caso("Compañero no manda ánimos si no le comparten", () => assertFails(addDoc(collection(companero, "animos"), animo())));

// ---------- compartidos: Estudiante comparte con Compañero ----------
await caso("Estudiante comparte con Compañero", () => assertSucceeds(setDoc(comp(estudiante), resumen())));
await caso("Estudiante lee su resumen", () => assertSucceeds(getDoc(comp(estudiante))));
await caso("Compañero lee el resumen", () => assertSucceeds(getDoc(comp(companero))));
await caso("Compañero encuentra lo compartido con él", async () => {
  const r = await assertSucceeds(getDocs(query(collection(companero, "compartidos"), where("companeros", "array-contains", "companero@example.com"))));
  if (r.size !== 1) throw new Error("esperaba 1, hay " + r.size);
});
await caso("Compañero no puede listar todo", () => assertFails(getDocs(collection(companero, "compartidos"))));
await caso("Compañero no busca con el correo de otra", () => assertFails(getDocs(query(collection(companero, "compartidos"), where("companeros", "array-contains", "otra@example.com")))));
await caso("Compañero no cambia el resumen", () => assertFails(updateDoc(comp(companero), { resumen: "{\"falso\":1}", actualizado: serverTimestamp() })));
await caso("Compañero no se añade a otra persona", () => assertFails(updateDoc(comp(companero), { companeros: ["companero@example.com", "otra@example.com"], actualizado: serverTimestamp() })));
await caso("Compañero no borra el resumen", () => assertFails(deleteDoc(comp(companero))));
await caso("Otra cuenta permitida no lo lee", () => assertFails(getDoc(comp(otra))));
await caso("Una cuenta fuera de la lista no lo lee aunque esté en companeros", async () => {
  await assertSucceeds(updateDoc(comp(estudiante), { companeros: ["companero@example.com", "fuera@example.com"], actualizado: serverTimestamp() }));
  await assertFails(getDoc(comp(fuera)));
  await assertSucceeds(updateDoc(comp(estudiante), { companeros: ["companero@example.com"], actualizado: serverTimestamp() }));
});
await caso("Sin correo verificado no lo lee", () => assertFails(getDoc(comp(sinVerificar))));
await caso("Sin sesión no lo lee", () => assertFails(getDoc(comp(anonimo))));

// ---------- ánimos ----------
let idAnimo;
await caso("Compañero manda ánimos", async () => { idAnimo = (await assertSucceeds(addDoc(collection(companero, "animos"), animo()))).id; });
await caso("Compañero no se hace pasar por otro", () => assertFails(addDoc(collection(companero, "animos"), animo({ de: "otr" }))));
await caso("Compañero no firma con el correo de otra", () => assertFails(addDoc(collection(companero, "animos"), animo({ deCorreo: "otra@example.com" }))));
await caso("Texto vacío no", () => assertFails(addDoc(collection(companero, "animos"), animo({ texto: "" }))));
await caso("Texto de más de 300 no", () => assertFails(addDoc(collection(companero, "animos"), animo({ texto: "x".repeat(301) }))));
await caso("No se manda ya leído", () => assertFails(addDoc(collection(companero, "animos"), animo({ leido: true }))));
await caso("Campos extra no", () => assertFails(addDoc(collection(companero, "animos"), animo({ url: "x" }))));
await caso("Otra cuenta no manda ánimos a Estudiante", () => assertFails(addDoc(collection(otra, "animos"), animo({ de: "otr" }))));
await caso("Estudiante ve sus ánimos", async () => {
  const r = await assertSucceeds(getDocs(query(collection(estudiante, "animos"), where("para", "==", "est"), where("leido", "==", false))));
  if (r.size !== 1) throw new Error("esperaba 1, hay " + r.size);
});
await caso("Compañero ve los que ha mandado", () => assertSucceeds(getDocs(query(collection(companero, "animos"), where("de", "==", "com"), where("para", "==", "est")))));
await caso("Otra cuenta no ve los ánimos de Estudiante", () => assertFails(getDocs(query(collection(otra, "animos"), where("para", "==", "est")))));
await caso("Compañero no cambia el texto después", () => assertFails(updateDoc(doc(companero, "animos", idAnimo), { texto: "otro" })));
await caso("Compañero no lo marca como leído", () => assertFails(updateDoc(doc(companero, "animos", idAnimo), { leido: true })));
await caso("Estudiante no cambia el texto", () => assertFails(updateDoc(doc(estudiante, "animos", idAnimo), { texto: "otro" })));
await caso("Estudiante lo marca como leído", () => assertSucceeds(updateDoc(doc(estudiante, "animos", idAnimo), { leido: true })));

// ---------- dejar de compartir ----------
await caso("Actualizar el resumen desde otro dispositivo respeta una retirada parcial", async () => {
  await assertSucceeds(updateDoc(comp(estudiante), { companeros: ["otra@example.com"], actualizado: serverTimestamp() }));
  await assertSucceeds(updateDoc(comp(estudiante), { resumen: "{\"avance\":1}", actualizado: serverTimestamp() }));
  await assertSucceeds(getDoc(comp(otra)));
  await assertFails(getDoc(comp(companero)));
});
await caso("Estudiante deja de compartir", () => assertSucceeds(deleteDoc(comp(estudiante))));
await caso("Un guardado atrasado no vuelve a crear un resumen borrado", () => assertFails(updateDoc(comp(estudiante), { resumen: "{}", actualizado: serverTimestamp() })));
await caso("Compañero ya no lee el resumen", () => assertFails(getDoc(comp(companero))));
await caso("Compañero ya no manda ánimos", () => assertFails(addDoc(collection(companero, "animos"), animo())));
await caso("Estudiante conserva y puede borrar sus ánimos", () => assertSucceeds(deleteDoc(doc(estudiante, "animos", idAnimo))));

// ---------- fichas y administración ----------
const ficha = (extra = {}) => Object.assign({ v: 1, nombre: "Estudiante", correo: "estudiante@example.com", alta: serverTimestamp(), visto: serverTimestamp() }, extra);
const fi = (db, uid = "est") => doc(db, "fichas", uid);
await caso("Estudiante crea su ficha", () => assertSucceeds(setDoc(fi(estudiante), ficha())));
await caso("Ficha con el correo de otra no", () => assertFails(setDoc(doc(otra, "fichas", "otr"), ficha({ correo: "estudiante@example.com" }))));
await caso("Ficha de otra persona no", () => assertFails(setDoc(fi(otra), ficha({ correo: "otra@example.com" }))));
await caso("Ficha con alta inventada no", () => assertFails(setDoc(doc(otra, "fichas", "otr"), ficha({ correo: "otra@example.com", alta: Timestamp.fromMillis(0) }))));
await caso("Ficha con campos extra no", () => assertFails(setDoc(doc(otra, "fichas", "otr"), ficha({ correo: "otra@example.com", rol: "admin" }))));
await caso("Al actualizar la ficha el alta no cambia", async () => {
  const antes = (await getDoc(fi(estudiante))).data().alta;
  await assertFails(setDoc(fi(estudiante), ficha({ alta: serverTimestamp() })));
  await assertSucceeds(setDoc(fi(estudiante), ficha({ alta: antes, nombre: "Estudiante B" })));
});
await caso("Una cuenta no permitida no crea ficha", () => assertFails(setDoc(doc(fuera, "fichas", "fue"), ficha({ correo: "fuera@example.com" }))));
await caso("Admin lista las fichas", () => assertSucceeds(getDocs(collection(admin, "fichas"))));
await caso("Admin lista el progreso de todas las cuentas", () => assertSucceeds(getDocs(collection(admin, "usuarios"))));
await caso("Admin lee el progreso de Estudiante", () => assertSucceeds(getDoc(doc(admin, "usuarios", "est"))));
await caso("Admin no cambia el progreso de Estudiante", () => assertFails(setDoc(doc(admin, "usuarios", "est"), { v: 2, datos: "{}", animo: null, actualizado: serverTimestamp() })));
await caso("Admin no borra el progreso de Estudiante", () => assertFails(deleteDoc(doc(admin, "usuarios", "est"))));
await caso("Admin no cambia la ficha de Estudiante", () => assertFails(setDoc(fi(admin), ficha())));
await caso("Admin no borra la ficha de Estudiante", () => assertFails(deleteDoc(fi(admin))));
await caso("Admin no lee resúmenes que no le comparten", () => assertFails(getDocs(collection(admin, "compartidos"))));
await caso("Estudiante no lista las fichas", () => assertFails(getDocs(collection(estudiante, "fichas"))));
await caso("Estudiante no lista el progreso de todas", () => assertFails(getDocs(collection(estudiante, "usuarios"))));
await caso("Compañero no lee la ficha de Estudiante", () => assertFails(getDoc(fi(companero))));
await caso("Admin fuera de la lista de permitidas no lee nada", () => assertFails(getDocs(collection(adminSinPermiso, "usuarios"))));
await caso("Sin sesión no se listan fichas", () => assertFails(getDocs(collection(anonimo, "fichas"))));
await caso("Estudiante borra su ficha", () => assertSucceeds(deleteDoc(fi(estudiante))));

await env.cleanup();
console.log(`\n${n - fallos} de ${n} pruebas correctas`);
process.exit(fallos ? 1 : 0);
