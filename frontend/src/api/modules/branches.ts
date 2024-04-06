import type { AxiosInstance } from 'axios';
import type { IQueryData } from '@/entities/types/backend/query';
import type { ICreateBranchPayload, IUpdateBranchPayload } from '@/entities/types/backend/payload/branchPayload';
import type { IBranch } from '@/entities/types/backend/response/branches';
import type { IPagination } from '@/entities/types/backend/response/pagination';
import type { IPaginationQuery } from '@/entities/types/backend/payload/query';
import { getQueryParams } from '@/utils/helpers/queryParam';

export const branches = (client: AxiosInstance) => ({
  fetchBranches: (query?: IPaginationQuery): Promise<IPagination<IBranch>> => {
    let url = '/branches';

    if (query) {
      url = `${url}?${getQueryParams(query)}`
    }

    return client.get(url);
  },
  getBranchById: (id: number | string): Promise<IBranch> => {
    return client.get(`/branch/${id}`);
  },
  searchBranch: (data: IQueryData): Promise<IPagination<IBranch>> => {
    return client.get(`branches/search?${getQueryParams(data)}`);
  },
  createBranch: (payload: ICreateBranchPayload): Promise<IBranch> => {
    return client.post('/branch', payload);
  },
  updateBranch: (id: number | string, payload: IUpdateBranchPayload): Promise<IBranch> => {
    return client.put(`/branch/${id}`, payload);
  },
  deleteBranch: (id: number | string): Promise<IBranch> => {
    return client.delete(`/branch/${id}`);
  },
});
