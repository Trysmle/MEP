import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Target, Clock, Flag } from 'lucide-react';

interface ProgressStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  flaggedQuestions: number;
  averageTime: number;
  weeklyProgress: Array<{
    date: string;
    correct: number;
    total: number;
  }>;
}

interface ProgressDashboardProps {
  stats: ProgressStats;
  onReviewFlagged: () => void;
  onReviewIncorrect: () => void;
}

export default function ProgressDashboard({ 
  stats, 
  onReviewFlagged, 
  onReviewIncorrect 
}: ProgressDashboardProps) {
  const defaultStats: ProgressStats = {
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    flaggedQuestions: 0,
    averageTime: 0,
    weeklyProgress: [
      { date: 'Mon', correct: 0, total: 0 },
      { date: 'Tue', correct: 0, total: 0 },
      { date: 'Wed', correct: 0, total: 0 },
      { date: 'Thu', correct: 0, total: 0 },
      { date: 'Fri', correct: 0, total: 0 },
      { date: 'Sat', correct: 0, total: 0 },
      { date: 'Sun', correct: 0, total: 0 }
    ]
  };

  const currentStats = stats || defaultStats;

  const accuracy = currentStats.totalQuestions > 0
    ? Math.round((currentStats.correctAnswers / currentStats.totalQuestions) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Progress Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Brain className="h-8 w-8 text-indigo-600" />}
          label="Total Questions"
          value={currentStats.totalQuestions}
        />
        <StatCard
          icon={<Target className="h-8 w-8 text-green-600" />}
          label="Accuracy"
          value={`${accuracy}%`}
        />
        <StatCard
          icon={<Clock className="h-8 w-8 text-blue-600" />}
          label="Avg. Time/Question"
          value={`${Math.round(currentStats.averageTime)}s`}
        />
        <StatCard
          icon={<Flag className="h-8 w-8 text-red-600" />}
          label="Flagged Questions"
          value={currentStats.flaggedQuestions}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentStats.weeklyProgress}>
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
              />
              <YAxis 
                stroke="#9CA3AF"
                domain={[0, 100]}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="correct" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={{ fill: '#4F46E5', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onReviewFlagged}
          className="btn-secondary flex items-center justify-center"
        >
          <Flag className="h-4 w-4 mr-2" />
          Review Flagged Questions ({currentStats.flaggedQuestions})
        </button>
        <button
          onClick={onReviewIncorrect}
          className="btn-secondary flex items-center justify-center"
        >
          <Target className="h-4 w-4 mr-2" />
          Review Incorrect Questions ({currentStats.incorrectAnswers})
        </button>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-2">
        {icon}
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}