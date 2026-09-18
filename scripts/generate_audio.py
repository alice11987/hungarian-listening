#!/usr/bin/env python3
"""
Generate Hungarian audio files using gTTS.
Run: python scripts/generate_audio.py
Requires: pip install gtts
"""

import json
import os
from pathlib import Path

try:
    from gtts import gTTS
except ImportError:
    print("Please install gTTS: pip install gtts")
    exit(1)

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio"
CONTENT_DIR = Path(__file__).parent.parent / "src" / "content"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate(text, filename):
    path = OUTPUT_DIR / filename
    if path.exists():
        print(f"  skip (exists): {filename}")
        return
    tts = gTTS(text=text, lang="hu", slow=False)
    tts.save(str(path))
    print(f"  generated: {filename}")


def process_daily():
    with open(CONTENT_DIR / "daily.json") as f:
        items = json.load(f)
    for item in items:
        fname = Path(item["audio"]).name
        generate(item["hu"], fname)


def process_vocab():
    with open(CONTENT_DIR / "vocab.json") as f:
        items = json.load(f)
    for item in items:
        fname = Path(item["audio"]).name
        generate(item["hu"], fname)


def process_news():
    with open(CONTENT_DIR / "news.json") as f:
        passages = json.load(f)
    for passage in passages:
        for sentence in passage["sentences"]:
            fname = Path(sentence["audio"]).name
            generate(sentence["hu"], fname)


if __name__ == "__main__":
    print("Generating daily conversation audio...")
    process_daily()
    print("Generating vocabulary audio...")
    process_vocab()
    print("Generating news audio...")
    process_news()
    print("Done!")
