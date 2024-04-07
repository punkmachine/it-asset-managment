import type { AxiosInstance } from 'axios';
import type { IAuthPayload, IRefreshPayload } from '@/entities/types/backend/payload/authPayload';
import type { ILoginResponse } from '@/entities/types/backend/response/auth';

export const auth = (client: AxiosInstance) => ({
  login: (payload: IAuthPayload): Promise<ILoginResponse> => {
    return client.post(`/login`, payload);
  },
  refresh: (payload: IRefreshPayload): Promise<ILoginResponse> => {
    return client.post('/refresh', payload);
  },
  createSuperAdmin: (payload: IAuthPayload): Promise<ILoginResponse> => {
    return client.post(`/create-super-admin`, payload);
  },
});
