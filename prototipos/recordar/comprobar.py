#!/usr/bin/env python3
"""Comprueba el contenido de datos.js contra las fuentes:
- `fuente.cita` (o los trozos de `fuente.comprobar` si la cita junta varios) está literal en los textos.
- `fuente.catalogo`: el nombre de cada señal usada en las cartas coincide con el índice del catálogo del BOE.
- `banco`: enunciado, opciones, respuesta, explicación y cita son los de la pregunta verificada del banco.
Se compara ignorando espacios y saltos de línea.
Uso:  python3 prototipos/recordar/comprobar.py [carpeta de textos]"""
import glob, json, os, re, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.join(AQUI, "..", "..")
TXT = sys.argv[1] if len(sys.argv) > 1 else "/mnt/project-files/fuentes/txt/"
FICHEROS = {"RGC": ["rgc_full.txt", "rgc_full_layout.txt"], "RGC_CATALOGO": ["catalogo_ocr.txt"],
            "MANUAL_DGT": ["manual_dgt.txt", "manual_dgt_layout.txt"], "LSV": ["l.txt", "l_layout.txt"],
            "RGCOND": ["rgcond.txt", "rgcond_layout.txt"], "RGV": ["rgv.txt", "rgv_layout.txt"], "CP": ["cp.txt", "cp_layout.txt"],
            "ITV": ["itv.txt", "itv_layout.txt"], "LRCSCVM": ["lrcscvm.txt", "lrcscvm_layout.txt"], "OCURSOS": ["ocursos.txt", "ocursos_layout.txt"], "RSO": ["rso.txt", "rso_layout.txt"]}
norm = lambda t: re.sub(r"\s+", " ", t).strip()

DATOS = [os.path.join(AQUI, "datos.js")] + sorted(glob.glob(os.path.join(AQUI, "datos-*.js")))
js = subprocess.run(["node", "-e", "global.window={};for(const f of process.argv.slice(1))require(f);console.log(JSON.stringify(window.EJERCICIOS_RECORDAR))",
                     *DATOS], capture_output=True, text=True, check=True).stdout
banco = {}
for f in glob.glob(os.path.join(RAIZ, "preguntas", "banco-*.json")):
    d = json.load(open(f, encoding="utf-8"))
    for q in (d if isinstance(d, list) else d.get("preguntas", [])):
        if q.get("estado") == "verificada": banco[q["id"]] = q
indice = {}
ruta_indice = os.path.join(TXT, "..", "..", "imagenes", "indice.json")
if os.path.exists(ruta_indice):
    indice = {i["id"]: i for i in json.load(open(ruta_indice, encoding="utf-8"))["imagenes"]}

fallos = 0
def anota(ok, ej, que):
    global fallos; fallos += not ok
    print(("ok   " if ok else "FALTA"), ej, "·", norm(que)[:76])

for e in json.loads(js):
    f = e["fuente"]
    textos = [norm(open(os.path.join(TXT, n), encoding="utf-8").read()) for n in FICHEROS[f["norma"]]]
    if f["norma"] == "RGC_CATALOGO" and indice:   # el OCR del catálogo tiene erratas: vale también el índice revisado
        textos.append(norm(" ".join(f'{indice[c]["nombre"]} {indice[c]["definicion"]}' for c in f.get("catalogo", []) if c in indice)))
    for trozo in f.get("comprobar") or [f["cita"]]:
        anota(any(norm(trozo) in t for t in textos), e["id"], trozo)
    for c in e.get("cartas", []):
        if "senal" in c:
            anota(c["senal"] in indice and indice[c["senal"]]["nombre"] == c["nombre"], e["id"], f'{c["senal"]} = {c["nombre"]}')
            anota(os.path.exists(os.path.join(RAIZ, "img", "senales", c["senal"] + ".png")), e["id"], f'imagen {c["senal"]}')
    if e.get("banco"):
        q = banco.get(e["banco"])
        igual = bool(q) and q["enunciado"] == e["enunciado"] and list(q["opciones"].values()) == e["opciones"] \
            and "abc".index(q["correcta"]) == e["correcta"] and q["explicacion"] == e["porque"] and q["fuente"]["cita"] == f["cita"]
        anota(igual, e["id"], f'igual que {e["banco"]} del banco verificado')
    if e["tipo"] == "ysi":
        for p in e["pasos"]: anota(p["respuesta"] in e["opciones"], e["id"], f'respuesta {p["respuesta"]} entre las opciones')
    if e["tipo"] == "error": anota(e["bueno"] in e["arreglos"] and e["parte"] in e["trozos"][e["malo"]], e["id"], "arreglo y parte coherentes")
publicado = set(json.loads(subprocess.run(["node", "-e", "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.BANCO.preguntas.map(p=>p.id)))",
    os.path.join(RAIZ, "data", "preguntas.js")], capture_output=True, text=True, check=True).stdout))
vistos = {}
for e in json.loads(js):
    for i in ([e["de"]] if isinstance(e.get("de"), str) else e.get("de") or []):
        anota(i in publicado, e["id"], f"de {i} está en el banco publicado")
        if i in vistos: anota(False, e["id"], f"de {i} repetido (ya en {vistos[i]})")
        vistos[i] = e["id"]
print("Todo comprobado." if not fallos else f"{fallos} comprobaciones sin pasar.")
sys.exit(1 if fallos else 0)
