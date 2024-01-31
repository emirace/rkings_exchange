import { IOrderData } from '../type/order';
import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export const getUserOrdersService = async () => {
  try {
    const response = await api.get('/orders/user');
    return response;
  } catch (error) {
    console.log(error);
    throw getBackendErrorMessage(error);
  }
};

export const createOrderService = async (orderData: IOrderData) => {
  try {
    const response = await api.post('/orders/create', orderData);
    return response;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};

export const createOrderWalletService = async (orderData: IOrderData) => {
  try {
    const response = await api.post('/orders/create-wallet', orderData);
    return response;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};

export const fetchAllOrdersService = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};

export const fetchOrderByIdService = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw getBackendErrorMessage(error);
  }
};
