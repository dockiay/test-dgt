#!/usr/bin/env python3
"""Aplica preguntas/estilo/cambios-redaccion.json a los bancos y comprueba que nada más cambia.

Uso:
  python3 tools/aplicar_redaccion.py importar <lote.txt>   añade/actualiza cambios desde un lote de texto
  python3 tools/aplicar_redaccion.py aplicar               escribe enunciado y opciones nuevos en los bancos
  python3 tools/aplicar_redaccion.py comprobar             comprueba el registro contra los bancos
  python3 tools/aplicar_redaccion.py corregir <lote.txt>   corrige preguntas ya aplicadas: parte del texto
                                                           de después y lo escribe también en los bancos

Formato del lote de texto (solo hace falta escribir lo que cambia):
  @<id>
  E: enunciado nuevo
  a: opción a nueva
  D        (una opción incorrecta dice algo nuevo: el revisor la confirma contra la norma)

Cada entrada del registro guarda el texto de antes, el de después, la letra correcta y las reglas
de la criba. Solo se tocan "enunciado" y "opciones"; correcta, explicacion, fuente e imagen no.
"""
import glob, json, os, re, sys

WEB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(WEB, "preguntas", "estilo", "cambios-redaccion.json")
sys.path.insert(0, os.path.join(WEB, "tools"))
from criba_estilo import reglas  # noqa: E402


def bancos():
    out = {}
    for f in sorted(glob.glob(os.path.join(WEB, "preguntas", "banco-*.json"))):
        out[f] = json.load(open(f, encoding="utf-8"))
    return out


def por_id(bs):
    return {p["id"]: p for d in bs.values() for p in d["preguntas"]}


def cargar():
    if os.path.exists(REG):
        return json.load(open(REG, encoding="utf-8"))
    return {"version": 1, "guia": "preguntas/estilo/guia-estilo-dgt.md", "cambios": []}


def guardar(r):
    r["cambios"].sort(key=lambda c: c["id"])
    json.dump(r, open(REG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    open(REG, "a").write("\n")


def importar(ruta, corregir=False):
    bs = bancos()
    qs = por_id(bs)
    r = cargar()
    idx = {c["id"]: c for c in r["cambios"]}
    texto = open(ruta, encoding="utf-8").read()
    n = 0
    for bloque in re.split(r"^@", texto, flags=re.M)[1:]:
        lineas = bloque.strip().split("\n")
        pid = lineas[0].strip()
        if pid not in qs:
            sys.exit(f"id desconocido: {pid}")
        p = qs[pid]
        antes = idx[pid]["antes"] if pid in idx else {"enunciado": p["enunciado"], "opciones": dict(p["opciones"])}
        base = idx[pid]["despues"] if corregir else antes
        if corregir and (p["enunciado"] != base["enunciado"] or p["opciones"] != base["opciones"]):
            sys.exit(f"{pid}: el banco no tiene el texto de después; no se corrige")
        desp = {"enunciado": base["enunciado"], "opciones": dict(base["opciones"])}
        dc = idx[pid]["distractora_cambiada"] if corregir else False
        for l in lineas[1:]:
            l = l.rstrip()
            if not l: continue
            if l == "D": dc = True; continue
            if l == "-D": dc = False; continue
            m = re.match(r"^(E|a|b|c): (.+)$", l)
            if not m: sys.exit(f"{pid}: línea no válida: {l}")
            if m.group(1) == "E": desp["enunciado"] = m.group(2).strip()
            else: desp["opciones"][m.group(1)] = m.group(2).strip()
        idx[pid] = {"id": pid, "correcta": p["correcta"], "reglas": reglas({**p, **antes}),
                    "distractora_cambiada": dc, "antes": antes, "despues": desp}
        if corregir:
            p["enunciado"] = desp["enunciado"]
            p["opciones"] = dict(desp["opciones"])
        n += 1
    r["cambios"] = list(idx.values())
    guardar(r)
    if corregir:
        for f, d in bs.items():
            orig = open(f, encoding="utf-8").read()
            s = json.dumps(d, ensure_ascii=False, indent=2) + ("\n" if orig.endswith("\n") else "")
            if s != orig: open(f, "w", encoding="utf-8").write(s)
    print(f"{n} cambios importados; {len(idx)} en el registro")


def comprobar(bs=None, aplicado=False):
    bs = bs or bancos()
    qs = por_id(bs)
    fallos, avisos = [], []
    for c in cargar()["cambios"]:
        p = qs.get(c["id"])
        if not p: fallos.append(f"{c['id']}: no está en los bancos"); continue
        esperado = c["despues"] if aplicado else c["antes"]
        if p["correcta"] != c["correcta"]: fallos.append(f"{c['id']}: la letra correcta no coincide")
        if p["enunciado"] != esperado["enunciado"] or p["opciones"] != esperado["opciones"]:
            if not aplicado and p["enunciado"] == c["despues"]["enunciado"] and p["opciones"] == c["despues"]["opciones"]:
                pass  # ya aplicado
            else:
                fallos.append(f"{c['id']}: el banco no coincide con el texto de {'después' if aplicado else 'antes'}")
        d = c["despues"]
        if set(d["opciones"]) != {"a", "b", "c"}: fallos.append(f"{c['id']}: opciones distintas de a, b, c")
        for l, v in d["opciones"].items():
            if not v[:1].isupper() and not v[:1].isdigit(): fallos.append(f"{c['id']}: opción {l} sin mayúscula")
            if not v.endswith((".", "?", "!")): fallos.append(f"{c['id']}: opción {l} sin punto final")
        if len(set(d["opciones"].values())) < 3: fallos.append(f"{c['id']}: opciones repetidas")
        if not d["enunciado"].endswith(("?", "...", ":")): avisos.append(f"{c['id']}: enunciado sin ? ni ...")
        quedan = reglas({**p, **d})
        if quedan: avisos.append(f"{c['id']}: sigue incumpliendo {quedan}")
    for f in fallos: print("FALLO", f)
    for a in avisos: print("aviso", a)
    print(f"{len(fallos)} fallos, {len(avisos)} avisos")
    return not fallos


def aplicar():
    bs = bancos()
    qs = por_id(bs)
    if not comprobar(bs):
        sys.exit("No se aplica: corrige los fallos")
    for c in cargar()["cambios"]:
        p = qs[c["id"]]
        p["enunciado"] = c["despues"]["enunciado"]
        p["opciones"] = dict(c["despues"]["opciones"])
    for f, d in bs.items():
        s = json.dumps(d, ensure_ascii=False, indent=2)
        orig = open(f, encoding="utf-8").read()
        open(f, "w", encoding="utf-8").write(s + ("\n" if orig.endswith("\n") else ""))
    print("Aplicado. Comprobación tras aplicar:")
    comprobar(aplicado=True)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "importar": importar(sys.argv[2])
    elif cmd == "corregir": importar(sys.argv[2], corregir=True)
    elif cmd == "aplicar": aplicar()
    elif cmd == "comprobar": sys.exit(0 if comprobar() else 1)
    else: sys.exit(__doc__)
