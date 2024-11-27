import React, { useEffect, useRef } from 'react';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { Particle, ParticleConfig } from '../../types/particle';
import { createParticle, updateParticle } from '../../utils/particle';
import { hexToRgba } from '../../utils/color';

interface ParticleSystemProps {
  config: ParticleConfig;
}

export function ParticleSystem({ config }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      for (let i = 0; i < 5; i++) {
        particles.current.push(createParticle(x, y, config));
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [config]);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current
      .filter((p) => p.life > 0)
      .map(updateParticle);

    particles.current.forEach((p) => {
      ctx.fillStyle = hexToRgba(config.color, p.life);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gray-900 rounded-lg cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
      <div className="absolute bottom-4 left-4 text-sm text-gray-400">
        Click and drag to create particles
      </div>
    </div>
  );
}