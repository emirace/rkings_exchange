import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

// export const baseURL = '';
// export const baseURL = 'http://192.168.43.12:5000';
// export const baseURL = "http://172.20.10.4:5000";
export const baseURL = "https://www.rkingsexchange.com";

// Create an instance of Axios with custom configurations if needed
const api = axios.create({
  // baseURL: '/api',
  // baseURL: 'https://rkingsexchange.com/api',
  baseURL: baseURL + "/api",
  // timeout: 10000, // Set a timeout (in milliseconds) for requests
  headers: {
    "Content-Type": "application/json", // Set default headers here
    // You can add other headers like authorization tokens if needed
  },
});

// Interceptors for handling requests and responses
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // You can modify the request config here (e.g., add authentication headers)
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can handle successful responses here
    return response.data; // Return only the response data
  },
  (error: AxiosError) => {
    // Handle response errors here
    if (error.response) {
      // Server responded with an error status code (4xx or 5xx)
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
