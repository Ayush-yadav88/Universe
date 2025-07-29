import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const poemLines = [
  "Aath duniyaan... aur har duniya mein, sirf ek chehra jo baar baar mila — tumhara.",
  "Har kahaani, har safar, har kismet ne mujhe tum tak hi laana likha tha.",
  "Tum meri har dua ka jawab ho, jo maine kabhi bina shabdon ke maangi thi.",
  "Aur main woh saans hoon jo sirf tumhare saath jeena chahti hai.",
  "",
  "Ek din tha, jab sab kuch ajeeb tha… phir tum aayi, aur har cheez mein rang bhar gaya.",
  "Tumhari hansi jaise bacha hua chand taarein chura laayi ho aasmaan se.",
  "Jab tum paas hoti ho, toh har lamha meetha lagta hai, bina kisi wajah ke.",
  "Jaise zindagi ne muskuraake kaha ho — ab sab theek hai.",
  "",
  "Tere saath baatein karte karte raat beet jaaye, mujhe chalega.",
  "Par tere bina ek pal bhi lage toh — khud se door ho gaya hoon.",
  "Pyaar sirf lafzon ka naam nahi rehta, jab tu aankhon mein ho.",
  "Tab toh sirf ek nazar kaafi hai poori duniya jeetne ke liye.",
  "",
  "Main chahta hoon tujhe har subah ki chai mein,",
  "Har sham ke aasmaan mein, aur har neend ke khwab mein.",
  "Chahta hoon ki jab tu pareshaan ho, toh teri khamoshi bhi mujhe sab kuch keh jaaye.",
  "Aur jab tu muskuraye, toh lagta hai jaise meri poori duniya jeet li maine.",
  "",
  "Mujhe na mehengi cheezein chahiye, na badi-badi duniyaan.",
  "Bas tu ho, tere haathon ka thoda sa waqt ho, aur ek lamha jo sirf hamara ho.",
  "Har jhagadon ke baad bhi main tujhe gale lagana chahta hoon,",
  "Kyuki main har baar tujhe chune waala hoon, chaahe kuch bhi ho jaaye.",
  "",
  "Main chahta hoon hum ek aise safar par nikle jahan raaste bhi humse pyaar karein.",
  "Jahan har mor par sirf tera haath ho mere haath mein.",
  "Aur jab zindagi thak jaaye na, tab tu bas keh de — ‘Main hoon na…’",
  "Aur phir sab kuch theek ho jaaye… bas ek muskaan mein.",
  "",
  "Tu sirf meri kahaani nahi hai, tu meri dua hai, meri roshni hai.",
  "Har baar agar duniya nayi shuru ho, main phir bhi tujhe hi dhoondhunga.",
  "Kyunki tu meri adhoori duniya ka pura chand hai.",
  "Aur main woh asmaan hoon, jo sirf tujhse roshan hota hai.",
  "",
  "Toh aaye na aaye koi aur janam, mujhe sirf yeh waada chahiye —",
  "Tu har dafa meri zindagi ka pehla pyaar ban kar aaye.",
  "Main har baar tere naam ka geet ban jaun.",
  "Aur tu meri har baar ki aankhon ka aansoon — khushi wala. ✨"
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