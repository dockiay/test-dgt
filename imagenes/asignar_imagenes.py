#!/usr/bin/env python3
"""Pone imagen a preguntas existentes a partir de preguntas/imagenes-nuevas-ids.json.

Solo toca los campos "imagen" e "imagen_requerida" de cada pregunta; enunciado, opciones,
respuesta y explicación no se modifican. El texto alternativo y el crédito salen de
imagenes/indice.json (o, para los esquemas, de la lista ESQUEMAS de la plantilla).

Uso:  python3 imagenes/asignar_imagenes.py [--comprobar]
"""
import glob
import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIPO_REQ = {"senal": "senal", "marca_vial": "marca_vial", "foto_boe": "foto", "figura_boe": "foto", "foto_libre": "foto", "esquema": "esquema"}


def main():
    comprobar = "--comprobar" in sys.argv
    lista = json.load(open(os.path.join(RAIZ, "preguntas", "imagenes-nuevas-ids.json"), encoding="utf-8"))
    indice = {i["src"]: i for i in json.load(open(os.path.join(RAIZ, "imagenes", "indice.json"), encoding="utf-8"))["imagenes"]}
    # los esquemas nuevos pueden no estar aún en indice.json: se leen de la plantilla
    import importlib.util
    spec = importlib.util.spec_from_file_location("plantilla", os.path.join(RAIZ, "imagenes", "esquemas", "plantilla_esquemas.py"))
    plantilla = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(plantilla)
    esquemas = list(plantilla.ESQUEMAS)
    # tandas en su propio fichero (no reescriben los SVG antiguos)
    import sys as _sys
    _sys.path.insert(0, os.path.join(RAIZ, "imagenes", "esquemas"))
    import esquemas_tanda4
    esquemas += esquemas_tanda4.ESQUEMAS_TANDA4
    for fichero, titulo, desc, _ in esquemas:
        indice.setdefault(f"img/esquemas/{fichero}", {"tipo": "esquema", "alt": desc, "credito": "Esquema propio del proyecto"})

    por_id = {e["id"]: e for e in lista["preguntas"]}
    hechos, errores = set(), []
    for f in sorted(glob.glob(os.path.join(RAIZ, "preguntas", "banco-*.json"))):
        texto = open(f, encoding="utf-8").read()
        datos = json.loads(texto)
        cambiado = False
        for p in datos["preguntas"]:
            e = por_id.get(p["id"])
            if not e:
                continue
            hechos.add(p["id"])
            src = e["src"]
            if src not in indice or not os.path.isfile(os.path.join(RAIZ, src)):
                errores.append(f"{p['id']}: no existe {src}")
                continue
            if p.get("imagen") and p["imagen"].get("src") not in (None, src):
                errores.append(f"{p['id']}: ya tenía otra imagen ({p['imagen'].get('src')})")
                continue
            info = indice[src]
            detalle = e.get("alt_detalle") or info.get("alt")
            credito = e.get("credito") or info.get("credito")
            nueva = {"src": src,
                     "alt": "Esquema de la pregunta" if info["tipo"] == "esquema" else "Imagen de la pregunta",
                     "alt_detalle": detalle, "credito": credito}
            req = {"tipo": TIPO_REQ[info["tipo"]], "codigo": info.get("codigo"), "descripcion": detalle}
            if p.get("imagen") != nueva or p.get("imagen_requerida") != req:
                p["imagen"], p["imagen_requerida"] = nueva, req
                cambiado = True
        if cambiado and not comprobar:
            salida = json.dumps(datos, ensure_ascii=False, indent=2) + ("\n" if texto.endswith("\n") else "")
            open(f, "w", encoding="utf-8").write(salida)
    errores += [f"{i}: no está en ningún banco" for i in por_id if i not in hechos]
    for e in errores:
        print("ERROR", e)
    print(f"{len(hechos)} preguntas con imagen asignada desde la lista")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
