#!/usr/bin/env python3
"""Gera as ilustrações vetoriais (SVG) dos móveis em tricô náutico.

Uso:  python tools/gerar_ilustracoes.py

Cada produto é descrito em PRODUTOS (tipo de peça, madeira, cor da corda e
detalhes). Para mudar a cor de uma peça, troque "rope" ou "wood" e rode de novo.
Saída: assets/img/produtos/*.svg, assets/img/projetos/*.svg, assets/img/insta/*.svg
"""
import os

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img"))

WOOD = {
    "freijo": "#b98a55", "nogueira": "#6e4529", "cumaru": "#8c5a33",
    "carvalho": "#b39064", "ebano": "#2f2824", "teca": "#9a6a3c",
}
ROPE = {
    "natural": "#d9c6a3", "caramelo": "#b98349", "preto": "#2f2d2b", "grafite": "#5c5955",
    "offwhite": "#ece6d9", "musgo": "#6b6e4e", "terracota": "#a65f3f", "marinho": "#2e3c55",
    "areia": "#cdb894",
}
FABRIC = "#e4dccd"


# ---------------------------------------------------------------- utilitários
def hx(c):
    c = c.lstrip("#")
    return [int(c[i:i + 2], 16) for i in (0, 2, 4)]


def sh(c, f):
    """Escurece (f < 1) ou clareia (f > 1) uma cor."""
    r = hx(c)
    r = [v * f for v in r] if f <= 1 else [v + (255 - v) * (f - 1) for v in r]
    return "#%02x%02x%02x" % tuple(max(0, min(255, round(v))) for v in r)


