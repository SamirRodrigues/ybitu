#!/usr/bin/env python3
"""Gera legendas (SRT + JSON) a partir da narração e de public/audio/durations.json.

Saída: public/captions/{pt,es}.srt e public/captions/captions.{pt,es}.json
JSON: [{"startMs", "endMs", "text"}] em tempo absoluto do vídeo; quebra de linha com "\n".

Regra de tempo (a mesma de src/timing.ts): cada cena dura
max(tempo do roteiro, fala + 0,6 s). Sem durations.json, usa o tempo do roteiro.
Dentro da cena, cada trecho recebe tempo proporcional ao número de caracteres da fala.
Rode de novo sempre que trocar o áudio (make_audio.py).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_audio import NARRACAO, ROTEIRO  # noqa: E402

LINE = 32       # caracteres por linha
LINES = 2       # linhas por legenda
LEAD = 0.15     # silêncio inicial dos WAV (s)
TAIL = 0.6      # folga depois da fala (s)


def wrap(text: str) -> list[str]:
    lines, cur = [], ""
    for w in text.split():
        if cur and len(cur) + 1 + len(w) > LINE:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return lines


def chunks(sentence: str) -> list[str]:
    """Corta em trechos de até 2 linhas, preferindo pontuação."""
    out = []
    parts = re.split(r"(?<=[.!?])\s+", sentence.strip())
    for part in parts:
        if len(wrap(part)) <= LINES:
            out.append(part)
            continue
        # Tenta cortar nas vírgulas; senão, por palavras.
        pieces = re.split(r"(?<=,)\s+", part)
        buf = ""
        for piece in pieces:
            cand = f"{buf} {piece}".strip()
            if len(wrap(cand)) <= LINES:
                buf = cand
                continue
            if buf:
                out.append(buf)
            buf = piece
            while len(wrap(buf)) > LINES:
                ls = wrap(buf)
                out.append(" ".join(ls[:LINES]))
                buf = " ".join(ls[LINES:])
        if buf:
            out.append(buf)
    return out


def main():
    dur_path = ROOT / "public" / "audio" / "durations.json"
    durations = json.loads(dur_path.read_text()) if dur_path.exists() else {}
    cap_dir = ROOT / "public" / "captions"
    cap_dir.mkdir(parents=True, exist_ok=True)

    for lang, falas in NARRACAO.items():
        cues, t0 = [], 0.0
        for i, fala in enumerate(falas, start=1):
            speech = durations.get(lang, {}).get(f"cena{i}")
            scene = max(ROTEIRO[i - 1], speech + TAIL) if speech else ROTEIRO[i - 1]
            speak = speech - LEAD if speech else scene - TAIL
            parts = chunks(fala)
            total = sum(len(p) for p in parts)
            t = t0 + LEAD
            for j, p in enumerate(parts):
                d = speak * len(p) / total
                end = t + d if j < len(parts) - 1 else t0 + LEAD + speak + 0.3
                cues.append({"startMs": round(t * 1000), "endMs": round(min(end, t0 + scene) * 1000),
                             "text": "\n".join(wrap(p))})
                t += d
            t0 += scene

        (cap_dir / f"captions.{lang}.json").write_text(json.dumps(cues, ensure_ascii=False, indent=1) + "\n")

        def ts(ms):
            h, ms = divmod(ms, 3600000)
            m, ms = divmod(ms, 60000)
            s, ms = divmod(ms, 1000)
            return f"{h:02}:{m:02}:{s:02},{ms:03}"

        srt = "\n".join(f"{k}\n{ts(c['startMs'])} --> {ts(c['endMs'])}\n{c['text']}\n"
                        for k, c in enumerate(cues, start=1))
        (cap_dir / f"{lang}.srt").write_text(srt)
        print(f"{lang}: {len(cues)} legendas, fim {cues[-1]['endMs'] / 1000:.2f} s, vídeo {t0:.2f} s")


if __name__ == "__main__":
    main()
