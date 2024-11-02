import React, { useState } from 'react';
import { User, Settings, Bell, Lock, History, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    joinDate: string;
    totalQuestions: number;
    averageScore: number;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Profile Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full" />
              ) : (
                <User className="h-8 w-8 text-indigo-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" activeValue={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Questions Attempted"
                  value={user.totalQuestions}
                  icon={History}
                />
                <StatCard
                  title="Average Score"
                  value={`${user.averageScore}%`}
                  icon={User}
                />
                <StatCard
                  title="Member Since"
                  value={new Date(user.joinDate).toLocaleDateString()}
                  icon={User}
                />
              </div>
            </TabsContent>

            <TabsContent value="history" activeValue={activeTab}>
              <div className="space-y-4">
                <QuizHistoryItem
                  date="2024-03-10"
                  score={85}
                  questionsAttempted={50}
                  timeSpent="45m"
                  bankName="USMLE Step 1"
                />
                <QuizHistoryItem
                  date="2024-03-09"
                  score={92}
                  questionsAttempted={30}
                  timeSpent="28m"
                  bankName="Clinical Cases"
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" activeValue={activeTab}>
              <div className="space-y-6">
                <SettingsSection
                  icon={Settings}
                  title="Account Settings"
                  description="Update your account information"
                />
                <SettingsSection
                  icon={Bell}
                  title="Notifications"
                  description="Configure your notification preferences"
                />
                <SettingsSection
                  icon={Lock}
                  title="Privacy & Security"
                  description="Manage your privacy settings and security options"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType;
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-indigo-600" />
      </div>
    </div>
  );
}

function QuizHistoryItem({ 
  date, 
  score, 
  questionsAttempted, 
  timeSpent, 
  bankName 
}: { 
  date: string; 
  score: number; 
  questionsAttempted: number; 
  timeSpent: string; 
  bankName: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <History className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{bankName}</p>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()} • {questionsAttempted} questions • {timeSpent}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-2xl font-semibold text-gray-900">{score}%</p>
          <p className="text-sm text-gray-500">Score</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}

function SettingsSection({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
}