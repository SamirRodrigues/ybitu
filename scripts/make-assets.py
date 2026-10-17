"""Gera as texturas do site a partir de design-src/triangulos.jpg (arte original do projeto).

Uso: python3 scripts/make-assets.py
Saída: public/textures/papel.webp, triangulos-topo.webp, triangulos-base.webp
"""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
src = Image.open(root / "design-src" / "triangulos.jpg").convert("RGB")
out = root / "public" / "textures"
out.mkdir(parents=True, exist_ok=True)

# Papel: um trecho limpo do miolo, espelhado nos dois eixos para emendar sem costura.
patch = src.crop((560, 380, 1060, 680))
row = Image.new("RGB", (patch.width * 2, patch.height))
row.paste(patch, (0, 0))
row.paste(ImageOps.mirror(patch), (patch.width, 0))
tile = Image.new("RGB", (row.width, row.height * 2))
tile.paste(row, (0, 0))
tile.paste(ImageOps.flip(row), (0, row.height))
tile.save(out / "papel.webp", quality=82, method=6)

# Faixas de triângulos: uma sangra pelo topo, outra pela base, como na arte do livro.
src.crop((0, 0, 2000, 300)).save(out / "triangulos-topo.webp", quality=86, method=6)
src.crop((0, 740, 2000, 1000)).save(out / "triangulos-base.webp", quality=86, method=6)
print("ok")
