'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { X, Calendar, Trophy } from 'lucide-react';
import { formatGameTime } from '@/lib/date-utils';
import { dataProvider } from '@/data/data-provider';
import { usePredictions } from '@/hooks/use-predictions';

interface PredictionSidebarProps {
  trigger: React.ReactNode;
}

export function PredictionSidebar({ trigger }: PredictionSidebarProps) {
  const { predictions, predictionCount, removePrediction } = usePredictions();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGamesForPredictions = async () => {
      if (predictionCount === 0) return;
      
      setIsLoading(true);
      try {
        const gameIds = Object.keys(predictions);
        const gamePromises = gameIds.map(id => 
          dataProvider.getGameById(id).catch(err => {
            console.error(`Failed to fetch game ${id}:`, err);
            return null;
          })
        );
        
        const fetchedGames = await Promise.all(gamePromises);
        setGames(fetchedGames.filter(Boolean) as Game[]);
      } catch (error) {
        console.error('Error fetching games for predictions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGamesForPredictions();
  }, [predictions, predictionCount]);

  const handleRemovePrediction = (gameId: string) => {
    try {
      removePrediction(gameId);
    } catch (error) {
      console.error('Failed to remove prediction:', error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              My Predictions
            </DrawerTitle>
            <DrawerDescription>
              {predictionCount === 0
                ? 'No predictions made yet'
                : `${predictionCount} prediction${predictionCount !== 1 ? 's' : ''} made`}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading predictions...
              </div>
            ) : predictionCount === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No predictions yet</p>
                <p className="text-sm">Pick your winners to get started!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {games.map((game) => {
                  const prediction = predictions[game.id];
                  if (!prediction) return null;
                  
                  const predictedTeam = game.teams.find(t => t.id === prediction.predictedWinnerId);
                  
                  return (
                    <Card key={game.id} className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-sm">{game.division}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemovePrediction(game.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatGameTime(game.scheduledTime)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">
                            {game.teams.map(t => t.abbreviation || t.name).join(' vs ')}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="text-xs">
                              Prediction
                            </Badge>
                            <span className="font-medium text-sm">
                              {predictedTeam?.name}
                            </span>
                          </div>
                          
                          {predictedTeam && (
                            <div className="text-xs text-muted-foreground">
                              Win Rate: {(predictedTeam.winPercentage * 100).toFixed(0)}%
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
          
          <DrawerFooter>
            {predictionCount > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                Tap a game above to remove your prediction
              </div>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}