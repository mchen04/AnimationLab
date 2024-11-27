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
          <label className="block text-sm text-gray-300">Shape</label>
          <select
            value={config.shape}
            onChange={(e) => handleChange('shape', e.target.value as ParticleConfig['shape'])}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700"
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="star">Star</option>
            <option value="heart">Heart</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Dispersion Pattern</label>
          <select
            value={config.dispersion}
            onChange={(e) => handleChange('dispersion', e.target.value as ParticleConfig['dispersion'])}
            className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700"
          >
            <option value="circular">Circular</option>
            <option value="explosion">Explosion</option>
            <option value="fountain">Fountain</option>
            <option value="vortex">Vortex</option>
            <option value="wave">Wave</option>
          </select>
        </div>

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

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Color</label>
          <input
            type="color"
            value={config.color}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-full h-8 rounded"
          />
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

        {config.shape === 'image' && (
          <div className="space-y-2">
            <label className="block text-sm text-gray-300">Image URL</label>
            <input
              type="text"
              value={config.imageUrl || ''}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              placeholder="Enter image URL"
              className="w-full bg-gray-800 text-white rounded px-3 py-2 border border-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
}
