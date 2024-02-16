// AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import {
  createUserChangePasswordService,
  forgetPasswordService,
  getAllUserService,
  getUserByIdService,
  getUserService,
  loginUser,
  logoutUser,
  sendVerifyEmailService,
  updateUserByIdService,
  updateUserService,
  verifyEmailService,
} from '../services/auth';
import { UpdateFields, User } from '../type/user';
import * as SecureStore from 'expo-secure-store';

interface Props {
  children?: ReactNode;
}

const AuthContext = createContext<{
  user: User | null;
  error: string | null;
  loading: boolean;
  authErrorModalOpen: boolean;
  setAuthErrorModalOpen: (value: boolean) => void;
  sendVerifyEmail: (credentials: { email: string }) => Promise<boolean>;
  verifyEmail: (credentials: { token: string }) => Promise<boolean>;
  createUserChangePassword: (tokenData: {
    password: string;
    token: string;
  }) => Promise<boolean>;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  sendForgetPasswordEmail: (credentials: { email: string }) => Promise<boolean>;
  getUser: () => Promise<User | null>;
  getAllUser: () => Promise<User[] | null>;
  getUserById: (id: string) => Promise<User | null>;
  updateUser: (userData: UpdateFields) => Promise<User | null>;
  updateUserById: (id: string, userData: UpdateFields) => Promise<User | null>;
  logout: () => void;
} | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authErrorModalOpen, setAuthErrorModalOpen] = useState(false);

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

  const sendVerifyEmail = async (userData: { email: string }) => {
    try {
      setError('');
      setLoading(true);
      const response = await sendVerifyEmailService(userData);
      setLoading(false);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const verifyEmail = async (tokenData: { token: string }) => {
    try {
      setError('');
      const response = await verifyEmailService(tokenData);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const createUserChangePassword = async (tokenData: {
    password: string;
    token: string;
  }) => {
    try {
      setError('');
      const response = await createUserChangePasswordService(tokenData);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError('');
      // setLoading(true);
      const authenticatedToken = await loginUser(credentials);
      if (authenticatedToken) {
        setAuthToken(authenticatedToken);
        setAuthErrorModalOpen(false);
        return true;
      }
      // setLoading(false);
      return false;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const sendForgetPasswordEmail = async (userData: { email: string }) => {
    try {
      setError('');
      const response = await forgetPasswordService(userData);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const getUser = async () => {
    try {
      setError('');
      setLoading(true);
      const authenticatedUser = await getUserService();
      if (authenticatedUser) {
        setUser(authenticatedUser);
        return authenticatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllUser = async () => {
    try {
      setError('');
      setLoading(true);
      const allUser = await getAllUserService();
      if (allUser) {
        return allUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id: string) => {
    try {
      setError('');
      setLoading(true);
      const user = await getUserByIdService(id);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: UpdateFields) => {
    try {
      setError('');
      const updatedUser = await updateUserService(userData);
      if (updatedUser) {
        setUser(updatedUser);
        return updatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const updateUserById = async (id: string, userData: UpdateFields) => {
    try {
      setError('');
      const updatedUser: User | null = await updateUserByIdService(
        id,
        userData
      );
      if (updatedUser) {
        return updatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const logout = async () => {
    // await logoutUser();
    setUser(null);
    await SecureStore.deleteItemAsync('authToken');
    console.log('logout');
  };

  useEffect(() => {
    const checkUser = async () => {
      const token = await SecureStore.getItemAsync('authToken');
      const savedToken = authToken || token;
      if (savedToken) {
        await getUser();
      }
      setLoading(false);
    };
    checkUser();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        authErrorModalOpen,
        setAuthErrorModalOpen,
        sendVerifyEmail,
        verifyEmail,
        createUserChangePassword,
        login,
        sendForgetPasswordEmail,
        getUser,
        getAllUser,
        getUserById,
        updateUser,
        updateUserById,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
