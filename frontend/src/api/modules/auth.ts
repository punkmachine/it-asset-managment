import type { AxiosInstance } from 'axios';
import type { IAuthPayload } from '@/entities/types/backend/payload/authPayload';
import type { ILoginResponse } from '@/entities/types/backend/response/auth';

export const auth = (client: AxiosInstance) => ({
  login: (payload: IAuthPayload): Promise<ILoginResponse> => {
    return client.post(`/login`, payload);
  },
  createSuperAdmin: (payload: IAuthPayload): Promise<ILoginResponse> => {
    return client.post(`/create-super-admin`, payload);
  },
});
