
import React, { useState, useEffect } from 'react';
import { getCourses } from './services/lessonService';
import { Lesson, Course, AppState } from './types';
import { LessonView } from './components/LessonView';
import { TeacherChat } from './components/TeacherChat';
import { Timeline } from './components/Timeline';
import { AdminPanel } from './components/AdminPanel';
import { CourseSelector } from './components/CourseSelector';
import { Ship, Settings, Compass, Map as MapIcon, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.COURSE_SELECTION);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Load courses from service on mount
  useEffect(() => {
    const data = getCourses();
    setCourses(data);
    
    // If only one course exists (legacy mode behavior), select it automatically
    // But since we added WW1 template, we likely have 2. 
    // Let's stick to showing the Selector unless there is strictly 1.
    if (data.length === 1) {
        handleSelectCourse(data[0]);
    }
  }, []);

  const handleSelectCourse = (course: Course) => {
      setCurrentCourse(course);
      setCurrentState(AppState.MENU);
      // Reset progress or load specific progress for this course?
      // For simplicity in this demo, we reset session progress when switching courses
      setCompletedLessons([]);
      window.scrollTo(0, 0);
  }

  const handleStartLesson = (id: number) => {
    setCurrentLessonId(id);
    setCurrentState(AppState.LESSON);
  };

  const handleNextLesson = () => {
    if (!currentCourse) return;

    // Mark current as complete
    if (!completedLessons.includes(currentLessonId)) {
      setCompletedLessons([...completedLessons, currentLessonId]);
    }

    const nextId = currentLessonId + 1;
    // Find if next lesson exists in this course
    const nextLessonExists = currentCourse.lessons.some(l => l.id === nextId);

    if (nextLessonExists) {
      setCurrentLessonId(nextId);
      window.scrollTo(0, 0);
    } else {
      setCurrentState(AppState.MENU);
      window.scrollTo(0, 0);
    }
  };

  const progressPercentage = (currentCourse && currentCourse.lessons.length > 0) 
    ? (completedLessons.length / currentCourse.lessons.length) * 100 
    : 0;

  // Render Admin Panel completely separately
  if (currentState === AppState.ADMIN) {
    return (
      <AdminPanel 
        courses={courses} 
        onUpdateCourses={(updatedData) => {
            setCourses(updatedData);
            // If the currently selected course was updated, update it in state too
            if (currentCourse) {
                const updatedCurrent = updatedData.find(c => c.id === currentCourse.id);
                if (updatedCurrent) setCurrentCourse(updatedCurrent);
            }
        }}
        onExit={() => {
          setIsAdminUnlocked(false);
          setCurrentState(AppState.COURSE_SELECTION); // Go back to start
          setCurrentCourse(null);
        }}
        onOpenStudentView={() => {
          setIsAdminUnlocked(true);
          setCurrentState(AppState.COURSE_SELECTION);
          setCurrentCourse(null);
        }}
      />
    );
  }

  const activeLesson = currentCourse?.lessons.find(l => l.id === currentLessonId);

  return (
    <div className="min-h-screen bg-history-paper/50 font-sans text-history-dark flex flex-col relative overflow-hidden">
      {/* Background Texture overlay */}
      <div className="absolute inset-0 z-[-1] opacity-30 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#c2410c 0.5px, transparent 0.5px), radial-gradient(#2c241b 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
      }}></div>

      {/* Top Navigation Bar */}
      <nav className="bg-history-dark text-white p-4 shadow-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
                // If in lesson, go to menu. If in menu, go to course selection.
                if (currentState === AppState.LESSON) setCurrentState(AppState.MENU);
                else {
                    setCurrentState(AppState.COURSE_SELECTION);
                    setCurrentCourse(null);
                }
            }}
          >
            <div className="bg-history-accent p-2 rounded-full group-hover:bg-orange-700 transition-colors">
               <Ship className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="font-serif font-bold text-lg leading-tight">Geschiedenis Interactief</h1>
                <p className="text-xs text-gray-400">{currentCourse ? currentCourse.title : 'Kies je avontuur'}</p>
            </div>
          </div>
          
          <div className="hidden sm:block">
            {currentState !== AppState.COURSE_SELECTION && currentCourse && (
                <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="font-medium">Voortgang</span>
                    <div className="w-32 h-2.5 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                        <div 
                            className="h-full bg-history-accent transition-all duration-700 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <span className="font-mono text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400">{completedLessons.length}/{currentCourse.lessons.length}</span>
                </div>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {currentState === AppState.COURSE_SELECTION && (
            <CourseSelector courses={courses} onSelectCourse={handleSelectCourse} />
        )}

        {currentState === AppState.MENU && currentCourse && (
          <div className="max-w-6xl mx-auto px-4 py-12 relative">
             <button 
                onClick={() => { setCurrentState(AppState.COURSE_SELECTION); setCurrentCourse(null); }}
                className="absolute top-4 left-4 flex items-center gap-1 text-sm text-gray-500 hover:text-history-blue z-20"
             >
                <RotateCcw className="w-3 h-3" /> Ander thema kiezen
             </button>

            <header className="text-center mb-16 space-y-4 relative">
              {/* Header Decoration */}
              <Compass className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-history-blue/5 z-0 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-history-blue/10 text-history-blue font-bold text-xs tracking-widest uppercase mb-2 border border-history-blue/20">
                    VMBO-T Geschiedenis
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-history-dark drop-shadow-sm">{currentCourse.title}</h2>
                <div className="flex items-center justify-center gap-2 text-history-accent/60 mt-2 mb-4">
                    <div className="h-px w-12 bg-history-accent/40"></div>
                    <MapIcon className="w-4 h-4" />
                    <div className="h-px w-12 bg-history-accent/40"></div>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-serif">
                   {currentCourse.description}
                </p>
              </div>
            </header>

            {currentCourse.lessons.length > 0 ? (
                <>
                    <Timeline 
                    lessons={currentCourse.lessons}
                    completedLessonIds={completedLessons}
                    onStartLesson={handleStartLesson}
                    forceUnlock={isAdminUnlocked}
                    />
                    
                    {completedLessons.length === currentCourse.lessons.length && (
                        <div className="mt-16 text-center max-w-2xl mx-auto bg-white border-2 border-history-accent/20 p-8 rounded-2xl shadow-xl animate-fade-in-up">
                            <h2 className="text-3xl font-serif font-bold mb-4 text-history-accent">Gefeliciteerd! 🎉</h2>
                            <p className="text-lg text-gray-600 mb-8">Je hebt de volledige lessenserie afgerond.</p>
                            <button 
                                onClick={() => setCompletedLessons([])} 
                                className="bg-history-dark text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors shadow-lg"
                            >
                                Reis opnieuw beginnen
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-white/50 rounded-xl border-dashed border-2 border-gray-300">
                    <h3 className="text-xl font-serif text-gray-500">Nog geen lessen beschikbaar in dit thema.</h3>
                    <p className="text-gray-400 text-sm mt-2">Vraag je docent om lessen toe te voegen.</p>
                </div>
            )}
          </div>
        )}
        
        {currentState === AppState.LESSON && activeLesson && (
          <LessonView 
            lesson={activeLesson}
            onNext={handleNextLesson}
            isLast={currentCourse ? currentLessonId === currentCourse.lessons.length : true}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex justify-start items-center gap-6 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Geschiedenis Interactief</p>
            <div className="h-4 w-px bg-gray-300"></div>
            <button 
                onClick={() => setCurrentState(AppState.ADMIN)}
                className="flex items-center gap-1 hover:text-history-blue transition-colors"
            >
                <Settings className="w-3 h-3" />
                Docent Login
            </button>
        </div>
      </footer>

      {/* AI Teacher Chat - Always available in student view */}
      <TeacherChat />
    </div>
  );
};

export default App;
