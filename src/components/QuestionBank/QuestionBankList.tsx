import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter } from 'lucide-react';
import { mockBanks } from '../../data/mockData';

export default function QuestionBankList() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Question Banks</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search banks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBanks.map((bank) => (
          <div
            key={bank.id}
            onClick={() => navigate(`/bank/${bank.id}`)}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-200 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{bank.name}</h3>
                <p className="text-sm text-gray-600">{bank.totalQuestions} questions</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bank.subjects.map((subject) => (
                    <span 
                      key={subject}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <BookOpen className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{bank.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 rounded-full h-2"
                  style={{ width: `${bank.completion}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}