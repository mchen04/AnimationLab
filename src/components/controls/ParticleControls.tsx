import React from 'react';
import { ParticleConfig } from '../../types/particle';
import { Sliders } from 'lucide-react';

interface ParticleControlsProps {
  config: ParticleConfig;
  onConfigChange: (config: ParticleConfig) => void;
}

export function ParticleControls({ config, onConfigChange }: ParticleControlsProps) {
  const handleChange = <K extends keyof ParticleConfig>(key: K, value: ParticleConfig[K]) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sliders className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold">Particle Properties</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Particle Count</label>
          <input
            type="range"
            min="1"
            max="10"
            value={config.particleCount}
            onChange={(e) => handleChange('particleCount', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-xs text-right text-gray-400">
            {config.particleCount} per click
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Size</label>
          <input
            type="range"
            min="1"
            max="10"
            value={config.size}
            onChange={(e) => handleChange('size', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Speed</label>
          <input
            type="range"
            min="1"
            max="100"
            value={config.speed}
            onChange={(e) => handleChange('speed', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Lifespan</label>
          <input
            type="range"
            min="1"
            max="10"
            value={config.lifespan}
            onChange={(e) => handleChange('lifespan', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Gravity</label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.gravity}
            onChange={(e) => handleChange('gravity', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}