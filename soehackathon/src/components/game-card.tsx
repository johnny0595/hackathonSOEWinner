'use client';

import { Game, Prediction } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Trophy } from 'lucide-react';
import { formatGameTime } from '@/lib/date-utils';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  prediction: Prediction | null;
  onPredict: (teamId: string) => void;
}

export function GameCard({ game, prediction, onPredict }: GameCardProps) {
  const [team1, team2] = game.teams;
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{game.division}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatGameTime(game.scheduledTime)}
          </Badge>
        </div>
        {game.venue && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {game.venue}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-2">
          {/* Team 1 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-center">
              <div className="font-semibold text-sm">{team1.name}</div>
              <div className="text-xs text-muted-foreground">
                {team1.abbreviation}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {(team1.winPercentage * 100).toFixed(0)}%
              </span>
            </div>
            <Button
              variant={prediction?.predictedWinnerId === team1.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPredict(team1.id)}
              className={cn(
                'w-full',
                prediction?.predictedWinnerId === team1.id &&
                  'bg-primary text-primary-foreground'
              )}
            >
              Pick {team1.abbreviation || team1.name}
            </Button>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">
              VS
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-center">
              <div className="font-semibold text-sm">{team2.name}</div>
              <div className="text-xs text-muted-foreground">
                {team2.abbreviation}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {(team2.winPercentage * 100).toFixed(0)}%
              </span>
            </div>
            <Button
              variant={prediction?.predictedWinnerId === team2.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPredict(team2.id)}
              className={cn(
                'w-full',
                prediction?.predictedWinnerId === team2.id &&
                  'bg-primary text-primary-foreground'
              )}
            >
              Pick {team2.abbreviation || team2.name}
            </Button>
          </div>
        </div>

        {prediction && (
          <div className="pt-2 border-t">
            <div className="text-xs text-center text-muted-foreground">
              Prediction: {game.teams.find(t => t.id === prediction.predictedWinnerId)?.name}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}