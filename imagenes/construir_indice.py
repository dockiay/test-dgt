#!/usr/bin/env python3
"""Construye imagenes/indice.json e imagenes/INDICE.md a partir de:
  - senales/catalogo_ocr.json  (salida de senales/extraer_catalogo_boe.py, ya revisada)
  - esquemas/plantilla_esquemas.py (lista ESQUEMAS)
  - figuras-boe/ (figuras del anexo I del RGC, descritas abajo)

Uso: python3 construir_indice.py
"""
import importlib.util
import json
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))
HOY = "2026-11-24"

FUENTE_RGC = {
    "norma": "Reglamento General de Circulación (RD 1428/2003), anexo I",
    "ref": "BOE-A-2003-23514",
    "version_consultada": "2026-06-26",
    "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514",
    "pdf_local": "fuentes/BOE-A-2003-23514-Reglamento-General-Circulacion-consolidado.pdf",
}
LICENCIA_BOE = ("Dominio público: forma parte del texto de una disposición reglamentaria publicada en el BOE, "
                "excluida de la propiedad intelectual (art. 13 del Texto Refundido de la Ley de Propiedad Intelectual, "
                "RDLeg 1/1996). Reutilización citando la fuente (BOE).")
CREDITO_BOE = "Catálogo oficial de señales, anexo I del Reglamento General de Circulación (BOE-A-2003-23514)"

GRUPOS = [
    ("P", 1, 50, "Señales de advertencia de peligro"),
    ("R", 1, 6, "Señales de prioridad"),
    ("R", 100, 120, "Señales de prohibición de entrada"),
    ("R", 200, 205, "Señales de restricción de paso"),
    ("R", 300, 310, "Otras señales de prohibición o restricción"),
    ("R", 400, 422, "Señales de obligación"),
    ("R", 500, 516, "Señales de fin de prohibición, restricción u obligación"),
    ("S", 1, 49, "Señales de indicaciones generales"),
    ("S", 50, 73, "Señales de carriles"),
    ("S", 100, 129, "Señales de servicio"),
    ("S", 200, 271, "Señales de preseñalización"),
    ("S", 300, 380, "Señales de dirección"),
    ("S", 400, 450, "Señales de identificación de carreteras"),
    ("S", 500, 575, "Señales de localización"),
    ("S", 600, 603, "Señales de confirmación"),
    ("S", 700, 770, "Señales de uso específico en poblado"),
    ("S", 800, 892, "Paneles complementarios"),
    ("S", 900, 993, "Otras señales"),
]

FIGURAS = {
    "anexoI-pag071-000.jpg": ("Señales de los agentes de la autoridad con el brazo, la luz y el silbato", "1.1"),
    "anexoI-pag072-001.jpg": ("Señales de los agentes con banderas y desde vehículos (luz roja de vehículo policial, ejemplos de regulación del paso)", "1.1 y 1.2"),
    "anexoI-pag075-002.jpg": ("Señalización circunstancial: conos, paneles, dispositivos delimitadores, luces", "2"),
    "anexoI-pag077-003.jpg": ("Elementos de balizamiento: hitos, balizas, captafaros, paneles", "3.1"),
    "anexoI-pag078-004.jpg": ("Otros elementos de balizamiento (balizamiento luminoso, jalones de nieve, guías sonoras)", "3.1.3"),
    "anexoI-pag078-005.jpg": ("Señales de balizamiento (manga de viento, pórtico de gálibo)", "3.1.4"),
    "anexoI-pag079-006.jpg": ("Baliza o captafaro horizontal luminoso", "3.1.4"),
    "anexoI-pag080-007.jpg": ("Sistemas de contención de vehículos (barreras, pretiles, atenuadores)", "3.2"),
    "anexoI-pag081-008.jpg": ("Semáforos reservados para peatones", "4.1"),
    "anexoI-pag082-009.jpg": ("Semáforos circulares para vehículos", "4.2"),
    "anexoI-pag083-010.jpg": ("Semáforos cuadrados o de carril", "4.3"),
    "anexoI-pag084-011.jpg": ("Semáforos reservados a determinados vehículos (ciclos, tranvías y autobuses)", "4.4"),
}


def grupo(codigo):
    m = re.match(r"([PRS])-(\d+)", codigo)
    if not m:
        return None
    letra, n = m.group(1), int(m.group(2))
    for l, a, b, nombre in GRUPOS:
        if l == letra and a <= n <= b:
            return nombre
    return None


