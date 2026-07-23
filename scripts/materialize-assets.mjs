import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const assets = {
  ".asset-sources/public__audio__wedding-theme.mp3.b64":
    "public/audio/wedding-theme.mp3",
  ".asset-sources/public__images__opening-texture.webp.b64":
    "public/images/opening-texture.webp",
  ".asset-sources/public__images__uzbek-portal-desktop.webp.b64":
    "public/images/uzbek-portal-desktop.webp",
  ".asset-sources/public__images__uzbek-portal-mobile.webp.b64":
    "public/images/uzbek-portal-mobile.webp",
  ".asset-sources/src__app__favicon.ico.b64": "src/app/favicon.ico",
  ".asset-sources/src__assets__fonts__bodoni-moda.woff2.b64":
    "src/assets/fonts/bodoni-moda.woff2",
  ".asset-sources/src__assets__fonts__manrope.woff2.b64":
    "src/assets/fonts/manrope.woff2",
  ".asset-sources/src__assets__fonts__newsreader-italic.woff2.b64":
    "src/assets/fonts/newsreader-italic.woff2",
  ".asset-sources/src__assets__fonts__newsreader.woff2.b64":
    "src/assets/fonts/newsreader.woff2",
  ".asset-sources/src__assets__images__dance.webp.b64":
    "src/assets/images/dance.webp",
  ".asset-sources/src__assets__images__garden.webp.b64":
    "src/assets/images/garden.webp",
  ".asset-sources/src__assets__images__groom.webp.b64":
    "src/assets/images/groom.webp",
  ".asset-sources/src__assets__images__hero.webp.b64":
    "src/assets/images/hero.webp",
  ".asset-sources/src__assets__images__rings.webp.b64":
    "src/assets/images/rings.webp",
  ".asset-sources/src__assets__images__table.webp.b64":
    "src/assets/images/table.webp",
  ".asset-sources/src__assets__images__veil.webp.b64":
    "src/assets/images/veil.webp",
  ".asset-sources/src__assets__images__venue.webp.b64":
    "src/assets/images/venue.webp",
};

for (const [source, target] of Object.entries(assets)) {
  const sourcePath = join(root, source);
  const targetPath = join(root, target);
  const encoded = await readFile(sourcePath, "utf8");
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, Buffer.from(encoded.trim(), "base64"));
  console.log(`Materialized ${target}`);
}
