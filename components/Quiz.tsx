import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  questionData: Question;
  onComplete: () => void;
  id: string; // To reset state when question changes
}

export const Quiz: React.FC<QuizProps> = ({ questionData, onComplete, id }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset state when ID changes (new question)
  React.useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [id]);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === questionData.correctAnswer) {
      onComplete();
    }
  };

  const isCorrect = selectedOption === questionData.correctAnswer;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 mt-6">
      <h3 className="font-serif font-bold text-lg text-history-blue mb-4 flex items-center gap-2">
        <HelpCircle className="w-5 h-5" />
        Checkvraag
      </h3>
      
      <p className="mb-4 font-medium text-history-dark">{questionData.question}</p>

      <div className="space-y-3">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && setSelectedOption(index)}
            disabled={isSubmitted}
            className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
              isSubmitted
                ? index === questionData.correctAnswer
                  ? "bg-green-50 border-green-500 text-green-800"
                  : index === selectedOption
                  ? "bg-red-50 border-red-500 text-red-800"
                  : "bg-gray-50 border-gray-200 text-gray-400"
                : selectedOption === index
                ? "bg-history-blue/10 border-history-blue text-history-blue font-semibold shadow-inner"
                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {isSubmitted && index === questionData.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
              {isSubmitted && index === selectedOption && index !== questionData.correctAnswer && (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className={`mt-4 w-full py-2 px-4 rounded font-bold transition-colors ${
            selectedOption === null
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-history-accent text-white hover:bg-orange-700"
          }`}
        >
          Controleer Antwoord
        </button>
      ) : (
        <div className={`mt-4 p-4 rounded-md ${isCorrect ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
          <p className="font-bold mb-1">{isCorrect ? 'Goed gedaan!' : 'Helaas, dat is niet goed.'}</p>
          <p className="text-sm">{questionData.explanation}</p>
        </div>
      )}
    </div>
  );
};