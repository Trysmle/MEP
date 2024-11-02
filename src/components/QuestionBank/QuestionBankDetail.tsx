import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Download, Upload, ArrowLeft } from 'lucide-react';
import QuestionList from './QuestionList';
import PracticeModal from '../PracticeModal';
import { mockQuestions } from '../../data/mockData';
import { mockBanks } from '../../data/mockData';

export default function QuestionBankDetail() {
  const { bankId } = useParams();
  const navigate = useNavigate();
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  const bank = mockBanks.find(b => b.id === bankId);

  if (!bank) {
    return <div>Question bank not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Banks
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{bank.name}</h1>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
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

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Questions</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{bank.totalQuestions}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Completion</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{bank.completion}%</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Difficulty</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900 capitalize">{bank.difficulty}</p>
          </div>
        </div>
      </div>

      <QuestionList
        questions={mockQuestions}
        onQuestionSelect={(questionId) => console.log('Selected question:', questionId)}
      />

      <PracticeModal
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        selectedBank={bankId || ''}
      />
    </div>
  );
}