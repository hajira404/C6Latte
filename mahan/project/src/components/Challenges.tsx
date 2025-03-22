import React, { useState } from 'react';
import { ArrowLeft, Award, Calendar, CheckCircle2, Clock, Medal, Star, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: string;
  progress: number;
  completed: boolean;
  icon: any;
}

interface ChallengesProps {
  onBack: () => void;
  updateMetrics: (metrics: any) => void;
}

export function Challenges({ onBack, updateMetrics }: ChallengesProps) {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Eco Streak Master',
      description: 'Maintain a 7-day streak of completing daily eco-tasks',
      points: 500,
      duration: '7 days',
      progress: 2,
      completed: false,
      icon: Star
    },
    {
      id: '2',
      title: 'Monthly Green Goals',
      description: 'Complete all daily tasks for an entire month',
      points: 1000,
      duration: '30 days',
      progress: 15,
      completed: false,
      icon: Calendar
    },
    {
      id: '3',
      title: 'Carbon Saver Milestone',
      description: 'Reduce carbon footprint by 100kg through various activities',
      points: 750,
      duration: 'Ongoing',
      progress: 45,
      completed: false,
      icon: Medal
    }
  ]);

  const handleJoinChallenge = (challenge: Challenge) => {
    if (challenge.completed) {
      toast.success('Challenge already completed!');
      return;
    }
    toast.success(`Joined ${challenge.title}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          <Trophy className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-emerald-800 ml-3">Challenges</h1>
        </div>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <challenge.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
                  <p className="text-gray-600 mt-1">{challenge.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{challenge.duration}</span>
                    </div>
                    <div className="flex items-center text-emerald-600">
                      <Award className="w-4 h-4 mr-1" />
                      <span>{challenge.points} points</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleJoinChallenge(challenge)}
                className={`px-4 py-2 rounded-lg ${
                  challenge.completed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                } transition-colors`}
              >
                {challenge.completed ? (
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                ) : (
                  'Join Challenge'
                )}
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round((challenge.progress / 100) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}