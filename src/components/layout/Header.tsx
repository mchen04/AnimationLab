import React from 'react';
import { Beaker } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Beaker className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Animation Lab
            </h1>
          </div>
          <nav className="flex space-x-4">
            <a href="#experiments" className="text-gray-300 hover:text-white transition-colors">
              Experiments
            </a>
            <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
              Gallery
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}