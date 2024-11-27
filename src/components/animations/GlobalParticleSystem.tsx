import React, { useEffect, useRef, useState } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { ParticleConfig } from '../../types/particle';

interface GlobalParticleSystemProps {
  config: ParticleConfig;
  headerRef: React.RefObject<HTMLDivElement>;
}

export function GlobalParticleSystem({ config, headerRef }: GlobalParticleSystemProps) {
  const particleSystemRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const headerRect = headerRef.current?.getBoundingClientRect();
      const particleSystemRect = particleSystemRef.current?.getBoundingClientRect();
      
      if (!headerRect || !particleSystemRect) return;
      
      // Only create particles if click is below header
      if (event.clientY > headerRect.bottom) {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (mousePosition) {
        const headerRect = headerRef.current?.getBoundingClientRect();
        if (!headerRect) return;
        
        // Only create particles if mouse is below header
        if (event.clientY > headerRect.bottom) {
          setMousePosition({ x: event.clientX, y: event.clientY });
        }
      }
    };

    const handleMouseUp = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [headerRef, mousePosition]);

  return (
    <div className="absolute inset-0" ref={particleSystemRef}>
      <ParticleSystem config={config} />
    </div>
  );
}
