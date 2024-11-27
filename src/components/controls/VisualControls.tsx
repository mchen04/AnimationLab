import React from 'react';
import { ParticleConfig } from '../../types/particle';
import { Palette } from 'lucide-react';

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
        <Palette className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold">Visual Effects</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Shape</label>
          <select
            value={config.shape}
            onChange={(e) => handleChange('shape', e.target.value as ParticleConfig['shape'])}
            className="w-full bg-gray-700 text-white rounded p-2 border-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="star">Star</option>
            <option value="heart">Heart</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Color</label>
          <input
            type="color"
            value={config.color}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-full h-10 bg-gray-700 rounded border-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Pattern</label>
          <select
            value={config.dispersion}
            onChange={(e) => handleChange('dispersion', e.target.value as ParticleConfig['dispersion'])}
            className="w-full bg-gray-700 text-white rounded p-2 border-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="circular">Circular</option>
            <option value="explosion">Explosion</option>
            <option value="fountain">Fountain</option>
            <option value="vortex">Vortex</option>
            <option value="wave">Wave</option>
          </select>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm text-gray-300 mb-2">Effects</h4>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.rainbow}
                onChange={(e) => handleChange('rainbow', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Rainbow</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.trail}
                onChange={(e) => handleChange('trail', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Trail</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.spin}
                onChange={(e) => handleChange('spin', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Spin</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.pulse}
                onChange={(e) => handleChange('pulse', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Pulse</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.bounce}
                onChange={(e) => handleChange('bounce', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Bounce</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.blur}
                onChange={(e) => handleChange('blur', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Blur</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.glow}
                onChange={(e) => handleChange('glow', e.target.checked)}
                className="rounded text-purple-500 focus:ring-purple-500"
              />
              <span className="text-sm">Glow</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}