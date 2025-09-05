export interface Sport {
  id: string;
  name: string;
  icon?: string;
}

export interface Team {
  id: string;
  name: string;
  abbreviation?: string;
  logo?: string;
  winPercentage: number;
  wins?: number;
  losses?: number;
}

export interface Game {
  id: string;
  sportId: string;
  division: string;
  teams: [Team, Team];
  scheduledTime: string;
  venue?: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface Prediction {
  gameId: string;
  predictedWinnerId: string;
  confidence?: number;
  timestamp: string;
}

export interface UserPredictions {
  [gameId: string]: Prediction;
}

export interface DataProvider {
  getSportsForDate(date: string): Promise<Sport[]>;
  getGamesForSportAndDate(sportId: string, date: string): Promise<Game[]>;
  getGameById(gameId: string): Promise<Game>;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

export interface LeaderboardData {
  entries: LeaderboardEntry[];
  champion?: LeaderboardEntry;
  lastUpdated: string;
}