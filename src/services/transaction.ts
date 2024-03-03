import { ITransaction } from '../type/transaction';
import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export async function fetchAdminTransactionsService(): Promise<ITransaction[]> {
  try {
    const response: any = await api.get('/transactions');
    if (response.status) {
      return response.transactions;
    }
    throw new Error('Failed to fetch admin transactions');
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
}

export async function fetchUserTransactionsService(): Promise<ITransaction[]> {
  try {
    const response: any = await api.get('/transactions/user');
    if (response.status) {
      return response.transactions;
    }
    throw new Error('Failed to fetch admin transactions');
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
}

export async function fetchTransactionsByCurrencyService(
  currency: string
): Promise<ITransaction[]> {
  try {
    const response: any = await api.get(
      `/transactions/user/currency/${currency}`
    );
    if (response.status) {
      return response.transactions;
    }
    throw new Error('Failed to fetch admin transactions');
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
}

export async function fetchTransactionsByTypeService(
  type: string
): Promise<ITransaction[]> {
  try {
    const response: any = await api.get(`/transactions/user/type/${type}`);
    if (response.status) {
      return response.transactions;
    }
    throw new Error('Failed to fetch admin transactions');
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
}
