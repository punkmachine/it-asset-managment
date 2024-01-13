import { UserState, UserRoles } from '@/entities/types/backend/user';

export interface IUserCreatePayload {
  firstName: string,
  lastName: string,
  login: string,
  password: string,
};

export interface IUserUpdatePayload {
  firstName: string,
  lastName: string,
  login: string,
  password: string,
  state: UserState,
  role: UserRoles,
};

