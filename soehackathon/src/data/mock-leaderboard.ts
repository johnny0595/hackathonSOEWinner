import { LeaderboardData } from '@/types';

export const mockLeaderboardData: LeaderboardData = {
  entries: [
    {
      id: 'user-1',
      name: 'Alex Rodriguez',
      correctPredictions: 15,
      totalPredictions: 18,
      accuracy: 0.833,
      avatar: '🏆',
      isCurrentUser: false,
    },
    {
      id: 'current-user',
      name: 'You',
      correctPredictions: 12,
      totalPredictions: 16,
      accuracy: 0.75,
      avatar: '👤',
      isCurrentUser: true,
    },
    {
      id: 'user-3',
      name: 'Sarah Wilson',
      correctPredictions: 11,
      totalPredictions: 15,
      accuracy: 0.733,
      avatar: '🎯',
      isCurrentUser: false,
    },
    {
      id: 'user-4',
      name: 'Mike Johnson',
      correctPredictions: 13,
      totalPredictions: 19,
      accuracy: 0.684,
      avatar: '🏀',
      isCurrentUser: false,
    },
    {
      id: 'user-5',
      name: 'Emily Chen',
      correctPredictions: 9,
      totalPredictions: 14,
      accuracy: 0.643,
      avatar: '⚽',
      isCurrentUser: false,
    },
    {
      id: 'user-6',
      name: 'David Brown',
      correctPredictions: 8,
      totalPredictions: 13,
      accuracy: 0.615,
      avatar: '🏈',
      isCurrentUser: false,
    },
    {
      id: 'user-7',
      name: 'Jessica Davis',
      correctPredictions: 7,
      totalPredictions: 12,
      accuracy: 0.583,
      avatar: '🏐',
      isCurrentUser: false,
    },
    {
      id: 'user-8',
      name: 'Chris Martinez',
      correctPredictions: 6,
      totalPredictions: 11,
      accuracy: 0.545,
      avatar: '🎾',
      isCurrentUser: false,
    },
  ],
  champion: {
    id: 'user-1',
    name: 'Alex Rodriguez',
    correctPredictions: 15,
    totalPredictions: 18,
    accuracy: 0.833,
    avatar: '🏆',
    isCurrentUser: false,
  },
  lastUpdated: new Date().toISOString(),
};

// Sort entries by accuracy (highest first), then by total correct predictions
mockLeaderboardData.entries.sort((a, b) => {
  if (b.accuracy !== a.accuracy) {
    return b.accuracy - a.accuracy;
  }
  return b.correctPredictions - a.correctPredictions;
});