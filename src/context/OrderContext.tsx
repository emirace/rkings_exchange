/* eslint-disable @typescript-eslint/no-explicit-any */
// OrderContext.tsx
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  createOrderService,
  createOrderWalletService,
  fetchAllOrdersService,
  fetchOrderByIdService,
  getUserOrdersService,
} from '../services/order';
import { IOrderData, Order } from '../type/order';
import useAuth from './AuthContext';

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

interface OrderContextProps {
  orders: Order[];
  loading: boolean;
  error: string;
  shippingInfo: ShippingInfo;
  updateShippingInfo: (key: string, value: string) => void;
  fetchAllOrders: () => Promise<Order[] | undefined>;
  fetchOrderById: (id: string) => Promise<Order>;
  createOrder: (
    orderData: IOrderData
  ) => Promise<{ status: boolean; order: Order | null }>;

  createOrderWallet: (
    orderData: IOrderData
  ) => Promise<{ status: boolean; order: Order | null }>;
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { user, setAuthErrorModalOpen } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

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

  const updateShippingInfo = (key: string, value: string) => {
    setShippingInfo({ ...shippingInfo, [key]: value });
  };

  const getUserOrders = async () => {
    try {
      setError('');
      setLoading(true);
      const data: any = await getUserOrdersService();
      setOrders(data);
    } catch (error) {
      handleError(error);
    }
  };

  const createOrder = async (
    orderData: IOrderData
  ): Promise<{ status: boolean; order: Order | null }> => {
    try {
      setError('');
      setLoading(true);

      const result: any = await createOrderService(orderData);
      console.log(result);
      getUserOrders();
      return result;
    } catch (error) {
      handleError(error);
      return { status: false, order: null };
    }
  };

  const createOrderWallet = async (
    orderData: IOrderData
  ): Promise<{ status: boolean; order: Order | null }> => {
    try {
      setError('');
      setLoading(true);

      const result: any = await createOrderWalletService(orderData);
      console.log(result);
      getUserOrders();
      return result;
    } catch (error) {
      handleError(error);
      return { status: false, order: null };
    }
  };

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOrdersService();
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const fetchOrderById = async (id: string) => {
    try {
      setLoading(true);

      const data = await fetchOrderByIdService(id);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserOrders();
    }
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        shippingInfo,
        updateShippingInfo,
        fetchAllOrders,
        createOrder,
        createOrderWallet,
        fetchOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within a OrderProvider');
  }
  return context;
};
