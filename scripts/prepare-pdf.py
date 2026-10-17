"""Prepara um PDF para download no site: recorta páginas (opcional) e grava título e autoria nos metadados.

Uso:
  python3 scripts/prepare-pdf.py ENTRADA.pdf SAIDA.pdf --title "Título" --author "Autor 1; Autor 2"
  python3 scripts/prepare-pdf.py LIVRO.pdf capitulo.pdf --first 42 --last 58 --title "..." --author "..."

--first/--last são números de página do ARQUIVO (a primeira página é 1), não da numeração impressa no livro.
Requer: pip install pypdf
"""
import argparse
from pypdf import PdfReader, PdfWriter

parser = argparse.ArgumentParser()
parser.add_argument("entrada")
parser.add_argument("saida")
parser.add_argument("--first", type=int, default=1)
parser.add_argument("--last", type=int)
parser.add_argument("--title", required=True)
parser.add_argument("--author", required=True)
args = parser.parse_args()

reader = PdfReader(args.entrada)
last = args.last or len(reader.pages)
if not 1 <= args.first <= last <= len(reader.pages):
    raise SystemExit(f"Intervalo inválido: o arquivo tem {len(reader.pages)} páginas.")

writer = PdfWriter()
for page in reader.pages[args.first - 1 : last]:
    writer.add_page(page)
writer.add_metadata({"/Title": args.title, "/Author": args.author})
writer.create_viewer_preferences()
writer.viewer_preferences.display_doc_title = True

with open(args.saida, "wb") as out:
    writer.write(out)
print(f"{args.saida}: {last - args.first + 1} páginas")
