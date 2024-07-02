/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateFields, User } from '../type/user';
import { getBackendErrorMessage } from '../utils/error';
import api from './api';
import * as SecureStore from 'expo-secure-store';

export async function sendVerifyEmailService(userData: {
  email: string;
}): Promise<any> {
  try {
    const data = await api.post('/users/send-verify-email', userData);

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data);
      throw new Error(errorMessage);
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Registration error:', error);

    const errorMessage = getBackendErrorMessage(error);
    console.error(errorMessage);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
}

export async function sendVerifyOtpService(userData: {
  email: string;
}): Promise<any> {
  try {
    const data = await api.post('/users/send-otp', userData);

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data);
      throw new Error(errorMessage);
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Registration error:', error);

    const errorMessage = getBackendErrorMessage(error);
    console.error(errorMessage);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
}

export async function forgetPasswordService(userData: {
  email: string;
}): Promise<any> {
  try {
    const data = await api.post('/users/forget-password', userData);

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data);
      throw new Error(errorMessage);
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('forget password error:', error);

    const errorMessage = getBackendErrorMessage(error);
    console.error(errorMessage);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
}

export async function verifyEmailService(tokenData: {
  token: string;
}): Promise<any> {
  try {
    const data = await api.post('/users/verify-email', tokenData);
    console.log(data);

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data);
      throw new Error(errorMessage);
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Registration error:', error);

    const errorMessage = getBackendErrorMessage(error);
    console.error(errorMessage);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
}

export async function verifyOtpService(tokenData: {
  token: string;
}): Promise<any> {
  try {
    const data = await api.post('/users/verify-email', tokenData);
    console.log(data);

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data);
      throw new Error(errorMessage);
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Registration error:', error);

    const errorMessage = getBackendErrorMessage(error);
    console.error(errorMessage);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
}

export async function createUserChangePasswordService(credentials: {
  password: string;
  token: string;
}): Promise<any> {
  try {
    const data = await api.post('/users/register', credentials);

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data);
      throw new Error('Login failed: ' + errorMessage);
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Login error:', error);

    const errorMessage = getBackendErrorMessage(error);

    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
}

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<string> {
  try {
    const data: any = await api.post('/users/login', credentials);
    // const data = { status: true, accessToken: '123456', data: '' };
    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Login failed: ' + getBackendErrorMessage(data.data));
    }
    await SecureStore.setItemAsync('authToken', data.accessToken);
    return data.accessToken;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Login error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function getUserService(): Promise<User> {
  try {
    const data: any = await api.get('/users/profile');

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Login failed: ' + getBackendErrorMessage(data.data));
    }

    await SecureStore.setItemAsync('email', data.user.email);
    await SecureStore.setItemAsync('username', data.user.username);
    return data.user;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Get user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function getAllUserService(): Promise<User[]> {
  try {
    const data: any = await api.get('/users/');

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Get all failed: ' + getBackendErrorMessage(data.data));
    }

    return data.users;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Get user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function getUserByIdService(id: string): Promise<User> {
  try {
    const data: any = await api.get(`/users/user/${id}`);

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Get all failed: ' + getBackendErrorMessage(data.data));
    }

    return data.user;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Get user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function updateUserService(userData: UpdateFields): Promise<User> {
  try {
    const response: any = await api.put('/users/update-profile', userData);

    console.log(response);
    if (!response.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error(
        'Update failed: ' + getBackendErrorMessage(response.data)
      );
    }

    return response.user;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Update user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function updateUserByIdService(
  id: string,
  userData: UpdateFields
): Promise<User> {
  try {
    const response: any = await api.put(
      `/users/update-profile/${id}`,
      userData
    );

    console.log(response);
    if (!response.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error(
        'Update failed: ' + getBackendErrorMessage(response.data)
      );
    }

    return response.user;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Update user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const { data } = await api.get('/users/logout');

    if (!data.status) {
      // Handle logout error, e.g., display an error message to the user
      throw new Error('Logout failed: ' + getBackendErrorMessage(data.data));
    }

    SecureStore.deleteItemAsync('authToken');
    return true;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Logout error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

// You can add more authentication-related functions here, such as checking the user's authentication status, resetting passwords, etc.
