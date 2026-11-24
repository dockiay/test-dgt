import json, re, difflib, collections
G = ["A","B1","B2","C","D","E"]
qs, rev, norms = [], [], {}
for g in G:
    b = json.load(open(f"chk_{g}.json"))
    norms.update(b.get("normativa_consultada", {}))
    for q in b["preguntas"]:
        q["grupo"] = g; qs.append(q)
    r = json.load(open(f"caps/{g}/revision.json"))
    rev += r["revision"]
pil = json.load(open("/mnt/project-files/preguntas/banco-piloto-video1.json"))["preguntas"]
ids = collections.Counter(q["id"] for q in qs + pil)
print("ids dup:", [i for i,c in ids.items() if c>1])
print("rev ids dup:", [i for i,c in collections.Counter(r["id"] for r in rev).items() if c>1])
# imagen
nimg = 0; pend = []
for q in qs:
    ir = q.get("imagen_requerida")
    if ir:
        nimg += 1
        q["imagen"] = {"pendiente": ir.get("descripcion",""), "codigo": ir.get("codigo")}
        pend.append({"id": q["id"], "tipo": ir.get("tipo"), "codigo": ir.get("codigo"), "descripcion": ir.get("descripcion"), "enunciado": q["enunciado"]})
    else:
        q["imagen"] = None; q["imagen_requerida"] = None
    q["subtema"] = q["subtema"].replace("ñ","n")
# near duplicates
def k(q): return re.sub(r"\W+"," ",q["enunciado"].lower())
allq = pil + qs
dups = []
for i in range(len(allq)):
    for j in range(i+1, len(allq)):
        if allq[i]["fuente"]["articulo"] != allq[j]["fuente"]["articulo"] and allq[i]["fuente"]["cita"] != allq[j]["fuente"]["cita"]: continue
        r = difflib.SequenceMatcher(None, k(allq[i]), k(allq[j])).ratio()
        if r > 0.6: dups.append((round(r,2), allq[i]["id"], allq[j]["id"], allq[i]["enunciado"][:70], allq[j]["enunciado"][:70]))
for d in sorted(dups, reverse=True): print(d)
print("total", len(qs), "img", nimg, "rev", len(rev))
print(collections.Counter(q["materia"] for q in pil+qs))
print(collections.Counter(q["fuente"]["norma"] for q in pil+qs))
for q in qs: q.pop("grupo")
json.dump({"version":1,"normativa_consultada":norms,"preguntas":qs}, open("merged_banco.json","w"), ensure_ascii=False, indent=2)
json.dump({"version":1,"revision":rev}, open("merged_rev.json","w"), ensure_ascii=False, indent=2)
json.dump({"version":1,"pendientes":pend}, open("merged_img.json","w"), ensure_ascii=False, indent=2)
