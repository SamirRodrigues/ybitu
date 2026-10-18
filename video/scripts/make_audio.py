#!/usr/bin/env python3
"""Gera a narração-guia do vídeo (uma fala por cena) e mede as durações.

Saída: video/public/audio/{pt,es}/cenaN.wav e video/public/audio/durations.json

Motores:
  espeak  (padrão) espeak-ng + MBROLA. Grátis e offline, mas ROBÓTICO: só serve de guia.
  piper   Piper TTS (pip install piper-tts), modelos pt_BR-faber-medium / es_MX-claude-high.
          Passe o caminho dos .onnx com --piper-model-pt / --piper-model-es.
  edge    edge-tts (pip install edge-tts), vozes pt-BR-FranciscaNeural / es-MX-DaliaNeural.
          Precisa de internet. Converte para WAV com ffmpeg.

Exemplos:
  python3 video/scripts/make_audio.py
  python3 video/scripts/make_audio.py --engine edge
  python3 video/scripts/make_audio.py --engine piper --piper-model-pt ~/piper/pt_BR-faber-medium.onnx
Depois de trocar o áudio, renderize de novo: as cenas se ajustam ao durations.json.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio"

# Texto EXATO de docs/video/roteiro.md (sem as aspas).
NARRACAO = {
    "pt": [
        "Há memórias que não se apagam. Elas só adormecem, esperando alguém para acordá-las.",
        "Nas terras do Catu, no Rio Grande do Norte, vive o povo potiguara. E ali, professores guardam e contam histórias sobre a sua língua, a sua escola e o seu povo.",
        "Essas histórias viraram Ybitu: um livro infantil inédito, escrito no Rio Grande do Norte, sobre os indígenas potiguaras do Catu. Para que as crianças conheçam essas memórias, e nunca mais as esqueçam.",
        "A pré-venda está aberta. São cinquenta e cinco reais, só pelo nosso site, e temos poucas unidades.",
        "Acorde essa memória. Reserve o seu em ybituolivro ponto com ponto br.",
    ],
    "es": [
        "Hay memorias que no se borran. Solo duermen, esperando a alguien que las despierte.",
        "En las tierras de Catu, en Rio Grande do Norte, vive el pueblo potiguara. Y allí, los profesores guardan y cuentan historias sobre su lengua, su escuela y su pueblo.",
        "Esas historias se volvieron Ybitu: un libro infantil inédito, escrito en Rio Grande do Norte, sobre los indígenas potiguaras de Catu. Para que los niños conozcan esas memorias, y nunca más las olviden.",
        "La preventa está abierta. Son cincuenta y cinco reales brasileños, solo en nuestro sitio, y quedan pocas unidades.",
        "Despierta esa memoria. Reserva el tuyo en ybituolivro punto com punto br.",
    ],
}

# Tempo de cada cena no roteiro (s), para avisar quando a fala passa.
ROTEIRO = [5, 9, 12, 7, 6]

# mb-es3 exige o pacote mbrola-es3; se não estiver instalado, cai para a voz nativa es-419.
ESPEAK_VOICE = {"pt": "mb-br2", "es": "mb-es3"}
ESPEAK_FALLBACK = {"pt": "pt-br", "es": "es-419"}
EDGE_VOICE = {"pt": "pt-BR-FranciscaNeural", "es": "es-MX-DaliaNeural"}


def run(cmd, **kw):
    subprocess.run(cmd, check=True, **kw)


def to_wav(src: Path, dst: Path):
    """Normaliza para WAV 48 kHz mono, com 0,15 s de silêncio no início."""
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src),
         "-af", "adelay=150,loudnorm=I=-16:TP=-1.5", "-ar", "48000", "-ac", "1", str(dst)])


def synth(engine: str, lang: str, text: str, dst: Path, args):
    tmp = dst.with_suffix(".tmp.wav")
    if engine == "espeak":
        voice = ESPEAK_VOICE[lang]
        if not Path(f"/usr/share/mbrola/{voice[3:]}").exists():
            print(f"  aviso: voz MBROLA {voice} ausente, usando {ESPEAK_FALLBACK[lang]}")
            voice = ESPEAK_FALLBACK[lang]
        run(["espeak-ng", "-v", voice, "-s", str(args.rate if lang == "pt" else args.rate_es), "-w", str(tmp), text])
    elif engine == "piper":
        model = args.piper_model_pt if lang == "pt" else args.piper_model_es
        if not model:
            sys.exit(f"Informe --piper-model-{lang}")
        run(["piper", "--model", model, "--output_file", str(tmp)], input=text.encode())
    elif engine == "edge":
        mp3 = dst.with_suffix(".tmp.mp3")
        run(["edge-tts", "--voice", EDGE_VOICE[lang], "--text", text, "--write-media", str(mp3)])
        tmp = mp3
    to_wav(tmp, dst)
    tmp.unlink(missing_ok=True)


def duration(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(path)], capture_output=True, text=True, check=True)
    return round(float(out.stdout.strip()), 3)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--engine", choices=["espeak", "piper", "edge"], default="espeak")
    p.add_argument("--langs", default="pt,es")
    p.add_argument("--rate", type=int, default=150, help="palavras/min do pt (só espeak)")
    p.add_argument("--rate-es", type=int, default=175, help="palavras/min do es (só espeak; a voz es-419 é lenta)")
    p.add_argument("--piper-model-pt")
    p.add_argument("--piper-model-es")
    args = p.parse_args()

    durations = {}
    for lang in args.langs.split(","):
        (AUDIO / lang).mkdir(parents=True, exist_ok=True)
        durations[lang] = {}
        for i, text in enumerate(NARRACAO[lang], start=1):
            dst = AUDIO / lang / f"cena{i}.wav"
            synth(args.engine, lang, text, dst, args)
            d = duration(dst)
            durations[lang][f"cena{i}"] = d
            flag = "  PASSA do tempo do roteiro" if d > ROTEIRO[i - 1] else ""
            print(f"{lang} cena{i}: {d:.2f} s (roteiro {ROTEIRO[i-1]} s){flag}")
    (AUDIO / "durations.json").write_text(json.dumps(durations, indent=2) + "\n")
    print("Gravado", AUDIO / "durations.json")


if __name__ == "__main__":
    main()
