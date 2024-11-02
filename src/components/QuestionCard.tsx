import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Flag, Star, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  author: string;
  votes: number;
  comments: number;
  status: 'pending' | 'reviewing' | 'featured';
  rating?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export default function QuestionCard({ 
  question, 
  author, 
  votes, 
  comments, 
  status,
  rating = 0,
  difficulty = 'medium',
  tags = []
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);

  const difficultyColors = {
    easy: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    hard: 'text-red-600 bg-red-50'
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewing: 'bg-blue-100 text-blue-800',
    featured: 'bg-purple-100 text-purple-800'
  };

  const handleVote = () => {
    if (!hasVoted) {
      setVoteCount(prev => prev + 1);
      setHasVoted(true);
    } else {
      setVoteCount(prev => prev - 1);
      setHasVoted(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {status === 'featured' && (
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            )}
            <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          <p className="text-lg font-medium text-gray-900">{question}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Posted by {author}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mt-4">
        <button 
          className={`flex items-center ${
            hasVoted ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
          }`}
          onClick={handleVote}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{voteCount}</span>
        </button>
        <button 
          className="flex items-center text-gray-500 hover:text-indigo-600"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{comments}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )}
        </button>
        <button className="flex items-center text-gray-500 hover:text-red-600">
          <Flag className="h-4 w-4 mr-1" />
          <span>Flag</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-indigo-600 ml-auto">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>Report</span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">JD</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    This is a great question! I would add that the mechanism involves positive modulation of GABA receptors.
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="text-xs text-gray-500 hover:text-indigo-600">Reply</button>
                  <button className="text-xs text-gray-500 hover:text-indigo-600">Like</button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <button className="btn-primary text-sm py-1.5">
                Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}