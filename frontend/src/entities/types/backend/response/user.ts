interface IDataCounter {
  branches: number,
  equipments: number,
  users: number,
};

export enum UserState {
  active = "ACTIVE",
  deleted = "DELETED",
};

export enum UserRoles {
  superAdmin = 'SUPERADMIN',
  admin = 'ADMIN',
};

export interface IProfile {
  id: number,
  firstName: string,
  lastName: string,
  avatar: string,
};

export interface IUser {
  _id: string,
  createdDate: string,
  updatedDate: string,
  firstName: string,
  lastName: string,
  login: string,
  password: string,
  state: UserState,
  role: UserRoles,
  avatar: string,
};

export interface ISuperUser extends IUser {
  limits: IDataCounter,
  currentDataCounters: IDataCounter,
};

export type TUsersList = (IUser | ISuperUser)[];
