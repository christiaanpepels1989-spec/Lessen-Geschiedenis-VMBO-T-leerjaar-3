
import React, { useState, useEffect } from 'react';
import { Lesson, Course } from '../types';
import { Save, RotateCcw, LogOut, Edit3, Check, Plus, Trash2, FolderOpen, MonitorPlay, ChevronRight, Book, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { saveCourses, resetData, createEmptyLesson } from '../services/lessonService';

interface AdminPanelProps {
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
  onExit: () => void;
  onOpenStudentView: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ courses, onUpdateCourses, onExit, onOpenStudentView }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<'COURSE' | 'LESSON' | null>(null);
  
  // Edit forms
  const [courseForm, setCourseForm] = useState<Course | null>(null);
  const [lessonForm, setLessonForm] = useState<Lesson | null>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-select first course on load
  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
        setSelectedCourseId(courses[0].id);
    }
  }, [courses]);

  const handleLogin = () => {
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Wachtwoord onjuist (Hint: admin)');
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseId(course.id);
    setSelectedLessonId(null);
    setEditMode('COURSE');
    setCourseForm(JSON.parse(JSON.stringify(course)));
    setLessonForm(null);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    setEditMode('LESSON');
    setLessonForm(JSON.parse(JSON.stringify(lesson)));
    // Ensure we have the course form loaded too if we switch context
    const parentCourse = courses.find(c => c.id === selectedCourseId);
    if (parentCourse) setCourseForm(JSON.parse(JSON.stringify(parentCourse)));
  };

  const handleAddCourse = () => {
    const newId = `custom-${Date.now()}`;
    const newCourse: Course = {
        id: newId,
        title: "Nieuw Thema",
        description: "Beschrijving van het nieuwe thema...",
        lessons: []
    };
    const updatedCourses = [...courses, newCourse];
    onUpdateCourses(updatedCourses);
    saveCourses(updatedCourses);
    handleSelectCourse(newCourse);
  };

  const handleAddLesson = () => {
    if (!selectedCourseId) return;
    const course = courses.find(c => c.id === selectedCourseId);
    if (!course) return;

    // Calculate new ID (max existing + 1)
    const maxId = course.lessons.reduce((max, l) => Math.max(max, l.id), 0);
    const newLesson = createEmptyLesson(maxId + 1);
    
    const updatedCourse = {
        ...course,
        lessons: [...course.lessons, newLesson]
    };

    const updatedCourses = courses.map(c => c.id === selectedCourseId ? updatedCourse : c);
    onUpdateCourses(updatedCourses);
    saveCourses(updatedCourses);
    handleSelectLesson(newLesson);
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm("Weet je zeker dat je dit hele thema en alle lessen wilt verwijderen?")) {
        const updatedCourses = courses.filter(c => c.id !== id);
        onUpdateCourses(updatedCourses);
        saveCourses(updatedCourses);
        if (updatedCourses.length > 0) {
            handleSelectCourse(updatedCourses[0]);
        } else {
            setSelectedCourseId(null);
            setEditMode(null);
        }
    }
  }

  const handleDeleteLesson = (lessonId: number) => {
      if (!selectedCourseId || !window.confirm("Weet je zeker dat je deze les wilt verwijderen?")) return;
      
      const course = courses.find(c => c.id === selectedCourseId);
      if (!course) return;

      const updatedLessons = course.lessons.filter(l => l.id !== lessonId);
      // Re-index IDs to keep them sequential 1..N ? Or keep IDs unique?
      // Let's re-index for simplicity in this linear app
      const reindexedLessons = updatedLessons.map((l, idx) => ({ ...l, id: idx + 1 }));

      const updatedCourse = { ...course, lessons: reindexedLessons };
      const updatedCourses = courses.map(c => c.id === selectedCourseId ? updatedCourse : c);
      
      onUpdateCourses(updatedCourses);
      saveCourses(updatedCourses);
      
      if (reindexedLessons.length > 0) {
          handleSelectLesson(reindexedLessons[0]);
      } else {
          setEditMode('COURSE');
          setSelectedLessonId(null);
      }
  }

  const handleSave = () => {
    let updatedCourses = [...courses];

    if (editMode === 'COURSE' && courseForm) {
        updatedCourses = courses.map(c => c.id === courseForm.id ? courseForm : c);
    } else if (editMode === 'LESSON' && lessonForm && selectedCourseId) {
        const courseIndex = courses.findIndex(c => c.id === selectedCourseId);
        if (courseIndex !== -1) {
            const updatedLessons = courses[courseIndex].lessons.map(l => l.id === lessonForm.id ? lessonForm : l);
            updatedCourses[courseIndex] = { ...courses[courseIndex], lessons: updatedLessons };
        }
    }

    onUpdateCourses(updatedCourses);
    saveCourses(updatedCourses);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Weet je zeker dat je alle data wilt resetten naar de standaard fabrieksinstellingen?')) {
      const original = resetData();
      onUpdateCourses(original);
      if (original.length > 0) handleSelectCourse(original[0]);
    }
  };

  // Helper to update nested state for LESSON form
  const updateLessonField = (path: string, value: any) => {
    if (!lessonForm) return;
    const newForm = { ...lessonForm };
    const parts = path.split('.');
    let current: any = newForm;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    setLessonForm(newForm);
  };

  // Helper for COURSE form
  const updateCourseField = (field: keyof Course, value: any) => {
      if (!courseForm) return;
      setCourseForm({ ...courseForm, [field]: value });
  }


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-serif font-bold mb-6 text-history-dark text-center">Docent Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full p-3 border border-gray-300 rounded mb-4 bg-white text-gray-900"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <div className="flex gap-2">
            <button 
                onClick={onExit}
                className="flex-1 py-3 text-gray-600 hover:bg-gray-100 rounded font-medium"
            >
                Terug
            </button>
            <button
                onClick={handleLogin}
                className="flex-1 bg-history-blue text-white py-3 rounded font-bold hover:bg-blue-800"
            >
                Inloggen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col h-screen">
      {/* Admin Header */}
      <header className="bg-history-dark text-white p-4 shadow-md flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-xl">Docenten Paneel</h1>
            <span className="text-xs bg-history-accent px-2 py-0.5 rounded text-white">Versie 2.0</span>
        </div>
        <div className="flex gap-2">
            <button onClick={onOpenStudentView} className="flex items-center gap-1 px-3 py-1 bg-history-blue hover:bg-blue-700 rounded text-sm text-white transition-colors">
                <MonitorPlay className="w-4 h-4" /> Leerling Weergave (Alles open)
            </button>
            <button onClick={handleReset} className="flex items-center gap-1 px-3 py-1 bg-red-900 hover:bg-red-800 rounded text-xs transition-colors">
                <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button onClick={onExit} className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors">
                <LogOut className="w-4 h-4" /> Sluiten
            </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Column 1: Courses */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100 font-bold text-gray-500 text-xs uppercase tracking-wider flex justify-between items-center">
                Thema's
                <button onClick={handleAddCourse} className="text-history-blue hover:bg-blue-50 p-1 rounded"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="overflow-y-auto flex-1">
                {courses.map(course => (
                    <div 
                        key={course.id}
                        onClick={() => handleSelectCourse(course)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group flex justify-between items-center ${selectedCourseId === course.id ? 'bg-blue-50 border-l-4 border-history-blue' : ''}`}
                    >
                        <div className="truncate pr-2">
                            <div className="font-serif font-medium text-gray-800 truncate">{course.title}</div>
                            <div className="text-xs text-gray-400">{course.lessons.length} lessen</div>
                        </div>
                        {selectedCourseId === course.id && (
                             <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }} className="text-gray-300 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                             </button>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Column 2: Lessons (for selected course) */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
            {activeCourse ? (
                <>
                    <div className="p-4 border-b border-gray-200 font-bold text-gray-500 text-xs uppercase tracking-wider flex justify-between items-center">
                        Lessen
                        <button onClick={handleAddLesson} className="text-history-blue hover:bg-blue-100 p-1 rounded"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        <div 
                            onClick={() => handleSelectCourse(activeCourse)}
                            className={`p-3 m-2 rounded cursor-pointer text-sm flex items-center gap-2 ${editMode === 'COURSE' ? 'bg-white shadow text-history-blue font-bold' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                            <FolderOpen className="w-4 h-4" />
                            Thema Instellingen
                        </div>
                        
                        <div className="h-px bg-gray-200 my-2 mx-4"></div>

                        {activeCourse.lessons.map(lesson => (
                            <div 
                                key={lesson.id}
                                onClick={() => handleSelectLesson(lesson)}
                                className={`p-3 m-2 rounded cursor-pointer text-sm transition-colors flex justify-between items-center group ${selectedLessonId === lesson.id && editMode === 'LESSON' ? 'bg-white shadow text-history-blue font-medium' : 'text-gray-700 hover:bg-gray-200'}`}
                            >
                                <span className="truncate">Les {lesson.id}: {lesson.title}</span>
                                {selectedLessonId === lesson.id && (
                                     <button onClick={(e) => { e.stopPropagation(); handleDeleteLesson(lesson.id); }} className="text-gray-300 hover:text-red-600">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                         {activeCourse.lessons.length === 0 && (
                            <div className="p-4 text-center text-xs text-gray-400 italic">
                                Nog geen lessen. Klik op + om er een toe te voegen.
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm p-4 text-center">
                    Selecteer een thema
                </div>
            )}
        </div>

        {/* Column 3: Edit Form */}
        <div className="flex-1 overflow-y-auto bg-white">
          {editMode === 'COURSE' && courseForm && (
              <div className="p-8 max-w-3xl mx-auto space-y-8">
                  <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FolderOpen className="w-6 h-6 text-history-blue" />
                            Thema Bewerken
                        </h2>
                        <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md transition-all active:scale-95">
                            {showSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                            {showSuccess ? 'Opgeslagen!' : 'Opslaan'}
                        </button>
                  </div>
                  
                  <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titel van het Thema</label>
                            <input 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                                value={courseForm.title}
                                onChange={e => updateCourseField('title', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Beschrijving (voor op het keuzescherm)</label>
                            <textarea 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                                rows={3}
                                value={courseForm.description}
                                onChange={e => updateCourseField('description', e.target.value)}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Omslagafbeelding URL</label>
                            <input 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm bg-white text-gray-900"
                                value={courseForm.imageUrl || ''}
                                onChange={e => updateCourseField('imageUrl', e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        {courseForm.imageUrl && (
                            <div className="mt-2 w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <img src={courseForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                  </div>
              </div>
          )}

          {editMode === 'LESSON' && lessonForm && (
            <div className="p-8 max-w-3xl mx-auto space-y-8">
                
                <div className="flex justify-between items-center border-b pb-4 sticky top-0 bg-white z-10 pt-2">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                         <Book className="w-6 h-6 text-history-blue" />
                         Les {lessonForm.id} Bewerken
                    </h2>
                    <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md transition-all active:scale-95">
                        {showSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                        {showSuccess ? 'Opgeslagen!' : 'Opslaan'}
                    </button>
                </div>

                {/* --- EXISTING LESSON FORM FIELDS (Refactored to use updateLessonField) --- */}
                
                {/* Section: Algemeen */}
                <div className="space-y-4">
                    <h3 className="font-bold text-history-blue border-b pb-1">Algemene Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titel</label>
                            <input 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                                value={lessonForm.title}
                                onChange={e => updateLessonField('title', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tijdvak (Era)</label>
                            <input 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                                value={lessonForm.era}
                                onChange={e => updateLessonField('era', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Section: Hook / Media */}
                <div className="space-y-4">
                    <h3 className="font-bold text-history-blue border-b pb-1">Introductie (De Hook)</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            value={lessonForm.hook.type}
                            onChange={e => updateLessonField('hook.type', e.target.value)}
                        >
                            <option value="image">Afbeelding</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Beschrijving</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            rows={2}
                            value={lessonForm.hook.description}
                            onChange={e => updateLessonField('hook.description', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL (Afbeelding of Video Embed)</label>
                        <input 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm bg-white text-gray-900"
                            value={lessonForm.hook.type === 'video' ? lessonForm.hook.videoUrl : lessonForm.hook.imageUrl}
                            onChange={e => {
                                if (lessonForm.hook.type === 'video') updateLessonField('hook.videoUrl', e.target.value);
                                else updateLessonField('hook.imageUrl', e.target.value);
                            }}
                        />
                    </div>

                    {/* Visual Preview */}
                    {lessonForm.hook.type === 'image' && lessonForm.hook.imageUrl && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                             <div className="flex items-center gap-4">
                                <div className="w-32 h-32 shrink-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-sm relative group">
                                    <img 
                                        src={lessonForm.hook.imageUrl} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Foute+URL';
                                        }}
                                    />
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>Thumbnail Preview</p>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                {/* Section: Content */}
                <div className="space-y-4">
                    <h3 className="font-bold text-history-blue border-b pb-1">Kerntekst</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kopje</label>
                        <input 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            value={lessonForm.content.title}
                            onChange={e => updateLessonField('content.title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tekst (Gebruik \n voor witregels)</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-48 bg-white text-gray-900"
                            value={lessonForm.content.text}
                            onChange={e => updateLessonField('content.text', e.target.value)}
                        />
                    </div>
                </div>

                {/* Section: Quiz 1 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-history-blue border-b pb-1">Checkvraag 1</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vraag</label>
                        <input 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            value={lessonForm.checkQuestion1.question}
                            onChange={e => updateLessonField('checkQuestion1.question', e.target.value)}
                        />
                    </div>
                    {lessonForm.checkQuestion1.options.map((opt, idx) => (
                        <div key={idx}>
                             <div className="flex gap-2 items-center">
                                <span className="text-xs text-gray-400 w-4">{idx+1}.</span>
                                <input 
                                    className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm bg-white text-gray-900"
                                    value={opt}
                                    onChange={e => {
                                        const newOpts = [...lessonForm.checkQuestion1.options];
                                        newOpts[idx] = e.target.value;
                                        updateLessonField('checkQuestion1.options', newOpts);
                                    }}
                                />
                                <input 
                                    type="radio" 
                                    name="correct1"
                                    checked={lessonForm.checkQuestion1.correctAnswer === idx}
                                    onChange={() => updateLessonField('checkQuestion1.correctAnswer', idx)}
                                />
                             </div>
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-2">Uitleg</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            rows={2}
                            value={lessonForm.checkQuestion1.explanation}
                            onChange={e => updateLessonField('checkQuestion1.explanation', e.target.value)}
                        />
                    </div>
                </div>

                {/* Section: Deep Dive (Verdieping) */}
                <div className="space-y-4">
                    <h3 className="font-bold text-history-blue border-b pb-1">Verdieping</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Titel</label>
                        <input 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            value={lessonForm.deepDive.title}
                            onChange={e => updateLessonField('deepDive.title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Beschrijving</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            rows={3}
                            value={lessonForm.deepDive.description}
                            onChange={e => updateLessonField('deepDive.description', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brontekst / Citaat</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900 italic"
                            rows={2}
                            value={lessonForm.deepDive.sourceText || ''}
                            onChange={e => updateLessonField('deepDive.sourceText', e.target.value)}
                        />
                    </div>
                </div>

                {/* Section: Quiz 2 */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-history-blue border-b pb-1">Checkvraag 2 (Verdieping)</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vraag</label>
                        <input 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            value={lessonForm.checkQuestion2.question}
                            onChange={e => updateLessonField('checkQuestion2.question', e.target.value)}
                        />
                    </div>
                    {lessonForm.checkQuestion2.options.map((opt, idx) => (
                        <div key={idx}>
                             <div className="flex gap-2 items-center">
                                <span className="text-xs text-gray-400 w-4">{idx+1}.</span>
                                <input 
                                    className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm bg-white text-gray-900"
                                    value={opt}
                                    onChange={e => {
                                        const newOpts = [...lessonForm.checkQuestion2.options];
                                        newOpts[idx] = e.target.value;
                                        updateLessonField('checkQuestion2.options', newOpts);
                                    }}
                                />
                                <input 
                                    type="radio" 
                                    name="correct2"
                                    checked={lessonForm.checkQuestion2.correctAnswer === idx}
                                    onChange={() => updateLessonField('checkQuestion2.correctAnswer', idx)}
                                />
                             </div>
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-2">Uitleg</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            rows={2}
                            value={lessonForm.checkQuestion2.explanation}
                            onChange={e => updateLessonField('checkQuestion2.explanation', e.target.value)}
                        />
                    </div>
                </div>

                 {/* Section: Cliffhanger */}
                 <div className="space-y-4">
                    <h3 className="font-bold text-history-blue border-b pb-1">Afsluiting</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cliffhanger Tekst</label>
                        <textarea 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
                            rows={3}
                            value={lessonForm.cliffhanger}
                            onChange={e => updateLessonField('cliffhanger', e.target.value)}
                        />
                    </div>
                </div>

            </div>
          )}
          
          {!editMode && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Edit3 className="w-16 h-16 mb-4 opacity-20" />
                <p>Selecteer een thema of les om te bewerken</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};
