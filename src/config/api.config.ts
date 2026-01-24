import storage from '@/lib/storage';
import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    if (!(config as any).skipAuth) {
      const token = storage.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = error.response?.data?.message || error.message;
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      (error.response.data.error?.errors ||
        error.response.data.error?.errorParams)
    ) {
      message =
        error.response.data.error?.errors.join(',') ||
        error.response.data.error?.errorParams
          ?.map((e: any) => e.message || e.msg)
          ?.join(',');
    }
    return Promise.reject({
      statusCode: error.response?.status,
      message: message
    });
  }
);

export default apiClient;
