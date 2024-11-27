export function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const spikes = 5;
  const outerRadius = size;
  const innerRadius = size / 2;

  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(
      x + Math.cos(rot) * outerRadius,
      y + Math.sin(rot) * outerRadius
    );
    rot += step;

    ctx.lineTo(
      x + Math.cos(rot) * innerRadius,
      y + Math.sin(rot) * innerRadius
    );
    rot += step;
  }
  
  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
}

export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const width = size * 2;
  const height = size * 2;
  
  ctx.beginPath();
  ctx.moveTo(x, y + height / 4);
  ctx.quadraticCurveTo(x, y, x + width / 4, y);
  ctx.quadraticCurveTo(x + width / 2, y, x + width / 2, y + height / 4);
  ctx.quadraticCurveTo(x + width / 2, y, x + width * 3/4, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + height / 4);
  ctx.quadraticCurveTo(x + width, y + height / 2, x + width / 2, y + height);
  ctx.quadraticCurveTo(x, y + height / 2, x, y + height / 4);
  ctx.closePath();
}