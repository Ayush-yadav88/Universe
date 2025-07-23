import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const poemLines = [
  "Eight universes stretch before us like pages in a cosmic book,",
  "Each one a chapter where our love story took another look",
  "At what it means to find your soul in another's eyes,",
  "To dance among the stars and paint love across the skies.",
  "",
  "In ocean depths where mermaids dream,",
  "We found each other in the crystal stream,",
  "Your laugh like bubbles rising to the light,",
  "Turning underwater darkness into sight.",
  "",
  "Among the stardust, purple and bright,",
  "We waltzed through cosmic, endless night,",
  "Your hand in mine as galaxies spun,",
  "Two hearts that beat as if they were one.",
  "",
  "The ancient tree whispered our names,",
  "While fireflies played celestial games,",
  "Each glowing light a promise made,",
  "In forest magic, unafraid.",
  "",
  "Neon lights and digital hearts,",
  "Even future couldn't pull apart",
  "The connection that transcends all time,",
  "Your love and mine, in perfect rhyme.",
  "",
  "Golden sunsets paint the sky,",
  "As crystal mountains reach up high,",
  "We pledged our hearts as day turned night,",
  "Forever held in love's sweet light.",
  "",
  "Through caves where crystals sing our song,",
  "We've known each other all along,",
  "Each step a note, each breath a verse,",
  "In love's eternal, sacred universe.",
  "",
  "In space clouds thick with dreams and hope,",
  "We learned that love's the only scope",
  "That matters in the vast expanse—",
  "Our eternal, cosmic dance.",
  "",
  "And here, in gardens where roses never die,",
  "We understand the reason why",
  "Across eight worlds, through space and time,",
  "Your heart was always meant for mine.",
  "",
  "For love like ours defies all laws,",
  "Of physics, time, and cosmic cause,",
  "In every universe that's ever been,",
  "Our love story will begin again.",
  "",
  "So here's to us, across all space,",
  "To finding love in every place,",
  "Eight universes, one true love,",
  "Blessed by all the stars above. ✨"
];

const AnimatedPoem: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentStanza, setCurrentStanza] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lineIndex = parseInt(entry.target.getAttribute('data-line-index') || '0');
            setVisibleLines(prev => [...prev, lineIndex]);
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
    );

    // Observe all poem lines after component mounts
    setTimeout(() => {
      const lines = document.querySelectorAll('[data-line-index]');
      lines.forEach(line => observer.observe(line));
    }, 100);

    return () => observer.disconnect();
  }, []);

  // Create floating petals
  const createFloatingPetal = () => {
    const petal = document.createElement('div');
    petal.className = 'fixed w-2 h-2 bg-heart-pink rounded-full opacity-40 pointer-events-none z-50';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-10px';
    petal.style.animation = `petalFall ${Math.random() * 4 + 6}s linear infinite`;
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(petal);
    
    setTimeout(() => petal.remove(), 10000);
  };

  useEffect(() => {
    const petalInterval = setInterval(createFloatingPetal, 800);
    return () => clearInterval(petalInterval);
  }, []);

  const getStanzaColor = (lineIndex: number) => {
    const stanzaColors = [
      'text-universe-ocean',
      'text-universe-stardust', 
      'text-universe-forest',
      'text-universe-cyber',
      'text-universe-sunset',
      'text-universe-crystal',
      'text-universe-nebula',
      'text-universe-garden',
      'text-heart-pink',
      'text-gradient-love'
    ];
    
    // Determine stanza by counting empty lines
    let stanzaIndex = 0;
    for (let i = 0; i <= lineIndex; i++) {
      if (poemLines[i] === '') stanzaIndex++;
    }
    
    return stanzaColors[Math.min(stanzaIndex, stanzaColors.length - 1)];
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Soft piano indicator */}
      <div className="fixed top-6 right-6 z-50">
        <Card className="p-3 bg-card/80 backdrop-blur-sm border-none shadow-magical">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground font-script">Soft Piano Playing</span>
          </div>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto p-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-romantic text-gradient-love mb-4">
            Love's Eternal Verse
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-script">
            A poem written in the language of eight universes
          </p>
        </div>

        {/* Poem Lines */}
        <div className="space-y-6">
          {poemLines.map((line, index) => {
            const isVisible = visibleLines.includes(index);
            const isEmpty = line.trim() === '';
            
            if (isEmpty) {
              return (
                <div 
                  key={index}
                  data-line-index={index}
                  className="h-6"
                />
              );
            }

            return (
              <div
                key={index}
                data-line-index={index}
                className={`
                  relative transition-all duration-1000 transform
                  ${isVisible 
                    ? 'opacity-100 translate-y-0 blur-0' 
                    : 'opacity-0 translate-y-8 blur-sm'
                  }
                `}
              >
                <Card className="p-6 bg-card/60 backdrop-blur-sm border-none shadow-romantic relative overflow-hidden">
                  <p className={`
                    text-lg md:text-xl leading-relaxed font-script text-center
                    ${getStanzaColor(index)}
                    transition-all duration-500
                  `}>
                    {line}
                  </p>
                  
                  {/* Floating sparkles on visible lines */}
                  {isVisible && (
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
                  )}

                  {/* Gradient overlay for magical effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-heart-pink/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Reading Progress */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-love h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(visibleLines.length / poemLines.filter(line => line.trim() !== '').length) * 100}%` }}
            />
          </div>
          <p className="text-muted-foreground font-script">
            {Math.round((visibleLines.length / poemLines.filter(line => line.trim() !== '').length) * 100)}% of love revealed
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPoem;