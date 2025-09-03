import { useQuery } from '@tanstack/react-query';
import { dataProvider } from '@/data/data-provider';
import { getTodayString } from '@/lib/date-utils';

export function useGames(sportId: string | null, date?: string) {
  const queryDate = date || getTodayString();
  
  return useQuery({
    queryKey: ['games', sportId, queryDate],
    queryFn: () => {
      if (!sportId) {
        return [];
      }
      return dataProvider.getGamesForSportAndDate(sportId, queryDate);
    },
    enabled: !!sportId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export function useGame(gameId: string | null) {
  return useQuery({
    queryKey: ['game', gameId],
    queryFn: () => {
      if (!gameId) {
        throw new Error('Game ID is required');
      }
      return dataProvider.getGameById(gameId);
    },
    enabled: !!gameId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}