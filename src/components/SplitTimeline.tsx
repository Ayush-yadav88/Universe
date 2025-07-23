import React, { useState, useEffect } from 'react';
import { Heart, Frown, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimelineEvent {
  year: number;
  withYou: string;
  withoutYou: string;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1,
    withYou: "Finding you in the ocean depths, our souls recognizing each other instantly among the coral gardens.",
    withoutYou: "Swimming alone through empty waters, searching for something I couldn't name.",
    color: "text-universe-ocean"
  },
  {
    year: 2,
    withYou: "Dancing together in cosmic winds, our laughter creating new constellations in the purple nebulae.",
    withoutYou: "Drifting aimlessly through space, counting distant stars but feeling utterly alone.",
    color: "text-universe-stardust"
  },
  {
    year: 3,
    withYou: "Sharing whispered promises under the Tree of Eternity, fireflies carrying our love through the magical forest.",
    withoutYou: "Walking through dark woods, the fireflies' light feeling cold without someone to share the wonder.",
    color: "text-universe-forest"
  },
  {
    year: 4,
    withYou: "Our digital hearts synchronizing in the neon city, creating holographic love letters that painted the night sky.",
    withoutYou: "Standing alone on rain-soaked streets, neon lights reflecting my tears instead of joy.",
    color: "text-universe-cyber"
  },
  {
    year: 5,
    withYou: "Pledging our hearts as twin suns set over crystalline mountains, our love painting the sky in infinite colors.",
    withoutYou: "Watching sunsets alone, beautiful but incomplete, like a song missing its harmony.",
    color: "text-universe-sunset"
  },
  {
    year: 6,
    withYou: "Walking hand in hand through caves of singing crystals, each step harmonizing with our unified heartbeat.",
    withoutYou: "Hearing the crystals' lonely song echo my solitude, amplifying the emptiness in my chest.",
    color: "text-universe-crystal"
  },
  {
    year: 7,
    withYou: "Floating through deep space clouds, weaving constellations with our intertwined fingers and writing our names in starlight.",
    withoutYou: "Lost in the cosmic void, reaching for stars that seemed to pull away with each attempt.",
    color: "text-universe-nebula"
  },
  {
    year: 8,
    withYou: "In the secret garden of eternal roses, realizing that in every reality, in every timeline, we choose each other.",
    withoutYou: "Standing at the garden's edge, unable to enter, watching the roses bloom for someone else's love story.",
    color: "text-universe-garden"
  }
];

const SplitTimeline: React.FC = () => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const [isConverging, setIsConverging] = useState(false);

  useEffect(() => {
    // Animate timeline events appearing one by one
    const timer = setTimeout(() => {
      timelineEvents.forEach((_, index) => {
        setTimeout(() => {
          setVisibleEvents(prev => [...prev, index]);
        }, index * 800);
      });

      // Start convergence animation after all events are visible
      setTimeout(() => {
        setIsConverging(true);
      }, timelineEvents.length * 800 + 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-romantic text-gradient-love mb-4">
            Two Paths, One Destiny
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-script">
            The story of us, and the story that could never be
          </p>
        </div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-heart-pink via-accent to-universe-stardust opacity-30" />
          
          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`
                  relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16
                  ${visibleEvents.includes(index) ? 'animate-in fade-in slide-in-from-bottom-4 duration-1000' : 'opacity-0'}
                `}
              >
                {/* With You - Left Side */}
                <div className={`
                  ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}
                  ${isConverging ? 'animate-pulse' : ''}
                `}>
                  <Card className="p-6 bg-gradient-to-br from-heart-pink/10 to-accent/10 border-heart-pink/20 shadow-romantic relative overflow-hidden">
                    <div className="flex items-center mb-4">
                      <Heart className="w-6 h-6 text-heart-pink fill-current mr-3" />
                      <h3 className="text-lg font-script font-semibold text-heart-pink">
                        With You - Year {event.year}
                      </h3>
                    </div>
                    <p className={`text-foreground leading-relaxed ${event.color}`}>
                      {event.withYou}
                    </p>
                    
                    {/* Magical sparkles */}
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-4 h-4 text-accent animate-twinkle" />
                    </div>
                  </Card>
                </div>

                {/* Timeline Year Marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
                  <div className={`
                    w-12 h-12 rounded-full border-4 border-background flex items-center justify-center
                    text-sm font-bold transition-all duration-1000
                    ${visibleEvents.includes(index) ? 'bg-accent text-accent-foreground scale-110' : 'bg-muted text-muted-foreground'}
                  `}>
                    {event.year}
                  </div>
                </div>

                {/* Without You - Right Side */}
                <div className={`
                  ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}
                  ${isConverging ? 'animate-pulse opacity-50' : ''}
                `}>
                  <Card className="p-6 bg-gradient-to-br from-slate-500/10 to-slate-700/10 border-slate-400/20 shadow-lg relative overflow-hidden">
                    <div className="flex items-center mb-4">
                      <Frown className="w-6 h-6 text-slate-500 mr-3" />
                      <h3 className="text-lg font-script font-semibold text-slate-600">
                        Without You - Year {event.year}
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {event.withoutYou}
                    </p>
                    
                    {/* Sad indicator */}
                    <div className="absolute top-2 right-2">
                      <div className="w-4 h-4 bg-slate-400 rounded-full opacity-50" />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Convergence Portal */}
          {isConverging && (
            <div className="relative mt-20 text-center">
              <div className="animate-in fade-in zoom-in duration-2000">
                {/* Portal Effect */}
                <div className="relative mx-auto w-64 h-64 mb-8">
                  <div className="absolute inset-0 portal-bg rounded-full opacity-80" />
                  <div className="absolute inset-4 bg-gradient-portal rounded-full opacity-60 animate-pulse" />
                  <div className="absolute inset-8 bg-gradient-love rounded-full opacity-40 animate-gentle-spin" />
                  
                  {/* Portal Center */}
                  <div className="absolute inset-16 bg-white rounded-full flex items-center justify-center">
                    <Heart className="w-16 h-16 text-heart-red fill-current animate-pulse-heart" />
                  </div>
                  
                  {/* Swirling particles */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-accent rounded-full opacity-70"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 30}deg) translateX(80px)`,
                        animation: `gentleSpin 3s linear infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Convergence Message */}
                <Card className="max-w-2xl mx-auto p-8 bg-gradient-love/10 border-heart-pink/30 shadow-magical">
                  <h3 className="text-3xl font-romantic text-gradient-love mb-4">
                    We Always Find Each Other 💫
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed font-script">
                    No matter how many universes try to separate us, no matter how many timelines split apart, 
                    our souls are quantum entangled across all realities. In every possible world, 
                    love guides us back to each other. This is our constant, our universal truth, 
                    our infinite promise.
                  </p>
                  
                  {/* Floating hearts */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <Heart
                        key={i}
                        className="absolute w-4 h-4 text-heart-pink fill-current opacity-60 animate-float"
                        style={{
                          left: Math.random() * 100 + '%',
                          top: Math.random() * 100 + '%',
                          animationDelay: Math.random() * 3 + 's'
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitTimeline;