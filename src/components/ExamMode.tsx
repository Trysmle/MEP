import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Flag, MessageSquare, Clock, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { Question } from '../types';
import { mockQuestions } from '../data/mockData';

interface ExamModeProps {
  settings: {
    mode: 'explained' | 'exam' | 'quick';
    questionCount: number;
    difficulty: string;
    subjects: string[];
    completionStatus: string;
  };
  onComplete: () => void;
  onClose: () => void;
}

interface CommunityNote {
  id: string;
  userId: string;
  userName: string;
  text: string;
  votes: number;
  userVoted?: 'up' | 'down';
  timestamp: string;
}

export default function ExamMode({ settings, onComplete, onClose }: ExamModeProps) {
  const [questions] = useState(mockQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [communityNotes, setCommunityNotes] = useState<Record<string, CommunityNote[]>>({});

  const question = questions[currentQuestion];
  const currentNotes = communityNotes[question.id] || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (optionId: string) => {
    if (settings.mode === 'exam' && selectedAnswer !== null) return;
    setSelectedAnswer(optionId);
    setAnswers(prev => ({ ...prev, [question.id]: optionId }));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: CommunityNote = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      text: newNote,
      votes: 0,
      timestamp: new Date().toISOString()
    };

    setCommunityNotes(prev => ({
      ...prev,
      [question.id]: [...(prev[question.id] || []), note]
    }));
    setNewNote('');
  };

  const handleVote = (noteId: string, voteType: 'up' | 'down') => {
    setCommunityNotes(prev => ({
      ...prev,
      [question.id]: prev[question.id].map(note => {
        if (note.id === noteId) {
          const currentVote = note.userVoted;
          let voteDiff = 0;
          
          if (currentVote === voteType) {
            // Remove vote
            voteDiff = voteType === 'up' ? -1 : 1;
            note.userVoted = undefined;
          } else {
            // Change vote or add new vote
            voteDiff = currentVote ? 2 : 1;
            if (voteType === 'down') voteDiff *= -1;
            note.userVoted = voteType;
          }
          
          return { ...note, votes: note.votes + voteDiff };
        }
        return note;
      }).sort((a, b) => b.votes - a.votes)
    }));
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setIsComplete(true);
      onComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => 
      prev.includes(question.id)
        ? prev.filter(id => id !== question.id)
        : [...prev, question.id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <button
            onClick={toggleFlag}
            className={`flex items-center space-x-1 ${
              flaggedQuestions.includes(question.id) ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <Flag className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg mb-6">{question.text}</p>
        <div className="space-y-4">
          {question.options.map((option) => {
            const isCorrect = option.isCorrect;
            const isSelected = selectedAnswer === option.id;
            const showCorrectness = settings.mode === 'explained' || (settings.mode === 'quick' && selectedAnswer !== null);

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  showCorrectness
                    ? isCorrect
                      ? 'border-green-600 bg-green-50'
                      : isSelected
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200'
                    : isSelected
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>

      {(settings.mode === 'explained' || (settings.mode === 'quick' && selectedAnswer !== null)) && (
        <>
          <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Official Explanation</h3>
            <p className="text-green-700">{question.explanation}</p>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Community Notes</h3>
            <div className="space-y-4 mb-4">
              {currentNotes.map((note) => (
                <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-900">{note.text}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {note.userName} • {new Date(note.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(note.id, 'up')}
                        className={`p-1 rounded hover:bg-gray-200 ${
                          note.userVoted === 'up' ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium">{note.votes}</span>
                      <button
                        onClick={() => handleVote(note.id, 'down')}
                        className={`p-1 rounded hover:bg-gray-200 ${
                          note.userVoted === 'down' ? 'text-red-600' : 'text-gray-400'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add your explanation..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleAddNote}
                className="btn-primary flex items-center"
                disabled={!newNote.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Add Note
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        <button
          onClick={handleNext}
          className="btn-primary flex items-center"
          disabled={settings.mode !== 'explained' && selectedAnswer === null}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}