import React from 'react';
import { ParticleConfig } from '../../types/particle';
import { Sparkles } from 'lucide-react';

interface VisualControlsProps {
  config: ParticleConfig;
  onConfigChange: (config: ParticleConfig) => void;
}

export function VisualControls({ config, onConfigChange }: VisualControlsProps) {
  const handleChange = <K extends keyof ParticleConfig>(key: K, value: ParticleConfig[K]) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold">Visual Effects</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.bounce}
            onChange={(e) => handleChange('bounce', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Bounce</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.trail}
            onChange={(e) => handleChange('trail', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Trail</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.spin}
            onChange={(e) => handleChange('spin', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Spin</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.rainbow}
            onChange={(e) => handleChange('rainbow', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Rainbow</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.pulse}
            onChange={(e) => handleChange('pulse', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Pulse</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.blur}
            onChange={(e) => handleChange('blur', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Blur</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.glow}
            onChange={(e) => handleChange('glow', e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Glow</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-300">Color</label>
        <input
          type="color"
          value={config.color}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-full h-8 rounded bg-transparent"
        />
      </div>
    </div>
  );
}
