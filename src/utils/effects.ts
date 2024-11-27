export function applyGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
  gradient.addColorStop(0, color.replace(')', ', 0.3)').replace('rgb', 'rgba'));
  gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x - size * 2, y - size * 2, size * 4, size * 4);
}

export function applyTrail(
  ctx: CanvasRenderingContext2D,
  particles: { x: number; y: number; }[],
  color: string
) {
  if (particles.length < 2) return;
  
  ctx.beginPath();
  ctx.strokeStyle = color.replace(')', ', 0.2)').replace('rgb', 'rgba');
  ctx.lineWidth = 2;
  
  ctx.moveTo(particles[0].x, particles[0].y);
  for (let i = 1; i < particles.length; i++) {
    ctx.lineTo(particles[i].x, particles[i].y);
  }
  
  ctx.stroke();
}