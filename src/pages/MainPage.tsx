import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Brain } from 'lucide-react';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to MedPrep</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/banks')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Question Banks</h2>
          <p className="text-gray-600">
            Access comprehensive question banks for different medical specialties
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Community</h2>
          <p className="text-gray-600">
            Collaborate with peers and share knowledge
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Daily Practice</h2>
          <p className="text-gray-600">
            Take daily quizzes to maintain your knowledge
          </p>
        </div>
      </div>
    </div>
  );
}