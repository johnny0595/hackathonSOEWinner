'use client';

import { cn } from '@/lib/utils';
import { Sport } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SportsHeaderProps {
  sports: Sport[];
  selectedSport: Sport | null;
  onSportSelect: (sport: Sport) => void;
  isLoading?: boolean;
}

export function SportsHeader({
  sports,
  selectedSport,
  onSportSelect,
  isLoading = false,
}: SportsHeaderProps) {
  if (isLoading) {
    return (
      <div className="border-b bg-card">
        <div className="flex items-center gap-4 p-4">
          <div className="text-lg font-semibold text-muted-foreground">
            Loading sports...
          </div>
        </div>
      </div>
    );
  }

  if (sports.length === 0) {
    return (
      <div className="border-b bg-card">
        <div className="flex items-center gap-4 p-4">
          <div className="text-lg font-semibold text-muted-foreground">
            No sports scheduled today
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-card">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          NC State Sports Today
        </h1>
        <ScrollArea className="w-full">
          <div 
            className="flex gap-2 pb-2" 
            role="tablist" 
            aria-label="Sports selection"
          >
            {sports.map((sport) => (
              <Button
                key={sport.id}
                role="tab"
                aria-selected={selectedSport?.id === sport.id}
                aria-controls={`games-for-${sport.id}`}
                variant={selectedSport?.id === sport.id ? 'default' : 'outline'}
                onClick={() => onSportSelect(sport)}
                className={cn(
                  'whitespace-nowrap',
                  selectedSport?.id === sport.id &&
                    'bg-primary text-primary-foreground'
                )}
              >
                {sport.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}