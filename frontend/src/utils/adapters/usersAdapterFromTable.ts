import type { IUserInTable, ICell } from '@/entities/types/UI/table';
import type { IUser } from '@/entities/types/backend/response/user';

function usersAdapterFromTable(users: IUser[]): IUserInTable[] {
  return users.map(user => {
    return {
      id: user.id.toString(),
      fio: `${user.firstName} ${user.lastName}`,
    }
  });
}

export function getTableRows(users: IUser[]) {
  const usersTable = usersAdapterFromTable(users);

  return usersTable.map(user => {
    let result: ICell[] = [];

    for (let key in user) {
      result.push({
        key,
        title: user[key as keyof IUserInTable],
      });
    }

    return result;
  });
}
