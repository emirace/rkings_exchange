/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from 'react';
import api from '../services/api';

interface CandlesContextProps {
  children: ReactNode;
}

interface CandlesContextState {
  candlesData: any[];
  loading: boolean;
  error: string | null;
  fetchCandlesData: (
    symbol: string,
    interval: string,
    startTime?: number,
    endTime?: number
  ) => void;
}

const CandlesContext = createContext<CandlesContextState | undefined>(
  undefined
);

export const CandlesProvider: React.FC<CandlesContextProps> = ({
  children,
}) => {
  const [candlesData, setCandlesData] = useState<any[]>([]); // Adjust the type based on the actual data structure
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandlesData = async (
    symbol: string,
    interval: string,
    startTime?: number,
    endTime?: number
  ) => {
    try {
      setLoading(true);
      const response: any = await api.get('/trades/candles', {
        params: {
          symbol,
          interval,
          startTime,
          endTime,
        },
      });
      setCandlesData(response);
    } catch (error) {
      setError('Error fetching candles data');
    } finally {
      setLoading(false);
    }
  };

  const value: CandlesContextState = {
    candlesData,
    loading,
    error,
    fetchCandlesData,
  };

  return (
    <CandlesContext.Provider value={value}>{children}</CandlesContext.Provider>
  );
};

export const useCandles = () => {
  const context = useContext(CandlesContext);
  if (!context) {
    throw new Error('useCandles must be used within a CandlesProvider');
  }
  return context;
};
