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
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const handleHeartClick = (noteId: number) => {
    if (selectedNote === noteId) {
      setSelectedNote(null);
    } else {
      setSelectedNote(noteId);
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
            const isSelected = selectedNote === note.id;
            
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
                className={`relative ${positions[index]} ${isSelected ? 'z-20' : 'z-10'}`}
              >
                {/* Floating Heart */}
                <div
                  className={`
                    relative cursor-pointer transition-all duration-500 group
                    ${isSelected ? 'scale-110' : 'animate-float hover:scale-105'}
                  `}
                  onClick={() => handleHeartClick(note.id)}
                >
                  <Heart
                    className={`
                      w-16 h-16 md:w-20 md:h-20 fill-current heart-glow
                      ${isSelected ? 'text-heart-red' : 'text-heart-pink'}
                      transition-all duration-300
                    `}
                  />

                  {/* Voice Note Title */}
                  <div className="text-center mt-4">
                    <h3 className={`font-script text-sm font-semibold ${note.color}`}>
                      {note.title}
                    </h3>
                  </div>

                  {/* Message Content Overlay */}
                  {isSelected && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-80 max-w-screen z-30">
                      <Card className="p-6 bg-white/95 dark:bg-card/95 border-2 border-heart-pink/30 shadow-magical animate-in fade-in slide-in-from-top-4 duration-500 backdrop-blur-sm">
                        <p className="text-foreground dark:text-foreground leading-relaxed font-script text-lg italic text-center">
                          "{note.message}"
                        </p>
                      </Card>
                    </div>
                  )}

                  {/* Glow Effect */}
                  <div 
                    className={`
                      absolute inset-0 w-16 h-16 md:w-20 md:h-20
                      ${isSelected ? 'bg-heart-red' : 'bg-heart-pink'}
                      opacity-20 blur-xl rounded-full
                      ${isSelected ? 'animate-pulse' : ''}
                      pointer-events-none
                    `}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-script">
            Click on any floating heart to read a love message
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceOfLove;