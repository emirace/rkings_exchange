import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Wallet } from '../type/wallet';
import useAuth from './AuthContext';
import { transferFundsService } from '../services/wallet';

interface SwapContextType {
  swapAmount: string;
  setSwapAmount(amount: string): void;
  selectedWalletFrom: Wallet | null;
  setSelectedWalletFrom(from: Wallet): void;
  selectedWalletTo: Wallet | null;
  setSelectedWalletTo(to: Wallet): void;
  clearForm: () => void;
  loading: boolean;
  error: string;
  transferFunds: (
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ) => Promise<boolean>;
}

export const SwapContext = createContext<SwapContextType | undefined>(
  undefined
);

export const SwapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthErrorModalOpen } = useAuth();
  const [swapAmount, setSwapAmount] = useState<string>('');
  const [selectedWalletFrom, setSelectedWalletFrom] = useState<Wallet | null>(
    null
  );
  const [selectedWalletTo, setSelectedWalletTo] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setLoading(false);

    // Check if the error indicates an invalid or expired token
    if (error === 'Token expired' || error === 'Invalid token') {
      setError('');
      // Set the state to open the auth error modal
      setAuthErrorModalOpen(true);
    } else {
      setError(error || 'An error occurred.');
    }
  };

  const transferFunds = async (
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const response = await transferFundsService(
        fromCurrency,
        toCurrency,
        amount
      );

      if (response.status) {
        return true;
      }
      return false;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  function clearForm() {
    setSwapAmount('');
    setSelectedWalletFrom(null);
    setSelectedWalletTo(null);
  }

  return (
    <SwapContext.Provider
      value={{
        swapAmount,
        setSwapAmount,
        selectedWalletFrom,
        setSelectedWalletFrom,
        selectedWalletTo,
        setSelectedWalletTo,
        clearForm,
        loading,
        error,
        transferFunds,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
};
