
import React from 'react';
import { Course } from '../types';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

interface CourseSelectorProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-history-dark mb-4">Kies je Tijdreis</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welk historisch thema wil je vandaag verkennen? Klik op een kaart om te beginnen.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
          >
            {/* Image Banner */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={course.imageUrl || `https://picsum.photos/800/400?random=${course.id}`} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                 <h3 className="text-2xl font-serif font-bold text-white shadow-sm">{course.title}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons.length} Lessen</span>
                </div>
                
                <span className="flex items-center gap-2 text-history-accent font-bold group-hover:translate-x-1 transition-transform">
                  Starten <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
