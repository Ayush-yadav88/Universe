import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Play, Pause } from 'lucide-react';

const loveLetterText = `My Dearest Love,

Eight years. Eight universes. Eight chances to find you, and in every single one, my heart knew yours before my eyes could see your face.

In the depths of the crystal ocean, when bioluminescent creatures danced around us like living stars, I felt the pull of your soul calling to mine across the vast blue. Your laugh bubbled up through the water, and I knew I had found my home.

When we waltzed among the stardust in that cosmic ballroom, your hand in mine as purple nebulae painted our love story across infinity, time itself seemed to pause. The universe held its breath, and I swore I could hear our heartbeats in harmony with the cosmic symphony.

Under the ancient Tree of Eternity, fireflies carried our whispered promises through the enchanted air. Each glowing light was a word of love, a vow eternal, floating through the magical forest that seemed to bloom brighter just because we were there together.

In the neon-lit future city, our digital hearts synchronized, creating holographic love letters that danced through the electric night. Technology couldn't replicate what we have – this pure, organic connection that transcends circuitry and code.

As twin suns set over crystalline mountains, painting the sky in impossible shades of gold and rose, we pledged our hearts. The very heavens seemed to celebrate our union, mountains echoing with our laughter, crystals singing our song.

Walking through caves where crystals sang our love song, each step harmonized with our unified heartbeat. The earth itself seemed to approve, gemstones glowing brighter as we passed, creating a cathedral of light just for us.

Floating through deep space clouds, we wove constellations with our intertwined fingers. We wrote our names in starlight, claimed nebulae as our dance floors, and made the cosmos our canvas for this eternal love story.

And here, in this secret garden where eternal roses bloom, I understand the truth that binds all realities: we are inevitable. In every universe, across every timeline, through every possibility – we choose each other.

You are my constant in the chaos of infinite realities.
You are my home in the vastness of all possibilities.
You are my always in the uncertainty of forever.

Eight universes, one love. And if there were eight thousand more, I would find you in every single one.

Forever and always yours,
With all the love that exists across all realities ✨

P.S. – Even the roses whisper your name, and the stars themselves are jealous of how you make my universe shine.`;

const LoveLetter: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  // Create soft piano sound effect
  const createPianoSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playNote = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + duration);
        }, delay);
      };

      // Play a gentle melody
      const melody = [523, 587, 659, 698, 784, 659, 587, 523]; // C major scale melody
      melody.forEach((freq, index) => {
        playNote(freq, 1.5, index * 1000);
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const startTypewriter = () => {
    if (isTyping || isPaused) return;
    
    setIsTyping(true);
    setIsPlaying(true);
    createPianoSound();
    
    let currentIndex = displayedText.length;
    const typeSpeed = 50; // milliseconds per character
    
    const typeNextCharacter = () => {
      if (currentIndex < loveLetterText.length && isTyping && !isPaused) {
        setDisplayedText(loveLetterText.slice(0, currentIndex + 1));
        currentIndex++;
        typewriterRef.current = setTimeout(typeNextCharacter, typeSpeed);
      } else if (currentIndex >= loveLetterText.length) {
        setIsTyping(false);
        setIsPlaying(false);
      }
    };

    typeNextCharacter();
  };

  const pauseTypewriter = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (displayedText.length < loveLetterText.length) {
        setTimeout(() => startTypewriter(), 100);
      }
    }
  };

  const resetTypewriter = () => {
    setIsTyping(false);
    setIsPaused(false);
    setIsPlaying(false);
    setDisplayedText('');
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
    };
  }, []);

  // Create falling rose petals
  const createFallingPetal = () => {
    const petal = document.createElement('div');
    petal.className = 'fixed w-3 h-3 bg-heart-pink rounded-full opacity-60 pointer-events-none z-50 petal-fall';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-10px';
    petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(petal);
    
    setTimeout(() => petal.remove(), 8000);
  };

  useEffect(() => {
    if (isPlaying) {
      // Create falling petals while typing
      const petalInterval = setInterval(createFallingPetal, 500);
      return () => clearInterval(petalInterval);
    }
  }, [isPlaying]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-muted/50 to-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-romantic text-gradient-love mb-4">
            A Love Letter Across Universes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-script">
            Written with stardust ink on cosmic parchment
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={startTypewriter}
            disabled={isTyping && !isPaused}
            className="flex items-center space-x-2 px-6 py-3 bg-heart-pink text-white rounded-full hover:bg-heart-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-romantic"
          >
            <Play className="w-5 h-5" />
            <span className="font-script">Start Reading</span>
          </button>
          
          <button
            onClick={pauseTypewriter}
            disabled={!isTyping && !isPaused}
            className="flex items-center space-x-2 px-6 py-3 bg-accent text-accent-foreground rounded-full hover:opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-romantic"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            <span className="font-script">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          
          <button
            onClick={resetTypewriter}
            className="flex items-center space-x-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-all duration-300 shadow-romantic"
          >
            <Heart className="w-5 h-5" />
            <span className="font-script">Reset</span>
          </button>
        </div>

        {/* Love Letter Parchment */}
        <Card className="relative p-8 md:p-12 bg-gradient-to-br from-card via-background to-muted/30 border-2 border-accent/20 shadow-magical overflow-hidden">
          {/* Parchment texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
          
          {/* Decorative corners */}
          <div className="absolute top-4 left-4">
            <Heart className="w-6 h-6 text-heart-pink fill-current opacity-30" />
          </div>
          <div className="absolute top-4 right-4">
            <Heart className="w-6 h-6 text-heart-pink fill-current opacity-30" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Heart className="w-6 h-6 text-heart-pink fill-current opacity-30" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Heart className="w-6 h-6 text-heart-pink fill-current opacity-30" />
          </div>

          {/* Letter Content */}
          <div className="relative z-10">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-foreground leading-relaxed whitespace-pre-wrap font-script text-lg"
                style={{ fontFamily: 'Dancing Script, cursive' }}
              >
                {displayedText}
                {isTyping && !isPaused && (
                  <span className="inline-block w-0.5 h-6 bg-heart-pink animate-pulse ml-1" />
                )}
              </div>
            </div>
          </div>

          {/* Magical sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {isPlaying && [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full animate-twinkle"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's'
                }}
              />
            ))}
          </div>
        </Card>

        {/* Progress Indicator */}
        {displayedText.length > 0 && (
          <div className="mt-8 text-center">
            <div className="max-w-md mx-auto bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-love h-2 rounded-full transition-all duration-300"
                style={{ width: `${(displayedText.length / loveLetterText.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 font-script">
              {Math.round((displayedText.length / loveLetterText.length) * 100)}% of love delivered
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetter;