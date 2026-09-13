import type { TerrainType } from './grid';

export const EMPIRE_TERRAIN_ASSET_VERSION = 'v1';

const variantFor = (x: number, y: number): number => {
  const hash = Math.imul(x + 17, 374761393) ^ Math.imul(y + 31, 668265263);
  return ((hash ^ (hash >>> 13)) >>> 0) % 3 + 1;
};

export function empireTerrainImageSrc(
  terrain: TerrainType,
  x: number,
  y: number,
  preferHiRes = false,
): string {
  const base = `/empire/terrain/${terrain}_${variantFor(x, y)}.png`;
  return `${preferHiRes ? base.replace('.png', '@2x.png') : base}?${EMPIRE_TERRAIN_ASSET_VERSION}`;
}

export function empireGroveImageSrc(x: number, y: number, preferHiRes = false): string {
  const variant = ((Math.imul(x + 3, 31) ^ Math.imul(y + 7, 17)) >>> 0) % 3 + 1;
  const base = `/empire/terrain/grove_${variant}.png`;
  return `${preferHiRes ? base.replace('.png', '@2x.png') : base}?${EMPIRE_TERRAIN_ASSET_VERSION}`;
}
