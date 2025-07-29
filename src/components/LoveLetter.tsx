import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Play, Pause } from 'lucide-react';

const loveLetterText = `My Miss Parihar,

Eight months.  
Two hearts.  
One love that just keeps growing.

I still remember the first time we talked — how casually the world continued, unaware that something magical had just begun. I didn’t know then that the person in front of me would soon become my comfort, my chaos, my calm, my home.

These eight months haven’t just been a timeline... they’ve been a universe.  
A universe where late-night calls feel like lullabies.  
Where your "hmm" is enough to melt my entire day.  
Where fights turn into deeper understanding, and silences speak louder than words.

We’ve laughed at silly things, fought like kids, loved like soulmates, and grown like two people who were always meant to walk this journey together.  
From our first college bunk to deep conversations at random hours — every memory is stitched into the story I keep rereading in my heart.

You’ve seen me at my best and held me at my worst.  
You’ve made me feel safe in a world that often feels too loud.  
And somehow... with every passing day, I only fall more and more in love with you.

You’re not just my girlfriend.  
You’re my moon when nights get too dark.  
You’re my chaos when life feels too quiet.  
You’re the paragraph I never want to end.  
You’re the dream I don’t want to wake up from.

So here’s to the past eight months — for every laugh, every moment, every little “I miss you” that made our love even more beautiful.  
And here’s to what’s coming next — more hugs, more sunrises together, and one day... maybe a “forever” that looks just like this — you and me, hand in hand, heart to heart.

I love you, Vanshika. Madly. Truly. Always.  
And if I had to live all over again, I’d still find you — a hundred times, in every lifetime.

Yours beyond time and timelines,  
Ayush 💗

P.S. — You make the ordinary feel magical. Even eight months feel like a forever I never want to end.`;

const LoveLetter: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  // Piano sound
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

      const melody = [523, 587, 659, 698, 784, 659, 587, 523];
      melody.forEach((freq, index) => {
        playNote(freq, 1.5, index * 1000);
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const startTypewriter = () => {
    if (isTyping || isPaused || displayedText.length >= loveLetterText.length) return;

    setIsTyping(true);
    setIsPlaying(true);
    createPianoSound();

    let currentIndex = displayedText.length;
    const typeSpeed = 50;

    const typeNextCharacter = () => {
      if (currentIndex < loveLetterText.length && !isPaused) {
        setDisplayedText(prev => {
          const nextChar = loveLetterText.charAt(currentIndex);
          currentIndex++;
          typewriterRef.current = setTimeout(typeNextCharacter, typeSpeed);
          return prev + nextChar;
        });
      } else {
        setIsTyping(false);
        setIsPlaying(false);
        if (typewriterRef.current) clearTimeout(typewriterRef.current);
      }
    };

    typeNextCharacter();
  };

  const pauseTypewriter = () => {
    if (!isTyping && !isPaused) return;

    if (!isPaused) {
      setIsPaused(true);
      setIsPlaying(false);
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
    } else {
      setIsPaused(false);
      setIsPlaying(true);
      startTypewriter(); // resume
    }
  };

  const resetTypewriter = () => {
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
    }
    setDisplayedText('');
    setIsTyping(false);
    setIsPaused(false);
    setIsPlaying(false);
  };

  // Falling petals
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
      const petalInterval = setInterval(createFallingPetal, 500);
      return () => clearInterval(petalInterval);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, []);

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

        <Card className="relative p-8 md:p-12 bg-gradient-to-br from-card via-background to-muted/30 border-2 border-accent/20 shadow-magical overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />

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

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {isPlaying &&
              [...Array(8)].map((_, i) => (
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
