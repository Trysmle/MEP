import React from 'react';
import { BookOpen } from 'lucide-react';

interface BankCardProps {
  name: string;
  questions: number;
  completion: number;
  subjects: string[];
  isSelected: boolean;
  onClick: () => void;
}

const BankCard: React.FC<BankCardProps> = ({
  name,
  questions,
  completion,
  subjects,
  isSelected,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{questions} questions</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {subjects.map((subject) => (
              <span 
                key={subject}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        <BookOpen className={`h-5 w-5 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{completion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BankCard;