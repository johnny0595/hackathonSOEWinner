import { useQuery } from '@tanstack/react-query';
import { dataProvider } from '@/data/data-provider';
import { getTodayString } from '@/lib/date-utils';

export function useSports(date?: string) {
  const queryDate = date || getTodayString();
  
  return useQuery({
    queryKey: ['sports', queryDate],
    queryFn: () => dataProvider.getSportsForDate(queryDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}