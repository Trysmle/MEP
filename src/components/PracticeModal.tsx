import React, { useState } from 'react';
import { X, BookOpen, Clock, Brain, Zap } from 'lucide-react';

interface PracticeSettings {
  mode: 'explained' | 'exam' | 'quick';
  questionCount: number;
  difficulty: string;
  subjects: string[];
  completionStatus: string;
}

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBank: string;
  onStartPractice: (settings: PracticeSettings) => void;
}

export default function PracticeModal({ isOpen, onClose, selectedBank, onStartPractice }: PracticeModalProps) {
  const [settings, setSettings] = useState<PracticeSettings>({
    mode: 'explained',
    questionCount: 50,
    difficulty: 'all',
    subjects: [],
    completionStatus: 'all'
  });

  if (!isOpen) return null;

  const modes = [
    {
      id: 'explained',
      name: 'Explained Mode',
      icon: BookOpen,
      description: 'Study with detailed explanations'
    },
    {
      id: 'exam',
      name: 'Exam Mode',
      icon: Clock,
      description: 'Simulate exam conditions'
    },
    {
      id: 'quick',
      name: 'Quick Review',
      icon: Zap,
      description: 'Rapid-fire practice'
    }
  ];

  const handleStartPractice = () => {
    onStartPractice(settings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Practice Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Select Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSettings({ ...settings, mode: item.id as 'explained' | 'exam' | 'quick' })}
                  className={`p-4 rounded-lg border-2 text-left ${
                    settings.mode === item.id 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mb-2 ${
                    settings.mode === item.id ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Customize</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Questions
                </label>
                <select 
                  value={settings.questionCount}
                  onChange={(e) => setSettings({
                    ...settings,
                    questionCount: parseInt(e.target.value)
                  })}
                  className="w-full rounded-lg border-gray-300"
                >
                  <option value={25}>25 questions</option>
                  <option value={50}>50 questions</option>
                  <option value={100}>100 questions</option>
                  <option value={300}>300 questions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select 
                  value={settings.difficulty}
                  onChange={(e) => setSettings({
                    ...settings,
                    difficulty: e.target.value
                  })}
                  className="w-full rounded-lg border-gray-300"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={handleStartPractice}
            className="btn-primary flex items-center"
          >
            <Brain className="h-4 w-4 mr-2" />
            Start Practice
          </button>
        </div>
      </div>
    </div>
  );
}