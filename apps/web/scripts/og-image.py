"""
Composes the brand assets committed in app/ from assets/keyduelo-logo.png:

  public/opengraph-image.png  (1200x630 social card, referenced by OG_IMAGE in lib/seo/site.ts)
  app/icon.png (256x256 favicon)  app/apple-icon.png (180x180)  public/icon-512.png (manifest)

Run with any Python 3 that has Pillow:  python3 scripts/og-image.py
Fonts: assets/GeistMono-*.ttf (same family the app uses).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageChops

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "assets" / "keyduelo-logo.png"
FONT_R = ROOT / "assets" / "GeistMono-Regular.ttf"
FONT_B = ROOT / "assets" / "GeistMono-SemiBold.ttf"
APP = ROOT / "app"

W, H = 1200, 630
TEXT = (248, 248, 242)
PURPLE = (167, 139, 250)
MUTED = (139, 131, 184)
BG_TOP, BG_MID, BG_BOT = (10, 9, 26), (13, 11, 30), (8, 7, 22)

logo = Image.open(LOGO).convert("RGBA")

# --- icon crop: everything that is not background, above the wordmark ---
bg = Image.new("RGB", logo.size, (10, 9, 25))
diff = ImageChops.difference(logo.convert("RGB"), bg).convert("L").point(lambda v: 255 if v > 30 else 0)
top = diff.crop((0, 0, logo.width, 790))
x0, y0, x1, y1 = top.getbbox()
side = max(x1 - x0, y1 - y0) + 40
cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
icon_box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
icon = logo.crop(icon_box)
icon.resize((256, 256), Image.LANCZOS).convert("RGB").save(APP / "icon.png", optimize=True)
icon.resize((180, 180), Image.LANCZOS).convert("RGB").save(APP / "apple-icon.png", optimize=True)
icon.resize((512, 512), Image.LANCZOS).convert("RGB").save(ROOT / "public" / "icon-512.png", optimize=True)
print("icon crop", icon_box, "->", APP / "icon.png", APP / "apple-icon.png", ROOT / "public" / "icon-512.png")

# --- social card ---
card = Image.new("RGB", (W, H))
px = card.load()
for y in range(H):
    t = y / (H - 1)
    if t < 0.5:
        a, b, u = BG_TOP, BG_MID, t / 0.5
    else:
        a, b, u = BG_MID, BG_BOT, (t - 0.5) / 0.5
    col = tuple(round(a[i] + (b[i] - a[i]) * u) for i in range(3))
    for x in range(W):
        px[x, y] = col

lockup = logo.resize((H, H), Image.LANCZOS)
card.paste(lockup, (24, 0), lockup)

draw = ImageDraw.Draw(card)
def font(path, size):
    return ImageFont.truetype(str(path), size)

def fit(text, path, size, max_w):
    f = font(path, size)
    while draw.textlength(text, font=f) > max_w and size > 12:
        size -= 1
        f = font(path, size)
    return f

X, MAX_W = 668, 490
lines = [
    ("race your friends", FONT_B, 42, TEXT, 10),
    ("to the fastest wpm", FONT_B, 42, PURPLE, 34),
    ("free typing test · no account", FONT_R, 24, MUTED, 10),
    ("open source · GPL-3.0", FONT_R, 24, MUTED, 34),
    ("keyduelo.vercel.app", FONT_B, 26, PURPLE, 0),
]
fonts = [fit(t, p, s, MAX_W) for t, p, s, _, _ in lines]
heights = [f.getbbox("Ag")[3] for f in fonts]
total = sum(h + gap for (_, _, _, _, gap), h in zip(lines, heights))
y = (H - total) // 2
for (text, _, _, color, gap), f, h in zip(lines, fonts, heights):
    draw.text((X, y), text, font=f, fill=color)
    y += h + gap

card.save(ROOT / "public" / "opengraph-image.png", optimize=True)
print("card ->", ROOT / "public" / "opengraph-image.png", card.size)
