import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IVerification } from '../type/user';
import useAuth from './AuthContext';
import {
  fetchVerificationsByIdService,
  fetchVerificationsService,
  submitVerificationServices,
  updateVerificationStatusServices,
} from '../services/verification';

interface UVerification {
  status: string;
  id: string;
  message?: string;
}
interface VerificationContextData {
  loading: boolean;
  error: string;
  verifications: IVerification[];
  fetchVerifications: () => Promise<void>;
  fetchVerificationsById: (id: string) => Promise<IVerification[]>;
  submitVerification: (verification: IVerification) => Promise<boolean>;
  updateVerificationStatus: (
    verification: UVerification
  ) => Promise<IVerification | null>;
  calculateCompletionPercentage: () => number;
  isAllVerificationsComplete: () => boolean;
}
export const VerificationContext = createContext<
  VerificationContextData | undefined
>(undefined);

interface VerificationProviderProps {
  children: ReactNode;
}

export function VerificationProvider({ children }: VerificationProviderProps) {
  const { user, setAuthErrorModalOpen } = useAuth();
  const [verifications, setVerifications] = useState<IVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const fetchVerifications = async () => {
    try {
      setError('');
      setLoading(true);
      // Make an API request to fetch verifications
      const response = await fetchVerificationsService(); // Replace with your actual API service function

      // Assuming the API response is an array of verifications
      const verificationData: IVerification[] = response;

      // Update the verifications in the context
      setVerifications(verificationData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching verifications:', error);
      handleError(error);
    }
  };

  const fetchVerificationsById = async (id: string) => {
    try {
      setError('');
      // Make an API request to fetch verifications
      const response = await fetchVerificationsByIdService(id); // Replace with your actual API service function

      // Assuming the API response is an array of verifications
      const verificationData: IVerification[] = response;
      return verificationData;

      setLoading(false);
    } catch (error) {
      console.error('Error fetching verifications:', error);
      handleError(error);
      return [];
    }
  };

  const submitVerification = async (verification: IVerification) => {
    try {
      setError('');
      // Make an API request to submit the verification
      const response = await submitVerificationServices(verification);

      // Assuming the API response contains the updated verification status
      const updatedVerification: IVerification = response;

      // Update the verification status in the context
      setVerifications((prevVerifications) =>
        prevVerifications.map((verification) =>
          verification._id === updatedVerification._id
            ? updatedVerification
            : verification
        )
      );
      return true;
    } catch (error) {
      console.error('Error submitting verification:', error);
      handleError(error);
      return false;
    }
  };

  const updateVerificationStatus = async (verification: UVerification) => {
    try {
      setError('');
      // Make an API request to submit the verification
      const response = await updateVerificationStatusServices(verification);

      // Assuming the API response contains the updated verification status
      const updatedVerification: IVerification = response;

      return updatedVerification;
    } catch (error) {
      console.error('Error submitting verification:', error);
      handleError(error);
      return null;
    }
  };

  const calculateCompletionPercentage = () => {
    const totalVerifications = verifications.length;
    if (totalVerifications === 0) {
      return 0; // No verifications, completion is 0%
    }

    const completedVerifications = verifications.filter(
      (verification) => verification.status === 'APPROVED'
    );

    const completionPercentage =
      (completedVerifications.length / totalVerifications) * 100;
    return Math.round(completionPercentage); // Round to the nearest whole number
  };

  const isAllVerificationsComplete = () => {
    return verifications.every(
      (verification) => verification.status === 'APPROVED'
    );
  };

  useEffect(() => {
    if (user) {
      fetchVerifications().then(() => setLoading(false));
    }
  }, [user]);

  return (
    <VerificationContext.Provider
      value={{
        verifications,
        loading,
        error,
        fetchVerifications,
        submitVerification,
        calculateCompletionPercentage,
        isAllVerificationsComplete,
        fetchVerificationsById,
        updateVerificationStatus,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error(
      'useVerification must be used within a VerificationProvider'
    );
  }
  return context;
}
