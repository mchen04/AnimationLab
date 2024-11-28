import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { GlobalParticleSystem } from './components/animations/GlobalParticleSystem';
import { AnimationControls } from './components/controls/AnimationControls';
import { ParticleConfig } from './types/particle';
import { AuthProvider, useAuth } from './utils/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

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

  const headerRef = useRef<HTMLDivElement | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    const headerRect = headerRef.current?.getBoundingClientRect();
    if (headerRect) {
      console.log('Header dimensions:', headerRect);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
        
        <div className="fixed inset-0 z-0">
          <GlobalParticleSystem config={config} headerRef={headerRef} />
        </div>
        
        <div className="fixed top-20 right-8 z-50 w-96">
          <div className="bg-gray-900 bg-opacity-95 rounded-lg shadow-xl border border-gray-800 p-6">
            {user ? (
              <Dashboard />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
