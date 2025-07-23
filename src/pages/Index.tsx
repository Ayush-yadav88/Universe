import React, { useState } from 'react';
import LovePortal from '@/components/LovePortal';
import FloatingHeart from '@/components/FloatingHeart';
import MemoryLocks from '@/components/MemoryLocks';
import StarryWishes from '@/components/StarryWishes';
import SplitTimeline from '@/components/SplitTimeline';
import LoveLetter from '@/components/LoveLetter';
import VoiceOfLove from '@/components/VoiceOfLove';
import AnimatedPoem from '@/components/AnimatedPoem';

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);
  
  const handlePortalClick = () => {
    setShowMainContent(true);
  };

  const handleLogoInteraction = () => {
    setSecretRevealed(true);
    setTimeout(() => setSecretRevealed(false), 4000);
  };

  if (!showMainContent) {
    return <LovePortal onPortalClick={handlePortalClick} />;
  }

  return (
    <div className="relative">
      {/* Secret Message Modal */}
      {secretRevealed && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-500">
          <div className="bg-gradient-love p-8 rounded-2xl shadow-magical text-center max-w-md mx-4 animate-in zoom-in duration-300">
            <h2 className="text-2xl font-romantic text-white mb-4">Secret Message 💌</h2>
            <p className="text-white font-script text-lg">You are my always 💫</p>
          </div>
        </div>
      )}

      {/* Logo with Secret Interaction */}
      <div 
        className="fixed top-6 left-6 z-40 cursor-pointer"
        onClick={handleLogoInteraction}
        onDoubleClick={handleLogoInteraction}
      >
        <h1 className="text-2xl font-romantic text-gradient-love">8U1L</h1>
      </div>


      {/* Main Content Sections */}
      <section id="memory-locks" className="min-h-screen flex items-center">
        <MemoryLocks />
      </section>

      <section id="love-letter" className="min-h-screen">
        <LoveLetter />
      </section>

      <section id="starry-wishes" className="min-h-screen">
        <StarryWishes />
      </section>

      <section id="timeline" className="min-h-screen">
        <SplitTimeline />
      </section>

      <section id="voice-love" className="min-h-screen">
        <VoiceOfLove />
      </section>

      <section id="poem" className="min-h-screen">
        <AnimatedPoem />
      </section>
    </div>
  );
};

export default Index;
