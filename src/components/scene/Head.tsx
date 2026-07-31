import { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import { generateHeadMaterials } from './materials';

interface CubeProperties {
  skinUrl: string;
  showHelmet: boolean;
  onReady: (() => void) | undefined;
}

export function Head({ skinUrl, showHelmet, onReady }: CubeProperties) {
  const skin = useTexture(skinUrl);
  const materials = useMemo(() => generateHeadMaterials(skin, showHelmet), [skin, showHelmet]);

  useEffect(() => {
    if (materials && onReady) onReady();
  }, [materials, onReady]);

  if (!materials) return null;

  return (
    <group rotation={[0, Math.PI / 2, 0]} scale={1 / 8}>
      <mesh material={materials.head}>
        <boxGeometry args={[8, 8, 8]} />
      </mesh>
      {materials.helmet && (
        <mesh material={materials.helmet} scale={9 / 8}>
          <boxGeometry args={[8, 8, 8]} />
        </mesh>
      )}
    </group>
  );
}
