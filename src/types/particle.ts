export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  shape: string;
  image?: HTMLImageElement;
  rotation: number;
  opacity: number;
  hue: number;
  scale: number;
}

export interface ParticleConfig {
  speed: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'image';
  dispersion: 'circular' | 'explosion' | 'fountain' | 'vortex' | 'wave';
  imageUrl?: string;
  particleCount: number;
  lifespan: number;
  gravity: number;
  bounce: boolean;
  trail: boolean;
  spin: boolean;
  rainbow: boolean;
  pulse: boolean;
  blur: boolean;
  glow: boolean;
}