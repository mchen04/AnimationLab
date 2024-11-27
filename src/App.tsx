import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { GlobalParticleSystem } from './components/animations/GlobalParticleSystem';
import { AnimationControls } from './components/controls/AnimationControls';
import { ParticleConfig } from './types/particle';

export default function App() {
  const [config, setConfig] = useState<ParticleConfig>({
    speed: 50,
    size: 3,
    color: '#9333EA',
    shape: 'circle',
    dispersion: 'circular',
    particleCount: 3,
    lifespan: 3,
    gravity: 20,
    bounce: false,
    trail: false,
    spin: false,
    rainbow: false,
    pulse: false,
    blur: false,
    glow: true,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <GlobalParticleSystem config={config} />
      
      <div className="relative z-10">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3" />
            
            <div className="controls-area">
              <AnimationControls
                config={config}
                onConfigChange={setConfig}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}