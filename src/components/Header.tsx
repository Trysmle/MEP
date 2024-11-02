import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, UserCircle, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MedPrep</span>
            </Link>
          </div>
          <div className="flex space-x-8">
            <NavLink to="/banks" icon={<BookOpen />} text="Question Banks" />
            <NavLink to="/profile" icon={<UserCircle />} text="Profile" />
            <NavLink to="/admin" icon={<Settings />} text="Admin" />
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link 
      to={to} 
      className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 mr-1' })}
      <span className="font-medium">{text}</span>
    </Link>
  );
}