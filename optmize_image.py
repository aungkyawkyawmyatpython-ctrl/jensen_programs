from pathlib import Path
from PIL import Image, ImageOps

PUBLIC = Path("public")
MAX_SIZE = 1920
QUALITY = 84
MIN_SIZE = 1 * 1024 * 1024

for path in PUBLIC.rglob("*"):
    if path.suffix.lower() not in {".jpg", ".jpeg"}:
        continue

    if path.stat().st_size <= MIN_SIZE:
        continue

    old_size = path.stat().st_size

    try:
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            image = image.convert("RGB")

            image.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)

            image.save(
                path,
                "JPEG",
                quality=QUALITY,
                optimize=True,
                progressive=True,
            )

        new_size = path.stat().st_size

        print(
            f"{path} | "
            f"{old_size / 1024 / 1024:.2f} MB -> "
            f"{new_size / 1024 / 1024:.2f} MB"
        )

    except Exception as error:
        print(f"SKIPPED {path}: {error}")