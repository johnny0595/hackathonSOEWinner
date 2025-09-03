'use client';

import { Game } from '@/types';
import { GameCard } from './game-card';
import { usePredictions } from '@/hooks/use-predictions';
import { toast } from 'sonner';

interface GamesListProps {
  games: Game[];
  isLoading?: boolean;
  selectedSport?: string;
}

export function GamesList({ games, isLoading = false, selectedSport }: GamesListProps) {
  const { getPredictionForGame, savePrediction, removePrediction } = usePredictions();

  const handlePredict = (gameId: string, teamId: string) => {
    try {
      savePrediction(gameId, teamId);
      const game = games.find(g => g.id === gameId);
      const team = game?.teams.find(t => t.id === teamId);
      
      if (team) {
        toast.success(`Prediction saved: ${team.name} to win!`);
      }
    } catch (error) {
      console.error('Failed to save prediction:', error);
      toast.error('Failed to save prediction. Please try again.');
    }
  };

  const handleRemovePrediction = (gameId: string) => {
    try {
      removePrediction(gameId);
      toast.success('Prediction removed!');
    } catch (error) {
      console.error('Failed to remove prediction:', error);
      toast.error('Failed to remove prediction. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-lg font-medium text-muted-foreground">
          Loading games...
        </div>
      </div>
    );
  }

  if (!selectedSport) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-lg font-medium text-muted-foreground">
          Select a sport to view games
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Choose from the sports menu above to see today&apos;s schedule
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-lg font-medium text-muted-foreground">
          No games scheduled
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          No {selectedSport} games are scheduled for today
        </div>
      </div>
    );
  }

  return (
    <div 
      className="space-y-4 p-4"
      role="tabpanel" 
      id={selectedSport ? `games-for-${selectedSport.toLowerCase()}` : 'games-panel'}
      aria-label={`${selectedSport} games`}
    >
      <div className="text-lg font-semibold">
        {selectedSport} Games - {games.length} match{games.length !== 1 ? 'es' : ''}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            prediction={getPredictionForGame(game.id)}
            onPredict={(teamId) => handlePredict(game.id, teamId)}
            onRemovePrediction={() => handleRemovePrediction(game.id)}
          />
        ))}
      </div>
    </div>
  );
}