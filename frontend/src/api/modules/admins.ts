import type { AxiosInstance } from 'axios';
import type { IAdmin, TAdminsList } from '@/entities/types/backend/response/admins';
import type { IPagination } from '@/entities/types/backend/response/pagination';
import type { IAdminCreatePayload, IAdminUpdatePayload } from '@/entities/types/backend/payload/adminPayload';
import type { IPaginationQuery, ISearchQuery } from '@/entities/types/backend/payload/query';

import { getQueryParams } from '@/utils/helpers/queryParam';

export const admins = (client: AxiosInstance) => ({
  fetchAdmins: (query?: IPaginationQuery): Promise<IPagination<TAdminsList>> => {
    let url = '/admins';

    if (query) {
      url = `${url}?${getQueryParams(query)}`
    }

    return client.get('/admins');
  },
  getAdminById: (id: number | string): Promise<IAdmin> => {
    return client.get(`/admin/${id}`);
  },
  searchAdmin: (query: ISearchQuery): Promise<IPagination<TAdminsList>> => {
    return client.get(`admins/search?${getQueryParams(query)}`);
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
