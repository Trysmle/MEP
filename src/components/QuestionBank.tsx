import React, { useState } from 'react';
import { BookOpen, Filter, Settings, Play } from 'lucide-react';
import ProgressChart from './ProgressChart';
import PracticeModal from './PracticeModal';
import ExamMode from './ExamMode';

const progressData = [
  { date: 'Mon', correct: 42, total: 50 },
  { date: 'Tue', correct: 38, total: 45 },
  { date: 'Wed', correct: 55, total: 60 },
  { date: 'Thu', correct: 40, total: 50 },
  { date: 'Fri', correct: 48, total: 55 },
  { date: 'Sat', correct: 60, total: 75 },
  { date: 'Sun', correct: 42, total: 50 }
];

export default function QuestionBank() {
  const [selectedBank, setSelectedBank] = useState('medgard');
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const [examMode, setExamMode] = useState(false);

  const handleStartPractice = (settings: any) => {
    setIsPracticeModalOpen(false);
    setExamMode(true);
  };

  if (examMode) {
    return (
      <ExamMode
        settings={{
          mode: 'exam',
          questionCount: 50,
          difficulty: 'medium'
        }}
        onComplete={() => setExamMode(false)}
        onClose={() => setExamMode(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Question Banks</h2>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsPracticeModalOpen(true)}
          >
            <Play className="h-4 w-4 mr-2" />
            Start Practice
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <BankCard
          name="Medgard"
          questions={1000}
          completion={75}
          subjects={['Anesthesia', 'Orthopedics', 'Plastic Surgery']}
          isSelected={selectedBank === 'medgard'}
          onClick={() => setSelectedBank('medgard')}
        />
        <BankCard
          name="Clinical Cases"
          questions={500}
          completion={30}
          subjects={['Internal Medicine', 'Surgery', 'Pediatrics']}
          isSelected={selectedBank === 'clinical'}
          onClick={() => setSelectedBank('clinical')}
        />
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Last 7 days</span>
            <Settings className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
        <ProgressChart data={progressData} />
      </div>

      <PracticeModal 
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        selectedBank={selectedBank}
        onStartPractice={handleStartPractice}
      />
    </div>
  );
}

function BankCard({ name, questions, completion, subjects, isSelected, onClick }: {
  name: string;
  questions: number;
  completion: number;
  subjects: string[];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{questions} questions</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {subjects.map((subject) => (
              <span 
                key={subject}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        <BookOpen className={`h-5 w-5 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{completion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}