import React from 'react';
import { User, Settings, Book, Award, Clock, Calendar } from 'lucide-react';
import ProgressChart from './ProgressChart';

const progressData = [
  { date: 'Mon', correct: 42, total: 50 },
  { date: 'Tue', correct: 38, total: 45 },
  { date: 'Wed', correct: 55, total: 60 },
  { date: 'Thu', correct: 40, total: 50 },
  { date: 'Fri', correct: 48, total: 55 },
  { date: 'Sat', correct: 60, total: 75 },
  { date: 'Sun', correct: 42, total: 50 }
];

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dr. Sarah Chen</h2>
            <p className="text-gray-500">Medical Resident • Joined January 2024</p>
          </div>
          <button className="ml-auto btn-secondary flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Book className="h-6 w-6 text-indigo-600" />}
          title="Questions Completed"
          value="1,248"
        />
        <StatCard
          icon={<Award className="h-6 w-6 text-green-600" />}
          title="Success Rate"
          value="76%"
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-blue-600" />}
          title="Study Hours"
          value="124"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Performance Overview</h3>
          <select className="rounded-lg border-gray-300 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        <div className="h-64">
          <ProgressChart data={progressData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            {
              icon: <Book className="h-5 w-5 text-indigo-600" />,
              title: "Completed Cardiology Quiz",
              time: "2 hours ago",
              score: "85%"
            },
            {
              icon: <Calendar className="h-5 w-5 text-green-600" />,
              title: "Daily Challenge Streak",
              time: "1 day ago",
              score: "5 days"
            },
            {
              icon: <Award className="h-5 w-5 text-yellow-600" />,
              title: "Earned Expert Badge",
              time: "2 days ago",
              score: "Neurology"
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-gray-50 p-2 rounded-lg">
                {activity.icon}
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <span className="text-sm font-medium text-gray-900">{activity.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="bg-gray-50 p-3 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}