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
HOY = "2026-11-25"

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

RGC = "Anexo I del Reglamento General de Circulación (BOE-A-2003-23514)"
FOTOS_BOE = {
    "agente-brazo-levantado.jpg": ("Agente con un brazo levantado verticalmente", RGC, "1.1", 71),
    "agente-brazo-arriba-abajo.jpg": ("Agente con un brazo extendido que mueve alternativamente de arriba abajo", RGC, "1.1", 71),
    "agente-moto-bandera-roja.jpg": ("Agente en motocicleta mostrando una bandera roja", RGC, "1.1", 72),
    "regulacion-paso-paletas.jpg": ("Paletas para regular el paso: una con la señal de entrada prohibida y otra con la de sentido obligatorio", RGC, "1.1", 72),
    "conos.jpg": ("Hilera de conos sobre la calzada", RGC, "2", 75),
    "panel-direccional-provisional.jpg": ("Panel direccional provisional de franjas rojas y blancas", RGC, "2", 75),
    "panel-direccional-permanente.jpg": ("Panel direccional permanente azul y blanco en el borde de la carretera", RGC, "3.1.2", 77),
    "semaforo-flecha-negra.jpg": ("Semáforo con una flecha negra sobre la luz encendida", RGC, "4.2", 82),
    "semaforo-flecha-verde.jpg": ("Semáforo con la luz roja encendida y un módulo con una flecha verde iluminada", RGC, "4.2", 82),
    "semaforos-carril-aspa-flecha.jpg": ("Pórtico con semáforos de carril: aspa roja y flecha verde hacia abajo", RGC, "4.3", 83),
    "semaforo-carril-flecha-oblicua.jpg": ("Semáforo de carril con una flecha oblicua iluminada hacia abajo", RGC, "4.3", 83),
    "semaforos-ciclos.jpg": ("Semáforos con la silueta de una bicicleta en las luces", RGC, "4.4", 84),
    "V-26.jpg": ("Distintivo circular azul con un turismo y varias personas", "Anexo XI del Reglamento General de Vehículos (BOE-A-1999-1826)", "V-26", 127),
    "hitos-vertice.jpg": ("Dos hitos de vértice: piezas semicilíndricas, una verde y otra azul, con un rombo blanco", RGC, "3", 77),
    "hitos-arista.jpg": ("Dos hitos de arista: postes blancos con una franja negra y elementos reflectantes", RGC, "3", 77),
}

