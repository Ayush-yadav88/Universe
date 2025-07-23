import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import lovePortalImage from '@/assets/love-portal.jpg';

interface LovePortalProps {
  onPortalClick: () => void;
}

const LovePortal: React.FC<LovePortalProps> = ({ onPortalClick }) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [portalIntensity, setPortalIntensity] = useState(1);

  useEffect(() => {
    // Create pulsing glow effect
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 2000);

    // Create portal intensity variation
    const intensityInterval = setInterval(() => {
      setPortalIntensity(Math.random() * 0.3 + 0.8);
    }, 1500);

    return () => {
      clearInterval(glowInterval);
      clearInterval(intensityInterval);
    };
  }, []);

  const createPortalParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'fixed w-3 h-3 bg-accent rounded-full opacity-80 pointer-events-none z-40';
    
    // Start from center of portal
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angle = Math.random() * 360;
    const distance = Math.random() * 200 + 50;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.transform = `translate(-50%, -50%)`;
    particle.style.animation = `portalParticle 3s ease-out forwards`;
    
    // Set custom properties for the animation
    particle.style.setProperty('--end-x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
    particle.style.setProperty('--end-y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
  };

  useEffect(() => {
    // Create swirling particles
    const particleInterval = setInterval(createPortalParticle, 300);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
      </div>

      {/* Portal Container */}
      <div className="relative z-10 text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-8xl font-romantic text-white mb-4 animate-float">
          8 Universes
        </h1>
        <h2 className="text-3xl md:text-5xl font-script text-gradient-love mb-8">
          1 Love
        </h2>
        <p className="text-lg md:text-2xl text-white/80 font-script mb-16 max-w-2xl mx-auto">
          A journey through eight magical universes where two souls find each other again and again
        </p>

        {/* Interactive Portal */}
        <div 
          className="relative cursor-pointer group"
          onClick={onPortalClick}
        >
          {/* Portal Image */}
          <div 
            className={`
              relative w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden
              transition-all duration-1000 group-hover:scale-110
              ${isGlowing ? 'shadow-2xl shadow-heart-pink/50' : 'shadow-xl shadow-heart-pink/30'}
            `}
            style={{ 
              filter: `brightness(${portalIntensity}) saturate(1.2)`,
              boxShadow: `0 0 ${isGlowing ? '100px' : '50px'} hsl(var(--heart-pink) / 0.4)`
            }}
          >
            <img 
              src={lovePortalImage}
              alt="Love Portal"
              className="w-full h-full object-cover portal-bg"
            />
            
            {/* Portal Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-portal opacity-30 animate-portal-spin" />
            <div className="absolute inset-4 border-2 border-white/30 rounded-full animate-pulse" />
            <div className="absolute inset-8 border border-accent/50 rounded-full animate-gentle-spin" />
            
            {/* Center Heart */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-16 h-16 text-white fill-current animate-pulse-heart drop-shadow-lg" />
            </div>

            {/* Swirling Elements */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-accent rounded-full opacity-70"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateX(120px)`,
                  animation: `gentleSpin 4s linear infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          {/* Portal Glow Ring */}
          <div 
            className={`
              absolute inset-0 w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full
              border-4 border-gradient-love opacity-50
              ${isGlowing ? 'animate-ping' : ''}
              pointer-events-none
            `}
          />

          {/* Hover Instructions */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center space-x-2 text-white/80 font-script">
              <Sparkles className="w-5 h-5" />
              <span>Click to enter our love story</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-6 h-6 text-heart-pink fill-current opacity-60 animate-float"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: (Math.random() * 2 + 3) + 's'
              }}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default LovePortal;