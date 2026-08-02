import { useEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { Group } from 'three';
import { generateSkinMaterials } from '../../../utils/materials';
import type { Animation } from '../../../types';
import { useCharacterAnimation } from '../../../useful/useCharacterAnimations';

interface CubeProperties {
  skinUrl: string;
  showSecondLayer: boolean;
  slimModel: boolean;
  animation: Animation;
  onReady: (() => void) | undefined;
}

export function Body({ skinUrl, showSecondLayer, slimModel, animation, onReady }: CubeProperties) {
  const skin = useTexture(skinUrl);
  const materials = useMemo(() => generateSkinMaterials(skin, slimModel), [skin, slimModel]);

  const headRef = useRef<Group>(null!);
  const bodyRef = useRef<Group>(null!);
  const rightArmRef = useRef<Group>(null!);
  const leftArmRef = useRef<Group>(null!);
  const rightLegRef = useRef<Group>(null!);
  const leftLegRef = useRef<Group>(null!);

  useCharacterAnimation(animation, {
    head: headRef,
    body: bodyRef,
    rightArm: rightArmRef,
    leftArm: leftArmRef,
    rightLeg: rightLegRef,
    leftLeg: leftLegRef,
  });

  useEffect(() => {
    if (materials && onReady) onReady();
  }, [materials, onReady]);

  if (!materials) return null;

  const armWidth = slimModel ? 3 : 4;
  const armX = slimModel ? 5.5 : 6;

  return (
    <group rotation={[0, Math.PI / 2, 0]} scale={1 / 18}>
      <group ref={headRef} position={[0, 12, 0]}>
        <mesh material={materials.head} renderOrder={0}>
          <boxGeometry args={[8, 8, 8]} />
        </mesh>
        {showSecondLayer && (
          <mesh material={materials.helmet} scale={9 / 8} renderOrder={1}>
            <boxGeometry args={[8, 8, 8]} />
          </mesh>
        )}
      </group>

      <group ref={bodyRef} position={[0, 2, 0]}>
        <mesh material={materials.body} renderOrder={0}>
          <boxGeometry args={[8, 12, 4]} />
        </mesh>
        {showSecondLayer && materials.bodySecond && (
          <mesh material={materials.bodySecond} scale={9 / 8} renderOrder={1}>
            <boxGeometry args={[8, 12, 4]} />
          </mesh>
        )}
      </group>

      <group ref={rightArmRef} position={[-armX, 8, 0]}>
        <mesh material={materials.rightArm} position={[0, -6, 0]} renderOrder={0}>
          <boxGeometry args={[armWidth, 12, 4]} />
        </mesh>
        {showSecondLayer && materials.rightArmSecond && (
          <mesh
            material={materials.rightArmSecond}
            position={[0, -6, 0]}
            scale={9 / 8}
            renderOrder={1}
          >
            <boxGeometry args={[armWidth, 12, 4]} />
          </mesh>
        )}
      </group>

      <group ref={leftArmRef} position={[armX, 8, 0]}>
        <mesh material={materials.leftArm} position={[0, -6, 0]} renderOrder={0}>
          <boxGeometry args={[armWidth, 12, 4]} />
        </mesh>
        {showSecondLayer && materials.leftArmSecond && (
          <mesh
            material={materials.leftArmSecond}
            position={[0, -6, 0]}
            scale={9 / 8}
            renderOrder={1}
          >
            <boxGeometry args={[armWidth, 12, 4]} />
          </mesh>
        )}
      </group>

      <group ref={rightLegRef} position={[-2, -4, 0]}>
        <mesh material={materials.rightLeg} position={[0, -6, 0]} renderOrder={0}>
          <boxGeometry args={[4, 12, 4]} />
        </mesh>
        {showSecondLayer && materials.rightLegSecond && (
          <mesh
            material={materials.rightLegSecond}
            position={[0, -6, 0]}
            scale={9 / 8}
            renderOrder={1}
          >
            <boxGeometry args={[4, 12, 4]} />
          </mesh>
        )}
      </group>

      <group ref={leftLegRef} position={[2, -4, 0]}>
        <mesh material={materials.leftLeg} position={[0, -6, 0]} renderOrder={0}>
          <boxGeometry args={[4, 12, 4]} />
        </mesh>
        {showSecondLayer && materials.leftLegSecond && (
          <mesh
            material={materials.leftLegSecond}
            position={[0, -6, 0]}
            scale={9 / 8}
            renderOrder={1}
          >
            <boxGeometry args={[4, 12, 4]} />
          </mesh>
        )}
      </group>
    </group>
  );
}
