import type { IUser, IProfile, TUsersList, ISuperUser } from '@/entities/types/backend/response/user';
import { UserState, UserRoles } from '@/entities/types/backend/response/user';
import type { INewUser } from '@/views/users/types';

export function fetchUsers(): Promise<TUsersList> {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: 1,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        firstName: 'Александр',
        lastName: 'Рассудихин',
        login: 'alex',
        password: 'hash',
        state: UserState.active,
        role: UserRoles.superAdmin,
        avatar: '',
      },
      {
        id: 2,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        firstName: 'Алмас',
        lastName: 'Бурленхан',
        login: 'almas',
        password: 'hash',
        state: UserState.active,
        role: UserRoles.admin,
        avatar: '',
      },
    ]);
  });
}

export function deleteUser(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

export function editUser(editedUser: IUser): Promise<IUser> {
  return new Promise((resolve, reject) => {
    resolve(editedUser);
  });
}

export function getUserById(id: number): Promise<IUser | ISuperUser> {
  return new Promise((resolve, reject) => {
    resolve({
      id,
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      firstName: 'Александр',
      lastName: 'Рассудихин',
      login: 'alex',
      password: 'hash',
      state: UserState.active,
      role: UserRoles.superAdmin,
      avatar: '',
    });
  });
}

export function saveProfile(profile: IProfile) {
  return new Promise((resolve, reject) => {
    resolve({
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      login: 'alex',
      password: 'hash',
      state: UserState.active,
      role: UserRoles.superAdmin,
      ...profile,
    });
  });
}

export function postUser(newUser: INewUser): Promise<IUser> {
  return new Promise((resolve, reject) => {
    resolve({
      ...newUser,
      id: 3,
      createdDate: '2023-10-22T04:55:58.867Z',
      updatedDate: '2023-10-22T04:55:58.867Z',
      state: UserState.active,
      avatar: '',
      role: UserRoles.admin,
    })
  });
}
