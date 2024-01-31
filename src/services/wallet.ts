/* eslint-disable @typescript-eslint/no-explicit-any */

import { SystemWalletData } from '../type/wallet';
import { getBackendErrorMessage } from '../utils/error';
import api from './api';

// Function to fetch wallet data from the backend
export async function fetchWalletsService() {
  try {
    const response: any = await api.get('/wallets');
    return response.wallets;
  } catch (error) {
    console.log('Error fetching wallets', getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
}

export async function fetchSystemWalletsService() {
  try {
    const response: any = await api.get('/wallets/system');
    return response.wallets;
  } catch (error) {
    console.log('Error fetching wallets', getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
}

export const createSystemWalletService = async (
  walletData: SystemWalletData
) => {
  try {
    const response: any = await api.post(`/wallets/system`, walletData);
    const wallet = response.wallet;
    return wallet;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(`Error creating wallet `, errorMessage);
    throw errorMessage;
  }
};

export const updateSystemWalletService = async (
  walletId: string,
  walletData: SystemWalletData
) => {
  try {
    const response: any = await api.put(`/wallets/${walletId}`, walletData);
    const wallet = response.wallet;
    return wallet;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(`Error updating wallet `, errorMessage);
    throw errorMessage;
  }
};

export const deleteSystemWalletService = async (walletId: string) => {
  try {
    const response: any = await api.delete(`/wallets/${walletId}`);
    const wallet = response.deletedWallet;
    return wallet;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    console.error(`Error updating wallet `, errorMessage);
    throw errorMessage;
  }
};

export const depositWalletService = async (
  paymentProvider: string,
  transactionId: number,
  currency: string
) => {
  try {
    const response: { status: boolean } = await api.post('/wallets/deposit', {
      paymentProvider,
      transactionId,
      currency,
    });

    return response;
  } catch (error) {
    console.error('Error depositing to wallet:', getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const transferFundsService = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  try {
    const response = await api.post(`/wallets/transfer`, {
      fromCurrency,
      toCurrency,
      amount,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log('Error transferring funds:', getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const sendCryptoService = async (
  address: string,
  currency: string,
  network: string,
  amount: number
) => {
  try {
    const response = await api.post(`/wallets/send-crypto`, {
      address,
      currency,
      network,
      amount,
    });
    return response;
  } catch (error) {
    console.log('Error transferring funds:', getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};
