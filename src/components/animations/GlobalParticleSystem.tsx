import React, { useEffect, useRef } from 'react';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { Particle, ParticleConfig } from '../../types/particle';
import { createParticle, updateParticle, drawParticle } from '../../utils/particle';

interface GlobalParticleSystemProps {
  config: ParticleConfig;
}

export function GlobalParticleSystem({ config }: GlobalParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const isMouseDown = useRef(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (config.shape === 'image' && config.imageUrl) {
      const img = new Image();
      img.src = config.imageUrl;
      img.onload = () => {
        imageRef.current = img;
      };
    }
  }, [config.imageUrl]);

  const isInteractiveElement = (element: Element | null): boolean => {
    if (!element) return false;
    
    const isControl = element.closest('.controls-area') !== null;
    const isHeader = element.closest('header') !== null;
    
    return isControl || isHeader;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      
      if (isInteractiveElement(e.target as Element)) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      for (let i = 0; i < 3; i++) {
        const particle = createParticle(x, y, config);
        if (config.shape === 'image' && imageRef.current) {
          particle.image = imageRef.current;
        }
        particles.current.push(particle);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isInteractiveElement(e.target as Element)) return;
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current
      .filter((p) => p.life > 0)
      .map(updateParticle);

    particles.current.forEach((p) => {
      drawParticle(ctx, p, config.color);
    });
  });

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0"
      style={{ 
        background: 'transparent',
        touchAction: 'none',
        cursor: 'crosshair'
      }}
    />
  );
}