import { useState, useEffect, useCallback } from 'react';
import { UserPredictions, Prediction } from '@/types';
import { PredictionsStorage } from '@/services/predictions-storage';

export function usePredictions() {
  const [predictions, setPredictions] = useState<UserPredictions>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load predictions from storage on mount
  useEffect(() => {
    try {
      const stored = PredictionsStorage.getPredictions();
      setPredictions(stored);
    } catch (error) {
      console.error('Error loading predictions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePrediction = useCallback((gameId: string, predictedWinnerId: string) => {
    try {
      PredictionsStorage.savePrediction(gameId, predictedWinnerId);
      const updatedPredictions = PredictionsStorage.getPredictions();
      setPredictions(updatedPredictions);
    } catch (error) {
      console.error('Error saving prediction:', error);
      throw error;
    }
  }, []);

  const removePrediction = useCallback((gameId: string) => {
    try {
      PredictionsStorage.removePrediction(gameId);
      const updatedPredictions = PredictionsStorage.getPredictions();
      setPredictions(updatedPredictions);
    } catch (error) {
      console.error('Error removing prediction:', error);
      throw error;
    }
  }, []);

  const clearAllPredictions = useCallback(() => {
    try {
      PredictionsStorage.clearAllPredictions();
      setPredictions({});
    } catch (error) {
      console.error('Error clearing predictions:', error);
      throw error;
    }
  }, []);

  const getPredictionForGame = useCallback((gameId: string): Prediction | null => {
    return predictions[gameId] || null;
  }, [predictions]);

  const predictionCount = Object.keys(predictions).length;

  return {
    predictions,
    predictionCount,
    isLoading,
    savePrediction,
    removePrediction,
    clearAllPredictions,
    getPredictionForGame,
  };
}