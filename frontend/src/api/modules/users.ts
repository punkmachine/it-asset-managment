import type { AxiosInstance } from 'axios';
import type { IQueryData } from '@/entities/types/backend/query';
import type { IUser, TUsersList } from '@/entities/types/backend/response/user';
import type { IUserCreatePayload, IUserUpdatePayload } from '@/entities/types/backend/payload/userPayload';

import { getQueryParams } from '@/utils/helpers/queryParam';

export const users = (client: AxiosInstance) => ({
  fetchUsers: (): Promise<TUsersList> => {
    return client.get('/users');
  },
  getUserById: (id: number | string): Promise<IUser> => {
    return client.get(`/user/${id}`);
  },
  searchUser: (data: IQueryData): Promise<TUsersList> => {
    return client.get(`users/search?${getQueryParams(data)}`);
  },
  createUser: (payload: IUserCreatePayload): Promise<IUser> => {
    return client.post('/user', payload);
  },
  updateUser: (id: number | string, payload: IUserUpdatePayload): Promise<IUser> => {
    return client.put(`/user/${id}`, payload);
  },
  deleteUser: (id: number | string): Promise<IUser> => {
    return client.delete(`/user/${id}`);
  },
});
