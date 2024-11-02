import React, { useState } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function ConfirmedQuestions() {
  const [timeFilter, setTimeFilter] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Confirmed Questions</h2>
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
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="btn-secondary flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
          <button className="btn-secondary flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Select Date
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <QuestionCard
          question="What is the primary mechanism of action for propofol?"
          author="Dr. Sarah Chen"
          votes={24}
          comments={8}
          status="featured"
          difficulty="hard"
          rating={4.8}
          tags={['Pharmacology', 'Anesthesia']}
        />
        <QuestionCard
          question="Which cardiac enzyme is most specific for diagnosing acute myocardial infarction?"
          author="Dr. James Wilson"
          votes={18}
          comments={6}
          status="featured"
          difficulty="medium"
          rating={4.5}
          tags={['Cardiology', 'Emergency Medicine']}
        />
      </div>
    </div>
  );
}