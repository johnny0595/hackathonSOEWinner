'use client';

import { useState } from 'react';
import { Sport } from '@/types';
import { useSports } from '@/hooks/use-sports';
import { useGames } from '@/hooks/use-games';
import { usePredictions } from '@/hooks/use-predictions';
import { SportsHeader } from '@/components/sports-header';
import { GamesList } from '@/components/games-list';
import { PredictionSidebar } from '@/components/prediction-sidebar';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { Trophy, Calendar } from 'lucide-react';

export default function Home() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const { predictionCount } = usePredictions();
  
  const { 
    data: sports = [], 
    isLoading: sportsLoading, 
    error: sportsError 
  } = useSports();
  
  const { 
    data: games = [], 
    isLoading: gamesLoading 
  } = useGames(selectedSport?.id || null);

  // Auto-select first sport when data loads
  if (!selectedSport && sports.length > 0) {
    setSelectedSport(sports[0]);
  }

  const handleSportSelect = (sport: Sport) => {
    setSelectedSport(sport);
  };

  if (sportsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Error Loading Sports
          </h1>
          <p className="text-muted-foreground">
            Unable to load sports data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header with predictions button */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">{today}</span>
          </div>
          
          <PredictionSidebar
            trigger={
              <Button variant="outline" className="relative">
                <Trophy className="h-4 w-4 mr-2" />
                Predictions
                {predictionCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {predictionCount}
                  </Badge>
                )}
              </Button>
            }
          />
        </div>
      </div>

      {/* Sports Header */}
      <SportsHeader
        sports={sports}
        selectedSport={selectedSport}
        onSportSelect={handleSportSelect}
        isLoading={sportsLoading}
      />

      {/* Main Content */}
      <main className="pb-32">
        <GamesList
          games={games}
          isLoading={gamesLoading}
          selectedSport={selectedSport?.name}
        />
      </main>

      {/* Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-4xl mx-auto">
          <SubmitButton className="flex justify-center" />
        </div>
      </div>
    </div>
  );
}
