/**
 * Проверяет, что изображение имеет допустимый размер скина
 */
export function validateSkin(img: HTMLImageElement): string | null {
  if (img.width !== 64) return 'invalid format — expected 64×32 or 64×64';
  if (img.height !== 32 && img.height !== 64) return 'invalid format — expected 64×32 or 64×64';
  return null;
}
