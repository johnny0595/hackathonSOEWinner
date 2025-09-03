import { UserPredictions, Prediction } from '@/types';
import { mockPredictions } from '@/data/mock-predictions';

const STORAGE_KEY = 'ncstate-sports-predictions';

export class PredictionsStorage {
  static getPredictions(): UserPredictions {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Load mock predictions if no data exists
        this.loadMockPredictions();
        return mockPredictions;
      }
    } catch (error) {
      console.error('Error reading predictions from storage:', error);
      return {};
    }
  }

  static loadMockPredictions(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPredictions));
    } catch (error) {
      console.error('Error loading mock predictions:', error);
    }
  }

  static savePrediction(gameId: string, predictedWinnerId: string): void {
    try {
      const predictions = this.getPredictions();
      const prediction: Prediction = {
        gameId,
        predictedWinnerId,
        timestamp: new Date().toISOString(),
      };
      
      predictions[gameId] = prediction;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
    } catch (error) {
      console.error('Error saving prediction to storage:', error);
      throw new Error('Failed to save prediction');
    }
  }

  static removePrediction(gameId: string): void {
    try {
      const predictions = this.getPredictions();
      delete predictions[gameId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
    } catch (error) {
      console.error('Error removing prediction from storage:', error);
      throw new Error('Failed to remove prediction');
    }
  }

  static clearAllPredictions(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing predictions from storage:', error);
      throw new Error('Failed to clear predictions');
    }
  }

  static getPredictionCount(): number {
    const predictions = this.getPredictions();
    return Object.keys(predictions).length;
  }

  static getPredictionForGame(gameId: string): Prediction | null {
    const predictions = this.getPredictions();
    return predictions[gameId] || null;
  }
}