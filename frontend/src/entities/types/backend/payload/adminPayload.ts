import { AdminState, AdminRoles } from '@/entities/types/backend/response/admins';

export interface IAdminCreatePayload {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export interface IAdminUpdatePayload {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  state: AdminState;
  role: AdminRoles;
}
