
import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { Quiz } from './Quiz';
import { ArrowRight, BookOpen, Quote, Image as ImageIcon, PlayCircle } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onNext: () => void;
  isLast: boolean;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onNext, isLast }) => {
  const [q1Correct, setQ1Correct] = useState(false);
  const [q2Correct, setQ2Correct] = useState(false);

  // Reset progress when lesson changes
  useEffect(() => {
    setQ1Correct(false);
    setQ2Correct(false);
    window.scrollTo(0, 0);
  }, [lesson.id]);

  const imageSrc = lesson.hook.imageUrl || `https://picsum.photos/800/450?random=${lesson.id}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <header className="mb-8 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-history-accent/10 text-history-accent font-bold text-sm tracking-wide mb-2">
          {lesson.era}
        </span>
        <h1 className="text-4xl font-serif font-bold text-history-dark mb-2">{lesson.title}</h1>
        <div className="h-1 w-20 bg-history-accent mx-auto"></div>
      </header>

      {/* Hook / Visual */}
      <div className="mb-10 bg-white p-2 rounded-xl shadow-md transform -rotate-1">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative group">
          {lesson.hook.type === 'video' && lesson.hook.videoUrl ? (
             <iframe 
                src={lesson.hook.videoUrl} 
                title={lesson.hook.description}
                className="w-full h-full border-0"
                allow="encrypted-media; geolocation"
                allowFullScreen
             ></iframe>
          ) : (
             <>
              <img 
                src={imageSrc}
                alt={lesson.hook.description}
                className="w-full h-full object-cover grayscale sepia hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                 <div className="flex items-center gap-2 text-white/90 text-sm italic">
                    <ImageIcon className="w-4 h-4" />
                    <span>Suggestie: {lesson.hook.description}</span>
                 </div>
              </div>
             </>
          )}
        </div>
        {lesson.hook.type === 'video' && (
            <div className="mt-2 text-center text-sm text-gray-500 italic flex items-center justify-center gap-1">
                <PlayCircle className="w-4 h-4" />
                Bekijk de video hierboven om te beginnen.
            </div>
        )}
      </div>

      {/* Core Text */}
      <section className="mb-12 prose prose-lg prose-stone mx-auto">
        <h2 className="text-2xl font-serif font-bold text-history-blue flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {lesson.content.title}
        </h2>
        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
          {lesson.content.text}
        </div>
      </section>

      {/* Check Question 1 */}
      <section className="mb-12">
        <Quiz 
            questionData={lesson.checkQuestion1} 
            onComplete={() => setQ1Correct(true)}
            id={`q1-${lesson.id}`} 
        />
      </section>

      {/* Deep Dive (Only visible after Q1 correct) */}
      {q1Correct && (
        <div className="animate-fade-in-up">
            <section className="mb-12 bg-history-paper border-l-4 border-history-accent pl-6 py-2">
                <h3 className="font-serif font-bold text-xl mb-3 flex items-center gap-2 text-history-dark">
                    <Quote className="w-5 h-5 text-history-accent" />
                    Verdieping: {lesson.deepDive.title}
                </h3>
                <div className="bg-white p-4 rounded-lg shadow-inner mb-4 italic text-gray-600 font-serif border border-gray-200">
                    "{lesson.deepDive.sourceText || lesson.deepDive.description}"
                </div>
                <p className="text-gray-800">{lesson.deepDive.description}</p>
            </section>

            {/* Check Question 2 */}
            <section className="mb-12">
                <Quiz 
                    questionData={lesson.checkQuestion2} 
                    onComplete={() => setQ2Correct(true)}
                    id={`q2-${lesson.id}`}
                />
            </section>
        </div>
      )}

      {/* Outro (Only visible after Q2 correct) */}
      {q2Correct && (
        <div className="animate-fade-in-up">
            <div className="bg-history-blue text-white p-6 rounded-xl shadow-lg mb-8">
                <h3 className="font-bold text-lg mb-2 text-blue-100 uppercase tracking-widest text-xs">Conclusie</h3>
                <p className="font-serif text-lg leading-relaxed">
                    {lesson.cliffhanger}
                </p>
            </div>

            <button
                onClick={onNext}
                className="w-full bg-history-accent hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-lg"
            >
                {isLast ? "Afronden & Overzicht" : "Volgende Les"}
                <ArrowRight className="w-6 h-6" />
            </button>
        </div>
      )}
    </div>
  );
};