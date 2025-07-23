import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartProps {
  onHeartbeat?: () => void;
  className?: string;
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({ onHeartbeat, className = "" }) => {
  const [isBeating, setIsBeating] = useState(false);
  const [heartColor, setHeartColor] = useState<'pink' | 'red' | 'gold'>('pink');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize heartbeat audio
  useEffect(() => {
    // Create a simple heartbeat sound using Web Audio API
    const createHeartbeatSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };

    const playHeartbeat = () => {
      try {
        createHeartbeatSound();
      } catch (error) {
        console.log('Audio context not available');
      }
    };

    audioRef.current = { play: playHeartbeat } as any;
  }, []);

  const handleHeartClick = () => {
    setIsBeating(true);
    
    // Cycle through heart colors
    const colors: ('pink' | 'red' | 'gold')[] = ['pink', 'red', 'gold'];
    const currentIndex = colors.indexOf(heartColor);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    setHeartColor(nextColor);

    // Play heartbeat sound
    if (audioRef.current) {
      (audioRef.current as any).play();
    }

    // Trigger parent callback
    onHeartbeat?.();

    // Reset beating animation
    setTimeout(() => setIsBeating(false), 1200);
  };

  const handleHeartHover = () => {
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 800);
  };

  const getHeartColorClass = () => {
    switch (heartColor) {
      case 'pink': return 'text-heart-pink';
      case 'red': return 'text-heart-red';
      case 'gold': return 'text-accent';
      default: return 'text-heart-pink';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Floating Heart */}
      <div 
        className="relative cursor-pointer transform transition-all duration-300 hover:scale-110"
        onClick={handleHeartClick}
        onMouseEnter={handleHeartHover}
      >
        <Heart 
          className={`
            w-24 h-24 md:w-32 md:h-32 
            ${getHeartColorClass()} 
            fill-current 
            heart-glow
            animate-float
            ${isBeating ? 'animate-pulse-heart' : ''}
            transition-all duration-300
          `}
        />
        
        {/* Glow Effect */}
        <div 
          className={`
            absolute inset-0 w-24 h-24 md:w-32 md:h-32
            ${getHeartColorClass()}
            opacity-30 blur-xl
            ${isBeating ? 'animate-pulse' : ''}
            pointer-events-none
          `}
        />
        
        {/* Sparkle Effects */}
        {isBeating && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-2 h-2 bg-accent rounded-full
                  animate-twinkle
                  ${i === 0 ? 'top-0 left-1/2 -translate-x-1/2' : ''}
                  ${i === 1 ? 'top-1/2 right-0 -translate-y-1/2' : ''}
                  ${i === 2 ? 'bottom-0 left-1/2 -translate-x-1/2' : ''}
                  ${i === 3 ? 'top-1/2 left-0 -translate-y-1/2' : ''}
                  ${i === 4 ? 'top-1/4 right-1/4' : ''}
                  ${i === 5 ? 'bottom-1/4 left-1/4' : ''}
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Love Ripple Effect */}
      {isBeating && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 border-heart-pink opacity-50 rounded-full animate-ping" />
          <div className="absolute inset-2 border border-accent opacity-30 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
        </div>
      )}
    </div>
  );
};

export default FloatingHeart;