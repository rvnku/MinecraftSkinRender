import type { SkinSystem } from '../types';

export async function getSkinUrl(system: SkinSystem, nickname: string): Promise<string | null> {
  const response = await fetch(
    `https://api.rvnku.ru/skins/${system.toLowerCase()}/${nickname}.png`
  );
  if (!response.ok) return null;
  return response.url;
}
