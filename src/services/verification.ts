/* eslint-disable @typescript-eslint/no-explicit-any */
import { IVerification } from '../type/user';
import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export const fetchVerificationsService = async () => {
  try {
    // Make an API request to fetch verifications
    const response: any = await api.get('/verifications');

    // Assuming the API response contains an array of verifications
    const verificationData: IVerification[] = response.verifications;

    return verificationData;
  } catch (error) {
    console.error('Error fetching verifications:', error);
    throw getBackendErrorMessage(error);
  }
};

export const fetchVerificationsByIdService = async (id: string) => {
  try {
    // Make an API request to fetch verifications
    const response: any = await api.get(`/verifications/${id}`);

    // Assuming the API response contains an array of verifications
    const verificationData: IVerification[] = response.verifications;

    return verificationData;
  } catch (error) {
    console.error('Error fetching verifications:', error);
    throw getBackendErrorMessage(error);
  }
};

export const submitVerificationServices = async (
  verificationData: IVerification
) => {
  try {
    // Make an API request to submit the verification
    const response: any = await api.post('/verifications', verificationData);

    // Assuming the API response indicates the result of the verification submission
    const submissionResult = response.verification;

    return submissionResult;
  } catch (error) {
    console.error('Error submitting verification:', error);
    throw getBackendErrorMessage(error);
  }
};

export const updateVerificationStatusServices = async (verificationData: {
  status: string;
  id: string;
  message?: string;
}) => {
  try {
    // Make an API request to submit the verification
    const response: any = await api.put(
      `/verifications/status/${verificationData.id}`,
      verificationData
    );

    // Assuming the API response indicates the result of the verification submission
    const submissionResult = response.verification;

    return submissionResult;
  } catch (error) {
    console.error('Error submitting verification:', error);
    throw getBackendErrorMessage(error);
  }
};
