import { Texture, MeshBasicMaterial, DoubleSide } from 'three';
import { generateSkinTextures, generateHeadTextures, SIDES } from './textures';

type Side = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';
type PartTextures = Record<Side, Texture>;
export type SideMaterials = MeshBasicMaterial[];

export interface HeadMaterials {
  head: SideMaterials;
  helmet: SideMaterials | null;
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

function createSideMaterials(
  textures: PartTextures | null,
  second: boolean = false
): SideMaterials | null {
  if (!textures) return null;
  return SIDES.map(
    side =>
      new MeshBasicMaterial({
        map: textures[side],
        transparent: true,
        ...(second
          ? {
            side: DoubleSide,
            depthWrite: false,
          }
          : {}),
      })
  );
}

export function generateHeadMaterials(skin: Texture, showHelmet: boolean): HeadMaterials {
  const textures = generateHeadTextures(skin, showHelmet);
  return {
    head: createSideMaterials(textures.head) as SideMaterials,
    helmet: createSideMaterials(textures.helmet),
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
