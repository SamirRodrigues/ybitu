#!/usr/bin/env python3
"""Gera as texturas de papel já tingidas (papel x cor, o mesmo que `multiply`).

Por quê: `background-blend-mode: multiply` falha em alguns iPhones (a cor some e fica só o papel claro,
deixando texto branco ilegível). Com a imagem já pronta, não depende do navegador misturar nada.

Saída: public/textures/papel-{amarelo,ceu,pedra,tijolo}.webp
Uso: python3 scripts/make-tinted-textures.py   (requer pillow)
"""
from pathlib import Path

from PIL import Image, ImageChops

root = Path(__file__).resolve().parent.parent
tex = root / "public" / "textures"
paper = Image.open(tex / "papel.webp").convert("RGB")
cores = {"amarelo": "#f2bd30", "ceu": "#aadbf5", "pedra": "#b9ccd6", "tijolo": "#b8432a"}
for nome, hexa in cores.items():
    base = Image.new("RGB", paper.size, hexa)
    ImageChops.multiply(paper, base).save(tex / f"papel-{nome}.webp", quality=82, method=6)
    print("ok", nome)
