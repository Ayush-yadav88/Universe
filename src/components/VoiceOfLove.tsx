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
    message: "Hey my beautiful girl... That very first hello from you felt like sunshine on my heart. I didn’t just meet you — I finally found where I belong."
  },
  {
    id: 2,
    title: "Cosmic Dance",
    duration: "0:22",
    color: "text-universe-stardust",
    message: "Do you remember that moment? When our laughs felt like music and the stars became our spotlight? Dancing with you, even in imagination, felt like magic written just for us."
  },
  {
    id: 3,
    title: "Forest Whispers",
    duration: "0:18",
    color: "text-universe-forest",
    message: "Under that dreamy tree, when fireflies lit up the sky, I wanted to pause time and tell you – you’re my safe place, my forever, my softness in this wild world."
  },
  {
    id: 4,
    title: "Digital Hearts",
    duration: "0:25",
    color: "text-universe-cyber",
    message: "Even in the digital world, your love feels more real than anything. Every ping, every call, every emoji — it’s you. And that's always enough to make my heart full."
  },
  {
    id: 5,
    title: "Golden Promise",
    duration: "0:20",
    color: "text-universe-sunset",
    message: "That sunset felt like a promise — soft, golden, forever. I looked at the sky and whispered to myself... 'No matter the lifetime, it’ll always be her.'"
  },
  {
    id: 6,
    title: "Crystal Symphony",
    duration: "0:17",
    color: "text-universe-crystal",
    message: "The crystals may have sung, but nothing’s as beautiful as the way your voice calms me. Every word from you feels like a little melody made just for my soul."
  },
  {
    id: 7,
    title: "Nebula Dreams",
    duration: "0:24",
    color: "text-universe-nebula",
    message: "When we’re lost in our little world, it's like floating in a dream. Just you and me, wrapped in stars, and nothing else matters — just this, just us."
  },
  {
    id: 8,
    title: "Eternal Garden",
    duration: "0:30",
    color: "text-universe-garden",
    message: "In this little secret garden of ours, I want to keep choosing you, over and over again. You are not just a part of my story — you’re the reason I believe in forever."
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
            Voice of Love for Vanshika
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-script">
            Eight whispered promises for my beloved Miss Parihar, floating on pink clouds of devotion
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