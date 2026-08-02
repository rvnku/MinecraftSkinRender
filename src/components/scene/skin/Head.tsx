import { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import { generateHeadMaterials } from '../../../utils/materials';

interface CubeProperties {
  skinUrl: string;
  showSecondLayer: boolean;
  onReady: (() => void) | undefined;
}

export function Head({ skinUrl, showSecondLayer, onReady }: CubeProperties) {
  const skin = useTexture(skinUrl);
  const materials = useMemo(() => generateHeadMaterials(skin), [skin]);

  useEffect(() => {
    if (materials && onReady) onReady();
  }, [materials, onReady]);

  if (!materials) return null;

  return (
    <group rotation={[0, Math.PI / 2, 0]} scale={1 / 8}>
      {showSecondLayer && (
        <mesh material={materials.helmetBack} scale={9 / 8}>
          <boxGeometry args={[8, 8, 8]} />
        </mesh>
      )}
      <mesh material={materials.head}>
        <boxGeometry args={[8, 8, 8]} />
      </mesh>
      {showSecondLayer && (
        <mesh material={materials.helmet} scale={9 / 8}>
          <boxGeometry args={[8, 8, 8]} />
        </mesh>
      )}
    </group>
  );
}
