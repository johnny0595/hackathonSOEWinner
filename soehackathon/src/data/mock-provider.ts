import { DataProvider, Sport, Game } from '@/types';

export class MockProvider implements DataProvider {
  async getSportsForDate(date: string): Promise<Sport[]> {
    try {
      const response = await fetch('/mock/sports.json');
      if (!response.ok) {
        throw new Error('Failed to fetch sports data');
      }
      const allSports: Sport[] = await response.json();
      
      // Check which sports have games for this date
      const gamesResponse = await fetch(`/mock/games-${date}.json`);
      if (!gamesResponse.ok) {
        return []; // No games for this date
      }
      
      const games: Game[] = await gamesResponse.json();
      const sportsWithGames = new Set(games.map(game => game.sportId));
      
      return allSports.filter(sport => sportsWithGames.has(sport.id));
    } catch (error) {
      console.error('Error fetching sports:', error);
      throw new Error('Failed to load sports data');
    }
  }

  async getGamesForSportAndDate(sportId: string, date: string): Promise<Game[]> {
    try {
      const response = await fetch(`/mock/games-${date}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch games data');
      }
      
      const allGames: Game[] = await response.json();
      return allGames.filter(game => game.sportId === sportId);
    } catch (error) {
      console.error('Error fetching games:', error);
      throw new Error('Failed to load games data');
    }
  }

  async getGameById(gameId: string): Promise<Game> {
    try {
      // For now, we'll search through today's games
      // In a real app, we'd have a more specific endpoint
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/mock/games-${today}.json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch game data');
      }
      
      const games: Game[] = await response.json();
      const game = games.find(g => g.id === gameId);
      
      if (!game) {
        throw new Error(`Game with ID ${gameId} not found`);
      }
      
      return game;
    } catch (error) {
      console.error('Error fetching game:', error);
      throw new Error('Failed to load game data');
    }
  }
}