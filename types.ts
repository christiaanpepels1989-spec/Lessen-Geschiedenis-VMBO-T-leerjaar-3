
export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  era: string;
  hook: {
    description: string;
    searchTerm: string;
    type: 'image' | 'video';
    imageUrl?: string;
    videoUrl?: string;
  };
  content: {
    title: string;
    text: string;
  };
  checkQuestion1: Question;
  deepDive: {
    title: string;
    description: string;
    sourceText?: string;
    imageUrl?: string;
  };
  checkQuestion2: Question;
  cliffhanger: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  lessons: Lesson[];
}

export enum AppState {
  COURSE_SELECTION = 'COURSE_SELECTION',
  MENU = 'MENU',
  LESSON = 'LESSON',
  ADMIN = 'ADMIN',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
