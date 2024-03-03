import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  fetchAdminTransactionsService,
  fetchTransactionsByCurrencyService,
  fetchTransactionsByTypeService,
  fetchUserTransactionsService,
} from '../services/transaction';
import { ITransaction } from '../type/transaction';
import useAuth from './AuthContext';

// Define the context type
interface TransactionContextType {
  transactions: ITransaction[];
  loading: boolean;
  error: string;
  fetchAdminTransactions: () => Promise<void>;
  fetchUserTransactions: () => Promise<void>;
  fetchTransactionsByCurrency: (currency: string) => Promise<void>;
  fetchTransactionsByType: (type: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthErrorModalOpen } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

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

  const fetchAdminTransactions = async () => {
    try {
      setLoading(true);
      const adminTransactions = await fetchAdminTransactionsService();
      setTransactions(adminTransactions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error as string);
    }
  };

  const fetchUserTransactions = async () => {
    try {
      setLoading(true);
      const userTransactions = await fetchUserTransactionsService();
      setTransactions(userTransactions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error as string);
    }
  };

  const fetchTransactionsByCurrency = async (currency: string) => {
    try {
      setLoading(true);
      const transactionsByCurrency = await fetchTransactionsByCurrencyService(
        currency
      );
      setTransactions(transactionsByCurrency);
      setLoading(false);
    } catch (error) {
      handleError(error as string);
      setLoading(false);
    }
  };

  const fetchTransactionsByType = async (type: string) => {
    try {
      setLoading(true);
      const transactionsByType = await fetchTransactionsByTypeService(type);
      setTransactions(transactionsByType);
      setLoading(false);
    } catch (error) {
      handleError(error as string);
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        fetchAdminTransactions,
        fetchUserTransactions,
        fetchTransactionsByCurrency,
        fetchTransactionsByType,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};
