import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  approveWithdrawalRequestService,
  createWithdrawalRequestService,
  getWithdrawalRequestsService,
  rejectWithdrawalRequestService,
} from '../services/withdrawalRequest';
import { Wallet } from '../type/wallet';
import useAuth from './AuthContext';

export interface IWithdrawalRequest {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected';
  adminComment?: string;
  meta?: object;
}
interface WithdrawContextType {
  withdrawAmount: number;
  walletType: string;
  wallet: Wallet | null;
  network: string;
  walletAddress: string;
  step: number;
  updateStep: (value: number) => void;
  updateWalletAddress: (value: string) => void;
  updateNetwork: (value: string) => void;
  updateWallet: (value: Wallet) => void;
  updateWalletType: (value: string) => void;
  updateWithdrawAmount: (amount: number) => void;
  clearForm: () => void;
  openWithdrawal: boolean;
  closeWithdrawalModal: () => void;
  openWithdrawalModal: () => void;
  processWithdraw: () => void;
  loading: boolean;
  error: string;
  createWithdrawalRequest: (
    currency: string,
    amount: number,
    address?: string,
    network?: string
  ) => Promise<boolean>;
  getWithdrawalRequests: () => void;
  // getWithdrawalRequests: () => Promise<IWithdrawalRequest[]>;
  approveWithdrawalRequest: (
    requestId: string,
    adminComment: string
  ) => Promise<void>;
  rejectWithdrawalRequest: (
    requestId: string,
    adminComment: string
  ) => Promise<void>;
  withdrawalRequests: IWithdrawalRequest[];
}

export const WithdrawContext = createContext<WithdrawContextType | undefined>(
  undefined
);

export const WithdrawProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setAuthErrorModalOpen } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [network, setNetwork] = useState<string>('');
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletType, setWalletType] = useState<string>('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
  const [withdrawalRequests, setWithdrawalRequests] = useState<
    IWithdrawalRequest[]
  >([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setLoading(false);
    console.log(error);
    // Check if the error indicates an invalid or expired token
    if (error === 'Token expired' || error === 'Invalid token') {
      setError('');
      // Set the state to open the auth error modal
      setAuthErrorModalOpen(true);
    } else {
      setError(error || 'An error occurred.');
    }
  };

  const updateWithdrawAmount = (amount: number) => {
    setWithdrawAmount(amount);
  };
  const updateNetwork = (value: string) => {
    setNetwork(value);
  };
  const updateWalletAddress = (value: string) => {
    setWalletAddress(value);
  };
  const updateWallet = (value: Wallet) => {
    setWallet(value);
  };
  const updateWalletType = (value: string) => {
    setWalletType(value);
  };
  const updateStep = (value: number) => {
    setStep(value);
  };

  const openWithdrawalModal = () => {
    setOpenWithdrawal(true);
  };

  const closeWithdrawalModal = () => {
    setOpenWithdrawal(false);
    clearForm();
  };

  const createWithdrawalRequest = async (
    currency: string,
    amount: number,
    address?: string,
    network?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      // Use the service function to make the API call
      const response = await createWithdrawalRequestService(
        currency,
        amount,
        address,
        network
      );

      // Handle the response or throw an error if the request was unsuccessful
      if (response.status) {
        setLoading(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      handleError(error);
      return false;
      // Handle errors, such as network issues or server errors
    }
  };

  const getWithdrawalRequests = async () => {
    try {
      // Use the service function to make the API call
      const response = await getWithdrawalRequestsService();

      // Handle the response or throw an error if the request was unsuccessful
      if (response.status) {
        // If successful, update the state and return the withdrawal requests
        setWithdrawalRequests(response.withdrawalRequests);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const approveWithdrawalRequest = async (
    requestId: string,
    adminComment: string
  ): Promise<void> => {
    try {
      // Use the service function to make the API call
      const response = await approveWithdrawalRequestService(
        requestId,
        adminComment
      );

      // Handle the response or throw an error if the request was unsuccessful
      if (response.status) {
        // If successful, update the state or perform any other actions
        console.log('Withdrawal request approved:', response.withdrawalRequest);
        // Optionally, you can update the local state or perform other actions
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const rejectWithdrawalRequest = async (
    requestId: string,
    adminComment: string
  ): Promise<void> => {
    try {
      // Use the service function to make the API call
      const response = await rejectWithdrawalRequestService(
        requestId,
        adminComment
      );

      // Handle the response or throw an error if the request was unsuccessful
      if (response.status) {
        // If successful, update the state or perform any other actions
        console.log('Withdrawal request rejected:', response.withdrawalRequest);
        // Optionally, you can update the local state or perform other actions
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const clearForm = () => {
    setWithdrawAmount(0);
    setNetwork('');
    setWalletAddress('');
    setWallet(null);
    setWalletType('');
    setStep(1);
  };

  const processWithdraw = () => {
    // Here, you can implement the logic for processing the deposit
    // For example, make an API call to deposit funds
  };

  return (
    <WithdrawContext.Provider
      value={{
        withdrawAmount,
        updateWithdrawAmount,
        network,
        updateNetwork,
        wallet,
        updateWallet,
        walletAddress,
        updateWalletAddress,
        walletType,
        updateWalletType,
        step,
        updateStep,
        openWithdrawal,
        openWithdrawalModal,
        closeWithdrawalModal,
        clearForm,
        processWithdraw,
        loading,
        error,
        createWithdrawalRequest,
        getWithdrawalRequests,
        approveWithdrawalRequest,
        rejectWithdrawalRequest,
        withdrawalRequests,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
};

export const useWithdraw = () => {
  const context = useContext(WithdrawContext);
  if (context === undefined) {
    throw new Error('useWithdraw must be used within a DepositProvider');
  }
  return context;
};
