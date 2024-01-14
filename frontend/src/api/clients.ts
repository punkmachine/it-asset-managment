import axios from 'axios';
import Cookies from 'js-cookie';
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5004/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

function requestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig  {
  const token = Cookies.get('token');
  if (token) {
    if (!config.headers) {
      config.headers = {} as any;
    }

    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // @todo: авторизацию переделать, чтобы переавторизация была и т.п.

  return config;
}

function requestError(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function responseSuccess<T>(response: AxiosResponse<T>): T {
  return response.data;
}

function responseError(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

client.interceptors.request.use(requestSuccess, requestError);
client.interceptors.response.use(responseSuccess, responseError);

export { client };