def main():
    entradas = []
    cat = json.load(open(os.path.join(AQUI, "senales", "catalogo_ocr.json"), encoding="utf-8"))
    for r in cat:
        if r.get("descartar"):
            continue
        cod = r["codigo"]
        nombre = r.get("nombre") or r["nombre_ocr"]
        entradas.append({
            "id": cod,
            "tipo": "senal",
            "src": f"img/senales/{r['fichero']}",
            "codigo": cod,
            "grupo": grupo(cod),
            "nombre": nombre,
            "definicion": r.get("definicion") or r["texto_ocr"],
            "alt": f"Señal {cod}: {nombre}",
            "credito": f"{CREDITO_BOE}, pág. {r['pagina_pdf']} del PDF consolidado",
            "fuente": dict(FUENTE_RGC, apartado="5.1 Catálogo de señales verticales, tomo I", pagina_pdf=r["pagina_pdf"]),
            "licencia": LICENCIA_BOE,
            "formato": "png",
            "px": r["px"],
            "texto_revisado": r.get("texto_revisado", False),
        })
    for fichero, (desc, apartado) in FIGURAS.items():
        if not os.path.exists(os.path.join(AQUI, "figuras-boe", fichero)):
            continue
        pag = int(re.search(r"pag(\d+)", fichero).group(1))
        entradas.append({
            "id": fichero.rsplit(".", 1)[0],
            "tipo": "figura_boe",
            "src": f"img/figuras-boe/{fichero}",
            "nombre": desc,
            "alt": desc,
            "credito": f"Anexo I del Reglamento General de Circulación (BOE-A-2003-23514), apartado {apartado}",
            "fuente": dict(FUENTE_RGC, apartado=apartado, pagina_pdf=pag),
            "licencia": LICENCIA_BOE,
            "formato": "jpg",
            "nota": "Lámina completa con varios elementos; recortar si una pregunta necesita solo uno.",
        })
    spec = importlib.util.spec_from_file_location("plantilla", os.path.join(AQUI, "esquemas", "plantilla_esquemas.py"))
    plantilla = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(plantilla)
    for fichero, titulo, desc, _ in plantilla.ESQUEMAS:
        entradas.append({
            "id": fichero.rsplit(".", 1)[0],
            "tipo": "esquema",
            "src": f"img/esquemas/{fichero}",
            "nombre": titulo,
            "alt": desc,
            "credito": "Esquema propio del proyecto",
            "fuente": {"norma": "Dibujo propio generado con esquemas/plantilla_esquemas.py"},
            "licencia": "Propia del proyecto (sin derechos de terceros)",
            "formato": "svg",
        })
    with open(os.path.join(AQUI, "indice.json"), "w", encoding="utf-8") as f:
        json.dump({"version": 1, "generado": HOY, "imagenes": entradas}, f, ensure_ascii=False, indent=1)

    # versión legible
    lineas = ["# Índice de imágenes", "",
              f"Generado el {HOY} con `construir_indice.py`. El fichero de datos es `indice.json`.", "",
              "## Origen y licencia", "",
              f"- **Señales** (`senales/`): recortadas del {CREDITO_BOE}, versión consolidada del 26/06/2026. " + LICENCIA_BOE,
              "- **Figuras del BOE** (`figuras-boe/`): láminas del mismo anexo I (agentes, balizamiento, semáforos). Misma licencia.",
              "- **Esquemas** (`esquemas/`): dibujos propios en SVG, hechos con `esquemas/plantilla_esquemas.py`.",
              "- No se usan imágenes de los tests de la DGT ni de webs comerciales.", ""]
    por_tipo = {}
    for e in entradas:
        por_tipo.setdefault(e["tipo"], []).append(e)
    titulos = {"senal": "Señales", "figura_boe": "Figuras del anexo I", "esquema": "Esquemas propios"}
    for t in ("senal", "figura_boe", "esquema"):
        es = por_tipo.get(t, [])
        lineas += [f"## {titulos[t]} ({len(es)})", ""]
        if t == "senal":
            g_actual = None
            for e in es:
                if e["grupo"] != g_actual:
                    g_actual = e["grupo"]
                    lineas += ["", f"### {g_actual}", "", "| Código | Nombre | Fichero | Pág. PDF |", "|---|---|---|---|"]
                lineas.append(f"| {e['codigo']} | {e['nombre']} | `{e['src'][4:]}` | {e['fuente']['pagina_pdf']} |")
            lineas.append("")
        else:
            lineas += ["| Fichero | Qué muestra | Fuente |", "|---|---|---|"]
            for e in es:
                lineas.append(f"| `{e['src'][4:]}` | {e['alt']} | {e['credito']} |")
            lineas.append("")
    with open(os.path.join(AQUI, "INDICE.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lineas) + "\n")
    print(len(entradas), "entradas")


if __name__ == "__main__":
    main()
