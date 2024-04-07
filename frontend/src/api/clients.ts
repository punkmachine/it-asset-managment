import axios from 'axios';
import Cookies from 'js-cookie';

import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import router from '@/router';

import { api } from '.';

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

function goToLoginPage() {
  Cookies.remove('token');
  localStorage.removeItem('adminId');
  router.push('/login');
}

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
  const isRefreshPath = error.response?.request.responseURL.includes('/refresh');

  if (error.response?.status === 403 || error.response?.status === 401 && !isRefreshPath) {
    const refresh = Cookies.get('refresh-token');

    if (!refresh) {
      goToLoginPage();
    } else {
      api.auth.refresh({ refreshToken: Cookies.get('refresh-token') })
        .then(data => {
          Cookies.set('token', data.token);

          return axios({
            ...error.config,
            headers: { ...error.config.headers, Authorization: `Bearer ${data.token}` }
          });
        })
        .catch(() => {
          goToLoginPage();
        });
    }
  }

  console.error('error >>>', error);
  return Promise.reject(error);
}

client.interceptors.request.use(requestSuccess, requestError);
client.interceptors.response.use(responseSuccess, responseError);

export { client };
