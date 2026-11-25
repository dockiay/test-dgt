#!/usr/bin/env python3
"""Junta la demo en un solo HTML (CSS, JS y señales dentro) para enseñarla como vista previa.
Uso:  python3 prototipos/ejercicios/construir_vista.py SALIDA.html"""
import base64, os, re, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.join(AQUI, "..", "..")
leer = lambda *p: open(os.path.join(*p), encoding="utf-8").read()
estilos = re.sub(r"@font-face\s*{[^}]*}", "", leer(RAIZ, "estilos.css"))
senales = {s: "data:image/png;base64," + base64.b64encode(open(os.path.join(RAIZ, "img", "senales", s + ".png"), "rb").read()).decode()
           for s in re.findall(r'senal: "([^"]+)"', leer(AQUI, "datos.js"))}
js = "".join(f"<script>\n{leer(*f)}\n</script>\n" for f in [(RAIZ, "animo.js"), (AQUI, "esquemas.js"), (AQUI, "datos.js"), (AQUI, "ejercicios.js"), (AQUI, "demo.js")])
html = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ejercicios nuevos</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap">
<style>{estilos}\n{leer(AQUI, "ejercicios.css")}</style></head>
<body class="sesion"><main id="app" tabindex="-1"></main><div id="barra" class="barra-inferior" hidden></div>
<script>window.SENALES_EMBEBIDAS = {__import__("json").dumps(senales)};</script>
{js}</body></html>"""
open(sys.argv[1], "w", encoding="utf-8").write(html)
print(sys.argv[1], len(html) // 1024, "KB")
