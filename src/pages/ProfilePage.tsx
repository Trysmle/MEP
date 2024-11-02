import React, { useState } from 'react';
import { User, Settings, Bell, Lock, History, ChevronRight, Brain, Target, Clock, Flag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockUser = {
  name: "Dr. Sarah Chen",
  email: "sarah.chen@medprep.com",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
  joinDate: "2024-01-15",
  totalQuestions: 1250,
  averageScore: 85,
  stats: {
    weeklyProgress: [
      { date: 'Mon', score: 75 },
      { date: 'Tue', score: 82 },
      { date: 'Wed', score: 88 },
      { date: 'Thu', score: 85 },
      { date: 'Fri', score: 90 },
      { date: 'Sat', score: 92 },
      { date: 'Sun', score: 87 }
    ],
    subjectPerformance: {
      Anatomy: 85,
      Physiology: 78,
      Pharmacology: 92,
      Pathology: 88,
      Biochemistry: 75
    },
    recentActivity: [
      {
        id: 1,
        type: 'quiz',
        bankName: 'USMLE Step 1',
        date: '2024-03-10',
        score: 85,
        questionsAttempted: 50,
        timeSpent: '45m'
      },
      {
        id: 2,
        type: 'quiz',
        bankName: 'Clinical Cases',
        date: '2024-03-09',
        score: 92,
        questionsAttempted: 30,
        timeSpent: '28m'
      },
      {
        id: 3,
        type: 'quiz',
        bankName: 'Pharmacology',
        date: '2024-03-08',
        score: 78,
        questionsAttempted: 40,
        timeSpent: '35m'
      }
    ]
  }
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    mobile: false,
    weeklyReport: true,
    performanceAlerts: true
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockUser.name}</h1>
              <p className="text-gray-500">{mockUser.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(mockUser.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['overview', 'performance', 'history', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                icon={<Brain className="h-8 w-8 text-indigo-600" />}
                label="Total Questions"
                value={mockUser.totalQuestions}
              />
              <StatCard
                icon={<Target className="h-8 w-8 text-green-600" />}
                label="Average Score"
                value={`${mockUser.averageScore}%`}
              />
              <StatCard
                icon={<Clock className="h-8 w-8 text-blue-600" />}
                label="Study Time"
                value="45h"
              />
              <StatCard
                icon={<Flag className="h-8 w-8 text-red-600" />}
                label="Flagged Questions"
                value="23"
              />
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockUser.stats.weeklyProgress}>
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(mockUser.stats.subjectPerformance).map(([subject, score]) => (
                  <div key={subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">{subject}</span>
                    <div className="flex items-center">
                      <div className="w-48 h-2 bg-gray-200 rounded-full mr-3">
                        <div
                          className="h-2 bg-indigo-600 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Detailed Performance Analysis</h3>
            {/* Add detailed performance metrics here */}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {mockUser.stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <History className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.bankName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} • {activity.questionsAttempted} questions • {activity.timeSpent}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-gray-900">{activity.score}%</p>
                      <p className="text-sm text-gray-500">Score</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Profile Information</p>
                        <p className="text-sm text-gray-500">Update your personal details</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Lock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Password & Security</p>
                        <p className="text-sm text-gray-500">Manage your password and security settings</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => setNotificationSettings(prev => ({
                            ...prev,
                            [key]: !prev[key]
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}