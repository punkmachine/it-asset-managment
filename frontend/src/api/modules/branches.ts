import type { AxiosInstance } from 'axios';
import type { IQueryData } from '@/entities/types/backend/query';
import type { ICreateBranchPayload, IUpdateBranchPayload } from '@/entities/types/backend/payload/branchPayload';
import type { IBranch } from '@/entities/types/backend/response/branches';
import { getQueryParams } from '@/utils/helpers/queryParam';

export const branches = (client: AxiosInstance) => ({
  fetchBranches: (): Promise<IBranch[]> => {
    return client.get('/users');
  },
  getBranchById: (id: number | string): Promise<IBranch> => {
    return client.get(`/user/${id}`);
  },
  searchBranch: (data: IQueryData): Promise<IBranch[]> => {
    return client.get(`user/search?${getQueryParams(data)}`);
  },
  createBranch: (payload: ICreateBranchPayload): Promise<IBranch> => {
    return client.post('/user', payload);
  },
  updateBranch: (id: number | string, payload: IUpdateBranchPayload): Promise<IBranch> => {
    return client.put(`/user/${id}`, payload);
  },
  deleteBranch: (id: number | string): Promise<IBranch> => {
    return client.delete(`/user/${id}`);
  },
});
