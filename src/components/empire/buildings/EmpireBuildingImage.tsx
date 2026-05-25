import React from 'react';
import type { BuildingType } from './BuildingTypes';
import {
  empireBuildingImageSrc,
  empireBuildingImageSrcSet,
} from './empire-building-assets';

interface EmpireBuildingImageProps {
  type: BuildingType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

const SIZE_CLASS = {
  sm: 'h-14 w-14',
  md: 'h-20 w-20',
  lg: 'h-28 w-28',
} as const;

const SIZE_ATTR = {
  sm: '56px',
  md: '80px',
  lg: '112px',
} as const;

/** Shared building art for build menu and UI previews */
const EmpireBuildingImage: React.FC<EmpireBuildingImageProps> = ({
  type,
  className = '',
  size = 'md',
  alt,
}) => (
  <img
    src={empireBuildingImageSrc(type)}
    srcSet={empireBuildingImageSrcSet(type)}
    sizes={SIZE_ATTR[size]}
    alt={alt ?? type}
    className={`object-contain object-bottom drop-shadow-md ${SIZE_CLASS[size]} ${className}`}
    draggable={false}
    loading="lazy"
    decoding="async"
  />
);

export default EmpireBuildingImage;
