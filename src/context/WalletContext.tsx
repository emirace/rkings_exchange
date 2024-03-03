import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createSystemWalletService,
  deleteSystemWalletService,
  depositWalletService,
  fetchSystemWalletsService,
  fetchWalletsService,
  sendCryptoService,
  updateSystemWalletService,
} from '../services/wallet';
import { SystemWalletData, Wallet } from '../type/wallet';
import { getConversionRate } from '../utils/currency';
import useAuth from './AuthContext';
import * as SecureStore from 'expo-secure-store';

interface WalletContextData {
  wallets: Wallet[];
  systemWallets: Wallet[];
  baseCurrency: Wallet;
  totalBalance: number;
  loading: boolean;
  error: string;
  fetchWallets: () => void;
  fetchSystemWallets: () => void;
  depositWallet: (
    paymentProvider: string,
    transactionId: number,
    currency: string
  ) => Promise<boolean>;
  setBaseCurrency: (currency: Wallet) => void;
  sendCrypto: (
    address: string,
    currency: string,
    network: string,
    amount: number
  ) => Promise<boolean>;
  updateSystemWallet: (
    walletId: string,
    walletData: SystemWalletData
  ) => Promise<boolean>;
  deleteSystemWallet: (walletId: string) => Promise<boolean>;
  createSystemWallet: (walletData: SystemWalletData) => Promise<boolean>;
  isVisible: boolean;
  updateIsVisible: (value: boolean) => void;
}

export const WalletContext = createContext<WalletContextData | undefined>(
  undefined
);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, setAuthErrorModalOpen } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [systemWallets, setSystemWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const getBaseCurrencyFromLocalStorage = async (): Promise<Wallet | null> => {
    const storedBaseCurrency = await SecureStore.getItemAsync('baseCurrency');
    return storedBaseCurrency ? JSON.parse(storedBaseCurrency) : null;
  };
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const [baseCurrency, setBaseCurrency] = useState<Wallet>({
    _id: '',
    name: 'Naira',
    type: 'Fiat',
    currency: 'NGN',
    balance: 0,
    convertedBalance: 0,
    image: '',
    network: [],
    address: '',
  });

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

  const updateIsVisible = async (value: boolean) => {
    setIsVisible(value);
    if (value) {
      await SecureStore.setItemAsync('isVisible', JSON.stringify(value));
    } else {
      await SecureStore.deleteItemAsync('isVisible');
    }
  };

  // Implement currency conversion function
  const convertCurrency = async (
    amount: number,
    from: string,
    to: string
  ): Promise<number> => {
    try {
      const exchangeRate = await getConversionRate(from, to);
      return amount * exchangeRate || 0;
    } catch (error) {
      handleError(error);
      return 0;
    }
  };

  const updateWallets = async (wallets: Wallet[]) => {
    setLoading(true);
    const updatedWallets = await Promise.all(
      wallets.map(async (wallet) => {
        wallet.convertedBalance = await convertCurrency(
          wallet.balance,
          wallet.currency,
          baseCurrency?.currency
        );
        return wallet;
      })
    );
    setLoading(false);
    setWallets(updatedWallets);
  };

  // Calculate the total balance in the selected currency
  const totalBalance = wallets.reduce(
    (total, wallet) => total + wallet.convertedBalance,
    0
  );

  const fetchWallets = async () => {
    try {
      if (!user) return false;
      setLoading(true);
      const walletData = await fetchWalletsService();
      setWallets(walletData);
      setLoading(false);
      await updateWallets(walletData);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const fetchSystemWallets = async () => {
    try {
      setError('');
      setLoading(true);
      const walletData = await fetchSystemWalletsService();
      setSystemWallets(walletData);
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      setLoading(false);
      return false;
    }
  };

  const createSystemWallet = async (walletData: SystemWalletData) => {
    try {
      setLoading(true);
      const result = await createSystemWalletService(walletData);
      setSystemWallets((prevWallets) => {
        const updatedWallets = [result, ...prevWallets];
        return updatedWallets;
      });
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return false;
    }
  };

  const updateSystemWallet = async (
    walletId: string,
    walletData: SystemWalletData
  ) => {
    try {
      setLoading(true);
      const result = await updateSystemWalletService(walletId, walletData);
      setSystemWallets((prevWallets) => {
        const updatedWallets = prevWallets.map((w) => {
          if (w._id === walletId) {
            return result;
          } else {
            return w;
          }
        });
        return updatedWallets;
      });
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const deleteSystemWallet = async (walletId: string) => {
    try {
      setLoading(true);
      const result = await deleteSystemWalletService(walletId);
      setSystemWallets((prevWallets) =>
        prevWallets.filter((wallet) => wallet._id !== result._id)
      );
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return false;
    }
  };

  const depositWallet = async (
    paymentProvider: string,
    transactionId: number,
    currency: string
  ): Promise<boolean> => {
    try {
      const result = await depositWalletService(
        paymentProvider,
        transactionId,
        currency
      );
      console.log(result);
      if (result.status) {
        fetchWallets();
      }
      return result.status;
    } catch (error) {
      return false;
    }
  };

  const sendCrypto = async (
    address: string,
    currency: string,
    network: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const response = await sendCryptoService(
        address,
        currency,
        network,
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

  useEffect(() => {
    const updateWalletOnChange = async () => {
      updateWallets(wallets);
      await SecureStore.setItemAsync(
        'baseCurrency',
        JSON.stringify(baseCurrency)
      );
    };
    updateWalletOnChange();
  }, [baseCurrency]);

  useEffect(() => {
    if (user) {
      fetchWallets();
    }
  }, [user]);

  useEffect(() => {
    const getbase = async () => {
      fetchSystemWallets();
      const result = await getBaseCurrencyFromLocalStorage();
      if (result) {
        setBaseCurrency(result);
      }
      const isVisibleResult = await SecureStore.getItemAsync('isVisible');
      if (isVisibleResult) {
        setIsVisible(true);
      }
    };
    getbase();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallets,
        loading,
        isVisible,
        error,
        baseCurrency,
        totalBalance,
        systemWallets,
        updateIsVisible,
        createSystemWallet,
        updateSystemWallet,
        deleteSystemWallet,
        setBaseCurrency,
        fetchWallets,
        fetchSystemWallets,
        depositWallet,
        sendCrypto,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
