#!/usr/bin/env python3
"""Genera datos-piensa.js: un ejercicio «Piénsala antes» por cada pregunta verificada del banco que se puede
contestar sin ver las opciones. La pregunta se copia idéntica (comprobar.py lo exige).

Se queda fuera una pregunta si:
- el enunciado se apoya en las opciones («¿Cuál de las siguientes…?», «¿Qué afirmación…?», «es correcto», «señale»…),
- alguna opción remite a las demás («Todas», «Ninguna», «Ambas», «Las anteriores»…),
- el enunciado no es una pregunta cerrada con «?» (los que se completan con la opción),
- pregunta por algo abierto con «puede» («¿Qué puede indicar…?»: hay varias respuestas válidas sin las opciones),
- habla de una imagen y el ejercicio no la tendría,
- está en la lista EXCLUIDAS (revisión a mano),
- ya la usa otro ejercicio (`banco` o `de`) de prototipos/recordar o prototipos/ejercicios, en este árbol
  o en las ramas que se pasen como argumento (cada id del banco va en un solo ejercicio).

Uso:  python3 prototipos/recordar/generar_piensa.py [rama-git ...]"""
import glob, json, os, re, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.normpath(os.path.join(AQUI, "..", ".."))
SALIDA = os.path.join(AQUI, "datos-piensa.js")

NOMBRES_MATERIA = {}   # se rellena desde data/preguntas.js si trae los nombres

APOYA_EN_OPCIONES = re.compile(
    r"cu[aá]l(es)? de (las|los|estas|estos|ellas|ellos)|siguientes?\b|qu[eé] afirmaci|afirmaci[oó]n|"
    r"\b(es|son|será|serán) (correct|ciert|verdader|fals)|señale|indique|opci[oó]n|respuesta|anteriores|"
    r"qu[eé] (frase|enunciado)|qu[eé] importancia|cu[aá]l es (la|el) (correct|cierto|verdader|fals)", re.I)
REMITE = re.compile(r"\b(todas|ninguna|ambas|las dos|los dos|anteriores|respuestas|opci[oó]n)\b|\b[abc] y [abc]\b", re.I)
HABLA_DE_IMAGEN = re.compile(r"\best[ae]s? (señal|señales|imagen|marca|marcas|panel|semáforo|agente|figura|foto|esquema|dibujo|situaci[oó]n|vehículos?|escena)\b|"
                             r"\b(la|el|en la|en el) (imagen|figura|foto|esquema|dibujo|escena|ilustraci[oó]n)\b", re.I)
PUEDE_ABIERTA = re.compile(r"¿\s*(qu[eé]|cu[aá]l(es)?|d[oó]nde|cu[aá]ndo|c[oó]mo|qui[eé]n(es)?)\b[^?]*\bpued", re.I)

# Revisión a mano: preguntas que pasan el filtro pero sin opciones no tienen una respuesta única que pensar.
EXCLUIDAS = {
}


