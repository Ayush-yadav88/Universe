import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Wish {
  id: number;
  wish: string;
  dreamColor: string;
}

const wishes: Wish[] = [
  {
    id: 1,
    wish: "I wish for a love so pure that no space exists for the unwanted, only the needed – only you.",
    dreamColor: "text-universe-stardust"
  },
  {
    id: 2,
    wish: "I wish for a bond where we never fight, just understand, grow, and cherish every moment together.",
    dreamColor: "text-heart-pink"
  },
  {
    id: 3,
    wish: "I dream of holding your hand through every situation — rain or shine, storm or calm — forever.",
    dreamColor: "text-accent"
  },
  {
    id: 4,
    wish: "I wish to hold you tight in every hug, as if the world pauses to feel the warmth we share.",
    dreamColor: "text-universe-crystal"
  },
  {
    id: 5,
    wish: "I dream of watching your success bloom, standing proudly beside you, clapping louder than the world.",
    dreamColor: "text-universe-sunset"
  },
  {
    id: 6,
    wish: "I wish to love you madly — in silence and in storms, in laughter and in tears — endlessly.",
    dreamColor: "text-universe-forest"
  },
  {
    id: 7,
    wish: "I promise to care for you forever, in all your moods and moments, like a vow written in stars.",
    dreamColor: "text-universe-cyber"
  },
  {
    id: 8,
    wish: "I wish to marry you in every life, in every timeline, making our forever truly eternal.",
    dreamColor: "text-heart-red"
  }
];


const StarryWishes: React.FC = () => {
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);
  const [twinklingStars, setTwinklingStars] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create magical chime sound
  const playChimeSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a gentle chime
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 1);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const handleStarClick = (wishId: number) => {
    if (revealedWishes.includes(wishId)) return;

    // Add twinkling effect
    setTwinklingStars(prev => [...prev, wishId]);
    
    // Play chime sound
    playChimeSound();
    
    // Reveal the wish after a brief delay
    setTimeout(() => {
      setRevealedWishes(prev => [...prev, wishId]);
      setTwinklingStars(prev => prev.filter(id => id !== wishId));
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6 overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-romantic text-white mb-4">
            Starry Wishes
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-script">
            Click each star to reveal our dreams written in stardust
          </p>
        </div>

        {/* Constellation of Wish Stars */}
        <div className="relative min-h-[600px]">
          {wishes.map((wish, index) => {
            const isRevealed = revealedWishes.includes(wish.id);
            const isTwinkling = twinklingStars.includes(wish.id);
            
            // Position stars in constellation pattern
            const positions = [
              { top: '10%', left: '20%' },
              { top: '25%', left: '70%' },
              { top: '40%', left: '15%' },
              { top: '35%', left: '50%' },
              { top: '60%', left: '80%' },
              { top: '70%', left: '25%' },
              { top: '80%', left: '60%' },
              { top: '55%', left: '40%' }
            ];

            return (
              <div
                key={wish.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={positions[index]}
              >
                {/* Clickable Star */}
                <div
                  className="relative cursor-pointer group"
                  onClick={() => handleStarClick(wish.id)}
                >
                  <Star
                    className={`
                      w-12 h-12 md:w-16 md:h-16
                      ${isRevealed ? 'text-accent fill-current' : 'text-white fill-current'}
                      star-glow transition-all duration-500
                      ${isTwinkling ? 'animate-pulse scale-125' : 'group-hover:scale-110'}
                      ${!isRevealed ? 'animate-twinkle' : ''}
                    `}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />
                  
                  {/* Star Glow Effect */}
                  <div 
                    className={`
                      absolute inset-0 w-12 h-12 md:w-16 md:h-16
                      ${isRevealed ? 'bg-accent' : 'bg-white'}
                      opacity-20 blur-xl rounded-full
                      ${isTwinkling ? 'animate-ping' : ''}
                      pointer-events-none
                    `}
                  />

                  {/* Floating Number */}
                  <div className={`
                    absolute -top-2 -right-2 w-6 h-6 rounded-full 
                    ${isRevealed ? 'bg-accent text-accent-foreground' : 'bg-white/20 text-white'}
                    flex items-center justify-center text-xs font-bold
                    transition-all duration-300
                  `}>
                    {wish.id}
                  </div>
                </div>

                {/* Revealed Wish Card */}
                {isRevealed && (
                  <Card className="
                    absolute top-20 left-1/2 transform -translate-x-1/2
                    max-w-xs p-4 bg-card/90 backdrop-blur-sm border-none shadow-magical
                    animate-in fade-in slide-in-from-top-4 duration-700
                  ">
                    <p className={`text-sm leading-relaxed ${wish.dreamColor} font-script`}>
                      {wish.wish}
                    </p>
                    
                    {/* Magical Sparkles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-accent rounded-full animate-twinkle"
                          style={{
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 2 + 's'
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            );
          })}

          {/* Connecting Lines Between Stars (Constellation Effect) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <defs>
              <linearGradient id="starLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffd700" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Draw constellation lines */}
            <line x1="20%" y1="10%" x2="70%" y2="25%" stroke="url(#starLine)" strokeWidth="1" />
            <line x1="70%" y1="25%" x2="50%" y2="35%" stroke="url(#starLine)" strokeWidth="1" />
            <line x1="15%" y1="40%" x2="50%" y2="35%" stroke="url(#starLine)" strokeWidth="1" />
            <line x1="50%" y1="35%" x2="40%" y2="55%" stroke="url(#starLine)" strokeWidth="1" />
            <line x1="80%" y1="60%" x2="60%" y2="80%" stroke="url(#starLine)" strokeWidth="1" />
            <line x1="25%" y1="70%" x2="40%" y2="55%" stroke="url(#starLine)" strokeWidth="1" />
          </svg>
        </div>

        {/* Progress Indicator */}
        <div className="text-center mt-12">
          <p className="text-slate-300 font-script mb-4">
            {revealedWishes.length} of 8 wishes revealed
          </p>
          <div className="flex justify-center space-x-2">
            {wishes.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${revealedWishes.includes(index + 1) ? 'bg-accent' : 'bg-white/20'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarryWishes;