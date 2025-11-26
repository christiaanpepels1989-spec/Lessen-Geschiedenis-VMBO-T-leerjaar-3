import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, User, GraduationCap, Sparkles } from 'lucide-react';
import { sendMessageToTeacher } from '../services/geminiService';
import { ChatMessage } from '../types';

export const TeacherChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hoi! Ik ben Digi Docent. Snap je iets niet of wil je meer weten? Vraag het mij!" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await sendMessageToTeacher(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        
        {/* Helper Label (Only visible when closed) */}
        {!isOpen && (
            <div className="hidden md:block bg-white text-history-dark px-4 py-2 rounded-lg shadow-lg border border-gray-200 animate-fade-in font-medium text-sm">
                Vraag <span className="font-bold text-history-blue">Digi Docent</span>
            </div>
        )}

        {/* Toggle Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
            isOpen 
                ? 'bg-history-dark text-white rotate-90' 
                : 'bg-history-blue text-white hover:bg-blue-900 hover:scale-110'
            }`}
        >
            {isOpen ? <XIcon /> : <Sparkles className="w-8 h-8" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden max-h-[500px] animate-fade-in-up">
          <div className="bg-history-blue text-white p-4 flex items-center gap-3 shadow-md">
            <div className="bg-white/20 p-2 rounded-full border border-white/30">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-serif tracking-wide">Digi Docent</h3>
              <p className="text-xs text-blue-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online Hulp
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                  msg.role === 'user' ? 'bg-gray-200 border-gray-300' : 'bg-history-blue border-blue-800'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-gray-600" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm max-w-[80%] shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-history-blue flex items-center justify-center shrink-0 border border-blue-800">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Is aan het typen</span>
                  <Loader2 className="w-4 h-4 animate-spin text-history-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Typ je vraag..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-history-blue focus:ring-1 focus:ring-history-blue bg-gray-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-history-blue text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);