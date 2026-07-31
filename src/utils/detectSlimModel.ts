export function detectSlimModel(skinUrl: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    if (!skinUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(false);
        return;
      }
      ctx.drawImage(img, 0, 0);

      if (img.width === 64 && img.height === 64) {
        const imageData = ctx.getImageData(54, 20, 1, 1);
        const alpha = imageData.data[3];
        resolve(alpha === 0);
      } else {
        resolve(false);
      }
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = skinUrl;
  });
}
