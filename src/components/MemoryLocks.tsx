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
    universe: "Universe of Serendipity",
    memory: "In the randomness of life, our souls aligned. Under a sky of soft surprises, we had deep talks that stitched our hearts closer than ever.",
    color: "text-universe-ocean"
  },
  {
    year: 2,
    universe: "Urban Wanderlust Universe", 
    memory: "Our first college bunk became a cosmic escape. As we wandered the city streets, time slowed to let us fall into each other’s world.",
    color: "text-universe-stardust"
  },
  {
    year: 3,
    universe: "Heartfall Galaxy",
    memory: "Like leaves drifting into autumn love, I found myself falling deeper with every smile of yours, in a galaxy ruled by your gravity..",
    color: "text-universe-forest"
  },
  {
    year: 4,
    universe: "Screenlight Universe",
    memory: "In the glow of our online movie nights, your laughter lit up the screen, and our hearts synced like dual frames in a timeless reel.",
    color: "text-universe-cyber"
  },
  {
    year: 5,
    universe: "Templelight Dimension",
    memory: "Surrounded by chants and bells, we stood together in divine silence — your hand in mine felt more sacred than the prayers I whispered.",
    color: "text-universe-sunset"
  },
  {
    year: 6,
    universe: "Storm & Calm Universe",
    memory: "Through storms of misunderstanding, our hearts still chose each other. Even in fights, I searched for your warmth in every pause.",
    color: "text-universe-crystal"
  },
  {
    year: 7,
    universe: "Forever Hourglass",
    memory: "What a time it was — every second dripped with your love. If I could freeze moments, I’d live in each glance you gave me forever",
    color: "text-universe-nebula"
  },
  {
    year: 8,
    universe: "Magnetic Souls Realm",
    memory: "With each day, I grew more drawn to you — addicted to your presence, your energy, your love, like a star pulled to its moon.",
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