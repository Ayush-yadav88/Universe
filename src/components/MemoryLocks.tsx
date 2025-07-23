import React, { useState, useRef } from 'react';
import { Heart, Lock, Unlock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Memory {
  year: number;
  universe: string;
  memory: string;
  color: string;
}

const memories: Memory[] = [
  {
    year: 1,
    universe: "Ocean Universe",
    memory: "We first met in the depths of the crystal ocean, where bioluminescent creatures danced around us as we discovered love in the underwater gardens.",
    color: "text-universe-ocean"
  },
  {
    year: 2,
    universe: "Stardust Universe", 
    memory: "Among the swirling galaxies, we danced on cosmic winds while purple nebulae painted our love story across the infinite sky.",
    color: "text-universe-stardust"
  },
  {
    year: 3,
    universe: "Enchanted Forest",
    memory: "Under the ancient Tree of Eternity, fireflies carried our whispered promises through the magical woodland air.",
    color: "text-universe-forest"
  },
  {
    year: 4,
    universe: "Cyber Love",
    memory: "In the neon-lit future city, our digital hearts synchronized, creating holographic love letters that floated through the electric night.",
    color: "text-universe-cyber"
  },
  {
    year: 5,
    universe: "Golden Sunset",
    memory: "We pledged our hearts as twin suns set over crystalline mountains, painting the sky in shades of our eternal love.",
    color: "text-universe-sunset"
  },
  {
    year: 6,
    universe: "Crystal Realm",
    memory: "Walking through caves of singing crystals, each step harmonized with the melody of our beating hearts in perfect unity.",
    color: "text-universe-crystal"
  },
  {
    year: 7,
    universe: "Nebula Dreams",
    memory: "Floating through deep space clouds, we weaved constellations with our intertwined fingers, writing our names in starlight.",
    color: "text-universe-nebula"
  },
  {
    year: 8,
    universe: "Secret Garden",
    memory: "In this final universe, surrounded by blooming eternal roses, we realized that in every reality, in every timeline, we choose each other.",
    color: "text-universe-garden"
  }
];

const MemoryLocks: React.FC = () => {
  const [unlockedMemories, setUnlockedMemories] = useState<number[]>([]);
  const [currentlyAnimating, setCurrentlyAnimating] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create unlock sound effect
  const playUnlockSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a magical unlock sound
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  // Create confetti effect
  const createConfetti = (index: number) => {
    const container = document.getElementById(`memory-lock-${index}`);
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2 pointer-events-none z-50';
      confetti.style.background = ['#ff69b4', '#ffd700', '#ff1493', '#da70d6', '#98fb98'][i % 5];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '50%';
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `confettiFall 2s ease-out forwards`;
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 2500);
    }
  };

  const handleLockClick = (index: number) => {
    const nextExpected = unlockedMemories.length;
    
    if (index !== nextExpected || currentlyAnimating !== null) return;

    setCurrentlyAnimating(index);
    
    // Play unlock sound and create confetti
    playUnlockSound();
    createConfetti(index);
    
    // Animate the unlock
    setTimeout(() => {
      setUnlockedMemories(prev => [...prev, index]);
      setCurrentlyAnimating(null);
    }, 800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-romantic text-gradient-love mb-4">
          Memory Locks
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-script">
          Unlock our precious memories in sequence, one universe at a time
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {memories.map((memory, index) => {
          const isUnlocked = unlockedMemories.includes(index);
          const isNextToUnlock = index === unlockedMemories.length;
          const isAnimating = currentlyAnimating === index;
          
          return (
            <div
              key={index}
              id={`memory-lock-${index}`}
              className="relative flex flex-col items-center"
            >
              {/* Lock/Heart Icon */}
              <div
                className={`
                  relative mb-4 cursor-pointer transition-all duration-500
                  ${isNextToUnlock ? 'love-lock' : ''}
                  ${isAnimating ? 'animate-pulse' : ''}
                  ${!isNextToUnlock && !isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={() => handleLockClick(index)}
              >
                {isUnlocked ? (
                  <Heart 
                    className={`w-16 h-16 ${memory.color} fill-current heart-glow animate-pulse-heart`}
                  />
                ) : (
                  <Lock 
                    className={`
                      w-16 h-16 
                      ${isNextToUnlock ? 'text-heart-pink heart-glow' : 'text-muted-foreground'}
                      ${isAnimating ? 'animate-bounce' : ''}
                    `}
                  />
                )}
                
                {/* Year Badge */}
                <div className={`
                  absolute -top-2 -right-2 w-8 h-8 rounded-full 
                  ${isUnlocked ? 'bg-heart-pink' : isNextToUnlock ? 'bg-accent' : 'bg-muted'}
                  flex items-center justify-center text-sm font-bold
                  ${isUnlocked ? 'text-white' : 'text-foreground'}
                  shadow-lg
                `}>
                  {memory.year}
                </div>
              </div>

              {/* Memory Card */}
              {isUnlocked && (
                <Card className={`
                  p-4 max-w-xs bg-card/80 backdrop-blur-sm border-none shadow-magical
                  animate-in fade-in slide-in-from-bottom-4 duration-700
                  ${memory.color.replace('text-', 'border-l-4 border-l-')}
                `}>
                  <h3 className={`font-script text-lg font-semibold mb-2 ${memory.color}`}>
                    {memory.universe}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {memory.memory}
                  </p>
                </Card>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <p className="text-muted-foreground font-script">
          {unlockedMemories.length} of 8 memories unlocked
        </p>
        <div className="w-full max-w-md mx-auto mt-4 bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-love h-2 rounded-full transition-all duration-700"
            style={{ width: `${(unlockedMemories.length / 8) * 100}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default MemoryLocks;