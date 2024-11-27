import React from 'react';
import { ParticleConfig } from '../../types/particle';
import { ParticleControls } from './ParticleControls';
import { VisualControls } from './VisualControls';

interface AnimationControlsProps {
  config: ParticleConfig;
  onConfigChange: (config: ParticleConfig) => void;
}

export function AnimationControls({ config, onConfigChange }: AnimationControlsProps) {
  return (
    <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg space-y-8">
      <ParticleControls config={config} onConfigChange={onConfigChange} />
      <VisualControls config={config} onConfigChange={onConfigChange} />
    </div>
  );
}