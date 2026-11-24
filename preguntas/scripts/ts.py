import json, re, sys
tr = open(sys.argv[1], encoding="utf-8-sig").read().splitlines()
buf, offs = "", []
for line in tr:
    m = re.match(r"\[([0-9:]+)\] (.*)", line)
    if not m: continue
    offs.append((len(buf), m.group(1))); buf += m.group(2) + " "
def ts(k):
    i = buf.find(k)
    if i < 0: return None
    t = None
    for o, s in offs:
        if o <= i: t = s
        else: break
    return t
KW = {
"def-0001":"silla de ruedas, aunque","def-0002":"ciclista que va desmontado","def-0003":"rebaño","def-0004":"asistencia al pedaleo",
"def-0005":"como mucho va a ir a 45","def-0006":"cuadriciclo ligero, ¿qué es","def-0007":"El ciclomotor, aunque tenga motor",
"def-0008":"la masa máxima autorizada. Esto","def-0009":"Tara o masa","def-0010":"Un turismo. ¿Veis?","def-0011":"en el camión la parte",
"def-0012":"Más tenemos el mixto adaptable","via-0001":"Una travesía es un tramo","via-0002":"Fuera de poblado, vía interurbana",
"via-0003":"propiedades colindantes","via-0004":"le llamaremos carretera convencional","via-0005":"si eres mayor de 14",
"via-0006":"Ciclomotor tampoco","via-0007":"ni por travesías","arc-0001":"Un peatón andando solo por el arcén de la izquierda",
"arc-0002":"desmontado de la bici","arc-0003":"grupo de peatones andando en grupo","arc-0004":"chaleco reflectante solamente",
"arc-0005":"Luz roja detrás","arc-0006":"más cercana al centro","arc-0007":"Vehículos especiales de hasta",
"arc-0008":"columna de dos","arc-0009":"columna de uno","arc-0010":"señalizado a 30","arc-0011":"penúltimo carril",
"arc-0012":"pasillo de emergencia","arc-0013":"nieve en la calzada","arc-0014":"no pueden usar el tercer carril",
"arc-0015":"mejor convenga","cesp-0001":"Solamente turismo sin remolque","cesp-0002":"una velocidad máxima de 80",
"cesp-0003":"por obras ya puede entrar","cesp-0004":"carril adicional circunstancial","cesp-0005":"carril reversible",
"cesp-0006":"un turismo con un remolque tampoco","cesp-0007":"V15","cesp-0008":"Un autobús de más de 3,500",
"dist-0001":"100 m o 4 segundos","dist-0002":"150 m o 6 segundos","dist-0003":"como mínimo tienen que dejar 50 m",
"dist-0004":"pero está prohibido adelantar","dist-0005":"5 m de distancia","adel-0001":"Metro y medio invadir",
"adel-0002":"Me tengo que cambiar todo el carril","adel-0003":"hay que rebajar en 20","adel-0004":"Tener en cuenta que los ciclistas",
"adel-0005":"averiado o detenido","vel-0001":"tienes que saber cuál es tu límite","vel-0002":"carretera convencional 90",
"vel-0003":"Luego pueden correr menos autobuses","vel-0004":"automóviles con remolque, todos","vel-0005":"Transporte escolar",
"vel-0006":"mercancías peligrosas","vel-0007":"Tractor con remolque 25","vel-0008":"cuadriciclo ligero, ¿cuál es su velocidad",
"vel-0009":"cuadriciclo no ligero, eso es 70","vel-0010":"camino de tierra","vel-0011":"60 km porh para todo el mundo",
"vel-0012":"¿cuál será la mínima? 45","vel-0013":"Si tiene uno, 30","vel-0014":"plataforma única","vel-0015":"Esto es carril bus taxi",
"vel-0016":"las travesías su","vel-0017":"autopistas y autovías dentro de poblado, ¿cuál","vel-0018":"mercancías peligrosas"}
b = json.load(open(sys.argv[2]))
miss = []
for x in b["preguntas"]:
    t = ts(KW.get(x["id"], "@@@"))
    if t: x["origen"]["minuto"] = t
    else: miss.append(x["id"]); x["origen"]["minuto"] = None
for x in b["preguntas"]:
    if x["id"] in ("vel-0001","vel-0002","vel-0003","vel-0004"):
        x["notas_revision"] = "La cifra sale de la tabla del art. 48.1.a del RGC (turismos y motos 120/90; autobuses, derivados y mixtos 100/90; camiones, furgonetas, articulados, con remolque y resto 90/80). La cita es un fragmento de esa tabla."
json.dump(b, open(sys.argv[2], "w"), ensure_ascii=False, indent=2)
print("sin minuto:", miss)
