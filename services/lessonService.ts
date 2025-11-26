
import { Lesson, Course } from '../types';
import { LESSON_DATA as DEFAULT_LESSONS } from '../constants';

// Updated version to force a refresh of the default data
const STORAGE_KEY = 'history_app_data_v3';

// Initial default data structure
const DEFAULT_COURSES: Course[] = [
  {
    id: 'nl-indo',
    title: 'Nederland & Indonesië',
    description: 'Een bewogen geschiedenis van handel, overheersing en vrijheidsstrijd.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/J.P._Coen_op_de_reede_van_Batavia_-_J.P._Coen_in_Batavia_Harbour_%28Adam_Willaerts%29.jpg/1280px-J.P._Coen_op_de_reede_van_Batavia_-_J.P._Coen_in_Batavia_Harbour_%28Adam_Willaerts%29.jpg',
    lessons: DEFAULT_LESSONS
  },
  {
    id: 'ww1',
    title: 'De Eerste Wereldoorlog',
    description: 'De Grote Oorlog (1914-1918): loopgraven, nieuwe wapens en een veranderende wereld.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/The_Battle_of_the_Somme%2C_July-november_1916_Q1308.jpg',
    lessons: [
      {
        id: 1,
        title: "Oorzaken: Het Kruitvat",
        era: "1900 - 1914",
        hook: {
          type: 'image',
          description: "De arrestatie van Gavrilo Princip (1914). Dit moment was de vonk die de wereld in brand zette.",
          searchTerm: "Gavrilo Princip arrestatie",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Gavrilo_Princip_arrested_in_Sarajevo.jpg"
        },
        content: {
          title: "Waarom brak de oorlog uit?",
          text: "De Eerste Wereldoorlog kwam niet uit de lucht vallen. Europa was een kruitvat dat op ontploffen stond door vier grote oorzaken (MAIN):\n\n1. **Militarisme**: Landen vonden het leger geweldig en wilden vechten.\n2. **Allianties (Bondgenootschappen)**: Landen beloofden elkaar te helpen. Als er één aangevallen werd, moesten vrienden meedoen.\n3. **Imperialisme**: Grote landen wilden zoveel mogelijk kolonies (macht en grondstoffen).\n4. **Nationalisme**: Trots zijn op je eigen volk en een hekel hebben aan andere landen.\n\nDaarbovenop was er een **wapenwedloop**: wie heeft de grootste kanonnen en slagschepen? Toen op 28 juni 1914 de Oostenrijkse kroonprins Frans Ferdinand werd vermoord in Sarajevo, ontplofte de bom. Door de bondgenootschappen sleepte iedereen elkaar de oorlog in."
        },
        checkQuestion1: {
          question: "Hoe zorgden bondgenootschappen (allianties) ervoor dat een kleine ruzie een wereldoorlog werd?",
          options: [
            "Omdat iedereen ruzie had over wie de beste vrienden waren.",
            "Omdat landen elkaar beloofd hadden te helpen. Als één land oorlog kreeg, werden hun bondgenoten erin meegezogen.",
            "Omdat alle landen samen in één groot leger zaten.",
            "Dat is niet waar, bondgenootschappen zorgden juist voor vrede."
          ],
          correctAnswer: 1,
          explanation: "Precies. Het was een kettingreactie. Oostenrijk viel Servië aan -> Rusland hielp Servië -> Duitsland hielp Oostenrijk -> Frankrijk hielp Rusland, enzovoort."
        },
        deepDive: {
          title: "De moord in Sarajevo",
          description: "Gavrilo Princip was een jonge Servische nationalist. Hij wilde dat Bosnië bij Servië hoorde, en niet bij Oostenrijk.",
          sourceText: "\"Ik ben een Joegoslavische nationalist, ik streef naar de vereniging van alle Joegoslaven...\" - Gavrilo Princip tijdens zijn rechtszaak."
        },
        checkQuestion2: {
          question: "Was de moord op Frans Ferdinand de ENIGE reden voor de oorlog?",
          options: [
            "Ja, zonder die moord was er nooit oorlog geweest.",
            "Nee, het was slechts de aanleiding (de druppel). De echte oorzaken (MAIN) speelden al veel langer.",
            "Ja, want Frans Ferdinand was de baas van de wereld.",
            "Nee, de echte reden was een ruzie over voetbal."
          ],
          correctAnswer: 1,
          explanation: "Correct! De spanningen (het kruitvat) waren er al jaren. De moord was alleen de vonk die het liet ontploffen."
        },
        cliffhanger: "De oorlog was begonnen. Iedereen dacht: 'Met kerst zijn we weer thuis'. Maar de nieuwe wapens zorgden voor een gruwelijke verrassing..."
      }
    ]
  }
];

export const getCourses = (): Course[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    // Case 1: New Data Structure Exists
    if (stored) {
      return JSON.parse(stored);
    }

    // Case 2: Migration from V1 or V2 (Old versions)
    // We check for older keys to migrate user progress if needed, 
    // but for now we prioritize loading the new Default Data if v3 is missing.
    const oldStorageV2 = localStorage.getItem('history_app_data_v2');
    if (oldStorageV2) {
        // Migration logic could go here, but to ensure the new WW1 lesson appears, 
        // we will merge the old 'nl-indo' edits with the new 'ww1' default.
        const oldCourses = JSON.parse(oldStorageV2) as Course[];
        const migratedCourses = [...DEFAULT_COURSES];
        
        // Preserve changes made to the NL-Indo course if it exists in old data
        const oldIndo = oldCourses.find(c => c.id === 'nl-indo');
        if (oldIndo) {
            migratedCourses[0] = oldIndo;
        }
        
        // Preserve changes to WW1 if the user actually added lessons there (unlikely if they are asking for it)
        const oldWW1 = oldCourses.find(c => c.id === 'ww1');
        if (oldWW1 && oldWW1.lessons.length > 0) {
             migratedCourses[1] = oldWW1;
        }

        saveCourses(migratedCourses);
        return migratedCourses;
    }

    // Case 3: Fresh Start
    saveCourses(DEFAULT_COURSES);
    return DEFAULT_COURSES;
  } catch (e) {
    console.error("Error loading courses", e);
    return DEFAULT_COURSES;
  }
};

export const saveCourses = (courses: Course[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (e) {
    console.error("Error saving courses", e);
  }
};

export const resetData = () => {
  // Clear all versions to be safe
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('history_app_data_v2');
  localStorage.removeItem('indo_nl_history_lessons_v1');
  return DEFAULT_COURSES;
};

// Helper to create a blank lesson
export const createEmptyLesson = (id: number): Lesson => ({
  id,
  title: "Nieuwe Les",
  era: "Tijdvak...",
  hook: {
    type: 'image',
    description: "Beschrijving van de afbeelding",
    searchTerm: "Zoekterm",
    imageUrl: ""
  },
  content: {
    title: "Titel van de paragraaf",
    text: "Schrijf hier de lesstof..."
  },
  checkQuestion1: {
    question: "Vraag 1",
    options: ["Antwoord A", "Antwoord B", "Antwoord C", "Antwoord D"],
    correctAnswer: 0,
    explanation: "Uitleg bij het antwoord."
  },
  deepDive: {
    title: "Verdieping titel",
    description: "Verdiepende tekst...",
    sourceText: "Bronvermelding"
  },
  checkQuestion2: {
    question: "Vraag 2 (Inzicht)",
    options: ["Optie A", "Optie B", "Optie C", "Optie D"],
    correctAnswer: 0,
    explanation: "Uitleg..."
  },
  cliffhanger: "Cliffhanger naar de volgende les..."
});
