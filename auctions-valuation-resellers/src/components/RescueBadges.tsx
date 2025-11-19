import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trophy, Star, Heart, Zap, Shield, Award } from 'lucide-react';
import { RescueBadge } from '@/types/rescue';

interface RescueBadgesProps {
  badges: RescueBadge[];
  allBadges: RescueBadge[];
}

export function RescueBadges({ badges, allBadges }: RescueBadgesProps) {
  const earnedBadgeIds = badges.map(b => b.id);
  
  const badgeIcons: Record<string, React.ReactNode> = {
    first_rescue: <Heart className="h-8 w-8" />,
    ten_rescues: <Trophy className="h-8 w-8" />,
    fifty_rescues: <Star className="h-8 w-8" />,
    hundred_rescues: <Award className="h-8 w-8" />,
    week_streak: <Zap className="h-8 w-8" />,
    month_streak: <Shield className="h-8 w-8" />,
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        Rescue Badges & Achievements
      </h3>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <TooltipProvider>
          {allBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            const earnedBadge = badges.find(b => b.id === badge.id);
            
            return (
              <Tooltip key={badge.id}>
                <TooltipTrigger>
                  <div className={`relative p-4 rounded-lg border-2 transition-all ${
                    isEarned 
                      ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 shadow-md' 
                      : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
                  }`}>
                    <div className={isEarned ? 'text-yellow-600' : 'text-gray-400'}>
                      {badgeIcons[badge.id] || <Award className="h-8 w-8" />}
                    </div>
                    {isEarned && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-green-500 text-white text-xs">✓</Badge>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    {isEarned && earnedBadge?.earnedDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Earned: {new Date(earnedBadge.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                    {!isEarned && (
                      <p className="text-xs text-gray-500 mt-1">
                        Requirement: {badge.requirement} {badge.type}
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Perks Unlocked:</span> Priority support, 
          extended hold periods, and exclusive access to premium auction data.
        </p>
      </div>
    </Card>
  );
}