
import React from 'react';
import { Lesson } from '../types';
import { Check, Lock, Play, Clock, ChevronRight, Ship, Train, School, Flag, Flame } from 'lucide-react';

interface TimelineProps {
  lessons: Lesson[];
  completedLessonIds: number[];
  onStartLesson: (id: number) => void;
  forceUnlock?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ lessons, completedLessonIds, onStartLesson, forceUnlock = false }) => {
  
  // Helper function to get a relevant symbol for each lesson
  const getLessonSymbol = (id: number) => {
    switch (id) {
      case 1: return <Ship className="w-24 h-24 text-history-blue/10 transform -rotate-12" />; // VOC -> Schip
      case 2: return <Train className="w-24 h-24 text-history-dark/10 transform rotate-12" />; // 19e Eeuw -> Stoommachine/Spoorwegen
      case 3: return <School className="w-24 h-24 text-history-blue/10 transform -rotate-6" />; // Ethische Pol -> Onderwijs
      case 4: return <Flag className="w-24 h-24 text-history-accent/10 transform rotate-6" />; // Nationalisme -> Vlag
      case 5: return <Flame className="w-24 h-24 text-red-900/10 transform -rotate-3" />; // Vrijheid -> Strijd/Vuur
      default: return null;
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12">
      {/* Vertical central line (Desktop) / Left line (Mobile) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-stone-300 transform md:-translate-x-1/2 rounded-full" />

      {forceUnlock && (
        <div className="fixed top-20 right-4 bg-history-blue text-white px-4 py-2 rounded-full shadow-lg z-50 text-xs font-bold animate-pulse">
            Docent Weergave (Unlocked)
        </div>
      )}

      <div className="space-y-20 md:space-y-24">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isLocked = !forceUnlock && !isCompleted && lesson.id !== 1 && !completedLessonIds.includes(lesson.id - 1);
          const isCurrent = !isLocked && !isCompleted;
          const isEven = index % 2 === 0;

          return (
            <div 
              key={lesson.id} 
              className={`relative flex flex-col md:flex-row items-center md:justify-between group ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node (The Dot) */}
              <div className={`
                absolute left-8 md:left-1/2 transform -translate-x-1/2 
                w-10 h-10 md:w-14 md:h-14 rounded-full border-4 z-20 flex items-center justify-center bg-white transition-all duration-300
                ${isCompleted 
                  ? 'border-green-500 text-green-600 shadow-md scale-100' 
                  : isCurrent 
                    ? 'border-history-accent text-history-accent shadow-xl scale-110' 
                    : 'border-gray-300 text-gray-300'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5 md:w-8 md:h-8" strokeWidth={3} />
                ) : isLocked ? (
                  <Lock className="w-4 h-4 md:w-6 md:h-6" />
                ) : (
                  <Play className="w-4 h-4 md:w-6 md:h-6 fill-current ml-1" />
                )}
              </div>

              {/* Decorative Watermark Symbol (Opposite side of content) */}
              <div className={`
                 hidden md:flex w-1/2 items-center justify-center absolute top-1/2 transform -translate-y-1/2 -z-0 pointer-events-none
                 ${isEven ? 'left-0 pr-32' : 'right-0 pl-32'}
              `}>
                  {getLessonSymbol(lesson.id)}
              </div>

              {/* Spacer for layout balance */}
              <div className="hidden md:block w-1/2" />

              {/* Content Card */}
              <div className={`
                w-full md:w-[calc(50%-40px)] ml-16 md:ml-0 pl-4 md:pl-0 z-10
                ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}
              `}>
                {/* Era Label */}
                <div className={`
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border
                  ${isCurrent 
                    ? 'bg-history-accent/10 text-history-accent border-history-accent/20' 
                    : 'bg-stone-200 text-stone-600 border-transparent'
                  }
                  ${isEven ? 'md:flex-row-reverse' : ''}
                `}>
                  <Clock className="w-3 h-3" />
                  {lesson.era}
                </div>

                <div 
                  onClick={() => !isLocked && onStartLesson(lesson.id)}
                  className={`
                    relative bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border-2 overflow-hidden transition-all duration-300 group-hover:shadow-lg p-6
                    ${isLocked 
                      ? 'border-gray-100 opacity-60 cursor-not-allowed grayscale' 
                      : 'border-transparent cursor-pointer hover:border-history-accent/30 hover:-translate-y-1'
                    }
                    ${isCurrent ? 'ring-4 ring-history-accent/10 border-history-accent' : ''}
                  `}
                >
                    {/* Text Content */}
                    <div className={`flex flex-col justify-center ${isEven ? 'md:items-end' : 'md:items-start'} items-start`}>
                       <h3 className="font-serif font-bold text-lg text-history-dark leading-tight mb-2">
                        <span className="text-gray-400 font-sans text-sm font-normal mr-2 inline-block">Les {lesson.id}:</span>
                        {lesson.title}
                       </h3>
                       <p className="text-sm text-gray-600 mb-4 md:text-left">
                         {lesson.hook.description}
                       </p>
                       
                       {!isLocked && (
                         <span className={`
                           text-xs font-bold flex items-center gap-1 transition-colors
                           ${isCompleted ? 'text-green-600' : 'text-history-accent'}
                         `}>
                           {isCompleted ? 'Voltooid' : 'Start deze les'} 
                           {!isCompleted && <ChevronRight className="w-4 h-4" />}
                         </span>
                       )}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
