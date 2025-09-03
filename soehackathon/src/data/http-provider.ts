import { DataProvider, Sport, Game } from '@/types';

export class HttpProvider implements DataProvider {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  }

  async getSportsForDate(date: string): Promise<Sport[]> {
    try {
      const response = await fetch(`${this.baseUrl}/sports?date=${date}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching sports from API:', error);
      throw new Error('Failed to load sports data from API');
    }
  }

  async getGamesForSportAndDate(sportId: string, date: string): Promise<Game[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/games?sport=${sportId}&date=${date}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching games from API:', error);
      throw new Error('Failed to load games data from API');
    }
  }

  async getGameById(gameId: string): Promise<Game> {
    try {
      const response = await fetch(`${this.baseUrl}/games/${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching game from API:', error);
      throw new Error('Failed to load game data from API');
    }
  }
}