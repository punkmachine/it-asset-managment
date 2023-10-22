import type { IUser } from '@/entities/types/backend/user';

export function fetchUsers(): Promise<IUser[]> {
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
      },
      {
        id: 2,
        createdDate: '2023-10-22T04:55:58.867Z',
        updatedDate: '2023-10-22T04:55:58.867Z',
        firstName: 'Алмас',
        lastName: 'Бурленхан',
        login: 'almas',
        password: 'hash',
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
  return new Promise((resolve, rejects) => {
    resolve(editedUser);
  });
}
