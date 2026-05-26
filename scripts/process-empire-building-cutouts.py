#!/usr/bin/env python3
"""Strip grass/ground backgrounds from empire building PNGs → transparent cutouts."""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BUILDINGS_DIR = ROOT / "public" / "empire" / "buildings"

BUILDING_FILES = [
    "bamboo_farm.png",
    "storage.png",
    "bank.png",
    "market_stall.png",
    "insurance_hut.png",
    "training_dojo.png",
    "trading_post.png",
    "panda_house.png",
]


def is_background(r: int, g: int, b: int) -> bool:
    if g > 200 and r > 170 and b > 170 and g >= r and g >= b:
        return True
    if g > r + 18 and g > b + 12 and g > 95:
        return True
    if g > 120 and r > 90 and b < 100 and abs(r - g) < 55:
        return True
    if r > 140 and g > 120 and b < 100 and (r - b) > 30:
        return True
    lum = (r + g + b) / 3
    if lum > 210 and g >= r - 15 and g >= b - 10:
        return True
    return False


def flood_background(img: Image.Image) -> Image.Image:
    px = img.load()
    w, h = img.size
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, a = px[x, y]
        if a == 0 or is_background(r, g, b):
            px[x, y] = (r, g, b, 0)
            queue.append((x + 1, y))
            queue.append((x - 1, y))
            queue.append((x, y + 1))
            queue.append((x, y - 1))
    return img


def trim_and_square(img: Image.Image, size: int) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    cropped = img.crop(bbox)
    max_dim = max(cropped.size)
    pad = int(max_dim * 0.06)
    canvas = max_dim + pad * 2
    square = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    x = (canvas - cropped.width) // 2
    y = canvas - cropped.height - pad
    square.paste(cropped, (x, y), cropped)
    return square.resize((size, size), Image.Resampling.LANCZOS)


def process_file(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    img = flood_background(img)
    base = trim_and_square(img, 512)
    hi = trim_and_square(img, 1024)
    base.save(path, optimize=True)
    hi.save(path.with_name(path.stem + "@2x.png"), optimize=True)
    print(f"Processed {path.name}")


def main() -> int:
    for name in BUILDING_FILES:
        path = BUILDINGS_DIR / name
        if not path.exists():
            print(f"Skip missing {name}", file=sys.stderr)
            continue
        process_file(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
