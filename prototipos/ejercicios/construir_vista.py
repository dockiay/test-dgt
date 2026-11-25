#!/usr/bin/env python3
"""Junta la demo en un solo HTML (CSS, JS y señales dentro) para enseñarla como vista previa.
Uso:  python3 prototipos/ejercicios/construir_vista.py SALIDA.html"""
import base64, os, re, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.join(AQUI, "..", "..")
leer = lambda *p: open(os.path.join(*p), encoding="utf-8").read()
estilos = re.sub(r"@font-face\s*{[^}]*}", "", leer(RAIZ, "estilos.css"))
DATOS = ["datos.js"] + sorted(f for f in os.listdir(AQUI) if re.fullmatch(r"datos-[\w-]+\.js", f))
todo = "".join(leer(AQUI, f) for f in DATOS)
escenas = leer(RAIZ, "data", "escenas.js")
rutas = ["img/senales/%s.png" % s for s in re.findall(r'"?senal"?: ?"([^"]+)"', todo)]
rutas += sorted({"img/senales/%s.png" % s for s in re.findall(r'"(?:cartel|cod)": ?"([^"]+)"', escenas + todo) if os.path.exists(os.path.join(RAIZ, "img", "senales", s + ".png"))}) + re.findall(r'"?img"?: ?"([^"]+)"', todo)
tipo = {".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml"}
rutas = [r for r in dict.fromkeys(rutas) if os.path.exists(os.path.join(RAIZ, r))]
imagenes = {r: f"data:{tipo[os.path.splitext(r)[1]]};base64," + base64.b64encode(open(os.path.join(RAIZ, r), "rb").read()).decode() for r in rutas}
js = "".join(f"<script>\n{leer(*f)}\n</script>\n" for f in [(RAIZ, "animo.js"), (RAIZ, "data", "escenas.js"), (RAIZ, "escenas.js"), (RAIZ, "escenas-via.js")]
             + [(AQUI, f) for f in sorted(os.listdir(AQUI)) if re.fullmatch(r"esquemas(-[\w-]+)?\.js", f)] + [(AQUI, f) for f in DATOS] + [(AQUI, "ejercicios.js"), (AQUI, "demo.js")])
html = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ejercicios nuevos</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&display=swap">
<style>{estilos}\n{leer(RAIZ, "escenas.css")}\n{leer(RAIZ, "escenas-via.css")}\n{leer(AQUI, "ejercicios.css")}</style></head>
<body class="sesion"><main id="app" tabindex="-1"></main><div id="barra" class="barra-inferior" hidden></div>
<script>window.IMAGENES_EMBEBIDAS = {__import__("json").dumps(imagenes)};</script>
{js}</body></html>"""
open(sys.argv[1], "w", encoding="utf-8").write(html)
print(sys.argv[1], len(html) // 1024, "KB")
