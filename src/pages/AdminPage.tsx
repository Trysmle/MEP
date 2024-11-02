import React, { useState } from 'react';
import { Plus, Upload, Download, Search, Filter } from 'lucide-react';
import AddQuestionModal from '../components/AddQuestionModal';
import { Question } from '../types';

export default function AdminPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV file upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        console.log('Processing file:', content);
      };
      reader.readAsText(file);
    }
  };

  const handleQuestionSubmit = (question: Partial<Question>) => {
    // Handle question submission
    console.log('New question:', question);
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Question Management</h1>
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
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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

            <button className="btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </button>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-4">
          {/* Add question list here */}
        </div>
      </div>

      <AddQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleQuestionSubmit}
      />
    </div>
  );
}