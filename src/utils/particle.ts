import { Particle, ParticleConfig } from '../types/particle';
import { drawStar, drawHeart } from './shapes';
import { applyGlow } from './effects';

export function createParticle(x: number, y: number, config: ParticleConfig): Particle {
  const angle = Math.random() * Math.PI * 2;
  const baseSpeed = (config.speed / 50) * 2;
  let vx = Math.cos(angle) * baseSpeed;
  let vy = Math.sin(angle) * baseSpeed;

  switch (config.dispersion) {
    case 'explosion':
      const speed = baseSpeed * 2;
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed;
      break;
    case 'fountain':
      vx = (Math.random() - 0.5) * baseSpeed;
      vy = -baseSpeed * 2;
      break;
    case 'vortex':
      const radius = Math.random() * 100;
      const spiralAngle = Math.random() * Math.PI * 2;
      vx = (Math.cos(spiralAngle) * radius) / 50;
      vy = (Math.sin(spiralAngle) * radius) / 50;
      break;
    case 'wave':
      vx = Math.cos(angle) * baseSpeed;
      vy = Math.sin(y / 20) * baseSpeed;
      break;
  }

  return {
    x,
    y,
    vx,
    vy,
    life: 1,
    size: config.size,
    shape: config.shape,
    rotation: Math.random() * Math.PI * 2,
    opacity: 1,
    hue: Math.random() * 360,
    scale: 1
  };
}

export function updateParticle(particle: Particle, config: ParticleConfig): Particle {
  let { x, y, vx, vy, life, rotation, scale, opacity } = particle;
  
  // Apply gravity
  vy += config.gravity / 100;
  
  // Apply bounce if enabled
  if (config.bounce) {
    if (y > window.innerHeight) {
      vy = -vy * 0.6;
      y = window.innerHeight;
    }
    if (x < 0 || x > window.innerWidth) {
      vx = -vx * 0.6;
    }
  }
  
  // Update position
  x += vx;
  y += vy;
  
  // Update life
  life -= 1 / (config.lifespan * 60);
  
  // Update rotation if spin is enabled
  if (config.spin) {
    rotation += 0.1;
  }
  
  // Pulse effect
  if (config.pulse) {
    scale = 1 + Math.sin(life * Math.PI * 4) * 0.2;
  }
  
  // Update opacity for fade out
  opacity = life;

  return {
    ...particle,
    x,
    y,
    vx,
    vy,
    life,
    rotation,
    scale,
    opacity
  };
}

export function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  config: ParticleConfig
): void {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.scale(particle.scale, particle.scale);
  
  if (config.blur) {
    ctx.filter = 'blur(1px)';
  }
  
  const color = config.rainbow 
    ? `hsl(${particle.hue}, 70%, 60%)`
    : config.color;
    
  ctx.fillStyle = color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
  
  if (config.glow) {
    applyGlow(ctx, 0, 0, color, particle.size);
  }
  
  switch (particle.shape) {
    case 'square':
      const size = particle.size * 2;
      ctx.fillRect(-size/2, -size/2, size, size);
      break;
    case 'triangle':
      ctx.beginPath();
      const height = particle.size * 2;
      ctx.moveTo(0, -height/2);
      ctx.lineTo(height/2, height/2);
      ctx.lineTo(-height/2, height/2);
      ctx.closePath();
      ctx.fill();
      break;
    case 'star':
      drawStar(ctx, 0, 0, particle.size * 2);
      ctx.fill();
      break;
    case 'heart':
      drawHeart(ctx, -particle.size, -particle.size, particle.size);
      ctx.fill();
      break;
    case 'image':
      if (particle.image) {
        const size = particle.size * 4;
        ctx.drawImage(particle.image, -size/2, -size/2, size, size);
      }
      break;
    default: // circle
      ctx.beginPath();
      ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
      ctx.fill();
  }
  
  ctx.restore();
}