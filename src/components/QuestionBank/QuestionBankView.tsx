import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PracticeModal from '../PracticeModal';
import ExamMode from '../ExamMode';
import ProgressDashboard from '../ProgressDashboard';
import QuestionList from './QuestionList';
import { mockQuestions } from '../../data/mockData';

interface PracticeSettings {
  mode: 'explained' | 'exam' | 'quick';
  questionCount: number;
  difficulty: string;
  subjects: string[];
  completionStatus: string;
}

export default function QuestionBankView() {
  const { bankId } = useParams();
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const [practiceSettings, setPracticeSettings] = useState<PracticeSettings | null>(null);

  const handleStartPractice = (settings: PracticeSettings) => {
    setPracticeSettings(settings);
    setExamMode(true);
    setIsPracticeModalOpen(false);
  };

  const handleExamComplete = () => {
    setExamMode(false);
    setPracticeSettings(null);
  };

  const handleReviewFlagged = () => {
    setPracticeSettings({
      mode: 'explained',
      questionCount: 10,
      difficulty: 'all',
      subjects: [],
      completionStatus: 'flagged'
    });
    setExamMode(true);
  };

  const handleReviewIncorrect = () => {
    setPracticeSettings({
      mode: 'explained',
      questionCount: 10,
      difficulty: 'all',
      subjects: [],
      completionStatus: 'incorrect'
    });
    setExamMode(true);
  };

  if (examMode && practiceSettings) {
    return (
      <ExamMode
        settings={practiceSettings}
        onComplete={handleExamComplete}
        onClose={() => setExamMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Question Bank: {bankId}</h1>
        <button
          onClick={() => setIsPracticeModalOpen(true)}
          className="btn-primary"
        >
          Start Practice
        </button>
      </div>

      <ProgressDashboard 
        stats={{
          totalQuestions: 100,
          correctAnswers: 75,
          incorrectAnswers: 25,
          flaggedQuestions: 10,
          averageTime: 45,
          weeklyProgress: [
            { date: 'Mon', correct: 42, total: 50 },
            { date: 'Tue', correct: 38, total: 45 },
            { date: 'Wed', correct: 55, total: 60 },
            { date: 'Thu', correct: 40, total: 50 },
            { date: 'Fri', correct: 48, total: 55 },
            { date: 'Sat', correct: 60, total: 75 },
            { date: 'Sun', correct: 42, total: 50 }
          ]
        }}
        onReviewFlagged={handleReviewFlagged}
        onReviewIncorrect={handleReviewIncorrect}
      />

      <QuestionList
        questions={mockQuestions}
        onQuestionSelect={() => {}}
      />

      <PracticeModal
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        selectedBank={bankId || ''}
        onStartPractice={handleStartPractice}
      />
    </div>
  );
}