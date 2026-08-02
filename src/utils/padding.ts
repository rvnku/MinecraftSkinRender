import * as THREE from 'three';

export function createPaddedTexture(
  source: THREE.Texture,
  regionX: number,
  regionY: number,
  regionW: number = 8,
  regionH: number = 8
): THREE.Texture {
  const img = source.image as HTMLImageElement;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const pad = 0.00001;

  const w = regionW + pad * 2;
  const h = regionH + pad * 2;
  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(img, regionX, regionY, regionW, regionH, pad, pad, regionW, regionH);

  ctx.drawImage(canvas, pad, pad, 1, regionH, 0, pad, pad, regionH);
  ctx.drawImage(canvas, pad + regionW - 1, pad, 1, regionH, pad + regionW, pad, pad, regionH);
  ctx.drawImage(canvas, pad, pad, regionW, 1, pad, 0, regionW, pad);
  ctx.drawImage(canvas, pad, pad + regionH - 1, regionW, 1, pad, pad + regionH, regionW, pad);

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
