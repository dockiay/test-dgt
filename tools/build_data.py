#!/usr/bin/env python3
"""Genera data/preguntas.js a partir de los bancos de preguntas verificadas.

Uso:  python3 tools/build_data.py [carpeta_de_bancos]
Por defecto lee preguntas/banco-*.json junto a la web (o ../preguntas/ si no existe).

Solo entra una pregunta si:
  - estado == "verificada"
  - tiene 3 opciones (a, b, c) y "correcta" es una de ellas
  - fuente.norma, fuente.articulo, fuente.url (BOE o DGT) y fuente.cita no están vacíos
  - su materia (1-16) se conoce (campo "materia" o tabla TEMA_A_MATERIA)
  - su id no está repetido
Las que no cumplen se listan y NO se publican. Si alguna falla, el script termina con código 1
(salvo --permitir-descartes), para que nada dudoso llegue a la web sin que nadie lo vea.
"""
import datetime, glob, json, os, shutil, sys

# Materias del anexo V.B.1 del Reglamento General de Conductores (RD 818/2009).
# Si una pregunta no trae "materia", se deduce de su "tema" con esta tabla.
TEMA_A_MATERIA = {
    "definiciones": 1, "velocidad": 1, "por_donde_circular": 1, "carriles_especiales": 1,
    "adelantamiento": 1, "prioridad": 1, "senales": 1, "luces": 1, "parada_estacionamiento": 1,
    "infracciones_sanciones": 1, "maniobras": 1, "alcohol_drogas": 4, "distancias": 5,
    "vias": 7, "documentacion": 10, "primeros_auxilios": 11, "carga": 12, "vehiculo": 14,
    "seguridad_pasiva": 15, "conduccion_eficiente": 16,
}
NORMAS_VALIDAS = {"CP", "ITV", "LRCSCVM", "LSV", "MANUAL_DGT", "OCURSOS", "RGC", "RGC_CATALOGO", "RGCOND", "RGCond", "RGV"}
URLS_OFICIALES = ("https://www.boe.es/", "https://www.dgt.es/", "https://sede.dgt.gob.es/")

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    permitir = "--permitir-descartes" in sys.argv
    aqui = os.path.dirname(os.path.abspath(__file__))
    web = os.path.dirname(aqui)
    if args:
        carpeta = args[0]
    elif os.path.isdir(os.path.join(web, "preguntas")):
        carpeta = os.path.join(web, "preguntas")
    else:
        carpeta = os.path.join(web, "..", "preguntas")
    ficheros = sorted(glob.glob(os.path.join(carpeta, "banco-*.json")))
    if not ficheros:
        sys.exit(f"No hay ficheros banco-*.json en {carpeta}")

    # Copia las imágenes preparadas (imagenes/ o ../imagenes/) a img/.
    origen_img = os.path.join(web, "imagenes")
    if not os.path.isdir(origen_img):
        origen_img = os.path.join(web, "..", "imagenes")
    if os.path.isdir(origen_img):
        for raiz, _, nombres in os.walk(origen_img):
            for nombre in nombres:
                if nombre.lower().endswith((".svg", ".png", ".webp", ".jpg", ".jpeg")):
                    rel = os.path.relpath(os.path.join(raiz, nombre), origen_img)
                    os.makedirs(os.path.dirname(os.path.join(web, "img", rel)), exist_ok=True)
                    shutil.copyfile(os.path.join(raiz, nombre), os.path.join(web, "img", rel))

    preguntas, normas, descartes, aplazadas, ids = [], {}, [], [], set()
    for f in ficheros:
        d = json.load(open(f, encoding="utf-8"))
        normas.update(d.get("normativa_consultada", {}))
        for p in d.get("preguntas", []):
            pid = p.get("id", "?")
            img = p.get("imagen")
            if isinstance(img, dict) and img.get("pendiente") is not None:
                aplazadas.append(f"{os.path.basename(f)} {pid}: imagen pendiente")
                continue
            fallo = validar(p, ids, web)
            if fallo:
                descartes.append(f"{os.path.basename(f)} {pid}: {fallo}")
                continue
            ids.add(pid)
            materia = p.get("materia") or TEMA_A_MATERIA[p["tema"]]
            preguntas.append({
                "id": pid, "tema": p["tema"], "subtema": p.get("subtema", ""), "materia": materia,
                "enunciado": p["enunciado"], "opciones": p["opciones"], "correcta": p["correcta"],
                "explicacion": p.get("explicacion", ""), "fuente": p["fuente"],
                "imagen": p.get("imagen"), "verificado_el": p.get("verificado_el", ""),
            })

    for x in aplazadas:
        print("APLAZADA", x)
    for x in descartes:
        print("DESCARTADA", x)
    salida = {
        "generado": datetime.date.today().isoformat(),
        "normativa": normas,
        "preguntas": preguntas,
    }
    destino = os.path.join(web, "data", "preguntas.js")
    with open(destino, "w", encoding="utf-8") as o:
        o.write("// Generado por tools/build_data.py. No editar a mano.\n")
        o.write("window.BANCO = ")
        json.dump(salida, o, ensure_ascii=False, indent=1)
        o.write(";\n")
    print(f"{len(preguntas)} preguntas publicadas en {destino}; {len(aplazadas)} aplazadas por imagen pendiente; {len(descartes)} descartadas.")
    if descartes and not permitir:
        sys.exit(1)

def validar(p, ids, web):
    if p.get("estado") != "verificada":
        return f"estado {p.get('estado')!r}"
    if p.get("id") in ids:
        return "id repetido"
    if not str(p.get("enunciado", "")).strip():
        return "sin enunciado"
    op = p.get("opciones") or {}
    if sorted(op.keys()) != ["a", "b", "c"] or not all(str(v).strip() for v in op.values()):
        return "opciones incompletas"
    if p.get("correcta") not in op:
        return "correcta no válida"
    f = p.get("fuente") or {}
    for k in ("norma", "articulo", "url", "cita"):
        if not str(f.get(k, "")).strip():
            return f"fuente sin {k}"
    if f["norma"] not in NORMAS_VALIDAS:
        return f"norma desconocida {f['norma']}"
    if not f["url"].startswith(URLS_OFICIALES):
        return "url de fuente fuera del BOE o la DGT"
    m = p.get("materia")
    if m is not None and not (isinstance(m, int) and 1 <= m <= 16):
        return "materia fuera de 1-16"
    if m is None and p.get("tema") not in TEMA_A_MATERIA:
        return f"tema {p.get('tema')!r} sin materia asignada"
    img = p.get("imagen")
    if img is not None and not (isinstance(img, dict) and img.get("src") and img.get("alt")):
        return "imagen sin src o alt"
    if img is not None and not os.path.isfile(os.path.join(web, img["src"])):
        return f"no existe el fichero de imagen {img['src']}"
    return None

if __name__ == "__main__":
    main()
