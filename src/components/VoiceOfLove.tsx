import React, { useState, useRef } from 'react';
import { Heart, Play, Pause, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface VoiceNote {
  id: number;
  title: string;
  duration: string;
  color: string;
  message: string; // For demo, we'll show text instead of playing audio
}

const voiceNotes: VoiceNote[] = [
  {
    id: 1,
    title: "First Hello",
    duration: "0:15",
    color: "text-universe-ocean",
    message: "Hey beautiful... I just wanted to tell you that seeing you for the first time felt like coming home to a place I'd never been but had dreamed of my entire life."
  },
  {
    id: 2,
    title: "Cosmic Dance",
    duration: "0:22",
    color: "text-universe-stardust",
    message: "When we danced among the stars, I swear I heard the universe singing our song. Your laugh harmonized with the cosmic symphony, and I knew we were meant to be."
  },
  {
    id: 3,
    title: "Forest Whispers",
    duration: "0:18",
    color: "text-universe-forest",
    message: "Under that magical tree, with fireflies carrying our secrets, I promised you forever. And I meant every glowing word that floated through the enchanted air."
  },
  {
    id: 4,
    title: "Digital Hearts",
    duration: "0:25",
    color: "text-universe-cyber",
    message: "Even in a world of circuits and code, nothing could replicate what we have. Our love is the most advanced technology - it connects souls across any distance, any reality."
  },
  {
    id: 5,
    title: "Golden Promise",
    duration: "0:20",
    color: "text-universe-sunset",
    message: "As those twin suns set, painting the sky in impossible colors, I made you a promise: in every sunset, in every universe, I will find you and love you all over again."
  },
  {
    id: 6,
    title: "Crystal Symphony",
    duration: "0:17",
    color: "text-universe-crystal",
    message: "Those singing crystals weren't just making music - they were celebrating us. Every note was a blessing, every harmony was the earth itself approving of our love."
  },
  {
    id: 7,
    title: "Nebula Dreams",
    duration: "0:24",
    color: "text-universe-nebula",
    message: "Floating through space clouds, writing our names in starlight... that's when I realized we don't just exist in the universe - we ARE the universe expressing love through human form."
  },
  {
    id: 8,
    title: "Eternal Garden",
    duration: "0:30",
    color: "text-universe-garden",
    message: "Here in this secret garden, surrounded by roses that bloom eternal, I understand the truth: we are inevitable. In every reality, across every timeline, we choose each other. Always."
  }
];

const VoiceOfLove: React.FC = () => {
  const [playingNote, setPlayingNote] = useState<number | null>(null);
  const [glowingHearts, setGlowingHearts] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    // Create background piano music
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playPianoNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.01, startTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Play soft background melody
      const startPlaying = () => {
        const currentTime = audioContext.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
        
        notes.forEach((note, i) => {
          playPianoNote(note, currentTime + i * 2, 1.8);
        });
        
        setTimeout(startPlaying, 8000); // Repeat every 8 seconds
      };
      
      startPlaying();
    } catch (error) {
      console.log('Background music not available');
    }

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, []);

  const playVoiceNote = (noteId: number) => {
    if (playingNote === noteId) {
      // Stop playing
      setPlayingNote(null);
      setGlowingHearts(prev => prev.filter(id => id !== noteId));
      setCurrentMessage('');
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }
      return;
    }

    // Start playing new note
    setPlayingNote(noteId);
    setGlowingHearts(prev => [...prev.filter(id => id !== noteId), noteId]);
    
    const note = voiceNotes.find(n => n.id === noteId);
    if (note) {
      setCurrentMessage(note.message);
      
      // Simulate audio duration
      const duration = parseInt(note.duration.split(':')[1]) * 1000;
      audioTimeoutRef.current = setTimeout(() => {
        setPlayingNote(null);
        setGlowingHearts(prev => prev.filter(id => id !== noteId));
        setCurrentMessage('');
      }, duration);
    }

    // Create audio effect
    createVoiceEffect();
  };

  const createVoiceEffect = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create soft chime sound instead of drums
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
      oscillator.type = 'sine'; // Soft sine wave
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-heart-pink/5 via-background to-heart-glow/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-romantic text-gradient-love mb-4">
            Voice of Love
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-script">
            Eight whispered promises floating on pink clouds of devotion
          </p>
        </div>

        {/* Floating Hearts Grid */}
        <div className="relative min-h-[600px] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {voiceNotes.map((note, index) => {
            const isPlaying = playingNote === note.id;
            const isGlowing = glowingHearts.includes(note.id);
            
            // Different floating positions
            const positions = [
              'top-0 left-1/4',
              'top-16 right-1/4',
              'top-32 left-1/6',
              'top-20 right-1/3',
              'top-48 left-1/3',
              'top-40 right-1/6',
              'top-64 left-1/5',
              'top-56 right-1/5'
            ];

            return (
              <div
                key={note.id}
                className={`relative ${positions[index]} ${isPlaying ? 'z-20' : 'z-10'}`}
              >
                {/* Floating Heart */}
                <div
                  className={`
                    relative cursor-pointer transition-all duration-500 group
                    ${isGlowing ? 'animate-pulse-heart scale-110' : 'animate-float hover:scale-105'}
                  `}
                  onClick={() => playVoiceNote(note.id)}
                >
                  <Heart
                    className={`
                      w-16 h-16 md:w-20 md:h-20 fill-current heart-glow
                      ${isGlowing ? 'text-heart-red' : 'text-heart-pink'}
                      transition-all duration-300
                    `}
                  />
                  
                  {/* Play/Pause Icon Overlay */}
                  <div className={`
                    absolute inset-0 flex items-center justify-center
                    ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity duration-300
                  `}>
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white drop-shadow-lg" />
                    ) : (
                      <Play className="w-6 h-6 text-white drop-shadow-lg" />
                    )}
                  </div>

                  {/* Voice Duration Badge */}
                  <div className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2
                    px-2 py-1 rounded-full text-xs font-bold
                    ${isGlowing ? 'bg-heart-red text-white' : 'bg-white/80 text-heart-pink'}
                    transition-all duration-300 shadow-lg
                  `}>
                    {note.duration}
                  </div>

                  {/* Sound Waves Animation */}
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute border-2 border-heart-pink/30 rounded-full animate-ping"
                          style={{
                            width: `${80 + i * 20}px`,
                            height: `${80 + i * 20}px`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Glow Effect */}
                  <div 
                    className={`
                      absolute inset-0 w-16 h-16 md:w-20 md:h-20
                      ${isGlowing ? 'bg-heart-red' : 'bg-heart-pink'}
                      opacity-20 blur-xl rounded-full
                      ${isGlowing ? 'animate-pulse' : ''}
                      pointer-events-none
                    `}
                  />
                </div>

                {/* Voice Note Title */}
                <div className="text-center mt-4">
                  <h3 className={`font-script text-sm font-semibold ${note.color}`}>
                    {note.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Message Display */}
        {currentMessage && (
          <Card className="mt-12 p-8 bg-white/95 dark:bg-card/95 border-2 border-heart-pink/30 shadow-magical animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <Volume2 className="w-6 h-6 text-heart-pink mr-3 animate-pulse" />
              <h3 className="text-xl font-script font-semibold text-heart-pink">
                Now Playing...
              </h3>
            </div>
            <p className="text-foreground dark:text-foreground leading-relaxed font-script text-xl italic text-center">
              "{currentMessage}"
            </p>
          </Card>
        )}

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-script">
            Click on any floating heart to play a personal voice message
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceOfLove;