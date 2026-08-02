import type { SkinSystem } from '../types';

export async function getSkinUrl(system: SkinSystem, nickname: string): Promise<string | null> {
  const response = await fetch(
    `http://176.108.254.84:5000/skins/api/${system.toLowerCase()}/${nickname}.png`
  );
  if (!response.ok) return null;
  return response.url;
}
