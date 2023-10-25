export enum UserState {
  active = "ACTIVE",
  deleted = "DELETED",
};

export enum UserRoles {
  superAdmin = 'SUPERADMIN',
  admin = 'ADMIN',
};

export interface IUser {
  id: number,
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

export interface IProfile {
  id: number,
  firstName: string,
  lastName: string,
  avatar: string,
};
