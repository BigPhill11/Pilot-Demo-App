import type { BuildingType } from './BuildingTypes';
import { BUILDING_DEFINITIONS } from './BuildingTypes';

export const EMPIRE_BUILDING_ASSET_VERSION = 'v2';

/** Isometric PNG sprites for map buildings (transparent cutouts) */
export const EMPIRE_BUILDING_IMAGES: Record<BuildingType, string> = {
  bamboo_farm: '/empire/buildings/bamboo_farm.png',
  storage: '/empire/buildings/storage.png',
  bank: '/empire/buildings/bank.png',
  market_stall: '/empire/buildings/market_stall.png',
  insurance_hut: '/empire/buildings/insurance_hut.png',
  training_dojo: '/empire/buildings/training_dojo.png',
  trading_post: '/empire/buildings/trading_post.png',
  panda_house: '/empire/buildings/panda_house.png',
};

export function empireBuildingImageSrc(type: BuildingType, preferHiRes = false): string {
  const base = EMPIRE_BUILDING_IMAGES[type];
  const file = preferHiRes ? base.replace('.png', '@2x.png') : base;
  return `${file}?${EMPIRE_BUILDING_ASSET_VERSION}`;
}

export function empireBuildingImageSrcSet(type: BuildingType): string {
  const base = EMPIRE_BUILDING_IMAGES[type];
  const hi = base.replace('.png', '@2x.png') + `?${EMPIRE_BUILDING_ASSET_VERSION}`;
  return `${base}?${EMPIRE_BUILDING_ASSET_VERSION} 1x, ${hi} 2x`;
}

/** Base display size in SVG user units (tile width ≈ 64) */
export const EMPIRE_BUILDING_SPRITE_SIZE = { width: 72, height: 72 };

export function getBuildingSpriteLayout(type: BuildingType): {
  width: number;
  height: number;
  offsetY: number;
} {
  const def = BUILDING_DEFINITIONS[type];
  const tileSpan = Math.max(def.size.width, def.size.height);
  const width = EMPIRE_BUILDING_SPRITE_SIZE.width * (0.75 + tileSpan * 0.42);
  const height = EMPIRE_BUILDING_SPRITE_SIZE.height * (0.75 + tileSpan * 0.42);
  const offsetY = -height * 0.78 + (def.visual?.anchorOffsetY ?? 0);
  return { width, height, offsetY };
}
