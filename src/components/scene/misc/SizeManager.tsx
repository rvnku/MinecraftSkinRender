import { useFrame, useThree } from '@react-three/fiber';

export function SizeManager() {
  const { gl } = useThree();
  const canvas = gl.domElement as HTMLCanvasElement;

  useFrame(() => {
    if (canvas.width !== 512 || canvas.height !== 512) {
      canvas.width = 512;
      canvas.height = 512;
      gl.setSize(512, 512, false);
    }

    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const scale = Math.max(rect.width / 512, rect.height / 512);

    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.width = '512px';
    canvas.style.height = '512px';
    canvas.style.transformOrigin = '0 0';
    canvas.style.transform = `translate(${-50 * scale}%, ${-50 * scale}%) scale(${scale})`;
  });

  return null;
}