def n(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


class Doc:
    def __init__(self):
        self.defs, self.cache, self.k = [], {}, 0

    def uid(self, p):
        self.k += 1
        return f"{p}{self.k}"

    def grad(self, kind, stops, **a):
        key = (kind, tuple(stops), tuple(sorted(a.items())))
        if key in self.cache:
            return self.cache[key]
        i = self.uid("g")
        attrs = " ".join(f'{k}="{v}"' for k, v in a.items())
        st = ""
        for s in stops:
            o, c, op = (tuple(s) + (None,))[:3]
            st += f'<stop offset="{o}" stop-color="{c}"' + (f' stop-opacity="{op}"' if op is not None else "") + "/>"
        self.defs.append(f'<{kind}Gradient id="{i}" {attrs}>{st}</{kind}Gradient>')
        self.cache[key] = f"url(#{i})"
        return self.cache[key]

    def lin(self, stops, x1=0, y1=0, x2=1, y2=0):
        return self.grad("linear", stops, x1=x1, y1=y1, x2=x2, y2=y2)

    def rad(self, stops, cx=.5, cy=.5, r=.5):
        return self.grad("radial", stops, cx=cx, cy=cy, r=r)


# ---------------------------------------------------------------- materiais
def wood(d, t, vertical=True):
    stops = [(0, sh(t, .62)), (.3, sh(t, 1.18)), (.55, t), (1, sh(t, .55))]
    return d.lin(stops) if vertical else d.lin(stops, x2=0, y2=1)


def poly(d, pts, t, vertical=True):
    p = " ".join(f"{n(x)},{n(y)}" for x, y in pts)
    return f'<polygon points="{p}" fill="{wood(d, t, vertical)}" stroke="{sh(t, .45)}" stroke-width="1" stroke-linejoin="round"/>'


def leg(d, t, xt, yt, xb, yb, wt, wb):
    return poly(d, [(xt - wt / 2, yt), (xt + wt / 2, yt), (xb + wb / 2, yb), (xb - wb / 2, yb)], t)


def bar(d, t, x1, y1, x2, y2):
    return poly(d, [(x1, y1), (x2, y1), (x2, y2), (x1, y2)], t, False)


def knit(d, rope, s=1.0, rot=0):
    """Padrão de tricô: pontos em V de corda náutica."""
    key = ("knit", rope, s, rot)
    if key in d.cache:
        return d.cache[key]
    i = d.uid("k")
    w, h = 20 * s, 16 * s
    g = d.rad([(0, sh(rope, 1.35)), (.5, rope), (1, sh(rope, .6))], cx=.42, cy=.38, r=.7)
    els = []
    for dy in (-h, 0, h):
        for dx in (-w, 0, w):
            for cx, ang in ((w * .28, -30), (w * .72, 30)):
                x, y = cx + dx, h / 2 + dy
                els.append(f'<ellipse cx="{n(x)}" cy="{n(y)}" rx="{n(w * .19)}" ry="{n(h * .66)}" '
                           f'transform="rotate({ang} {n(x)} {n(y)})" fill="{g}" stroke="{sh(rope, .48)}" stroke-width="{n(.6 * s)}"/>')
    d.defs.append(f'<pattern id="{i}" patternUnits="userSpaceOnUse" width="{n(w)}" height="{n(h)}" '
                  f'patternTransform="rotate({rot})"><rect width="{n(w)}" height="{n(h)}" fill="{sh(rope, .38)}"/>{"".join(els)}</pattern>')
    d.cache[key] = f"url(#{i})"
    return d.cache[key]


def coil(d, rope, s=1.0):
    """Corda enrolada em espiral (colunas e pés revestidos)."""
    key = ("coil", rope, s)
    if key in d.cache:
        return d.cache[key]
    i = d.uid("c")
    w, h = 40, 13 * s
    g = d.lin([(0, sh(rope, .5)), (.45, sh(rope, 1.25)), (1, sh(rope, .55))], x2=0, y2=1)
    lines = "".join(f'<path d="M{k * 8} 0 L{k * 8 + 5} {n(h)}" stroke="{sh(rope, .45)}" stroke-width="1.3" opacity=".55"/>' for k in range(6))
    d.defs.append(f'<pattern id="{i}" patternUnits="userSpaceOnUse" width="{w}" height="{n(h)}">'
                  f'<rect width="{w}" height="{n(h)}" fill="{g}"/>{lines}</pattern>')
    d.cache[key] = f"url(#{i})"
    return d.cache[key]


def volume(d):
    return d.lin([(0, "#fff", .12), (.45, "#000", 0), (1, "#000", .42)], x2=0, y2=1)


def cylinder(d):
    return d.lin([(0, "#000", .55), (.35, "#fff", .12), (.55, "#000", 0), (1, "#000", .6)])


def rope_edge(d, path, rope, w=11):
    """Corda torcida contornando a trama."""
    return (f'<path d="{path}" fill="none" stroke="{sh(rope, .4)}" stroke-width="{n(w + 3)}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{path}" fill="none" stroke="{rope}" stroke-width="{n(w)}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{path}" fill="none" stroke="{sh(rope, .5)}" stroke-width="{n(w)}" stroke-dasharray="{n(w * .2)} {n(w * .5)}" opacity=".7"/>'
            f'<path d="{path}" fill="none" stroke="{sh(rope, 1.4)}" stroke-width="{n(w * .3)}" stroke-dasharray="{n(w * .25)} {n(w * .45)}" '
            f'stroke-dashoffset="{n(w * .4)}" opacity=".45"/>')


def panel(d, path, rope, s=1.0, rot=0, edge=11, edge_path=None):
    out = f'<path d="{path}" fill="{knit(d, rope, s, rot)}"/><path d="{path}" fill="{volume(d)}"/>'
    if edge:
        out += rope_edge(d, edge_path or path, rope, edge)
    return out


def shadow(d, cx, cy, rx, ry=None):
    g = d.rad([(0, "#000", .65), (1, "#000", 0)])
    return f'<ellipse cx="{n(cx)}" cy="{n(cy)}" rx="{n(rx)}" ry="{n(ry or rx * .12)}" fill="{g}"/>'


def cushion_rect(d, x1, y1, x2, y2, r=20, color=FABRIC):
    g = d.lin([(0, sh(color, 1.08)), (.6, color), (1, sh(color, .72))], x2=0, y2=1)
    return (f'<rect x="{n(x1)}" y="{n(y1)}" width="{n(x2 - x1)}" height="{n(y2 - y1)}" rx="{n(r)}" fill="{g}" stroke="{sh(color, .6)}" stroke-width="1"/>'
            f'<rect x="{n(x1 + 7)}" y="{n(y1 + 7)}" width="{n(x2 - x1 - 14)}" height="{n(y2 - y1 - 14)}" rx="{n(max(r - 6, 2))}" fill="none" '
            f'stroke="{sh(color, .7)}" stroke-width="1.2" stroke-dasharray="4 4" opacity=".6"/>')


def cushion_top(d, pts, color=FABRIC):
    g = d.lin([(0, sh(color, .9)), (1, sh(color, 1.1))], x2=0, y2=1)
    p = " ".join(f"{n(x)},{n(y)}" for x, y in pts)
    return f'<polygon points="{p}" fill="{g}" stroke="{sh(color, .65)}" stroke-width="1" stroke-linejoin="round"/>'


# ---------------------------------------------------------------- peças
# Todas desenhadas com o centro em x=0 e o chão em y=0 (y negativo = para cima).
def chair(d, p):
    t, r = WOOD[p["wood"]], ROPE[p["rope"]]
    sw = p.get("sw", 300); bw = sw * .84
    fy = -p.get("seat", 276); by = fy - p.get("depth", 70); bt = -p.get("back", 540)
    rail = p.get("rail", False)
    o = [shadow(d, 0, 0, sw * .8)]
    for s in (-1, 1):
        o.append(leg(d, t, s * bw / 2, bt - 4, s * (bw / 2 + 8), -26, 24, 19))
    x1, x2 = -bw / 2 + 12, bw / 2 - 12
    y1, y2 = bt + (24 if rail else 8), by - 34
    shape = p.get("shape", "rect")
    if shape == "arch":
        path = f"M{n(x1)} {n(y2)} L{n(x1)} {n(y1 + 50)} Q0 {n(y1 - 40)} {n(x2)} {n(y1 + 50)} L{n(x2)} {n(y2)} Z"
    elif shape == "oval":
        path = f"M{n(x1)} {n(y2)} L{n(x1)} {n(y1 + 70)} C{n(x1)} {n(y1 - 8)} {n(x2)} {n(y1 - 8)} {n(x2)} {n(y1 + 70)} L{n(x2)} {n(y2)} Z"
    else:
        path = f"M{n(x1)} {n(y2)} L{n(x1)} {n(y1)} L{n(x2)} {n(y1)} L{n(x2)} {n(y2)} Z"
    o.append(panel(d, path, r, p.get("s", 1), p.get("rot", 0), edge=10))
    o.append(bar(d, t, -bw / 2, y2, bw / 2, y2 + 16))
    if rail:
        o.append(f'<path d="M{n(-bw / 2 - 8)} {n(bt + 8)} Q0 {n(bt - 16)} {n(bw / 2 + 8)} {n(bt + 8)} L{n(bw / 2 + 8)} {n(bt + 38)} '
                 f'Q0 {n(bt + 14)} {n(-bw / 2 - 8)} {n(bt + 38)} Z" fill="{wood(d, t, False)}" stroke="{sh(t, .45)}"/>')
    seat = f"M{n(-bw / 2)} {n(by)} L{n(bw / 2)} {n(by)} L{n(sw / 2)} {n(fy)} L{n(-sw / 2)} {n(fy)} Z"
    o.append(panel(d, seat, r, p.get("s", 1), 90, edge=0))
    o.append(rope_edge(d, f"M{n(-bw / 2)} {n(by)} L{n(bw / 2)} {n(by)}", r, 9))
    o.append(bar(d, t, -sw / 2, fy + 6, sw / 2, fy + 28))
    o.append(rope_edge(d, f"M{n(-sw / 2 + 4)} {n(fy)} L{n(sw / 2 - 4)} {n(fy)}", r, 13))
    sp = p.get("splay", 8)
    for s in (-1, 1):
        o.append(leg(d, t, s * (sw / 2 - 15), fy + 8, s * (sw / 2 - 15 + sp), 0, 28, 21))
    o.append(bar(d, t, -(sw / 2 - 12), -118, sw / 2 - 12, -106))
    if p.get("arms"):
        ay = fy - 170
        for s in (-1, 1):
            o.append(leg(d, t, s * (sw / 2 - 15), ay + 8, s * (sw / 2 - 15), fy + 8, 22, 26))
            o.append(poly(d, [(s * (bw / 2 - 6), ay - 18), (s * (sw / 2 + 12), ay - 4), (s * (sw / 2 + 12), ay + 14), (s * (bw / 2 - 6), ay)], t, False))
            if p.get("armrope"):
                o.append(rope_edge(d, f"M{n(s * bw / 2)} {n(ay - 8)} L{n(s * (sw / 2 + 6))} {n(ay + 4)}", r, 15))
    return "".join(o)


def armchair(d, p):
    """Poltronas e sofás (n = número de assentos)."""
    t, r = WOOD[p["wood"]], ROPE[p["rope"]]
    sw = p.get("sw", 400); aw = p.get("aw", 58); cnt = p.get("n", 1)
    fy = -p.get("seat", 240); by = fy - p.get("depth", 110); bw = sw * .92
    bt = -p.get("back", 600); ay = -p.get("arm", 420); W = sw / 2 + aw
    ks = p.get("s", 1.1)
    o = [shadow(d, 0, 0, W * 1.02)]
    for s in (-1, 1):
        o.append(leg(d, t, s * (W - 24), fy + 40, s * (W - 20), -22, 24, 18))
    x1, x2, y2 = -bw / 2, bw / 2, by + 10
    if p.get("shape") == "barrel":
        path = f"M{n(x1)} {n(y2)} L{n(x1)} {n(bt + 80)} C{n(x1)} {n(bt - 20)} {n(x2)} {n(bt - 20)} {n(x2)} {n(bt + 80)} L{n(x2)} {n(y2)} Z"
    else:
        path = (f"M{n(x1)} {n(y2)} L{n(x1)} {n(bt + 30)} Q{n(x1)} {n(bt)} {n(x1 + 30)} {n(bt)} L{n(x2 - 30)} {n(bt)} "
                f"Q{n(x2)} {n(bt)} {n(x2)} {n(bt + 30)} L{n(x2)} {n(y2)} Z")
    o.append(panel(d, path, r, ks, 0, edge=12))
    if p.get("backcushion"):
        bx1, bx2 = -bw / 2 + 36, bw / 2 - 36
        cw = (bx2 - bx1) / cnt
        for k in range(cnt):
            o.append(cushion_rect(d, bx1 + k * cw + 4, bt + 90, bx1 + (k + 1) * cw - 4, by - 4, 26))
    seat = f"M{n(-bw / 2)} {n(by)} L{n(bw / 2)} {n(by)} L{n(sw / 2)} {n(fy)} L{n(-sw / 2)} {n(fy)} Z"
    o.append(panel(d, seat, r, ks, 90, edge=0))
    band = f"M{n(-sw / 2)} {n(fy)} L{n(sw / 2)} {n(fy)} L{n(sw / 2)} {n(fy + 40)} L{n(-sw / 2)} {n(fy + 40)} Z"
    o.append(panel(d, band, r, ks, 90, edge=0))
    o.append(rope_edge(d, f"M{n(-sw / 2 + 4)} {n(fy)} L{n(sw / 2 - 4)} {n(fy)}", r, 12))
    if p.get("cushion"):
        k_ = bw / sw
        fw = (sw - 12) / cnt
        for k in range(cnt):
            fx1 = -sw / 2 + 6 + k * fw + 3; fx2 = fx1 + fw - 6
            o.append(cushion_top(d, [(fx1 * k_ + 8, by + 14), (fx2 * k_ - 8, by + 14), (fx2, fy - 34), (fx1, fy - 34)]))
            o.append(cushion_rect(d, fx1, fy - 36, fx2, fy + 14, 18))
    for s in (-1, 1):
        xa, xb = sorted((s * sw / 2, s * W))
        ap = (f"M{n(xa)} {n(fy + 40)} L{n(xa)} {n(ay + 14)} Q{n(xa)} {n(ay)} {n(xa + 14)} {n(ay)} L{n(xb - 14)} {n(ay)} "
              f"Q{n(xb)} {n(ay)} {n(xb)} {n(ay + 14)} L{n(xb)} {n(fy + 40)} Z")
        o.append(panel(d, ap, r, ks, 90, edge=10))
        if p.get("cap", True):
            o.append(poly(d, [(xa - 4, ay - 14), (xb + 4, ay - 14), (xb + 4, ay + 4), (xa - 4, ay + 4)], t, False))
    o.append(bar(d, t, -W, fy + 40, W, fy + 64))
    for s in (-1, 1):
        o.append(leg(d, t, s * (W - 30), fy + 64, s * (W - 24), 0, 30, 22))
    return "".join(o)


def stool(d, p):
    t, r = WOOD[p["wood"]], ROPE[p["rope"]]
    sy = -p.get("seat", 450); rx = p.get("rx", 125); ry = rx * .3; rim = 28
    o = [shadow(d, 0, 0, rx * 1.2)]
    for s in (-1, 1):
        o.append(leg(d, t, s * rx * .45, sy + 10, s * rx * .8, -24, 22, 17))
    if p.get("backrest"):
        for s in (-1, 1):
            o.append(leg(d, t, s * rx * .62, sy - 215, s * rx * .6, sy + 6, 20, 22))
        bp = (f"M{n(-rx * .75)} {n(sy - 80)} L{n(-rx * .75)} {n(sy - 190)} Q0 {n(sy - 220)} {n(rx * .75)} {n(sy - 190)} "
              f"L{n(rx * .75)} {n(sy - 80)} Q0 {n(sy - 98)} {n(-rx * .75)} {n(sy - 80)} Z")
        o.append(panel(d, bp, r, 1, 0, edge=9))
    rim_p = f"M{n(-rx)} {n(sy)} A{n(rx)} {n(ry)} 0 0 0 {n(rx)} {n(sy)} L{n(rx)} {n(sy + rim)} A{n(rx)} {n(ry)} 0 0 1 {n(-rx)} {n(sy + rim)} Z"
    o.append(panel(d, rim_p, r, 1, 90, edge=0))
    o.append(rope_edge(d, f"M{n(-rx)} {n(sy + rim)} A{n(rx)} {n(ry)} 0 0 0 {n(rx)} {n(sy + rim)}", r, 11))
    top = f"M{n(-rx)} {n(sy)} A{n(rx)} {n(ry)} 0 1 0 {n(rx)} {n(sy)} A{n(rx)} {n(ry)} 0 1 0 {n(-rx)} {n(sy)} Z"
    o.append(panel(d, top, r, 1, 0, edge=12))
    yt = sy + rim + 4
    for s in (-1, 1):
        o.append(leg(d, t, s * rx * .62, yt, s * rx * .98, 0, 26, 20))
    fr = -p.get("foot", 150)
    lx = rx * .62 + (rx * .98 - rx * .62) * ((fr - yt) / (0 - yt))
    o.append(bar(d, t, -lx, fr - 7, lx, fr + 7))
    return "".join(o)


def pouf(d, p):
    r = ROPE[p["rope"]]
    R = p.get("r", 200); top = -p.get("h", 250); ry = R * .27
    side = d.lin([(0, "#000", .5), (.3, "#000", 0), (.7, "#000", 0), (1, "#000", .55)])
    o = [shadow(d, 0, 0, R * 1.08)]
    if p.get("square"):
        body = (f"M{n(-R)} {n(top + 20)} Q{n(-R)} {n(top)} {n(-R + 20)} {n(top)} L{n(R - 20)} {n(top)} Q{n(R)} {n(top)} {n(R)} {n(top + 20)} "
                f"L{n(R)} -18 Q{n(R)} -4 {n(R - 20)} -4 L{n(-R + 20)} -4 Q{n(-R)} -4 {n(-R)} -18 Z")
        o.append(panel(d, body, r, 1.6, 90, edge=0))
        o.append(f'<path d="{body}" fill="{side}"/>')
        o.append(rope_edge(d, f"M{n(-R + 12)} -6 L{n(R - 12)} -6", r, 13))
        topf = f"M{n(-R * .84)} {n(top - 70)} L{n(R * .84)} {n(top - 70)} L{n(R)} {n(top)} L{n(-R)} {n(top)} Z"
        o.append(panel(d, topf, r, 1.6, 0, edge=13))
    else:
        body = (f"M{n(-R)} {n(top)} C{n(-R * 1.12)} {n(top + 60)} {n(-R * 1.1)} -30 {n(-R * .88)} -6 L{n(R * .88)} -6 "
                f"C{n(R * 1.1)} -30 {n(R * 1.12)} {n(top + 60)} {n(R)} {n(top)} Z")
        o.append(panel(d, body, r, 1.6, 90, edge=0))
        o.append(f'<path d="{body}" fill="{side}"/>')
        o.append(rope_edge(d, f"M{n(-R * .86)} -6 L{n(R * .86)} -6", r, 13))
        te = f"M{n(-R)} {n(top)} A{n(R)} {n(ry)} 0 1 0 {n(R)} {n(top)} A{n(R)} {n(ry)} 0 1 0 {n(-R)} {n(top)} Z"
        o.append(panel(d, te, r, 1.6, 0, edge=14))
    return "".join(o)


def table(d, p):
    t = WOOD[p["wood"]]
    kind = p["kind"]
    if kind in ("round", "side"):
        r = ROPE[p["rope"]]
        rx = p.get("w", 560) / 2; ty = -p.get("h", 440); ry = rx * .24; th = 26; cw = p.get("cw", 120)
        bx = cw * 1.25; bry = bx * .24
        o = [shadow(d, 0, 0, max(rx, bx) * .95)]
        o.append(f'<path d="M{n(-bx)} -40 A{n(bx)} {n(bry)} 0 0 0 {n(bx)} -40 L{n(bx)} -18 A{n(bx)} {n(bry)} 0 0 1 {n(-bx)} -18 Z" '
                 f'fill="{wood(d, t)}" stroke="{sh(t, .45)}"/>')
        o.append(f'<ellipse cx="0" cy="-40" rx="{n(bx)}" ry="{n(bry)}" fill="{wood(d, sh(t, 1.1), False)}" stroke="{sh(t, .45)}"/>')
        col = f"M{n(-cw / 2)} {n(ty + th - 4)} L{n(cw / 2)} {n(ty + th - 4)} L{n(cw / 2)} -40 L{n(-cw / 2)} -40 Z"
        o.append(f'<path d="{col}" fill="{coil(d, r)}"/><path d="{col}" fill="{cylinder(d)}"/>')
        o.append(f'<path d="M{n(-rx)} {n(ty)} A{n(rx)} {n(ry)} 0 0 0 {n(rx)} {n(ty)} L{n(rx)} {n(ty + th)} A{n(rx)} {n(ry)} 0 0 1 {n(-rx)} {n(ty + th)} Z" '
                 f'fill="{wood(d, t)}" stroke="{sh(t, .45)}"/>')
        o.append(f'<ellipse cx="0" cy="{n(ty)}" rx="{n(rx)}" ry="{n(ry)}" fill="{d.lin([(0, sh(t, .85)), (1, sh(t, 1.15))], x2=0, y2=1)}" stroke="{sh(t, .45)}"/>')
        for k in range(1, 4):
            o.append(f'<ellipse cx="0" cy="{n(ty)}" rx="{n(rx * k / 4)}" ry="{n(ry * k / 4)}" fill="none" stroke="{sh(t, .72)}" stroke-width="1" opacity=".45"/>')
        return "".join(o)

    w = p.get("w", 640); ty = -p.get("h", 420); dp = p.get("depth", 80); th = p.get("th", 30); lw = p.get("lw", 32); bk = .88
    o = [shadow(d, 0, 0, w * .56)]
    for s in (-1, 1):
        o.append(leg(d, t, s * (w * bk / 2 - 34), ty - dp + 10, s * (w * bk / 2 - 34), -28, lw * .85, lw * .7))
    if kind == "coffee":
        r = ROPE[p["rope"]]
        sh_ = (f"M{n(-(w * bk / 2 - 34))} -150 L{n(w * bk / 2 - 34)} -150 L{n(w / 2 - 36)} -100 L{n(-(w / 2 - 36))} -100 Z")
        o.append(panel(d, sh_, r, 1, 90, edge=0))
        o.append(rope_edge(d, f"M{n(-(w / 2 - 36))} -100 L{n(w / 2 - 36)} -100", r, 12))
    if kind == "organic":
        top = (f"M{n(-w * bk / 2 + 40)} {n(ty - dp)} Q{n(0)} {n(ty - dp - 14)} {n(w * bk / 2 - 40)} {n(ty - dp)} "
               f"Q{n(w * bk / 2 + 10)} {n(ty - dp / 2)} {n(w / 2)} {n(ty)} L{n(-w / 2)} {n(ty)} Q{n(-w * bk / 2 - 10)} {n(ty - dp / 2)} {n(-w * bk / 2 + 40)} {n(ty - dp)} Z")
    else:
        top = f"M{n(-w * bk / 2)} {n(ty - dp)} L{n(w * bk / 2)} {n(ty - dp)} L{n(w / 2)} {n(ty)} L{n(-w / 2)} {n(ty)} Z"
    o.append(f'<path d="{top}" fill="{d.lin([(0, sh(t, .82)), (1, sh(t, 1.14))], x2=0, y2=1)}" stroke="{sh(t, .45)}" stroke-linejoin="round"/>')
    for k in range(1, 6):
        y = ty - dp + k * dp / 6
        f = k / 6
        xl = -(w * bk / 2 + (w / 2 - w * bk / 2) * f) + 18
        o.append(f'<path d="M{n(xl)} {n(y)} Q{n(-w * .1)} {n(y + (4 if k % 2 else -4))} {n(-xl)} {n(y)}" fill="none" stroke="{sh(t, .72)}" stroke-width="1.1" opacity=".45"/>')
    o.append(bar(d, t, -w / 2, ty, w / 2, ty + th))
    o.append(bar(d, sh(t, .8), -w / 2 + 24, ty + th, w / 2 - 24, ty + th + 18))
    for s in (-1, 1):
        o.append(leg(d, t, s * (w / 2 - 36), ty + th, s * (w / 2 - 36), 0, lw, lw * .78))
    return "".join(o)


def lounger(d, p):
    """Espreguiçadeira vista de lado."""
    t, r = WOOD[p["wood"]], ROPE[p["rope"]]
    o = [shadow(d, 20, 0, 360, 34)]
    o.append(leg(d, t, -250, -300, -280, 0, 26, 22))
    o.append(leg(d, t, -200, -300, -170, 0, 22, 20))
    o.append(poly(d, [(-262, -296), (-238, -296), (-150, -575), (-172, -582)], t))
    o.append(bar(d, t, -320, -300, 330, -276))
    o.append(leg(d, t, 260, -280, 285, 0, 26, 22))
    o.append(leg(d, t, 210, -280, 190, 0, 22, 20))
    band = ("M-318 -604 L-160 -338 Q-150 -322 -128 -322 L300 -322 Q332 -322 338 -352 "
            "L344 -318 Q336 -288 300 -288 L-128 -288 Q-166 -288 -184 -312 L-348 -590 Z")
    o.append(panel(d, band, r, 1.1, 0, edge=0))
    o.append(rope_edge(d, "M-318 -604 L-160 -338 Q-150 -322 -128 -322 L300 -322 Q332 -322 338 -352", r, 13))
    o.append(rope_edge(d, "M-348 -590 L-184 -312 Q-166 -288 -128 -288 L300 -288 Q336 -288 344 -318", r, 9))
    o.append(f'<g transform="rotate(-59 -262 -530)">{cushion_rect(d, -322, -556, -202, -504, 22)}</g>')
    return "".join(o)


DRAW = {"chair": chair, "armchair": armchair, "stool": stool, "pouf": pouf, "table": table, "lounger": lounger}


# ---------------------------------------------------------------- catálogo
PRODUTOS = {
    # Cadeiras
    "mb-c01": ("chair", dict(wood="freijo", rope="natural", shape="arch")),
    "mb-c02": ("chair", dict(wood="nogueira", rope="preto", rail=True)),
    "mb-c03": ("chair", dict(wood="cumaru", rope="caramelo", shape="oval", splay=14)),
    "mb-c04": ("chair", dict(wood="carvalho", rope="offwhite", rail=True, arms=True)),
    "mb-c05": ("chair", dict(wood="ebano", rope="natural", rail=True, back=600, arms=True, armrope=True)),
    "mb-c06": ("chair", dict(wood="freijo", rope="marinho", shape="arch")),
    "mb-c07": ("chair", dict(wood="carvalho", rope="areia", shape="oval", s=.85)),
    # Poltronas
    "mb-p01": ("armchair", dict(wood="nogueira", rope="caramelo", shape="barrel", cushion=True)),
    "mb-p02": ("armchair", dict(wood="freijo", rope="natural", shape="barrel", cushion=True, backcushion=True)),
    "mb-p03": ("armchair", dict(wood="cumaru", rope="musgo", cushion=True)),
    "mb-p04": ("armchair", dict(wood="freijo", rope="preto", back=700, cushion=True, backcushion=True)),
    "mb-p05": ("armchair", dict(wood="carvalho", rope="terracota", shape="barrel", cap=False)),
    # Mesas
    "mb-m01": ("table", dict(kind="rect", wood="freijo", w=680)),
    "mb-m02": ("table", dict(kind="round", wood="cumaru", rope="natural", w=560)),
    "mb-m03": ("table", dict(kind="organic", wood="nogueira", w=660)),
    "mb-m04": ("table", dict(kind="coffee", wood="cumaru", rope="caramelo", w=620, h=270, depth=90)),
    "mb-m05": ("table", dict(kind="side", wood="ebano", rope="preto", w=300, h=500, cw=90)),
    "mb-m06": ("table", dict(kind="rect", wood="teca", w=660, lw=52, th=40)),
    # Banquetas e puffs
    "mb-b01": ("stool", dict(wood="freijo", rope="natural")),
    "mb-b02": ("stool", dict(wood="nogueira", rope="preto", backrest=True)),
    "mb-b03": ("stool", dict(wood="cumaru", rope="caramelo", seat=330, foot=110)),
    "mb-b04": ("pouf", dict(rope="offwhite")),
    "mb-b05": ("pouf", dict(rope="grafite", square=True, r=180)),
    # Sofás e namoradeiras
    "mb-s01": ("armchair", dict(wood="freijo", rope="natural", sw=520, n=2, cushion=True, backcushion=True)),
    "mb-s02": ("armchair", dict(wood="nogueira", rope="caramelo", sw=620, n=3, cushion=True, backcushion=True)),
    "mb-s03": ("armchair", dict(wood="cumaru", rope="musgo", sw=560, n=2, shape="barrel", cushion=True)),
    "mb-s04": ("armchair", dict(wood="carvalho", rope="preto", sw=620, n=3, cushion=True, backcushion=True)),
    # Espreguiçadeiras
    "mb-e01": ("lounger", dict(wood="teca", rope="natural")),
    "mb-e02": ("lounger", dict(wood="ebano", rope="grafite")),
    "mb-e03": ("lounger", dict(wood="freijo", rope="marinho")),
}

def fit_scale(kind, p):
    """Escala para a peça caber no quadro 800×1000."""
    if kind == "armchair":
        return min(1.0, 700 / (p.get("sw", 400) + 2 * p.get("aw", 58)))
    if kind == "lounger":
        return .92
    if kind == "chair":
        return 1.25
    if kind == "stool":
        return 1.2
    if kind == "pouf":
        return 1.3
    if kind == "table" and p["kind"] == "side":
        return 1.2
    if kind == "table" and p["kind"] in ("rect", "organic", "coffee"):
        return min(1.0, 700 / p.get("w", 640))
    return 1.0


def studio(d, w, h, floor):
    g = d.rad([(0, "#3a342e"), (.55, "#1f1c19"), (1, "#121110")], cx=.5, cy=.4, r=.75)
    f = d.lin([(0, "#000", 0), (1, "#000", .45)], x2=0, y2=1)
    return f'<rect width="{w}" height="{h}" fill="{g}"/><rect y="{floor - 30}" width="{w}" height="{h - floor + 30}" fill="{f}"/>'


def wrap(d, w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
            f'<defs>{"".join(d.defs)}</defs>{body}</svg>')


def place(d, kind, p, x, floor, s):
    return f'<g transform="translate({n(x)} {n(floor)}) scale({s})">{DRAW[kind](d, p)}</g>'


def product_svg(kind, p):
    d = Doc()
    floor = 880 if kind != "lounger" else 800
    bg = studio(d, 800, 1000, floor)
    s = fit_scale(kind, p)
    y = floor if kind != "lounger" else floor + 40
    return wrap(d, 800, 1000, bg + place(d, kind, p, 400, y, s))


# ---------------------------------------------------------------- cenas (projetos)
def room(d, w, h, floor, wall=("#2e2823", "#1d1916"), window=True):
    g = d.lin([(0, wall[0]), (1, wall[1])], x2=0, y2=1)
    f = d.lin([(0, "#1a1613"), (1, "#0d0c0b")], x2=0, y2=1)
    out = f'<rect width="{w}" height="{h}" fill="{g}"/>'
    if window:
        glow = d.rad([(0, "#f3e3c3", .16), (1, "#f3e3c3", 0)])
        out += (f'<rect x="{w * .64}" y="{h * .1}" width="{w * .22}" height="{h * .5}" fill="{glow}"/>'
                f'<rect x="{w * .64}" y="{h * .1}" width="{w * .22}" height="{h * .5}" fill="none" stroke="#e9dcc4" stroke-opacity=".08" stroke-width="3"/>'
                f'<line x1="{w * .75}" y1="{h * .1}" x2="{w * .75}" y2="{h * .6}" stroke="#e9dcc4" stroke-opacity=".08" stroke-width="3"/>')
    out += f'<rect y="{floor}" width="{w}" height="{h - floor}" fill="{f}"/>'
    out += f'<rect y="{floor}" width="{w}" height="2" fill="#000" opacity=".5"/>'
    return out


def scene(name):
    d = Doc(); W, H = 1000, 690
    P = lambda k: PRODUTOS[k]
    if name == "alto-do-lago":
        body = room(d, W, H, 470)
        for x in (330, 500, 670):
            body += place(d, *P("mb-c01"), x, 560, .55)
        body += place(d, *P("mb-m01"), 500, 640, .64)
    elif name == "varanda":
        body = room(d, W, H, 470)
        body += place(d, *P("mb-s02"), 420, 560, .6)
        body += place(d, *P("mb-p01"), 830, 585, .55)
        body += place(d, *P("mb-m04"), 430, 660, .55)
    elif name == "bistro":
        body = room(d, W, H, 520, window=False)
        body += bar(d, WOOD["nogueira"], 60, 330, 940, 600) + bar(d, sh(WOOD["nogueira"], 1.15), 40, 312, 960, 334)
        for x in (270, 500, 730):
            body += place(d, *P("mb-b01"), x, 670, .66)
    else:  # lazer
        body = room(d, W, H, 500, wall=("#2a2a27", "#191917"))
        pool = d.lin([(0, "#20414b"), (1, "#0f2229")], x2=0, y2=1)
        body += f'<rect y="640" width="{W}" height="{H - 640}" fill="{pool}"/>'
        body += place(d, *P("mb-e01"), 260, 610, .5)
        body += place(d, *P("mb-m05"), 497, 610, .48)
        body += place(d, *P("mb-e03"), 735, 610, .5)
    return wrap(d, W, H, body)


def texture(rope):
    d = Doc()
    r = ROPE[rope]
    vig = d.rad([(0, "#000", 0), (.7, "#000", .25), (1, "#000", .7)])
    body = (f'<rect width="800" height="800" fill="{knit(d, r, 3.2, 0)}"/>'
            f'<rect width="800" height="800" fill="{vig}"/>')
    return wrap(d, 800, 800, body)


def save(path, svg):
    path = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf8") as f:
        f.write(svg)
    return os.path.getsize(path) // 1024


if __name__ == "__main__":
    for code, (kind, p) in PRODUTOS.items():
        print(code, save(f"produtos/{code}.svg", product_svg(kind, p)), "KB")
    for name in ("alto-do-lago", "varanda", "bistro", "lazer"):
        print(name, save(f"projetos/{name}.svg", scene(name)), "KB")
    for rope in ("natural", "caramelo"):
        print("trama", rope, save(f"insta/trama-{rope}.svg", texture(rope)), "KB")
