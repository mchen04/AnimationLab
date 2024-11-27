import React, { useEffect, useRef } from 'react';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { Particle, ParticleConfig } from '../../types/particle';
import { createParticle, updateParticle, drawParticle } from '../../utils/particle';
import { hexToRgba } from '../../utils/color';

interface ParticleSystemProps {
  config: ParticleConfig;
}

export function ParticleSystem({ config }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const isMouseDown = useRef(false);

  // Create initial particles on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < config.particleCount; i++) {
      particles.current.push(createParticle(centerX, centerY, config));
    }
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      for (let i = 0; i < config.particleCount; i++) {
        particles.current.push(createParticle(x, y, config));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      isMouseDown.current = true;
      
      for (let i = 0; i < config.particleCount; i++) {
        particles.current.push(createParticle(x, y, config));
      }
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

    // Set canvas size to match window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (!config.trail) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)'; // Fade effect for trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    particles.current = particles.current
      .filter((p) => p.life > 0)
      .map(particle => updateParticle(particle, config));

    particles.current.forEach((particle) => {
      drawParticle(ctx, particle, config);
    });
  });

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-gray-900 cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
}
