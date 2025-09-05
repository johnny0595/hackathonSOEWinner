'use client';

import Image from 'next/image';
import { LeaderboardData } from '@/types';
import { LeaderboardCard } from './leaderboard-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Target, Calendar } from 'lucide-react';

interface LeaderboardProps {
  data: LeaderboardData;
}

export function Leaderboard({ data }: LeaderboardProps) {
  const { entries, champion, lastUpdated } = data;
  const totalUsers = entries.length;
  const averageAccuracy = entries.reduce((sum, entry) => sum + entry.accuracy, 0) / totalUsers;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{totalUsers}</div>
            <div className="text-xs text-muted-foreground">Total Players</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{(averageAccuracy * 100).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Avg Accuracy</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{champion ? (champion.accuracy * 100).toFixed(1) : '0'}%</div>
            <div className="text-xs text-muted-foreground">Best Score</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm font-bold">{formatDate(lastUpdated)}</div>
            <div className="text-xs text-muted-foreground">Last Updated</div>
          </CardContent>
        </Card>
      </div>

      {/* Champion Showcase */}
      {champion && (
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Trophy className="h-6 w-6 text-yellow-600" />
              Current Champion
            </CardTitle>
            <div className="text-muted-foreground">
              Leading with the highest prediction accuracy!
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              {/* Pack Madness Champ Image */}
              <div className="relative">
                <div className="w-48 h-60 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/pack-champ.png"
                    alt="Pack Madness Champion"
                    width={192}
                    height={240}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900">
                  #1
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl">{champion.avatar}</span>
                  <div>
                    <div className="text-xl font-bold">{champion.name}</div>
                    <div className="text-lg text-muted-foreground">
                      {champion.correctPredictions}/{champion.totalPredictions} predictions correct
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {(champion.accuracy * 100).toFixed(1)}% Accuracy
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  🎉 Congratulations! You&apos;ve earned the Pack Madness Champ title!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Ranked by prediction accuracy
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.map((entry, index) => (
            <LeaderboardCard
              key={entry.id}
              entry={entry}
              rank={index + 1}
              showChampionImage={false}
            />
          ))}
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="text-center text-sm text-muted-foreground">
        Rankings update automatically as games conclude. Good luck, Pack!
      </div>
    </div>
  );
}