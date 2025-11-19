import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Heart, Clock, MapPin, Star, TrendingUp } from 'lucide-react';
import { RescueStats } from '@/types/rescue';

interface RescueStatsProps {
  stats: RescueStats;
}

export function RescueStatsComponent({ stats }: RescueStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Total Rescues</span>
        </div>
        <p className="text-2xl font-bold text-blue-900">{stats.totalRescues}</p>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-900">Active Holds</span>
        </div>
        <p className="text-2xl font-bold text-yellow-900">{stats.activeHolds}</p>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-900">Verified Returns</span>
        </div>
        <p className="text-2xl font-bold text-green-900">{stats.verifiedReturns}</p>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-900">Drop-offs</span>
        </div>
        <p className="text-2xl font-bold text-purple-900">{stats.dropOffs}</p>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-orange-600" />
          <span className="text-sm font-medium text-orange-900">Impact Score</span>
        </div>
        <p className="text-2xl font-bold text-orange-900">{stats.impactScore}</p>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-pink-600" />
          <span className="text-sm font-medium text-pink-900">Current Streak</span>
        </div>
        <p className="text-2xl font-bold text-pink-900">{stats.currentStreak} days</p>
      </Card>
    </div>
  );
}