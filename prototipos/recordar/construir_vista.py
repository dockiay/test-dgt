#!/usr/bin/env python3
"""Junta la demo en un solo HTML (CSS, JS y señales dentro) para enseñarla como vista previa.
Uso:  python3 prototipos/recordar/construir_vista.py SALIDA.html"""
import base64, json, os, re, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.join(AQUI, "..", "..")
leer = lambda *p: open(os.path.join(*p), encoding="utf-8").read()
estilos = re.sub(r"@font-face\s*{[^}]*}", "", leer(RAIZ, "estilos.css"))
senales = {s: "data:image/png;base64," + base64.b64encode(open(os.path.join(RAIZ, "img", "senales", s + ".png"), "rb").read()).decode()
           for s in set(s for f in os.listdir(AQUI) if f.startswith("datos") and f.endswith(".js") for s in re.findall(r'"?senal"?: "([^"]+)"', leer(AQUI, f)))}
imagenes = {}
for f in os.listdir(AQUI):
    if f.startswith("datos") and f.endswith(".js"):
        for src in re.findall(r'"?src"?: "(img/[^"]+)"', leer(AQUI, f)):
            ext = src.rsplit(".", 1)[-1].lower(); tipo = {"svg": "image/svg+xml", "jpg": "image/jpeg", "jpeg": "image/jpeg"}.get(ext, "image/" + ext)
            imagenes[src] = f"data:{tipo};base64," + base64.b64encode(open(os.path.join(RAIZ, src), "rb").read()).decode()
js = "".join(f"<script>\n{leer(*f)}\n</script>\n" for f in [(RAIZ, "animo.js"), (AQUI, "datos.js"), (AQUI, "datos-clasificar.js"), (AQUI, "datos-error.js"), (AQUI, "datos-ysi.js"), (AQUI, "datos-piensa.js"), (AQUI, "datos-completar.js"), (AQUI, "recordar.js"), (AQUI, "demo.js")])
html = f"""<title>Ejercicios para recordar</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap">
<style>{estilos}\n{leer(AQUI, "recordar.css")}</style>
<main id="app" tabindex="-1"></main><div id="barra" class="barra-inferior" hidden></div>
<script>document.body.classList.add("sesion"); window.SENALES_EMBEBIDAS = {json.dumps(senales)}; window.IMAGENES_EMBEBIDAS = {json.dumps(imagenes)};</script>
{js}"""
open(sys.argv[1], "w", encoding="utf-8").write(html)
print(sys.argv[1], len(html) // 1024, "KB")
