import React, { useState } from 'react';
import { Search, Filter, Flag, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { Question } from '../../types';

interface QuestionListProps {
  questions: Question[];
  onQuestionSelect: (questionId: string) => void;
}

export default function QuestionList({ questions, onQuestionSelect }: QuestionListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    difficulty: 'all',
    status: 'all',
    subject: 'all',
    completion: 'all',
    source: 'all',
    examType: 'all'
  });

  const completionOptions = [
    { value: 'all', label: 'All Questions' },
    { value: 'complete', label: 'Completed' },
    { value: 'unused', label: 'Unused' },
    { value: 'incorrect', label: 'Incorrect' },
    { value: 'skipped', label: 'Skipped' },
    { value: 'marked', label: 'Marked' },
    { value: 'incomplete', label: 'Incomplete' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'anesthesia', label: 'Anesthesia' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'plastic_surgery', label: 'Plastic Surgery' },
    { value: 'others', label: 'Others' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'batch_10', label: 'Batch 10' },
    { value: 'batch_10a', label: 'Batch 10 Group A' },
    { value: 'batch_11', label: 'Batch 11' }
  ];

  const examTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'midterm', label: 'Midterm' },
    { value: 'final', label: 'Final' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'doable', label: 'Doable' },
    { value: 'tricky', label: 'Tricky' },
    { value: 'challenging', label: 'Challenging' }
  ];

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV/Excel file upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        // Process the file content and add questions to the bank
        console.log('Processing file:', content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Questions</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <select
            value={selectedFilters.completion}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, completion: e.target.value })}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {completionOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            value={selectedFilters.subject}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, subject: e.target.value })}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {subjectOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            value={selectedFilters.source}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, source: e.target.value })}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {sourceOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            value={selectedFilters.examType}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, examType: e.target.value })}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {examTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            value={selectedFilters.difficulty}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, difficulty: e.target.value })}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {difficultyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <label className="btn-secondary flex items-center cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleBulkUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onClick={() => onQuestionSelect(question.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface QuestionItemProps {
  question: Question;
  onClick: () => void;
}

function QuestionItem({ question, onClick }: QuestionItemProps) {
  const statusIcons = {
    active: <CheckCircle className="h-4 w-4 text-green-500" />,
    archived: <AlertCircle className="h-4 w-4 text-gray-400" />,
    under_review: <Flag className="h-4 w-4 text-yellow-500" />
  };

  const difficultyColors = {
    easy: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    hard: 'text-red-600 bg-red-50'
  };

  return (
    <div
      onClick={onClick}
      className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {statusIcons[question.status]}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
            <span className="text-sm text-gray-500">{question.subject}</span>
          </div>
          <p className="text-gray-900">{question.text}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}