import type { AxiosInstance } from 'axios';
import type { IQueryData } from '@/entities/types/backend/query';
import type { IAdmin, TAdminsList } from '@/entities/types/backend/response/admins';
import type { IAdminCreatePayload, IAdminUpdatePayload } from '@/entities/types/backend/payload/adminPayload';

import { getQueryParams } from '@/utils/helpers/queryParam';

export const admins = (client: AxiosInstance) => ({
  fetchAdmins: (): Promise<TAdminsList> => {
    return client.get('/admins');
  },
  getAdminById: (id: number | string): Promise<IAdmin> => {
    return client.get(`/admin/${id}`);
  },
  searchAdmin: (data: IQueryData): Promise<TAdminsList> => {
    return client.get(`admins/search?${getQueryParams(data)}`);
  },
  createAdmin: (payload: IAdminCreatePayload): Promise<IAdmin> => {
    return client.post('/admin', payload);
  },
  updateAdmin: (id: number | string, payload: IAdminUpdatePayload): Promise<IAdmin> => {
    return client.put(`/admin/${id}`, payload);
  },
  deleteAdmin: (id: number | string): Promise<IAdmin> => {
    return client.delete(`/admin/${id}`);
  },
});
