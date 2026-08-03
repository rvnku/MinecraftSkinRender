import { Texture } from 'three';
import { createPaddedTexture } from './padding';

type Side = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';
type SideAlt = 'outside' | 'inside' | 'top' | 'bottom' | 'front' | 'back';
type PartTextures<T extends Side | SideAlt = Side> = Record<T, Texture>;

interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface HeadTextures {
  head: PartTextures;
  helmet: PartTextures | null;
}

interface SkinTextures {
  head: PartTextures;
  helmet: PartTextures;
  body: PartTextures;
  rightLeg: PartTextures<SideAlt>;
  leftLeg: PartTextures<SideAlt>;
  rightArm: PartTextures<SideAlt>;
  leftArm: PartTextures<SideAlt>;
  bodySecond: PartTextures | null;
  leftLegSecond: PartTextures<SideAlt> | null;
  rightLegSecond: PartTextures<SideAlt> | null;
  leftArmSecond: PartTextures<SideAlt> | null;
  rightArmSecond: PartTextures<SideAlt> | null;
}

function getHeadTextures(skin: Texture, helmet: boolean): PartTextures {
  const regions = {
    front: { x: 8, y: 8, w: 8, h: 8 },
    back: { x: 24, y: 8, w: 8, h: 8 },
    left: { x: 0, y: 8, w: 8, h: 8 },
    right: { x: 16, y: 8, w: 8, h: 8 },
    top: { x: 8, y: 0, w: 8, h: 8 },
    bottom: { x: 16, y: 0, w: 8, h: 8 },
  };
  const textures = {} as PartTextures;
  for (const [side, { x, y, w, h }] of Object.entries(regions) as [Side, Region][]) {
    const texture = createPaddedTexture(skin, x + (helmet ? 32 : 0), y, w, h);
    if (side === 'bottom') {
      texture.flipY = false;
    }
    textures[side] = texture;
  }
  return textures;
}

function getBodyTextures(skin: Texture, second: boolean): PartTextures {
  const regions = {
    front: { x: 20, y: 20, w: 8, h: 12 },
    back: { x: 32, y: 20, w: 8, h: 12 },
    left: { x: 28, y: 20, w: 4, h: 12 },
    right: { x: 16, y: 20, w: 4, h: 12 },
    top: { x: 20, y: 16, w: 8, h: 4 },
    bottom: { x: 28, y: 16, w: 8, h: 4 },
  };
  const textures = {} as PartTextures;
  for (const [side, { x, y, w, h }] of Object.entries(regions) as [Side, Region][]) {
    const texture = createPaddedTexture(skin, x, y + (second ? 16 : 0), w, h);
    if (side === 'bottom') {
      texture.center.set(0.5, 0.5);
      texture.rotation = Math.PI;
    }
    textures[side] = texture;
  }
  return textures;
}

function getLegTextures(
  skin: Texture,
  part: 'left' | 'right',
  second: boolean
): PartTextures<SideAlt> {
  const regions = {
    front: { x: 4, y: 20, w: 4, h: 12 },
    back: { x: 12, y: 20, w: 4, h: 12 },
    inside: { x: 8, y: 20, w: 4, h: 12 },
    outside: { x: 0, y: 20, w: 4, h: 12 },
    top: { x: 4, y: 16, w: 4, h: 4 },
    bottom: { x: 8, y: 16, w: 4, h: 4 },
  };
  const textures = {} as PartTextures<SideAlt>;
  for (const [side, region] of Object.entries(regions) as [SideAlt, Region][]) {
    let { x, y, w, h } = region;
    if (part === 'right' && second) y += 16;
    if (part === 'left') {
      y += 32;
      if (!second) x += 16;
    }
    const texture = createPaddedTexture(skin, x, y, w, h);
    textures[side] = texture;
  }
  return textures;
}

function getArmTextures(
  skin: Texture,
  part: 'left' | 'right',
  second: boolean,
  slim: boolean
): PartTextures<SideAlt> {
  const regions = {
    front: { x: 44, y: 20, w: 4, h: 12 },
    back: { x: 52, y: 20, w: 4, h: 12 },
    inside: { x: 48, y: 20, w: 4, h: 12 },
    outside: { x: 40, y: 20, w: 4, h: 12 },
    top: { x: 44, y: 16, w: 4, h: 4 },
    bottom: { x: 48, y: 16, w: 4, h: 4 },
  };
  const textures = {} as PartTextures<SideAlt>;
  for (const [side, region] of Object.entries(regions) as [SideAlt, Region][]) {
    let { x, y, w, h } = region;
    if (part === 'right' && second) y += 16;
    if (part === 'left') {
      y += 32;
      x += second ? 8 : -8;
    }
    if (slim) {
      if (['front', 'back', 'top', 'bottom'].includes(side)) w--;
      if (['bottom', 'inside', 'back'].includes(side)) x--;
    }
    const texture = createPaddedTexture(skin, x, y, w, h);
    textures[side] = texture;
  }
  return textures;
}

export const SIDES: Side[] = ['right', 'left', 'top', 'bottom', 'front', 'back'];
export const SIDES_ALT: SideAlt[] = ['inside', 'outside', 'top', 'bottom', 'front', 'back'];

export function generateHeadTextures(skin: Texture): HeadTextures {
  return {
    head: getHeadTextures(skin, false),
    helmet: getHeadTextures(skin, true),
  };
}

export function generateSkinTextures(skin: Texture, slim: boolean): SkinTextures {
  const second = (skin.image as HTMLImageElement)?.height === 64;
  return {
    head: getHeadTextures(skin, false),
    helmet: getHeadTextures(skin, true),
    body: getBodyTextures(skin, false),
    rightLeg: getLegTextures(skin, 'right', false),
    leftLeg: getLegTextures(skin, second ? 'left' : 'right', false),
    rightArm: getArmTextures(skin, 'right', false, slim),
    leftArm: getArmTextures(skin, second ? 'left' : 'right', false, slim),
    bodySecond: second ? getBodyTextures(skin, true) : null,
    rightLegSecond: second ? getLegTextures(skin, 'right', true) : null,
    leftLegSecond: second ? getLegTextures(skin, 'left', true) : null,
    rightArmSecond: second ? getArmTextures(skin, 'right', true, slim) : null,
    leftArmSecond: second ? getArmTextures(skin, 'left', true, slim) : null,
  };
}
