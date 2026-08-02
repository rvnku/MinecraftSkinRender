import { Texture, MeshBasicMaterial, DoubleSide } from 'three';
import { generateSkinTextures, generateHeadTextures, SIDES, SIDES_ALT } from './textures';

type Side = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';
type SideAlt = 'outside' | 'inside' | 'top' | 'bottom' | 'front' | 'back';
type PartTextures<T extends Side | SideAlt = Side> = Record<T, Texture>;
export type SideMaterials = MeshBasicMaterial[];

export interface HeadMaterials {
  head: SideMaterials;
  helmet: SideMaterials;
}

export interface SkinMaterials {
  head: SideMaterials;
  helmet: SideMaterials;
  body: SideMaterials;
  rightLeg: SideMaterials;
  leftLeg: SideMaterials;
  rightArm: SideMaterials;
  leftArm: SideMaterials;
  bodySecond: SideMaterials | null;
  rightLegSecond: SideMaterials | null;
  leftLegSecond: SideMaterials | null;
  rightArmSecond: SideMaterials | null;
  leftArmSecond: SideMaterials | null;
}

function createSideMaterials<T extends Side | SideAlt>(
  textures: PartTextures<T> | null,
  second: boolean = false
): SideMaterials | null {
  if (!textures) return null;
  if ('inside' in textures) {
    return SIDES_ALT.map(
      side =>
        new MeshBasicMaterial({
          map: (textures as PartTextures<SideAlt>)[side],
          transparent: second,
          ...(second
            ? {
              side: DoubleSide,
              depthWrite: false,
            }
            : {}),
        })
    );
  } else {
    return SIDES.map(
      side =>
        new MeshBasicMaterial({
          map: (textures as PartTextures<Side>)[side],
          transparent: second,
          ...(second
            ? {
              side: DoubleSide,
              depthWrite: false,
            }
            : {}),
        })
    );
  }
}

export function generateHeadMaterials(skin: Texture): HeadMaterials {
  const textures = generateHeadTextures(skin);
  return {
    head: createSideMaterials(textures.head) as SideMaterials,
    helmet: createSideMaterials(textures.helmet, true) as SideMaterials,
  };
}

export function generateSkinMaterials(skin: Texture, slim: boolean): SkinMaterials {
  const textures = generateSkinTextures(skin, slim);
  return {
    head: createSideMaterials(textures.head) as SideMaterials,
    helmet: createSideMaterials(textures.helmet, true) as SideMaterials,
    body: createSideMaterials(textures.body) as SideMaterials,
    rightLeg: createSideMaterials(textures.rightLeg) as SideMaterials,
    leftLeg: createSideMaterials(textures.leftLeg) as SideMaterials,
    rightArm: createSideMaterials(textures.rightArm) as SideMaterials,
    leftArm: createSideMaterials(textures.leftArm) as SideMaterials,
    bodySecond: createSideMaterials(textures.bodySecond, true),
    rightLegSecond: createSideMaterials(textures.rightLegSecond, true),
    leftLegSecond: createSideMaterials(textures.leftLegSecond, true),
    rightArmSecond: createSideMaterials(textures.rightArmSecond, true),
    leftArmSecond: createSideMaterials(textures.leftArmSecond, true),
  };
}
