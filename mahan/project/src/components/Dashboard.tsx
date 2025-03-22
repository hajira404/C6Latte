import React, { useEffect, useState } from 'react';
import { Leaf, Car, Train, Trash2, BarChart3, Trophy, LogOut, Award, Calendar, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Tasks } from './Tasks';
import { Challenges } from './Challenges';
import { Leaderboard } from './Leaderboard';
import UploadImage from "./UploadImage";


export function Dashboard() {
  const [isTopUser, setIsTopUser] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'spring' | 'thunderstorm'>('thunderstorm');
  const [currentView, setCurrentView] = useState<'dashboard' | 'tasks' | 'challenges' | 'leaderboard'>('dashboard');
  const [metrics, setMetrics] = useState({
    carbonScore: 0,
    treesSaved: 0,
    waterSaved: 0,
    rank: 1
  });
  

  useEffect(() => {
    setIsTopUser(metrics.rank <= 5);
    setCurrentTheme(metrics.rank <= 5 ? 'spring' : 'thunderstorm');
  }, [metrics.rank]);

  const getBackgroundStyle = () => {
    if (currentTheme === 'spring') {
      return {
        backgroundImage: `url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
    return {
      backgroundImage: `url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=2000&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    };
  };

  const navigationButtons = [
    { icon: Calendar, label: 'Challenges', value: 'challenges', color: 'bg-purple-600' },
    { icon: Calendar, label: 'Tasks', value: 'tasks', color: 'bg-blue-600' },
    { icon: Users, label: 'Leaderboard', value: 'leaderboard', color: 'bg-pink-600' }
  ];

  const updateGlobalRank = (rank: number) => {
    setMetrics(prev => ({ ...prev, rank }));
  };

  if (currentView === 'tasks') {
    return (
      <div className="min-h-screen p-6" style={getBackgroundStyle()}>
        <div className="max-w-7xl mx-auto">
          <Tasks onBack={() => setCurrentView('dashboard')} updateMetrics={setMetrics} />
        </div>
      </div>
    );
  }

  if (currentView === 'challenges') {
    return (
      <div className="min-h-screen p-6" style={getBackgroundStyle()}>
        <div className="max-w-7xl mx-auto">
          <Challenges onBack={() => setCurrentView('dashboard')} updateMetrics={setMetrics} />
        </div>
      </div>
    );
  }

  if (currentView === 'leaderboard') {
    return (
      <div className="min-h-screen p-6" style={getBackgroundStyle()}>
        <div className="max-w-7xl mx-auto">
          <Leaderboard onBack={() => setCurrentView('dashboard')} updateGlobalRank={updateGlobalRank} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-6 space-y-8"
      style={getBackgroundStyle()}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-8">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-emerald-800 ml-3">Dashboard</h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {navigationButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => setCurrentView(button.value as any)}
              className={`${button.color} text-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity`}
            >
              <button.icon className="w-6 h-6" />
              <span className="font-semibold">{button.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Carbon Score</h3>
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{metrics.carbonScore}</p>
            <p className="text-sm text-gray-500">Points</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Trees Saved</h3>
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{metrics.treesSaved}</p>
            <p className="text-sm text-gray-500">Equivalent</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Water Saved</h3>
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{metrics.waterSaved}</p>
            <p className="text-sm text-gray-500">Liters</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Global Rank</h3>
              <Trophy className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 mt-2">#{metrics.rank}</p>
            <p className="text-sm text-gray-500">of 1000+ users</p>
            {isTopUser && (
              <div className="mt-2 text-sm text-emerald-600 flex items-center">
                <Award className="w-4 h-4 mr-1" />
                Top 5 User!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg font-semibold">
            {isTopUser ? (
              <span className="text-emerald-600">🌟 Leading the Way in Environmental Impact! Keep inspiring others! 🌟</span>
            ) : (
              <span className="text-gray-600">🌱 Every small action counts! Keep making a difference! 🌱</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}