/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressData, IAddress } from '../type/address';
import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export const getAllAddressesService = async (): Promise<IAddress[]> => {
  try {
    const response = await api.get('/addresses');
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw getBackendErrorMessage(error);
  }
};

export const createAddressService = async (
  addressData: AddressData
): Promise<IAddress> => {
  try {
    const response: any = await api.post('/addresses', addressData);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating address:', error);
    throw getBackendErrorMessage(error);
  }
};

export const getAddressByIdService = async (id: string): Promise<IAddress> => {
  try {
    const response = await api.get(`/addresses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address by ID:', error);
    throw getBackendErrorMessage(error);
  }
};
