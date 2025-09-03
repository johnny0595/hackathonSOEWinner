import { DataProvider } from '@/types';
import { MockProvider } from './mock-provider';
import { HttpProvider } from './http-provider';

// Factory function to get the appropriate data provider
export function getDataProvider(): DataProvider {
  const useApi = process.env.NEXT_PUBLIC_USE_API === 'true';
  
  if (useApi) {
    return new HttpProvider();
  }
  
  return new MockProvider();
}

// Export a singleton instance
export const dataProvider = getDataProvider();