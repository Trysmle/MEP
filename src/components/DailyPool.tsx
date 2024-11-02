import React, { useState } from 'react';
import { Filter, PlusCircle, Search } from 'lucide-react';
import QuestionCard from './QuestionCard';
import AddQuestionModal from './AddQuestionModal';

export default function DailyPool() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Today's Question Pool</h2>
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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Questions</option>
            <option value="featured">Featured</option>
            <option value="pending">Pending Review</option>
            <option value="reviewing">Under Review</option>
          </select>
          <button 
            className="btn-primary flex items-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Question
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <QuestionCard
          question="What is the primary mechanism of action for propofol?"
          author="Dr. Sarah Chen"
          votes={12}
          comments={5}
          status="featured"
          difficulty="hard"
          rating={4.5}
          tags={['Anesthesia', 'Pharmacology']}
        />
        <QuestionCard
          question="In hand surgery, what is the most common complication of carpal tunnel release?"
          author="Dr. James Wilson"
          votes={8}
          comments={3}
          status="reviewing"
          difficulty="medium"
          rating={4.0}
          tags={['Surgery', 'Orthopedics']}
        />
        <QuestionCard
          question="Which antibiotic is most appropriate for community-acquired pneumonia in healthy adults?"
          author="Dr. Emily Rodriguez"
          votes={15}
          comments={7}
          status="pending"
          difficulty="easy"
          rating={4.8}
          tags={['Internal Medicine', 'Infectious Disease']}
        />
      </div>

      <AddQuestionModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}