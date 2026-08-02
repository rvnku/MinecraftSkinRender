export type Projection = 'iso' | 'persp';
export type RenderMode = 'head' | 'body';
export type Animation = 'no anim' | 'idle' | 'walking' | 'running' | 'waving';
export type SkinSystem =
  'Custom' | 'Mojang' | 'TLauncher' | 'Ely.by' | 'LittleSkin' | 'T-Monitoring' | 'SkinMC';

export const ANIMATIONS: Animation[] = ['no anim', 'idle', 'walking', 'running', 'waving'];
export const SKIN_SYSTEMS: SkinSystem[] = [
  'Custom',
  'Mojang',
  'TLauncher',
  'Ely.by',
  'LittleSkin',
  'T-Monitoring',
  'SkinMC',
];
