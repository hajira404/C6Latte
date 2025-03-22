import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, Crown, Medal, Trophy, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  avatar: string;
  isCurrentUser: boolean;
}

interface LeaderboardProps {
  onBack: () => void;
  updateGlobalRank?: (rank: number) => void;
}

export function Leaderboard({ onBack, updateGlobalRank }: LeaderboardProps) {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'allTime'>('weekly');
  const [entries] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'sarah@',
      score: 2500,
      rank: 1,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: true
    },
    {
      id: '2',
      name: 'girija',
      score: 2350,
      rank: 2,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: false
    },
    {
      id: '3',
      name: 'venkatesh',
      score: 2200,
      rank: 3,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: false
    },
    {
      id: '4',
      name: 'sinchana',
      score: 2100,
      rank: 4,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: false
    },
    {
      id: '5',
      name: 'kaleem',
      score: 2000,
      rank: 5,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: false
    },
    {
      id: '6',
      name: 'tarun',
      score: 1900,
      rank: 6,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: false
    },
    {
      id: '7',
      name: 'saleem',
      score: 1800,
      rank: 7,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80',
      isCurrentUser: false
    }
  ]);

  useEffect(() => {
    // Find current user's rank and update dashboard
    const currentUser = entries.find(entry => entry.isCurrentUser);
    if (currentUser && updateGlobalRank) {
      updateGlobalRank(currentUser.rank);
    }
  }, [entries, updateGlobalRank]);

  const timeframes = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'All Time', value: 'allTime' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-emerald-800 ml-3">Leaderboard</h1>
        </div>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value as any)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeframe === tf.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 flex items-center space-x-4 ${
                entry.isCurrentUser ? 'bg-emerald-50' : ''
              }`}
            >
              <div className="flex-shrink-0 w-12 text-center font-semibold text-gray-600">
                #{entry.rank}
              </div>
              <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>
              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="ml-2 text-sm text-emerald-600">(You)</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{entry.score} points</p>
              </div>
              {entry.rank <= 3 && (
                <div className="flex-shrink-0">
                  <div className="px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
                    Top {entry.rank}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}