import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Projection } from '../../../types';

export function AutoCamera({
  projection,
  position,
  resetKey,
}: {
  projection: Projection;
  position: [number, number, number];
  resetKey?: number;
}) {
  const { size, set } = useThree();
  const camRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);
  const prevResetKey = useRef<number | undefined>(resetKey);

  useEffect(() => {
    const aspect = 1;
    const targetRatio = 0.5;
    const distance = Math.sqrt(position[0] ** 2 + position[1] ** 2 + position[2] ** 2);

    const isPersp = camRef.current instanceof THREE.PerspectiveCamera;
    const isOrtho = camRef.current instanceof THREE.OrthographicCamera;
    const needNew = (projection === 'persp' && !isPersp) || (projection === 'iso' && !isOrtho);

    const oldPos = camRef.current ? camRef.current.position.clone() : null;

    if (needNew) {
      let newCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
      if (projection === 'persp') {
        const fov = 2 * Math.atan(1 / targetRatio / (2 * distance)) * (180 / Math.PI);
        newCamera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
      } else {
        const height = 1 / targetRatio;
        const width = height * aspect;
        newCamera = new THREE.OrthographicCamera(
          -width / 2,
          width / 2,
          height / 2,
          -height / 2,
          0.1,
          1000
        );
      }
      if (oldPos) {
        newCamera.position.copy(oldPos);
      } else {
        newCamera.position.set(position[0], position[1], position[2]);
      }
      newCamera.lookAt(0, 0, 0);
      camRef.current = newCamera;
      set({ camera: newCamera });
    } else {
      const cam = camRef.current!;
      if (projection === 'persp') {
        (cam as THREE.PerspectiveCamera).fov =
          2 * Math.atan(1 / targetRatio / (2 * distance)) * (180 / Math.PI);
        (cam as THREE.PerspectiveCamera).aspect = aspect;
      } else {
        const height = 1 / targetRatio;
        const width = height * aspect;
        const ortho = cam as THREE.OrthographicCamera;
        ortho.left = -width / 2;
        ortho.right = width / 2;
        ortho.top = height / 2;
        ortho.bottom = -height / 2;
      }
      if (resetKey !== prevResetKey.current) {
        cam.position.set(position[0], position[1], position[2]);
        prevResetKey.current = resetKey;
      }
      cam.lookAt(0, 0, 0);
      cam.updateProjectionMatrix();
    }
  }, [projection, position, resetKey, size, set]);

  return null;
}
