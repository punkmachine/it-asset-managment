import axios from 'axios';
import Cookies from 'js-cookie';

import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import router from '@/router';

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

function requestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = Cookies.get('token');
  if (token) {
    if (!config.headers) {
      config.headers = {} as any;
    }

    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}

function requestError(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function responseSuccess<T>(response: AxiosResponse<T>): T {
  return response.data;
}

function responseError(error: AxiosError): Promise<never> {
  if (error.response?.status === 403) {
    Cookies.remove('token');
    router.push('/login');
  }

  console.error('error >>>', error);
  return Promise.reject(error);
}

client.interceptors.request.use(requestSuccess, requestError);
client.interceptors.response.use(responseSuccess, responseError);

export { client };