def banco_verificado():
    banco = {}
    for f in sorted(glob.glob(os.path.join(RAIZ, "preguntas", "banco-*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        for q in (d if isinstance(d, list) else d.get("preguntas", [])):
            if q.get("estado") == "verificada": banco[q["id"]] = q
    return banco


def publicado():
    js = subprocess.run(["node", "-e", "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.BANCO.preguntas))",
                         os.path.join(RAIZ, "data", "preguntas.js")], capture_output=True, text=True, check=True).stdout
    return {p["id"]: p for p in json.loads(js)}


CARGAR = """global.window={EJERCICIOS:[],EJERCICIOS_RECORDAR:[]};const fs=require('fs'),vm=require('vm');
for(const f of process.argv.slice(1)){try{vm.runInThisContext(fs.readFileSync(f,'utf8'))}catch(e){}}
const ids=[];for(const e of [...window.EJERCICIOS,...window.EJERCICIOS_RECORDAR]){
 if(!e||e.tipo==='piensa'&&String(e.id).startsWith('piensa-b-'))continue;
 if(e.banco)ids.push(e.banco);for(const i of [].concat(e.de||[]))ids.push(i)}
console.log(JSON.stringify(ids))"""


def usados(ramas):
    """Ids del banco que ya usan otros ejercicios (los generados por este script no cuentan)."""
    ficheros, tmp = [], os.path.join(AQUI, ".ramas-tmp")
    for carpeta in ("prototipos/recordar", "prototipos/ejercicios"):
        ficheros += sorted(glob.glob(os.path.join(RAIZ, carpeta, "datos*.js")))
    os.makedirs(tmp, exist_ok=True)
    for rama in ramas:
        lista = subprocess.run(["git", "-C", RAIZ, "ls-tree", "-r", "--name-only", rama, "prototipos/recordar", "prototipos/ejercicios"],
                               capture_output=True, text=True, check=True).stdout.split()
        for ruta in lista:
            if re.search(r"/datos[^/]*\.js$", ruta):
                destino = os.path.join(tmp, rama.replace("/", "_") + "__" + ruta.replace("/", "_"))
                open(destino, "w", encoding="utf-8").write(subprocess.run(["git", "-C", RAIZ, "show", f"{rama}:{ruta}"],
                                                                          capture_output=True, text=True, check=True).stdout)
                ficheros.append(destino)
    ids = json.loads(subprocess.run(["node", "-e", CARGAR, *ficheros], capture_output=True, text=True, check=True).stdout)
    for f in glob.glob(os.path.join(tmp, "*")): os.remove(f)
    os.rmdir(tmp)
    return set(ids)


TXT = "/mnt/project-files/fuentes/txt/"
_textos = {}
def cita_literal(f):
    """La misma prueba que comprobar.py: la cita, sin contar espacios, está tal cual en el texto de la norma."""
    if not _textos:
        src = open(os.path.join(AQUI, "comprobar.py"), encoding="utf-8").read()
        ficheros = eval(re.search(r"FICHEROS = (\{.*?\})\n", src, re.S).group(1))
        for n, fs in ficheros.items():
            _textos[n] = [re.sub(r"\s+", " ", open(os.path.join(TXT, x), encoding="utf-8").read()) for x in fs]
    c = re.sub(r"\s+", " ", f["cita"]).strip()
    return any(c in t for t in _textos.get(f["norma"], []))


def motivo(q, pub):
    e = q["enunciado"].strip()
    if APOYA_EN_OPCIONES.search(e): return "se apoya en las opciones"
    if any(REMITE.search(o) for o in q["opciones"].values()): return "una opción remite a las demás"
    if not e.endswith("?"): return "no es una pregunta cerrada"
    if PUEDE_ABIERTA.search(e): return "abierta con «puede»"
    if HABLA_DE_IMAGEN.search(e) and not q.get("imagen"): return "habla de una imagen que no tendría"
    if pub.get("imagen") and not q.get("imagen"): return "la web le pone una imagen que no está en el banco"
    if not cita_literal(q["fuente"]): return "cita con elisiones o sin texto literal que comprobar"
    if q["id"] in EXCLUIDAS: return "revisión a mano: " + EXCLUIDAS[q["id"]]
    return None


def ejercicio(q):
    e = {"id": "piensa-b-" + q["id"], "tipo": "piensa", "materia": q["materia"], "titulo": q["enunciado"],
         "banco": q["id"], "de": [q["id"]], "enunciado": q["enunciado"], "opciones": list(q["opciones"].values()),
         "correcta": "abc".index(q["correcta"]), "porque": q["explicacion"],
         "fuente": {k: q["fuente"][k] for k in ("norma", "articulo", "url", "cita") if k in q["fuente"]}}
    if q.get("imagen"): e["imagen"] = q["imagen"]
    return e


def main():
    banco, pub, ya = banco_verificado(), publicado(), usados(sys.argv[1:])
    fuera, dentro = {}, []
    for i, q in banco.items():
        if i not in pub: m = "no publicada"
        elif i in ya: m = "la usa otro ejercicio"
        else: m = motivo(q, pub[i])
        if m: fuera[m] = fuera.get(m, 0) + 1
        else: dentro.append(q)
    dentro.sort(key=lambda q: (q["materia"], q["id"]))
    cuerpo = ",\n".join("  " + json.dumps(ejercicio(q), ensure_ascii=False) for q in dentro)
    open(SALIDA, "w", encoding="utf-8").write(
        "/* Ejercicios «Piénsala antes» enganchados a preguntas del banco. Formato en la cabecera de datos.js.\n"
        "   GENERADO por generar_piensa.py (no editar a mano: cambiar el filtro o EXCLUIDAS y volver a generar).\n"
        f"   {len(dentro)} preguntas verificadas que se pueden contestar sin ver las opciones, copiadas idénticas del banco.\n"
        "   Cómo usa el camino la seguridad declarada: ver SEGURIDAD-REPASO.md. */\n"
        "window.EJERCICIOS_RECORDAR.push(\n" + cuerpo + "\n);\n")
    print(len(dentro), "ejercicios.", "Fuera:", json.dumps(fuera, ensure_ascii=False))


if __name__ == "__main__":
    main()
