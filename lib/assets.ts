/**
 * Nature Village Asset Paths
 * Centralized asset management for images and patterns
 */

// Restaurant Images
export const IMAGES = {
  // Hero and lifestyle images
  heroMountains: '/images/hero-mountains.jpg',
  interiorBooths: '/images/interior-booths.jpg',
  portraitKurdishWoman: '/images/portrait-kurdish-woman.jpg',
} as const;

// Decorative SVG Patterns
export const PATTERNS = {
  // Traditional Kurdish-inspired patterns
  floralCorner: '/patterns/floral-corner.svg',
  pomegranate: '/patterns/pomegranate-border.svg',
  sunRays: '/patterns/sun-rays.svg',
} as const;

// Asset utility functions
export const getImagePath = (imageName: keyof typeof IMAGES): string => {
  return IMAGES[imageName];
};

export const getPatternPath = (patternName: keyof typeof PATTERNS): string => {
  return PATTERNS[patternName];
};

// All assets combined for easy iteration
export const ALL_ASSETS = {
  images: IMAGES,
  patterns: PATTERNS,
} as const;

// Asset metadata for better organization
export const ASSET_METADATA = {
  images: {
    heroMountains: {
      name: 'Kurdistan Mountains Hero',
      description: 'Majestic mountain landscape representing Kurdish heritage',
      usage: 'Hero sections, landing pages',
      dimensions: '1920x1080',
    },
    interiorBooths: {
      name: 'Restaurant Interior',
      description: 'Cozy booth seating in authentic Kurdish restaurant setting',
      usage: 'About page, dining experience sections',
      dimensions: '1200x800',
    },
    portraitKurdishWoman: {
      name: 'Kurdish Heritage Portrait',
      description: 'Traditional Kurdish woman in cultural attire',
      usage: 'Culture sections, about page, testimonials',
      dimensions: '600x800',
    },
  },
  patterns: {
    floralCorner: {
      name: 'Kurdish Floral Corner',
      description: 'Traditional floral pattern for corner decorations',
      usage: 'Section dividers, card corners, decorative elements',
      dimensions: '200x200',
    },
    pomegranate: {
      name: 'Pomegranate Border',
      description: 'Repeating pomegranate pattern representing abundance',
      usage: 'Borders, dividers, menu headers',
      dimensions: '400x80',
    },
    sunRays: {
      name: 'Kurdish Sun Rays',
      description: 'Radial sun pattern symbolizing warmth and hospitality',
      usage: 'Background elements, hero overlays, decorative accents',
      dimensions: '300x300',
    },
  },
} as const;

// Type exports for TypeScript support
export type ImageKey = keyof typeof IMAGES;
export type PatternKey = keyof typeof PATTERNS;
export type AssetKey = ImageKey | PatternKey;
