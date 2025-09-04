'use client';

import { LeaderboardEntry } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  rank: number;
  showChampionImage?: boolean;
}

export function LeaderboardCard({ 
  entry, 
  rank, 
  showChampionImage = false 
}: LeaderboardCardProps) {
  const isChampion = rank === 1;
  const isTopThree = rank <= 3;
  
  const getRankDisplay = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600 dark:text-yellow-400';
    if (rank === 2) return 'text-gray-600 dark:text-gray-400';
    if (rank === 3) return 'text-amber-600 dark:text-amber-400';
    return 'text-muted-foreground';
  };

  return (
    <Card className={cn(
      'w-full transition-all duration-200',
      isChampion && 'ring-2 ring-yellow-500 shadow-lg',
      isTopThree && !isChampion && 'ring-1 ring-primary/20',
      entry.isCurrentUser && 'ring-2 ring-blue-500',
      'hover:shadow-md'
    )}>
      <CardContent className="p-4">
        {/* Champion Image */}
        {showChampionImage && isChampion && (
          <div className="mb-4 text-center">
            <div className="mx-auto w-32 h-40 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {/* Placeholder for Pack Madness Champ image */}
              <div className="text-center">
                <div className="text-4xl mb-2">🐺</div>
                <div className="text-xs">PACK</div>
                <div className="text-xs">MADNESS</div>
                <div className="text-xs">CHAMP</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Champion gets the Pack Madness Champ shirt!
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Left side: Rank and User Info */}
          <div className="flex items-center space-x-3">
            <div className={cn(
              'text-2xl font-bold',
              getRankColor(rank)
            )}>
              {getRankDisplay(rank)}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-2xl">
                {entry.avatar || '👤'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {entry.name}
                  </span>
                  {entry.isCurrentUser && (
                    <Badge variant="outline" className="text-xs">
                      <User className="h-3 w-3 mr-1" />
                      You
                    </Badge>
                  )}
                  {isChampion && (
                    <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                      <Trophy className="h-3 w-3 mr-1" />
                      Champion
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {entry.correctPredictions}/{entry.totalPredictions} correct
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Accuracy */}
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className={cn(
                'text-lg font-bold',
                isChampion && 'text-yellow-600 dark:text-yellow-400'
              )}>
                {(entry.accuracy * 100).toFixed(1)}%
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-20 h-2 bg-muted rounded-full mt-1">
              <div 
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  isChampion ? 'bg-yellow-500' : 'bg-primary'
                )}
                style={{ width: `${entry.accuracy * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}