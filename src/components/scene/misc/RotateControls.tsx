import { useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

export function RotateControls() {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.style.touchAction = 'none';

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 0) {
        isDragging.current = true;
        previousMouse.current = { x: e.clientX, y: e.clientY };
        canvas.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();

      let dx, dy;
      if (e.movementX !== undefined && e.movementY !== undefined) {
        dx = e.movementX;
        dy = e.movementY;
      } else {
        dx = e.clientX - previousMouse.current.x;
        dy = e.clientY - previousMouse.current.y;
        previousMouse.current = { x: e.clientX, y: e.clientY };
      }

      const sensitivity = 0.01;
      const radius = camera.position.length();

      let theta = Math.atan2(camera.position.x, camera.position.z) - dx * sensitivity;
      let phi = Math.acos(camera.position.y / radius) - dy * sensitivity;

      phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.button === 0) {
        isDragging.current = false;
        canvas.releasePointerCapture(e.pointerId);
        e.preventDefault();
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.style.touchAction = '';
    };
  }, [camera, gl]);

  return null;
}
