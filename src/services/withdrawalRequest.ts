import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export const createWithdrawalRequestService = async (
  currency: string,
  amount: number,
  address?: string,
  network?: string
) => {
  try {
    const response = await api.post(`/withdrawal-request/create`, {
      currency,
      amount,
      address,
      network,
    });
    return response;
  } catch (error) {
    console.error(
      'Error creating withdrawal request:',
      getBackendErrorMessage(error)
    );
    throw getBackendErrorMessage(error);
  }
};

export const getWithdrawalRequestsService = async () => {
  try {
    const response = await api.get(`/withdrawal-request/list`);
    return response.data;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};

export const approveWithdrawalRequestService = async (
  requestId: string,
  adminComment: string
) => {
  try {
    const response = await api.post(`/withdrawal-request/approve`, {
      requestId,
      adminComment,
    });
    return response.data;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};

export const rejectWithdrawalRequestService = async (
  requestId: string,
  adminComment: string
) => {
  try {
    const response = await api.post(`/withdrawal-request/reject`, {
      requestId,
      adminComment,
    });
    return response.data;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};
