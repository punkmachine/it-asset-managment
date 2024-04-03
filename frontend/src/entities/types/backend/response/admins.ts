interface IDataCounter {
  branches: number;
  equipments: number;
  users: number;
}

export enum AdminState {
  active = 'ACTIVE',
  deleted = 'DELETED',
}

export enum AdminRoles {
  superAdmin = 'SUPERADMIN',
  admin = 'ADMIN',
}

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface IAdmin {
  _id: string;
  createdDate: string;
  updatedDate: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  state: AdminState;
  role: AdminRoles;
  avatar: string;
}

export interface ISuperAdmin extends IAdmin {
  limits: IDataCounter;
  currentDataCounters: IDataCounter;
}

export type TAdminsList = (IAdmin | ISuperAdmin)[];