# Fotos e ilustraciones de Wikimedia Commons con licencia libre (comprobadas una a una el 25/11/2026).
# fichero: (descripción, título en Commons, autor, licencia, url de la licencia)
FOTOS_LIBRES = {
    "neumatico-dibujo-twi.jpg": ("Banda de rodadura de un neumático de turismo: ranuras del dibujo y, en el fondo de una ranura, el resalte del indicador de desgaste; abajo, la marca TWI",
                                 "Autoreifen mit Verschleißanzeige.JPG", "Quallyptus", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/"),
    "chaleco-reflectante.jpg": ("Chaleco amarillo de alta visibilidad con dos bandas reflectantes",
                                "Warnweste gelb.jpg", "Magnus Mertens", "CC BY-SA 2.0 DE", "https://creativecommons.org/licenses/by-sa/2.0/de/"),
    "silla-infantil.jpg": ("Sistema de retención infantil (silla) para el coche, con arnés de cinco puntos",
                           "Child car seat.JPG", "Cschirp", "CC BY-SA 2.5", "https://creativecommons.org/licenses/by-sa/2.5/"),
    "reposacabezas.jpg": ("Asiento delantero de un turismo con su reposacabezas",
                          "Car head restraint.jpg", "Santeri Viinamäki", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"),
    "silla-nino-bicicleta.jpg": ("Asiento adicional para un niño montado en una bicicleta, con arnés",
                                 "Child Bicycle Seat.JPG", "Xanor", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/"),
    "tractor-agricola.jpg": ("Tractor agrícola en una calle de Lugo",
                             "Deutz tractor in Lugo 1.jpg", "Certo Xornal", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0/"),
    "varilla-aceite.jpg": ("Varilla del nivel de aceite del motor, recién sacada y apoyada en un papel",
                           "Engine oil dipstick reading level.JPG", "Dvortygirl", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"),
    "rcp-manos.jpg": ("Dibujo de la colocación de las manos, una sobre otra, en el centro del pecho para las compresiones torácicas",
                      "Chest-compression-hand-placement.jpg", "Another-anon-artist-234", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/"),
    "cadenas-nieve.jpg": ("Persona colocando cadenas metálicas para nieve en una rueda",
                          "Snow chains on tires, Oregon.jpg", "Oregon Department of Transportation", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0/"),
    "simbolo-3pmsf.jpg": ("Símbolo de una montaña de tres picos con un copo de nieve (3PMSF)",
                          "3PMSF.svg", "Grummelbacke", "Dominio público", None),
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
    mpath = os.path.join(AQUI, "marcas", "marcas_ocr.json")
    for r in (json.load(open(mpath, encoding="utf-8")) if os.path.exists(mpath) else []):
        cod = r["codigo"]
        entradas.append({
            "id": cod,
            "tipo": "marca_vial",
            "src": f"img/marcas/{r['fichero']}",
            "codigo": cod,
            "nombre": f"Marca vial {cod}",
            "definicion": r["texto_ocr"],
            "alt": f"Marca vial {cod} (plano oficial con medidas)",
            "credito": f"Catálogo de marcas viales, anexo I del Reglamento General de Circulación (BOE-A-2003-23514), pág. {r['pagina_pdf']} del PDF consolidado",
            "fuente": dict(FUENTE_RGC, apartado="5.2 Catálogo de marcas viales", pagina_pdf=r["pagina_pdf"]),
            "licencia": LICENCIA_BOE,
            "formato": "png",
            "px": r["px"],
            "texto_revisado": False,
            "nota": "Plano técnico del catálogo (geometría y medidas). Para preguntas de situación conviene un esquema propio.",
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
    for fichero, (desc, norma, apartado, pag) in FOTOS_BOE.items():
        if not os.path.exists(os.path.join(AQUI, "fotos-boe", fichero)):
            continue
        es_rgv = "Vehículos" in norma
        fuente = ({"norma": "Reglamento General de Vehículos (RD 2822/1998), anexo XI", "ref": "BOE-A-1999-1826",
                   "url": "https://www.boe.es/buscar/act.php?id=BOE-A-1999-1826", "pagina_pdf": pag,
                   "pdf_local": "fuentes/BOE-A-1999-1826-Reglamento-General-Vehiculos-consolidado.pdf"}
                  if es_rgv else dict(FUENTE_RGC, apartado=apartado, pagina_pdf=pag))
        entradas.append({
            "id": fichero.rsplit(".", 1)[0],
            "tipo": "foto_boe",
            "src": f"img/fotos-boe/{fichero}",
            "nombre": desc,
            "alt": desc,
            "credito": f"{norma}, apartado {apartado}" if not es_rgv else f"{norma}, señal {apartado}",
            "fuente": fuente,
            "licencia": LICENCIA_BOE,
            "formato": "jpg",
        })
    for fichero, (desc, titulo, autor, licencia, url_lic) in FOTOS_LIBRES.items():
        if not os.path.exists(os.path.join(AQUI, "fotos-libres", fichero)):
            continue
        pagina = "https://commons.wikimedia.org/wiki/File:" + titulo.replace(" ", "_")
        entradas.append({
            "id": fichero.rsplit(".", 1)[0],
            "tipo": "foto_libre",
            "src": f"img/fotos-libres/{fichero}",
            "nombre": desc,
            "alt": desc,
            "credito": f"Foto: {autor}, Wikimedia Commons, {licencia}" if licencia != "Dominio público"
                       else f"Imagen: {autor}, Wikimedia Commons, dominio público",
            "fuente": {"origen": "Wikimedia Commons", "url": pagina, "autor": autor, "consultado": "2026-11-25"},
            "licencia": licencia + (f" ({url_lic})" if url_lic else "") + ". Reducida y, en su caso, recortada.",
            "formato": "jpg",
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
            "credito": "Esquema propio del proyecto" + ("; incluye señales del Catálogo oficial (anexo I del RGC, BOE-A-2003-23514)"
                                                         if "data:image/png" in open(os.path.join(AQUI, "esquemas", fichero), encoding="utf-8").read() else ""),
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
              "- **Marcas viales** (`marcas/`): planos del Catálogo de marcas viales del mismo anexo I (apartado 5.2). Misma licencia.",
              "- **Figuras del BOE** (`figuras-boe/`): láminas del mismo anexo I (agentes, balizamiento, semáforos). Misma licencia.",
              "- **Fotos del BOE** (`fotos-boe/`): recortes de las láminas del anexo I del RGC y del anexo XI del Reglamento General de Vehículos (BOE-A-1999-1826). Misma licencia.",
              "- **Fotos libres** (`fotos-libres/`): fotos e ilustraciones de Wikimedia Commons con licencia CC0, dominio público, CC BY o CC BY-SA; cada entrada lleva autor, licencia y enlace a la ficha, y el crédito se muestra en la web.",
              "- **Esquemas** (`esquemas/`): dibujos propios en SVG, hechos con `esquemas/plantilla_esquemas.py`.",
              "- No se usan imágenes de los tests de la DGT ni de webs comerciales.", ""]
    por_tipo = {}
    for e in entradas:
        por_tipo.setdefault(e["tipo"], []).append(e)
    titulos = {"senal": "Señales", "marca_vial": "Marcas viales", "foto_boe": "Fotos recortadas del BOE", "figura_boe": "Figuras del anexo I", "foto_libre": "Fotos libres (Wikimedia Commons)", "esquema": "Esquemas propios"}
    for t in ("senal", "marca_vial", "foto_boe", "figura_boe", "foto_libre", "esquema"):
        es = por_tipo.get(t, [])
        lineas += [f"## {titulos[t]} ({len(es)})", ""]
        if t in ("senal", "marca_vial") and t == "marca_vial":
            lineas += ["| Código | Fichero | Pág. PDF |", "|---|---|---|"]
            for e in es:
                lineas.append(f"| {e['codigo']} | `{e['src'][4:]}` | {e['fuente']['pagina_pdf']} |")
            lineas.append("")
        elif t == "senal":
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
