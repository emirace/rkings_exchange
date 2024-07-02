import React, { createContext, useContext, useState } from 'react';
import {
  createAddressService,
  getAddressByIdService,
  getAllAddressesService,
} from '../services/address';
import { AddressData, IAddress } from '../type/address';
import useAuth from './AuthContext';

interface Props {
  children?: React.ReactNode;
}

interface AddressContextType {
  addresses: IAddress[];
  error: string;
  loading: boolean;
  getAllAddresses: () => void;
  createAddress: (addressData: AddressData) => Promise<IAddress | null>;
  getAddressById: (id: string) => Promise<IAddress | null>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<Props> = ({ children }) => {
  const { setAuthErrorModalOpen } = useAuth();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  const getAllAddresses = async () => {
    try {
      setLoading(true);
      setError('');
      const addressesData = await getAllAddressesService();
      setAddresses(addressesData);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const createAddress = async (
    addressData: AddressData
  ): Promise<IAddress | null> => {
    try {
      setError('');
      setLoading(true);
      const newAddress = await createAddressService(addressData);
      setAddresses([...addresses, newAddress]);
      setLoading(false);
      return newAddress;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getAddressById = async (id: string) => {
    try {
      setLoading(true);
      setError('');
      const address = await getAddressByIdService(id);
      setLoading(false);
      return address;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        error,
        loading,
        getAllAddresses,
        createAddress,
        getAddressById,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddressContext must be used within an AddressProvider');
  }
  return context;
};
