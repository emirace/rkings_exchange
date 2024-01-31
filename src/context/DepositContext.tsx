import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Wallet } from '../type/wallet';

interface DepositContextType {
  walletType: string;
  depositAmount: number;
  wallet: Wallet | null;
  network: string;
  paymentMethod: string;
  step: number;
  openDeposit: boolean;
  updateStep: (step: number) => void;
  updateDepositAmount: (amount: number) => void;
  updateWalletType: (type: string) => void;
  updateWallet: (type: Wallet) => void;
  updateNetwork: (type: string) => void;
  updatePayment: (type: string) => void;
  setOpenDeposit: (value: boolean) => void;
  clearForm: () => void;
}

const DepositContext = createContext<DepositContextType | undefined>(undefined);

export const DepositProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [walletType, setWalletType] = useState('');
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [network, setNetwork] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [openDeposit, setOpenDeposit] = useState(false);

  const updateDepositAmount = (amount: number) => {
    setDepositAmount(amount);
  };
  const updateWalletType = (type: string) => {
    setWalletType(type);
  };
  const updateWallet = (type: Wallet) => {
    setWallet(type);
  };
  const updateNetwork = (type: string) => {
    setNetwork(type);
  };
  const updatePayment = (type: string) => {
    setPaymentMethod(type);
  };
  const updateStep = (value: number) => {
    setStep(value);
  };

  const clearForm = () => {
    setDepositAmount(0);
    setStep(1);
    setWalletType('');
    setWallet(null);
    setNetwork('');
    setPaymentMethod('');
  };

  return (
    <DepositContext.Provider
      value={{
        depositAmount,
        network,
        paymentMethod,
        wallet,
        step,
        updateStep,
        clearForm,
        updatePayment,
        updateWallet,
        updateWalletType,
        walletType,
        updateNetwork,
        updateDepositAmount,
        openDeposit,
        setOpenDeposit,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};

export const useDeposit = () => {
  const context = useContext(DepositContext);
  if (context === undefined) {
    throw new Error('useDeposit must be used within a DepositProvider');
  }
  return context;
};
