#!/usr/bin/env python3
"""
Generate Hungarian audio using Microsoft edge-tts (neural, natural quality).
Run: python scripts/generate_audio.py
Requires: pip install edge-tts
Voice: hu-HU-NoemiNeural (female, natural)
"""

import asyncio
import json
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("Please install edge-tts: pip install edge-tts")
    exit(1)

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio"
CONTENT_DIR = Path(__file__).parent.parent / "src" / "content"
VOICE = "hu-HU-NoemiNeural"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


async def generate(text, filename):
    path = OUTPUT_DIR / filename
    if path.exists():
        print(f"  skip (exists): {filename}")
        return
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(str(path))
    print(f"  generated: {filename}")


async def process_daily():
    with open(CONTENT_DIR / "daily.json") as f:
        items = json.load(f)
    for item in items:
        await generate(item["hu"], Path(item["audio"]).name)


async def process_vocab():
    with open(CONTENT_DIR / "vocab.json") as f:
        items = json.load(f)
    for item in items:
        await generate(item["hu"], Path(item["audio"]).name)


async def process_news():
    with open(CONTENT_DIR / "news.json") as f:
        passages = json.load(f)
    for passage in passages:
        for sentence in passage["sentences"]:
            await generate(sentence["hu"], Path(sentence["audio"]).name)


async def main():
    print("Generating daily conversation audio...")
    await process_daily()
    print("Generating vocabulary audio...")
    await process_vocab()
    print("Generating news audio...")
    await process_news()
    print("Done!")


asyncio.run(main())
